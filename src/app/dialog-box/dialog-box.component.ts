//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  itemId:number = 0;
  Category:string='';
  TitleText:string='';
  SubTitle:string='';
  AvatarUrl:string='';
  ItemImageUrl:string='';
  ItemHeadLine:string='';
  ItemDescription:string='';
  DownloadButton:string='';
  ViewButton:string='';
  Comments:number=0;
  action:string='';
  local_data:Item;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Item) {
    console.log(data);
    this.local_data = {...data};

    this.itemId = this.local_data.itemId;
    this.Category=this.local_data.Category;
    this.TitleText=this.local_data.TitleText;
    this.SubTitle=this.local_data.SubTitle;
    this.AvatarUrl=this.local_data.AvatarUrl;
    this.ItemImageUrl=this.local_data.ItemImageUrl;
    this.ItemHeadLine=this.local_data.ItemHeadLine;
    this.ItemDescription=this.local_data.ItemDescription;
    this.DownloadButton=this.local_data.DownloadButton;
    this.ViewButton=this.local_data.ViewButton;
    this.Comments=this.local_data.Comments;
    this.action=this.local_data.action;   
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}