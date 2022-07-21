import { IsNotEmpty, IsNumber } from 'class-validator';

export class BookRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  totalPage: number;

  @IsNotEmpty()
  categoryId: number;
}
