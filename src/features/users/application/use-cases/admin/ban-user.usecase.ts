import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../infrastructure/users-repository';
import { UserStatus } from '../../../domain/entities/user.entity';

@Injectable()
export class BanUserByAdminUsecase {
  constructor(@Inject(UsersRepository) protected repository: UsersRepository) {}

  async execute(
    userId: number,
    status: UserStatus,
    banReason?: string | null,
  ): Promise<void> {
    const user = await this.repository.findUserById(userId);

    if (!user) throw new Error('User does not exist');

    user.changeUserStatus(status);
    /** if(bunReason) add ban reason into special log */

    await this.repository.save(user);
  }
}
