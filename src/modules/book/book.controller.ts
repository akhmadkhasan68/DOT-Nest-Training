import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ListResult } from 'src/interfaces/listresult.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { User } from '../user/entity/user.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { QueryListDto } from '../../global-dto/query-list.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';

@Controller('book')
@UseGuards(JwtGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(
    @GetUser() user: User,
    @Query() query: QueryListDto,
  ): Promise<ResponseInterface<ListResult<Book>>> {
    const data = await this.bookService.getAllBooks(user, query);
    return { message: 'OK', data };
  }

  @Get('/:id')
  async getDetailBook(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ResponseInterface<Book>> {
    const data = await this.bookService.getDetailBook(id, user);
    return { message: 'OK', data };
  }

  @Post()
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @GetUser() user: User,
  ): Promise<ResponseInterface<Book>> {
    const data = await this.bookService.createBook(createBookDto, user);
    return { message: 'OK', data };
  }

  @Put('/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @GetUser() user: User,
  ): Promise<ResponseInterface<Book>> {
    const data = await this.bookService.updateBook(id, user, updateBookDto);
    return { message: 'OK', data };
  }

  @Delete('/:id')
  async deleteBook(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ResponseInterface<Book>> {
    const data = await this.bookService.deleteBook(id, user);
    return { message: 'OK', data };
  }
}
