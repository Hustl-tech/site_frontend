import { Component, OnInit } from '@angular/core';

import { UserService } from './../services/user.service';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User = new User({});
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.userService.get().subscribe((user) => {
      this.user = user;
    });
  }
}
