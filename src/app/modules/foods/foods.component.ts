import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from './place-order/place-order.component';

export interface Category {
  imgUrl: string;
  label: string;
  availability?: string;
}

export interface Chef {
  imgUrl: string;
  name: string;
  rating?: number;
}

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss'],
})

export class FoodsComponent implements OnInit {
  categories: Category[];
  menus: any;
  chefs: Chef[];
  cuisines: Chef[];

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

  constructor(private dialog: MatDialog) {
    this.categories = [
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Breakfast',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'North Indian',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'South Indian',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Oriental',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Continental',
      },
      {
        imgUrl: 'assets/images/cat_listing_1.jpg',
        label: 'Dessert',
      },
    ];

    this.menus = {
      breakfast: [
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: 'Available from tommorow 9am',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: 'Available till 5pm',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
      ],
      northIndian: [
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
      ],
      southIndian: [
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
      ],
      continental: [
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
      ],
      oriental: [
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
      ],
      desserts: [
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
      ],
      regional: [
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
      ],
      healty: [
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
        {
          imgUrl: 'assets/images/products/product-2.jpg',
          label: 'Bathroom Glass made with raw silica and silver',
          availability: '',
          price: 600,
        },
      ],
    };

    this.chefs = [
      {
        imgUrl: 'assets/images/lazy-placeholder.png',
        name: 'John Doe',
        rating: 9.5,
      },
      {
        imgUrl: 'assets/images/lazy-placeholder.png',
        name: 'John Doe',
        rating: 9.5,
      },
      {
        imgUrl: 'assets/images/lazy-placeholder.png',
        name: 'John Doe',
        rating: 9.5,
      },
      {
        imgUrl: 'assets/images/lazy-placeholder.png',
        name: 'John Doe',
        rating: 9.5,
      },
      {
        imgUrl: 'assets/images/lazy-placeholder.png',
        name: 'John Doe',
        rating: 9.5,
      },
      {
        imgUrl: 'assets/images/lazy-placeholder.png',
        name: 'John Doe',
        rating: 9.5,
      },
    ];

    this.cuisines = [
      {
        imgUrl: 'assets/images/lazy-placeholder.png',
        name: 'John Doe',
      },
      {
        imgUrl: 'assets/images/lazy-placeholder.png',
        name: 'John Doe',
      },
      {
        imgUrl: 'assets/images/lazy-placeholder.png',
        name: 'John Doe',
      },
      {
        imgUrl: 'assets/images/lazy-placeholder.png',
        name: 'John Doe',
      },
      {
        imgUrl: 'assets/images/lazy-placeholder.png',
        name: 'John Doe',
      },
      {
        imgUrl: 'assets/images/lazy-placeholder.png',
        name: 'John Doe',
      },
    ];
  }

  ngOnInit(): void {}

  orderNow(event: any, food: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(PlaceOrderComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
