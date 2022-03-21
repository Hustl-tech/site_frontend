import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';

import { Blog } from './../../models/blog.model';

import { BlogService } from './../services/blog.service';
import { BaseService } from './../../services/base.service';
import { NotifyService } from './../../services/notify.service';
import { AuthService } from './../../auth/services/auth.service';

@Component({
  selector: 'app-blog-post-dialog',
  templateUrl: './blog-post-dialog.component.html',
  styleUrls: ['./blog-post-dialog.component.css'],
})
export class BlogPostDialogComponent implements OnInit {
  blog: Blog = new Blog({});
  public saving: boolean = false;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  config = {
    image: {
      toolbar: [
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        '|',
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'linkImage',
        'resizeImage',
      ],
    },
    toolbar: {
      items: [
        'heading',
        'alignment',
        'bold',
        'italic',
        'link',
        'uploadImage',
        'codeBlock',
        'blockQuote',
        'bulletedList',
        'numberedList',
        'indent',
        'outdent',
        'mediaEmbed',
        'horizontalLine',
        'undo',
        'redo',
        'removeFormat',
      ],
    },
    shouldNotGroupWhenFull: true,
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: `${this.baseService.baseUrl}uploadImage`,
      "error": {
        "message": "The image upload failed because the image was too big (max 1.5MB)."
    }

      // // Enable the XMLHttpRequest.withCredentials property.
      // withCredentials: true,

      // // Headers sent along with the XMLHttpRequest to the upload server.
      // headers: {
      //     Authorization: `Bearer ${this.auth.getToken()}`
      // }
    },
  };

  blured = false;
  focused = false;

  imageData: string;
  coverImg: File;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.blog.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.blog.tags.indexOf(tag);

    if (index >= 0) {
      this.blog.tags.splice(index, 1);
    }
  }

  constructor(
    private blogService: BlogService,
    private notifyService: NotifyService,
    private baseService: BaseService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<BlogPostDialogComponent>
  ) {}

  ngOnInit(): void {}

  blogPost(blogForm) {
    if (blogForm.form.valid) {
      this.blogService.create(this.blog, this.coverImg).subscribe({
        next: (data) => {
          if (data) {
            this.saving = true;
            this.notifyService.show('Successfully published...');
            this.dialogRef.close(data);
          }
        },
        error: (e) => {
          this.saving = false;
        },
      });
    }
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.coverImg = file;
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
