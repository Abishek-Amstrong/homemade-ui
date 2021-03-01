import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FashionRoutingModule } from './fashion-routing.module';
import { FashionComponent } from './fashion.component';


@NgModule({
  declarations: [FashionComponent],
  imports: [
    CommonModule,
    FashionRoutingModule
  ]
})
export class FashionModule { }
