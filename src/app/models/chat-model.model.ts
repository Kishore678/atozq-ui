export class ChatModel {
    Code!:string
    Title!:string
    Company!:string
    ChatLog!:ChatLog[]
}
export interface ChatLog
{
    AvatarUrl:string;
    UserName:string;
    ChatDescription:string;
    PostedOn:string;
}
