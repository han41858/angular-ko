<!--
# Data fetching with resources

The Angular Router integrates with Angular signals through the `resources` route configuration. This allows you to fetch data reactively using `Resource` APIs.

## Why use route resources?

Route resources offer several advantages over traditional [data resolvers](/guide/routing/data-resolvers):

- **Parallel execution**: Route resources across all matched routes load concurrently instead of one route at a time.
- **Non-blocking data loading**: Use `nonBlocking()` to activate the route immediately and render loading skeletons or UI states while data loads in the background.
- **Reload without renavigation**: Call `.reload()` on individual resources or update signal parameters to refresh data without rerunning guards or rematching routes.
- **Reactive data fetching**: Resources integrate directly with Angular signals, automatically re-evaluating when signal dependencies change and exposing reactive status signals like `isLoading()` and `error()`.

## Enabling route resources

To enable route resources, provide `withRouterResources()` to your router configuration:

```ts
import {provideRouter, withComponentInputBinding, withRouterResources} from '@angular/router';

bootstrapApplication(App, {
  providers: [provideRouter(routes, withComponentInputBinding(), withRouterResources())],
});
```

TIP: Enable `withComponentInputBinding()` so the router can bind resolved resources directly to component inputs.

## Defining route resources

You define resources on a route with the `resources` function. The function runs in an injection context, so you can use `inject()` to access services, API clients, or stores directly inside the route definition.

```angular-ts
import {Component, inject, input, resource} from '@angular/core';
import {Routes} from '@angular/router';
import {UserService} from './user.service';

const routes: Routes = [
  {
    path: 'user/:id',
    component: UserProfile,
    resources: (ctx) => {
      const userService = inject(UserService);
      return {
        user: resource({
          params: () => ctx.params()['id'],
          loader: ({params: id}) => userService.getUser(id),
        }),
      };
    },
  },
];

@Component({
  template: `<p>User: {{ user().name }}</p>`,
})
export class UserProfile {
  // The router binds only the value for blocking resources.
  user = input.required<User>();
}
```

### The `ResourceContext` object

The `resources` function receives a `ResourceContext` that provides access to reactive route signals: `params`, `queryParams`, `fragment`, and `data`.

### Supported resource implementations

The `resources` function can return any Angular `Resource` implementation, such as `resource()`, `rxResource()`, or a custom resource.

```ts
import {Routes} from '@angular/router';
import {rxResource} from '@angular/core/rxjs-interop';

const routes: Routes = [
  {
    path: 'user/:id',
    component: UserProfile,
    resources: (ctx) => ({
      user: rxResource({
        params: () => ctx.params()['id'],
        stream: ({params: id}) => fetchUserObservable(id),
      }),
    }),
  },
];
```

NOTE: `rxResource` uses the `stream` property instead of `loader` to accept a function that returns an Observable.

The `resources` function can also be `async` and return a `Promise` if you need to perform asynchronous setup or dynamic imports before configuring resources:

```ts
resources: async (ctx) => {
  const injector = inject(Injector);
  const {fetchUserData} = await import('./user-api');
  return {
    user: resource({
      params: () => ctx.params()['id'],
      loader: ({params: id}) => fetchUserData(id),
      injector,
    }),
  };
},
```

## Fine-grained change tracking with signals

A resource tracks the signals that its `params` function reads. Read the exact value you need so that the resource refetches only when that value changes:

```ts
resources: (ctx) => ({
  products: resource({
    // Tracks only the 'category' query parameter
    params: () => ctx.queryParams()['category'],
    loader: ({params: category}) => fetchProducts(category),
  }),
}),
```

A navigation that changes an unrelated query parameter, such as `?sort=desc` or `?page=2`, leaves `category` unchanged, so the resource does not refetch.

TIP: Read specific properties, such as `ctx.params()['id']`, instead of returning an entire parameters object, such as `ctx.params()`. The router creates a new object on every navigation, so returning the whole object refetches the resource even when the individual values are unchanged.

## Parallel execution

Data resolvers execute sequentially from parent route to child route. If a parent route resolver takes 200ms and a child route resolver takes 300ms, the navigation is blocked for 500ms.

Route resources across the matched route hierarchy run concurrently, so the same navigation completes in 300ms, the time of the slowest resource.

## Blocking and non-blocking resources

By default, every resource returned from `resources` is blocking: the router waits until the data is fully loaded before it activates the route and the component.

