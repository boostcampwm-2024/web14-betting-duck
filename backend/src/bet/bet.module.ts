import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BetGateway } from "./bet.gateway";
import { RedisManagerModule } from "src/utils/redis-manager.module";
import { JwtUtils } from "src/utils/jwt.utils";
import { BetService } from "./bet.service";
import { BetRepository } from "./bet.repository";
import { Bet } from "./bet.entity";
import { BetController } from "./bet.controller";
import { UserModule } from "src/auth/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Bet]), RedisManagerModule, UserModule],
  controllers: [BetController],
  providers: [BetGateway, JwtUtils, BetService, BetRepository],
  exports: [BetGateway, BetRepository],
})
export class BetModule {}
