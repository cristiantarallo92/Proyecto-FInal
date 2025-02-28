import { Brand } from "./brand.model";
import { Category } from "./category.model";


export class ProductModel {
    id:           number;
    name:  string;
    description:  string;
    brand: Brand;
    category:  Category;
    price:       number;
    stock:        number;
}
