import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CibilMaster } from 'src/app/models/cibil-master.model';
import { CibilMasterService } from 'src/app/services/cibil-master.service';
import { CibilMasterFormDialogComponent } from '../cibil-master-form-dialog/cibil-master-form-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { InvestSettingsRules } from 'src/app/models/invest-settings-rules.model';
import { InvestSettingsRulesService } from 'src/app/services/invest-settings-rules.service';
import { InvestSettingsRulesFormDialogComponent } from '../invest-settings-rules-form-dialog/invest-settings-rules-form-dialog.component';

@Component({
  selector: 'app-p2pman',
  templateUrl: './p2pman.component.html',
  styleUrls: ['./p2pman.component.css']
})
export class P2pmanComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('cibilMasterPaginator') paginatorCibilMaster!: MatPaginator;
  @ViewChild('cibilMasterSort') sortCibilMaster!: MatSort;

  @ViewChild('InvestSettingsRules') paginatorInvestSettingsRules!: MatPaginator;
  @ViewChild('investSettingsRulesSort') sortInvestSettingsRules!: MatSort;

  public displayedColumnsCibilMaster: string[] = ['category', 'min', 'max'];
  public displayedColumnsInvestSettingsRules: string[] = ['ruleName', 'riskType', 'isBaseRule',
'minAge','maxAge','loanAmt','tenureD','tenureM','investAmt','minInvest','allowNoCibil',
'cibilMasterID','maxAllowNoCibil','isAutoInvest','autoInvestLimit','tPin',
'user','pwd','source','escroBal','investLimitBal','alertIfBalLow','createdDatec','modifedDate'];
    
  public columnsToDisplayCibilMaster: string[] = [...this.displayedColumnsCibilMaster, 'actions'];
  public columnsToDisplayInvestSettingsRules: string[] = [...this.displayedColumnsInvestSettingsRules, 'actions'];

  /**
   * it holds a list of active filter for each column.
   * example: {firstName: {contains: 'person 1'}}
   *
   */
  public columnsFiltersCibilMaster = {};
  public columnsFiltersInvestSettingsRules = {};

  public dataSourceCibilMaster: MatTableDataSource<CibilMaster>; 
  cibilMasterData!:CibilMaster[];

  public dataSourceInvestSettingsRules: MatTableDataSource<InvestSettingsRules>; 
  investSettingsRules!:InvestSettingsRules[];

  LoadDataCibilMaster()
{
  this.cibilMasterService.getData().subscribe({
    next:(data)=>{
      this.cibilMasterData = data;
      this.dataSourceCibilMaster.data = this.cibilMasterData;
    },
    error:(err)=>{console.log(err);}
   });
}

LoadDataInvestSettingsRules()
{
  this.investSettingsRulesService.getData().subscribe({
    next:(data)=>{
      this.investSettingsRules = data;
      this.dataSourceInvestSettingsRules.data = this.investSettingsRules;
    },
    error:(err)=>{console.log(err);}
   });
}

  constructor(private cibilMasterService:CibilMasterService,
    private investSettingsRulesService:InvestSettingsRulesService, public dialog: MatDialog) {
    this.dataSourceCibilMaster = new MatTableDataSource<CibilMaster>();
    this.dataSourceInvestSettingsRules = new MatTableDataSource<InvestSettingsRules>();
  }   

  editCibilMaster(id:number,data: CibilMaster) {
    const dialogRef = this.dialog.open(CibilMasterFormDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cibilMasterService.updateData(id,result).subscribe({
          next:(value) =>{
        this.LoadDataCibilMaster();            
          },
          error:(err)=>{alert(err)}
        });;
        this.LoadDataCibilMaster();
      }
    });
  }

  editInvestSettingsRules(id:number,data: InvestSettingsRules) {
    const dialogRef = this.dialog.open(InvestSettingsRulesFormDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.investSettingsRulesService.updateData(id,result).subscribe({
          next:(value) =>{
        this.LoadDataInvestSettingsRules();            
          },
          error:(err)=>{alert(err)}
        });;
        this.LoadDataInvestSettingsRules();
      }
    });
  }

  addCibilMaster() {
    const dialogRef = this.dialog.open(CibilMasterFormDialogComponent, {
      width: '400px',
      data: {
        "cibilMasterId":  0,
        "category": '', 
        "min": '',
        "max": '',
        "createdDate": new Date(),
        "modifiedDate": new Date()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result) {
        this.cibilMasterService.addData(result).subscribe({
          next:(value) =>{
        this.LoadDataCibilMaster();            
          },
          error:(err)=>{alert(err)}
        });
      }
    });
  }

  addInvestSettingsRules() {
    const dialogRef = this.dialog.open(InvestSettingsRulesFormDialogComponent, {
      width: '400px',
      data: {
        "investSettingsRulesId": 0,
        "ruleName": '',
        "riskType": '',
        "isBaseRule": false,
        "minAge": 0,
        "maxAge": 0,
        "loanAmt": 0,
        "tenureD": 0,
        "tenureM":  0,
        "investAmt":  0,
        "minInvest":  0,
        "allowNoCibil": false,
        "cibilMasterID":  0,
        "maxAllowNoCibil":  0,
        "isAutoInvest": false,
        "autoInvestLimit":  0,
        "tPin":  0,
        "user":  '',
        "pwd":  '',
        "source":  '',
        "escroBal":  0,
        "investLimitBal":  0,
        "alertIfBalLow":  0,
        "createdDatec":  new Date(),
        "modifedDate": new Date()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result) {
        this.investSettingsRulesService.addData(result).subscribe({
          next:(value) =>{
        this.LoadDataInvestSettingsRules();            
          },
          error:(err)=>{alert(err)}
        });
      }
    });
  }

  deleteCibilMaster(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cibilMasterService.deleteData(id).subscribe({
          next:(value) =>{
        this.LoadDataCibilMaster();            
          },
          error:(err)=>{alert(err)}
        });       
      }
    });
  }

  deleteInvestSettingsRules(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.investSettingsRulesService.deleteData(id).subscribe({
          next:(value) =>{
        this.LoadDataInvestSettingsRules();            
          },
          error:(err)=>{alert(err)}
        });       
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSourceCibilMaster.paginator = this.paginatorCibilMaster;
    this.dataSourceCibilMaster.sort = this.sortCibilMaster;
  }

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {    
    this.LoadDataCibilMaster();   
    this.LoadDataInvestSettingsRules();   
  }

  ngOnDestroy(): void {
   
  }
}