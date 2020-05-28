import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HOME_ROUTE } from './home.route';
import { SharedModule } from '../shared/shared.module';
import { CitiesComponent } from './cities/cities.component';
import { CommonModule } from '@angular/common';
import { CityCardComponent } from './cities/city-card/city-card.component';
import { DetailsComponent } from './details/details.component';
import { AddCityComponent } from './cities/add-city/add-city.component';
import { FormsModule } from '@angular/forms'
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [HomeComponent, CitiesComponent, CityCardComponent, DetailsComponent, AddCityComponent],
  imports: [
    RouterModule.forChild([HOME_ROUTE]),
    SharedModule,
    CommonModule,
    
    FormsModule,
    NgxSpinnerModule
  ]
})
export class HomeModule { }
