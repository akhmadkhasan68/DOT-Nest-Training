import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/LoginDto';
import { RegisterDto } from './dto/RegisterDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async login(data: LoginDto) {
    try {
      const { username, password } = data;
      const findUser = await this.usersRepository.findOne({
        where: [{ username }],
      });

      if (!findUser) throw new NotFoundException('Username/Email not found!');

      return findUser;
    } catch (error) {
      throw error;
    }
  }

  async register(data: RegisterDto) {
    try {
      return await this.usersRepository.create(data).save();
    } catch (error) {
      throw error;
    }
  }
}
