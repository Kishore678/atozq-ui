import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-change-pwd-success',
  templateUrl: './change-pwd-success.component.html',
  styleUrls: ['./change-pwd-success.component.css']
})
export class ChangePwdSuccessComponent implements OnInit {

  constructor(private service:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    if(this.service.user().IsLoggedIn)
    {
      this.router.navigate(['/dashboard']);
    }    
  }

}
