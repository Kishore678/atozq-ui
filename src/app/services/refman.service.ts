import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Refman } from '../models/refman.model';

const apiBaseUrl = environment.onlineUsersApi;

@Injectable({
  providedIn: 'root'
})
export class RefmanService {

  constructor(private http:HttpClient) { }

  GetAll():Observable<Refman[]>
  {
    return this.http.get<Refman[]>(`${apiBaseUrl}/api/ReferralWinWin`);
  }

  GetById(id:number):Observable<Refman>
  {
    return this.http.get<Refman>(`${apiBaseUrl}/api/ReferralWinWin/${id}`);
  }

  Add(refman:Refman):Observable<Refman>
  {
    return this.http.post<Refman>(`${apiBaseUrl}/api/ReferralWinWin`,refman);
  }

  Update(refman:Refman):Observable<Refman>
  {
    return this.http.put<Refman>(`${apiBaseUrl}/api/ReferralWinWin`,refman);
  }

  Delete(id:number):Observable<Refman>
  {
    return this.http.delete<Refman>(`${apiBaseUrl}/api/ReferralWinWin/${id}?referralwinwinid=${id}`);
  }
}
