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
export class VendorService {

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private authService : AuthService) { }

    getVendorDetails(vendorId : String) : Observable<any>
    {
      return this.http.get(`${environment.apiUrl}/vendordeatils/${vendorId}`).pipe(
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
