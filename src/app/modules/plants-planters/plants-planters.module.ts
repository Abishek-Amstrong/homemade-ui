import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantsPlantersRoutingModule } from './plants-planters-routing.module';
import { PlantsPlantersComponent } from './plants-planters.component';


@NgModule({
  declarations: [PlantsPlantersComponent],
  imports: [
    CommonModule,
    PlantsPlantersRoutingModule
  ]
})
export class PlantsPlantersModule { }
