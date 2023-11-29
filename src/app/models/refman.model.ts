export class Refman {
    public constructor(init?: Partial<object>) {
        Object.assign(this, init);
    }
    referralWinWinid: number=0;
    title: string='';
    subTitle: string='';
    posterUrl: string='';
    description: string='';
    referralCode: string='';
    referralLink: string='';
    moreDetails: string='';
    createdDate: Date=new Date();
    modifiedDate: Date=new Date();
    isActive: boolean=false;
    orderNo: number=0;
    isFavorite:boolean=false;
}


