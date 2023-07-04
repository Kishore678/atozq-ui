import { EventEmitter, Injectable } from '@angular/core';  
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';  
import { MessageModel } from '../models/chat-model.model';  
import { environment } from 'src/environments/environment';
const onlineUsersApi = environment.onlineUsersApi;
@Injectable()  
export class ChatService {  
  messageReceived = new EventEmitter<MessageModel>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  
  private connectionIsEstablished = false;  
  private _hubConnection!: HubConnection;  
  public userid!:string;
  constructor() {  
    this.createConnection();  
    this.registerOnServerEvents();  
    this.startConnection();  
  }  
  
  sendMessage(message: MessageModel) { 
    let _self = this; 
    this._hubConnection.invoke('NewMessage', message).catch(err=>
      {
        _self.startConnection(); 
        _self._hubConnection.invoke('NewMessage', message);
      });  
  }  
  
  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()  
    .withUrl(`${onlineUsersApi}/onlineUsersHub?userid=${this.userid}`,{ withCredentials: false})  
      .build();  
  }  
  
  private startConnection(): void {  

    if(this._hubConnection.state==HubConnectionState.Connected)
    {

    }
    else
    {    
    this._hubConnection.stop();
    const _self = this;
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log(err);
        console.log('Error while establishing connection, retrying...');  
        setTimeout(function () { _self.startConnection(); }, 5000);  
      });  
    }
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('MessageReceived', (data: MessageModel) => {  
      this.messageReceived.emit(data);  
    });  
  }  
}   


