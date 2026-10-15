<!--
# Server and hybrid rendering
-->

<a id="server-and-hybrid-rendering"></a>

# 서버 렌더링과 하이브리드 렌더링

<!--
Angular ships all applications as client-side rendered (CSR) by default. While this approach delivers an initial payload that's lightweight, it introduces trade-offs including slower load times, degraded performance metrics, and higher resource demands since the user's device performs most of the computations. As a result, many applications achieve significant performance improvements by integrating server-side rendering (SSR) into a hybrid rendering strategy.
-->

Angular 애플리케이션은 기본적으로 클라이언트 사이드 렌더링(CSR) 방식으로 제공됩니다.
이 방식은 초기 전송 데이터를 가볍게 만들지만, 사용자 기기에서 대부분의 연산을 수행하므로 로드 시간이 길어지고 성능 지표가 나빠지며 더 많은 리소스를 요구할 수 있습니다.
따라서 많은 애플리케이션은 서버 사이드 렌더링(SSR)을 하이브리드 렌더링 전략에 통합해서 성능을 크게 개선합니다.

<!--
## What is hybrid rendering?
-->

<a id="what-is-hybrid-rendering"></a>

## 하이브리드 렌더링이 무엇인가요?

<!--
Hybrid rendering allows developers to leverage the benefits of server-side rendering (SSR), pre-rendering (also known as "static site generation" or SSG) and client-side rendering (CSR) to optimize your Angular application. It gives you fine-grained control over how the different parts of your app are rendered to give your users the best experience possible.
-->

하이브리드 렌더링을 사용하면 서버 사이드 렌더링(SSR), 사전 렌더링("정적 사이트 생성" 또는 SSG), 클라이언트 사이드 렌더링(CSR)의 장점을 활용해서 Angular 애플리케이션을 최적화할 수 있습니다.
애플리케이션의 각 부분을 어떻게 렌더링할지 세밀하게 제어해서 사용자에게 최상의 경험을 제공할 수 있습니다.

<!--
## Setting up hybrid rendering
-->

<a id="setting-up-hybrid-rendering"></a>

## 하이브리드 렌더링 설정하기

<!--
You can create a **new** project with hybrid rendering by using the server-side rendering flag (i.e., `--ssr`) with the Angular CLI `ng new` command:

```shell
ng new --ssr
```

You can also enable hybrid rendering by adding server-side rendering to an existing project with the `ng add` command:

```shell
ng add @angular/ssr
```

