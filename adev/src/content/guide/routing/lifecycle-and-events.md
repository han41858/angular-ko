<!--
# Router Lifecycle and Events
-->

<a id="router-lifecycle-and-events"></a>

# 라우터 라이프사이클와 이벤트

<!--
Angular Router provides a comprehensive set of lifecycle hooks and events that allow you to respond to navigation changes and execute custom logic during the routing process.
-->

Angular 라우터는 다양한 라이프사이클 훅과 이벤트를 제공합니다.
이 기능으로 내비게이션 변화에 반응하고 라우팅 과정에서 커스텀 로직을 실행할 수 있습니다.

<!--
## Common router events
-->

<a id="common-router-events"></a>

## 주요 라우터 이벤트

<!--
The Angular Router emits navigation events that you can subscribe to in order to track the navigation lifecycle. These events are available through the `Router.events` observable. This section covers common routing lifecycle events for navigation and error tracking (in chronological order).

| Events                                              | Description                                                                                              |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [`NavigationStart`](api/router/NavigationStart)     | Occurs when navigation begins and contains the requested URL.                                            |
| [`RoutesRecognized`](api/router/RoutesRecognized)   | Occurs after the router determines which route matches the URL and contains the route state information. |
| [`GuardsCheckStart`](api/router/GuardsCheckStart)   | Begins the route guard phase. The router evaluates route guards like `canActivate` and `canDeactivate`.  |
| [`GuardsCheckEnd`](api/router/GuardsCheckEnd)       | Signals completion of guard evaluation. Contains the result (allowed/denied).                            |
| [`ResolveStart`](api/router/ResolveStart)           | Begins the data resolution phase. Route resolvers and resources start fetching data.                     |
| [`ResolveEnd`](api/router/ResolveEnd)               | Data resolution completes. All required data and blocking resources become available.                    |
| [`NavigationEnd`](api/router/NavigationEnd)         | Final event when navigation completes successfully. The router updates the URL.                          |
| [`NavigationSkipped`](api/router/NavigationSkipped) | Occurs when the router skips navigation (e.g., same URL navigation).                                     |

The following are common error events:

| Event                                             | Description                                                                                                    |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [`NavigationCancel`](api/router/NavigationCancel) | Occurs when the router cancels navigation. Often due to a guard returning false.                               |
| [`NavigationError`](api/router/NavigationError)   | Occurs when navigation fails. Could be due to invalid routes, resolver errors, or rejected blocking resources. |

