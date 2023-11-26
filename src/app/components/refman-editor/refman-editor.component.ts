import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Refman } from 'src/app/models/refman.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refman-editor',
  templateUrl: './refman-editor.component.html',
  styleUrls: ['./refman-editor.component.css']
})
export class RefmanEditorComponent implements OnInit {
  private refMan: Refman = new Refman();
  constructor() { }

  @Output() addRef = new EventEmitter<Refman>();

  ngOnInit(): void {
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    if(!this.refmanForm.valid)
    Swal.fire('Invalid form submission please check and submit again');
    else
    {
      this.addRef.emit(new Refman(this.refmanForm.value));      
    }
  }


  refmanForm = new FormGroup({    
    referralWinWinid: new FormControl(0),
    title: new FormControl('',Validators.required),
    subTitle: new FormControl('',Validators.required),
    posterUrl: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    referralCode: new FormControl('',Validators.required),
    referralLink: new FormControl('',Validators.required),
    moreDetails: new FormControl(''),
    createdDate: new FormControl(new Date()),
    modifiedDate: new FormControl(new Date()),
    isActive: new FormControl(false),
    orderNo: new FormControl(0)
  });

}
