<!--
# Router reference
-->

<a id="router-reference"></a>

# 라우터 레퍼런스

<!--
The following sections highlight some core router concepts and terminology.
-->

다음 섹션에서는 라우터의 핵심 개념과 용어를 알아봅니다.

<!--
## Router events
-->

<a id="router-events"></a>

## 라우터 이벤트

<!--
During each navigation, the `Router` emits navigation events through the `Router.events` property.
These events are shown in the following table.

| Router event                                              | Details                                                                                                                                                                |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`NavigationStart`](api/router/NavigationStart)           | Triggered when navigation starts.                                                                                                                                      |
| [`RouteConfigLoadStart`](api/router/RouteConfigLoadStart) | Triggered before the `Router` lazy loads a route configuration.                                                                                                        |
| [`RouteConfigLoadEnd`](api/router/RouteConfigLoadEnd)     | Triggered after a route has been lazy loaded.                                                                                                                          |
| [`RoutesRecognized`](api/router/RoutesRecognized)         | Triggered when the Router parses the URL and the routes are recognized.                                                                                                |
| [`GuardsCheckStart`](api/router/GuardsCheckStart)         | Triggered when the Router begins the Guards phase of routing.                                                                                                          |
| [`ChildActivationStart`](api/router/ChildActivationStart) | Triggered when the Router begins activating a route's children.                                                                                                        |
| [`ActivationStart`](api/router/ActivationStart)           | Triggered when the Router begins activating a route.                                                                                                                   |
| [`GuardsCheckEnd`](api/router/GuardsCheckEnd)             | Triggered when the Router finishes the Guards phase of routing successfully.                                                                                           |
| [`ResolveStart`](api/router/ResolveStart)                 | Triggered when the Router begins the Resolve phase of routing.                                                                                                         |
| [`ResolveEnd`](api/router/ResolveEnd)                     | Triggered when the Router finishes the Resolve phase of routing successfully.                                                                                          |
| [`ChildActivationEnd`](api/router/ChildActivationEnd)     | Triggered when the Router finishes activating a route's children.                                                                                                      |
| [`ActivationEnd`](api/router/ActivationEnd)               | Triggered when the Router finishes activating a route.                                                                                                                 |
| [`NavigationEnd`](api/router/NavigationEnd)               | Triggered when navigation ends successfully.                                                                                                                           |
| [`NavigationCancel`](api/router/NavigationCancel)         | Triggered when navigation is canceled. This can happen when a Route Guard returns false during navigation, or redirects by returning a `UrlTree` or `RedirectCommand`. |
| [`NavigationError`](api/router/NavigationError)           | Triggered when navigation fails due to an unexpected error.                                                                                                            |
| [`Scroll`](api/router/Scroll)                             | Represents a scrolling event.                                                                                                                                          |

When you enable the `withDebugTracing` feature, Angular logs these events to the console.
-->

`Router`는 내비게이션이 발생할 때마다 `Router.events` 프로퍼티로 내비게이션 이벤트를 방출합니다.
이벤트 종류는 다음 표와 같습니다.

