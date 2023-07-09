import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { UserModel } from 'src/app/models/user.model';
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
