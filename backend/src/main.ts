import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { swaggerConfig } from "./config/swagger.config";
import { GlobalHttpExceptionFilter } from "./utils/filters/global-http-exception.filter";
import { LoggerMiddleware } from "./utils/middlewares/logger.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerConfig(app);
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.use(new LoggerMiddleware().use);
  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}
bootstrap();
