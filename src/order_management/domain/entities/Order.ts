import { v4 as uuidv4 } from 'uuid';

export class Order {

    public uuid: string;
    public total: number;
    public date: Date;
    public status: string;


    constructor(total: number, date: Date, status: string) {
        this.uuid = uuidv4();
        this.total = total;
        this.date = date;
        this.status = status;
    }

}