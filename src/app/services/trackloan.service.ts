import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trackloan } from '../models/trackloan.model';

const baseUrl = environment.onlineUsersApi;

@Injectable({
  providedIn: 'root'
})
export class TrackloanService {

  constructor(private http:HttpClient) { }

  GetAll():Observable<Trackloan[]>
  {
    return this.http.get<Trackloan[]>(`${baseUrl}/api/trackloan`);
  }
}
