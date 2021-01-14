import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { CheckoutFoodComponent } from './checkout-food/checkout-food.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'checkout',component : CheckoutFoodComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
