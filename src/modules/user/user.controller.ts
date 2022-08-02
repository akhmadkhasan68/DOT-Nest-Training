import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { QueryListDto } from 'src/global-dto/query-list.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ListResult } from 'src/interfaces/listresult.interface';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { Category } from '../category/entity/category.entity';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(
    @Query() query: QueryListDto,
  ): Promise<ResponseInterface<ListResult<Category>>> {
    const data = await this.userService.getAllUsers(query);
    return { message: 'OK', data };
  }

  @Get('/:id')
  async getDetailUser(
    @Param('id') id: string,
  ): Promise<ResponseInterface<User>> {
    const data = await this.userService.getDetailUser(id);
    return { message: 'OK', data };
  }
}
