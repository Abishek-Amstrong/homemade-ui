import { Component, OnInit } from '@angular/core';
import { User } from './modules/shared/models/user';
import { AuthService } from './modules/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Homemade-UI';
  public isShow: boolean = false;
  public layer_is_visible: boolean = false;
  public is_show_normal: boolean = false;
  isLoggedIn: boolean;
  user: User;

  constructor(private authService: AuthService) {
    this.isLoggedIn = false;
    this.user = new User('', '', '');
  }

  ngOnInit() {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  enableSandwichMenu() {
    this.isShow = this.isShow == true ? false : true;
    this.layer_is_visible = this.layer_is_visible == true ? false : true;
  }

  expandCollapseSandwichSubMenu() {
    this.is_show_normal = this.is_show_normal == true ? false : true;
  }
}
