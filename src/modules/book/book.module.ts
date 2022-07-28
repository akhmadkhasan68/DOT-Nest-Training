import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entity/category.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
