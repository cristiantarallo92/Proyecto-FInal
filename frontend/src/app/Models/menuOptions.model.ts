import { Menu } from './menu.model'   


export const mainManu: Menu[] = [
                        { numberOp: 1, 
                          descriptionOp: 'Categorias',
                          component: '/categoria' },
                        { numberOp: 2, 
                          descriptionOp: 'Productos',
                          component: '/producto' },
                        { numberOp: 3, 
                          descriptionOp: 'Personas',
                          component: '/persona' },
                        { numberOp: 4, 
                          descriptionOp: 'Marcas',
                          component: '/marca' }
                    ]


export const profileMenu: Menu[] = [
                            { numberOp: 1, 
                              descriptionOp: 'Mi Perfil',
                              component: '' },
                            { numberOp: 2, 
                              descriptionOp: 'Cambiar Datos',
                              component: '' },
                            { numberOp: 3, 
                              descriptionOp: 'Cerrar Sesion',
                              component: '' },
                          ]
  
