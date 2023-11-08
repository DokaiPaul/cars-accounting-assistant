import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../infrastructure/users-repository';
import { UserStatus } from '../../../domain/entities/user.entity';

@Injectable()
export class RemoveUserByAdminUsecase {
  constructor(@Inject(UsersRepository) protected repository: UsersRepository) {}

  async execute(userId: number): Promise<void> {
    const user = await this.repository.findUserById(userId);
    if (!user) throw new Error('User does not exist');

    user.changeUserStatus(UserStatus.REMOVED);

    await this.repository.save(user);
  }
}
