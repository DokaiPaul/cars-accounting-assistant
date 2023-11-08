import { IsString, Length } from 'class-validator';

export class BanUserDto {
  @IsString()
  @Length(10, 150)
  banReason: string;
}
