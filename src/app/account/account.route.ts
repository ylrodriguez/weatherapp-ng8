import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const ACCOUNT_ROUTE: Route = {
    path: '',
    children: [
        { path: 'login', component: LoginComponent },
        { path: 'signup', component: SignupComponent },
    ]
}