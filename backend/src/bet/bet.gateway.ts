import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { RedisManager } from "src/utils/redis.manager";
import {
  joinRoomRequestSchema,
  joinRoomRequestType,
  leaveRoomRequestSchema,
  leaveRoomRequestType,
} from "@shared/schemas/shared";
import {
  fetchBetRoomInfoRequestSchema,
  fetchBetRoomInfoRequestType,
} from "@shared/schemas/bet/socket/request";
import { JwtUtils } from "src/utils/jwt.utils";

@WebSocketGateway({
  namespace: "api/betting",
  cors: true,
})
export class BetGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly redisManager: RedisManager,
    private readonly jwtUtils: JwtUtils,
  ) {}

  handleConnection(client: Socket) {
    try {
      const accessToken =
        client.handshake.auth.token || client.handshake.headers.token;

      if (!accessToken) {
        client.emit("error", {
          event: "handleConnection",
          message: "엑세스 토큰이 존재하지 않습니다.",
        });
        client.disconnect(true);
        return;
      }
      const payload = this.jwtUtils.verifyToken(accessToken);
      client.data.userId =
        typeof payload.id === "number" ? String(payload.id) : payload.id;
      client.data.userRole = payload.role;

      console.log(
        `Client connected: ${client.id}, User ID: ${client.data.userId}`,
      );
    } catch (err) {
      client.emit("error", {
        event: "handleConnection",
        message: "Connection error: " + err.message,
      });
      client.disconnect(true);
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const nickname = client.data.nickname;
    const roomId = client.data.roomId;
    if (roomId && nickname) {
      await this.redisManager.client.lrem(`room:${roomId}:users`, 0, nickname);
    }
    const remainingUsers = await this.redisManager.getRoomUserNicknames(roomId);
    this.server.to(roomId).emit("fetchRoomUsers", remainingUsers);
  }

  @SubscribeMessage("joinRoom")
  async handleJoinRoom(client: Socket, payload: joinRoomRequestType) {
    const userId = client.data.userId;
    const userRole = client.data.userRole;
    const { channel } = joinRoomRequestSchema.parse(payload);
    const nickname = await this.redisManager.client.hget(
      `user:${userId}`,
      "nickname",
    );
    if (!nickname) {
      client.emit("error", {
        event: "joinRoom",
        message: `닉네임을 조회할 수 없습니다. ${userId}`,
      });
    }
    const { roomId } = channel;
    client.join(roomId);
    client.data.nickname = nickname;
    client.data.roomId = roomId;

    const creatorID = await this.redisManager.client.get(
      `room:${roomId}:creator`,
    );
    const owner = userId === creatorID ? 1 : 0;

    await this.redisManager.client.lpush(`room:${roomId}:users`, nickname);
    await this.redisManager.setBettingUserOnJoin({
      userId,
      nickname,
      roomId,
      owner: owner,
      role: userRole,
    });

    const users = await this.redisManager.getRoomUserNicknames(roomId);
    this.server.to(roomId).emit("fetchRoomUsers", users);
  }

  @SubscribeMessage("leaveRoom")
  async handleLeaveRoom(client: Socket, payload: leaveRoomRequestType) {
    const userId = client.data.userId;
    const { roomId } = leaveRoomRequestSchema.parse(payload);
    client.leave(roomId);

    const nickname = await this.redisManager.client.hget(
      `user:${userId}`,
      "nickname",
    );
    await this.redisManager.client.lrem(`room:${roomId}:users`, 0, nickname);
    const users = await this.redisManager.getRoomUserNicknames(roomId);
    this.server.to(roomId).emit("fetchRoomUsers", users);
  }

  @SubscribeMessage("fetchBetRoomInfo")
  async handleFetchBetRoomInfo(
    client: Socket,
    payload: fetchBetRoomInfoRequestType,
  ) {
    const { roomId } = fetchBetRoomInfoRequestSchema.parse(payload);
    const channel = await this.redisManager.getChannelData(roomId);
    if (channel) {
      client.emit("fetchBetRoomInfo", { channel });
    } else {
      client.emit("error", {
        event: "fetchBetRoomInfo",
        message: "해당하는 채널이 존재하지 않습니다.",
      });
    }
  }
}
