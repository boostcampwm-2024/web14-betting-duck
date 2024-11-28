import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RedisManager } from "src/utils/redis.manager";
import { User } from "src/auth/user.entity";
import { Bet } from "src/bet/bet.entity";

@Injectable()
export class DBManager {
  private userStreamKey: string;
  private betStreamKey: string;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Bet)
    private readonly betRepository: Repository<Bet>,
    private redisManager: RedisManager,
  ) {
    this.userStreamKey = "users";
    this.betStreamKey = "bets";
    this.getUserFromStream();
    this.getBetFromStream();
  }

  async setUser(userId: number, user: Partial<User>) {
    const params = ["id", String(userId)];
    Object.entries(user).forEach(([key, value]) => {
      params.push(key, String(value));
    });

    this.redisManager._xadd(this.userStreamKey, "*", ...params);
  }

  async setBet(betId: number, bet: Partial<Bet>) {
    const params = ["id", String(betId)];
    Object.entries(bet).forEach(([key, value]) => {
      params.push(key, String(value));
    });

    this.redisManager._xadd(this.betStreamKey, "*", ...params);
  }

  async getUserFromStream() {
    const event = await this.redisManager._xread(1, this.userStreamKey, 10000);
    event[1].forEach(async (entry) => {
      const [entryKey, fields] = entry;
      delete fields.stream_key;
      delete fields.event_status;
      delete fields.event_retries;
      await this.userRepository.update(parseInt(fields.id), fields);

      this.redisManager._xack(this.userStreamKey, entryKey);
    });

    this.getUserFromStream();
  }

  async getBetFromStream() {
    const event = await this.redisManager._xread(1, this.betStreamKey, 10000);
    event[1].forEach(async (entry) => {
      const [entryKey, fields] = entry;
      delete fields.stream_key;
      delete fields.event_status;
      delete fields.event_retries;
      await this.betRepository.update(parseInt(fields.id), fields);

      this.redisManager._xack(this.betStreamKey, entryKey);
    });

    this.getBetFromStream();
  }
}
