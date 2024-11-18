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
  async signUp(
    @Body() requestSignUp: SignUpUserRequestDto,
    @Res() res: Response,
  ) {
    await this.userService.signUp(requestSignUp);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: {
        message: "CREATED",
      },
    });
  }

  @Post("/signin")
  signIn(@Body() requestLogin: SignInUserRequestDto, @Res() res: Response) {
    const result = this.userService.signIn(requestLogin);
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
  async guestSignIn(@Req() requestGuestSignUp: Request, @Res() res: Response) {
    const result = await this.userService.guestSignIn(requestGuestSignUp);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.OK,
      data: {
        message: "OK",
        ...result,
      },
    });
  }
}
