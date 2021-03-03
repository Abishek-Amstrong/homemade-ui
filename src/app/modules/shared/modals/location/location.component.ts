import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { } from 'googlemaps';
import { logging } from 'protractor';
import { last } from 'rxjs/operators';
import { handleError } from '../../helpers/error-handler';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  location: string;
  geocoder: google.maps.Geocoder;
  @ViewChild('deliveryLocation') deliveryInput: ElementRef | any;

  constructor(
    public dialogRef: MatDialogRef<LocationComponent>,
    @Inject(MAT_DIALOG_DATA) public projectData: any,
    private locationService: LocationService
  ) {
    this.location = '';
    this.geocoder = new google.maps.Geocoder();
  }

  ngOnInit(): void {
    this.getUserLocation();
  }

  ngAfterViewInit() {
    if (navigator.geolocation) {
      const options = {
        componentRestrictions: { country: 'IN' },
        fields: ['formatted_address', 'address_component', 'geometry', 'name'],
        location: this.locationService.CurrentLocation,
        radius: 8000,
        strictBounds: true,
        types: ['establishment'],
      } as google.maps.places.AutocompleteOptions;

      const mapAutoComplete = new google.maps.places.Autocomplete(
        this.deliveryInput.nativeElement,
        options
      );

      mapAutoComplete.setFields(['address_component']);
      mapAutoComplete.addListener('place_changed', () => {
        const place = mapAutoComplete?.getPlace();
        if (place && place.geometry) {
          this.locationService.CurrentLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
        }
        if (place && place.address_components && place.formatted_address && place.name) {
          this.formatAddressComponents(place.address_components, place.formatted_address, place.name);
        }

      });
    }
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.locationService.CurrentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.geocoder.geocode(
          { location: this.locationService.CurrentLocation },
          (
            results: google.maps.GeocoderResult[],
            status: google.maps.GeocoderStatus
          ) => {
            if (status === 'OK') {
              if (results[0]) {
                this.formatAddressComponents(results[0].address_components, results[0].formatted_address);
              } else {
                console.log('No results found');
              }
            } else {
              console.log('Geocoder failed due to: ' + status);
            }
          }
        );
      });
    }
  }

  getUserLocation() {
    this.locationService.getUserLocation().subscribe((resp: any) => {
      if (resp.data.Address) {
        let address = JSON.parse(resp.data.Address);
        this.locationService.CurrentAddress = address;
        this.locationService.CurrentCity = address.city;
        this.location = address.formattedAddress;
      }
      if (resp.data.lat && resp.data.long) {
        this.locationService.CurrentLocation = { lat: Number(resp.data.lat), lng: Number(resp.data.long) };
      }
    })
  }

  formatAddressComponents(address_components: any, formatted_address: string, name: string = '') {
    let address = '';
    let city = '';
    let state = '';
    let pinCode = '';
    for (const component of address_components) {
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
      } else if (
        addressType.indexOf('administrative_area_level_1') !== -1
      ) {
        state = component.long_name;
      } else if (addressType.indexOf('postal_code') !== -1) {
        pinCode = component.long_name;
      }
    }

    this.updateUserLocation(name, formatted_address, address, city, state, pinCode);
  }

  updateUserLocation(name: string, formatted_address: string, address: string, city: string, state: string, pinCode: string) {
    this.locationService.CurrentAddress = {
      formattedAddress: name == '' ? formatted_address : `${name}, ${formatted_address}`,
      address: address,
      city: city,
      state: state,
      zip: pinCode
    };
    this.locationService.CurrentCity = city;
    this.location = name == '' ? formatted_address : `${name}, ${formatted_address}`;

    this.locationService.updateUserLocation().subscribe((resp) => { }, (err) => { handleError(err) });
  }
}
