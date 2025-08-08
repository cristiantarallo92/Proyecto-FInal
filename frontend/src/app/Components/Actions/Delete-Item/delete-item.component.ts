import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from '../../../Models/modal-data.model';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  deletedElement: string = ''


  constructor( public matDialog:MatDialogRef<DeleteItemComponent >, @Inject(MAT_DIALOG_DATA) public modal:ModalData,
               private productService: ProductService ) { }

  ngOnInit(): void {
    this.deletedItemInfo()
    console.log("modal", this.modal)
    this.deletedElement = this.modal.modalData['name']  
    console.log("BORRAR ID", this.modal.modalData['id'])
  }

  
  deletedItemInfo() {
    switch(this.modal.modalItem) { 
      case 'Producto': 
      this.deletedElement = this.modal.modalData['name'];
      break;
      case 'Categoria':
      this.deletedElement = this.modal.modalData['name'];
      break;
      case 'Marca':
      this.deletedElement = this.modal.modalData['name'];
      break;
    }
  }
 
  cancelDialog() {
    this.matDialog.close(); 
  }

  closeDialog(){   
    switch(this.modal.modalItem) { 
      case 'Producto':       
      this.productService.deleteProduct(this.modal.modalData['id']).subscribe( 
        response => {
          console.log ("Producto eliminado - ", response);
          window.alert("Producto eliminado correctamente. ");
          this.matDialog.close(); 
        } ,
        error => {
          console.log ("Error - ", error);
          window.alert("ERROR - No pudo eliminar el producto. Por favor intente nuevamente en unos minutos ...");
          this.matDialog.close(); 
        }
      )
      break;
      case 'Categoria':
      console.log("BORRAR NOMBRE ", this.deletedElement );
      console.log("BORRAR ID", this.modal.modalData['id']);
      break;
   }
    this.matDialog.close(this.modal.modalData);
  } 

}
