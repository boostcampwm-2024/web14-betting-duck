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
  joinBetRoomRequestSchema,
  joinBetRoomRequestType,
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
      const authorizationHeader = client.handshake.headers.authorization;
      if (!authorizationHeader) {
        client.emit("error", {
          event: "handleConnection",
          message: "Authorization 헤더가 존재하지 않습니다.",
        });
        client.disconnect(true);
        console.error("");
        return;
      }
      const accessToken = authorizationHeader.split(" ")[1];
      if (!accessToken) {
        client.emit("error", {
          event: "handleConnection",
          message: "엑세스 토큰이 존재하지 않습니다.",
        });
        client.disconnect(true);
        return;
      }
      const payload = this.jwtUtils.verifyToken(accessToken);
      client.data.userId = payload.id;
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

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const userId = client.data.userId;
    this.redisManager.removeUserFromAllRooms(userId);
  }

  @SubscribeMessage("joinRoom")
  async handleJoinRoom(client: Socket, payload: joinRoomRequestType) {
    const userId = client.data.userId;
    const { channel } = joinRoomRequestSchema.parse(payload);
    const nickname = await this.redisManager.client.hget(
      `user:${userId}`,
      "nickname",
    );
    const { roomId } = channel;
    client.join(roomId);

    const creatorID = await this.redisManager.client.get(
      `room:${roomId}:creator`,
    );
    const owner = userId === Number(creatorID) ? 1 : 0;

    await this.redisManager.setBettingUserOnJoin({
      userId,
      nickname,
      joinAt: new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString(),
      roomId,
      owner: owner,
    });

    const users = await this.redisManager.getRoomUsersNicknameAndJoinAt(roomId);
    this.server.to(roomId).emit("fetchRoomUsers", users);
  }

  @SubscribeMessage("leaveRoom")
  async handleLeaveRoom(client: Socket, payload: leaveRoomRequestType) {
    const userId = client.data.userId;
    const { roomId } = leaveRoomRequestSchema.parse(payload);
    client.leave(roomId);

    await this.redisManager.client.del(`room:${roomId}:user:${userId}`);

    const users = await this.redisManager.getRoomUsersNicknameAndJoinAt(roomId);
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

  @SubscribeMessage("joinBet")
  async handleJoinBet(client: Socket, payload: joinBetRoomRequestType) {
    const { sender, channel } = joinBetRoomRequestSchema.parse(payload);
    const targetChannel = await this.redisManager.getChannelData(
      channel.roomId,
    );
    const userId = client.data.userId;
    if (!userId) {
      client.emit("error", {
        event: "joinBet",
        message: "인증되지 않은 사용자입니다.",
      });
      return;
    }
    const userDuck = await this.redisManager.client.hget(
      `user:${userId}`,
      "duck",
    );

    if (!userDuck || Number(userDuck) < sender.betAmount) {
      client.emit("error", {
        event: "joinBet",
        message: "보유한 duck이 부족합니다.",
      });
      return;
    }
    //TODO: betAmount가 디폴트 값 이상인지 체크!

    if (targetChannel && targetChannel.status === "active") {
      const selectedOption =
        sender.selectOption === "option1"
          ? targetChannel.option1
          : targetChannel.option2;

      if (selectedOption) {
        await this.redisManager.updateBetOption(
          channel.roomId,
          sender.selectOption,
          sender.betAmount,
        );

        const [updatedOption1, updatedOption2] = await Promise.all([
          this.redisManager.client.hgetall(`room:${channel.roomId}:option1`),
          this.redisManager.client.hgetall(`room:${channel.roomId}:option2`),
        ]);

        const updatedChannel = {
          creator: targetChannel.creator,
          status: targetChannel.status,
          option1: updatedOption1,
          option2: updatedOption2,
        };

        this.server.to(channel.roomId).emit("fetchBetRoomInfo", {
          channel: updatedChannel,
        });
        //TODO: RDB에 배팅 내역 저장 로직 추가
        await this.redisManager.setBettingUserOnBet({
          userId,
          roomId: channel.roomId,
          betAmount: sender.betAmount,
          selectedOption: sender.selectOption,
        });
      } else {
        client.emit("error", {
          event: "joinBet",
          message: "해당하는 옵션이 존재하지 않습니다.",
        });
      }
    } else {
      client.emit("error", {
        event: "joinBet",
        message: "해당하는 채널이 존재하지 않거나 활성 상태가 아닙니다.",
      });
    }
  }
}
