import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/entity/category.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';
import { User } from '../user/entity/user.entity';
import { QueryListDto } from '../../global-dto/query-list.dto';
import { ListResult } from 'src/interfaces/listresult.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllBooks(
    user: User,
    query: QueryListDto,
  ): Promise<ListResult<Book>> {
    const { page, pageSize } = query;
    const [list, count] = await this.bookRepository.findAndCount({
      order: { id: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        user: {
          id: user.id,
        },
      },
      relations: ['user'],
    });

    return {
      list,
      count,
      page,
      pageSize,
    };
  }

  async getDetailBook(id: string, user: User): Promise<Book> {
    const data = await this.bookRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
      relations: ['user'],
    });

    if (!data) throw new NotFoundException('Data not found!');

    return data;
  }

  async createBook(createBookDto: CreateBookDto, user: User): Promise<Book> {
    const { name, author, totalPages, year, categoryId } = createBookDto;
    const createBook = this.bookRepository.create();
    createBook.name = name;
    createBook.author = author;
    createBook.totalPages = totalPages;
    createBook.year = year;
    createBook.category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    createBook.user = user;

    return await this.bookRepository.save(createBook);
  }

  async updateBook(
    id: string,
    user: User,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const { name, author, totalPages, year, categoryId } = updateBookDto;
    const updateBook = await this.getDetailBook(id, user);
    updateBook.name = name;
    updateBook.author = author;
    updateBook.totalPages = totalPages;
    updateBook.year = year;
    updateBook.category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    updateBook.user = user;

    return await this.bookRepository.save(updateBook);
  }

  async deleteBook(id: string, user: User): Promise<any> {
    const deletedData = await this.getDetailBook(id, user);
    return await this.bookRepository.delete({ id: deletedData.id });
  }
}
