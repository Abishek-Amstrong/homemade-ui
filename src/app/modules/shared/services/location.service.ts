import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {} from 'googlemaps';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  public locationSubject : BehaviorSubject<any>;
  private address : any;
  constructor(private http: HttpClient,
              private authservice : AuthService) {
    // this.locationService.currentLocation = { lat: 28.535517, lng: 77.391029 };
    this.locationSubject = new BehaviorSubject<any>(this.CurrentLocation);
    this.address = {} as any;
   }

  async getCurrentLocationLatLong() {
    const geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) {
     let position : any = await this.getPosition();
      this.CurrentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      //Get the city details for the lat,long
      const geocoder = new google.maps.Geocoder();
      this.geocodeLatLng(geocoder);
    }
  }

  getPosition() {
    // Simple wrapper
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  public get CurrentLocation() : any
  {
    if(!sessionStorage.getItem('Location'))
    {
      //default value as Noida
      sessionStorage.setItem('Location', JSON.stringify({ lat: 28.535517, lng: 77.391029 }));
    }
    return JSON.parse(sessionStorage.getItem('Location') as any);
  }

  public set CurrentLocation(location : any)
  {
    sessionStorage.setItem('Location', JSON.stringify(location));
    this.locationSubject.next(location);
  }

  public get CurrentCity() : string
  {
    if(!sessionStorage.getItem('City'))
    {
      //default value as Noida
      sessionStorage.setItem('City', 'Noida');
    }
    return sessionStorage.getItem('City') as string;
  }

  public set CurrentCity(city : string)
  {
    sessionStorage.setItem('City',city);
  }

  public get CurrentAddress() :any
  {
    return this.address;
  }

  public set CurrentAddress(address : any)
  {
    this.address = address;
  }

  geocodeLatLng(geocoder: google.maps.Geocoder) {
    geocoder.geocode(
      { location: this.CurrentLocation },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status === 'OK') {
          if (results[0]) {
            let address = '';
            let city = '';
            let state = '';
            let pinCode = '';

            for (const component of results[0].address_components) {
              const addressType = component.types;
              if (
                addressType.indexOf('sublocality_level_2') !== -1 ||
                addressType.indexOf('sublocality_level_1') !== -1
              ) {
                address = address
                  ? address + ', ' + component.long_name
                  : component.long_name;
              } else if (addressType.indexOf('locality') !== -1) {
                city = component.long_name;
                this.CurrentCity = city;
              } else if (
                addressType.indexOf('administrative_area_level_1') !== -1
              ) {
                state = component.long_name;
              } else if (addressType.indexOf('postal_code') !== -1) {
                pinCode = component.long_name;
              }
            }
          } else {
            console.log('No results found');
          }
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  getUserLocation()
  {
    let userId = this.authservice.getUserId();
    return this.http.get(`${environment.apiUrl}/userlocation/${userId}`);
  }

  updateUserLocation() : Observable<any>
  {
    let userId = this.authservice.getUserId();
    let lat = this.CurrentLocation.lat;
    let lng = this.CurrentLocation.lng;
    let address = this.CurrentAddress;
    return this.http.put(`${environment.apiUrl}/userlocation`, {
      userId,
      lat,
      lng,
      address
    });
  }
}
