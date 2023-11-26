import { Component, OnInit } from '@angular/core';
import { Refman } from 'src/app/models/refman.model';
import { RefmanService } from 'src/app/services/refman.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refman',
  templateUrl: './refman.component.html',
  styleUrls: ['./refman.component.css']
})
export class RefmanComponent implements OnInit {
  MyStatus!:boolean;
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
       this.MyStatus=true;
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
       this.refmanList.push(value);
       return true;
      },
      error:(err)=>{
      Swal.fire('Something went wrong!'); 
      }
    });
  }

  RemoveRef(id:number)
  {
    this.refmanService.Delete(id).subscribe({
      next:(value)=>{
       this.refmanList = this.refmanList.filter((val,index,arr)=>{
        return val.referralWinWinid!=id;
       });
      },
      error:(err)=>{
      Swal.fire('Something went wrong!'); 
      }
    });
  }

}
