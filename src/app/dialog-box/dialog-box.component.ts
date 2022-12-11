//dialog-box.component.ts
import { Component, EventEmitter, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  itemId:number = 0;
  category:string='';
  titleText:string='';
  subTitle:string='';
  avatarUrl:string='';
  itemImageUrl:string='';
  itemHeadLine:string='';
  itemDescription:string='';
  useButton:string='';
  shareButton:string='';
  commentButton:number=0;
  rowAction:string='';
  referralCode:string='';
  referralLink:string='';
  mypage:string='';
  local_data:any;
  isLoggedIn:boolean=false;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {   
    this.local_data = {...data};
    this.itemId = this.local_data.itemId;
    this.category=this.local_data.category;
    this.titleText=this.local_data.titleText;
    this.subTitle=this.local_data.subTitle;
    this.avatarUrl=this.local_data.avatarUrl;
    this.itemImageUrl=this.local_data.itemImageUrl;
    this.itemHeadLine=this.local_data.itemHeadLine;
    this.itemDescription=this.local_data.itemDescription;
    this.useButton=this.local_data.useButton;
    this.shareButton=this.local_data.shareButton;
    this.commentButton=this.local_data.commentButton;
    this.referralCode=this.local_data.referralCode;   
    this.referralLink=this.local_data.referralLink;   
    this.rowAction=this.local_data.rowAction;
    this.mypage = this.local_data.mypage;   
    this.isLoggedIn = this.local_data.isLoggedIn;
  }

  onDoAction = new EventEmitter();

  onCloseDialog = new EventEmitter();

  doAction(){
    this.onDoAction.emit({dialog:this.dialogRef,data:this.local_data});   
  }

  closeDialog(){
    this.onCloseDialog.emit({dialog:this.dialogRef});
  }

}