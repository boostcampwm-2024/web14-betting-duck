import { ConfigService } from "@nestjs/config";
import { RedisModuleOptions } from "@liaoliaots/nestjs-redis";

export const redisConfig = async (
  configService: ConfigService,
): Promise<RedisModuleOptions> => {
  return {
    config: {
      host: configService.get<string>("REDIS_HOSTNAME") || "localhost",
      port: configService.get<number>("REDIS_PORT") || 6379,
      // password: configService.get<string>('REDIS_PASSWORD') || '',
    },
  };
};
