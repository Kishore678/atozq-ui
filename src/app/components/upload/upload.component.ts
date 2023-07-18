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
import { WatchModel } from 'src/app/models/watch.model';

const apiBaseUrl = environment.apiBaseUrl;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {  
  // watchList:WatchModel[]=new Array<WatchModel>();
  user!:UserModel;
  isTrue:boolean=false;
  dsArray:any[]=[];
  fileName:string='';
  size:number=10;
  length!:number;
  bseBhavData!:Bseanalytic[];
  bseBhavModel!:BSEDetails;
  isMobile:Boolean=false;
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
    'LTP',
    'Actions',    
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
  // ChatCount!: ChatCount[];

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

  share(prod:Bseanalytic)
{


  let id = prod.Code;
  let category = 'Stock Fundamentals';
  let titleText = prod.Nme.trim();

  let mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check;
  };

  let mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check;
  };

  if(mobileCheck()==true || mobileAndTabletCheck()==true)
  {
    this.isMobile = true;
  }

  let loc = window.location;
  let host = loc.hostname;

  let domain = loc.protocol+"//"+(host=="localhost"?host+":"+loc.port:host);  

  let url = 
  (this.isMobile?"whatsapp://send?text=":"https://web.whatsapp.com/send?text=") +titleText+" "+category+" Secured Link: "+domain+"/app/stock/"+prod.Code;

  
  // this.service.share(id).subscribe(result=>{

  //   this.products = this.products.filter((val,index,arr)=>{

  //     if(val.productId == result.productId)
  //     {
  //       val.isWatch=result.isWatch;
  //     }
  //     return true;
  //   });

 window.open(url, '_blank');
  // });


 // window.open(url, '_blank');
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
    this.dsArray.push({key:'All',text:'All Categories'});
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

        this.http.get(`${apiBaseUrl}/api/stock/view?grp=${this.selected}&cache=${true}&userid=${this.user.AnonymousID}`)
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
    this.http.get(`${apiBaseUrl}/api/stock/view?grp=${this.selected}&cache=${true}&userid=${this.user.AnonymousID}`)
    .subscribe({
      next: (event:any) => { 
     this.LoadDataSource(event);
    },
    error: (err: HttpErrorResponse) => console.log(err)
  });
  
  
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

//  GetChatCount(code:string)
//  {
//   return this.ChatCount.find(f=>f.ChatID==code)?.Count??0;
//  }
//  chatCountDisplay(count:number)
//  {
//   return count>0?"showChatCount":"hideChatCount";
//  }

//  DisplayWatch(code:string)
//  {
//   let watchStyle = this.watchList.find(f=>f.Code==code)!=undefined?'watch':'';
//   return watchStyle;
//  }

//  LoadWatch(watch:WatchModel)
//  {
//    return watch;
//  }
 AddOrRemoveWatch(elem:Bseanalytic)
 {
  
  // let w = this.watchList.find(f=>f.Code==elem.Code);
  let w = new WatchModel();  
    w.AnonymousID=this.user.AnonymousID;
    w.Code=elem.Code;
    w.CreatedLTP =elem.LTP; 
    w.IsWatch=elem.IsWatch; 
 
  this.useridService.AddorRemoveWatch(w).subscribe({
    next:(event)=>{
      // let rw = this.LoadWatch(event);
      if(event.IsWatch)
      {
        // this.watchList.push(rw);        
        alert(elem.Nme.trim()+' added to My Account --> Watch List.');
      }
      else
      {
        // this.watchList = this.watchList.filter((value,index,arr)=>{
        //   return value.Code!=w?.Code;
        // });
        alert(elem.Nme.trim()+' removed from My Account --> Watch List.')
      }   
   

      this.dataSource.data = this.dataSource.data.filter((value,idx,arr)=>
      {
        if(value.Code==elem.Code)
        {
          value.IsWatch = event.IsWatch;          
        }
        return true;
      }); 
     
    },
    error:(err)=>{
      console.log(err);
      alert('Something went wrong. Please try again.');
    }
  });
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
    // this.ChatCount = this.bseBhavModel.ChatCount;   
    // this.watchList = this.bseBhavModel.Watches; 
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