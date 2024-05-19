import dotenv from 'dotenv';
import amqp from 'amqplib';
import { Signale } from 'signale';

dotenv.config();

const signale = new Signale();

const config : any = {
    protocol: process.env.RABBITMQ_PROTOCOL,
    hostname: process.env.RABBITMQ_HOST,
    port: process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASS
};

export const connectToRabbitMQ = async (queueName : string, exchangeName : string | null, exchangeType : string | null, key : string | null) => {
    const connection = await amqp.connect(config);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    if (exchangeName && exchangeType && key) {
        await channel.assertExchange(exchangeName, exchangeType, {durable: false})
        await channel.bindQueue(queueName, exchangeName, key);
    }
    signale.success('Connected to RabbitMQ')
    return { connection, channel };
};