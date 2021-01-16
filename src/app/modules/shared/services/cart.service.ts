import { stringify } from '@angular/compiler/src/util';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getProductsInUserCart() : Observable<any>
  {
    let sampelObservable = new Observable((observer) => {
        let cartData = [{
          productId : 101,
          ProductImage :  '../../../../assets/images/thumb_detail_1.jpg',
          ProductName : 'Product Name Product Name Product Name Product Name',
          Price : 60,
          Quantity : 5
        },{
          productId : 102,
          ProductImage :  '../../../../assets/images/thumb_detail_1.jpg',
          ProductName : 'Product Name Product',
          Price : 20,
          Quantity : 2
        }
      ];
      observer.next(cartData);
      observer.complete();
    });
    return sampelObservable;
  }

  postDeliveryAddress(deliveryData : any) //: Observable<any>
  {
      // const options  = new HttpHeaders({'Content-Type':'application/json'});
      // return this.http.post(`${environment.apiUrl}/Cart/DelievryAddress`,deliveryData,{headers : options}).pipe(
      //   catchError(this.handleError)
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

  handleError(errorObj: HttpErrorResponse) {
    // if (typeof errorObj.error === 'string') {
    //   this.toasterService.error(errorObj.error);
    // } else if (typeof errorObj.error === 'object') {
    //   if ('errors' in errorObj.error) {
    //     const key = Object.keys(errorObj.error.errors)[0];
    //     const errorMsg: any = errorObj.error.errors[key][0];
    //     this.toasterService.error(errorMsg);
    //   } else {
    //     this.toasterService.error(errorObj.error.title);
    //   }
    // } else {
    //   console.log(errorObj);
    // }
  }
}
