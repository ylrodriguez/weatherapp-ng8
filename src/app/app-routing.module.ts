import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Guards
import { AuthGuard } from './shared/guards/auth.guard';
import { AnonymousGuard } from './shared/guards/anonymous.guard';


const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    canActivateChild: [AnonymousGuard],
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: '**', redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
