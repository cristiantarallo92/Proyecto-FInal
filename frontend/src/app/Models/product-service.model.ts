
export class ProductServ {
    name:  string;
    description:  string;
    brandId: number;
    categoryId: number;
    price: number;
    stock: number;

    constructor(name:string, description:string, brandId:number, categoryId:number,  price:number, stock:number){

        console.log("")
        this.name = name,
        this.description = description,
        this.brandId = brandId,
        this.categoryId = categoryId,
        this.price = price,
        this.stock = stock     
    }

}

