import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { SpinnerService } from './services/spinner.service';
import { DatePipe } from '@angular/common';
import { Subscription, map, share, timeInterval, timeout, timer } from 'rxjs';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { UserIDService } from './services/user-id.service';
import {ATOZQSettings} from 'src/constants/ATOZQSettings'
import { ChatModel } from './models/chat-model.model';
import { MatDialog } from '@angular/material/dialog';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModel } from './models/user.model';
const onlineUsersApi = environment.onlineUsersApi;
const apiBaseUrl = environment.apiBaseUrl;
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
  
  LoadData(m:UserModel)
  {
  ATOZQSettings.userid = m.AnonymousID;
  ATOZQSettings.username =m.UserName??m.AnonymousID;
  }

  constructor(private http:HttpClient, private dialog: MatDialog,private userIdService:UserIDService,private deviceDetectorService: DeviceDetectorService,private datepipe:DatePipe,public changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public auth:AuthenticationService,private router:Router,public spinnerService:SpinnerService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener); 
   

    // this.dt =this.datepipe.transform((new Date), 'MM/dd/yyyy hh:mm:ss');
    // // Using Basic Interval
    // this.intervalId = setInterval(() => {
    //   this.dt = new Date();
    // }, 1000);

    
  }
  OpenAskChat(model: ChatModel) {  
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '100%',
      height: '100%',  
      maxWidth:'100%',
      maxHeight:'100%',    
      disableClose: true,
      panelClass: 'chat-dialog',
      autoFocus: true,
      data:model
    });
  
    dialogRef.componentInstance.onDoAction.subscribe((d) => {            
       //do some action
    });
  
    dialogRef.componentInstance.onCloseDialog.subscribe((d) => {
      d.dialog.close();
    });
  }

  OpenChat()
  {    
    let model = new ChatModel();
    model.Code = 'ASK-ATOZQ';
    model.Title = 'Ask';
    model.UserId = ATOZQSettings.userid;
    model.UserName = ATOZQSettings.username;
    model.partyId = ATOZQSettings.userid;
    this.http.get(`${apiBaseUrl}/api/chat/log?code=${'ASK-ATOZQ'}&partyId=${ATOZQSettings.userid}`)
    .subscribe({
      next: (event:any) => {                  
           model.Messages = event;           
           this.OpenAskChat(model);
    },
    error: (err: HttpErrorResponse) => 
    {   
      console.log(err);
      model.Messages = [];
      this.OpenAskChat(model);
    }
  });

    
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
 
  }
  
  ngAfterViewInit()
  {
    setTimeout(()=>{  
      this._hubConnection = new HubConnectionBuilder()
      .withUrl(`${onlineUsersApi}/onlineUsersHub?userid=${ATOZQSettings.userid}`,{ withCredentials: false})  
      .build();      
      this._hubConnection.on('UpdateOnlineUsers', (online,visited) => {
        this.online=online;
        this.visited=visited;
      });      
      this._hubConnection.start();

      this.userIdService.getUserId().then((userId)=>{    
     
        this.userIdService.GetUser(userId).subscribe({
          next:(event)=>{                   
            this.LoadData(event);
          },
          error:(err)=>{
        alert('Something went wrong. Try again (or) Click on Ask to raise an issue.');   
            console.log(err);
          }
        });     
      });

    },3000);
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



