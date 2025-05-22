import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from 'src/app/Models/modal-data.model';

@Component({
  selector: 'app-cancel-create',
  templateUrl: './cancel-create.component.html',
  styleUrls: ['./cancel-create.component.css']
})
export class CancelCreateComponent implements OnInit {

  constructor(public matDialog:MatDialogRef<CancelCreateComponent>,   @Inject(MAT_DIALOG_DATA) public modal:ModalData) { }



  ngOnInit(): void {
      console.log("Cancel create", )
  }

  closeModal(): void{
    this.matDialog.close(true);
  }

  cancelDialog(){
    this.matDialog.close()
  }
}
