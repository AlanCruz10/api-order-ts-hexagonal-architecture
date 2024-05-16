import { orderRoute } from './order_management/infrastructure/routes/OrderRoute';
import express from 'express';
import { Signale } from "signale";
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const app = express();
const signale = new Signale();

const PORT: number  = Number(process.env.PORT_SERVER) || 3001;

app.use(cors());
app.use(helmet())
app.use(morgan('dev'));
app.use(express.json());
app.disable("x-powered-by")

app.use(orderRoute)

app.listen(PORT, () => {
    signale.success(`ApiOrder is running on port ${PORT}`);
});