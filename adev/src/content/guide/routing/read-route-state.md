<!--
# Read route state
-->

<a id="read-route-state"></a>

# 라우팅 규칙 상태 읽기

<!--
Angular Router allows you to read and use information associated with a route to create responsive and context-aware components.
-->

Angular 라우터를 사용하면 라우팅 규칙에 연결된 정보를 읽고 활용해서 변화와 컨텍스트에 반응하는 컴포넌트를 만들 수 있습니다.

<!--
## Get information about the current route with ActivatedRoute
-->

<a id="get-information-about-the-current-route-with-activatedroute"></a>

## ActivatedRoute로 현재 라우팅 규칙 정보 가져오기

<!--
`ActivatedRoute` is a service from `@angular/router` that provides all the information associated with the current route.

```angular-ts
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
})
export class Product {
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    console.log(this.activatedRoute);
  }
}
```

The `ActivatedRoute` can provide different information about the route. Some common properties include:

| Property      | Details                                                                                                                           |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| `url`         | An `Observable` of the route paths, represented as an array of `UrlSegment` objects for each part of the route path.              |
| `data`        | An `Observable` that contains the `data` object provided for the route. Also contains any resolved values from the resolve guard. |
| `params`      | An `Observable` that contains the required and optional parameters specific to the route.                                         |
| `queryParams` | An `Observable` that contains the query parameters available to all routes.                                                       |
| `resources` | An optional record of `Resource` instances defined on the route (when `withRouterResources` is enabled). |

Check out the [`ActivatedRoute` API docs](/api/router/ActivatedRoute) for a complete list of what you can access with in the route.
-->

`ActivatedRoute`는 현재 라우팅 규칙에 연결된 모든 정보를 제공하는 `@angular/router`의 서비스입니다.

```angular-ts
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
})
export class Product {
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    console.log(this.activatedRoute);
  }
}
```

`ActivatedRoute`는 라우팅 규칙의 다양한 정보를 제공합니다.
자주 사용하는 프로퍼티는 다음과 같습니다.

| 프로퍼티      | 설명                                                                                                     |
| :------------ | :------------------------------------------------------------------------------------------------------- |
| `url`         | 라우팅 규칙 경로의 `Observable`입니다. 라우팅 규칙 경로의 각 부분을 `UrlSegment` 객체 배열로 나타냅니다. |
| `data`        | 라우팅 규칙에 제공한 `data` 객체를 포함하는 `Observable`입니다. resolve 가드에서 가져온 값도 포함합니다. |
| `params`      | 해당 라우팅 규칙의 필수 파라미터와 선택 파라미터를 포함하는 `Observable`입니다.                          |
| `queryParams` | 모든 라우팅 규칙에서 사용할 수 있는 쿼리 파라미터를 포함하는 `Observable`입니다.                         |
| `resources`   | 라우팅 규칙에 정의된 `Resource` 인스턴스의 선택적 레코드입니다(`withRouterResources`를 활성화한 경우).   |

라우팅 규칙에서 접근할 수 있는 전체 정보는 [`ActivatedRoute` API 문서](/api/router/ActivatedRoute)를 참고하세요.

<!--
## Understanding route snapshots
-->

<a id="understanding-route-snapshots"></a>

## 라우팅 규칙 스냅샷 이해하기

<!--
Page navigations are events over time, and you can access the router state at a given time by retrieving a route snapshot.

Route snapshots contain essential information about the route, including its parameters, data, and child routes. In addition, snapshots are static and will not reflect future changes.

Here’s an example of how you’d access a route snapshot:

```angular-ts
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

@Component(/* ... */)
export class UserProfile {
  readonly userId: string;
  private route = inject(ActivatedRoute);

  constructor() {
    // Example URL: https://www.angular.dev/users/123?role=admin&status=active#contact

    // Access route parameters from snapshot
    this.userId = this.route.snapshot.paramMap.get('id');

    // Access multiple route elements
    const snapshot = this.route.snapshot;
    console.log({
      url: snapshot.url, // Array of UrlSegments matched by this route
      // Route parameters object: {id: '123'}
      params: snapshot.params,
      // Query parameters object: {role: 'admin', status: 'active'}
      queryParams: snapshot.queryParams, // Query parameters
    });
  }
}
```

