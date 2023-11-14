import { Inject } from '@nestjs/common';
import { CreateUserDto } from '../../../dto/create-user.dto';
import { UserEntity, UserStatus } from '../../../domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../../../infrastructure/users-repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class CreateUserByAdminCommand {
  constructor(public dto: CreateUserDto) {}
}

@CommandHandler(CreateUserByAdminCommand)
export class CreateUserByAdminUsecase
  implements ICommandHandler<CreateUserByAdminCommand>
{
  constructor(@Inject(UsersRepository) protected repository: UsersRepository) {}
  async execute(command: CreateUserByAdminCommand): Promise<number> {
    const { password, login, email } = command.dto;

    const isEmailUnique = await this.checkEmailUnique(email);
    const isLoginUnique = await this.checkLoginUnique(login);
    if (!isEmailUnique || !isLoginUnique)
      throw new Error('Email or login is not unique.');

    const hash = await this.hashPassword(password, 10);

    const user = new UserEntity();

    user.email = email;
    user.login = login;
    user.passwordHash = hash;
    user.status = UserStatus.ACTIVE;
    user.version = 1;
    user.createdAt = new Date();
    user.confirmationCode = null;

    const result = await this.repository.save(user);
    const userId = result.id;

    return userId;
  }

  private async hashPassword(
    password: string,
    rounds: number,
  ): Promise<string> {
    if (typeof password !== 'string')
      throw new Error('Password should be a string.');
    if (typeof rounds !== 'number')
      throw new Error('Rounds should be a number.');
    const salt = await bcrypt.genSalt(rounds);

    return bcrypt.hash(password, salt);
  }

  private async checkLoginUnique(login: string): Promise<boolean> {
    const user = await this.repository.findUserByLogin(login);
    return user === null;
  }
  private async checkEmailUnique(email: string): Promise<boolean> {
    const user = await this.repository.findUserByEmail(email);
    return user === null;
  }
}
