import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { UserViewModel } from '../api/view-models/user-view-model';

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectRepository(UserEntity) protected repository: Repository<UserEntity>,
  ) {}

  async findUserById(id: number): Promise<UserViewModel> {
    const user = await this.repository.findOneBy({ id: id });
    if (!user) throw new Error('User is not found');

    const userToViewModel: UserViewModel = {
      id: user.id,
      login: user.login,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      status: user.status,
    };

    return userToViewModel;
  }
}
