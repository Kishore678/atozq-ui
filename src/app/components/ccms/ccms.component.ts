import { Component, OnInit, ViewChild } from '@angular/core';
import { Ccms } from 'src/app/models/ccms.model';
import { CcmsService } from 'src/app/services/ccms.service';
import Swal from 'sweetalert2';
import { CcmsEditorComponent } from '../ccms-editor/ccms-editor.component';

@Component({
  selector: 'app-ccms',
  templateUrl: './ccms.component.html',
  styleUrls: ['./ccms.component.css']
})
export class CcmsComponent implements OnInit {

  ccmsList:Ccms[]=[];
  showRecords:boolean = true;
  showRecordEditor:boolean = true;
  @ViewChild(CcmsEditorComponent) child!:CcmsEditorComponent;

  constructor(private service:CcmsService) { }

  ngOnInit(): void {
    this.LoadCCMS();
  }

  LoadCCMS()
  {
    this.service.getData().subscribe({
      next:(value)=>{
       this.ccmsList = value;      
      },
      error:(err)=>{
      Swal.fire('Something went wrong!'); 
      }
    });
  }

  Edit(ccms:Ccms)
  {
    this.child.ccmsForm.setValue({   
        creditCardDetailsId:ccms.creditCardDetailsId,
        creditCardName:ccms.creditCardName,
        cardNumberEnd:ccms.cardNumberEnd,
        billDateOfMonth:ccms.billDateOfMonth,
        dueDateOfMonth:ccms.dueDateOfMonth,
        billingCycleFrom:ccms.billingCycleFrom,
        billingCycleTo:ccms.billingCycleTo,
        billMonth:ccms.billMonth,
        billAmount:ccms.billAmount,
        billStatus:ccms.billStatus,
        paymentMethod:ccms.paymentMethod,
        chargesPaid:ccms.chargesPaid,
        ccBillPayCashback:ccms.ccBillPayCashback,
        ccRewardsValueRs:ccms.ccRewardsValueRs,
        isActive:ccms.isActive,
        maxCreditLimit: ccms.maxCreditLimit,
        maxRewardPoints: ccms.maxRewardPoints,
        ccRewardsPoints:ccms.ccRewardsPoints,

        cardType:ccms.cardType,
      bankName:ccms.bankName,
      unBillAmount:ccms.unBillAmount,
      outStandAmount:ccms.outStandAmount,
      availableCCLimit:ccms.availableCCLimit,
      usedLimitInPecent:ccms.usedLimitInPecent,
      billPaidAmount:ccms.billPaidAmount,
      lastPaidOn:ccms.lastPaidOn,
      unbilledChargesPaid:ccms.unbilledChargesPaid,
      unBilledROI:ccms.unBilledROI,
      cashBackInRs:ccms.cashBackInRs,
      unbilledCashBackInRs:ccms.unbilledCashBackInRs,
    });

    this.child.SubmitText='Save';
    this.showRecordEditor = true;
    this.showRecords = false;
  }
  Reset()
  {
    this.showRecordEditor = true;
    this.showRecords = true;
  }
  Save(ccms:Ccms)
  { 
    if(ccms.creditCardDetailsId>0)  
    {     
      this.service.updateData(ccms.creditCardDetailsId,ccms).subscribe({
        next:(value)=>{
        for(var i=0;i<this.ccmsList.length;i++)
       {
        if(this.ccmsList[i].creditCardDetailsId==value.creditCardDetailsId)
        {  
          this.ccmsList[i].creditCardName=value.creditCardName;
          this.ccmsList[i].cardNumberEnd = value.cardNumberEnd;
          this.ccmsList[i].billDateOfMonth = value.billDateOfMonth;
          this.ccmsList[i].dueDateOfMonth = value.dueDateOfMonth;
          this.ccmsList[i].billingCycleFrom = value.billingCycleFrom;
          this.ccmsList[i].billingCycleTo = value.billingCycleTo;
          this.ccmsList[i].billMonth = value.billMonth;
          this.ccmsList[i].isActive = value.isActive;
          this.ccmsList[i].billAmount = value.billAmount;
          this.ccmsList[i].billStatus = value.billStatus;
          this.ccmsList[i].paymentMethod = value.paymentMethod;
          this.ccmsList[i].chargesPaid = value.chargesPaid;
          this.ccmsList[i].ccBillPayCashback = value.ccBillPayCashback;
          this.ccmsList[i].ccRewardsValueRs = value.ccRewardsValueRs;
          this.ccmsList[i].isActive = value.isActive;
          this.ccmsList[i].maxCreditLimit = value.maxCreditLimit;
          this.ccmsList[i].maxRewardPoints = value.maxRewardPoints;
          this.ccmsList[i].ccRewardsPoints = value.ccRewardsPoints;
          this.ccmsList[i].roi = value.roi;

          this.ccmsList[i].cardType = value.cardType;
          this.ccmsList[i].bankName = value.bankName;
          this.ccmsList[i].unBillAmount = value.unBillAmount;
          this.ccmsList[i].outStandAmount = value.outStandAmount;
          this.ccmsList[i].availableCCLimit = value.availableCCLimit;
          this.ccmsList[i].usedLimitInPecent = value.usedLimitInPecent;
          this.ccmsList[i].billPaidAmount = value.billPaidAmount;
          this.ccmsList[i].lastPaidOn = value.lastPaidOn;
          this.ccmsList[i].unbilledChargesPaid = value.unbilledChargesPaid;
          this.ccmsList[i].unBilledROI = value.unBilledROI;
          this.ccmsList[i].cashBackInRs = value.cashBackInRs;
          this.ccmsList[i].unbilledCashBackInRs = value.unbilledCashBackInRs;

          this.child.setFormDefault();
        }
      }
        this.child.SubmitText='Add';         
        Swal.fire('Updated Successfuly.'); 
        this.showRecordEditor = false;
        this.showRecords = true;
        this.Reset();
        },
        error:(err)=>{
        Swal.fire('Something went wrong!'); 
        this.showRecordEditor = false;
        this.showRecords = true;
        this.Reset();
        }
      });
    }
    else
    {
    this.service.addData(ccms).subscribe({
      next:(value)=>{
        debugger;
        this.child.setFormDefault();        
       this.ccmsList.push(value);      
       this.ccmsList=this.ccmsList.filter(()=>{return true});      
      Swal.fire('Submitted Successfuly.'); 
      this.showRecordEditor = false;
      this.showRecords = true;
      this.Reset();
      },
      error:(err)=>{
      Swal.fire('Something went wrong!'); 
      this.showRecordEditor = false;
      this.showRecords = true;
      this.Reset();
      }
    });
  }
  }

  Remove(ccms:Ccms)
  {
    var confirmMessage =  `Delete ${ccms.creditCardName}`;
    Swal.fire({
      title: 'Are you sure?',
      text: confirmMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {  

    this.service.deleteData(ccms.creditCardDetailsId).subscribe({
      next:(value)=>{
       this.ccmsList = this.ccmsList.filter((val,index,arr)=>{
        return val.creditCardDetailsId!=ccms.creditCardDetailsId;
       });
       this.Reset();
      },
      error:(err)=>{
      Swal.fire('Something went wrong!'); 
      this.Reset();
      }
    });
  }});
  }

}
