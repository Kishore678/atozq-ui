import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styles: [
  ]
})
export class ItemFormComponent implements OnInit {

  constructor(public service: ItemService) { }

  ngOnInit(): void {
    
  }

  onSubmit(form: NgForm) {
    console.log(this.service.itemData);
    if (this.service.itemData.itemId == 0) {
      console.log("Hello");
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }

  }

  insertRecord(form: NgForm) {
  
  }

  updateRecord(form: NgForm) {
   
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.itemData = new Item();
  }

}
