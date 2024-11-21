import { InternalServerErrorException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
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
}
