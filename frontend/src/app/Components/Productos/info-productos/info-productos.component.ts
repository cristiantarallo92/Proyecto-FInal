import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CancelEditionComponent } from '../../Actions/Cancel-Edition/cancel-edition.component';

import { BrandService } from 'src/app/Services/brand.service';
import { CategoryService } from 'src/app/Services/category.service'; 
import { ProductService } from 'src/app/Services/product.service'; 

import { Input } from 'src/app/Models/input.model'; 
import { ProductModel } from 'src/app/Models/product.model'; 
import { BrandModel } from 'src/app/Models/brand.model';
import { CategoryModel } from '../../../Models/category.model';
import * as  _ from "lodash";
import { ModalData } from 'src/app/Models/modal-data.model';
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
    brands: BrandModel[];
    categories: CategoryModel[];
    emptyForm: boolean;
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
                public dialogRef: MatDialogRef<InfoProductosComponent>, @Inject(MAT_DIALOG_DATA) public modal: ModalData
    ) { }

    ngOnInit(): void { 
        this.brandService.getBrands().subscribe(
            respond => {   
            this.brands = respond 
            } , 
            error => {
            }
        ) 
        this.categoryService.getCategories().subscribe(
            respond => {  
            this.categories = respond
            } ,
            error => {
            }
        ) 
        this.configModal(); 
        this.product = this.modal.modalData
    }

    configModal(): void {
        if (this.modal.modalMode) {
            this.productForm.controls['name'].setValue(this.modal.modalData['name']);
            this.productForm.controls['description'].setValue(this.modal.modalData['description']);
            this.productForm.controls['category'].setValue(this.modal.modalData.category['name']);
            this.productForm.controls['brand'].setValue(this.modal.modalData.brand['name']);
            this.productForm.controls['stock'].setValue(this.modal.modalData['stock']);
            this.productForm.controls['price'].setValue(this.modal.modalData['price']);
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
    }

    configInput(input: string): void {
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

    getBrand( brand:string ): BrandModel {
    return this.brands.find( ( { name } ) => name === brand )
    }
   
    getFormsValues():void {
        const productName: string = this.productForm.controls['name'].value;
        const productDescription: string  = this.productForm.controls['description'].value;
        this.product.name  = productName.trim()
        this.product.description = productDescription.trim()
        this.product.category = this.getCategory(this.productForm.controls['category'].value)
        this.product.brand = this.getBrand(this.productForm.controls['brand'].value) 
        this.product.stock =  this.convertStock(this.productForm.controls['stock'].value);
        this.product.price =  this.convertPrice(this.productForm.controls['price'].value) 
        console.log("form values", this.product)
    }
    
    convertPrice( price:any ) : number {
        if (price === null || price === undefined || price.toString().trim() === '') {
            return 0; }
        const normalizedPrice = price.toString().replace(',', '.'); 
        const parsed = parseFloat(normalizedPrice);
        if (isNaN(parsed)) {
            return 0; }
        return parsed;
    }

    convertStock( stock:number ): number {
        if( stock === undefined || stock == null  || stock.toString().trim() === '' )  {
            return 0;
        } else { 
            return stock;
        }
    }

    saveModal() {  
            const product = { id: this.product.id, 
                              name: this.product.name,
                              description: this.product.description,
                              brand: this.product.brand,
                              category: this.product.category,
                              price: this.convertPrice(this.product.price),
                              stock: this.product.stock}   
        this.getFormsValues();
        if(this.modal.modalMode){
        if (this.getInputIndex() == -1  ) { 
            if( _.isEqual(product, this.product) ) {
                this.dialogRef.close();  
            } else {  
            this.productService.editProduct(this.product.id, this.product).subscribe(
                res => {
                window.alert("Producto editado correctamente. ");
                this.dialogRef.close();
                } , 
                err => {
                console.log("err", err);
                window.alert("ERROR - No pudo completarse la edicion del producto. Por favor intente nuevamente en unos minutos ...");
                this.dialogRef.close();
                } 
            )}
        } else {
        this.dialog.open(CancelEditionComponent, { disableClose: true })
        }
      } else {
        this.productService.addProduct(this.product).subscribe(
                () => {

                window.alert("Producto creado correctamente. ");
                this.dialogRef.close();
                },
                error  => {
                    console.log("Error - ", error)
                    window.alert("ERROR - No pudo agregar el producto. Por favor intente nuevamente en unos minutos ...");
                    this.dialogRef.close();  
                }
              );
        } 
    } 

    cancelModal(): void {
    this.emptyForm =  Object.values(this.productForm.value).every(value => value === '' || value === null || value == 0) 
    if( (this.getInputIndex() == -1 && this.emptyForm && this.modal.modalMode == false ) || (this.getInputIndex() == -1 && this.emptyForm  == false && this.modal.modalMode ) ) {
        this.dialogRef.close();
        } else {
            this.dialog.open(CancelEditionComponent, { disableClose: true })
        }  
    }
    
}
