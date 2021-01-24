import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../shared/services/cart.service';

export interface Order{
  OrderQuantity : number,
  OrderSize : String[],
  OrderItemName : String,
  OrderIngredients : {
    value : String,
    checked :boolean
  }[],
  OrderItemId : String,
  OrderUserId: String
}

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})

export class PlaceOrderComponent implements OnInit {
  orderData : Order;
  selectedSize : string;

  constructor(
    public dialogRef: MatDialogRef<PlaceOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private cartService : CartService) {
    this.orderData = data.data; 
    this.selectedSize = '';
  }

  ngOnInit(): void {
    this.loadOrderForm(this.data.data);
  }

  loadOrderForm(data : any)
  {
    this.orderData.OrderItemId = data.ItemItemId;
    this.orderData.OrderItemName = data.itemname;
    this.orderData.OrderIngredients = [];
    for(let str of data.ItemIngrediants)
    {
      this.orderData.OrderIngredients.push({value : str, checked : false});
    }
    this.orderData.OrderQuantity = 1;
    this.orderData.OrderSize = ['Medium','Large','Extra Large'];
    console.log(this.orderData.OrderIngredients);
  }

  incOrderQuantity()
  {
    this.orderData.OrderQuantity += 1;
  }

  decOrderQuantity()
  {
    if(this.orderData.OrderQuantity > 1)
    {
      this.orderData.OrderQuantity -= 1;
    }
  }

  addToCart()
  {
    // console.log(this.selectedSize);
    // console.log(this.orderData.OrderIngredients.filter((ele)=>ele.checked == true));
    this.cartService.addItemsTocart(this.orderData.OrderItemId,this.orderData.OrderQuantity).subscribe(
      (resp : any) => {
        this.toastr.success('Item is added to cart','Success!!');
        this.dialogRef.close()
      }
    );
    return false;
  }
}
