<!--
# Test requests
-->

<a id="test-requests"></a>

# 요청 테스트하기

<!--
As for any external dependency, you must mock the HTTP backend so your tests can simulate interaction with a remote server. The `@angular/common/http/testing` library provides tools to capture requests made by the application, make assertions about them, and mock the responses to emulate your backend's behavior.

The testing library is designed for a pattern where the app executes code and makes requests first. The test then expects that certain requests have or have not been made, performs assertions against those requests, and finally provides responses by "flushing" each expected request.

Finally, tests can verify that the app made no unexpected requests.
-->

다른 외부 의존성과 마찬가지로 HTTP 백엔드도 모의 구현해서 테스트에서 원격 서버와의 상호작용을 재현해야 합니다.
`@angular/common/http/testing` 라이브러리는 애플리케이션이 보낸 요청을 가져와 검증하고, 응답을 모의 구현해서 백엔드 동작을 재현하는 도구를 제공합니다.

테스트 라이브러리는 애플리케이션이 먼저 코드를 실행해서 요청을 보내는 패턴을 기준으로 설계되었습니다.
그런 다음 테스트에서 특정 요청이 발생했는지 또는 발생하지 않았는지 확인하고 요청 내용을 검증한 뒤, 예상한 각 요청에 응답을 전달하는 "플러시(flush)"를 수행합니다.

마지막으로 애플리케이션이 예상하지 않은 요청을 보내지 않았는지 확인할 수 있습니다.

<!--
## Setup for testing
-->

<a id="setup-for-testing"></a>

## 테스트 설정하기

<!--
To begin testing usage of `HttpClient`, configure `TestBed` and include `provideHttpClientTesting()` in your test's setup. `HttpClient` is provided by Angular's test environment, and `provideHttpClientTesting()` configures it to use a test backend instead of the real network. It also provides `HttpTestingController`, which you'll use to interact with the test backend, set expectations about which requests have been made, and flush responses to those requests. `HttpTestingController` can be injected from `TestBed` once configured.

```ts
TestBed.configureTestingModule({
  providers: [
    // ... other test providers
    provideHttpClientTesting(),
  ],
});

const httpTesting = TestBed.inject(HttpTestingController);
```

Now when your tests make requests, they will hit the testing backend instead of the normal one. You can use `httpTesting` to make assertions about those requests.
-->

`HttpClient`를 사용하는 코드를 테스트하려면 `TestBed`를 구성하고 테스트 설정에 `provideHttpClientTesting()`을 포함합니다.
Angular 테스트 환경은 `HttpClient`를 제공하며, `provideHttpClientTesting()`은 실제 네트워크 대신 테스트 백엔드를 사용하도록 설정합니다.
이 함수는 `HttpTestingController`도 제공합니다.
이 컨트롤러로 테스트 백엔드와 상호작용하고, 어떤 요청이 발생했는지 검사하며, 요청에 응답을 전달할 수 있습니다.
설정을 마치면 `TestBed`에서 `HttpTestingController`를 주입받을 수 있습니다.

```ts
TestBed.configureTestingModule({
  providers: [
    // ... 다른 테스트 프로바이더
    provideHttpClientTesting(),
  ],
});

const httpTesting = TestBed.inject(HttpTestingController);
```

이제 테스트에서 요청을 보내면 일반 백엔드 대신 테스트 백엔드로 전달됩니다.
`httpTesting`을 사용해서 이 요청들을 검증할 수 있습니다.

<!--
### Configuring `HttpClient` in tests
-->

<a id="configuring-httpclient-in-tests"></a>

### 테스트에서 `HttpClient` 설정하기

<!--
If a test needs to configure `HttpClient` features, such as interceptors, include `provideHttpClient(...)` before `provideHttpClientTesting()`.
IMPORTANT: Keep in mind to provide `provideHttpClient()` **before** `provideHttpClientTesting()`, as `provideHttpClientTesting()` will overwrite parts of `provideHttpClient()`. Doing it the other way around can potentially break your tests.

```ts
TestBed.configureTestingModule({
  providers: [provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting()],
});
```
-->

