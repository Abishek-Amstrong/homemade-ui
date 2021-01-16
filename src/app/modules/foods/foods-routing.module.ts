import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodsComponent } from './foods.component';

const routes: Routes = [
  { path: '', component: FoodsComponent },
  {
    path: 'detail/:id',
    loadChildren: () =>
      import('./food-detail/food-detail.module').then(
        (m) => m.FoodDetailModule
      ),
  },
  {
    path: 'chef/:id',
    loadChildren: () =>
      import('./chef-detail/chef-detail.module').then(
        (m) => m.ChefDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodsRoutingModule {}
