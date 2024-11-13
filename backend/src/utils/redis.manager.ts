import { Injectable } from "@nestjs/common";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { Redis } from "ioredis"; // ioredis를 사용하여 타입 지정

@Injectable()
export class RedisManager {
  public client: Redis;

  constructor(private readonly redisService: RedisService) {
    this.client = this.redisService.getOrThrow("default");
  }

  async getUser(nickname: string) {
    const [ipAddr, role, joinAt] = await Promise.all([
      this.client.hget(`user:${nickname}`, "ipAddr"),
      this.client.hget(`user:${nickname}`, "role"),
      this.client.hget(`user:${nickname}`, "joinAt"),
    ]);
    return { nickname, ipAddr, role, joinAt };
  }

  async setUser({
    nickname,
    ipAddress,
    role,
    joinAt,
  }: {
    nickname: string;
    ipAddress: string;
    role: string;
    joinAt: string;
  }) {
    await this.client.hset(`user:${nickname}`, {
      nickname,
      ipAddress,
      role,
      joinAt,
    });
  }

  async addUserToRoom(roomId: string, nickname: string) {
    await this.client.rpush(`room:${roomId}:users`, nickname);
  }

  async removeUserFromRoom(roomId: string, nickname: string) {
    await this.client.lrem(`room:${roomId}:users`, 1, nickname);
  }

  async getRoomUsers(roomId: string) {
    return await this.client.lrange(`room:${roomId}:users`, 0, -1);
  }

  async setRoomStatus(roomId: string, status: string) {
    await this.client.hset(`room:${roomId}`, "status", status);
  }

  async getRoomStatus(roomId: string) {
    return await this.client.hget(`room:${roomId}`, "status");
  }

  async updateBetOption(roomId: string, option: string, betAmount: number) {
    await Promise.all([
      this.client.hincrby(
        `room:${roomId}:option:${option}`,
        "currentBets",
        betAmount,
      ),
      this.client.hincrby(`room:${roomId}:option:${option}`, "participants", 1),
    ]);
  }
}
