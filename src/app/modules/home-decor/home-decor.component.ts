import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from './../foods/place-order/place-order.component';

import { ItemService } from '../shared/services/item.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface Item {
  ItemImageUrl: string;
  ItemName: string;
  ItemPrice: number;
  ItemItemId: String;
  ItemVendorId: string;
}

@Component({
  selector: 'app-home-decor',
  templateUrl: './home-decor.component.html',
  styleUrls: ['./home-decor.component.scss']
})
export class HomeDecorComponent implements OnInit {
  decorData: Item[];
  homeFurnishingData: Item[];
  artsAndCraftsData: Item[];
  menus: any;
  categories: { imgUrl: string; label: string; component: string }[];
  @ViewChild('decor') decor: any;
  @ViewChild('homefurnishing') homefurnishing: any;
  @ViewChild('artsandcrafts') artsandcrafts: any;

  customOptions: OwlOptions = {
    center: false,
    stagePadding: 50,
    items: 1,
    loop: false,
    margin: 15,
    dots: false,
    nav: true,
    lazyLoad: true,
    navText: ["<i class='arrow_left'></i>", "<i class='arrow_right'></i>"],
    responsive: {
      0: {
        nav: false,
        dots: false,
        items: 2,
      },
      600: {
        nav: false,
        dots: false,
        items: 2,
      },
      1025: {
        nav: true,
        dots: false,
        items: 3,
      },
      1280: {
        nav: true,
        dots: false,
        items: 5,
      },
      1440: {
        nav: true,
        dots: false,
        items: 5,
      },
    },
  };

  customOptionsTwo: OwlOptions = {
    center: false,
    stagePadding: 0,
    items: 1,
    loop: false,
    margin: 30,
    dots: false,
    nav: true,
    lazyLoad: true,
    navText: ["<i class='arrow_left'></i>", "<i class='arrow_right'></i>"],
    responsive: {
      0: {
        nav: false,
        dots: false,
        items: 2,
        stagePadding: 50,
        margin: 15,
      },
      600: {
        nav: false,
        dots: false,
        items: 4,
        margin: 10,
      },
      768: {
        nav: false,
        dots: false,
        items: 4,
      },
      1024: {
        nav: true,
        dots: false,
        items: 4,
      },
      1281: {
        nav: true,
        dots: false,
        items: 6,
      },
      1340: {
        nav: true,
        dots: false,
        items: 6,
      },
    },
  };

  constructor(
    private dialog: MatDialog,
    private itemservice: ItemService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.decorData = [];
    this.homeFurnishingData = [];
    this.artsAndCraftsData = [];
    this.categories = [
      {
        imgUrl: 'assets/images/backeryItems.jpeg',
        label: 'Decor',
        component: 'Decor',
      },
      {
        imgUrl: 'assets/images/chocolates.jpg',
        label: 'Home Furnishing',
        component: 'Home-Furnishing',
      },
      {
        imgUrl: 'assets/images/savories.jpg',
        label: 'Arts & Crafts',
        component: 'ArtsAndCrafts',
      }
    ];
  }

  ngOnInit(): void {
    this.homeDecorSubCategoryDetails();
  }

  homeDecorSubCategoryDetails() {
    this.itemservice.getHomeDecorPageDetails().subscribe((resp: any) => {
      //console.log(resp);
      for (let item of resp.decor) {
        if (item) {
          let currItem: Item = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.decorData.push(currItem);
        }
      }
      for (let item of resp.homeFurnishing) {
        if (item) {
          let currItem: Item = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.homeFurnishingData.push(currItem);
        }
      }
      for (let item of resp.artsAndCrafts) {
        if (item) {
          let currItem: Item = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.artsAndCraftsData.push(currItem);
        }
      }
    });
  }

  orderNow(event: any, item: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PlaceOrderComponent, {
      data: { component: 'home-decor-component', data: item },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  navigateToCategory(subcategory: string) {
    switch (subcategory) {
      case 'Decor':
        this.decor.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Home Furnishing':
        this.homefurnishing.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Arts & Crafts':
        this.artsandcrafts.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        this.decor.nativeElement.scrollIntoView({behavior: 'smooth' });
    }
  }

  navigateToSubCategory(category: string) {
    this.router.navigate(['/', 'home-decor', 'category', category]);
  }
}