| 라우터 이벤트                                             | 설명                                                                                                                                                                          |
| :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`NavigationStart`](api/router/NavigationStart)           | 내비게이션이 시작될 때 발생합니다.                                                                                                                                            |
| [`RouteConfigLoadStart`](api/router/RouteConfigLoadStart) | `Router`가 라우팅 규칙 설정을 지연 로드하기 전에 발생합니다.                                                                                                                  |
| [`RouteConfigLoadEnd`](api/router/RouteConfigLoadEnd)     | 라우팅 규칙의 지연 로딩이 완료된 뒤 발생합니다.                                                                                                                               |
| [`RoutesRecognized`](api/router/RoutesRecognized)         | 라우터가 URL을 파싱하고 라우팅 규칙을 인식할 때 발생합니다.                                                                                                                   |
| [`GuardsCheckStart`](api/router/GuardsCheckStart)         | 라우터가 라우팅의 가드 단계를 시작할 때 발생합니다.                                                                                                                           |
| [`ChildActivationStart`](api/router/ChildActivationStart) | 라우터가 라우팅 규칙의 자식 활성화를 시작할 때 발생합니다.                                                                                                                    |
| [`ActivationStart`](api/router/ActivationStart)           | 라우터가 라우팅 규칙 활성화를 시작할 때 발생합니다.                                                                                                                           |
| [`GuardsCheckEnd`](api/router/GuardsCheckEnd)             | 라우터가 라우팅의 가드 단계를 성공적으로 마칠 때 발생합니다.                                                                                                                  |
| [`ResolveStart`](api/router/ResolveStart)                 | 라우터가 라우팅의 리졸브 단계를 시작할 때 발생합니다.                                                                                                                         |
| [`ResolveEnd`](api/router/ResolveEnd)                     | 라우터가 라우팅의 리졸브 단계를 성공적으로 마칠 때 발생합니다.                                                                                                                |
| [`ChildActivationEnd`](api/router/ChildActivationEnd)     | 라우터가 라우팅 규칙의 자식 활성화를 마칠 때 발생합니다.                                                                                                                      |
| [`ActivationEnd`](api/router/ActivationEnd)               | 라우터가 라우팅 규칙 활성화를 마칠 때 발생합니다.                                                                                                                             |
| [`NavigationEnd`](api/router/NavigationEnd)               | 내비게이션이 성공적으로 끝날 때 발생합니다.                                                                                                                                   |
| [`NavigationCancel`](api/router/NavigationCancel)         | 내비게이션이 취소될 때 발생합니다. 내비게이션 중 라우팅 규칙 가드가 false를 반환하거나, `UrlTree` 또는 `RedirectCommand`를 반환해서 리다이렉트하는 경우에 발생할 수 있습니다. |
| [`NavigationError`](api/router/NavigationError)           | 예기치 않은 오류로 내비게이션이 실패할 때 발생합니다.                                                                                                                         |
| [`Scroll`](api/router/Scroll)                             | 스크롤 이벤트를 나타냅니다.                                                                                                                                                   |

`withDebugTracing` 기능을 활성화하면 Angular가 이 이벤트를 콘솔에 기록합니다.

<!--
## Router terminology
-->

<a id="router-terminology"></a>

## 라우터 용어

<!--
Here are the key `Router` terms and their meanings:

