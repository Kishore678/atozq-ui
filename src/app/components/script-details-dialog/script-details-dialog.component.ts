import { Component, EventEmitter, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bseanalytic, Nw } from 'src/app/models/bseanalytics.model';
import { Scriptdetails } from 'src/app/models/scriptdetails.model';

@Component({
  selector: 'app-script-details-dialog',
  templateUrl: './script-details-dialog.component.html',
  styleUrls: ['./script-details-dialog.component.css']
})
export class ScriptDetailsDialogComponent implements OnInit {


  local_data:Bseanalytic;
  netProfitStyle:string | any;
  revenueStyle:string | any;
  intraday:string | any;
  btst:string | any;
  mis:string | any;
  margin:string | any;
  leverage:string | any;

  company:string | any;
notice:string | any;
category:string | any;
group:string | any;
industry:string | any;
code:string | any;
id:string | any;
settlementType:string | any;
trdeDate:string | any;
ltp:string | any;
high:string | any;
low:string | any;
previous:string | any;
fifty2WksHigh:string | any;
fifty2WksLow:string | any;
upperCktPrice:string | any;
lowerCktPrice:string | any;
upperCktPercent:string | any;
lowerCktPercent:string | any;
open:string | any;
priceChange:string | any;
pricePercentChange:string | any;
mcap:string | any;
facevalue:string | any;
eps:string | any;
ceps:string | any;
pe:string | any;
pb:string | any;
roe:string | any;
fy:string | any;
revenue:string | any;
profit:string | any;
amr:string | any;
elr:string | any;
indexvar:string | any;
varMargin:string | any;
securityVar:string | any;
tradeDate:string | any;
qtyTraded:string | any;
deliverableQty:string | any;
deliverablePercnt:string | any;
news!:Nw[];
avg:string | any;




  constructor(
    public dialogRef: MatDialogRef<ScriptDetailsDialogComponent>,
 
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Bseanalytic) {  
    this.local_data = {...data}; 
    
    let net = parseFloat(this.local_data.Fund.Npt); 
    this.netProfitStyle = net==0?'zeroNP':net<0?'loss':net>0?'profit':'';

    let rev = parseFloat(this.local_data.Fund.Rnu);
    this.revenueStyle = rev==0?'zeroNP':rev<0?'loss':rev>0?'profit':''; 
    

    this.intraday = this.local_data.Fund.Int;
    this.btst = this.local_data.Fund.Bst;    
    this.mis = this.local_data.Fund.Mis;
    this.margin = this.local_data.Fund.Mrg==''?'-':this.local_data.Fund.Mrg;
    this.leverage = this.local_data.Fund.Lev==''?'-':this.local_data.Fund.Lev;   
    this.company = this.local_data.Fund.Ful;
    this.notice = this.local_data.Fund.Ntc;
    this.category = this.local_data.Fund.Cat;
    this.group = this.local_data.Grp;
    this.industry = this.local_data.Fund.Ind;
    this.code = this.local_data.Code
    this.id = this.local_data.Fund.ID;
    this.settlementType = this.local_data.Fund.Slt;
    this.trdeDate = this.local_data.Fund.Tdt;
    this.ltp = this.local_data.Fund.Prc;
    this.high = this.local_data.Fund.Hig;
    this.low = this.local_data.Fund.Low;
    this.avg = this.local_data.Avg;
    this.previous = this.local_data.Fund.Prv;
    this.fifty2WksHigh = this.local_data.Fund.F2H;
    this.fifty2WksLow = this.local_data.Fund.F2L;
    this.upperCktPrice = this.local_data.Fund.UC;
    this.lowerCktPrice = this.local_data.Fund.LC;
    this.upperCktPercent = this.local_data.Fund.UCP;
    this.lowerCktPercent = this.local_data.Fund.LCP;
    this.open = this.local_data.Fund.Opn;
    this.priceChange = this.local_data.Fund.PCg
    this.pricePercentChange = this.local_data.Fund.PCp;
    this.mcap = this.local_data.Fund.Mcp;
    this.facevalue = this.local_data.Fund.FV;
    this.eps = this.local_data.Fund.EPS;
    this.ceps = this.local_data.Fund.CPS;
    this.pe = this.local_data.Fund.PE;
    this.pb = this.local_data.Fund.PB;
    this.roe = this.local_data.Fund.ROE;
    this.fy = this.local_data.Fund.FY;
    this.revenue = this.local_data.Fund.Rnu;
    this.profit = this.local_data.Fund.Npt;
    this.amr = this.local_data.Fund.AMR;
    this.elr = this.local_data.Fund.ELR;
    this.indexvar = this.local_data.Fund.IV;
    this.varMargin = this.local_data.Fund.VAR;
    this.securityVar = this.local_data.Fund.SV;
    this.tradeDate = this.local_data.Fund.Tdt;
    this.qtyTraded = this.local_data.Fund.Dtd;
    this.deliverableQty = this.local_data.Fund.Dty;
    this.deliverablePercnt = this.local_data.Fund.Dtp;
    this.news = this.local_data.Fund.Nws;


 
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

  close()
  {
    this.dialogRef.close();
  }

}



