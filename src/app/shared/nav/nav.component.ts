import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from './../../auth/services/auth.service';
import { BlogPostDialogComponent } from 'src/app/blog/blog-post-dialog/blog-post-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isAuthenticated: boolean = false;
  key:string;

  constructor(
    public authService:AuthService,
    public dialog: MatDialog,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.authService.userLoggedIn$
    .subscribe(m => {
      this.isAuthenticated = m;
    }) ;
  }

  openDialog(){
    const dialogRef = this.dialog.open(BlogPostDialogComponent, {
      width:'50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/user/profile'])
    });
  }


	search(key){
		this.router.navigate(['/'],{ queryParams: key})
	}


}
