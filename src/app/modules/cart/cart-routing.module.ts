import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from '../shared/services/auth.gaurd.service';

import { CartComponent } from './cart/cart.component';
import { CheckoutFoodComponent } from './checkout-food/checkout-food.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  {
    path: 'checkout',
    component: CheckoutFoodComponent,
    canActivate: [AuthGaurdService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
