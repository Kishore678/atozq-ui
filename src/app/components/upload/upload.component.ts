import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs/internal/observable/of';
import { delay} from 'rxjs/operators';
import { Scriptdetails } from 'src/app/models/scriptdetails.model';
import { ScriptdetailsService } from 'src/app/services/scriptdetails.service';
import { environment } from 'src/environments/environment';
import { ScriptDetailsDialogComponent } from '../script-details-dialog/script-details-dialog.component';
import { BSEDetails, Bseanalytic } from 'src/app/models/bseanalytics.model';

const apiBaseUrl = environment.apiBaseUrl;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  
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
    'Grp',
    'LTP',
    'Vol',
    'Code',
    'Cnt',
    'Opn',
    'Hig',
    'Low',
    'Avg',
    'Prv' ]

  dataSource = new MatTableDataSource<Bseanalytic>();
  selected = '0-1';
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sortForDataSource;
  }
  ngOnInit() {
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
this.dsArray.push({key:'50K-1L',text:'Group-A b/w Rs.50,000 and Rs.1,00,000'});

    this.http.get(`${apiBaseUrl}/api/stock?grp=${this.selected}`)
    .subscribe({
      next: (event:any) => { 
     this.LoadDataSource(event);
    },
    error: (err: HttpErrorResponse) => console.log(err)
  });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  flagStyle(risk:any,isTitle:boolean)
  {
    let returnType='';
    switch(risk)
    {
      case 1:
       isTitle? returnType='No exchange notices. Intra-day, BTST supported. Positive Net Profit.':returnType = 'risk1';
      break;
      case 2:
        isTitle? returnType='No exchange notices. Intra-day, BTST supported. Negative Net-Profit.':returnType = 'risk2';
      break;
      case 3:
        isTitle? returnType='No exchange notices. Trade to Trade stock. No Intra-day and BTST support. Positive Net Profit.':returnType = 'risk3';
      break;
      case 4:
        isTitle? returnType='Exchange Notice. High Risk involved.':returnType = 'risk4';
      break;         
      default:
        isTitle? returnType='Risk not classified. Click on stock to know details.':returnType = 'risk';
      break;
    }    
    return returnType;
  }
  
  handleClick() {

    this.http.get(`${apiBaseUrl}/api/stock?grp=${this.selected}`)
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
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: 'relative',
        width: 'relative',
        panelClass: 'my-dialog',
        disableClose: false,
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


 Browse(url:string)
 {
  window.open(url,'self');
 }
  progress!: number;
  message!: string;
  
  constructor(
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
    this.fileName = this.bseBhavModel.FileName;
    this.bseBhavData = this.bseBhavModel.BSEAnalytics;
//     switch (this.selected) {
//       case 'All': this.bseBhavData = this.bseBhavModel.fullData;
//       break;     
//            case '0-1': this.bseBhavData = this.bseBhavModel.underOneRupeeGroupBXT;
//            break;   
//            case '1-2': this.bseBhavData = this.bseBhavModel.underTwoRupeeGroupBXT;
//            break;
//            case '2-5': this.bseBhavData = this.bseBhavModel.underFiveRupeeGroupBXT;
//            break;
//            case '1-10': this.bseBhavData = this.bseBhavModel.underTenGroupA;         
//            break;   
//            case '10-20': this.bseBhavData = this.bseBhavModel.underTwentyGroupA;
//            break;   
//            case '20-50': this.bseBhavData = this.bseBhavModel.underFiftyGroupA;
//            break;   
//            case '50-100': this.bseBhavData = this.bseBhavModel.underHundredGroupA;
//            break;   
//            case '100-200': this.bseBhavData = this.bseBhavModel.underTwoHundredGroupA;
//            break;   
//            case '200-500': this.bseBhavData = this.bseBhavModel.underFiveHundredGroupA;
//            break;   
//            case '500-1K': this.bseBhavData = this.bseBhavModel.underOneKGroupA;
//            break;   
//            case '1K-5K': this.bseBhavData = this.bseBhavModel.underFiveKGroupA;
//            break;   
//            case '5K-10K': this.bseBhavData = this.bseBhavModel.underTenKGroupA;
//            break;   
//            case '10K-50K': this.bseBhavData = this.bseBhavModel.underFiftyKGroupA;
//            break;   
//            case '50K-1L': this.bseBhavData = this.bseBhavModel.underOneLGroupA;
//            break;  
//  }
 of(this.bseBhavData).pipe(delay(1250)).subscribe(x => {
  this.dataSource.data = this.bseBhavData;
  this.length = this.bseBhavData.length; 
}); 

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