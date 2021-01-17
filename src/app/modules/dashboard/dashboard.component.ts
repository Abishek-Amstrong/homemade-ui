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

export interface Menu {
  imgUrl: string;
  label: string;
  path: string;
}

export interface Food {
  imgUrl: string;
  label: string;
  price: number;
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
  recentlyViewed: any[];
  foods: Food[];

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
    private dialog: MatDialog
  ) {
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

    this.recentlyViewed = [
      {
        imgUrl: 'assets/images/Cat_item_1.jpg',
        label: 'Sabudana Samosa with Pindi Chole and Mint Chutney',
      },
      {
        imgUrl: 'assets/images/Cat_item_1.jpg',
        label: 'Da Alfredo',
      },
      {
        imgUrl: 'assets/images/Cat_item_1.jpg',
        label: 'Da Alfredo',
      },
      {
        imgUrl: 'assets/images/Cat_item_1.jpg',
        label: 'Da Alfredo',
      },
      {
        imgUrl: 'assets/images/Cat_item_1.jpg',
        label: 'Da Alfredo',
      },
      {
        imgUrl: 'assets/images/Cat_item_1.jpg',
        label: 'Da Alfredo',
      },
    ];

    this.foods = [
      {
        imgUrl: 'assets/images/products/product-2.jpg',
        label: 'Bathroom Glass made with raw silica and silver',
        price: 600,
      },
      {
        imgUrl: 'assets/images/products/product-2.jpg',
        label: 'Bathroom Glass made with raw silica and silver',
        price: 600,
      },
      {
        imgUrl: 'assets/images/products/product-2.jpg',
        label: 'Bathroom Glass made with raw silica and silver',
        price: 600,
      },
      {
        imgUrl: 'assets/images/products/product-2.jpg',
        label: 'Bathroom Glass made with raw silica and silver',
        price: 600,
      },
    ];
  }

  ngOnInit(): void {}

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

  orderNow(event: any, food: Food) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PlaceOrderComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
