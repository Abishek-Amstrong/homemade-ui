import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { User } from './modules/shared/models/user';

import { AuthService } from './modules/shared/services/auth.service';
import { CartService } from './modules/shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Homemade-UI';
  isShow: boolean = false;
  layer_is_visible: boolean = false;
  is_show_normal: boolean = false;
  is_navToTop_visible: boolean = false;
  isLoggedIn: boolean;
  isHideHeader: boolean;
  headerSubscription: any;
  user: any;
  cartItemCount: Number = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.isLoggedIn = false;
    this.isHideHeader = false;
    this.headerSubscription = this.authService.hideHeaderStatusChange.subscribe(
      (val) => {
        this.isHideHeader = val;
      }
    );
  }

  ngOnInit() {
    this.authService.user.subscribe((x) => {
      this.user = x;
      if(x)
      {
        this.cartService.getCartItemCount().subscribe((val) => {
          console.log('Inside subscription : ' + val);
          this.cartItemCount = val;
        });
        this.cartService.getCartCountAPIResp();
      }
    });
  }

  @HostListener('window:scroll', []) onScroll(): void {
    let pxShow = 800; // height on which the button will show
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop >= pxShow
    ) {
      this.is_navToTop_visible = true;
    } else {
      this.is_navToTop_visible = false;
    }
  }

  enableSandwichMenu() {
    this.isShow = this.isShow == true ? false : true;
    this.layer_is_visible = this.layer_is_visible == true ? false : true;
  }

  expandCollapseSandwichSubMenu() {
    this.is_show_normal = this.is_show_normal == true ? false : true;
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  setLocation(city: String) {
    this.authService.userLocation = city;
    return false;
  }
}
