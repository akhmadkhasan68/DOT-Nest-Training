import { EntityRepository, Repository } from 'typeorm';
import { Book } from '../entity/book.entity';

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {}
