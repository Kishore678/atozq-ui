import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit { 
  invalidLogin: boolean | undefined;
  passMatched: boolean | undefined;

  constructor(public service: AuthenticationService,
    // private toastr: ToastrService,
     private router: Router,private route:ActivatedRoute) { }

     ngOnInit(): void {
       if(this.route.snapshot.params['user']&&this.route.snapshot.params['token'])
       {
        this.service.resetData.username = this.route.snapshot.params['user'];
        this.service.resetData.token =this.route.snapshot.params['token'];
       }
      }
      checkPasswords(pass:string,cpass:string)
      {
        if(pass==cpass)
        {
          this.passMatched=true; 
        }
        else
        {
          this.passMatched=false; 
        }
      }
  reset(form: NgForm) {
    
    this.service.resetUser().subscribe(
      res => {
        // const token = (<any>res).token;
        // localStorage.setItem("jwt", token);        
        // this.invalidLogin = false;      
        // this.router.navigate(["/dashboard"]);
        // this.toastr.success("LoggedIn successfully", "Log in");
      },
      err => {
        // this.invalidLogin = true;
      }
    );
  }
}
