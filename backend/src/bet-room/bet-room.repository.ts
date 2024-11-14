import { InternalServerErrorException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BetRoom } from "./bet-room.entity";

@Injectable()
export class BetRoomRepository {
  constructor(
    @InjectRepository(BetRoom)
    private betRoomRepository: Repository<BetRoom>,
  ) {}

  async createBetRoom(betRoomData: Partial<BetRoom>): Promise<BetRoom> {
    const betRoom = this.betRoomRepository.create(betRoomData);
    try {
      return await this.betRoomRepository.save(betRoom);
    } catch {
      throw new InternalServerErrorException("베팅 방 생성에 실패했습니다.");
    }
  }
}
