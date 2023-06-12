import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs/internal/observable/of';
import { delay} from 'rxjs/operators';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  dsArray:any[]=[];
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
    this.http.get('http://localhost:24288/api/file')
    .subscribe({
      next: (event:any) => { 
        this.bseBhavModel = event;
        this.bseBhavData = event.underOneRupeeGroupBXT;
            // Simulate api call
    of(this.bseBhavData).pipe(delay(1250)).subscribe(x => {
      this.dataSource.data = this.bseBhavData
    }); 
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

    },
    error: (err: HttpErrorResponse) => console.log(err)
  });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  pagesClass:string='btn';
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

 event.target.setAttribute('class','btn selected');

 event.target.parentNode.childNodes.forEach(function(item:any)
 {  if(event.target!=item)
  {
  item.setAttribute('class','btn'); 
  }
 });
 }
//   ngAfterViewInit() {    
//     this.oneDataSource.sort = this.oneMatSort;
//     this.oneDataSource.paginator = this.oneMatPaginator;
// }
  
  // {
  //   this.oneSort = ms;
  //   this.tenSort = ms;
  //   this.twentySort = ms;
  //   this.setDataSourceAttributes();
  // }

  // @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
  //   this.onePaginator = mp;
  //   this.tenPaginator = mp;
  //   this.twentyPaginator = mp;
  //   this.setDataSourceAttributes();
  // }

  // setDataSourceAttributes() {
  //   this.oneDataSource.paginator = this.onePaginator;
  //   // this.tenDataSource.paginator = this.tenPaginator;
  //   // this.twentyDataSource.paginator = this.twentyPaginator;
  //   this.oneDataSource.sort = this.oneSort;
  //   // this.tenDataSource.sort = this.tenSort;
  //   // this.twentyDataSource.sort = this.twentySort;
  //   // if (this.paginator && this.sort) {
  //   //   this.applyFilter('');
  //   // }
  // }


 

  allData:any;
  one:any;
  ten:any;
  twenty:any;
  fifty:any;
  hundred:any;
  twohundred:any;
  fivehundred:any;
  oneK:any;
  fiveK:any;
  tenK:any;
  fiftyK:any;
  oneL:any;

  progress!: number;
  message!: string;
  
  constructor(private http: HttpClient,private _liveAnnouncer: LiveAnnouncer) { }

  // allDataSource = new MatTableDataSource<any>;
  // oneDataSource = new MatTableDataSource<any>;
  // tenDataSource = new MatTableDataSource<any>;
  // twentyDataSource = new MatTableDataSource<any>;
  // fiftyDataSource = new MatTableDataSource<any>;
  // hundredDataSource = new MatTableDataSource<any>;
  // twohundredDataSource = new MatTableDataSource<any>;
  // fivehundredDataSource = new MatTableDataSource<any>;
  // oneKDataSource = new MatTableDataSource<any>;
  // fiveKDataSource = new MatTableDataSource<any>;
  // tenKDataSource = new MatTableDataSource<any>;
  // fiftyKDataSource = new MatTableDataSource<any>;
  // oneLDataSource = new MatTableDataSource<any>;

 

//   onSortData(sort: Sort) {
//     let data = this.oneDataSource.slice();
//     if (sort.active && sort.direction !== '') {
//         data = data.sort((a: any, b: any) => {
//             const isAsc = sort.direction === 'asc';
//             switch (sort.active) {
//                 case 'address': return this.compare(a.address, b.address, isAsc);
//                 case 'beds': return this.compare(+a.beds, +b.beds, isAsc);
//                 case 'baths': return this.compare(+a.baths, +b.baths, isAsc);
//                 case 'sqft': return this.compare(+a.sqft, +b.sqft, isAsc);
//                 default: return 0;
//             }
//         });
//     }
//     this.one.next(data);
// }

  LoadDataSource()
  { 
    // this.allDataSource.data = this.allData;
    this.length = this.one.length;
    this.dataSource.data = this.one;     
    // this.tenDataSource.data = this.ten;
    // this.twentyDataSource.data = this.twenty;
    // this.fiftyDataSource.data = this.fifty;
    // this.hundredDataSource.data = this.hundred;
    // this.twohundredDataSource.data = this.twohundred;
    // this.fivehundredDataSource.data = this.fivehundred;
    // this.oneKDataSource.data = this.oneK;
    // this.fiveKDataSource.data = this.fiveK;
    // this.tenKDataSource.data = this.tenK;
    // this.fiftyKDataSource.data = this.fiftyK;
    // this.oneLDataSource.data = this.oneL;
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
          // this.onUploadFinished.emit(event.body);

     // this.allData =event.body.fullData;
    this.one =event.body.underOneRupeeGroupBXT;
    // this.ten =event.body.underTenGroupA;
    // this.twenty =event.body.underTwentyGroupA;
    // this.fifty =event.body.underFiftyGroupA;
    // this.hundred =event.body.underHundredGroupA;
    // this.twohundred =event.body.underTwoHundredGroupA;
    // this.fivehundred =event.body.underFiveHundredGroupA;
    // this.oneK =event.body.underOneKGroupA;
    // this.fiveK =event.body.underFiveKGroupA;
    // this.tenK =event.body.underTenKGroupA;
    // this.fiftyK =event.body.underFiftyKGroupA;
    // this.oneL =event.body.underOneLGroupA;

          this.LoadDataSource();
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