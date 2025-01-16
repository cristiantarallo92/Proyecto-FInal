import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../Models/person.model';


@Pipe({
  name: 'personFilter'
})
export class PersonFilterPipe implements PipeTransform {

  transform( personData:Person[], userType:number ): Person[] {
   console.log("PERSONAS", personData)
    console.log("OPCION",  typeof (userType))

  return personData.filter( p => {  return   p.userType == userType }) 
  }

}
