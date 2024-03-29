import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {getCurrentBrowserFingerPrint} from '@rajesh896/broprint.js';
import { Observable } from 'rxjs';
import { User, UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { UserLocation } from '../models/user-location.model';
import { WatchModel } from '../models/watch.model';

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


  UpdateIPAddress(userId:string)
  {
       
    this.http.get<any>('https://api64.ipify.org/?format=json').subscribe({
      next:(location)=>{
        var user = new UserModel();      
        user.IPAddress = location.ip;
        user.AnonymousID = userId;
        this.http.post<any>(`${apiBaseUrl}/api/user/track`,user).subscribe({
          next:(res)=>{},
          error:(err)=>{console.log(err);}
        }); 
      },
      error:(err)=>{console.log(err);}
    });  
   
  }


  GetUsers():Observable<User[]>
  {
    return this.http.get<User[]>(`${apiBaseUrl}/api/user/session`);
  }

  AddorRemoveWatch(watch:WatchModel):Observable<WatchModel>
  {    
    return this.http.post<WatchModel>(`${apiBaseUrl}/api/user/watch-add-remove`,watch);
  }

  GetWatchList(id:string):Observable<WatchModel[]>
  {    
   return this.http.get<WatchModel[]>(`${apiBaseUrl}/api/user/watch-list?id=${id}`);
  }
}
