import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationService } from './location.service';

@Injectable()
export class LocationInterceptor implements HttpInterceptor {
  constructor(public locationService: LocationService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      if (this.locationService.CurrentLocation) {
          // add content-type
          req = req.clone({
              setHeaders: {
                  'Content-Type': 'application/json',
                  Location: JSON.stringify(this.locationService.CurrentLocation)
              },
          });
      }

      return next.handle(req);
  }
}
