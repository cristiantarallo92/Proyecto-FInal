import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from '../../../Models/modalData.model';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  constructor( public matDialog:MatDialogRef<DeleteItemComponent >, @Inject(MAT_DIALOG_DATA) public data:ModalData) { }

  ngOnInit(): void {
      console.log("ITEM BORRAR", this.data.modalData)
    //  console.log("ITEM BORRAR2", this.data.collection)
  }

  cancelDialog(){
      this.matDialog.close(); 
  }

  closeDialog(){
 // this.data.collection.find( item => console.log(item.isPrototypeOf))
  }
}
