import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({ relations: ['books'] });
  }

  async getDetailCategory(id: string): Promise<Category> {
    const data = await this.categoryRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!data) throw new NotFoundException('Data not found!');

    return data;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;
    const createCategory = this.categoryRepository.create();
    createCategory.name = name;

    return await this.categoryRepository.save(createCategory);
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const { name } = updateCategoryDto;
    const updatedData = await this.getDetailCategory(id);
    updatedData.name = name;

    return await updatedData.save();
  }

  async deleteCategory(id: string): Promise<any> {
    const deletedData = await this.getDetailCategory(id);
    return await this.categoryRepository.delete({ id: deletedData.id });
  }
}
