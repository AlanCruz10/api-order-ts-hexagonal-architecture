import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { BaseResponse } from "../dtos/responses/BaseResponse";
import { Order } from "../../domain/entities/Order";
import { CreateOrderRequest } from "../dtos/requests/CreateOrderRequest";
import { OrderResponse } from "../dtos/responses/OrderResponse";
import { IOrderProductRepository } from "../../domain/repositories/IOrderProductRepository";
import { Signale } from 'signale';

export class CreateOrderUseCase {
    private signale = new Signale()
    constructor (readonly repository: IOrderRepository, readonly repositoryOrderProduct: IOrderProductRepository){}
    async run(request: CreateOrderRequest): Promise<BaseResponse> {
        try {
            let total = request.products.reduce((sum, product) =>
                sum + product.price * product.quantity, 0);
            let order = new Order(total, new Date() , "CREADO");
            let result = await this.repository.create(order);
            if (result) {
                let response = new OrderResponse(result.uuid, result.total, result.date, result.status);
                const productPromises = request.products.map(product =>
                    this.repositoryOrderProduct.addProductToOrder(
                        product.productId,
                        result.uuid,
                        product.price,
                        product.quantity
                    )
                );
                await Promise.all(productPromises);
                return new BaseResponse(response, "Order created successfully", true, 201);
            } else {
                return new BaseResponse(null, "Order not created", false, 400);
            }
        }catch (e) {
            this.signale.error("Error creating order:", e);
            return new BaseResponse(null, "An error occurred while creating the order", false, 500);
        }
    }

}