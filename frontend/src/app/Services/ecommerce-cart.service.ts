import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartModel } from '../Models/cart.model';
import { ProductModel } from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class EcommerceCartService {
  
  private ecommerceCart = new BehaviorSubject<CartModel[]>([]);
  
  constructor() { }
  
  getProductsCart  = ():Observable<CartModel[]>  => { 
    return this.ecommerceCart.asObservable()
  }

  addProductToCart = ( itemProduct:ProductModel , itemAmount: number): void => {
    const itemProductCart: CartModel = this.findProductInCart(itemProduct);
    if ( !itemProductCart ) {
      const itemProductCart:CartModel = { product:itemProduct, amount: itemAmount };
      this.ecommerceCart.next([...this.ecommerceCart.getValue(), itemProductCart]);
    } else {
      this.editProductInCart(itemProductCart, itemAmount);
    }                                      
  }

  editProductInCart = ( itemProductCart: CartModel , amount: number ) =>{
   //this.ecommerceCart.getValue().filter( p => p.product.id == itemProductCart.product.id, console.log("El producto a editar es:", itemProductCart));
    this.ecommerceCart.getValue().forEach( p => { if (p.product.id == itemProductCart.product.id) {
    console.log("p amount", p.amount)
    console.log("amount",itemProductCart.amount )
    p.amount = p.amount + amount
    return p; } else {
      return p;
    }})  
  }

  deleteProduct = ( prod:ProductModel ) => {
    this.ecommerceCart.next(this.ecommerceCart.getValue().filter( p => p.product.id !== prod.id  ))  
    console.log("Productos sin prods", this.ecommerceCart.getValue())
  }

  findProductInCart = ( product:ProductModel ): any => { 
    return (this.ecommerceCart.getValue()).find( p => p.product.id == product.id)
  } 

  clearCart = () =>{
    this.ecommerceCart.next([])
  }

}
