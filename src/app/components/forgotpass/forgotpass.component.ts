import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit { 
  invalidLogin: boolean | undefined;

  constructor(public service: AuthenticationService,
    // private toastr: ToastrService,
     private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    this.service.loginUser().subscribe(
      res => {
        const token = (<any>res).token;
        localStorage.setItem("jwt", token);        
        this.invalidLogin = false;      
        this.router.navigate(["/dashboard"]);
        // this.toastr.success("LoggedIn successfully", "Log in");
      },
      err => {
        this.invalidLogin = true;
      }
    );
  }
}

