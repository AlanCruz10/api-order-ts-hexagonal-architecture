import { Request, Response } from "express";
import { BaseResponse } from '../../application/dtos/responses/BaseResponse';
import { ListOrderUseCase } from '../../application/use_cases/ListOrdersUseCase';
import { Signale } from 'signale';

export class ListOrderController {

    private signale = new Signale()

    constructor (readonly useCase: ListOrderUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const baseResponse = await this.useCase.run()
            res.status(baseResponse.statusCode).json(baseResponse)
        } catch (e) {
            this.signale.error("Error listing orders:", e);
            let baseResponse = new BaseResponse(null, "An error occurred while obtaining the list of orders", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse)
        }
    }
}