import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/Models/person.model';
import { PersonService } from 'src/app/Services/person.service';

@Component({
  selector: 'app-lista-personas',
  templateUrl: './lista-personas.component.html',
  styleUrls: ['./lista-personas.component.css']
})
export class ListaPersonasComponent implements OnInit {

  constructor(private personService:PersonService ) { }

  ngOnInit(): void {
  console.log("Lista Personas", this.userType)
  this.personData = this.personService.getPersonData() }
    
  @Input() userType: number;
  personData: Person[];



}

// proovedores: nombre; apellido; CUIT; CUIL; tipo documento; documento; razon social; direccion; telefono; telefono 2; celular; celular 2; email email 2; tipo usuario; calle; fecha alta; baja; localidad; cuenta; marca; vendedor;
// clientes: nombre; apellido; CUIT; CUIL; tipo documento; documento; telefono; telefono 2; celular; celular 2; email; email 2; tipo usuario; calle; fecha alta; baja;localidad; cuenta

