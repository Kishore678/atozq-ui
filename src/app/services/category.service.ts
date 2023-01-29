import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories:Category[]=[]; 

  category = new Category();

  readonly categoryUrl = `${environment.apiBaseUrl}/api/category`; 

  constructor(private http:HttpClient) { }

  //get products by category or else get all  
  // url: api/product/{category}
  getCategories()
  {
    return this.http.get<Category[]>(this.categoryUrl);
  }
}
