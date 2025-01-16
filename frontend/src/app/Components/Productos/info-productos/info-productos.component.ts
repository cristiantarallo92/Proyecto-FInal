import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CancelEditionComponent } from '../../Actions/Cancel-Edition/cancel-edition.component';
import { Input } from 'src/app/Models/input.model'; 
import { Product } from 'src/app/Models/product.model'; 

@Component({
    selector: 'app-info-productos',
    templateUrl: './info-productos.component.html',
    styleUrls: ['./info-productos.component.css']
})
export class InfoProductosComponent implements OnInit {
    
    nproduct = new Product();
    editProduct: Product;
    productForm: FormGroup = new FormGroup({
        productName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
        descripcion: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
        category: new FormControl('', [Validators.required]),
        brand: new FormControl('', [Validators.required]),
        stock: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]),
        price: new FormControl('', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)])
    });
    formInputs: Input [] = [{
        inputName: 'productName',
        editMode: true,
        saveMode: false
    },
    {
        inputName: 'descripcion',
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

    constructor(private dialog: MatDialog,
        public dialogRef: MatDialogRef<InfoProductosComponent>, @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.configModal();
    }

    configModal(): void {
        if (this.data.showEditIcon == true) {
            this.editProduct = this.data.product;
            this.productForm.controls['nombre'].setValue(this.editProduct.productName);
            this.productForm.controls['descripcion'].setValue(this.editProduct.descripcion);
            this.productForm.controls['categoria'].setValue(this.editProduct.category);
            this.productForm.controls['marca'].setValue(this.editProduct.brand);
            this.productForm.controls['stock'].setValue(this.editProduct.stock);
            this.productForm.controls['precio'].setValue(this.editProduct.price);
            this.disabledInput();
        }
    }

    disabledInput(): void {
        this.productForm.controls['nombre'].disable();
        this.productForm.controls['descripcion'].disable();
        this.productForm.controls['categoria'].disable();
        this.productForm.controls['marca'].disable();
        this.productForm.controls['disponibilidad'].disable();
        this.productForm.controls['stock'].disable();
        this.productForm.controls['precio'].disable();
        //  this.productForm.controls[`${input}`].disable();
    }

    configInput(input: string): void {
        console.log("configInput", input)
        switch (input) {
            case 'nombre':
                this.productForm.controls[`${input}`].setValue(this.editProduct.productName);
                break;
            case 'descripcion':
                this.productForm.controls[`${input}`].setValue(this.editProduct.descripcion);
                break;
            case 'categoria':
                this.productForm.controls[`${input}`].setValue(this.editProduct.category);
                break;
            case 'marca':
                this.productForm.controls[`${input}`].setValue(this.editProduct.brand);
                break;
            case 'stock':
                this.productForm.controls[`${input}`].setValue(this.editProduct.stock);
                break;
            case 'precio':
                this.productForm.controls[`${input}`].setValue(this.editProduct.price);
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

    getFormsValues(){
        this.nproduct.productName = this.productForm.controls['nombre'].value;
        this.nproduct.descripcion = this.productForm.controls['descripcion'].value;
        this.nproduct.category = this.productForm.controls['categoria'].value;
        this.nproduct.brand = this.productForm.controls['marca'].value;
        this.nproduct.stock = this.productForm.controls['stock'].value;
        this.nproduct.price = this.productForm.controls['precio'].value;
    }

    saveModal() {
        console.log("FORM A GUARDAR", this.productForm.value)
        this.getFormsValues();
        console.log("PRODUCTO A GUARDAR", this.nproduct) 
        if (this.getInputIndex() == -1) {
            this.getFormsValues();
            this.dialogRef.close(this.nproduct)
        } else {
            this.dialog.open(CancelEditionComponent, { disableClose: true })
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
