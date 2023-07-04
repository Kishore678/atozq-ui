export class ChatModel {
    Code!:string
    Title!:string
    Company!:string
    Messages!:MessageModel[]
}

export class MessageModel  
   {  
    userId!:string;
    type!:string;
    message!:string;
    messageid!:string;
    avatarUrl!:string;
    userName!:string;
    status!:number;//1-sent, 2-delivered
    chatId!:string;
    postedOn!:Date;
    }

export class UpdateChatModel
{
    Ids:any = new Array();
}

   