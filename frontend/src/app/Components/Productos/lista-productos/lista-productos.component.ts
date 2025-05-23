import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { InfoProductosComponent } from '../info-productos/info-productos.component';
import { DeleteItemComponent } from '../../Actions/Delete-Item/delete-item.component';

import { ProductService } from '../../../Services/product.service';
import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service'; 

import { ProductModel } from 'src/app/Models/product.model';
import { BrandModel } from 'src/app/Models/brand.model';
import { CategoryModel } from '../../../Models/category.model';
import { ModalData } from 'src/app/Models/modal-data.model';

@Component({
    selector: 'app-lista-productos',
    templateUrl: './lista-productos.component.html',
    styleUrls: ['./lista-productos.component.css']
})

export class ListaProductosComponent implements OnInit { 
    productIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="10vw" height="10vh" fill="currentColor" class="bi bi-cart-x-fill" viewBox="0 0 16 16">
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708"/>
    </svg>`;
    message: string = 'Producto';
    page: number = 0;
    formControls: any;
    filterProductForm: FormGroup = new FormGroup({
        productName: new FormControl(''),
        category: new FormControl(''),
        brand: new FormControl(''),
    }) 
    products: ProductModel[] = [];
    brands: BrandModel[];
    brand: BrandModel;
    categories: CategoryModel[];
    category: CategoryModel;

    constructor( private dialog: MatDialog, 
                 private productService: ProductService,
                 private brandService: BrandService,
                 private categoryService: CategoryService ) { }
 
    ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
            this.products = products;
          });
    this.categoryService.getCategories().subscribe(
        respond => { 
        this.categories = respond
        } ,
        error => {
        }
    )
    this.brandService.getBrands().subscribe(
        respond => {
        this.brands = respond
        } ,
        error => {
        }
    )
} 
    
    filterProducts(): void {
        this.categoryService.getCategoryByName(this.filterProductForm.value['category']).subscribe( respond => { this.category = respond },
                                                                                                    error   => {  })
        this.brandService.getBrandByName(this.filterProductForm.value['brand']).subscribe(  respond => { this.brand = respond },
                                                                                            error   => { }) 
        this.productService.getAllProducts( this.filterProductForm.value['productName'], this.category ? this.category.id : '' ,  this.brand ? this.brand.id : '' ).subscribe( res => this.products = res )
    }
    
    clearProductsFilter():void {
        // this.page = 0;
        this.formControls = this.getFormsKeys(this.filterProductForm);
        this.formControls.forEach( control => {
        this.filterProductForm.get(control).setValue('');
        this.filterProducts();
        })
    }
    
    addProduct():void {
        const modal = new ModalData('Agregar Producto', false, {}, 'Producto');    
        const dialog = this.dialog.open(InfoProductosComponent, {
            disableClose: true,
            data: modal
        })
    }

    editProduct(product: ProductModel) {
        console.log("EDIT PRODUCT LIST", product)
    const modal = new ModalData('Editar Producto', true, product, 'Producto');    
    const dialog = this.dialog.open(InfoProductosComponent, {
        disableClose: true,
        data: modal
      })
    }

    deleteProduct( product: ProductModel ) {    
        const modal = new ModalData('Eliminar Producto', false, product, 'Producto');
        const dialog = this.dialog.open(DeleteItemComponent, {
            disableClose: true,
            data:  modal});
    }

    getFormsKeys( form:FormGroup ): any[] {
        return Object.keys(form.controls); 
    } 

    changePreviusPage():void {
        if (this.page > 0) {
            this.page -= 5;
        }
    }  

    changeNextPage():void {
        this.page += 5;
    } 

} 





