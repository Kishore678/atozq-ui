export class Ccms {
    public constructor(init?: Partial<object>) {
        Object.assign(this, init);
    }
    creditCardDetailsId!: number;
    creditCardName!: string | null;
    cardNumberEnd!: string | null;
    billDateOfMonth!: number;
    dueDateOfMonth!: number;
    billingCycleFrom!: number;
    billingCycleTo!: number;
    billMonth!: number;
    billAmount!: number | null;
    billStatus!: string | null;
    paymentMethod!: number | null;
    chargesPaid!: number | null;
    ccBillPayCashback!: number | null;
    ccRewardsValueRs!: number | null;
    isActive!: boolean;
    maxCreditLimit!: number; 
    maxRewardPoints!: number;
    ccRewardsPoints!:number;
}



       
   