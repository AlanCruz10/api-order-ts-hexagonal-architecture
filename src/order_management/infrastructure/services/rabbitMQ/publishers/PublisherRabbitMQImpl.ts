import { IRabbitMQRepository } from "../../../../domain/repositories/IRabbitMQRepository";
import { Signale } from 'signale';
import { connectToRabbitMQ } from "../../../configurations/rabbitMQ/RabbitMQConfiguration";
import { OrderProduct } from "../../../../domain/entities/OrderProduct";
import { Queue } from "../../../enums/RabbitMQQueueEnum";

export class PublisherRabbitMQImpl implements IRabbitMQRepository {

    private signale = new Signale();

    async sendToQueue(listProductsByOrderId : OrderProduct[]): Promise<any> {
        try {
            const { connection, channel } = await connectToRabbitMQ(Queue.Traking, null, null, null);
            channel.sendToQueue(Queue.Traking, Buffer.from(JSON.stringify(listProductsByOrderId)), { persistent: true });
            this.signale.success('Message send to queue');
            await channel.close();
            await connection.close();
        } catch (e) {
            this.signale.error("Error in RabbitMQ: ", e);
        }
    }

}