import { Component, EventEmitter, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatLog, ChatModel } from 'src/app/models/chat-model.model';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  chatTitle!:string;
  chatLog!:ChatLog[];
  avatarUrl!:string;
  userName!:string;
  chatDescription!:string;
  postedOn!:string;


  constructor(
    public dialogRef: MatDialogRef<ChatDialogComponent>,
 
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ChatModel) 
    {   
      this.chatTitle = data.Title; 
      this.avatarUrl = 'https://img.freepik.com/free-icon/user_318-159711.jpg';
      this.userName = 'Anonymous';    
      this.chatLog = 
      [
      { AvatarUrl:'https://img.freepik.com/free-icon/user_318-159711.jpg', UserName:'Kishore',ChatDescription:'Hello. How are you today?', PostedOn:'10:45'},
      { AvatarUrl:'https://img.freepik.com/free-icon/user_318-159711.jpg', UserName:'Kishore',ChatDescription:'Hello. How are you today?', PostedOn:'10:45'},
      { AvatarUrl:'https://img.freepik.com/free-icon/user_318-159711.jpg', UserName:'Kishore',ChatDescription:'Hello. How are you today?', PostedOn:'10:45'},
      { AvatarUrl:'https://img.freepik.com/free-icon/user_318-159711.jpg', UserName:'Kishore',ChatDescription:'Hello. How are you today?', PostedOn:'10:45'},
      { AvatarUrl:'https://img.freepik.com/free-icon/user_318-159711.jpg', UserName:'Kishore',ChatDescription:'Hello. How are you today?', PostedOn:'10:45'},
      { AvatarUrl:'https://img.freepik.com/free-icon/user_318-159711.jpg', UserName:'Kishore',ChatDescription:'Hello. How are you today?', PostedOn:'10:45'},
      { AvatarUrl:'https://img.freepik.com/free-icon/user_318-159711.jpg', UserName:'Kishore',ChatDescription:'Hello. How are you today?', PostedOn:'10:45'},
      { AvatarUrl:'https://img.freepik.com/free-icon/user_318-159711.jpg', UserName:'Kishore',ChatDescription:'Hello. How are you today?', PostedOn:'10:45'},
      { AvatarUrl:'https://img.freepik.com/free-icon/user_318-159711.jpg', UserName:'Kishore',ChatDescription:'Hello. How are you today?', PostedOn:'10:45'},
      { AvatarUrl:'https://img.freepik.com/free-icon/user_318-159711.jpg', UserName:'Rama',ChatDescription:'Fine thank you very much.', PostedOn:'11:00'}
    ]

    }
Send()
{
  //Post chat logic
  
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
}
