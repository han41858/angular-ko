<!--
# Data resolvers
-->

<a id="data-resolvers"></a>

# 데이터 리졸버

<!--
Data resolvers allow you to fetch data before navigating to a route, ensuring that your components receive the data they need before rendering. This can help prevent the need for loading states and improve the user experience by pre-loading essential data.
-->

데이터 리졸버를 사용하면 라우팅 규칙으로 이동하기 전에 데이터를 가져와서, 컴포넌트가 렌더링되기 전에 필요한 데이터를 전달할 수 있습니다.
필수 데이터를 미리 로드하기 때문에 로딩 상태를 표시할 필요를 줄이고 사용자 경험을 개선할 수 있습니다.

<!--
TIP: If your application uses Angular Signals, consider using [route resources](/guide/routing/data-fetching-with-resources) for reactive data fetching with `Resource` APIs and built-in support for non-blocking data loading.
-->

TIP: 애플리케이션에서 Angular 시그널을 사용한다면 [라우팅 규칙 리소스](/guide/routing/data-fetching-with-resources)를 활용해 보세요. `Resource` API로 반응형 데이터 요청을 구현할 수 있고, 논블로킹 데이터 로딩도 기본으로 지원합니다.

<!--
## What are data resolvers?
-->

<a id="what-are-data-resolvers"></a>

## 데이터 리졸버란?

<!--
A data resolver is a service that implements the `ResolveFn` function. It runs before a route activates and can fetch data from APIs, databases, or other sources. The resolved data becomes available to the component through the `ActivatedRoute`.

