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
       if(this.service.user().IsLoggedIn)
       {
        this.service.resetData.username = this.service.user().UserName;
        this.service.resetData.token ='';
       }
       else if(this.route.snapshot.params['user']&&this.route.snapshot.params['token'])
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
        let status = (<any>res).status; 
        let msg = (<any>res).message; 
        
        if(status=='Success')
        {
          this.router.navigate(['/pwdsuccess']);
        }
      },
      err => {
        // this.invalidLogin = true;
      }
    );
  }
}
