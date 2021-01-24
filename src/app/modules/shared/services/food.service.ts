import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError,Observable, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private authService : AuthService) { }

  getItemSubCategoryDetails(category : string, subCategory : string) : Observable<any>
  {
    return this.http.get(`${environment.apiUrl}/itembysubcategoryName/${subCategory}`).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getItemDetailsInBulk(items:any) : Observable<any[]>
  {
    let obsArr = [];
    for(let item of items)
    { 
      if(item != null)
      obsArr.push(this.http.get(`${environment.apiUrl}/itemdetails/${item}`));
    }
    return forkJoin(obsArr).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getBreakfastDetails() : Observable<any>
  {
    return this.http.get(`${environment.apiUrl}/itembysubcategoryName/Breakfast`).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getChefsNearUserLocation() : Observable<any>{
    let city = this.authService.userLocation;
    return this.http.get(`${environment.apiUrl}/chefnearyou/${city}`).pipe(
      catchError(err=>this.handleError(err))
    );
  }

  getCuisineNearUserLocation() : Observable<any>{
    let sampelObservable = new Observable((observer) => {
      let cuisineData = [{
        cuisineId : 1001,
        name : 'John Doe',
        imgUrl : 'assets/images/lazy-placeholder.png'
      },{
        cuisineId : 1002,
        name : 'John Doe',
        imgUrl : 'assets/images/lazy-placeholder.png'
      },{
        cuisineId : 1003,
        name : 'John Doe',
        imgUrl : 'assets/images/lazy-placeholder.png'
      },{
        cuisineId : 1004,
        name : 'John Doe',
        imgUrl : 'assets/images/lazy-placeholder.png'
      },{
        cuisineId : 1005,
        name : 'John Doe',
        imgUrl : 'assets/images/lazy-placeholder.png'
      },{
        cuisineId : 1006,
        name : 'John Doe',
        imgUrl : 'assets/images/lazy-placeholder.png'
      }];
    observer.next(cuisineData);
    observer.complete();
    });
    return sampelObservable;
    //return this.http.get(`${environment.apiUrl}/foods/cuisinesNearLocation`).pipe(
    //   catchError(this.handleError)
    // );
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
