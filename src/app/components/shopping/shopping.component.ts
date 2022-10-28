import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  cards:ItemModel[]=[];
constructor(private itemService:ItemService) { }
ngOnInit() {
this.itemService.getItems("shopping").subscribe(result=>{
  this.cards = result.filter((value,key)=>{
    return value.category?.toLowerCase()=="shopping";
  });
});
}
}
