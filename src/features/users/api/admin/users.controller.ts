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
import { CreateUserByAdminUsecase } from '../../application/use-cases/admin/create-user.usecase';
import { BanUserByAdminUsecase } from '../../application/use-cases/admin/ban-user.usecase';
import { RemoveUserByAdminUsecase } from '../../application/use-cases/admin/remove-user.usecase';
import { UserStatus } from '../../domain/entities/user.entity';
import { BanUserDto } from '../../dto/ban-use.dto';
import { UsersQueryRepository } from '../../infrastructure/users-query-repository';

@Controller('users/admin')
export class AdminUsersController {
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly createUserByAdmin: CreateUserByAdminUsecase,
    private readonly banUserByAdmin: BanUserByAdminUsecase,
    private readonly removeUserByAdmin: RemoveUserByAdminUsecase,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.createUserByAdmin.execute(createUserDto);
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

    await this.banUserByAdmin.execute(+id, status, reason);
    return;
  }

  @Put('unban/:id')
  async unbanUserById(@Param('id') id: string) {
    const status = UserStatus.ACTIVE;
    await this.banUserByAdmin.execute(+id, status);
    return;
  }

  @Delete(':id')
  async removeUserById(@Param('id') id: string) {
    await this.removeUserByAdmin.execute(+id);
    return;
  }
}
