import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { DetailsComponent } from './details/details.component'
import { CitiesComponent } from './cities/cities.component';

export const HOME_ROUTE: Route = {
    path: '', component: HomeComponent,
    children: [
        { path: '', component: CitiesComponent },
        { path: 'details/:slug', component: DetailsComponent }
    ]
}