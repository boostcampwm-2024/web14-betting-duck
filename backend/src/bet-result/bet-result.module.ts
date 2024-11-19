import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BetResultRepository } from "src/bet-result/bet-result.repository";
import { BetResult } from "./bet-result.entity";
import { BetResultController } from "./bet-result.controller";
import { BetResultService } from "./bet-result.service";

@Module({
  imports: [TypeOrmModule.forFeature([BetResult])],
  controllers: [BetResultController],
  providers: [BetResultService, BetResultRepository],
})
export class BetResultModule {}
