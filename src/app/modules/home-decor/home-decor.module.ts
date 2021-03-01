import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HomeDecorRoutingModule } from './home-decor-routing.module';
import { HomeDecorComponent } from './home-decor.component';


@NgModule({
  declarations: [HomeDecorComponent],
  imports: [
    CommonModule,
    HomeDecorRoutingModule,
    CarouselModule
  ]
})
export class HomeDecorModule { }
