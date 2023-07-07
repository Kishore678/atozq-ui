import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {getCurrentBrowserFingerPrint} from '@rajesh896/broprint.js';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';

const apiBaseUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserIDService {
  constructor(private http:HttpClient) {};
 getUserId():Promise<string>
  {   
  return getCurrentBrowserFingerPrint(); 
  }

  UpdateUser(user:UserModel):Observable<UserModel>
  {
    return this.http.post<UserModel>(`${apiBaseUrl}/api/user/session`,user);        
  }

  GetUser(userId:string):Observable<UserModel>
  {
    return this.http.get<UserModel>(`${apiBaseUrl}/api/user/session/${userId}`);
  }
}
