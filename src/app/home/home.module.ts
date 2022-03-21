import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CategoriesComponent } from './categories/categories.component';

import { HomeRoutingModule } from './home-routing.module';
import { BlogModule } from './../blog/blog.module';
import { SharedModule } from './../shared/shared.module';




@NgModule({
  declarations: [
    HomeComponent,
    SideBarComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

    BlogModule,
    SharedModule
  ]
})
export class HomeModule { }
