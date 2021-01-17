import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodsRoutingModule } from './foods-routing.module';
import { FoodsComponent } from './foods.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { AngularMaterialModule } from '../shared/angular-material.module';

@NgModule({
  declarations: [FoodsComponent, PlaceOrderComponent],
  imports: [
    CommonModule,
    FoodsRoutingModule,
    CarouselModule,
    AngularMaterialModule,
  ],
})
export class FoodsModule {}
