<!--
# Control route access with guards
-->

<a id="control-route-access-with-guards"></a>

# 가드로 라우팅 규칙 접근 제어하기

<!--
CRITICAL: Never rely on client-side guards as the sole source of access control. All JavaScript that runs in a web browser can be modified by the user running the browser. Always enforce user authorization server-side, in addition to any client-side guards.

Route guards are functions that control whether a user can navigate to or leave a particular route. They are like checkpoints that manage whether a user can access specific routes. Common examples of using route guards include authentication and access control.
-->

중요: 클라이언트 가드만으로 접근 제어를 구현하지 마세요.
웹 브라우저에서 실행되는 모든 JavaScript는 브라우저 사용자가 수정할 수 있습니다.
클라이언트 가드와 별개로 서버에서도 항상 사용자 권한을 검사해야 합니다.

라우팅 규칙 가드는 사용자가 특정 라우팅 규칙으로 이동하거나 해당 라우팅 규칙을 떠날 수 있는지 제어하는 함수입니다.
사용자가 특정 라우팅 규칙에 접근할 수 있는지 관리하는 검문소와 비슷합니다.
인증과 접근 제어가 대표적인 사용 사례입니다.

<!--
## Creating a route guard
-->

<a id="creating-a-route-guard"></a>

## 라우팅 규칙 가드 생성하기

<!--
You can generate a route guard using the Angular CLI:

```bash
ng generate guard CUSTOM_NAME
```

