import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { CommentModel } from 'src/app/models/comment.model';
import { ItemModel } from 'src/app/models/item.model';
import { Product } from 'src/app/models/product.model';
import { UserInfo } from 'src/app/models/userinfo.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  myPageGridColumns:string[] = ['category', 'title','rowAction'];  

  addCtrl:boolean=false;

  readonly appBaseUrl = window.location.origin;

  // displayedColumns: string[] = ['itemId', 'category', 'titleText','subTitle','rowAction'];  
  


  deleted: ItemModel[]=[]; 
  itemData=new ItemModel(); 
 
  constructor( private router:Router,public changeDetectorRef:ChangeDetectorRef,public prodService: ProductService,public dialog: MatDialog,public auth:AuthenticationService) 
  {}

  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  ngOnInit(): void { 
    this.prodService.products = [];
    this.displayMyPageUrl(); 
    if(this.auth.user().IsLoggedIn)
    {
      if(this.auth.user().IsAdmin)
      {
        this.addCtrl = true;
      }
      this.prodService.getProducts(this.auth.user().UserName).subscribe(result=>{        
        this.prodService.products = result;        
      });
    
    }
  }

  ngAfterContentChecked(): void {
    this.changeDetectorRef.detectChanges();    
   }

  refresh()
  {
    this.prodService.getProductsByCategory("all").subscribe(res=>{
      // this.prodService.products = res;
    });  

    this.prodService.getImages().subscribe({
      next:(v)=>{
        this.prodService.images = v;
      },
      error:(e)=>{},
      complete:()=>{}
    });
  }

  openDialog(rowAction:string,obj:any) {
    debugger;
    obj.rowAction = rowAction=='Update'&& !this.auth.user().IsAdmin?'Comment':rowAction;
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
debugger;
      if(d.data.rowAction == 'Add'){
        this.addRowData(d);        
      }else if(d.data.rowAction == 'Update'){
        this.updateRowData(d);
      }else if(d.data.rowAction == 'Delete'){
        this.deleteRowData(d);
      }
      else if(d.data.rowAction=='Add Media')
      {
        this.addMedia(d)
      }
      else if(d.data.rowAction=='Update Media')
      {
        this.updateMedia(d);
      }
      else if(d.data.rowAction == 'Comment'){
        debugger;
        let commentModel = new Product();
        commentModel.productId = d.data.productId;
        commentModel.referralCode = d.data.referralCode;
        commentModel.referralLink = d.data.referralLink;
        this.saveComment(commentModel,d.dialog);        
      }
    });

    dialogRef.componentInstance.onCloseDialog.subscribe((d) => {
      d.dialog.close();
    });    
    
  }

saveComment(model:Product,dialog:any)
{
  if(model.referralCode=="" && model.referralLink=="")
  {
  alert('Atleast one (Referral Code or Link) should be required');  
  }
 else if(this.auth.user().IsLoggedIn)
 {  
  if(model.referralCode=="" && model.referralLink=="")
  {
  alert('Atleast one (Referral Code or Link) should be required');
  }
  else 
  { 
  this.prodService.postComment(model).subscribe(result=>{   
  if(result.productId>0)
  {
    localStorage.removeItem('Comment-'+model.productId);  
    let updated = false;
    this.prodService.products = this.prodService.products.filter(function(item){  
      if(item.productId==result.productId)
      {       
        item.category=result.category;
        item.avatarUrl=result.avatarUrl;
        item.title=result.title;
        item.subTitle=result.subTitle;
        item.imageUrl=result.imageUrl;
        item.headLine=result.headLine;
       item.referralCode=result.referralCode; 
       item.referralLink=result.referralLink; 
       item.description=result.description;
       item.isWatch=result.isWatch;
       updated = true;
      }
      return true; 
   });

   if(updated)
   {
    dialog.close(); 
    alert('Successfully posted your comment.');
   } 
 
  }
  else
  {
    alert('Something went wrong. Try again later.');
  }
  });  
  }
 }
 else
 {  
  localStorage['Comment-'+model.productId]=JSON.stringify(model);
  dialog.close();
  this.auth.redirectUrl = '/app/search/'+model.productId;  
  this.router.navigate(['/account/login']);  
 }
return model;
}

  addMedia(d:any){
    
  }
  updateMedia(d:any){}

  addRowData(d:any){      
    this.prodService.postProduct(d.data).subscribe(
      res=>{
        if(res.itemId>0)
        {      
        //  this.prodService.products.push(res); 
        d.dialog.close();      
        }
        this.prodService.products = this.prodService.products.filter((item,key)=>{          
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
      this.prodService.putProduct(d.data.itemId,d.data).subscribe(res=>{      
        this.prodService.products.filter(function(item){
           if(item.productId==res.itemId)
           {
            item.category=res.category;
            item.title=res.titleText;
            item.subTitle=res.subTitle;
            item.avatarUrl=res.avatarUrl;
            item.imageUrl=res.itemImageUrl;
            item.headLine=res.itemHeadLine;
            item.description=res.itemDescription;
     
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
    
    this.prodService.deleteProduct(d.data.productId).subscribe(res=>{ 
      let deleteId=-1;
      this.prodService.products = this.prodService.products.filter((item,key)=>{  
        debugger; 
         
        if(item.productId==d.data.productId && res==true)
        { 
          debugger;
          // this.prodService.products.splice(key,1);
          deleteId = key;       
        }
        return this.prodService.products.indexOf(item)!=-1; 
      });  
      if(deleteId>=0)
      {
      this.prodService.products.splice(deleteId,1);
      d.dialog.close();
      }
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

myPageUrl!:string;
//Start: My Page
displayMyPageUrl()
{
  this.myPageUrl = `${this.appBaseUrl}/${this.auth.user().UserName}`;
}

saveMyPage()
{

}

deleteMyPage()
{

}

loadMyPage()
{

}
//End: My Page

}

