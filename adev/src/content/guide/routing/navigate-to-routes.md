<!--
# Navigate to routes
-->

<a id="navigate-to-routes"></a>

# 라우팅 규칙 사이 이동하기

<!--
The RouterLink directive is Angular's declarative approach to navigation. It allows you to use standard anchor elements (`<a>`) that seamlessly integrate with Angular's routing system.
-->

RouterLink 디렉티브는 Angular에서 선언적으로 내비게이션을 구성하는 방식입니다.
표준 앵커 엘리먼트(`<a>`)를 Angular 라우팅 시스템과 자연스럽게 연결해서 사용할 수 있습니다.

<!--
## How to use RouterLink
-->

<a id="how-to-use-routerlink"></a>

## RouterLink 사용하기

<!--
Instead of using regular anchor elements `<a>` with an `href` attribute, you add a RouterLink directive with the appropriate path in order to leverage Angular routing.

```angular-ts
import {RouterLink} from '@angular/router';

@Component({
  template: `
    <nav>
      <a routerLink="/user-profile">User profile</a>
      <a routerLink="/settings">Settings</a>
    </nav>
  `,
  imports: [RouterLink],
  ...
})
export class App {}
```
-->

`href` 어트리뷰트가 있는 일반적인 앵커 엘리먼트 `<a>` 대신 RouterLink 디렉티브에 경로를 지정하면 Angular 라우팅을 사용할 수 있습니다.

```angular-ts
import {RouterLink} from '@angular/router';

@Component({
  template: `
    <nav>
      <a routerLink="/user-profile">User profile</a>
      <a routerLink="/settings">Settings</a>
    </nav>
  `,
  imports: [RouterLink],
  ...
})
export class App {}
```

<!--
### Using absolute or relative links
-->

<a id="using-absolute-or-relative-links"></a>

### 절대 링크와 상대 링크 사용하기

<!--
**Relative URLs** in Angular routing allow you to define navigation paths relative to the current route's location. This is in contrast to **absolute URLs** which contain the full path with the protocol (e.g., `http://`) and the **root domain** (e.g., `google.com`).

```angular-html
<!- Absolute URL ->
<a href="https://www.angular.dev/essentials">Angular Essentials Guide</a>

<!- Relative URL ->
<a href="/essentials">Angular Essentials Guide</a>
```

In this example, the first example contains the full path with the protocol (i.e., `https://`) and the root domain (i.e., `angular.dev`) explicitly defined for the essentials page. In contrast, the second example assumes the user is already on the correct root domain for `/essentials`.

Generally speaking, relative URLs are preferred as they are more maintainable across applications since they don’t need to know their absolute position within the routing hierarchy.
-->

Angular 라우팅의 **상대 URL**을 사용하면 현재 라우팅 규칙 위치를 기준으로 이동할 경로를 정의할 수 있습니다.
프로토콜(예: `http://`)과 **루트 도메인**(예: `google.com`)을 포함한 전체 경로를 지정하는 **절대 URL**과는 다릅니다.

```angular-html
<!-- 절대 URL -->
<a href="https://www.angular.dev/essentials">Angular Essentials Guide</a>

<!-- 상대 URL -->
<a href="/essentials">Angular Essentials Guide</a>
```

첫 번째 예제는 핵심 가이드 페이지의 전체 경로에 프로토콜(`https://`)과 루트 도메인(`angular.dev`)을 명시합니다.
반면 두 번째 예제는 사용자가 이미 `/essentials`에 해당하는 올바른 루트 도메인에 있다고 가정합니다.

일반적으로 상대 URL을 권장합니다.
라우팅 계층에서 절대 위치를 알 필요가 없기 때문에 여러 애플리케이션에서 유지보수하기 쉽습니다.

<!--
### How relative URLs work
-->

<a id="how-relative-urls-work"></a>

### 상대 URL의 동작 방식

<!--
Angular routing has two syntaxes for defining relative URLs: strings and arrays.

```angular-html
<!- Navigates user to /dashboard ->
<a routerLink="dashboard">Dashboard</a>
<a [routerLink]="['dashboard']">Dashboard</a>
```

HELPFUL: Passing a string is the most common way to define relative URLs.

When you need to define dynamic parameters in a relative URL, use the array syntax:

```angular-html
<a [routerLink]="['user', currentUserId]">Current User</a>
```

In addition, Angular routing allows you to specify whether you want the path to be relative to the current URL or to the root domain based on whether the relative path is prefixed with a forward slash (`/`) or not.

For example, if the user is on `example.com/settings`, here is how different relative paths can be defined for various scenarios:

```angular-html
<!- Navigates to /settings/notifications ->
<a routerLink="notifications">Notifications</a>
<a routerLink="/settings/notifications">Notifications</a>

<!- Navigates to /team/:teamId/user/:userId ->
<a routerLink="/team/123/user/456">User 456</a>
<a [routerLink]="['/team', teamId, 'user', userId]">Current User</a>
```
-->

