import { Component, Inject, OnInit } from '@angular/core';
import { InfoProductosComponent } from 'src/app/Components/Productos/info-productos/info-productos.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { EcommerceCartService } from 'src/app/Services/ecommerce-cart.service';

@Component({
  selector: 'app-detalle-ecommerce-producto',
  templateUrl: './detalle-ecommerce-producto.component.html',
  styleUrls: ['./detalle-ecommerce-producto.component.css']
})
export class DetalleEcommerceProductoComponent implements OnInit {
  
  amount: number = 1;
  prevImage: SafeUrl | null = null;

  constructor( public dialogRef: MatDialogRef<InfoProductosComponent>, @Inject(MAT_DIALOG_DATA) public modal:any,
               private sanitizer: DomSanitizer,
               private ecommerceCartService: EcommerceCartService ) { }

  ngOnInit(): void {
    console.log("MODAL --", this.modal)
    this.configModal();
  }
  
  configModal() {
     const rawImage: string | null =
            (this.modal as any)?.image ?? (this.modal as any)?.imageUrl ?? null;
            console.log("rawImage", rawImage);
        if (rawImage) {
            const imageSrc = this.normalizeImage(rawImage); // agrega prefijo si hace falta
            this.prevImage = this.sanitizer.bypassSecurityTrustUrl(imageSrc);
        } 
  } 
  
  normalizeImage(image: string | null): string | null {
      if (!image) return null;
      // 1) Si ya viene como data URL, devolver tal cual
      if (image.startsWith('data:image')) return image;
      // 2) Si es una ruta absoluta o relativa del servidor, construir URL completa
      if (image.startsWith('http')) return image;
       if (image.startsWith('/')) return `${environment.API_URL}${image}`;
      // 3) Si parece ser base64 sin prefijo, agregarlo
      return `data:image/jpeg;base64,${image}`;
  }

  addProductToCart(){
    console.log(this.modal,this.amount);
    this.ecommerceCartService.addProductToCart(this.modal,this.amount);
    this.dialogRef.close();
  }

  closeModal(){
    this.dialogRef.close();
  }

}
