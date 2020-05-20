import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HOME_ROUTE } from './home.route';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([HOME_ROUTE])
  ]
})
export class HomeModule { }
