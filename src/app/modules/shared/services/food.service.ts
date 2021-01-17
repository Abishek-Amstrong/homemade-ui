import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getBreakfastDetails() : Observable<any>
  {
    let sampelObservable = new Observable((observer) => {
      let foodData = [{
        productId : 1001,
        foodName : 'Sabudana Samosa With Chutny',
        foodImage : '../../../../assets/images/products/product-2.jpg',
        foodPrice : 2928
      },{
        productId : 1002,
        foodName : 'Pizza with extra cheese',
        foodImage : '../../../../assets/images/products/product-2.jpg',
        foodPrice : 1145
      },{
        productId : 1003,
        foodName : 'Sabudana Samosa With Chutny',
        foodImage : '../../../../assets/images/products/product-2.jpg',
        foodPrice : 2928
      },{
        productId : 1004,
        foodName : 'Pizza with extra cheese',
        foodImage : '../../../../assets/images/products/product-2.jpg',
        foodPrice : 1145
      },{
        productId : 1005,
        foodName : 'Sabudana Samosa With Chutny',
        foodImage : '../../../../assets/images/products/product-2.jpg',
        foodPrice : 2928
      },{
        productId : 1006,
        foodName : 'Pizza with extra cheese',
        foodImage : '../../../../assets/images/products/product-2.jpg',
        foodPrice : 1145
      },{
        productId : 1007,
        foodName : 'Sabudana Samosa With Chutny',
        foodImage : '../../../../assets/images/products/product-2.jpg',
        foodPrice : 2928
      },{
        productId : 1008,
        foodName : 'Pizza with extra cheese',
        foodImage : '../../../../assets/images/products/product-2.jpg',
        foodPrice : 1145
      }];
    observer.next(foodData);
    observer.complete();
    });
    return sampelObservable;
    //return this.http.get(`${environment.apiUrl}/foods/breakfast`).pipe(
    //   catchError(this.handleError)
    // );
  }

  getChefsNearUserLocation() : Observable<any>{
    let sampelObservable = new Observable((observer) => {
      let chefData = [{
        chefId : 1001,
        name : 'John Doe',
        imgUrl : '../../../../assets/images/lazy-placeholder.png',
        rating : 9.5
      },{
        chefId : 1002,
        name : 'John Doe',
        imgUrl : '../../../../assets/images/lazy-placeholder.png',
        rating : 9.5
      },{
        chefId : 1003,
        name : 'John Doe',
        imgUrl : '../../../../assets/images/lazy-placeholder.png',
        rating : 9.5
      },{
        chefId : 1004,
        name : 'John Doe',
        imgUrl : '../../../../assets/images/lazy-placeholder.png',
        rating : 9.5
      },{
        chefId : 1005,
        name : 'John Doe',
        imgUrl : '../../../../assets/images/lazy-placeholder.png',
        rating : 9.5
      },{
        chefId : 1006,
        name : 'John Doe',
        imgUrl : '../../../../assets/images/lazy-placeholder.png',
        rating : 9.5
      }];
    observer.next(chefData);
    observer.complete();
    });
    return sampelObservable;
    //return this.http.get(`${environment.apiUrl}/foods/chefsNearLocation`).pipe(
    //   catchError(this.handleError)
    // );
  }

  getCuisineNearUserLocation() : Observable<any>{
    let sampelObservable = new Observable((observer) => {
      let cuisineData = [{
        cuisineId : 1001,
        name : 'John Doe',
        imgUrl : '../../../../assets/images/lazy-placeholder.png'
      },{
        cuisineId : 1002,
        name : 'John Doe',
        imgUrl : '../../../../assets/images/lazy-placeholder.png'
      },{
        cuisineId : 1003,
        name : 'John Doe',
        imgUrl : '../../../../assets/images/lazy-placeholder.png'
      },{
        cuisineId : 1004,
        name : 'John Doe',
        imgUrl : '../../../../assets/images/lazy-placeholder.png'
      },{
        cuisineId : 1005,
        name : 'John Doe',
        imgUrl : '../../../../assets/images/lazy-placeholder.png'
      },{
        cuisineId : 1006,
        name : 'John Doe',
        imgUrl : '../../../../assets/images/lazy-placeholder.png'
      }];
    observer.next(cuisineData);
    observer.complete();
    });
    return sampelObservable;
    //return this.http.get(`${environment.apiUrl}/foods/cuisinesNearLocation`).pipe(
    //   catchError(this.handleError)
    // );
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
