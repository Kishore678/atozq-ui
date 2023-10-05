import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CibilMaster } from 'src/app/models/cibil-master.model';
import { CibilMasterService } from 'src/app/services/cibil-master.service';
import { CibilMasterFormDialogComponent } from '../cibil-master-form-dialog/cibil-master-form-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-p2pman',
  templateUrl: './p2pman.component.html',
  styleUrls: ['./p2pman.component.css']
})
export class P2pmanComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['category', 'min', 'max'];
  // cibilMasterId: number;
  // createdDatec: string;
  // modifedDate: string;
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  /**
   * it holds a list of active filter for each column.
   * example: {firstName: {contains: 'person 1'}}
   *
   */
  public columnsFilters = {};

  public dataSource: MatTableDataSource<CibilMaster>;
  private serviceSubscribe!: Subscription;
  cibilMasterData!:CibilMaster[];

  LoadData()
{
  this.cibilMasterService.getData().subscribe({
    next:(data)=>{
      this.cibilMasterData = data;
      this.dataSource.data = this.cibilMasterData;
    },
    error:(err)=>{console.log(err);}
   });
}
  constructor(private cibilMasterService:CibilMasterService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<CibilMaster>();
  }   

  edit(id:number,data: CibilMaster) {
    const dialogRef = this.dialog.open(CibilMasterFormDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cibilMasterService.updateData(id,result);
        this.LoadData();
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cibilMasterService.deleteData(id);
        this.LoadData();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {
    debugger;
    this.LoadData();   
  }

  ngOnDestroy(): void {
   
  }
}