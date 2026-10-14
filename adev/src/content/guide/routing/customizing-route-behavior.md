<!--
# Customizing route behavior
-->

<a id="customizing-route-behavior"></a>

# 라우팅 규칙 동작 커스터마이징하기

<!--
Angular Router provides powerful extension points that allow you to customize how routes behave in your application. While the default routing behavior works well for most applications, specific requirements often demand custom implementations for performance optimization, specialized URL handling, or complex routing logic.

Route customization can become valuable when your application needs:

- **Component state preservation** across navigations to avoid re-fetching data
- **Strategic lazy module loading** based on user behavior or network conditions
- **External URL integration** or handling Angular routes alongside legacy systems
- **Dynamic route matching** based on runtime conditions beyond simple path
  patterns

NOTE: Before implementing custom strategies, ensure the default router behavior doesn't meet your needs. Angular's default routing is optimized for common use cases and provides the best balance of performance and simplicity. Customizing route strategies can create additional code complexity and have performance implications on memory usage if not carefully managed.
-->

Angular 라우터는 애플리케이션에서 라우팅 규칙이 동작하는 방식을 커스터마이징할 수 있는 강력한 확장 기능을 제공합니다.
기본 라우팅 동작은 대부분의 애플리케이션에 적합하지만, 성능 최적화나 특수한 URL 처리, 복잡한 라우팅 로직이 필요하다면 직접 구현해야 할 수 있습니다.

다음 기능이 필요한 애플리케이션에서 라우팅 규칙 커스터마이징이 유용합니다:

- 데이터를 다시 가져오지 않도록 내비게이션 사이에 **컴포넌트 상태 유지하기**
- 사용자 동작이나 네트워크 상태에 따른 **전략적인 지연 모듈 로드**
- **외부 URL 연동** 또는 기존 시스템과 Angular 라우팅 규칙 함께 처리하기
- 단순 경로 패턴을 넘어 런타임 조건에 따라 **라우팅 규칙을 동적으로 매칭하기**

참고: 커스텀 전략을 구현하기 전에 기본 라우터 동작으로 요구사항을 충족할 수 없는지 먼저 확인하세요.
Angular의 기본 라우팅은 일반적인 사용 사례에 맞춰 최적화되어 있으며, 성능과 단순성의 균형이 가장 좋습니다.
라우팅 규칙 전략을 커스터마이징하면 코드가 더 복잡해질 수 있으며, 주의해서 관리하지 않으면 메모리 사용량과 성능에도 영향을 줄 수 있습니다.

<!--
## Router configuration options
-->

<a id="router-configuration-options"></a>

## 라우터 설정 옵션

<!--
The `withRouterConfig` or `RouterModule.forRoot` allows providing additional `RouterConfigOptions` to adjust the Router’s behavior.
-->

`withRouterConfig`나 `RouterModule.forRoot`에 추가 `RouterConfigOptions`를 전달해서 라우터 동작을 조정할 수 있습니다.

<!--
### Handle canceled navigations
-->

<a id="handle-canceled-navigations"></a>

### 취소된 내비게이션 처리하기

<!--
`canceledNavigationResolution` controls how the Router restores browser history when a navigation is canceled. The default value is `'replace'`, which reverts to the pre-navigation URL with `location.replaceState`. In practice, this means that any time the address bar has already been updated for the navigation, such as with the browser back or forward buttons, the history entry is overwritten with the "rollback" if the navigation fails or is rejected by a guard.
Switching to `'computed'` keeps the in-flight history index in sync with the Angular navigation, so canceling a back button navigation triggers a forward navigation (and vice versa) to return to the original page.

This setting is most helpful when your app uses `urlUpdateStrategy: 'eager'` or when guards frequently cancel popstate navigations initiated by the browser.

```ts
provideRouter(routes, withRouterConfig({canceledNavigationResolution: 'computed'}));
```
-->

`canceledNavigationResolution`은 내비게이션이 취소되었을 때 라우터가 브라우저 이력을 복원하는 방식을 제어합니다.
기본값은 `'replace'`이며, `location.replaceState`로 내비게이션 이전 URL로 되돌립니다.
따라서 브라우저의 뒤로 또는 앞으로 버튼처럼 내비게이션을 위해 주소 표시줄이 이미 변경된 상황에서 내비게이션이 실패하거나 가드가 거부하면, 이력 항목을 원래 URL로 덮어써서 되돌립니다.
`'computed'`로 바꾸면 이동 중인 이력 인덱스를 Angular 내비게이션과 동기화합니다.
따라서 뒤로 이동을 취소하면 앞으로 이동을 실행하고, 앞으로 이동을 취소하면 뒤로 이동을 실행해서 원래 페이지로 돌아갑니다.

이 설정은 `urlUpdateStrategy: 'eager'`를 사용하거나, 브라우저가 시작한 popstate 내비게이션을 가드가 자주 취소하는 경우에 특히 유용합니다.

```ts
provideRouter(routes, withRouterConfig({canceledNavigationResolution: 'computed'}));
```

<!--
### React to same-URL navigations
-->

<a id="react-to-same-url-navigations"></a>

### 같은 URL로의 내비게이션 처리하기

