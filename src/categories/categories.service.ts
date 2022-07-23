import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRequestDto } from './dto/CategoryRequestDto';
import { Category } from './entity/category.entity';
import { CategoriesRepository } from './repository/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoriesRepository.find({
        relations: { books: true },
      });
    } catch (error) {
      throw new Error('Error while loading data');
    }
  }

  async getDetailCategory(id: string): Promise<Category> {
    try {
      const data = await this.categoriesRepository.findOne({
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
      return await this.categoriesRepository.create(data).save();
    } catch (error) {
      console.log(error);
    }
  }

  async updateCategory(id: string, data: CategoryRequestDto): Promise<any> {
    try {
      return await this.categoriesRepository.update(id, data);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCategory(id: string): Promise<any> {
    try {
      return await this.categoriesRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
