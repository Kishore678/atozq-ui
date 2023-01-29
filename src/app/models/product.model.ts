import { Category } from "./category.model";
import { CommentModel } from "./comment.model";

export class Product {
    id!:number;
    productId!: number;
    categoryName!:string;
    categoryId!: number;
    category!: Category;
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