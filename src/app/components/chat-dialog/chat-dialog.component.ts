import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, NgZone, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { ChatModel, MessageModel } from 'src/app/models/chat-model.model';
import { ChatService } from 'src/app/services/chat.service';
import { environment } from 'src/environments/environment';
const apiBaseUrl = environment.apiBaseUrl;
@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent  {
  userid!:string;
  chatTitle!:string;
  chatLog!:MessageModel[];
  avatarUrl!:string;
  userName!:string;
  chatDescription!:string;
  postedOn!:string;  
  
  uniqueID: string = new Date().getTime().toString();  
  messages = new Array<MessageModel>();  
  message = new MessageModel();  
  messageReceived = new EventEmitter<MessageModel>(); 


  constructor(private http:HttpClient,private chatService:ChatService, private _ngZone: NgZone  , private deviceDetectorService: DeviceDetectorService,

    public dialogRef: MatDialogRef<ChatDialogComponent>,
 
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ChatModel) 
    { 
      this.chatLog = data.ChatLog;
      this.chatTitle = data.Title; 
      this.avatarUrl = 'https://img.freepik.com/free-icon/user_318-159711.jpg';
      this.userName = 'Anonymous';  

    this.deviceInfo = this.deviceDetectorService.getDeviceInfo();
    this.userid = this.deviceInfo.browser+
    this.deviceInfo.browser_version+
    this.deviceInfo.device+
    this.deviceInfo.deviceType+
    this.deviceInfo.os+
    this.deviceInfo.os_version+
    this.deviceInfo.userAgent;
    this.subscribeToEvents(); 
    }


Send()
{
  if (this.chatDescription) {  
    this.message = new MessageModel();  
    this.message.userId = this.userid;
    this.message.userName='Anonymous';  
    this.message.type = "sent";  
    this.message.message = this.chatDescription;  
    this.message.postedOn = new Date();
    this.chatService.sendMessage(this.message);     
  }  

  this.Clear();
}
Clear()
{
this.chatDescription='';
}
deviceInfo:DeviceInfo | undefined;

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
        this.chatLog.unshift(message); 
      });  
    });  
  }    

}
