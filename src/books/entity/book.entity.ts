import { Category } from 'src/categories/entity/category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  year: number;

  @Column()
  totalPage: number;

  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  category: Category;
}
