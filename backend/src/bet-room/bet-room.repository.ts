import { InternalServerErrorException, Injectable } from "@nestjs/common";
import { In, Repository } from "typeorm";
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

  async delete(betRoomId: string): Promise<void> {
    try {
      await this.betRoomRepository.delete(betRoomId);
    } catch {
      throw new InternalServerErrorException("베팅 방 삭제에 실패했습니다");
    }
  }

  async findUnfinishedRooms(): Promise<BetRoom[]> {
    try {
      return await this.betRoomRepository.find({
        where: {
          status: In(["waiting", "active", "timeover"]),
        },
        relations: ["bets", "bets.user"],
      });
    } catch {
      throw new InternalServerErrorException(
        "미완료 베팅방 조회에 실패했습니다.",
      );
    }
  }

  async updateRoomStatus(roomId: string, status: BetRoom["status"]) {
    try {
      return await this.betRoomRepository.update(roomId, { status });
    } catch {
      throw new InternalServerErrorException(
        "베팅방 상태 업데이트에 실패했습니다.",
      );
    }
  }
}
