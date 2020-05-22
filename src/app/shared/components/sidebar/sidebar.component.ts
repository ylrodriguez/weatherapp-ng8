import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  @Input() isOpen: boolean;
  @Output() closeSidebar = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  close(){
    this.closeSidebar.emit(false);
  }

}
