<!--
# Interceptors
-->

<a id="interceptors"></a>

# 인터셉터

<!--
`HttpClient` supports a form of middleware known as _interceptors_.

TLDR: Interceptors are middleware that allows common patterns around retrying, caching, logging, and authentication to be abstracted away from individual requests.

`HttpClient` supports two kinds of interceptors: functional and DI-based. Our recommendation is to use functional interceptors because they have more predictable behavior, especially in complex setups. Our examples in this guide use functional interceptors, and we cover [DI-based interceptors](#di-based-interceptors) in their own section at the end.
-->

`HttpClient`는 _인터셉터(interceptor)_ 라는 형태의 미들웨어를 지원합니다.

요약: 인터셉터는 재시도, 캐싱, 로그 기록, 인증 같은 공통 패턴을 개별 요청에서 분리해서 구현할 수 있도록 하는 미들웨어입니다.

`HttpClient`는 함수형 인터셉터와 DI 기반 인터셉터를 지원합니다.
특히 복잡한 설정에서 동작을 더 쉽게 예측할 수 있는 함수형 인터셉터를 사용하는 것을 권장합니다.
이 가이드의 예제는 함수형 인터셉터를 사용하며, [DI 기반 인터셉터](#di-based-interceptors)는 마지막에 별도로 설명합니다.

<!--
## Interceptors
-->

<a id="interceptors-1"></a>

## 인터셉터

<!--
Interceptors are generally functions that you can run for each request and have broad capabilities to affect the contents and overall flow of requests and responses. You can install multiple interceptors, which form an interceptor chain where each interceptor processes the request or response before forwarding it to the next interceptor in the chain.

You can use interceptors to implement a variety of common patterns, such as:

- Adding authentication headers to outgoing requests to a particular API.
- Retrying failed requests with exponential backoff.
- Caching responses for a period of time, or until invalidated by mutations.
- Customizing the parsing of responses.
- Measuring server response times and logging them.
- Driving UI elements such as a loading spinner while network operations are in progress.
- Collecting and batch requests made within a certain timeframe.
- Automatically failing requests after a configurable deadline or timeout.
- Regularly polling the server and refreshing results.
-->

인터셉터는 일반적으로 각 요청에 대해 실행할 수 있는 함수이며, 요청과 응답의 내용 및 전체 흐름을 폭넓게 제어할 수 있습니다.
여러 인터셉터를 등록하면 인터셉터 체인을 구성합니다.
각 인터셉터는 요청이나 응답을 처리한 뒤 체인의 다음 인터셉터로 전달합니다.

인터셉터로 다음과 같은 공통 패턴을 구현할 수 있습니다:

- 특정 API로 보내는 요청에 인증 헤더 추가하기
- 지수 백오프를 적용해서 실패한 요청 재시도하기
- 일정 시간 동안 또는 변경 작업으로 무효화될 때까지 응답 캐싱하기
- 응답 파싱 방식 커스터마이징하기
- 서버 응답 시간을 측정하고 기록하기
- 네트워크 작업 중 로딩 표시 같은 UI 엘리먼트 제어하기
- 일정 시간 동안 발생한 요청을 모아서 일괄 처리하기
- 설정한 기한이나 타임아웃이 지나면 요청을 자동으로 실패 처리하기
- 서버를 주기적으로 폴링해서 결과 갱신하기

<!--
## Defining an interceptor
-->

<a id="defining-an-interceptor"></a>

## 인터셉터 정의하기

<!--
The basic form of an interceptor is a function which receives the outgoing `HttpRequest` and a `next` function representing the next processing step in the interceptor chain.

For example, this `loggingInterceptor` will log the outgoing request URL to `console.log` before forwarding the request:

```ts
export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  return next(req);
}
```

In order for this interceptor to actually intercept requests, you must configure `HttpClient` to use it.
-->

인터셉터의 기본 형태는 전송할 `HttpRequest`와 인터셉터 체인의 다음 처리 단계를 나타내는 `next` 함수를 받는 함수입니다.

예를 들어 다음 `loggingInterceptor`는 요청을 전달하기 전에 요청 URL을 `console.log`로 출력합니다:

```ts
export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  return next(req);
}
```

이 인터셉터가 실제 요청을 가로채도록 하려면 `HttpClient`에서 사용하도록 설정해야 합니다.

<!--
## Configuring interceptors
-->

<a id="configuring-interceptors"></a>

## 인터셉터 설정하기

<!--
You declare the set of interceptors to use when configuring `HttpClient` through dependency injection, by using the `withInterceptors` feature:

```ts
bootstrapApplication(App, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor, cachingInterceptor]))],
});
```

The interceptors you configure are chained together in the order that you've listed them in the providers. In the above example, the `loggingInterceptor` would process the request and then forward it to the `cachingInterceptor`.
-->

의존성 주입으로 `HttpClient`를 설정할 때 `withInterceptors` 기능으로 사용할 인터셉터 목록을 선언합니다:

```ts
bootstrapApplication(App, {
  providers: [provideHttpClient(withInterceptors([loggingInterceptor, cachingInterceptor]))],
});
```

인터셉터는 프로바이더에 나열한 순서대로 연결됩니다.
위 예제에서는 `loggingInterceptor`가 요청을 처리한 뒤 `cachingInterceptor`로 전달합니다.

<!--
### Intercepting response events
-->

<a id="intercepting-response-events"></a>

### 응답 이벤트 가로채기

<!--
An interceptor may transform the `Observable` stream of `HttpEvent`s returned by `next` in order to access or manipulate the response. Because this stream includes all response events, inspecting the `.type` of each event may be necessary in order to identify the final response object.

```ts
export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }),
  );
}
```

TIP: Interceptors naturally associate responses with their outgoing requests, because they transform the response stream in a closure that captures the request object.
-->

인터셉터는 응답에 접근하거나 응답을 조작하기 위해 `next`가 반환하는 `HttpEvent`의 `Observable` 스트림을 변환할 수 있습니다.
이 스트림에는 모든 응답 이벤트가 포함되므로, 최종 응답 객체를 구분하려면 각 이벤트의 `.type`을 확인해야 할 수 있습니다.

```ts
export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }),
  );
}
```

팁: 인터셉터는 요청 객체를 참조하는 클로저 안에서 응답 스트림을 변환하므로, 응답을 해당 요청과 자연스럽게 연결할 수 있습니다.

<!--
## Modifying requests
-->

<a id="modifying-requests"></a>

## 요청 수정하기

<!--
Most aspects of `HttpRequest` and `HttpResponse` instances are _immutable_, and interceptors cannot directly modify them. Instead, interceptors apply mutations by cloning these objects using the `.clone()` operation, and specifying which properties should be mutated in the new instance. This might involve performing immutable updates on the value itself (like `HttpHeaders` or `HttpParams`).

For example, to add a header to a request:

```ts
const reqWithHeader = req.clone({
  headers: req.headers.set('X-New-Header', 'new header value'),
});
```

This immutability allows most interceptors to be idempotent if the same `HttpRequest` is submitted to the interceptor chain multiple times. This can happen for a few reasons, including when a request is retried after failure.

CRITICAL: The body of a request or response is **not** protected from deep mutations. If an interceptor must mutate the body, take care to handle running multiple times on the same request.
-->

`HttpRequest`와 `HttpResponse` 인스턴스의 대부분은 _불변_ 이므로 인터셉터에서 직접 수정할 수 없습니다.
대신 `.clone()`으로 객체를 복제하면서 새 인스턴스에서 변경할 프로퍼티를 지정합니다.
이 때 `HttpHeaders`나 `HttpParams`처럼 값 자체도 불변 방식으로 갱신해야 할 수 있습니다.

예를 들어 요청에 헤더를 추가하려면 다음과 같이 작성합니다:

```ts
const reqWithHeader = req.clone({
  headers: req.headers.set('X-New-Header', 'new header value'),
});
```

이런 불변성 덕분에 같은 `HttpRequest`를 인터셉터 체인에 여러 번 전달하더라도 대부분의 인터셉터는 멱등성을 유지할 수 있습니다.
요청 실패 후 재시도하는 경우를 비롯해 여러 상황에서 같은 요청이 반복해서 전달될 수 있습니다.

중요: 요청이나 응답 본문은 내부 값까지 변경되지 않도록 보호되는 것은 **아닙니다**.
인터셉터에서 본문을 변경해야 한다면 같은 요청에 여러 번 실행되는 상황을 주의해서 처리하세요.

<!--
## Dependency injection in interceptors
-->

<a id="dependency-injection-in-interceptors"></a>

## 인터셉터에서 의존성 주입하기

<!--
Interceptors are run in the _injection context_ of the injector which registered them, and can use Angular's [`inject`](/api/core/inject) API to retrieve dependencies.

For example, suppose an application has a service called `AuthService`, which creates authentication tokens for outgoing requests. An interceptor can inject and use this service:

```ts
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthService).getAuthToken();

  // Clone the request to add the authentication header.
  const newReq = req.clone({
    headers: req.headers.append('X-Authentication-Token', authToken),
  });
  return next(newReq);
}
```
-->

인터셉터는 자신을 등록한 인젝터의 _의존성 주입 컨텍스트_ 에서 실행되며, Angular의 [`inject`](/api/core/inject) API로 의존성을 가져올 수 있습니다.

예를 들어 애플리케이션에 전송할 요청의 인증 토큰을 만드는 `AuthService` 서비스가 있다고 해봅시다.
인터셉터에서 이 서비스를 주입해서 사용할 수 있습니다:

```ts
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // 현재 `AuthService`를 주입하고 인증 토큰을 가져옵니다:
  const authToken = inject(AuthService).getAuthToken();

  // 요청을 복제하면서 인증 헤더를 추가합니다.
  const newReq = req.clone({
    headers: req.headers.append('X-Authentication-Token', authToken),
  });
  return next(newReq);
}
```

<!--
## Request and response metadata
-->

<a id="request-and-response-metadata"></a>

## 요청과 응답 메타데이터

<!--
Often it's useful to include information in a request that's not sent to the backend, but is specifically meant for interceptors. `HttpRequest`s have a `.context` object which stores this kind of metadata as an instance of `HttpContext`. This object functions as a typed map, with keys of type `HttpContextToken`.

To illustrate how this system works, let's use metadata to control whether a caching interceptor is enabled for a given request.
-->

백엔드로 보내지는 않지만 인터셉터에서 사용할 정보를 요청에 포함하면 유용할 때가 많습니다.
`HttpRequest`의 `.context` 객체는 이런 메타데이터를 `HttpContext` 인스턴스에 저장합니다.
이 객체는 `HttpContextToken` 타입의 키를 사용하는, 타입이 지정된 맵으로 동작합니다.

이 기능이 어떻게 동작하는지 알아보기 위해 메타데이터로 특정 요청의 캐싱 인터셉터를 활성화할지 제어해 봅시다.

<!--
### Defining context tokens
-->

<a id="defining-context-tokens"></a>

### 컨텍스트 토큰 정의하기

<!--
To store whether the caching interceptor should cache a particular request in that request's `.context` map, define a new `HttpContextToken` to act as a key:

```ts
export const CACHING_ENABLED = new HttpContextToken<boolean>(() => true);
```

The provided function creates the default value for the token for requests that haven't explicitly set a value for it. Using a function ensures that if the token's value is an object or array, each request gets its own instance.
-->

캐싱 인터셉터가 특정 요청을 캐싱할지 여부를 요청의 `.context` 맵에 저장하려면, 키로 사용할 `HttpContextToken`을 새로 정의합니다:

```ts
export const CACHING_ENABLED = new HttpContextToken<boolean>(() => true);
```

전달한 함수는 토큰 값을 명시적으로 설정하지 않은 요청에서 사용할 기본값을 생성합니다.
함수를 사용하면 토큰 값이 객체나 배열일 때 각 요청이 별도의 인스턴스를 갖도록 할 수 있습니다.

<!--
### Reading the token in an interceptor
-->

<a id="reading-the-token-in-an-interceptor"></a>

### 인터셉터에서 토큰 읽기

<!--
An interceptor can then read the token and choose to apply caching logic or not based on its value:

```ts
export function cachingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (req.context.get(CACHING_ENABLED)) {
    // apply caching logic
    return ...;
  } else {
    // caching has been disabled for this request
    return next(req);
  }
}
```
-->

인터셉터에서 토큰을 읽고 값에 따라 캐싱 로직을 적용할지 결정할 수 있습니다:

```ts
export function cachingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (req.context.get(CACHING_ENABLED)) {
    // 캐싱 로직을 적용합니다.
    return ...;
  } else {
    // 이 요청에서는 캐싱을 사용하지 않습니다.
    return next(req);
  }
}
```

<!--
### Setting context tokens when making a request
-->

<a id="setting-context-tokens-when-making-a-request"></a>

### 요청을 보낼 때 컨텍스트 토큰 설정하기

<!--
When making a request via the `HttpClient` API, you can provide values for `HttpContextToken`s:

```ts
const data$ = http.get('/sensitive/data', {
  context: new HttpContext().set(CACHING_ENABLED, false),
});
```

Interceptors can read these values from the `HttpContext` of the request.
-->

`HttpClient` API로 요청을 보낼 때 `HttpContextToken` 값을 지정할 수 있습니다:

```ts
const data$ = http.get('/sensitive/data', {
  context: new HttpContext().set(CACHING_ENABLED, false),
});
```

인터셉터는 요청의 `HttpContext`에서 이 값을 읽을 수 있습니다.

<!--
### The request context is mutable
-->

<a id="the-request-context-is-mutable"></a>

### 요청 컨텍스트는 변경할 수 있습니다

<!--
Unlike other properties of `HttpRequest`s, the associated `HttpContext` is _mutable_. If an interceptor changes the context of a request that is later retried, the same interceptor will observe the context mutation when it runs again. This is useful for passing state across multiple retries if needed.
-->

`HttpRequest`의 다른 프로퍼티와 달리 `HttpContext`는 _변경할 수 있습니다_.
인터셉터가 요청의 컨텍스트를 변경하고 이후 요청이 재시도되면, 같은 인터셉터가 다시 실행될 때 변경된 컨텍스트를 확인할 수 있습니다.
여러 번의 재시도 사이에서 상태를 전달해야 할 때 유용합니다.

<!--
## Synthetic responses
-->

<a id="synthetic-responses"></a>

## 응답 직접 만들기

<!--
Most interceptors will simply invoke the `next` handler while transforming either the request or the response, but this is not strictly a requirement. This section discusses several of the ways in which an interceptor may incorporate more advanced behavior.

Interceptors are not required to invoke `next`. They may instead choose to construct responses through some other mechanism, such as from a cache or by sending the request through an alternate mechanism.

Constructing a response is possible using the `HttpResponse` constructor:

```ts
const resp = new HttpResponse({
  body: 'response body',
});
```
-->

대부분의 인터셉터는 요청이나 응답을 변환하면서 `next` 핸들러를 실행하지만, 반드시 그래야 하는 것은 아닙니다.
이 섹션에서는 인터셉터에 더 복잡한 동작을 구현하는 몇 가지 방법을 알아봅니다.

인터셉터는 `next`를 반드시 실행할 필요가 없습니다.
대신 캐시에서 응답을 만들거나 다른 방식으로 요청을 보내는 등 별도의 방법으로 응답을 구성할 수 있습니다.

`HttpResponse` 생성자를 사용하면 응답을 직접 만들 수 있습니다:

```ts
const resp = new HttpResponse({
  body: 'response body',
});
```

<!--
## Working with redirect information
-->

<a id="working-with-redirect-information"></a>

## 리다이렉트 정보 활용하기

<!--
When `HttpClient` uses the fetch backend, responses include a `redirected` property that indicates whether the response was the result of a redirect. This property aligns with the native Fetch API specification and can be useful in interceptors for handling redirect scenarios.

An interceptor can access and act upon the redirect information:

```ts
export function redirectTrackingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response && event.redirected) {
        console.log('Request to', req.url, 'was redirected to', event.url);
        // Handle redirect logic - maybe update analytics, security checks, etc.
      }
    }),
  );
}
```

You can also use the redirect information to implement conditional logic in your interceptors:

```ts
export function authRedirectInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response && event.redirected) {
        // Check if we were redirected to a login page
        if (event.url?.includes('/login')) {
          // Handle authentication redirect
          handleAuthRedirect();
        }
      }
    }),
  );
}
```
-->

`HttpClient`가 fetch 백엔드를 사용하면 응답에 `redirected` 프로퍼티가 포함됩니다.
이 프로퍼티는 응답이 리다이렉트의 결과인지 나타내며, 네이티브 Fetch API 명세와 같습니다.
인터셉터에서 리다이렉트 상황을 처리할 때 유용합니다.

인터셉터는 리다이렉트 정보를 확인하고 그에 따라 동작할 수 있습니다:

```ts
export function redirectTrackingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response && event.redirected) {
        console.log('Request to', req.url, 'was redirected to', event.url);
        // 분석 정보 갱신, 보안 검사 등 리다이렉트 로직을 처리합니다.
      }
    }),
  );
}
```

리다이렉트 정보를 사용해서 인터셉터에 조건부 로직을 구현할 수도 있습니다:

```ts
export function authRedirectInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response && event.redirected) {
        // 로그인 페이지로 리다이렉트되었는지 확인합니다.
        if (event.url?.includes('/login')) {
          // 인증 리다이렉트를 처리합니다.
          handleAuthRedirect();
        }
      }
    }),
  );
}
```

<!--
## Working with response types
-->

<a id="working-with-response-types"></a>

## 응답 타입 활용하기

<!--
When `HttpClient` uses the fetch backend, responses include a `type` property that indicates how the browser handled the response based on CORS policies and request mode. This property aligns with the native Fetch API specification and provides valuable insights for debugging CORS issues and understanding response accessibility.

The response `type` property can have the following values:

- `'basic'` - Same-origin response with all headers accessible
- `'cors'` - Cross-origin response with CORS headers properly configured
- `'opaque'` - Cross-origin response without CORS, headers and body may be limited
- `'opaqueredirect'` - Response from a redirected request in no-cors mode
- `'error'` - Network error occurred

An interceptor can use response type information for CORS debugging and error handling:

```ts
export function responseTypeInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    map((event) => {
      if (event.type === HttpEventType.Response) {
        // Handle different response types appropriately
        switch (event.responseType) {
          case 'opaque':
            // Limited access to response data
            console.warn('Limited response data due to CORS policy');
            break;
          case 'cors':
          case 'basic':
            // Full access to response data
            break;
          case 'error':
            // Handle network errors
            console.error('Network error in response');
            break;
        }
      }
    }),
  );
}
```
-->

`HttpClient`가 fetch 백엔드를 사용하면 응답에 `type` 프로퍼티가 포함됩니다.
이 프로퍼티는 브라우저가 CORS 정책과 요청 모드에 따라 응답을 어떻게 처리했는지 나타냅니다.
네이티브 Fetch API 명세와 같으며, CORS 문제를 디버깅하고 응답에 접근할 수 있는 범위를 이해하는 데 유용합니다.

응답의 `type` 프로퍼티에는 다음 값이 올 수 있습니다:

- `'basic'` - 모든 헤더에 접근할 수 있는 동일 출처 응답
- `'cors'` - CORS 헤더가 올바르게 설정된 교차 출처 응답
- `'opaque'` - CORS를 사용하지 않는 교차 출처 응답으로, 헤더와 본문 접근이 제한될 수 있음
- `'opaqueredirect'` - no-cors 모드에서 리다이렉트된 요청의 응답
- `'error'` - 네트워크 에러가 발생함

인터셉터에서 응답 타입 정보를 사용해서 CORS를 디버깅하고 에러를 처리할 수 있습니다:

```ts
export function responseTypeInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    map((event) => {
      if (event.type === HttpEventType.Response) {
        // 응답 타입에 맞게 처리합니다.
        switch (event.responseType) {
          case 'opaque':
            // 응답 데이터 접근이 제한됩니다.
            console.warn('Limited response data due to CORS policy');
            break;
          case 'cors':
          case 'basic':
            // 응답 데이터 전체에 접근할 수 있습니다.
            break;
          case 'error':
            // 네트워크 에러를 처리합니다.
            console.error('Network error in response');
            break;
        }
      }
    }),
  );
}
```

<!--
## DI-based interceptors
-->

<a id="di-based-interceptors"></a>

## DI 기반 인터셉터

<!--
`HttpClient` also supports interceptors which are defined as injectable classes and configured through the DI system. The capabilities of DI-based interceptors are identical to those of functional interceptors, but the configuration mechanism is different.

A DI-based interceptor is an injectable class which implements the `HttpInterceptor` interface:

```ts
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL: ' + req.url);
    return handler.handle(req);
  }
}
```

DI-based interceptors are configured through a dependency injection multi-provider:

```ts
bootstrapApplication(App, {
  providers: [
    provideHttpClient(
      // DI-based interceptors must be explicitly enabled.
      withInterceptorsFromDi(),
    ),

    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
  ],
});
```

DI-based interceptors run in the order that their providers are registered. In an app with an extensive and hierarchical DI configuration, this order can be very hard to predict.
-->

`HttpClient`는 주입 가능한 클래스로 정의하고 DI 시스템을 통해 설정하는 인터셉터도 지원합니다.
DI 기반 인터셉터의 기능은 함수형 인터셉터와 같지만 설정 방식이 다릅니다.

DI 기반 인터셉터는 `HttpInterceptor` 인터페이스를 구현하는 주입 가능한 클래스입니다:

```ts
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL: ' + req.url);
    return handler.handle(req);
  }
}
```

DI 기반 인터셉터는 의존성 주입의 다중 프로바이더로 설정합니다:

```ts
bootstrapApplication(App, {
  providers: [
    provideHttpClient(
      // DI 기반 인터셉터는 명시적으로 활성화해야 합니다.
      withInterceptorsFromDi(),
    ),

    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
  ],
});
```

DI 기반 인터셉터는 프로바이더가 등록된 순서로 실행됩니다.
DI 설정이 많고 여러 계층으로 구성된 애플리케이션에서는 이 순서를 예측하기가 매우 어려울 수 있습니다.
