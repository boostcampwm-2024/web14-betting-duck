import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "src/auth/user.entity";
import { BetRoom } from "../bet-room/bet-room.entity";

@Entity("bets")
export class Bet extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (user) => user.bets)
  user: User;

  @ManyToOne(() => BetRoom, (betRoom) => betRoom.bets)
  betRoom: BetRoom;

  @Column()
  betAmount: number;

  @Column({ nullable: true })
  settledAmount?: number;

  @Column({
    type: "enum",
    enum: ["pending", "settled", "refunded"],
    default: "pending",
  })
  status: "pending" | "settled" | "refunded";

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "enum", enum: ["option1", "option2"] })
  selectedOption: "option1" | "option2";
}
