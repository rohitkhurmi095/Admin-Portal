import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //1.Retry 3 times if connection fails
    //2.Check if response is returned
    //3.Show Errors if any
    return next.handle(request).pipe(
      retry(3),
      map(res =>{
        //console.log('Response Interceptor called ',res);
        if(res instanceof HttpResponse){
          return res;
        }
        return null;
      }),
      catchError((err:HttpErrorResponse)=>{
        let errorMessage = '';

        if(err.error instanceof HttpErrorResponse){
          console.log('Response Interceptor called | Client Side Error ',err.error.message);
          errorMessage = `Error Message: ${err.error.message}`;
        }else{
          console.log('Response Interceptor called | Server Side Error ',err.message);
          errorMessage = `Error Message: ${err.message} | Error Status: ${err.status}`;
        }
        
        //return error
        return throwError(()=> Error(errorMessage));
      })
    )
  }
}
