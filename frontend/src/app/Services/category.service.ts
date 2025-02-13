import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import  axios from  'axios'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories  = () =>  {
    return axios.get(`${environment.API_URL}/categories`)
  }

}
