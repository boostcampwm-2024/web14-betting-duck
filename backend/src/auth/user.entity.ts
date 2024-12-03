import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Bet } from "src/bet/bet.entity";
import { BetRoom } from "src/bet-room/bet-room.entity";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  password: string;

  @Column()
  duck: number;

  @Column()
  realDuck: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  created_at: Date;

  @OneToMany(() => Bet, (bet) => bet.user)
  bets: Bet[];

  @OneToMany(() => BetRoom, (betRoom) => betRoom.manager)
  managedBetRooms: BetRoom[];
}
