import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';

//Custom Validatons
import {alphanumericFieldValidator,emailFieldValidator,mustMatchValidator}  from '../../../shared/validations/validations.validator';
import { Global } from 'src/app/shared/utility/global';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _fb:FormBuilder,private _toastr:ToastrService,private _httpService:HttpService,private authService:AuthService){}

  //Accessing 'nav' templateRef variable using @ViewChild() for chaning tabs in nav
  @ViewChild('nav') elNav:any;
  
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
    //check if formData is valid
    //Note: already validated this before submitting form so this can be skipped here
    if(!this.registerForm.valid){
      return;
    }
   
    //call API
    this._httpService.post(Global.BASE_API_URL + 'UserMaster/Save/',this.registerForm.value).subscribe(res=>{
      if(res.isSuccess){
        this._toastr.success("Registration Successful!","Register");

        //reset formData
        this.registerForm.reset({
          firstName:'',
          lastName:'',
          email:'',
          password:'',
          confirmPassword:'',
          userTypeId:1
        });

        //Navigate to loginTab
        this.elNav.select('loginTab');
      }else{
        this._toastr.error(res.errors[0],"Register");
      }
    });
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
    //check if formData is valid
    //Note: already validated this before submitting form so this can be skipped here
    if(!this.loginForm.valid){
      return;
    }

    //call API
    this._httpService.post(Global.BASE_API_URL + 'UserMaster/Login/',this.loginForm.value).subscribe(res=>{
      if(res.isSuccess){
        this._toastr.success("Login Successful!","Login");

        //reset formData
        this.loginForm.reset({
          userName:'',
          password:''
        });

        //Set localStorage/BehaviourSubjects and navigate to 'Dashboard' page
        //API Response: (res: {isSuccess:true/false | data: {} | errors:[]})
        this.authService.login(res.data);   
      }else{      
        this._toastr.error(res.errors[0],"Login");
      }
    });
    
  }

}
