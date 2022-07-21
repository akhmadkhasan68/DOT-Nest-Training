import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookRequestDto } from './dto/BookRequestDto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Post()
  createBook(@Body() data: BookRequestDto) {
    return this.bookService.createBook(data);
  }
}
