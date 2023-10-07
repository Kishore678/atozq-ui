import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SMTPSettings } from '../models/smtpsettings.model';

const baseURL = environment.onlineUsersApi+'/api/SMTPSettings';
@Injectable({
  providedIn: 'root'
})
export class SMTPSettingsService {

  constructor(private http:HttpClient) { }

  getData(): Observable<SMTPSettings[]> {
    return this.http.get<SMTPSettings[]>(`${baseURL}`);
  }

  getDataById(id:number): Observable<SMTPSettings> {
    return this.http.get<SMTPSettings>(`${baseURL}/${id}`);
  }

  addData(smtp: SMTPSettings): Observable<SMTPSettings> {
    return this.http.post<SMTPSettings>(`${baseURL}`, smtp)
  }

  deleteData(id:number): Observable<SMTPSettings> {
    return this.http.delete<SMTPSettings>(`${baseURL}/${id}`);
  }

  updateData(id:number,smtp: SMTPSettings): Observable<SMTPSettings> {
    return this.http.put<SMTPSettings>(`${baseURL}/${id}`, smtp);
  }

}
