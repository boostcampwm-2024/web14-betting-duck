import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./config/typeorm.config";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { redisConfig } from "./config/redis.config";
import { UserModule } from "./auth/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChatModule } from "./chat/chat.module";
import { BetModule } from "./bet/bet.module";
import { BetRoomModule } from "./bet-room/bet-room.module";
import { BetResultModule } from "./bet-result/bet-result.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await typeORMConfig(configService),
    }),
    RedisModule.forRootAsync({
      useFactory: redisConfig,
      inject: [ConfigService],
    }),
    UserModule,
    ChatModule,
    BetModule,
    BetRoomModule,
    BetResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
