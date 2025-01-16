import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/Models/category.model';
import { Input } from 'src/app/Models/input.model';
import { ModalData } from 'src/app/Models/modalData.model';
import { CancelEditionComponent } from '../../Actions/Cancel-Edition/cancel-edition.component';
import { CancelCreateComponent } from '../../Actions/Cancel-Create/cancel-create.component';




@Component({
  selector: 'app-info-categoria',
  templateUrl: './info-categorias.component.html', 
  styleUrls: ['/info-categorias.component.css']
})

export class InfoCategoriasComponent implements OnInit {

  ngOnInit(): void {
   this.configModal()
  } 

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<InfoCategoriasComponent>, @Inject(MAT_DIALOG_DATA) public modal: ModalData, private fb: FormBuilder) {
      console.log("CONSTRUCTOR", modal)
   }

  categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(15),Validators.pattern(/^(?!\s*$).+/)]),
    categoryDescription: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50),Validators.pattern(/^(?!\s*$).+/)]),
    availability: new FormControl('', [Validators.required])});

  ncategory = new Category();  
  categoryEdited = new Category();
  formInputs: Input []  = [{
    inputName: 'categoryName',
    editMode: true,
    saveMode: false},
    {
    inputName: 'categoryDescription',
    editMode: true,
    saveMode: false},
    {
    inputName: 'availability',
    editMode: true,
    saveMode: false},
] // Validators.pattern(/^(?!\s*$).+/)]
    
    configModal() {
        if(this.modal.modalMode) {
        this.categoryForm.controls['categoryName'].setValue(this.modal.modalData['categoryName']);
        this.categoryForm.controls['categoryDescription'].setValue(this.modal.modalData['categoryDescription']);
        this.categoryForm.controls['availability'].setValue(this.modal.modalData['availability']);
        this.disabledInputs()
       }
    }

    disabledInputs(){ 
        this.categoryForm.controls['categoryName'].disable();
        this.categoryForm.controls['categoryDescription'].disable();
        this.categoryForm.controls['availability'].disable();
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
    this.ncategory.categoryId = 1;
    this.ncategory.categoryName = this.categoryForm.controls['categoryName'].value;
    this.ncategory.categoryDescription = this.categoryForm.controls['categoryDescription'].value;
    this.ncategory.availability = this.categoryForm.controls['availability'].value;
     }

    getInputActive(input: string){
        return this.formInputs.findIndex(inp => inp.inputName == input);
    } 

    getInputIndex(): number {
        return this.formInputs.findIndex(inp => inp.editMode == false);
    }

    saveModal() {
        this.getFormsValues();
        if (this.getInputIndex() == -1){
               this.getFormsValues();
               this.dialogRef.close(this.ncategory)
        } else {
               this.dialog.open(CancelEditionComponent, { disableClose: true })
        } 
    
    }  

    cancelModal(){
 
      if (!this.modal.modalMode) {
          if (Object.values(this.categoryForm.value).filter( value => (value !==  '' || /^(?!\s*$).+/.test(value) ) ).length == 0) {
                this.dialogRef.close()
          } else {
            const modal = new ModalData('Cancelar - Alta Categoria', false, {text: 'Categoria'})  
            const dialog = this.dialog.open(CancelCreateComponent, {
            disableClose: true,
            data: modal
        })
        dialog.afterClosed().subscribe(( res:boolean ) => {
            if(res){ 
               this.dialogRef.close()    
               } 
            }) 
        }
      }
    
      if(this.modal.modalMode){
        if(this.getInputIndex() == -1 ){
        this.dialogRef.close()
         } else  {
           this.dialog.open(CancelEditionComponent, { disableClose: true })
           }
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








































