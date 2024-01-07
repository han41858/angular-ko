// #docregion noop
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** 인자로 받은 HTTP 요청을 조작하지 않고, 다음 핸들러로 전달합니다. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
// #enddocregion noop

// #docregion noop-provider
import { Provider } from '@angular/core';

// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/** Provider for the Noop Interceptor. */
export const noopInterceptorProvider: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true };
// #enddocregion noop-provider
