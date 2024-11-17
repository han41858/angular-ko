<!--
# Server-side rendering
-->
# 서버 사이드 렌더링

<!--
Server-side rendering (SSR) is a process that involves rendering pages on the server, resulting in initial HTML content which contains initial page state. Once the HTML content is delivered to a browser, Angular initializes the application and utilizes the data contained within the HTML.
-->
서버 사이드 렌더링(Server-side rendering, SSR)은 브라우저에서 초기 화면을 빠르게 띄우기 위해 HTML 파일을 서버에서 미리 렌더링하는 과정을 의미합니다.
첫 화면을 그릴 때는 미리 생성된 HTML 문서는 브라우저로 전달하여 바로 표시하고, 그 후에는 Angular가 이 문서를 재활용해서 애플리케이션 화면을 띄웁니다.


<!--
## Why use SSR?
-->
## 왜 SSR을 사용하나요?

<!--
The main advantages of SSR as compared to client-side rendering (CSR) are:

* **Improved performance**: SSR can improve the performance of web applications by delivering fully rendered HTML to the client, which can be parsed and displayed even before the application JavaScript is downloaded. This can be especially beneficial for users on low-bandwidth connections or mobile devices.
* **Improved Core Web Vitals**: SSR results in performance improvements that can be measured using [Core Web Vitals (CWV)](https://web.dev/learn-core-web-vitals/) statistics, such as reduced First Contentful Paint ([FCP](https://developer.chrome.com/en/docs/lighthouse/performance/first-contentful-paint/)) and Largest Contentful Paint ([LCP](https://web.dev/lcp/)), as well as Cumulative Layout Shift ([CLS](https://web.dev/cls/)).
* **Better SEO**: SSR can improve the search engine optimization (SEO) of web applications by making it easier for search engines to crawl and index the content of the application.
-->
서버 사이드 렌더링은 클라이언트 사이드 렌더링(client-side rendering, CSR)과 비교할 때 이런 이점이 있습니다:

* **성능 향상**: SSR을 활용하면 웹 애플리케이션의 동작을 정의한 JavaScript 파일을 내려받기도 전에, 온전히 렌더링 된 HTML 문서를 클라이언트로 전달할 수 있기 때문에 웹 애플리케이션의 초기 실행 성능이 향상됩니다. 전송 대역폭이 충분하지 않은 환경이나 모바일 장비라면 그 효과를 더 크게 느낄 수 있습니다.
* **코어 웹 바이탈 개선**: SSR을 활용해서 향상된 성능은 [코어 웹 바이탈(Core Web Vitals, CWV)](https://web.dev/learn-core-web-vitals/) 점수를 개선하는 데에도 유용합니다. 이 점수는 [FCP(First Contentful Paint)](https://developer.chrome.com/en/docs/lighthouse/performance/first-contentful-paint/)나 [LCP(Largest Contentful Paint)](https://web.dev/lcp/), [CLS(Cumulative Layout Shift)](https://web.dev/cls/)를 포함합니다.
* **SEO 개선**: SSR을 활용하면 검색엔진이 웹 애플리케이션의 내용을 크롤링하고 인덱스를 만드는 작업을 도울 수 있기 때문에, 검색엔진 최적화(Search Engine Optimization, SEO)를 개선할 수 있습니다.


<!--
## Enable server-side rendering
-->
## 서버 사이드 렌더링 활성화하기

<!--
To create a **new** application with SSR, run:

<code-example format="shell" language="shell">

ng new --ssr

</code-example>

To add SSR to an **existing** project, use the Angular CLI `ng add` command.

<code-example format="shell" language="shell">

ng add &commat;angular/ssr

</code-example>

These commands create and update application code to enable SSR and adds extra files to the project structure.

<code-example language="text">

my-app
|-- server.ts                       # application server
└── src
    |-- app
    |   └── app.config.server.ts    # server application configuration
    └── main.server.ts              # main server application bootstrapping

</code-example>

To verify that the application is server-side rendered, run it locally with `ng serve`. The initial HTML request should contain application content.
-->
SSR이 활성화 된 애플리케이션을 **새로** 생성하려면 이런 명령을 실행하면 됩니다:

<code-example format="shell" language="shell">

ng new --ssr

</code-example>

그리고 **기존에 있던** 프로젝트에 SSR 기능을 추가하려면 Angular CLI `ng add` 명령을 실행하면 됩니다:

<code-example format="shell" language="shell">

ng add &commat;angular/ssr

</code-example>

이 명령을 실행하면 애플리케이션에 이런 파일들이 추가됩니다.

<code-example language="text">

my-app
|-- server.ts                       # 애플리케이션 서버
└── src
    |-- app
    |   └── app.config.server.ts    # 서버 애플리케이션 환경설정 파일
    └── main.server.ts              # 메인 서버 애플리케이션 부트스트랩 파일

</code-example>

애플리케이션에 SSR이 적용되었는지 확인하려면, 로컬 환경에서 `ng serve` 명령을 실행하고 HTML 파일 안에 애플리케이션의 데이터가 포함되어 있는지 확인하면 됩니다.


<!--
## Configure server-side rendering
-->
## 환경설정

<!--
The `server.ts` file configures a Node.js Express server and Angular server-side rendering. `CommonEngine` is used to render an Angular application.

<code-example path="ssr/server.ts" region="navigation-request"></code-example>

The `render` method of `CommonEngine` accepts an object with the following properties:

| Properties          | Details                                                                                  | Default Value |
| ------------------- | ---------------------------------------------------------------------------------------- | ------------- |
| `bootstrap`         | A method which returns an `NgModule` or a promise which resolves to an `ApplicationRef`. |               |
| `providers`         | An array of platform level providers for the current request.                            |               |
| `url`               | The url of the page to render.                                                           |               |
| `inlineCriticalCss` | Whether to reduce render blocking requests by inlining critical CSS.                     | `true`        |
| `publicPath`        | Base path for browser files and assets.                                                  |               |
| `document`          | The initial DOM to use for bootstrapping the server application.                         |               |
| `documentFilePath`  | File path of the initial DOM to use to bootstrap the server application.                 |               |

Angular CLI will scaffold an initial server implementation focused on server-side rendering your Angular application. This server can be extended to support other features such as API routes, redirects, static assets, and more. See [Express documentation](https://expressjs.com/) for more details.
-->
`server.ts` 파일은 Angular 서버 사이드 렌더링 기능이 적용된 Node.js Express 실행 파일입니다.
Angular 애플리케이션을 렌더링 할 때는 `CommonEngine`을 사용하면 됩니다.

<code-example path="ssr/server.ts" region="navigation-request"></code-example>

`CommonEngine`의 `render` 메서드는 환경설정 객체를 인자로 받습니다.

| 프로퍼티          | 설명                                                                                  | 기본값 |
| ------------------- | ---------------------------------------------------------------------------------------- | ------------- |
| `bootstrap`         | 애플리케이션을 부트스트랩하고 `NgModule`이나 `ApplicationRef`를 반환합니다. |               |
| `providers`         | 애플리케이션을 부트스트랩할 때 플랫폼 계층에 필요한 프로바이더를 등록하는 배열입니다.                            |               |
| `url`               | 렌더링 할 주소의 URL을 지정합니다.                                                           |               |
| `inlineCriticalCss` | CSS 중 중요한 것들을 인라인으로 처리해서 렌더링이 중단되는 것을 줄입니다.                     | `true`        |
| `publicPath`        | 브라우저 파일과 리소스 파일의 기본 경로를 지정합니다.                                                  |               |
| `document`          | 서버 애플리케이션을 부트스트랩 할 기반 DOM을 지정합니다.                         |               |
| `documentFilePath`  | 서버 애플리케이션을 부트스트랩 할 기반 DOM 파일의 위치를 지정합니다.                 |               |

Angular CLI 명령을 실행하면 Angular 애플리케이션에 서버 사이드 렌더링을 적용한 파일 구조와 초기 코드를 생성합니다.
이제 개발자는 이 서버에 API 라우팅이나 리다이렉션, 정적 리소스를 제공하는 등의 기능을 추가하면 됩니다.
자세한 내용은 [Express 문서](https://expressjs.com/)를 참고하세요.


<!--
## Hydration
-->
## 하이드레이션

<!--
Hydration is the process that restores the server side rendered application on the client. This includes things like reusing the server rendered DOM structures, persisting the application state, transferring application data that was retrieved already by the server, and other processes. Hydration is enabled by default when you use SSR. You can find more info in [the hydration guide](guide/hydration).
-->
하이드레이션(Hydration)은 서버에서 미리 렌더링 한 애플리케이션을 클라이언트에서 온전하게 전환하는 과정을 의미합니다.
이 과정 중에는 서버에서 렌더링 할 때 사용했던 DOM 구조를 재사용하거나, 기존에 사용되던 애플리케이션의 상태를 유지할 수 있으며, 서버에서 받은 데이터를 재활용할 수도 있습니다.
하이드레이션은 SSR을 적용하면 기본으로 활성화됩니다.
자세한 내용은 [하이드레이션](guide/hydration) 문서를 참고하세요.


<!--
## Caching data when using HttpClient
-->
## HttpClient로 데이터 캐싱하기

<!--
When SSR is enabled, [`HttpClient`](api/common/http/HttpClient) responses are cached while running on the server. After that this information is serialized and transferred to a browser as a part of the initial HTML sent from the server. In a browser, [`HttpClient`](api/common/http/HttpClient) checks whether it has data in the cache and if so, reuses it instead of making a new HTTP request during initial application rendering. `HttpClient` stops using the cache once an application becomes [stable](api/core/ApplicationRef#isStable) while running in a browser.

Caching is performed by default for all `HEAD` and `GET` requests. You can configure this cache by using [`withHttpTransferCacheOptions`](/api/platform-browser/withHttpTransferCacheOptions) when providing hydration.

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true,
      }),
    ),
  ],
});
```
-->
SSR을 적용하고 나면 서버가 실행되는 동안 [`HttpClient`](api/common/http/HttpClient) 응답이 캐싱되었다가 클라이언트로 초기 HTML을 전달할 때 때 함께 전달합니다.
그래서 브라우저에서 [`HttpClient`](api/common/http/HttpClient)를 확인해서 데이터가 캐싱되었는지 확인하고, 캐싱된 데이터를 활용해서 서버로 보내는 요청을 줄일 수 있습니다.
`HttpClient` 캐시 데이터는 애플리케이션이 브라우저에서 [안정(stable)](api/core/ApplicationRef#isStable) 상태가 되면 캐싱을 중단합니다.

`HEAD`, `GET` 요청은 기본으로 캐싱됩니다.
캐싱 구성방식을 변경하려면 하이드레이션 설정 중 [`withHttpTransferCacheOptions`](/api/platform-browser/withHttpTransferCacheOptions) 을 변경하면 됩니다.

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true,
      }),
    ),
  ],
});
```


