import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl  } from '@angular/platform-browser';

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
        price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]) ,
       // image: new FormControl(null)
    });
    imageConverted: Blob;
    brands: BrandModel[];
    brand: BrandModel;
    category: CategoryModel;
    categories: CategoryModel[];
    emptyForm: boolean;
    loadingImage: boolean;
    prevImage: SafeUrl | null = null;   
    prevImageBase64: string | null = null;  // <<< AGREGAR para guardar base64 crudo
    images: any = [];
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
                private sanitizer: DomSanitizer,
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
       /* this.product = this.modal.modalData
        console.log("MODAL !! ", this.modal.modalData)
        this.prevImage = this.modal.modalData.image */
       
    }

    
    configModal = (): void => { /*
        if(this.modal.modalMode) {
            const producto = this.modal.modalData;
            this.product = producto;
            console.log("typeof", typeof(producto.image) );
            console.log("chatgpt", producto.image);
            this.productForm.controls['name'].setValue(producto['name']);
            this.productForm.controls['description'].setValue(producto['description']);
            this.productForm.controls['category'].setValue(producto.category['name']);
            this.productForm.controls['brand'].setValue(producto.brand['name']);
            this.productForm.controls['stock'].setValue(producto['stock']);
            this.productForm.controls['price'].setValue(producto['price']);
        if (producto.image) {
            const imageSrc = this.normalizeImage(producto.image);
            this.prevImage = this.sanitizer.bypassSecurityTrustUrl(imageSrc);
            this.prevImageBase64 = imageSrc;
            console.log("Imagen normalizada en configModal:", this.prevImageBase64);
        } else {
            this.prevImage = null;
            this.prevImageBase64 = null;}
        } */
 console.log("modalData", this.modal.modalData)
        
  if (!this.modal.modalMode) return;

  const producto = this.modal.modalData;
  this.product = producto;

  this.productForm.patchValue({
    name: producto?.name ?? '',
    description: producto?.description ?? '',
    category: producto?.category?.name ?? '',
    brand: producto?.brand?.name ?? '',
    stock: producto?.stock ?? '',
    price: producto?.price ?? ''
  });

  // ⚠️ Soporta image o imageUrl
  const rawImage: string | null =
    (producto as any)?.image ?? (producto as any)?.imageUrl ?? null;

  if (rawImage) {
    const imageSrc = this.normalizeImage(rawImage); // agrega prefijo si hace falta
    this.prevImage = this.sanitizer.bypassSecurityTrustUrl(imageSrc);
    this.prevImageBase64 = imageSrc; // guardo el base64 (con prefijo) para enviar al backend
  } else {
    this.prevImage = null;
    this.prevImageBase64 = null;
  }

  this.disabledInput();    
    }

    disabledInput = (): void => {
        this.productForm.controls['name'].disable();
        this.productForm.controls['description'].disable();
        this.productForm.controls['category'].disable();
        this.productForm.controls['brand'].disable();
        this.productForm.controls['stock'].disable();
        this.productForm.controls['price'].disable();
    }

    configInput = (input: string): void => {
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

    editControl = (input: string): void => {
        const index2 = this.getInputActive(input)
        if (this.getInputIndex() !== -1) {
            this.dialog.open(CancelEditionComponent, { disableClose: true })
        } else {
            this.productForm.controls[`${input}`].enable();
            this.formInputs[index2].editMode = false;
            this.formInputs[index2].saveMode = true;
        }
    }

    saveControl = (input: string): void => {
        const index = this.formInputs.findIndex(inp => inp.inputName == input)
        if (this.productForm.controls[`${input}`].valid == true) {
            this.productForm.controls[`${input}`].valueChanges.subscribe()
            this.productForm.controls[`${input}`].disable();
            this.formInputs[index].editMode = true;
            this.formInputs[index].saveMode = false;
        }
    }

    getInputActive = (input: string): number => {
        return this.formInputs.findIndex(inp => inp.inputName == input);
    }

    getInputIndex = (): number => {
        return this.formInputs.findIndex(inp => inp.editMode == false);
    }
    

    getCategory = ( category:string ): CategoryModel => {   
        this.categoryService.findCategory(category).subscribe( respond => { 
                                                                            this.category = respond } ,
                                                               error   => {} )  
        console.log("this.category",category)
        return this.category;     
    }

    getBrand = ( brand:string ): BrandModel => {
        this.brandService.findBrand(brand).subscribe(  respond => { 
                                                                      this.brand = respond } ,
                                                       error   => {
                                                        
                                                       } )  
        console.log("this.brand",brand)
        return this.brand;
    }
   
    getFormsValues = (): FormData => { /*
 const formDataProd = new FormData();
 const brand : BrandModel = this.getBrand(this.productForm.controls['brand'].value)
 const category : CategoryModel = this.getCategory(this.productForm.controls['category'].value)
  formDataProd.append('name', this.productForm.value['name']);
  formDataProd.append('description', this.productForm.value['description']);
  formDataProd.append('price', this.productForm.value['price']);
  formDataProd.append('stock', this.productForm.value['stock']);
  formDataProd.append('brandId', (brand.id).toString());
  formDataProd.append('categoryId',(category.id).toString());
  formDataProd.append('imageUrl', this.prevImageBase64 ?? '');

  return formDataProd; */

  const form = this.productForm.value;

  // ❌ NO uses llamadas async aquí (getBrand/getCategory). Usá lo ya cargado:
  const brand = this.brands?.find(b => b.name === form['brand']);
  const category = this.categories?.find(c => c.name === form['category']);

  const fd = new FormData();
  fd.append('name', (form['name'] ?? '').trim());
  fd.append('description', (form['description'] ?? '').trim());
  fd.append('price', String(this.convertPrice(form['price'])));
  fd.append('stock', String(this.convertStock(form['stock'])));
  fd.append('brandId', brand?.id != null ? String(brand.id) : '');
  fd.append('categoryId', category?.id != null ? String(category.id) : '');

  // Solo envío imageUrl si tengo algo (evita pisar con vacío)
  if (this.prevImageBase64) {
    fd.append('imageUrl', this.prevImageBase64);
  }

  return fd;

    }
    
    convertPrice = ( price:any ): number => {
        if (price === null || price === undefined || price.toString().trim() === '') {
            return 0; }
        const normalizedPrice = price.toString().replace(',', '.'); 
        const parsed = parseFloat(normalizedPrice); 
        if (isNaN(parsed)) {
            return 0; }
        return parsed;
    }

    convertStock = ( stock:number ): number => {
        if( stock === undefined || stock == null  || stock.toString().trim() === '' )  {
            return 0;
        } else { 
            return stock;
        }
    }

addImage(event: any): void { /*
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const imageBase64 = reader.result as string;
    this.prevImage = this.sanitizer.bypassSecurityTrustUrl(imageBase64);
    this.prevImageBase64 = imageBase64;
    console.log("Imagen cargada desde input:", this.prevImageBase64);
  }; */

    const file: File | undefined = event?.target?.files?.[0];
  if (!file) return;

  if (!/^image\/(png|jpe?g)$/.test(file.type)) {
    window.alert('El documento seleccionado no es una imagen. Por favor elija un archivo .jpg / .png');
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file); // => "data:image/...;base64,xxxx"
  reader.onload = () => {
    const base64 = String(reader.result || '');
    this.prevImageBase64 = base64; // crudo para backend
    this.prevImage = this.sanitizer.bypassSecurityTrustUrl(base64); // para renderizar
    console.log('prevImageBase64 (addImage):', base64.slice(0, 80));
  };
} 
 
    normalizeImage(image: string | null): string | null {
        if (!image) return null;
        // Si ya tiene prefijo, la devuelvo tal cual
        if (image.startsWith('data:image')) return image;
        // Si es solo base64, agrego prefijo (jpeg por defecto)
        return `data:image/jpeg;base64,${image}`;
        }
 
    convertToBlobFile = async ($event: any) => new Promise((resolve, reject) => {
        try{
            const unsafeImg = window.URL.createObjectURL($event);
            const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
            const reader = new FileReader();
            reader.readAsDataURL($event);
            reader.onload = () => { resolve({ blob: $event,
                                              image,
                                              base: reader.result });};
            reader.onerror = error => { resolve({ blob: $event,
                                                  image,
                                                  base: null});};
        } 
        catch (e) {
            return null 
        }
    })

    saveModal() {  
        const product = { id: this.product.id, 
                              name: this.product.name,
                              description: this.product.description,
                              brand: this.product.brand,
                              category: this.product.category,
                              price: this.convertPrice(this.product.price),
                              stock: this.product.stock}   
        const prod: FormData = this.getFormsValues();

        if(this.modal.modalMode){
        if (this.getInputIndex() == -1  ) { 
            if( _.isEqual(product, this.product) ) {
                this.dialogRef.close();  
            } else {  
            console.log("prod get" , prod.get('imageUrl')  )
            this.productService.editProduct(this.product.id, prod).subscribe(
                res => {
                window.alert("Producto editado correctamente. ");
                this.dialogRef.close();
                } , 
                err => {
                console.log("err", err);
                window.alert("ERROR - No pudo completarse la edicion del producto. Por favor intente nuevamente en unos minutos ...");
                this.dialogRef.close();
                } 
            ) } 

        } else {
        this.dialog.open(CancelEditionComponent, { disableClose: true })
        }
      } else {
        this.productService.addProduct(this.product, prod).subscribe(
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
