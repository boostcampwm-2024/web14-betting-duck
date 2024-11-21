import { Injectable } from "@nestjs/common";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { Redis } from "ioredis"; // ioredis를 사용하여 타입 지정
import { randomUUID } from "crypto";

@Injectable()
export class RedisManager {
  public client: Redis;
  public publisher: Redis;

  constructor(private readonly redisService: RedisService) {
    this.client = this.redisService.getOrThrow("default");
    this.publisher = this.redisService.getOrThrow("default");
  }

  async getUser(userId: string) {
    const [nickname, role, duck] = await Promise.all([
      this.client.hget(`user:${userId}`, "nickname"),
      this.client.hget(`user:${userId}`, "role"),
      this.client.hget(`user:${userId}`, "duck"),
    ]);
    return { nickname, role, duck };
  }

  async setUser({
    userId,
    nickname,
    role,
    duck,
  }: {
    userId: string;
    nickname: string;
    role: string;
    duck: number;
  }) {
    await this.client.hset(`user:${userId}`, {
      nickname,
      role,
      duck,
    });
  }

  async findUser(userId: string) {
    const exists = await this.client.exists(`user:${userId}`);
    return exists === 1;
  }

  async setBettingUserOnJoin({
    userId,
    nickname,
    joinAt,
    owner,
    roomId,
    role,
  }: {
    userId: string;
    nickname: string;
    joinAt: string;
    owner: number;
    roomId: string;
    role: string;
  }) {
    await this.client.hset(`room:${roomId}:user:${userId}`, {
      nickname,
      joinAt,
      owner,
      role,
    });
  }

  async setBettingUserOnBet({
    userId,
    betAmount,
    selectedOption,
    roomId,
  }: {
    userId: string;
    betAmount: number;
    selectedOption: string;
    roomId: string;
  }) {
    await this.client.hset(`room:${roomId}:user:${userId}`, {
      betAmount,
      selectedOption,
    });
  }

  async getBettingUser(userId: string, roomId: string) {
    const [nickname, joinAt, betAmount, selectedOption, owner] =
      await Promise.all([
        this.client.hget(`room:${roomId}:user:${userId}`, "nickname"),
        this.client.hget(`room:${roomId}:user:${userId}`, "joinAt"),
        this.client.hget(`room:${roomId}:user:${userId}`, "betAmount"),
        this.client.hget(`room:${roomId}:user:${userId}`, "selectedOption"),
        this.client.hget(`room:${roomId}:user:${userId}`, "owner"),
      ]);
    return { nickname, joinAt, betAmount, selectedOption, owner };
  }

  async getRoomUsersNicknameAndJoinAt(roomId: string) {
    let cursor = "0";
    const users: { nickname: string; joinAt: string }[] = [];

    do {
      const [nextCursor, keys] = await this.client.scan(
        cursor,
        "MATCH",
        `room:${roomId}:user:*`,
        "COUNT",
        20,
      );
      cursor = nextCursor;

      const fetchedUsers = await Promise.all(
        keys.map(async (key) => {
          const userData = await this.client.hgetall(key);
          return { nickname: userData.nickname, joinAt: userData.joinAt };
        }),
      );
      users.push(...fetchedUsers);
    } while (cursor !== "0");
    return users;
  }

  async setRoomStatus(roomId: string, status: string) {
    await this.client.set(`room:${roomId}:status`, `${status}`);
  }

  async getRoomStatus(roomId: string) {
    return await this.client.get(`room:${roomId}:status`);
  }

  async updateBetting(roomId: string, option: string, betAmount: number) {
    await Promise.all([
      this.client.hincrby(`room:${roomId}:${option}`, "currentBets", betAmount),
      this.client.hincrby(`room:${roomId}:${option}`, "participants", 1),
    ]);
  }

  async initializeBetRoom(roomUUID: string, creatorId: string) {
    await Promise.all([
      this.client.hmset(`room:${roomUUID}:option1`, {
        participants: 0,
        currentBets: 0,
      }),
      this.client.hmset(`room:${roomUUID}:option2`, {
        participants: 0,
        currentBets: 0,
      }),
      this.client.set(`room:${roomUUID}:creator`, creatorId),
      this.client.set(`room:${roomUUID}:status`, "waiting"),
    ]);
  }

  async getChannelData(roomId: string) {
    const [creator, status, option1, option2] = await Promise.all([
      this.client.get(`room:${roomId}:creator`),
      this.client.get(`room:${roomId}:status`),
      this.client.hgetall(`room:${roomId}:option1`),
      this.client.hgetall(`room:${roomId}:option2`),
    ]);

    if (creator && status && option1 && option2) {
      return {
        creator,
        status,
        option1,
        option2,
      };
    } else {
      return null;
    }
  }

  async deleteChannelData(roomId: string) {
    let cursor = "0";
    do {
      const [nextCursor, keys] = await this.client.scan(
        cursor,
        "MATCH",
        `room:${roomId}:*`,
        "COUNT",
        10,
      );
      cursor = nextCursor;
      if (keys.length > 0) {
        await this.client.unlink(...keys);
      }
    } while (cursor !== "0");
  }

  async removeUserFromAllRooms(userId: string) {
    let cursor = "0";
    do {
      const [nextCursor, keys] = await this.client.scan(
        cursor,
        "MATCH",
        `room:*:user:${userId}`,
        "COUNT",
        10,
      );
      cursor = nextCursor;
      for (const key of keys) {
        const betAmount = await this.client.hget(key, "betAmount");
        if (!betAmount) {
          await this.client.del(key);
        }
      }
    } while (cursor !== "0");
  }

  async _xadd(streamKey: string, entryID: string, ...dataArr: string[]) {
    if (entryID === "*") entryID = randomUUID();
    if (dataArr.length % 2 !== 0) {
      console.error("Data should be in key-value pairs");
      return;
    }

    const entryKey = `stream:${streamKey}:${entryID}`;

    const data = dataArr.reduce(
      (acc, curr, index) => {
        if (index % 2 === 0) acc[curr as string] = dataArr[index + 1];
        return acc;
      },
      {} as Record<string, string>,
    );

    // TODO: transaction 시작
    await this.client.lpush(streamKey, entryKey);
    await this.client.hset(entryKey, data);
    await this.client.hset(entryKey, {
      event_status: "pending",
      event_retries: 0,
    });
    console.log("New message in stream:", streamKey);
    await this.publisher.publish("stream", streamKey);
  }

  async _xread(count: number, streamKey: string) {
    const messages = [];

    for (let i = 0; i < count; i++) {
      const entryID = await this.client.rpop(streamKey);
      if (!entryID) break;

      const fields = await this.client.hgetall(entryID);
      messages.push([entryID, fields]);
    }

    return [[streamKey, messages]];
  }

  // async _xack(streamKey: string, groupName: string, entryID: string) {}

  async addStreamEntry() {
    try {
      const streamName = "mystream";
      const messageId = "*"; // Redis에서 메시지 ID를 자동으로 생성하도록 '*' 사용
      const fields = {
        userId: "12345",
        action: "login",
      };

      // 스트림에 항목 추가
      const id = await this.client.xadd(
        streamName,
        messageId,
        ...Object.entries(fields).flat(),
      );
      console.log(`Added entry with ID: ${id}`);
    } catch (error) {
      console.error("Error adding to stream:", error);
    }
  }
}
