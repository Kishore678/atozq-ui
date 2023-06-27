import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataPortStatus } from 'src/app/models/data-port-status.model';
const apiBaseUrl = environment.apiBaseUrl;
@Component({
  selector: 'app-data-port-status',
  templateUrl: './data-port-status.component.html',
  styleUrls: ['./data-port-status.component.css']
})
export class DataPortStatusComponent {
  dps!:DataPortStatus;
  constructor(public http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(`${apiBaseUrl}/api/stock`)
    .subscribe({
      next: (event:any) => { 
           this.dps = event;
    },
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }

}
