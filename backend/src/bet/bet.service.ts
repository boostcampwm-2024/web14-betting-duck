import { Injectable } from "@nestjs/common";
import { BetRepository } from "./bet.repository";
import { User } from "src/auth/user.entity";
import { BetRoom } from "src/bet-room/bet-room.entity";

@Injectable()
export class BetService {
  constructor(private readonly betRepository: BetRepository) {}

  async saveBet(
    userId: number,
    roomId: string,
    betAmount: number,
    selectedOption: "option1" | "option2",
  ) {
    const betData = {
      user: { id: userId } as User,
      betRoom: { id: roomId } as BetRoom,
      betAmount,
      selectedOption,
    };
    return await this.betRepository.saveBet(betData);
  }
}
