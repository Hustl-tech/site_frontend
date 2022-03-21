import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  exports:[
    SignupComponent,
    LoginComponent
  ]
})
export class AuthModule { }
