import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit  } from '@angular/core';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CartService } from '../../shared/services/cart.service';


export interface Item
{
  ItemImageUrl : string,
  ItemName : string,
  ItemQuantity : number,
  ItemPrice : number,
  ItemUpdated : boolean,
  ItemCartId : string,
  ItemItemId : string,
  ItemUserId : string
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  userCart : Item[];
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
        console.log(JSON.stringify(response));
        if(response == null || response == undefined || response.length == 0)
        {
          this.userCart = [];
          //this.toastr.success('Cart is Empty',"Success!!");
        }
        else
        {
          for(let item of response)
          {
            item.details = JSON.parse(item.details);
            if(item.details && item.details.length > 0)
            {
              for(let product of item.details)
              {
                let currItem : Item = {
                  ItemImageUrl : product.imgUrl,
                  ItemName : product.Name,
                  ItemQuantity : Number(product.quantity),
                  ItemPrice : Number(product.Price),
                  ItemUpdated : false,
                  ItemCartId : item.cartId,
                  ItemItemId : product.itemId,
                  ItemUserId : item.userUserId
                };
                this.userCart.push(currItem);
              }
            }
          }
          this.calculateTotal();
          //console.log(this.userCart);
          // this.cartService.getItemDetailsInBulk(this.userCart).subscribe((items:any) => {
          //   for(let item of this.userCart)
          //   {
          //     for(let itemDetail of items)
          //     {
          //       if(item.ItemItemId != null && item.ItemItemId == itemDetail.itemId)
          //       {
          //         item.ItemImageUrl = itemDetail.imagePath;
          //         item.ItemName = itemDetail.itemname;
          //         item.ItemPrice = Number(itemDetail.price);
          //       }
          //     }
          //   }
          //   this.calculateTotal();
          // });
        }
      });
  }

  incProdQuantity(cartId : string, itemId : string, quantity : number)
  {
    for(let item of this.userCart)
    {
      if(item.ItemCartId == cartId && item.ItemItemId == itemId)
      {
        item.ItemQuantity += 1;
        item.ItemUpdated = true;
        this.calculateTotal();
      }
    }
  }

  decProdQuantity(cartId : string, itemId : string, quantity : number)
  {
    for(let item of this.userCart)
    {
      if(item.ItemCartId == cartId && item.ItemItemId == itemId && item.ItemQuantity > 1)
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
    this.discount =0;//this.checkDiscount();
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
        return 0;
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
      return 10;
    }
    else if(totalProd > 2)
    {
      return 5;
    }
    else
    {
      return 0;
    }
  }

  updateProductsInCart()
  {
    let updatedCarts = new Map<string,number>();
    for(let item of this.userCart)
    {
      if(item.ItemUpdated && !updatedCarts.has(item.ItemCartId))
      {
        updatedCarts.set(item.ItemCartId,0);
      }
    }
    if(updatedCarts.size > 0)
    {
      this.cartService.UpdateProductsInUserCart(this.userCart,updatedCarts).subscribe(
        (resp:any)=>{
          //console.log(resp);
          this.toastr.success('Changes are Saved',"Success!!");
          this.router.navigateByUrl('/cart/checkout');
        },
        err =>{
          //console.log(err);
        });
    }
    else if(this.userCart.length == 0)
    {
      this.toastr.error('Cart is Empty',"Error!!");
    }
    else
    {
      this.router.navigateByUrl('/cart/checkout');
    }

    return false;
  }

  delProductInCart(cartId : string)
  {
      this.cartService.deleteProductInCart(cartId).subscribe(
        data=>{
          this.toastr.success('Item removed from cart',"Success!!");
          this.cartService.getCartCountAPIResp();
          this.userCart = this.userCart.filter((item: any) => item.ItemCartId != cartId);
          this.calculateTotal();
        }
      );
      return false;
  }
}
