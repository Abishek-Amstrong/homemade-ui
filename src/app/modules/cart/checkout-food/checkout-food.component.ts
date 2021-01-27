import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,AbstractControl,ValidatorFn } from '@angular/forms'
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
  ItemItemId : String,
  ItemUserId : string
}

@Component({
  selector: 'app-checkout-food',
  templateUrl: './checkout-food.component.html',
  styleUrls: ['./checkout-food.component.scss']
})

export class CheckoutFoodComponent implements OnInit {
  displayOrderSummary : boolean = false;
  selectedDay : String;
  disableDateTime : boolean;
  deliveryForm : FormGroup;
  selectedTime : string;
  userCart : Item[];
  subTotal : number;
  subTotalWthDiscount : number;
  discount : number;
  total : number;
  deliveryCost : number;
  
  constructor(private formBuilder : FormBuilder,
              private toastr: ToastrService,
              private cartService : CartService) { 
    this.deliveryForm = new FormGroup({});
    this.selectedDay = '';
    this.disableDateTime = false;
    this.selectedTime = '';
    this.subTotal = 0;
    this.subTotalWthDiscount = 0;
    this.discount = 0;
    this.total = 0;
    this.deliveryCost = 0;
    this.userCart= [];
  }

  ngOnInit(): void {
    this.deliveryForm = this.formBuilder.group({
      deliveryLocation : ['',Validators.required],
      deliveryType : ['',Validators.required],
      deliveryDay : ['',Validators.required],
      deliveryTime : ['',[Validators.required,this.isTimeValid()]],
      fullName : ['',Validators.required],
      address : ['',Validators.required],
      city : ['',Validators.required],
      state : ['',Validators.required],
      pinCode : ['',Validators.required]
    });
    this.onDeliveryFormValueChanges();
    this.deliveryType?.setValue('now');
    this.loadUserCart();
    this.calculateTotal();
   }

  get deliveryLocation() { return this.deliveryForm.get('deliveryLocation'); }
  get deliveryType() { return this.deliveryForm.get('deliveryType'); }
  get deliveryDay() { return this.deliveryForm.get('deliveryDay'); }
  get deliveryTime() { return this.deliveryForm.get('deliveryTime'); }
  get fullName() { return this.deliveryForm.get('fullName'); }
  get address() { return this.deliveryForm.get('address'); }
  get city() { return this.deliveryForm.get('city'); }
  get state() { return this.deliveryForm.get('state'); }
  get pinCode() { return this.deliveryForm.get('pinCode'); }
  get today() {
    let date : Date= new Date();
    return date.getDate() + '/' + ('00' + (date.getMonth() + 1)).slice(-2) + '/'+date.getFullYear();
  }
  get time()
  {
    let date : Date= new Date();
    let hours : number = date.getHours();
    let minutes : number = date.getMinutes();
    let ampm : string = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let strTime : string = hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ' ' + ampm;
    return strTime;
  }

  onDeliveryFormValueChanges()
  {
    this.deliveryDay!.valueChanges.subscribe(value => {
      this.selectedDay = value;
      this.deliveryTime!.updateValueAndValidity();
    });
    this.deliveryType!.valueChanges.subscribe(value => {
      this.disableDateTime = value == 'now' ? true : false;
      if(this.disableDateTime)
      {
        this.deliveryDay!.setValue('Today');
        let currHour : string = this.getCurrHour();
        this.deliveryTime!.setValue(currHour);
      }
    });
    this.deliveryTime!.valueChanges.subscribe(value => {
      this.selectedTime = value;
    });
  }

  isTimeValid() : ValidatorFn {
      return (control : AbstractControl) : {[Key: string] : string} | null=> {
          let selectedTime = control.value.split('.');
          let hr = Number(selectedTime[0]);
          let min = Number(selectedTime[1]);
          let currHr = new Date().getHours();
          let currMin = new Date().getMinutes();
          if(this.deliveryDay?.value == 'Today')
          { 
            if((hr > currHr) || (hr == currHr && min > currMin))
            {
              return null;
            }
            else 
            {
              return {PastTime : control.value};
            }
          }
          return null;
      }
  }

  expandOrderSummary()
  {
    this.displayOrderSummary = this.displayOrderSummary == false ? true : false;
  }

  getCurrHour()
  {
    let currHour : number = new Date().getHours();
    let currMinute : number = new Date().getMinutes();
    let currHourMins : string = '';
    if(currHour <= 8 || (currHour == 9 && currMinute < 30))
    {
        if(currMinute < 30)
        {
          currMinute = 30;
        }
        else
        {
          currMinute = 0;
          currHour += 1;
        }
        if(currHour>=8)
        {
          currHourMins = ('00' + currHour).slice(-2) + '.' + ('00' + currMinute).slice(-2);
        }
        else
        {
          currHourMins = '08.00';
        }
    }
    else if((currHour >= 9 && currHour <=12 ) || (currHour == 13 && currMinute < 30))
    {
        if(currMinute < 30)
        {
          currMinute = 30;
        }
        else
        {
          currMinute = 0;
          currHour += 1;
        }
        if(currHour>=12)
        {
          currHourMins = ('00' + currHour).slice(-2) + '.' + ('00' + currMinute).slice(-2);
        }
        else
        {
          currHourMins = '12.00';
        }
    }
    else if((currHour >= 13 && currHour <= 20) || (currHour == 21 && currMinute < 30))
    {
      if(currMinute < 30)
      {
        currMinute = 30;
      }
      else
      {
        currMinute = 0;
        currHour += 1;
      }
      if(currHour>=20)
      {
        currHourMins = ('00' + currHour).slice(-2) + '.' + ('00' + currMinute).slice(-2);
      }
      else
      {
        currHourMins = '20.00';
      }
    }
    else
    {
      this.deliveryForm.get('deliveryDay')?.setValue('Tomorrow');
      currHourMins = '08.00';
    }
    return currHourMins;
  }

  onSubmit()
  {
    if(this.deliveryForm.valid)
    {
      this.cartService.placeCustomerOrder(this.deliveryForm.value, this.userCart, this.total).subscribe(
        (resp : any) => {
          this.toastr.success('Order is placed',"Success!!");
        }
      );
    }
    else
    {
      Object.keys(this.deliveryForm.controls).forEach(key => {
        this.deliveryForm.get(key)?.markAsDirty();
      });
      return;
    }
  }

  loadUserCart()
  {
    this.cartService.getProductsInUserCart().subscribe(
      (response : any) => {
        //console.log(response);
        if(response == null || response == undefined || response.length == 0)
        {
          this.userCart = [];
          this.toastr.success('Cart is Empty',"Success!!");
        }
        else
        {
          for(let item of response)
          {
            item.details = JSON.parse(item.details);
            if(item.details[0].itemId != null && item.details[0].itemId != '')
            {
              let currItem : Item = {
                ItemImageUrl : item.details[0].imgUrl,
                ItemName : item.details[0].Name,
                ItemQuantity : Number(item.details[0].quantity),
                ItemPrice : Number(item.details[0].Price),
                ItemUpdated : false,
                ItemCartId : item.cartId,
                ItemItemId : item.details[0].itemId,
                ItemUserId : item.userUserId
              };
              this.userCart.push(currItem);
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

  calculateTotal()
  {
    this.subTotal = 0;
    for(let prod of this.userCart)
    {
      this.subTotal += (prod.ItemQuantity * prod.ItemPrice)
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

}
