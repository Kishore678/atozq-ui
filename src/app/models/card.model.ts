import { CommentModel } from "./comment.model";
import { ItemModel } from "./item.model";
import { WatchModel } from "./watch.model";

export class CardModel
{
    item:ItemModel=new ItemModel();
    watch:WatchModel = new WatchModel();
    comment:CommentModel = new CommentModel();
    isWatch:boolean=false;    
}