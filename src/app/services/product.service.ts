import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardModel } from '../models/card.model';
import { CommentModel } from '../models/comment.model';
import { ImageModel } from '../models/image.model';
import { ItemModel } from '../models/item.model';
import { Product } from '../models/product.model';
import { UserItem } from '../models/userItem.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:Product[]=[];
  cards:CardModel[] =[];
  images:ImageModel[]=[];

  product = new ItemModel();

  readonly prodUrl = `${environment.apiBaseUrl}/api/product`;
  readonly mediaUrl = `${environment.apiBaseUrl}/api/Media`;
  readonly cardUrl = `${environment.apiBaseUrl}/api/Card`;
  readonly userUrl = `${environment.apiBaseUrl}/api/UserItems`;
  
  // http://localhost:24288/api/UserItems/all/kishore

  constructor(private http:HttpClient) { }

  //get products by category or else get all  
  // url: api/product/{category}
  getProductsByCategory(category:string):Observable<ItemModel[]>
  {
    return this.http.get<ItemModel[]>(`${this.prodUrl}/display/${category}`);
  }

  //get product by id
  // url: api/product/{id}
  // getProductById(id:number):Observable<ItemModel>
  // {
  //   return this.http.get<ItemModel>(`${this.prodUrl}/${id}`);
  // }

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


  getImages():Observable<ImageModel[]>
  {
    return this.http.get<ImageModel[]>(this.mediaUrl);
  }


  getCards(category:string=""):Observable<CardModel[]>
  {
    return this.http.get<CardModel[]>(`${this.cardUrl}/all/${category}`);
  }

  addWatch(prod:Product):Observable<Product>
  {
    return this.http.post<Product>(`${this.prodUrl}/addwatch`,prod);
  }

  removeWatch(prod:Product):Observable<Product>
  {
    return this.http.post<Product>(`${this.prodUrl}/removewatch`,prod);   
  }

addToUserItem(model:UserItem):Observable<UserItem>
{
  return this.http.post<UserItem>(`${this.userUrl}`,model);
}

removeUserItem(userItemId:number):Observable<UserItem>
{
  return this.http.delete<UserItem>(`${this.userUrl}/${userItemId}`);
}


//Product Service

getProducts(username:string):Observable<Product[]>
{
  return this.http.get<Product[]>(`${this.prodUrl}/${username}`);
}

getProductById(id:number):Observable<Product[]>
{
  return this.http.get<Product[]>(`${this.prodUrl}/${id}`)
}

}
