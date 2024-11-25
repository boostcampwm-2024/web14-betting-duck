import { Injectable } from "@nestjs/common";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { Redis } from "ioredis"; // ioredis를 사용하여 타입 지정
import { randomUUID } from "crypto";

@Injectable()
export class RedisManager {
  public client: Redis;
  public publisher: Redis;
  public consumer: Redis;

  constructor(private readonly redisService: RedisService) {
    this.client = this.redisService.getOrThrow("default");
    this.publisher = this.redisService.getOrThrow("publisher");
    this.consumer = this.redisService.getOrThrow("consumer");
    this.consumer.subscribe("stream");
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

  async deleteUser(userId: string) {
    await this.client.del(userId);
  }

  async nickNameExists(nickname: string): Promise<string | null> {
    let cursor = "0";

    do {
      const [nextCursor, keys] = await this.client.scan(
        cursor,
        "MATCH",
        "user:guest-*",
        "COUNT",
        "100",
      );
      cursor = nextCursor;

      for (const key of keys) {
        const userInfo = await this.client.hgetall(key);
        if (userInfo["nickname"] === nickname) {
          return key;
        }
      }
    } while (cursor !== "0");

    return null;
  }

  async setBettingUserOnJoin({
    userId,
    nickname,
    owner,
    roomId,
    role,
  }: {
    userId: string;
    nickname: string;
    owner: number;
    roomId: string;
    role: string;
  }) {
    await this.client.hset(`room:${roomId}:user:${userId}`, {
      nickname,
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
    const [nickname, betAmount, selectedOption, owner] = await Promise.all([
      this.client.hget(`room:${roomId}:user:${userId}`, "nickname"),
      this.client.hget(`room:${roomId}:user:${userId}`, "betAmount"),
      this.client.hget(`room:${roomId}:user:${userId}`, "selectedOption"),
      this.client.hget(`room:${roomId}:user:${userId}`, "owner"),
    ]);
    return { nickname, betAmount, selectedOption, owner };
  }

  async getRoomUserNicknames(roomId: string) {
    const key = `room:${roomId}:users`;
    const users = await this.client.lrange(key, 0, -1);
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

  async initializeBetRoomOnCreated(userId: string, roomId: string) {
    await Promise.all([
      this.client.set(`room:${roomId}:creator`, userId),
      this.client.set(`room:${roomId}:status`, "waiting"),
    ]);
  }

  async initializeBetRoomOnStart(roomId: string) {
    await Promise.all([
      this.client.hmset(`room:${roomId}:option1`, {
        participants: 0,
        currentBets: 0,
      }),
      this.client.hmset(`room:${roomId}:option2`, {
        participants: 0,
        currentBets: 0,
      }),
      this.client.set(`room:${roomId}:status`, "active"),
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

  async _xread(count: number, streamKey: string, blockTime: number) {
    const readStream = async (
      signal: AbortSignal,
      count: number,
      streamKey: string,
    ): Promise<[string, [string, Record<string, string>][]]> => {
      const entries: [string, Record<string, string>][] = [];
      let processedCount = 0;

      while (processedCount < count && !signal.aborted) {
        let entryKey = await this.client.lpop(streamKey);

        if (!entryKey) {
          await new Promise<void>((resolve) => {
            const abortHandler = () => {
              this.consumer.off("message", handleMessage);
              signal.removeEventListener("abort", abortHandler);
              resolve();
            };

            const handleMessage = (
              channel: string,
              messageStreamKey: string,
            ) => {
              if (messageStreamKey === streamKey) {
                this.consumer.off("message", handleMessage);
                signal.removeEventListener("abort", abortHandler);
                resolve();
              }
            };

            signal.addEventListener("abort", abortHandler);
            this.consumer.on("message", handleMessage);
          });

          if (signal.aborted) {
            return [streamKey, entries];
          }

          entryKey = await this.client.lpop(streamKey);
        }

        if (entryKey) {
          const fields = await this.client.hgetall(entryKey);
          entries.push([entryKey, fields]);
        }

        processedCount++;
      }

      return [streamKey, entries];
    };

    return new Promise<[string, [string, Record<string, string>][]]>(
      (resolve, reject) => {
        const controller = new AbortController();
        const { signal } = controller;

        readStream(signal, count, streamKey).then(resolve).catch(reject);

        setTimeout(() => {
          controller.abort();
          console.log("Operation timed out");
        }, blockTime);
      },
    );
  }

  // 개선 이전의 _xread 메서드
  // async _xread(count: number, streamKey: string) {
  //   const messages = [];

  //   for (let i = 0; i < count; i++) {
  //     const entryID = await this.client.rpop(streamKey);
  //     if (!entryID) break;

  //     const fields = await this.client.hgetall(entryID);
  //     messages.push([entryID, fields]);
  //   }

  //   return [[streamKey, messages]];
  // }

  // async _xack(streamKey: string, groupName: string, entryID: string) {}
}
