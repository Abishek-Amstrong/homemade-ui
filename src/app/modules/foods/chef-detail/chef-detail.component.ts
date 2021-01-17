import { Component, OnInit } from '@angular/core';

export interface Chef {
  imgUrl: string;
  reviews: string;
  rating: number;
  name: string;
  type: string;
  about: string;
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
  menus: any;
  reviews: Review[];

  constructor() {
    this.chef = {
      imgUrl: 'assets/images/about_1.svg',
      reviews: '15',
      rating: 8.9,
      name: 'Pankaj Saxena',
      type: 'Homemade Chef',
      about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    };

    this.menus = [
      {
        type: 'Starters',
        menu: [
          {
            id: '1',
            name: 'Mexican Enchiladas',
            description: 'Fuisset mentitum deleniti sit ea.',
            price: '9.40',
            imgUrl: 'assets/images/menu-thumb-placeholder.jpg',
          },
          {
            id: '2',
            name: 'Fajitas',
            description: 'Fuisset mentitum deleniti sit ea.',
            price: '6.80',
            imgUrl: 'assets/images/menu-thumb-placeholder.jpg',
          },
          {
            id: '3',
            name: 'Royal Fajitas',
            description: 'Fuisset mentitum deleniti sit ea.',
            price: '5.70',
            imgUrl: 'assets/images/menu-thumb-placeholder.jpg',
          },
          {
            id: '4',
            name: 'Chicken Enchilada Wrap',
            description: 'Fuisset mentitum deleniti sit ea.',
            price: '5.20',
            imgUrl: 'assets/images/menu-thumb-placeholder.jpg',
          },
        ],
      },
      {
        type: 'Main Courses',
        menu: [
          {
            id: '5',
            name: 'Cheese Quesadilla',
            description: 'Fuisset mentitum deleniti sit ea.',
            price: '12.00',
            imgUrl: 'assets/images/menu-thumb-placeholder.jpg',
          },
          {
            id: '6',
            name: 'Chorizo & Cheese',
            description: 'Fuisset mentitum deleniti sit ea.',
            price: '24.71',
            imgUrl: 'assets/images/menu-thumb-placeholder.jpg',
          },
          {
            id: '7',
            name: 'Beef Taco',
            description: 'Fuisset mentitum deleniti sit ea.',
            price: '8.70',
            imgUrl: 'assets/images/menu-thumb-placeholder.jpg',
          },
          {
            id: '4',
            name: 'Chicken Enchilada Wrap',
            description: 'Fuisset mentitum deleniti sit ea.',
            price: '5.20',
            imgUrl: 'assets/images/menu-thumb-placeholder.jpg',
          },
        ],
      },
    ];

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
  }

  ngOnInit(): void {}
}
