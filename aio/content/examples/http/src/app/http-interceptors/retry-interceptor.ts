// #docplaster
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
/*
// #docregion reading-context
import {retry} from 'rxjs';
// #enddocregion reading-context
*/
// #docregion mutable-context
import {retry, tap} from 'rxjs/operators';
// #enddocregion mutable-context

// #docregion context-token, mutable-context
export const RETRY_COUNT = new HttpContextToken(() => 3);
// #enddocregion context-token
export const ERROR_COUNT = new HttpContextToken(() => 0);
// #enddocregion mutable-context

export class FakeService {
  constructor(private httpClient: HttpClient) {
    // #docregion set-context
    this.httpClient
        .get('/data/feed', {
          context: new HttpContext().set(RETRY_COUNT, 5),
        })
        .subscribe(results => {/* ... */});
    // #enddocregion set-context
  }
}

// #docregion reading-context, mutable-context

export class RetryInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const retryCount = req.context.get(RETRY_COUNT);

    return next.handle(req).pipe(
        // #enddocregion reading-context
        tap({
              // 에러가 발생하면 ERROR_COUNT를 증가시킵니다.
             error: () => req.context.set(ERROR_COUNT, req.context.get(ERROR_COUNT) + 1)
            }),
        // #docregion reading-context
        // 지정된 횟수만큼 재시도합니다.
        retry(retryCount),
    );
  }
}
// #enddocregion reading-context, mutable-context
