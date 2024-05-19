import { query } from "../configurations/database/mysql";
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

    async getProductsByOrderId(uuidOrder: string): Promise<OrderProduct[] | null> {
        const sql = 'SELECT * FROM orders_products WHERE orderId = ?';
        const params: any[] =  [uuidOrder];
        try {
            const [result]: any = await query(sql, params);
            if (result && result.length > 0) {
                return result.map((element: any) => {
                    const orderProduct = new OrderProduct(element.price, element.quantity, element.productId, element.orderId);
                    if (element.uuid) {
                        orderProduct.uuid = element.uuid;
                    }
                    return orderProduct
                });
            } else {
                return []
            }
        } catch (error) {
            this.signale.error(error)
            return null;
        }
    }

}