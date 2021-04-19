import { Item } from "./item";

export class Loan {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    deliveryDate: Date;
    returnDate: Date;
    deliveryMode: string;
    operationCode: string;

    item: Item = null;

}
