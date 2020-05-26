import { NgModule } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [SidebarComponent, HeaderComponent],
  imports: [
    RouterModule.forChild([]),
    CommonModule,
    FormsModule
  ],
  exports:[
    SidebarComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
