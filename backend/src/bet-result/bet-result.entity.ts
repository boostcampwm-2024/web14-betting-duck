import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";

import { BetRoom } from "../bet-room/bet-room.entity";

@Entity("bet_results")
export class BetResult extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToOne(() => BetRoom, (betRoom) => betRoom.betResult)
  @JoinColumn()
  betRoom: BetRoom;

  @Column()
  option1TotalBet: number;

  @Column()
  option2TotalBet: number;

  @Column()
  option1TotalParticipants: number;

  @Column()
  option2TotalParticipants: number;

  @Column({ type: "enum", enum: ["option1", "option2"] })
  winningOption: "option1" | "option2";

  @CreateDateColumn({ type: "timestamp", nullable: true })
  createdAt: Date;
}
