import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getAllUsers() {
    return await this.usersRepository.find();
  }

  async getDetailUser(id: string) {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async validateUser(username: string, password: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: [{ username }, { email: username }],
    });

    if (!user || !user.validatePassword(password)) return null;

    return user;
  }
}
