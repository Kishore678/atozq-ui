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
    if(this.service.user().IsLoggedIn)
    {
      this.router.navigate(['/app/dashboard']);
    }
  }

  forgotpass(form: NgForm) {
    this.service.forgotPassword().subscribe(
      res => {
        let status = (<any>res).status; 
        let msg = (<any>res).message; 
        
        if(status=='Success')
        {
          alert("Successfully sent change password email.");
        }
     
        // this.toastr.success("LoggedIn successfully", "Log in");
      },
      err => {
        this.invalidLogin = true;
      }
    );
  }
}

