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


const routes: Routes = [
    {path: 'login', component: LoginComponent}, 
    {path: 'menu', component: MenuComponent},
    {path: 'remember-account', component: RememberAccountComponent},
    {path: 'producto', component: ListaProductosComponent},
    {path: 'categoria', component: ListaCategoriaComponent},
    {path: 'marca', component: ListaMarcasComponent},
    {path: 'persona', component: InfoPersonasComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


