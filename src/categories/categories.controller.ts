import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryRequestDto } from './dto/CategoryRequestDto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get('/:id')
  getDetailCategory(@Param('id') id: string) {
    return this.categoryService.getDetailCategory(id);
  }

  @Post()
  createCategory(@Body() data: CategoryRequestDto) {
    return this.categoryService.createCategory(data);
  }

  @Put('/:id')
  updateCategory(@Param('id') id: string, @Body() data: CategoryRequestDto) {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
