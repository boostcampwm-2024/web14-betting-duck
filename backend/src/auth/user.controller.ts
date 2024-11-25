import {
  Body,
  Controller,
  HttpStatus,
  Get,
  Post,
  Req,
  Res,
  Param,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
// import { JwtUserAuthGuard } from "src/utils/guards/http-user-authenticated.guard";
import { JwtGuestAuthGuard } from "src/utils/guards/http-guest-authenticated.guard";
import { UserService } from "./user.service";
import { SignUpUserRequestDto } from "./dto/sign-up-user.dto";
import { SignInUserRequestDto } from "./dto/sign-in-user.dto";
import { UpgradeGuestRequestDto } from "./dto/upgrade-guest.dto";

@Controller("/api/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/signup")
  async signUp(@Body() body: SignUpUserRequestDto, @Res() res: Response) {
    await this.userService.signUp(body);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: {
        message: "CREATED",
      },
    });
  }

  @Post("/signin")
  async signIn(@Body() body: SignInUserRequestDto, @Res() res: Response) {
    const result = await this.userService.signIn(body);
    res.cookie("access_token", result.accessToken, {
      httpOnly: true, // JavaScript에서 접근할 수 없도록 설정 (보안 목적)
      maxAge: 1000 * 60 * 60, // 쿠키의 유효 기간 (1시간)
      secure: false, // HTTPS를 통해서만 전송되도록 설정 (프로덕션에서 추천)
      // sameSite: "strict", // CSRF 공격 방지를 위한 설정
    });
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }

  @Post("/guestsignin")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        nickname: { type: "string" },
      },
    },
  })
  async guestSignIn(@Req() req: Request, @Res() res: Response) {
    const result = await this.userService.guestSignIn(req);
    res.cookie("access_token", result.accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      secure: false,
      // sameSite: "strict",
    });
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }

  @UseGuards(JwtGuestAuthGuard)
  @Get("/signout")
  async signOut(@Req() req: Request, @Res() res: Response) {
    await this.userService.signOut(req, res);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
      },
    });
  }

  @UseGuards(JwtGuestAuthGuard)
  @Get("/token")
  async getAccessToken(@Req() req: Request, @Res() res: Response) {
    const accessToken = req.cookies["access_token"];
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        accessToken: accessToken,
      },
    });
  }

  @ApiOperation({ summary: "사용자 정보 조회" })
  @UseGuards(JwtGuestAuthGuard)
  @Get("/userInfo")
  async getUserInfo(@Req() req: Request, @Res() res: Response) {
    const result = await this.userService.getUserInfo(req);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }

  @ApiOperation({ summary: "비회원 로그인 이력 조회" })
  @Get("/guestloginactivity")
  async guestLoginActivity(@Req() req: Request, @Res() res: Response) {
    const result = await this.userService.getGuestLoginActivity(req);
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }

  @ApiOperation({ summary: "닉네임 중복검사" })
  @Get("/exists/:nickname")
  async guestExists(@Param("nickname") nickname: string, @Res() res: Response) {
    const result = await this.userService.checkNicknameExists(nickname);
    const status = result.exists
      ? HttpStatus.OK
      : HttpStatus.NON_AUTHORITATIVE_INFORMATION;
    return res.status(status).json({
      status: status,
      data: {
        message: result.exists ? "OK" : "NON_AUTHORITATIVE_INFORMATION",
        ...result,
      },
    });
  }

  @ApiOperation({ summary: "비회원을 회원으로 업그레이드" })
  @UseGuards(JwtGuestAuthGuard)
  @Post("/upgradeguest")
  async upgradeGuest(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: UpgradeGuestRequestDto,
  ) {
    await this.userService.upgradeGuest(req, res, body);
  }

  // 테스트용 API
  @ApiOperation({ summary: "특정 사용자 duck 업데이트" })
  @UseGuards(JwtGuestAuthGuard)
  @Get("/updateDuck/:duck")
  async updateDuck(
    @Req() req: Request,
    @Res() res: Response,
    @Param("duck") duck: number,
  ) {
    const result = await this.userService.updateDuck(req, duck);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }
}
