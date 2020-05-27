import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  @ViewChild('modalAddCity', { static: false }) modalAddCity;
  sidebarIsOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar(newValue: boolean) {
    this.sidebarIsOpen = newValue;
  }

  openAddCityModal(){
    this.modalAddCity.open()
  }

}
