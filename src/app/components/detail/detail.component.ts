import { Component, OnInit, VERSION } from '@angular/core';
import { Detail } from 'src/app/models/detail.model';
import { Product } from 'src/app/models/product.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  details:Detail=new Detail(); 
  prods:Product[]=[];
  constructor(  public auth:AuthenticationService) { }

  ngOnInit() {   
    debugger;
    this.details.prod.avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3TmYSdiVW8FTkqamUmP0YNMSVwTuqfkqqJw&usqp=CAU';   
    this.details.prod.imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTqxRSHvenISIuW93nugIGeoBm8msCN-v7w&usqp=CAU';
    this.details.productImages = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTqxRSHvenISIuW93nugIGeoBm8msCN-v7w&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyTqxRSHvenISIuW93nugIGeoBm8msCN-v7w&usqp=CAU'];
    this.details.shareUrl='';
    this.details.backUrl='';

    this.details.createHeader='Google Pay';
    this.details.createBody='Create ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    this.details. useHeader='Google Pay';
    this.details.useBody='Use ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    this.details.refHeader='Google Pay';
    this.details.refBody='Ref ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    this.details.earnHeader='Google Pay';
    this.details.earnBody='Earn ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

let prod1 = new Product();
let prod2 = new Product();
prod1.avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3TmYSdiVW8FTkqamUmP0YNMSVwTuqfkqqJw&usqp=CAU';
prod2.avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3TmYSdiVW8FTkqamUmP0YNMSVwTuqfkqqJw&usqp=CAU';

    this.prods.push(prod1);
    this.prods.push(prod2);

    this.details.prodRelated = this.prods;
    this.details.homeUrl='/';
  }  
  share(prod:any)
  {

  }
  openDialog(d1:any,d2:any)
  {

  }
  watch(d:any)
  {
    
  }

}

