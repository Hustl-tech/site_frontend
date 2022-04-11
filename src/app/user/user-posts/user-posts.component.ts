import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { BlogPostDialogComponent } from './../../blog/blog-post-dialog/blog-post-dialog.component';
import { NotifyService } from './../../services/notify.service';
import { BlogService } from 'src/app/blog/services/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { Blog } from 'src/app/models/blog.model';

class Query {
  limit: number;
  skip: number;
  key: string;
  userId: string;
  category: [String];

  constructor(options: any) {
    this.limit = options.limit || 30;
    this.skip = options.skip || 0;
    this.key = options.key || '';
    this.userId = options.key || '';
    this.category = options.category || [];
  }
}

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  public blogs: Blog[];
  public blogCount: number;
  public query = new Query({});
  moment: any = moment;

  public loading: boolean = false;

  constructor(
    private blogService: BlogService,
    public dialog: MatDialog,
    public notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.getData(this.query);
  }

  getData(query: any) {
    this.loading = true;
    this.blogService.listUserPosts(query)
			.subscribe(data => {
				if (this.query.skip == 0) {
					this.blogs = data.blogs;
				} else {
					data.blogs.forEach(i => {
						this.blogs.push(i);
					});
				}
				this.blogCount = data.count;
				this.loading = false;
			});

  }

  loadMore() {
    this.query.skip = this.query.skip + this.query.limit;
    this.getData(this.query);
  }

  editBlog(blogs:any){
    let ta = JSON.parse(JSON.stringify(blogs));
    let dialogRef = this.dialog.open(BlogPostDialogComponent,{
      width:'50%',
    });
    dialogRef.componentInstance.blog = ta;
    dialogRef.afterClosed().subscribe(result => {
      this.getData({});
    });
  }

  removeBlog(blog:any,i){
    this.blogService.remove(blog).subscribe({
      next: (data) => {
        if (data) {
          this.blogs.splice(i, 1);
          this.notifyService.show('Successfully deleted...');
        }
      },
      error: (e) => {
      },
    });
  }
}

// cloudnary upload images
// google drive
// a2 hosting
