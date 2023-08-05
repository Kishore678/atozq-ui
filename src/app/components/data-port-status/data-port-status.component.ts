import { Component,ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataPortStatus, GroupDetail } from 'src/app/models/data-port-status.model';
import { Router } from '@angular/router';
import { UserIDService } from 'src/app/services/user-id.service';
import { User } from 'src/app/models/user.model';
const apiBaseUrl = environment.apiBaseUrl;
@Component({
  selector: 'app-data-port-status',
  templateUrl: './data-port-status.component.html',
  styleUrls: ['./data-port-status.component.css']
})
export class DataPortStatusComponent {
  fileName:string='';
  sourceTotal!:number;
  processedTotal!:number;
  cachedTotal!:number;
  overallStatus! :boolean;
  list!:GroupDetail[]
  users!:User[];
  isLoaded:boolean=false;
  error:boolean=false;

  constructor(private userService:UserIDService,public router:Router,public http:HttpClient,public changeDetectorRef: ChangeDetectorRef) { }
  
  LoadReport()
  {
    this.http.get(`${apiBaseUrl}/api/stock/dps`)
    .subscribe({
      next: (event:any) => {               
           this.ViewData(event);
    },
    error: (err: HttpErrorResponse) => 
    {      
      this.error = true;
      console.log(err);
    }
  });
  }
  ngAfterViewInit(): void {    
    this.LoadReport();
    this. loadUsers();
  }

  postMessages()
  {
    let ok = confirm('Click Ok to proceed.'); 
 if(ok)
 {
  this.http.get(`${apiBaseUrl}/api/stock/admin-post`).subscribe({
    next:(event:any) => {  
      if(event == true)
      {
      this.LoadReport();    
      alert('Process Completed.');
      }
    },
    error(err)
    {
      alert('Something went wrong. Contact Help Desk.'); 
    }
  });
}
  }
refresh()
{
 let ok = confirm('Click Ok to proceed.'); 
 if(ok)
 {
  this.http.get(`${apiBaseUrl}/api/stock/refresh`).subscribe({
    next:(event:any) => {  
      this.LoadReport();    
      alert('Process Completed.');
    },
    error(err)
    {
      alert('Something went wrong. Contact Help Desk.'); 
    }
  });
}
}
  ViewData(event: DataPortStatus) {

    this.fileName = event.FileName;
    this.list = event.GroupDetails;
    this.sourceTotal = event.SourceTotal;
    this.processedTotal = event.ProcessedTotal;
    this.cachedTotal = event.CacheddTotal;
    this.overallStatus = event.OverallStatus; 
        
    this.isLoaded = true; 
    this.error =this.overallStatus==false || this.overallStatus==null;
  }


  loadUsers()
  {
    this.userService.GetUsers().subscribe({
      next:(event)=>{
        this.users=event.filter((val,index,arr)=>{
          return val.UserName!='Admin'&&val.UserName!='ATOZQcom'&& val.UserName!='K1001';
        });
      },
      error:(err)=>{
        
      }
    });
  }
}


