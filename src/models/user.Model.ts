    export interface User {
        __v: number;
        name: string;
        email: string;
        password: string;
        phoneNo: number;
        _id: string;
        createdAt: Date;
        contributions: any[];
        role: string;
        walletAddress:string;
        receiverEthAddress:string;
        coupon:any;
    }

    export class UserModel {
        token: string;
        user: User;
    }
