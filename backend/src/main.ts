import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { swaggerConfig } from "./config/swagger.config";
import { GlobalHttpExceptionFilter } from "./utils/filters/global-http-exception.filter";
import { LoggerMiddleware } from "./utils/middlewares/logger.middleware";
import * as cookieParser from "cookie-parser";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { RedisIoAdapter } from "./utils/redis-io-adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const redisService = app.get(RedisService);
  const redisIoAdapter = new RedisIoAdapter(app, redisService);
  app.useWebSocketAdapter(redisIoAdapter);

  swaggerConfig(app);
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.use(new LoggerMiddleware().use);
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}
bootstrap();
