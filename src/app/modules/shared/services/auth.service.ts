import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Tokens } from './../models/tokens';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  decodedToken: any;
  currentUser: string;
  jwtHelper = new JwtHelperService();
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      this.jwtHelper.decodeToken(localStorage.getItem(this.JWT_TOKEN)!)
    );
    this.user = this.userSubject.asObservable();
    this.currentUser = '';
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.currentUser = username;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    const decodedToken = this.jwtHelper.decodeToken(tokens.token);
    this.userSubject.next(decodedToken);
    const userId = decodedToken.nameid;
    localStorage.setItem('userId', userId);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/Auth/login`, { email, password })
      .pipe(tap((token: any) => this.doLoginUser(email, token)));
  }

  logout() {
    // remove user from local storage and set current user to null
    this.currentUser = '';
    this.removeTokens();
    this.userSubject.next(new User('', '', ''));
    this.router.navigate(['/shared/login']);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  register(user: any) {
    return this.http.post(`${environment.apiUrl}/Auth/register`, user);
  }

  handleError(errorObj: any) {
    // if (typeof errorObj.error === 'string') {
    //   this.toasterService.error(errorObj.error);
    // } else if (typeof errorObj.error === 'object') {
    //   if ('errors' in errorObj.error) {
    //     const key = Object.keys(errorObj.error.errors)[0];
    //     const errorMsg: any = errorObj.error.errors[key][0];
    //     this.toasterService.error(errorMsg);
    //   } else {
    //     this.toasterService.error(errorObj.error.title);
    //   }
    // } else {
    //   console.log(errorObj);
    // }
  }
}
