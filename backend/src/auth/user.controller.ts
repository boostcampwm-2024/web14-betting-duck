import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import { SignUpUserDto } from "./dto/sign-up-user.dto";
import { SignInUserDto } from "./dto/sign-in-user.dto";

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/signup")
  async signUp(@Body() requestSignUp: SignUpUserDto, @Res() res: Response) {
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
    @Body() requestLogin: SignInUserDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(requestLogin);
  }
}
