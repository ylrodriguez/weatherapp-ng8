import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router) { }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;

    // Checks token and if it is valid, returns true.
    if (this.tokenService.isLoggedIn.value) {
      return true;
    }

    // If token is not valid, redirects to login. Also saves the redirect Url that the user will get once is logged in.
    this.authService.redirectUrl = url;
    this.router.navigate([this.authService.loginUrl]);
    return false;
  }

}
