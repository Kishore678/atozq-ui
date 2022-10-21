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
  'subTitle','action'];
  
  // ,'avatarUrl','itemImageUrl',
  // 'itemHeadLine','itemDescription',
  // 'downloadButton','viewButton','comments'];

  
  readonly baseURL = "https://api.atozq.com/api/ToDoItem";
  list: Item[]=[];  
  constructor(public service: ItemService,public dialog: MatDialog) { }
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  ngOnInit(): void {    
    this.service.refreshList();
    
  }

  openDialog(action:string,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
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
      Category:'',
      TitleText:'',
      SubTitle:'',
      AvatarUrl:'',
      ItemImageUrl:'',
      ItemHeadLine:'',
      ItemDescription:'',
      DownloadButton:'',
      ViewButton:'',
      Comments:0,
      action:''
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj:Item){
    this.service.list = this.service.list.filter((value,key)=>{
      if(value.itemId == row_obj.itemId){
        value.Category = row_obj.Category;
        value.TitleText = row_obj.TitleText;
        value.SubTitle = row_obj.SubTitle;
        value.AvatarUrl = row_obj.AvatarUrl;
        value.ItemImageUrl = row_obj.ItemImageUrl;
        value.ItemHeadLine = row_obj.ItemHeadLine;
        value.ItemDescription = row_obj.ItemDescription;
        value.DownloadButton = row_obj.DownloadButton;
        value.ItemDescription = row_obj.ItemDescription;
        value.ViewButton = row_obj.ViewButton;
        value.Comments = row_obj.Comments;
  
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

