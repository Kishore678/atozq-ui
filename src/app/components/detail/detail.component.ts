import { Component, OnInit, VERSION } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { CommentModel } from 'src/app/models/comment.model';
import { Detail } from 'src/app/models/detail.model';
import { Product } from 'src/app/models/product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { ProductService } from 'src/app/services/product.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  details:Detail=new Detail(); 
  
  prods:Product[]=[];
  prod:Product = new Product();

  commentObj = new CommentModel();

  constructor(public dialog: MatDialog,public auth:AuthenticationService,public navigation:NavigationService,private service:ShareService,  private route:ActivatedRoute,private router:Router,private prodSer:ProductService) { }

  back(): void {
    this.navigation.back()
  }

  myPageUrl!:string;
readonly appBaseUrl = window.location.origin;
//Start: My Page
displayMyPageUrl()
{
  this.myPageUrl = this.auth.user().IsLoggedIn?`${this.appBaseUrl}/${this.auth.user().UserName}`:`${this.appBaseUrl}/UserName`;
}
LoadDetailsById(id:number)
{
 this.prodSer.getProductById(id).subscribe(res=>{
  debugger;
  let d = res[0];
  this.details.prod.id=d.id;
  this.details.prod.title=d.title;
  this.details.prod.categoryName=d.categoryName;
  this.details.prod.avatarUrl = d.avatarUrl;   
  this.details.prod.imageUrl = d.imageUrl;
  this.details.productImages = [d.imageUrl,d.imageUrl];//need to add db multiple prod images
  // this.details.shareUrl='';
  // this.details.backUrl='..';

  this.details.createHeader=d.title;
  this.details.createBody=d.description;

  this.details. useHeader=d.title;
  this.details.useBody=d.description;//need to add db useBody description

  this.details.refHeader=d.title;
  this.details.refBody=d.description;//need to add db refBody description

  this.details.earnHeader=d.title;
  this.details.earnBody=d.description;//need to add db earnBody description
  
  this.prod.productId=d.productId;
  this.prod.isWatch=d.isWatch;
  this.prod.comment = new CommentModel();
  this.prod.comment.referralCode=d.referralCode;
  this.prod.comment.referralLink=d.referralLink;

  //Start: Need to implement related prod logic currently dummy
  let prod1 = new Product();
  let prod2 = new Product();
  prod1.avatarUrl = d.avatarUrl;
  prod2.avatarUrl = d.avatarUrl;
  this.prods.push(prod1);
  this.prods.push(prod2);
  this.details.prodRelated = this.prods;
 //End: Need to implement related prod logic currently dummy

  // this.details.homeUrl='/';
  
 });
}
  ngOnInit() {   
    this.displayMyPageUrl();
    this.LoadDetailsById(this.route.snapshot.params['id']);
  }  
  share()
  {
    this.service.share(this.details.prod);
  }
  openDialog(rowAction:string) {    
    debugger;
    this.prod.rowAction = rowAction;
    this.prod.isLoggedIn =  this.auth.user().IsLoggedIn;
    this.prod.isAdmin =  this.auth.user().IsAdmin;
      
      if(rowAction=='Comment')
      { 
        this.commentObj = new CommentModel(); 
        this.commentObj.productId = this.prod.productId;
        this.commentObj.rowAction = rowAction; 
        this.commentObj.avatarUrl = this.prod.avatarUrl; 
        this.commentObj.title = this.prod.title; 
        this.commentObj.subTitle = this.prod.subTitle; 
        this.commentObj.mypage = this.myPageUrl;
        if(localStorage[rowAction+'-'+this.prod.productId]==undefined)
        {
          if(this.auth.user().IsLoggedIn) 
          {
            this.commentObj.isLoggedIn = true;
            this.commentObj.isAdmin = this.auth.user().IsAdmin;
    
            if(this.prod.comment!=null)
            {
              this.commentObj.referralCode = this.prod.comment.referralCode;
              this.commentObj.referralLink = this.prod.comment.referralLink;
            }
            else
            {
              this.commentObj.referralCode = '';
              this.commentObj.referralLink = '';
            }
                     const dialogRef = this.dialog.open(DialogBoxComponent, {
                      maxWidth: '100vw',
                      maxHeight: '100vh',
                      height: 'relative',
                      width: 'relative',
                      panelClass: 'full-screen-modal',
                      disableClose: true,
                      autoFocus: true,
                      data:rowAction=='Comment'?this.commentObj:this.prod
                    });
      
                    dialogRef.componentInstance.onDoAction.subscribe((d) => {      
                     debugger;
                        let commentModel = new Product();
                        commentModel.productId = d.data.productId;
                        commentModel.referralCode = d.data.referralCode;
                        commentModel.referralLink = d.data.referralLink;
                  
                        this.saveComment(commentModel,d.dialog);
                        dialogRef.componentInstance.isWatch = true;
                      
                      
                    });             
                    
                  
                    dialogRef.componentInstance.onCloseDialog.subscribe((d) => {
                      d.dialog.close();
                    });  
                    
                    return dialogRef;
    
          }
          else{
          const dialogRef = this.dialog.open(DialogBoxComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: 'relative',
            width: 'relative',
            panelClass: 'full-screen-modal',
            disableClose: true,
            autoFocus: true,
            data:rowAction=='Comment'?this.commentObj:this.prod
          });
      
          dialogRef.componentInstance.onDoAction.subscribe((d) => {      
           
              let commentModel = new Product();
              commentModel.productId = d.data.productId;
              commentModel.referralCode = d.data.referralCode;
              commentModel.referralLink = d.data.referralLink;        
              this.saveComment(commentModel,d.dialog);
            
            
          });
        
          dialogRef.componentInstance.onCloseDialog.subscribe((d) => {
            d.dialog.close();
          }); 
    
          return dialogRef;
        }
    
        }
        else if(localStorage[rowAction+'-'+this.prod.productId]!=undefined)
        {  
        var comment = JSON.parse(localStorage[rowAction+'-'+this.prod.productId]);
        this.commentObj.referralCode = comment.referralCode;
        this.commentObj.referralLink = comment.referralLink;
    
        const dialogRef = this.dialog.open(DialogBoxComponent, {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: 'relative',
          width: 'relative',
          panelClass: 'full-screen-modal',
          disableClose: true,
          autoFocus: true,
          data:rowAction=='Comment'?this.commentObj:this.prod
        });
    
        dialogRef.componentInstance.onDoAction.subscribe((d) => {
    
      
            
            let commentModel = new Product();
            commentModel.productId = d.data.productId;
            commentModel.referralCode = d.data.referralCode;
            commentModel.referralLink = d.data.referralLink;
      
            this.saveComment(commentModel,d.dialog);
         
          
        });
      
        
      
        dialogRef.componentInstance.onCloseDialog.subscribe((d) => {
          d.dialog.close();
        }); 
        return dialogRef;
        } 
    
        return this.dialog.open(DialogBoxComponent, {});
      }
      else
      {
        const dialogRef = this.dialog.open(DialogBoxComponent, {
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: 'relative',
          width: 'relative',
          panelClass: 'full-screen-modal',
          disableClose: true,
          autoFocus: true,
          data:this.prod
        });
  
        dialogRef.componentInstance.onDoComment.subscribe((d) => { 
         
          this.prodSer.products.filter((val,index,arr)=>{
            if(val.productId==d.data.productId)
            {
              if(d.data.comment==null)
              {
                d.data.comment = val.comment;
              }
            }
          });
    
          const dref = this.openDialog("Comment"); 
          dref.afterClosed().subscribe(result => {        
            dialogRef.componentInstance.isWatch = dref.componentInstance.isWatch??dialogRef.componentInstance.isWatch;
            d.data.isWatch = dref.componentInstance.isWatch??dialogRef.componentInstance.isWatch;
            // this.service.products = this.reloadData(d.data);
    
          });
          // this.share(d.data.productId,d.data.category,d.data.title);
         });   
        dialogRef.componentInstance.onDoAction.subscribe((d) => {
    
         if(d.data.rowAction=='Update')
          {
            this.updateRowData(d);
          }
          
        });
      
        dialogRef.componentInstance.onCloseDialog.subscribe((d) => {
          d.dialog.close();
        }); 
    
        return dialogRef;
      
      } 

  }

  updateRowData(d:any){
    debugger;
      this.prodSer.saveProduct(d.data).subscribe(res=>{      
        this.prodSer.products.filter(function(item){
           if(item.productId==res.productId)
           {
            item.category=res.category;
            item.title=res.title;
            item.subTitle=res.subTitle;
            item.avatarUrl=res.avatarUrl;
            item.imageUrl=res.imageUrl;
            item.headLine=res.headLine;
            item.description=res.description;
     
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
  watch()
  {  

    let isWatch = false;
  
    if(!this.auth.user().IsLoggedIn)
    {
      this.router.navigate(['/account/login']);
    }
    else if(this.prod.isWatch)
    {    
      //Remove from WatchList
     this.prodSer.removeWatch(this.prod).subscribe({
        next:(v)=>{
          this.prod.isWatch = v.isWatch;
          
          // this.service.products = this.reloadData(v);
  
        },
        error:(e)=>{},
        complete:()=>{}
      });   
    }
    else
    {  
      //Add to WatchList
      this.prodSer.addWatch(this.prod).subscribe({
        next:(v)=>{        
          this.prod.isWatch=v.isWatch;
          // this.service.products = this.reloadData(v);
        },
        error:(e)=>{},
        complete:()=>{}
      });        
    }  
  
  
    this.prodSer.products.filter((val,index,arr)=>{
         if(val.productId==this.prod.productId)
         {
          isWatch = val.isWatch;
         }
    });
  
    return of(isWatch as boolean);
  
  }

  saveComment(model:Product,dialog:any)
{ debugger;
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
  this.prodSer.postComment(model).subscribe(result=>{
  if(result.productId>0)
  {
    localStorage.removeItem('Comment-'+model.productId);  
    let updated = false;
    this.prodSer.products.filter(function(item){  
      if(item.productId==result.productId && result.comment!=null)
      {    
        if(item.comment==null)
        {
        item.comment = result.comment;
        }
       item.comment.referralCode = result.comment.referralCode;
       item.comment.referralLink = result.comment.referralLink;
       item.isWatch = true;
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

}

