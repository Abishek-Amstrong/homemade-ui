import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProfileService } from '../../shared/services/profile.service';
import { ValidatorService } from '../../shared/services/validator.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personaldetails',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.scss'],
})
export class PersonaldetailsComponent implements OnInit {
  persDetailForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private validator: ValidatorService,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileService.setMobileMenuDisplayStatus(true);
    this.persDetailForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.persDetailForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      email_Id: ['', [Validators.required, this.validator.isValidEmail()]],
      mobileNumber: [
        '',
        [this.validator.isValidPhoneNo(), this.validator.isNumericPhoneNo()],
      ],
      desc: [''],
    });
    this.loadPersonalDetails();
  }

  get firstName() {
    return this.persDetailForm.get('firstname');
  }

  get email() {
    return this.persDetailForm.get('email_Id');
  }
  get mobile() {
    return this.persDetailForm.get('mobileNumber');
  }
  // get dateOfBirth() {
  //   return this.persDetailForm.get('dateOfBirth');
  // }

  loadPersonalDetails(): void {
    const userId = this.authService.getUserId();
    this.profileService.getPersonalDetails(userId).subscribe(
      (data: any) => {
        this.persDetailForm.patchValue({
          firstname: data.firstname,
          email_Id: data.email_Id,
          mobileNumber: data.mobileNumber,
          desc: data.user_desc,
        });
      },
      (err) => console.log(err)
    );
  }

  onSubmit() {
    if (this.persDetailForm.invalid) {
      Object.keys(this.persDetailForm.controls).forEach((key) => {
        this.persDetailForm.get(key)?.markAsDirty();
      });
    } else {
      this.profileService
        .updatePersonalDetails(this.persDetailForm.value)
        .subscribe(
          (data) => {
            this.router.navigate(['/', 'profile', 'myaccount']);
          },
          (error) => {
            if (error.status === 200) {
              this.router.navigate(['/', 'profile', 'myaccount']);
            }
          }
        );
    }
  }
}
