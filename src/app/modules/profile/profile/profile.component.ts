import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import {Router} from '@angular/router';

import { ProfileService } from '../../shared/services/profile.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userName : String;
  isHideMenu : boolean;
  statusSubscription: any;

  constructor(private profileService : ProfileService,private router : Router) { 
    this.userName = "Amit";
    this.isHideMenu = false;
    this.statusSubscription = this.profileService.hideMenuStatusChange.subscribe((val)=>{
      this.isHideMenu = val;
    });
  }

  ngOnInit(): void {
  }

  // navigateAddrBook(): boolean
  // {
  //   this.router.navigateByUrl('/profile/addressbook');
  //   return false;
  // }

  ngOnDestroy() : void
  {
    this.statusSubscription.unsubscribe();
  }

}
