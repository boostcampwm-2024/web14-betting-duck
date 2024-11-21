import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { Request } from "express";
import { RedisManager } from "src/utils/redis.manager";
import { UserRepository } from "./user.repository";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import {
  requestSignUpSchema,
  requestSignInSchema,
  requestGuestSignInSchema,
  requestNicknameExistsSchema,
} from "@shared/schemas/users/request";
import { SignUpUserRequestDto } from "./dto/sign-up-user.dto";
import { SignInUserRequestDto } from "./dto/sign-in-user.dto";
import { CheckNicknameExistsDto } from "./dto/check-nickname-exists.dto";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private redisManager: RedisManager,
  ) {}

  async signUp(body: SignUpUserRequestDto): Promise<void> {
    const { email, nickname, password } = requestSignUpSchema.parse(body);
    const hashedPassword = await this.hashPassword(password);
    const user = {
      email,
      nickname,
      password: hashedPassword,
      duck: 300,
    };
    await this.userRepository.createUser(user);
  }

  async signIn(body: SignInUserRequestDto): Promise<{
    accessToken: string;
    email: string;
    nickname: string;
    role: string;
  }> {
    const { email, password } = requestSignInSchema.parse(body);
    const role = "user";
    const user = await this.userRepository.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const nickname = user.nickname;

      await this.redisManager.setUser({
        userId: String(user.id),
        nickname: nickname,
        role: role,
        duck: user.duck,
      });

      const payload = {
        id: user.id,
        role: role,
      };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken, email, nickname, role };
    } else {
      throw new UnauthorizedException("login failed");
    }
  }

  async guestSignIn(
    req: Request,
  ): Promise<{ accessToken: string; nickname: string; role: string }> {
    const { nickname } = requestGuestSignInSchema.parse(req.body);
    const role = "guest";
    const guestIdentifier = this.generateGuestIdentifier(req);

    if (await this.redisManager.findUser(guestIdentifier)) {
      const userInfo = await this.redisManager.getUser(guestIdentifier);
      if (userInfo.nickname !== nickname) {
        throw new UnauthorizedException("Already signed in");
      }
    } else {
      await this.redisManager.setUser({
        userId: guestIdentifier,
        nickname: nickname,
        role: role,
        duck: 300,
      });
    }

    const payload = {
      id: guestIdentifier,
      role: role,
    };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, nickname, role };
  }

  async getUserInfo(req: Request) {
    // TODO: 사용자 인증 필요, 자신의 정보만 조회 가능하도록
    console.log(req["user"]);
    const userId = req["user"].id;

    const cachedUserInfo = await this.redisManager.getUser(String(userId));
    if (cachedUserInfo?.nickname) {
      return cachedUserInfo;
    }

    const userInfo = await this.userRepository.findOneById(userId);
    if (userInfo) {
      return userInfo;
    }

    throw new NotFoundException("해당 유저를 찾을 수 없습니다.");
  }

  async getGuestLoginActivity(req: Request) {
    const guestIdentifier = this.generateGuestIdentifier(req);
    const userInfo = await this.redisManager.getUser(guestIdentifier);
    if (userInfo.role === "guest") {
      return {
        loggedInBefore: true,
        nickname: userInfo.nickname,
      };
    } else {
      return {
        loggedInBefore: false,
        nickname: null,
      };
    }
  }

  async checkNicknameExists(body: CheckNicknameExistsDto) {
    const { nickname } = requestNicknameExistsSchema.parse(body);
    return {
      exists: (await this.userRepository.findOneByNickname(nickname))
        ? true
        : false,
    };
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

  // 테스트용 메서드
  async updateDuck(req: Request, duck: number) {
    const userId = req["user"].id;
    const role = req["user"].role;
    const user = await this.redisManager.getUser(String(userId));
    if (role === "user") await this.userRepository.update(userId, { duck });
    // await this.redisManager.setUser({
    //   ...user,
    //   userId: userId,
    // });
    const newUserInfo = {
      userId: userId,
      nickname: user.nickname,
      role: user.role,
      duck: duck,
    };
    await this.redisManager.setUser(newUserInfo);

    return newUserInfo;
  }
}
