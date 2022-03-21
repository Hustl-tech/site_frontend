import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { MaterialModule } from './material.module';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { NavComponent } from './nav/nav.component';
import { EqualValidator } from './directives/equal-validator.directive';
import { KebabcasePipe } from './pipes/kebabcase.pipe';

@NgModule({
  declarations: [
    EqualValidator,
    KebabcasePipe,
    TextEditorComponent,
    NavComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    CKEditorModule,
    FormsModule,
    MaterialModule

  ],
  exports:[
    TextEditorComponent,
    MaterialModule,
    NavComponent,
    FormsModule,
    EqualValidator,
    KebabcasePipe
  ]
})
export class SharedModule { }
