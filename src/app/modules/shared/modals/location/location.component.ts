import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {} from 'googlemaps';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  location: string;
  @ViewChild('deliveryLocation') deliveryInput: ElementRef | any;
  currentLocation: any;

  constructor(
    public dialogRef: MatDialogRef<LocationComponent>,
    @Inject(MAT_DIALOG_DATA) public projectData: any
  ) {
    this.location = '';
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    const geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.geocodeLatLng(geocoder);

        const options = {
          // componentRestrictions: { country: 'us' },
          fields: ['formatted_address', 'geometry', 'name'],
          location: this.currentLocation,
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
          console.log(place);

          // and then fill-in the corresponding field on the form.
          if (place && place.address_components) {
            let address = '';
            let city = '';
            let state = '';
            let pinCode = '';

            for (const component of place.address_components) {
              const addressType = component.types;
              // console.log(addressType);
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

            // this.deliveryForm.patchValue({
            //   deliveryLocation: `${address}${address && city ? ', ' + city : city}${
            //     (address || city) && state ? ', ' + state : state
            //   }${(address || city || state) && pinCode ? ', ' + pinCode : pinCode}`,
            //   address: address,
            //   city: city,
            //   state: state,
            //   pinCode: pinCode,
            // });
          }
        });
      });
    }
  }

  getCurrentLocation() {
    const geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        geocoder.geocode(
          { location: this.currentLocation },
          (
            results: google.maps.GeocoderResult[],
            status: google.maps.GeocoderStatus
          ) => {
            if (status === 'OK') {
              if (results[0]) {
                this.location = results[0].formatted_address;
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

  geocodeLatLng(geocoder: google.maps.Geocoder) {
    geocoder.geocode(
      { location: this.currentLocation },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status === 'OK') {
          if (results[0]) {
            console.log(results[0].formatted_address);
          } else {
            console.log('No results found');
          }
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
  }
}
