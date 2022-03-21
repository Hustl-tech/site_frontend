import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { BaseService } from './../../services/base.service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private url = `${this.baseService.baseUrl}auth`;
  public redirectUrl = '';

  userLoggedInSource = new BehaviorSubject(false);
  userLoggedIn$ = this.userLoggedInSource.asObservable();

  constructor(
    private baseService: BaseService,
    private http: HttpClient,
    private router: Router
  ) {
    if (localStorage.getItem('token'))
      this.userLoggedInSource.next(true);
    else
      this.userLoggedInSource.next(false);

  }

  register(user: User): Observable<any> {
    return this.http.post<User>(`${this.url}/signup`, user, this.baseService.httpOptions)
      .pipe(
        map((data: any) => {
          if (data && data.token) {
            this.setToken(data.token);
            this.setUser(data.user);
            this.userLoggedInSource.next(true);
            return true;
          }
          this.userLoggedInSource.next(false);
          return false;
        }),
        catchError(this.baseService.handleError('Register'))
      )
  }

  login(user: User): Observable<any> {
    return this.http.post<User>(`${this.url}/login`, user, this.baseService.httpOptions)
      .pipe(
        map((data: any) => {
          if (data && data.token) {
            this.setToken(data.token);
            this.setUser(data.user);
            this.userLoggedInSource.next(true);
            return true;
          }
          this.userLoggedInSource.next(false);
          return false;
        }),
        catchError(this.baseService.handleError('Login'))
      );
  }

  logout() {
    localStorage.clear();
    this.userLoggedInSource.next(false);
    this.router.navigate(['/login']);
  }


  isLoggedIn() {
    if (localStorage.getItem('token')) {
      this.userLoggedInSource.next(true);
      return true;
    }

    this.userLoggedInSource.next(false);
    return false;
  }


  public getCurrentUser() {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    return currentUser;
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  redirectToSignup() {
    this.router.navigate(['signup']);
  }

}
