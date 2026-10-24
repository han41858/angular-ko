<!--
# Redirecting Routes
-->

<a id="redirecting-routes"></a>

# 라우팅 규칙 리다이렉트

<!--
Route redirects allow you to automatically navigate users from one route to another. Think of it like mail forwarding, where mail intended for one address is sent to a different address. This is useful for handling legacy URLs, implementing default routes, or managing access control.
-->

라우팅 규칙 리다이렉트를 사용하면 사용자를 한 라우팅 규칙에서 다른 라우팅 규칙으로 자동으로 이동시킬 수 있습니다.
특정 주소로 보낸 우편물을 다른 주소로 전달하는 우편물 전송 서비스와 비슷합니다.
이전 URL을 처리하거나 기본 라우팅 규칙을 구현하고, 접근 제어를 관리할 때 유용합니다.

<!--
## How to configure redirects
-->

<a id="how-to-configure-redirects"></a>

## 리다이렉트 설정하기

<!--
You can define redirects in your route configuration with the `redirectTo` property. This property accepts a string.

```ts
import {Routes} from '@angular/router';

const routes: Routes = [
  // Simple redirect
  {path: 'marketing', redirectTo: 'newsletter'},

  // Redirect with path parameters
  {path: 'legacy-user/:id', redirectTo: 'users/:id'},

  // Redirect any other URLs that don’t match
  // (also known as a "wildcard" redirect)
  {path: '**', redirectTo: '/login'},
];
```

In this example, there are three redirects:

1. When a user visits the `/marketing` path, they are redirected to `/newsletter`.
2. When a user visits any `/legacy-user/:id` path, they are routed to the corresponding `/users/:id` path.
3. When a user visit any path that’s not defined in the router, they are redirected to the login page because of the `**` wildcard path definition.
-->

라우팅 규칙 설정의 `redirectTo` 프로퍼티로 리다이렉트를 정의할 수 있습니다.
이 프로퍼티에는 문자열을 전달합니다.

```ts
import {Routes} from '@angular/router';

const routes: Routes = [
  // 간단한 리다이렉트
  {path: 'marketing', redirectTo: 'newsletter'},

  // 경로 파라미터가 있는 리다이렉트
  {path: 'legacy-user/:id', redirectTo: 'users/:id'},

  // 다른 라우팅 규칙과 일치하지 않는 모든 URL을 리다이렉트합니다.
  // "와일드카드" 리다이렉트라고도 합니다.
  {path: '**', redirectTo: '/login'},
];
```

이 예제에는 세 가지 리다이렉트가 있습니다.

1. 사용자가 `/marketing` 경로에 방문하면 `/newsletter`로 리다이렉트됩니다.
2. 사용자가 `/legacy-user/:id` 경로에 방문하면 대응하는 `/users/:id` 경로로 이동합니다.
3. 라우터에 정의되지 않은 경로에 방문하면 `**` 와일드카드 경로 정의에 따라 로그인 페이지로 리다이렉트됩니다.

<!--
## Understanding `pathMatch`
-->

<a id="understanding-pathmatch"></a>

## `pathMatch` 이해하기

<!--
The `pathMatch` property on routes enables developers to control how Angular matches a URL to routes.

There are two values that `pathMatch` accepts:

| Value      | Description                                  |
| ---------- | -------------------------------------------- |
| `'full'`   | The entire URL path must match exactly       |
| `'prefix'` | Only the beginning of the URL needs to match |

By default, all redirects use the `prefix` strategy.
-->

라우팅 규칙의 `pathMatch` 프로퍼티로 Angular가 URL을 라우팅 규칙과 매칭하는 방식을 제어할 수 있습니다.

`pathMatch`에 지정할 수 있는 값은 두 가지입니다.

| 값         | 설명                                      |
| ---------- | ----------------------------------------- |
| `'full'`   | 전체 URL 경로가 정확하게 일치해야 합니다. |
| `'prefix'` | URL의 시작 부분만 일치하면 됩니다.        |

모든 리다이렉트는 기본적으로 `prefix` 전략을 사용합니다.

<!--
### `pathMatch: 'prefix'`
-->


### `pathMatch: 'prefix'`

<!--
`pathMatch: 'prefix'` is the default strategy and ideal when you want Angular Router to match all subsequent routes when triggering a redirect.

