import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  Injectable,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: Partial<User>): Promise<void> {
    const newUser = this.userRepository.create(user);

    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === "23505") {
        if (error.detail.includes("email")) {
          throw new ConflictException("이미 등록된 이메일입니다.");
        } else if (error.detail.includes("nickname")) {
          throw new ConflictException("이미 등록된 닉네임입니다.");
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOneById(id: number): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch {
      throw new NotFoundException("해당 유저를 찾을 수 없습니다.");
    }
  }

  async findOneByNickname(nickname: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({ where: { nickname } });
    } catch {
      throw new NotFoundException("해당 유저를 찾을 수 없습니다.");
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch {
      throw new NotFoundException("해당 유저를 찾을 수 없습니다.");
    }
  }

  async update(userId: number, partialEntity: Partial<User>) {
    try {
      return await this.userRepository.update(userId, partialEntity);
    } catch {
      throw new InternalServerErrorException(
        "사용자 정보 업데이트에 실패했습니다.",
      );
    }
  }

  async refundDuck(userId: number, amount: number) {
    try {
      return await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          duck: () => `duck + ${amount}`,
        })
        .where("id = :userId", { userId })
        .execute();
    } catch {
      throw new InternalServerErrorException(
        "duck 포인트 증가 처리에 실패했습니다.",
      );
    }
  }
}
