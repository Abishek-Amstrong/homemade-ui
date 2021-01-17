import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service'

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private profileService : ProfileService) { 
    this.profileService.setMobileMenuDisplayStatus(true);
  }

  ngOnInit(): void {
  }

}
