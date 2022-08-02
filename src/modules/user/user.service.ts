import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { QueryListDto } from 'src/global-dto/query-list.dto';
import { ListResult } from 'src/interfaces/listresult.interface';
import { Category } from '../category/entity/category.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(query: QueryListDto): Promise<ListResult<Category>> {
    const { page, pageSize } = query;
    const [list, count] = await this.userRepository.findAndCount({
      order: { id: 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      list,
      count,
      page,
      pageSize,
    };
  }

  async getDetailUser(id: string): Promise<User> {
    const data = await this.userRepository.findOneBy({ id: id });
    if (!data) throw new NotFoundException('Data not found!');

    return data;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, username, password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const createUser = this.userRepository.create();
    createUser.name = name;
    createUser.email = email;
    createUser.username = username;
    createUser.password = await bcrypt.hash(password, salt);
    createUser.salt = salt;

    return await this.userRepository.save(createUser);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, email, username } = updateUserDto;
    const updatedData = await this.getDetailUser(id);
    updatedData.name = name;
    updatedData.email = email;
    updatedData.username = username;

    return await this.userRepository.save(updatedData);
  }

  async deleteUser(id: string): Promise<any> {
    const deletedData = await this.getDetailUser(id);

    return await this.userRepository.delete({ id: deletedData.id });
  }

  async vaidateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneBy([
      {
        username,
      },
      { email: username },
    ]);
    if (!user) throw new NotFoundException('User not found!');

    const validatePassword = await user.validatePassword(password);

    if (user && validatePassword) return user;

    return null;
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
}
