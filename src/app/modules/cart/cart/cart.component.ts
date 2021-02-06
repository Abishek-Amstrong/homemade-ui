import { BoundElementProperty } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { handleError } from '../../shared/helpers/error-handler';

import { CartService } from '../../shared/services/cart.service';

export interface Item {
  ItemImageUrl: string;
  ItemName: string;
  ItemQuantity: number;
  ItemPrice: number;
  ItemUpdated: boolean;
  ItemCartId: string;
  ItemItemId: string;
  ItemUserId: string;
  ItemVendorId : string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  userCart: Item[];
  subTotal: number;
  subTotalWthDiscount: number;
  discount: number;
  total: number;
  deliveryCost: number;
  error: any;
  isSelfDestroy : boolean;

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.subTotal = 0;
    this.subTotalWthDiscount = 0;
    this.discount = 0;
    this.total = 0;
    this.deliveryCost = 0;
    this.userCart = [];
    this.isSelfDestroy = false;
  }

  ngOnInit(): void {
    this.loadUserCart();
    this.isSelfDestroy = false;
  }

  loadUserCart() {
    this.userCart = [];
    this.cartService.getProductsInUserCart().subscribe((response: any) => {
      // console.log(JSON.stringify(response));
      if (response == null || response == undefined || response.length == 0) {
        this.toastr.success('Cart is Empty',"Success!!");
      } 
      else 
      {
        for (let item of response) 
        {
          item.details = JSON.parse(item.details);

          if (item.details && item.details.length > 0) 
          {
            for (let product of item.details) 
            {
              let currItem: Item = {
                ItemImageUrl: product.imgUrl,
                ItemName: product.Name,
                ItemQuantity: Number(product.quantity),
                ItemPrice: Number(product.Price),
                ItemUpdated: false,
                ItemCartId: item.cartId,
                ItemItemId: product.itemId,
                ItemUserId: item.userUserId,
                ItemVendorId : product.vendorId
              };
              // console.log(JSON.stringify(currItem));
              this.userCart.push(currItem);
            }
          }
        }
        this.calculateTotal();
      }
    });
  }

  incProdQuantity(cartId: string, itemId: string) {
    for (let item of this.userCart) {
      if (item.ItemCartId == cartId && item.ItemItemId == itemId) {
        item.ItemQuantity += 1;
        item.ItemUpdated = true;
        this.calculateTotal();
      }
    }
  }

  decProdQuantity(cartId: string, itemId: string) {
    for (let item of this.userCart) {
      if (
        item.ItemCartId == cartId &&
        item.ItemItemId == itemId &&
        item.ItemQuantity > 1
      ) {
        item.ItemQuantity -= 1;
        item.ItemUpdated = true;
        this.calculateTotal();
      }
    }
  }

  calculateTotal() {
    this.subTotal = 0;
    for (let currItem of this.userCart) {
      this.subTotal += currItem.ItemQuantity * currItem.ItemPrice;
    }
    this.discount = 0; //this.checkDiscount();
    this.subTotalWthDiscount =
      this.subTotal - Math.floor(this.subTotal * (this.discount / 100));
    this.deliveryCost = this.checkDeliveryCost();
    this.total = this.subTotalWthDiscount + this.deliveryCost;
  }

  checkDiscount(): number {
    if (this.subTotal > 200) {
      return 20;
    } else {
      return 0;
    }
  }

  checkDeliveryCost(): number {
    let totalProd: number = 0;
    for (let currItem of this.userCart) {
      totalProd += currItem.ItemQuantity;
    }
    if (totalProd > 10) {
      return 10;
    } else if (totalProd > 2) {
      return 5;
    } else {
      return 0;
    }
  }

  updateProductsInCart(ischeckout : boolean) {

    if(!this.isSameVendor() && ischeckout)
    {
      this.toastr.error('Please checkout items from one vendor', 'Error!!');
      return false;
    }

    let updatedCarts = new Map<string, number>();
    for (let item of this.userCart) {
      if (item.ItemUpdated && !updatedCarts.has(item.ItemCartId)) {
        updatedCarts.set(item.ItemCartId, 0);
      }
    }
    if (updatedCarts.size > 0) {
      this.cartService
        .UpdateProductsInUserCart(this.userCart, updatedCarts)
        .subscribe(
          (resp: any) => {
            //console.log(resp);
            this.toastr.success('Changes are Saved', 'Success!!');
            if(ischeckout){ this.router.navigateByUrl('/cart/checkout'); this.isSelfDestroy = true; }
          },
          (err) => {
            handleError(err);
          }
        );
    } 
    else if (this.userCart.length == 0 && ischeckout) {
      this.toastr.error('Cart is Empty', 'Error!!');
    } 
    else {
      if(ischeckout){ this.router.navigateByUrl('/cart/checkout'); this.isSelfDestroy = true; }
    }

    return false;
  }

  delProductInCart(cartId: string) {
    this.cartService.deleteProductInCart(cartId).subscribe((data) => {
      this.toastr.success('Item removed from cart', 'Success!!');
      this.cartService.getCartCountAPIResp();
      this.userCart = this.userCart.filter(
        (item: any) => item.ItemCartId != cartId
      );
      this.calculateTotal();
    });
    return false;
  }

  deleteItemInCart(cartId: string, ItemId : string)
  {
    //update the changed products before deleting, so that while reload they aren't lost

    let updatedCarts = new Map<string, number>();
    for (let item of this.userCart) {
      if (item.ItemUpdated && !updatedCarts.has(item.ItemCartId)) {
        updatedCarts.set(item.ItemCartId, 0);
      }
    }
    if (updatedCarts.size > 0) {
      this.cartService
        .UpdateProductsInUserCart(this.userCart, updatedCarts)
        .subscribe(
          (resp: any) => {
            //console.log(resp);
            //items are updated..proceed with delete and reload
            this.cartService.deleteItemInCart(cartId,ItemId).subscribe((data) => {
              this.loadUserCart();
              this.toastr.success('Item removed from cart', 'Success!!');
            },(err)=>{
              handleError(err);
            });
          },
          (err) => {
            handleError(err);
          }
        );
    } 
    else
    {
      //there are no items to update..proceed with delete and reload
      this.cartService.deleteItemInCart(cartId,ItemId).subscribe((data) => {
        this.loadUserCart();
        this.toastr.success('Item removed from cart', 'Success!!');
      },(err)=>{
        handleError(err);
      });
    }

    return false;
  }

  isSameVendor() : boolean
  {
    let vendorIDS = new Map<string, number>();
    for(let item of this.userCart)
    {
      vendorIDS.set(item.ItemVendorId,1);
      if(vendorIDS.size > 1)
      {
        // console.log(vendorIDS);
        return false;
      }
    }
    return true;
  }

  ngOnDestroy()
  {
    if(!this.isSelfDestroy)
    this.updateProductsInCart(false);
  }
}
