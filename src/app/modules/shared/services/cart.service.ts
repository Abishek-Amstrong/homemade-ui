import { stringify } from '@angular/compiler/src/util';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  forkJoin,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemCountChange: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  cartCount: Number = 0;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  getProductsInUserCart(): Observable<any> {
    let userId = this.authService.getUserId();
    let userCartItems: any;
    return this.http
      .get(`${environment.apiUrl}/usercart/${userId}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getItemDetails(itemId: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/itemdetails/${itemId}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getItemDetailsInBulk(cartItems: any): Observable<any[]> {
    let obsArr = [];
    for (let item of cartItems) {
      if (item.ItemItemId != null)
        obsArr.push(
          this.http.get(`${environment.apiUrl}/itemdetails/${item.ItemItemId}`)
        );
    }
    return forkJoin(obsArr).pipe(catchError((err) => this.handleError(err)));
  }

  getCartItemCount(): Observable<Number> {
    return this.cartItemCountChange.asObservable();
  }

  getCartCountAPIResp() {
    let userId = this.authService.getUserId();
    this.http.get(`${environment.apiUrl}/countitemincart/${userId}`).subscribe(
      (resp: any) => {
        //console.log('Resp from service : ' + resp);
        this.cartItemCountChange.next(Number(resp));
      },
      (err: any) => {
        this.handleError(err);
      }
    );
  }

  UpdateProductsInUserCart(cartProducts: any, updatedCarts : Map<string,number>): Observable<any> {

    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    let updatedProd : Map<string,{ itemId: string,Name: string,quantity: number,Price: number,imgUrl: string}[]>  =  new Map();

    for (let item of cartProducts) 
    {
      if(updatedCarts.has(item.ItemCartId))
      {
        let val : { itemId: string,Name: string,quantity: number,Price: number,imgUrl: string}[] = [];
        if(updatedProd.has(item.ItemCartId))
        {
          val = updatedProd.get(item.ItemCartId)!;

        }
        val?.push({
          itemId: item.ItemItemId,
          Name: item.ItemName,
          quantity: item.ItemQuantity,
          Price: item.ItemPrice,
          imgUrl: item.ItemImageUrl,
        });
        updatedProd.set(item.ItemCartId,val);
      }
    }

    let bodyJson: { cartId: String, details: { itemId: string, Name: String, quantity: Number, Price: Number, imgUrl: String }[] }[] = [];

    updatedProd.forEach((value, key) => {  
      bodyJson.push({
        cartId : key,
        details : value
      });
    }); 
    // console.log(JSON.stringify(bodyJson));
    return this.http.put(`${environment.apiUrl}/updatecart`, { cartdata : bodyJson },{ headers: options, responseType: 'text' })
      .pipe(catchError((err) => this.handleError(err)));
  }

  // UpdateCartProductQty(updatedCartItems : any){
  //   const options  = new HttpHeaders({'Content-Type':'application/json'});
  //   console.log(JSON.stringify(updatedCartItems));
  //   return this.http.put(`${environment.apiUrl}/updatecart`,updatedCartItems,{headers : options}).pipe(
  //     catchError(err => this.handleError(err))
  //   );
  // }

  deleteProductInCart(cartId: string): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/usercartdelete/${cartId}`, {
        responseType: 'text',
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  placeCustomerOrder(
    deliveryAddress: any,
    cartItems: any,
    totalPrice: number
  ): Observable<any> {
    let itemList: {
      ItemId: String;
      ItemCartId: String;
      Name: String;
      quantity: Number;
      Price: Number;
    }[] = [];

    let deliverydate = new Date();
    let deliveryTime = deliveryAddress.deliveryTime + ':00';

    // console.log('dt : ' + deliveryTime);

    if(deliveryAddress.deliveryDay == 'Tomorrow')
    {
      deliverydate.setDate(deliverydate.getDate() + 1);
    }
    else if(deliveryAddress.deliveryDay == 'AfterTomorrow')
    {
      deliverydate.setDate(deliverydate.getDate() + 2);
    }
    else if(deliveryAddress.deliveryDay == 'Overmorrow')
    {
      deliverydate.setDate(deliverydate.getDate() + 3);
    }

    let year = deliverydate.getFullYear();
    let month = deliverydate.getMonth() + 1; // Jan is 0, dec is 11
    let day = deliverydate.getDate();
    let dateString = '' + year + '-' + ('00' + month).slice(-2) + '-' + ('00' + day).slice(-2);

    let orderData = {
      userId: this.authService.getUserId(),
      TotalPrice: totalPrice,
      itemList: itemList,
      Address: {
        fullName: deliveryAddress.fullName,
        address: deliveryAddress.address,
        city: deliveryAddress.city,
        state: deliveryAddress.state,
        pinCode: deliveryAddress.pinCode,
        location: deliveryAddress.deliveryLocation,
      },
      deliveryType: deliveryAddress.deliveryType,
      deliveryDate : dateString + 'T' + deliveryTime,
      deliveryDay: deliveryAddress.deliveryDay,
      deliveryTime: deliveryAddress.deliveryTime,
    };

    for (let item of cartItems) {
      orderData.itemList.push({
        ItemId: item.ItemItemId,
        ItemCartId: item.ItemCartId,
        Name: item.ItemName,
        quantity: item.ItemQuantity,
        Price: item.ItemPrice,
      });
    }
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(JSON.stringify(orderData));
    return this.http
      .post(`${environment.apiUrl}/customerorder`, orderData, {
        headers: options,
        responseType: 'text',
      })
      .pipe(
        tap((resp) => {
          this.getCartItemCount();
        }),
        catchError((err) => this.handleError(err))
      );
  }

  addDeliveryAddress(
    deliveryData: any //: Observable<any>
  ) {
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

  addItemsTocart(item: any): Observable<any> {

    let cartItems: {
      itemId: string;
      Name: string;
      quantity: Number;
      Price: Number;
      imgUrl: string;
    }[] = [];

    //push the initial ordered item into array
    cartItems.push({
      itemId: item.OrderItemId,
      Name: item.OrderItemName,
      quantity: item.OrderQuantity,
      Price: item.OrderPrice,
      imgUrl: item.OrderItemImgUrl,
    });

    //push the other similar items selected into array
    if(item.OrderSimilarProducts && item.OrderSimilarProducts.length > 0)
    {
      for (let product of item.OrderSimilarProducts)
      {
        if(product.ItemChecked)
        {
          cartItems.push({
            itemId: product.ItemItemId,
            Name: product.ItemName,
            quantity: product.ItemQuantity,
            Price: product.ItemPrice,
            imgUrl: product.ItemImageUrl,
          });
        }
      }
    }

    //do a put api request to add the items to cart
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    let userId = this.authService.getUserId();
    let bodyJson = { details: cartItems, userId: userId };
    console.log(JSON.stringify(bodyJson));
    return this.http
      .post(`${environment.apiUrl}/addtocart`, bodyJson, { headers: options })
      .pipe(
        tap((resp) => {
          this.getCartCountAPIResp();
        }),
        catchError((err) => this.handleError(err))
      );
  }

  getRecentOrderedItems(): Observable<any> {
    let userId = this.authService.getUserId();
    return this.http
      .get(`${environment.apiUrl}/recentorderapi/${userId}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  handleError(errorObj: HttpErrorResponse): Observable<any> {
    console.log(errorObj);
    let errorMsg: any;
    if (typeof errorObj.error === 'string') {
      errorMsg = errorObj.error;
      this.toastr.error(errorObj.error, 'Error');
    } else if (typeof errorObj.error === 'object') {
      if ('errors' in errorObj.error) {
        errorMsg = errorObj.error.errors[0].message;
        this.toastr.error(errorMsg, 'Error');
      } else {
        errorMsg = errorObj.error.name;
        this.toastr.error(errorObj.error.name, 'Error');
      }
    } else {
      errorMsg = errorObj.message;
      this.toastr.error(errorObj.message, 'Error');
    }
    return throwError(errorMsg);
  }
}
