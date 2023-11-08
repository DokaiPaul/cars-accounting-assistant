import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { POSTGRESQL_CONFIGURATION } from './db/postgre-sql/connection.configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './features/users/domain/entities/user.entity';

@Module({
  imports: [UsersModule, POSTGRESQL_CONFIGURATION],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
