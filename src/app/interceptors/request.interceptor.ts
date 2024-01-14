import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../components/auth/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  //AuthService - to get the JWT Token (from currentUser behaviour subject)
  constructor(private _authService:AuthService) {}

  //Note: request defined as parameter is immutable, we need to clone request to make any modifications
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let currentUser:any;  //undefined
    let isLoggedIn:boolean; //undefined
    let requestModified:any; //undefined

    //Note: JWT token needs to be only set in request headers once user has sucessfully loggedIn
    //Else don't modify the request
    this._authService.isLoggedIn$.subscribe(res =>{
      isLoggedIn = res;
      //console.log('Request Interceptor called -> isLoggedIn: ',isLoggedIn);

      if(isLoggedIn){
        this._authService.currentUser$.subscribe(res =>{
          currentUser = res;
          //console.log('Request Interceptor called -> currentUser ', currentUser);

          //clone request to pass JWT token in header with request
          if(currentUser!=null){
            requestModified = request.clone({
              setHeaders:{
                'Authorization': `Bearer ${currentUser.token}`
              }
            })
            //console.log('IsRequestModified?: ',requestModified!=undefined);
          }
        })
      }
    })

    //If requestModified is undefined -> pass existing request | else pass the modified request
    return next.handle(requestModified? requestModified: request);
  }
}
