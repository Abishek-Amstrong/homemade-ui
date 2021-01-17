import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common' 

import { ProfileService } from '../../shared/services/profile.service'

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {
  orderData: any;
  formatDate : any = formatDate;

  constructor(private profileService : ProfileService) {
    this.profileService.setMobileMenuDisplayStatus(true);
  }

  ngOnInit(): void {
    this.loadOrderDetails();
  }

  loadOrderDetails()
  {
    this.profileService.getOrderDetails().subscribe(data => this.orderData = data,
      err => console.log(err));
  }

}
