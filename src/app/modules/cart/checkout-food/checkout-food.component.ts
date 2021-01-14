import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-food',
  templateUrl: './checkout-food.component.html',
  styleUrls: ['./checkout-food.component.scss']
})
export class CheckoutFoodComponent implements OnInit {
  displayOrderSummary : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  expandOrderSummary()
  {
    this.displayOrderSummary = this.displayOrderSummary == false ? true : false;
  }

}
