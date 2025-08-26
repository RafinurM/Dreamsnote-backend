import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  password: string;
}
