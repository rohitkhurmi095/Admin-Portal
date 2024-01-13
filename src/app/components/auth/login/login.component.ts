import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

//Custom Validatons
import {alphanumericFieldValidator,emailFieldValidator,mustMatchValidator}  from '../../../shared/validations/validations.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _fb:FormBuilder,private _router:Router,private _toastr:ToastrService){}
  
  ngOnInit(){
    this.setupLoginForm();
    this.setupRegisterForm();
  }


  //=========
  //Register
  //=========
  registerForm:FormGroup;
  registerformOptions: AbstractControlOptions;
  
  setupRegisterForm(){
    this.registerformOptions = { 
      validators:mustMatchValidator('password','confirmPassword')
    };
    
    this.registerForm = this._fb.group({
      firstName:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(15),alphanumericFieldValidator.validAlphanumericField])],
      lastName:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(15),alphanumericFieldValidator.validAlphanumericField])],
      email:['',Validators.compose([Validators.required,emailFieldValidator.validEmailField])],
      password:['',Validators.compose([Validators.required,Validators.pattern(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*\d).{8,}$/)])],
      confirmPassword:['',[Validators.required]],
      userTypeId:[1] //for Admin Users (Backend)
    },this.registerformOptions);
  }

  get registerControls(){
    return this.registerForm.controls;
  }

  registerUser(){
    console.log(this.registerForm.value);

    //Navigate to Dashboard after Register!
    if(this.registerForm.valid){
      this._toastr.success("Register","Successful!");
      this._router.navigate(['/dashboard']);
    }
  }



  //======
  //Login
  //======
  loginForm:FormGroup;
  setupLoginForm(){
    this.loginForm = this._fb.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  get loginControls(){
    return this.loginForm.controls;
  }

  loginUser(){
    console.log(this.loginForm.value);

    if(this.loginForm.valid){
      this._toastr.success("Register","Successful!");
      //Navigate to Dashboard after login!
      this._router.navigate(['/dashboard']);
    }
  }

}
