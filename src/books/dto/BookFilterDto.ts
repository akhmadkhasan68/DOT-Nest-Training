import { Optional } from '@nestjs/common';

export class BookFilterDto {
  @Optional()
  keyword: string;

  @Optional()
  limit: number;
}
