import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  readonly authURL = "https://api.atozq.com/api/Authentication";
  constructor(private jwtHelper:JwtHelperService,private router:Router,private http: HttpClient) { }
  loginData: Login = new Login();
  registerData: Register = new Register() 
  getToken() {
    return localStorage.getItem("jwt");
   }

  canActivate() {
   const token = localStorage.getItem('jwt');
   if(token && !this.jwtHelper.isTokenExpired(token))
   {
    return true;
   }
   this.router.navigate(["login"]);
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
  }
}
