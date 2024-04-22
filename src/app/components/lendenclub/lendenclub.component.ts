import { Component, OnInit } from '@angular/core';
import { LendenClubAPBStatement, LendenClubPnLReport, StatementDetail } from 'src/app/models/lendenclub.model';
import { LendenclubService } from 'src/app/services/lendenclub.service';

@Component({
  selector: 'app-lendenclub',
  templateUrl: './lendenclub.component.html',
  styleUrls: ['./lendenclub.component.css']
})
export class LendenclubComponent implements OnInit {

  deposit:number=0;
  withdraw:number=0;
  pendingFund:number=0;
  lending:number=0;
  repayment:number=0;
  refund:number=0;
  pendingRepayment:number=0;
  transactionType:string='';
  details:StatementDetail[]=[];
  total:number=0;
  depositDetails!:StatementDetail[];
  withdrawDetails!:StatementDetail[];
  lendingDetails!:StatementDetail[];
  repaymentDetails!:StatementDetail[];
 refundDetails!:StatementDetail[];

  reportDetails:LendenClubPnLReport[]=[];
  reportDetailsTemp:LendenClubPnLReport[]=[];

  lendenClubAPBStatement:LendenClubAPBStatement[]=[];
  lendenClubAPBStatementTotal:number=0;
  showAPBStatement:boolean=false;
  allCount: number = 0;
  lossCount: number = 0;
  profitCount: number = 0;
  closedCount: number = 0;
  lossAmount: number = 0;
  profitAmount: number = 0;
  constructor(private service:LendenclubService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit()
  {
    this.LoadData();
  }

  LoadData()
  {
    this.service.GetStatement().subscribe({
      next:(val)=>{
        this.deposit=val.deposit;
        this.withdraw=val.withdraw;
        this.pendingFund=val.pendingWithdraw;
        this.lending=val.lending;
        this.repayment=val.repayment;
        this.refund=val.refund;
        this.pendingRepayment=val.pendingRepayment;
        this.depositDetails = val.depositDetails;
        this.withdrawDetails = val.withdrawDetails;
        this.lendingDetails = val.lendingDetails;        ;
        this.repaymentDetails = val.repaymentDetails;
        this.refundDetails = val.refundDetails;
        this.reportDetailsTemp = val.lendenClubPnLReport;
        this.lendenClubAPBStatement = val.lendenClubAPBStatement;
        this.lendenClubAPBStatementTotal = val.lendenClubAPBStatementTotal;
        this.allCount  = val.allCount;
        this.lossCount  = val.lossCount;
        this.profitCount  = val.profitCount;
        this.closedCount = val.closedCount;
        this.lossAmount = val.lossAmount;
        this.profitAmount  = val.profitAmount;
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{}
    });
  }

  TransactionDetails(tranType:string,total:number)
  { 
    this.showAPBStatement = false;  
    this.transactionType = tranType;
    this.total = total;
    switch(tranType)
    {
      case 'Deposit':
        this.reportDetails = [];
        this.details = this.depositDetails;
        break;
      case 'Withdraw':
        this.reportDetails = [];
        this.details = this.withdrawDetails;
        break;
      case 'Lending':
        this.reportDetails = [];
        this.details = this.lendingDetails;
        break;
        case 'Repayment':
          this.showAPBStatement = true;  
          this.reportDetails = [];
          this.details = this.repaymentDetails;
        break;
        case 'Refund':
          this.showAPBStatement = true;  
          this.reportDetails = [];
          this.details = this.refundDetails;
        break;
        case 'Report':
          this.details=[]; 
          this.reportDetails = this.reportDetailsTemp;
        break;
        case 'Loss':
          this.details=[]; 
          this.reportDetails = this.reportDetailsTemp.filter((val)=>{
            return val.loss==true;
          });
        break;
        case 'Profit':
          this.details=[]; 
          this.reportDetails = this.reportDetailsTemp.filter((val)=>{
            return val.profit==true;
          });
        break;
        case 'Closed':
          this.details=[]; 
          this.reportDetails = this.reportDetailsTemp.filter((val)=>{
            return val.closed==true;
          });
        break;
    }
  }
}
