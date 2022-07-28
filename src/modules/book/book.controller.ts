import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import { User } from '../user/entity/user.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';

@Controller('book')
@UseGuards(JwtGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(@GetUser() user: User): Promise<Book[]> {
    console.log(user);
    return this.bookService.getAllBooks();
  }

  @Get('/:id')
  async getDetailBook(@Param('id') id: string): Promise<Book> {
    return await this.bookService.getDetailBook(id);
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookService.createBook(createBookDto);
  }

  @Put('/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return await this.bookService.updateBook(id, updateBookDto);
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return await this.bookService.deleteBook(id);
  }
}
