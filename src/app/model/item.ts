import { Loan } from "./loan";

export class Item {

    id: number;
    code: string;
    model: string;
    license: string;
    lent: boolean;
    dateOfRecord: Date;

    loans: Loan[] = [];

}
