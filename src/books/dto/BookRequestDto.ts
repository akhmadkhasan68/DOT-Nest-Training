import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class BookRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  year: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  totalPage: number;

  @IsNotEmpty()
  categoryId: string;
}