테스트에서 인터셉터 같은 `HttpClient` 기능을 설정해야 한다면 `provideHttpClientTesting()` 앞에 `provideHttpClient(...)`를 포함합니다.
중요: `provideHttpClientTesting()`은 `provideHttpClient()` 설정의 일부를 덮어쓰므로, 반드시 `provideHttpClient()`를 `provideHttpClientTesting()` **앞에** 제공해야 합니다.
반대 순서로 제공하면 테스트가 제대로 동작하지 않을 수 있습니다.

```ts
TestBed.configureTestingModule({
  providers: [provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting()],
});
```

<!--
## Expecting and answering requests
-->

<a id="expecting-and-answering-requests"></a>

## 요청을 확인하고 응답하기

<!--
For example, you can write a test that expects a GET request to occur and provides a mock response:

```ts
TestBed.configureTestingModule({
  providers: [ConfigService, provideHttpClientTesting()],
});

const httpTesting = TestBed.inject(HttpTestingController);

// Load `ConfigService` and request the current configuration.
const service = TestBed.inject(ConfigService);
const config$ = service.getConfig<Config>();

// `firstValueFrom` subscribes to the `Observable`, which makes the HTTP request,
// and creates a `Promise` of the response.
const configPromise = firstValueFrom(config$);

// At this point, the request is pending, and we can assert it was made
// via the `HttpTestingController`:
const req = httpTesting.expectOne('/api/config', 'Request to load the configuration');

// We can assert various properties of the request if desired.
expect(req.request.method).toBe('GET');

// Flushing the request causes it to complete, delivering the result.
req.flush(DEFAULT_CONFIG);

// We can then assert that the response was successfully delivered by the `ConfigService`:
expect(await configPromise).toEqual(DEFAULT_CONFIG);

// Finally, we can assert that no other requests were made.
httpTesting.verify();
```

NOTE: `expectOne` will fail if the test has made more than one request which matches the given criteria.

As an alternative to asserting on `req.method`, you could instead use an expanded form of `expectOne` to also match the request method:

```ts
const req = httpTesting.expectOne(
  {
    method: 'GET',
    url: '/api/config',
  },
  'Request to load the configuration',
);
```

HELPFUL: The expectation APIs match against the full URL of requests, including any query parameters.

The last step, verifying that no requests remain outstanding, is common enough for you to move it into an `afterEach()` step:

```ts
afterEach(() => {
  // Verify that none of the tests make any extra HTTP requests.
  TestBed.inject(HttpTestingController).verify();
});
```
-->

예를 들어 GET 요청이 발생하는지 확인하고 모의 응답을 제공하는 테스트를 작성할 수 있습니다:

```ts
TestBed.configureTestingModule({
  providers: [ConfigService, provideHttpClientTesting()],
});

const httpTesting = TestBed.inject(HttpTestingController);

// `ConfigService`를 가져와 현재 설정을 요청합니다.
const service = TestBed.inject(ConfigService);
const config$ = service.getConfig<Config>();

// `firstValueFrom`은 `Observable`을 구독해서 HTTP 요청을 보내고
// 응답에 대한 `Promise`를 생성합니다.
const configPromise = firstValueFrom(config$);

// 이 시점에는 요청이 대기 중이며, `HttpTestingController`를 통해
// 요청이 발생했는지 확인할 수 있습니다:
const req = httpTesting.expectOne('/api/config', 'Request to load the configuration');

// 필요하면 요청의 여러 프로퍼티를 검사할 수 있습니다.
expect(req.request.method).toBe('GET');

// 요청에 응답을 전달하면 결과가 전달되고 요청이 완료됩니다.
req.flush(DEFAULT_CONFIG);

// 이제 `ConfigService`가 응답을 제대로 전달했는지 검사할 수 있습니다:
expect(await configPromise).toEqual(DEFAULT_CONFIG);

// 마지막으로 다른 요청이 발생하지 않았는지 검사합니다.
httpTesting.verify();
```

참고: 지정한 조건에 맞는 요청이 두 개 이상 발생하면 `expectOne`은 실패합니다.

