import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../infrastructure/users-repository';
import { UserStatus } from '../../../domain/entities/user.entity';

export class RemoveUserByAdminCommand {
  constructor(public userId: number) {}
}

@Injectable()
export class RemoveUserByAdminUsecase {
  constructor(@Inject(UsersRepository) protected repository: UsersRepository) {}

  async execute(command: RemoveUserByAdminCommand): Promise<void> {
    const user = await this.repository.findUserById(command.userId);
    if (!user) throw new Error('User does not exist');

    user.changeUserStatus(UserStatus.REMOVED);

    await this.repository.save(user);
  }
}
