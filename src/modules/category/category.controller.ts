import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ListResult } from 'src/interfaces/listresult.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { UpdateResult } from 'typeorm';
import { QueryListDto } from '../../global-dto/query-list.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entity/category.entity';

@Controller('category')
@UseGuards(JwtGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(
    @Query() query: QueryListDto,
  ): Promise<ResponseInterface<ListResult<Category>>> {
    const data = await this.categoryService.getAllCategories(query);
    return { message: 'OK', data };
  }

  @Get('/:id')
  async getDetailCategory(
    @Param('id') id: string,
  ): Promise<ResponseInterface<Category>> {
    const data = await this.categoryService.getDetailCategory(id);
    return { message: 'OK', data };
  }

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseInterface<Category>> {
    const data = await this.categoryService.createCategory(createCategoryDto);
    return { message: 'OK', data };
  }

  @Put('/:id')
  async updateCategoryDto(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseInterface<UpdateResult>> {
    const data = await this.categoryService.updateCategory(
      id,
      updateCategoryDto,
    );
    return { message: 'OK', data };
  }

  @Delete('/:id')
  async deleteCategory(
    @Param('id') id: string,
  ): Promise<ResponseInterface<any>> {
    const data = await this.categoryService.deleteCategory(id);
    return { message: 'OK', data };
  }
}