`req.method`를 별도로 검사하는 대신, `expectOne`의 확장된 형태로 요청 메서드까지 함께 확인할 수 있습니다:

```ts
const req = httpTesting.expectOne(
  {
    method: 'GET',
    url: '/api/config',
  },
  'Request to load the configuration',
);
```

참고: 요청 확인 API는 쿼리 파라미터를 포함한 전체 URL을 비교합니다.

마지막 단계인 미처리 요청 확인은 여러 테스트에서 공통으로 필요하므로 `afterEach()`로 옮길 수 있습니다:

```ts
afterEach(() => {
  // 모든 테스트에서 추가 HTTP 요청이 발생하지 않았는지 확인합니다.
  TestBed.inject(HttpTestingController).verify();
});
```

<!--
## Handling more than one request at once
-->

<a id="handling-more-than-one-request-at-once"></a>

## 여러 요청을 한 번에 처리하기

<!--
If you need to respond to duplicate requests in your test, use the `match()` API instead of `expectOne()`. It takes the same arguments but returns an array of matching requests. Once returned, these requests are removed from future matching and you are responsible for flushing and verifying them.

```ts
const allGetRequests = httpTesting.match({method: 'GET'});
for (const req of allGetRequests) {
  // Handle responding to each request.
}
```
-->

테스트에서 중복 요청에 응답해야 한다면 `expectOne()` 대신 `match()` API를 사용합니다.
받는 인자는 같지만 조건에 맞는 요청의 배열을 반환합니다.
반환한 요청은 이후 매칭 대상에서 제외되므로, 직접 응답을 전달하고 검증해야 합니다.

```ts
const allGetRequests = httpTesting.match({method: 'GET'});
for (const req of allGetRequests) {
  // 각 요청에 응답합니다.
}
```

<!--
## Advanced matching
-->

<a id="advanced-matching"></a>

## 복잡한 조건으로 요청 찾기

<!--
All matching functions accept a predicate function for custom matching logic:

```ts
// Look for one request that has a request body.
const requestsWithBody = httpTesting.expectOne((req) => req.body !== null);
```

The `expectNone` function asserts that no requests match the given criteria.

```ts
// Assert that no mutation requests have been issued.
httpTesting.expectNone((req) => req.method !== 'GET');
```
-->

모든 매칭 함수에는 직접 작성한 조건 함수를 전달할 수 있습니다:

```ts
// 본문이 있는 요청 하나를 찾습니다.
const requestsWithBody = httpTesting.expectOne((req) => req.body !== null);
```

`expectNone` 함수는 지정한 조건에 맞는 요청이 없는지 검사합니다.

```ts
// 변경 요청이 발생하지 않았는지 검사합니다.
httpTesting.expectNone((req) => req.method !== 'GET');
```

<!--
## Testing error handling
-->

<a id="testing-error-handling"></a>

## 에러 처리 테스트하기

<!--
You should test your app's responses when HTTP requests fail.
-->

HTTP 요청이 실패했을 때 애플리케이션이 어떻게 대응하는지 테스트해야 합니다.

<!--
### Backend errors
-->

<a id="backend-errors"></a>

### 백엔드 에러

<!--
To test handling of backend errors (when the server returns a non-successful status code), flush requests with an error response that emulates what your backend would return when a request fails.

```ts
const req = httpTesting.expectOne('/api/config');
req.flush('Failed!', {status: 500, statusText: 'Internal Server Error'});

// Assert that the application successfully handled the backend error.
```
-->

서버가 성공이 아닌 상태 코드를 반환하는 백엔드 에러를 테스트하려면, 요청 실패 시 백엔드가 반환할 에러 응답을 만들어 요청에 전달합니다.

```ts
const req = httpTesting.expectOne('/api/config');
req.flush('Failed!', {status: 500, statusText: 'Internal Server Error'});

// 애플리케이션이 백엔드 에러를 제대로 처리했는지 검사합니다.
```

<!--
### Network errors
-->

<a id="network-errors"></a>

### 네트워크 에러

<!--
Requests can also fail due to network errors, which surface as `ProgressEvent` errors. These can be delivered with the `error()` method:

