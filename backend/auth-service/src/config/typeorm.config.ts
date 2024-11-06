import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.AUTH_POSTGRES_HOSTNAME,
    port: parseInt(process.env.AUTH_DATABASE_PORT, 10),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.AUTH_POSTGRES_DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}