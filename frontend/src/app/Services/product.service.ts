import { Injectable } from '@angular/core';
import { Product } from '../Models/product.model';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts = () =>  {
    return axios.get(`${environment.API_URL}/products`)
  }

  addProduct = ( product:Product) => {
    return axios.post(`${environment.API_URL}/products`, JSON.stringify(product) )
  }

  editProduct = ( id:number , product:Product ) => {
      console.log("Producto a editar - " , product)
    return axios.patch(`${environment.API_URL}/products/${id}`, JSON.stringify(product))
  }
  
}