```ts
const req = httpTesting.expectOne('/api/config');
req.error(new ProgressEvent('network error!'));

// Assert that the application successfully handled the network error.
```
-->

요청은 네트워크 에러로 실패할 수도 있으며, 이런 에러는 `ProgressEvent`로 전달됩니다.
`error()` 메서드로 전달할 수 있습니다:

```ts
const req = httpTesting.expectOne('/api/config');
req.error(new ProgressEvent('network error!'));

// 애플리케이션이 네트워크 에러를 제대로 처리했는지 검사합니다.
```

<!--
## Testing an Interceptor
-->

<a id="testing-an-interceptor"></a>

## 인터셉터 테스트하기

<!--
You should test that your interceptors work under the desired circumstances.

For example, an application may be required to add an authentication token generated by a service to each outgoing request.
This behavior can be enforced with the use of an interceptor:

```ts
export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);

  const clonedRequest = request.clone({
    headers: request.headers.append('X-Authentication-Token', authService.getAuthToken()),
  });
  return next(clonedRequest);
}
```

The `TestBed` configuration for this interceptor should rely on the `withInterceptors` feature.

```ts
TestBed.configureTestingModule({
  providers: [
    AuthService,
    // Testing one interceptor at a time is recommended.
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClientTesting(),
  ],
});
```

The `HttpTestingController` can retrieve the request instance that can then be inspected to ensure that the request was modified.

```ts
const service = TestBed.inject(AuthService);
const http = TestBed.inject(HttpClient);

// Make an HTTP request.
const response = firstValueFrom(http.get('/api/config'));

const req = httpTesting.expectOne('/api/config');

expect(req.request.headers.get('X-Authentication-Token')).toEqual(service.getAuthToken());
```

A similar interceptor could be implemented with class-based interceptors:

```ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      headers: request.headers.append('X-Authentication-Token', this.authService.getAuthToken()),
    });
    return next.handle(clonedRequest);
  }
}
```

In order to test it, the `TestBed` configuration should instead be:

```ts
TestBed.configureTestingModule({
  providers: [
    AuthService,
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClientTesting(),
    // We rely on the HTTP_INTERCEPTORS token to register the AuthInterceptor as an HttpInterceptor
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
});
```
-->

인터셉터가 의도한 상황에서 제대로 동작하는지 테스트해야 합니다.

예를 들어 전송하는 모든 요청에 서비스가 생성한 인증 토큰을 추가해야 하는 애플리케이션이 있을 수 있습니다.
인터셉터를 사용하면 이 동작을 보장할 수 있습니다:

```ts
export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);

  const clonedRequest = request.clone({
    headers: request.headers.append('X-Authentication-Token', authService.getAuthToken()),
  });
  return next(clonedRequest);
}
```

이 인터셉터의 `TestBed` 설정에서는 `withInterceptors` 기능을 사용합니다.

```ts
TestBed.configureTestingModule({
  providers: [
    AuthService,
    // 인터셉터를 한 번에 하나씩 테스트하는 것을 권장합니다.
    provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClientTesting(),
  ],
});
```

`HttpTestingController`로 요청 인스턴스를 가져와 검사하면 요청이 수정되었는지 확인할 수 있습니다.

```ts
const service = TestBed.inject(AuthService);
const http = TestBed.inject(HttpClient);

// HTTP 요청을 보냅니다.
const response = firstValueFrom(http.get('/api/config'));

const req = httpTesting.expectOne('/api/config');

expect(req.request.headers.get('X-Authentication-Token')).toEqual(service.getAuthToken());
```

같은 기능을 클래스 기반 인터셉터로 구현할 수도 있습니다:

```ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const clonedRequest = request.clone({
      headers: request.headers.append('X-Authentication-Token', this.authService.getAuthToken()),
    });
    return next.handle(clonedRequest);
  }
}
```

이 인터셉터를 테스트하려면 `TestBed`를 다음과 같이 설정합니다:

```ts
TestBed.configureTestingModule({
  providers: [
    AuthService,
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClientTesting(),
    // HTTP_INTERCEPTORS 토큰으로 AuthInterceptor를 HttpInterceptor로 등록합니다.
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
});
```
