<!--
# Route Loading Strategies
-->

<a id="route-loading-strategies"></a>

# 라우팅 규칙 로딩 전략

<!--
Understanding how and when routes and components load in Angular routing is crucial for building responsive web applications. Angular offers two primary strategies to control loading behavior:

1. **Eagerly loaded**: Routes and components that are loaded immediately
2. **Lazily loaded**: Routes and components loaded only when needed

Each approach offers distinct advantages for different scenarios.
-->

빠르게 반응하는 웹 애플리케이션을 만들려면 Angular 라우팅에서 라우팅 규칙과 컴포넌트를 언제, 어떻게 로드하는지 이해해야 합니다.
Angular는 로딩 방식을 제어하는 두 가지 주요 전략을 제공합니다.

1. **즉시 로딩**: 라우팅 규칙과 컴포넌트를 즉시 로드합니다.
2. **지연 로딩**: 라우팅 규칙과 컴포넌트를 필요할 때만 로드합니다.

각 방식은 상황에 따라 서로 다른 장점이 있습니다.

<!--
## Eagerly loaded components
-->

<a id="eagerly-loaded-components"></a>

## 컴포넌트 즉시 로딩

<!--
When you define a route with the [`component`](api/router/Route#component) property, the referenced component is eagerly loaded as part of the same JavaScript bundle as the route configuration.

```ts
import {Routes} from '@angular/router';
import {HomePage} from './components/home/home-page';
import {LoginPage} from './components/auth/login-page';

export const routes: Routes = [
  // HomePage and LoginPage are both directly referenced in this config,
  // so their code is eagerly included in the same JavaScript bundle as this file.
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
];
```

Eagerly loading route components like this means that the browser has to download and parse all of the JavaScript for these components as part of your initial page load, but the components are available to Angular immediately.

While including more JavaScript in your initial page load leads to slower initial load times, this can lead to more seamless transitions as the user navigates through an application.
-->

[`component`](api/router/Route#component) 프로퍼티로 라우팅 규칙을 정의하면 참조한 컴포넌트는 라우팅 규칙 설정과 같은 JavaScript 번들에 포함되어 즉시 로드됩니다.

```ts
import {Routes} from '@angular/router';
import {HomePage} from './components/home/home-page';
import {LoginPage} from './components/auth/login-page';

export const routes: Routes = [
  // 이 설정에서는 HomePage와 LoginPage를 모두 직접 참조하므로
  // 두 컴포넌트의 코드가 이 파일과 같은 JavaScript 번들에 포함되어 즉시 로드됩니다.
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
];
```

이렇게 라우팅 규칙 컴포넌트를 즉시 로드하면 브라우저가 첫 페이지를 로드할 때 해당 컴포넌트의 JavaScript를 모두 다운로드하고 파싱해야 하지만, Angular에서는 컴포넌트를 바로 사용할 수 있습니다.

첫 페이지를 로드할 때 더 많은 JavaScript를 포함하면 초기 로딩은 느려지지만, 사용자가 애플리케이션 안에서 이동할 때는 더 매끄럽게 전환할 수 있습니다.

<!--
## Lazily loaded components and routes
-->

<a id="lazily-loaded-components-and-routes"></a>

## 컴포넌트와 라우팅 규칙 지연 로딩

<!--
You can use the [`loadComponent`](api/router/Route#loadComponent) property to lazily load the JavaScript for a component at the point at which that route would become active. The [`loadChildren`](api/router/Route#loadChildren) property lazily loads child routes during route matching.

```ts
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login-page'),
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component'),
    loadChildren: () => import('./admin/admin.routes'),
  },
];
```

The [`loadComponent`](/api/router/Route#loadComponent) and [`loadChildren`](/api/router/Route#loadChildren) properties accept a loader function that returns a Promise that resolves to an Angular component or a set of routes respectively. In most cases, this function uses the standard [JavaScript dynamic import API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import). You can, however, use any arbitrary async loader function.

If the lazily loaded file uses a `default` export, you can return the `import()` promise directly without an additional `.then` call to select the exported class.

Lazily loading routes can significantly improve the load speed of your Angular application by removing large portions of JavaScript from the initial bundle. These portions of your code compile into separate JavaScript "chunks" that the router requests only when the user visits the corresponding route.
-->

[`loadComponent`](api/router/Route#loadComponent) 프로퍼티를 사용하면 라우팅 규칙이 활성화되는 시점에 컴포넌트의 JavaScript를 지연 로드할 수 있습니다.
[`loadChildren`](api/router/Route#loadChildren) 프로퍼티는 라우팅 규칙을 매칭하는 동안 자식 라우팅 규칙을 지연 로드합니다.

```ts
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login-page'),
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component'),
    loadChildren: () => import('./admin/admin.routes'),
  },
];
```

[`loadComponent`](/api/router/Route#loadComponent)와 [`loadChildren`](/api/router/Route#loadChildren) 프로퍼티에는 로더 함수를 전달합니다.
로더 함수는 각각 Angular 컴포넌트와 라우팅 규칙 모음으로 이행되는 Promise를 반환합니다.
일반적으로 이 함수에서는 표준 [JavaScript 동적 import API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)를 사용하지만, 다른 비동기 로더 함수를 사용해도 됩니다.

지연 로드하는 파일이 `default`로 내보내기를 한다면, 내보낸 클래스를 선택하는 `.then` 호출 없이 `import()`의 Promise를 바로 반환할 수 있습니다.

라우팅 규칙을 지연 로드하면 초기 번들에서 많은 JavaScript를 분리할 수 있기 때문에 Angular 애플리케이션의 로딩 속도가 크게 개선될 수 있습니다.
분리된 코드는 별도의 JavaScript "청크"로 컴파일되며, 사용자가 해당 라우팅 규칙을 방문할 때만 라우터가 요청합니다.

<!--
## Injection context lazy loading
-->

<a id="injection-context-lazy-loading"></a>

## 의존성 주입 컨텍스트에서 지연 로딩하기

<!--
The Router executes [`loadComponent`](/api/router/Route#loadComponent) and [`loadChildren`](/api/router/Route#loadChildren) within the **injection context of the current route**, allowing you to call [`inject`](/api/core/inject)inside these loader functions to access providers declared on that route, inherited from parent routes through hierarchical dependency injection, or available globally. This enables context-aware lazy loading.

```ts
import {Routes} from '@angular/router';
import {inject} from '@angular/core';
import {FeatureFlags} from './feature-flags';

export const routes: Routes = [
  {
    path: 'dashboard',
    // Runs inside the route's injection context
    loadComponent: () => {
      const flags = inject(FeatureFlags);
      return flags.isPremium
        ? import('./dashboard/premium-dashboard')
        : import('./dashboard/basic-dashboard');
    },
  },
];
```
-->

라우터는 **현재 라우팅 규칙의 의존성 주입 컨텍스트**에서 [`loadComponent`](/api/router/Route#loadComponent)와 [`loadChildren`](/api/router/Route#loadChildren)을 실행합니다.
따라서 로더 함수 안에서 [`inject`](/api/core/inject)를 호출하면 해당 라우팅 규칙에 선언된 프로바이더, 계층형 의존성 주입으로 부모 라우팅 규칙에서 상속받은 프로바이더, 전역 프로바이더에 접근할 수 있습니다.
이 방식으로 컨텍스트에 맞춰 지연 로딩을 구성할 수 있습니다.

```ts
import {Routes} from '@angular/router';
import {inject} from '@angular/core';
import {FeatureFlags} from './feature-flags';

export const routes: Routes = [
  {
    path: 'dashboard',
    // 라우팅 규칙의 의존성 주입 컨텍스트에서 실행됩니다.
    loadComponent: () => {
      const flags = inject(FeatureFlags);
      return flags.isPremium
        ? import('./dashboard/premium-dashboard')
        : import('./dashboard/basic-dashboard');
    },
  },
];
```

<!--
## Should I use an eager or a lazy route?
-->

<a id="should-i-use-an-eager-or-a-lazy-route"></a>

## 즉시 로딩과 지연 로딩 중 무엇을 사용해야 하나요?

<!--
There are many factors to consider when deciding on whether a route should be eager or lazy.

In general, eager loading is recommended for primary landing page(s) while other pages would be lazy-loaded.

NOTE: While lazy routes have the upfront performance benefit of reducing the amount of initial data requested by the user, it adds future data requests that could be undesirable. This is particularly true when dealing with nested lazy loading at multiple levels, which can significantly impact performance.
-->

라우팅 규칙을 즉시 로드할지 지연 로드할지 결정할 때는 여러 요소를 고려해야 합니다.

일반적으로 처음 방문하는 주요 페이지는 즉시 로드하고, 나머지 페이지는 지연 로드하는 방식을 권장합니다.

참고: 지연 로딩은 사용자가 처음 요청하는 데이터양을 줄여 초기 성능을 개선하지만, 이후에 추가 데이터 요청이 발생한다는 점이 단점이 될 수 있습니다.
특히 여러 단계에 걸쳐 지연 로딩을 중첩하면 성능에 큰 영향을 줄 수 있습니다.

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
Learn how to [display the contents of your routes with Outlets](/guide/routing/show-routes-with-outlets).
-->

[아웃렛으로 라우팅 규칙 내용을 표시하는 방법](/guide/routing/show-routes-with-outlets)을 알아보세요.