```ts
export const routes: Routes = [
  // This redirect route is equivalent to…
  {path: 'news', redirectTo: 'blog'},

  // This explicitly defined route redirect pathMatch
  {path: 'news', redirectTo: 'blog', pathMatch: 'prefix'},
];
```

In this example, all routes that are prefixed with `news` are redirected to their `/blog` equivalents. Here are some examples where users are redirected when visiting the old `news` prefix:

- `/news` redirects to `/blog`
- `/news/article` redirects to `/blog/article`
- `/news/article/:id` redirects to `/blog/article/:id`
-->

`pathMatch: 'prefix'`는 기본 전략이며, 리다이렉트할 때 해당 경로 뒤에 이어지는 모든 라우팅 규칙도 매칭하려는 경우에 적합합니다.

```ts
export const routes: Routes = [
  // 이 리다이렉트 라우팅 규칙은 아래 설정과 같습니다.
  {path: 'news', redirectTo: 'blog'},

  // 리다이렉트의 pathMatch를 명시적으로 지정한 라우팅 규칙입니다.
  {path: 'news', redirectTo: 'blog', pathMatch: 'prefix'},
];
```

이 예제에서는 `news`로 시작하는 모든 라우팅 규칙을 대응하는 `/blog` 경로로 리다이렉트합니다.
사용자가 이전 `news` 접두사가 있는 경로에 방문하면 다음과 같이 리다이렉트됩니다.

- `/news`는 `/blog`로 리다이렉트됩니다.
- `/news/article`은 `/blog/article`로 리다이렉트됩니다.
- `/news/article/:id`는 `/blog/article/:id`로 리다이렉트됩니다.

<!--
### `pathMatch: 'full'`
-->


### `pathMatch: 'full'`

<!--
On the other hand, `pathMatch: 'full'` is useful when you want Angular Router to only redirect a specific path.

```ts
export const routes: Routes = [{path: '', redirectTo: '/dashboard', pathMatch: 'full'}];
```

In this example, any time the user visits the root URL (i.e., `''`), the router redirects that user to the `'/dashboard'` page.

Any subsequent pages (e.g., `/login`, `/about`, `/product/id`, etc.), are ignored and do not trigger a redirect.

TIP: Be careful when configuring a redirect on the root page (i.e., `"/"` or `""`). If you do not set `pathMatch: 'full'`, the router will redirect all URLs.

To further illustrate this, if the `news` example from the previous section used `pathMatch: 'full'` instead:

```ts
export const routes: Routes = [{path: 'news', redirectTo: '/blog', pathMatch: 'full'}];
```

This means that:

1. Only the `/news` path will be redirected to `/blog`.
2. Any subsequent segments such as `/news/articles` or `/news/articles/1` would not redirect with the new `/blog` prefix.
-->

반면 `pathMatch: 'full'`은 Angular 라우터가 특정 경로만 리다이렉트하도록 할 때 유용합니다.

```ts
export const routes: Routes = [{path: '', redirectTo: '/dashboard', pathMatch: 'full'}];
```

이 예제에서 사용자가 루트 URL(즉, `''`)에 방문하면 라우터가 `'/dashboard'` 페이지로 리다이렉트합니다.

그 뒤에 경로가 이어지는 페이지(예: `/login`, `/about`, `/product/id` 등)는 매칭 대상에서 제외되므로 리다이렉트되지 않습니다.

팁: 루트 페이지(즉, `"/"` 또는 `""`)에 리다이렉트를 설정할 때는 주의하세요.
`pathMatch: 'full'`을 지정하지 않으면 모든 URL이 리다이렉트됩니다.

앞 섹션의 `news` 예제에서 `pathMatch: 'full'`을 사용하면 차이를 더 분명하게 확인할 수 있습니다.

```ts
export const routes: Routes = [{path: 'news', redirectTo: '/blog', pathMatch: 'full'}];
```

이 설정에서는 다음과 같이 동작합니다.

1. `/news` 경로만 `/blog`로 리다이렉트됩니다.
2. `/news/articles`, `/news/articles/1`처럼 세그먼트가 이어지는 경로는 새 `/blog` 접두사가 있는 경로로 리다이렉트되지 않습니다.

<!--
## Conditional redirects
-->

<a id="conditional-redirects"></a>

## 조건부 리다이렉트

<!--
The `redirectTo` property can also accept a function in order to add logic to how users are redirected.

