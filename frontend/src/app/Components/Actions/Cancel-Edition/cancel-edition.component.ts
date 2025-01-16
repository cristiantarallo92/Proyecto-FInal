import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-edition',
  templateUrl: './cancel-edition.component.html',
  styleUrls: ['./cancel-edition.component.css']
})
export class CancelEditionComponent implements OnInit {

  constructor(public matDialog:MatDialogRef<CancelEditionComponent>) { }

  ngOnInit(): void {
  }
  
  cancelDialog(){
    this.matDialog.close();
}
}