Angular 라우팅에서는 문자열과 배열, 두 가지 문법으로 상대 URL을 정의할 수 있습니다.

```angular-html
<!-- 사용자를 /dashboard로 이동시킵니다. -->
<a routerLink="dashboard">Dashboard</a>
<a [routerLink]="['dashboard']">Dashboard</a>
```

참고: 상대 URL을 정의할 때는 문자열을 전달하는 방식이 가장 흔합니다.

상대 URL에 동적 파라미터를 지정해야 한다면 배열 문법을 사용하세요.

```angular-html
<a [routerLink]="['user', currentUserId]">Current User</a>
```

Angular 라우팅에서는 상대 경로 앞에 슬래시(`/`)가 있는지에 따라 현재 URL을 기준으로 할지, 루트 도메인을 기준으로 할지도 지정할 수 있습니다.

예를 들어 사용자가 `example.com/settings`에 있다면 상황에 따라 다음과 같이 상대 경로를 정의할 수 있습니다.

```angular-html
<!-- /settings/notifications로 이동합니다. -->
<a routerLink="notifications">Notifications</a>
<a routerLink="/settings/notifications">Notifications</a>

<!-- /team/:teamId/user/:userId로 이동합니다. -->
<a routerLink="/team/123/user/456">User 456</a>
<a [routerLink]="['/team', teamId, 'user', userId]">Current User</a>
```

<!--
## Programmatic navigation to routes
-->

<a id="programmatic-navigation-to-routes"></a>

## 코드로 라우팅 규칙 사이 이동하기

<!--
While `RouterLink` handles declarative navigation in templates, Angular provides programmatic navigation for scenarios where you need to navigate based on logic, user actions, or application state. By injecting `Router`, you can dynamically navigate to routes, pass parameters, and control navigation behavior in your TypeScript code.
-->

`RouterLink`는 템플릿에서 선언적으로 내비게이션을 처리합니다.
로직, 사용자 동작, 애플리케이션 상태에 따라 이동해야 하는 경우에는 Angular가 제공하는 코드 기반 내비게이션을 사용할 수 있습니다.
`Router`를 주입하면 TypeScript 코드에서 동적으로 라우팅 규칙 사이를 이동하고, 파라미터를 전달하고, 내비게이션 동작을 제어할 수 있습니다.

<!--
### `router.navigate()`
-->


### `router.navigate()`

<!--
You can use the `router.navigate()` method to programmatically navigate between routes by specifying a URL path array.

```angular-ts
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: ` <button (click)="navigateToProfile()">View Profile</button> `,
})
export class AppDashboard {
  private router = inject(Router);

  navigateToProfile() {
    // Standard navigation
    this.router.navigate(['/profile']);

    // With route parameters
    this.router.navigate(['/users', userId]);

    // With query parameters
    this.router.navigate(['/search'], {
      queryParams: {category: 'books', sort: 'price'},
    });

    // With matrix parameters
    this.router.navigate(['/products', {featured: true, onSale: true}]);
  }
}
```

