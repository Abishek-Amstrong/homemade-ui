import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChefDetailComponent } from './chef-detail.component';

const routes: Routes = [{ path: '', component: ChefDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChefDetailRoutingModule { }
