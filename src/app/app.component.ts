import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { SpinnerService } from './services/spinner.service';
import { DatePipe } from '@angular/common';
import { Subscription, map, share, timeInterval, timer } from 'rxjs';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
const onlineUsersApi = environment.onlineUsersApi;
/** @title Responsive sidenav */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'atozq-ui';
  mobileQuery: MediaQueryList;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  online:number=0;
  visited:number=0;
  dt:any;
  private _mobileQueryListener: () => void;
  private _hubConnection:HubConnection | undefined;
  // time = new Date();
  // rxTime = new Date();
  // intervalId;
  subscription: Subscription | undefined;
  deviceInfo:DeviceInfo | undefined;
  
  constructor(private deviceDetectorService: DeviceDetectorService,private datepipe:DatePipe,public changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public auth:AuthenticationService,private router:Router,public spinnerService:SpinnerService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener); 
    
    // this.dt =this.datepipe.transform((new Date), 'MM/dd/yyyy hh:mm:ss');
    // // Using Basic Interval
    // this.intervalId = setInterval(() => {
    //   this.dt = new Date();
    // }, 1000);

    
  }

  ngOnInit()
  {
     // Using RxJS Timer
     this.subscription = timer(0, 1000)
     .pipe(
       map(() => new Date()),
       share()
     )
     .subscribe(time => {
       this.dt = time;
     });

    this.deviceInfo = this.deviceDetectorService.getDeviceInfo();
    var userid = this.deviceInfo.browser+
    this.deviceInfo.browser_version+
    this.deviceInfo.device+
    this.deviceInfo.deviceType+
    this.deviceInfo.os+
    this.deviceInfo.os_version+
    this.deviceInfo.userAgent;

    this._hubConnection = new HubConnectionBuilder()
  .withUrl(`${onlineUsersApi}/onlineUsersHub?userid=${userid}`,{ withCredentials: false})  
  .build();

  this._hubConnection.on('UpdateOnlineUsers', (online,visited) => {
    this.online=online;
    this.visited=visited;
  });

  this._hubConnection.start();

   
  }
  
  ngAfterContentChecked(): void {   
   this.changeDetectorRef.detectChanges();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

    // clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }
  logOut()
  {
    this.auth.logOut(); 
    this.router.navigate(["/account/logout"]);
  }
}

