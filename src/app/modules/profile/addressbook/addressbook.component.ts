import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProfileService } from '../../shared/services/profile.service';

@Component({
  selector: 'app-addressbook',
  templateUrl: './addressbook.component.html',
  styleUrls: ['./addressbook.component.scss'],
})
export class AddressbookComponent implements OnInit {
  addressData: any;
  addressForm: FormGroup;
  displayAdrForm: boolean;
  isNewAddress: boolean;

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.profileService.setMobileMenuDisplayStatus(true);
    this.addressForm = new FormGroup({});
    this.displayAdrForm = false;
    this.isNewAddress = false;
  }

  ngOnInit(): void {
    this.loadAddressDetails();
    this.addressForm = this.formBuilder.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  get fullName() {
    return this.addressForm.get('fullName');
  }
  get address() {
    return this.addressForm.get('address');
  }
  get city() {
    return this.addressForm.get('city');
  }
  get state() {
    return this.addressForm.get('state');
  }
  get pinCode() {
    return this.addressForm.get('zip');
  }

  loadAddressDetails() {
    this.profileService.getAddressDetails().subscribe(
      (data) => (this.addressData = data),
      (err) => console.log(err)
    );
  }

  addInAddrForm() {
    this.displayAdrForm = true;
    this.isNewAddress = true;
    return false;
  }

  editAddrForm(addresId: number) {
    for (let addr of this.addressData) {
      if (addr.addressId == addresId) {
        this.addressForm.setValue({
          fullName: addr.fullName,
          address: addr.address,
          city: addr.city,
          state: addr.state,
          zip: addr.pinCode,
        });
        break;
      }
    }
    this.displayAdrForm = true;
    this.isNewAddress = false;
    return false;
  }

  addUpdateAddress() {
    if (this.addressForm.invalid) {
      Object.keys(this.addressForm.controls).forEach((key) => {
        this.addressForm.get(key)?.markAsDirty();
      });
    } else {
      if (this.isNewAddress) {
        this.profileService.addProfileAddress(this.addressForm.value).subscribe(
          (data) => {
            this.resetForm();
          },
          (error) => {
            if (error.status === 200) {
              this.resetForm();
            }
          }
        );
      } else {
        // this.profileService.updateProfileAddress(this.addressForm.value)
        // .subscribe(
        //   data => console.log(data),
        //   error => console.log(error)
        // );
      }
      console.log(this.addressForm.value);
    }
  }

  resetForm() {
    this.displayAdrForm = false;
    this.addressForm.reset();
    this.loadAddressDetails();
  }

  deleteAddress(addresId: number) {
    // this.profileService.deleteProfileAddress(addresId)
    // .subscribe(
    //   data => { console.log(data)},
    //   error => console.log(error)
    // );
    this.loadAddressDetails();
    return false;
  }
}
