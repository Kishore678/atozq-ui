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
      ccRewardsPoints:0
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
      ccRewardsPoints:new FormControl(0)
  });

}

