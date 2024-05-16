export class OrderResponse{

    public uuid: string;
    public total: number;
    public date: Date;
    public status: string;

    constructor(uuid:string, total: number, date: Date, status: string){
        this.uuid = uuid;
        this.total = total;
        this.date = date;
        this.status = status;
    }

}