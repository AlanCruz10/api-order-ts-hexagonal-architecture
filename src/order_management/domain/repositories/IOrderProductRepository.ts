import { OrderProduct } from "../entities/OrderProduct";

export interface IOrderProductRepository {
    addProductToOrder(uuidProduct: string, uuidOrder: string, price: number, quantity: number): Promise<OrderProduct|null>
}
