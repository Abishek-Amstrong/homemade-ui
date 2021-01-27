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

  getFoodPageDetails() {
    return this.http.get(`${environment.apiUrl}/foodpage`).pipe(
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
    return this.http.get(`${environment.apiUrl}/itembysubcategoryName/Desserts`).pipe(
      catchError(err => this.handleError(err))
    );
  }

  getFoodItemsForHomePage() : Observable<any>
  {
    return this.http.get(`${environment.apiUrl}/food`).pipe(
      catchError(err=>this.handleError(err))
    );
  }

  getItemReviews(itemId : String)
  {
    return this.http.get(`${environment.apiUrl}/itemreview/${itemId}`).pipe(
      catchError(err=>this.handleError(err))
    );
  }

  getSimilarProducts(vendorId : String)
  {
    return this.http.get(`${environment.apiUrl}/vendorsimilarProducts/${vendorId}`).pipe(
      catchError(err=>this.handleError(err))
    );
  }

  submitItemReview(itemId : String, review : String, reviewTitle : String, rating : number, vendorId : String)
  {
    const options  = new HttpHeaders({'Content-Type':'application/json'});
    let userId =this.authService.getUserId();
    return this.http.post(`${environment.apiUrl}/itemreview`,{itemId,userId,review,reviewTitle,rating,vendorId},{headers : options}).pipe(
      catchError(err => this.handleError(err))
    );
  }

  handleError(errorObj: HttpErrorResponse) : Observable<any> {
    //console.log(errorObj);
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
