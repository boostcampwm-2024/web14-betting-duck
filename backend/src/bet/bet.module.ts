import { Module } from "@nestjs/common";
import { BetGateway } from "./bet.gateway";
import { RedisManagerModule } from "src/utils/redis-manager.module";
import { JwtUtils } from "src/utils/jwt.utils";

@Module({
  imports: [RedisManagerModule],
  providers: [BetGateway, JwtUtils],
  exports: [BetGateway],
})
export class BetModule {}
