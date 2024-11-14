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

@WebSocketGateway({ namespace: "api/betting", cors: true })
export class BetGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly redisManager: RedisManager) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.removeUserFromAllRooms(client.id);
  }

  @SubscribeMessage("joinRoom")
  async handleJoinRoom(client: Socket, payload: joinRoomRequestType) {
    const { sender, channel } = joinRoomRequestSchema.parse(payload);
    const { nickname } = sender;
    const { roomId } = channel;
    client.join(roomId);
    const ipAddress = client.handshake.address;

    //TODO: 베팅방 생성 API 에서 redis에 channel 데이터 초기화 이후 role 구분 메서드 구현
    await this.redisManager.setUser({
      nickname,
      ipAddress: ipAddress,
      role: "user",
      joinAt: new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString(),
    });

    await this.redisManager.addUserToRoom(roomId, nickname);

    const users = await this.getUsersWithJoinAt(roomId);
    this.server.to(roomId).emit("fetchRoomUsers", users);
  }

  @SubscribeMessage("leaveRoom")
  async handleLeaveRoom(client: Socket, payload: leaveRoomRequestType) {
    const { roomId } = leaveRoomRequestSchema.parse(payload);
    client.leave(roomId);

    await this.redisManager.removeUserFromRoom(roomId, client.id);

    const users = await this.getUsersWithJoinAt(roomId);
    this.server.to(roomId).emit("fetchRoomUsers", users);
  }

  @SubscribeMessage("fetchBetRoomInfo")
  async handleFetchBetRoomInfo(
    client: Socket,
    payload: fetchBetRoomInfoRequestType,
  ) {
    const { roomId } = fetchBetRoomInfoRequestSchema.parse(payload);
    const channel = await this.redisManager.client.hgetall(`room:${roomId}`);
    if (channel) {
      client.emit("fetchBetRoomInfo", { channel });
    } else {
      client.emit("fetchBetRoomInfo", {
        error: "해당하는 채널이 존재하지 않습니다.",
      });
    }
  }

  @SubscribeMessage("joinBet")
  async handleJoinBet(client: Socket, payload: joinBetRoomRequestType) {
    const { sender, channel } = joinBetRoomRequestSchema.parse(payload);

    //TODO: 베팅방 생성 API 에서 redis에 channel 데이터 초기화
    const targetChannel = await this.redisManager.client.hgetall(
      `room:${channel.roomId}`,
    );

    if (targetChannel && targetChannel.status === "active") {
      const option = targetChannel.options[sender.selectOption];
      if (option) {
        await this.redisManager.updateBetOption(
          channel.roomId,
          sender.selectOption,
          sender.betAmount,
        );
        this.server.to(channel.roomId).emit("fetchBetRoomInfo", {
          channel: targetChannel,
        });
        //TODO: RDB에 배팅 내역 저장 로직 추가
      } else {
        client.emit("joinBet", { error: "해당하는 옵션이 존재하지 않습니다." });
      }
    } else {
      client.emit("joinBet", { error: "해당하는 채널이 존재하지 않습니다." });
    }
  }

  private async removeUserFromAllRooms(clientId: string) {
    const roomKeys = await this.redisManager.client.keys("room:*:users");
    for (const key of roomKeys) {
      const users = await this.redisManager.client.lrange(key, 0, -1);
      const updatedUsers = users.filter((user: string) => user !== clientId);
      await this.redisManager.client.del(key);
      await this.redisManager.client.rpush(key, ...updatedUsers);
    }
  }

  private async getUsersWithJoinAt(roomId: string) {
    const userNicknames = await this.redisManager.getRoomUsers(roomId);
    const users = await Promise.all(
      userNicknames.map(async (nickname) => {
        const userInfo = await this.redisManager.getUser(nickname);
        return { nickname: userInfo.nickname, joinAt: userInfo.joinAt };
      }),
    );
    return users;
  }
}
