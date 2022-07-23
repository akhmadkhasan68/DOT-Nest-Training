import { Injectable } from '@nestjs/common';
import { Category } from 'src/categories/entity/category.entity';
import { BookFilterDto } from './dto/BookFilterDto';
import { BookRequestDto } from './dto/BookRequestDto';
import { Book } from './entity/book.entity';
import { BooksRepository } from './repository/books.repository';
@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BooksRepository) {}

  async getAllBooks(params: BookFilterDto): Promise<Book[]> {
    return await this.bookRepository.find({ relations: { category: true } });
  }

  async getDetailBook(id: string): Promise<Book> {
    return await this.bookRepository.findOne({
      where: { id },
      relations: { category: true },
    });
  }

  async createBook(data: BookRequestDto): Promise<any> {
    try {
      const { title, author, totalPage, year, categoryId } = data;
      const createData = this.bookRepository.create();

      createData.title = title;
      createData.author = author;
      createData.totalPage = totalPage;
      createData.year = year;
      createData.category = await Category.findOneBy({ id: categoryId });

      return await this.bookRepository.save(createData);
    } catch (error) {
      console.log(error);
    }
  }

  async updateBook(id: string, data: BookRequestDto): Promise<any> {
    try {
      const { title, author, totalPage, year, categoryId } = data;
      const dataUpdate = await this.bookRepository.findOneBy({ id: id });

      dataUpdate.title = title;
      dataUpdate.author = author;
      dataUpdate.totalPage = totalPage;
      dataUpdate.year = year;
      dataUpdate.category = await Category.findOneBy({ id: categoryId });

      return await this.bookRepository.save(dataUpdate);
    } catch (error) {}
  }

  async deleteBook(id: string): Promise<any> {
    try {
      return await this.bookRepository.delete({ id });
    } catch (error) {
      console.log(error);
    }
  }
}