NOTE: By default, Angular prerenders your entire application and generates a server file. To disable this and create a fully static app, set `outputMode` to `static`. To enable SSR, update the server routes to use `RenderMode.Server`. For more details, see [`Server routing`](#server-routing) and [`Generate a fully static application`](#generate-a-fully-static-application).
-->

Angular CLI의 `ng new` 명령에 서버 사이드 렌더링 플래그인 `--ssr`을 지정하면 하이브리드 렌더링을 사용하는 **새** 프로젝트를 만들 수 있습니다:

```shell
ng new --ssr
```

`ng add` 명령으로 기존 프로젝트에 서버 사이드 렌더링을 추가해서 하이브리드 렌더링을 활성화할 수도 있습니다:

```shell
ng add @angular/ssr
```

참고: 기본적으로 Angular는 애플리케이션 전체를 사전 렌더링하고 서버 파일을 생성합니다.
이 동작을 끄고 완전한 정적 애플리케이션을 만들려면 `outputMode`를 `static`으로 설정하세요.
SSR을 활성화하려면 서버 라우트가 `RenderMode.Server`를 사용하도록 수정하세요.
자세한 내용은 [`서버 라우팅`](#server-routing)과 [`완전한 정적 애플리케이션 생성하기`](#generate-a-fully-static-application)를 참고하세요.

<!--
## Server routing
-->

<a id="server-routing"></a>

## 서버 라우팅

<!--
### Configuring server routes
-->

<a id="configuring-server-routes"></a>

### 서버 라우트 설정하기

<!--
You can create a server route config by declaring an array of [`ServerRoute`](api/ssr/ServerRoute 'API reference') objects. This configuration typically lives in a file named `app.routes.server.ts`.

```typescript {header: "app.routes.server.ts"}
import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // This renders the "/" route on the client (CSR)
    renderMode: RenderMode.Client,
  },
  {
    path: 'about', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'profile', // This page requires user-specific data, so we use SSR
    renderMode: RenderMode.Server,
  },
  {
    path: '**', // All other routes will be rendered on the server (SSR)
    renderMode: RenderMode.Server,
  },
];
```

You can add this config to your application with [`provideServerRendering`](api/ssr/provideServerRendering 'API reference') using the [`withRoutes`](api/ssr/withRoutes 'API reference') function:

```typescript {header: "app.config.server.ts"}
import {provideServerRendering, withRoutes} from '@angular/ssr';
import {serverRoutes} from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    // ... other providers ...
  ],
};
```

When using the [App shell pattern](ecosystem/service-workers/app-shell), you must specify the component to be used as the app shell for client-side rendered routes. To do this, use the [`withAppShell`](api/ssr/withAppShell 'API reference') feature:

```typescript
import {provideServerRendering, withRoutes, withAppShell} from '@angular/ssr';
import {AppShell} from './app-shell';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes), withAppShell(AppShell)),
    // ... other providers ...
  ],
};
```
-->

[`ServerRoute`](api/ssr/ServerRoute 'API 레퍼런스') 객체의 배열을 선언해서 서버 라우트를 설정할 수 있습니다.
이 설정은 일반적으로 `app.routes.server.ts` 파일에 작성합니다.

```typescript {header: "app.routes.server.ts"}
import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // "/" 라우트는 클라이언트에서 렌더링합니다(CSR).
    renderMode: RenderMode.Client,
  },
  {
    path: 'about', // 정적 페이지이므로 사전 렌더링합니다(SSG).
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'profile', // 사용자별 데이터가 필요한 페이지이므로 SSR을 사용합니다.
    renderMode: RenderMode.Server,
  },
  {
    path: '**', // 다른 모든 라우트는 서버에서 렌더링합니다(SSR).
    renderMode: RenderMode.Server,
  },
];
```

[`withRoutes`](api/ssr/withRoutes 'API 레퍼런스') 함수를 [`provideServerRendering`](api/ssr/provideServerRendering 'API 레퍼런스')과 함께 사용해서 애플리케이션에 이 설정을 추가할 수 있습니다:

```typescript {header: "app.config.server.ts"}
import {provideServerRendering, withRoutes} from '@angular/ssr';
import {serverRoutes} from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    // ... 다른 프로바이더 ...
  ],
};
```

[앱 셸 패턴](ecosystem/service-workers/app-shell)을 사용한다면 클라이언트에서 렌더링하는 라우트의 앱 셸로 사용할 컴포넌트를 지정해야 합니다.
[`withAppShell`](api/ssr/withAppShell 'API 레퍼런스') 기능으로 지정하세요:

```typescript
import {provideServerRendering, withRoutes, withAppShell} from '@angular/ssr';
import {AppShell} from './app-shell';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes), withAppShell(AppShell)),
    // ... 다른 프로바이더 ...
  ],
};
```

<!--
### Rendering modes
-->

<a id="rendering-modes"></a>

### 렌더링 모드

<!--
The server routing configuration lets you specify how each route in your application should render by setting a [`RenderMode`](api/ssr/RenderMode 'API reference'):

| Rendering mode      | Description                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Server (SSR)**    | Renders the application on the server for each request, sending a fully populated HTML page to the browser. |
| **Client (CSR)**    | Renders the application in the browser. This is the default Angular behavior.                               |
| **Prerender (SSG)** | Prerenders the application at build time, generating static HTML files for each route.                      |
-->

서버 라우팅 설정에서 [`RenderMode`](api/ssr/RenderMode 'API 레퍼런스')를 지정하면 애플리케이션의 각 라우트를 어떻게 렌더링할지 정할 수 있습니다:

| 렌더링 모드         | 설명                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| **Server (SSR)**    | 요청마다 서버에서 애플리케이션을 렌더링하고, 콘텐츠가 완성된 HTML 페이지를 브라우저로 보냅니다. |
| **Client (CSR)**    | 브라우저에서 애플리케이션을 렌더링합니다. Angular의 기본 동작입니다.                            |
| **Prerender (SSG)** | 빌드 시점에 애플리케이션을 사전 렌더링해서 각 라우트의 정적 HTML 파일을 생성합니다.             |

<!--
#### Choosing a rendering mode
-->

<a id="choosing-a-rendering-mode"></a>

#### 렌더링 모드 선택하기

<!--
Each rendering mode has different benefits and drawbacks. You can choose rendering modes based on the specific needs of your application.
-->

렌더링 모드마다 장단점이 다릅니다.
애플리케이션의 구체적인 요구 사항에 맞춰 렌더링 모드를 선택할 수 있습니다.

<!--
##### Client-side rendering (CSR)
-->

<a id="client-side-rendering-csr"></a>

##### 클라이언트 사이드 렌더링(CSR)

<!--
Client-side rendering has the simplest development model, as you can write code that assumes it always runs in a web browser. This lets you use a wide range of client-side libraries that also assume they run in a browser.

Client-side rendering generally has worse performance than other rendering modes, as it must download, parse, and execute your page's JavaScript before the user can see any rendered content. If your page fetches more data from the server as it renders, users also have to wait for those additional requests before they can view the complete content.

If your page is indexed by search crawlers, client-side rendering may negatively affect search engine optimization (SEO), as search crawlers have limits to how much JavaScript they execute when indexing a page.

When client-side rendering, the server does not need to do any work to render a page beyond serving static JavaScript assets. You may consider this factor if server cost is a concern.

Applications that support installable, offline experiences with [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can rely on client-side rendering without needing to communicate with a server.
-->

클라이언트 사이드 렌더링은 코드가 항상 웹 브라우저에서 실행된다고 가정할 수 있으므로 개발 모델이 가장 단순합니다.
브라우저 실행을 전제로 하는 다양한 클라이언트 라이브러리도 사용할 수 있습니다.

클라이언트 사이드 렌더링은 사용자가 렌더링된 콘텐츠를 보려면 먼저 페이지의 JavaScript를 다운로드하고 파싱한 뒤 실행해야 하므로, 일반적으로 다른 렌더링 모드보다 성능이 떨어집니다.
렌더링 중 서버에서 추가 데이터를 가져오는 페이지라면 사용자는 전체 콘텐츠를 보기 위해 추가 요청이 완료될 때까지 기다려야 합니다.

검색 크롤러가 페이지를 색인한다면 클라이언트 사이드 렌더링이 검색 엔진 최적화(SEO)에 악영향을 줄 수 있습니다.
검색 크롤러가 색인 과정에서 실행하는 JavaScript의 양에는 제한이 있기 때문입니다.

클라이언트 사이드 렌더링에서는 서버가 정적 JavaScript 파일을 제공하는 것 외에 페이지 렌더링 작업을 수행할 필요가 없습니다.
서버 비용이 중요하다면 이 점을 고려할 수 있습니다.

[서비스 워커](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)로 설치와 오프라인 사용을 지원하는 애플리케이션은 서버와 통신할 필요 없이 클라이언트 사이드 렌더링을 사용할 수 있습니다.

<!--
##### Server-side rendering (SSR)
-->

<a id="server-side-rendering-ssr"></a>

##### 서버 사이드 렌더링(SSR)

<!--
Server-side rendering offers faster page loads than client-side rendering. Instead of waiting for JavaScript to download and run, the server directly renders an HTML document upon receiving a request from the browser. The user experiences only the latency necessary for the server to fetch data and render the requested page. This mode also eliminates the need for additional network requests from the browser, as your code can fetch data during rendering on the server.

Server-side rendering generally has excellent search engine optimization (SEO), as search crawlers receive a fully rendered HTML document.

Server-side rendering requires you to author code that does not strictly depend on browser APIs and limits your selection of JavaScript libraries that assume they run in a browser.

When server-side rendering, your server runs Angular to produce an HTML response for every request which may increase server hosting costs.
-->

서버 사이드 렌더링은 클라이언트 사이드 렌더링보다 페이지를 빠르게 로드합니다.
JavaScript 다운로드와 실행을 기다리는 대신, 서버가 브라우저의 요청을 받으면 HTML 문서를 직접 렌더링합니다.
사용자는 서버가 데이터를 가져오고 요청한 페이지를 렌더링하는 시간만 기다리면 됩니다.
서버에서 렌더링하는 동안 코드가 데이터를 가져올 수 있으므로, 브라우저에서 추가 네트워크 요청을 보낼 필요도 없습니다.

서버 사이드 렌더링은 검색 크롤러에 완전히 렌더링된 HTML 문서를 전달하므로 일반적으로 검색 엔진 최적화(SEO)에 매우 유리합니다.

서버 사이드 렌더링에서는 브라우저 API에 전적으로 의존하지 않는 코드를 작성해야 하며, 브라우저 실행을 전제로 하는 JavaScript 라이브러리 선택에도 제한이 생깁니다.

서버 사이드 렌더링에서는 서버가 요청마다 Angular를 실행해서 HTML 응답을 생성하므로 서버 호스팅 비용이 증가할 수 있습니다.

<!--
##### Build-time prerendering
-->

<a id="build-time-prerendering"></a>

##### 빌드 시점 사전 렌더링

<!--
Prerendering offers faster page loads than both client-side rendering and server-side rendering. Because prerendering creates HTML documents at _build-time_, the server can directly respond to requests with the static HTML document without any additional work.

Prerendering requires that all information necessary to render a page is available at _build-time_. This means that prerendered pages cannot include any data to the specific user loading the page. Prerendering is primarily useful for pages that are the same for all users of your application.

Because prerendering occurs at build-time, it may add significant time to your production builds. Using [`getPrerenderParams`](api/ssr/ServerRoutePrerenderWithParams#getPrerenderParams 'API reference') to produce a large number of HTML documents may affect the total file size of your deployments, and thus lead to slower deployments.

Prerendering generally has excellent search engine optimization (SEO), as search crawlers receive a fully rendered HTML document.

Prerendering requires you to author code that does not strictly depend on browser APIs and limits your selection of JavaScript libraries that assume they run in a browser.

Prerendering incurs extremely little overhead per server request, as your server responds with static HTML documents. Static files are also easily cached by Content Delivery Networks (CDNs), browsers, and intermediate caching layers for even faster subsequent page loads. Fully static sites can also be deployed solely through a CDN or static file server, eliminating the need to maintain a custom server runtime for your application. This enhances scalability by offloading work from an application web server, making it particularly beneficial for high-traffic applications.

NOTE: When using Angular service worker, the first request is server-rendered, but all subsequent requests are handled by the service worker and rendered client-side.
-->

사전 렌더링은 클라이언트 사이드 렌더링과 서버 사이드 렌더링보다 페이지를 빠르게 로드합니다.
_빌드 시점_ 에 HTML 문서를 생성하므로 서버는 추가 작업 없이 정적 HTML 문서로 요청에 바로 응답할 수 있습니다.

사전 렌더링을 사용하려면 페이지를 렌더링하는 데 필요한 모든 정보를 _빌드 시점_ 에 알 수 있어야 합니다.
따라서 사전 렌더링한 페이지에는 페이지를 여는 특정 사용자에 종속된 데이터를 포함할 수 없습니다.
사전 렌더링은 주로 모든 사용자에게 같은 내용을 보여주는 페이지에 유용합니다.

사전 렌더링은 빌드 시점에 수행되므로 프로덕션 빌드 시간이 크게 늘어날 수 있습니다.
[`getPrerenderParams`](api/ssr/ServerRoutePrerenderWithParams#getPrerenderParams 'API 레퍼런스')로 HTML 문서를 많이 생성하면 배포 파일의 총크기가 늘어나 배포 속도가 느려질 수도 있습니다.

사전 렌더링은 검색 크롤러에 완전히 렌더링된 HTML 문서를 전달하므로 일반적으로 검색 엔진 최적화(SEO)에 매우 유리합니다.

사전 렌더링에서는 브라우저 API에 전적으로 의존하지 않는 코드를 작성해야 하며, 브라우저 실행을 전제로 하는 JavaScript 라이브러리 선택에도 제한이 생깁니다.

사전 렌더링에서는 서버가 정적 HTML 문서로 응답하므로 요청별 부하가 매우 적습니다.
정적 파일은 콘텐츠 전송 네트워크(CDN), 브라우저, 중간 캐시 계층에서도 쉽게 캐시할 수 있어 이후 페이지 로드가 더욱 빨라집니다.
완전한 정적 사이트는 CDN이나 정적 파일 서버만으로도 배포할 수 있으므로 애플리케이션의 별도 서버 런타임을 유지할 필요가 없습니다.
애플리케이션 웹 서버의 작업을 덜어 확장성을 높이므로, 특히 트래픽이 많은 애플리케이션에 유리합니다.

참고: Angular 서비스 워커를 사용하면 첫 요청은 서버에서 렌더링하지만, 이후 모든 요청은 서비스 워커가 처리하고 클라이언트에서 렌더링합니다.

<!--
### Setting headers and status codes
-->

<a id="setting-headers-and-status-codes"></a>

### 헤더와 상태 코드 설정하기

<!--
You can set custom headers and status codes for individual server routes using the `headers` and `status` properties in the `ServerRoute` configuration.

```typescript {header: "app.routes.server.ts"}
import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'profile',
    renderMode: RenderMode.Server,
    headers: {
      'X-My-Custom-Header': 'some-value',
    },
    status: 201,
  },
  // ... other routes
];
```
-->

`ServerRoute` 설정의 `headers`, `status` 프로퍼티를 사용하면 개별 서버 라우트에 커스텀 헤더와 상태 코드를 지정할 수 있습니다.

```typescript {header: "app.routes.server.ts"}
import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'profile',
    renderMode: RenderMode.Server,
    headers: {
      'X-My-Custom-Header': 'some-value',
    },
    status: 201,
  },
  // ... 다른 라우트
];
```

<!--
### Redirects
-->

<a id="redirects"></a>

### 리다이렉트

<!--
Angular handles redirects specified by the [`redirectTo`](api/router/Route#redirectTo 'API reference') property in route configurations, differently on the server-side.

**Server-Side Rendering (SSR)**
Redirects are performed using standard HTTP redirects (e.g., 301, 302) within the server-side rendering process.

**Prerendering (SSG)**
Redirects are implemented as "soft redirects" using [`<meta http-equiv="refresh">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#refresh) tags in the prerendered HTML.
-->

Angular는 라우트 설정의 [`redirectTo`](api/router/Route#redirectTo 'API 레퍼런스') 프로퍼티로 지정한 리다이렉트를 서버에서 다르게 처리합니다.

**서버 사이드 렌더링(SSR)**
서버 사이드 렌더링 과정에서 표준 HTTP 리다이렉트(예: 301, 302)를 사용합니다.

**사전 렌더링(SSG)**
사전 렌더링한 HTML에 [`<meta http-equiv="refresh">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#refresh) 태그를 넣는 "소프트 리다이렉트" 방식으로 구현합니다.

<!--
### Customizing build-time prerendering (SSG)
-->

<a id="customizing-build-time-prerendering-ssg"></a>

### 빌드 시점 사전 렌더링(SSG) 커스터마이징하기

<!--
When using [`RenderMode.Prerender`](api/ssr/RenderMode#Prerender 'API reference'), you can specify several configuration options to customize the prerendering and serving process.
-->

[`RenderMode.Prerender`](api/ssr/RenderMode#Prerender 'API 레퍼런스')를 사용할 때는 여러 설정 옵션으로 사전 렌더링 과정과 콘텐츠 제공 방식을 조정할 수 있습니다.

<!--
#### Parameterized routes
-->

<a id="parameterized-routes"></a>

#### 파라미터가 있는 라우트

<!--
For each route with [`RenderMode.Prerender`](api/ssr/RenderMode#Prerender 'API reference'), you can specify a [`getPrerenderParams`](api/ssr/ServerRoutePrerenderWithParams#getPrerenderParams 'API reference') function. This function lets you control which specific parameters produce separate prerendered documents.

The [`getPrerenderParams`](api/ssr/ServerRoutePrerenderWithParams#getPrerenderParams 'API reference') function returns a `Promise` that resolves to an array of objects. Each object is a key-value map of route parameter name to value. For example, if you define a route like `post/:id`, `getPrerenderParams ` could return the array `[{id: '123'}, {id: '456'}]`, and thus render separate documents for `post/123` and `post/456`.

The body of [`getPrerenderParams`](api/ssr/ServerRoutePrerenderWithParams#getPrerenderParams 'API reference') can use Angular's [`inject`](api/core/inject 'API reference') function to inject dependencies and perform any work to determine which routes to prerender. This typically includes making requests to fetch data to construct the array of parameter values.

You can also use this function with catch-all routes (e.g., `/**`), where the parameter name will be `"**"` and the return value will be the segments of the path, such as `foo/bar`. These can be combined with other parameters (e.g., `/post/:id/**`) to handle more complex route configuration.

```ts {header: "app.routes.server.ts"}
import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'post/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(PostService);
      const ids = await dataService.getIds(); // Assuming this returns ['1', '2', '3']

      return ids.map((id) => ({id})); // Generates paths like: /post/1, /post/2, /post/3
    },
  },
  {
    path: 'post/:id/**',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        {id: '1', '**': 'foo/3'},
        {id: '2', '**': 'bar/4'},
      ]; // Generates paths like: /post/1/foo/3, /post/2/bar/4
    },
  },
];
```

Because [`getPrerenderParams`](api/ssr/ServerRoutePrerenderWithParams#getPrerenderParams 'API reference') exclusively applies to [`RenderMode.Prerender`](api/ssr/RenderMode#Prerender 'API reference'), this function always runs at _build-time_. `getPrerenderParams` must not rely on any browser-specific or server-specific APIs for data.

IMPORTANT: When using [`inject`](api/core/inject 'API reference') inside `getPrerenderParams`, please remember that `inject` must be used synchronously. It cannot be invoked within asynchronous callbacks or following any `await` statements. For more information, refer to `runInInjectionContext`.
-->

[`RenderMode.Prerender`](api/ssr/RenderMode#Prerender 'API 레퍼런스')를 사용하는 각 라우트에 [`getPrerenderParams`](api/ssr/ServerRoutePrerenderWithParams#getPrerenderParams 'API 레퍼런스') 함수를 지정할 수 있습니다.
이 함수로 어떤 파라미터 값에 대해 별도의 사전 렌더링 문서를 생성할지 제어합니다.

[`getPrerenderParams`](api/ssr/ServerRoutePrerenderWithParams#getPrerenderParams 'API 레퍼런스') 함수는 객체 배열로 이행되는 `Promise`를 반환합니다.
각 객체는 라우트 파라미터 이름과 값을 연결하는 키·값 맵입니다.
예를 들어 `post/:id` 라우팅 규칙을 정의하고 `getPrerenderParams`가 `[{id: '123'}, {id: '456'}]`를 반환하면 `post/123`과 `post/456`의 문서를 각각 렌더링합니다.

[`getPrerenderParams`](api/ssr/ServerRoutePrerenderWithParams#getPrerenderParams 'API 레퍼런스') 안에서는 Angular의 [`inject`](api/core/inject 'API 레퍼런스') 함수로 의존성을 주입하고, 어떤 라우트를 사전 렌더링할지 결정하는 작업을 수행할 수 있습니다.
일반적으로 데이터를 요청해서 파라미터 값 배열을 만드는 작업이 여기에 포함됩니다.

이 함수를 모든 경로를 처리하는 catch-all 라우트(예: `/**`)에도 사용할 수 있습니다.
이때 파라미터 이름은 `"**"`이며 반환 값은 `foo/bar` 같은 경로 세그먼트입니다.
`/post/:id/**`처럼 다른 파라미터와 조합해서 더 복잡한 라우트 설정을 처리할 수도 있습니다.

```ts {header: "app.routes.server.ts"}
import {RenderMode, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'post/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const dataService = inject(PostService);
      const ids = await dataService.getIds(); // ['1', '2', '3']을 반환한다고 가정합니다.

      return ids.map((id) => ({id})); // /post/1, /post/2, /post/3 같은 경로를 생성합니다.
    },
  },
  {
    path: 'post/:id/**',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        {id: '1', '**': 'foo/3'},
        {id: '2', '**': 'bar/4'},
      ]; // /post/1/foo/3, /post/2/bar/4 같은 경로를 생성합니다.
    },
  },
];
```

[`getPrerenderParams`](api/ssr/ServerRoutePrerenderWithParams#getPrerenderParams 'API 레퍼런스')는 [`RenderMode.Prerender`](api/ssr/RenderMode#Prerender 'API 레퍼런스')에만 적용되므로 항상 _빌드 시점_ 에 실행됩니다.
`getPrerenderParams`는 데이터를 얻기 위해 브라우저 전용 또는 서버 전용 API에 의존하면 안 됩니다.

중요: `getPrerenderParams` 안에서 [`inject`](api/core/inject 'API 레퍼런스')를 사용할 때는 `inject`를 반드시 동기적으로 호출해야 합니다.
비동기 콜백 안이나 `await` 문 뒤에서는 호출할 수 없습니다.
자세한 내용은 `runInInjectionContext`를 참고하세요.

<!--
#### Fallback strategies
-->

<a id="fallback-strategies"></a>

#### 대체 처리 전략

<!--
When using [`RenderMode.Prerender`](api/ssr/RenderMode#Prerender 'API reference') mode, you can specify a fallback strategy to handle requests for paths that haven't been prerendered.

The available fallback strategies are:

- **Server:** Falls back to server-side rendering. This is the **default** behavior if no `fallback` property is specified.
- **Client:** Falls back to client-side rendering.
- **None:** No fallback. Angular will not handle requests for paths that are not prerendered.

```ts {header: "app.routes.server.ts"}
import {RenderMode, PrerenderFallback, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'post/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client, // Fallback to CSR if not prerendered
    async getPrerenderParams() {
      // This function returns an array of objects representing prerendered posts at the paths:
      // `/post/1`, `/post/2`, and `/post/3`.
      // The path `/post/4` will utilize the fallback behavior if it's requested.
      return [{id: '1'}, {id: '2'}, {id: '3'}];
    },
  },
];
```
-->

[`RenderMode.Prerender`](api/ssr/RenderMode#Prerender 'API 레퍼런스') 모드에서는 사전 렌더링되지 않은 경로의 요청을 처리할 대체 전략을 지정할 수 있습니다.

사용할 수 있는 대체 처리 전략은 다음과 같습니다:

- **Server:** 서버 사이드 렌더링으로 대체합니다.
  `fallback` 프로퍼티를 지정하지 않았을 때의 **기본** 동작입니다.
- **Client:** 클라이언트 사이드 렌더링으로 대체합니다.
- **None:** 대체 처리를 하지 않습니다.
  Angular는 사전 렌더링되지 않은 경로의 요청을 처리하지 않습니다.

```ts {header: "app.routes.server.ts"}
import {RenderMode, PrerenderFallback, ServerRoute} from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'post/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client, // 사전 렌더링되지 않았다면 CSR로 대체합니다.
    async getPrerenderParams() {
      // 이 함수는 다음 경로에서 사전 렌더링할 게시물을 나타내는 객체 배열을 반환합니다:
      // `/post/1`, `/post/2`, `/post/3`.
      // `/post/4` 경로가 요청되면 대체 처리 동작을 사용합니다.
      return [{id: '1'}, {id: '2'}, {id: '3'}];
    },
  },
];
```

<!--
## Authoring server-compatible components
-->

<a id="authoring-server-compatible-components"></a>

## 서버와 호환되는 컴포넌트 작성하기

<!--
Some common browser APIs and capabilities might not be available on the server. Applications cannot make use of browser-specific global objects like `window`, `document`, `navigator`, or `location` as well as certain properties of `HTMLElement`.

In general, code which relies on browser-specific symbols should only be executed in the browser, not on the server. This can be enforced through the `afterEveryRender` and `afterNextRender` lifecycle hooks. These are only executed on the browser and skipped on the server.

```angular-ts
import {Component, ElementRef, viewChild, afterNextRender} from '@angular/core';

@Component({
  selector: 'my-cmp',
  template: `<span #content>{{ ... }}</span>`,
})
export class MyComponent {
  contentRef = viewChild.required<ElementRef>('content');

  constructor() {
    afterNextRender(() => {
      // Safe to check `scrollHeight` because this will only run in the browser, not the server.
      console.log('content height: ' + this.contentRef().nativeElement.scrollHeight);
    });
  }
}
```

NOTE: Prefer [platform-specific providers](guide/ssr#providing-platform-specific-implementations) over runtime checks with `isPlatformBrowser` or `isPlatformServer`.

IMPORTANT: Avoid using `isPlatformBrowser` in templates with `@if` or other conditionals to render different content on server and client. This causes hydration mismatches and layout shifts, negatively impacting user experience and [Core Web Vitals](https://web.dev/learn-core-web-vitals/). Instead, use `afterNextRender` for browser-specific initialization and keep rendered content consistent across platforms.
-->

일부 일반적인 브라우저 API와 기능은 서버에서 사용할 수 없습니다.
애플리케이션은 `window`, `document`, `navigator`, `location` 같은 브라우저 전용 전역 객체나 `HTMLElement`의 특정 프로퍼티를 사용할 수 없습니다.

일반적으로 브라우저 전용 식별자에 의존하는 코드는 서버가 아닌 브라우저에서만 실행해야 합니다.
`afterEveryRender`, `afterNextRender` 라이프사이클 훅을 사용하면 이렇게 동작하도록 할 수 있습니다.
이 훅은 브라우저에서만 실행되고 서버에서는 건너뜁니다.

```angular-ts
import {Component, ElementRef, viewChild, afterNextRender} from '@angular/core';

@Component({
  selector: 'my-cmp',
  template: `<span #content>{{ ... }}</span>`,
})
export class MyComponent {
  contentRef = viewChild.required<ElementRef>('content');

  constructor() {
    afterNextRender(() => {
      // 서버가 아닌 브라우저에서만 실행되므로 `scrollHeight`를 안전하게 확인할 수 있습니다.
      console.log('content height: ' + this.contentRef().nativeElement.scrollHeight);
    });
  }
}
```

참고: `isPlatformBrowser`나 `isPlatformServer`로 런타임에 확인하는 대신 [플랫폼별 프로바이더](guide/ssr#providing-platform-specific-implementations)를 사용하는 것이 좋습니다.

중요: 템플릿에서 `isPlatformBrowser`를 `@if`나 다른 조건문과 함께 사용해서 서버와 클라이언트에 서로 다른 콘텐츠를 렌더링하지 마세요.
하이드레이션 불일치와 레이아웃 이동이 발생해서 사용자 경험과 [코어 웹 바이탈](https://web.dev/learn-core-web-vitals/)에 악영향을 줍니다.
대신 브라우저 전용 초기화에는 `afterNextRender`를 사용하고, 렌더링되는 콘텐츠는 플랫폼 간에 일관되게 유지하세요.

<!--
## Setting providers on the server
-->

<a id="setting-providers-on-the-server"></a>

## 서버에서 프로바이더 설정하기

<!--
On the server side, top level provider values are set once when the application code is initially parsed and evaluated.
This means that providers configured with `useValue` will keep their value across multiple requests, until the server application is restarted.

If you want to generate a new value for each request, use a factory provider with `useFactory`. The factory function will run for every incoming request, ensuring that a new value is created and assigned to the token each time.
-->

서버의 최상위 프로바이더 값은 애플리케이션 코드가 처음 파싱되고 평가될 때 한 번 설정됩니다.
따라서 `useValue`로 설정한 프로바이더는 서버 애플리케이션이 다시 시작될 때까지 여러 요청에 걸쳐 같은 값을 유지합니다.

요청마다 새로운 값을 생성하려면 `useFactory`를 사용하는 팩토리 프로바이더를 사용하세요.
요청이 들어올 때마다 팩토리 함수가 실행되어 새로운 값을 생성하고 토큰에 할당합니다.

<!--
## Providing platform-specific implementations
-->

<a id="providing-platform-specific-implementations"></a>

## 플랫폼별 구현 제공하기

<!--
When your application needs different behavior on the browser and server, provide separate service implementations for each platform. This approach centralizes platform logic in dedicated services.

```ts
export abstract class AnalyticsService {
  abstract trackEvent(name: string): void;
}
```

Create the browser implementation:

```ts
@Injectable()
export class BrowserAnalyticsService implements AnalyticsService {
  trackEvent(name: string): void {
    // Sends the event to the browser-based third-party analytics provider
  }
}
```

Create the server implementation:

```ts
@Injectable()
export class ServerAnalyticsService implements AnalyticsService {
  trackEvent(name: string): void {
    // Records the event on the server
  }
}
```

Register the browser implementation in your main application configuration:

```ts {header: "app.config.ts"}
export const appConfig: ApplicationConfig = {
  providers: [{provide: AnalyticsService, useClass: BrowserAnalyticsService}],
};
```

Override with the server implementation in your server configuration:

```ts {header: "app.config.server.ts"}
const serverConfig: ApplicationConfig = {
  providers: [{provide: AnalyticsService, useClass: ServerAnalyticsService}],
};
```

Inject and use the service in your components:

```ts
@Component(/* ... */)
export class Checkout {
  private analytics = inject(AnalyticsService);

  onAction() {
    this.analytics.trackEvent('action');
  }
}
```
-->

애플리케이션이 브라우저와 서버에서 다르게 동작해야 한다면 플랫폼별로 별도의 서비스 구현을 제공하세요.
이렇게 하면 플랫폼별 로직을 전용 서비스에 모을 수 있습니다.

```ts
export abstract class AnalyticsService {
  abstract trackEvent(name: string): void;
}
```

브라우저용 구현을 만듭니다:

```ts
@Injectable()
export class BrowserAnalyticsService implements AnalyticsService {
  trackEvent(name: string): void {
    // 브라우저 기반 서드 파티 분석 서비스에 이벤트를 보냅니다.
  }
}
```

서버용 구현을 만듭니다:

```ts
@Injectable()
export class ServerAnalyticsService implements AnalyticsService {
  trackEvent(name: string): void {
    // 서버에 이벤트를 기록합니다.
  }
}
```

메인 애플리케이션 설정에 브라우저용 구현을 등록합니다:

```ts {header: "app.config.ts"}
export const appConfig: ApplicationConfig = {
  providers: [{provide: AnalyticsService, useClass: BrowserAnalyticsService}],
};
```

서버 설정에서 서버용 구현으로 재정의합니다:

```ts {header: "app.config.server.ts"}
const serverConfig: ApplicationConfig = {
  providers: [{provide: AnalyticsService, useClass: ServerAnalyticsService}],
};
```

컴포넌트에 서비스를 주입해서 사용합니다:

```ts
@Component(/* ... */)
export class Checkout {
  private analytics = inject(AnalyticsService);

  onAction() {
    this.analytics.trackEvent('action');
  }
}
```

<!--
## Accessing Document via DI
-->

<a id="accessing-document-via-di"></a>

## DI로 Document에 접근하기

<!--
When working with server-side rendering, you should avoid directly referencing browser-specific globals like `document`. Instead, use the [`DOCUMENT`](api/core/DOCUMENT) token to access the document object in a platform-agnostic way.

```ts
import {inject, DOCUMENT, Service} from '@angular/core';

@Service()
export class CanonicalLinkService {
  private readonly document = inject(DOCUMENT);

  // During server rendering, inject a <link rel="canonical"> tag
  // so the generated HTML includes the correct canonical URL
  setCanonical(href: string): void {
    const link = this.document.createElement('link');
    link.rel = 'canonical';
    link.href = href;
    this.document.head.appendChild(link);
  }
}
```

HELPFUL: For managing meta tags, Angular provides the `Meta` service.
-->

서버 사이드 렌더링을 사용할 때는 `document` 같은 브라우저 전용 전역 객체를 직접 참조하지 마세요.
대신 [`DOCUMENT`](api/core/DOCUMENT) 토큰을 사용해서 플랫폼에 종속되지 않는 방식으로 document 객체에 접근하세요.

```ts
import {inject, DOCUMENT, Service} from '@angular/core';

@Service()
export class CanonicalLinkService {
  private readonly document = inject(DOCUMENT);

  // 서버에서 렌더링할 때 <link rel="canonical"> 태그를 삽입해서
  // 생성된 HTML에 올바른 표준 URL을 포함합니다.
  setCanonical(href: string): void {
    const link = this.document.createElement('link');
    link.rel = 'canonical';
    link.href = href;
    this.document.head.appendChild(link);
  }
}
```

도움말: 메타 태그를 관리할 때는 Angular가 제공하는 `Meta` 서비스를 사용할 수 있습니다.

<!--
## Accessing Request and Response via DI
-->

<a id="accessing-request-and-response-via-di"></a>

## DI로 Request와 Response에 접근하기

<!--
The `@angular/core` package provides several tokens for interacting with the server-side rendering environment. These tokens give you access to crucial information and objects within your Angular application during SSR.

- **[`REQUEST`](api/core/REQUEST 'API reference'):** Provides access to the current request object, which is of type [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) from the Web API. This allows you to access headers, cookies, and other request information.
- **[`RESPONSE_INIT`](api/core/RESPONSE_INIT 'API reference'):** Provides access to the response initialization options, which is of type [`ResponseInit`](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#parameters) from the Web API. This allows you to set headers and the status code for the response dynamically. Use this token to set headers or status codes that need to be determined at runtime.
- **[`REQUEST_CONTEXT`](api/core/REQUEST_CONTEXT 'API reference'):** Provides access to additional context related to the current request. This context can be passed as the second parameter of the [`handle`](api/ssr/AngularAppEngine#handle 'API reference') function. Typically, this is used to provide additional request-related information that is not part of the standard Web API.

```angular-ts
import {inject, REQUEST} from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `<h1>My Component</h1>`,
})
export class MyComponent {
  constructor() {
    const request = inject(REQUEST);
    console.log(request?.url);
  }
}
```

<!- UL is used below as otherwise the list will not be include as part of the note. ->
<!- prettier-ignore-start ->

IMPORTANT: The above tokens will be `null` in the following scenarios:<ul class="docs-list">
  <li>During the build processes.</li>
  <li>When the application is rendered in the browser (CSR).</li>
  <li>When performing static site generation (SSG).</li>
  <li>During route extraction in development (at the time of the request).</li>
</ul>

<!- prettier-ignore-end ->
-->

`@angular/core` 패키지는 서버 사이드 렌더링 환경과 상호작용하는 여러 토큰을 제공합니다.
이 토큰으로 SSR 중 Angular 애플리케이션에서 필요한 주요 정보와 객체에 접근할 수 있습니다.

- **[`REQUEST`](api/core/REQUEST 'API 레퍼런스'):** Web API의 [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) 타입인 현재 요청 객체에 접근합니다.
  헤더, 쿠키, 그 밖의 요청 정보를 확인할 수 있습니다.
- **[`RESPONSE_INIT`](api/core/RESPONSE_INIT 'API 레퍼런스'):** Web API의 [`ResponseInit`](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#parameters) 타입인 응답 초기화 옵션에 접근합니다.
  응답의 헤더와 상태 코드를 동적으로 설정할 수 있습니다.
  런타임에 결정해야 하는 헤더나 상태 코드는 이 토큰을 사용해서 설정하세요.
- **[`REQUEST_CONTEXT`](api/core/REQUEST_CONTEXT 'API 레퍼런스'):** 현재 요청과 관련된 추가 컨텍스트에 접근합니다.
  이 컨텍스트는 [`handle`](api/ssr/AngularAppEngine#handle 'API 레퍼런스') 함수의 두 번째 파라미터로 전달할 수 있습니다.
  일반적으로 표준 Web API에 포함되지 않는 추가 요청 정보를 제공할 때 사용합니다.

```angular-ts
import {inject, REQUEST} from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `<h1>My Component</h1>`,
})
export class MyComponent {
  constructor() {
    const request = inject(REQUEST);
    console.log(request?.url);
  }
}
```

<!-- 목록이 참고 내용에 포함되도록 아래에서 UL을 사용합니다. -->
<!-- prettier-ignore-start -->

중요: 위 토큰은 다음 상황에서 `null`입니다:<ul class="docs-list">
  <li>빌드 과정 중.</li>
  <li>애플리케이션이 브라우저에서 렌더링되는 경우(CSR).</li>
  <li>정적 사이트 생성(SSG)을 수행하는 경우.</li>
  <li>개발 중 라우트를 추출하는 경우(요청 시점).</li>
</ul>

<!-- prettier-ignore-end -->

<!--
## Generate a fully static application
-->

<a id="generate-a-fully-static-application"></a>

## 완전한 정적 애플리케이션 생성하기

<!--
By default, Angular prerenders your entire application and generates a server file for handling requests. This allows your app to serve pre-rendered content to users. However, if you prefer a fully static site without a server, you can opt out of this behavior by setting the `outputMode` to `static` in your `angular.json` configuration file.

When `outputMode` is set to `static`, Angular generates pre-rendered HTML files for each route at build time, but it does not generate a server file or require a Node.js server to serve the app. This is useful for deploying to static hosting providers where a backend server is not needed.

To configure this, update your `angular.json` file as follows:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "outputMode": "static"
          }
        }
      }
    }
  }
}
```
-->

기본적으로 Angular는 애플리케이션 전체를 사전 렌더링하고 요청을 처리하는 서버 파일을 생성합니다.
이 방식으로 사전 렌더링한 콘텐츠를 사용자에게 제공할 수 있습니다.
하지만 서버 없는 완전한 정적 사이트를 원한다면 `angular.json` 설정 파일에서 `outputMode`를 `static`으로 설정해서 이 동작을 변경할 수 있습니다.

`outputMode`가 `static`이면 Angular는 빌드 시점에 각 라우트의 사전 렌더링 HTML 파일을 생성하지만 서버 파일은 생성하지 않으며, 애플리케이션을 제공할 Node.js 서버도 필요하지 않습니다.
백엔드 서버가 필요 없는 정적 호스팅 서비스에 배포할 때 유용합니다.

다음과 같이 `angular.json` 파일을 수정하세요:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "outputMode": "static"
          }
        }
      }
    }
  }
}
```

<!--
## Caching data when using HttpClient
-->

<a id="caching-data-when-using-httpclient"></a>

## HttpClient를 사용할 때 데이터 캐시하기

<!--
`HttpClient` caches outgoing network requests when running on the server. This information is serialized and transferred to the browser as part of the initial HTML sent from the server. In the browser, `HttpClient` checks whether it has data in the cache and if so, reuses it instead of making a new HTTP request during initial application rendering. `HttpClient` stops using the cache once an application becomes [stable](api/core/ApplicationRef#isStable) while running in a browser.
-->

`HttpClient`는 서버에서 실행할 때 외부로 보내는 네트워크 요청을 캐시합니다.
이 정보는 직렬화되어 서버가 보내는 초기 HTML의 일부로 브라우저에 전달됩니다.
브라우저의 `HttpClient`는 캐시에 데이터가 있는지 확인하고, 있다면 애플리케이션의 초기 렌더링 중 새 HTTP 요청을 보내는 대신 캐시를 재사용합니다.
브라우저에서 애플리케이션이 [안정 상태](api/core/ApplicationRef#isStable)에 도달하면 `HttpClient`는 캐시 사용을 중단합니다.

<!--
### Configuring the response body size limit

When `HttpClient` uses the default fetch backend during server-side rendering, Angular limits each response body to 1 MB. This limit prevents the server from buffering unexpectedly large responses during rendering. If a response exceeds the configured limit, the request fails with the [NG02825](errors/NG02825) error.

If your application needs to fetch larger responses during server rendering, set `maxResponseBodySize` in the `provideServerRendering` options:

```ts
import {provideServerRendering, withRoutes} from '@angular/ssr';
import {serverRoutes} from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(
      {
        maxResponseBodySize: 5 * 1024 * 1024, // 5MB
      },
      withRoutes(serverRoutes),
    ),
  ],
};
```

`maxResponseBodySize` is configured in bytes and applies globally to server-side `HttpClient` requests that use the fetch backend.

IMPORTANT: Keep this limit as small as your application allows. Increasing it lets server-side requests buffer larger response bodies, which can increase memory use and denial-of-service risk. Prefer moving large downloads outside server rendering.

CRITICAL: During SSR, the Fetch implementation reads the entire response body to verify `integrity` before returning a response, as required by the [Fetch Standard](https://fetch.spec.whatwg.org/#concept-main-fetch). Angular enforces [`maxResponseBodySize`](/guide/ssr#configuring-the-response-body-size-limit) only after Fetch returns a response, so this limit does not constrain the data buffered during integrity verification.
-->

<a id="configuring-the-response-body-size-limit"></a>

### 응답 본문 크기 제한 설정하기

서버 사이드 렌더링 중 `HttpClient`가 기본 fetch 백엔드를 사용하면 Angular는 각 응답 본문을 1MB로 제한합니다.
렌더링 중 서버가 예상보다 큰 응답을 버퍼에 저장하는 것을 막기 위한 제한입니다.
응답이 설정한 제한을 초과하면 요청은 [NG02825](errors/NG02825) 오류로 실패합니다.

서버 렌더링 중 더 큰 응답을 가져와야 한다면 `provideServerRendering` 옵션에서 `maxResponseBodySize`를 설정하세요:

```ts
import {provideServerRendering, withRoutes} from '@angular/ssr';
import {serverRoutes} from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(
      {
        maxResponseBodySize: 5 * 1024 * 1024, // 5MB
      },
      withRoutes(serverRoutes),
    ),
  ],
};
```

`maxResponseBodySize`는 바이트 단위이며, fetch 백엔드를 사용하는 서버 측 `HttpClient` 요청에 전역으로 적용됩니다.

IMPORTANT: 애플리케이션에서 허용하는 범위 안에서 제한을 최대한 작게 유지하세요. 제한을 높이면 서버 측 요청이 더 큰 응답 본문을 버퍼에 저장할 수 있어 메모리 사용량과 서비스 거부 공격 위험이 커질 수 있습니다. 큰 파일 다운로드는 서버 렌더링 밖에서 처리하는 편이 좋습니다.

CRITICAL: SSR 중 Fetch 구현은 [Fetch 표준](https://fetch.spec.whatwg.org/#concept-main-fetch)에 따라 응답을 반환하기 전에 응답 본문 전체를 읽어 `integrity`를 검증합니다. Angular는 Fetch가 응답을 반환한 뒤에만 [`maxResponseBodySize`](/guide/ssr#configuring-the-response-body-size-limit)를 적용하므로, 이 제한으로 무결성 검증 중 버퍼에 저장되는 데이터까지 제한할 수는 없습니다.

<!--
### Configuring the caching options
-->

<a id="configuring-the-caching-options"></a>

### 캐시 옵션 설정하기

<!--
You can customize how Angular caches HTTP responses during server‑side rendering (SSR) and reuses them during hydration by configuring `HttpTransferCacheOptions`.
This configuration is provided globally using `withHttpTransferCacheOptions` inside `provideClientHydration()`.

By default, `HttpClient` caches all `HEAD` and `GET` requests which don't contain `Authorization`, `Proxy-Authorization`, or `Cookie` headers and are not sent with `withCredentials` or Fetch API `credentials` modes that can send credentials. Angular also skips transfer cache when a request or response includes `Cache-Control` directives that forbid caching (`no-store`, `no-cache`, or `private`), or when the Fetch API `cache` option is set to `no-store` or `no-cache`. Responses that carry a `Set-Cookie` header are also skipped. You can override the request filtering settings by using `withHttpTransferCacheOptions` in the hydration configuration.

```ts
import {
  bootstrapApplication,
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [
    provideClientHydration(
      withHttpTransferCacheOptions({
        includeHeaders: ['ETag', 'Cache-Control'],
        filter: (req) => !req.url.includes('/api/profile'),
        includePostRequests: true,
        includeRequestsWithAuthHeaders: false,
      }),
    ),
  ],
});
```

---
-->

`HttpTransferCacheOptions`를 설정하면 Angular가 서버 사이드 렌더링(SSR) 중 HTTP 응답을 캐시하고 하이드레이션 중 재사용하는 방식을 조정할 수 있습니다.  
이 설정은 `provideClientHydration()` 안의 `withHttpTransferCacheOptions`로 전역에 제공합니다.

기본적으로 `HttpClient`는 `Authorization`, `Proxy-Authorization`, `Cookie` 헤더가 없고, `withCredentials`나 자격 증명을 전송할 수 있는 Fetch API의 `credentials` 모드로 보내지 않은 모든 `HEAD`, `GET` 요청을 캐시합니다.
요청이나 응답의 `Cache-Control`에 캐시를 금지하는 지시자(`no-store`, `no-cache`, `private`)가 있거나 Fetch API의 `cache` 옵션이 `no-store` 또는 `no-cache`이면 Angular는 전송 캐시를 건너뜁니다.
`Set-Cookie` 헤더가 포함된 응답도 건너뜁니다.
하이드레이션 설정의 `withHttpTransferCacheOptions`로 요청 필터링 설정을 재정의할 수 있습니다.

```ts
import {
  bootstrapApplication,
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [
    provideClientHydration(
      withHttpTransferCacheOptions({
        includeHeaders: ['ETag', 'Cache-Control'],
        filter: (req) => !req.url.includes('/api/profile'),
        includePostRequests: true,
        includeRequestsWithAuthHeaders: false,
      }),
    ),
  ],
});
```

---

<!--
### `includeHeaders`
-->

### `includeHeaders`

<!--
Specifies which headers from the server response should be included in cached entries.
No headers are included by default.

```ts
withHttpTransferCacheOptions({
  includeHeaders: ['ETag', 'Cache-Control'],
});
```

IMPORTANT: Avoid including sensitive headers like authentication tokens. These can leak user‑specific data between requests.

Including `Cache-Control` in `includeHeaders` only makes that header available on the hydrated response. Angular already evaluates `Cache-Control` headers automatically when deciding whether a request or response is eligible for transfer cache.

---
-->

서버 응답의 어떤 헤더를 캐시 항목에 포함할지 지정합니다.  
기본적으로 헤더는 포함하지 않습니다.

```ts
withHttpTransferCacheOptions({
  includeHeaders: ['ETag', 'Cache-Control'],
});
```

중요: 인증 토큰 같은 민감한 헤더를 포함하지 마세요.
요청 사이에서 사용자별 데이터가 유출될 수 있습니다.

`includeHeaders`에 `Cache-Control`을 포함하는 것은 하이드레이션된 응답에서 해당 헤더를 읽을 수 있게 할 뿐입니다.
Angular는 요청이나 응답을 전송 캐시에 저장할 수 있는지 판단할 때 이미 `Cache-Control` 헤더를 자동으로 평가합니다.

---

<!--
### `includePostRequests`
-->

### `includePostRequests`

<!--
By default, only `GET` and `HEAD` requests are cached.
You can enable caching for `POST` requests when they are used as read operations such as GraphQL queries.

```ts
withHttpTransferCacheOptions({
  includePostRequests: true,
});
```

Use this only when `POST` requests are **idempotent** and safe to reuse between server and client renders.

---
-->

기본적으로 `GET`과 `HEAD` 요청만 캐시합니다.  
GraphQL 쿼리처럼 읽기 작업에 사용하는 `POST` 요청은 캐시를 활성화할 수 있습니다.

```ts
withHttpTransferCacheOptions({
  includePostRequests: true,
});
```

`POST` 요청이 **멱등적**이며 서버와 클라이언트 렌더링 사이에서 안전하게 재사용할 수 있을 때만 사용하세요.

---

<!--
### `includeRequestsWithAuthHeaders`
-->

### `includeRequestsWithAuthHeaders`

<!--
Determines whether requests containing `Authorization`, `Proxy‑Authorization`, or `Cookie` headers are eligible for caching.
By default, these are excluded to prevent caching user‑specific responses.

```ts
withHttpTransferCacheOptions({
  includeRequestsWithAuthHeaders: true,
});
```

Enable only when authentication headers do **not** affect the response content (for example, public tokens for analytics APIs).
-->

`Authorization`, `Proxy‑Authorization`, `Cookie` 헤더가 포함된 요청을 캐시할 수 있는지 결정합니다.  
사용자별 응답이 캐시되지 않도록 기본적으로 제외합니다.

```ts
withHttpTransferCacheOptions({
  includeRequestsWithAuthHeaders: true,
});
```

인증 헤더가 응답 내용에 영향을 **주지 않는** 경우에만 활성화하세요.
예를 들어 분석 API의 공개 토큰이 여기에 해당합니다.

<!--
### `includeRequestsWithCredentials`

Determines whether requests sent using `withCredentials` or Fetch API `credentials` modes (`include` or `same-origin`) are eligible for caching.
By default, these are excluded to prevent caching user‑specific responses.

```ts
withHttpTransferCacheOptions({
  includeRequestsWithCredentials: true,
});
```

Enable only when credentialed requests return responses that are safe to cache.

### `includeNonCacheableRequests`

Determines whether requests and responses containing `Cache-Control` directives that forbid caching (`no-store`, `no-cache`, or `private`), responses with a `Set-Cookie` header, or requests using Fetch API `cache` options (`no-store` or `no-cache`), are eligible for caching.
By default, these are excluded to respect HTTP caching controls.

```ts
withHttpTransferCacheOptions({
  includeNonCacheableRequests: true,
});
```

Enable only when you need to bypass cache-control restrictions for transfer caching.
-->

### `includeRequestsWithCredentials`

`withCredentials` 또는 Fetch API의 `credentials` 모드(`include`, `same-origin`)로 보내는 요청을 캐시할 수 있는지 결정합니다.
사용자별 응답이 캐시되지 않도록 기본적으로 제외합니다.

```ts
withHttpTransferCacheOptions({
  includeRequestsWithCredentials: true,
});
```

자격 증명을 포함하는 요청이 캐시해도 안전한 응답을 반환할 때만 활성화하세요.

### `includeNonCacheableRequests`

캐시를 금지하는 `Cache-Control` 지시자(`no-store`, `no-cache`, `private`)가 포함된 요청과 응답, `Set-Cookie` 헤더가 포함된 응답, Fetch API의 `cache` 옵션(`no-store`, `no-cache`)을 사용하는 요청을 캐시할 수 있는지 결정합니다.
HTTP 캐시 제어를 따르도록 기본적으로 제외합니다.

```ts
withHttpTransferCacheOptions({
  includeNonCacheableRequests: true,
});
```

전송 캐시에 대해 캐시 제어 제한을 우회해야 할 때만 활성화하세요.

<!--
### Per‑request overrides
-->

<a id="perrequest-overrides"></a>

### 요청별 재정의

<!--
You can override caching behavior for a specific request using the `transferCache` request option.

```ts
// Include specific headers for this request
http.get('/api/profile', {transferCache: {includeHeaders: ['CustomHeader']}});
```
-->

`transferCache` 요청 옵션으로 특정 요청의 캐시 동작을 재정의할 수 있습니다.

```ts
// 이 요청에 특정 헤더를 포함합니다.
http.get('/api/profile', {transferCache: {includeHeaders: ['CustomHeader']}});
```

<!--
### Disabling caching
-->

<a id="disabling-caching"></a>

### 캐시 비활성화하기

<!--
You can disable HTTP caching of requests sent from the server either globally or individually.
-->

서버에서 보내는 요청의 HTTP 캐시를 전역으로 비활성화하거나 개별적으로 비활성화할 수 있습니다.

<!--
#### Globally
-->

<a id="globally"></a>

#### 전역 비활성화

<!--
To disable caching for all requests in your application, use the `withNoHttpTransferCache` feature:

```ts
import {
  bootstrapApplication,
  provideClientHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [provideClientHydration(withNoHttpTransferCache())],
});
```
-->

애플리케이션의 모든 요청에 대해 캐시를 비활성화하려면 `withNoHttpTransferCache` 기능을 사용하세요:

```ts
import {
  bootstrapApplication,
  provideClientHydration,
  withNoHttpTransferCache,
} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [provideClientHydration(withNoHttpTransferCache())],
});
```

<!--
#### Filtering
-->

<a id="filtering"></a>

#### 필터링

<!--
You can also selectively disable caching for certain requests using the [`filter`](api/common/http/HttpTransferCacheOptions) option in `withHttpTransferCacheOptions`. For example, you can disable caching for a specific API endpoint:

```ts
import {
  bootstrapApplication,
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [
    provideClientHydration(
      withHttpTransferCacheOptions({
        filter: (req) => !req.url.includes('/api/sensitive-data'),
      }),
    ),
  ],
});
```

Use this option to exclude endpoints with user‑specific or dynamic data (for example `/api/profile`).
-->

`withHttpTransferCacheOptions`의 [`filter`](api/common/http/HttpTransferCacheOptions) 옵션으로 특정 요청의 캐시만 선택적으로 비활성화할 수도 있습니다.
예를 들어 특정 API 엔드포인트의 캐시를 비활성화할 수 있습니다:

```ts
import {
  bootstrapApplication,
  provideClientHydration,
  withHttpTransferCacheOptions,
} from '@angular/platform-browser';

