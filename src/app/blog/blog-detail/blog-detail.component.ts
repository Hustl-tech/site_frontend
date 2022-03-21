import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { BlogService } from './../services/blog.service';
import { Blog } from 'src/app/models/blog.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  loading: boolean = false;
  blog:Blog;
  moment: any = moment;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      this.getDetails(id);
    });
  }

  getDetails(id: any): void {
    this.loading = true;
    this.blogService.getDetail(id).subscribe((blog) => {
      this.blog = blog;
      this.loading = false;
    });
  }

}
