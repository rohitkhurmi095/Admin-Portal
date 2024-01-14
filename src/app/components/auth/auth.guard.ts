import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  //creating auth service instance to access behaviourSubjects
  let _authService = inject(AuthService);
  let _router = inject(Router);

  //I)suscribe to observable to get its value then assign to variable
  //let isLoggedIn:boolean = false;
  // _authService.isLoggedIn$.subscribe(res =>{
  //   console.log('AuthGuard isLoggedIn: ',res);
  //   isLoggedIn = res;
  // });
  // if(!isLoggedIn){
  //   _router.navigate(['/auth/login']);
  //   return false;
  // }
  // return true;

  //II)using pipe to directly get value of observable without suscribing
  return _authService.isLoggedIn$.pipe(map((res:boolean)=>{
    console.log('AuthGuard isLoggedIn: ',res);
    if(!res){
      _router.navigate(['/auth/login']);
      return false;
    }
    return true;
   }));
};
