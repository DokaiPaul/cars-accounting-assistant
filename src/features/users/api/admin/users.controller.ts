import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { CreateUserByAdminCommand } from '../../application/use-cases/admin/create-user.usecase';
import { BanUserByAdminCommand } from '../../application/use-cases/admin/ban-user.usecase';
import { RemoveUserByAdminCommand } from '../../application/use-cases/admin/remove-user.usecase';
import { UserStatus } from '../../domain/entities/user.entity';
import { BanUserDto } from '../../dto/ban-use.dto';
import { UsersQueryRepository } from '../../infrastructure/users-query-repository';
import { CommandBus } from '@nestjs/cqrs';

@Controller('users/admin')
export class AdminUsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly usersQueryRepository: UsersQueryRepository,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserByAdminCommand(createUserDto));
  }

  @Get()
  async findAllUsers() {
    return;
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    const user = await this.usersQueryRepository.findUserById(+id);
    return user;
  }

  @Put('ban/:id')
  async banUserById(@Param('id') id: string, @Body() banUserDto: BanUserDto) {
    const status = UserStatus.BANNED;
    const reason = banUserDto.banReason;

    const dto = { id: +id, status, banReason: reason };
    await this.commandBus.execute(new BanUserByAdminCommand(dto));
    return;
  }

  @Put('unban/:id')
  async unbanUserById(@Param('id') id: string) {
    const status = UserStatus.ACTIVE;

    const dto = { id: +id, status, banReason: null };
    await this.commandBus.execute(new BanUserByAdminCommand(dto));
    return;
  }

  @Delete(':id')
  async removeUserById(@Param('id') id: string) {
    await this.commandBus.execute(new RemoveUserByAdminCommand(+id));
    return;
  }
}
