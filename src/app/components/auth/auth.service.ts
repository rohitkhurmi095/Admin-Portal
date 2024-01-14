import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router:Router) { }
  
  //creating behaviourSubjects for currentUser/IsLoggedIn
  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null); //contains JWT token also
  private isLoggedIn: BehaviorSubject<boolean>  = new BehaviorSubject(false);

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
  }

    
  //AsObservable - readOnly Subjects
  get isLoggedIn$(){
    return this.isLoggedIn.asObservable();
  }
  get currentUser$(){
    return this.currentUser.asObservable();
  }
}
