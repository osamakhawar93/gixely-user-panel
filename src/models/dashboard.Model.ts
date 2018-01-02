   export interface Investment {
        totalInvestMent: number;
        activeInvestment: number;
        totalCapitalReleased: number;
        totalEarned: number;
    }

    export interface GixelyRate {
        _id: string;
        rate: number;
        __v: number;
        time: Date;
    }

    export class DashboardModel {
        investment: Investment;
        gixelyRate: GixelyRate;
        ethRate: number;
        ltcRate: number;
        btcRate: number;
    }


