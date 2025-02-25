import { Routes } from '@angular/router';
import { MainAuthComponent } from './layouts/main-auth/main-auth.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'timeline', pathMatch: 'full'},
  {path: 'auth', component: MainAuthComponent, children: [
    {path: 'register', loadComponent: () => import('./pages/register/register.component').then((c) => c.RegisterComponent), canActivate: [loggedGuard], title: 'register'},
    {path: 'login', loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent), canActivate: [loggedGuard], title: 'login'},
    {path: 'change-password', loadComponent: () => import('./pages/change-password/change-password.component').then((c) => c.ChangePasswordComponent), canActivate: [loggedGuard], title: 'change-password'}
  ]},
  {path: '', component: MainLayoutComponent, children: [
    {path: 'timeline', loadComponent: () => import('./pages/timeline/timeline.component').then((c) => c.TimelineComponent), canActivate: [authGuard]  , title: 'timeline'},
    {path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then((c) => c.NotfoundComponent), title: '404'}
  ]}
];
