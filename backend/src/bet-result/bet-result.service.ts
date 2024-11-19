import { Injectable } from "@nestjs/common";
import { BetResultRepository } from "src/bet-result/bet-result.repository";

@Injectable()
export class BetResultService {
  constructor(private betResultRepository: BetResultRepository) {}

  async findBetRoomById(betRoomId: string) {
    const betResult = await this.betResultRepository.findByBetRoomId(betRoomId);
    return {
      option_1_total_bet: betResult.option1TotalBet,
      option_2_total_bet: betResult.option2TotalBet,
      option_1_total_participants: betResult.option1TotalParticipants,
      option_2_total_participants: betResult.option2TotalParticipants,
      winning_option: betResult.winningOption,
      message: "OK",
    };
  }
}
