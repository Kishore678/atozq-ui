import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { P2PModel } from '../models/p2-pmodel.model';
import { environment } from 'src/environments/environment';
import { ActiveBorrowers } from '../models/active-borrowers.model';
import { ManageBorrowers } from '../models/manage-borrowers.model';
import { Withdrawals } from '../models/withdrawals.model';
import { LendenLoan, LendenLoanStatus } from '../models/lenden-loans.model';

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

  I2IWithdrawAmtGet():Observable<Withdrawals[]>
  {
    return this.http.get<Withdrawals[]>(`${baseUrl}/api/Withdrawals`);
  }

  GetI2IAccStatement():Observable<any[]>
  {
    return this.http.get<any[]>(`${baseUrl}/api/AccountStatement`);
  }
  
  I2IWithdrawAmtPut():Observable<Withdrawals[]>
  {
    return this.http.put<Withdrawals[]>(`${baseUrl}/api/Withdrawals/0`,{
      withdrawalsId: 0,
      wType: '',
      month: 0,
      year: 0,
      amount:  0,
      status:  false,
      message: '',
      manual: true,
      createdDate: new Date(),
      modifiedDate: new Date()
    });
  }


  SaveSettings(id:number,settings:P2PModel):Observable<P2PModel[]>
  {   
    return this.http.put<P2PModel[]>(`${baseUrl}/api/AutoInvestSettings/${id}`,settings);
  }

  GetLendenLoans():Observable<LendenLoan[]>
  {
    return this.http.get<LendenLoan[]>(`${baseUrl}/api/LendenLoans`);
  }

  RefreshLCLoanData()
  {   
    return this.http.post<LendenLoan[]>(`${baseUrl}/api/LendenLoans`,{});
  }

  GetStatusLCLoanData(t:string):Observable<LendenLoanStatus>
  {   
    return this.http.get<LendenLoanStatus>(`${baseUrl}/api/LendenLoans/latest/open`);
  }

  GetActiveBorrowers():Observable<ManageBorrowers[]>
  {
    return this.http.get<ManageBorrowers[]>(`${baseUrl}/api/ManageBorrowers`);
  }

  DeleteBorrower(id:number,type:string):Observable<ManageBorrowers[]>
  {
    if(type=='I2I-G')
    {
      return this.http.delete<ManageBorrowers[]>(`${baseUrl}/api/GroupLoans/${id}`);         
    }
    else if(type=='LC-M')
    {
      return this.http.delete<ManageBorrowers[]>(`${baseUrl}/api/LCMemberLoan/${id}`);         
    }
    else if(type=='I2I-M')
    {
      return this.http.delete<ManageBorrowers[]>(`${baseUrl}/api/ManageBorrowers/${id}`);     
    }
    return of([]);
  }

}
