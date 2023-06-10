import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements AfterViewInit {

  dsArray:any[]=[];

  displayedColumns: string[] = ['sC_CODE', 'sC_NAME', 'sC_GROUP', 'sC_TYPE','open','high','low','close','last','prevclose','nO_TRADES','nO_OF_SHRS','neT_TURNOV'];
  allDataSource = new MatTableDataSource([]);
  oneDataSource = new MatTableDataSource([]);
  tenDataSource = new MatTableDataSource([]);
  twentyDataSource = new MatTableDataSource([]);
  fiftyDataSource = new MatTableDataSource([]);
  hundredDataSource = new MatTableDataSource([]);
  twohundredDataSource = new MatTableDataSource([]);
  fivehundredDataSource = new MatTableDataSource([]);
  oneKDataSource = new MatTableDataSource([]);
  fiveKDataSource = new MatTableDataSource([]);
  tenKDataSource = new MatTableDataSource([]);
  fiftyKDataSource = new MatTableDataSource([]);
  oneLDataSource = new MatTableDataSource([]);

  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient,private _liveAnnouncer: LiveAnnouncer) { }

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  LoadDataSource(event:any)
  { 
    this.allDataSource = new MatTableDataSource(event.fullData);
    this.oneDataSource = new MatTableDataSource(event.underOneRupeeGroupBXT);     
    this.tenDataSource= new MatTableDataSource(event.underTenGroupA);
    this.twentyDataSource= new MatTableDataSource(event.underTwentyGroupA);
    this.fiftyDataSource= new MatTableDataSource(event.underFiftyGroupA);
    this.hundredDataSource= new MatTableDataSource(event.underHundredGroupA);
    this.twohundredDataSource= new MatTableDataSource(event.underTwoHundredGroupA);
    this.fivehundredDataSource= new MatTableDataSource(event.underFiveHundredGroupA);
    this.oneKDataSource= new MatTableDataSource(event.underOneKGroupA);
    this.fiveKDataSource= new MatTableDataSource(event.underFiveKGroupA);
    this.tenKDataSource= new MatTableDataSource(event.underTenKGroupA);
    this.fiftyKDataSource= new MatTableDataSource(event.underFiftyKGroupA);
    this.oneLDataSource= new MatTableDataSource(event.underOneLGroupA);

    // this.dsArray.push({key:'All',data:this.allDataSource});
    this.dsArray.push({key:'0-1',data:this.oneDataSource});
    this.dsArray.push({key:'1-10',data:this.tenDataSource});
    this.dsArray.push({key:'10-20',data:this.twentyDataSource});
    this.dsArray.push({key:'20-50',data:this.fiftyDataSource});
    this.dsArray.push({key:'50-100',data:this.hundredDataSource});
    this.dsArray.push({key:'100-200',data:this.twohundredDataSource});
    this.dsArray.push({key:'200-500',data:this.fivehundredDataSource});
    this.dsArray.push({key:'500-1K',data:this.oneKDataSource});
    this.dsArray.push({key:'1K-5K',data:this.fiveKDataSource});
    this.dsArray.push({key:'5K-10K',data:this.tenKDataSource});
    this.dsArray.push({key:'10K-50K',data:this.fiftyKDataSource});
    this.dsArray.push({key:'50K-1L',data:this.oneLDataSource});
  }

  ngAfterViewInit() {

    // this.allDataSource.paginator = this.paginator;
    // this.oneDataSource.paginator = this.paginator;
    // this.tenDataSource.paginator = this.paginator;
    // this.twentyDataSource.paginator = this.paginator;
    // this.fiftyDataSource.paginator = this.paginator;
    // this.hundredDataSource.paginator = this.paginator;
    // this.twohundredDataSource.paginator = this.paginator;
    // this.fivehundredDataSource.paginator = this.paginator;
    // this.oneKDataSource.paginator = this.paginator;
    // this.fiveKDataSource.paginator = this.paginator;
    // this.tenKDataSource.paginator = this.paginator;
    // this.fiftyKDataSource.paginator = this.paginator;
    // this.oneLDataSource.paginator = this.paginator;

    this.allDataSource.sort = this.sort;
    this.oneDataSource.sort = this.sort;
    this.tenDataSource.sort = this.sort;
    this.twentyDataSource.sort = this.sort;
    this.fiftyDataSource.sort = this.sort;
    this.hundredDataSource.sort = this.sort;
    this.twohundredDataSource.sort = this.sort;
    this.fivehundredDataSource.sort = this.sort;
    this.oneKDataSource.sort = this.sort;
    this.fiveKDataSource.sort = this.sort;
    this.tenKDataSource.sort = this.sort;
    this.fiftyKDataSource.sort = this.sort;
    this.oneLDataSource.sort = this.sort;

    this.http.get('http://localhost:24288/api/file')
    .subscribe({
      next: (event:any) => {  
    
        this.LoadDataSource(event)
    },
    error: (err: HttpErrorResponse) => console.log(err)
  });

  }

  applyFilter(event: Event,ds:any) {
    const filterValue = (event.target as HTMLInputElement).value;
    ds.filter = filterValue.trim().toLowerCase();

    if (ds.paginator) {
      ds.paginator.firstPage();
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

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
          debugger;
          // this.onUploadFinished.emit(event.body);
          this.LoadDataSource(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
}