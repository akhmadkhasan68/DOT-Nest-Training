import { IsNotEmpty } from 'class-validator';

export class CategoryRequestDto {
  @IsNotEmpty()
  name: string;
}
