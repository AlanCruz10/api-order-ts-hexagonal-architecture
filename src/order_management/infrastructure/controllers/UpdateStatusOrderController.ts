import { Request, Response } from "express";
import { BaseResponse } from '../../application/dtos/responses/BaseResponse';
import { UpdateStatusOrderUseCase } from '../../application/use_cases/UpdateStatusOrderUseCase';
import { Signale } from "signale";

export class UpdateStatusOrderController {

    private signale = new Signale()

    constructor (readonly useCase: UpdateStatusOrderUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { uuid, status} = req.params;
            const baseResponse = await this.useCase.run(uuid, status)
            res.status(baseResponse.statusCode).json(baseResponse)
        } catch (e) {
            this.signale.error("Error updating order:", e);
            let baseResponse = new BaseResponse(null, "An error occurred while updating the order", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse)
        }
    }
}