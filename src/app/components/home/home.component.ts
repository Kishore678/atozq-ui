import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { CommentModel } from 'src/app/models/comment.model';
import { Product } from 'src/app/models/product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Observable,of } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('blackState', [
      state('true', style({opacity: '0.8', background: 'linear-gradient(to right, #c0ffc0, #ffffff)'})),
      state('false', style({ opacity: '1', background: 'linear-gradient(to right, none, none)'})),
      transition('0 <=> 1', animate('1000ms ease'))
    ]),
    trigger('greenState', [
      state('true', style({opacity: '0.8', background: 'linear-gradient(to right, #c0ffc0, #ffffff)'})),
      state('false', style({ opacity: '1', background: 'linear-gradient(to right, none, none)'})),
      transition('0 <=> 1', animate('1000ms ease'))
    ])
  ]
})
export class HomeComponent implements OnInit {

  blackState:boolean = true;
  greenState: boolean = false;

  CodeCopyToggle(prod:Product) {  
    if(prod.referralCode)
    {
  this.service.products = this.service.products.filter((val,index,arr)=>{    
    val.isCodeCopied = false;
    val.isLinkCopied = false;
     return true;
  });
  prod.isCodeCopied = !prod.isCodeCopied;
   }
  }
  LinkCopyToggle(prod:Product) {
    if(prod.referralLink)
    {
    this.service.products = this.service.products.filter((val,index,arr)=>{    
      val.isCodeCopied = false;
      val.isLinkCopied = false;
       return true;
    });
    prod.isLinkCopied = !prod.isLinkCopied;
    }
    }
  
saved = [];
isWatched:boolean=false;
commentObj = new CommentModel();
isSearch:boolean=false;
isMobile:Boolean=false;

products:Product[]=[];

myPageUrl!:string;
readonly appBaseUrl = window.location.origin;
//Start: My Page
displayMyPageUrl()
{
  this.myPageUrl = this.auth.user().IsLoggedIn?`${this.appBaseUrl}/${this.auth.user().UserName}`:`${this.appBaseUrl}/UserName`;
}

constructor(
  public service:ProductService,
  public dialog: MatDialog,
  private route:ActivatedRoute,
  private router:Router,
  public auth:AuthenticationService) {

 }

@ViewChild('button') button!: ElementRef;

ngOnInit() {  
  this.displayMyPageUrl();
  let rootpath = this.route.snapshot.routeConfig?.path;
  if(rootpath!=undefined && rootpath.startsWith('app/search/:id'))
  {    
    this.service.getProductById(this.route.snapshot.params['id']).subscribe(result=>{
      this.products = [];
      this.service.products = result;
      this.products = this.service.products;
      this.isSearch = true;
    }); 
  }
  else if(this.route.snapshot.params['page'])
  {
    this.service.getProducts(this.route.snapshot.params['page']).subscribe(result=>{
      this.products = [];
      this.service.products = result;
      this.products = this.service.products;
      this.isSearch = false;
    });
  }
  else
  {
  this.service.getProducts("").subscribe(result=>{
    this.products = [];
    this.service.products = result;
    this.products = this.service.products;
    this.isSearch = false;
});
  }

}
share(prod:Product)
{


  let id = prod.id;
  let category = prod.categoryName;
  let titleText = prod.title;

  let mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check;
  };

  let mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
    return check;
  };

  if(mobileCheck()==true || mobileAndTabletCheck()==true)
  {
    this.isMobile = true;
  }

  let loc = window.location;
  let host = loc.hostname;

  let domain = loc.protocol+"//"+(host=="localhost"?host+":"+loc.port:host);  

  let url = 
  (this.isMobile?"whatsapp://send?text=":"https://web.whatsapp.com/send?text=") +titleText+" "+category+" Secured Link: "+domain+"/app/search/";

  
  this.service.share(id).subscribe(result=>{

    this.products = this.products.filter((val,index,arr)=>{

      if(val.productId == result.productId)
      {
        val.isWatch=result.isWatch;
      }
      return true;
    });

 window.open(url+result.id, '_blank');
  });


 // window.open(url, '_blank');
}

