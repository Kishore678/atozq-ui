import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
mybreakpoint: number=0;
constructor() { }
ngOnInit() {
this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 6;
}
handleSize(event:any) {
this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 6;
}
}
