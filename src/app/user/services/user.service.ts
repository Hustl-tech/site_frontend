import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = `${this.baseService.baseUrl}user`;
  public redirectUrl = '';

  constructor(
    private baseService: BaseService,
    private http: HttpClient,
  ) { }

  public get() {
    return this.http.get<any>(this.url+'/me')
      .pipe(
        catchError(this.baseService.handleError('Getting profile'))
      );
  }

}
