import { Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { ApiBody } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { SignUpUserRequestDto } from "./dto/sign-up-user.dto";
import { SignInUserRequestDto } from "./dto/sign-in-user.dto";

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
}