`router.navigate()` supports both simple and complex routing scenarios, allowing you to pass route parameters, [query parameters](/guide/routing/read-route-state#query-parameters), and control navigation behavior.

You can also build dynamic navigation paths relative to your component’s location in the routing tree using the `relativeTo` option.

```angular-ts
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  template: `
    <button (click)="navigateToEdit()">Edit User</button>
    <button (click)="navigateToParent()">Back to List</button>
  `,
})
export class UserDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Navigate to a sibling route
  navigateToEdit() {
    // From: /users/123
    // To:   /users/123/edit
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  // Navigate to parent
  navigateToParent() {
    // From: /users/123
    // To:   /users
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  navigateToList() {
    // Angular resolves the commands array as a single navigation path relative to the current route.
    // From: /users/123
    // Result: /users/list
    this.router.navigate(['..', 'list'], {relativeTo: this.route});
  }
}
```

When navigating multiple levels up, all `..` segments must be in the **first element** of the commands array. The router only parses `..` from the first command string — subsequent array elements are treated as literal path segments.

```angular-ts {prefer}
// From: /team/123/users/456
// Result: /team/123/settings
this.router.navigate(['../../settings'], {relativeTo: this.route});
```

When using `relativeTo`, never prefix the first command with `/`. A leading `/` makes the navigation absolute and ignores `relativeTo` entirely.

```angular-ts {prefer}
// From: /team/123/users/456
// Result: /team/123/users/456/edit
this.router.navigate(['edit'], {relativeTo: this.route});
```

```angular-ts {avoid}
// From: /team/123/users/456
// Leading '/' causes absolute navigation — relativeTo is ignored
// Result: /edit
this.router.navigate(['/edit'], {relativeTo: this.route});
```
-->

`router.navigate()` 메서드에 URL 경로 배열을 지정하면 코드로 라우팅 규칙 사이를 이동할 수 있습니다.

```angular-ts
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: ` <button (click)="navigateToProfile()">View Profile</button> `,
})
export class AppDashboard {
  private router = inject(Router);

  navigateToProfile() {
    // 기본 내비게이션
    this.router.navigate(['/profile']);

    // 라우팅 규칙 파라미터 사용
    this.router.navigate(['/users', userId]);

    // 쿼리 파라미터 사용
    this.router.navigate(['/search'], {
      queryParams: {category: 'books', sort: 'price'},
    });

    // 매트릭스 파라미터 사용
    this.router.navigate(['/products', {featured: true, onSale: true}]);
  }
}
```

`router.navigate()`는 간단한 라우팅부터 복잡한 라우팅까지 지원합니다.
라우팅 규칙 파라미터와 [쿼리 파라미터](/guide/routing/read-route-state#query-parameters)를 전달하고 내비게이션 동작을 제어할 수 있습니다.

`relativeTo` 옵션을 사용하면 라우팅 트리에서 컴포넌트가 있는 위치를 기준으로 동적 이동 경로를 구성할 수도 있습니다.

```angular-ts
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  template: `
    <button (click)="navigateToEdit()">Edit User</button>
    <button (click)="navigateToParent()">Back to List</button>
  `,
})
export class UserDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // 형제 라우팅 규칙으로 이동합니다.
  navigateToEdit() {
    // 출발: /users/123
    // 도착:   /users/123/edit
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  // 부모로 이동합니다.
  navigateToParent() {
    // 출발: /users/123
    // 도착:   /users
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  navigateToList() {
    // Angular는 명령 배열을 현재 라우팅 규칙 기준의 단일 이동 경로로 해석합니다.
    // 출발: /users/123
    // 결과: /users/list
    this.router.navigate(['..', 'list'], {relativeTo: this.route});
  }
}
```

여러 단계 위로 이동할 때는 모든 `..` 세그먼트를 명령 배열의 **첫 번째 항목**에 넣어야 합니다.
라우터는 첫 번째 명령 문자열에서만 `..`를 해석하며, 그 뒤의 배열 항목은 일반 경로 세그먼트로 처리합니다.

```angular-ts {prefer}
// 출발: /team/123/users/456
// 결과: /team/123/settings
this.router.navigate(['../../settings'], {relativeTo: this.route});
```

`relativeTo`를 사용할 때는 첫 번째 명령 앞에 `/`를 붙이지 마세요.
맨 앞에 `/`가 있으면 절대 경로 내비게이션이 되며 `relativeTo`는 완전히 무시됩니다.

```angular-ts {prefer}
// 출발: /team/123/users/456
// 결과: /team/123/users/456/edit
this.router.navigate(['edit'], {relativeTo: this.route});
```

```angular-ts {avoid}
// 출발: /team/123/users/456
// 맨 앞에 '/'가 있으면 절대 경로로 이동하며 relativeTo는 무시됩니다.
// 결과: /edit
this.router.navigate(['/edit'], {relativeTo: this.route});
```

<!--
### `router.navigateByUrl()`
-->


### `router.navigateByUrl()`

<!--
The `router.navigateByUrl()` method provides a direct way to programmatically navigate using URL path strings rather than array segments. This method is ideal when you have a full URL path and need to perform absolute navigation, especially when working with externally provided URLs or deep linking scenarios.

```ts
// Standard route navigation
router.navigateByUrl('/products');

// Navigate to nested route
router.navigateByUrl('/products/featured');

// Complete URL with parameters and fragment
router.navigateByUrl('/products/123?view=details#reviews');

// Navigate with query parameters
router.navigateByUrl('/search?category=books&sortBy=price');

// With matrix parameters
router.navigateByUrl('/sales-awesome;isOffer=true;showModal=false');
```

In the event you need to replace the current URL in history, `navigateByUrl` also accepts a configuration object that has a `replaceUrl` option.

```ts
// Replace current URL in history
router.navigateByUrl('/checkout', {
  replaceUrl: true,
});
```
-->

`router.navigateByUrl()` 메서드는 세그먼트 배열 대신 URL 경로 문자열로 직접 내비게이션을 실행합니다.
전체 URL 경로가 있고 절대 경로로 이동해야 할 때 적합하며, 특히 외부에서 받은 URL이나 딥 링크를 처리할 때 유용합니다.

```ts
// 기본 라우팅 규칙 내비게이션
router.navigateByUrl('/products');

// 중첩 라우팅 규칙으로 이동합니다.
router.navigateByUrl('/products/featured');

// 파라미터와 프래그먼트가 있는 전체 URL
router.navigateByUrl('/products/123?view=details#reviews');

// 쿼리 파라미터와 함께 이동합니다.
router.navigateByUrl('/search?category=books&sortBy=price');

// 매트릭스 파라미터 사용
router.navigateByUrl('/sales-awesome;isOffer=true;showModal=false');
```

히스토리의 현재 URL을 교체해야 한다면 `navigateByUrl`에 `replaceUrl` 옵션이 있는 설정 객체를 전달할 수도 있습니다.

```ts
// 히스토리의 현재 URL을 교체합니다.
router.navigateByUrl('/checkout', {
  replaceUrl: true,
});
```

<!--
### Display a different URL in the address bar
-->

<a id="display-a-different-url-in-the-address-bar"></a>

### 주소 표시줄에 다른 URL 표시하기

<!--
You can pass a browserUrl option to navigateByUrl to display a different URL in the browser's address bar than the one used for route matching.

This is useful when you want to redirect a user to a different route—such as an error page—without changing the URL that the user originally tried to visit.

```ts
router.navigateByUrl('/not-found', {browserUrl: '/products/missing-item'});
```

Angular navigates to and renders the `/not-found` route, but the browser address bar shows `/products/missing-item`.

NOTE: `browserUrl` only affects what appears in the browser's address bar.
-->

navigateByUrl에 browserUrl 옵션을 전달하면 라우팅 규칙 매칭에 사용하는 URL과 다른 URL을 브라우저 주소 표시줄에 표시할 수 있습니다.

사용자가 처음 방문하려던 URL을 유지하면서 다른 라우팅 규칙(예: 오류 페이지)으로 리다이렉트하고 싶을 때 유용합니다.

```ts
router.navigateByUrl('/not-found', {browserUrl: '/products/missing-item'});
```

Angular는 `/not-found` 라우팅 규칙으로 이동해서 렌더링하지만, 브라우저 주소 표시줄에는 `/products/missing-item`이 표시됩니다.

참고: `browserUrl`은 브라우저 주소 표시줄에 표시되는 내용에만 영향을 줍니다.

<!--
## Customizing the browser URL with RouterLink
-->

<a id="customizing-the-browser-url-with-routerlink"></a>

## RouterLink로 브라우저 URL 조정하기

<!--
The `RouterLink` directive also supports a `browserUrl` input, which lets you control the URL displayed in the browser's address bar when a link is clicked, independently of the route Angular navigates to.

```angular-html
<!- Navigates to /dashboard, but the address bar shows /home ->
<a [routerLink]="['/dashboard']" [browserUrl]="'/home'">Go to Dashboard</a>
```

You can also bind a `UrlTree` for more dynamic use cases:

```angular-ts
import {Component, inject} from '@angular/core';
import {Router, RouterLink, UrlTree} from '@angular/router';

@Component({
  template: `
    <a [routerLink]="['/products', product.id]" [browserUrl]="displayUrl">
      {{ product.name }}
    </a>
  `,
  imports: [RouterLink],
})
export class ProductList {
  private router = inject(Router);

  product = {id: 42, name: 'Widget'};

  // Create a UrlTree to display in the address bar
  displayUrl: UrlTree = this.router.createUrlTree(['/products', 'widget']);
}
```
-->

`RouterLink` 디렉티브도 `browserUrl` 입력 프로퍼티를 지원합니다.
따라서 링크를 클릭했을 때 Angular가 이동하는 라우팅 규칙과 별개로 브라우저 주소 표시줄에 표시할 URL을 제어할 수 있습니다.

```angular-html
<!-- /dashboard로 이동하지만 주소 표시줄에는 /home을 표시합니다. -->
<a [routerLink]="['/dashboard']" [browserUrl]="'/home'">Go to Dashboard</a>
```

더 동적인 처리가 필요하면 `UrlTree`를 바인딩할 수도 있습니다.

```angular-ts
import {Component, inject} from '@angular/core';
import {Router, RouterLink, UrlTree} from '@angular/router';

@Component({
  template: `
    <a [routerLink]="['/products', product.id]" [browserUrl]="displayUrl">
      {{ product.name }}
    </a>
  `,
  imports: [RouterLink],
})
export class ProductList {
  private router = inject(Router);

  product = {id: 42, name: 'Widget'};

  // 주소 표시줄에 표시할 UrlTree를 생성합니다.
  displayUrl: UrlTree = this.router.createUrlTree(['/products', 'widget']);
}
```

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
Learn how to [read route state](/guide/routing/read-route-state) to create responsive and context-aware components.
-->

[라우팅 규칙 상태를 읽는 방법](/guide/routing/read-route-state)을 알아보고, 변화와 컨텍스트에 반응하는 컴포넌트를 만들어 보세요.
