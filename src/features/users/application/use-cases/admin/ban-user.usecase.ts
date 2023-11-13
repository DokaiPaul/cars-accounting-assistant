import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../infrastructure/users-repository';
import { UserStatus } from '../../../domain/entities/user.entity';

export class BanUserByAdminCommand {
  constructor(
    public dto: { id: number; status: UserStatus; banReason: null | string },
  ) {}
}

@Injectable()
export class BanUserByAdminUsecase {
  constructor(@Inject(UsersRepository) protected repository: UsersRepository) {}

  async execute(command: BanUserByAdminCommand): Promise<void> {
    const { id, status, banReason } = command.dto;
    const user = await this.repository.findUserById(id);

    if (!user) throw new Error('User does not exist');

    user.changeUserStatus(status);
    if (banReason)
      /**add ban reason into special log */

      await this.repository.save(user);
  }
}
