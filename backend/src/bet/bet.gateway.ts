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
import * as jwt from "jsonwebtoken";

@WebSocketGateway({ namespace: "api/betting", cors: true })
export class BetGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly redisManager: RedisManager) {}

  handleConnection(client: Socket) {
    try {
      const cookies = this.parseCookies(client.handshake.headers.cookie);
      const accessToken = cookies["access_token"];
      if (!accessToken) {
        client.disconnect(true);
        console.error("엑세스 토큰이 존재하지 않습니다.");
        return;
      }
      const payload = this.verifyToken(accessToken);
      client.data.userId = payload.id;

      console.log(
        `Client connected: ${client.id}, User ID: ${client.data.userId}`,
      );
    } catch (err) {
      console.error("Connection error:", err.message);
      client.disconnect(true);
    }
  }

  //TODO: 여기서 유저가 베팅 이후에 방을 나간 경우 고려해야함
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const userId = client.data.userId;
    this.removeUserFromAllRooms(userId);
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
      client.emit("fetchBetRoomInfo", {
        error: "해당하는 채널이 존재하지 않습니다.",
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
      client.emit("joinBet", { error: "인증되지 않은 사용자입니다." });
      return;
    }
    const userDuck = await this.redisManager.client.hget(
      `user:${userId}`,
      "duck",
    );

    if (!userDuck || Number(userDuck) < sender.betAmount) {
      client.emit("joinBet", { error: "보유한 duck이 부족합니다." });
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
        client.emit("joinBet", { error: "해당하는 옵션이 존재하지 않습니다." });
      }
    } else {
      client.emit("joinBet", {
        error: "해당하는 채널이 존재하지 않거나 활성 상태가 아닙니다.",
      });
    }
  }

  private async removeUserFromAllRooms(userId: string) {
    let cursor = "0";
    do {
      const [nextCursor, keys] = await this.redisManager.client.scan(
        cursor,
        "MATCH",
        `room:*:user:${userId}`,
        "COUNT",
        10,
      );
      cursor = nextCursor;
      for (const key of keys) {
        await this.redisManager.client.del(key);
      }
    } while (cursor !== "0");
  }

  private parseCookies(cookieHeader?: string): Record<string, string> {
    if (!cookieHeader) return {};
    return cookieHeader.split(";").reduce(
      (cookies, cookie) => {
        const [key, value] = cookie.split("=").map((part) => part.trim());
        cookies[key] = decodeURIComponent(value);
        return cookies;
      },
      {} as Record<string, string>,
    );
  }

  private verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || "secret");
  }
}
