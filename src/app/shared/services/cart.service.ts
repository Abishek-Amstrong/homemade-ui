import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

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
}
