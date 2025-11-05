import { Component, Inject, OnInit } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { InfoProductosComponent } from '../../Productos/info-productos/info-productos.component';
import { CartModel } from 'src/app/Models/cart.model';
import { ProductModel } from 'src/app/Models/product.model';
import { SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-finaliza-compra-ecommerce',
  templateUrl: './finaliza-compra-ecommerce.component.html',
  styleUrls: ['./finaliza-compra-ecommerce.component.css']
})
export class FinalizaCompraEcommerceComponent implements OnInit {
  sanitizer: any;

    constructor( public dialogRef: MatDialogRef<InfoProductosComponent>, @Inject(MAT_DIALOG_DATA) public productsCart:CartModel[]) { }

  ngOnInit(): void {}

  normalizeImage = (image: string | null): string | null => {
      if (!image) return null;
      // 1) Si ya viene como data URL, devolver tal cual
      if (image.startsWith('data:image')) return image;
      // 2) Si es una ruta absoluta o relativa del servidor, construir URL completa
      if (image.startsWith('http')) return image;
      if (image.startsWith('/')) return `${environment.API_URL}${image}`;
      // 3) Si parece ser base64 sin prefijo, agregarlo
      return `data:image/jpeg;base64,${image}`;
  }
  
  getPhoto = ( product:ProductModel ): SafeUrl | null => {
    const productImage : string|null = (product as any)?.image ?? (product as any)?.imageUrl ?? null;
    if (productImage) {
      const imagePrev = this.normalizeImage(productImage);
      const image = this.sanitizer.bypassSecurityTrustUrl(imagePrev); 
      return image;
      }
    return null  
  }

  calculateTotal = (): number => {
    return this.productsCart.reduce((finalPrice, p) => finalPrice + p.product.price * p.amount,0);
  }

  closeModal = () => {
    this.dialogRef.close();
  }

}


