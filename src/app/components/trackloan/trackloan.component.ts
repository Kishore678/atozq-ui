import { Component, OnInit } from '@angular/core';
import { Trackloan } from 'src/app/models/trackloan.model';
import { TrackloanService } from 'src/app/services/trackloan.service';

@Component({
  selector: 'app-trackloan',
  templateUrl: './trackloan.component.html',
  styleUrls: ['./trackloan.component.css']
})
export class TrackloanComponent implements OnInit {

  constructor(private trackloanService:TrackloanService) { }
  loans:Trackloan[]=[];
  original:Trackloan[]=[];
  showType:string='';
  ngOnInit(): void {
    this.trackloanService.GetAll().subscribe({
      next:(res)=>{
        this.original = res;
        this.loans = res.filter((v)=>{
          return v.isOverDue==true;
        });
        this.showType='Overdue';
      },
      error:(err)=>{console.log(err)}
    });
  }

  ShowAll()
  {
    this.loans = this.original;
    this.showType='All';
  }

  ShowClosed()
  {
    this.loans = this.original.filter((v)=>{
      return v.isClosed==true || v.status=='CLOSED';
    });
    this.showType='Closed';
  }

  ShowOpen()
  {
    this.loans = this.original.filter((v)=>{
      return v.status=='ON GOING';
    });
    this.showType='Open';
  }

  ShowProfit()
  {
    this.loans = this.original.filter((v)=>{
      return v.isProfit==true;
    });
    this.showType='Profit';
  }

  ShowOverdue()
  {
    this.loans = this.original.filter((v)=>{
      return v.isOverDue==true;
    });
    this.showType='Overdue';
  }

  ShowP2P(p2p:string)
  {
    this.loans = this.original.filter((v)=>{
      return v.p2P==p2p;
    });
  }

}
