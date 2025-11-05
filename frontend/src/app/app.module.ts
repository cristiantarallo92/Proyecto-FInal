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
import { ListaMarcasComponent } from './Components/Marcas/lista-marcas/lista-marcas.component';
import { InfoMarcasComponent } from './Components/Marcas/info-marcas/info-marcas.component';
import { ListaEcommerceProductosComponent } from './Components/Ecommerce/Productos Listado Ecommerce/lista-ecommerce-productos.component';
import { DetalleEcommerceProductoComponent } from './Components/Ecommerce/Productos Detalle Ecommerce/detalle-ecommerce-producto.component';
import { CarritoEcommerceProductosComponent } from './Components/Ecommerce/Productos Carrito Ecommerce/carrito-ecommerce-productos.component';
import { FinalizaCompraEcommerceComponent } from './Components/Ecommerce/Productos Carrito Finaliza Ecommerce/finaliza-compra-ecommerce.component';
import { CarritoVacioEcommerceProductoComponent } from './Components/Ecommerce/Productos Vacio Ecommerce/carrito-vacio-ecommerce-producto/carrito-vacio-ecommerce-producto.component';




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
    ListaMarcasComponent,
    InfoMarcasComponent,
    ListaEcommerceProductosComponent,
    DetalleEcommerceProductoComponent,
    CarritoEcommerceProductosComponent,
    FinalizaCompraEcommerceComponent,
    CarritoVacioEcommerceProductoComponent,
 ],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    NoopAnimationsModule,
    MatInputModule ,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
