import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) { }

  intercept(req,next){

    return next.handle(req)
    .pipe(
      catchError(err => {
          if (err.status === 401) {
              this.authService.logout()// auto logout if 401 response returned from api;
          }
          const error = err.error.message || err.statusText;
          return throwError(error);
      })//end of catchError operator
    );//end of pipe
  }//end of intercept
}