This will prompt you to select which [type of route guard](#types-of-route-guards) to use and then create the corresponding `CUSTOM_NAME-guard.ts` file.

TIP: You can also create a route guard manually by creating a separate TypeScript file in your Angular project. Developers typically add a suffix of `-guard.ts` in the filename to distinguish it from other files.
-->

Angular CLI로 라우팅 규칙 가드를 생성할 수 있습니다.

```bash
ng generate guard CUSTOM_NAME
```

이 명령을 실행하면 사용할 [라우팅 규칙 가드 종류](#types-of-route-guards)를 선택하라는 안내가 표시되고, 선택에 맞는 `CUSTOM_NAME-guard.ts` 파일이 생성됩니다.

팁: Angular 프로젝트에 별도의 TypeScript 파일을 만들어 라우팅 규칙 가드를 직접 작성할 수도 있습니다.
다른 파일과 구분하기 위해 일반적으로 파일 이름 끝에 `-guard.ts`를 붙입니다.

<!--
## Route guard return types
-->

<a id="route-guard-return-types"></a>

## 라우팅 규칙 가드의 반환 타입

<!--
All route guards share the same possible return types. This gives you flexibility in how you control navigation:

| Return types                    | Description                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------- |
| `boolean`                       | `true` allows navigation, `false` blocks it (see note for `CanMatch` route guard) |
| `UrlTree` or `RedirectCommand`  | Redirects to another route instead of blocking                                    |
| `Promise<T>` or `Observable<T>` | Router uses the first emitted value and then unsubscribes                         |

NOTE: `CanMatch` behaves differently— when it returns `false`, Angular tries other matching routes instead of completely blocking navigation.
-->

모든 라우팅 규칙 가드는 같은 반환 타입을 지원하기 때문에 내비게이션을 유연하게 제어할 수 있습니다.

| 반환 타입                         | 설명                                                                                                             |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `boolean`                         | `true`는 내비게이션을 허용하고, `false`는 차단합니다(`CanMatch` 라우팅 규칙 가드는 아래 참고 사항을 확인하세요). |
| `UrlTree` 또는 `RedirectCommand`  | 내비게이션을 차단하는 대신 다른 라우팅 규칙으로 리다이렉트합니다.                                                |
| `Promise<T>` 또는 `Observable<T>` | 라우터가 처음 방출된 값을 사용한 뒤 구독을 해제합니다.                                                           |

참고: `CanMatch`는 다르게 동작합니다.
`false`를 반환하면 Angular는 내비게이션을 완전히 차단하는 대신 매칭할 수 있는 다른 라우팅 규칙을 확인합니다.

<!--
## Types of route guards
-->

<a id="types-of-route-guards"></a>

## 라우팅 규칙 가드 종류

<!--
Angular provides four types of route guards, each serving different purposes:

<docs-pill-row>
  <docs-pill href="#canactivate" title="CanActivate"/>
  <docs-pill href="#canactivatechild" title="CanActivateChild"/>
  <docs-pill href="#candeactivate" title="CanDeactivate"/>
  <docs-pill href="#canmatch" title="CanMatch"/>
</docs-pill-row>

All the guards have access to [services provided at the route level](guide/di/defining-dependency-providers#route-providers) as well as route-specific information via the `route` argument.
-->

Angular는 용도에 따라 네 가지 라우팅 규칙 가드를 제공합니다.

<docs-pill-row>
  <docs-pill href="#canactivate" title="CanActivate"/>
  <docs-pill href="#canactivatechild" title="CanActivateChild"/>
  <docs-pill href="#candeactivate" title="CanDeactivate"/>
  <docs-pill href="#canmatch" title="CanMatch"/>
</docs-pill-row>

모든 가드는 [라우팅 규칙 수준에서 제공하는 서비스](guide/di/defining-dependency-providers#route-providers)에 접근할 수 있으며, `route` 인자로 해당 라우팅 규칙의 정보에도 접근할 수 있습니다.

<!--
### CanActivate
-->

<a id="canactivate"></a>

### CanActivate

<!--
The `CanActivate` guard determines whether a user can access a route. It is most commonly used for authentication and authorization.

It has access to the following default arguments:

- `route`: `ActivatedRouteSnapshot` - Contains information about the route being activated
- `state`: `RouterStateSnapshot` - Contains the router's current state

It can return the [standard return guard types](#route-guard-return-types).

```ts
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  return authService.isAuthenticated();
};
```

Tip: If you need to redirect the user, return a [`URLTree`](api/router/UrlTree) or [`RedirectCommand`](api/router/RedirectCommand). Do **not** return `false` and then programmatically `navigate` the user.

For more information, check out the [API docs for CanActivateFn](api/router/CanActivateFn).
-->

`CanActivate` 가드는 사용자가 라우팅 규칙에 접근할 수 있는지 결정합니다.
주로 인증과 권한 확인에 사용합니다.

다음 기본 인자를 사용할 수 있습니다.

- `route`: `ActivatedRouteSnapshot` — 활성화하려는 라우팅 규칙의 정보가 있습니다.
- `state`: `RouterStateSnapshot` — 라우터의 현재 상태가 있습니다.

[일반적인 가드 반환 타입](#route-guard-return-types)을 반환할 수 있습니다.

```ts
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  return authService.isAuthenticated();
};
```

팁: 사용자를 리다이렉트해야 한다면 [`URLTree`](api/router/UrlTree)나 [`RedirectCommand`](api/router/RedirectCommand)를 반환하세요.
`false`를 반환한 다음 코드로 `navigate`를 실행하는 방식은 사용하지 **마세요**.

자세한 내용은 [CanActivateFn API 문서](api/router/CanActivateFn)를 참고하세요.

<!--
### CanActivateChild
-->

<a id="canactivatechild"></a>

### CanActivateChild

<!--
The `CanActivateChild` guard determines whether a user can access child routes of a particular parent route. This is useful when you want to protect an entire section of nested routes. In other words, `canActivateChild` runs for _all_ children. If there is a child component with another child component underneath of it, `canActivateChild` will run once for both components.

It has access to the following default arguments:

- `childRoute`: `ActivatedRouteSnapshot` - Contains information about the "future" snapshot (i.e., state the router is attempting to navigate to) of the child route being activated
- `state`: `RouterStateSnapshot` - Contains the router's current state

It can return the [standard return guard types](#route-guard-return-types).

```ts
export const adminChildGuard: CanActivateChildFn = (
  childRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  return authService.hasRole('admin');
};
```

For more information, check out the [API docs for CanActivateChildFn](api/router/CanActivateChildFn).
-->

`CanActivateChild` 가드는 사용자가 특정 부모 라우팅 규칙의 자식 라우팅 규칙에 접근할 수 있는지 결정합니다.
중첩 라우팅 규칙의 전체 영역을 보호하려는 경우에 유용합니다.
즉, `canActivateChild`는 _모든_ 자식에 적용됩니다.
자식 컴포넌트 아래에 또 다른 자식 컴포넌트가 있으면 `canActivateChild`는 두 컴포넌트에 대해 한 번 실행됩니다.

다음 기본 인자를 사용할 수 있습니다.

- `childRoute`: `ActivatedRouteSnapshot` — 활성화하려는 자식 라우팅 규칙의 "미래" 스냅샷(라우터가 이동하려는 상태) 정보가 있습니다.
- `state`: `RouterStateSnapshot` — 라우터의 현재 상태가 있습니다.

[일반적인 가드 반환 타입](#route-guard-return-types)을 반환할 수 있습니다.

```ts
export const adminChildGuard: CanActivateChildFn = (
  childRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  return authService.hasRole('admin');
};
```

자세한 내용은 [CanActivateChildFn API 문서](api/router/CanActivateChildFn)를 참고하세요.

<!--
### CanDeactivate
-->

<a id="candeactivate"></a>

### CanDeactivate

<!--
The `CanDeactivate` guard determines whether a user can leave a route. A common scenario is preventing navigation away from unsaved forms.

It has access to the following default arguments:

- `component`: `T` - The component instance being deactivated
- `currentRoute`: `ActivatedRouteSnapshot` - Contains information about the current route
- `currentState`: `RouterStateSnapshot` - Contains the current router state
- `nextState`: `RouterStateSnapshot` - Contains the next router state being navigated to

It can return the [standard return guard types](#route-guard-return-types).

```ts
export const unsavedChangesGuard: CanDeactivateFn<Form> = (
  component: Form,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot,
) => {
  return component.hasUnsavedChanges()
    ? confirm('You have unsaved changes. Are you sure you want to leave?')
    : true;
};
```

For more information, check out the [API docs for CanDeactivateFn](api/router/CanDeactivateFn).
-->

`CanDeactivate` 가드는 사용자가 라우팅 규칙을 떠날 수 있는지 결정합니다.
저장하지 않은 폼을 남겨두고 다른 곳으로 이동하지 못하게 하는 경우에 자주 사용합니다.

다음 기본 인자를 사용할 수 있습니다.

- `component`: `T` — 비활성화하려는 컴포넌트 인스턴스입니다.
- `currentRoute`: `ActivatedRouteSnapshot` — 현재 라우팅 규칙 정보가 있습니다.
- `currentState`: `RouterStateSnapshot` — 현재 라우터 상태가 있습니다.
- `nextState`: `RouterStateSnapshot` — 이동하려는 다음 라우터 상태가 있습니다.

[일반적인 가드 반환 타입](#route-guard-return-types)을 반환할 수 있습니다.

```ts
export const unsavedChangesGuard: CanDeactivateFn<Form> = (
  component: Form,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot,
) => {
  return component.hasUnsavedChanges()
    ? confirm('You have unsaved changes. Are you sure you want to leave?')
    : true;
};
```

자세한 내용은 [CanDeactivateFn API 문서](api/router/CanDeactivateFn)를 참고하세요.

<!--
### CanMatch
-->

<a id="canmatch"></a>

### CanMatch

<!--
The `CanMatch` guard determines whether a route can be matched during path matching. Unlike other guards, rejection falls through to try other matching routes instead of blocking navigation entirely. This can be useful for feature flags, A/B testing, or conditional route loading.

It has access to the following default arguments:

- `route`: `Route` - The route configuration being evaluated
- `segments`: `UrlSegment[]` - The URL segments that have not been consumed by previous parent route evaluations
- `currentSnapshot: PartialMatchRouteSnapshot` - The current route snapshot up to this point in the matching process

It can return the [standard return guard types](#route-guard-return-types), but when it returns `false`, Angular tries other matching routes instead of completely blocking navigation.

```ts
export const featureToggleGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[],
  currentSnapshot: PartialMatchRouteSnapshot,
) => {
  const featureService = inject(FeatureService);
  return featureService.isFeatureEnabled('newDashboard');
};
```

It can also allow you to use different components for the same path.

```ts
// 📄 routes.ts
const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboard,
    canMatch: [adminGuard],
  },
  {
    path: 'dashboard',
    component: UserDashboard,
    canMatch: [userGuard],
  },
];
```

In this example, when the user visits `/dashboard`, the first one that matches the correct guard will be used.

For more information, check out the [API docs for CanMatchFn](api/router/CanMatchFn).
-->

`CanMatch` 가드는 경로 매칭 과정에서 라우팅 규칙을 매칭할 수 있는지 결정합니다.
다른 가드와 달리 거부하더라도 내비게이션을 완전히 차단하지 않고 다음 라우팅 규칙의 매칭을 시도합니다.
기능 플래그, A/B 테스트, 조건부 라우팅 규칙 로딩에 유용합니다.

다음 기본 인자를 사용할 수 있습니다.

- `route`: `Route` — 평가 중인 라우팅 규칙 설정입니다.
- `segments`: `UrlSegment[]` — 앞서 부모 라우팅 규칙을 평가하면서 아직 처리하지 않은 URL 세그먼트입니다.
- `currentSnapshot: PartialMatchRouteSnapshot` — 매칭 과정에서 현재 지점까지의 라우팅 규칙 스냅샷입니다.

[일반적인 가드 반환 타입](#route-guard-return-types)을 반환할 수 있습니다.
다만 `false`를 반환하면 Angular는 내비게이션을 완전히 차단하는 대신 매칭할 수 있는 다른 라우팅 규칙을 확인합니다.

```ts
export const featureToggleGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[],
  currentSnapshot: PartialMatchRouteSnapshot,
) => {
  const featureService = inject(FeatureService);
  return featureService.isFeatureEnabled('newDashboard');
};
```

같은 경로에서 서로 다른 컴포넌트를 사용할 수도 있습니다.

```ts
// 📄 routes.ts
const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboard,
    canMatch: [adminGuard],
  },
  {
    path: 'dashboard',
    component: UserDashboard,
    canMatch: [userGuard],
  },
];
```

이 예제에서 사용자가 `/dashboard`에 방문하면 가드 조건을 충족하는 첫 번째 라우팅 규칙을 사용합니다.

자세한 내용은 [CanMatchFn API 문서](api/router/CanMatchFn)를 참고하세요.

<!--
## Applying guards to routes
-->

<a id="applying-guards-to-routes"></a>

## 라우팅 규칙에 가드 적용하기

<!--
Once you've created your route guards, you need to configure them in your route definitions.

Guards are specified as arrays in the route configuration in order to allow you to apply multiple guards to a single route. They are executed in the order they appear in the array.

```ts
import {Routes} from '@angular/router';
import {authGuard} from './guards/auth.guard';
import {adminGuard} from './guards/admin.guard';
import {canDeactivateGuard} from './guards/can-deactivate.guard';
import {featureToggleGuard} from './guards/feature-toggle.guard';

const routes: Routes = [
  // Basic CanActivate - requires authentication
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },

  // Multiple CanActivate guards - requires authentication AND admin role
  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard, adminGuard],
  },

  // CanActivate + CanDeactivate - protected route with unsaved changes check
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
    canDeactivate: [canDeactivateGuard],
  },

  // CanActivateChild - protects all child routes
  {
    path: 'users', // /user - NOT protected
    canActivateChild: [authGuard],
    children: [
      // /users/list - PROTECTED
      {path: 'list', component: UserList},
      // /users/detail/:id - PROTECTED
      {path: 'detail/:id', component: UserDetail},
    ],
  },

  // CanMatch - conditionally matches route based on feature flag
  {
    path: 'beta-feature',
    component: BetaFeature,
    canMatch: [featureToggleGuard],
  },

  // Fallback route if beta feature is disabled
  {
    path: 'beta-feature',
    component: ComingSoon,
  },
];
```
-->

라우팅 규칙 가드를 생성했으면 라우팅 규칙 정의에 설정해야 합니다.

하나의 라우팅 규칙에 여러 가드를 적용할 수 있도록 라우팅 규칙 설정에서는 가드를 배열로 지정합니다.
가드는 배열에 나열된 순서대로 실행됩니다.

```ts
import {Routes} from '@angular/router';
import {authGuard} from './guards/auth.guard';
import {adminGuard} from './guards/admin.guard';
import {canDeactivateGuard} from './guards/can-deactivate.guard';
import {featureToggleGuard} from './guards/feature-toggle.guard';

const routes: Routes = [
  // 기본 CanActivate: 인증이 필요합니다.
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },

  // 여러 CanActivate 가드: 인증과 관리자 역할이 모두 필요합니다.
  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard, adminGuard],
  },

  // CanActivate + CanDeactivate: 저장하지 않은 변경사항을 확인하는 보호 라우팅 규칙입니다.
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
    canDeactivate: [canDeactivateGuard],
  },

  // CanActivateChild: 모든 자식 라우팅 규칙을 보호합니다.
  {
    path: 'users', // /user: 보호되지 않습니다.
    canActivateChild: [authGuard],
    children: [
      // /users/list: 보호됩니다.
      {path: 'list', component: UserList},
      // /users/detail/:id: 보호됩니다.
      {path: 'detail/:id', component: UserDetail},
    ],
  },

  // CanMatch: 기능 플래그에 따라 조건부로 라우팅 규칙을 매칭합니다.
  {
    path: 'beta-feature',
    component: BetaFeature,
    canMatch: [featureToggleGuard],
  },

  // 베타 기능이 비활성화되었을 때 사용할 대체 라우팅 규칙
  {
    path: 'beta-feature',
    component: ComingSoon,
  },
];
```
