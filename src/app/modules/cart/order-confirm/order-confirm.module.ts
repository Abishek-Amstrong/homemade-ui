import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderConfirmRoutingModule } from './order-confirm-routing.module';
import { OrderConfirmComponent } from './order-confirm.component';


@NgModule({
  declarations: [OrderConfirmComponent],
  imports: [
    CommonModule,
    OrderConfirmRoutingModule
  ]
})
export class OrderConfirmModule { }
