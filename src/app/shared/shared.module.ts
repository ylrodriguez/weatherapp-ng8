import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SidebarComponent, HeaderComponent],
  imports: [
    RouterModule.forChild([]),
    CommonModule
  ],
  exports:[
    SidebarComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
