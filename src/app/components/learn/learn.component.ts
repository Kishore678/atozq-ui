import { Component, OnInit, ViewChild } from '@angular/core';
import { Learning, LearningModel } from 'src/app/models/Learning.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { delay, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';
const apiBaseUrl = environment.apiBaseUrl;
@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class LearnComponent implements OnInit {

  length!:number;
pageNo:number=0;
expandcollapse:string="expandcollapse";
expandedElement!: Learning | null;
size:number=10;
spinner:boolean=false;
learningsCount!:number;
learningModel!:LearningModel;
learningsData!:Learning[];

@ViewChild(MatSort) sortForDataSource!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;

dataSource = new MatTableDataSource<Learning>();


displayedColumns = [  
  'Flg'  ,
  'ItemText'
  
];

LoadDataSource(event:LearningModel)
{ 
  this.dataSource.data  = [];  

  this.learningModel = event;

  this.learningsData = this.learningModel.Learnings;

of(this.learningsData).pipe(delay(1250)).subscribe(x => {

  this.length = this.learningModel.LearningCount;

this.dataSource.data = this.learningsData;


this.learningsCount = this.learningModel.LearningCount;

this.spinner = false;

}); 
}

generalError()
{
  Swal.fire('Something went wrong, please try after sometime.');
}

loadData()
{
  this.spinner = true;
  this.http.get(`${apiBaseUrl}/api/learnings/page?pageNo=${this.pageNo}&pageSize=${this.size}`)
  .subscribe({
    next: (event:any) => { 
   this.LoadDataSource(event);
   this.paginator.pageIndex = this.pageNo;
   this.paginator.length = this.learningsCount;
   window.scrollTo(0,0); 
  },
  error: (err: HttpErrorResponse) => {
    console.log(err);
    this.generalError();
    window.location.reload();
  }
});
}

pageChanged(event: PageEvent) {
  console.log({ event });
  this.size = event.pageSize;
  this.pageNo = event.pageIndex;
  this.loadData(); 
}

  constructor(public http:HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

}
