import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import {
  requestSignUpType,
  requestSignInType,
} from "@shared/schemas/users/request";

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/signup")
  async signUp(@Body() requestSignUp: requestSignUpType, @Res() res: Response) {
    await this.userService.signUp(requestSignUp);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: {
        message: "Created",
      },
    });
  }

  @Post("/signin")
  signIn(
    @Body() requestLogin: requestSignInType,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(requestLogin);
  }
}
