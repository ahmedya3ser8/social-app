import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Menu],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  private readonly router = inject(Router);
  ngOnInit(): void {
    this.items = [
      {
        label: 'Profile',
        icon: 'fa-solid fa-user',
        command: () => {
          this.router.navigateByUrl('/profile');
        }
      },
      {
        label: 'Logout',
        icon: 'fa-solid fa-right-from-bracket',
        command: () => {
          localStorage.removeItem('access_token');
          this.router.navigateByUrl('/auth/login');
        }
      }
    ];
  }
}
