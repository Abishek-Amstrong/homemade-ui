import { Injectable } from '@angular/core';
import {} from 'googlemaps';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor() {
    // this.locationService.currentLocation = { lat: 28.535517, lng: 77.391029 };
   }

  async getCurrentLocationLatLong() {
    const geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) {
     let position : any = await this.getPosition();
      this.CurrentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      sessionStorage.setItem('Location', JSON.stringify(this.CurrentLocation));
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
  }
}
