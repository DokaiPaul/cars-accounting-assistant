import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../infrastructure/users-repository';
import { UserStatus } from '../../../domain/entities/user.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class BanUserByAdminCommand {
  constructor(
    public dto: { id: number; status: UserStatus; banReason: null | string },
  ) {}
}

@CommandHandler(BanUserByAdminCommand)
export class BanUserByAdminUsecase
  implements ICommandHandler<BanUserByAdminCommand>
{
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
