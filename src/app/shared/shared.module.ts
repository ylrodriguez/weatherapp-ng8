import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SidebarComponent, HeaderComponent],
  imports: [
    CommonModule
  ],
  exports:[
    SidebarComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
