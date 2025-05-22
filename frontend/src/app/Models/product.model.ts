import { BrandModel } from "./brand.model";
import { CategoryModel } from "./category.model";


export class ProductModel {
    id:           number;
    name:         string;
    description:  string;
    brand:        BrandModel;
    category:     CategoryModel;
    price:        number;
    stock:        number;
}
