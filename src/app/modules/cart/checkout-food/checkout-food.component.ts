import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms'
import { CartService } from '../../shared/services/cart.service';

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

  constructor(private formBuilder : FormBuilder,private cartService : CartService) { 
    this.deliveryForm = new FormGroup({});
    this.selectedDay = '';
    this.disableDateTime = false;
    this.selectedTime = '';
  }

  ngOnInit(): void {
    this.deliveryForm = this.formBuilder.group({
      deliveryLocation : ['',Validators.required],
      deliveryType : ['',Validators.required],
      deliveryDay : ['',Validators.required],
      deliveryTime : ['',Validators.required],
      fullName : ['',Validators.required],
      address : ['',Validators.required],
      city : ['',Validators.required],
      state : ['',Validators.required],
      pinCode : ['',Validators.required]
    });
    this.onDeliveryFormValueChanges();
    this.deliveryType?.setValue('now')
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

  onDeliveryFormValueChanges()
  {
    this.deliveryDay!.valueChanges.subscribe(value => {
      this.selectedDay = value;
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
      console.log(this.deliveryForm.value)
      // this.cartService.postDeliveryAddress(this.deliveryForm.value)
      // .subscribe(
      //   data => console.log(data),
      //   error => console.log(error)
      // );
    }
    else
    {
      Object.keys(this.deliveryForm.controls).forEach(key => {
        this.deliveryForm.get(key)?.markAsDirty();
      });
      return;
    }
  }

}
