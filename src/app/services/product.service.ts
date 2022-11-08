import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentModel } from '../models/comment.model';
import { ItemModel } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:ItemModel[]=[];

  product = new ItemModel();

  readonly prodUrl = `${environment.apiBaseUrl}/api/product`;

  constructor(private http:HttpClient) { }

  //get products by category or else get all  
  // url: api/product/{category}
  getProductsByCategory(category:string):Observable<ItemModel[]>
  {
    return this.http.get<ItemModel[]>(`${this.prodUrl}/display/${category}`);
  }

  //get product by id
  // url: api/product/{id}
  getProductById(id:number):Observable<ItemModel>
  {
    return this.http.get<ItemModel>(`${this.prodUrl}/${id}`);
  }

  //create
  // url: api/product
  postProduct(product:ItemModel):Observable<ItemModel>
  {
    return this.http.post<ItemModel>(`${this.prodUrl}`,product);
  }

  //modify
  // url: api/product/{id}
  putProduct(id:number,product:ItemModel):Observable<ItemModel>
  {
    return this.http.put<ItemModel>(`${this.prodUrl}/${id}`,product);
  }

  //delete
  // url: api/product/{id}
  deleteProduct(id:number):Observable<boolean>
  {
    return this.http.delete<boolean>(`${this.prodUrl}/${id}`);
  }

//post
//url: api/product/comment
  postComment(model:CommentModel):Observable<CommentModel>
  {
    return this.http.post<CommentModel>(`${this.prodUrl}/comment`,model);
  }
  
  //get
  //url: api/product/comment/{itemId}
  getCommentByItemId(itemId:number):Observable<CommentModel>
  {
    return this.http.get<CommentModel>(`${this.prodUrl}/comment/`+itemId);    
  }

}
