import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  @Input() isOpen: boolean;
  @Output() closeSidebar = new EventEmitter<boolean>();
  @Output() openAddCityModal = new EventEmitter();
  user: User;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAuthUser().subscribe(
      res => this.user = res
    )
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
