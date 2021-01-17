import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service'

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {

  constructor(private profileService : ProfileService) {
    this.profileService.setMobileMenuDisplayStatus(true);
  }

  ngOnInit(): void {
  }

}
