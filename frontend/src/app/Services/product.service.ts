import { Injectable } from '@angular/core';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Product {
      return {
        id:           1,
        productName:  'Caramelo',
        descripcion:  'dsds',
        brand:        'Arcor',
        category:     'Caramelos',
        price:        550.50,
        stock:        1244
      }
  }

}


