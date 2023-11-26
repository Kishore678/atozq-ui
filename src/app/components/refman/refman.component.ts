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

  EditRef(refman:Refman)
  {
    this.child.refmanForm.setValue({
      referralWinWinid: refman.referralWinWinid,
    title: refman.title,
    subTitle: refman.subTitle,
    posterUrl: refman.posterUrl,
    description: refman.description,
    referralCode: refman.referralCode,
    referralLink: refman.referralLink,
    moreDetails: refman.moreDetails,
    createdDate:refman.createdDate,
    modifiedDate: refman.modifiedDate,
    isActive: refman.isActive,
    orderNo: refman.orderNo,
    });
  }

  SaveRef(refman:Refman)
  { 
    if(refman.referralWinWinid>0)  
    {
      this.refmanService.Update(refman).subscribe({
        next:(value)=>{  
          debugger;  
        for(var i=0;i<this.refmanList.length;i++)
       {
        if(this.refmanList[i].referralWinWinid==value.referralWinWinid)
        {     
          this.refmanList[i].title=value.title;
          this.refmanList[i].subTitle = value.subTitle;
          this.refmanList[i].description = value.description;
          this.refmanList[i].posterUrl = value.posterUrl;
          this.refmanList[i].referralCode = value.referralCode;
          this.refmanList[i].referralLink = value.referralLink;
          this.refmanList[i].moreDetails = value.moreDetails;
          this.refmanList[i].isActive = value.isActive;
          this.refmanList[i].orderNo = value.orderNo;
          this.refmanList[i].createdDate = value.createdDate;
          this.refmanList[i].modifiedDate = value.modifiedDate;
          
          this.child.setFormDefault();
        }
      }
      //  for(var i=0;i<this.refmanList.length;i++)
      //  {
      //   if(val.referralWinWinid==value.referralWinWinid)
      //   {
      //     val.title=value.title;
      //     val.subTitle = value.subTitle;
      //     val.description = value.description;
      //     val.posterUrl = value.posterUrl;
      //     val.referralCode = value.referralCode;
      //     val.referralLink = value.referralLink;
      //     val.moreDetails = value.moreDetails;
      //     val.isActive = value.isActive;
      //     val.orderNo = value.orderNo;
      //     val.createdDate = value.createdDate;
      //     val.modifiedDate = value.modifiedDate;            
      //   }
      //  }         
        Swal.fire('Updated Successfuly.'); 
        },
        error:(err)=>{
        Swal.fire('Something went wrong!'); 
        }
      });
    }
    else
    {
    this.refmanService.Add(refman).subscribe({
      next:(value)=>{
        this.child.refmanForm.reset();
       this.refmanList.push(value);
      Swal.fire('Submitted Successfuly.'); 
      },
      error:(err)=>{
      Swal.fire('Something went wrong!'); 
      }
    });
  }
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
