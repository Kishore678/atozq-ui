import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CibilMaster } from 'src/app/models/cibil-master.model';

@Component({
  selector: 'app-cibil-master-form-dialog',
  templateUrl: './cibil-master-form-dialog.component.html',
  styleUrls: ['./cibil-master-form-dialog.component.css']
})
export class CibilMasterFormDialogComponent implements OnInit {
  formInstance: FormGroup;

  constructor(public dialogRef: MatDialogRef<CibilMasterFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CibilMaster) {

    this.formInstance = new FormGroup({
      "cibilMasterId":  new FormControl(0, Validators.required),
      "category": new FormControl('', Validators.required),
      "min": new FormControl('', Validators.required),
      "max": new FormControl('', Validators.required),
      "createdDate": new FormControl(''),
      "modifiedDate": new FormControl(''),
    });

    this.formInstance.setValue(data);
  }

  ngOnInit(): void {

  }

  save(): void {
    this.dialogRef.close();
  }
}