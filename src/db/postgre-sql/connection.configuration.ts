import { TypeOrmModule } from '@nestjs/typeorm';

export const POSTGRESQL_CONFIGURATION = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  autoLoadEntities: true,
  synchronize: true,
});
