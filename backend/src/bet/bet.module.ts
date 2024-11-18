import { Module } from "@nestjs/common";
import { BetGateway } from "./bet.gateway";
import { RedisManagerModule } from "src/utils/redis-manager.module";

@Module({
  imports: [RedisManagerModule],
  providers: [BetGateway],
  exports: [BetGateway],
})
export class BetModule {}
