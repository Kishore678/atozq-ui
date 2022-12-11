export class CommentModel {
    id: number=0;
    userId: string="00000000-0000-0000-0000-000000000000";
    productId!: number;
    category!: string;
    avatarUrl!: string;
    title!: string;
    subTitle!: string;
    imageUrl!: string;
    headLine!: string;
    referralCode!: string;
    referralLink!: string;
    description!: string;
    isWatch!: boolean;
    rowAction!:string;
    mypage!:string;
    isLoggedIn:boolean=false;
}