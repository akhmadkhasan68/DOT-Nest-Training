import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123a123',
  database: 'book-api',
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  synchronize: true,
};
