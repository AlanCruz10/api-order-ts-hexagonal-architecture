import { CreateOrderProductRequest } from "../../application/dtos/requests/CreateOrderProductRequest";
import { CreateOrderRequest } from "../../application/dtos/requests/CreateOrderRequest";
import { CreateOrderUseCase } from "../../application/use_cases/CreateOrderUseCase";
import { Request, Response } from "express";
import { BaseResponse } from '../../application/dtos/responses/BaseResponse';
import { Signale } from 'signale';

export class CreateOrderController {

    private signale = new Signale()

    constructor (readonly useCase: CreateOrderUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const { products } = req.body as { products: CreateOrderProductRequest[] };
            const request = new CreateOrderRequest(products)
            const baseResponse = await this.useCase.run(request)
            res.status(baseResponse.statusCode).json(baseResponse)
        } catch (e) {
            this.signale.error("Error creating order:", e);
            let baseResponse = new BaseResponse(null, "An error occurred while creating the order", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse)
        }
    }
}