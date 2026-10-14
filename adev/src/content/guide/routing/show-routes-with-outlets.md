<!--
# Show routes with outlets
-->

<a id="show-routes-with-outlets"></a>

# 아웃렛으로 라우팅 규칙 표시하기

<!--
The `RouterOutlet` directive is a placeholder that marks the location where the router should render the component for the current URL.

```html
<app-header />
<!- Angular inserts your route content here ->
<router-outlet />
<app-footer />
```

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
```

In this example, if an application has the following routes defined:

```ts
import {Routes} from '@angular/router';
import {Home} from './home';
import {Products} from './products';

const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page',
  },
  {
    path: 'products',
    component: Products,
    title: 'Our Products',
  },
];
```

When a user visits `/products`, Angular renders the following:

```angular-html
<app-header />
<app-products />
<app-footer />
```

If the user goes back to the home page, then Angular renders:

```angular-html
<app-header />
<app-home />
<app-footer />
```

When displaying a route, the `<router-outlet>` element remains present in the DOM as a reference point for future navigations. Angular inserts routed content just after the outlet element as a sibling.

```angular-html
<!- Contents of the component's template ->
<app-header />
<router-outlet />
<app-footer />
```

```angular-html
<!- Content rendered on the page when the user visits /admin ->
<app-header />
<router-outlet />
<app-admin-page />
<app-footer />
```
-->

`RouterOutlet` 디렉티브는 현재 URL에 해당하는 컴포넌트를 라우터가 렌더링할 위치를 지정합니다.

```html
<app-header />
<!-- Angular는 여기에 라우팅 규칙 내용을 삽입합니다. -->
<router-outlet />
<app-footer />
```

```ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
```

이 예제의 애플리케이션에 다음 라우팅 규칙이 정의되어 있다고 가정해 보겠습니다.

```ts
import {Routes} from '@angular/router';
import {Home} from './home';
import {Products} from './products';

const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page',
  },
  {
    path: 'products',
    component: Products,
    title: 'Our Products',
  },
];
```

사용자가 `/products`에 방문하면 Angular는 다음과 같이 렌더링합니다.

```angular-html
<app-header />
<app-products />
<app-footer />
```

사용자가 홈페이지로 돌아가면 다음과 같이 렌더링합니다.

```angular-html
<app-header />
<app-home />
<app-footer />
```

라우팅 규칙을 표시할 때 `<router-outlet>` 엘리먼트는 이후 내비게이션의 기준점으로 DOM에 남아 있습니다.
Angular는 라우팅된 내용을 아웃렛 엘리먼트 바로 뒤에 형제 엘리먼트로 삽입합니다.

```angular-html
<!-- 컴포넌트 템플릿의 내용 -->
<app-header />
<router-outlet />
<app-footer />
```

```angular-html
<!-- 사용자가 /admin에 방문했을 때 페이지에 렌더링되는 내용 -->
<app-header />
<router-outlet />
<app-admin-page />
<app-footer />
```

<!--
## Nesting routes with child routes
-->

<a id="nesting-routes-with-child-routes"></a>

## 자식 라우팅 규칙으로 라우팅 규칙 중첩하기

<!--
As your application grows more complex, you might want to create routes that are relative to a component other than your root component. This enables you to create experiences where only part of the application changes when the URL changes, as opposed to the users feeling like the entire page is refreshed.

These types of nested routes are called child routes. This means you're adding a second `<router-outlet>` to your app, because it is in addition to the `<router-outlet>` in AppComponent.

In this example, the `Settings` component will display the desired panel based on what the user selects. One of the unique things you’ll notice about child routes is that the component often has its own `<nav>` and `<router-outlet>`.

```angular-html
<h1>Settings</h1>
<nav>
  <ul>
    <li><a routerLink="profile">Profile</a></li>
    <li><a routerLink="security">Security</a></li>
  </ul>
