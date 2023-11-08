import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../features/users/domain/entities/user.entity';

export const POSTGRESQL_CONFIGURATION = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'sa',
  database: 'cars-accounting-assistant',
  entities: [UserEntity],
  autoLoadEntities: true,
  synchronize: true,
});
