import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDecorComponent } from './home-decor.component';

const routes: Routes = [
  {path : '', component : HomeDecorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeDecorRoutingModule { }
