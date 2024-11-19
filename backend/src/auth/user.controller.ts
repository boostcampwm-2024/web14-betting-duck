import {
  Body,
  Controller,
  HttpStatus,
  Get,
  Post,
  Req,
  Res,
  Param,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { SignUpUserRequestDto } from "./dto/sign-up-user.dto";
import { SignInUserRequestDto } from "./dto/sign-in-user.dto";
import { CheckNicknameExistsDto } from "./dto/check-nickname-exists.dto";

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
    return res.status(HttpStatus.CREATED).json({
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
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }

  @Get("/:userId")
  async getUserInfo(@Param("userId") userId: number, @Res() res: Response) {
    const result = await this.userService.getUserInfo(userId);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }

  @ApiOperation({ summary: "비회원 로그인 이력 조회" })
  @Post("/guestloginactivity")
  async guestLoginActivity(@Req() req: Request, @Res() res: Response) {
    const result = await this.userService.getGuestLoginActivity(req);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }

  @ApiOperation({ summary: "닉네임 중복검사" })
  @Post("/nicknameexists")
  async guestExists(
    @Body() body: CheckNicknameExistsDto,
    @Res() res: Response,
  ) {
    const result = await this.userService.checkNicknameExists(body);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }
}
