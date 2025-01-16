import { Injectable } from '@angular/core';
import  axios, { Axios }  from 'axios'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( ) {
    
   }

   getUser =  async ( userName: string ) => {
       const user = await axios.get(`http://localhost:3001/users/${userName}`)
       console.log("Res",user.status , user.data.length)
        return new Promise (( res, rej ) => {   
            if( user.status == 200 && user.data.length > 0){
                res(user.data)
            }  else {
                rej(null)
            }
    
       }) 
   }  
}
