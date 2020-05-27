import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  @Input() isOpen: boolean;
  @Output() closeSidebar = new EventEmitter<boolean>();
  @Output() openAddCityModal = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  close() {
    this.closeSidebar.emit(false);
  }

  navigateToHome(){
    this.router.navigate(['/'])
    this.close();
  }

  emitOpenAddCityModal() {
    this.close();
    this.openAddCityModal.emit();
  }

}
