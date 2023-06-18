import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scriptdetails } from '../models/scriptdetails.model';
const scriptetailsApi = "https://atozq.bsite.net/api/script";
@Injectable({
  providedIn: 'root'
})
export class ScriptdetailsService {

  constructor(private http:HttpClient) { }

  GetScriptDetails(code:string):Observable<Scriptdetails>
  {
    return this.http.get<Scriptdetails>(`${scriptetailsApi}/${code}`);
  }
}
