import { Injectable } from "@nestjs/common";
import { UserCredentialsDto } from "./user-credential.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async signUp(userCredentialsDto: UserCredentialsDto): Promise<void> {
    return this.userRepository.createUser(userCredentialsDto);
  }
}
