import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  constructor(private logService:LogService) { }
logText:string=''
  ngOnInit(): void {
    this.logService.GetLog().subscribe((data)=>{
      this.logText = data.log;
    });
  }

}
