import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ACCOUNT_ROUTE } from './account.route';
import { FormsModule } from '@angular/forms'



@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild([ACCOUNT_ROUTE]),
    CommonModule,
    FormsModule
  ]
})
export class AccountModule { }
