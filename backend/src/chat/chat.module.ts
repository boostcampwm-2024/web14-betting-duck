import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { RedisManagerModule } from "src/utils/redis-manager.module";

@Module({
  imports: [RedisManagerModule],
  providers: [ChatGateway],
})
export class ChatModule {}
