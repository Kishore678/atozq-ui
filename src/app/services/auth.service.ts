import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { UserInfo } from '../models/userinfo.model';

const apiBaseUrl = environment.apiBaseUrl;
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  readonly authURL =  apiBaseUrl + "/api/Authentication";
  constructor(private jwtHelper:JwtHelperService,private router:Router,private http: HttpClient) { }
  loginData: Login = new Login();
  registerData: Register = new Register(); 

  getToken() {
    return localStorage.getItem("jwt");
   }

  //  this.jwtHelper.decodeToken<any>(localStorage.getItem("jwt")!);
  canActivate() {
   const token = localStorage.getItem('jwt');
   if(token && !this.jwtHelper.isTokenExpired(token))
   {
    return true;
   }
   this.router.navigate(["/account/login"]);
   return false;
  }

  isLoggedIn()
  {
    const token = localStorage.getItem('jwt');
    if(token && !this.jwtHelper.isTokenExpired(token))
    {
     return true;
    }   
    return false;
   }

   UserDetails():Observable<UserInfo>
   {
    let user =new UserInfo();
    const token = localStorage.getItem('jwt');
    let username = localStorage.getItem('username');
    if(token && !this.jwtHelper.isTokenExpired(token))
    {
      user.IsLoggedIn=true;
      user.UserName=JSON.stringify(username);
      user.IsAdmin = username=='admin';
    }       
    return of(user);
   }
  


  loginUser() {
    return this.http.post(`${this.authURL}/login`, this.loginData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  registerUser() {
    return this.http.post(`${this.authURL}/register`, this.registerData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
  }
}
