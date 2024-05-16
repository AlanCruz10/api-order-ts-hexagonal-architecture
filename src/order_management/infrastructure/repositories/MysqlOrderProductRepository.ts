import { query } from "../../database/mysql";
import { OrderProduct } from "../../domain/entities/OrderProduct";
import { IOrderProductRepository } from "../../domain/repositories/IOrderProductRepository";
import { Signale } from 'signale';

export class MysqlOrderProductRepository implements IOrderProductRepository {

    private signale = new Signale();

    async addProductToOrder(uuidProduct: string, uuidOrder: string, price: number, quantity: number): Promise<OrderProduct | null> {
        const orderProduct = new OrderProduct(price, quantity, uuidProduct, uuidOrder);
        const sql = 'INSERT INTO orders_products (uuid, price, quantity, productId, orderId) VALUES (?, ?, ?, ?, ?)';
        const params: any[] =  [orderProduct.uuid, price, quantity, uuidProduct, uuidOrder];
        try {
            await query(sql, params);
            return orderProduct;
        } catch (error) {
            this.signale.error(error)
            return null;
        }
    }

}