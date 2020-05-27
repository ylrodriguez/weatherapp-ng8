import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() openSidebar = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openSidebarMenu(){
    this.openSidebar.emit(true);
  }

  navigateToHome(){
    this.router.navigate(['/'])
  }

}
