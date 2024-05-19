import { IOrderProductRepository } from '../../domain/repositories/IOrderProductRepository';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { IRabbitMQRepository } from '../../domain/repositories/IRabbitMQRepository';
import { BaseResponse } from '../dtos/responses/BaseResponse';
import { OrderResponse } from '../dtos/responses/OrderResponse';
import { Signale } from 'signale';

export class UpdateStatusOrderUseCase {
    private signale = new Signale()
    constructor (readonly repository: IOrderRepository, readonly repositoryRabbitMQ: IRabbitMQRepository, readonly repositoryOrderProduct: IOrderProductRepository) {}
    async run(uuid: string, status: string): Promise<BaseResponse> {
        try {
            let result = await this.repository.updateStatus(uuid, status)
            if (result) {
                if (result.status == "ENVIADO") {
                    let list = await this.repositoryOrderProduct.getProductsByOrderId(uuid)
                    if (list) {
                        await this.repositoryRabbitMQ.sendToQueue(list)
                    }
                }
                let response = new OrderResponse(result.uuid, result.total, result.date, result.status);
                return new BaseResponse(response, "Order updated successfully", true, 200);
            } else {
                return new BaseResponse(null, "Order not updated", false, 400);
            }
        } catch (e) {
            this.signale.error("Error updating order:", e);
            return new BaseResponse(null, "An error occurred while updating the order", false, 500);
        }
    }
}