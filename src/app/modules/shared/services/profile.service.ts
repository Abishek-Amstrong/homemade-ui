import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError, Observable, forkJoin, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private hideMenuInMobile: boolean;
  hideMenuStatusChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
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
    persData['userId'] = localStorage.getItem('userId');
    return this.http.put(`${environment.apiUrl}/updateuserdetails`, persData);
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
    let userId = this.authService.getUserId();
    return this.http
      .get(`${environment.apiUrl}/userorder/${userId}`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  handleError(errorObj: HttpErrorResponse): Observable<any> {
    //console.log(errorObj);
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
