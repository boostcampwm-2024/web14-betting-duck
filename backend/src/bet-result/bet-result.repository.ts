import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BetResult } from "./bet-result.entity";

@Injectable()
export class BetResultRepository {
  constructor(
    @InjectRepository(BetResult)
    private betResultRepository: Repository<BetResult>,
  ) {}

  async saveBetResult(betResultData: Partial<BetResult>): Promise<BetResult> {
    const betResult = this.betResultRepository.create(betResultData);
    try {
      return await this.betResultRepository.save(betResult);
    } catch {
      throw new InternalServerErrorException("베팅 결과 저장이 실패했습니다.");
    }
  }

  async findByBetRoomId(betRoomId: string): Promise<BetResult | null> {
    try {
      const betResult = await this.betResultRepository.findOne({
        where: { betRoom: { id: betRoomId } },
        relations: ["betRoom"],
      });
      if (!betResult) {
        throw new NotFoundException(
          `베팅방 아이디에 해당하는 베팅 결과가 없습니다. ${betRoomId}`,
        );
      }
      return betResult;
    } catch {
      throw new InternalServerErrorException("베팅 방 조회에 실패했습니다.");
    }
  }
}
