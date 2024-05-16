import { MysqlOrderRepository } from "./repositories/MysqlOrderRepository";
import { UpdateStatusOrderUseCase } from "../application/use_cases/UpdateStatusOrderUseCase";
import { CreateOrderUseCase } from "../application/use_cases/CreateOrderUseCase";
import { CreateOrderController } from "./controllers/CreateOrderController";
import { MysqlOrderProductRepository } from "./repositories/MysqlOrderProductRepository";
import { UpdateStatusOrderController } from "./controllers/UpdateStatusOrderController";
import { ListOrderUseCase } from "../application/use_cases/ListOrdersUseCase";
import { ListOrderController } from "./controllers/ListOrdersController";

export const dbOrder = new MysqlOrderRepository()
export const dbOrderProduct = new MysqlOrderProductRepository()

export const updateStatusOrderUseCase = new UpdateStatusOrderUseCase(dbOrder)
export const updateStatusOrderController = new UpdateStatusOrderController(updateStatusOrderUseCase)

export const createOrderUseCase = new CreateOrderUseCase(dbOrder, dbOrderProduct)
export const createOrderController = new CreateOrderController(createOrderUseCase)

export const listOrderUseCase = new ListOrderUseCase(dbOrder)
export const listOrderController = new ListOrderController(listOrderUseCase)