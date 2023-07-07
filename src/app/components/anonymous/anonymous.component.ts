import { Component, OnInit } from '@angular/core';
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

  editEmailMode:boolean=false;
  editEmailStyle!:string;

  constructor(private userIdService:UserIDService) 
  { 
   
  }

onEmailCancel()
{
  this.Email = this.tempEmail;
  this.editEmailMode = false;   
  this.editEmailStyle = this.getEditEmailStyle();  
}
onEmailEdit()
{
  this.editEmailMode = true;  
  this.editEmailStyle = this.getEditEmailStyle();
}

onCancel()
{
  this.userName = this.tempUserName;
  this.editMode = false;   
  this.editStyle = this.getEditStyle();
}
onEdit()
{
  this.editMode = true;  
  this.editStyle = this.getEditStyle();
}

getEditStyle()
{
  return 'msger-input'+' '+(this.editMode?'':'input-style');
}
getEditEmailStyle()
{
  return 'msger-input'+' '+(this.editEmailMode?'':'input-style');  
}
LoadUser(user:UserModel)
{
  this.anonymousID = user.AnonymousID;
  this.userName = user.UserName;
  this.Email = user.Email;
  this.editStyle = this.getEditStyle();
  this.editEmailStyle = this.getEditStyle();
  this.tempUserName = user.UserName;
  ATOZQSettings.userid = user.AnonymousID;
  ATOZQSettings.username =user.UserName;
  
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
      this.editMode = false;
      this.editStyle = this.getEditStyle();
      this.editEmailMode = false;
      this.editEmailStyle = this.getEditEmailStyle();
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
      this.tempUserName = this.userName;
      this.tempEmail = this.Email;
      this.editStyle = this.getEditStyle();
      this.editEmailStyle = this.getEditEmailStyle();
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
