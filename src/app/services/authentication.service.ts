import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtModel } from '../models/jwt.model';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';
import { ResetUser } from '../models/resetuser.model';
import { UserInfo } from '../models/userinfo.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  readonly authUrl = `${environment.apiBaseUrl}/api/Account`;

  loginData: Login = new Login();
  registerData: Register = new Register(); 
  userinfo:UserInfo = new UserInfo();
  resetData:ResetUser = new ResetUser();

  activate:boolean=false;
  redirectUrl!: string;
  constructor(private jwt:JwtHelperService,private router:Router,private http:HttpClient) 
  { 

   
  }
  canActivate()
    //route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
  { 
    const token = localStorage.getItem('jwt');

    if(token && !this.jwt.isTokenExpired(token))
    {
     return true;
    }
    else
    {  
      this.router.navigate(["login"]); 
     return false;
    }
  }

  loginUser() {
    return this.http.post(`${this.authUrl}/login`, this.loginData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  forgotPassword()
  {
    return this.http.post(`${this.authUrl}/reset-link`,this.registerData ,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });

  }
  resetUser() {
    let resetUrl =  this.user().IsLoggedIn?'manage':'reset';    
    return this.http.post(`${this.authUrl}/${resetUrl}`, this.resetData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  registerUser() {
    return this.http.post(`${this.authUrl}/register`, this.registerData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
  logOut() {
    localStorage.removeItem("jwt");   
  }


  user()
  {
    const token = localStorage.getItem('jwt');

    if(token && !this.jwt.isTokenExpired(token))
    {    
    let authData = this.jwt.decodeToken<JwtModel>(localStorage.getItem("jwt")!);
    this.userinfo.IsAdmin = authData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']=='Admin';
    this.userinfo.IsLoggedIn = true;
    this.userinfo.UserName = authData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }
    else
    {
      this.userinfo=new UserInfo();
    }
    return this.userinfo;
  }
  
}
