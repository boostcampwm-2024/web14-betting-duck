import { INestApplicationContext } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { Redis } from "ioredis";
import { RedisService } from "@liaoliaots/nestjs-redis";

export class RedisIoAdapter extends IoAdapter {
  private redisPublisher: Redis;
  private redisSubscriber: Redis;

  constructor(
    app: INestApplicationContext,
    private readonly redisService: RedisService,
  ) {
    super(app);
    this.redisPublisher = this.redisService.getOrThrow("publisher");
    this.redisSubscriber = this.redisService.getOrThrow("consumer");
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);
    const redisAdapter = createAdapter(
      this.redisPublisher,
      this.redisSubscriber,
    );
    server.adapter(redisAdapter);

    return server;
  }
}
