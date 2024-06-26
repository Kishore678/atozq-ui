import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ccms } from 'src/app/models/ccms.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ccms-editor',
  templateUrl: './ccms-editor.component.html',
  styleUrls: ['./ccms-editor.component.css']
})
export class CcmsEditorComponent implements OnInit {
  private ccms: Ccms = new Ccms();
  SubmitText:string = 'Add'; 
  constructor() { }

  @Output() addCcms = new EventEmitter<Ccms>();
  @Output() resetCcms = new EventEmitter<Ccms>();

  ngOnInit(): void {
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    if(!this.ccmsForm.valid)
    Swal.fire('Invalid form submission please check and submit again');
    else
    {
      this.addCcms.emit(new Ccms(this.ccmsForm.value));      
    }
  }
  onReset()
  {
    this.resetCcms.emit();
  }
  setFormDefault()
  {
   this.ccmsForm.setValue(
    {    
      creditCardDetailsId: 0,
      creditCardName: '',
      cardNumberEnd: '',
      billDateOfMonth: 0,
      dueDateOfMonth: 0,
      billingCycleFrom: 0,
      billingCycleTo: 0,
      billMonth: 0,
      billAmount: 0,
      billStatus: '',
      paymentMethod: 1,
      chargesPaid: 0,
      ccBillPayCashback: 0,
      ccRewardsValueRs: 0,
      isActive: false,
      maxCreditLimit: 0,
      maxRewardPoints: 0,
      ccRewardsPoints:0,

      cardType: '',
      bankName: '',
      unBillAmount:0,
      outStandAmount:0,
      availableCCLimit:0,
      usedLimitInPecent:0,
      billPaidAmount:0,
      lastPaidOn:new Date(''),
      unbilledChargesPaid:0,
      unBilledROI:0,
      cashBackInRs:0,
      unbilledCashBackInRs:0,
    }
   );
  }

  ccmsForm = new FormGroup({    
      creditCardDetailsId: new FormControl(0),
      creditCardName: new FormControl('',Validators.required),
      cardNumberEnd: new FormControl('',Validators.required),
      billDateOfMonth: new FormControl(0,Validators.required),
      dueDateOfMonth: new FormControl(0,Validators.required),
      billingCycleFrom: new FormControl(0,Validators.required),
      billingCycleTo: new FormControl(0,Validators.required),
      billMonth: new FormControl(0),
      billAmount: new FormControl(0),
      billStatus: new FormControl(''),
      paymentMethod: new FormControl(1),
      chargesPaid: new FormControl(0),
      ccBillPayCashback: new FormControl(0),
      ccRewardsValueRs: new FormControl(0),
      isActive: new FormControl(false),
      maxCreditLimit:new FormControl(0),
      maxRewardPoints: new FormControl(0),
      ccRewardsPoints:new FormControl(0),

      cardType: new FormControl(''),
      bankName: new FormControl(''),
      unBillAmount:new FormControl(0),
      outStandAmount:new FormControl(0),
      availableCCLimit:new FormControl(0),
      usedLimitInPecent:new FormControl(0),
      billPaidAmount:new FormControl(0),
      lastPaidOn: new FormControl(new Date('')), 
      unbilledChargesPaid:new FormControl(0),
      unBilledROI:new FormControl(0),
      cashBackInRs:new FormControl(0),
      unbilledCashBackInRs:new FormControl(0),
  });

}

