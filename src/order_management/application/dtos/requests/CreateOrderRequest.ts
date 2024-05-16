import { CreateOrderProductRequest } from './CreateOrderProductRequest';

export class CreateOrderRequest{

    public products: CreateOrderProductRequest[];

    constructor(products: CreateOrderProductRequest[]) {
        this.products = products;
    }

}