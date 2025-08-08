import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import axios  from 'axios' 
import { BehaviorSubject, Observable } from 'rxjs';
import { BrandModel } from '../Models/brand.model';
import { tap, map, filter } from 'rxjs/operators';
import { BrandServ } from '../Models/brand-service.model';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
     private brands$ = new BehaviorSubject<BrandModel[]>([]);
     private brand : BrandModel; 
 
     constructor( private http:HttpClient ) { }
   
   addBrand = ( brand:BrandModel ): Observable<BrandServ> => {
     return this.http.post<BrandModel>(`${environment.API_URL}/brands`,  new BrandServ(brand.name)).pipe(
      tap( newBrand => {
        this.brands$.next([...this.brands$.getValue(), newBrand])
      })
     )
   }  

   getBrands = (): Observable<BrandModel[]> => {
       this.getBrandsFromServer();
       return this.brands$.asObservable()
   }
     
   getBrandsFromServer = (): void => {
       this.http.get<BrandModel[]>(`${environment.API_URL}/brands`).pipe( map( brands => { 
       this.brands$.next(brands);
      } )).subscribe();
   }
 
   
  /* getBrandById = (id: number): Observable<BrandModel | undefined> => {
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
     };  */
  
    findBrand = ( brand: string|number ): Observable<BrandModel> => {
      console.log("find brand", brand)
      return this.brands$.asObservable().pipe( map(brands => {
        if( typeof(brand) == 'string' ) {
            const brandSearched = brands.find( b => b.name == brand );
            console.log("console const brand" , brandSearched);
            return brandSearched? brandSearched : null
        }
        if( typeof(brand) == 'number' ) {
            console.log("2");
            return brands.find( b => b.id === brand )
        }
      }))
    }

  editBrand( id:number, brand: BrandModel ): Observable<BrandModel>  {
    return this.http.patch<BrandModel>(`${environment.API_URL}/brands/${id}`, new BrandServ( brand.name ) ).pipe(
      tap(()=>{
        this.brands$.next(this.brands$.getValue())
      })
    )
  }

  deleteBrand( id:number ): Observable<BrandModel> {
    return this.http.delete<BrandModel>(`${environment.API_URL}/brands/${id}`).pipe(
      tap( ( deletedBrand) => {
       this.brands$.next (this.brands$.getValue().filter( brand => brand.id !== deletedBrand.id ))
      })
    )
  } 

  brandsFiltered = ( brandName?: string ): Observable<BrandModel[]> => {
      return this.brands$.asObservable().pipe(
        map(brands => {
          if (brandName) {
            return brands.filter(b => b.name.toLocaleLowerCase().includes(brandName.toLocaleLowerCase()));
          }
            return brands;
          })
        );
    } 
 
}
