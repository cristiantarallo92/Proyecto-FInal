import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {  Observable  }  from  'rxjs'
import { HttpClientModule }  from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';

import { LoginComponent } from './Components/Login/login/login.component';
import { MenuComponent } from './Components/Menu/menu/menu.component';
import { NotFoundComponent } from './Components/404/not-found/not-found.component';
import { RememberAccountComponent } from './Components/Login/remember-account/remember-account.component';
import { ListaCategoriaComponent } from './Components/Categoria/lista-categorias/lista-categorias.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ListaProductosComponent } from './Components/Productos/lista-productos/lista-productos.component';

import { FilterPipe } from './Pipes/filtro-busqueda.pipe';
import { FilterCategory } from './Pipes/filtro-categoria.pipe';
import { FiltroProductoPipe } from './Pipes/filtro-producto.pipe';
import { InfoProductosComponent } from './Components/Productos/info-productos/info-productos.component';
import { DeleteItemComponent } from './Components/Actions/Delete-Item/delete-item.component';
import { InfoCategoriasComponent } from './Components/Categoria/info-categorias/info-categorias.component';
import { NoresultsComponent } from './Components/Actions/Not-Found/noresults.component';
import { CancelCreateComponent } from './Components/Actions/Cancel-Create/cancel-create.component';
import { ListaPersonasComponent } from './Components/Personas/lista-personas/lista-personas.component';
import { ListaClientesComponent } from './Components/Personas/Clientes/lista-clientes/lista-clientes.component';
import { InfoClientesComponent } from './Components/Personas/Clientes/info-clientes/info-clientes.component';
import { ListaProveedoresComponent } from './Components/Personas/Proveedores/lista-proveedores/lista-proveedores.component';
import { InfoProveedoresComponent } from './Components/Personas/Proveedores/info-proveedores/info-proveedores.component';
import { FiltraPersonasComponent } from './Components/Personas/filtra-personas/filtra-personas.component';
import { InfoPersonasComponent } from './Components/Personas/info-personas/info-personas.component';
import { PersonFilterPipe } from './Pipes/person-filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    NotFoundComponent,
    RememberAccountComponent,
    ListaCategoriaComponent,
    ListaProductosComponent,
    FilterPipe,
    FiltroProductoPipe,
    FilterCategory,
    InfoProductosComponent,
    DeleteItemComponent,
    InfoCategoriasComponent,
    NoresultsComponent,
    CancelCreateComponent,
    ListaPersonasComponent,
    ListaClientesComponent,
    InfoClientesComponent,
    ListaProveedoresComponent,
    InfoProveedoresComponent,
    FiltraPersonasComponent,
    InfoPersonasComponent,
    PersonFilterPipe,
 ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    NoopAnimationsModule,
    MatInputModule ,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    HttpClientModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
