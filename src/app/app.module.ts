import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './components/auth/auth.module';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    //EagerLoading
    AuthModule,
    SharedModule
  ],
  providers: [
    //Add the interceptors to be called here (In Sequence) | multi -> multiple interceptors are there
    {provide:HTTP_INTERCEPTORS, useClass:RequestInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:ResponseInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
