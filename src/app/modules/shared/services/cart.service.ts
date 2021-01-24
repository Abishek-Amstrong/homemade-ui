import { stringify } from '@angular/compiler/src/util';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private authService : AuthService
              ) { }

  getProductsInUserCart() : Observable<any>
  {
    let userId = this.authService.getUserId();
    let userCartItems : any;
    return this.http.get(`${environment.apiUrl}/usercart/${userId}`).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getItemDetailsInBulk(cartItems : any) : Observable<any[]>
  {
    let obsArr = [];
    for(let item of cartItems)
    {
      if(item.ItemItemId != null)
      obsArr.push(this.http.get(`${environment.apiUrl}/itemdetails/${item.ItemItemId}`));
    }
    return forkJoin(obsArr).pipe(
      catchError(err => this.handleError(err))
    );
  }

  UpdateProductsInUserCart(updatedCartProducts : any) : Observable<any>
  {
    const options  = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.put(`${environment.apiUrl}/updatecart`,updatedCartProducts,{headers : options}).pipe(
      catchError(err => this.handleError(err))
    )
  }

  UpdateCartProductQty(cartId : string, quantity : number){
    const options  = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.put(`${environment.apiUrl}/updatecart`,{cartId,quantity},{headers : options}).pipe(
      catchError(err => this.handleError(err))
    );
  }

  deleteProductInCart(cartId : string) : Observable<any>
  {
    return this.http.delete(`${environment.apiUrl}/usercartdelete/${cartId}`,{responseType: 'text'}).pipe(
      catchError(err => this.handleError(err))
      );
  }

  placeCustomerOrder(deliveryAddress : any, cartItems : any, totalPrice : number) :Observable<any>
  {
    let itemList :{ ItemId :  String,ItemCartId : String,Name : String,
      quantity : Number,Price : Number}[] = [];

    let orderData = {
      userId : this.authService.getUserId(),
      TotalPrice : totalPrice,
      itemList : itemList,
      Address : 
      {
        fullName: deliveryAddress.fullName,
        address : deliveryAddress.address,
        city : deliveryAddress.city,
        state : deliveryAddress.state,
        pinCode : deliveryAddress.pinCode,
        location : deliveryAddress.deliveryLocation
      },
      deliveryType : deliveryAddress.deliveryType,
      deliveryDay : deliveryAddress.deliveryDay,
      deliveryTime : deliveryAddress.deliveryTime
    };

    for(let item of cartItems)
    {
      orderData.itemList.push({
        ItemId : item.ItemItemId,
        ItemCartId : item.ItemCartId,
        Name : item.ItemName,
        quantity : item.ItemQuantity,
        Price : item.ItemPrice
      });
    }
    const options  = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(`${environment.apiUrl}/customerorder`,orderData,{headers : options}).pipe(
      catchError(err => this.handleError(err))
    );
  }

  addDeliveryAddress(deliveryData : any) //: Observable<any>
  {
      // const options  = new HttpHeaders({'Content-Type':'application/json'});
      // return this.http.post(`${environment.apiUrl}/Cart/DeliveryAddress`,deliveryData,{headers : options}).pipe(
      //   catchError(err => this.handleError(err))
      // )

      //Sample Json for Post:
      // address: "Tambaram"
      // city: "Chennai"
      // deliveryDay: "Tomorrow"
      // deliveryLocation: "Chennai"
      // deliveryTime: "08.00"
      // deliveryType: "now"
      // fullName: "Venkat"
      // pinCode: "631745"
      // state: "Sikkim"
  }

  addItemsTocart(itemId : String, quantity : number) : Observable<any>
  {
    const options  = new HttpHeaders({'Content-Type':'application/json'});
    let userId =this.authService.getUserId();
    return this.http.post(`${environment.apiUrl}/addtocart`,{itemId,userId,quantity},{headers : options}).pipe(
      catchError(err => this.handleError(err))
    );
  }

  handleError(errorObj: HttpErrorResponse) : Observable<any> {
    console.log(errorObj);
    let errorMsg : any;
    if (typeof errorObj.error === 'string') {
      errorMsg = errorObj.error;
      this.toastr.error(errorObj.error,'Error');
    } else if (typeof errorObj.error === 'object') {
      if ('errors' in errorObj.error) {
        errorMsg = errorObj.error.errors[0].message;
        this.toastr.error(errorMsg,'Error');
      } 
      else {
        errorMsg = errorObj.error.name;
        this.toastr.error(errorObj.error.name,'Error');
      }
    } else {
      errorMsg = errorObj.message;
      this.toastr.error(errorObj.message,'Error');
    }
    return throwError(errorMsg);
  }
}
