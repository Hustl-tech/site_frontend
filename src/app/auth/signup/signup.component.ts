import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { NotifyService } from './../../services/notify.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User;
  public saving: boolean = false;

  hide = true;
  constructor(
    private authService: AuthService,
    private notifyService:NotifyService
  ) { }

  ngOnInit(): void {
    this.user = new User({});
  }

  signUp(userForm) {
    if (userForm.form.valid) {
      this.saving = true;
      this.authService.register(this.user)
        .subscribe({
          next: data => {
            if (data) {
              this.saving = true;
              this.notifyService.show('Successfully registered...');
              this.authService.redirectToHome();
            }
          },
          error: e => {
            this.saving = false;
          }
        })
    }
  }

}
