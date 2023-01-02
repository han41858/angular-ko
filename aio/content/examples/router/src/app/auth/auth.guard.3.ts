// #docregion can-activate-child
import { inject } from '@angular/core';
import {
  CanActivateFn, CanMatchFn, Router,
  CanActivateChildFn,
  UrlTree
} from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanMatchFn|CanActivateFn|CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  // 로그인 페이지로 이동합니다.
  return router.parseUrl('/login');
};
