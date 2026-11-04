<!--
# Setting up `HttpClient`
-->

<a id="setting-up-httpclient"></a>

# `HttpClient` 설정하기

<!--
`HttpClient` is available for injection by default in Angular v21 and later.
-->

Angular v21 이상에서는 별도 설정 없이 `HttpClient`를 주입할 수 있습니다.

<!--
## Providing `HttpClient` through dependency injection
-->

<a id="providing-httpclient-through-dependency-injection"></a>

## 의존성 주입으로 `HttpClient` 제공하기

<!--
You can use the `provideHttpClient` helper function to configure the default HTTP feature set or add features in the application `providers` in `app.config.ts`.

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(/* add features here, such as withInterceptors(...) */)],
};
```

If your app is using NgModule-based bootstrap instead, you can include `provideHttpClient` in the providers of your app's NgModule to configure the default HTTP feature set or add features:

```ts
@NgModule({
  providers: [provideHttpClient(/* add features here, such as withInterceptors(...) */)],
  // ... other application configuration
})
export class AppModule {}
```

You can then inject the `HttpClient` service as a dependency of your components, services, or other classes:

```ts
@Service()
export class ConfigService {
  private http = inject(HttpClient);
  // This service can now make HTTP requests via `this.http`.
}
```
-->

`app.config.ts`의 애플리케이션 `providers`에서 `provideHttpClient` 헬퍼 함수를 사용하면 기본 HTTP 기능을 설정하거나 추가 기능을 활성화할 수 있습니다.

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(/* withInterceptors(...) 등의 기능을 여기에 추가합니다. */)],
};
```

NgModule 기반으로 부트스트랩하는 애플리케이션이라면 애플리케이션 NgModule의 프로바이더에 `provideHttpClient`를 포함하여 기본 HTTP 기능을 설정하거나 추가 기능을 활성화할 수 있습니다:

```ts
@NgModule({
  providers: [provideHttpClient(/* withInterceptors(...) 등의 기능을 여기에 추가합니다. */)],
  // ... 애플리케이션의 다른 설정
})
export class AppModule {}
```

이제 컴포넌트, 서비스, 다른 클래스에 `HttpClient` 서비스를 의존성으로 주입할 수 있습니다:

```ts
@Service()
export class ConfigService {
  private http = inject(HttpClient);
  // 이제 이 서비스에서 `this.http`로 HTTP 요청을 보낼 수 있습니다.
}
```

<!--
## Configuring features of `HttpClient`
-->

<a id="configuring-features-of-httpclient"></a>

## `HttpClient` 기능 설정하기

<!--
`provideHttpClient` accepts a list of optional feature configurations to enable or configure different aspects of the client. This section details the optional features and their usage.
-->

`provideHttpClient`에는 클라이언트의 여러 기능을 활성화하거나 설정하는 선택적 기능 설정 목록을 전달할 수 있습니다.
이 섹션에서는 선택적으로 사용할 수 있는 기능과 사용 방법을 알아봅니다.

<!--
### `withXhr`
-->


### `withXhr`

<!--
```ts
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withXhr())],
};
```

