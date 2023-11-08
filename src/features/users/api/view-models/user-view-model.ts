import { UserStatus } from '../../domain/entities/user.entity';

export type UserViewModel = {
  id: number;
  email: string;
  login: string;
  createdAt: string;
  status: UserStatus;
};