For a blocking resource, the router binds the resolved value to the component input, so the input type is `T` instead of `Resource<T>`. The component never observes a `loading` state because the router blocks navigation until the resource loads, and it never observes an `error` state because the router cancels the navigation when the resource errors.

To handle loading states in the UI instead, wrap the resource in `nonBlocking()`. The router activates the component immediately and binds the full `Resource<T>` object to the component input, which gives you access to `isLoading()`, `error()`, and the other resource signals.

```angular-ts
import {Component, input, Resource, resource} from '@angular/core';
import {Routes, nonBlocking} from '@angular/router';

const routes: Routes = [
  {
    path: 'reports',
    component: Reports,
    resources: () => ({
      reportData: nonBlocking(
        resource({
          loader: () => fetchHeavyReportData(),
        }),
      ),
    }),
  },
];

@Component({
  template: `
    @if (reportData().isLoading()) {
      <p>Loading...</p>
    } @else if (reportData().error()) {
      <p>Error loading report.</p>
    } @else if (reportData().hasValue()) {
      <report-view [data]="reportData().value()" />
    }
  `,
})
export class Reports {
  reportData = input.required<Resource<ReportData>>();
}
```

NOTE: If a blocking resource errors, the router cancels the navigation and emits a `NavigationError` event. A resource wrapped in `nonBlocking()` completes the navigation and exposes the failure through its `error()` signal.

### Redirecting from a resource

If a blocking resource needs to redirect the user (for example, if an item is not found), throw a `RedirectCommand` inside the resource loader. The router cancels the current navigation and redirects to the specified URL:

```ts
import {inject, resource} from '@angular/core';
import {RedirectCommand, Router, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'user/:id',
    component: UserProfile,
    resources: (ctx) => {
      const router = inject(Router);

      return {
        user: resource({
          params: () => ctx.params()['id'],
          loader: async ({params: id}) => {
            const user = await fetchUser(id);
            if (!user) {
              throw new RedirectCommand(router.parseUrl('/not-found'));
            }
            return user;
          },
        }),
      };
    },
  },
];
```

## Reloading resources without renavigation

With data resolvers, refetching data requires a route navigation (for example, navigating with `onSameUrlNavigation: 'reload'`), which rematches routes and reruns guards and resolvers.

Route resources support two ways to refresh data in place:

1. **Programmatic reload**: Call `.reload()` on the `Resource` instance.
2. **Reactive reload**: Update a signal that the resource's `params` function reads, such as an application filter or state signal, which reruns the loader.

Because the router binds only the value of a blocking resource to a component input, read the `Resource` instance from `ActivatedRoute` or `ActivatedRouteSnapshot` when you need to call `.reload()` or inspect status signals:

```angular-ts
import {Component, inject, input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  template: `
    <p>User: {{ user().name }}</p>
    <button (click)="refreshUser()">Refresh</button>
  `,
})
export class UserProfile {
  user = input.required<User>();
  private userResource = inject(ActivatedRoute).resources?.['user'];

  refreshUser() {
    // Reloads only this specific resource without renavigating the route
    this.userResource?.reload();
  }
}
```

## Transitional states during pending navigations

While a navigation is pending, the router freezes the resources that it exposes on `ActivatedRoute`, which masks intermediate `loading` and `reloading` states.

If you navigate from `/user/1` to `/user/2` and the router reuses the `UserProfile` component, the component keeps rendering the data from `/user/1` until `/user/2` resolves. The router then unfreezes the resources and the UI transitions directly to the new data with no loading flash.

The router exposes these resources as read-only, even when the `resources` function returns a writable resource such as `resource()`. You can read the resource signals and call `reload()`, but not `set()` or `update()`. A `reload()` call during an active navigation or during rollback recovery returns `false` so that it cannot interrupt the router's transition tracking.

### Rollback recovery on cancellation

If a navigation is cancelled (for example, by a guard), the router reverts the state tree to the previous state. This reversion can cause the resource's signal dependencies, such as route parameters, to revert to their previous values.

Because the parameters changed back, the resource might automatically trigger a new load to fetch data for the old parameters. To prevent flashing a loading state for data that was already visible, the router retains the previous resource snapshot in the UI until the resource has settled in the reverted state.

TIP: Forward the `abortSignal` provided by the resource loader to your asynchronous calls (like `fetch`). When the router rolls back parameters or supersedes navigations, the pending request is cleanly aborted: `loader: ({params: id, abortSignal}) => fetchUser(id, {signal: abortSignal})`.
-->

<a id="data-fetching-with-resources"></a>

