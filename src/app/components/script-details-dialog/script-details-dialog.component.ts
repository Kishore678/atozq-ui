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
  netProfitStyle:string | any;
  intraday:string | any;
  btst:string | any;
  mis:string | any;
  margin:string | any;
  leverage:string | any;

  constructor(
    public dialogRef: MatDialogRef<ScriptDetailsDialogComponent>,
 
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Scriptdetails) {  
    this.local_data = {...data};  
    this.netProfitStyle = parseFloat(this.local_data.FinancialsDetails.NetProfit)<0?'loss':'profit'; 
    this.intraday = this.local_data.BasicDetails.Group!='T'&& this.local_data.BasicDetails.Group!='XT'?'Yes':'No';
    this.btst = this.local_data.BasicDetails.Group!='T'&& this.local_data.BasicDetails.Group!='XT'?'Yes':'No';
    let misDetails = this.local_data.MarginDetails.MISDetails;
    this.mis = misDetails.IsMIS?'Yes':'No';
    this.margin = misDetails.IsMIS?misDetails.MISMarginPercent:'NA';
    this.leverage = misDetails.IsMIS?misDetails.MISMultiplier:'NA';
    
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



