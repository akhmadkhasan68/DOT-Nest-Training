import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './filters/entitynotfoundexception.filter';
import { ResponseInterseptor } from './interseptors/response.interseptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterseptor());
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  await app.listen(3000);
}
bootstrap();
