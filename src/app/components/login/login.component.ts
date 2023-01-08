
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PreviousRouteService } from 'src/app/services/previous-route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 
  invalidLogin: boolean | undefined;
  
  constructor(public service: AuthenticationService,
    // private toastr: ToastrService,
     private router: Router) { 
      // let prevUrl = route.getPreviousUrl();
      // this.service.redirectUrl = prevUrl == '/login' || prevUrl == '/logout'?'/dashboard':prevUrl;
      }

  ngOnInit(): void {
    if(this.service.user().IsLoggedIn)
    {
      this.router.navigate(['/app/dashboard']);
    }
  }

  login(form: NgForm) {
    this.service.loginUser().subscribe(
      res => {
        let status = (<any>res).status; 
        let tokenResponse = (<any>res).token; 
        
        if(status=='Success')
        {
        localStorage.setItem("jwt", tokenResponse);        
        this.invalidLogin = false;      
        this.router.navigate([this.service.redirectUrl==undefined?'/app/dashboard':this.service.redirectUrl]);
        }
        else
        {
          alert(tokenResponse);
        }
       
        // this.toastr.success("LoggedIn successfully", "Log in");
      },
      err => {
        this.invalidLogin = true;
      }
    );
  }
}
