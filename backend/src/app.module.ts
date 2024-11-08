import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';

console.log(process.env.AUTH_POSTGRES_DB_NAME);

@Module({
	imports: [TypeOrmModule.forRoot(typeORMConfig)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
