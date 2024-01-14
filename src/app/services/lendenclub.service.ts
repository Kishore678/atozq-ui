import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lendenclub } from '../models/lendenclub.model';
import { environment } from 'src/environments/environment';
const baseUrl = environment.onlineUsersApi;
@Injectable({
  providedIn: 'root'
})
export class LendenclubService {

  constructor(private http:HttpClient) { }

  GetStatement():Observable<Lendenclub>
  {
    return this.http.get<Lendenclub>(`${baseUrl}/api/LendenClubMiniStatement`);
  }
}
