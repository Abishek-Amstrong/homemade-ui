import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit  } from '@angular/core';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '../../shared/services/cart.service';


export interface cartItem
{
  ItemImageUrl : string,
  ItemName : string,
  ItemQuantity : number,
  ItemPrice : number,
  ItemUpdated : boolean,
  ItemCartId : string,
  ItemItemId : String,
  ItemUserId : string
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  userCart : cartItem[];
  subTotal : number;
  subTotalWthDiscount : number;
  discount : number;
  total : number;
  deliveryCost : number;
  error : any;
  constructor(private cartService : CartService, 
              private router : Router,
              private toastr: ToastrService) {
    this.subTotal = 0;
    this.subTotalWthDiscount = 0;
    this.discount = 0;
    this.total = 0;
    this.deliveryCost = 0;
    this.userCart = [];
   }

  ngOnInit(): void {
    this.loadUserCart();
  }

  loadUserCart()
  {
    this.cartService.getProductsInUserCart().subscribe(
      (response : any) => {
        if(response == null || response == undefined || response.length == 0)
        {
          this.userCart = [];
          this.toastr.success('Cart is Empty',"Success!!");
        }
        else
        {
          for(let item of response)
          {
            if(item.itemItemId != null && item.itemItemId != '')
            {
              let currItem : cartItem = {
                ItemImageUrl : '',
                ItemName : '',
                ItemQuantity : Number(item.quantity),
                ItemPrice : 0,
                ItemUpdated : false,
                ItemCartId : item.cartId,
                ItemItemId : item.itemItemId,
                ItemUserId : item.userUserId
              };
              this.userCart.push(currItem);
            }
          }
          this.cartService.getItemDetailsInBulk(this.userCart).subscribe((items:any) => {
            for(let item of this.userCart)
            {
              for(let itemDetail of items)
              {
                if(item.ItemItemId != null && item.ItemItemId == itemDetail.itemId)
                {
                  item.ItemImageUrl = itemDetail.imagePath;
                  item.ItemName = itemDetail.itemname;
                  item.ItemPrice = Number(itemDetail.price);
                }
              }
            }
            this.calculateTotal();
          });
        }
      });
  }

  incProdQuantity(cartId : string, quantity : number)
  {
    for(let item of this.userCart)
    {
      if(item.ItemCartId == cartId)
      {
        item.ItemQuantity += 1;
        item.ItemUpdated = true;
        this.calculateTotal();
      }
    }
  }

  decProdQuantity(cartId : string, quantity : number)
  {
    for(let item of this.userCart)
    {
      if(item.ItemCartId == cartId && item.ItemQuantity > 1)
      {
        item.ItemQuantity -= 1;
        item.ItemUpdated = true;
        this.calculateTotal();
      }
    }
  }

  calculateTotal()
  {
    this.subTotal = 0;
    for(let currItem of this.userCart)
    {
      this.subTotal += (currItem.ItemQuantity * currItem.ItemPrice)
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
    for(let currItem of this.userCart)
    {
      totalProd += (currItem.ItemQuantity);
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
    let updateProducts : {cartId : String,quantity : Number}[] = [];
    for(let item of this.userCart)
    {
      if(item.ItemUpdated)
      {
        updateProducts.push({cartId : item.ItemCartId,quantity : item.ItemQuantity});
      }
    }
    this.cartService.UpdateProductsInUserCart(updateProducts).subscribe(
      data=>{}
      );
    this.router.navigateByUrl('/cart/checkout');
    return false;
  }

  delProductInCart(cartId : string)
  {
      this.cartService.deleteProductInCart(cartId).subscribe(
        data=>{
          this.toastr.success('Item removed from cart',"Success!!");
          this.userCart = this.userCart.filter((item: any) => item.ItemCartId != cartId);
          this.calculateTotal();
        }
      );
      return false;
  }
}
