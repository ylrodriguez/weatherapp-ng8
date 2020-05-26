import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const ACCOUNT_ROUTE: Route = {
    path: '',
    children: [
        { path: 'login', component: LoginComponent }
    ]
}