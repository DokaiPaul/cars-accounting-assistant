import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

class EntityMetadata {
  @Column('timestamp')
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  updatedAt: Date | null;

  @Column()
  version: number;
}

@Entity('users')
export class UserEntity extends EntityMetadata {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 20, unique: true })
  login: string;
  @Column('varchar', { length: 100, unique: true })
  email: string;
  @Column()
  passwordHash: string;
  @Column('int')
  status: UserStatus;
  @Column({ nullable: true, type: 'varchar' })
  confirmationCode: string | null;

  confirmEmail(code: string): boolean {
    if (this.confirmationCode !== code) return false;

    this.status = UserStatus.ACTIVE;
    this.confirmationCode = null;

    return true;
  }

  changeUserStatus(status: UserStatus): void {
    if (!(status in UserStatus))
      throw new Error(`Passed value does not exist as user status.`);
    if (status === UserStatus.UNCONFIRMED)
      throw new Error(`User can not be unconfirmed again.`);

    this.status = status;
    this.updatedAt = new Date();
    this.version++;
  }

  changePasswordHash(newHash: string): void {
    if (typeof newHash !== 'string')
      throw new Error('New Hash should be a string.');

    this.passwordHash = newHash;
    this.updatedAt = new Date();
    this.version++;
  }
}

export enum UserStatus {
  UNCONFIRMED = 0,
  ACTIVE = 1,
  BANNED = 2,
  REMOVED = 3,
}

enum SubscriptionType {
  BASIC,
  PREMIUM,
}
