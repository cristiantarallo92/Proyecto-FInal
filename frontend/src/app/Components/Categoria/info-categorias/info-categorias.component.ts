import { Component, OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CategoryModel } from 'src/app/Models/category.model';
import { Input } from 'src/app/Models/input.model';
import { ModalData } from 'src/app/Models/modal-data.model';
import { CancelEditionComponent } from '../../Actions/Cancel-Edition/cancel-edition.component';
import * as  _ from "lodash";
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-info-categoria',
  templateUrl: './info-categorias.component.html', 
  styleUrls: ['/info-categorias.component.css']
})

export class InfoCategoriasComponent implements OnInit {
  
        
category = new CategoryModel();   
categoryEdited = new CategoryModel();
emptyForm: boolean;
formInputs: Input []  = [{
      inputName: 'categoryName',
      editMode: true,
      saveMode: false}] 
categoryForm: FormGroup = new FormGroup({
        categoryName: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(50),Validators.pattern(/^(?!\s*$).+/)]),
      });

ngOnInit(): void {
   this.configModal()
   this.category = this.modal.modalData
} 

constructor( private dialog: MatDialog,
             private categoryService: CategoryService,
             public dialogRef: MatDialogRef<InfoCategoriasComponent>, @Inject(MAT_DIALOG_DATA) public modal: ModalData) {}

  
configModal() {
    if(this.modal.modalMode) {
        this.categoryForm.controls['categoryName'].setValue(this.modal.modalData['name']);
        this.disabledInputs() }
}

disabledInputs(){ 
    this.categoryForm.controls['categoryName'].disable();
}

editControl(input: string): void {
    const index = this.getInputActive(input)
    if (this.getInputIndex() !== -1) {
            this.dialog.open(CancelEditionComponent, { disableClose: true })
    } else {
        this.categoryForm.controls[`${input}`].enable();
        this.formInputs[index].editMode = false;
        this.formInputs[index].saveMode = true;
    }
}

saveControl(input: string): void {
    const index = this.formInputs.findIndex(inp => inp.inputName == input)
    if (this.categoryForm.controls[`${input}`].valid == true) {
        this.categoryForm.controls[`${input}`].valueChanges.subscribe()
        this.categoryForm.controls[`${input}`].disable();
        this.formInputs[index].editMode = true;
        this.formInputs[index].saveMode = false;
    }
}

getFormsValues(){ 
    this.category.name = this.categoryForm.controls['categoryName'].value;
}

getInputActive(input: string){
    return this.formInputs.findIndex(inp => inp.inputName == input);
} 

getInputIndex(): number {
    return this.formInputs.findIndex(inp => inp.editMode == false);
}

saveModal() {
    const category = { id:   this.category.id,
                       name: this.category.name};
    this.getFormsValues();
    if(this.modal.modalMode){
        if (this.getInputIndex() == -1  ) { 
            if( _.isEqual(category, this.category) ) {
                      this.dialogRef.close();  
                    } else {  
                      this.categoryService.editCategory(this.category.id, this.category).subscribe(
                        () => { window.alert("Categoria editada correctamente.") },
                        error => {
                        console.log("Error - ", error);
                        window.alert("ERROR - No pudo completarse la edicion de la categoria. Por favor intente nuevamente en unos minutos ...")
                        }
                      )   
                      this.dialogRef.close();
                   }
        } else {
                this.dialog.open(CancelEditionComponent, { disableClose: true })
                }
    } else {
        this.categoryService.addCategory(this.category).subscribe(
            () => {
            window.alert("Categoria creada correctamente.");0
            },
            error  => {
                console.log("Error - ", error)
                window.alert("ERROR - No pudo agregar la marca. Por favor intente nuevamente en unos minutos ..."); }) 
        this.dialogRef.close();  
    } 
}  

cancelModal(){
    this.emptyForm =  Object.values(this.categoryForm.value).every(value => value === '' || value === null || value == 0) 
    if( (this.getInputIndex() == -1 && this.emptyForm && this.modal.modalMode == false ) || (this.getInputIndex() == -1 && this.emptyForm  == false && this.modal.modalMode ) ) {
        this.dialogRef.close();
        } else {
        this.dialog.open(CancelEditionComponent, { disableClose: true })
        }  
    }

}  
    





// parametrizar para productos usandoel tipado del objeto que se pasa para modales
// agregar objeto tipo modal data en productos (lista-producto ; info-producto)
// corregir mensajes que aparecen ni bien se insertan datos  en los campos
// corregir modal que cuando cambio de opcion en el menu se sigue mostrando
// en lista-productos coordinar la busqueda entre filtros e inputs 
// agregar validaciones para no permitir cadenas en blancos en productos
// revisarqu8e pasa cuando se filtra / busca un producto o categoria se edita  un campo y al guardarse y volver al listado no se ve     reflejado el cambio o edicion realizado








































