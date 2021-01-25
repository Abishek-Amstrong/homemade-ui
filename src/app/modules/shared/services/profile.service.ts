import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private hideMenuInMobile: boolean;
  hideMenuStatusChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.hideMenuInMobile = false;
  }

  getMobileMenuDisplayStatus(): boolean {
    return this.hideMenuInMobile;
  }

  setMobileMenuDisplayStatus(isView: boolean) {
    this.hideMenuInMobile = isView;
    this.hideMenuStatusChange.next(this.hideMenuInMobile);
  }

  getPersonalDetails(id: any) {
    return this.http.get(`${environment.apiUrl}/userdeatils/${id}`);
  }

  updatePersonalDetails(persData: any) {
    //const options  = new HttpHeaders({'Content-Type':'application/json'});
    // return this.http.put(`${environment.apiUrl}/User/UpdatePersonalDetails`,persData,{headers : options}).pipe(
    //   catchError(this.handleError)
    // );
    //Sample JSON
    // dateOfBirth: "2021-01-16"
    // email: "amitShah@gmail.com"
    // firstName: "Amit"
    // lastName: "shah"
    // mobile: 9784561452
  }

  getAddressDetails(): Observable<any> {
    let sampelObservable = new Observable((observer) => {
      let addressData = [
        {
          addressId: 1001,
          fullName: 'Raja Babu',
          address: 'Flat Number - 50, Nanavati Colony, NIT-1, Sector-80',
          city: 'Jaipur',
          state: 'Rajasthan',
          pinCode: 100001,
        },
      ];
      observer.next(addressData);
      observer.complete();
    });
    return sampelObservable;
    //return this.http.get(`${environment.apiUrl}/User/GetAddressDetails`).pipe(
    //   catchError(this.handleError)
    // );
  }

  addProfileAddress(addressData: any) {
    //const options  = new HttpHeaders({'Content-Type':'application/json'});
    // return this.http.post(`${environment.apiUrl}/User/AddAddress`,addressData,{headers : options}).pipe(
    //   catchError(this.handleError)
    // );
    // sample JSON
    // address: "savsav"
    // city: "asvasv"
    // fullName: "ssav"
    // pinCode: "asdaavda"
    // state: "Sikkim"
  }

  updateProfileAddress(addressData: any) {
    //const options  = new HttpHeaders({'Content-Type':'application/json'});
    // return this.http.put(`${environment.apiUrl}/User/AddAddress`,addressData,{headers : options}).pipe(
    //   catchError(this.handleError)
    // );
    // sample JSON
    // address: "savsav"
    // city: "asvasv"
    // fullName: "ssav"
    // pinCode: "asdaavda"
    // state: "Sikkim"
  }

  deleteProfileAddress(addressId: number) {
    // return this.http.delete(`${environment.apiUrl}/User/DeleteAddress/${addressId}`).pipe(
    //   catchError(this.handleError));
  }

  getOrderDetails(): Observable<any> {
    let sampelObservable = new Observable((observer) => {
      let orderData = [
        {
          orderId: 1001,
          productName: 'Sabudana Samosa With Chutny',
          productImage: 'assets/images/thumb_detail_1.jpg',
          productTotPrice: 2928,
          OrderDate: new Date(),
          deliveredDate: new Date(),
        },
        {
          orderId: 1002,
          productName: 'Pizza with extra cheese',
          productImage: 'assets/images/thumb_detail_1.jpg',
          productTotPrice: 315,
          OrderDate: new Date(),
          deliveredDate: new Date(),
        },
      ];
      observer.next(orderData);
      observer.complete();
    });
    return sampelObservable;
    //return this.http.get(`${environment.apiUrl}/User/OrderDetails`).pipe(
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