bootstrapApplication(App, {
  providers: [
    provideClientHydration(
      withHttpTransferCacheOptions({
        filter: (req) => !req.url.includes('/api/sensitive-data'),
      }),
    ),
  ],
});
```

`/api/profile`처럼 사용자별 데이터나 동적 데이터를 제공하는 엔드포인트를 제외할 때 이 옵션을 사용하세요.

<!--
#### Per-request
-->

<a id="per-request"></a>

#### 요청별 비활성화

<!--
To disable caching for an individual request, you can specify the [`transferCache`](api/common/http/HttpRequest#transferCache) option in an `HttpRequest`.

```ts
httpClient.get('/api/sensitive-data', {transferCache: false});
```

`HttpTransferCache` does not cache requests or responses that explicitly opt out of caching. Angular skips transfer cache entries when a request includes a `Cache-Control` header with `no-store`, `no-cache`, or `private`, or when the request uses the Fetch API `cache` option set to `no-store` or `no-cache`. Responses with `Cache-Control: no-store`, `Cache-Control: no-cache`, or `Cache-Control: private` are also not stored in the transfer cache. Responses that include a `Set-Cookie` header are likewise not stored, as they typically carry user-specific state.

NOTE: If your application uses different HTTP origins to make API calls on the server and on the client, the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token allows you to establish a mapping between those origins, so that `HttpTransferCache` feature can recognize those requests as the same ones and reuse the data cached on the server during hydration on the client.
-->

개별 요청의 캐시를 비활성화하려면 `HttpRequest`에 [`transferCache`](api/common/http/HttpRequest#transferCache) 옵션을 지정하세요.

```ts
httpClient.get('/api/sensitive-data', {transferCache: false});
```

`HttpTransferCache`는 명시적으로 캐시를 거부하는 요청이나 응답을 캐시하지 않습니다.
요청의 `Cache-Control` 헤더에 `no-store`, `no-cache`, `private`가 있거나 Fetch API의 `cache` 옵션이 `no-store` 또는 `no-cache`이면 Angular는 전송 캐시를 건너뜁니다.
`Cache-Control: no-store`, `Cache-Control: no-cache`, `Cache-Control: private` 응답도 전송 캐시에 저장하지 않습니다.
`Set-Cookie` 헤더가 포함된 응답도 일반적으로 사용자별 상태를 담고 있으므로 저장하지 않습니다.

참고: 서버와 클라이언트에서 서로 다른 HTTP 출처(origin)로 API를 호출한다면, `HTTP_TRANSFER_CACHE_ORIGIN_MAP` 토큰으로 출처 사이의 매핑을 지정할 수 있습니다.
그러면 `HttpTransferCache`는 이 요청을 같은 요청으로 인식하고, 클라이언트 하이드레이션 중 서버에서 캐시한 데이터를 재사용할 수 있습니다.

<!--
## Configuring a server
-->

<a id="configuring-a-server"></a>

## 서버 설정하기

<!--
### Node.js
-->

### Node.js

<!--
The `@angular/ssr/node` extends `@angular/ssr` specifically for Node.js environments. It provides APIs that make it easier to implement server-side rendering within your Node.js application. For a complete list of functions and usage examples, refer to the [`@angular/ssr/node` API reference](api/ssr/node/AngularNodeAppEngine) API reference.

```ts {header: "server.ts"}
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        writeResponseToNodeResponse(response, res);
      } else {
        next(); // Pass control to the next middleware
      }
    })
    .catch(next);
});

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
```
-->

`@angular/ssr/node`는 Node.js 환경에 맞춰 `@angular/ssr`를 확장한 패키지입니다.
Node.js 애플리케이션에서 서버 사이드 렌더링을 쉽게 구현할 수 있는 API를 제공합니다.
전체 함수 목록과 사용 예제는 [`@angular/ssr/node` API 레퍼런스](api/ssr/node/AngularNodeAppEngine)를 참고하세요.

```ts {header: "server.ts"}
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        writeResponseToNodeResponse(response, res);
      } else {
        next(); // 다음 미들웨어로 제어를 넘깁니다.
      }
    })
    .catch(next);
});

