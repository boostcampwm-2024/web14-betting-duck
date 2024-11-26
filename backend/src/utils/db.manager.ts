import { Injectable } from "@nestjs/common";
import { RedisManager } from "src/utils/redis.manager";
import { User } from "src/auth/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class DBManager {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private redisManager: RedisManager,
  ) {
    this.getUserFromStream();
  }

  async setUser(user: Partial<User>) {
    const params = [];
    Object.entries(user).forEach(([key, value]) => {
      params.push(key, value);
    });

    this.redisManager._xadd("stream:users", "*", ...params);
  }

  async getUserFromStream() {
    console.log("---------------------");
    const event = await this.redisManager._xread(1, "stream:users", 10000);

    event[1].forEach(async (entry) => {
      const entryValue = entry[1];
      console.log("user: ", entryValue);
      delete entryValue.event_status;
      delete entryValue.event_retries;
      await this.userRepository.update(parseInt(entryValue.id), entryValue);
    });

    this.getUserFromStream();
  }
}
