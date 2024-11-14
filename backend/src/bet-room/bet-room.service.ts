import { Injectable } from "@nestjs/common";
import { BetRoomRepository } from "./bet-room.repository";
import { UserRepository } from "src/auth/user.repository";
import { CreateBetRoomDto } from "./dto/create-bet-room.dto";
import { v4 as uuidv4 } from "uuid";
import { RedisManager } from "src/utils/redis.manager";

@Injectable()
export class BetRoomService {
  constructor(
    private betRoomRepository: BetRoomRepository,
    private userRepository: UserRepository,
    private redisManager: RedisManager,
  ) {}

  async createBetRoom(createBetRoomDto: CreateBetRoomDto) {
    //TODO: JWT 토큰에서 추출
    const creatorID = 8;
    const manager = await this.userRepository.findOne(creatorID);

    const roomUUID = uuidv4();
    //TODO: 도메인 주소 변경
    const joinUrl = `http://bettingduck.com/room/${roomUUID}`;

    const betRoomData = {
      id: roomUUID,
      title: createBetRoomDto.channel.title,
      option1: createBetRoomDto.channel.options.option1,
      option2: createBetRoomDto.channel.options.option2,
      defaultBetAmount: createBetRoomDto.channel.settings.defaultBetAmount,
      timer: createBetRoomDto.channel.settings.duration,
      manager,
      joinUrl,
      status: "waiting" as "waiting" | "active" | "finished",
    };
    const createdRoom = await this.betRoomRepository.createBetRoom(betRoomData);
    await this.redisManager.initializeBetRoom(roomUUID, manager.nickname);

    return createdRoom;
  }
}
