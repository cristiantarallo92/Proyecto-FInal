import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login/login.component';
import { NotFoundComponent } from './Components/404/not-found/not-found.component';
import { MenuComponent } from './Components/Menu/menu/menu.component';
import { RememberAccountComponent } from './Components/Login/remember-account/remember-account.component';
import { ListaCategoriaComponent } from './Components/Categoria/lista-categorias/lista-categorias.component';
import { ListaProductosComponent } from './Components/Productos/lista-productos/lista-productos.component';
import { InfoPersonasComponent } from './Components/Personas/info-personas/info-personas.component';
import { ListaMarcasComponent } from './Components/Marcas/lista-marcas/lista-marcas.component';
import { ListaEcommerceProductosComponent } from './Components/Ecommerce/Productos Listado Ecommerce/lista-ecommerce-productos.component';
import { CarritoEcommerceProductosComponent } from './Components/Ecommerce/Productos Carrito Ecommerce/carrito-ecommerce-productos.component';


const routes: Routes = [ 
  {path: 'products', component: ListaProductosComponent },
  {path: 'login', component: LoginComponent}, 
  {path: 'menu', component: MenuComponent},
  {path: 'remember-account', component: RememberAccountComponent},
  {path: 'producto', component: ListaProductosComponent},
  {path: 'categoria', component: ListaCategoriaComponent},
  {path: 'marca', component: ListaMarcasComponent},
  {path: 'persona', component: InfoPersonasComponent},
  {path: 'ecommerce', component: ListaEcommerceProductosComponent}, 
  {path: 'carrito', component: CarritoEcommerceProductosComponent },
  {path: '', component: NotFoundComponent, pathMatch: 'full' },
 // {path: '**', component: MenuComponent, pathMatch: 'full' },
//  {path: '', redirectTo: '/menu', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { } 


