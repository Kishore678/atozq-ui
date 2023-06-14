import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../models/log.model';
import { environment } from 'src/environments/environment';

const logApi = `${environment.apiBaseUrl}/api/log`;

@Injectable({
  providedIn: 'root'
})
export class LogService {
 

  constructor(private http:HttpClient) { }

  GetLog():Observable<Log>{
    return this.http.get<Log>(logApi);
  }
}
