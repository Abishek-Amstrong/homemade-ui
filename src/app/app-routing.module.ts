import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurdService } from './modules/shared/services/auth.gaurd.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./modules/shared/shared.module').then((m) => m.SharedModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./modules/cart/cart.module').then((m) => m.CartModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: 'foods',
    loadChildren: () =>
      import('./modules/foods/foods.module').then((m) => m.FoodsModule),
    canActivate: [AuthGaurdService],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
