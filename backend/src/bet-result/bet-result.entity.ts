import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

import { BetRoom } from "../bet-room/bet-room.entity";

@Entity("bet_results")
export class BetResult extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => BetRoom, (betRoom) => betRoom.betResults)
  betRoom: BetRoom;

  @Column({ nullable: true })
  option1TotalBet: number;

  @Column({ nullable: true })
  option2TotalBet: number;

  @Column({ nullable: true })
  option1TotalParticipants: number;

  @Column({ nullable: true })
  option2TotalParticipants: number;

  @Column({ type: "enum", enum: ["option1", "option2"] })
  winningOption: "option1" | "option2";

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt: Date;
}
