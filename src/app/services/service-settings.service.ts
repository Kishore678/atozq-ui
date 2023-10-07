import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiceSettings } from '../models/service-settings.model';
const baseURL = environment.onlineUsersApi+'/api/ServiceSettings';
@Injectable({
  providedIn: 'root'
})
export class SMTPSettingsService {

  constructor(private http:HttpClient) { }

  getData(): Observable<ServiceSettings[]> {
    return this.http.get<ServiceSettings[]>(`${baseURL}`);
  }

  getDataById(id:number): Observable<ServiceSettings> {
    return this.http.get<ServiceSettings>(`${baseURL}/${id}`);
  }

  addData(svc: ServiceSettings): Observable<ServiceSettings> {
    return this.http.post<ServiceSettings>(`${baseURL}`, svc)
  }

  deleteData(id:number): Observable<ServiceSettings> {
    return this.http.delete<ServiceSettings>(`${baseURL}/${id}`);
  }

  updateData(id:number,svc: ServiceSettings): Observable<ServiceSettings> {
    return this.http.put<ServiceSettings>(`${baseURL}/${id}`, svc);
  }

}
