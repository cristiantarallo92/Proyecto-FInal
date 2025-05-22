import { Pipe, PipeTransform } from '@angular/core'
import { CategoryModel } from '../Models/category.model';

@Pipe({
  name: 'categoryFilter'
})

export class FilterCategory implements PipeTransform {

    transform(categories: CategoryModel[], categorySearched:any, page:number = 0): any {
        console.log("items", categories)
        console.log("parametro",  categorySearched)
        console.log("pagina", page)
        var emptyCategory=/^(?!\s*$).+/;
       if(!emptyCategory.test(categorySearched)){
        return categories.slice(page, page + 5) 
    } else {
        //return categories.filter( c => {  return c.categoryName.toLocaleLowerCase().includes(categorySearched.toLowerCase())})
      //return categories.filter( (c) => {
 //          return    c.categoryName.toLowerCase().includes( categorySearched.toLowerCase())
        // }) //categories.filter( c => c.categoryName.toLowerCase().includes(categorySearched.toLowerCasee())
          
      }
    }
}
  