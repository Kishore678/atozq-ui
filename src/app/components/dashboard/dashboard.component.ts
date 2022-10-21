import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  readonly baseURL = "https://api.atozq.com/api/ToDoItem";
  list: Item[]=[];

  constructor(public service: ItemService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: Item) {
    this.service.itemData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.deleteToDoItem(id);
    }
  }

}

