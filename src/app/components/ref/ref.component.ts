import { Component, OnInit } from '@angular/core';
import { Refman } from 'src/app/models/refman.model';
import { RefmanService } from 'src/app/services/refman.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ref',
  templateUrl: './ref.component.html',
  styleUrls: ['./ref.component.css']
})
export class RefComponent implements OnInit {
  refmanList!:Refman[];
  constructor(private refService:RefmanService) { }

  ngOnInit(): void {
    this.refService.GetAll().subscribe({
      next:(val)=>{
        this.refmanList = val.filter((v,index,arr)=>{
          v.isFavorite = false;
          return v.isActive;
        });
      },
      error:(err)=>{Swal.fire('Something went wrong. Please try again')}
    });
  }

  ShareRef(ref:Refman)
  {
    
  }
  SaveRef(ref:Refman)
  {
    
  }

}
