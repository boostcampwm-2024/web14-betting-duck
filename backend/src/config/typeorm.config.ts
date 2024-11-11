import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export const typeORMConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: "postgres",
    host:
      process.env.POSTGRES_HOSTNAME ||
      configService.get<string>("POSTGRES_HOSTNAME"),
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT, 10)
      : configService.get<number>("POSTGRES_PORT"),
    username:
      process.env.POSTGRES_USERNAME ||
      configService.get<string>("POSTGRES_USERNAME"),
    password:
      process.env.POSTGRES_PASSWORD ||
      configService.get<string>("POSTGRES_PASSWORD"),
    database:
      process.env.POSTGRES_DB_NAME ||
      configService.get<string>("POSTGRES_DB_NAME"),
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: process.env.POSTGRES_DB_NAME_DB_SYNCHRONIZE
      ? process.env.POSTGRES_DB_NAME_DB_SYNCHRONIZE.toLowerCase() === "true"
      : configService.get<boolean>("POSTGRES_DB_NAME_DB_SYNCHRONIZE"),
  };
};
