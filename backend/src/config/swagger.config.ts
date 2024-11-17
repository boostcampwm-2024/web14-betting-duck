import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { patchNestJsSwagger } from "nestjs-zod";

export const swaggerConfig = (app: INestApplication): void => {
  patchNestJsSwagger();
  const options = new DocumentBuilder()
    .setTitle("Betting Duck API Docs")
    .setDescription("Betting Duck API description")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);
};
