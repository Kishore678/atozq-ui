import { CommentModel } from "./comment.model";

export class Product {
    id!:number;
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
    comment!:CommentModel;
    isCodeCopied!:boolean;
    isLinkCopied!:boolean;
    isLoggedIn:boolean=false;
    isAdmin:boolean=false;
}