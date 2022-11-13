import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { CardModel } from 'src/app/models/card.model';
import { CommentModel } from 'src/app/models/comment.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

saved = [];
isWatched:boolean=false;
commentObj = new CardModel();
isSearch:boolean=false;
isMobile:Boolean=false;

constructor(
  public service:ProductService,
  public dialog: MatDialog,
  private route:ActivatedRoute,
  private router:Router,
  public auth:AuthenticationService) {

 }

@ViewChild('button') button!: ElementRef;

ngOnInit() { 
  if(this.route.snapshot.params['id'])
  {
    this.service.getProductById(this.route.snapshot.params['id']).subscribe(result=>{
      this.service.products = [];
      this.service.products.push(result);
      this.isSearch = true;
    });
  }
  else
  {
    this.service.getCards().subscribe(result=>{    
  this.service.cards = result; 
});
  }

}
share(id:number,category:string,titleText:string)
{


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

  window.open(
    (this.isMobile?"whatsapp://send?text=":"https://web.whatsapp.com/send?text=") +titleText+" "+category+" Secured Link: "+domain+"/product/"+id,
    '_blank' 
);
}



watch(card:CardModel)//,event:Event)
{
  if(!this.auth.user().IsLoggedIn)
  {
    this.router.navigate(['/login']);
  }

  // let target = event.target as HTMLElement;

  // let matbutton!:HTMLElement;
  // let maticon!:HTMLElement;

  // if(target.tagName == 'BUTTON')
  // {
  //   matbutton = target as HTMLElement;
  //   maticon = target.childNodes[0].firstChild as HTMLElement;
  // }
  // if(target.tagName == 'MAT-ICON')
  // {
  //   maticon = target as HTMLElement;
  //   matbutton = target.offsetParent as HTMLElement;
  // }
  // if(target.tagName == 'SPAN')
  // {
  //   maticon = target.offsetParent?.childNodes[0].firstChild as HTMLElement;
  //   matbutton = target.offsetParent as HTMLElement;
  // }  
  
  if(card.isWatch)
  {    
    //Remove from WatchList
    this.service.removeWatch(card).subscribe({
      next:(v)=>{
         card.isWatch = false;
        // if(matbutton.classList.contains('bred') || maticon.classList.contains('bred'))
        // {
        //   matbutton.classList.remove('bred');
        //   matbutton.classList.add('bgreen');
    
        //   maticon.classList.remove('bred');
        //   maticon.classList.add('bgreen');
        // }
      },
      error:(e)=>{},
      complete:()=>{}
    });   
  }
  else
  {  
    //Add to WatchList
    this.service.addWatch(card).subscribe({
      next:(v)=>{        
        card.isWatch = true;
    // if(matbutton.classList.contains('bgreen') || maticon.classList.contains('bgreen'))
    // {
    //   matbutton.classList.remove('bgreen');
    //   matbutton.classList.add('bred');

    //   maticon.classList.remove('bgreen');
    //   maticon.classList.add('bred');
    // }
      },
      error:(e)=>{},
      complete:()=>{}
    });        
  }     
}

