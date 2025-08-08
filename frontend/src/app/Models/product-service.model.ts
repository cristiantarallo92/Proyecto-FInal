export class ProductServ {
    id:           number;
    name:         string;
    description:  string;
    brandId:      number;
    categoryId:   number;
    price:        number;
    stock:        number;
    imageUrl:     string;

    constructor(name:string, description:string, brandId:number, categoryId:number,  price:number, stock:number, url:string){

        this.name = name,
        this.description = description,
        this.brandId = brandId,
        this.categoryId = categoryId,
        this.price = price,
        this.stock = stock     
        this.imageUrl = url;

    }

}