| Router part           | Details                                                                                                                                                                                                                                   |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Router`              | Displays the application component for the active URL. Manages navigation from one component to the next.                                                                                                                                 |
| `provideRouter`       | provides the necessary service providers for navigating through application views.                                                                                                                                                        |
| `RouterModule`        | A separate NgModule that provides the necessary service providers and directives for navigating through application views.                                                                                                                |
| `Routes`              | Defines an array of Routes, each mapping a URL path to a component.                                                                                                                                                                       |
| `Route`               | Defines how the router should navigate to a component based on a URL pattern. Routes can include paths, components, child routes, guards, resolvers, and resources.                                                                       |
| `RouterOutlet`        | The directive \(`<router-outlet>`\) that marks where the router displays a view.                                                                                                                                                          |
| `RouterLink`          | The directive for binding a clickable HTML element to a route. Clicking an element with a `routerLink` directive that's bound to a _string_ or a _link parameters array_ triggers a navigation.                                           |
| `RouterLinkActive`    | The directive for adding/removing classes from an HTML element when an associated `routerLink` contained on or inside the element becomes active/inactive. It can also set the `aria-current` of an active link for better accessibility. |
| `ActivatedRoute`      | A service that's provided to each route component that contains route specific information such as route parameters, static data, resolve data, route resources, global query parameters, and the global fragment.                        |
| `RouterState`         | The current state of the router including a tree of the currently activated routes together with convenience methods for traversing the route tree.                                                                                       |
| Link parameters array | An array that the router interprets as a routing instruction. You can bind that array to a `RouterLink` or pass the array as an argument to the `Router.navigate` method.                                                                 |
| Routing component     | An Angular component with a `RouterOutlet` that displays views based on router navigations.                                                                                                                                               |
-->

주요 `Router` 용어와 의미는 다음과 같습니다.

| 라우터 구성 요소   | 설명                                                                                                                                                                                                      |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Router`           | 활성 URL에 해당하는 애플리케이션 컴포넌트를 표시합니다. 컴포넌트 사이의 내비게이션을 관리합니다.                                                                                                          |
| `provideRouter`    | 애플리케이션 뷰 사이를 이동하는 데 필요한 서비스 프로바이더를 제공합니다.                                                                                                                                 |
| `RouterModule`     | 애플리케이션 뷰 사이를 이동하는 데 필요한 서비스 프로바이더와 디렉티브를 제공하는 별도의 NgModule입니다.                                                                                                  |
| `Routes`           | URL 경로와 컴포넌트를 연결하는 라우팅 규칙 배열을 정의합니다.                                                                                                                                             |
| `Route`            | URL 패턴에 따라 라우터가 컴포넌트로 이동하는 방식을 정의합니다. 라우팅 규칙에는 경로, 컴포넌트, 자식 라우팅 규칙, 가드, 리졸버, 리소스가 포함될 수 있습니다.                                              |
| `RouterOutlet`     | 라우터가 뷰를 표시할 위치를 지정하는 디렉티브\(`<router-outlet>`\)입니다.                                                                                                                                 |
| `RouterLink`       | 클릭 가능한 HTML 엘리먼트를 라우팅 규칙과 연결하는 디렉티브입니다. *문자열*이나 *링크 파라미터 배열*에 바인딩된 `routerLink` 디렉티브가 있는 엘리먼트를 클릭하면 내비게이션이 실행됩니다.                 |
| `RouterLinkActive` | 해당 엘리먼트 또는 그 내부의 `routerLink`가 활성화되거나 비활성화될 때 HTML 엘리먼트의 클래스를 추가하거나 제거하는 디렉티브입니다. 접근성을 높이기 위해 활성 링크의 `aria-current`도 설정할 수 있습니다. |
| `ActivatedRoute`   | 각 라우팅 규칙 컴포넌트에 제공되는 서비스입니다. 라우팅 규칙 파라미터, 정적 데이터, 리졸브 데이터, 라우팅 규칙 리소스, 전역 쿼리 파라미터, 전역 프래그먼트 등 해당 라우팅 규칙의 정보가 있습니다.         |
| `RouterState`      | 라우터의 현재 상태입니다. 현재 활성화된 라우팅 규칙 트리와 라우팅 규칙 트리를 탐색하는 편의 메서드를 포함합니다.                                                                                          |
| 링크 파라미터 배열 | 라우터가 라우팅 명령으로 해석하는 배열입니다. 이 배열을 `RouterLink`에 바인딩하거나 `Router.navigate` 메서드의 인자로 전달할 수 있습니다.                                                                 |
| 라우팅 컴포넌트    | 라우터 내비게이션에 따라 뷰를 표시하는 `RouterOutlet`이 있는 Angular 컴포넌트입니다.                                                                                                                      |

<!--
## `<base href>`
-->


## `<base href>`

<!--
The router uses the browser's [history.pushState](https://developer.mozilla.org/docs/Web/API/History_API/Working_with_the_History_API#adding_and_modifying_history_entries 'HTML5 browser history push-state') for navigation.
`pushState` lets you customize in-application URL paths; for example, `localhost:4200/crisis-center`.
The in-application URLs can be indistinguishable from server URLs.

Modern HTML5 browsers were the first to support `pushState` which is why many people refer to these URLs as "HTML5 style" URLs.

