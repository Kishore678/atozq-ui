export class Refman {
    public constructor(init?: Partial<object>) {
        Object.assign(this, init);
    }
    referralWinWinid!: number
    title!: string
    subTitle!: string
    posterUrl!: string
    description!: string
    referralCode!: string
    referralLink!: string
    moreDetails!: string
    createdDate!: string
    modifiedDate!: string
    isActive!: boolean
    orderNo!: number
}


