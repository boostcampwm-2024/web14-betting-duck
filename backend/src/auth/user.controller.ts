import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { UserCredentialsDto } from "./user-credential.dto";
import { UserService } from "./user.service";
import { Response } from "express";

@Controller("/api/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/signup")
  async signUp(
    @Body() userCredentialsDto: UserCredentialsDto,
    @Res() res: Response,
  ) {
    await this.userService.signUp(userCredentialsDto);
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: {
        message: "Created",
      },
    });
  }
}
