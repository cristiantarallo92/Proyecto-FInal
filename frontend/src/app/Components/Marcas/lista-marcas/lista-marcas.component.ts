import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrandModel } from 'src/app/Models/brand.model';
import { BrandService } from 'src/app/Services/brand.service';
import { ModalData } from 'src/app/Models/modal-data.model';
import { InfoMarcasComponent } from '../info-marcas/info-marcas.component';
import { DeleteItemComponent } from '../../Actions/Delete-Item/delete-item.component';

@Component({
  selector: 'app-lista-marcas',
  templateUrl: './lista-marcas.component.html',
  styleUrls: ['./lista-marcas.component.css']
})
export class ListaMarcasComponent implements OnInit {
  
  constructor( private dialog: MatDialog, 
               private brandService: BrandService ) { }

brandIcon: string = `<svg xmlns="http://www.w3.org/2000/svg" width="10vw" height="10vh" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
  <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z"/>
  <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z"/>
</svg>`
brand: BrandModel;
brands: BrandModel[];
filterBrandForm: FormGroup = new FormGroup({
                 brand: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)])
});
                     
  ngOnInit(): void {
    this.brandService.getBrands().subscribe(
      respond => {
      this.brands = respond
      } ,
      error => { 
      console.log("Error - ", error)  
      } 
  )
  }

  addBrand() {
  const modal = new ModalData('Agregar Marca', false, {}, 'Marca');
  const dialog = this.dialog.open( InfoMarcasComponent,{
        disableClose: true,
        data: modal}) 
  }
  
  clearBrandsFilter() {
  this.filterBrandForm.get('brand').setValue('');
  this.filterBrands(); 

  }
  
  filterBrands() {
   this.brandService.brandsFiltered(this.filterBrandForm.value['brand']).subscribe( brands => {
                                                                                                this.brands = brands;            
   },                                                                               
                                                                                    error => {
                                                                                                console.log("Error - ", error);})
  }
  

  
  deleteBrand( brand: BrandModel ) {
    const modal = new ModalData('Eliminar Marca', false, brand, 'Marca');
    const dialog = this.dialog.open(DeleteItemComponent, {
        disableClose: true,
        data: modal
    })
    dialog.afterClosed().subscribe( ( brand:BrandModel ) => {
    if( brand ) {
      this.brandService.deleteBrand( brand.id ).subscribe( 
          response => {
            console.log ("Marca eliminada - ", response);
            window.alert("Marca eliminada correctamente. ");
          } ,
          error => {
            console.log ("Error - ", error);
            window.alert("ERROR - No pudo eliminar la marca. Por favor intente nuevamente en unos minutos ...");
          })
      }
    })
  }
  
  editBrand( brand: BrandModel ){
      const modal = new ModalData('Editar Marca', true, brand, 'Marca');
      const dialog = this.dialog.open( InfoMarcasComponent, {
            disableClose: true,
            data: modal });
  }
  
  previousPage(){
  
  }
  
  nextPage(){
      
  }  

}
