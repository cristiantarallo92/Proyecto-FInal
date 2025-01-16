import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Category } from 'src/app/Models/category.model';
import { DeleteItemComponent } from '../../Actions/Delete-Item/delete-item.component';
import { InfoCategoriasComponent } from '../info-categorias/info-categorias.component';
import { ModalData } from '../../../Models/modalData.model';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriaComponent implements OnInit {
 
    constructor( private dialog: MatDialog ) {
       
     }
  page: number = 0;
  categorySearch: string = ''; 
  categoryIcon:string = `<svg xmlns="http://www.w3.org/2000/svg" width="10vw" height="10vh" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
  <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
</svg>`
  category = new Category(); 
  categories:  Category[] = [{  
    categoryName:         "Bebidas",
    categoryDescription:  "Bebidas 1LT",
    availability:         "Activa",
    categoryId:            1
  },
  {
    categoryName:         "Alfajores",
    categoryDescription:  "Alfajores",
    availability:         "Activa",
    categoryId:            2
  },
  {
    categoryName:         "Caramelos",
    categoryDescription:  "Caramelos blancos/duros.",
    availability:         "Activa",
    categoryId:            3
  },
  {
    categoryName:         "Bebidas Alcoholicas",
    categoryDescription:  "Bebidas AlcoholicasT",
    availability:         "Activa",
    categoryId:            5
  },
  {
    categoryName:         "Galletitas",
    categoryDescription:  "Galletitas Dulces",
    availability:         "Activa",
    categoryId:            6
  },
  {
    categoryName:         "Galletitas",
    categoryDescription:  "Galletitas Saladas",
    availability:         "Activa",
    categoryId:            7
  },
  {
    categoryName:         "Chocolate",
    categoryDescription:  "Chocolate",
    availability:         "Activa",
    categoryId:            8
  },
  {
    categoryName:         "Caramelos blandos",
    categoryDescription:  "Caramelos blandos",
    availability:         "Activa",
    categoryId:            9
  },
  {
    categoryName:         "Masitas",
    categoryDescription:  "Masitas",
    availability:         "Activa",
    categoryId:            10
  },
  {
    categoryName:         "Bebidas No Alcoholicas",
    categoryDescription:  "Bebidas No Alcoholicas",
    availability:         "Activa",
    categoryId:           11
  }]

  categorySearchForm: FormGroup = new FormGroup({
    category: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(15)])});

ngOnInit(): void {}

addCategory(): void { 
    const modal = new ModalData('Agregar Categoria', false, {})  
    const dialog = this.dialog.open( InfoCategoriasComponent,{
        disableClose: true,
        data: modal
    }) 
    dialog.afterClosed().subscribe( (res: Category) => {
        console.log("res", res)
        this.category.categoryId = 99;
        this.category.categoryName = res.categoryName;
        this.category.categoryDescription = res.categoryDescription;
        this.category.availability = res.availability;
        this.categories.push(this.category);
    })
  
} 
 
editCategory(category: Category) {
    const modal = new ModalData('Editar Categoria', true, category)  
    const dialog = this.dialog.open( InfoCategoriasComponent, {
        disableClose: true,
        data: modal
    })
    dialog.afterClosed().subscribe(( res:Category ) => {
        console.log("EDITADO", res)
        this.categories.filter( ( category ) => {
            if( category.categoryId == res.categoryId  ){
                category.categoryName = res.categoryName;
                category.categoryDescription = res.categoryDescription;
                category.availability = res.availability;
            }
        } )
     })
}

deleteCategory( category: Category ) {
    var modal:ModalData  = new ModalData('Eliminar Categoria', false, category)  
    const dialog = this.dialog.open(DeleteItemComponent, {
        disableClose: true,
        data: modal,
    })
/*    dialog.afterClosed().subscribe(res => {
        if( res == null || res == undefined ) {

        } else {
       this.categories = this.categories.filter( item => item.categoryId !== res)
        }
    }) */
}

searchCategory(){
    this.categorySearch = this.categorySearchForm.value['category']
    console.log("Searching category")
    console.log("Value: ",this.categorySearch )
    console.log("type",typeof(this.categorySearch))

}
removeCategoryFilter(){
    this.page = 0;
    this.categorySearchForm.get('category').setValue('');
}

previousPage() {
    if (this.page > 0) {
        this.page -= 5;
    }
    console.log("prev", this.page)
}

nextPage() {
    this.page += 5;
    console.log("sig", this.page)
}

} 

 