import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryRequestDto } from './dto/CategoryRequestDto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find({ relations: { books: true } });
    } catch (error) {
      throw new Error('Error while loading data');
    }
  }

  async getDetailCategory(id: string): Promise<Category> {
    try {
      const data = await this.categoryRepository.findOne({
        where: { id },
        relations: { books: true },
      });

      if (!data) throw new NotFoundException('Data not found!');

      return data;
    } catch (error) {
      throw error;
    }
  }

  async createCategory(data: CategoryRequestDto): Promise<any> {
    try {
      return await this.categoryRepository.create(data).save();
    } catch (error) {
      console.log(error);
    }
  }

  async updateCategory(id: string, data: CategoryRequestDto): Promise<any> {
    try {
      return await this.categoryRepository.update(id, data);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCategory(id: string): Promise<any> {
    try {
      return await this.categoryRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
