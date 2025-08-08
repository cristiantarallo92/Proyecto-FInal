import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import  axios from  'axios'
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryModel } from '../Models/category.model';
import { filter, map, tap } from 'rxjs/operators';
import { CategoryServ } from '../Models/category-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    private categories$ = new BehaviorSubject<CategoryModel[]>([]);
 

    constructor( private http:HttpClient ) { }

  addCategory = ( category: CategoryModel ) => {
    return this.http.post(`${environment.API_URL}/categories`, category).pipe(
      tap( (newCategory:CategoryModel) => {  this.categories$.next([...this.categories$.getValue(), newCategory])})
    )
  }  

  getCategories = ( ) :Observable<CategoryModel[]> => {
    this.getCategoriesFromServer( );
    return this.categories$.asObservable() 
  }
    
  getCategoriesFromServer = ( ) :void => {
   this.http.get<CategoryModel[]>(`${environment.API_URL}/categories`).pipe( map( (categories) => { 
        this.categories$.next(categories);
     } )).subscribe(); 
  }
  
/*  getCategoryById = (id: number): Observable<CategoryModel | undefined> => {
    return this.categories$.asObservable().pipe(
      map(categories => categories.find(c => c.id === id))
    );
  };

  getCategoryByName = (name: string): Observable<CategoryModel | null>   => {
    return this.categories$.asObservable().pipe(
      map( categories => {
      const category = categories.find( c => c.name == name)
      return category? category : null
      })
    );   
  }; */
  
  findCategory = ( category: string|number ): Observable<CategoryModel> => {
    console.log("find category", category)
    return this.categories$.asObservable().pipe( map(categories => {
      if( typeof(category) == 'string' ) {
          const categorySearch = categories.find( c => c.name == category );
          console.log("console const category" , categorySearch);
          return categorySearch? categorySearch : null
      }
      if( typeof(category) == 'number' ) {
          console.log("2");
          return categories.find( c => c.id === category )
      }
    }))
  }

  editCategory = ( id:number, category:CategoryModel ): /*Observable<CategoryModel>*/ any => {
    console.log("id", id)
    console.log("category", category) 
    return this.http.patch<CategoryModel>(`${environment.API_URL}/categories/${id}`, new CategoryServ( category.name )).pipe(
      tap(()=>{
            this.categories$.next(this.categories$.getValue())
        })) 
  }

  deleteCategory = ( id:number ): Observable<CategoryModel> => {
    return this.http.delete<CategoryModel>(`${environment.API_URL}/categories/${id}`).pipe(
      tap( ( deletedCategory:CategoryModel ) => {
        this.categories$.next (this.categories$.getValue().filter( category => category.id !== deletedCategory.id ))
       }))
  }

  categoriesFiltered = ( categoryName?: string ): Observable<CategoryModel[]> => {
    return this.categories$.asObservable().pipe(
      map(categories => {
        if (categoryName) {
          return categories.filter(c => c.name.toLocaleLowerCase().includes(categoryName.toLocaleLowerCase()));
        }
          return categories;
        })
      );
  } 


}
