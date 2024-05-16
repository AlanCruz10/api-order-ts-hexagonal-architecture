import express from "express";
import { createOrderController, listOrderController, updateStatusOrderController } from "../Dependencies"

export const orderRoute = express.Router()

orderRoute.get("/", listOrderController.run.bind(listOrderController))
orderRoute.post("/", createOrderController.run.bind(createOrderController))
orderRoute.put("/:uuid/status/:status", updateStatusOrderController.run.bind(updateStatusOrderController))