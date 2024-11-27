import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisManagerModule } from "src/utils/redis-manager.module";
import { User } from "src/auth/user.entity";
import { DBManager } from "./db.manager";

@Module({
  imports: [TypeOrmModule.forFeature([User]), RedisManagerModule],
  providers: [DBManager],
  exports: [DBManager],
})
export class DBManagerModule {}
