import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { BaseService } from './../../services/base.service';

import { Blog } from 'src/app/models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = `${this.baseService.baseUrl}blog`;
  public redirectUrl = '';

  constructor(
    private baseService: BaseService,
    private http: HttpClient,
  ) { }

  create(blog: Blog,file:File): Observable<any> {
    const blogForm = new FormData();
    blogForm.append('blog',JSON.stringify(blog));
    for ( let key in blog ) {
      blogForm.append(key, blog[key]);
  }
    blogForm.append('image',file);
    return this.http.post<Blog>(`${this.url}`, blogForm)
      .pipe(
        catchError(this.baseService.handleError('Create a new post'))
      ) ; 
  }

  public list(query: any) {

    return this.http.get<any>(this.url + this.baseService.getQueryString(query))
      .pipe(
        catchError(this.baseService.handleError('Get Blogs'))
      );
  }

  public listUserPosts(query: any) {

    return this.http.get<any>(this.url + '/posts'  + this.baseService.getQueryString(query))
      .pipe(
        catchError(this.baseService.handleError('Get Posts'))
      );
  }

  public getDetail(id: any) {

    return this.http.get<any>(this.url + '/' + id)
      .pipe(
        catchError(this.baseService.handleError('Get Blogs'))
      );
  }
  

}