# 리소스로 데이터 가져오기

Angular 라우터는 라우팅 규칙의 `resources` 설정을 통해 Angular 시그널과 통합됩니다. `Resource` API로 데이터를 반응형으로 가져올 수 있습니다.

<a id="why-use-route-resources"></a>

## 라우팅 규칙 리소스를 사용하는 이유

라우팅 규칙 리소스는 기존 [데이터 리졸버](/guide/routing/data-resolvers)보다 다음과 같은 장점이 있습니다:

- **병렬 실행**: 매칭된 모든 라우팅 규칙의 리소스를 하나씩 차례로 로드하지 않고 동시에 로드합니다.
- **논블로킹 데이터 로딩**: `nonBlocking()`을 사용하면 라우팅 규칙을 즉시 활성화하고, 백그라운드에서 데이터를 로드하는 동안 스켈레톤 화면이나 로딩 상태를 표시할 수 있습니다.
- **내비게이션 없이 다시 로드**: 개별 리소스의 `.reload()`를 실행하거나 시그널 파라미터를 갱신하면 가드를 다시 실행하거나 라우팅 규칙을 다시 매칭하지 않고도 데이터를 갱신할 수 있습니다.
- **반응형 데이터 요청**: 리소스는 Angular 시그널과 직접 통합됩니다. 의존하는 시그널이 변경되면 자동으로 다시 평가하며, `isLoading()`, `error()` 같은 반응형 상태 시그널을 제공합니다.

<a id="enabling-route-resources"></a>

## 라우팅 규칙 리소스 활성화하기

라우팅 규칙 리소스를 활성화하려면 라우터 설정에 `withRouterResources()`를 추가하세요:

```ts
import {provideRouter, withComponentInputBinding, withRouterResources} from '@angular/router';

bootstrapApplication(App, {
  providers: [provideRouter(routes, withComponentInputBinding(), withRouterResources())],
});
```

TIP: 라우터가 리소스의 결과를 컴포넌트 입력 프로퍼티에 직접 바인딩할 수 있도록 `withComponentInputBinding()`을 활성화하세요.

<a id="defining-route-resources"></a>

## 라우팅 규칙 리소스 정의하기

라우팅 규칙의 `resources` 함수로 리소스를 정의합니다. 이 함수는 주입 컨텍스트에서 실행되므로 라우팅 규칙 정의 안에서 `inject()`로 서비스, API 클라이언트, 스토어에 직접 접근할 수 있습니다.

```angular-ts
import {Component, inject, input, resource} from '@angular/core';
import {Routes} from '@angular/router';
import {UserService} from './user.service';

const routes: Routes = [
  {
    path: 'user/:id',
    component: UserProfile,
    resources: (ctx) => {
      const userService = inject(UserService);
      return {
        user: resource({
          params: () => ctx.params()['id'],
          loader: ({params: id}) => userService.getUser(id),
        }),
      };
    },
  },
];

@Component({
  template: `<p>사용자: {{ user().name }}</p>`,
})
export class UserProfile {
  // 블로킹 리소스는 라우터가 값만 바인딩합니다.
  user = input.required<User>();
}
```

<a id="the-resourcecontext-object"></a>

### `ResourceContext` 객체

`resources` 함수는 `ResourceContext`를 인자로 받습니다. 이 객체로 라우팅 규칙의 반응형 시그널인 `params`, `queryParams`, `fragment`, `data`에 접근할 수 있습니다.

<a id="supported-resource-implementations"></a>

### 지원하는 리소스 구현

`resources` 함수는 `resource()`, `rxResource()`, 커스텀 리소스 등 Angular의 `Resource`를 구현한 객체를 반환할 수 있습니다.

```ts
import {Routes} from '@angular/router';
import {rxResource} from '@angular/core/rxjs-interop';

const routes: Routes = [
  {
    path: 'user/:id',
    component: UserProfile,
    resources: (ctx) => ({
      user: rxResource({
        params: () => ctx.params()['id'],
        stream: ({params: id}) => fetchUserObservable(id),
      }),
    }),
  },
];
```

NOTE: `rxResource`는 `loader` 대신 `stream` 프로퍼티로 옵저버블을 반환하는 함수를 받습니다.

리소스를 설정하기 전에 비동기 초기화나 동적 import가 필요하다면 `resources` 함수를 `async`로 선언하고 `Promise`를 반환할 수도 있습니다:

