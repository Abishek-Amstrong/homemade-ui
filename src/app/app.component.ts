import {
  Component,
  OnInit,
  HostListener,
  Inject,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { User } from './modules/shared/models/user';

import { AuthService } from './modules/shared/services/auth.service';
import { CartService } from './modules/shared/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationComponent } from './modules/shared/modals/location/location.component';
import { concat, from, fromEvent, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { FoodService } from './modules/shared/services/food.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Homemade-UI';
  isShow: boolean = false;
  layer_is_visible: boolean = false;
  is_show_normal: boolean = false;
  is_navToTop_visible: boolean = false;
  isLoggedIn: boolean;
  isHideHeader: boolean;
  headerSubscription: any;
  user: any;
  cartItemCount: any = 0;
  filteredOptions: Observable<any> | null;
  filteredOptionsMobile: Observable<any> | null;
  searchVal: string;
  @ViewChild('searchInput', { static: true }) input: any;
  @ViewChild('searchInputOne', { static: true }) inputOne: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cartService: CartService,
    private authService: AuthService,
    private foodService: FoodService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.isLoggedIn = false;
    this.isHideHeader = false;
    this.filteredOptions = null;
    this.filteredOptionsMobile = null;
    this.searchVal = '';
    this.headerSubscription = this.authService.hideHeaderStatusChange.subscribe(
      (val) => {
        this.isHideHeader = val;
      }
    );
  }

  ngOnInit() {
    this.cartService.getCartItemCount().subscribe((val) => {
      //console.log('Inside subscription : ' + val);
      this.cartItemCount = val;
    });
    this.authService.user.subscribe((x) => {
      this.user = x;
      if (x != null) {
        this.cartService.getCartCountAPIResp();
      }
    });
    // this.cartService.getCartCountAPIResp();
    if (!sessionStorage.getItem('cartData')) {
      sessionStorage.setItem('cartData', JSON.stringify([]));
    }
  }

  ngAfterViewInit() {
    if ('nativeElement' in this.input && this.input.nativeElement) {
      const searchCodes$ = fromEvent<any>(
        this.input.nativeElement,
        'keyup'
      ).pipe(
        map((event) => event.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((search) => this.getItemByName(search))
      );

      const initialCodes$ = this.getItemByName();

      this.filteredOptions = concat(initialCodes$, searchCodes$);
    }

    if ('nativeElement' in this.inputOne && this.inputOne.nativeElement) {
      const searchItem$ = fromEvent<any>(
        this.inputOne.nativeElement,
        'keyup'
      ).pipe(
        map((event) => event.target.value),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((search) => this.getItemByName(search))
      );

      const initialItem$ = this.getItemByName();

      this.filteredOptionsMobile = concat(initialItem$, searchItem$);
    }
  }

  getItemByName(searchText = '') {
    return from(this.foodService.getItemByName(searchText));
  }

  navigateToCategory(category: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/', 'foods', 'category', category]));
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

  setLocation() {
    const addDialogRef = this.dialog.open(LocationComponent, {
      width: this.getBrowserWidth(),
      disableClose: true,
      maxWidth: '90vw',
    });
    addDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let city = 'delhi';
        this.authService.userLocation = city;
      }
    });
  }

  getBrowserWidth(): string {
    const innerWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
    if (innerWidth) {
      if (innerWidth < 340) {
        return Math.round((innerWidth * 95) / 100) + 'px';
      } else if (innerWidth < 640) {
        return Math.round((innerWidth * 95) / 100) + 'px';
      } else if (innerWidth < 768) {
        return Math.round((innerWidth * 80) / 100) + 'px';
      } else if (innerWidth < 1024) {
        return Math.round((innerWidth * 70) / 100) + 'px';
      } else if (innerWidth >= 1024) {
        return Math.round((innerWidth * 45) / 100) + 'px';
      }
    }
    return '80%';
  }

  navigateToDetailPage(event: any, option: any) {
    if (event.isUserInput) {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() =>
          this.router.navigate(['/', 'foods', 'detail', option.itemId])
        );
    }
  }
}
