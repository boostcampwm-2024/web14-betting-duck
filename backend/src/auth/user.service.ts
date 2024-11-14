import { Injectable } from "@nestjs/common";
import { UserCredentialsDto } from "./user-credential.dto";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async signUp(userCredentialsDto: UserCredentialsDto) {
    const { email, nickname, password } = userCredentialsDto;
    const hashedPassword = await this.hashPassword(password);
    const user = {
      email,
      nickname,
      password: hashedPassword,
      duck: 300,
    };
    return this.userRepository.createUser(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
