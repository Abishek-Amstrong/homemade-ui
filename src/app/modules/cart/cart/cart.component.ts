import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userCart : any;
  error : any;
  constructor(private cartService : CartService) {
   }

  ngOnInit(): void {
    this.loadUserCart();
  }

  loadUserCart()
  {
    this.cartService.getProductsInUserCart().subscribe(
      data => this.userCart = data,
      error => this.error = error
      );
  }

}
