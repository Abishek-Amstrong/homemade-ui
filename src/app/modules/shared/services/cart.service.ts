import { stringify } from '@angular/compiler/src/util';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

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
    // let sampelObservable = new Observable((observer) => {
    //     let cartData = [{
    //       ProductId : 101,
    //       ProductImage :  'assets/images/thumb_detail_1.jpg',
    //       ProductName : 'Sabudana Samosa With Chutny',
    //       Price : 60,
    //       Quantity : 5
    //     },{
    //       ProductId : 102,
    //       ProductImage :  'assets/images/thumb_detail_1.jpg',
    //       ProductName : 'Pizza with extra cheese',
    //       Price : 20,
    //       Quantity : 2
    //     }
    //   ];
    //   observer.next(cartData);
    //   observer.complete();
    // });
    // return sampelObservable;
    let userId = this.authService.getUserId();
    return this.http.get(`${environment.apiUrl}/usercart/${userId}`).pipe(
      catchError(err => this.handleError(err))
    );
  }

  UpdateProductsInUserCart(userCart : any){
    const options  = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.put(`${environment.apiUrl}/Cart/UpdateProductsInCart`,userCart,{headers : options}).pipe(
      catchError(this.handleError)
    )

    //sample JSON
    // [{Price: 60
    // ProductId: 101
    // ProductImage: "../../../../assets/images/thumb_detail_1.jpg"
    // ProductName: "Sabudana Samosa With Chutny"
    // Quantity: 5
    // },
    // {
    // Price: 20
    // ProductId: 102
    // ProductImage: "../../../../assets/images/thumb_detail_1.jpg"
    // ProductName: "Pizza with extra cheese"
    // Quantity: 2
    // }]
  }

  UpdateCartProductQty(cartId : string, quantity : number){
    const options  = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.put(`${environment.apiUrl}/updatecart`,{cartId,quantity},{headers : options}).pipe(
      catchError(err => this.handleError(err))
    )

    //sample JSON
    // [{Price: 60
    // ProductId: 101
    // ProductImage: "../../../../assets/images/thumb_detail_1.jpg"
    // ProductName: "Sabudana Samosa With Chutny"
    // Quantity: 5
    // },
    // {
    // Price: 20
    // ProductId: 102
    // ProductImage: "../../../../assets/images/thumb_detail_1.jpg"
    // ProductName: "Pizza with extra cheese"
    // Quantity: 2
    // }]
  }

  deleteProductInCart(productId : any)
  {
    // return this.http.delete(`${environment.apiUrl}/Cart/DeleteProduct/${productId}`).pipe(
    //   catchError(this.handleError));
  }

  orderProdutcsInCart(userCart : any)
  {
      // const options  = new HttpHeaders({'Content-Type':'application/json'});
      // return this.http.post(`${environment.apiUrl}/Cart/Order`,userCart,{headers : options}).pipe(
      //   catchError(this.handleError)
      // )

      //sample JSON
      // [{Price: 60
      // ProductId: 101
      // ProductImage: "../../../../assets/images/thumb_detail_1.jpg"
      // ProductName: "Sabudana Samosa With Chutny"
      // Quantity: 5
      // },
      // {
      // Price: 20
      // ProductId: 102
      // ProductImage: "../../../../assets/images/thumb_detail_1.jpg"
      // ProductName: "Pizza with extra cheese"
      // Quantity: 2
      // }]
  }

  addDeliveryAddress(deliveryData : any) //: Observable<any>
  {
      // const options  = new HttpHeaders({'Content-Type':'application/json'});
      // return this.http.post(`${environment.apiUrl}/Cart/DeliveryAddress`,deliveryData,{headers : options}).pipe(
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

  handleError(errorObj: HttpErrorResponse) : Observable<any>{
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
