import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    req = req.clone({
      setHeaders: {
        token
      }
    })
  }
  return next(req);
};
