import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  
  brand: BrandModel;
  brands: BrandModel[];
  filterBrandForm: FormGroup = new FormGroup({
    brand: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)])
    });


  constructor( private dialog: MatDialog, 
               private brandService: BrandService ) { }

  ngOnInit(): void {
    this.brandService.getBrands().subscribe(
      respond => {
      this.brands = respond
      } ,
      error => {
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
  }
  
  filterBrands() {
  this.brandService.getBrandByName(this.filterBrandForm.value['brand']).subscribe( respond => { this.brand = respond; console.log("Marca producto", this.brand)},
  error   => {  })
  }
  
  deleteBrand( brand: BrandModel ) {
     const modal = new ModalData('Eliminar Marca', false, brand, 'Marca');
       const dialog = this.dialog.open(DeleteItemComponent, {
        disableClose: true,
        data: modal
      });
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
