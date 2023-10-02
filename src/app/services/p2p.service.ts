import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { P2PModel } from '../models/p2-pmodel.model';
import { environment } from 'src/environments/environment';
import { ActiveBorrowers } from '../models/active-borrowers.model';
import { ManageBorrowers } from '../models/manage-borrowers.model';

const baseUrl = environment.onlineUsersApi;

@Injectable({
  providedIn: 'root'
})
export class P2pService {

  constructor(private http:HttpClient) { }

  GetSettings():Observable<P2PModel[]>
  {
    return this.http.get<P2PModel[]>(`${baseUrl}/api/AutoInvestSettings`);
  }

  SaveSettings(id:number,settings:P2PModel):Observable<P2PModel[]>
  {
    debugger  ;
    return this.http.put<P2PModel[]>(`${baseUrl}/api/AutoInvestSettings/${id}`,settings);
  }

  GetActiveBorrowers():Observable<ManageBorrowers[]>
  {
    return this.http.get<ManageBorrowers[]>(`${baseUrl}/api/ManageBorrowers`);
  }

  DeleteBorrower(id:number,isGroup:boolean):Observable<ManageBorrowers[]>
  {
    if(isGroup)
    {
      return this.http.delete<ManageBorrowers[]>(`${baseUrl}/api/GroupLoans/${id}`);         
    }
    else
    {
      return this.http.delete<ManageBorrowers[]>(`${baseUrl}/api/ManageBorrowers/${id}`);     
    }
  }

}