Check out the [`ActivatedRoute` API docs](/api/router/ActivatedRoute) and [`ActivatedRouteSnapshot` API docs](/api/router/ActivatedRouteSnapshot) for a complete list of all properties you can access.
-->

페이지 내비게이션은 시간에 따라 발생하는 이벤트입니다.
라우팅 규칙 스냅샷을 가져오면 특정 시점의 라우터 상태에 접근할 수 있습니다.

라우팅 규칙 스냅샷에는 파라미터, 데이터, 자식 라우팅 규칙 등 라우팅 규칙의 핵심 정보가 포함됩니다.
스냅샷은 정적이므로 이후에 발생하는 변화는 반영하지 않습니다.

라우팅 규칙 스냅샷에는 다음과 같이 접근할 수 있습니다.

```angular-ts
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

@Component(/* ... */)
export class UserProfile {
  readonly userId: string;
  private route = inject(ActivatedRoute);

  constructor() {
    // 예제 URL: https://www.angular.dev/users/123?role=admin&status=active#contact

    // 스냅샷에서 라우팅 규칙 파라미터에 접근합니다.
    this.userId = this.route.snapshot.paramMap.get('id');

    // 여러 라우팅 규칙 정보에 접근합니다.
    const snapshot = this.route.snapshot;
    console.log({
      url: snapshot.url, // Array of UrlSegments matched by this route
      // 라우팅 규칙 파라미터 객체: {id: '123'}
      params: snapshot.params,
      // 쿼리 파라미터 객체: {role: 'admin', status: 'active'}
      queryParams: snapshot.queryParams, // 쿼리 파라미터
    });
  }
}
```

접근할 수 있는 전체 프로퍼티는 [`ActivatedRoute` API 문서](/api/router/ActivatedRoute)와 [`ActivatedRouteSnapshot` API 문서](/api/router/ActivatedRouteSnapshot)를 참고하세요.

<!--
## Reading parameters on a route
-->

<a id="reading-parameters-on-a-route"></a>

## 라우팅 규칙 파라미터 읽기

<!--
There are two types of parameters that developers can utilize from a route: route and query parameters.
-->

라우팅 규칙에서는 라우팅 규칙 파라미터와 쿼리 파라미터를 사용할 수 있습니다.

<!--
### Route Parameters
-->

<a id="route-parameters"></a>

### 라우팅 규칙 파라미터

<!--
Route parameters allow you to pass data to a component through the URL. This is useful when you want to display specific content based on an identifier in the URL, like a user ID or a product ID.

