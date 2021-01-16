import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodsComponent } from './foods.component';

const routes: Routes = [{ path: '', component: FoodsComponent }, { path: 'detail', loadChildren: () => import('./food-detail/food-detail.module').then(m => m.FoodDetailModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodsRoutingModule { }
