import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public service: AuthenticationService,
     private router: Router) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    this.service.registerUser().subscribe(
      res => {
        this.service.loginData.username = this.service.registerData.username;
        this.service.loginData.password = this.service.registerData.password;
        this.service.loginUser().subscribe(
          res => {
            const token = (<any>res).token;
            localStorage.setItem("jwt", token);             
            localStorage.setItem("username",  this.service.loginData.username);             
            this.router.navigate(["/dashboard"]);          
          },
          err => {

            console.log(err);
          }
        );;
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.registerData = new Register();
  }

}