<!--
## Authoring server-compatible components
-->
## 서버 호환 컴포넌트 만들기

<!--
Some common browser APIs and capabilities might not be available on the server. Applications cannot make use of browser-specific global objects like `window`, `document`, `navigator`, or `location` as well as certain properties of `HTMLElement`.

In general, code which relies on browser-specific symbols should only be executed in the browser, not on the server. This can be enforced through the [`afterRender`](api/core/afterRender) and [`afterNextRender`](api/core/afterNextRender) lifecycle hooks. These are only executed on the browser and skipped on the server.

```ts
import { Component, ViewChild, afterNextRender } from '@angular/core';

@Component({
  selector: 'my-cmp',
  template: `<span #content>{{ ... }}</span>`,
})
export class MyComponent {
  @ViewChild('content') contentRef: ElementRef;

  constructor() {
    afterNextRender(() => {
      // Safe to check `scrollHeight` because this will only run in the browser, not the server.
      console.log('content height: ' + this.contentRef.nativeElement.scrollHeight);
    });
  }
}
```
-->
브라우저 API 중에는 서버에서 사용할 수 없는 것들이 있습니다.
브라우저에만 존재하는 `window`, `document`, `navigator`, `location`이나 `HTMLElement` 프로퍼티 같은 것들이 그렇습니다.

일반적으로 브라우저에서만 사용할 수 있는 기능은 서버에서 사용할 수 없으며 브라우저에서만 실행해야 합니다.
이 때 Angular 라이프싸이클 후킹 함수 중 [`afterRender`](api/core/afterRender)와 [`afterNextRender`](api/core/afterNextRender)를 활용하면 됩니다.
이 후킹 함수들은 브라우저에서만 실행되며 서버에서는 실행되지 않습니다.

```ts
import { Component, ViewChild, afterNextRender } from '@angular/core';

