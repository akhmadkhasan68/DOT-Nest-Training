import { Injectable } from '@nestjs/common';

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

  createBook(
    name: string,
    author: string,
    totalPage: number,
    category: string,
  ): any {
    this.books.push({
      id: Math.random(),
      name,
      author,
      totalPage,
      category,
    });

    return true;
  }
}
