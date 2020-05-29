import { Injectable } from '@angular/core';
import { CanActivateChild, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivateChild {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
  ){}

  canActivateChild(){
    // If user is already loggend in, redirects the user.
    if(this.tokenService.isLoggedIn.value){
      this.router.navigate([this.authService.redirectUrl])
      return false;
    }

    // If user isn't logged in, can see the route.
    return true;
  }
  
}
