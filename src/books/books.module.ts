import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './repository/books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BooksRepository])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
