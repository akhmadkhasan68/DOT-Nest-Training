import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<ResponseInterface<User[]>> {
    const data = await this.userService.getAllUsers();
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
