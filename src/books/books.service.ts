import { Injectable } from '@nestjs/common';
import { BookRequestDto } from './dto/BookRequestDto';
import { Book } from './entity/book.entity';

type bookObject = {
  id: number;
  name: string;
  author: string;
  totalPage: number;
  category: string;
};

@Injectable()
export class BooksService {
  private books: bookObject[] = [];

  getAllBooks(): bookObject[] {
    return this.books;
  }

  createBook(data: BookRequestDto): any {
    Book.create(data);

    return true;
  }
}
