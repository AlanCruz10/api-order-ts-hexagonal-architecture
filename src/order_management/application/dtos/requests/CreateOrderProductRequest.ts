export class CreateOrderProductRequest{

    public price: number;
    public quantity: number;
    public productId: string;

    constructor(price: number, quantity: number, productId: string) {
        this.price = price;
        this.quantity = quantity;
        this.productId = productId;
    }

}