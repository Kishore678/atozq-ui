import { Component, OnInit, VERSION } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  image!: string;
  constructor(  public auth:AuthenticationService) { }

  ngOnInit() {
    this.image = 'https://material.angular.io/assets/img/examples/shiba2.jpg';
  }  
  share(prod:any)
  {

  }
  openDialog(d1:any,d2:any)
  {

  }
  watch(d:any)
  {
    
  }

}

