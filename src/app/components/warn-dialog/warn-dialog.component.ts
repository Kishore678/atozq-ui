import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScriptWarnModel } from 'src/app/models/script-wrn.model';
import { environment } from 'src/environments/environment';
const apiBaseUrl = environment.apiBaseUrl;
@Component({
  selector: 'app-warn-dialog',
  templateUrl: './warn-dialog.component.html',
  styleUrls: ['./warn-dialog.component.css']
})
export class WarnDialogComponent implements OnInit {


  id!:number;

  warning!:string;
  tempWarning!:string;
 
  avatar!:string;
  editMode:boolean=false;
  editStyle!:string;

  constructor(private http:HttpClient,public dialogRef: MatDialogRef<WarnDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: ScriptWarnModel) { 
    this.id = data.AnalyticsId;
    this.warning = data.Warning;
    this.tempWarning = data.Warning;
    this.editStyle = this.getEditStyle();
    this.avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-0btyJEyhrCZZYaYgqn3zALqNNFotzQiPVKDi7wkQHA&s';
  }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  onDoAction = new EventEmitter();

  onCloseDialog = new EventEmitter();


  doAction(){
    this.onDoAction.emit({dialog:this.dialogRef,data:{}});   
  }


  closeDialog(){
    this.onCloseDialog.emit({dialog:this.dialogRef});
    document.body.style.overflow = 'scroll';
  } 

  onCancel()
{
  this.warning = this.tempWarning;
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

Load(m:ScriptWarnModel)
{
  this.id = m.AnalyticsId;
  this.warning = m.Warning;
  this.tempWarning = m.Warning;
}
onSave()
{
  let model = new ScriptWarnModel();
  model.AnalyticsId = this.id;
  model.Warning = this.warning;
 
  this.http.post<ScriptWarnModel>(`${apiBaseUrl}/api/stock/editwarn`,model).subscribe({
    next:(event)=>{
      this.Load(event);  
      this.editMode = false;   
      this.editStyle = this.getEditStyle();

    },
    error:(err)=>{
      alert('Something went wrong. Try again (or) Click on Ask to raise an issue.');    
      console.log(err);
    }

  });
  
}

}
