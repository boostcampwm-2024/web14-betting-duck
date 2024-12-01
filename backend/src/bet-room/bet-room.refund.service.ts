import { Injectable, OnModuleInit } from "@nestjs/common";
import { BetRoomRepository } from "src/bet-room/bet-room.repository";
import { BetRepository } from "../bet/bet.repository";
import { UserRepository } from "src/auth/user.repository";
import { BetRoom } from "src/bet-room/bet-room.entity";
import { DataSource } from "typeorm";

@Injectable()
export class BetRoomRefundService implements OnModuleInit {
  constructor(
    private betRoomRepository: BetRoomRepository,
    private betRepository: BetRepository,
    private userRepository: UserRepository,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    try {
      // console.log(
      //   `[Nest] ${process.pid}  - ${timestamp}       LOG [LoggerMiddleware] Mapped {${originalUrl}, ${method}} route +${duration}ms`,
      // );
      console.log("서버 시작 시 미완료 베팅방 환불 프로세스 시작");
      await this.processUnfinishedRoomRefunds();
    } catch (error) {
      console.log("환불 프로세스 중 오류 발생", error);
    }
  }

  async processUnfinishedRoomRefunds() {
    const unfinishedRooms = await this.betRoomRepository.findUnfinishedRooms();
    console.log(`미완료 베팅방 수: ${unfinishedRooms.length}`);
    for (const room of unfinishedRooms) {
      if (room.status === "waiting") {
        await this.betRoomRepository.updateRoomStatus(room.id, "finished");
        console.log(`Room ${room.id} 상태를 finished로 변경`);
        continue;
      }
      await this.refundBetsForRoom(room);
    }
  }

  async refundBetsForRoom(room: BetRoom) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const pendingBets = await this.betRepository.findPendingBetsByRoom(
        room.id,
      );
      console.log(`Room ${room.id}의 pending 베팅 수: ${pendingBets.length}`);

      const betIdsToRefund: number[] = [];
      for (const bet of pendingBets) {
        await this.userRepository.refundDuck(bet.user.id, bet.betAmount);

        betIdsToRefund.push(bet.id);
        console.log(`사용자 ${bet.user.id}에게 ${bet.betAmount} duck 환불`);
      }

      // 베팅 상태를 refunded로 변경
      if (betIdsToRefund.length > 0) {
        await this.betRepository.bulkUpdateBetStatus(betIdsToRefund);
      }

      await this.betRoomRepository.updateRoomStatus(room.id, "finished");
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(`Room ${room.id} 환불 처리 중 오류 발생`, error);
    } finally {
      await queryRunner.release();
    }
  }
}
