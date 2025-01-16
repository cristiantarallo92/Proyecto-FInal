import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from 'src/app/Models/modalData.model';

@Component({
  selector: 'app-cancel-create',
  templateUrl: './cancel-create.component.html',
  styleUrls: ['./cancel-create.component.css']
})
export class CancelCreateComponent implements OnInit {

  constructor(public matDialog:MatDialogRef<CancelCreateComponent>,   @Inject(MAT_DIALOG_DATA) public data:ModalData) { }



  ngOnInit(): void {
      console.log("Cancel create", this.data)
      console.log(this.data.modalData)
  }

  closeModal(): void{
    this.matDialog.close(true);
  }

  cancelDialog(){
    this.matDialog.close()
  }
}
