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
        ccRewardsPoints:ccms.ccRewardsPoints
    });

    this.child.SubmitText='Save';
  }

  Save(ccms:Ccms)
  { 
    if(ccms.creditCardDetailsId>0)  
    {
      debugger;
      this.service.updateData(ccms.creditCardDetailsId,ccms).subscribe({
        next:(value)=>{ 
          debugger;
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
          this.ccmsList[i].maxCreditLimit = value.maxCreditLimit,
          this.ccmsList[i].maxRewardPoints = value.maxRewardPoints,
          this.ccmsList[i].ccRewardsPoints = value.ccRewardsPoints
          this.child.setFormDefault();
        }
      }
        this.child.SubmitText='Add';         
        Swal.fire('Updated Successfuly.'); 
        },
        error:(err)=>{
        Swal.fire('Something went wrong!'); 
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
      },
      error:(err)=>{
      Swal.fire('Something went wrong!'); 
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
      },
      error:(err)=>{
      Swal.fire('Something went wrong!'); 
      }
    });
  }});
  }

}
