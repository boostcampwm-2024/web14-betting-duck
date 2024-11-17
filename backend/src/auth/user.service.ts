import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import {
  requestSignUpSchema,
  requestSignInSchema,
} from "@shared/schemas/users/request";
import { SignUpUserDto } from "./dto/sign-up-user.dto";
import { SignInUserDto } from "./dto/sign-in-user.dto";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(requestSignUp: SignUpUserDto) {
    const { email, nickname, password } =
      requestSignUpSchema.parse(requestSignUp);
    const hashedPassword = await this.hashPassword(password);
    const user = {
      email,
      nickname,
      password: hashedPassword,
      duck: 300,
    };
    return this.userRepository.createUser(user);
  }

  async signIn(requestsignIn: SignInUserDto): Promise<{ accessToken: string }> {
    const { nickname, password } = requestSignInSchema.parse(requestsignIn);
    const user = await this.userRepository.findOneByNickname(nickname);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { nickname };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException("login failed");
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
