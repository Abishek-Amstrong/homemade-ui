import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodsRoutingModule } from './foods-routing.module';
import { FoodsComponent } from './foods.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [FoodsComponent],
  imports: [CommonModule, FoodsRoutingModule, CarouselModule],
})
export class FoodsModule {}