Data resolvers have access to [services provided at the route level](guide/di/defining-dependency-providers#route-providers) as well as route-specific information via the `route` argument.
-->

데이터 리졸버는 `ResolveFn` 함수를 구현하는 서비스입니다.
라우팅 규칙이 활성화되기 전에 실행되며 API, 데이터베이스 등에서 데이터를 가져올 수 있습니다.
리졸버가 가져온 데이터는 `ActivatedRoute`를 통해 컴포넌트에 전달됩니다.

데이터 리졸버는 [라우팅 규칙 수준에서 제공하는 서비스](guide/di/defining-dependency-providers#route-providers)에 접근할 수 있으며, `route` 인자로 해당 라우팅 규칙의 정보에도 접근할 수 있습니다.

<!--
## Why use data resolvers?
-->

<a id="why-use-data-resolvers"></a>

## 데이터 리졸버를 사용하는 이유

<!--
Data resolvers solve common routing challenges:

- **Prevent empty states**: Components receive data immediately upon loading
- **Better user experience**: No loading spinners for critical data
- **Error handling**: Handle data fetching errors before navigation
- **Data consistency**: Ensure required data is available before rendering which is important for SSR
-->

데이터 리졸버는 라우팅에서 자주 발생하는 문제를 해결합니다.

- **빈 상태 방지**: 컴포넌트가 로드되면 바로 데이터를 받습니다.
- **사용자 경험 개선**: 핵심 데이터를 위한 로딩 스피너가 필요하지 않습니다.
- **에러 처리**: 내비게이션 전에 데이터 요청 에러를 처리합니다.
- **데이터 일관성**: 렌더링 전에 필요한 데이터를 확보합니다.
  이는 SSR에서 중요합니다.

<!--
## Creating a resolver
-->

<a id="creating-a-resolver"></a>

## 리졸버 생성하기

<!--
You create a resolver by writing a function with the `ResolveFn` type.

It receives the `ActivatedRouteSnapshot` and `RouterStateSnapshot` as parameters.

Here is a resolver that gets the user information before rendering a route using the [`inject`](api/core/inject) function:

```ts
import {inject} from '@angular/core';
import {UserStore, SettingsStore} from './user-store';
import type {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import type {User, Settings} from './types';

export const userResolver: ResolveFn<User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const userStore = inject(UserStore);
  const userId = route.paramMap.get('id')!;
  return userStore.getUser(userId);
};

export const settingsResolver: ResolveFn<Settings> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const settingsStore = inject(SettingsStore);
  const userId = route.paramMap.get('id')!;
  return settingsStore.getUserSettings(userId);
};
```
-->

`ResolveFn` 타입의 함수를 작성하면 리졸버를 생성할 수 있습니다.

이 함수는 `ActivatedRouteSnapshot`과 `RouterStateSnapshot`을 파라미터로 받습니다.

다음 리졸버는 [`inject`](api/core/inject) 함수를 사용해서 라우팅 규칙을 렌더링하기 전에 사용자 정보를 가져옵니다.

```ts
import {inject} from '@angular/core';
import {UserStore, SettingsStore} from './user-store';
import type {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import type {User, Settings} from './types';

export const userResolver: ResolveFn<User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const userStore = inject(UserStore);
  const userId = route.paramMap.get('id')!;
  return userStore.getUser(userId);
};

export const settingsResolver: ResolveFn<Settings> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const settingsStore = inject(SettingsStore);
  const userId = route.paramMap.get('id')!;
  return settingsStore.getUserSettings(userId);
};
```

<!--
## Configuring routes with resolvers
-->

<a id="configuring-routes-with-resolvers"></a>

## 라우팅 규칙에 리졸버 설정하기

<!--
When you want to add one or more data resolvers to a route, you can add it under the `resolve` key in the route configuration. The `Routes` type defines the structure for route configurations:

```ts
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'user/:id',
    component: UserDetail,
    resolve: {
      user: userResolver,
      settings: settingsResolver,
    },
  },
];
```

You can learn more about the [`resolve` configuration in the API docs](api/router/Route#resolve).
-->

라우팅 규칙에 데이터 리졸버를 하나 이상 추가하려면 라우팅 규칙 설정의 `resolve` 키에 지정하세요.
라우팅 규칙 설정의 구조는 `Routes` 타입에 정의되어 있습니다.

```ts
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'user/:id',
    component: UserDetail,
    resolve: {
      user: userResolver,
      settings: settingsResolver,
    },
  },
];
```

자세한 내용은 [API 문서의 `resolve` 설정](api/router/Route#resolve)을 참고하세요.

<!--
## Accessing resolved data in components
-->

<a id="accessing-resolved-data-in-components"></a>

## 컴포넌트에서 리졸버 데이터에 접근하기

<!--
### Using ActivatedRoute
-->

<a id="using-activatedroute"></a>

### ActivatedRoute 사용하기

<!--
You can access the resolved data in a component by converting the `data` observable from the `ActivatedRoute` into a signal using the `toSignal` function:

```angular-ts
import {Component, inject, computed} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import type {User, Settings} from './types';

@Component({
  template: `
    <h1>{{ user().name }}</h1>
    <p>{{ user().email }}</p>
    <div>Theme: {{ settings().theme }}</div>
  `,
})
export class UserDetail {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data, {requireSync: true});
  user = computed(() => this.data().user as User);
  settings = computed(() => this.data().settings as Settings);
}
```
-->

컴포넌트에서는 `toSignal` 함수로 `ActivatedRoute`의 `data` 옵저버블을 시그널로 변환해서 리졸버가 가져온 데이터에 접근할 수 있습니다.

```angular-ts
import {Component, inject, computed} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import type {User, Settings} from './types';

@Component({
  template: `
    <h1>{{ user().name }}</h1>
    <p>{{ user().email }}</p>
    <div>Theme: {{ settings().theme }}</div>
  `,
})
export class UserDetail {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data, {requireSync: true});
  user = computed(() => this.data().user as User);
  settings = computed(() => this.data().settings as Settings);
}
```

<!--
### Using withComponentInputBinding
-->

<a id="using-withcomponentinputbinding"></a>

### withComponentInputBinding 사용하기

<!--
A different approach to accessing the resolved data is to use `withComponentInputBinding()` when configuring your router with `provideRouter`. This allows resolved data to be passed directly as component inputs:

```ts
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {routes} from './app.routes';

bootstrapApplication(App, {
  providers: [provideRouter(routes, withComponentInputBinding())],
});
```

With this configuration, you can define inputs in your component that match the resolver keys using the `input` function and `input.required` for required inputs:

```angular-ts
import {Component, input} from '@angular/core';
import type {User, Settings} from './types';

@Component({
  template: `
    <h1>{{ user().name }}</h1>
    <p>{{ user().email }}</p>
    <div>Theme: {{ settings().theme }}</div>
  `,
})
export class UserDetail {
  user = input.required<User>();
  settings = input.required<Settings>();
}
```

This approach provides better type safety and eliminates the need to inject `ActivatedRoute` just to access resolved data.
-->

`provideRouter`로 라우터를 설정할 때 `withComponentInputBinding()`을 사용하는 방법도 있습니다.
이 방식을 사용하면 리졸버가 가져온 데이터가 컴포넌트의 입력 프로퍼티로 직접 전달됩니다.

```ts
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {routes} from './app.routes';

bootstrapApplication(App, {
  providers: [provideRouter(routes, withComponentInputBinding())],
});
```

이렇게 설정하면 컴포넌트에서 `input` 함수로 리졸버 키와 일치하는 입력 프로퍼티를 정의할 수 있습니다.
필수 입력에는 `input.required`를 사용하세요.

```angular-ts
import {Component, input} from '@angular/core';
import type {User, Settings} from './types';

@Component({
  template: `
    <h1>{{ user().name }}</h1>
    <p>{{ user().email }}</p>
    <div>Theme: {{ settings().theme }}</div>
  `,
})
export class UserDetail {
  user = input.required<User>();
  settings = input.required<Settings>();
}
```

이 방식은 타입 안전성을 높이며, 리졸버 데이터에 접근하기 위해 `ActivatedRoute`를 주입할 필요가 없습니다.

<!--
## Error handling in resolvers
-->

<a id="error-handling-in-resolvers"></a>

## 리졸버 에러 처리하기

<!--
In the event of navigation failures, it is important to handle errors gracefully in your data resolvers. Otherwise, a `NavigationError` will occur and the navigation to the current route will fail which will lead to a poor experience for your users.

There are three primary ways to handle errors with data resolvers:

1. Centralize error handling in `withNavigationErrorHandler`
2. Manage errors through a subscription to router events
3. Handle errors directly in the resolver
-->

내비게이션이 실패할 때는 데이터 리졸버에서 에러를 적절하게 처리하는 것이 중요합니다.
에러를 처리하지 않으면 `NavigationError`가 발생하고 해당 라우팅 규칙으로 이동하지 못해서 사용자 경험이 나빠집니다.

데이터 리졸버의 에러를 처리하는 주요 방법은 세 가지입니다.

1. `withNavigationErrorHandler`에서 에러 처리를 통합합니다.
2. 라우터 이벤트를 구독해서 에러를 관리합니다.
3. 리졸버에서 직접 에러를 처리합니다.

<!--
### Centralize error handling in `withNavigationErrorHandler`
-->

<a id="centralize-error-handling-in-withnavigationerrorhandler"></a>

### `withNavigationErrorHandler`에서 에러 처리 통합하기

<!--
The [`withNavigationErrorHandler`](api/router/withNavigationErrorHandler) feature provides a centralized way to handle all navigation errors, including those from failed data resolvers. This approach keeps error handling logic in one place and prevents duplicate error handling code across resolvers.

```ts
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, Router, withNavigationErrorHandler} from '@angular/router';
import {inject} from '@angular/core';
import {routes} from './app.routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(
      routes,
      withNavigationErrorHandler((error) => {
        const router = inject(Router);

        if (error.error?.message) {
          console.error('Navigation error occurred:', error.error.message);
        }

        router.navigate(['/error']);
      }),
    ),
  ],
});
```

With this configuration, your resolvers can focus on data fetching while letting the centralized handler manage error scenarios:

```ts
export const userResolver: ResolveFn<User> = (route) => {
  const userStore = inject(UserStore);
  const userId = route.paramMap.get('id')!;
  // No need for explicit error handling - let it bubble up
  return userStore.getUser(userId);
};
```
-->

[`withNavigationErrorHandler`](api/router/withNavigationErrorHandler)는 데이터 리졸버의 실패를 포함한 모든 내비게이션 에러를 한곳에서 처리하는 기능입니다.
에러 처리 로직을 한곳에 모으기 때문에 리졸버마다 에러 처리 코드가 중복되는 일을 방지할 수 있습니다.

```ts
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, Router, withNavigationErrorHandler} from '@angular/router';
import {inject} from '@angular/core';
import {routes} from './app.routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(
      routes,
      withNavigationErrorHandler((error) => {
        const router = inject(Router);

        if (error.error?.message) {
          console.error('Navigation error occurred:', error.error.message);
        }

        router.navigate(['/error']);
      }),
    ),
  ],
});
```

이렇게 설정하면 에러 상황은 공통 핸들러가 관리하고, 리졸버는 데이터 요청에 집중할 수 있습니다.

```ts
export const userResolver: ResolveFn<User> = (route) => {
  const userStore = inject(UserStore);
  const userId = route.paramMap.get('id')!;
  // 여기서 직접 에러를 처리하지 않고 상위로 전달합니다.
  return userStore.getUser(userId);
};
```

<!--
### Managing errors through a subscription to router events
-->

<a id="managing-errors-through-a-subscription-to-router-events"></a>

### 라우터 이벤트를 구독해서 에러 관리하기

<!--
You can also handle resolver errors by subscribing to router events and listening for `NavigationError` events. This approach gives you more granular control over error handling and allows you to implement custom error recovery logic.

```angular-ts
import {Component, inject, signal} from '@angular/core';
import {Router, NavigationError} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    @if (errorMessage()) {
      <div class="error-banner">
        {{ errorMessage() }}
        <button (click)="retryNavigation()">Retry</button>
      </div>
    }
    <router-outlet />
  `,
})
export class App {
  private router = inject(Router);
  private lastFailedUrl = signal('');

  private navigationErrors = toSignal(
    this.router.events.pipe(
      map((event) => {
        if (event instanceof NavigationError) {
          this.lastFailedUrl.set(event.url);

          if (event.error) {
            console.error('Navigation error', event.error);
          }

          return 'Navigation failed. Please try again.';
        }
        return '';
      }),
    ),
    {initialValue: ''},
  );

  errorMessage = this.navigationErrors;

  retryNavigation() {
    if (this.lastFailedUrl()) {
      this.router.navigateByUrl(this.lastFailedUrl());
    }
  }
}
```

This approach is particularly useful when you need to:

- Implement custom retry logic for failed navigation
- Show specific error messages based on the type of failure
- Track navigation failures for analytics purposes
-->

라우터 이벤트를 구독하고 `NavigationError` 이벤트를 감지해서 리졸버 에러를 처리할 수도 있습니다.
이 방식은 에러 처리를 더 세밀하게 제어할 수 있으며 커스텀 에러 복구 로직도 구현할 수 있습니다.

```angular-ts
import {Component, inject, signal} from '@angular/core';
import {Router, NavigationError} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    @if (errorMessage()) {
      <div class="error-banner">
        {{ errorMessage() }}
        <button (click)="retryNavigation()">Retry</button>
      </div>
    }
    <router-outlet />
  `,
})
export class App {
  private router = inject(Router);
  private lastFailedUrl = signal('');

  private navigationErrors = toSignal(
    this.router.events.pipe(
      map((event) => {
        if (event instanceof NavigationError) {
          this.lastFailedUrl.set(event.url);

          if (event.error) {
            console.error('Navigation error', event.error);
          }

          return 'Navigation failed. Please try again.';
        }
        return '';
      }),
    ),
    {initialValue: ''},
  );

  errorMessage = this.navigationErrors;

  retryNavigation() {
    if (this.lastFailedUrl()) {
      this.router.navigateByUrl(this.lastFailedUrl());
    }
  }
}
```

이 방식은 다음과 같은 경우에 특히 유용합니다.

- 실패한 내비게이션에 커스텀 재시도 로직을 구현할 때
- 실패 유형에 따라 다른 에러 메시지를 표시할 때
- 분석 목적으로 내비게이션 실패를 추적할 때

<!--
### Handling errors directly in the resolver
-->

<a id="handling-errors-directly-in-the-resolver"></a>

### 리졸버에서 직접 에러 처리하기

<!--
Here's an updated example of the `userResolver` that logs the error and navigates back to the generic `/users` page using the `Router` service:

```ts
import {inject} from '@angular/core';
import {ResolveFn, RedirectCommand, Router} from '@angular/router';
import {catchError, of, EMPTY} from 'rxjs';
import {UserStore} from './user-store';
import type {User} from './types';

export const userResolver: ResolveFn<User | RedirectCommand> = (route) => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  const userId = route.paramMap.get('id')!;

  return userStore.getUser(userId).pipe(
    catchError((error) => {
      console.error('Failed to load user:', error);
      return of(new RedirectCommand(router.parseUrl('/users')));
    }),
  );
};
```
-->

다음은 에러를 기록하고 `Router` 서비스로 일반 `/users` 페이지에 돌아가도록 수정한 `userResolver` 예제입니다.

```ts
import {inject} from '@angular/core';
import {ResolveFn, RedirectCommand, Router} from '@angular/router';
import {catchError, of, EMPTY} from 'rxjs';
import {UserStore} from './user-store';
import type {User} from './types';

export const userResolver: ResolveFn<User | RedirectCommand> = (route) => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  const userId = route.paramMap.get('id')!;

  return userStore.getUser(userId).pipe(
    catchError((error) => {
      console.error('Failed to load user:', error);
      return of(new RedirectCommand(router.parseUrl('/users')));
    }),
  );
};
```

<!--
## Navigation loading considerations
-->

<a id="navigation-loading-considerations"></a>

## 내비게이션 로딩 시 고려사항

<!--
While data resolvers prevent loading states within components, they introduce a different UX consideration: navigation is blocked while resolvers execute. Users may experience delays between clicking a link and seeing the new route, especially with slow network requests.
-->

데이터 리졸버를 사용하면 컴포넌트 안에 로딩 상태를 표시할 필요는 줄어들지만, 다른 사용자 경험 문제를 고려해야 합니다.
리졸버가 실행되는 동안 내비게이션이 대기하기 때문입니다.
특히 네트워크 요청이 느리면 사용자가 링크를 클릭한 뒤 새 라우팅 규칙이 표시되기까지 지연을 느낄 수 있습니다.

<!--
TIP: To avoid blocking navigation and render components immediately with skeleton or loading indicators, use [non-blocking route resources](/guide/routing/data-fetching-with-resources#blocking-and-non-blocking-resources).
-->

TIP: 내비게이션을 막지 않고 스켈레톤 화면이나 로딩 표시와 함께 컴포넌트를 즉시 렌더링하려면 [논블로킹 라우팅 규칙 리소스](/guide/routing/data-fetching-with-resources#blocking-and-non-blocking-resources)를 사용하세요.

<!--
### Providing navigation feedback
-->

<a id="providing-navigation-feedback"></a>

### 내비게이션 진행 상황 표시하기

<!--
To improve user experience during resolver execution, you can listen to router events and show loading indicators:

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

This approach ensures users receive visual feedback that navigation is in progress while resolvers fetch data.
-->

리졸버가 실행되는 동안 사용자 경험을 개선하려면 라우터 이벤트를 감지해서 로딩 표시기를 표시할 수 있습니다.

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

이렇게 하면 리졸버가 데이터를 가져오는 동안 사용자에게 내비게이션이 진행 중이라는 사실을 시각적으로 알릴 수 있습니다.

<!--
## Best practices
-->

<a id="best-practices"></a>

## 권장사항

<!--
- **Keep resolvers lightweight**: Resolvers should fetch essential data only and not everything the page could possibly need
- **Handle errors**: Always remember to handle errors gracefully to provide the best experience possible to users
- **Use caching**: Consider caching resolved data to improve performance
- **Consider navigation UX**: Implement loading indicators for resolver execution since navigation is blocked during data fetching
- **Set reasonable timeouts**: Avoid resolvers that could hang indefinitely and block navigation
- **Type safety**: Use TypeScript interfaces for resolved data
-->

- **리졸버를 가볍게 유지하세요**: 페이지에서 필요할 수 있는 모든 데이터 대신 필수 데이터만 가져오세요.
- **에러를 처리하세요**: 사용자에게 가능한 한 좋은 경험을 제공할 수 있도록 항상 에러를 적절하게 처리하세요.
- **캐시를 활용하세요**: 성능을 높이기 위해 리졸버가 가져온 데이터의 캐시를 고려하세요.
- **내비게이션 사용자 경험을 고려하세요**: 데이터를 가져오는 동안 내비게이션이 대기하므로 리졸버 실행을 위한 로딩 표시기를 구현하세요.
- **적절한 제한 시간을 설정하세요**: 리졸버가 무기한 대기하면서 내비게이션을 막지 않도록 하세요.
- **타입 안전성을 확보하세요**: 리졸버가 가져오는 데이터에 TypeScript 인터페이스를 사용하세요.

<!--
## Reading parent resolved data in child resolvers
-->

<a id="reading-parent-resolved-data-in-child-resolvers"></a>

## 자식 리졸버에서 부모의 리졸버 데이터 읽기

<!--
Resolvers execute sequentially from parent to child. When a parent route defines a resolver, its resolved data is available to child resolvers that run afterward.

NOTE: Because resolvers execute sequentially from parent to child, each nested level adds to the total navigation wait time (a network waterfall). If your child routes do not depend on parent data, consider [route resources](/guide/routing/data-fetching-with-resources), which execute concurrently across all routes.

```ts
import {inject} from '@angular/core';
import {provideRouter, ActivatedRouteSnapshot} from '@angular/router';
import {userResolver} from './resolvers';
import {UserPosts} from './pages';
import {PostService} from './services';
import type {User} from './types';

provideRouter([
  {
    path: 'users/:id',
    resolve: {user: userResolver}, // user resolver in the parent route
    children: [
      {
        path: 'posts',
        component: UserPosts,
        // route.data.user is available here while this resolver runs
        resolve: {
          posts: (route: ActivatedRouteSnapshot) => {
            const postService = inject(PostService);
            const user = route.parent?.data['user'] as User; // parent data
            const userId = user.id;
            return postService.getPostByUser(userId);
          },
        },
      },
    ],
  },
]);
```
-->

리졸버는 부모에서 자식 순서로 순차 실행됩니다.
부모 라우팅 규칙에 리졸버가 정의되어 있다면, 이후에 실행되는 자식 리졸버는 부모 리졸버가 가져온 데이터를 사용할 수 있습니다.

NOTE: 리졸버는 부모에서 자식 순서로 순차 실행되므로 중첩 단계마다 전체 내비게이션 대기 시간이 길어집니다(네트워크 워터폴). 자식 라우팅 규칙이 부모 데이터에 의존하지 않는다면 모든 라우팅 규칙에서 동시에 실행되는 [라우팅 규칙 리소스](/guide/routing/data-fetching-with-resources)를 고려하세요.

```ts
import {inject} from '@angular/core';
import {provideRouter, ActivatedRouteSnapshot} from '@angular/router';
import {userResolver} from './resolvers';
import {UserPosts} from './pages';
import {PostService} from './services';
import type {User} from './types';

provideRouter([
  {
    path: 'users/:id',
    resolve: {user: userResolver}, // 부모 라우팅 규칙의 사용자 리졸버
    children: [
      {
        path: 'posts',
        component: UserPosts,
        // 이 리졸버가 실행되는 동안 여기에서 route.data.user를 사용할 수 있습니다.
        resolve: {
          posts: (route: ActivatedRouteSnapshot) => {
            const postService = inject(PostService);
            const user = route.parent?.data['user'] as User; // 부모 데이터
            const userId = user.id;
            return postService.getPostByUser(userId);
          },
        },
      },
    ],
  },
]);
```

<!--
## Next steps

<docs-pill-row>
  <docs-pill href="/guide/routing/data-fetching-with-resources" title="Data fetching with resources"/>
  <docs-pill href="/guide/routing/route-guards" title="Control route access with guards"/>
</docs-pill-row>
-->

<a id="next-steps"></a>

## 다음 단계

<docs-pill-row>
  <docs-pill href="/guide/routing/data-fetching-with-resources" title="리소스로 데이터 가져오기"/>
  <docs-pill href="/guide/routing/route-guards" title="가드로 라우팅 규칙 접근 제어하기"/>
</docs-pill-row>
