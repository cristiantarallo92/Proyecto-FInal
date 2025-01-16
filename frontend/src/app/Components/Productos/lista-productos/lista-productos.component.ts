import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InfoProductosComponent } from '../info-productos/info-productos.component';
import { DeleteItemComponent } from '../../Actions/Delete-Item/delete-item.component';
import { Product } from 'src/app/Models/product.model';
import { NotFoundComponent } from '../../404/not-found/not-found.component';
import { ProductFilter } from '../../../Models/product-filter.model';
import { Category } from '../../../Models/category.model';
import { ProductService } from '../../../Services/product.service';


@Component({
    selector: 'app-lista-productos',
    templateUrl: './lista-productos.component.html',
    styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
     
    selected: any;
    newProduct = new Product();
    productIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="10vw" height="10vh" fill="currentColor" class="bi bi-cart-x-fill" viewBox="0 0 16 16">
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708"/>
  </svg>`;
    message: string = 'Producto';
    marcas: any[] = [
        {
            id: 0,
            nombreMarca: "Todos"
        },
        {
            id: 1,
            nombreMarca: "Terrabussi"
        },
        {
            id: 2,
            nombreMarca: "ARCOR",
        },
        {
            id: 3,
            nombreMarca: "Fel Fort"
        }]
    categorias: any[] = [
        {
            id: 0,
            nombreCategoria: "Todos"
        },
        {
            id: 1,
            nombreCategoria: "Alfajores"
        },
        {
            id: 2,
            nombreCategoria: "Chocolate"
        },
        {
            id: 3,
            nombreCategoria: "Golosina"
        }]

    page: number = 0;
    formControls: any;
    filterProductForm: FormGroup = new FormGroup({
        productName: new FormControl(''),
        category: new FormControl(''),
        brand: new FormControl(''),
    }) 
    productFilter: ProductFilter = {
        productName: '',
        category: '',
        brand: '',
    };
    
    products: Product;

    constructor( private dialog: MatDialog, private productService: ProductService ) { }

    ngOnInit(): void {
        this.products = this.productService.getProducts();
    }

    filterProducts() {
        this.page = 0;
        this.productFilter = {
            productName: this.filterProductForm.value['productName'],
            category: this.filterProductForm.value['category'],
            brand: this.filterProductForm.value['brand']
        }
        
        const dialog = this.dialog.open(InfoProductosComponent, {
            disableClose: true,
            data: {
                titleName: 'Agregar Producto',
                showEditIcon: false
            }
        })
        
    }
    
    clearProductsFilter() {
        this.page = 0;
        this.formControls = this.getFormsKeys(this.filterProductForm);
        this.formControls.forEach( control => {
        this.filterProductForm.get(control).setValue('');
   })
  
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

    addProduct() {
        console.log("ADD")
        const dialog = this.dialog.open(InfoProductosComponent, {
            disableClose: true,
            data: {
                titleName: 'Agregar Producto',
                showEditIcon: false
            }
        })
       dialog.afterClosed().subscribe(( res: Product ) => {
           this.newProduct.id = 22;
           this.newProduct.productName = res.productName;
           this.newProduct.descripcion = res.descripcion;
           this.newProduct.brand = res.brand;
           this.newProduct.category = res.category;
           this.newProduct.price = res.stock;
           this.newProduct.stock = res.stock;
        //   this.products.push(this.newProduct)
        })
    }

    editProduct(product: Product) {
    console.log("Producto a editar:", product)
    const dialog = this.dialog.open(InfoProductosComponent, {
        disableClose: true,
        data: {
            titleName: 'Editar Producto',
            showEditIcon: true,
            product: product
        }
    })
  /*  dialog.afterClosed().subscribe(( res:Product ) => {
        console.log("EDITADO", res)
        this.products.filter( ( product ) => {
            if( product.id == res.id ){
                product.productName = res.productName;
                product.descripcion = res.descripcion;
                product.brand = res.brand;
                product.category = res.category;
                product.price = res.price;
                product.stock = res.stock;
            }
        } )
     }) */
}

    

}





