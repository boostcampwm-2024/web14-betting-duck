import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";
import { RedisManagerModule } from "src/utils/redis-manager.module";
import { DBManagerModule } from "src/utils/db.manager.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secret",
      signOptions: { expiresIn: "1h" },
    }),
    RedisManagerModule,
    DBManagerModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
