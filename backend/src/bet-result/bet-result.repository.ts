import { InternalServerErrorException, Injectable } from "@nestjs/common";
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
}
