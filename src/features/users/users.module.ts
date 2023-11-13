import { Module } from '@nestjs/common';
import { AdminUsersController } from './api/admin/users.controller';
import { CreateUserByAdminUsecase } from './application/use-cases/admin/create-user.usecase';
import { UsersRepository } from './infrastructure/users-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { BanUserByAdminUsecase } from './application/use-cases/admin/ban-user.usecase';
import { RemoveUserByAdminUsecase } from './application/use-cases/admin/remove-user.usecase';
import { UsersQueryRepository } from './infrastructure/users-query-repository';
import { CqrsModule } from '@nestjs/cqrs';

const entities = [UserEntity];
const queryRepositories = [UsersQueryRepository];
const repositories = [UsersRepository];
const useCases = [
  CreateUserByAdminUsecase,
  BanUserByAdminUsecase,
  RemoveUserByAdminUsecase,
];
@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(entities)],
  controllers: [AdminUsersController],
  providers: [...useCases, ...repositories, ...queryRepositories],
})
export class UsersModule {}
