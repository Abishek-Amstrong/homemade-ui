import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';

export interface Food {
  imgUrl: string;
  label: string;
  rating: number;
  price: number;
  quantity: string;
  availability: string;
}

export interface Review {
  avatar: string;
  name: string;
  rating: number;
  time: string;
  reviewTitle: string;
  description: string;
}

export interface FoodCard {
  imgUrl: string;
  label: string;
  rating: number;
  price: string;
  offer: string;
}

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent implements OnInit {
  foodItem: Food;
  reviews: Review[];
  moreFromChef: FoodCard[];

  constructor(private dialog: MatDialog) {
    this.foodItem = {
      imgUrl: 'assets/images/slides/slide_home_1.jpg',
      label: 'Sabudana Samosa with Pindi Chole and Mint Chutney',
      rating: 4.5,
      price: 199,
      quantity: '500g',
      availability: 'Available from tommorow 9am',
    };

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

    this.moreFromChef = [
      {
        imgUrl: 'assets/images/location_1.jpg',
        label: 'Sabudana Samosa',
        rating: 9.5,
        price: '199',
        offer: '15%',
      },
      {
        imgUrl: 'assets/images/location_1.jpg',
        label: 'Sabudana Samosa',
        rating: 9.5,
        price: '199',
        offer: '15%',
      },
      {
        imgUrl: 'assets/images/location_1.jpg',
        label: 'Sabudana Samosa',
        rating: 9.5,
        price: '199',
        offer: '15%',
      },
      {
        imgUrl: 'assets/images/location_1.jpg',
        label: 'Sabudana Samosa',
        rating: 9.5,
        price: '199',
        offer: '15%',
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
