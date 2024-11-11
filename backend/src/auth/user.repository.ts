import {
  ConflictException,
  InternalServerErrorException,
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
  async createUser(
    email: string,
    nickname: string,
    hashedPassword: string,
  ): Promise<void> {
    const user = this.userRepository.create({
      email,
      nickname,
      password: hashedPassword,
      duck: 300,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("이미 등록된 이메일입니다.");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
