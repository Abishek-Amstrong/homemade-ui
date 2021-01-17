import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PersonaldetailsComponent } from './personaldetails/personaldetails.component';
import { AddressbookComponent } from './addressbook/addressbook.component';
import { MyordersComponent } from './myorders/myorders.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { SignoutComponent } from './signout/signout.component';

import { ProfileService } from '../shared/services/profile.service'


@NgModule({
  declarations: [ProfileComponent, PersonaldetailsComponent, AddressbookComponent, MyordersComponent, ChangepasswordComponent, SignoutComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ],
  providers : [
    ProfileService
  ]
})
export class ProfileModule { }
