import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import  axios from  'axios'
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryModel } from '../Models/category.model';
import { map } from 'rxjs/operators';
import { NAMED_ENTITIES } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    private categories$ = new BehaviorSubject<CategoryModel[]>([]);
 

    constructor( private http:HttpClient ) { }

  getCategories = ():Observable<CategoryModel[]> => {
      this.getCategoriesFromServer();
      return this.categories$.asObservable()
  }
    
  getCategoriesFromServer = () :void => {
      this.http.get<CategoryModel[]>(`${environment.API_URL}/categories`).pipe( map( categories => { 
      this.categories$.next(categories);
     } )).subscribe();
  }

  
  getCategoryById = (id: number): Observable<CategoryModel | undefined> => {
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
  };

}
