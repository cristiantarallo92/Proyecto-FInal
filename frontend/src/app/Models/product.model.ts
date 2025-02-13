
export class Product {
    id:           number;
    name:  string;
    description:  string;
    brand:  {
                id     : number,
                name   : string
            }
    category:   {
                  id     : number,
                  name   : string
                }
    price:       number;
    stock:        number;
}