</nav>
<router-outlet />
```

A child route is like any other route, in that it needs both a `path` and a `component`. The one difference is that you place child routes in a children array within the parent route.

```ts
const routes: Routes = [
  {
    path: 'settings',
    component: Settings, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'profile', // child route path
        component: Profile, // child route component that the router renders
      },
      {
        path: 'security',
        component: Security, // another child route component that the router renders
      },
    ],
  },
];
```

Once both the `routes` and `<router-outlet>` are configured correctly, your application is now using nested routes!
-->

애플리케이션이 복잡해지면 루트 컴포넌트가 아닌 다른 컴포넌트를 기준으로 라우팅 규칙을 구성하고 싶을 수 있습니다.
이렇게 하면 URL이 바뀔 때 전체 페이지가 새로 고쳐지는 느낌 대신 애플리케이션의 일부만 바뀌는 화면을 구성할 수 있습니다.

이런 중첩 라우팅 규칙을 자식 라우팅 규칙이라고 합니다.
AppComponent의 `<router-outlet>`에 더해 애플리케이션에 두 번째 `<router-outlet>`을 추가하는 방식입니다.

이 예제의 `Settings` 컴포넌트는 사용자 선택에 따라 원하는 패널을 표시합니다.
자식 라우팅 규칙의 특징 중 하나는 컴포넌트가 자체 `<nav>`와 `<router-outlet>`을 갖는 경우가 많다는 점입니다.

```angular-html
<h1>Settings</h1>
<nav>
  <ul>
    <li><a routerLink="profile">Profile</a></li>
    <li><a routerLink="security">Security</a></li>
  </ul>
</nav>
<router-outlet />
```

자식 라우팅 규칙도 다른 라우팅 규칙과 마찬가지로 `path`와 `component`가 필요합니다.
다른 점은 부모 라우팅 규칙의 children 배열에 자식 라우팅 규칙을 배치한다는 것입니다.

```ts
const routes: Routes = [
  {
    path: 'settings',
    component: Settings, // 템플릿에 <router-outlet>이 있는 컴포넌트입니다.
    children: [
      {
        path: 'profile', // 자식 라우팅 규칙 경로
        component: Profile, // 라우터가 렌더링하는 자식 라우팅 규칙 컴포넌트
      },
      {
        path: 'security',
        component: Security, // 라우터가 렌더링하는 다른 자식 라우팅 규칙 컴포넌트
      },
    ],
  },
];
```

`routes`와 `<router-outlet>`을 모두 올바르게 설정하면 애플리케이션에서 중첩 라우팅 규칙을 사용할 수 있습니다!

<!--
## Secondary routes with named outlets
-->

<a id="secondary-routes-with-named-outlets"></a>

## 이름이 있는 아웃렛으로 보조 라우팅 규칙 구성하기

<!--
Pages may have multiple outlets— you can assign a name to each outlet to specify which content belongs to which outlet.

```angular-html
<app-header />
<router-outlet />
<router-outlet name="read-more" />
<router-outlet name="additional-actions" />
<app-footer />
```

Each outlet must have a unique name. The name cannot be set or changed dynamically. By default, the name is `'primary'`.

Angular matches the outlet's name to the `outlet` property defined on each route:

```ts
{
  path: 'user/:id',
  component: UserDetails,
  outlet: 'additional-actions'
}
```
-->

페이지에는 여러 아웃렛을 둘 수 있습니다.
각 아웃렛에 이름을 지정하면 어떤 내용을 어느 아웃렛에 표시할지 결정할 수 있습니다.

```angular-html
<app-header />
<router-outlet />
<router-outlet name="read-more" />
<router-outlet name="additional-actions" />
<app-footer />
```

각 아웃렛의 이름은 고유해야 합니다.
이름은 동적으로 설정하거나 변경할 수 없습니다.
기본 이름은 `'primary'`입니다.

Angular는 아웃렛 이름을 각 라우팅 규칙에 정의한 `outlet` 프로퍼티와 매칭합니다.

```ts
{
  path: 'user/:id',
  component: UserDetails,
  outlet: 'additional-actions'
}
```

<!--
## Outlet lifecycle events
-->

<a id="outlet-lifecycle-events"></a>

## 아웃렛 생명주기 이벤트

<!--
There are four lifecycle events that a router outlet can emit:

| Event        | Description                                                              |
| ------------ | ------------------------------------------------------------------------ |
| `activate`   | When a new component is instantiated                                     |
| `deactivate` | When a component is destroyed                                            |
| `attach`     | When the `RouteReuseStrategy` instructs the outlet to attach the subtree |
| `detach`     | When the `RouteReuseStrategy` instructs the outlet to detach the subtree |

You can add event listeners with the standard event binding syntax:

```angular-html
<router-outlet
  (activate)="onActivate($event)"
  (deactivate)="onDeactivate($event)"
  (attach)="onAttach($event)"
  (detach)="onDetach($event)"
