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
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
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
  users:number=0;
  online:number=0;
  visited:number=0;
  dt:any;
  isReady:boolean=false;
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

  constructor(
    private http:HttpClient, 
    private dialog: MatDialog,
    private userIdService:UserIDService,
    private deviceDetectorService: DeviceDetectorService,
    private datepipe:DatePipe,
    public changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    public auth:AuthenticationService,
    private router:Router,
    public spinnerService:SpinnerService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener); 

    // this.dt =this.datepipe.transform((new Date), 'MM/dd/yyyy hh:mm:ss');
    // // Using Basic Interval
    // this.intervalId = setInterval(() => {
    //   this.dt = new Date();
    // }, 1000);

    this.matIconRegistry.addSvgIcon(
      "community",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/community.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "whatsapp",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/whatsapp_icon.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "stockmarket",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/stockmarket.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "date",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/date.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "star",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/star.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "delete",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/recycle-bin.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "elearning",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/books.svg")
    );    
    this.matIconRegistry.addSvgIcon(
      "bookopen",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/book-open.svg")
    );   
    this.matIconRegistry.addSvgIcon(
      "bookclose",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/book-close.svg")
    );   
    this.matIconRegistry.addSvgIcon(
      "youtube",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/youtube.svg")
    );  
    this.matIconRegistry.addSvgIcon(
      "checkmarkss",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/checkmarkss.svg")
    );  
    this.matIconRegistry.addSvgIcon(
      "worldwide-value",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/worldwide-value.svg")
    ); 
    this.matIconRegistry.addSvgIcon(
      "best-achievement",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/best-achievement.svg")
    ); 
    this.matIconRegistry.addSvgIcon(
      "business-insurance",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/business-insurance.svg")
    ); 
    this.matIconRegistry.addSvgIcon(
      "money-bag",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/money-bag.svg")
    ); 
    this.matIconRegistry.addSvgIcon(
      "money-box",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/money-box.svg")
    ); 
    this.matIconRegistry.addSvgIcon(
      "star-alliance",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/star-alliance.svg")
    ); 
  }
  toggleSelected:string='';
  changeInToggleGroup(val: string) {
   
  }
  changeInToggle(val: string) {
    console.log(val);
  } 
  SubMenu($event:any)
  {
    debugger;
  }
  OpenYT()
  {
    window.open('https://www.youtube.com/@AZNETin','_blank');
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
      this.userIdService.getUserId().then((userId)=>{         
        this.userIdService.GetUser(userId).subscribe({
          next:(event)=>{                             
            this.LoadData(event);
            this.isReady=true;

             if(userId!=undefined && userId!=null)
             {
            setTimeout(()=>{
              this.userIdService.UpdateIPAddress(userId);
             },5000);
            }

            this._hubConnection = new HubConnectionBuilder()
            .withUrl(`${onlineUsersApi}/onlineUsersHub?userid=${ATOZQSettings.userid}`,{ withCredentials: false})  
            .build();      
            this._hubConnection.on('UpdateOnlineUsers', (online,visited,users) => {

              let onlineMultiplier = Math.floor(Math.random() * (52 - 25 + 1) + 25);

              this.online=online>0?onlineMultiplier*online:onlineMultiplier;
              this.visited=visited>0?visited*19:visited;
              this.users = users>0?users*17:1*users;
            });      
            this._hubConnection.start();  
          },
          error:(err)=>{
        alert('Something went wrong. Please try again after sometime.');   
            console.log(err);
          }
        });     
      });     
      this.UpdateToggleButtons();
  }

  UpdateToggleButtons()
  {
    if(location.pathname=="/")
    {
     this.toggleSelected = 'stock';
    }      
    else if(location.href.indexOf('stock')!=-1)
    {
     this.toggleSelected = 'stock';
    }
    else if(location.href.indexOf('learn')!=-1)
    {
     this.toggleSelected = 'learn';    
    }
    else if(location.href.indexOf('valuepickr')!=-1)
    {
     this.toggleSelected = 'valuepickr';    
    }
    else
    {
     this.toggleSelected = '';   
    }
  }

  ngAfterContentChecked(): void {   
    this.UpdateToggleButtons();
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



