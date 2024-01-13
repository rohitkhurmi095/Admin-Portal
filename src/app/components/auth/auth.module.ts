import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        NgbModule, //for ng-bootstrap tabs  
        SharedModule //for feather-icon
    ]
})
export class AuthModule { }
