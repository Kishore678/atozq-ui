import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = 
  ['itemId', 'category', 'titleText', 
  'subTitle','rowAction'];   

  list: Item[]=[];  
  constructor(public service: ItemService,public dialog: MatDialog) { }
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  ngOnInit(): void {    
    this.service.refreshList();
    
  }

  openDialog(rowAction:string,obj:any) {
    obj.rowAction = rowAction;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: 'relative',
      width: 'relative',
      panelClass: 'full-screen-modal',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj:Item){
   
    this.service.list.push({
      itemId:0,
      category:'',
      titleText:'',
      subTitle:'',
      avatarUrl:'',
      itemImageUrl:'',
      itemHeadLine:'',
      itemDescription:'',
      useButton:'',
      shareButton:'',
      commentButton:0,
      rowAction:''
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj:Item){
    this.service.list = this.service.list.filter((value,key)=>{
      if(value.itemId == row_obj.itemId){
        value.category = row_obj.category;
        value.titleText = row_obj.titleText;
        value.subTitle = row_obj.subTitle;
        value.avatarUrl = row_obj.avatarUrl;
        value.itemImageUrl = row_obj.itemImageUrl;
        value.itemHeadLine = row_obj.itemHeadLine;
        value.itemDescription = row_obj.itemDescription;
        value.useButton = row_obj.useButton;        
        value.shareButton = row_obj.shareButton;
        value.commentButton = row_obj.commentButton;  
      }
      return true;
    });
  }
  deleteRowData(row_obj:Item){
    this.service.list = this.service.list.filter((value,key)=>{
      return value.itemId != row_obj.itemId;
    });
  }

  populateForm(selectedRecord: Item) {
    this.service.itemData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.deleteToDoItem(id);
    }
  }

}

