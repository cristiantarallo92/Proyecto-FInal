import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})


export class FilterPipe implements PipeTransform {
    
    transform(items: any[], parametros: any): any {

        if(parametros.tipoBusqueda == 'Busqueda') {
        return items.filter(({ productName }) =>
         productName.toLowerCase().includes(parametros.nombreProducto.toLowerCase()))  } 
         else {
            return items.filter(producto => {
                return (!parametros.categoria || producto.categoria == parametros.categoria) &&
                       (!parametros.subCategoria || producto.subCategoria == parametros.subCategoria) &&
                       (!parametros.marca || producto.marca === parametros.marca) 
              });     
         }
          
     
    }
  

  }  
