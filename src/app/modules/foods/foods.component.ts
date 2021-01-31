import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from './place-order/place-order.component';

import { FoodService } from '../shared/services/food.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface Item {
  ItemImageUrl: string;
  ItemName: string;
  // ItemUnit : String,
  // ItemQuantity : number,
  // ItemIsVeg : boolean,
  // ItemIngrediants : String[],
  // ItemDesc : String,
  ItemPrice: number;
  ItemItemId: String;
  ItemVendorId: string;
}

export interface chef {
  chefId: string;
  firstname: string;
  lastname: string;
  chefImage: string;
  chefRating: number;
}

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss'],
})
export class FoodsComponent implements OnInit {
  breakfastData: Item[];
  southIndianData: Item[];
  northIndianData: Item[];
  continentalData: Item[];
  orientalData: Item[];
  beveragesData: Item[];
  mealData: Item[];
  desertsData: Item[];
  platterData: Item[];
  menus: any;
  chefData: chef[];
  categories: { imgUrl: string; label: string; component: string }[];
  cuisineData: Item[];

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
    private foodService: FoodService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.breakfastData = [];
    this.southIndianData = [];
    this.northIndianData = [];
    this.continentalData = [];
    this.orientalData = [];
    this.chefData = [];
    this.beveragesData = [];
    this.mealData = [];
    this.desertsData = [];
    this.platterData = [];
    this.categories = [
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Breakfast',
        component: 'Breakfast',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'North Indian',
        component: 'North Indian',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'South Indian',
        component: 'South Indian',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Oriental',
        component: 'Oriental',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Continental',
        component: 'Continental',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Desserts',
        component: 'Dessert',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Beverages',
        component: 'Beverages',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Platter',
        component: 'Platter',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Healthy',
        component: 'Healthy',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Regional',
        component: 'Regional',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Biscuits',
        component: 'Biscuits',
      },
    ];
    this.cuisineData = [];
  }

  ngOnInit(): void {
    this.loadChefDetails();
    this.foodSubCategoryDetails();
    this.loadCuisineDetails();
  }

  foodSubCategoryDetails() {
    this.foodService.getFoodPageDetails().subscribe((resp: any) => {
      //console.log(resp);
      for (let item of resp.Breakfast) {
        if (item != null && item != undefined) {
          let currItem: Item = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.breakfastData.push(currItem);
        }
      }
      for (let item of resp.Continental) {
        if (item != null && item != undefined) {
          let currItem: Item = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.continentalData.push(currItem);
        }
      }
      for (let item of resp.Desserts) {
        if (item != null && item != undefined) {
          let currItem: Item = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.desertsData.push(currItem);
        }
      }
      for (let item of resp.NorthIndian) {
        if (item != null && item != undefined) {
          let currItem: Item = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.northIndianData.push(currItem);
        }
      }
      for (let item of resp.SouthIndian) {
        if (item != null && item != undefined) {
          let currItem: Item = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.southIndianData.push(currItem);
        }
      }
      for (let item of resp.Oriental) {
        if (item != null && item != undefined) {
          let currItem: Item = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.orientalData.push(currItem);
        }
      }
      for (let item of resp.Platter) {
        if (item != null && item != undefined) {
          let currItem: Item = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.platterData.push(currItem);
        }
      }
      for (let item of resp.Beverages) {
        if (item != null && item != undefined) {
          let currItem: Item = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.beveragesData.push(currItem);
        }
      }
      for (let item of resp.Meal) {
        if (item != null && item != undefined) {
          let currItem: Item = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.mealData.push(currItem);
        }
      }
    });
  }

  loadChefDetails() {
    this.foodService.getChefsNearUserLocation().subscribe((resp: any) => {
      for (let chef of resp) {
        let chefItem = {
          chefId: chef.vendorId,
          firstname: chef.firstname,
          lastname: chef.lastname,
          chefImage: chef.imagePath,
          chefRating: chef.rating,
        };
        this.chefData.push(chefItem);
      }
    });
  }

  loadCuisineDetails() {
    this.foodService.getCuisineNearUserLocation().subscribe((resp: any) => {
      //console.log(resp);
      for (let item of resp) {
        if (item != null && item != undefined) {
          let currItem = {
            ItemImageUrl: item.imagePath,
            ItemName: item.itemname,
            // ItemUnit : item.unit,
            // ItemQuantity : 1,
            // ItemIsVeg : item.isVeg,
            // ItemIngrediants : item.ingredients !=null ? item.ingredients.split(',') : '',
            // ItemDesc : item.desc,
            ItemPrice: item.price,
            ItemItemId: item.itemId,
            ItemVendorId: item.VendorVendorId,
          };
          this.cuisineData.push(currItem);
        }
      }
    });
  }

  orderNow(event: any, food: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PlaceOrderComponent, {
      data: { component: 'foodpage-component', data: food },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  navigateToCategory(category: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'foods', 'category', category]));
  }
}
