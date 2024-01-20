import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  //creating behaviourSubjects for currentUser/IsLoggedIn
  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null); //contains JWT token also
  private isLoggedIn: BehaviorSubject<boolean>  = new BehaviorSubject(false);

  constructor(private _router:Router,private _toastr:ToastrService) {

    //When page is refreshed -> authGuard is called again, checks the behaviourSubjects values
    //so if user is already loggedIn and browser is manually refreshed -> set the behaviour subject again
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(userDetails){
      this.currentUser.next(userDetails);
      this.isLoggedIn.next(true);
      console.log('User is already logged in!');
    }
   }

  //------
  //Login
  //------
  login(userDetails:any){
    //set user details in localStorage and behaviourSubjects
    localStorage.setItem('userDetails',JSON.stringify(userDetails));
    this.currentUser.next(userDetails);
    this.isLoggedIn.next(true);

    //Navigate to Dashboard
    this._router.navigate(['dashboard']);
  }

  //-------
  //Logout
  //-------
  logOut(){
    //clear localStorage and behaviourSubjects 
    localStorage.clear();
    this.currentUser.next(null);
    this.isLoggedIn.next(false);

    //Navigate to LoginPage
    this._router.navigate(['/auth/login']);

    //show message!
    this._toastr.success("Logout Successful!","Logout");
  }

    
  //AsObservable - readOnly Subjects
  get isLoggedIn$(){
    return this.isLoggedIn.asObservable();
  }
  get currentUser$(){
    return this.currentUser.asObservable();
  }
}
