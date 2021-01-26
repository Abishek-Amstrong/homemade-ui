import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { PlaceOrderComponent } from '../foods/place-order/place-order.component';
import { AuthService } from '../shared/services/auth.service';
import { CartService } from '../shared/services/cart.service';
import { FoodService } from '../shared/services/food.service'

export interface Menu {
  imgUrl: string;
  label: string;
  path: string;
}

export interface Item{
  ItemImageUrl : string,
  ItemName : string,
  // ItemUnit : String,
  // ItemQuantity : number,
  // ItemIsVeg : boolean,
  // ItemIngrediants : String[],
  // ItemDesc : String,
  ItemPrice : number,
  ItemItemId : String,
  ItemVendorId : string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChildren('owlAnimated') owlElements!: QueryList<ElementRef>;
  @ViewChildren('owlAnimated1') slide1!: QueryList<ElementRef>;
  @ViewChildren('owlAnimated2') slide2!: QueryList<ElementRef>;

  menus: Menu[];
  recentOrderedData: Item[];
  foodData: Item[];

  customOptions: OwlOptions = {
    items: 1,
    loop: true,
    nav: false,
    dots: true,
    autoHeight: true,
    lazyLoad: true,
    autoplay: true,
    responsive: {
      0: {
        dots: false,
      },
      767: {
        dots: false,
      },
      768: {
        dots: true,
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
      1025: {
        nav: true,
        dots: false,
        items: 5,
      },
      1340: {
        nav: true,
        dots: false,
        items: 5,
      },
      1460: {
        nav: true,
        dots: false,
        items: 5,
      },
    },
  };

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private dialog: MatDialog,
    private authService : AuthService,
    private cartService : CartService,
    private foodService : FoodService
  ) {
    this.authService.setHeaderDisplayStatus(false);
    this.menus = [
      {
        imgUrl: 'assets/images/home_cat_food.jpg',
        label: 'Food',
        path: 'foods',
      },
      {
        imgUrl: 'assets/images/home_cat_sugar&spice.jpg',
        label: 'Sugar & Spices',
        path: 'sugar-spice',
      },
      {
        imgUrl: 'assets/images/home_cat_homedecor.jpg',
        label: 'Home Decor',
        path: 'home-decor',
      },
      {
        imgUrl: 'assets/images/home_cat_fashion.jpg',
        label: 'Fashion',
        path: 'fashion',
      },
      {
        imgUrl: 'assets/images/home_cat_bath&beauty.jpg',
        label: 'Plants & Planters',
        path: 'plants',
      },
    ];

    this.recentOrderedData = [];

    this.foodData = [];
  }

  ngOnInit(): void {
    this.loadRecentOrderedItems();
    this.loadFoodDetails();
  }

  ngAfterViewInit() {}

  onSlideTransition(data: SlidesOutputData) {
    this.owlElements.forEach((element) => {
      this.renderer.removeClass(element.nativeElement, 'is-transitioned');
    });

    const currentIndex = data.startPosition;
    if (currentIndex === 0) {
      this.slide1.forEach((element) => {
        this.renderer.addClass(element.nativeElement, 'is-transitioned');
      });
    } else {
      this.slide2.forEach((element) => {
        this.renderer.addClass(element.nativeElement, 'is-transitioned');
      });
    }
  }

  onCarouselInitialized(data: SlidesOutputData) {
    setTimeout(() => {
      this.slide1.forEach((element) => {
        this.renderer.addClass(element.nativeElement, 'is-transitioned');
      });
    }, 200);
  }

  navigateToComponent(path: string) {
    this.router.navigate(['/', 'foods']);
  }

  loadRecentOrderedItems()
  {
    this.cartService.getRecentOrderedItems().subscribe(
      (resp:any)=>{
        //console.log(resp);
        for(let item of resp)
        {
          if(item != null && item != undefined)
          {
            let currItem = {
              ItemImageUrl : item.imagePath,
              ItemName : item.itemname,
              ItemPrice : item.price,
              ItemItemId : item.itemId,
              ItemVendorId : item.VendorVendorId
            };
            this.recentOrderedData.push(currItem);
          }
        }
      }
    );
  }

  loadFoodDetails()
  {
    this.foodService.getFoodItemsForHomePage().subscribe(
      (resp:any)=>{
        //console.log('food : ' + JSON.stringify(resp));
             for(let item of resp)
             {
               if(item != null && item !=undefined)
               {
                let currItem = {
                  ItemImageUrl : item.imagePath,
                  ItemName : item.itemname,
                  ItemPrice : item.price,
                  ItemItemId : item.itemId,
                  ItemVendorId : item.VendorVendorId
                };
                this.foodData.push(currItem);
               }
             }          
      });
  }

  orderNow(event: any, food: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PlaceOrderComponent, {
      data : { component : 'dashboard-component',data : food}
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
