import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CancelEditionComponent } from '../../Actions/Cancel-Edition/cancel-edition.component';
import { BrandModel } from 'src/app/Models/brand.model';
import { Input } from 'src/app/Models/input.model';
import { ModalData } from 'src/app/Models/modal-data.model';
import * as  _ from "lodash";
import { BrandService } from 'src/app/Services/brand.service';


@Component({
  selector: 'app-info-marcas',
  templateUrl: './info-marcas.component.html',
  styleUrls: ['./info-marcas.component.css']
})
export class InfoMarcasComponent implements OnInit {

  brand = new BrandModel();     
  emptyForm: boolean;
  formInputs: Input []  = [{
      inputName: 'brandName',
      editMode: true,
      saveMode: false}]; 
  brandForm: FormGroup = new FormGroup({
    brandName: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(50),Validators.pattern(/^(?!\s*$).+/)]),
  });

  constructor( private dialog: MatDialog, private brandService: BrandService, public dialogRef: MatDialogRef<InfoMarcasComponent>, @Inject(MAT_DIALOG_DATA) public modal: ModalData) { }

  ngOnInit(): void {
    this.configModal();
    this.brand = this.modal.modalData;
  }

  configModal() {
    if(this.modal.modalMode) {
    this.brandForm.controls['brandName'].setValue(this.modal.modalData['name']);
    this.disabledInputs(); }
  }
    
  disabledInputs(){ 
    this.brandForm.controls['brandName'].disable();
  }
    
  editControl(input: string): void {
    const index = this.getInputActive(input)
    if (this.getInputIndex() !== -1) {
      this.dialog.open(CancelEditionComponent, { disableClose: true });
      } else {
              this.brandForm.controls[`${input}`].enable();
              this.formInputs[index].editMode = false;
              this.formInputs[index].saveMode = true;
            }
  }
    
  saveControl(input: string): void {
    const index = this.formInputs.findIndex(inp => inp.inputName == input);
    if (this.brandForm.controls[`${input}`].valid == true) {
        this.brandForm.controls[`${input}`].valueChanges.subscribe()
        this.brandForm.controls[`${input}`].disable();
        this.formInputs[index].editMode = true;
        this.formInputs[index].saveMode = false;  
        }
  }
     
  getFormsValues(){ 
        this.brand.name = this.brandForm.controls['brandName'].value;
   }
    
  getInputActive(input: string){
    return this.formInputs.findIndex(inp => inp.inputName == input);
  } 
    
  getInputIndex(): number {
    return this.formInputs.findIndex(inp => inp.editMode == false);
  }
    
  saveModal() {
    const idNull = null
    const brand = { id:   this.brand.id,
                    name: this.brand.name};
    this.getFormsValues();
    if(this.modal.modalMode){
        if (this.getInputIndex() == -1  ) { 
            if( _.isEqual(brand, this.brand) ) {
              this.dialogRef.close();  
            } else {  
              this.brandService.editBrand( this.brand.id, this.brand).subscribe(
                () => { window.alert("Marca editada correctamente.");
    
                },
                error => {
                  console.log("Error - ", error);
                  window.alert("ERROR - No pudo completarse la edicion de la marca. Por favor intente nuevamente en unos minutos ..."); 
                }
              )
              this.dialogRef.close(); 
           }
        } else {
        this.dialog.open(CancelEditionComponent, { disableClose: true })
        }
      } else {
          this.brandService.addBrand( this.brand ).subscribe(
              () => {
              window.alert("Marca creada correctamente. ");
     //         this.dialogRef.close();
              },
              error  => {
                  console.log("Error - ", error)
                  window.alert("ERROR - No pudo agregar la marca. Por favor intente nuevamente en unos minutos ...");
     //             this.dialogRef.close();  
              }
          ) 
          this.dialogRef.close(); 
        } 
  }  
    
  cancelModal(){
    this.emptyForm =  Object.values(this.brandForm.value).every(value => value === '' || value === null || value == 0) 
        if( (this.getInputIndex() == -1 && this.emptyForm && this.modal.modalMode == false ) || (this.getInputIndex() == -1 && this.emptyForm  == false && this.modal.modalMode ) ) {
            this.dialogRef.close();
            } else {
            this.dialog.open(CancelEditionComponent, { disableClose: true });
            }  
        } 
}
