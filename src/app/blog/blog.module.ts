import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { BlogRoutingModule } from './blog-routing.module';

import { SharedModule } from './../shared/shared.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPostDialogComponent } from './blog-post-dialog/blog-post-dialog.component';
import { ContentComponent } from './content/content.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';



@NgModule({
  declarations: [
    BlogListComponent,
    BlogPostDialogComponent,
    ContentComponent,
    BlogDetailComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,

    ReactiveFormsModule,

    SharedModule
  ],
  exports:[
    BlogListComponent
  ]
})
export class BlogModule { }
