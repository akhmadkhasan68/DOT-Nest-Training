import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryListDto } from 'src/global-dto/query-list.dto';
import { ListResult } from 'src/interfaces/listresult.interface';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(query: QueryListDto): Promise<ListResult<Category>> {
    const { page, pageSize } = query;
    const [list, count] = await this.categoryRepository.findAndCount({
      order: { id: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['books'],
    });
    return {
      list,
      count,
      page,
      pageSize,
    };
  }

  async getDetailCategory(id: string): Promise<Category> {
    const data = await this.categoryRepository.findOneOrFail({
      where: { id },
      relations: ['books'],
    });

    if (!data) throw new NotFoundException('Data not found!');

    return data;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryRepository.create(createCategoryDto).save();
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryRepository.update({ id }, updateCategoryDto);
  }

  async deleteCategory(id: string): Promise<any> {
    const deletedData = await this.getDetailCategory(id);
    return await this.categoryRepository.delete({ id: deletedData.id });
  }
}
