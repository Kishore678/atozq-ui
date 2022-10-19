import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpClient:HttpClient) { }

  GetItems(category:string):Observable<Item[]>
  {
    let items = [
      {
        Category:"referral",
        TitleText:"Country Delight",
        SubTitle:"Milk delivery service",
        AvatarUrl:"https://img2.apksum.com/e8/app.mycountrydelight.in.countrydelight/5.1.5/icon.png",
        ItemImageUrl:"https://paisawasooldeal.in/wp-content/uploads/2022/10/Country-Delight-Referral-Code-MILKRA3JGR-768x432.webp",
        ItemHeadLine:" CountryDelight Referral Code: MILKRA3JGR | Get 100% Cashback + Rs.150 Per Referral",
        ItemDescription:"Country Delight delivers farm-fresh cow and buffalo milk to your doorstep within a few hours of milking. Order now through the app and get pure dairy and bakery products every day.",
        DownloadButton:"",
        ViewButton:"",
        Comments:0
      },
      {
        Category:"referral",
        TitleText:"Google Pay",
        SubTitle:"Mobile payment service",
        AvatarUrl:"https://th.bing.com/th/id/OIP.9mCmN8XqjvKwAhi6w0ecggHaHZ?pid=ImgDet&rs=1",
        ItemImageUrl:"https://coupenyaari.in/wp-content/uploads/2020/01/Google-Pay-Referral-Code-Get-Free-Cash-Refer-and-Earn-Scratch-Card-Cashback-Offer.png",
        ItemHeadLine:"Google Pay App: Get Rs 101 on Referring Friends | Referral Code",
        ItemDescription:" Google Pay is a mobile payment service developed by Google to power in-app, online, and in-person contactless purchases on mobile devices, enabling users to make payments with Android phones, tablets",
        DownloadButton:"",
        ViewButton:"",
        Comments:0
      },
      {
        Category:"shopping",
        TitleText:"Redmi 9 Activ (Carbon Black, 4GB RAM, 64GB Storage)",
        SubTitle:"Shopping Deal",
        AvatarUrl:"https://m.media-amazon.com/images/I/911TJ1CDbLL._SX679_.jpg",
        ItemImageUrl:"https://m.media-amazon.com/images/I/911TJ1CDbLL._SX679_.jpg",
        ItemHeadLine:"Redmi 9 Activ (Carbon Black, 4GB RAM, 64GB Storage) | Octa-core Helio G35 | 5000 mAh Battery",
        ItemDescription:"Processor: Octa-core Helio G35 and upto 2.3GHz clock speed \n Camera: 13+2 MP Dual Rear camera with AI portrait| 5 MP front camera\nDisplay: 16.58 centimeters (6.53-inch) HD+ display with 720x1600 pixels and 20:9 aspect ratio\nBattery: 5000 mAH large battery with 10W wired charger in-box\nMemory, \nStorage & SIM: 4GB RAM | 64GB storage | Dual SIM (nano+nano) + Dedicated SD card slot\n",
        DownloadButton:"",
        ViewButton:"",
        Comments:0
      }
    ];

    if(category=="")
    {
    return of<Item[]>(items);
    }
    else
    {
    return of<Item[]>(items.filter(f=>f.Category==category));
    }

    // return this.httpClient.get<Item[]>('/items');
  }

 
}
