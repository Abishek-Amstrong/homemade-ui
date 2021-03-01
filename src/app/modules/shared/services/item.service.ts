import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError, Observable, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor( private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService,
    private locationService : LocationService) { }

  getHomeDecorItemsForHomepage() : Observable<any>
  {
    return this.http.get(`${environment.apiUrl}/homedecor`);
  }

  getFashionItemsForHomepage() : Observable<any>
  {
    return this.http.get(`${environment.apiUrl}/fashion`);
  }

  getPlantAndPlanterItemsForHomePage() : Observable<any>
  {
    return this.http.get(`${environment.apiUrl}/plantsandplanters`);
  }

  getHomeDecorPageDetails() : Observable<any>
  {
    return this.http.get(`${environment.apiUrl}/homedecorpage`);
  }
}
