import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  cards:Item[]=[];
constructor(private itemService:ItemService) { }
ngOnInit() {
this.itemService.GetItems("shopping").subscribe(result=>{
  this.cards = result
});
}
}
