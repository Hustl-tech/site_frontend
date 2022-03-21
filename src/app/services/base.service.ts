import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

import { environment } from './../../environments/environment';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  
  baseUrl: string = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(
    private notifyService:NotifyService
  ) { }

  getQueryString(query){
    let queryString = '?';
    for (const key in query){
      if(key){
        queryString += key + '=' + query[key] + '&';
      }
    }
    return queryString;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  /**
   * Handle http operation that failed
   * @param operation - name of operation that failed
   */
  public handleError(operation = 'operation'){
    return (error:any)=>{
      this.notifyService.showError(`${operation} failed: ${error}`);
      // alert(`${operation} failed: ${error.error.message}`);
      return throwError(new Error(error.error.message));
    }
  }

  public log(message:string){
    alert(message);
  }
}
