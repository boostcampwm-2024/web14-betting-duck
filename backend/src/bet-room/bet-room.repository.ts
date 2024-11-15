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

  async findOneById(betRoomId: string): Promise<BetRoom | null> {
    try {
      return await this.betRoomRepository.findOne({
        where: { id: betRoomId },
        relations: ["manager"],
      });
    } catch {
      throw new InternalServerErrorException("베팅 방 조회에 실패했습니다.");
    }
  }

  async update(id: string, partialEntity: Partial<BetRoom>) {
    try {
      return await this.betRoomRepository.update(id, partialEntity);
    } catch {
      throw new InternalServerErrorException(
        "베팅 방 업데이트에 실패했습니다.",
      );
    }
  }
}