openDialog(rowAction:string,card:CardModel) {  
debugger;
  card.item.rowAction = rowAction;
  
  if(rowAction=='Comment')
  { 
    this.commentObj = new CardModel(); 
    this.commentObj.item.itemId = card.item.itemId;
    this.commentObj.item.rowAction = rowAction; 
    this.commentObj.item.avatarUrl = card.item.avatarUrl; 
    this.commentObj.item.titleText = card.item.titleText; 
    this.commentObj.item.subTitle = card.item.subTitle; 
    if(localStorage[rowAction+'-'+card.item.itemId]==undefined)
    {
      if(this.auth.user().IsLoggedIn) 
      {
        this.service.getCommentByItemId(this.commentObj.item.itemId).subscribe(
          {
            next: (v) => {
             
                 this.commentObj.item.referralCode = v.referralCode;
                 this.commentObj.item.referralLink = v.referralLink;
  
                 const dialogRef = this.dialog.open(DialogBoxComponent, {
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  height: 'relative',
                  width: 'relative',
                  panelClass: 'full-screen-modal',
                  disableClose: true,
                  autoFocus: true,
                  data:rowAction=='Comment'?this.commentObj:card
                });
  
                dialogRef.componentInstance.onDoAction.subscribe((d) => {
  
                  if(d.data.rowAction == 'View'){
                    // this.addRowData(d);        
                  }else if(d.data.rowAction == 'Share'){
                    // this.updateRowData(d);
                  }else if(d.data.rowAction == 'Comment'){
                    
                    let commentModel = new CommentModel();
                    commentModel.itemId = d.data.itemId;
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
              
            },
            error: (e) => console.error(e),
            complete: () => {} 
        });

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
        data:rowAction=='Comment'?this.commentObj:card
      });
  
      dialogRef.componentInstance.onDoAction.subscribe((d) => {
  
        if(d.data.rowAction == 'View'){
          // this.addRowData(d);        
        }else if(d.data.rowAction == 'Share'){
          // this.updateRowData(d);
        }else if(d.data.rowAction == 'Comment'){
          
          let commentModel = new CommentModel();
          commentModel.itemId = d.data.itemId;
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
    }

    }
    else if(localStorage[rowAction+'-'+card.item.itemId]!=undefined)
    {  
    var comment = JSON.parse(localStorage[rowAction+'-'+card.item.itemId]);
    this.commentObj.item.referralCode = comment.referralCode;
    this.commentObj.item.referralLink = comment.referralLink;

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: 'relative',
      width: 'relative',
      panelClass: 'full-screen-modal',
      disableClose: true,
      autoFocus: true,
      data:rowAction=='Comment'?this.commentObj:card
    });

    dialogRef.componentInstance.onDoAction.subscribe((d) => {

      if(d.data.rowAction == 'View'){
        // this.addRowData(d);        
      }else if(d.data.rowAction == 'Share'){
        // this.updateRowData(d);
      }else if(d.data.rowAction == 'Comment'){
        
        let commentModel = new CommentModel();
        commentModel.itemId = d.data.itemId;
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
    
    }
    else if(this.auth.user().IsLoggedIn) 
    {
      this.service.getCommentByItemId(this.commentObj.item.itemId).subscribe(
        {
          next: (v) => {
           
               this.commentObj.item.referralCode = v?.referralCode;
               this.commentObj.item.referralLink = v?.referralLink;

               const dialogRef = this.dialog.open(DialogBoxComponent, {
                maxWidth: '100vw',
                maxHeight: '100vh',
                height: 'relative',
                width: 'relative',
                panelClass: 'full-screen-modal',
                disableClose: true,
                autoFocus: true,
                data:rowAction=='Comment'?this.commentObj:card
              });

              dialogRef.componentInstance.onDoAction.subscribe((d) => {

                if(d.data.rowAction == 'View'){
                  // this.addRowData(d);        
                }else if(d.data.rowAction == 'Share'){
                  // this.updateRowData(d);
                }else if(d.data.rowAction == 'Comment'){
                  
                  let commentModel = new CommentModel();
                  commentModel.itemId = d.data.itemId;
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
            
          },
          error: (e) => console.error(e),
          complete: () => {} 
      });       
   
    }  
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
      data:card
    });

    dialogRef.componentInstance.onDoAction.subscribe((d) => {

      if(d.data.rowAction == 'View'){
        // this.addRowData(d);        
      }else if(d.data.rowAction == 'Share'){
        // this.updateRowData(d);
      }else if(d.data.rowAction == 'Comment'){
        
        let commentModel = new CommentModel();
        commentModel.itemId = d.data.itemId;
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
  
  }


     
  
}

saveComment(model:CommentModel,dialog:any)
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
  if(result.commentId>0)
  {
    localStorage.removeItem('Comment-'+model.itemId);  
    dialog.close();
   alert('Successfully posted your comment.');
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
  localStorage['Comment-'+model.itemId]=JSON.stringify(model);
  dialog.close();
  this.auth.redirectUrl = '/product/'+model.itemId;  
  this.router.navigate(['/login']);  
 }

}
updateRowData(id:number,d:any){
  debugger;
  this.service.putProduct(id,d.data).subscribe(res=>{      
    this.service.cards.filter(function(item){
       if(item.item.itemId==res.itemId)
       {
        item.item.category=res.category;
        item.item.titleText=res.titleText;
        item.item.subTitle=res.subTitle;
        item.item.avatarUrl=res.avatarUrl;
        item.item.itemImageUrl=res.itemImageUrl;
        item.item.itemHeadLine=res.itemHeadLine;
        item.item.referralCode=res.referralCode;
        item.item.referralLink=res.referralLink;
        item.item.itemDescription=res.itemDescription;
        item.item.useButton=res.useButton;
        item.item.shareButton=res.shareButton;
        item.item.commentButton=res.commentButton;
        item.item.rowAction=res.rowAction;
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