The [function](api/router/RedirectFunction) only has access part of the [`ActivatedRouteSnapshot`](api/router/ActivatedRouteSnapshot) data since some data is not accurately known at the route matching phase. Examples include: resolved titles, lazy loaded components, etc.

It typically returns a string or [`URLTree`](api/router/UrlTree), but it can also return an observable or promise.

Here is an example where the user is redirected to different menu based on the time of the day:

```ts
import {Routes} from '@angular/router';
import {Menu} from './menu';

export const routes: Routes = [
  {
    path: 'restaurant/:location/menu',
    pathMatch: 'full',
    redirectTo: (activatedRouteSnapshot) => {
      const location = activatedRouteSnapshot.params['location'];
      const currentHour = new Date().getHours();

      // Check if user requested a specific meal via query parameter
      if (activatedRouteSnapshot.queryParams['meal']) {
        return `/restaurant/${location}/menu/${activatedRouteSnapshot.queryParams['meal']}`;
      }

      // Auto-redirect based on time of day
      if (currentHour >= 5 && currentHour < 11) {
        return `/restaurant/${location}/menu/breakfast`;
      } else if (currentHour >= 11 && currentHour < 17) {
        return `/restaurant/${location}/menu/lunch`;
      } else {
        return `/restaurant/${location}/menu/dinner`;
      }
    },
  },

  // Destination routes
  {path: 'restaurant/:location/menu/breakfast', component: Menu},
  {path: 'restaurant/:location/menu/lunch', component: Menu},
  {path: 'restaurant/:location/menu/dinner', component: Menu},

  // Default redirect
  {path: '', redirectTo: '/restaurant/downtown/menu', pathMatch: 'full'},
];
```

To learn more, check out [the API docs for the RedirectFunction](api/router/RedirectFunction).
-->

`redirectTo` 프로퍼티에 함수를 전달하면 사용자를 리다이렉트하는 로직을 추가할 수 있습니다.

라우팅 규칙을 매칭하는 단계에서는 아직 일부 데이터를 정확히 알 수 없기 때문에 [리다이렉트 함수](api/router/RedirectFunction)는 [`ActivatedRouteSnapshot`](api/router/ActivatedRouteSnapshot) 데이터의 일부에만 접근할 수 있습니다.
아직 알 수 없는 데이터에는 리졸버가 결정하는 제목, 지연 로드하는 컴포넌트 등이 있습니다.

일반적으로 문자열이나 [`URLTree`](api/router/UrlTree)를 반환하지만, 옵저버블이나 Promise를 반환할 수도 있습니다.

다음 예제는 시간대에 따라 사용자를 다른 메뉴로 리다이렉트합니다.

```ts
import {Routes} from '@angular/router';
import {Menu} from './menu';

export const routes: Routes = [
  {
    path: 'restaurant/:location/menu',
    pathMatch: 'full',
    redirectTo: (activatedRouteSnapshot) => {
      const location = activatedRouteSnapshot.params['location'];
      const currentHour = new Date().getHours();

      // 사용자가 쿼리 파라미터로 특정 식사 메뉴를 요청했는지 확인합니다.
      if (activatedRouteSnapshot.queryParams['meal']) {
        return `/restaurant/${location}/menu/${activatedRouteSnapshot.queryParams['meal']}`;
      }

      // 시간대에 따라 자동으로 리다이렉트합니다.
      if (currentHour >= 5 && currentHour < 11) {
        return `/restaurant/${location}/menu/breakfast`;
      } else if (currentHour >= 11 && currentHour < 17) {
        return `/restaurant/${location}/menu/lunch`;
      } else {
        return `/restaurant/${location}/menu/dinner`;
      }
    },
  },

  // 목적지 라우팅 규칙
  {path: 'restaurant/:location/menu/breakfast', component: Menu},
  {path: 'restaurant/:location/menu/lunch', component: Menu},
  {path: 'restaurant/:location/menu/dinner', component: Menu},

  // 기본 리다이렉트
  {path: '', redirectTo: '/restaurant/downtown/menu', pathMatch: 'full'},
];
```

자세한 내용은 [RedirectFunction API 문서](api/router/RedirectFunction)를 참고하세요.

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
For more information about the `redirectTo` property, check out the [API docs](api/router/Route#redirectTo).
-->

`redirectTo` 프로퍼티의 자세한 내용은 [API 문서](api/router/Route#redirectTo)를 참고하세요.
