// #docplaster
// #docregion
import { inject } from '@angular/core';
import {
  CanActivateFn, CanMatchFn, Router,
  CanActivateChildFn,
  NavigationExtras,
  UrlTree
} from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanMatchFn|CanActivateFn|CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  // 더미 세션 ID를 생성합니다.
  const sessionId = 123456789;

  // 전역 쿼리 파라미터와 프래그먼트를 NavigationExtras 객체타입으로 전달합니다.
  const navigationExtras: NavigationExtras = {
    queryParams: { session_id: sessionId },
    fragment: 'anchor'
  };

  // 로그인 페이지로 이동하면서 인자를 함께 전달합니다.
  return router.createUrlTree(['/login'], navigationExtras);
};

