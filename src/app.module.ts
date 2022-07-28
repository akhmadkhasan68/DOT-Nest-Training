import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './modules/book/book.module';
import { CategoryModule } from './modules/category/category.module';
import { typeOrmConfig } from './config/typeOrm.config';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    BookModule,
    CategoryModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
