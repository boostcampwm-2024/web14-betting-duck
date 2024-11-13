import { Module } from "@nestjs/common";
import { RedisManager } from "./redis.manager";

@Module({
  providers: [RedisManager],
  exports: [RedisManager],
})
export class RedisManagerModule {}
