import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateDreamDto {
  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsBoolean()
  @IsOptional()
  readonly published: boolean;

  @IsInt()
  @IsPositive()
  readonly userId: number;

  @IsArray()
  @IsOptional()
  readonly likes: string[]
}
