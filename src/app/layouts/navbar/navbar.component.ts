import { Component, inject, PLATFORM_ID } from '@angular/core';
import { UsersService } from '../../core/services/users/users.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly usersService = inject(UsersService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID)
  logout(): void {
    this.usersService.logout();
  }
  isLogin(): boolean {
    return isPlatformBrowser(this.pLATFORM_ID) && !!localStorage.getItem('socialToken');
  }
}
