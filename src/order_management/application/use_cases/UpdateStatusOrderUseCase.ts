import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { BaseResponse } from '../dtos/responses/BaseResponse';
import { OrderResponse } from '../dtos/responses/OrderResponse';
import { Signale } from 'signale';

export class UpdateStatusOrderUseCase {
    private signale = new Signale()
    constructor (readonly repository: IOrderRepository) {}
    async run(uuid: string, status: string): Promise<BaseResponse> {
        try {
            let result = await this.repository.updateStatus(uuid, status)
            if (result) {
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