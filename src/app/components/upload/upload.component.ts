import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs/internal/observable/of';
import { delay, timeout} from 'rxjs/operators';
import { Scriptdetails } from 'src/app/models/scriptdetails.model';
import { ScriptdetailsService } from 'src/app/services/scriptdetails.service';
import { environment } from 'src/environments/environment';
import { ScriptDetailsDialogComponent } from '../script-details-dialog/script-details-dialog.component';
import { BSEDetails, Bseanalytic, ChatCount } from 'src/app/models/bseanalytics.model';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { ChatModel } from 'src/app/models/chat-model.model';
import { ScriptWarnModel } from 'src/app/models/script-wrn.model';
import { WarnDialogComponent } from '../warn-dialog/warn-dialog.component';
import { ATOZQSettings } from 'src/constants/ATOZQSettings';
import { UserIDService } from 'src/app/services/user-id.service';
import { UserModel } from 'src/app/models/user.model';

const apiBaseUrl = environment.apiBaseUrl;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {  
  user!:UserModel;
  isTrue:boolean=false;
  dsArray:any[]=[];
  fileName:string='';
  size:number=10;
  length!:number;
  bseBhavData!:Bseanalytic[];
  bseBhavModel!:BSEDetails;
  @ViewChild(MatSort) sortForDataSource!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

//   displayedColumns = ['flag','sC_NAME','sC_GROUP','last', 'nO_OF_SHRS','nO_TRADES' ,'open' ,'high' ,'low'
//   ,'close'
//   ,'prevclose'
//   ,'neT_TURNOV'
//   ,'sC_CODE'
// ];

displayedColumns = [    
    'Flg',
    'Nme',
    'Chat',   
    'LTP',
    'Vol',
    'Grp',
    'Code',
    'Cnt',
    'Opn',
    'Hig',
    'Low',
    'Avg',
    'Prv' ];
   

  dataSource = new MatTableDataSource<Bseanalytic>();
  selected = '0-1';
  ChatCount!: ChatCount[];

  ngAfterViewInit() {
 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sortForDataSource;
  }

  AddWrn(element:Bseanalytic)
  {
    let model = new ScriptWarnModel();
    model.AnalyticsId = element.BSEAnalyticsId;
    model.Warning = element.Wrn;

    const dialogRef = this.dialog.open(WarnDialogComponent, {
      width: '100%',
      height: '100%',  
      maxWidth:'100%',
      maxHeight:'100%',    
      disableClose: true,
      panelClass: 'warn-dialog',
      autoFocus: true,
      data:model
    });

    dialogRef.componentInstance.onDoAction.subscribe((d) => {            
       //do some action
    });

    dialogRef.componentInstance.onCloseDialog.subscribe((d) => {

      this.http.get(`${apiBaseUrl}/api/stock/view?grp=${this.selected}&cache=${false}`)
      .subscribe({
        next: (event:any) => { 
       this.LoadDataSource(event);
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });

      d.dialog.close();
    });

  }

  OpenChat(element:Bseanalytic)
  {  
    let model = new ChatModel();
    model.Code = element.Code;
    model.Title = element.Nme;
    model.UserId = this.user.AnonymousID;
    model.UserName = this.user.UserName;

    this.http.get(`${apiBaseUrl}/api/chat/log?code=${element.Code}`)
    .subscribe({
      next: (event:any) => {                  
           model.Messages = event;           
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
    },
    error: (err: HttpErrorResponse) => 
    {   
      console.log(err);
    }
  });

    
  }

  LoadUser()
  {   
    this.user = new UserModel();
    this.user.AnonymousID = ATOZQSettings.userid;
    this.user.UserName=ATOZQSettings.username;
  }

  ngOnInit() {
    this.LoadUser();
    this.dsArray.push({key:'All',text:'All'});
this.dsArray.push({key:'0-1',text:'Penny stocks (B,X,T) under Rs.1'});
this.dsArray.push({key:'1-2',text:'Penny stocks (B,X,T) under Rs.2'});
this.dsArray.push({key:'2-5',text:'Penny stocks (B,X,T) under Rs.5'});
this.dsArray.push({key:'1-10',text:'Group-A b/w Rs.1 and Rs.10'});
this.dsArray.push({key:'10-20',text:'Group-A b/w Rs.10 and Rs.20'});
this.dsArray.push({key:'20-50',text:'Group-A b/w Rs.20 and Rs.50'});
this.dsArray.push({key:'50-100',text:'Group-A b/w Rs.50 and Rs.100'});
this.dsArray.push({key:'100-200',text:'Group-A b/w Rs.100 and Rs.200'});
this.dsArray.push({key:'200-500',text:'Group-A b/w Rs.200 and Rs.500'});
this.dsArray.push({key:'500-1K',text:'Group-A b/w Rs.500 and Rs.1,000'});
this.dsArray.push({key:'1K-5K',text:'Group-A b/w Rs.1,000 and Rs.5,000'});
this.dsArray.push({key:'5K-10K',text:'Group-A b/w Rs.5,000 and Rs.10,000'});
this.dsArray.push({key:'10K-50K',text:'Group-A b/w Rs.10,000 and Rs.50,000'});
this.dsArray.push({key:'Above-50K',text:'Group-A Above Rs.50,000'});

       

    let item = ['7572969910637412'].filter(id => id == ATOZQSettings.userid);
        
        if(item.length>0)
        {
         this.displayedColumns.push('Wrn');
        } 

        this.http.get(`${apiBaseUrl}/api/stock/view?grp=${this.selected}&cache=${true}`)
        .subscribe({
          next: (event:any) => { 
         this.LoadDataSource(event);
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });    
      
 
      // this.useridService.GetUser(userid).subscribe({
      //   next:(event)=>{
      //     this.LoadUser(event);
      //   },
      //   error:(err)=>{console.log(err);}
      // })



   

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  flagStyle(analytic:Bseanalytic)
  {
    let returnStyle='';
    switch(analytic.Flg)
    {
      case 1:
        returnStyle = 'risk1';
      break;
      case 2:
        returnStyle = 'risk2';
      break;
      case 3:
        returnStyle = 'risk3';
      break;
      case 4:
        returnStyle = 'risk4';
      break;         
      default:
        returnStyle = 'risk';
      break;
    }    

    if(analytic.Flg==1 && analytic.Wrn!=null && analytic.Wrn!='')
    {
      returnStyle = 'risk3';
    }
    return returnStyle;
  }

  flagContent(analytic:Bseanalytic)
  {
   var returnContent = new Array();

    switch(analytic.Flg)
    {
      case 1:
        returnContent.push('Good: No exchange notices.');
        returnContent.push('Good: Intra-day, BTST supported.');
        returnContent.push('Good: Positive Net Profit.') ;    
      break;
      case 2:
        returnContent.push('Good: No exchange notices.') ;    
        returnContent.push('Good: Intra-day, BTST supported.') ;    
        returnContent.push('Bad: Negative Net-Profit.') ;  
      break;
      case 3:
        returnContent.push('Good: No exchange notices.') ;  
        returnContent.push('Bad: Trade to Trade stock.') ;  
        returnContent.push('Bad: No Intra-day and BTST support.') ;  
        returnContent.push('Good: Positive Net Profit.') ; 
      break;
      case 4:
        returnContent.push('Bad: Exchange Notice.') ; 
        returnContent.push('Bad: High Risk involved.') ; 
      break;         
      default:
        returnContent.push('Risk not classified.') ;
        returnContent.push('Click on stock to know details.') ;
        
      break;
    }    

    if(analytic.Wrn)
    {
      returnContent.push('Bad: '+analytic.Wrn);
    }
    return returnContent;
  }
  
  SelectionChanged() {
    this.http.get(`${apiBaseUrl}/api/stock/view?grp=${this.selected}&cache=${true}`)
    .subscribe({
      next: (event:any) => { 
     this.LoadDataSource(event);
    },
    error: (err: HttpErrorResponse) => console.log(err)
  });
  
  
 }

 GetChatCount(code:string)
 {
  return this.ChatCount.find(f=>f.ChatID==code)?.Count??0;
 }

 ViewDetails(element:any)
 {
  //  this.scriptDetailService.GetScriptDetails(element.sC_CODE).subscribe(res=>{    
      const dialogRef = this.dialog.open(ScriptDetailsDialogComponent, {
        width: '100%',
        height: '100%',  
        maxWidth:'100%',
        maxHeight:'100%',    
        disableClose: true,
        panelClass: 'fundamental-dialog',
        autoFocus: true,
        data:element
      });

      dialogRef.componentInstance.onDoAction.subscribe((d) => {            
         //do some action
      });

      dialogRef.componentInstance.onCloseDialog.subscribe((d) => {
        d.dialog.close();
      }); 
  //  });
 }

 chatCountDisplay(count:number)
 {
  return count>0?"showChatCount":"hideChatCount";
 }

 Browse(url:string)
 {
  window.open(url,'self');
 }
  progress!: number;
  message!: string;
  
  constructor(
    private useridService:UserIDService,
    private http: HttpClient,
    private _liveAnnouncer: LiveAnnouncer,
    private scriptDetailService:ScriptdetailsService,
    private dialog: MatDialog
    ) { }
    openDialog(model:Scriptdetails) {
     

      // this.dialog.open(ScriptDetailsDialogComponent,{data:model});
    }
  LoadDataSource(event:BSEDetails)
  { 
    this.dataSource.data  = [];
    this.bseBhavModel = event;
    this.ChatCount = this.bseBhavModel.ChatCount;    
    this.bseBhavData = this.bseBhavModel.BSEAnalytics;
 of(this.bseBhavData).pipe(delay(1250)).subscribe(x => {
  this.dataSource.data = this.bseBhavData;
  this.length = this.bseBhavData.length; 
  this.fileName = this.formateToDate(this.bseBhavModel.FileName.substring(2,8),2);
}); 

  }
formateToDate(inputString:string,n:number)
  {   
let insertChar = "-";
let outputString = "";
for (let i = 0; i < inputString.length; i += n) {
   let slice = inputString.slice(i, i + n);
   if(slice.length==n && i + n < inputString.length)
      outputString += slice + insertChar;
   else
      outputString += slice;
}
return outputString;
  }

  sorter = (a:any, b:any) => {
    if (a.title > b.title) return 1;
    if (a.title < b.title) return -1;
    return 0;
  };
  
  uploadFile = (files:any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post(`${apiBaseUrl}/api/file`, formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event:any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';  
          this.LoadDataSource(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
}

export interface BSEBhavCopy
{
  flag:number;
  sC_CODE:number;
  sC_NAME:string;
  sC_GROUP:string;  
  sC_TYPE:string;
  oPEN:number;
  hIGH:number;
  lOW:number;
  cLOSE:number;
  lAST:number;
  pREVCLOSE:number;
  nO_TRADES:number;
  nO_OF_SHRS:number;
  nET_TURNOV:number;
  tDCLOINDI:string;
}
export interface BSEBhavCopyViewModel {
   fileName:string;
   fullData:BSEBhavCopy[];
   underOneRupeeGroupBXT:BSEBhavCopy[];
   underTwoRupeeGroupBXT:BSEBhavCopy[];
   underFiveRupeeGroupBXT:BSEBhavCopy[];
   underTenGroupA:BSEBhavCopy[];
   underTwentyGroupA:BSEBhavCopy[];
   underFiftyGroupA:BSEBhavCopy[];
   underHundredGroupA:BSEBhavCopy[];
   underTwoHundredGroupA:BSEBhavCopy[];
   underFiveHundredGroupA:BSEBhavCopy[];
   underOneKGroupA:BSEBhavCopy[];
   underFiveKGroupA:BSEBhavCopy[];
   underTenKGroupA:BSEBhavCopy[];
   underFiftyKGroupA:BSEBhavCopy[];
   underOneLGroupA:BSEBhavCopy[];
}