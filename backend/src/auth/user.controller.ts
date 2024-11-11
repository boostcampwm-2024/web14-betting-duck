import { Body, Controller, Post } from "@nestjs/common";
import { UserCredentialsDto } from "./user-credential.dto";
import { UserService } from "./user.service";

@Controller("/api/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/signup")
  signUp(@Body() userCredentialsDto: UserCredentialsDto): Promise<void> {
    return this.userService.signUp(userCredentialsDto);
  }
}
