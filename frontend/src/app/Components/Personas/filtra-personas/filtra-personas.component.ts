import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PersonFilter } from 'src/app/Models/person-filter.model';
import { Person } from '../../../Models/person.model';

@Component({
  selector: 'app-filtra-personas',
  templateUrl: './filtra-personas.component.html',
  styleUrls: ['./filtra-personas.component.css']
})
export class FiltraPersonasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  filteredPersonDataForm:FormGroup = new FormGroup({
      socialReason: new FormControl(''),
      cuit: new FormControl(''),
      cuil: new FormControl(''),
      documentNumber: new FormControl(''),
      city: new FormControl(''),
      status: new FormControl('')
  }) 

  filteredPerson: PersonFilter = {
      socialReason: '',
      cuit: '',
      cuil: '',
      documentNumber: '',
      city: '',
      status: false
  };
  
  formControls: any[];

  value: number;


 
  getFormPersonData(): void  {
     this.formControls = this.getFormsKeys(  this.filteredPersonDataForm  )
      this.formControls.forEach( ( control )  => {
           this.filteredPerson[control] = this.filteredPersonDataForm.get(control).value  
      })
  
      console.log("PRUEBA", this.filteredPerson) 
  }

  removeFormValues(): void {
    this.formControls = this.getFormsKeys(this.filteredPersonDataForm);
    this.formControls.forEach( control => {
        this.filteredPersonDataForm.get(control).setValue('');
    })
    };

    getFormsKeys( form:FormGroup ): any[] {
    return Object.keys(form.controls); 
    }

  }


