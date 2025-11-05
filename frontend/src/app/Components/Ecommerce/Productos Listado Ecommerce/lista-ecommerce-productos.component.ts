import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/Services/product.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service'; 

import { ProductModel } from 'src/app/Models/product.model';
import { BrandModel } from 'src/app/Models/brand.model';
import { CategoryModel } from 'src/app/Models/category.model'; 

import { DetalleEcommerceProductoComponent } from '../Productos Detalle Ecommerce/detalle-ecommerce-producto.component';

import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { EcommerceCartService } from 'src/app/Services/ecommerce-cart.service';
import { CartModel } from 'src/app/Models/cart.model';

@Component({
  selector: 'app-lista-ecommerce-productos',
  templateUrl: './lista-ecommerce-productos.component.html',
  styleUrls: ['./lista-ecommerce-productos.component.css']
})

export class ListaEcommerceProductosComponent implements OnInit {

  products: ProductModel[] = [];
  brands: BrandModel[] = [];
  categories: CategoryModel[] = [];
  filterProductForm: FormGroup = new FormGroup({
          productName: new FormControl(''),
          category: new FormControl(''),
          brand: new FormControl(''),
      })
  brand: BrandModel = { name: '',
                        id: null }
  category: CategoryModel = { name: '',
                              id: null}
    

  constructor( private productService: ProductService,
               private pruductCartService: EcommerceCartService,
               private brandService: BrandService,
               private categoryService: CategoryService,
               private dialog: MatDialog, 
               private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(prods  => {
      this.products = prods; 
    });
    this.categoryService.getCategories().subscribe(
        respond => { 
        this.categories = respond
        } ,
        error => {
        })
    this.brandService.getBrands().subscribe(
        respond => {
        this.brands = respond
        } ,
        error => {
        })
  }

  filterProducts(): void {
        this.categoryService.findCategory(this.filterProductForm.value['category']).subscribe( respond => { 
                                                                                                            this.category = respond
         },
                                                                                               error   => { 
                                                                                               console.log("Error - ", error) 
                                                                                                })
        this.brandService.findBrand(this.filterProductForm.value['brand']).subscribe(  respond => { 
                                                                                                    this.brand = respond },
                                                                                       error   => { 
                                                                                                    console.log("Error - ", error) 
                                                                                       })                                                                               
        this.productService.filterProductsByParams( this.filterProductForm.value['productName'], this.category ? this.category.id : '' ,  this.brand ? this.brand.id : '' ).subscribe( res => { this.products = res })
  }
  
  clearProductsFilter():void {
        this.filterProductForm.get('productName').setValue('')
        this.filterProductForm.get('category').setValue('')
        this.filterProductForm.get('brand').setValue('')
        this.filterProducts(); 
  }

  showDetailProduct( product: ProductModel ): void {
    console.log("CLICK!!", product);
    const dialog = this.dialog.open(DetalleEcommerceProductoComponent, {
                disableClose: true,
                data: product
            })
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

  getPhoto( product:ProductModel ): SafeUrl | null {
    const productImage : string|null = (product as any)?.image ?? (product as any)?.imageUrl ?? null;
    if (productImage) {
      const imagePrev = this.normalizeImage(productImage);
      const image = this.sanitizer.bypassSecurityTrustUrl(imagePrev); 
      return image;
    }
    return null  
  }

  addProductToCart = (product: ProductModel, amount:number) =>{
    this.pruductCartService.addProductToCart(product, amount)
  }

}
