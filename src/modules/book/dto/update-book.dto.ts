import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  totalPages: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  year: number;

  @IsNotEmpty()
  categoryId: string;
}
