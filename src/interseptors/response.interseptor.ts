import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseInterface } from 'src/interfaces/response.interface';
import { ResponseInterseptorInterface } from '../interfaces/response-interseptor.interface';

@Injectable()
export class ResponseInterseptor<T>
  implements NestInterceptor<T, ResponseInterseptorInterface<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseInterseptorInterface<T>> {
    return next.handle().pipe(
      map(({ message, data }) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: message,
        data: data,
      })),
    );
  }
}
