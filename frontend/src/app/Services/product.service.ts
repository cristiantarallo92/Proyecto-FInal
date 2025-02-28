import { Injectable } from '@angular/core';
import { ProductServ } from '../Models/product-service.model'
import { ProductModel } from '../Models/product.model';
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

  getAllProducts = ( filteredProduct:any ) =>{
    console.log("PRUEBA",`${environment.API_URL}/products?quickSearch=${filteredProduct.name}&brandId=${filteredProduct.brand.id}&categoryId=${filteredProduct.category.id}` )
    return axios.get(`${environment.API_URL}/products?quickSearch=${filteredProduct.name}&brandId=${filteredProduct.brand.id}&categoryId=${filteredProduct.category.id}`) 
  }

  addProduct = ( product:ProductModel )  => {
    return axios.post(`${environment.API_URL}/products`, new ProductServ(product.name, product.description, product.brand.id, product.category.id, product.price, product.stock)) 
  }

  editProduct = ( id:number , product:any ) => {
    return axios.patch(`${environment.API_URL}/products/${id}`, new ProductServ(product.name, product.description, product.brand.id, product.category.id, product.price, product.stock))
  }

  deleteProduct( id:number) {
    return axios.delete(`${environment.API_URL}/products/${id}`)
  }
  
}


