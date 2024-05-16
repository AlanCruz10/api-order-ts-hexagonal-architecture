import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { BaseResponse } from "../dtos/responses/BaseResponse";
import { OrderResponse } from "../dtos/responses/OrderResponse";
import { Signale } from 'signale';

export class ListOrderUseCase {
    private signale = new Signale()
    constructor(readonly repository: IOrderRepository) {}
    async run(): Promise<BaseResponse> {
        try {
            let result = await this.repository.list()
            if (result && result.length > 0) {
                let response = result.map(order => new OrderResponse(order.uuid, order.total, order.date, order.status));
                return new BaseResponse(response, "Orders obtained successfully", true, 200)
            }else{
                return new BaseResponse([], "No orders found", true, 200)
            }
        } catch (e) {
            this.signale.error("Error listing orders:", e);
            return new BaseResponse(null, "An error occurred while obtaining the list of orders", false, 500);
        }
    }
}