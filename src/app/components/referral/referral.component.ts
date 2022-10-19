import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.css']
})
export class ReferralComponent implements OnInit {
 cards:Item[]=[];
  constructor(private itemService:ItemService) { }

  ngOnInit(): void {
    this.itemService.GetItems("referral").subscribe(result=>{
      this.cards = result; 
    });
  }

}
