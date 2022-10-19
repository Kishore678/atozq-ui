import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
cards:Item[]=[];
constructor(private itemService:ItemService) { }
ngOnInit() {
this.itemService.GetItems("").subscribe(result=>{
  this.cards = result
});
}

}
