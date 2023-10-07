import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InvestSettingsRules } from '../models/invest-settings-rules.model';
const baseURL = environment.onlineUsersApi+'/api/InvestSettingsRules';
@Injectable({
  providedIn: 'root'
})
export class InvestSettingsRulesService {

  constructor(private http:HttpClient) { }

  getData(): Observable<InvestSettingsRules[]> {
    return this.http.get<InvestSettingsRules[]>(`${baseURL}`);
  }

  getDataById(id:number): Observable<InvestSettingsRules> {
    return this.http.get<InvestSettingsRules>(`${baseURL}/${id}`);
  }

  addData(rules: InvestSettingsRules): Observable<InvestSettingsRules> {
    return this.http.post<InvestSettingsRules>(`${baseURL}`, rules)
  }

  deleteData(id:number): Observable<InvestSettingsRules> {
    return this.http.delete<InvestSettingsRules>(`${baseURL}/${id}`);
  }

  updateData(id:number,rules: InvestSettingsRules): Observable<InvestSettingsRules> {
    return this.http.put<InvestSettingsRules>(`${baseURL}/${id}`, rules);
  }

}
