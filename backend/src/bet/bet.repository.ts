import { InternalServerErrorException, Injectable } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Bet } from "./bet.entity";

@Injectable()
export class BetRepository {
  constructor(
    @InjectRepository(Bet)
    private betRepository: Repository<Bet>,
  ) {}

  async saveBet(betData: Partial<Bet>): Promise<Bet> {
    const bet = this.betRepository.create(betData);
    try {
      return await this.betRepository.save(bet);
    } catch {
      throw new InternalServerErrorException("베팅 내역 저장이 실패했습니다.");
    }
  }

  async update(id: number, partialEntity: Partial<Bet>) {
    try {
      return await this.betRepository.update(id, partialEntity);
    } catch {
      throw new InternalServerErrorException(
        "베팅 상태 업데이트에 실패했습니다.",
      );
    }
  }

  async findByUserAndRoom(userId: number, roomId: string): Promise<Bet | null> {
    try {
      return await this.betRepository.findOne({
        where: {
          user: { id: userId },
          betRoom: { id: roomId },
        },
      });
    } catch {
      throw new InternalServerErrorException(
        "베팅을 조회하는 데 실패했습니다.",
      );
    }
  }

  async findPendingBetsByRoom(roomId: string): Promise<Bet[]> {
    try {
      return await this.betRepository.find({
        where: {
          betRoom: { id: roomId },
          status: "pending",
        },
        relations: ["user"],
      });
    } catch {
      throw new InternalServerErrorException(
        "pending 베팅 조회에 실패했습니다.",
      );
    }
  }

  async bulkUpdateBetStatus(betIds: number[]) {
    try {
      return await this.betRepository.update(
        { id: In(betIds) },
        {
          status: "refunded",
          settledAmount: 0,
        },
      );
    } catch {
      throw new InternalServerErrorException(
        "베팅 상태 일괄 업데이트에 실패했습니다.",
      );
    }
  }
}
