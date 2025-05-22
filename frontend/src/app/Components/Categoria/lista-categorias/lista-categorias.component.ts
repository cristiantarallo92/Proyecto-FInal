import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { CategoryModel } from 'src/app/Models/category.model';
import { DeleteItemComponent } from '../../Actions/Delete-Item/delete-item.component';
import { InfoCategoriasComponent } from '../info-categorias/info-categorias.component';
//import { ModalData } from '../../../Models/modalData.model';
import { CategoryService } from 'src/app/Services/category.service';
import { ModalData } from 'src/app/Models/modal-data.model';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  constructor( private dialog: MatDialog, 
               private categoryService: CategoryService ) { }
  // page: number = 0;
  categorySearch: string = ''; 
  categoryIcon:string = `<svg xmlns="http://www.w3.org/2000/svg" width="10vw" height="10vh" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
  <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
  </svg>`
  category = new CategoryModel(); 
  categories: CategoryModel[];
  filterCategoryForm: FormGroup = new FormGroup({
  category: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)])
  });

ngOnInit(): void {
   this.categoryService.getCategories().subscribe( categories => {
                                                                   this.categories = categories;
                                                                   console.log("CATEGORIAS RECIBIDAS", this.categories) },
                                                    error => {
                                                               console.log("ERROR", error) 
                                                    }) 
}

addCategory(): void { 
  const modal = new ModalData('Agregar Categoria', false, {}, 'Categoria');
  const dialog = this.dialog.open( InfoCategoriasComponent,{
        disableClose: true,
        data: modal}) 
} 
 
editCategory( category: CategoryModel ): void  {
  const modal = new ModalData('Editar Categoria', true, category, 'Categoria');
  const dialog = this.dialog.open( InfoCategoriasComponent, {
        disableClose: true,
        data: modal });
}


deleteCategory( category: CategoryModel ): void {  
   const modal = new ModalData('Eliminar Categoria', false, category, 'Categoria');
   const dialog = this.dialog.open(DeleteItemComponent, {
    disableClose: true,
    data: modal
  });
}

searchCategory(): void {
    console.log("Searching category", this.filterCategoryForm.value['category']);
}


removeCategoryFilter(): void {
    // this.page = 0;
    this.filterCategoryForm.get('category').setValue('');
}

previousPage() {}

nextPage() {}

} 

 