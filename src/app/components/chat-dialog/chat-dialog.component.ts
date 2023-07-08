import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, NgZone, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { matSelectAnimations } from '@angular/material/select';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { ChatModel, MessageModel, UpdateChatModel } from 'src/app/models/chat-model.model';
import { ChatService } from 'src/app/services/chat.service';
import {ATOZQSettings} from 'src/constants/ATOZQSettings'
import { environment } from 'src/environments/environment';
const apiBaseUrl = environment.apiBaseUrl;
@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent  {
  userid!:string;
  chatId!:string;
  partyId!:string;
  chatTitle!:string;
  avatar!:string;
  userName!:string;
  chatDescription!:string;
  postedOn!:string;  
  messages = new Array<MessageModel>();  
  message = new MessageModel();  
  messageReceived = new EventEmitter<MessageModel>(); 


  constructor(private http:HttpClient,private chatService:ChatService, private _ngZone: NgZone  , private deviceDetectorService: DeviceDetectorService,

    public dialogRef: MatDialogRef<ChatDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: ChatModel) 
    {  
      this.chatId = data.Code;
      this.partyId = data.partyId;
      this.messages = data.Messages;
      this.chatTitle = data.Title;
      this.userid = ATOZQSettings.userid;
      this.avatar = ATOZQSettings.avatar;
      this.userName = ATOZQSettings.username;  
      
      let updateStatus = new UpdateChatModel();
      this.messages.forEach((value)=>{
        
        if(value.status!=4 && value.userId!=ATOZQSettings.userid)
        {
        updateStatus.Ids.push(value.messageid);
        }
        else if(value.userId==ATOZQSettings.userid)
        {
          value.userName = ATOZQSettings.username;
        }

      });
    
      if(updateStatus.Ids.length>0){    
        this.http.post<UpdateChatModel>(`${apiBaseUrl}/api/chat/update`,updateStatus).subscribe({          
            next:(event:any) => { }, 
            error:(err)=>{}
        });
      }
  

    this.subscribeToEvents(); 
    }
  
generate_uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
      function(c) {
         var uuid = Math.random() * 16 | 0, v = c == 'x' ? uuid : (uuid & 0x3 | 0x8);
         return uuid.toString(16);
      });
   }
Send()
{   
  if (this.chatDescription) {  
    this.message = new MessageModel();  
    this.message.chatId = `${this.chatId}`;
    this.message.partyId = `${this.partyId}`;
    this.message.userId = `${this.userid}`;
    this.message.avatarUrl= this.avatar;  
    this.message.userName = this.userName;  
    this.message.type = "sent";  
    this.message.status = 1; 
    this.message.message = this.chatDescription;  
    this.message.messageid = this.generate_uuidv4();
    this.message.postedOn = new Date();
    this.messages.unshift(this.message);
    this.chatService.sendMessage(this.message);     
  }  
  this.Clear();
}

Clear()
{
this.chatDescription='';
}



  ngOnInit(): void {
  document.body.style.overflow = 'hidden';
  }

  onDoAction = new EventEmitter();

  onCloseDialog = new EventEmitter();

IsOnline(userName:string)
{
  return 'dot online';
}

  doAction(){
    this.onDoAction.emit({dialog:this.dialogRef,data:{}});   
  }


  closeDialog(){
    this.onCloseDialog.emit({dialog:this.dialogRef});
    document.body.style.overflow = 'scroll';
  } 

  close()
  {
    this.dialogRef.close();
    document.body.style.overflow = 'scroll';
  }

  private subscribeToEvents(): void { 
    this.chatService.messageReceived.subscribe((message: MessageModel) => {  
      this._ngZone.run(() => {  
        if(message.userId!=this.userid && this.partyId==null)
        {     
        this.messages.unshift(message); 
        }

        if(message.userId!=this.userid && message.partyId!=null && this.partyId==message.partyId)
        {
        this.messages.unshift(message);           
        }
     
          this.messages.forEach((value)=>{
            if(message.messageid==value.messageid)
            {
            value.status = message.status; 
            }
          });       
        
      });  
    });  
  }    

}
