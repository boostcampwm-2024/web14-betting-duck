import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BetRoomController } from "./bet-room.controller";
import { BetRoomService } from "./bet-room.service";
import { BetRoomRepository } from "./bet-room.repository";
import { UserRepository } from "src/auth/user.repository";
import { BetRoom } from "./bet-room.entity";
import { User } from "src/auth/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BetRoom, User])],
  controllers: [BetRoomController],
  providers: [BetRoomService, BetRoomRepository, UserRepository],
})
export class BetRoomModule {}
