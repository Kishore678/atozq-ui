import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs/internal/observable/of';
import { delay} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
  size:number=5;
  length!:number;
  bseBhavData!:BSEBhavCopy[];
  bseBhavModel!:BSEBhavCopyViewModel;
  @ViewChild(MatSort) sortForDataSource!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = ['sC_CODE', 'sC_NAME', 'sC_GROUP', 'sC_TYPE','open','high','low','close','last','prevclose','nO_TRADES','nO_OF_SHRS','neT_TURNOV'];
  dataSource = new MatTableDataSource<BSEBhavCopy>();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sortForDataSource;
  }

  ngOnInit() {
    this.http.get(`${apiBaseUrl}/api/file`)
    .subscribe({
      next: (event:any) => { 
        
this.dsArray.push({key:'All'});
this.dsArray.push({key:'0-1'});
this.dsArray.push({key:'1-10'});
this.dsArray.push({key:'10-20'});
this.dsArray.push({key:'20-50'});
this.dsArray.push({key:'50-100'});
this.dsArray.push({key:'100-200'});
this.dsArray.push({key:'200-500'});
this.dsArray.push({key:'500-1K'});
this.dsArray.push({key:'1K-5K'});
this.dsArray.push({key:'5K-10K'});
this.dsArray.push({key:'10K-50K'});
this.dsArray.push({key:'50K-1L'});

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
  handleClick(event:any,method: string) {
    switch (method) {
      case 'All': this.bseBhavData = this.bseBhavModel.fullData;
      break;     
           case '0-1': this.bseBhavData = this.bseBhavModel.underOneRupeeGroupBXT;
           break;   
           case '1-10': this.bseBhavData = this.bseBhavModel.underTenGroupA;
           break;   
           case '10-20': this.bseBhavData = this.bseBhavModel.underTwentyGroupA;
           break;   
           case '20-50': this.bseBhavData = this.bseBhavModel.underFiftyGroupA;
           break;   
           case '50-100': this.bseBhavData = this.bseBhavModel.underHundredGroupA;
           break;   
           case '100-200': this.bseBhavData = this.bseBhavModel.underTwoHundredGroupA;
           break;   
           case '200-500': this.bseBhavData = this.bseBhavModel.underFiveHundredGroupA;
           break;   
           case '500-1K': this.bseBhavData = this.bseBhavModel.underOneKGroupA;
           break;   
           case '1K-5K': this.bseBhavData = this.bseBhavModel.underFiveKGroupA;
           break;   
           case '5K-10K': this.bseBhavData = this.bseBhavModel.underTenKGroupA;
           break;   
           case '10K-50K': this.bseBhavData = this.bseBhavModel.underFiftyKGroupA;
           break;   
           case '50K-1L': this.bseBhavData = this.bseBhavModel.underOneLGroupA;
           break;   
 
   default:this.bseBhavData = this.bseBhavModel.fullData;
     break;
 }
 this.dataSource.data = this.bseBhavData;
 this.length = this.bseBhavData.length; 
 }

 Browse(url:string)
 {
  window.open(url,'self');
 }
  progress!: number;
  message!: string;
  
  constructor(private http: HttpClient,private _liveAnnouncer: LiveAnnouncer) { }

  LoadDataSource(event:any)
  { 
    this.dataSource.data  = [];
    this.bseBhavModel = event;
    this.fileName = this.bseBhavModel.fileName;
    this.bseBhavData = event.underOneRupeeGroupBXT;
        // Simulate api call
of(this.bseBhavData).pipe(delay(1250)).subscribe(x => {
  this.dataSource.data = this.bseBhavData
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
    
    this.http.post('http://localhost:24288/api/file', formData, {reportProgress: true, observe: 'events'})
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