import {
  ConflictException,
  InternalServerErrorException,
  Injectable,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCredentialsDto } from "./user-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(userCredentialsDto: UserCredentialsDto): Promise<void> {
    const { email, nickname, password } = userCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
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
