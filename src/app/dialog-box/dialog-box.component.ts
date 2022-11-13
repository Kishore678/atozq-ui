//dialog-box.component.ts
import { Component, EventEmitter, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardModel } from '../models/card.model';

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
  local_data:CardModel;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CardModel) {   
    this.local_data = {...data};
    this.itemId = this.local_data.item.itemId;
    this.category=this.local_data.item.category;
    this.titleText=this.local_data.item.titleText;
    this.subTitle=this.local_data.item.subTitle;
    this.avatarUrl=this.local_data.item.avatarUrl;
    this.itemImageUrl=this.local_data.item.itemImageUrl;
    this.itemHeadLine=this.local_data.item.itemHeadLine;
    this.itemDescription=this.local_data.item.itemDescription;
    this.useButton=this.local_data.item.useButton;
    this.shareButton=this.local_data.item.shareButton;
    this.commentButton=this.local_data.item.commentButton;
    this.referralCode=this.local_data.item.referralCode;   
    this.referralLink=this.local_data.item.referralLink;   
    this.rowAction=this.local_data.item.rowAction;   
  }

  onDoAction = new EventEmitter();

  onCloseDialog = new EventEmitter();

  doAction(){
    this.onDoAction.emit({dialog:this.dialogRef,data:this.local_data.item});   
  }

  closeDialog(){
    this.onCloseDialog.emit({dialog:this.dialogRef});
  }

}