/>
```

Check out the [API docs for RouterOutlet](/api/router/RouterOutlet?tab=api) if you’d like to learn more.
-->

라우터 아웃렛은 네 가지 생명주기 이벤트를 발생시킬 수 있습니다.

| 이벤트       | 설명                                                                         |
| ------------ | ---------------------------------------------------------------------------- |
| `activate`   | 새 컴포넌트 인스턴스가 생성될 때 발생합니다.                                 |
| `deactivate` | 컴포넌트가 종료될 때 발생합니다.                                             |
| `attach`     | `RouteReuseStrategy`가 아웃렛에 하위 트리를 연결하도록 지시할 때 발생합니다. |
| `detach`     | `RouteReuseStrategy`가 아웃렛에 하위 트리를 분리하도록 지시할 때 발생합니다. |

일반적인 이벤트 바인딩 문법으로 이벤트 리스너를 추가할 수 있습니다.

```angular-html
<router-outlet
  (activate)="onActivate($event)"
  (deactivate)="onDeactivate($event)"
  (attach)="onAttach($event)"
  (detach)="onDetach($event)"
/>
```

자세한 내용은 [RouterOutlet API 문서](/api/router/RouterOutlet?tab=api)를 참고하세요.

<!--
## Passing contextual data to routed components
-->

<a id="passing-contextual-data-to-routed-components"></a>

## 라우팅된 컴포넌트에 컨텍스트 데이터 전달하기

<!--
Passing contextual data to routed components often requires global state or complicated route configurations. To make this easier, each `RouterOutlet` supports a `routerOutletData` input. Routed components and their children can read this data as a signal using the `ROUTER_OUTLET_DATA` injection token, allowing outlet-specific configuration without modifying route definitions.

```angular-ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  template: `
    <h2>Dashboard</h2>
    <router-outlet [routerOutletData]="{layout: 'sidebar'}" />
  `,
})
export class Dashboard {}
```

The routed component can inject the provided outlet data using `ROUTER_OUTLET_DATA`:

```angular-ts
import {Component, inject} from '@angular/core';
import {ROUTER_OUTLET_DATA} from '@angular/router';

@Component({
  selector: 'app-stats',
  template: `<p>Stats view (layout: {{ outletData().layout }})</p>`,
})
export class Stats {
  outletData = inject(ROUTER_OUTLET_DATA) as Signal<{layout: string}>;
}
```

When Angular activates the `Stats` in that outlet, it receives `{ layout: 'sidebar' }` as injected data.

NOTE: When the `routerOutletData` input is unset, the injected signal's value is `undefined` by default.

---
-->

라우팅된 컴포넌트에 컨텍스트 데이터를 전달하려면 전역 상태나 복잡한 라우팅 규칙 설정이 필요한 경우가 많습니다.
이를 간단하게 처리할 수 있도록 각 `RouterOutlet`은 `routerOutletData` 입력 프로퍼티를 지원합니다.
라우팅된 컴포넌트와 그 자식 컴포넌트에서는 `ROUTER_OUTLET_DATA` 의존성 주입 토큰으로 이 데이터를 시그널 형태로 읽을 수 있습니다.
따라서 라우팅 규칙 정의를 수정하지 않고 아웃렛별로 설정을 전달할 수 있습니다.

```angular-ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  template: `
    <h2>Dashboard</h2>
    <router-outlet [routerOutletData]="{layout: 'sidebar'}" />
  `,
})
export class Dashboard {}
```

라우팅된 컴포넌트에서는 `ROUTER_OUTLET_DATA`로 아웃렛이 제공한 데이터를 주입받을 수 있습니다.

```angular-ts
import {Component, inject} from '@angular/core';
import {ROUTER_OUTLET_DATA} from '@angular/router';

@Component({
  selector: 'app-stats',
  template: `<p>Stats view (layout: {{ outletData().layout }})</p>`,
})
export class Stats {
  outletData = inject(ROUTER_OUTLET_DATA) as Signal<{layout: string}>;
}
```

Angular가 해당 아웃렛에서 `Stats`를 활성화하면 `{ layout: 'sidebar' }`가 데이터로 주입됩니다.

참고: `routerOutletData` 입력 프로퍼티를 지정하지 않으면 주입된 시그널의 기본값은 `undefined`입니다.

---

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
Learn how to [navigate to routes](/guide/routing/navigate-to-routes) with Angular Router.
-->

Angular 라우터로 [라우팅 규칙 사이를 이동하는 방법](/guide/routing/navigate-to-routes)을 알아보세요.
