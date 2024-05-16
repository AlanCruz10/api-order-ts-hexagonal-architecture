import { query } from "../../database/mysql";
import { Order } from "../../domain/entities/Order";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { Signale } from 'signale';

export class MysqlOrderRepository implements IOrderRepository {

    private signale = new Signale();

    async create(order: Order): Promise<Order | null> {
        const sql = 'INSERT INTO orders (uuid, total, date, status) VALUES (?, ?, ?, ?)';
        const params: any[] =  [order.uuid, order.total, order.date, order.status];
        try {
            await query(sql, params);
            return order;
        } catch (error) {
            this.signale.error(error)
            return null;
        }
    }

    async list(): Promise<Order[] | null> {
        const sql = 'SELECT * FROM orders';
        try {
            const [result]: any = await query(sql, []);
            if (result && result.length > 0) {
                return result.map((element: any) => {
                    const order = new Order(element.total, new Date(element.date), element.status);
                    if (element.uuid) {
                        order.uuid = element.uuid;
                    }
                    return order
                });
            } else {
                return []
            }
        } catch (error) {
            this.signale.error(error)
            return null;
        }
    }

    async updateStatus(uuid: string, status: string): Promise<Order | null> {
        const sql = "UPDATE orders SET status = ? WHERE uuid = ?"
        const params: any[] = [status,uuid]
        try {
            const [result]: any = await query(sql,params)
            if (result && result.affectedRows > 0){
                return await this.findByUUID(uuid)
            } else{
                return null;
            }
        }catch (error) {
            this.signale.error(error)
            return null;
        }
    }

    async findByUUID(uuid: string): Promise<Order | null> {
        const sql = "SELECT * FROM orders WHERE uuid = ?"
        const params = [uuid]
        try {
            const [result]: any = await query(sql,params)
            if (result && result.length > 0) {
                const orderSql = result[0]
                const order = new Order(orderSql.total, new Date(orderSql.date), orderSql.status)
                order.uuid = orderSql.uuid
                return order;
            } else {
                return null
            }
        }catch (error) {
            this.signale.error(error)
            return null;
        }
    }

}