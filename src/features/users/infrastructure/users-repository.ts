import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../domain/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity) protected repository: Repository<UserEntity>,
  ) {}

  async save(user: UserEntity): Promise<UserEntity> {
    return this.repository.save(user);
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    return this.repository.findOneBy({ id: id });
  }

  async findUserByLogin(login: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ login: login });
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ email: email });
  }
}
