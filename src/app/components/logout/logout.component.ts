import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    if(this.service.user().IsLoggedIn)
    {
      this.router.navigate(['/app/dashboard']);
    }
  }

}
