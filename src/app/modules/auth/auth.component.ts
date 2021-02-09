import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ValidatorService } from '../shared/services/validator.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  uname: string | null;
  pwd: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private validator: ValidatorService,
    private toastr: ToastrService
  ) {
    this.submitted = false;
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, this.validator.isValidEmail()]],
      password: ['', Validators.required],
      rememberMe: [''],
    });

    this.uname = localStorage.getItem('username');
    this.pwd = localStorage.getItem('password');

    if (this.uname && this.pwd) {
      this.form.patchValue({
        email: this.uname,
        password: this.pwd,
        rememberMe: true,
      });
    }
  }

  ngOnInit(): void {
    this.authService.setHeaderDisplayStatus(true);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsDirty();
      });
      return;
    }

    if (!this.uname && !this.pwd) {
      this.authService
        .login(this.f.email.value, this.f.password.value)
        .subscribe(
          (response: any) => {
            if (this.f.rememberMe.value) {
              localStorage.setItem('username', this.f.email.value);
              localStorage.setItem('password', this.f.password.value);
            }

            this.toastr.success('Login is successful', 'Success!');
            // get return url from query parameters or default to home page
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          },
          (error: any) => {
            // this.toasterService.error(handleError(error));
          }
        );
    } else {
      this.authService
        .login(
          this.f.email.value || this.uname,
          this.f.password.value || this.pwd
        )
        .subscribe(
          (response: any) => {
            if (this.f.rememberMe.value) {
              localStorage.setItem('username', this.f.email.value);
              localStorage.setItem('password', this.f.password.value);
            }
            this.toastr.success('Login is successful', 'Success!');
            // get return url from query parameters or default to home page
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          },
          (error: any) => {
            // this.toasterService.error(handleError(error));
          }
        );
    }
  }
}
