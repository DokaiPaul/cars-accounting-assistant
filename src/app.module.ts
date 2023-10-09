import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { POSTGRESQL_CONFIGURATION } from './db/postgre-sql/connection.configuration';

@Module({
  imports: [UsersModule, POSTGRESQL_CONFIGURATION],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
