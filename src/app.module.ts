import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Book } from './books/entity/book.entity';
import { Category } from './categories/entity/category.entity';
import { UsersModule } from './users/users.module';
import { Users } from './users/entity/users.entity';
import { AuthModule } from './auth/auth.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Book, Category, Users],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BooksModule,
    CategoriesModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
