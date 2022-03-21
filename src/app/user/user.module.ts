import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from './../shared/shared.module';
import { UserPostsComponent } from './user-posts/user-posts.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserPostsComponent
  ],
  imports: [
    CommonModule,
    
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
