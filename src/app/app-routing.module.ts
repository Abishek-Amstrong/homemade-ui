import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
{ path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
