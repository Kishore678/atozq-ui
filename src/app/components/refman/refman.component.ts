import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Refman } from 'src/app/models/refman.model';
import { RefmanService } from 'src/app/services/refman.service';
import Swal from 'sweetalert2';
import { RefmanEditorComponent } from '../refman-editor/refman-editor.component';

@Component({
  selector: 'app-refman',
  templateUrl: './refman.component.html',
  styleUrls: ['./refman.component.css']
})
export class RefmanComponent implements OnInit {

   @ViewChild(RefmanEditorComponent) child!:RefmanEditorComponent;

  refmanList!:Refman[];

  constructor(private refmanService:RefmanService) { }

  ngOnInit(): void {
    this.LoadData();
  }

  LoadData()
  {
    this.refmanService.GetAll().subscribe({
      next:(value)=>{
       this.refmanList = value;      
      },
      error:(err)=>{
      Swal.fire('Something went wrong!'); 
      }
    });
  }

  AddRef(refman:Refman)
  { 
  
    this.refmanService.Add(refman).subscribe({
      next:(value)=>{
        this.child.refmanForm.reset();
       this.refmanList.push(value);
      Swal.fire('Successfuly submitted.'); 
      },
      error:(err)=>{
      Swal.fire('Something went wrong!'); 
      }
    });
  }

  RemoveRef(refman:Refman)
  {
    var confirmMessage =  `Delete ${refman.title}`;
    Swal.fire({
      title: 'Are you sure?',
      text: confirmMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {  

    this.refmanService.Delete(refman.referralWinWinid).subscribe({
      next:(value)=>{
       this.refmanList = this.refmanList.filter((val,index,arr)=>{
        return val.referralWinWinid!=refman.referralWinWinid;
       });
      },
      error:(err)=>{
      Swal.fire('Something went wrong!'); 
      }
    });
  }});
  }

}
