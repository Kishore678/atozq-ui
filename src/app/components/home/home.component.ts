import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

cards:ItemModel[]=[];

constructor(private itemService:ItemService) { }

ngOnInit() {
this.itemService.getItems("").subscribe(result=>{
  this.cards = result
});
}

}
