import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { TimelineComponent } from './features/timeline/timeline.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';
import { postDetailsResolver } from './core/resolver/post-details.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [isLoggedInGuard],
    children: [
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent),
        title: 'Register'
      },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent),
        title: 'Login'
      },
      {
        path: 'change-password',
        loadComponent: () => import('./features/auth/change-password/change-password.component').then(c => c.ChangePasswordComponent),
        title: 'Change Password'
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: TimelineComponent,
        title: 'Timeline'
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component').then(c => c.ProfileComponent),
        title: 'Profile'
      },
      {
        path: 'posts/:id',
        resolve: {
          postData: postDetailsResolver
        },
        loadComponent: () => import('./features/post-details/post-details.component').then(c => c.PostDetailsComponent),
        title: 'Post Details'
      }
    ]
  }
];
