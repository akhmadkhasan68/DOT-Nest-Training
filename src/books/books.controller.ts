import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Post()
  createBook(
    @Body('name') name: string,
    @Body('author') author: string,
    @Body('total_page') totalPage: number,
    @Body('category') category: string,
  ) {
    return this.bookService.createBook(name, author, totalPage, category);
  }
}
