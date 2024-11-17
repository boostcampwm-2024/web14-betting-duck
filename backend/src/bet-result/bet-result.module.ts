import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BetResultRepository } from "src/bet-result/bet-result.repository";
import { BetResult } from "./bet-result.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BetResult])],
  providers: [BetResultRepository],
})
export class BetResultModule {}
