import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey: string = "access_token";
  private iss: string = environment.apiUrl; //JWT Issuer
  private _isLoggedIn = new BehaviorSubject<boolean>(this.tokenIsValid());

  constructor() {
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this._isLoggedIn.next(true);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  tokenIsValid() {
    const token = this.getToken()
    if (token) { //Check if token exists 
      const rawpayload = token.split('.')[1];
      let payload = JSON.parse(atob(rawpayload));
      // Uses both validations because sometimes heroku issues token with HTTPS and others with HTTP
      return (payload.iss == environment.tokenIss || payload.iss.startsWith(this.iss))  ? true : false; 
    }
    else {
      return false;
    }
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
    this._isLoggedIn.next(false);
    // this.router.navigate(['/login']);
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }
}
