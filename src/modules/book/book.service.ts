import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category/entity/category.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async getDetailBook(id: string): Promise<Book> {
    const data = await this.bookRepository.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });

    if (!data) throw new NotFoundException('Data not found!');

    return data;
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { name, author, totalPages, year, categoryId } = createBookDto;
    const createBook = this.bookRepository.create();
    createBook.name = name;
    createBook.author = author;
    createBook.totalPages = totalPages;
    createBook.year = year;
    createBook.category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    return await this.bookRepository.save(createBook);
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const { name, author, totalPages, year, categoryId } = updateBookDto;
    const updateBook = await this.getDetailBook(id);
    updateBook.name = name;
    updateBook.author = author;
    updateBook.totalPages = totalPages;
    updateBook.year = year;
    updateBook.category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    return await this.bookRepository.save(updateBook);
  }

  async deleteBook(id: string): Promise<any> {
    const deletedData = await this.getDetailBook(id);
    return await this.bookRepository.delete({ id: deletedData.id });
  }
}
