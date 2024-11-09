import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export const typeORMConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: "postgres",
    host: configService.get<string>("POSTGRES_HOSTNAME"),
    port: configService.get<number>("POSTGRES_PORT"),
    username: configService.get<string>("POSTGRES_USERNAME"),
    password: configService.get<string>("POSTGRES_PASSWORD"),
    database: configService.get<string>("POSTGRES_DB_NAME"),
    entities: [__dirname + "/../**/*.entity.{js,ts}"],
    synchronize: configService.get<boolean>("POSTGRES_DB_NAME_DB_SYNCHRONIZE"),
  };
};
