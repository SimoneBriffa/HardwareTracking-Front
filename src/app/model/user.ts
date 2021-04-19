export class User {

    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    fiscalCode: string;
    joinDate: Date;
    lastLogin: Date;
    authorities: [];
    isActive: boolean;
    isNotLocked: boolean;

}
