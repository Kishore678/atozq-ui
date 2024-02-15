import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ccms } from '../models/ccms.model';
import { Observable } from 'rxjs';

const baseURL = environment.onlineUsersApi;

@Injectable({
  providedIn: 'root'
})
export class CcmsService {

  constructor(private http:HttpClient) { }

  getData(): Observable<Ccms[]> {
    return this.http.get<Ccms[]>(`${baseURL}/api/ccms`);
  }

  getDataById(id:number): Observable<Ccms> {
    return this.http.get<Ccms>(`${baseURL}/api/ccms/${id}`);
  }

  addData(ccms: Ccms): Observable<Ccms> {
    return this.http.post<Ccms>(`${baseURL}/api/ccms`, ccms)
  }

  deleteData(id:number): Observable<Ccms> {
    return this.http.delete<Ccms>(`${baseURL}/api/ccms/${id}`);
  }

  updateData(id:number,ccms: Ccms): Observable<Ccms> {
    return this.http.put<Ccms>(`${baseURL}/api/ccms/${id}`, ccms);
  }
}
