import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { AuthService } from './../services/auth.service';
import { NotifyService } from './../../services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;
  public saving: boolean = false;

  hide = true;
  constructor(
    private router:Router,
    private authService: AuthService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.user = new User({});
  }

  login(loginForm){
    if (loginForm.form.valid) {
      this.saving = true;
      this.authService.login(this.user)
        .subscribe({
          next: (data) => {
            if (data) {
              this.saving = true;
              this.notifyService.show('Successfully logged in...');
              this.authService.redirectToHome();
            }else{
              this.saving = false;
            }
          },
          error: e => {
            this.saving = false;
          }
        })
    }
  }

}
