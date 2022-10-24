import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item.model';

const apiBaseUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  readonly itemsAPI =  apiBaseUrl;
  constructor(private httpClient:HttpClient) { }
  list: Item[] = [];
  itemData: Item = new Item(); 
  GetItems(category:string):Observable<Item[]>
  {   
   return this.httpClient.get<Item[]>(this.itemsAPI+'/api/Item');   
  }
  refreshList() {   
      this.GetItems("").subscribe(res=>{
        this.list = res;
      });   
  }

  deleteToDoItem(id: number) {
  
  }

  postToDoItem() {
    
  }

  putToDoItem() {
   
  }
 
}
