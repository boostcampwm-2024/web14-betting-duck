import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Bet } from "src/bet/bet.entity";
import { BetRoom } from "src/bet-room/bet-room.entity";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  duck: number;

  @CreateDateColumn({ type: "timestamp", nullable: true })
  created_at: Date;

  @OneToMany(() => Bet, (bet) => bet.user)
  bets: Bet[];

  @OneToMany(() => BetRoom, (betRoom) => betRoom.manager)
  managedBetRooms: BetRoom[];
}