reloadData(prd:Product)
{

  return this.products.filter((val,index,arr)=>{

    if(val.productId == prd.productId)
    {
      val.isWatch=prd.isWatch;
    }
    return true;
  });

}

watch(prod:Product):Observable<boolean>
{
  debugger;
  let isWatch = false;

  if(!this.auth.user().IsLoggedIn)
  {
    this.router.navigate(['/account/login']);
  }
  else if(prod.isWatch)
  {    
    //Remove from WatchList
   this.service.removeWatch(prod).subscribe({
      next:(v)=>{
        prod.isWatch = v.isWatch;
        
        this.service.products = this.reloadData(v);

      },
      error:(e)=>{},
      complete:()=>{}
    });   
  }
  else
  {  
    //Add to WatchList
    this.service.addWatch(prod).subscribe({
      next:(v)=>{        
        prod.isWatch=v.isWatch;
        this.service.products = this.reloadData(v);
      },
      error:(e)=>{},
      complete:()=>{}
    });        
  }  


  this.service.products.filter((val,index,arr)=>{
       if(val.productId==prod.productId)
       {
        isWatch = val.isWatch;
       }
  });

  return of(isWatch as boolean);

}

openDialog(rowAction:string,prod:Product) {  

prod.rowAction = rowAction;
prod.isLoggedIn =  this.auth.user().IsLoggedIn;
prod.isAdmin =  this.auth.user().IsAdmin;
  
  if(rowAction=='Comment')
  { 
    this.commentObj = new CommentModel(); 
    this.commentObj.productId = prod.productId;
    this.commentObj.rowAction = rowAction; 
    this.commentObj.avatarUrl = prod.avatarUrl; 
    this.commentObj.title = prod.title; 
    this.commentObj.subTitle = prod.subTitle; 
    this.commentObj.mypage = this.myPageUrl;
    if(localStorage[rowAction+'-'+prod.productId]==undefined)
    {
      if(this.auth.user().IsLoggedIn) 
      {
        this.commentObj.isLoggedIn = true;
        this.commentObj.isAdmin = this.auth.user().IsAdmin;

        if(prod.comment!=null)
        {
          this.commentObj.referralCode = prod.comment.referralCode;
          this.commentObj.referralLink = prod.comment.referralLink;
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
                  data:rowAction=='Comment'?this.commentObj:prod
                });
  
                dialogRef.componentInstance.onDoAction.subscribe((d) => {
                  debugger;
  
                  if(d.data.rowAction == 'View'){
                    // this.addRowData(d);        
                  }else if(d.data.rowAction == 'Share'){
                    // this.updateRowData(d);
                  }else if(d.data.rowAction == 'Comment'){
                    
                    let commentModel = new Product();
                    commentModel.productId = d.data.productId;
                    commentModel.referralCode = d.data.referralCode;
                    commentModel.referralLink = d.data.referralLink;
              
                    this.saveComment(commentModel,d.dialog);
                    dialogRef.componentInstance.isWatch = true;
                  }else if(d.data.rowAction=='Update')
                  {
                    this.updateRowData(d.data.productId,d);
                  }
                  
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
        data:rowAction=='Comment'?this.commentObj:prod
      });
  
      dialogRef.componentInstance.onDoAction.subscribe((d) => {
  
        if(d.data.rowAction == 'View'){
          // this.addRowData(d);        
        }else if(d.data.rowAction == 'Share'){
          // this.updateRowData(d);
        }else if(d.data.rowAction == 'Comment'){
          
          let commentModel = new Product();
          commentModel.productId = d.data.productId;
          commentModel.referralCode = d.data.referralCode;
          commentModel.referralLink = d.data.referralLink;
    
          this.saveComment(commentModel,d.dialog);
        }else if(d.data.rowAction=='Update')
        {
          this.updateRowData(d.data.productId,d);
        }
        
      });
    
      dialogRef.componentInstance.onCloseDialog.subscribe((d) => {
        d.dialog.close();
      }); 

      return dialogRef;
    }

    }
    else if(localStorage[rowAction+'-'+prod.productId]!=undefined)
    {  
    var comment = JSON.parse(localStorage[rowAction+'-'+prod.productId]);
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
      data:rowAction=='Comment'?this.commentObj:prod
    });

    dialogRef.componentInstance.onDoAction.subscribe((d) => {

      if(d.data.rowAction == 'View'){
        // this.addRowData(d);        
      }else if(d.data.rowAction == 'Share'){
        // this.updateRowData(d);
      }else if(d.data.rowAction == 'Comment'){
        
        let commentModel = new Product();
        commentModel.productId = d.data.productId;
        commentModel.referralCode = d.data.referralCode;
        commentModel.referralLink = d.data.referralLink;
  
        this.saveComment(commentModel,d.dialog);
      }else if(d.data.rowAction=='Update')
      {
        this.updateRowData(d.data.itemId,d);
      }
      
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
      data:prod
    });
    dialogRef.componentInstance.onDoShare.subscribe((d) => {  
     this.share(d.data);
    });  
    dialogRef.componentInstance.onDoComment.subscribe((d) => { 
     
      this.service.products.filter((val,index,arr)=>{
        if(val.productId==d.data.productId)
        {
          if(d.data.comment==null)
          {
            d.data.comment = val.comment;
          }
        }
      });

      const dref = this.openDialog("Comment",d.data); 
      dref.afterClosed().subscribe(result => {        
        dialogRef.componentInstance.isWatch = dref.componentInstance.isWatch??dialogRef.componentInstance.isWatch;
        d.data.isWatch = dref.componentInstance.isWatch??dialogRef.componentInstance.isWatch;
        this.service.products = this.reloadData(d.data);

      });
      // this.share(d.data.productId,d.data.category,d.data.title);
     });  
     dialogRef.componentInstance.onDoWatch.subscribe((d) => {  

      if(!this.auth.user().IsLoggedIn)
      {
        this.router.navigate(['/account/login']);
      }
      else if(prod.isWatch)
      {    
        //Remove from WatchList
       this.service.removeWatch(prod).subscribe({
          next:(v)=>{
            prod.isWatch = v.isWatch; 
            d.data.isWatch = dialogRef.componentInstance.isWatch;
            dialogRef.componentInstance.isWatch = v.isWatch;
            this.service.products = this.reloadData(v);    
          },
          error:(e)=>{},
          complete:()=>{}
        });   
      }
      else
      {  
        //Add to WatchList
        this.service.addWatch(prod).subscribe({
          next:(v)=>{        
            prod.isWatch=v.isWatch;
            d.data.isWatch = dialogRef.componentInstance.isWatch;
            dialogRef.componentInstance.isWatch = v.isWatch;
            this.service.products = this.reloadData(v);
          },
          error:(e)=>{},
          complete:()=>{}
        });        
      } 

       
     });  
    dialogRef.componentInstance.onDoAction.subscribe((d) => {

      if(d.data.rowAction == 'View'){
        // this.addRowData(d);        
      }else if(d.data.rowAction == 'Share'){
        // this.updateRowData(d);
      }else if(d.data.rowAction == 'Comment'){
        
        let commentModel = new Product();
        commentModel.productId = d.data.productId;
        commentModel.referralCode = d.data.referralCode;
        commentModel.referralLink = d.data.referralLink;
  
        commentModel =  this.saveComment(commentModel,d.dialog);
      }else if(d.data.rowAction=='Update')
      {
        this.updateRowData(d.data.itemId,d);
      }
      
    });
  
    dialogRef.componentInstance.onCloseDialog.subscribe((d) => {
      d.dialog.close();
    }); 

    return dialogRef;
  
  }    
  
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
  this.service.postComment(model).subscribe(result=>{
  if(result.productId>0)
  {
    localStorage.removeItem('Comment-'+model.productId);  
    let updated = false;
    this.service.products = this.service.products.filter(function(item){  
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
updateRowData(id:number,d:any){
  this.service.saveProduct(d.data).subscribe(res=>{      
    this.service.products.filter(function(item){
       if(item.productId==res.productId)
       {
        item.category=res.category;
        item.title=res.title;
        item.subTitle=res.subTitle;
        item.avatarUrl=res.avatarUrl;
        item.imageUrl=res.imageUrl;
        item.headLine=res.headLine;
        item.referralCode=res.referralCode;
        item.referralLink=res.referralLink;
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

}
