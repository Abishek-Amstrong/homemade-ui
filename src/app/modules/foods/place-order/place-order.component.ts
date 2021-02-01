import {
  Component,
  OnInit,
  Inject,
  ɵɵtrustConstantResourceUrl,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../shared/services/cart.service';
import { FoodService } from '../../shared/services/food.service';

export interface Item {
  ItemImageUrl: string;
  ItemName: string;
  ItemPrice: number;
  ItemQuantity: number;
  ItemItemId: string;
  ItemChecked: boolean;
}

export interface Order {
  OrderQuantity: number;
  OrderSize: string[];
  OrderItemName: string;
  OrderSimilarProducts: Item[];
  OrderItemId: string;
  OrderUserId: string;
  OrderPrice: number;
  OrderVendorId: string;
  OrderItemImgUrl: string;
}

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  orderData: Order;
  selectedSize: string;

  constructor(
    public dialogRef: MatDialogRef<PlaceOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private foodService: FoodService,
    private cartService: CartService
  ) {
    this.orderData = data.data;
    this.selectedSize = '';
  }

  ngOnInit(): void {
    //console.log(this.data.data);
    this.loadOrderForm(this.data.data);
  }

  loadOrderForm(data: any) {
    this.cartService.getItemDetails(data.ItemItemId).subscribe((resp: any) => {
      //console.log(resp);

      this.orderData.OrderItemId = resp.itemId;
      this.orderData.OrderItemName = resp.itemname;
      // this.orderData.OrderIngredients = [];
      // if(resp.ingredients != null && resp.ingredients != undefined)
      // {
      //   if(typeof resp.ingredients == 'string')
      //   {
      //     this.orderData.OrderIngredients.push({value : resp.ingredients, checked : false});
      //   }
      //   else
      //   {
      //     for(let str of resp.ingredients)
      //     {
      //       this.orderData.OrderIngredients.push({value : str, checked : false});
      //     }
      //   }
      // }

      this.orderData.OrderQuantity = 1;
      this.orderData.OrderSize = resp.size;
      this.orderData.OrderPrice = resp.price;
      this.orderData.OrderItemImgUrl = resp.imagePath;
      //console.log( this.orderData);
    });
  }

  loadOtherChefProducts(vendorId: string) {
    this.foodService.getSimilarProducts(vendorId).subscribe((resp: any) => {
      //console.log(resp);
      this.orderData.OrderSimilarProducts = [];
      for (let item of resp) {
        let currItem: Item = {
          ItemImageUrl: item.imagePath,
          ItemName: item.itemname,
          ItemPrice: item.price,
          ItemItemId: item.itemId,
          ItemQuantity: 1,
          ItemChecked: false,
        };
        if (currItem.ItemItemId != this.orderData.OrderItemId)
          this.orderData.OrderSimilarProducts.push(currItem);
      }
    });
  }

  incOrderQuantity() {
    this.orderData.OrderQuantity += 1;
  }

  decOrderQuantity() {
    if (this.orderData.OrderQuantity > 1) {
      this.orderData.OrderQuantity -= 1;
    }
  }

  incSimProdQuantity(itemid: string) {
    this.orderData.OrderSimilarProducts.forEach((element) => {
      if (element.ItemItemId == itemid) {
        element.ItemQuantity += 1;
      }
    });
  }

  decSimProdQuantity(itemid: string) {
    this.orderData.OrderSimilarProducts.forEach((element) => {
      if (element.ItemItemId == itemid && element.ItemQuantity > 1) {
        element.ItemQuantity -= 1;
      }
    });
  }

  addToCart() {
    this.cartService.addItemsTocart(this.orderData).subscribe((resp: any) => {
      //console.log(resp);
      this.toastr.success('Item is added to cart', 'Success!!');
      this.dialogRef.close();
    });
    return false;
  }
}
