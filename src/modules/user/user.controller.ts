import { Controller, Get, Param } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/:id')
  async getDetailUser(@Param('id') id: string): Promise<User> {
    return await this.userService.getDetailUser(id);
  }
}
