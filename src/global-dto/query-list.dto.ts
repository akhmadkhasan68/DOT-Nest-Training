import { IsNotEmpty } from 'class-validator';

export class QueryListDto {
  @IsNotEmpty()
  page: number;
  @IsNotEmpty()
  pageSize: number;
}
