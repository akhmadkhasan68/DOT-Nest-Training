import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookFilterDto } from './dto/BookFilterDto';
import { BookRequestDto } from './dto/BookRequestDto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  async getAllBooks(@Query() params: BookFilterDto) {
    return await this.bookService.getAllBooks(params);
  }

  @Get('/:id')
  async getDetailBook(@Param('id') id: string) {
    return await this.bookService.getDetailBook(id);
  }

  @Post()
  createBook(@Body() data: BookRequestDto) {
    return this.bookService.createBook(data);
  }

  @Put('/:id')
  updateBook(@Param('id') id: string, @Body() data: BookRequestDto) {
    return this.bookService.updateBook(id, data);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }

  // @Post()
  // createBook(@Body() data: BookRequestDto) {
  //   return this.bookService.createBook(data);
  // }
}
