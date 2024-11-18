// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class ResponseTransformInterceptor<T> implements NestInterceptor<T, any> {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const response = context.switchToHttp().getResponse();
//     return next.handle().pipe(
//       map((result) => {
//         return {
//           status: response.statusCode,
//           message: response.statusMessage || 'OK',
//           data: result,
//         };
//       }),
//     );
//   }
// }
