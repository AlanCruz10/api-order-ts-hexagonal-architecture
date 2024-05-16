import { Order } from "../entities/Order";

export interface IOrderRepository {
    create(order: Order): Promise<Order|null>;
    updateStatus(uuid: string, status: string): Promise<Order|null>;
    list(): Promise<Order[]|null>;
}