You can [define route parameters](/guide/routing/define-routes#define-url-paths-with-route-parameters) by prefixing the parameter name with a colon (`:`).

```angular-ts
import {Routes} from '@angular/router';
import {Product} from './product';

const routes: Routes = [{path: 'product/:id', component: Product}];
```

You can access parameters by subscribing to `route.params`.

```angular-ts
import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  template: `<h1>Product Details: {{ productId() }}</h1>`,
})
export class ProductDetail {
  productId = signal('');
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    // Access route parameters
    this.activatedRoute.params.subscribe((params) => {
      this.productId.set(params['id']);
    });
  }
}
```
-->

라우팅 규칙 파라미터는 URL을 통해 컴포넌트에 데이터를 전달하는 방식입니다.
사용자 ID나 상품 ID처럼 URL의 식별자를 기준으로 특정 내용을 표시할 때 유용합니다.

파라미터 이름 앞에 콜론(`:`)을 붙이면 [라우팅 규칙 파라미터를 정의](/guide/routing/define-routes#define-url-paths-with-route-parameters)할 수 있습니다.

```angular-ts
import {Routes} from '@angular/router';
import {Product} from './product';

const routes: Routes = [{path: 'product/:id', component: Product}];
```

`route.params`를 구독하면 파라미터에 접근할 수 있습니다.

```angular-ts
import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  template: `<h1>Product Details: {{ productId() }}</h1>`,
})
export class ProductDetail {
  productId = signal('');
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    // 라우팅 규칙 파라미터에 접근합니다.
    this.activatedRoute.params.subscribe((params) => {
      this.productId.set(params['id']);
    });
  }
}
```

<!--
### Query Parameters
-->

<a id="query-parameters"></a>

### 쿼리 파라미터

<!--
[Query parameters](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) provide a flexible way to pass optional data through URLs without affecting the route structure. Unlike route parameters, query parameters can persist across navigation events and are perfect for handling filtering, sorting, pagination, and other stateful UI elements.

```angular-ts
// Single parameter structure
// /products?category=electronics
router.navigate(['/products'], {
  queryParams: {category: 'electronics'},
});

// Multiple parameters
// /products?category=electronics&sort=price&page=1
router.navigate(['/products'], {
  queryParams: {
    category: 'electronics',
    sort: 'price',
    page: 1,
  },
});
```

You can access query parameters with `route.queryParams`.

Here is an example of a `ProductList` that updates the query parameters that affect how it displays a list of products:

```angular-ts
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  template: `
    <div>
      <select (change)="updateSort($event)">
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
      <!- Products list ->
    </div>
  `,
})
export class ProductList {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    // Access query parameters reactively
    this.route.queryParams.subscribe((params) => {
      const sort = params['sort'] || 'price';
      const page = Number(params['page']) || 1;
      this.loadProducts(sort, page);
    });
  }

  updateSort(event: Event) {
    const sort = (event.target as HTMLSelectElement).value;
    // Update URL with new query parameter
    this.router.navigate([], {
      queryParams: {sort},
      queryParamsHandling: 'merge', // Preserve other query parameters
    });
  }
}
```

In this example, users can use a select element to sort the product list by name or price. The associated change handler updates the URL’s query parameters, which in turn triggers a change event that can read the updated query parameters and update the product list.

For more information, check out the [official docs on QueryParamsHandling](/api/router/QueryParamsHandling).
-->

[쿼리 파라미터](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)는 라우팅 규칙 구조에 영향을 주지 않고 URL로 선택적인 데이터를 유연하게 전달하는 방식입니다.
라우팅 규칙 파라미터와 달리 내비게이션이 발생해도 유지할 수 있기 때문에 필터, 정렬, 페이지 나누기 등 상태가 있는 UI를 처리할 때 적합합니다.

```angular-ts
// 파라미터가 하나인 구조
// /products?category=electronics
router.navigate(['/products'], {
  queryParams: {category: 'electronics'},
});

// 여러 파라미터
// /products?category=electronics&sort=price&page=1
router.navigate(['/products'], {
  queryParams: {
    category: 'electronics',
    sort: 'price',
    page: 1,
  },
});
```

`route.queryParams`로 쿼리 파라미터에 접근할 수 있습니다.

다음 `ProductList` 예제는 상품 목록을 표시하는 방식에 영향을 주는 쿼리 파라미터를 갱신합니다.

```angular-ts
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  template: `
    <div>
      <select (change)="updateSort($event)">
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>
      <!-- 상품 목록 -->
    </div>
  `,
})
export class ProductList {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    // 반응형으로 쿼리 파라미터에 접근합니다.
    this.route.queryParams.subscribe((params) => {
      const sort = params['sort'] || 'price';
      const page = Number(params['page']) || 1;
      this.loadProducts(sort, page);
    });
  }

  updateSort(event: Event) {
    const sort = (event.target as HTMLSelectElement).value;
    // 새 쿼리 파라미터로 URL을 갱신합니다.
    this.router.navigate([], {
      queryParams: {sort},
      queryParamsHandling: 'merge', // 다른 쿼리 파라미터를 유지합니다.
    });
  }
}
```

이 예제에서 사용자는 select 엘리먼트로 상품 목록을 이름이나 가격순으로 정렬할 수 있습니다.
연결된 변경 핸들러가 URL의 쿼리 파라미터를 갱신하면 변경 이벤트가 발생합니다.
이 이벤트에서 갱신된 쿼리 파라미터를 읽어 상품 목록을 갱신할 수 있습니다.

자세한 내용은 [QueryParamsHandling 공식 문서](/api/router/QueryParamsHandling)를 참고하세요.

<!--
### Matrix Parameters
-->

<a id="matrix-parameters"></a>

### 매트릭스 파라미터

<!--
Matrix parameters are optional parameters that belong to a specific URL segment, rather than applying to the entire route. Unlike query parameters which appear after a `?` and apply globally, matrix parameters use semicolons (`;`) and are scoped to individual path segments.

Matrix parameters are useful when you need to pass auxiliary data to a specific route segment without affecting the route definition or matching behavior. Like query parameters, they don't need to be defined in your route configuration.

```ts
// URL format: /path;key=value
// Multiple parameters: /path;key1=value1;key2=value2

// Navigate with matrix parameters
this.router.navigate(['/awesome-products', {view: 'grid', filter: 'new'}]);
// Results in URL: /awesome-products;view=grid;filter=new
```

**Using ActivatedRoute**

```ts
import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component(/* ... */)
export class AwesomeProducts {
  private route = inject(ActivatedRoute);

  constructor() {
    // Access matrix parameters via params
    this.route.params.subscribe((params) => {
      const view = params['view']; // e.g., 'grid'
      const filter = params['filter']; // e.g., 'new'
    });
  }
}
```

NOTE: As an alternative to using `ActivatedRoute`, matrix parameters are also bound to component inputs when using the `withComponentInputBinding`.
-->

매트릭스 파라미터는 전체 라우팅 규칙이 아닌 특정 URL 세그먼트에 속하는 선택적 파라미터입니다.
`?` 뒤에 위치하고 전체에 적용되는 쿼리 파라미터와 달리, 매트릭스 파라미터는 세미콜론(`;`)을 사용하며 개별 경로 세그먼트에만 적용됩니다.

라우팅 규칙 정의나 매칭 방식에 영향을 주지 않고 특정 라우팅 규칙 세그먼트에 보조 데이터를 전달할 때 유용합니다.
쿼리 파라미터처럼 라우팅 규칙 설정에 정의할 필요가 없습니다.

```ts
// URL 형식: /path;key=value
// 여러 파라미터: /path;key1=value1;key2=value2

// 매트릭스 파라미터와 함께 이동합니다.
this.router.navigate(['/awesome-products', {view: 'grid', filter: 'new'}]);
// 결과 URL: /awesome-products;view=grid;filter=new
```

**ActivatedRoute 사용하기**

```ts
import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component(/* ... */)
export class AwesomeProducts {
  private route = inject(ActivatedRoute);

  constructor() {
    // params로 매트릭스 파라미터에 접근합니다.
    this.route.params.subscribe((params) => {
      const view = params['view']; // 예: 'grid'
      const filter = params['filter']; // 예: 'new'
    });
  }
}
```

참고: `ActivatedRoute` 대신 `withComponentInputBinding`을 사용하는 경우에는 매트릭스 파라미터도 컴포넌트 입력 프로퍼티에 바인딩됩니다.

<!--
## Detect active current route with RouterLinkActive
-->

<a id="detect-active-current-route-with-routerlinkactive"></a>

## RouterLinkActive로 현재 활성 라우팅 규칙 감지하기

<!--
You can use the `RouterLinkActive` directive to dynamically style navigation elements based on the current active route. This is common in navigation elements to inform users what the active route is.

```angular-html
<nav>
  <a
    class="button"
    routerLink="/about"
    routerLinkActive="active-button"
    ariaCurrentWhenActive="page"
  >
    About
  </a>
  |
  <a
    class="button"
    routerLink="/settings"
    routerLinkActive="active-button"
    ariaCurrentWhenActive="page"
  >
    Settings
  </a>
</nav>
```

In this example, Angular Router will apply the `active-button` class to the correct anchor link and `ariaCurrentWhenActive` to `page` when the URL matches the corresponding `routerLink`.

If you need to add multiple classes onto the element, you can use either a space-separated string or an array:

```angular-html
<!- Space-separated string syntax ->
<a routerLink="/user/bob" routerLinkActive="class1 class2">Bob</a>

<!- Array syntax ->
<a routerLink="/user/bob" [routerLinkActive]="['class1', 'class2']">Bob</a>
```

Setting `routerLinkActive` alone does not set `aria-current`. Set the `ariaCurrentWhenActive` input, as in the example above, so that visually impaired users (which may not perceive the different styling being applied) can also identify the active link.
-->

`RouterLinkActive` 디렉티브를 사용하면 현재 활성 라우팅 규칙에 따라 내비게이션 엘리먼트의 스타일을 동적으로 적용할 수 있습니다.
사용자에게 현재 활성 라우팅 규칙을 알리는 내비게이션 엘리먼트에서 자주 사용합니다.

```angular-html
<nav>
  <a
    class="button"
    routerLink="/about"
    routerLinkActive="active-button"
    ariaCurrentWhenActive="page"
  >
    About
  </a>
  |
  <a
    class="button"
    routerLink="/settings"
    routerLinkActive="active-button"
    ariaCurrentWhenActive="page"
  >
    Settings
  </a>
</nav>
```

이 예제에서 URL이 `routerLink`와 일치하면 Angular 라우터는 해당 앵커 링크에 `active-button` 클래스를 적용하고 `ariaCurrentWhenActive`를 `page`로 설정합니다.

엘리먼트에 여러 클래스를 추가하려면 공백으로 구분한 문자열이나 배열을 사용할 수 있습니다.

```angular-html
<!-- 공백으로 구분한 문자열 문법 -->
<a routerLink="/user/bob" routerLinkActive="class1 class2">Bob</a>

<!-- 배열 문법 -->
<a routerLink="/user/bob" [routerLinkActive]="['class1', 'class2']">Bob</a>
```

`routerLinkActive`만 설정해도 `aria-current`가 설정되는 것은 아닙니다.
적용된 스타일 차이를 인지하기 어려운 시각 장애인 사용자도 활성 링크를 구별할 수 있도록, 앞의 예제처럼 `ariaCurrentWhenActive` 입력 프로퍼티를 설정하세요.

<!--
### Route matching strategy
-->

<a id="route-matching-strategy"></a>

### 라우팅 규칙 매칭 전략

<!--
By default, `RouterLinkActive` considers any ancestors in the route a match.

```angular-html
<a [routerLink]="['/user/jane']" routerLinkActive="active-link"> User </a>
<a [routerLink]="['/user/jane/role/admin']" routerLinkActive="active-link"> Role </a>
```

When the user visits `/user/jane/role/admin`, both links would have the `active-link` class.
-->

기본적으로 `RouterLinkActive`는 라우팅 규칙의 모든 상위 경로도 매칭되는 것으로 판단합니다.

```angular-html
<a [routerLink]="['/user/jane']" routerLinkActive="active-link"> User </a>
<a [routerLink]="['/user/jane/role/admin']" routerLinkActive="active-link"> Role </a>
```

사용자가 `/user/jane/role/admin`에 방문하면 두 링크 모두 `active-link` 클래스를 갖습니다.

<!--
### Only apply RouterLinkActive on exact route matches
-->

<a id="only-apply-routerlinkactive-on-exact-route-matches"></a>

### 라우팅 규칙이 정확히 일치할 때만 RouterLinkActive 적용하기

<!--
If you only want to apply the class on an exact match, you need to provide the `routerLinkActiveOptions` directive with a configuration object that contains the value `exact: true`.

```angular-html
<a
  [routerLink]="['/user/jane']"
  routerLinkActive="active-link"
  [routerLinkActiveOptions]="{exact: true}"
>
  User
</a>
<a
  [routerLink]="['/user/jane/role/admin']"
  routerLinkActive="active-link"
  [routerLinkActiveOptions]="{exact: true}"
>
  Role
</a>
```

If you want to be more precise in how a route is matched, it’s worth noting that `exact: true` is actually syntactic sugar for the full set of matching options:

```angular-ts
// `exact: true` is equivalent to
{
  paths: 'exact',
  fragment: 'ignored',
  matrixParams: 'ignored',
  queryParams: 'exact',
}

// `exact: false` is equivalent
{
  paths: 'subset',
  fragment: 'ignored',
  matrixParams: 'ignored',
  queryParams: 'subset',
}
```

For more information, check out the official docs for [isActiveMatchOptions](/api/router/IsActiveMatchOptions).
-->

정확하게 일치할 때만 클래스를 적용하려면 `routerLinkActiveOptions` 디렉티브에 `exact: true`를 포함한 설정 객체를 전달하세요.

```angular-html
<a
  [routerLink]="['/user/jane']"
  routerLinkActive="active-link"
  [routerLinkActiveOptions]="{exact: true}"
>
  User
</a>
<a
  [routerLink]="['/user/jane/role/admin']"
  routerLinkActive="active-link"
  [routerLinkActiveOptions]="{exact: true}"
>
  Role
</a>
```

라우팅 규칙 매칭 방식을 더 세밀하게 지정할 수도 있습니다.
`exact: true`는 실제로 다음 매칭 옵션 전체를 간단하게 표현한 문법입니다.

```angular-ts
// `exact: true`는 다음 설정과 같습니다.
{
  paths: 'exact',
  fragment: 'ignored',
  matrixParams: 'ignored',
  queryParams: 'exact',
}

// `exact: false`는 다음 설정과 같습니다.
{
  paths: 'subset',
  fragment: 'ignored',
  matrixParams: 'ignored',
  queryParams: 'subset',
}
```

자세한 내용은 [isActiveMatchOptions 공식 문서](/api/router/IsActiveMatchOptions)를 참고하세요.

<!--
### Apply RouterLinkActive to an ancestor
-->

<a id="apply-routerlinkactive-to-an-ancestor"></a>

### 상위 엘리먼트에 RouterLinkActive 적용하기

<!--
The RouterLinkActive directive can also be applied to an ancestor element in order to allow developers to style the elements as desired.

```angular-html
<div routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
  <a routerLink="/user/jim">Jim</a>
  <a routerLink="/user/bob">Bob</a>
</div>
```

For more information, check out the [API docs for RouterLinkActive](/api/router/RouterLinkActive).
-->

RouterLinkActive 디렉티브는 상위 엘리먼트에도 적용할 수 있습니다.
이 방식으로 원하는 엘리먼트에 스타일을 지정할 수 있습니다.

```angular-html
<div routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
  <a routerLink="/user/jim">Jim</a>
  <a routerLink="/user/bob">Bob</a>
</div>
```

자세한 내용은 [RouterLinkActive API 문서](/api/router/RouterLinkActive)를 참고하세요.

<!--
## Check if a URL is active
-->

<a id="check-if-a-url-is-active"></a>

## URL 활성 여부 확인하기

<!--
The `isActive` function returns a computed signal that tracks whether a given URL is currently active in the router. The signal automatically updates as the router state changes.

```angular-ts
import {Component, inject} from '@angular/core';
import {isActive, Router} from '@angular/router';

@Component({
  template: `
    <div [class.active]="isSettingsActive()">
      <h2>Settings</h2>
    </div>
  `,
})
export class Panel {
  private router = inject(Router);

  isSettingsActive = isActive('/settings', this.router, {
    paths: 'subset',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  });
}
```
-->

`isActive` 함수는 특정 URL이 현재 라우터에서 활성 상태인지 추적하는 계산된 시그널을 반환합니다.
이 시그널은 라우터 상태가 바뀌면 자동으로 갱신됩니다.

```angular-ts
import {Component, inject} from '@angular/core';
import {isActive, Router} from '@angular/router';

@Component({
  template: `
    <div [class.active]="isSettingsActive()">
      <h2>Settings</h2>
    </div>
  `,
})
export class Panel {
  private router = inject(Router);

  isSettingsActive = isActive('/settings', this.router, {
    paths: 'subset',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  });
}
```