/**
 * Angular CLI가 개발 서버와 빌드 중에 사용하는 요청 핸들러입니다.
 */
export const reqHandler = createNodeRequestHandler(app);
```

<!--
### Non-Node.js
-->

<a id="non-nodejs"></a>

### Node.js 외의 환경

<!--
The `@angular/ssr` provides essential APIs for server-side rendering your Angular application on platforms other than Node.js. It leverages the standard [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) objects from the Web API, enabling you to integrate Angular SSR into various server environments. For detailed information and examples, refer to the [`@angular/ssr` API reference](api/ssr/AngularAppEngine).

```ts {header: "server.ts"}
import {AngularAppEngine, createRequestHandler} from '@angular/ssr';

const angularApp = new AngularAppEngine();

/**
 * This is a request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(async (req: Request) => {
  const res: Response | null = await angularApp.handle(req);

  // ...
});
```
-->

`@angular/ssr`는 Node.js가 아닌 플랫폼에서 Angular 애플리케이션을 서버 사이드 렌더링하는 데 필요한 핵심 API를 제공합니다.
Web API의 표준 [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request)와 [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) 객체를 사용하므로 다양한 서버 환경에 Angular SSR을 통합할 수 있습니다.
자세한 내용과 예제는 [`@angular/ssr` API 레퍼런스](api/ssr/AngularAppEngine)를 참고하세요.

```ts {header: "server.ts"}
import {AngularAppEngine, createRequestHandler} from '@angular/ssr';

const angularApp = new AngularAppEngine();

/**
 * Angular CLI가 개발 서버와 빌드 중에 사용하는 요청 핸들러입니다.
 */
export const reqHandler = createRequestHandler(async (req: Request) => {
  const res: Response | null = await angularApp.handle(req);

  // ...
});
```

<!--
## Security
-->

<a id="security"></a>

## 보안

<!--
For detailed information on preventing Server-Side Request Forgery (SSRF) and configuring allowed hosts, see the [Server-side security](best-practices/security#preventing-server-side-request-forgery-ssrf) guide.
-->

서버 측 요청 위조(SSRF) 방지와 허용 호스트 설정에 대한 자세한 내용은 [서버 측 보안](best-practices/security#preventing-server-side-request-forgery-ssrf) 가이드를 참고하세요.
