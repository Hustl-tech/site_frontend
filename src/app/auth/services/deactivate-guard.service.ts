
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuardService {

  
  constructor(
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		if (!this.authService.isLoggedIn()) {
			return true;
		}
		this.authService.redirectUrl = state.url;
		this.authService.redirectToHome();

		return false;
	}
}
