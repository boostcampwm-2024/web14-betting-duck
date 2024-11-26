import { ConfigService } from "@nestjs/config";
import { RedisModuleOptions } from "@liaoliaots/nestjs-redis";

export const redisConfig = async (
  configService: ConfigService,
): Promise<RedisModuleOptions> => {
  const REDIS_HOSTNAME =
    configService.get<string>("REDIS_HOSTNAME") || "localhost";
  const REDIS_PORT = configService.get<number>("REDIS_PORT") || 6379;

  return {
    config: [
      {
        namespace: "default", // client
        host: REDIS_HOSTNAME,
        port: REDIS_PORT,
      },
      {
        namespace: "publisher",
        host: REDIS_HOSTNAME,
        port: REDIS_PORT,
      },
      {
        namespace: "consumer",
        host: REDIS_HOSTNAME,
        port: REDIS_PORT,
      },
    ],
  };
};
