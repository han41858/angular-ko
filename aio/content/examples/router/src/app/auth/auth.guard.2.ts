// #docregion
import {inject} from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from './auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  // 로그인 페이지로 이동합니다.
  return router.parseUrl('/login');
};

// #enddocregion
