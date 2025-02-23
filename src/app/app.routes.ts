import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'timeline', pathMatch: 'full'},
  {path: 'timeline', loadComponent: () => import('./pages/timeline/timeline.component').then((c) => c.TimelineComponent), title: 'timeline'},
  {path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then((c) => c.NotfoundComponent), title: '404'}
];
