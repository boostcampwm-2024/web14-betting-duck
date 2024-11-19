import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { swaggerConfig } from "./config/swagger.config";
import { GlobalHttpExceptionFilter } from "./utils/filters/global-http-exception-filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerConfig(app);
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
}
bootstrap();
