import { Injectable } from '@angular/core';
import { Person } from '../Models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  
  
    peopleData: Person[] = [{
        id:             1,
        user:           'ctarallo',
        pass:           'abc123',
        name:           'Cristian',
        lastName:       'Tarallo',
        documentType:   'DNI',
        documentNumber: '36816087',
        cuit:           '20-368116087-4',
        cuil:           null, 
        socialReason:   'Ctarallo S.A', 
        city:           'Rosario',
        street:         'Enttre Rios 1931',
        phoneNumber_1:  '',
        phoneNumber_2:  null,
        celPhone_1:     '156183024',
        celPhone_2:     null,
        email_1:        'abc@fullhms.com.ar',
        email_2:        '',
        highDate:       null,
        status:         true,
        userType:       1
      },
      {
        id:             117,
        user:           'aperez',
        pass:           'abc123',
        name:           'Alan',
        lastName:       'Perez',
        documentType:   'DNI',
        documentNumber: '76767676576',
        cuit:           '20-76767676576-4',
        cuil:           null, 
        socialReason:   'Perez Hermanos SRL', 
        city:           'Rosario',
        street:         'Cordoba 444',
        phoneNumber_1:  '',
        phoneNumber_2:  null,
        celPhone_1:     '15523478',
        celPhone_2:     null,
        email_1:        'aperez@fullhms.com.ar',
        email_2:        '',
        highDate:       null,
        status:         true,
        userType:       1
      },
      {
        id:             22,
        user:           'sfernandez',
        pass:           'Santiago',
        name:           'Santiagov',
        lastName:       'Fernandez',
        documentType:   'DNI',
        documentNumber: '29887123',
        cuit:           '20-29887123-4',
        cuil:           null, 
        socialReason:   'Rebel Soul SRL', 
        city:           'Rosario',
        street:         'Carreño 4456',
        phoneNumber_1:  '',
        phoneNumber_2:  null,
        celPhone_1:     '156183024',
        celPhone_2:     null,
        email_1:        'sfernandez@fullhms.com.ar',
        email_2:        '',
        highDate:       null,
        status:         true,
        userType:       2
      },
      {
        id:             137,
        user:           'aajuarez',
        pass:           'abc123',
        name:           'Alexis',
        lastName:       'Juarez',
        documentType:   'DNI',
        documentNumber: '2224456776',
        cuit:           '20-2224456776-4',
        cuil:           null, 
        socialReason:   'Cup cut SA', 
        city:           'Rosario',
        street:         'San Juan 131',
        phoneNumber_1:  '',
        phoneNumber_2:  null,
        celPhone_1:     '156183024',
        celPhone_2:     null,
        email_1:        'aajuarez@fullhms.com.ar',
        email_2:        '',
        highDate:       null,
        status:         true,
        userType:       2
      }]
          
  constructor() { }

  getPersonData(){
      return this.peopleData;    
  }
}
