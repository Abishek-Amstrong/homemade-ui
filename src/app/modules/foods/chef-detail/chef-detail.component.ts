import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VendorService } from '../../shared/services/vendor.service';
import { PlaceOrderComponent } from '../place-order/place-order.component';

export interface Chef {
  imgUrl: string;
  reviews: number;
  rating: number;
  name: string;
  type: string;
  about: string;
}

export interface menus{
  type : string,
  menu : {
    id: String,
    ItemItemId : string,
    name : string,
    description : string,
    price : number,
    imgUrl :string
  }[]
}

export interface Review {
  avatar: string;
  name: string;
  rating: number;
  time: string;
  reviewTitle: string;
  description: string;
}

@Component({
  selector: 'app-chef-detail',
  templateUrl: './chef-detail.component.html',
  styleUrls: ['./chef-detail.component.scss'],
})
export class ChefDetailComponent implements OnInit {
  chef: Chef;
  menus: menus[];
  reviews: Review[];
  vendorId : string;

  constructor(private vendor : VendorService,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,) {
    this.chef = {} as Chef;

    this.menus = [];

    this.reviews = [
      {
        avatar: 'assets/images/avatar4.jpg',
        name: 'Lukas',
        rating: 4.5,
        time: '54 minutes',
        reviewTitle: '"Great Location!!"',
        description: `Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod scaevola sea. Et
        nec tantas accusamus salutatus, sit commodo veritus te, erat legere fabulas has
        ut. Rebum laudem cum ea, ius essent fuisset ut.
        Viderer petentium cu his. Tollit molestie suscipiantur his et.`,
      },
      {
        avatar: 'assets/images/avatar4.jpg',
        name: 'Lukas',
        rating: 4.5,
        time: '54 minutes',
        reviewTitle: '"Great Location!!"',
        description: `Eos tollit ancillae ea, lorem consulatu qui ne, eu eros eirmod scaevola sea. Et
        nec tantas accusamus salutatus, sit commodo veritus te, erat legere fabulas has
        ut. Rebum laudem cum ea, ius essent fuisset ut.
        Viderer petentium cu his. Tollit molestie suscipiantur his et.`,
      },
    ];
    this.vendorId = '';
  }

  ngOnInit(): void {
    this.loadVendorDetails();
    this.loadVendorMneuDetails();
  }

  loadVendorDetails()
  {
    this.vendorId = this.activatedRoute.snapshot.paramMap.get("id") || '';
    this.vendor.getVendorDetails(this.vendorId).subscribe(
      (resp:any) =>{
        this.chef.imgUrl = resp.imagePath;
        this.chef.name = resp.firstname + ' ' + resp.lastname;
        this.chef.about = resp.user_desc;
        this.chef.rating = resp.rating == '' || resp.rating == undefined ? 0 : resp.rating;
        this.chef.reviews = this.reviews.length;
        this.chef.type =resp.signup_type;

      }
    );
  }

  loadVendorMneuDetails()
  {
    this.vendor.getVendorMenuItemDetails(this.vendorId).subscribe(
      (resp:any) =>{
        let menu : {
          id : string,
          ItemItemId : string,
          name : string,
          description : string,
          price : number,
          imgUrl :string
        }[] = [];
        let type ='Starters';
        for(let i=1;i<=4 && i<resp.length;i++)
        {
          menu.push({
            id: i.toString(),
            ItemItemId : resp[i].itemId,
            name: resp[i].itemname,
            description: resp[i].desc,
            price: Number(resp[i].price),
            imgUrl: resp[i].imagePath
          });
        }
        this.menus.push({'type' : type,menu})
        type ='Main Courses';
        menu = [];
        for(let i=5;i<=8 && i<resp.length;i++)
        {
          menu.push({
            id: i.toString(),
            ItemItemId : resp[i].itemId,
            name: resp[i].itemname,
            description: resp[i].desc,
            price: Number(resp[i].price),
            imgUrl: resp[i].imagePath
          });
        }
        this.menus.push({'type' : type,menu})
      }
    );
  }

  orderNow(event: any, food: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PlaceOrderComponent, {
      data : { component : 'food-detail-component',data : food}
    });
    dialogRef.afterClosed().subscribe((result) => {});
    return false;
  }

}
