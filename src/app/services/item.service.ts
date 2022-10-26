import { HttpClient,  } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemModel } from '../models/item.model';

const apiBaseUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly itemsAPI =  `${apiBaseUrl}/api/Item`;

  constructor(private httpClient:HttpClient) { }

  getItems(category:string):Observable<ItemModel[]>
  { 
   return this.httpClient.get<ItemModel[]>(this.itemsAPI);   
  }

  deleteItem(id: number):Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.itemsAPI}/${id}`);  
  }

  postItem(item:ItemModel):Observable<ItemModel> { 
   return this.httpClient.post<ItemModel>(this.itemsAPI,item);
  }

  putItem(itemModel:ItemModel):Observable<ItemModel> {        
  return this.httpClient.put<ItemModel>(`${this.itemsAPI}/${itemModel.itemId}`,itemModel);  
  }
 
}
