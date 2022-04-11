import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogService } from './../services/blog.service';
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
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  public blogs: Blog[];
  public blogCount: number;
  public query = new Query({});
  moment: any = moment;

  public loading: boolean = false;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private routerR: Router
  ) { 
      // this is for routerLink on same component when only queryParameter changes
      this.routerR.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };

    route.queryParams.subscribe(
			(params) => {
				if (params.key) {
					this.query.key = params['key'];
          this.getData(this.query);
				}
			})
      this.getData(this.query);

  }

  ngOnInit(): void {
    this.getData(this.query);
  }

  ngOnChanges(): void {
    this.getData(this.query);
  }

  getData(query: any) {
    this.loading = true;
    this.blogService.list(query)
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


}
