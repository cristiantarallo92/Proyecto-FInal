import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InfoProductosComponent } from '../../Productos/info-productos/info-productos.component';

@Component({
  selector: 'app-carrito-vacio-ecommerce-producto',
  templateUrl: './carrito-vacio-ecommerce-producto.component.html',
  styleUrls: ['./carrito-vacio-ecommerce-producto.component.css']
})
export class CarritoVacioEcommerceProductoComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<InfoProductosComponent>) { }

  ngOnInit(): void {
  }
  
  closeDialog = () => {
    this.dialogRef.close()
  }

}
