import { Product } from "./product.model";

export class Detail
{
    prod:Product=new Product();
    productImages:string[]=[];
    shareUrl:string='';
    backUrl:string='';
    createHeader:string='';
    createBody:string='';
    useHeader:string='';
    useBody:string='';
    refHeader:string='';
    refBody:string='';
    earnHeader:string='';
    earnBody:string='';
    prodRelated:Product[]=[];
    homeUrl:string='';
}