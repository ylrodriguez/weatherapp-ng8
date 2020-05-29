import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedHomeService } from '../../services/shared-home.service';

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

  constructor(private sharedHomeService: SharedHomeService, private spinner: NgxSpinnerService, private tokenService: TokenService, private router: Router, private authService: AuthService) { }

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

  onLogOut() {
    this.spinner.show();
    this.authService.logout().subscribe(
      () => {
        this.tokenService.removeToken();
        this.sharedHomeService.cleanUsersCity();
        this.spinner.hide();
        this.router.navigate(['/login']);
      },
      (err) => {
        this.tokenService.removeToken();
        this.sharedHomeService.cleanUsersCity();
        this.spinner.hide();
        this.router.navigate(['/login']);
      }
    );
  }

}
