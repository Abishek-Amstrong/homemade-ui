import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component'
import { MyaccountComponent } from './myaccount/myaccount.component'
import { PersonaldetailsComponent } from './personaldetails/personaldetails.component'
import { AddressbookComponent } from './addressbook/addressbook.component'
import { MyordersComponent } from './myorders/myorders.component'
import { ChangepasswordComponent } from './changepassword/changepassword.component'
import { SignoutComponent } from './signout/signout.component'

import { flush } from '@angular/core/testing';

const routes: Routes = [
  { 
    path : '',component : ProfileComponent,
    children :[
    { path : 'myaccount',component : MyaccountComponent },
    { path : 'personaldetails',component : PersonaldetailsComponent },
    { path : 'addressbook',component : AddressbookComponent},
    { path : 'myorders',component : MyordersComponent },
    { path : 'changepassword',component : ChangepasswordComponent },
    { path : 'signout',component : SignoutComponent },
    { path:'',redirectTo:'myaccount',pathMatch:'full'}
   ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
