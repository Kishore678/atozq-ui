export class ChatModel {
    Code!:string
    Title!:string
    Company!:string
    ChatLog!:MessageModel[]
}

export class MessageModel  
   {  
    userId!:string;
    type!:string;
    message!:string;
    avatarUrl!:string;
    userName!:string;
    postedOn!:Date;
    }
   