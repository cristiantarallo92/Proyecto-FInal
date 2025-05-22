import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import axios  from 'axios' 
import { BehaviorSubject, Observable } from 'rxjs';
import { BrandModel } from '../Models/brand.model';
import { tap, map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
     private brands$ = new BehaviorSubject<BrandModel[]>([]);
     private brand : BrandModel; 
 
     constructor( private http:HttpClient ) { }
 
   getBrands = ():Observable<BrandModel[]> => {
       this.getBrandsFromServer();
       return this.brands$.asObservable()
   }
     
   getBrandsFromServer = () :void => {
       this.http.get<BrandModel[]>(`${environment.API_URL}/brands`).pipe( map( brands => { 
       this.brands$.next(brands);
      } )).subscribe();
   }
 
   
   getBrandById = (id: number): Observable<BrandModel | undefined> => {
     return this.brands$.asObservable().pipe(
       map( brands =>  brands.find( b => b.id === id))
     );
   };

   getBrandByName = (name: string): Observable<BrandModel | null> => {
         return this.brands$.asObservable().pipe(
         map( brands => {
          const brand = brands.find( br => br.name == name);
          return brand ? brand : null })
       );
     };
 
}
