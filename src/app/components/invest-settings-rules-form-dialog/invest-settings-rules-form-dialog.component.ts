import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvestSettingsRules } from 'src/app/models/invest-settings-rules.model';

@Component({
  selector: 'app-invest-settings-rules-form-dialog',
  templateUrl: './invest-settings-rules-form-dialog.component.html',
  styleUrls: ['./invest-settings-rules-form-dialog.component.css']
})

export class InvestSettingsRulesFormDialogComponent implements OnInit {
  formInstance: FormGroup;

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<InvestSettingsRulesFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvestSettingsRules) {

    this.formInstance = this.fb.group({

    "investSettingsRulesId": new FormControl(0, Validators.required),
    "ruleName": new FormControl('', Validators.required),
    "riskType": new FormControl('', Validators.required),
    "isBaseRule": [false],
    "minAge": new FormControl(0, Validators.required),
    "maxAge": new FormControl(0, Validators.required),
    "loanAmt": new FormControl(0, Validators.required),
    "tenureD": new FormControl(0, Validators.required),
    "tenureM":  new FormControl(0, Validators.required),
    "investAmt":  new FormControl(0, Validators.required),
    "minInvest":  new FormControl(0, Validators.required),
    "allowNoCibil":  [false],
    "cibilMasterID":  new FormControl(0, Validators.required),
    "maxAllowNoCibil":  new FormControl(0, Validators.required),
    "isAutoInvest": [false],    
    "autoInvestLimit":  new FormControl(0, Validators.required),
    "tPin":  new FormControl(0, Validators.required),
    "user":  new FormControl('', Validators.required),
    "pwd":  new FormControl('', Validators.required),
    "source":  new FormControl('', Validators.required),
    "escroBal":  new FormControl(0),
    "investLimitBal":  new FormControl(0),
    "alertIfBalLow":  new FormControl(0),
    "createdDatec":  new FormControl('', Validators.required),
    "modifedDate": new FormControl('', Validators.required),
    });

    this.formInstance.setValue(data);
  }

  ngOnInit(): void {

  }

  save(): void {
  
    this.dialogRef.close(Object.assign({}, this.formInstance.value));
  }
}