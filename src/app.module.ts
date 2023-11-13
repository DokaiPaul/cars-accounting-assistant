import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { POSTGRESQL_CONFIGURATION } from './db/postgre-sql/connection.configuration';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [UsersModule, POSTGRESQL_CONFIGURATION, CqrsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
