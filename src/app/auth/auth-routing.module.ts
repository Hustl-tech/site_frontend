import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DeactivateGuardService } from './services/deactivate-guard.service';

const routes:Routes = [
  {
    path:'login',
    component: LoginComponent,
    canActivate: [DeactivateGuardService],
  },
  {
    path:'signup',
    component: SignupComponent,
    canActivate: [DeactivateGuardService],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
