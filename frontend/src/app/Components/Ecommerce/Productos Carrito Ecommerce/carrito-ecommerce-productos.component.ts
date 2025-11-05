import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { ProductModel } from 'src/app/Models/product.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { CartModel } from 'src/app/Models/cart.model';
import { EcommerceCartService } from 'src/app/Services/ecommerce-cart.service';
import { FinalizaCompraEcommerceComponent } from '../Productos Carrito Finaliza Ecommerce/finaliza-compra-ecommerce.component';
import { DetalleEcommerceProductoComponent } from '../Productos Detalle Ecommerce/detalle-ecommerce-producto.component';
import { MatDialog } from '@angular/material/dialog';
import { CarritoVacioEcommerceProductoComponent } from '../Productos Vacio Ecommerce/carrito-vacio-ecommerce-producto.component';

@Component({
  selector: 'app-carrito-ecommerce-productos',
  templateUrl: './carrito-ecommerce-productos.component.html',
  styleUrls: ['./carrito-ecommerce-productos.component.css']
})
export class CarritoEcommerceProductosComponent implements OnInit {


constructor( private pruductCartService: EcommerceCartService,
             private sanitizer: DomSanitizer,
             private dialog: MatDialog) { }
  
productsCart: CartModel[] = []
val:number = 0;

ngOnInit(): void { 
  this.pruductCartService.getProductsCart().subscribe( prods => {
  this.productsCart = prods; })
  }

normalizeImage = (image: string | null): string | null => {
    if (!image) return null;
    // 1) Si ya viene como data URL, devolver tal cual
    if (image.startsWith('data:image')) return image;
    // 2) Si es una ruta absoluta o relativa del servidor, construir URL completa
    if (image.startsWith('http')) return image;
    if (image.startsWith('/')) return `${environment.API_URL}${image}`;
    // 3) Si parece ser base64 sin prefijo, agregarlo
    return `data:image/jpeg;base64,${image}` 
  }

getPhoto = ( product:ProductModel ): SafeUrl | null => {
  const productImage : string|null = (product as any)?.image ?? (product as any)?.imageUrl ?? null;
    if (productImage) {
        const imagePrev = this.normalizeImage(productImage);
        const image = this.sanitizer.bypassSecurityTrustUrl(imagePrev); 
        return image;}
    return null 
  }

deleteProduct = ( product: ProductModel): void => {
  this.pruductCartService.deleteProduct(product);
}    

clearCart = (): void => {
  this.pruductCartService.clearCart();
  }  

calculateTotal = (): number => {
  return this.productsCart.reduce((finalPrice, p) => finalPrice + p.product.price * p.amount,0);
}  

finishCart = () => {
  if(this.productsCart.length == 0) {
    const dialog = this.dialog.open(CarritoVacioEcommerceProductoComponent,{
                disableClose: true
            })
  } else {
    const dialog = this.dialog.open(FinalizaCompraEcommerceComponent, {
                disableClose: true,
                data: this.productsCart })
              }
  }


}



 
   
