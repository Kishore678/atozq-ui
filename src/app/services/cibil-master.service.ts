import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CibilMaster } from '../models/cibil-master.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const baseURL = environment.onlineUsersApi+'/api/cibilmaster';
@Injectable({
  providedIn: 'root'
})
export class CibilMasterService {

  constructor(private http:HttpClient) { }

  getData(): Observable<CibilMaster[]> {
    return this.http.get<CibilMaster[]>(`${baseURL}`);
  }

  getDataById(id:number): Observable<CibilMaster> {
    return this.http.get<CibilMaster>(`${baseURL}/${id}`);
  }

  addData(cibil: CibilMaster): Observable<CibilMaster> {
    return this.http.post<CibilMaster>(`${baseURL}`, cibil)
  }

  deleteData(id:number): Observable<CibilMaster> {
    return this.http.delete<CibilMaster>(`${baseURL}/${id}`);
  }

  updateData(id:number,cibil: CibilMaster): Observable<CibilMaster> {
    return this.http.put<CibilMaster>(`${baseURL}/${id}`, cibil);
  }

}
