import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { FoodService } from '../../shared/services/food.service'

@Component({
  selector: 'app-continental',
  templateUrl: './continental.component.html',
  styleUrls: ['./continental.component.scss']
})

export class ContinentalComponent implements OnInit {
  foodData : any;
  chefData : any;
  cuisineData : any;

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

  constructor(private foodService : FoodService) { }

  ngOnInit(): void {
    this.loadBreakfastDetails();
    this.loadChefDetails();
    this.loadCuisineDetails();
  }

  loadBreakfastDetails()
  {
    this.foodService.getBreakfastDetails().subscribe(data=>this.foodData = data,
      err=>console.log(err)
      );
  }

  loadChefDetails()
  {
    this.foodService.getChefsNearUserLocation().subscribe(data=>this.chefData = data,
      err=>console.log(err)
      );
  }

  loadCuisineDetails()
  {
    this.foodService.getCuisineNearUserLocation().subscribe(data=>this.cuisineData = data,
      err=>console.log(err)
      );
  }
}
