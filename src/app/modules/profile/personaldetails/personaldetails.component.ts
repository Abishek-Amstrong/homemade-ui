import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common' 
import { FormBuilder,FormGroup, Validators} from '@angular/forms';

import { ProfileService } from '../../shared/services/profile.service'
import { ValidatorService } from '../../shared/services/validator.service'

@Component({
  selector: 'app-personaldetails',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.scss']
})
export class PersonaldetailsComponent implements OnInit {
  persDetailForm : FormGroup;

  constructor(private profileService : ProfileService, 
              private formBuilder :FormBuilder,
              private validator : ValidatorService) {
    this.profileService.setMobileMenuDisplayStatus(true);
    this.persDetailForm = new FormGroup({});
   }

  ngOnInit(): void {
    this.persDetailForm = this.formBuilder.group({
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      email : ['',[Validators.required,this.validator.isValidEmail()]],
      mobile : ['',[this.validator.isValidPhoneNo(),this.validator.isNumericPhoneNo()]],
      dateOfBirth : ''
    });
    this.loadPersonalDetails();
  }

  get firstName(){ return this.persDetailForm.get('firstName');}
  get lastName(){ return this.persDetailForm.get('lastName');}
  get email(){ return this.persDetailForm.get('email');}
  get mobile(){ return this.persDetailForm.get('mobile');}
  get dateOfBirth(){ return this.persDetailForm.get('dateOfBirth');}

  loadPersonalDetails() : void
  {
    this.profileService.getPersonalDetails().subscribe(data=>{
      this.persDetailForm.setValue({
        firstName : data.firstName,
        lastName : data.lastName,
        email : data.email,
        mobile : data.mobile,
        dateOfBirth : formatDate(data.dateOfBirth,'yyyy-MM-dd','en')
      });
    },err => console.log(err));
  }

  onSubmit()
  {
    if(this.persDetailForm.valid)
    {
      console.log(this.persDetailForm.value);
      // this.profileService.updatePersonalDetails(this.persDetailForm.value)
      // .subscribe(
      //   data => console.log(data),
      //   error => console.log(error)
      // );
    }
    else
    {
      Object.keys(this.persDetailForm.controls).forEach(key => {
        this.persDetailForm.get(key)?.markAsDirty();
      });
      return;
    }
  }
  
}
