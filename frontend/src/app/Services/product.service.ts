import { Injectable } from '@angular/core';
import { ProductServ } from '../Models/product-service.model'
import { ProductModel } from '../Models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, filter} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CategoryService } from './category.service';
import { BrandService } from './brand.service';
import { BrandModel } from '../Models/brand.model';
import { CategoryModel } from '../Models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private products$ =  new BehaviorSubject<ProductModel[]>([]); // No tiene un valor inicial
  private brand: BrandModel;
  private category: CategoryModel;

  constructor( private http:HttpClient, private categoryService: CategoryService, private brandService:BrandService ) { }

  getProducts = ():Observable<ProductModel[]> => {
    this.getProductsFromServer();
    return this.products$.asObservable()
  }

  getProductsFromServer = () :void => {
    this.http.get<ProductModel[]>(`${environment.API_URL}/products`).pipe( map( products => { 
      this.products$.next(products) } )).subscribe();
  }

  filterProductsByParams = ( productName: string|null, categoryId: number|string , brandId: number|string  ) :Observable<ProductModel[]> => {
    console.log("productName", productName)
    console.log("categoryId", categoryId)
    console.log("brandId", brandId)
    return this.http.get<ProductModel[]>(`${environment.API_URL}/products?quickSearch=${productName}&brandId=${brandId}&categoryId=${categoryId}`).pipe( 
      tap( prods =>  this.products$.next(prods))
     )  
  } 

  addProduct = (product: ProductModel, producFormData?: FormData) :Observable<ProductServ> => {
  //  return this.http.post<ProductServ>(`${environment.API_URL}/products`,  new ProductServ(product.name, product.description, product.brand.id, product.category.id, product.price, product.stock, null)).pipe(
    return this.http.post<ProductServ>(`${environment.API_URL}/products`, producFormData).pipe(

     tap(( newProduct )=> { 
     console.log("newProduct -- !!", newProduct.imageUrl) 
    // this.categoryService.getCategoryById(newProduct.categoryId).subscribe( res => {  this.category = res })  
     this.categoryService.findCategory(newProduct.categoryId).subscribe( res   => {  
                                                                                  this.category = res },
                                                                         error => {

                                                                         })  
     this.brandService.findBrand(newProduct.brandId).subscribe( res => { 
                                                                          this.brand = res },
                                                                error => { 

                                                                })
     this.products$.next([...this.productsCollection(), { id: newProduct.id,
                                                          name: newProduct.name ,
                                                          description: newProduct.description,
                                                          brand: this.brand,
                                                          category: this.category,
                                                          price: newProduct.price,
                                                          stock: newProduct.stock,
                                                          image: newProduct.imageUrl }]) 
                                                          }))
  }

  editProduct = ( id:number , productFormData: FormData ) : Observable<ProductServ>  => { 
    return this.http.patch<ProductServ>(`${environment.API_URL}/products/${id}`, productFormData).pipe( 
      tap( ( editProduct ) => { console.log("Edit Product - ", editProduct)
     })
    )
  }

  deleteProduct( id:number ) :  Observable<ProductModel>{
    return this.http.delete<ProductModel>(`${environment.API_URL}/products/${id}`).pipe(
      tap( () => {
        this.products$.next(this.productsCollection().filter( (prod) => { if (prod.id !== id) return prod  } ))
      })
    )
  }

  productsCollection = () :ProductModel[] => {
    return this.products$.getValue()
  }
  
}

/*
http://localhost:3000/products?quickSearch=&brandId=7&categoryId=5
http://localhost:3000/products?quickSearch=iphone&brandId=7&categoryId=5 */