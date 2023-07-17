import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { UserModel } from 'src/app/models/user.model';
import { WatchModel } from 'src/app/models/watch.model';
import { UserIDService } from 'src/app/services/user-id.service';
import { ATOZQSettings } from 'src/constants/ATOZQSettings';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.css']
})
export class AnonymousComponent implements OnInit {
  anonymousID!:string;
  userName!:string;
  tempUserName!:string;
  tempEmail!:string;
  Email!:string;
  avatar!:string;
  editMode:boolean=false;
  editStyle!:string;
  user!:UserModel;

  editEmailMode:boolean=false;
  editEmailStyle!:string;
  deviceInfo!:DeviceInfo;
  device!:string;
  browser!:string;
  watchList!:WatchModel[];

  constructor(private titlecasePipe:TitleCasePipe,private userIdService:UserIDService,private deviceDetectorService: DeviceDetectorService) 
  { 
    this.deviceInfo = deviceDetectorService.getDeviceInfo(); 
    this.device = this.titlecasePipe.transform(this.deviceInfo.deviceType);
    this.browser = this.titlecasePipe.transform(this.deviceInfo.browser)+' on '+this.titlecasePipe.transform(this.deviceInfo.os);
  }

onEmailCancel()
{
  this.Email = this.tempEmail;
  this.editEmailMode = false; 
  
}
onEmailEdit()
{
  this.editEmailMode = true;   
}

onCancel()
{
  this.userName = this.tempUserName;
  this.editMode = false;     

}
onEdit()
{
  this.editMode = true;  

}


LoadUser(user:UserModel)
{
  this.user = user;
}
onSave()
{
  let model = new UserModel();
  model.AnonymousID = this.anonymousID;
  model.UserName = this.userName;
  model.Email = this.Email;
  this.userIdService.UpdateUser(model).subscribe({
    next:(event)=>{      
      this.LoadUser(event); 
      if(this.user.Status)
      { 
        
        this.anonymousID = this.user.AnonymousID;
        this.userName = this.user.UserName;
        this.Email = this.user.Email; 
        this.tempUserName = this.user.UserName;
        ATOZQSettings.userid = this.user.AnonymousID;
        ATOZQSettings.username =this.user.UserName;

      this.editMode = false;

      this.editEmailMode = false;
     
      }
      else
      {
        alert(this.user.ErrorMessage);
      }
    },
    error:(err)=>{
      alert('Something went wrong. Try again (or) Click on Ask to raise an issue.');    
      console.log(err);
    }

  });
  
}
LoadWatch(wList:WatchModel[])
{
  this.watchList=wList;
}
DeleteWatchListItem(w:WatchModel)
{
  let yes = confirm('Are you sure want to delete '+w.Nme+'?');
  if(yes)
  {
    this.userIdService.AddorRemoveWatch(w).subscribe({
      next:(event)=>{
        if(event.IsWatch==false)
        {
          this.watchList = this.watchList.filter((value,index,arr)=>{
            return value.Code!=w?.Code;
          });
          alert(w.Nme.trim()+' removed from My Account --> Watch List.')
        }
      },
      error:(err)=>{console.log(err);alert('Something went wrong. Please try again.')}
    });
  }
}
LoadData(m:UserModel)
{
      this.anonymousID = m.AnonymousID;
      this.userName = m.UserName??m.AnonymousID;
      this.Email = m.Email;
      this.avatar = 'https://img.freepik.com/free-icon/user_318-159711.jpg';
      ATOZQSettings.userid = m.AnonymousID;
      ATOZQSettings.username =this.userName;
      this.tempUserName = m.UserName??m.AnonymousID;
      this.tempEmail = this.Email; 
      
      this.userIdService.GetWatchList(m.AnonymousID).subscribe({
        next:(event)=>{          
          this.LoadWatch(event);
        },
        error:(err)=>{console.log(err);}
      });
}
  ngOnInit(): void {
    this.userIdService.getUserId().then((userId)=>{
      this.userIdService.GetUser(userId).subscribe({
        next:(event)=>{
          this.LoadData(event);
        },
        error:(err)=>{
      alert('Something went wrong. Try again (or) Click on Ask to raise an issue.');   
          console.log(err);
        }
      });      
    });
    
  }

}
