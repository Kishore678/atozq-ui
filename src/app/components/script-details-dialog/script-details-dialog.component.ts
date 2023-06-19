import { Component, EventEmitter, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Scriptdetails } from 'src/app/models/scriptdetails.model';

@Component({
  selector: 'app-script-details-dialog',
  templateUrl: './script-details-dialog.component.html',
  styleUrls: ['./script-details-dialog.component.css']
})
export class ScriptDetailsDialogComponent implements OnInit {


  local_data:Scriptdetails;
  

  constructor(
    public dialogRef: MatDialogRef<ScriptDetailsDialogComponent>,
 
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Scriptdetails) {  
    this.local_data = {...data};   
  }
  // share(id:number,category:string,titleText:string)
  // {
  //   share(local_data.productId,local_data.category,local_data.title)

  // }
  onDoAction = new EventEmitter();

  onCloseDialog = new EventEmitter();



  doAction(){
    this.onDoAction.emit({dialog:this.dialogRef,data:this.local_data});   
  }


  closeDialog(){
    this.onCloseDialog.emit({dialog:this.dialogRef});
  }

  ngOnInit(): void {
  }

}



