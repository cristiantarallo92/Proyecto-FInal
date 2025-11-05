import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
import { environment } from 'src/environments/environment';

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
        price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]),
    });
    imageConverted: Blob;
    brands: BrandModel[];
    brand: BrandModel;
    category: CategoryModel;
    categories: CategoryModel[];
    emptyForm: boolean;
    loadingImage: boolean;
    prevImage: SafeUrl | null = null;
    prevImageBase64: string | null = null;  
    selectedImageFile: File | null = null;  
    images: any = [];
    formInputs: Input[] = [{
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
            },
            error => {
            }
        )
        this.categoryService.getCategories().subscribe(
            respond => {
                this.categories = respond
            },
            error => {
            }
        )
        this.configModal();
    }


    configModal = (): void => { 

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


    getCategory = (category: string): CategoryModel => {
        this.categoryService.findCategory(category).subscribe(respond => {
            this.category = respond
        },
            error => { })
        console.log("this.category", category)
        return this.category;
    }

    getBrand = (brand: string): BrandModel => {
        this.brandService.findBrand(brand).subscribe(respond => {
            this.brand = respond
        },
            error => {

            })
        console.log("this.brand", brand)
        return this.brand;
    }

    getFormsValues = (): FormData => { 

        const form = this.productForm.value;
        const brand = this.brands?.find(b => b.name === form['brand']);
        const category = this.categories?.find(c => c.name === form['category']);

        const fd = new FormData();
        fd.append('name', (form['name'] ?? '').trim());
        fd.append('description', (form['description'] ?? '').trim());
        fd.append('price', String(this.convertPrice(form['price'])));
        fd.append('stock', String(this.convertStock(form['stock'])));
        fd.append('brandId', brand?.id != null ? String(brand.id) : '');
        fd.append('categoryId', category?.id != null ? String(category.id) : '');
        if (this.selectedImageFile) {
            fd.append('image', this.selectedImageFile);
        }
        return fd;
    }

    convertPrice = (price: any): number => {
        if (price === null || price === undefined || price.toString().trim() === '') {
            return 0;
        }
        const normalizedPrice = price.toString().replace(',', '.');
        const parsed = parseFloat(normalizedPrice);
        if (isNaN(parsed)) {
            return 0;
        }
        return parsed;
    }

    convertStock = (stock: number): number => {
        if (stock === undefined || stock == null || stock.toString().trim() === '') {
            return 0;
        } else {
            return stock;
        }
    }

    addImage(event: any): void { 
        
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
            this.prevImageBase64 = base64; // solo para renderizar
            this.prevImage = this.sanitizer.bypassSecurityTrustUrl(base64); // para renderizar
            console.log('prevImageBase64 (addImage):', base64.slice(0, 80));
        };
        // Guardo el archivo real para enviar en el FormData
        this.selectedImageFile = file;
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

    convertToBlobFile = async ($event: any) => new Promise((resolve, reject) => {
        try {
            const unsafeImg = window.URL.createObjectURL($event);
            const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
            const reader = new FileReader();
            reader.readAsDataURL($event);
            reader.onload = () => {
                resolve({
                    blob: $event,
                    image,
                    base: reader.result
                });
            };
            reader.onerror = error => {
                resolve({
                    blob: $event,
                    image,
                    base: null
                });
            };
        }
        catch (e) {
            return null
        }
    })

    saveModal() {
        const product = {
            id: this.product.id,
            name: this.product.name,
            description: this.product.description,
            brand: this.product.brand,
            category: this.product.category,
            price: this.convertPrice(this.product.price),
            stock: this.product.stock
        }
        const prod: FormData = this.getFormsValues();

        // DEBUG: logueo del FormData que se enviará
        try {
            const entries = Array.from((prod as any).entries?.() || []);
            console.log('[INFO-PRODUCTOS] FormData a enviar:', entries.map(([k, v]: any[]) => {
                const type = typeof v;
                const preview = type === 'string' ? (v as string).slice(0, 80) : v;
                return [k, type, preview];
            }));
            console.log('[INFO-PRODUCTOS] prevImageBase64? ', !!this.prevImageBase64, 'len:', this.prevImageBase64?.length || 0);
        } catch (e) {
            console.log('[INFO-PRODUCTOS] Error inspeccionando FormData', e);
        }

        if (this.modal.modalMode) {
            if (this.getInputIndex() == -1) {
                if (_.isEqual(product, this.product)) {
                    this.dialogRef.close();
                } else {
                    console.log("prod get", prod.get('imageUrl'))
                    this.productService.editProduct(this.product.id, prod).subscribe(
                        res => {
                            console.log('[INFO-PRODUCTOS] Respuesta editProduct()', res);
                            window.alert("Producto editado correctamente. ");
                            this.dialogRef.close();
                        },
                        err => {
                            console.log('[INFO-PRODUCTOS] ERROR editProduct()', err);
                            window.alert("ERROR - No pudo completarse la edicion del producto. Por favor intente nuevamente en unos minutos ...");
                            this.dialogRef.close();
                        }
                    )
                }

            } else {
                this.dialog.open(CancelEditionComponent, { disableClose: true })
            }
        } else {
            this.productService.addProduct(prod).subscribe(
                () => {

                    window.alert("Producto creado correctamente. ");
                    this.dialogRef.close();
                },
                error => {
                    console.log("Error - ", error)
                    window.alert("ERROR - No pudo agregar el producto. Por favor intente nuevamente en unos minutos ...");
                    this.dialogRef.close();
                }
            );
        }
    }

    cancelModal(): void {
        this.emptyForm = Object.values(this.productForm.value).every(value => value === '' || value === null || value == 0)
        if ((this.getInputIndex() == -1 && this.emptyForm && this.modal.modalMode == false) || (this.getInputIndex() == -1 && this.emptyForm == false && this.modal.modalMode)) {
            this.dialogRef.close();
        } else {
            this.dialog.open(CancelEditionComponent, { disableClose: true })
        }
    }

}
