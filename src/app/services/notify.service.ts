import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private snackBar: MatSnackBar
  ) { }


  public show(msg){
    this.snackBar.open(msg, 'Close', {
			duration: 2500
		});
  }

  public showError(error){
    // let err = JSON.parse(error._body);
    // if(err.message){
      let sb = this.snackBar.open(error, 'Close', {
        duration: 4000,
        panelClass: ["custom-style"]
      });
      sb.onAction().subscribe(() => {
        sb.dismiss();
      });
    // }
  }
}
