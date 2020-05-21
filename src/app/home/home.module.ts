import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HOME_ROUTE } from './home.route';
import { SharedModule } from '../shared/shared.module';
import { CitiesComponent } from './cities/cities.component';
import { CommonModule } from '@angular/common';
import { CityCardComponent } from './cities/city-card/city-card.component';
import { WeatherIconComponent } from './cities/weather-icon/weather-icon.component';



@NgModule({
  declarations: [HomeComponent, CitiesComponent, CityCardComponent, WeatherIconComponent],
  imports: [
    RouterModule.forChild([HOME_ROUTE]),
    SharedModule,
    CommonModule
  ]
})
export class HomeModule { }
