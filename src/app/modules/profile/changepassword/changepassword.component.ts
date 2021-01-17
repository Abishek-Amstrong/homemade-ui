import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';

import { ProfileService } from '../../shared/services/profile.service'
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  passwordForm : FormGroup;

  constructor(private profileService : ProfileService, 
              private formBuilder : FormBuilder,
              private authService : AuthService) { 
    this.profileService.setMobileMenuDisplayStatus(true);
    this.passwordForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      currentPassword : ['',Validators.required],
      NewPassword : ['',Validators.required],
      confirmNewPassword : ['',Validators.required]
    });
  }

  get currentPassword() { return this.passwordForm.get('currentPassword'); }
  get newPassword() { return this.passwordForm.get('NewPassword'); }
  get confirmNewPassword() { return this.passwordForm.get('confirmNewPassword'); }

  onSubmit()
  {
    if(this.passwordForm.valid)
    {
      if(this.newPassword!.value != this.confirmNewPassword!.value)
      {
        this.confirmNewPassword?.setErrors({'incorrect': true});
        return;
      }
      else
      {
        console.log(this.passwordForm.value);
        // this.authService.changePassword(this.currentPassword?.value,this.newPassword?.value).subscribe(
        //   (data: any)=>console.log(data),
        //   (err: any)=>console.log(err));
      }
    }
    else
    {
      Object.keys(this.passwordForm.controls).forEach(key => {
        this.passwordForm.get(key)?.markAsDirty();
      });
      return;
    }
    return false;
  }

}
