import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProducto'
})
export class FiltroProductoPipe implements PipeTransform {

  transform( productos: any, parametros:any , page:number = 0 ): any {
    console.log(page) 
    console.log(parametros);
    if ((parametros.tipoBusqueda == null) ||
        (parametros.tipoBusqueda == 'Busqueda' && parametros.nombreProducto == '') || 
        (parametros.tipoBusqueda == 'Filtro' && 
         parametros.categoria == null &&
         parametros.subCategoria == null &&
         parametros.marca == null  )) { 
         return productos.slice(page, page + 5);
    } else if ( parametros.tipoBusqueda == 'Busqueda' )  {
        console.log("PRUEBA BUSQUEDA", productos.filter(({ productName }) =>
        productName.toLowerCase().includes(parametros.nombreProducto.toLowerCase())).length )
        return productos.filter(({ productName }) =>
         productName.toLowerCase().includes(parametros.nombreProducto.toLowerCase())).slice(page,page+5);  } 
    else {console.log("PRUEBA FILTRO")
         return productos.filter(producto => {
            return (!parametros.categoria || producto.categoria == parametros.categoria) &&
                   (!parametros.subCategoria || producto.subCategoria == parametros.subCategoria) &&
                   (!parametros.marca || producto.marca === parametros.marca);
          }).slice(page,page+5);     
     }


  }

}