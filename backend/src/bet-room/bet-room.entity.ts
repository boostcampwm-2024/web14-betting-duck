import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "src/auth/user.entity";
import { Bet } from "../bet/bet.entity";
import { BetResult } from "../bet-result/bet-result.entity";

@Entity("bet_rooms")
export class BetRoom extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (user) => user.managedBetRooms)
  manager: User;

  @Column({ length: 300 })
  title: string;

  @Column()
  defaultBetAmount: number;

  @Column({ length: 200 })
  option1: string;

  @Column({ length: 200 })
  option2: string;

  @Column({ type: "timestamp", nullable: true })
  startTime: Date;

  @Column({ type: "timestamp", nullable: true })
  endTime: Date;

  @Column({ type: "enum", enum: ["open", "closed", "pending"] })
  status: "open" | "closed" | "pending";

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  updatedAt: Date;

  @Column({ length: 200 })
  joinUrl: string;

  @Column({ type: "timestamp", nullable: true })
  timer: Date;

  @OneToMany(() => Bet, (bet) => bet.betRoom)
  bets: Bet[];

  @OneToMany(() => BetResult, (betResult) => betResult.betRoom)
  betResults: BetResult[];
}