@Component({
  selector: 'my-cmp',
  template: `<span #content>{{ ... }}</span>`,
})
export class MyComponent {
  @ViewChild('content') contentRef: ElementRef;

  constructor() {
    afterNextRender(() => {
      // 이 코드는 서버에서 실행되지 않고 브라우저에서만 실행되며, `scrollHeight`가 존재하는지 확인하면 더 안전합니다.
      console.log('content height: ' + this.contentRef.nativeElement.scrollHeight);
    });
  }
}
```


<!--
## Using Angular Service Worker
-->
## Angular 서비스 워커 활용하기

<!--
If you are using Angular on the server in combination with the Angular service worker, the behavior deviates from the normal server-side rendering behavior. The initial server request will be rendered on the server as expected. However, after that initial request, subsequent requests are handled by the service worker and always client-side rendered.
-->
서버에서 실행되는 Angular 서비스 워커 동작은 일반적인 서버 사이드 렌더링 동작과 다릅니다.
최초 서버 요청은 서버에서 렌더링되지만, 초기 요청 이후에 서비스 워커가 요청하는 것들은 언제나 클라이언트 쪽에서 렌더링됩니다.


<!--
## Enable performance profiling
-->
## 성능 지표 활성화하기

<!--
The `CommonEngine` offers an option for initiating the collection of performance profiling data and displaying the results in the server console.
This can be done by setting `enablePerformanceProfiler` to `true`.

```ts
const commonEngine = new CommonEngine({
  enablePerformanceProfiler: true,
});
```
-->
`CommonEngine`은 성능 지표 데이터를 수집해서 서버 콘솔에 표시할 수 있습니다.
`enablePerformanceProfiler` 옵션을 `true`로 지정하면 됩니다.

```ts
const commonEngine = new CommonEngine({
  enablePerformanceProfiler: true,
});
```


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-11-03
