import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { ItemModel } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['itemId', 'category', 'titleText','rowAction'];   

  deleted: ItemModel[]=[]; 
  itemData=new ItemModel(); 
 
  constructor(public changeDetectorRef:ChangeDetectorRef,public service: ItemService,public dialog: MatDialog) { }

  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  ngOnInit(): void {    
    this.refresh();
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();    
   }

  refresh()
  {
    this.service.getItems("").subscribe(res=>{
      this.service.list = res;
    });  
  }
getUser()
{
  return localStorage.getItem('user');
}
  openDialog(rowAction:string,obj:any) {
    obj.rowAction = rowAction;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: 'relative',
      width: 'relative',
      panelClass: 'full-screen-modal',
      disableClose: true,
      autoFocus: true,
      data:obj
    });

    dialogRef.componentInstance.onDoAction.subscribe((d) => {

      if(d.data.rowAction == 'Add'){
        this.addRowData(d);        
      }else if(d.data.rowAction == 'Update'){
        this.updateRowData(d);
      }else if(d.data.rowAction == 'Delete'){
        this.deleteRowData(d);
      }
    });

    dialogRef.componentInstance.onCloseDialog.subscribe((d) => {
      d.dialog.close();
    });    
    
  }

  addRowData(d:any){      
    this.service.postItem(d.data).subscribe(
      res=>{
        if(res.itemId>0)
        {      
         this.service.list.push(res); 
        d.dialog.close();      
        }
        this.service.list = this.service.list.filter((item,key)=>{          
          return true;
        });
     
      },
      error=>{ 
        let er='';  
        Object.values(error.error.errors).forEach(function(errs:any){ 
          Object.values(errs).forEach(function(msg:any){          
           er+=msg+'\n';
            });                 
        });
        window.alert(er);
      } 
     );  
   
  }

  updateRowData(d:any){
      this.service.putItem(d.data).subscribe(res=>{      
        this.service.list.filter(function(item){
           if(item.itemId==res.itemId)
           {
            item.category=res.category;
            item.titleText=res.titleText;
            item.subTitle=res.subTitle;
            item.avatarUrl=res.avatarUrl;
            item.itemImageUrl=res.itemImageUrl;
            item.itemHeadLine=res.itemHeadLine;
            item.itemDescription=res.itemDescription;
            item.useButton=res.useButton;
            item.shareButton=res.shareButton;
            item.commentButton=res.commentButton;
            item.rowAction=res.rowAction;
            d.dialog.close();               
           }
           return true; 
        });
       
      },
      error=>{ 
        let er='';  
        Object.values(error.error.errors).forEach(function(errs:any){ 
          Object.values(errs).forEach(function(msg:any){          
           er+=msg+'\n';
            });                 
        });
        window.alert(er);
      } 
      
      );   
  }

  deleteRowData(d:any){
 
    this.service.deleteItem(d.data.itemId).subscribe(res=>{ 
      this.service.list = this.service.list.filter((item,key)=>{     
        if(item.itemId==d.data.itemId && res==true)
        { 
          this.service.list.splice(key,1);       
          d.dialog.close();
        }
        return this.service.list.indexOf(item)!=-1; 
      });  
     
    },
    error=>{ 
      let er='';  
      Object.values(error.error.errors).forEach(function(errs:any){ 
        Object.values(errs).forEach(function(msg:any){          
         er+=msg+'\n';
          });                 
      });
      window.alert(er);
    });
  }

  populateForm(selectedRecord: ItemModel) {
    this.itemData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.deleteItem(id).subscribe(res=>{

      });
    }
  }

}