HELPFUL: HTML5 style navigation is the router default.
In the [LocationStrategy and browser URL styles](guide/routing/common-router-tasks#locationstrategy-and-browser-url-styles) section, learn why HTML5 style is preferable, how to adjust its behavior, and how to switch to the older hash \(`#`\) style, if necessary.

You must add a [`<base href>` element](https://developer.mozilla.org/docs/Web/HTML/Element/base 'base href') to the application's `index.html` for `pushState` routing to work.
The browser uses the `<base href>` value to prefix relative URLs when referencing CSS files, scripts, and images.

Add the `<base>` element just after the `<head>` tag.
If the `app` folder is the application root, as it is for this application, set the `href` value in `index.html` as shown here.

```html
<base href="/" />
```
-->

라우터는 브라우저의 [history.pushState](https://developer.mozilla.org/docs/Web/API/History_API/Working_with_the_History_API#adding_and_modifying_history_entries 'HTML5 브라우저 히스토리 push-state')로 내비게이션을 처리합니다.
`pushState`를 사용하면 `localhost:4200/crisis-center`처럼 애플리케이션 내부 URL 경로를 원하는 형태로 구성할 수 있습니다.
애플리케이션 내부 URL을 서버 URL과 구별되지 않는 형태로 만들 수 있습니다.

`pushState`는 최신 HTML5 브라우저에서 처음 지원되었기 때문에 이런 URL을 "HTML5 형식" URL이라고 부르기도 합니다.

참고: HTML5 형식의 내비게이션은 라우터의 기본 방식입니다.
[LocationStrategy와 브라우저 URL 형식](guide/routing/common-router-tasks#locationstrategy-and-browser-url-styles) 섹션에서 HTML5 형식을 권장하는 이유, 동작을 조정하는 방법, 필요한 경우 이전 해시\(`#`\) 형식으로 변경하는 방법을 알아보세요.

`pushState` 라우팅이 동작하려면 애플리케이션의 `index.html`에 [`<base href>` 엘리먼트](https://developer.mozilla.org/docs/Web/HTML/Element/base 'base href')를 추가해야 합니다.
브라우저는 CSS 파일, 스크립트, 이미지를 참조할 때 `<base href>` 값을 상대 URL 앞에 붙입니다.

`<head>` 태그 바로 뒤에 `<base>` 엘리먼트를 추가하세요.
이 애플리케이션처럼 `app` 폴더가 애플리케이션 루트라면 `index.html`의 `href` 값을 다음과 같이 지정하세요.

```html
<base href="/" />
```

<!--
### HTML5 URLs and the `<base href>`
-->

<a id="html5-urls-and-the-base-href"></a>

### HTML5 URL과 `<base href>`

<!--
The guidelines that follow will refer to different parts of a URL.
This diagram outlines what those parts refer to:

```text {hideCopy}
foo://example.com:8042/over/there?name=ferret#nose
\_/   \______________/\_________/ \_________/ \__/
 |           |            |            |        |
scheme    authority      path        query   fragment
```

While the router uses the [HTML5 pushState](https://developer.mozilla.org/docs/Web/API/History_API#Adding_and_modifying_history_entries 'Browser history push-state') style by default, you must configure that strategy with a `<base href>`.

The preferred way to configure the strategy is to add a [`<base href>` element](https://developer.mozilla.org/docs/Web/HTML/Element/base 'base href') tag in the `<head>` of the `index.html`.

```angular-html
<base href="/" />
```

Without that tag, the browser might not be able to load resources \(images, CSS, scripts\) when "deep linking" into the application.

Some developers might not be able to add the `<base>` element, perhaps because they don't have access to `<head>` or the `index.html`.

Those developers can still use HTML5 URLs by taking the following two steps:

1. Provide the router with an appropriate `APP_BASE_HREF` value.
1. Use root URLs \(URLs with an `authority`\) for all web resources: CSS, images, scripts, and template HTML files.
   - The `<base href>` `path` should end with a "/", as browsers ignore characters in the `path` that follow the right-most "`/`"
   - If the `<base href>` includes a `query` part, the `query` is only used if the `path` of a link in the page is empty and has no `query`.
     This means that a `query` in the `<base href>` is only included when using `HashLocationStrategy`.

   - If a link in the page is a root URL \(has an `authority`\), the `<base href>` is not used.
     In this way, an `APP_BASE_HREF` with an authority will cause all links created by Angular to ignore the `<base href>` value.

   - A fragment in the `<base href>` is _never_ persisted

For more complete information on how `<base href>` is used to construct target URIs, see the [RFC](https://tools.ietf.org/html/rfc3986#section-5.2.2) section on transforming references.
-->

다음 지침에서는 URL의 여러 부분을 구분해서 설명합니다.
각 부분이 의미하는 것은 다음 다이어그램과 같습니다.

```text {hideCopy}
foo://example.com:8042/over/there?name=ferret#nose
\_/   \______________/\_________/ \_________/ \__/
 |           |            |            |        |
scheme    authority      path        query   fragment
```

라우터는 기본적으로 [HTML5 pushState](https://developer.mozilla.org/docs/Web/API/History_API#Adding_and_modifying_history_entries '브라우저 히스토리 push-state') 형식을 사용하지만, 이 전략을 사용하려면 `<base href>`를 설정해야 합니다.

권장하는 설정 방식은 `index.html`의 `<head>` 안에 [`<base href>` 엘리먼트](https://developer.mozilla.org/docs/Web/HTML/Element/base 'base href')를 추가하는 것입니다.

```angular-html
<base href="/" />
```

이 태그가 없으면 애플리케이션의 하위 경로로 직접 연결하는 "딥 링크"를 사용할 때 브라우저가 리소스\(이미지, CSS, 스크립트\)를 로드하지 못할 수 있습니다.

`<head>`나 `index.html`에 접근할 수 없는 등의 이유로 `<base>` 엘리먼트를 추가하지 못할 수도 있습니다.

이 경우에도 다음 두 단계를 진행하면 HTML5 URL을 사용할 수 있습니다.

1. 라우터에 적절한 `APP_BASE_HREF` 값을 제공합니다.
1. CSS, 이미지, 스크립트, 템플릿 HTML 파일 등 모든 웹 리소스에 루트 URL\(`authority`가 있는 URL\)을 사용합니다.
   - `<base href>`의 `path`는 "/"로 끝나야 합니다.
     브라우저는 `path`의 마지막 "`/`" 뒤에 있는 문자를 무시하기 때문입니다.
   - `<base href>`에 `query` 부분이 있으면 페이지 링크의 `path`가 비어 있고 `query`도 없을 때만 해당 `query`를 사용합니다.
     따라서 `<base href>`의 `query`는 `HashLocationStrategy`를 사용할 때만 포함됩니다.

   - 페이지 링크가 루트 URL\(`authority`가 있는 URL\)이면 `<base href>`를 사용하지 않습니다.
     따라서 authority가 있는 `APP_BASE_HREF`를 사용하면 Angular가 생성하는 모든 링크가 `<base href>` 값을 무시합니다.

   - `<base href>`의 프래그먼트는 _절대_ 유지되지 않습니다.

`<base href>`로 대상 URI를 구성하는 방법은 참조 변환을 설명하는 [RFC](https://tools.ietf.org/html/rfc3986#section-5.2.2) 섹션을 참고하세요.

<!--
### `HashLocationStrategy`
-->


### `HashLocationStrategy`

<!--
Use `HashLocationStrategy` by providing the `useHash: true` in an object as the second argument of the `RouterModule.forRoot()` in the `AppModule`.

```ts
providers: [provideRouter(appRoutes, withHashLocation())];
```

When using `RouterModule.forRoot`, this is configured with the `useHash: true` in the second argument: `RouterModule.forRoot(routes, {useHash: true})`.
-->

`HashLocationStrategy`를 사용하려면 `AppModule`에서 `RouterModule.forRoot()`의 두 번째 인자로 `useHash: true`를 지정한 객체를 전달하세요.

```ts
providers: [provideRouter(appRoutes, withHashLocation())];
```

`RouterModule.forRoot`를 사용할 때는 `RouterModule.forRoot(routes, {useHash: true})`처럼 두 번째 인자에 `useHash: true`를 설정합니다.
