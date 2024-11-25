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

  async createBetRoom(userId: number, createBetRoomDto: CreateBetRoomDto) {
    const creatorID = userId;
    const manager = await this.userRepository.findOneById(creatorID);
    if (!manager) {
      throw new NotFoundException("해당하는 유저를 찾을 수 없습니다.");
    }
    const roomUUID = uuidv4();

    const joinUrl = `http://175.45.205.245/voting/${roomUUID}/waiting`;

    const betRoomData = {
      id: roomUUID,
      title: createBetRoomDto.channel.title,
      option1: createBetRoomDto.channel.options.option1,
      option2: createBetRoomDto.channel.options.option2,
      defaultBetAmount: createBetRoomDto.channel.settings.defaultBetAmount,
      timer: createBetRoomDto.channel.settings.duration,
      manager,
      joinUrl,
      status: "waiting" as "waiting" | "active" | "timeover" | "finished",
    };
    await this.redisManager.initializeBetRoomOnCreated(
      String(userId),
      roomUUID,
    );
    const createdRoom = await this.betRoomRepository.createBetRoom(betRoomData);

    return createdRoom;
  }

  async updateBetRoom(
    userId: number,
    betRoomId: string,
    updateBetRoomDto: UpdateBetRoomDto,
  ): Promise<void> {
    await this.assertBetRoomAccess(betRoomId, userId);

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

  async startBetRoom(userId: number, betRoomId: string) {
    await this.assertBetRoomAccess(betRoomId, userId);

    const betRoom = await this.betRoomRepository.findOneById(betRoomId);
    const duration = betRoom.timer;

    const startTime = new Date(new Date().getTime());
    const endTime = new Date(startTime.getTime() + Number(duration) * 1000);

    const updateResult = await this.betRoomRepository.update(betRoomId, {
      status: "active",
      startTime: startTime,
      endTime: endTime,
    });

    await this.redisManager.initializeBetRoomOnStart(betRoomId);

    this.betGateway.server.to(betRoomId).emit("startBetting", {
      message: "베팅이 시작되었습니다.",
      roomId: betRoomId,
    });

    setTimeout(
      async () => {
        await this.redisManager.setRoomStatus(betRoomId, "timeover");
        this.betGateway.server.to(betRoomId).emit("timeover", {
          message: "베팅 시간이 종료되었습니다.",
          roomId: betRoomId,
        });
      },
      Number(duration) * 1000,
    );

    return updateResult;
  }

  async finishBetRoom(
    userId: number,
    betRoomId: string,
    winningOption: "option1" | "option2",
  ) {
    await this.assertBetRoomAccess(betRoomId, userId);

    const updateResult = await this.betRoomRepository.update(betRoomId, {
      status: "finished",
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

  async findBetRoomById(betRoomId: string) {
    const betRoom = await this.betRoomRepository.findOneById(betRoomId);
    if (!betRoom) {
      throw new NotFoundException(
        `해당하는 베팅방이 존재하지 않습니다. Id: ${betRoomId}`,
      );
    }
    return {
      id: betRoom.id,
      title: betRoom.title,
      creator: {
        id: betRoom.manager.id,
      },
      options: {
        option1: {
          name: betRoom.option1,
        },
        option2: {
          name: betRoom.option2,
        },
      },
      status: betRoom.status,
      settings: {
        defaultBetAmount: betRoom.defaultBetAmount,
        duration: betRoom.timer,
      },
      metadata: {
        createdAt: betRoom.createdAt,
        startAt: betRoom.startTime,
        endAt: betRoom.endTime,
      },
      urls: {
        invite: betRoom.joinUrl,
      },
    };
  }

  async deleteBetRoom(betRoomId: string, userId: number): Promise<void> {
    const betRoom = await this.betRoomRepository.findOneById(betRoomId);
    await this.assertBetRoomAccess(betRoomId, userId);

    if (betRoom && betRoom.status !== "waiting") {
      throw new ForbiddenException("베팅룸의 상태가 waiting이 아닙니다.");
    }
    this.betGateway.server.to(betRoomId).emit("cancelWaitingRoom", {
      message: "베팅이 취소되었습니다.",
      roomId: betRoomId,
    });
    await this.betRoomRepository.delete(betRoomId);
    await this.redisManager.deleteChannelData(betRoomId);
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
      throw new ForbiddenException("접근 권한이 없습니다.");
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

        const userIdMatch = key.match(/user:(.+)$/);
        const userId = userIdMatch ? userIdMatch[1] : null;
        const { owner, betAmount, selectedOption, role } = userData;

        if (owner === "1" || !betAmount || !selectedOption) {
          console.log("pass");
          return;
        }

        const duck = await this.redisManager.client.hget(
          `user:${userId}`,
          "duck",
        );

        const isWinner = selectedOption === winningOption;
        const duckChange = isWinner ? Number(betAmount) * winningOdds : 0;
        const updatedDuck = duck
          ? Number(duck) - Number(betAmount) + duckChange
          : duckChange;

        await this.redisManager.client.hset(`user:${userId}`, {
          duck: updatedDuck,
        });

        if (role === "user") {
          await this.userRepository.update(Number(userId), {
            duck: updatedDuck,
          });
        }
      });

      await Promise.all(userUpdates);
    } while (cursor !== "0");
  }
}
