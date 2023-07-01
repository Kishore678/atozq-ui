import { Component,ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataPortStatus, GroupDetail } from 'src/app/models/data-port-status.model';
import { Router } from '@angular/router';
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

  isLoaded:boolean=false;
  error:boolean=false;

  constructor(public router:Router,public http:HttpClient,public changeDetectorRef: ChangeDetectorRef) { }
  
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
}


