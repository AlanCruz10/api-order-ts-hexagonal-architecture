import { v4 as uuidv4 } from 'uuid';

export class OrderProduct {

    public readonly uuid: string;
    public price: number;
    public quantity: number;
    public productId: string;
    public orderId: string;

    constructor(price: number, quantity: number, productId: string, orderId: string) {
        this.uuid = uuidv4();
        this.price = price;
        this.quantity = quantity;
        this.productId = productId;
        this.orderId = orderId;
    }

}