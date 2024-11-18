import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { BetRoomRepository } from "./bet-room.repository";
import { BetResultRepository } from "src/bet-result/bet-result.repository";
import { UserRepository } from "src/auth/user.repository";
import { CreateBetRoomDto } from "./dto/create-bet-room.dto";
import { UpdateBetRoomDto } from "./dto/update-bet-room.dto";
import { v4 as uuidv4 } from "uuid";
import { RedisManager } from "src/utils/redis.manager";
import { BetRoom } from "./bet-room.entity";
import { BetResult } from "src/bet-result/bet-result.entity";
import { BetGateway } from "src/bet/bet.gateway";

@Injectable()
export class BetRoomService {
  constructor(
    private betRoomRepository: BetRoomRepository,
    private betResultRepository: BetResultRepository,
    private userRepository: UserRepository,
    private redisManager: RedisManager,
    private betGateway: BetGateway,
  ) {}

  async createBetRoom(createBetRoomDto: CreateBetRoomDto) {
    //TODO: JWT 토큰에서 추출
    const creatorID = 8;
    const manager = await this.userRepository.findOne(creatorID);
    if (!manager) {
      throw new NotFoundException("해당하는 유저를 찾을 수 없습니다.");
    }
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

    await this.redisManager.initializeBetRoom(roomUUID, String(manager.id));
    return createdRoom;
  }

  async updateBetRoom(
    betRoomId: string,
    updateBetRoomDto: UpdateBetRoomDto,
  ): Promise<void> {
    const userId = 8;
    this.assertBetRoomAccess(betRoomId, userId);

    const updatedFields: Partial<BetRoom> = {};
    if (updateBetRoomDto.channel?.title) {
      updatedFields.title = updateBetRoomDto.channel.title;
    }
    if (updateBetRoomDto.channel?.options) {
      updatedFields.option1 = updateBetRoomDto.channel.options.option1;
      updatedFields.option2 = updateBetRoomDto.channel.options.option2;
    }
    if (updateBetRoomDto.channel?.settings) {
      updatedFields.timer = updateBetRoomDto.channel.settings.duration;
      updatedFields.defaultBetAmount =
        updateBetRoomDto.channel.settings.defaultBetAmount;
    }
    await this.betRoomRepository.update(betRoomId, updatedFields);
  }

  async startBetRoom(betRoomId: string) {
    //TODO: JWT 토큰에서 추출
    const userId = 8;
    this.assertBetRoomAccess(betRoomId, userId);

    const updateResult = await this.betRoomRepository.update(betRoomId, {
      status: "active",
      startTime: new Date(new Date().getTime()),
    });

    await this.redisManager.setRoomStatus(betRoomId, "active");
    return updateResult;
  }

  async finishBetRoom(betRoomId: string, winningOption: "option1" | "option2") {
    //TODO: JWT 토큰에서 추출
    const userId = 8;
    this.assertBetRoomAccess(betRoomId, userId);

    const updateResult = await this.betRoomRepository.update(betRoomId, {
      status: "finished",
      endTime: new Date(new Date().getTime()),
    });
    await this.redisManager.setRoomStatus(betRoomId, "finished");

    const {
      channel,
      option1Participants,
      option2Participants,
      option1TotalBet,
      option2TotalBet,
    } = await this.getBettingTotals(betRoomId);
    await this.saveBetResult(
      betRoomId,
      winningOption,
      option1TotalBet,
      option2TotalBet,
      option1Participants,
      option2Participants,
    );
    const winningOdds = this.calculateWinningOdds(channel, winningOption);

    this.betGateway.server.to(betRoomId).emit("finished", {
      message: "베팅이 종료되었습니다.",
      roomId: betRoomId,
      winningOption: winningOption,
      winningOdds: winningOdds,
    });

    await this.settleBetRoom(betRoomId, winningOption, winningOdds);
    await this.redisManager.deleteChannelData(betRoomId);

    return updateResult;
  }

  private async getBettingTotals(betRoomId: string) {
    const channel = await this.redisManager.getChannelData(betRoomId);
    if (!channel) {
      throw new Error(`채널 데이터를 찾을 수 없습니다. roomId: ${betRoomId}`);
    }
    const option1Participants = Number(channel.option1.participants);
    const option2Participants = Number(channel.option2.participants);
    const option1TotalBet = Number(channel.option1.currentBets);
    const option2TotalBet = Number(channel.option2.currentBets);

    return {
      channel,
      option1Participants,
      option2Participants,
      option1TotalBet,
      option2TotalBet,
    };
  }

  private async saveBetResult(
    betRoomId: string,
    winningOption: "option1" | "option2",
    option1TotalBet: number,
    option2TotalBet: number,
    option1Participants: number,
    option2Participants: number,
  ) {
    const betResult: Partial<BetResult> = {
      betRoom: { id: betRoomId } as BetRoom,
      option1TotalBet: option1TotalBet,
      option2TotalBet: option2TotalBet,
      option1TotalParticipants: option1Participants,
      option2TotalParticipants: option2Participants,
      winningOption: winningOption,
    };
    await this.betResultRepository.saveBetResult(betResult);
  }

  private async assertBetRoomAccess(betRoomId: string, userId: number) {
    const betRoom = await this.betRoomRepository.findOneById(betRoomId);
    if (!betRoom) {
      throw new NotFoundException("베팅 방을 찾을 수 없습니다.");
    }
    if (betRoom.manager.id !== userId) {
      throw new ForbiddenException("베팅 방에 접근할 권한이 없습니다.");
    }
  }

  private calculateWinningOdds(channel, winningOption: "option1" | "option2") {
    const winningOptionTotalBet =
      winningOption === "option1"
        ? Number(channel.option1.currentBets)
        : Number(channel.option2.currentBets);

    const losingOptionTotalBet =
      winningOption === "option1"
        ? Number(channel.option2.currentBets)
        : Number(channel.option1.currentBets);

    if (winningOptionTotalBet === 0) {
      return 0;
    }
    const winningOdds =
      (winningOptionTotalBet + losingOptionTotalBet) / winningOptionTotalBet;
    return winningOdds;
  }

  private async settleBetRoom(
    roomId: string,
    winningOption: string,
    winningOdds: number,
  ) {
    let cursor = "0";
    do {
      const [nextCursor, keys] = await this.redisManager.client.scan(
        cursor,
        "MATCH",
        `room:${roomId}:user:*`,
        "COUNT",
        20,
      );
      cursor = nextCursor;

      const userUpdates = keys.map(async (key) => {
        const userData = await this.redisManager.client.hgetall(key);
        const userId = Number(key.split(":").pop());
        const { betAmount, selectedOption, duck } = userData;

        const isWinner = selectedOption === winningOption;
        const duckChange = isWinner ? Number(betAmount) * winningOdds : 0;
        const updatedDuck = duck
          ? Number(duck) - Number(betAmount) + duckChange
          : duckChange;
        // DB 업데이트 (배팅 결과 처리)
        await this.userRepository.update(userId, {
          duck: updatedDuck,
        });
      });

      await Promise.all(userUpdates);
    } while (cursor !== "0");
  }
}
