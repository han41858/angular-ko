<!--
# Error boundaries in routing

IMPORTANT: Router error boundaries are in [developer preview](reference/releases#developer-preview).

When building web applications, runtime errors can occur during component initialization, data loading, or rendering. Angular Router allows you to isolate these failures to individual routes using **error boundaries**, preventing a single failing component from crashing the entire application shell.

NOTE: This guide covers error handling at the route level. For catching errors within specific sections of a component's template, refer to the [template `@boundary` block guide](/guide/templates/error-boundaries).
-->

# 라우팅의 오류 경계

IMPORTANT: 라우터 오류 경계는 [개발자 프리뷰](reference/releases#developer-preview)입니다.

웹 애플리케이션을 만들다 보면 컴포넌트를 초기화하거나 데이터를 불러오거나 화면을 렌더링하는 중에 런타임 오류가 발생할 수 있습니다. Angular 라우터는 **오류 경계**를 사용해 오류의 영향을 개별 라우팅 규칙으로 제한하므로, 컴포넌트 하나의 실패로 애플리케이션 화면 전체가 중단되는 일을 방지합니다.

NOTE: 이 가이드는 라우팅 규칙 단위의 오류 처리를 다룹니다. 컴포넌트 템플릿의 특정 영역에서 발생하는 오류를 포착하려면 [템플릿 `@boundary` 블록 가이드](/guide/templates/error-boundaries)를 참고하세요.

<!--
## What are router error boundaries?

Router error boundaries provide declarative error handling at the route outlet level. When a component within a route throws an error—such as a failed network resource, an unexpected null reference in a template, or an error during dependency injection—Angular Router catches the error and displays a dedicated fallback component (`errorComponent`) in place of the failing view.

Sibling outlets, parent layout components, and global navigation headers remain fully interactive and intact.
-->

<a id="what-are-router-error-boundaries"></a>

## 라우터 오류 경계란?

라우터 오류 경계를 사용하면 라우팅 아웃렛 단위로 오류 처리 방식을 선언할 수 있습니다. 라우팅된 컴포넌트에서 네트워크 리소스 로딩 실패, 템플릿의 예상치 못한 null 참조, 의존성 주입 중 오류 등이 발생하면 Angular 라우터가 오류를 포착하고 실패한 뷰 대신 전용 대체 컴포넌트(`errorComponent`)를 표시합니다.

형제 아웃렛, 상위 레이아웃 컴포넌트, 전역 내비게이션 헤더는 영향을 받지 않으며 계속 사용할 수 있습니다.

<!--
## Configure an error component

To display a custom fallback UI when a route fails, add the `errorComponent` property to your route definition:

```ts {header:"app.routes.ts"}
import {Routes} from '@angular/router';
import {ProductDetails} from './product-details';
import {ProductErrorFallback} from './product-error-fallback';

export const routes: Routes = [
  {
    path: 'products/:id',
    component: ProductDetails,
    errorComponent: ProductErrorFallback,
  },
];
```

When you navigate to `/products/123`, if `ProductDetails` throws an error during creation or rendering, Angular Router instantiates `ProductErrorFallback` inside the `<router-outlet>` instead.

NOTE: `errorComponent` only takes effect after you enable error boundaries. See [Global error boundary configuration](#global-error-boundary-configuration).

NOTE: Unlike route components which can be lazily loaded using `loadComponent`, the `errorComponent` must be eagerly loaded in your route configuration.

---
-->

<a id="configure-an-error-component"></a>

## 오류 컴포넌트 설정하기

라우팅된 컴포넌트에 오류가 발생할 때 커스텀 대체 UI를 표시하려면 라우팅 규칙 정의에 `errorComponent` 프로퍼티를 추가하세요.

```ts {header:"app.routes.ts"}
import {Routes} from '@angular/router';
import {ProductDetails} from './product-details';
import {ProductErrorFallback} from './product-error-fallback';

export const routes: Routes = [
  {
    path: 'products/:id',
    component: ProductDetails,
    errorComponent: ProductErrorFallback,
  },
];
```

`/products/123`으로 이동할 때 `ProductDetails`를 생성하거나 렌더링하는 중 오류가 발생하면 Angular 라우터는 대신 `<router-outlet>` 안에 `ProductErrorFallback`을 생성합니다.

NOTE: `errorComponent`는 오류 경계를 활성화한 경우에만 동작합니다. [전역 오류 경계 설정](#global-error-boundary-configuration)을 참고하세요.

NOTE: `loadComponent`로 지연 로드할 수 있는 라우팅 컴포넌트와 달리, `errorComponent`는 라우팅 설정에서 즉시 로드해야 합니다.

---

<!--
## Create an error fallback component

An error fallback component is a standard Angular component that can receive the details of the caught error.
-->

<a id="create-an-error-fallback-component"></a>

## 오류 대체 컴포넌트 만들기

오류 대체 컴포넌트는 포착한 오류의 세부 정보를 받을 수 있는 일반 Angular 컴포넌트입니다.

<!--
### Access error details with an input

You can accept the caught error object by declaring an `error` input:

```angular-ts {header:"product-error-fallback.ts"}
import {Component, input} from '@angular/core';

@Component({
  selector: 'app-product-error-fallback',
  template: `
    <div class="error-card">
      <h3>Failed to load product</h3>
      <p>{{ error()?.message }}</p>
    </div>
  `,
})
export class ProductErrorFallback {
  readonly error = input<Error>();
}
```

NOTE: If your route configuration includes parameters, query parameters, or route data named `error`, the caught runtime `Error` always takes precedence on the `error` input of an error component.

IMPORTANT: If the `errorComponent` itself throws an error during its creation or rendering, the `RouterOutlet` will not catch it again. The exception will bubble out of the outlet to the root `ErrorHandler` (or an enclosing [template `@boundary` block](/guide/templates/error-boundaries)) to prevent infinite error loops.
-->

<a id="access-error-details-with-an-input"></a>

### 입력으로 오류 세부 정보 받기

`error` 입력을 선언하면 포착한 오류 객체를 받을 수 있습니다.

```angular-ts {header:"product-error-fallback.ts"}
import {Component, input} from '@angular/core';

@Component({
  selector: 'app-product-error-fallback',
  template: `
    <div class="error-card">
      <h3>Failed to load product</h3>
      <p>{{ error()?.message }}</p>
    </div>
  `,
})
export class ProductErrorFallback {
  readonly error = input<Error>();
}
```

NOTE: 라우팅 설정에 이름이 `error`인 파라미터, 쿼리 파라미터 또는 라우팅 데이터가 있더라도 오류 컴포넌트의 `error` 입력에는 포착한 런타임 `Error`가 항상 우선합니다.

IMPORTANT: `errorComponent` 자체를 생성하거나 렌더링하는 중 오류가 발생하면 `RouterOutlet`은 그 오류를 다시 포착하지 않습니다. 무한 오류 루프를 방지하기 위해 예외는 아웃렛 밖으로 전파되어 루트 `ErrorHandler` 또는 이를 감싸는 [템플릿 `@boundary` 블록](/guide/templates/error-boundaries)으로 전달됩니다.

<!--
## Route parameter and data binding

When using `withComponentInputBinding()`, Angular Router binds route parameters and static data to inputs on the `errorComponent` as well. This allows you to display contextual information in your error UI:

```angular-ts {header:"product-error-fallback.ts"}
import {Component, input} from '@angular/core';

@Component({
  selector: 'app-product-error-fallback',
  template: `
    <div class="error-card">
      <h3>Failed to load product #{{ id() }}</h3>
      <p>{{ error()?.message }}</p>
    </div>
  `,
})
export class ProductErrorFallback {
  readonly id = input<string>();
  readonly error = input<Error>();
}
```
-->

<a id="route-parameter-and-data-binding"></a>

## 라우팅 파라미터와 데이터 바인딩

`withComponentInputBinding()`을 사용하면 Angular 라우터가 라우팅 파라미터와 정적 데이터를 `errorComponent`의 입력에도 바인딩합니다. 따라서 오류 UI에 상황에 맞는 정보를 표시할 수 있습니다.

```angular-ts {header:"product-error-fallback.ts"}
import {Component, input} from '@angular/core';

@Component({
  selector: 'app-product-error-fallback',
  template: `
    <div class="error-card">
      <h3>Failed to load product #{{ id() }}</h3>
      <p>{{ error()?.message }}</p>
    </div>
  `,
})
export class ProductErrorFallback {
  readonly id = input<string>();
  readonly error = input<Error>();
}
```

<!--
## Global error boundary configuration

Enable router error boundaries for your application with the `withErrorBoundaries` feature in `provideRouter`. Without it, a route's `errorComponent` is ignored:

```ts {header:"app.config.ts"}
import {ApplicationConfig, inject} from '@angular/core';
import {provideRouter, withComponentInputBinding, withErrorBoundaries} from '@angular/router';
import {routes} from './app.routes';
import {GlobalErrorFallback} from './global-error-fallback';
import {AnalyticsService} from './analytics.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withErrorBoundaries({
        // Default fallback component for routes that do not define their own errorComponent
        defaultErrorComponent: GlobalErrorFallback,

        // Global telemetry hook invoked whenever a route error is caught
        onError: (error, details) => {
          inject(AnalyticsService).logException(error, details);
        },
      }),
    ),
  ],
};
```
-->

<a id="global-error-boundary-configuration"></a>

## 전역 오류 경계 설정

애플리케이션의 라우터 오류 경계를 활성화하려면 `provideRouter`에 `withErrorBoundaries` 기능을 추가하세요. 이를 추가하지 않으면 라우팅 규칙의 `errorComponent`는 무시됩니다.

```ts {header:"app.config.ts"}
import {ApplicationConfig, inject} from '@angular/core';
import {provideRouter, withComponentInputBinding, withErrorBoundaries} from '@angular/router';
import {routes} from './app.routes';
import {GlobalErrorFallback} from './global-error-fallback';
import {AnalyticsService} from './analytics.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withErrorBoundaries({
        // Default fallback component for routes that do not define their own errorComponent
        defaultErrorComponent: GlobalErrorFallback,

        // Global telemetry hook invoked whenever a route error is caught
        onError: (error, details) => {
          inject(AnalyticsService).logException(error, details);
        },
      }),
    ),
  ],
};
```

<!--
### Options

| Option                  | Type                                             | Description                                                                                                                          |
| ----------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `defaultErrorComponent` | `Type<unknown>`                                  | Default fallback component to render when a route without its own `errorComponent` throws an error.                                  |
| `onError`               | `(error: Error, details?: ErrorDetails) => void` | Global callback invoked whenever any error is caught by a router error boundary. Ideal for sending telemetry to monitoring services. |

---
-->

<a id="options"></a>

### 옵션

| 옵션 | 타입 | 설명 |
| --- | --- | --- |
| `defaultErrorComponent` | `Type<unknown>` | 자체 `errorComponent`가 없는 라우팅 규칙에서 오류가 발생하면 렌더링할 기본 대체 컴포넌트입니다. |
| `onError` | `(error: Error, details?: ErrorDetails) => void` | 라우터 오류 경계가 오류를 포착할 때마다 호출되는 전역 콜백입니다. 모니터링 서비스에 원격 측정 데이터를 보내는 데 적합합니다. |

---

<!--
## Redirecting with `RedirectCommand`

When an authentication failure or data condition requires navigating to another page, components and route resources can throw a `RedirectCommand`:

```angular-ts {header:"user-profile.ts"}
import {Component, inject, resource} from '@angular/core';
import {Router, RedirectCommand} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  template: `...`,
})
export class UserProfile {
  private router = inject(Router);

  userData = resource({
    loader: async () => {
      const response = await fetch('/api/user');
      if (response.status === 401) {
        // Automatically redirects to /login when unauthorized
        throw new RedirectCommand(this.router.parseUrl('/login'));
      }
      return response.json();
    },
  });
}
```

When a `RedirectCommand` is thrown:

1. `RouterOutlet` catches the command and initiates navigation to the specified redirect destination.
2. If nested outlets or template error boundaries exist, Angular deduplicates the command to ensure the navigation is only triggered once.
3. The error component (if configured) renders during the transition.

NOTE: If a `RedirectCommand` is thrown and no `errorComponent` is configured, the router initiates the navigation and intentionally swallows the error to prevent it from being logged as a crash by the global `ErrorHandler`.
-->

<a id="redirecting-with-redirectcommand"></a>

## `RedirectCommand`로 리다이렉트하기

인증 실패나 데이터 조건에 따라 다른 페이지로 이동해야 할 때 컴포넌트와 라우팅 리소스에서 `RedirectCommand`를 던질 수 있습니다.

```angular-ts {header:"user-profile.ts"}
import {Component, inject, resource} from '@angular/core';
import {Router, RedirectCommand} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  template: `...`,
})
export class UserProfile {
  private router = inject(Router);

  userData = resource({
    loader: async () => {
      const response = await fetch('/api/user');
      if (response.status === 401) {
        // Automatically redirects to /login when unauthorized
        throw new RedirectCommand(this.router.parseUrl('/login'));
      }
      return response.json();
    },
  });
}
```

`RedirectCommand`를 던지면 다음과 같이 동작합니다.

1. `RouterOutlet`이 명령을 포착하고 지정된 리다이렉트 대상으로 내비게이션을 시작합니다.
2. 중첩 아웃렛이나 템플릿 오류 경계가 있다면 Angular는 중복 명령을 제거해 내비게이션이 한 번만 시작되도록 합니다.
3. 전환 중에는 오류 컴포넌트를 설정한 경우 해당 컴포넌트가 렌더링됩니다.

NOTE: `errorComponent`가 설정되지 않은 상태에서 `RedirectCommand`를 던지면 라우터가 내비게이션을 시작하고, 전역 `ErrorHandler`가 이를 애플리케이션 충돌로 기록하지 않도록 해당 오류를 더 이상 전파하지 않습니다.

<!--
## Error boundary scope vs. navigation errors

It is helpful to understand the distinction between **view-layer errors** and **navigation pipeline errors**:

- **View-layer errors (Error boundaries)**: Occur inside component constructors, dependency injection, lifecycle hooks (`ngOnInit`), template expressions, and component `resource()` loaders. These are caught by `RouterOutlet` and display the `errorComponent`.
- **Navigation pipeline errors (`NavigationError`)**: Occur before route activation, such as failing `canActivate` / `canMatch` guards or route `resolve` data functions. These halt the navigation transition before reaching the outlet and can be customized using `withNavigationErrorHandler`.

NOTE: When an error boundary displays an `errorComponent`, `canDeactivate` guards configured for that route run when navigating away. The guard receives the active `errorComponent` instance as its `component` parameter. If your guard accesses component-specific properties or methods, verify the component type or safely handle the error component instance.
-->

<a id="error-boundary-scope-vs-navigation-errors"></a>

## 오류 경계의 범위와 내비게이션 오류의 차이

**뷰 계층 오류**와 **내비게이션 파이프라인 오류**는 다음과 같이 구분합니다.

- **뷰 계층 오류(오류 경계)**: 컴포넌트 생성자, 의존성 주입, 생명주기 훅(`ngOnInit`), 템플릿 표현식, 컴포넌트의 `resource()` 로더에서 발생합니다. `RouterOutlet`이 오류를 포착하고 `errorComponent`를 표시합니다.
- **내비게이션 파이프라인 오류(`NavigationError`)**: `canActivate` 또는 `canMatch` 가드나 라우팅 규칙의 `resolve` 데이터 함수가 실패하는 등 라우팅 규칙이 활성화되기 전에 발생합니다. 내비게이션은 아웃렛에 도달하기 전에 중단되며, `withNavigationErrorHandler`로 오류 처리 방식을 변경할 수 있습니다.

NOTE: 오류 경계가 `errorComponent`를 표시하는 상태에서 다른 곳으로 이동하면 해당 라우팅 규칙에 설정한 `canDeactivate` 가드가 실행됩니다. 가드는 `component` 파라미터로 현재 활성화된 `errorComponent` 인스턴스를 받습니다. 가드가 특정 컴포넌트의 프로퍼티나 메서드에 접근한다면 타입을 확인하거나 오류 컴포넌트 인스턴스를 안전하게 처리하세요.

<!--
## Next steps

<docs-pill-row>
  <docs-pill href="/guide/templates/error-boundaries" title="Template error boundaries"/>
  <docs-pill href="/guide/routing/show-routes-with-outlets" title="Show routes with outlets"/>
  <docs-pill href="/guide/routing/redirecting-routes" title="Redirecting routes"/>
  <docs-pill href="/guide/routing/data-fetching-with-resources" title="Data fetching with resources"/>
</docs-pill-row>
-->

<a id="next-steps"></a>

## 다음 단계

<docs-pill-row>
  <docs-pill href="/guide/templates/error-boundaries" title="템플릿 오류 경계"/>
  <docs-pill href="/guide/routing/show-routes-with-outlets" title="아웃렛으로 라우팅 규칙 표시하기"/>
  <docs-pill href="/guide/routing/redirecting-routes" title="라우팅 규칙 리다이렉트하기"/>
  <docs-pill href="/guide/routing/data-fetching-with-resources" title="리소스로 데이터 가져오기"/>
</docs-pill-row>