For a list of all lifecycle events, check out the [complete table of this guide](#all-router-events).
-->

Angular 라우터가 발생시키는 내비게이션 이벤트를 구독하면 내비게이션 라이프사이클을 추적할 수 있습니다.
이 이벤트는 `Router.events` 옵저버블로 제공됩니다.
이 섹션에서는 내비게이션과 오류를 추적하는 주요 라우팅 라이프사이클 이벤트를 발생 순서대로 설명합니다.

| 이벤트                                              | 설명                                                                                                            |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [`NavigationStart`](api/router/NavigationStart)     | 내비게이션이 시작될 때 발생하며 요청한 URL을 포함합니다.                                                        |
| [`RoutesRecognized`](api/router/RoutesRecognized)   | 라우터가 URL에 매칭되는 라우팅 규칙을 결정한 뒤 발생하며 라우팅 규칙 상태 정보를 포함합니다.                    |
| [`GuardsCheckStart`](api/router/GuardsCheckStart)   | 라우팅 규칙 가드 단계를 시작합니다. 라우터가 `canActivate`, `canDeactivate` 같은 라우팅 규칙 가드를 평가합니다. |
| [`GuardsCheckEnd`](api/router/GuardsCheckEnd)       | 가드 평가가 완료되었음을 알립니다. 허용 또는 거부 결과를 포함합니다.                                            |
| [`ResolveStart`](api/router/ResolveStart)           | 데이터 리졸브 단계를 시작합니다. 라우팅 규칙 리졸버와 리소스가 데이터를 가져오기 시작합니다.                    |
| [`ResolveEnd`](api/router/ResolveEnd)               | 데이터 리졸브가 완료됩니다. 필요한 모든 데이터와 블로킹 리소스를 사용할 수 있게 됩니다.                         |
| [`NavigationEnd`](api/router/NavigationEnd)         | 내비게이션이 성공적으로 완료되었을 때 발생하는 마지막 이벤트입니다. 라우터가 URL을 갱신합니다.                  |
| [`NavigationSkipped`](api/router/NavigationSkipped) | 같은 URL로 이동하는 경우처럼 라우터가 내비게이션을 건너뛸 때 발생합니다.                                        |

주요 오류 이벤트는 다음과 같습니다.

| 이벤트                                            | 설명                                                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [`NavigationCancel`](api/router/NavigationCancel) | 라우터가 내비게이션을 취소할 때 발생합니다. 가드가 false를 반환하는 경우가 흔합니다.                                     |
| [`NavigationError`](api/router/NavigationError)   | 내비게이션이 실패할 때 발생합니다. 유효하지 않은 라우팅 규칙, 리졸버 오류, 블로킹 리소스의 실패 등이 원인일 수 있습니다. |

전체 라이프사이클 이벤트 목록은 [이 문서의 전체 이벤트 표](#all-router-events)를 참고하세요.

<!--
## How to subscribe to router events
-->

<a id="how-to-subscribe-to-router-events"></a>

## 라우터 이벤트 구독하기

<!--
When you want to run code during specific navigation lifecycle events, you can do so by subscribing to the `router.events` and checking the instance of the event:

```ts
// Example of subscribing to router events
import {Component, inject, signal, effect} from '@angular/core';
import {Event, Router, NavigationStart, NavigationEnd} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component(/* ... */)
export class RouterEvents {
  private readonly router = inject(Router);

  constructor() {
    // Subscribe to router events and react to events
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Navigation starting
        console.log('Navigation starting:', event.url);
      }
      if (event instanceof NavigationEnd) {
        // Navigation completed
        console.log('Navigation completed:', event.url);
      }
    });
  }
}
```

NOTE: The [`Event`](api/router/Event) type from `@angular/router` is named the same as the regular global [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) type, but it is different from the [`RouterEvent`](api/router/RouterEvent) type.
-->

특정 내비게이션 라이프사이클 이벤트에서 코드를 실행하려면 `router.events`를 구독하고 이벤트의 인스턴스 타입을 확인하세요.

```ts
// 라우터 이벤트 구독 예제
import {Component, inject, signal, effect} from '@angular/core';
import {Event, Router, NavigationStart, NavigationEnd} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component(/* ... */)
export class RouterEvents {
  private readonly router = inject(Router);

  constructor() {
    // 라우터 이벤트를 구독하고 이벤트에 반응합니다.
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // 내비게이션 시작
        console.log('Navigation starting:', event.url);
      }
      if (event instanceof NavigationEnd) {
        // 내비게이션 완료
        console.log('Navigation completed:', event.url);
      }
    });
  }
}
```

참고: `@angular/router`의 [`Event`](api/router/Event) 타입은 일반 전역 [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) 타입과 이름이 같습니다.
하지만 [`RouterEvent`](api/router/RouterEvent) 타입과는 다릅니다.

<!--
## How to debug routing events
-->

<a id="how-to-debug-routing-events"></a>

## 라우팅 이벤트 디버깅하기

<!--
Debugging router navigation issues can be challenging without visibility into the event sequence. Angular provides a built-in debugging feature that logs all router events to the console, helping you understand the navigation flow and identify where issues occur.

When you need to inspect a Router event sequence, you can enable logging for internal navigation events for debugging. You can configure this by passing a configuration option (`withDebugTracing()`) that enables detailed console logging of all routing events.

```ts
import {provideRouter, Routes, withDebugTracing} from '@angular/router';

const appRoutes: Routes = [];
bootstrapApplication(App, {
  providers: [provideRouter(appRoutes, withDebugTracing())],
});
```

For more information, check out the official docs on [`withDebugTracing`](api/router/withDebugTracing).
-->

이벤트 발생 순서를 확인할 수 없으면 라우터 내비게이션 문제를 디버깅하기 어렵습니다.
Angular는 모든 라우터 이벤트를 콘솔에 기록하는 내장 디버깅 기능을 제공합니다.
이 기능으로 내비게이션 흐름을 이해하고 문제가 발생하는 위치를 찾을 수 있습니다.

라우터 이벤트 순서를 살펴봐야 한다면 내부 내비게이션 이벤트 로깅을 활성화하세요.
모든 라우팅 이벤트를 콘솔에 자세하게 기록하는 설정 옵션 `withDebugTracing()`을 전달하면 됩니다.

```ts
import {provideRouter, Routes, withDebugTracing} from '@angular/router';

const appRoutes: Routes = [];
bootstrapApplication(App, {
  providers: [provideRouter(appRoutes, withDebugTracing())],
});
```

자세한 내용은 [`withDebugTracing` 공식 문서](api/router/withDebugTracing)를 참고하세요.

<!--
## Common use cases
-->

<a id="common-use-cases"></a>

## 주요 사용 사례

<!--
Router events enable many practical features in real-world applications. Here are some common patterns that are used with router events.
-->

라우터 이벤트로 실제 애플리케이션에 유용한 여러 기능을 구현할 수 있습니다.
다음은 라우터 이벤트를 사용하는 대표적인 패턴입니다.

<!--
### Loading indicators
-->

<a id="loading-indicators"></a>

### 로딩 표시기

<!--
Show loading indicators during navigation:

```angular-ts
import {Component, computed, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    @if (isNavigating()) {
      <div class="loading-bar">Loading...</div>
    }
    <router-outlet />
  `,
})
export class App {
  private router = inject(Router);
  isNavigating = computed(() => !!this.router.currentNavigation());
}
```
-->

내비게이션 중에 로딩 표시기를 표시합니다.

```angular-ts
import {Component, computed, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    @if (isNavigating()) {
      <div class="loading-bar">Loading...</div>
    }
    <router-outlet />
  `,
})
export class App {
  private router = inject(Router);
  isNavigating = computed(() => !!this.router.currentNavigation());
}
```

<!--
### Analytics tracking
-->

<a id="analytics-tracking"></a>

### 분석 추적

<!--
Track page views for analytics:

```ts
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {inject, DestroyRef, Service} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Service()
export class AnalyticsService {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  startTracking() {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      // Track page views when URL changes
      if (event instanceof NavigationEnd) {
        // Send page view to analytics
        this.analytics.trackPageView(event.url);
      }
    });
  }

  private analytics = {
    trackPageView: (url: string) => {
      console.log('Page view tracked:', url);
    },
  };
}
```
-->

분석을 위해 페이지 조회를 추적합니다.

```ts
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {inject, DestroyRef, Service} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Service()
export class AnalyticsService {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  startTracking() {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      // URL이 바뀌면 페이지 조회를 추적합니다.
      if (event instanceof NavigationEnd) {
        // 분석 시스템에 페이지 조회 정보를 전송합니다.
        this.analytics.trackPageView(event.url);
      }
    });
  }

  private analytics = {
    trackPageView: (url: string) => {
      console.log('Page view tracked:', url);
    },
  };
}
```

<!--
### Error handling
-->

<a id="error-handling"></a>

<a id="에러-처리"></a>

### 오류 처리

<!--
Handle navigation errors gracefully and provide user feedback:

```angular-ts
import {Component, inject, signal} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationError,
  NavigationCancel,
  NavigationCancellationCode,
} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-error-handler',
  template: `
    @if (errorMessage()) {
      <div class="error-banner">
        {{ errorMessage() }}
        <button (click)="dismissError()">Dismiss</button>
      </div>
    }
  `,
})
export class ErrorHandler {
  private router = inject(Router);
  readonly errorMessage = signal('');

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.errorMessage.set('');
      } else if (event instanceof NavigationError) {
        console.error('Navigation error:', event.error);
        this.errorMessage.set('Failed to load page. Please try again.');
      } else if (event instanceof NavigationCancel) {
        console.warn('Navigation cancelled:', event.reason);
        if (event.code === NavigationCancellationCode.GuardRejected) {
          this.errorMessage.set('Access denied. Please check your permissions.');
        }
      }
    });
  }

  dismissError() {
    this.errorMessage.set('');
  }
}
```
-->

내비게이션 오류를 적절하게 처리하고 사용자에게 결과를 알립니다.

```angular-ts
import {Component, inject, signal} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationError,
  NavigationCancel,
  NavigationCancellationCode,
} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-error-handler',
  template: `
    @if (errorMessage()) {
      <div class="error-banner">
        {{ errorMessage() }}
        <button (click)="dismissError()">Dismiss</button>
      </div>
    }
  `,
})
export class ErrorHandler {
  private router = inject(Router);
  readonly errorMessage = signal('');

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.errorMessage.set('');
      } else if (event instanceof NavigationError) {
        console.error('Navigation error:', event.error);
        this.errorMessage.set('Failed to load page. Please try again.');
      } else if (event instanceof NavigationCancel) {
        console.warn('Navigation cancelled:', event.reason);
        if (event.code === NavigationCancellationCode.GuardRejected) {
          this.errorMessage.set('Access denied. Please check your permissions.');
        }
      }
    });
  }

  dismissError() {
    this.errorMessage.set('');
  }
}
```

<!--
## All router events
-->

<a id="all-router-events"></a>

## 전체 라우터 이벤트

<!--
For reference, here is the complete list of all router events available in Angular. These events are organized by category and listed in the order they typically occur during navigation.
-->

참고할 수 있도록 Angular에서 제공하는 전체 라우터 이벤트를 정리했습니다.
이벤트를 종류별로 묶고, 일반적인 내비게이션에서 발생하는 순서대로 나열했습니다.

<!--
### Navigation events
-->

<a id="navigation-events"></a>

### 내비게이션 이벤트

<!--
These events track the core navigation process from start through route recognition, guard checks, and data resolution. They provide visibility into each phase of the navigation lifecycle.

| Event                                                     | Description                                                     |
| --------------------------------------------------------- | --------------------------------------------------------------- |
| [`NavigationStart`](api/router/NavigationStart)           | Occurs when navigation starts                                   |
| [`RouteConfigLoadStart`](api/router/RouteConfigLoadStart) | Occurs before lazy loading a route configuration                |
| [`RouteConfigLoadEnd`](api/router/RouteConfigLoadEnd)     | Occurs after a lazy-loaded route configuration loads            |
| [`RoutesRecognized`](api/router/RoutesRecognized)         | Occurs when the router parses the URL and recognizes the routes |
| [`GuardsCheckStart`](api/router/GuardsCheckStart)         | Occurs at the start of the guard phase                          |
| [`GuardsCheckEnd`](api/router/GuardsCheckEnd)             | Occurs at the end of the guard phase                            |
| [`ResolveStart`](api/router/ResolveStart)                 | Occurs at the start of the resolve phase                        |
| [`ResolveEnd`](api/router/ResolveEnd)                     | Occurs at the end of the resolve phase                          |
-->

이 이벤트는 내비게이션 시작부터 라우팅 규칙 인식, 가드 검사, 데이터 리졸브까지 핵심 내비게이션 과정을 추적합니다.
내비게이션 라이프사이클의 각 단계를 확인할 수 있습니다.

| 이벤트                                                    | 설명                                                        |
| --------------------------------------------------------- | ----------------------------------------------------------- |
| [`NavigationStart`](api/router/NavigationStart)           | 내비게이션이 시작될 때 발생합니다.                          |
| [`RouteConfigLoadStart`](api/router/RouteConfigLoadStart) | 라우팅 규칙 설정을 지연 로드하기 전에 발생합니다.           |
| [`RouteConfigLoadEnd`](api/router/RouteConfigLoadEnd)     | 지연 로드한 라우팅 규칙 설정의 로딩이 완료된 뒤 발생합니다. |
| [`RoutesRecognized`](api/router/RoutesRecognized)         | 라우터가 URL을 파싱하고 라우팅 규칙을 인식할 때 발생합니다. |
| [`GuardsCheckStart`](api/router/GuardsCheckStart)         | 가드 단계가 시작될 때 발생합니다.                           |
| [`GuardsCheckEnd`](api/router/GuardsCheckEnd)             | 가드 단계가 끝날 때 발생합니다.                             |
| [`ResolveStart`](api/router/ResolveStart)                 | 리졸브 단계가 시작될 때 발생합니다.                         |
| [`ResolveEnd`](api/router/ResolveEnd)                     | 리졸브 단계가 끝날 때 발생합니다.                           |

<!--
### Activation events
-->

<a id="activation-events"></a>

### 활성화 이벤트

<!--
These events occur during the activation phase when route components are being instantiated and initialized. Activation events fire for each route in the route tree, including parent and child routes.

| Event                                                     | Description                                   |
| --------------------------------------------------------- | --------------------------------------------- |
| [`ActivationStart`](api/router/ActivationStart)           | Occurs at the start of route activation       |
| [`ChildActivationStart`](api/router/ChildActivationStart) | Occurs at the start of child route activation |
| [`ActivationEnd`](api/router/ActivationEnd)               | Occurs at the end of route activation         |
| [`ChildActivationEnd`](api/router/ChildActivationEnd)     | Occurs at the end of child route activation   |
-->

이 이벤트는 라우팅 규칙 컴포넌트 인스턴스를 생성하고 초기화하는 활성화 단계에서 발생합니다.
활성화 이벤트는 부모와 자식 라우팅 규칙을 포함해 라우팅 규칙 트리의 각 라우팅 규칙에서 발생합니다.

| 이벤트                                                    | 설명                                            |
| --------------------------------------------------------- | ----------------------------------------------- |
| [`ActivationStart`](api/router/ActivationStart)           | 라우팅 규칙 활성화가 시작될 때 발생합니다.      |
| [`ChildActivationStart`](api/router/ChildActivationStart) | 자식 라우팅 규칙 활성화가 시작될 때 발생합니다. |
| [`ActivationEnd`](api/router/ActivationEnd)               | 라우팅 규칙 활성화가 끝날 때 발생합니다.        |
| [`ChildActivationEnd`](api/router/ChildActivationEnd)     | 자식 라우팅 규칙 활성화가 끝날 때 발생합니다.   |

<!--
### Navigation completion events
-->

<a id="navigation-completion-events"></a>

### 내비게이션 완료 이벤트

<!--
These events represent the final outcome of a navigation attempt. Every navigation will end with exactly one of these events, indicating whether it succeeded, was cancelled, failed, or was skipped.

| Event                                               | Description                                                         |
| --------------------------------------------------- | ------------------------------------------------------------------- |
| [`NavigationEnd`](api/router/NavigationEnd)         | Occurs when navigation ends successfully                            |
| [`NavigationCancel`](api/router/NavigationCancel)   | Occurs when the router cancels navigation                           |
| [`NavigationError`](api/router/NavigationError)     | Occurs when navigation fails due to an unexpected error             |
| [`NavigationSkipped`](api/router/NavigationSkipped) | Occurs when the router skips navigation (e.g., same URL navigation) |
-->

이 이벤트는 내비게이션 시도의 최종 결과를 나타냅니다.
모든 내비게이션은 다음 이벤트 중 정확히 하나로 끝나며, 성공, 취소, 실패, 건너뛰기 중 어떤 결과인지 알려줍니다.

| 이벤트                                              | 설명                                                                     |
| --------------------------------------------------- | ------------------------------------------------------------------------ |
| [`NavigationEnd`](api/router/NavigationEnd)         | 내비게이션이 성공적으로 끝날 때 발생합니다.                              |
| [`NavigationCancel`](api/router/NavigationCancel)   | 라우터가 내비게이션을 취소할 때 발생합니다.                              |
| [`NavigationError`](api/router/NavigationError)     | 예기치 않은 오류로 내비게이션이 실패할 때 발생합니다.                    |
| [`NavigationSkipped`](api/router/NavigationSkipped) | 같은 URL로 이동하는 경우처럼 라우터가 내비게이션을 건너뛸 때 발생합니다. |

<!--
### Other events
-->

<a id="other-events"></a>

### 기타 이벤트

<!--
There is one additional event that occurs outside the main navigation lifecycle, but it is still part of the router's event system.

| Event                         | Description             |
| ----------------------------- | ----------------------- |
| [`Scroll`](api/router/Scroll) | Occurs during scrolling |
-->

주요 내비게이션 라이프사이클 밖에서 발생하지만 라우터 이벤트 시스템에 포함되는 이벤트가 하나 더 있습니다.

| 이벤트                        | 설명                        |
| ----------------------------- | --------------------------- |
| [`Scroll`](api/router/Scroll) | 스크롤하는 동안 발생합니다. |

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
Learn more about [route guards](/guide/routing/route-guards), [data fetching with resources](/guide/routing/data-fetching-with-resources), and [common router tasks](/guide/routing/common-router-tasks).
-->

[라우팅 규칙 가드](/guide/routing/route-guards), [리소스로 데이터 가져오기](/guide/routing/data-fetching-with-resources), [일반적인 라우터 작업](/guide/routing/common-router-tasks)을 더 알아보세요.
