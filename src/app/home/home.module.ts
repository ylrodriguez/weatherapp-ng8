import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HOME_ROUTE } from './home.route';
import { SharedModule } from '../shared/shared.module';
import { CitiesComponent } from './cities/cities.component';
import { AddCityComponent } from './add-city/add-city.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [HomeComponent, CitiesComponent, AddCityComponent],
  imports: [
    RouterModule.forChild([HOME_ROUTE]),
    SharedModule,
    CommonModule
  ]
})
export class HomeModule { }
