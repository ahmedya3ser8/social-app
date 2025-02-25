import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const pLATFORM_ID = inject(PLATFORM_ID);
  if (isPlatformBrowser(pLATFORM_ID)) {
    const token = localStorage.getItem('socialToken');
    if (token !== null) {
      return true;
    } else {
      router.navigateByUrl('/auth/login');
      return false;
    }
  } else {
    return false;
  }
};
