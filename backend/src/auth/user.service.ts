import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import {
  requestSignUpSchema,
  requestSignInSchema,
  requestGuestSignInSchema,
} from "@shared/schemas/users/request";
import { SignUpUserRequestDto } from "./dto/sign-up-user.dto";
import { SignInUserRequestDto } from "./dto/sign-in-user.dto";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(requestSignUp: SignUpUserRequestDto): Promise<void> {
    const { email, nickname, password } =
      requestSignUpSchema.parse(requestSignUp);
    const hashedPassword = await this.hashPassword(password);
    const user = {
      email,
      nickname,
      password: hashedPassword,
      duck: 300,
    };
    console.log(user);
    await this.userRepository.createUser(user);
  }

  async signIn(
    requestSignIn: SignInUserRequestDto,
  ): Promise<{ accessToken: string; nickname: string; role: string }> {
    const { nickname, password } = requestSignInSchema.parse(requestSignIn);
    const role = "user";
    const user = await this.userRepository.findOneByNickname(nickname);

    if (user && (await bcrypt.compare(password, user.password))) {
      // TODO: Redis에 user 저장 로직 추가
      const payload = {
        id: user.id,
        role: role,
      };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken, nickname, role };
    } else {
      throw new UnauthorizedException("login failed");
    }
  }

  async guestSignIn(
    requestGuestSignIn: Request,
  ): Promise<{ accessToken: string; nickname: string; role: string }> {
    const { nickname } = requestGuestSignInSchema.parse(
      requestGuestSignIn.body,
    );
    const role = "guest";
    const guestIdentifier = this.generateGuestIdentifier(requestGuestSignIn);
    // TODO: Redis에 guestIdentifier 조회 로직 추가
    // TODO: Redis에 guest 저장 로직 추가
    const payload = {
      id: guestIdentifier,
      role: role,
    };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, nickname, role };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private generateGuestIdentifier(request: Request): string {
    const clientIp =
      request.headers["x-forwarded-for"] || request.connection.remoteAddress;
    return "guest-" + clientIp;
  }
}
