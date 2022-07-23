import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

export class UsersRepository extends Repository<User> {}