```ts
resources: async (ctx) => {
  const injector = inject(Injector);
  const {fetchUserData} = await import('./user-api');
  return {
    user: resource({
      params: () => ctx.params()['id'],
      loader: ({params: id}) => fetchUserData(id),
      injector,
    }),
  };
},
```

<a id="fine-grained-change-tracking-with-signals"></a>

## 시그널로 변경을 세밀하게 추적하기

리소스는 `params` 함수가 읽는 시그널을 추적합니다. 필요한 값만 읽으면 해당 값이 바뀔 때만 데이터를 다시 가져옵니다:

```ts
resources: (ctx) => ({
  products: resource({
    // 'category' 쿼리 파라미터만 추적합니다.
    params: () => ctx.queryParams()['category'],
    loader: ({params: category}) => fetchProducts(category),
  }),
}),
```

내비게이션 중 `?sort=desc`나 `?page=2`처럼 관련 없는 쿼리 파라미터가 바뀌어도 `category`가 그대로라면 리소스는 데이터를 다시 가져오지 않습니다.

TIP: `ctx.params()`처럼 파라미터 객체 전체를 반환하지 말고 `ctx.params()['id']`처럼 특정 프로퍼티를 읽으세요. 라우터는 내비게이션마다 새 객체를 만들기 때문에 객체 전체를 반환하면 개별 값이 그대로여도 리소스가 데이터를 다시 가져옵니다.

<a id="parallel-execution"></a>

## 병렬 실행

데이터 리졸버는 상위 라우팅 규칙에서 하위 라우팅 규칙 순서로 실행됩니다. 상위 라우팅 규칙의 리졸버가 200ms, 하위 라우팅 규칙의 리졸버가 300ms 걸리면 내비게이션은 500ms 동안 대기합니다.

매칭된 라우팅 규칙 계층의 리소스는 동시에 실행되므로, 같은 내비게이션을 가장 느린 리소스의 실행 시간인 300ms에 완료할 수 있습니다.

<a id="blocking-and-non-blocking-resources"></a>

## 블로킹 리소스와 논블로킹 리소스

기본적으로 `resources`가 반환하는 모든 리소스는 블로킹 방식입니다. 라우터는 데이터를 모두 로드할 때까지 기다린 후 라우팅 규칙과 컴포넌트를 활성화합니다.

블로킹 리소스는 라우터가 결과 값을 컴포넌트 입력 프로퍼티에 바인딩하므로 입력 타입은 `Resource<T>`가 아닌 `T`입니다. 라우터가 리소스를 로드할 때까지 내비게이션을 대기시키므로 컴포넌트는 `loading` 상태를 관찰하지 않습니다. 리소스에서 오류가 발생하면 라우터가 내비게이션을 취소하므로 `error` 상태도 관찰하지 않습니다.

UI에서 로딩 상태를 직접 처리하려면 리소스를 `nonBlocking()`으로 감싸세요. 라우터가 컴포넌트를 즉시 활성화하고 `Resource<T>` 객체 전체를 입력 프로퍼티에 바인딩하므로 `isLoading()`, `error()` 등 리소스 시그널에 접근할 수 있습니다.

```angular-ts
import {Component, input, Resource, resource} from '@angular/core';
import {Routes, nonBlocking} from '@angular/router';

const routes: Routes = [
  {
    path: 'reports',
    component: Reports,
    resources: () => ({
      reportData: nonBlocking(
        resource({
          loader: () => fetchHeavyReportData(),
        }),
      ),
    }),
  },
];

@Component({
  template: `
    @if (reportData().isLoading()) {
      <p>불러오는 중...</p>
    } @else if (reportData().error()) {
      <p>보고서를 불러오는 중 에러가 발생했습니다.</p>
    } @else if (reportData().hasValue()) {
      <report-view [data]="reportData().value()" />
    }
  `,
})
export class Reports {
  reportData = input.required<Resource<ReportData>>();
}
```

NOTE: 블로킹 리소스에서 오류가 발생하면 라우터는 내비게이션을 취소하고 `NavigationError` 이벤트를 발생시킵니다. `nonBlocking()`으로 감싼 리소스는 내비게이션을 완료하고 `error()` 시그널로 실패를 알립니다.

<a id="redirecting-from-a-resource"></a>

### 리소스에서 리다이렉트하기

항목을 찾지 못한 경우처럼 블로킹 리소스에서 사용자를 리다이렉트해야 한다면 리소스 로더 안에서 `RedirectCommand`를 던지세요. 라우터가 현재 내비게이션을 취소하고 지정한 URL로 리다이렉트합니다:

