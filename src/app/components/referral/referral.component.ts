import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.css']
})
export class ReferralComponent implements OnInit {
 cards:ItemModel[]=[];
  constructor(private itemService:ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems("referral").subscribe(result=>{
      this.cards = result; 
    });
  }

}