By default, `HttpClient` uses the [`fetch`](https://developer.mozilla.org/docs/Web/API/Fetch_API) API to make requests. The `withXhr` feature switches the client to use the [`XMLHttpRequest`](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest) API instead.

`fetch` is a more modern API and is available in a few environments where `XMLHttpRequest` is not supported. It does have a few limitations, such as not producing upload progress events.
-->

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withXhr())],
};
```

`HttpClient`는 기본적으로 [`fetch`](https://developer.mozilla.org/docs/Web/API/Fetch_API) API로 요청을 보냅니다.
`withXhr` 기능을 사용하면 대신 [`XMLHttpRequest`](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest) API를 사용하도록 바꿀 수 있습니다.

`fetch`는 더 현대적인 API이며, `XMLHttpRequest`를 지원하지 않는 일부 환경에서도 사용할 수 있습니다.
다만 업로드 진행 상황 이벤트를 제공하지 않는 등의 제약이 있습니다.

<!--
<docs-callout critical title="Do not use `withXhr` in server-side rendering (SSR) environments">

XHR support on the server is **deprecated** and is intended to be removed in Angular 23. The underlying `xhr2` library does not safely handle redirects: it can forward `Authorization` headers on cross-origin redirects and is susceptible to denial-of-service (DoS) via redirect loops. For SSR applications, use the default `fetch` backend instead.

</docs-callout>
-->

<docs-callout critical title="서버 사이드 렌더링(SSR) 환경에서는 withXhr를 사용하지 마세요">

서버에서의 XHR 사용은 **사용 중단 권고** 상태이며 Angular 23에서 제거할 예정입니다. 기반 라이브러리인 `xhr2`는 리다이렉트를 안전하게 처리하지 못합니다. 교차 출처 리다이렉트에 `Authorization` 헤더를 전달할 수 있으며, 리다이렉트 루프로 서비스 거부(DoS) 공격을 받을 수 있습니다. SSR 애플리케이션에서는 기본 `fetch` 백엔드를 사용하세요.

</docs-callout>

<!--
### `withInterceptors(...)`
-->


### `withInterceptors(...)`

<!--
`withInterceptors` configures the set of interceptor functions which will process requests made through `HttpClient`. See the [interceptor guide](guide/http/interceptors) for more information.
-->

`withInterceptors`는 `HttpClient`가 보내는 요청을 처리할 인터셉터 함수 목록을 설정합니다.
자세한 내용은 [인터셉터 가이드](guide/http/interceptors)를 참고하세요.

<!--
### `withInterceptorsFromDi()`
-->


### `withInterceptorsFromDi()`

<!--
`withInterceptorsFromDi` includes the older style of class-based interceptors in the `HttpClient` configuration. See the [interceptor guide](guide/http/interceptors) for more information.

HELPFUL: Functional interceptors (through `withInterceptors`) have more predictable ordering and we recommend them over DI-based interceptors.
-->

`withInterceptorsFromDi`는 이전 방식인 클래스 기반 인터셉터를 `HttpClient` 설정에 포함합니다.
자세한 내용은 [인터셉터 가이드](guide/http/interceptors)를 참고하세요.

참고: `withInterceptors`를 사용하는 함수형 인터셉터는 실행 순서를 더 쉽게 예측할 수 있으므로, DI 기반 인터셉터보다 함수형 인터셉터를 사용하는 것을 권장합니다.

<!--
### `withRequestsMadeViaParent()`
-->


### `withRequestsMadeViaParent()`

<!--
By default, when you configure `HttpClient` using `provideHttpClient` within a given injector, this configuration overrides any configuration for `HttpClient` which may be present in the parent injector.

When you add `withRequestsMadeViaParent()`, `HttpClient` is configured to instead pass requests up to the `HttpClient` instance in the parent injector, once they've passed through any configured interceptors at this level. This is useful if you want to _add_ interceptors in a child injector while still sending the request through the parent injector's interceptors.

CRITICAL: You must configure an instance of `HttpClient` above the current injector, or this option is not valid and you'll get a runtime error when you try to use it.
-->

특정 인젝터에서 `provideHttpClient`로 `HttpClient`를 설정하면, 기본적으로 상위 인젝터에 있는 `HttpClient` 설정보다 이 설정이 우선합니다.

`withRequestsMadeViaParent()`를 추가하면 현재 수준에 설정한 인터셉터를 모두 거친 뒤 요청을 상위 인젝터의 `HttpClient` 인스턴스로 전달하도록 바뀝니다.
상위 인젝터의 인터셉터를 거쳐 요청을 보내면서 하위 인젝터에 인터셉터를 _추가_ 하고 싶은 경우에 유용합니다.

중요: 현재 인젝터보다 상위에 `HttpClient` 인스턴스를 반드시 설정해야 합니다.
그렇지 않으면 이 옵션은 유효하지 않으며, 사용하려고 할 때 런타임 오류가 발생합니다.

<!--
### `withJsonpSupport()`
-->


### `withJsonpSupport()`

<!--
<docs-callout critical title="JSONP is deprecated">

`withJsonpSupport`, `HttpClientJsonpModule`, and the `.jsonp()` method on `HttpClient` are deprecated because JSONP can cause cross-site scripting (XSS) vulnerabilities. Use standard HTTP requests with [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS) instead.

</docs-callout>
-->

<docs-callout critical title="JSONP는 사용 중단을 권고합니다">

JSONP는 크로스 사이트 스크립팅(XSS) 취약점을 유발할 수 있으므로 `withJsonpSupport`, `HttpClientJsonpModule`, `HttpClient`의 `.jsonp()` 메서드는 사용 중단을 권고합니다. 대신 [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS)를 사용하는 표준 HTTP 요청을 사용하세요.

</docs-callout>

<!--
Including `withJsonpSupport` enables the `.jsonp()` method on `HttpClient`, which makes a GET request via the [JSONP convention](https://en.wikipedia.org/wiki/JSONP) for cross-domain loading of data.

HELPFUL: Prefer using [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS) to make cross-domain requests instead of JSONP when possible.
-->

`withJsonpSupport`를 포함하면 `HttpClient`의 `.jsonp()` 메서드를 사용할 수 있습니다.
이 메서드는 다른 도메인의 데이터를 불러오기 위해 [JSONP 규약](https://en.wikipedia.org/wiki/JSONP)에 따라 GET 요청을 보냅니다.

참고: 다른 도메인으로 요청을 보낼 때는 가능하면 JSONP 대신 [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS)를 사용하는 것이 좋습니다.

<!--
### `withXsrfConfiguration(...)`
-->


### `withXsrfConfiguration(...)`

<!--
Including this option allows customization of `HttpClient`'s built-in XSRF security functionality. See the [security guide](best-practices/security) for more information.
-->

이 옵션을 포함하면 `HttpClient`에 내장된 XSRF 보안 기능을 커스터마이징할 수 있습니다.
자세한 내용은 [보안 가이드](best-practices/security)를 참고하세요.

<!--
### `withNoXsrfProtection()`
-->


### `withNoXsrfProtection()`

<!--
Including this option disables `HttpClient`'s built-in XSRF security functionality. See the [security guide](best-practices/security) for more information.
-->

이 옵션을 포함하면 `HttpClient`에 내장된 XSRF 보안 기능을 비활성화합니다.
자세한 내용은 [보안 가이드](best-practices/security)를 참고하세요.

<!--
## `HttpClientModule`-based configuration
-->

<a id="httpclientmodule-based-configuration"></a>

## `HttpClientModule` 기반 설정

<!--
Some applications may configure `HttpClient` using the older API based on NgModules.

This table lists the NgModules available from `@angular/common/http` and how they relate to the provider configuration functions above.

| **NgModule**                            | `provideHttpClient()` equivalent                         |
| --------------------------------------- | -------------------------------------------------------- |
| `HttpClientModule`                      | `provideHttpClient(withInterceptorsFromDi(), withXhr())` |
| `HttpClientJsonpModule` (deprecated)    | `withJsonpSupport()` (deprecated)                        |
| `HttpClientXsrfModule.withOptions(...)` | `withXsrfConfiguration(...)`                             |
| `HttpClientXsrfModule.disable()`        | `withNoXsrfProtection()`                                 |

NOTE: `HttpClientModule` and `HttpClientXsrfModule` are also deprecated. Use `provideHttpClient` with the corresponding features instead.

<docs-callout important title="Use caution when using HttpClientModule in multiple injectors">
When `HttpClientModule` is present in multiple injectors, the behavior of interceptors is poorly defined and depends on the exact options and provider/import ordering.

Prefer `provideHttpClient` for multi-injector configurations, as it has more stable behavior. See the `withRequestsMadeViaParent` feature above.
</docs-callout>
-->

일부 애플리케이션은 NgModule 기반의 이전 API로 `HttpClient`를 설정할 수 있습니다.

다음 표는 `@angular/common/http`에서 제공하는 NgModule과 앞에서 살펴본 프로바이더 설정 함수의 대응 관계입니다.

| **NgModule**                             | 대응하는 `provideHttpClient()` 설정                      |
| ---------------------------------------- | -------------------------------------------------------- |
| `HttpClientModule`                       | `provideHttpClient(withInterceptorsFromDi(), withXhr())` |
| `HttpClientJsonpModule` (사용 중단 권고) | `withJsonpSupport()` (사용 중단 권고)                    |
| `HttpClientXsrfModule.withOptions(...)`  | `withXsrfConfiguration(...)`                             |
| `HttpClientXsrfModule.disable()`         | `withNoXsrfProtection()`                                 |

참고: `HttpClientModule`과 `HttpClientXsrfModule`도 사용 중단을 권고합니다. 대신 `provideHttpClient`에 대응하는 기능을 함께 설정하세요.

<docs-callout important title="여러 인젝터에서 HttpClientModule을 사용할 때 주의하세요">
여러 인젝터에 `HttpClientModule`이 있으면 인터셉터의 동작이 명확하게 정해지지 않으며, 구체적인 옵션과 프로바이더 및 모듈 로드 순서에 따라 달라집니다.

인젝터를 여러 개 사용하는 구성에서는 동작이 더 안정적인 `provideHttpClient`를 사용하는 것이 좋습니다.
앞에서 설명한 `withRequestsMadeViaParent` 기능을 참고하세요.
</docs-callout>
