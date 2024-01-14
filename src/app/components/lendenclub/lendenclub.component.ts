import { Component, OnInit } from '@angular/core';
import { StatementDetail } from 'src/app/models/lendenclub.model';
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
  pendingRepayment:number=0;
  transactionType:string='';
  details:StatementDetail[]=[];
  depositDetails!:StatementDetail[];
  withdrawDetails!:StatementDetail[];
  lendingDetails!:StatementDetail[];
  repaymentDetails!:StatementDetail[];


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
        this.pendingRepayment=val.pendingRepayment;
        this.depositDetails = val.depositDetails;
        this.withdrawDetails = val.withdrawDetails;
        this.lendingDetails = val.lendingDetails;        ;
        this.repaymentDetails = val.repaymentDetails;
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{}
    });
  }

  TransactionDetails(tranType:string)
  {
    debugger;
    this.transactionType = tranType;
    switch(tranType)
    {
      case 'Deposit':this.details = this.depositDetails;
        break;
      case 'Withdraw':this.details = this.withdrawDetails;
        break;
      case 'Lending':this.details = this.lendingDetails;
        break;
        case 'Repayment':this.details = this.repaymentDetails;
        break;
    }
  }
}
