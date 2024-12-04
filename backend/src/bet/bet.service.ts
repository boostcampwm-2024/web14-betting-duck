import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { BetRepository } from "./bet.repository";
import { User } from "src/auth/user.entity";
import { BetRoom } from "src/bet-room/bet-room.entity";
import { PlaceBetDto } from "./dto/placeBetDto";
import { BetGateway } from "./bet.gateway";
import { RedisManager } from "src/utils/redis.manager";
import { UserRepository } from "src/auth/user.repository";

interface Channel {
  creator: string;
  status: string;
  option1: Record<string, string>;
  option2: Record<string, string>;
}

@Injectable()
export class BetService {
  constructor(
    private readonly betRepository: BetRepository,
    private betGateway: BetGateway,
    private userRepository: UserRepository,
    private redisManager: RedisManager,
  ) {}

  async placeBet(req: Request, placeBetDto: PlaceBetDto) {
    const { sender, channel } = placeBetDto;
    const userId = req["user"].id;
    const userRole = req["user"].role;
    const betAmount = sender.betAmount;

    await this.validateUserDuck(userId, betAmount);

    const targetChannel = await this.redisManager.getChannelData(
      channel.roomId,
    );

    if (targetChannel && targetChannel.status === "active") {
      const selectedOption =
        sender.selectOption === "option1"
          ? targetChannel.option1
          : targetChannel.option2;

      if (selectedOption) {
        const deductedDuck = await this.redisManager.deductDuck(
          userId,
          betAmount,
        );

        if (userRole === "user") {
          await this.saveUserDeductedDuck(userId, deductedDuck);
        }
        await this.redisManager.increaseBettingInfo(
          channel.roomId,
          sender.selectOption,
          betAmount,
        );

        const updatedChannel = await this.getUpdatedChannel(
          channel.roomId,
          targetChannel,
        );

        this.betGateway.server.to(channel.roomId).emit("fetchBetRoomInfo", {
          channel: updatedChannel,
        });

        await this.redisManager.setBettingUserOnBet({
          userId,
          roomId: channel.roomId,
          betAmount: sender.betAmount,
          selectedOption: sender.selectOption,
        });

        if (userRole === "user") {
          const betData = {
            user: { id: userId } as User,
            betRoom: { id: placeBetDto.channel.roomId } as BetRoom,
            betAmount: placeBetDto.sender.betAmount,
            selectedOption: placeBetDto.sender.selectOption,
          };
          const savedBet = await this.betRepository.saveBet(betData);
          return {
            betAmount: savedBet.betAmount,
            selectedOption: savedBet.selectedOption,
            betRoom: { id: savedBet.betRoom.id },
            status: savedBet.status,
          };
        }
        return {
          betAmount: sender.betAmount,
          selectedOption: sender.selectOption,
          status: "pending",
        };
      } else {
        throw new BadRequestException("해당 유저를 찾을 수 없습니다.");
      }
    } else {
      throw new BadRequestException(
        "해당하는 채널이 존재하지 않거나 활성 상태가 아닙니다.",
      );
    }
  }

  private async validateUserDuck(userId: number, betAmount: number) {
    const userInfo = await this.getUserInfo(userId);
    const userDuck = userInfo.duck;

    if (!userDuck || userDuck < betAmount) {
      throw new BadRequestException("보유한 duck이 부족합니다.");
    }
  }

  private async getUpdatedChannel(roomId: string, targetChannel: Channel) {
    const [updatedOption1, updatedOption2] = await Promise.all([
      this.redisManager.client.hgetall(`room:${roomId}:option1`),
      this.redisManager.client.hgetall(`room:${roomId}:option2`),
    ]);

    const updatedChannel = {
      creator: targetChannel.creator,
      status: targetChannel.status,
      option1: updatedOption1,
      option2: updatedOption2,
    };
    return updatedChannel;
  }

  private async saveUserDeductedDuck(userId: number, deductedDuck: number) {
    if (deductedDuck < 0) {
      throw new BadRequestException("베팅 이후 남은 금액이 0보다 작습니다.");
    }
    await this.userRepository.update(userId, { duck: deductedDuck });
  }

  private async getUserInfo(userId: number) {
    const cachedUserInfo = await this.redisManager.getUser(String(userId));
    if (cachedUserInfo?.nickname) {
      return {
        ...cachedUserInfo,
        duck: Number(cachedUserInfo.duck),
      };
    }
    const userInfo = await this.userRepository.findOneById(userId);
    if (userInfo) {
      return userInfo;
    }
    throw new NotFoundException("해당 유저를 찾을 수 없습니다.");
  }

  async getBetDetail(req: Request, betRoomId: string) {
    const userId = req["user"].id;
    const userRole = req["user"].role;
    const cachedBetDetails = await this.redisManager.getBettingUser(
      String(userId),
      betRoomId,
    );

    if (cachedBetDetails.nickname) {
      const { betAmount, selectedOption } = cachedBetDetails;
      return { betAmount: Number(betAmount), selectedOption };
    }

    if (userRole === "user") {
      const betDetails = await this.betRepository.findByUserAndRoom(
        userId,
        betRoomId,
      );
      if (betDetails) {
        const { betAmount, selectedOption } = betDetails;
        return { betAmount, selectedOption };
      }
    }
    throw new NotFoundException("해당 유저 베팅 내역을 찾을 수 없습니다.");
  }
}
