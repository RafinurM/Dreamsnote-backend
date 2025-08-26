import { IsArray, IsOptional } from 'class-validator';
import { Dream } from 'generated/prisma';

export class GetDreamsDto {
  @IsOptional()
  @IsArray()
  dreams?: Dream[];
}