```ts
import {inject, resource} from '@angular/core';
import {RedirectCommand, Router, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'user/:id',
    component: UserProfile,
    resources: (ctx) => {
      const router = inject(Router);

      return {
        user: resource({
          params: () => ctx.params()['id'],
          loader: async ({params: id}) => {
            const user = await fetchUser(id);
            if (!user) {
              throw new RedirectCommand(router.parseUrl('/not-found'));
            }
            return user;
          },
        }),
      };
    },
  },
];
```

<a id="reloading-resources-without-renavigation"></a>

## 내비게이션 없이 리소스 다시 로드하기

데이터 리졸버로 데이터를 다시 가져오려면 `onSameUrlNavigation: 'reload'`를 사용해 이동하는 것처럼 라우터 내비게이션이 필요합니다. 이 과정에서 라우팅 규칙을 다시 매칭하고 가드와 리졸버를 다시 실행합니다.

라우팅 규칙 리소스는 현재 화면에서 데이터를 갱신하는 두 가지 방법을 지원합니다:

1. **코드로 다시 로드하기**: `Resource` 인스턴스의 `.reload()`를 실행합니다.
2. **반응형으로 다시 로드하기**: 애플리케이션의 필터나 상태 시그널처럼 리소스의 `params` 함수가 읽는 시그널을 갱신해서 로더를 다시 실행합니다.

라우터는 블로킹 리소스의 값만 컴포넌트 입력 프로퍼티에 바인딩합니다. 따라서 `.reload()`를 실행하거나 상태 시그널을 확인하려면 `ActivatedRoute`나 `ActivatedRouteSnapshot`에서 `Resource` 인스턴스를 읽으세요:

```angular-ts
import {Component, inject, input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  template: `
    <p>사용자: {{ user().name }}</p>
    <button (click)="refreshUser()">새로고침</button>
  `,
})
export class UserProfile {
  user = input.required<User>();
  private userResource = inject(ActivatedRoute).resources?.['user'];

  refreshUser() {
    // 라우터 내비게이션 없이 이 리소스만 다시 로드합니다.
    this.userResource?.reload();
  }
}
```

<a id="transitional-states-during-pending-navigations"></a>

## 내비게이션 대기 중 전환 상태

내비게이션이 대기 중일 때 라우터는 `ActivatedRoute`로 제공하는 리소스 상태를 고정해서 중간의 `loading`, `reloading` 상태가 표시되지 않게 합니다.

`/user/1`에서 `/user/2`로 이동할 때 라우터가 `UserProfile` 컴포넌트를 재사용하면, 컴포넌트는 `/user/2`의 데이터가 준비될 때까지 `/user/1`의 데이터를 계속 렌더링합니다. 이후 라우터가 리소스 상태 고정을 해제하면 로딩 화면이 잠깐 나타나는 현상 없이 UI가 새 데이터로 바로 전환됩니다.

`resources` 함수가 `resource()`처럼 쓰기 가능한 리소스를 반환하더라도 라우터는 읽기 전용으로 제공합니다. 리소스 시그널을 읽거나 `reload()`를 실행할 수는 있지만 `set()`, `update()`는 사용할 수 없습니다. 내비게이션이나 롤백 복구가 진행 중일 때 `reload()`를 실행하면 라우터의 전환 추적을 방해하지 않도록 `false`를 반환합니다.

<a id="rollback-recovery-on-cancellation"></a>

### 취소 시 롤백 복구

가드 등으로 내비게이션이 취소되면 라우터는 상태 트리를 이전 상태로 되돌립니다. 이 과정에서 라우팅 규칙 파라미터 등 리소스가 의존하는 시그널도 이전 값으로 돌아갈 수 있습니다.

파라미터가 이전 값으로 바뀌었기 때문에 리소스가 해당 파라미터의 데이터를 가져오려고 자동으로 새 로딩을 시작할 수 있습니다. 이미 표시했던 데이터에 로딩 상태가 잠깐 나타나는 것을 막기 위해, 라우터는 리소스가 되돌린 상태에서 안정될 때까지 UI에 이전 리소스 스냅샷을 유지합니다.

TIP: 리소스 로더가 제공하는 `abortSignal`을 `fetch` 같은 비동기 호출에 전달하세요. 라우터가 파라미터를 되돌리거나 새 내비게이션으로 전환하면 대기 중인 요청을 취소할 수 있습니다: `loader: ({params: id, abortSignal}) => fetchUser(id, {signal: abortSignal})`.
