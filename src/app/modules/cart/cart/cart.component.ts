import { Component, OnInit  } from '@angular/core';
import {Router} from '@angular/router';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userCart : any;
  subTotal : number;
  subTotalWthDiscount : number;
  discount : number;
  total : number;
  deliveryCost : number;
  error : any;
  constructor(private cartService : CartService, private router : Router) {
    this.subTotal = 0;
    this.subTotalWthDiscount = 0;
    this.discount = 0;
    this.total = 0;
    this.deliveryCost = 0;
   }

  ngOnInit(): void {
    this.loadUserCart();
    this.calculateTotal();
  }

    //The below methods are common between cart and checkout and can be refactored into a service after we get API

  loadUserCart()
  {
    this.cartService.getProductsInUserCart().subscribe(
      data => this.userCart = data,
      error => this.error = error
      );
  }

  incProdQuantity(productId : number)
  {
    for(let prod of this.userCart)
    {
      if(prod.ProductId == productId)
      {
        prod.Quantity += 1;
        this.calculateTotal();
      }
    }
  }

  decProdQuantity(productId : number)
  {
    for(let prod of this.userCart)
    {
      if(prod.ProductId == productId && prod.Quantity > 1)
      {
        prod.Quantity -= 1;
        this.calculateTotal();
      }
    }
  }

  calculateTotal()
  {
    this.subTotal = 0;
    for(let prod of this.userCart)
    {
      this.subTotal += (prod.Quantity * prod.Price)
    }
    this.discount = this.checkDiscount();
    this.subTotalWthDiscount = this.subTotal - Math.floor(this.subTotal * (this.discount/100));
    this.deliveryCost = this.checkDeliveryCost();
    this.total =  this.subTotalWthDiscount + this.deliveryCost;
  }

  checkDiscount() : number
  {
      if(this.subTotal > 200)
      {
        return 20;
      }
      else
      {
        return 2;
      }
  }

  checkDeliveryCost() : number
  {
    let totalProd : number = 0;
    for(let prod of this.userCart)
    {
      totalProd += (prod.Quantity);
    }
    if(totalProd > 10)
    {
      return 100;
    }
    else
    {
      return 50;
    }
  }

  updateProductsInCart()
  {
    // this.cartService.UpdateProductsInUserCart(this.userCart).subscribe(data=>console.log(data),
    // err=>console.log(err));
    this.router.navigateByUrl('/cart/checkout');
    return false;
  }

  delProductInCart(productId : number)
  {
      //this.cartService.deleteProductInCart(productId).subscribe(data=>console.log(data),
      // err=>console.log(err));
      this.userCart = this.userCart.filter((item: any) => item.ProductId != productId);
      this.calculateTotal();
      return false;
  }
}
