import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from '../../../Models/modalData.model';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  constructor( public matDialog:MatDialogRef<DeleteItemComponent >, @Inject(MAT_DIALOG_DATA) public data:ModalData,
               private productService: ProductService ) { }

  ngOnInit(): void {
      console.log("ITEM BORRAR", this.data.modalData)
    //  console.log("ITEM BORRAR2", this.data.collection)
  }

  cancelDialog(){
      this.matDialog.close(); 
  }

  closeDialog(){
      this.productService.deleteProduct( this.data.modalData.id).then( (res)=>{
        if(res.status == 200){
          console.log("res - ", res);
          window.alert(" Se borro el producto correctamente");
          this.matDialog.close(); 
        }
      }).catch( (err) => {
        window.alert("ERROR. No ha podido borrarse el producto");
        this.matDialog.close();                                                       
      });
  }
}
