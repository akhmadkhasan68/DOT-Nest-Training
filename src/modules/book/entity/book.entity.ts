import { Category } from 'src/modules/category/entity/category.entity';
import { User } from '../../user/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, (category) => category.books, {
    onDelete: 'SET NULL',
    eager: true,
  })
  category: Category;

  @ManyToOne(() => User, (user) => user.books, {
    onDelete: 'SET NULL',
  })
  user: User;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  totalPages: number;

  @Column()
  year: number;
}
