import { Module } from "@nestjs/common";
import { BetGateway } from "./bet.gateway";

@Module({
  providers: [BetGateway],
})
export class BetModule {}