<!--
`onSameUrlNavigation` configures what should happen when the user asks to navigate to the current URL. The default `'ignore'` skips work, while `'reload'` instructs the Router to process the URL in its navigation pipeline rather than skipping it. Guard and resolver reruns are governed by [`runGuardsAndResolvers`](api/router/RunGuardsAndResolvers), and component reuse is determined by the [route reuse strategy](#route-reuse-strategy).

This is useful when you want repeated clicks on a list filter, left-nav item, or refresh button to trigger new data retrieval even though the URL does not change.

```ts
provideRouter(routes, withRouterConfig({onSameUrlNavigation: 'reload'}));
```

You can also control this behavior on individual navigations rather than globally. This allows you to keep the default of `'ignore'` while selectively enabling reload behavior for specific use cases:

```ts
router.navigate(['/some-path'], {onSameUrlNavigation: 'reload'});
```
-->

`onSameUrlNavigation`은 사용자가 현재 URL로 이동하려고 할 때의 동작을 설정합니다.
기본값인 `'ignore'`는 처리를 생략하고, `'reload'`는 URL을 건너뛰지 않고 라우터의 내비게이션 처리 과정에서 처리하도록 합니다.
가드와 리졸버를 다시 실행할지는 [`runGuardsAndResolvers`](api/router/RunGuardsAndResolvers)가 결정하고, 컴포넌트를 재사용할지는 [라우팅 규칙 재사용 전략](#route-reuse-strategy)이 결정합니다.

URL이 바뀌지 않더라도 목록 필터, 왼쪽 내비게이션 항목, 새로고침 버튼을 반복해서 클릭할 때 데이터를 다시 가져오고 싶은 경우에 유용합니다.

```ts
provideRouter(routes, withRouterConfig({onSameUrlNavigation: 'reload'}));
```

전역 설정 대신 개별 내비게이션에서 이 동작을 제어할 수도 있습니다.
기본값인 `'ignore'`를 유지하면서 특정 상황에서만 다시 로드하도록 설정할 수 있습니다:

```ts
router.navigate(['/some-path'], {onSameUrlNavigation: 'reload'});
```

<!--
TIP: If you use [route resources](/guide/routing/data-fetching-with-resources#reloading-resources-without-renavigation), you can refresh data on-demand by calling `.reload()` on the resource or by updating signals read in `params`, without needing to configure `onSameUrlNavigation` or trigger a router navigation.
-->

TIP: [라우팅 규칙 리소스](/guide/routing/data-fetching-with-resources#reloading-resources-without-renavigation)를 사용하면 `onSameUrlNavigation`을 설정하거나 라우터 내비게이션을 시작하지 않아도 데이터를 갱신할 수 있습니다. 리소스의 `.reload()`를 실행하거나 `params`에서 읽는 시그널을 갱신하세요.

<!--
### Control parameter inheritance
-->

<a id="control-parameter-inheritance"></a>

### 파라미터 상속 제어하기

<!--
`paramsInheritanceStrategy` defines how route parameters and data flow from parent routes.

By default (`'always'`), child routes automatically inherit parameters, route data, and resolved values from parent routes. This ensures matrix parameters, route data, and resolved values are available further down the route tree—handy when you share contextual identifiers across feature areas such as:

```text {hideCopy}
/org/:orgId/projects/:projectId/customers/:customerId
```

```ts
export const routes: Routes = [
  {
    path: 'org/:orgId',
    component: Organization,
    children: [
      {
        path: 'projects/:projectId',
        component: Project,
        children: [
          {
            path: 'customers/:customerId',
            component: Customer,
          },
        ],
      },
    ],
  },
];
```

```ts
@Component({/* ... */})
export class Customer {
  private route = inject(ActivatedRoute);

  // All parent parameters are available directly
  orgId = this.route.snapshot.params['orgId'];
  projectId = this.route.snapshot.params['projectId'];
  customerId = this.route.snapshot.params['customerId'];
}
```

To restore the legacy behavior, set `paramsInheritanceStrategy` to `'emptyOnly'`. With `'emptyOnly'`, child routes inherit params only when their path is empty or the parent does not declare a component:

```ts
provideRouter(routes, withRouterConfig({paramsInheritanceStrategy: 'emptyOnly'}));
```

In that case, the `Customer` component has to read the parent parameters from its ancestor routes:

```ts
@Component({/* ... */})
export class Customer {
  private route = inject(ActivatedRoute);

  orgId = this.route.parent?.parent?.snapshot.params['orgId'];
  projectId = this.route.parent?.snapshot.params['projectId'];
  customerId = this.route.snapshot.params['customerId'];
}
```
-->

`paramsInheritanceStrategy`는 상위 라우팅 규칙의 파라미터와 데이터를 전달하는 방식을 정의합니다.

기본값인 `'always'`에서는 하위 라우팅 규칙이 상위 라우팅 규칙의 파라미터, 라우팅 규칙 데이터, 리졸버로 가져온 값을 자동으로 상속합니다.
따라서 라우팅 규칙 트리의 더 아래쪽에서도 매트릭스 파라미터, 라우팅 규칙 데이터, 리졸버로 가져온 값을 사용할 수 있습니다.
다음처럼 여러 기능 영역에서 컨텍스트 식별자를 공유할 때 유용합니다:

```text {hideCopy}
/org/:orgId/projects/:projectId/customers/:customerId
```

```ts
export const routes: Routes = [
  {
    path: 'org/:orgId',
    component: Organization,
    children: [
      {
        path: 'projects/:projectId',
        component: Project,
        children: [
          {
            path: 'customers/:customerId',
            component: Customer,
          },
        ],
      },
    ],
  },
];
```

```ts
@Component({/* ... */})
export class Customer {
  private route = inject(ActivatedRoute);

  // 모든 상위 라우팅 규칙 파라미터에 직접 접근할 수 있습니다.
  orgId = this.route.snapshot.params['orgId'];
  projectId = this.route.snapshot.params['projectId'];
  customerId = this.route.snapshot.params['customerId'];
}
```

이전 동작으로 되돌리려면 `paramsInheritanceStrategy`를 `'emptyOnly'`로 설정하세요.
`'emptyOnly'`에서는 하위 라우팅 규칙의 경로가 비어 있거나 상위 라우팅 규칙에 컴포넌트가 선언되지 않은 경우에만 파라미터를 상속합니다:

```ts
provideRouter(routes, withRouterConfig({paramsInheritanceStrategy: 'emptyOnly'}));
```

이 경우 `Customer` 컴포넌트는 상위 라우팅 규칙에서 부모 파라미터를 읽어야 합니다:

```ts
@Component({/* ... */})
export class Customer {
  private route = inject(ActivatedRoute);

  orgId = this.route.parent?.parent?.snapshot.params['orgId'];
  projectId = this.route.parent?.snapshot.params['projectId'];
  customerId = this.route.snapshot.params['customerId'];
}
```

<!--
### Decide when the URL updates
-->

<a id="decide-when-the-url-updates"></a>

### URL 갱신 시점 정하기

<!--
`urlUpdateStrategy` determines when Angular writes to the browser address bar. The default `'deferred'` waits for a successful navigation before changing the URL. Use `'eager'` to update immediately when navigation starts. Eager updates make it easier to surface the attempted URL if navigation fails due to guards or errors, but can briefly show an in-progress URL if you have long-running guards.

Consider this when your analytics pipeline needs to see the attempted route even if guards block it.

```ts
provideRouter(routes, withRouterConfig({urlUpdateStrategy: 'eager'}));
```
-->

`urlUpdateStrategy`는 Angular가 브라우저 주소 표시줄을 갱신하는 시점을 결정합니다.
기본값인 `'deferred'`는 내비게이션이 성공한 후에 URL을 변경합니다.
내비게이션이 시작될 때 즉시 갱신하려면 `'eager'`를 사용합니다.
즉시 갱신하면 가드나 에러로 내비게이션이 실패했을 때 시도한 URL을 쉽게 표시할 수 있지만, 오래 실행되는 가드가 있다면 진행 중인 URL이 잠시 표시될 수 있습니다.

가드가 이동을 차단하더라도 분석 파이프라인에서 이동을 시도한 라우팅 규칙을 확인해야 한다면 이 설정을 고려해 보세요.

```ts
provideRouter(routes, withRouterConfig({urlUpdateStrategy: 'eager'}));
```

<!--
### Choose default query parameter handling
-->

<a id="choose-default-query-parameter-handling"></a>

### 기본 쿼리 파라미터 처리 방식 선택하기

<!--
`defaultQueryParamsHandling` sets the fallback behavior for `Router.createUrlTree` when the call does not specify `queryParamsHandling`. `'replace'` is the default and swaps out the existing query string. `'merge'` combines the provided values with the current ones, and `'preserve'` keeps the existing query parameters unless you explicitly supply new ones.

```ts
provideRouter(routes, withRouterConfig({defaultQueryParamsHandling: 'merge'}));
```

This is especially helpful for search and filter pages to automatically retain existing filters when additional parameters are provided.
-->

`defaultQueryParamsHandling`은 `Router.createUrlTree`를 실행하면서 `queryParamsHandling`을 지정하지 않았을 때 적용할 기본 동작을 설정합니다.
기본값인 `'replace'`는 기존 쿼리 문자열을 교체합니다.
`'merge'`는 전달한 값을 현재 값과 합치고, `'preserve'`는 새 값을 명시적으로 전달하지 않는 한 기존 쿼리 파라미터를 유지합니다.

```ts
provideRouter(routes, withRouterConfig({defaultQueryParamsHandling: 'merge'}));
```

검색이나 필터 페이지에서 파라미터를 추가할 때 기존 필터를 자동으로 유지하는 데 특히 유용합니다.

<!--
### Configure trailing slash handling
-->

<a id="configure-trailing-slash-handling"></a>

### URL 끝의 슬래시 처리하기

<!--
By default, the `Location` service strips trailing slashes from URLs on read.

You can configure the `Location` service to force a trailing slash on all URLs written to the browser by providing the `TrailingSlashPathLocationStrategy` in your application.

```ts
import {LocationStrategy, TrailingSlashPathLocationStrategy} from '@angular/common';

bootstrapApplication(App, {
  providers: [{provide: LocationStrategy, useClass: TrailingSlashPathLocationStrategy}],
});
```

You can also force the `Location` service to never have a trailing slash on all URLs written to the browser by providing the `NoTrailingSlashPathLocationStrategy` in your application.

```ts
import {LocationStrategy, NoTrailingSlashPathLocationStrategy} from '@angular/common';

bootstrapApplication(App, {
  providers: [{provide: LocationStrategy, useClass: NoTrailingSlashPathLocationStrategy}],
});
```

These strategies only affect the URL written to the browser.
`Location.path()` and `Location.normalize()` will continue to strip trailing slashes when reading the URL.

Angular Router exposes four main areas for customization:

  <docs-pill-row>
    <docs-pill href="#route-reuse-strategy" title="Route reuse strategy"/>
    <docs-pill href="#preloading-strategy" title="Preloading strategy"/>
    <docs-pill href="#url-handling-strategy" title="URL handling strategy"/>
    <docs-pill href="#custom-route-matchers" title="Custom route matchers"/>
  </docs-pill-row>
-->

`Location` 서비스는 기본적으로 URL을 읽을 때 끝의 슬래시를 제거합니다.

애플리케이션에 `TrailingSlashPathLocationStrategy`를 제공하면 `Location` 서비스가 브라우저에 기록하는 모든 URL 끝에 슬래시를 붙이도록 설정할 수 있습니다.

```ts
import {LocationStrategy, TrailingSlashPathLocationStrategy} from '@angular/common';

bootstrapApplication(App, {
  providers: [{provide: LocationStrategy, useClass: TrailingSlashPathLocationStrategy}],
});
```

애플리케이션에 `NoTrailingSlashPathLocationStrategy`를 제공하면 `Location` 서비스가 브라우저에 기록하는 모든 URL 끝에 슬래시가 없도록 설정할 수도 있습니다.

```ts
import {LocationStrategy, NoTrailingSlashPathLocationStrategy} from '@angular/common';

bootstrapApplication(App, {
  providers: [{provide: LocationStrategy, useClass: NoTrailingSlashPathLocationStrategy}],
});
```

이 전략들은 브라우저에 기록하는 URL에만 영향을 미칩니다.
`Location.path()`와 `Location.normalize()`는 URL을 읽을 때 계속 끝의 슬래시를 제거합니다.

Angular 라우터는 크게 네 가지 영역의 커스터마이징을 지원합니다:

  <docs-pill-row>
    <docs-pill href="#route-reuse-strategy" title="라우팅 규칙 재사용 전략"/>
    <docs-pill href="#preloading-strategy" title="미리 로드 전략"/>
    <docs-pill href="#url-handling-strategy" title="URL 처리 전략"/>
    <docs-pill href="#custom-route-matchers" title="커스텀 라우팅 규칙 매처"/>
  </docs-pill-row>

<!--
## Route reuse strategy
-->

<a id="route-reuse-strategy"></a>

## 라우팅 규칙 재사용 전략

<!--
Route reuse strategy controls whether Angular destroys and recreates components during navigation or preserves them for reuse. By default, Angular destroys component instances when navigating away from a route and creates new instances when navigating back.
-->

라우팅 규칙 재사용 전략은 내비게이션 중 Angular가 컴포넌트를 종료하고 다시 생성할지, 재사용할 수 있도록 유지할지 제어합니다.
기본적으로 Angular는 라우팅 규칙을 떠날 때 컴포넌트 인스턴스를 종료하고 다시 돌아오면 새 인스턴스를 생성합니다.

<!--
### When to implement route reuse
-->

<a id="when-to-implement-route-reuse"></a>

### 라우팅 규칙 재사용을 구현하면 좋은 경우

<!--
Custom route reuse strategies benefit applications that need:

- **Form state preservation** - Keep partially completed forms when users navigate away and return
- **Expensive data retention** - Avoid re-fetching large datasets or complex calculations
- **Scroll position maintenance** - Preserve scroll positions in long lists or infinite scroll implementations
- **Tab-like interfaces** - Maintain component state when switching between tabs
-->

다음 기능이 필요한 애플리케이션에서 커스텀 라우팅 규칙 재사용 전략이 유용합니다:

- **폼 상태 유지** - 사용자가 다른 페이지로 이동했다가 돌아와도 작성 중인 폼을 유지합니다.
- **비용이 큰 데이터 유지** - 대규모 데이터를 다시 가져오거나 복잡한 계산을 반복하지 않도록 합니다.
- **스크롤 위치 유지** - 긴 목록이나 무한 스크롤 화면에서 스크롤 위치를 유지합니다.
- **탭 형태의 인터페이스** - 탭을 전환할 때 컴포넌트 상태를 유지합니다.

<!--
### Creating a custom route reuse strategy
-->

<a id="creating-a-custom-route-reuse-strategy"></a>

### 커스텀 라우팅 규칙 재사용 전략 만들기

<!--
Angular's `RouteReuseStrategy` class allows you to customize navigation behavior through the concept of "detached route handles."

"Detached route handles" are Angular's way of storing component instances and their entire view hierarchy. When a route is detached, Angular preserves the component instance, its child components, and all associated state in memory. This preserved state can later be reattached when navigating back to the route.

The `RouteReuseStrategy` class provides the following methods that control the lifecycle of route components:

| Method                                                                         | Description                                                                                                 |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| [`shouldDetach`](api/router/RouteReuseStrategy#shouldDetach)                   | Determines if a route should be stored for later reuse when navigating away                                 |
| [`store`](api/router/RouteReuseStrategy#store)                                 | Stores the detached route handle when `shouldDetach` returns true                                           |
| [`shouldAttach`](api/router/RouteReuseStrategy#shouldAttach)                   | Determines if a stored route should be reattached when navigating to it                                     |
| [`retrieve`](api/router/RouteReuseStrategy#retrieve)                           | Returns the previously stored route handle for reattachment                                                 |
| [`shouldReuseRoute`](api/router/RouteReuseStrategy#shouldReuseRoute)           | Determines if the router should reuse the current route instance instead of destroying it during navigation |
| [`shouldDestroyInjector`](api/router/RouteReuseStrategy#shouldDestroyInjector) | Determines if the router should destroy the injector of a detached route when it is no longer stored        |

The following example demonstrates a custom route reuse strategy that selectively preserves component state based on route metadata:

```ts
import {
  RouteReuseStrategy,
  Route,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers = new Map<Route | null, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Determines if a route should be stored for later reuse
    return route.data['reuse'] === true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    // Stores the detached route handle when shouldDetach returns true
    if (handle && route.data['reuse'] === true) {
      const key = this.getRouteKey(route);
      this.handlers.set(key, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // Checks if a stored route should be reattached
    const key = this.getRouteKey(route);
    return route.data['reuse'] === true && this.handlers.has(key);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // Returns the stored route handle for reattachment
    const key = this.getRouteKey(route);
    return route.data['reuse'] === true ? (this.handlers.get(key) ?? null) : null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // Determines if the router should reuse the current route instance
    return future.routeConfig === curr.routeConfig;
  }

  private getRouteKey(route: ActivatedRouteSnapshot): Route | null {
    return route.routeConfig;
  }
}
```
-->

Angular의 `RouteReuseStrategy` 클래스를 사용하면 "분리된 라우팅 규칙 핸들(detached route handle)"이라는 개념으로 내비게이션 동작을 커스터마이징할 수 있습니다.

분리된 라우팅 규칙 핸들은 Angular가 컴포넌트 인스턴스와 전체 뷰 계층을 저장하는 방식입니다.
라우팅 규칙을 분리하면 Angular는 컴포넌트 인스턴스, 하위 컴포넌트, 관련된 모든 상태를 메모리에 유지합니다.
나중에 해당 라우팅 규칙으로 다시 이동할 때 이 상태를 다시 연결할 수 있습니다.

`RouteReuseStrategy` 클래스는 라우팅 규칙 컴포넌트의 라이프사이클을 제어하는 다음 메서드를 제공합니다:

| 메서드                                                                         | 설명                                                                             |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| [`shouldDetach`](api/router/RouteReuseStrategy#shouldDetach)                   | 라우팅 규칙을 떠날 때 이후 재사용을 위해 저장할지 결정합니다.                    |
| [`store`](api/router/RouteReuseStrategy#store)                                 | `shouldDetach`가 true를 반환하면 분리된 라우팅 규칙 핸들을 저장합니다.           |
| [`shouldAttach`](api/router/RouteReuseStrategy#shouldAttach)                   | 라우팅 규칙으로 이동할 때 저장된 라우팅 규칙을 다시 연결할지 결정합니다.         |
| [`retrieve`](api/router/RouteReuseStrategy#retrieve)                           | 다시 연결할 수 있도록 이전에 저장한 라우팅 규칙 핸들을 반환합니다.               |
| [`shouldReuseRoute`](api/router/RouteReuseStrategy#shouldReuseRoute)           | 내비게이션 중 현재 라우팅 규칙 인스턴스를 종료하지 않고 재사용할지 결정합니다.   |
| [`shouldDestroyInjector`](api/router/RouteReuseStrategy#shouldDestroyInjector) | 분리된 라우팅 규칙이 더 이상 저장되지 않을 때 해당 인젝터를 종료할지 결정합니다. |

다음 예제는 라우팅 규칙 메타데이터에 따라 컴포넌트 상태를 선택적으로 유지하는 커스텀 라우팅 규칙 재사용 전략입니다:

```ts
import {
  RouteReuseStrategy,
  Route,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers = new Map<Route | null, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // 이후 재사용을 위해 라우팅 규칙을 저장할지 결정합니다.
    return route.data['reuse'] === true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    // shouldDetach가 true를 반환하면 분리된 라우팅 규칙 핸들을 저장합니다.
    if (handle && route.data['reuse'] === true) {
      const key = this.getRouteKey(route);
      this.handlers.set(key, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // 저장된 라우팅 규칙을 다시 연결할지 확인합니다.
    const key = this.getRouteKey(route);
    return route.data['reuse'] === true && this.handlers.has(key);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // 다시 연결할 수 있도록 저장된 라우팅 규칙 핸들을 반환합니다.
    const key = this.getRouteKey(route);
    return route.data['reuse'] === true ? (this.handlers.get(key) ?? null) : null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // 현재 라우팅 규칙 인스턴스를 재사용할지 결정합니다.
    return future.routeConfig === curr.routeConfig;
  }

  private getRouteKey(route: ActivatedRouteSnapshot): Route | null {
    return route.routeConfig;
  }
}
```

<!--
### Manually destroying detached route handles
-->

<a id="manually-destroying-detached-route-handles"></a>

### 분리된 라우팅 규칙 핸들을 수동으로 종료하기

<!--
When implementing a custom `RouteReuseStrategy`, you may need to manually destroy a `DetachedRouteHandle` if you decide to discard it without reattaching it. For example, if your strategy has a cache size limit or expires handles after a certain time, you must ensure the component and its state are properly destroyed to avoid memory leaks.

Since `DetachedRouteHandle` is an opaque type, you cannot call a destroy method directly on it. Instead, use the `destroyDetachedRouteHandle` function provided by the Router.

```ts
import {destroyDetachedRouteHandle} from '@angular/router';

// ... inside your strategy
if (this.handles.size > MAX_CACHE_SIZE) {
  const handle = this.handles.get(oldestKey);
  if (handle) {
    destroyDetachedRouteHandle(handle);
    this.handles.delete(oldestKey);
  }
}
```

NOTE: Avoid using the route path as the key when `canMatch` guards are involved, as it may lead to duplicate entries.
-->

커스텀 `RouteReuseStrategy`를 구현할 때 `DetachedRouteHandle`을 다시 연결하지 않고 버리기로 했다면 수동으로 종료해야 할 수 있습니다.
예를 들어 캐시 크기를 제한하거나 일정 시간이 지난 핸들을 만료시키는 전략이라면, 메모리 누수를 방지하기 위해 컴포넌트와 상태를 적절하게 정리해야 합니다.

`DetachedRouteHandle`은 내부 구조가 공개되지 않는 불투명 타입이므로 종료 메서드를 직접 실행할 수 없습니다.
대신 라우터가 제공하는 `destroyDetachedRouteHandle` 함수를 사용합니다.

```ts
import {destroyDetachedRouteHandle} from '@angular/router';

// ... 전략 내부
if (this.handles.size > MAX_CACHE_SIZE) {
  const handle = this.handles.get(oldestKey);
  if (handle) {
    destroyDetachedRouteHandle(handle);
    this.handles.delete(oldestKey);
  }
}
```

참고: `canMatch` 가드를 사용하는 경우에는 중복 항목이 생길 수 있으므로 라우팅 규칙 경로를 키로 사용하지 않는 것이 좋습니다.

<!--
### Automatic cleanup of unused route injectors
-->

<a id="experimental-automatic-cleanup-of-unused-route-injectors"></a>
<a id="automatic-cleanup-of-unused-route-injectors"></a>

### 사용하지 않는 라우팅 규칙 인젝터 자동 정리하기

<!--
By default, Angular does not destroy the injectors of detached routes, even if they are no longer stored by the `RouteReuseStrategy`. This is primarily because this level of memory management is not commonly needed for most applications.

To enable automatic cleanup of unused route injectors, you can use the `withAutoCleanupInjectors` feature in your router configuration. This feature checks which routes are currently stored by the strategy after navigations and destroys the injectors of any detached routes that are not currently stored by the reuse strategy.

```ts
import {provideRouter, withAutoCleanupInjectors} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withAutoCleanupInjectors())],
};
```

If you do not provide a custom `RouteReuseStrategy` or your custom strategy extends `BaseRouteReuseStrategy`, injectors will now be destroyed when the route is inactive.
-->

기본적으로 Angular는 `RouteReuseStrategy`가 더 이상 저장하지 않는 분리된 라우팅 규칙이라도 해당 인젝터를 종료하지 않습니다.
대부분의 애플리케이션에서는 이 수준의 메모리 관리가 필요하지 않기 때문입니다.

사용하지 않는 라우팅 규칙 인젝터를 자동으로 정리하려면 라우터 설정에서 `withAutoCleanupInjectors` 기능을 사용하면 됩니다.
이 기능은 내비게이션 후에 전략이 현재 저장 중인 라우팅 규칙을 확인하고, 재사용 전략에 저장되지 않은 분리된 라우팅 규칙의 인젝터를 종료합니다.

```ts
import {provideRouter, withAutoCleanupInjectors} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withAutoCleanupInjectors())],
};
```

커스텀 `RouteReuseStrategy`를 제공하지 않았거나 커스텀 전략이 `BaseRouteReuseStrategy`를 상속한다면, 이제 라우팅 규칙이 비활성화될 때 인젝터가 종료됩니다.

<!--
#### Cleanup with a custom `RouteReuseStrategy`
-->

<a id="cleanup-with-a-custom-routereusestrategy"></a>

#### 커스텀 `RouteReuseStrategy`에서 정리하기

<!--
If your application uses a custom `RouteReuseStrategy` _and_ the strategy does not extend `BaseRouteReuseStrategy`, you must implement `shouldDestroyInjector` to tell the router which routes should have their injectors destroyed:

```ts
@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  // ... other methods

  shouldDestroyInjector(route: Route): boolean {
    return !route.data['retainInjector'];
  }
}
```

If your strategy ever stores a `DetachedRouteHandle`, you will also need to tell the Router about these so it does not destroy any injectors needed by that detached handle:

```ts
@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private readonly handles = new Map<Route, DetachedRouteHandle>();

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null) {
    this.handles.set(route.routeConfig!, handle);
  }

  retrieveStoredRouteHandles(): DetachedRouteHandle[] {
    return Array.from(this.handles.values());
  }

  // ... other methods
}
```
-->

커스텀 `RouteReuseStrategy`를 사용하면서 해당 전략이 `BaseRouteReuseStrategy`를 상속하지 않는다면, `shouldDestroyInjector`를 구현해서 어떤 라우팅 규칙의 인젝터를 종료해야 하는지 알려줘야 합니다:

```ts
@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  // ... 다른 메서드

  shouldDestroyInjector(route: Route): boolean {
    return !route.data['retainInjector'];
  }
}
```

전략에서 `DetachedRouteHandle`을 저장한다면, 분리된 핸들에 필요한 인젝터를 종료하지 않도록 저장한 핸들을 라우터에 알려줘야 합니다:

```ts
@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private readonly handles = new Map<Route, DetachedRouteHandle>();

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null) {
    this.handles.set(route.routeConfig!, handle);
  }

  retrieveStoredRouteHandles(): DetachedRouteHandle[] {
    return Array.from(this.handles.values());
  }

  // ... 다른 메서드
}
```

<!--
### Configuring a route to use a custom route reuse strategy
-->

<a id="configuring-a-route-to-use-a-custom-route-reuse-strategy"></a>

### 라우팅 규칙에 커스텀 재사용 전략 적용하기

<!--
Routes can opt into reuse behavior through route configuration metadata. This approach keeps the reuse logic separate from component code, making it easy to adjust behavior without modifying components:

```ts
export const routes: Routes = [
  {
    path: 'products',
    component: ProductList,
    data: {reuse: true}, // Component state persists across navigations
  },
  {
    path: 'products/:id',
    component: ProductDetail,
    // No reuse flag - component recreates on each navigation
  },
  {
    path: 'search',
    component: Search,
    data: {reuse: true}, // Preserves search results and filter state
  },
];
```

You can also configure a custom route reuse strategy at the application level through Angular's dependency injection system. In this case, Angular creates a single instance of the strategy that manages all route reuse decisions throughout the application:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy},
  ],
};
```
-->

라우팅 규칙 설정의 메타데이터로 재사용 동작을 선택할 수 있습니다.
이 방식은 재사용 로직을 컴포넌트 코드와 분리하므로, 컴포넌트를 수정하지 않고 동작을 쉽게 조정할 수 있습니다:

```ts
export const routes: Routes = [
  {
    path: 'products',
    component: ProductList,
    data: {reuse: true}, // 내비게이션 사이에 컴포넌트 상태를 유지합니다.
  },
  {
    path: 'products/:id',
    component: ProductDetail,
    // 재사용 플래그가 없으므로 내비게이션마다 컴포넌트를 다시 생성합니다.
  },
  {
    path: 'search',
    component: Search,
    data: {reuse: true}, // 검색 결과와 필터 상태를 유지합니다.
  },
];
```

Angular의 의존성 주입 시스템으로 애플리케이션 수준에서 커스텀 라우팅 규칙 재사용 전략을 설정할 수도 있습니다.
이 경우 Angular는 전략 인스턴스를 하나 생성하고, 이 인스턴스가 애플리케이션 전체에서 라우팅 규칙 재사용 여부를 결정합니다:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy},
  ],
};
```

<!--
## Preloading strategy
-->

<a id="preloading-strategy"></a>

## 미리 로드 전략

<!--
Preloading strategies determine when Angular loads lazy-loaded route modules in the background. While lazy loading improves initial load time by deferring module downloads, users still experience a delay when first navigating to a lazy route. Preloading strategies eliminate this delay by loading modules before users request them.
-->

미리 로드 전략은 Angular가 지연 로드 대상인 라우팅 규칙 모듈을 언제 백그라운드에서 불러올지 결정합니다.
지연 로드는 모듈 다운로드를 미뤄서 초기 로드 시간을 줄이지만, 사용자가 해당 라우팅 규칙으로 처음 이동할 때는 여전히 지연이 발생합니다.
미리 로드 전략은 사용자가 요청하기 전에 모듈을 불러와 이 지연을 없앱니다.

<!--
### Built-in preloading strategies
-->

<a id="built-in-preloading-strategies"></a>

### 내장 미리 로드 전략

<!--
Angular provides two preloading strategies out of the box:

| Strategy                                            | Description                                                                                                      |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [`NoPreloading`](api/router/NoPreloading)           | The default strategy that disables all preloading. In other words, modules only load when users navigate to them |
| [`PreloadAllModules`](api/router/PreloadAllModules) | Loads all lazy-loaded modules immediately after the initial navigation                                           |

The `PreloadAllModules` strategy can be configured as follows:

```ts
import {ApplicationConfig} from '@angular/core';
import {provideRouter, withPreloading, PreloadAllModules} from '@angular/router';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withPreloading(PreloadAllModules))],
};
```

The `PreloadAllModules` strategy works well for small to medium applications where downloading all modules doesn't significantly impact performance. However, larger applications with many feature modules might benefit from more selective preloading.
-->

Angular는 두 가지 미리 로드 전략을 기본으로 제공합니다:

| 전략                                                | 설명                                                                                                        |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`NoPreloading`](api/router/NoPreloading)           | 모든 미리 로드를 비활성화하는 기본 전략입니다. 사용자가 해당 라우팅 규칙으로 이동할 때만 모듈을 로드합니다. |
| [`PreloadAllModules`](api/router/PreloadAllModules) | 최초 내비게이션 직후 모든 지연 로드 모듈을 불러옵니다.                                                      |

`PreloadAllModules` 전략은 다음과 같이 설정할 수 있습니다:

```ts
import {ApplicationConfig} from '@angular/core';
import {provideRouter, withPreloading, PreloadAllModules} from '@angular/router';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withPreloading(PreloadAllModules))],
};
```

`PreloadAllModules` 전략은 모든 모듈을 다운로드해도 성능에 큰 영향을 주지 않는 중소 규모 애플리케이션에 적합합니다.
기능 모듈이 많은 대규모 애플리케이션에서는 더 선택적인 미리 로드 방식이 유리할 수 있습니다.

<!--
### Creating a custom preloading strategy
-->

<a id="creating-a-custom-preloading-strategy"></a>

### 커스텀 미리 로드 전략 만들기

<!--
Custom preloading strategies implement the `PreloadingStrategy` interface, which requires a single `preload` method. This method receives the route configuration and a function that triggers the actual module load. The strategy returns an Observable that emits when preloading completes or an empty Observable to skip preloading:

```ts
import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Only preload routes marked with data: { preload: true }
    if (route.data?.['preload']) {
      return load();
    }
    return of(null);
  }
}
```

This selective strategy checks route metadata to determine preloading behavior. Routes can opt into preloading through their configuration:

```ts
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes'),
    data: {preload: true}, // Preload immediately after initial navigation
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.routes'),
    data: {preload: false}, // Only load when user navigates to reports
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
    // No preload flag - won't be preloaded
  },
];
```
-->

커스텀 미리 로드 전략은 `preload` 메서드 하나가 필요한 `PreloadingStrategy` 인터페이스를 구현합니다.
이 메서드는 라우팅 규칙 설정과 실제 모듈 로드를 실행하는 함수를 인자로 받습니다.
미리 로드가 완료될 때 값을 전달하는 Observable을 반환하거나, 미리 로드를 생략하려면 빈 Observable을 반환합니다:

```ts
import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of, timer} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // data: { preload: true }가 지정된 라우팅 규칙만 미리 로드합니다.
    if (route.data?.['preload']) {
      return load();
    }
    return of(null);
  }
}
```

이 선택적 전략은 라우팅 규칙 메타데이터를 확인해서 미리 로드할지 결정합니다.
라우팅 규칙 설정에서 미리 로드를 사용하도록 지정할 수 있습니다:

```ts
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes'),
    data: {preload: true}, // 최초 내비게이션 직후 미리 로드합니다.
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.routes'),
    data: {preload: false}, // 사용자가 reports로 이동할 때만 로드합니다.
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
    // 미리 로드 플래그가 없으므로 미리 로드하지 않습니다.
  },
];
```

<!--
### Performance considerations for preloading
-->

<a id="performance-considerations-for-preloading"></a>

### 미리 로드의 성능 고려사항

<!--
Preloading impacts both network usage and memory consumption. Each preloaded module consumes bandwidth and increases the application's memory footprint. Mobile users on metered connections might prefer minimal preloading, while desktop users on fast networks can handle aggressive preloading strategies.

The timing of preloading also matters. Immediate preloading after initial load might compete with other critical resources like images or API calls. Strategies should consider the application's post-load behavior and coordinate with other background tasks to avoid performance degradation.

Browser resource limits also affect preloading behavior. Browsers limit concurrent HTTP connections, so aggressive preloading might queue behind other requests. Service workers can help by providing fine-grained control over caching and network requests, complementing the preloading strategy.
-->

미리 로드는 네트워크 사용량과 메모리 소비량에 모두 영향을 미칩니다.
미리 불러온 각 모듈은 대역폭을 사용하고 애플리케이션의 메모리 점유량을 늘립니다.
데이터 사용량에 따라 요금이 부과되는 연결을 사용하는 모바일 사용자에게는 최소한의 미리 로드가 적합할 수 있지만, 빠른 네트워크를 사용하는 데스크톱 사용자에게는 적극적인 미리 로드 전략을 적용할 수 있습니다.

미리 로드하는 시점도 중요합니다.
초기 로드 직후 미리 로드를 시작하면 이미지나 API 호출 같은 중요한 리소스와 경쟁할 수 있습니다.
전략을 설계할 때는 로드 후 애플리케이션 동작을 고려하고 다른 백그라운드 작업과 조율해서 성능 저하를 피해야 합니다.

브라우저의 리소스 제한도 미리 로드에 영향을 미칩니다.
브라우저는 동시 HTTP 연결 수를 제한하므로, 미리 로드를 과도하게 실행하면 다른 요청 뒤에서 대기할 수 있습니다.
서비스 워커로 캐싱과 네트워크 요청을 세밀하게 제어하면 미리 로드 전략을 보완할 수 있습니다.

<!--
## URL handling strategy
-->

<a id="url-handling-strategy"></a>

## URL 처리 전략

<!--
URL handling strategies determine which URLs the Angular router processes versus which ones it ignores. By default, Angular attempts to handle all navigation events within the application, but real-world applications often need to coexist with other systems, handle external links, or integrate with legacy applications that manage their own routes.

The `UrlHandlingStrategy` class gives you control over this boundary between Angular-managed routes and external URLs. This becomes essential when migrating applications to Angular incrementally or when Angular applications need to share URL space with other frameworks.
-->

URL 처리 전략은 Angular 라우터가 처리할 URL과 무시할 URL을 결정합니다.
기본적으로 Angular는 애플리케이션 내부의 모든 내비게이션 이벤트를 처리하려고 합니다.
하지만 실제 애플리케이션은 다른 시스템과 공존하거나, 외부 링크를 처리하거나, 자체 라우팅 규칙을 관리하는 기존 애플리케이션과 연동해야 할 때가 많습니다.

`UrlHandlingStrategy` 클래스를 사용하면 Angular가 관리하는 라우팅 규칙과 외부 URL 사이의 경계를 제어할 수 있습니다.
애플리케이션을 Angular로 점진적으로 전환하거나 다른 프레임워크와 URL 영역을 공유해야 할 때 필수적입니다.

<!--
### Implementing a custom URL handling strategy
-->

<a id="implementing-a-custom-url-handling-strategy"></a>

### 커스텀 URL 처리 전략 구현하기

<!--
Custom URL handling strategies extend the `UrlHandlingStrategy` class and implement three methods. The `shouldProcessUrl` method determines whether Angular should handle a given URL, `extract` returns the portion of the URL that Angular should process, and `merge` combines the URL fragment with the rest of the URL:

```ts
import {Injectable} from '@angular/core';
import {UrlHandlingStrategy, UrlTree} from '@angular/router';

@Injectable()
export class CustomUrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    // Only handle URLs that start with /app or /admin
    return url.toString().startsWith('/app') || url.toString().startsWith('/admin');
  }

  extract(url: UrlTree): UrlTree {
    // Return the URL unchanged if we should process it
    return url;
  }

  merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
    // Combine the URL fragment with the rest of the URL
    return newUrlPart;
  }
}
```

This strategy creates clear boundaries in the URL space. Angular handles `/app` and `/admin` paths while ignoring everything else. This pattern works well when migrating legacy applications where Angular controls specific sections while the legacy system maintains others.
-->

커스텀 URL 처리 전략은 `UrlHandlingStrategy` 클래스를 상속하고 세 가지 메서드를 구현합니다.
`shouldProcessUrl`은 Angular가 해당 URL을 처리할지 결정하고, `extract`는 Angular가 처리할 URL 부분을 반환하며, `merge`는 이 URL 부분을 나머지 URL과 합칩니다:

```ts
import {Injectable} from '@angular/core';
import {UrlHandlingStrategy, UrlTree} from '@angular/router';

@Injectable()
export class CustomUrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    // /app 또는 /admin으로 시작하는 URL만 처리합니다.
    return url.toString().startsWith('/app') || url.toString().startsWith('/admin');
  }

  extract(url: UrlTree): UrlTree {
    // 처리할 URL을 변경 없이 반환합니다.
    return url;
  }

  merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
    // URL 부분을 나머지 URL과 합칩니다.
    return newUrlPart;
  }
}
```

이 전략은 URL 영역을 명확하게 구분합니다.
Angular는 `/app`과 `/admin` 경로를 처리하고 나머지는 무시합니다.
이 패턴은 Angular가 특정 영역을 맡고 기존 시스템이 나머지를 유지하는 점진적 전환에 적합합니다.

<!--
### Configuring a custom URL handling strategy
-->

<a id="configuring-a-custom-url-handling-strategy"></a>

### 커스텀 URL 처리 전략 설정하기

<!--
You can register a custom strategy through Angular's dependency injection system:

```ts
import {ApplicationConfig} from '@angular/core';
import {provideRouter, UrlHandlingStrategy} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: UrlHandlingStrategy, useClass: CustomUrlHandlingStrategy},
  ],
};
```
-->

Angular의 의존성 주입 시스템으로 커스텀 전략을 등록할 수 있습니다:

```ts
import {ApplicationConfig} from '@angular/core';
import {provideRouter, UrlHandlingStrategy} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: UrlHandlingStrategy, useClass: CustomUrlHandlingStrategy},
  ],
};
```

<!--
## Custom route matchers
-->

<a id="custom-route-matchers"></a>

## 커스텀 라우팅 규칙 매처

<!--
By default, Angular's router iterates through routes in the order they're defined, attempting to match the URL path against each route's path pattern. It supports static segments, parameterized segments (`:id`), and wildcards (`**`). The first route that matches wins, and the router stops searching.

When applications require more sophisticated matching logic based on runtime conditions, complex URL patterns, or other custom rules, custom matchers provide this flexibility without compromising the simplicity of standard routes.

The router evaluates custom matchers during the route matching phase, before path matching occurs. When a matcher returns a successful match, it can also extract parameters from the URL, making them available to the activated component just like standard route parameters.
-->

기본적으로 Angular 라우터는 정의된 순서대로 라우팅 규칙을 살펴보면서 URL 경로를 각 라우팅 규칙의 경로 패턴과 비교합니다.
정적 세그먼트, 파라미터가 있는 세그먼트(`:id`), 와일드카드(`**`)를 지원합니다.
처음 일치하는 라우팅 규칙을 선택하면 탐색을 멈춥니다.

런타임 조건, 복잡한 URL 패턴, 다른 커스텀 규칙을 바탕으로 더 정교한 매칭 로직이 필요하다면 커스텀 매처를 사용할 수 있습니다.
기본 라우팅 규칙의 단순함을 유지하면서 이런 유연성을 더할 수 있습니다.

라우터는 라우팅 규칙 매칭 단계에서 경로를 비교하기 전에 커스텀 매처를 실행합니다.
매처가 일치 결과를 반환할 때 URL에서 파라미터도 추출할 수 있으며, 활성화된 컴포넌트는 일반 라우팅 규칙 파라미터처럼 이 값을 사용할 수 있습니다.

<!--
### Creating a custom matcher
-->

<a id="creating-a-custom-matcher"></a>

### 커스텀 매처 만들기

<!--
A custom matcher is a function that receives URL segments and returns either a match result with consumed segments and parameters, or null to indicate no match. The matcher function runs before Angular evaluates the route's path property:

```ts
import {Route, UrlSegment, UrlSegmentGroup, UrlMatchResult} from '@angular/router';

export function customMatcher(
  segments: UrlSegment[],
  group: UrlSegmentGroup,
  route: Route,
): UrlMatchResult | null {
  // Matching logic here
  if (matchSuccessful) {
    return {
      consumed: segments,
      posParams: {
        paramName: new UrlSegment('paramValue', {}),
      },
    };
  }
  return null;
}
```
-->

커스텀 매처는 URL 세그먼트를 받아 처리한 세그먼트와 파라미터를 담은 매칭 결과를 반환하거나, 일치하지 않으면 null을 반환하는 함수입니다.
Angular가 라우팅 규칙의 path 프로퍼티를 검사하기 전에 매처 함수가 실행됩니다:

```ts
import {Route, UrlSegment, UrlSegmentGroup, UrlMatchResult} from '@angular/router';

export function customMatcher(
  segments: UrlSegment[],
  group: UrlSegmentGroup,
  route: Route,
): UrlMatchResult | null {
  // 이곳에 매칭 로직을 작성합니다.
  if (matchSuccessful) {
    return {
      consumed: segments,
      posParams: {
        paramName: new UrlSegment('paramValue', {}),
      },
    };
  }
  return null;
}
```

<!--
### Implementing version-based routing
-->

<a id="implementing-version-based-routing"></a>

### 버전 기반 라우팅 구현하기

<!--
Consider an API documentation site that needs to route based on version numbers in the URL. Different versions might have different component structures or feature sets:

```ts
import {Routes, UrlSegment, UrlMatchResult} from '@angular/router';

export function versionMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  // Match patterns like /v1/docs, /v2.1/docs, /v3.0.1/docs
  if (segments.length >= 2 && segments[0].path.match(/^v\d+(\.\d+)*$/)) {
    return {
      consumed: segments.slice(0, 2), // Consume version and 'docs'
      posParams: {
        version: segments[0], // Make version available as a parameter
        section: segments[1], // Make section available too
      },
    };
  }
  return null;
}

// Route configuration
export const routes: Routes = [
  {
    matcher: versionMatcher,
    component: Documentation,
  },
  {
    path: 'latest/docs',
    redirectTo: 'v3/docs',
  },
];
```

The component receives the extracted parameters through route inputs:

```angular-ts
import {Component, input, inject, resource} from '@angular/core';

@Component({
  selector: 'app-documentation',
  template: `
    @if (documentation.isLoading()) {
      <div>Loading documentation...</div>
    } @else if (documentation.error()) {
      <div>Error loading documentation</div>
    } @else if (documentation.value(); as docs) {
      <article>{{ docs.content }}</article>
    }
  `,
})
export class Documentation {
  // Route parameters are automatically bound to signal inputs
  version = input.required<string>(); // Receives the version parameter
  section = input.required<string>(); // Receives the section parameter

  private docsService = inject(DocumentationService);

  // Resource automatically loads documentation when version or section changes
  documentation = resource({
    params: () => {
      if (!this.version() || !this.section()) return;

      return {
        version: this.version(),
        section: this.section(),
      };
    },
    loader: ({params}) => {
      return this.docsService.loadDocumentation(params.version, params.section);
    },
  });
}
```
-->

URL의 버전 번호에 따라 라우팅해야 하는 API 문서 사이트를 생각해 봅시다.
버전마다 컴포넌트 구조나 제공하는 기능이 다를 수 있습니다:

```ts
import {Routes, UrlSegment, UrlMatchResult} from '@angular/router';

export function versionMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  // /v1/docs, /v2.1/docs, /v3.0.1/docs 같은 패턴을 매칭합니다.
  if (segments.length >= 2 && segments[0].path.match(/^v\d+(\.\d+)*$/)) {
    return {
      consumed: segments.slice(0, 2), // 버전과 'docs' 세그먼트를 처리합니다.
      posParams: {
        version: segments[0], // 버전을 파라미터로 제공합니다.
        section: segments[1], // 섹션도 파라미터로 제공합니다.
      },
    };
  }
  return null;
}

// 라우팅 규칙 설정
export const routes: Routes = [
  {
    matcher: versionMatcher,
    component: Documentation,
  },
  {
    path: 'latest/docs',
    redirectTo: 'v3/docs',
  },
];
```

컴포넌트는 라우팅 규칙 입력을 통해 추출한 파라미터를 전달받습니다:

```angular-ts
import {Component, input, inject, resource} from '@angular/core';

@Component({
  selector: 'app-documentation',
  template: `
    @if (documentation.isLoading()) {
      <div>Loading documentation...</div>
    } @else if (documentation.error()) {
      <div>Error loading documentation</div>
    } @else if (documentation.value(); as docs) {
      <article>{{ docs.content }}</article>
    }
  `,
})
export class Documentation {
  // 라우팅 규칙 파라미터는 입력 시그널에 자동으로 바인딩됩니다.
  version = input.required<string>(); // 버전 파라미터를 받습니다.
  section = input.required<string>(); // 섹션 파라미터를 받습니다.

  private docsService = inject(DocumentationService);

  // 버전이나 섹션이 바뀌면 리소스가 문서를 자동으로 불러옵니다.
  documentation = resource({
    params: () => {
      if (!this.version() || !this.section()) return;

      return {
        version: this.version(),
        section: this.section(),
      };
    },
    loader: ({params}) => {
      return this.docsService.loadDocumentation(params.version, params.section);
    },
  });
}
```

<!--
### Locale-aware routing
-->

<a id="locale-aware-routing"></a>

### 로케일에 따른 라우팅

<!--
International applications often encode locale information in URLs. A custom matcher can extract locale codes and route to appropriate components while making the locale available as a parameter:

```ts
// Supported locales
const locales = ['en', 'es', 'fr', 'de', 'ja', 'zh'];

export function localeMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length > 0) {
    const potentialLocale = segments[0].path;

    if (locales.includes(potentialLocale)) {
      // This is a locale prefix, consume it and continue matching
      return {
        consumed: [segments[0]],
        posParams: {
          locale: segments[0],
        },
      };
    } else {
      // No locale prefix, use default locale
      return {
        consumed: [], // Don't consume any segments
        posParams: {
          locale: new UrlSegment('en', {}),
        },
      };
    }
  }

  return null;
}
```
-->

여러 국가를 지원하는 애플리케이션은 URL에 로케일 정보를 포함하는 경우가 많습니다.
커스텀 매처로 로케일 코드를 추출해서 알맞은 컴포넌트로 연결하고, 로케일을 파라미터로 제공할 수 있습니다:

```ts
// 지원하는 로케일
const locales = ['en', 'es', 'fr', 'de', 'ja', 'zh'];

export function localeMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length > 0) {
    const potentialLocale = segments[0].path;

    if (locales.includes(potentialLocale)) {
      // 로케일 접두사를 처리하고 계속 매칭합니다.
      return {
        consumed: [segments[0]],
        posParams: {
          locale: segments[0],
        },
      };
    } else {
      // 로케일 접두사가 없으면 기본 로케일을 사용합니다.
      return {
        consumed: [], // 어떤 세그먼트도 처리하지 않습니다.
        posParams: {
          locale: new UrlSegment('en', {}),
        },
      };
    }
  }

  return null;
}
```

<!--
### Complex business logic matching
-->

<a id="complex-business-logic-matching"></a>

### 복잡한 비즈니스 로직으로 매칭하기

<!--
Custom matchers excel at implementing business rules that would be awkward to express in path patterns. Consider an e-commerce site where product URLs follow different patterns based on product type:

```ts
export function productMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length === 0) return null;

  const firstSegment = segments[0].path;

  // Books: /isbn-1234567890
  if (firstSegment.startsWith('isbn-')) {
    return {
      consumed: [segments[0]],
      posParams: {
        productType: new UrlSegment('book', {}),
        identifier: new UrlSegment(firstSegment.substring(5), {}),
      },
    };
  }

  // Electronics: /sku/ABC123
  if (firstSegment === 'sku' && segments.length > 1) {
    return {
      consumed: segments.slice(0, 2),
      posParams: {
        productType: new UrlSegment('electronics', {}),
        identifier: segments[1],
      },
    };
  }

  // Clothing: /style/BRAND/ITEM
  if (firstSegment === 'style' && segments.length > 2) {
    return {
      consumed: segments.slice(0, 3),
      posParams: {
        productType: new UrlSegment('clothing', {}),
        brand: segments[1],
        identifier: segments[2],
      },
    };
  }

  return null;
}
```
-->

커스텀 매처는 경로 패턴으로 표현하기 어려운 비즈니스 규칙을 구현하는 데 유용합니다.
상품 종류에 따라 상품 URL 패턴이 달라지는 전자상거래 사이트를 생각해 봅시다:

```ts
export function productMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length === 0) return null;

  const firstSegment = segments[0].path;

  // 도서: /isbn-1234567890
  if (firstSegment.startsWith('isbn-')) {
    return {
      consumed: [segments[0]],
      posParams: {
        productType: new UrlSegment('book', {}),
        identifier: new UrlSegment(firstSegment.substring(5), {}),
      },
    };
  }

  // 전자제품: /sku/ABC123
  if (firstSegment === 'sku' && segments.length > 1) {
    return {
      consumed: segments.slice(0, 2),
      posParams: {
        productType: new UrlSegment('electronics', {}),
        identifier: segments[1],
      },
    };
  }

  // 의류: /style/BRAND/ITEM
  if (firstSegment === 'style' && segments.length > 2) {
    return {
      consumed: segments.slice(0, 3),
      posParams: {
        productType: new UrlSegment('clothing', {}),
        brand: segments[1],
        identifier: segments[2],
      },
    };
  }

  return null;
}
```

<!--
### Performance considerations for custom matchers
-->

<a id="performance-considerations-for-custom-matchers"></a>

### 커스텀 매처의 성능 고려사항

<!--
Custom matchers run for every navigation attempt until a match is found. As a result, complex matching logic can impact navigation performance, especially in applications with many routes. Keep matchers focused and efficient:

- Return early when a match is impossible
- Avoid expensive operations like API calls or complex regular expressions
- Consider caching results for repeated URL patterns

While custom matchers solve complex routing requirements elegantly, overuse can make route configuration harder to understand and maintain. Reserve custom matchers for scenarios where standard path matching genuinely falls short.
-->

커스텀 매처는 내비게이션을 시도할 때마다 일치하는 결과를 찾을 때까지 실행됩니다.
따라서 라우팅 규칙이 많은 애플리케이션에서는 특히 복잡한 매칭 로직이 내비게이션 성능에 영향을 줄 수 있습니다.
매처의 역할을 명확히 하고 효율적으로 작성하세요:

- 일치할 수 없는 경우에는 즉시 반환합니다.
- API 호출이나 복잡한 정규 표현식처럼 비용이 큰 작업은 피합니다.
- 반복되는 URL 패턴의 결과를 캐싱하는 것을 고려합니다.

커스텀 매처로 복잡한 라우팅 요구사항을 간결하게 해결할 수 있지만, 지나치게 사용하면 라우팅 규칙 설정을 이해하고 유지보수하기 어려워집니다.
기본 경로 매칭으로 해결하기 어려운 경우에만 사용하세요.
