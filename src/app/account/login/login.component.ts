import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form = {
    email: '',
    password: ''
  }

  isSubmitted: boolean = false;
  hasError: boolean = false;
  errorMessage: string = "Something's wrong";

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.isSubmitted = true;
    this.authService.login(this.form).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err.error)
    )
  }

  handleResponse(res){
    this.hasError = false;
    this.tokenService.setToken(res.access_token);
    this.router.navigate([this.authService.redirectUrl])
  }

  handleError(err){
    this.isSubmitted = false;
    this.errorMessage = err ? err.message : 'Something\'s wrong. Try later.';
    this.hasError = true;
  }

  closeAlert(){
    this.hasError = false;
  }


}
