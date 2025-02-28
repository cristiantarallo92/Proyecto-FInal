import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CancelEditionComponent } from '../../Actions/Cancel-Edition/cancel-edition.component';

import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service'; 
import { ProductService } from 'src/app/Services/product.service'; 

import { Input } from 'src/app/Models/input.model'; 
import { ProductModel } from 'src/app/Models/product.model'; 
import { Brand } from 'src/app/Models/brand.model';
import { Category } from '../../../Models/category.model';



@Component({
    selector: 'app-info-productos',
    templateUrl: './info-productos.component.html',
    styleUrls: ['./info-productos.component.css']
})
export class InfoProductosComponent implements OnInit {
    
    product = new ProductModel();
    productForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
        description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
        category: new FormControl('', [Validators.required]),
        brand: new FormControl('', [Validators.required]),
        stock: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
        price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]) 
    });
    brands: Brand[];
    categories: Category[];
    formInputs: Input [] = [{
        inputName: 'name',
        editMode: true,
        saveMode: false
    },
    {
        inputName: 'description',
        editMode: true,
        saveMode: false
    },
    {
        inputName: 'category',
        editMode: true,
        saveMode: false
    },
    {
        inputName: 'brand',
        editMode: true,
        saveMode: false
    },
    {
        inputName: 'stock',
        editMode: true,
        saveMode: false
    },
    {
        inputName: 'price',
        editMode: true,
        saveMode: false
    }]
   

    constructor(private brandService: BrandService,
                private categoryService: CategoryService, 
                private productService: ProductService,
                private dialog: MatDialog,
                public dialogRef: MatDialogRef<InfoProductosComponent>, @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.brandService.getBrands().then( ( res ) => {
            this.brands  = res.data 
            console.log("Braandss  - ", this.brands)
        })
        this.categoryService.getCategories().then( ( res ) => {
            this.categories  = res.data  
            console.log("categories  - ", this.categories)
        })  
        console.log("MODAL  -  " , this.data)
        this.configModal();
    }

    configModal(): void {
        if (this.data.showEditIcon == true) {
            this.product = this.data.product;
            console.log("product", this.product)
            console.log("data.product", this.data.product)
            this.productForm.controls['name'].setValue(this.product.name);
            this.productForm.controls['description'].setValue(this.product.description);
            this.productForm.controls['category'].setValue(this.product.category.name);
            this.productForm.controls['brand'].setValue(this.product.brand.name);
            this.productForm.controls['stock'].setValue(this.product.stock);
            this.productForm.controls['price'].setValue(this.product.price);
            this.disabledInput();
        }
    }

    disabledInput(): void {
        this.productForm.controls['name'].disable();
        this.productForm.controls['description'].disable();
        this.productForm.controls['category'].disable();
        this.productForm.controls['brand'].disable();
        this.productForm.controls['stock'].disable();
        this.productForm.controls['price'].disable();
        //  this.productForm.controls[`${input}`].disable();
    }

    configInput(input: string): void {
        console.log("configInput", input)
        switch (input) {
            case 'name':
               // this.productForm.controls[`${input}`].setValue(this.product.productName);
                break;
            case 'description':
                this.productForm.controls[`${input}`].setValue(this.product.description);
                break;
            case 'category':
                this.productForm.controls[`${input}`].setValue(this.product.category.name);
                break;
            case 'brand':
                this.productForm.controls[`${input}`].setValue(this.product.brand.name);
                break;
            case 'stock':
                this.productForm.controls[`${input}`].setValue(this.product.stock);
                break;
            case 'precio':
                this.productForm.controls[`${input}`].setValue(this.product.price);
                break;
        }
    }

    editControl(input: string): void {
        const index2 = this.getInputActive(input)
        if (this.getInputIndex() !== -1) {
            this.dialog.open(CancelEditionComponent, { disableClose: true })
        } else {
            this.productForm.controls[`${input}`].enable();
            this.formInputs[index2].editMode = false;
            this.formInputs[index2].saveMode = true;
        }
    }

    saveControl(input: string): void {
        const index = this.formInputs.findIndex(inp => inp.inputName == input)
        if (this.productForm.controls[`${input}`].valid == true) {
            this.productForm.controls[`${input}`].valueChanges.subscribe()
            this.productForm.controls[`${input}`].disable();
            this.formInputs[index].editMode = true;
            this.formInputs[index].saveMode = false;
        }
        this.productForm.value
    }

    getInputActive(input: string): number {
        return this.formInputs.findIndex(inp => inp.inputName == input);
    }

    getInputIndex(): number {
        return this.formInputs.findIndex(inp => inp.editMode == false);
    }
    
    getCategory( category:string ){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         console.log("category desc",category)
    return this.categories.find( ( { name } ) => name === category)
    }

    getBrand( brand:string ): Brand {
    return this.brands.find( ( { name } ) => name === brand )
    }

    getFormsValues():void {
        this.product.name = this.productForm.controls['name'].value;
        this.product.description = this.productForm.controls['description'].value;
        this.product.category = this.getCategory(this.productForm.controls['category'].value)
        this.product.brand = this.getBrand(this.productForm.controls['brand'].value)
        this.product.stock = this.productForm.controls['stock'].value;
        this.product.price =  this.convertPrice(this.productForm.controls['price'].value);

        console.log("PRODUCTO -- !!", this.product)
    }
    
    convertPrice( price:number ){
    return parseFloat((price.toString()).replace(",","."));
    }

    saveModal() { 
      this.getFormsValues()  
      if(this.data.showEditIcon){
        if (this.getInputIndex() == -1) {
        this.productService.editProduct(this.product.id, this.product ).then( ( res )=> {
                if(res.status == 200 ){
                 window.alert("Producto editado correctamente. ");
                 this.dialogRef.close();
                  }  
             }).catch ( ( err )=> {
                 console.log("err", err)
                 window.alert("ERROR - No pudo completarse la edicion del producto. Por favor intente nuevamente en unos minutos ...");
                 this.dialogRef.close();
             })
        } else {
        this.dialog.open(CancelEditionComponent, { disableClose: true })
        }
      } else {
        console.log("SAVE MODAL PRODUDCT - ", this.product)
        this.productService.addProduct(this.product).then( (res) =>{
            if(res.status = 201){
                window.alert("Producto creado correctamente. ");
                this.dialogRef.close();
            }
        }).catch( (err)=> {
            console.log("err", err)
            window.alert("ERROR - No pudo agregar el producto. Por favor intente nuevamente en unos minutos ...");
            this.dialogRef.close(); 
        }) 
      } 
    }

    cancelModal() {
        if (this.getInputIndex() == -1) {
            this.dialogRef.close()
        } else {
            this.dialog.open(CancelEditionComponent, { disableClose: true })
        } 
    }
    
}
