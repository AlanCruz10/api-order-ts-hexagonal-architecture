import { OrderProduct } from "../entities/OrderProduct";

export interface IRabbitMQRepository {
    sendToQueue(listProductsByOrderId : OrderProduct[]) : Promise<any>;
}