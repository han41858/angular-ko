<!--
# Other common Routing Tasks
-->

<a id="other-common-routing-tasks"></a>

# 그 밖의 일반적인 라우팅 작업

<!--
This guide covers some other common tasks associated with using Angular router in your application.
-->

이 문서에서는 애플리케이션에서 Angular 라우터를 사용할 때 자주 수행하는 다른 작업을 알아봅니다.

<!--
## Getting route information
-->

<a id="getting-route-information"></a>

## 라우팅 규칙 정보 가져오기

<!--
Often, as a user navigates your application, you want to pass information from one component to another.
For example, consider an application that displays a shopping list of grocery items.
Each item in the list has a unique `id`.
To edit an item, users click an Edit button, which opens an `EditGroceryItem` component.
You want that component to retrieve the `id` for the grocery item so it can display the right information to the user.

Use a route to pass this type of information to your application components.
To do so, you use the `withComponentInputBinding` feature with `provideRouter` or the `bindToComponentInputs` option of `RouterModule.forRoot`.

To get information from a route:

<docs-workflow>

<docs-step title="Add `withComponentInputBinding`">

Add the `withComponentInputBinding` feature to the `provideRouter` method.

```ts
providers: [provideRouter(appRoutes, withComponentInputBinding())];
```

</docs-step>

<docs-step title="Add an `input` to the component">

Update the component to have an `input()` property matching the name of the parameter.

```ts
id = input.required<string>();
hero = computed(() => this.service.getHero(id()));
```

</docs-step>
<docs-step title="Optional: Use a default value">
The router assigns values to all inputs based on the current route when `withComponentInputBinding` is enabled.
The router assigns `undefined` if no route data matches the input key, such as when an optional query parameter is missing.
You should include `undefined` in the `input`'s type when there's a possibility that an input might not be matched by the route.

Provide a default value by either using the `transform` option on the input or managing a local state with a `linkedSignal`.

```ts
id = input.required({
  transform: (maybeUndefined: string | undefined) => maybeUndefined ?? '0',
});
// or
id = input<string | undefined>();
internalId = linkedSignal(() => this.id() ?? getDefaultId());
```

</docs-step>
</docs-workflow>

NOTE: You can bind all route data with key, value pairs to component inputs: static or resolved route data, path parameters, matrix parameters, and query parameters.
-->

사용자가 애플리케이션을 탐색하는 동안 한 컴포넌트에서 다른 컴포넌트로 정보를 전달해야 하는 경우가 많습니다.
예를 들어 식료품 쇼핑 목록을 표시하는 애플리케이션을 생각해 보겠습니다.
목록의 각 항목에는 고유한 `id`가 있습니다.
사용자가 항목의 Edit 버튼을 클릭하면 `EditGroceryItem` 컴포넌트가 열립니다.
이 컴포넌트는 사용자에게 올바른 정보를 표시할 수 있도록 해당 식료품의 `id`를 가져와야 합니다.

이런 정보는 라우팅 규칙으로 애플리케이션 컴포넌트에 전달할 수 있습니다.
`provideRouter`의 `withComponentInputBinding` 기능이나 `RouterModule.forRoot`의 `bindToComponentInputs` 옵션을 사용하세요.

라우팅 규칙 정보를 가져오는 방법은 다음과 같습니다.

<docs-workflow>

<docs-step title="`withComponentInputBinding` 추가하기">

`provideRouter` 메서드에 `withComponentInputBinding` 기능을 추가하세요.

```ts
providers: [provideRouter(appRoutes, withComponentInputBinding())];
```

</docs-step>

<docs-step title="컴포넌트에 `input` 추가하기">

파라미터 이름과 일치하는 `input()` 프로퍼티를 컴포넌트에 추가하세요.

```ts
id = input.required<string>();
hero = computed(() => this.service.getHero(id()));
```

</docs-step>
<docs-step title="선택 사항: 기본값 사용하기">
`withComponentInputBinding`을 활성화하면 라우터가 현재 라우팅 규칙을 기준으로 모든 입력 프로퍼티에 값을 할당합니다.
선택적 쿼리 파라미터가 없는 경우처럼 입력 프로퍼티의 키와 매칭되는 라우팅 규칙 데이터가 없으면 `undefined`를 할당합니다.
입력 프로퍼티가 라우팅 규칙과 매칭되지 않을 가능성이 있다면 `input`의 타입에 `undefined`를 포함해야 합니다.

입력 프로퍼티의 `transform` 옵션을 사용하거나 `linkedSignal`로 로컬 상태를 관리하면 기본값을 제공할 수 있습니다.

```ts
id = input.required({
  transform: (maybeUndefined: string | undefined) => maybeUndefined ?? '0',
});
// 또는
id = input<string | undefined>();
internalId = linkedSignal(() => this.id() ?? getDefaultId());
```

</docs-step>
</docs-workflow>

참고: 키와 값 쌍으로 된 모든 라우팅 규칙 데이터를 컴포넌트 입력 프로퍼티에 바인딩할 수 있습니다.
정적 라우팅 규칙 데이터, 리졸버가 가져온 데이터, 경로 파라미터, 매트릭스 파라미터, 쿼리 파라미터가 모두 포함됩니다.

<!--
### Disable query parameter binding
-->

<a id="disable-query-parameter-binding"></a>

### 쿼리 파라미터 바인딩 비활성화하기

<!--
Use `ComponentInputBindingOptions` to disable query parameter binding if you manage query parameters separately:

```ts
provideRouter(appRoutes, withComponentInputBinding({queryParams: false}));
```
-->

쿼리 파라미터를 별도로 관리한다면 `ComponentInputBindingOptions`로 쿼리 파라미터 바인딩을 비활성화하세요.

```ts
provideRouter(appRoutes, withComponentInputBinding({queryParams: false}));
```

<!--
### Configure behavior for inputs not available in router data
-->

<a id="configure-behavior-for-inputs-not-available-in-router-data"></a>

### 라우터 데이터에 없는 입력 프로퍼티의 동작 설정하기

<!--
By default, the router sets an input to `undefined` if it was not available in the router data during a navigation. This ensures that stale data is not retained.

If you want to avoid setting `undefined` for inputs that have _never_ been available in the router data for the active component instance, you can set the `unmatchedInputBehavior` option to `'undefinedIfStale'`:

```ts
provideRouter(appRoutes, withComponentInputBinding({unmatchedInputBehavior: 'undefinedIfStale'}));
```

When you combine `unmatchedInputBehavior: 'undefinedIfStale'` with `queryParams: false`, inputs retain their initial values unless they are explicitly provided by the router. The exception is matrix parameters: if a matrix parameter is provided in one navigation and removed in a subsequent one, the router will set the input to `undefined` to avoid retaining stale data.

```ts
provideRouter(
  appRoutes,
  withComponentInputBinding({
    queryParams: false,
    unmatchedInputBehavior: 'undefinedIfStale',
  }),
);
```
-->

기본적으로 내비게이션 중에 라우터 데이터에 없는 입력 프로퍼티는 `undefined`로 설정됩니다.
이전 데이터가 남아 있지 않도록 하는 동작입니다.

활성 컴포넌트 인스턴스의 라우터 데이터에 _한 번도_ 없었던 입력 프로퍼티에는 `undefined`를 설정하지 않으려면 `unmatchedInputBehavior` 옵션을 `'undefinedIfStale'`로 지정하세요.

```ts
provideRouter(appRoutes, withComponentInputBinding({unmatchedInputBehavior: 'undefinedIfStale'}));
```

`unmatchedInputBehavior: 'undefinedIfStale'`과 `queryParams: false`를 함께 사용하면 라우터가 명시적으로 제공하지 않은 입력 프로퍼티는 초기값을 유지합니다.
다만 매트릭스 파라미터는 예외입니다.
한 내비게이션에서 제공한 매트릭스 파라미터가 다음 내비게이션에서 제거되면, 이전 데이터를 유지하지 않도록 라우터가 입력 프로퍼티를 `undefined`로 설정합니다.

```ts
provideRouter(
  appRoutes,
  withComponentInputBinding({
    queryParams: false,
    unmatchedInputBehavior: 'undefinedIfStale',
  }),
);
```

<!--
### Inherit parent route data
-->

<a id="inherit-parent-route-data"></a>

### 부모 라우팅 규칙 데이터 상속하기

<!--
By default, child routes inherit parameters and data from parent routes (equivalent to `paramsInheritanceStrategy: 'always'`). This means you can access parent route info directly in child components.

If you need to restore the legacy behavior where parameters were only inherited from empty path routes, you can set `paramsInheritanceStrategy` to `'emptyOnly'`:

```ts
provideRouter(routes, withRouterConfig({paramsInheritanceStrategy: 'emptyOnly'}));
```

See [router configuration options](guide/routing/customizing-route-behavior#router-configuration-options) for details on other available settings.
-->

기본적으로 자식 라우팅 규칙은 부모 라우팅 규칙의 파라미터와 데이터를 상속합니다(`paramsInheritanceStrategy: 'always'`와 같습니다).
따라서 자식 컴포넌트에서 부모 라우팅 규칙 정보에 직접 접근할 수 있습니다.

빈 경로 라우팅 규칙에서만 파라미터를 상속하던 이전 동작이 필요하다면 `paramsInheritanceStrategy`를 `'emptyOnly'`로 지정하세요.

```ts
provideRouter(routes, withRouterConfig({paramsInheritanceStrategy: 'emptyOnly'}));
```

다른 설정의 자세한 내용은 [라우터 설정 옵션](guide/routing/customizing-route-behavior#router-configuration-options)을 참고하세요.

<!--
## Displaying a 404 page
-->

<a id="displaying-a-404-page"></a>

## 404 페이지 표시하기

<!--
To display a 404 page, set up a [wildcard route](guide/routing/define-routes#wildcards) with the `component` property set to the component you'd like to use for your 404 page as follows:

```ts
const routes: Routes = [
  {path: 'first-component', component: First},
  {path: 'second-component', component: Second},
  {path: '**', component: PageNotFound}, // Wildcard route for a 404 page
];
```

The last route with the `path` of `**` is a wildcard route.
The router selects this route if the requested URL doesn't match any of the paths earlier in the list and sends the user to the `PageNotFound`.
-->

404 페이지를 표시하려면 [와일드카드 라우팅 규칙](guide/routing/define-routes#wildcards)을 설정하고 `component` 프로퍼티에 404 페이지용 컴포넌트를 지정하세요.

```ts
const routes: Routes = [
  {path: 'first-component', component: First},
  {path: 'second-component', component: Second},
  {path: '**', component: PageNotFound}, // 404 페이지를 위한 와일드카드 라우팅 규칙
];
```

마지막의 `path`가 `**`인 라우팅 규칙이 와일드카드 라우팅 규칙입니다.
요청한 URL이 목록의 앞쪽 경로들과 매칭되지 않으면 라우터는 이 라우팅 규칙을 선택해서 사용자를 `PageNotFound`로 보냅니다.

<!--
## Link parameters array
-->

<a id="link-parameters-array"></a>

## 링크 파라미터 배열

<!--
A link parameters array holds the following ingredients for router navigation:

- The path of the route to the destination component
- Required and optional route parameters that go into the route URL

Bind the `RouterLink` directive to such an array like this:

```angular-html
<a [routerLink]="['/heroes']">Heroes</a>
```

The following is a two-element array when specifying a route parameter:

```angular-html
<a [routerLink]="['/hero', hero.id]">
  <span class="badge">{{ hero.id }}</span
  >{{ hero.name }}
</a>
```

Provide optional route parameters in an object, as in `{ foo: 'foo' }`:

```angular-html
<a [routerLink]="['/crisis-center', {foo: 'foo'}]">Crisis Center</a>
```

This syntax passes matrix parameters, which are optional parameters associated with a specific URL segment. Learn more about [matrix parameters](/guide/routing/read-route-state#matrix-parameters).

These three examples cover the needs of an application with one level of routing.
However, with a child router, such as in the crisis center, you create new link array possibilities.

The following minimal `RouterLink` example builds upon a specified default child route for the crisis center.

```angular-html
<a [routerLink]="['/crisis-center']">Crisis Center</a>
```

Review the following:

- The first item in the array identifies the parent route \(`/crisis-center`\)
- There are no parameters for this parent route
- There is no default for the child route so you need to pick one
- You're navigating to the `CrisisList`, whose route path is `/`, but you don't need to explicitly add the slash

Consider the following router link that navigates from the root of the application down to the Dragon Crisis:

```angular-html
<a [routerLink]="['/crisis-center', 1]">Dragon Crisis</a>
```

- The first item in the array identifies the parent route \(`/crisis-center`\)
- There are no parameters for this parent route
- The second item identifies the child route details about a particular crisis \(`/:id`\)
- The details child route requires an `id` route parameter
- You added the `id` of the Dragon Crisis as the second item in the array \(`1`\)
- The resulting path is `/crisis-center/1`

You could also redefine the `App` template with Crisis Center routes exclusively:

```angular-ts
@Component({
  template: `
    <h1 class="title">Angular Router</h1>
    <nav>
      <a [routerLink]="['/crisis-center']">Crisis Center</a>
      <a [routerLink]="['/crisis-center/1', {foo: 'foo'}]">Dragon Crisis</a>
      <a [routerLink]="['/crisis-center/2']">Shark Crisis</a>
    </nav>
    <router-outlet />
  `,
})
export class App {}
```

In summary, you can write applications with one, two or more levels of routing.
The link parameters array affords the flexibility to represent any routing depth and any legal sequence of route paths, \(required\) router parameters, and \(optional\) route parameter objects.
-->

링크 파라미터 배열에는 라우터 내비게이션을 위한 다음 정보가 들어 있습니다.

- 목적지 컴포넌트의 라우팅 규칙 경로
- 라우팅 규칙 URL에 포함할 필수 및 선택적 라우팅 규칙 파라미터

다음과 같이 `RouterLink` 디렉티브에 배열을 바인딩하세요.

```angular-html
<a [routerLink]="['/heroes']">Heroes</a>
```

라우팅 규칙 파라미터를 지정하면 다음처럼 두 항목으로 된 배열이 됩니다.

```angular-html
<a [routerLink]="['/hero', hero.id]">
  <span class="badge">{{ hero.id }}</span
  >{{ hero.name }}
</a>
```

선택적 라우팅 규칙 파라미터는 `{ foo: 'foo' }`처럼 객체로 전달하세요.

```angular-html
<a [routerLink]="['/crisis-center', {foo: 'foo'}]">Crisis Center</a>
```

이 문법은 특정 URL 세그먼트에 연결된 선택적 파라미터인 매트릭스 파라미터를 전달합니다.
[매트릭스 파라미터](/guide/routing/read-route-state#matrix-parameters)를 더 알아보세요.

이 세 가지 예제로 라우팅 계층이 하나인 애플리케이션을 구성할 수 있습니다.
하지만 위기 센터 예제처럼 자식 라우터가 있다면 링크 배열을 더 다양하게 구성할 수 있습니다.

다음의 간단한 `RouterLink` 예제는 위기 센터에 지정된 기본 자식 라우팅 규칙을 기반으로 합니다.

```angular-html
<a [routerLink]="['/crisis-center']">Crisis Center</a>
```

다음 내용을 확인해 보세요.

- 배열의 첫 항목은 부모 라우팅 규칙\(`/crisis-center`\)을 가리킵니다.
- 이 부모 라우팅 규칙에는 파라미터가 없습니다.
- 자식 라우팅 규칙에는 기본값이 없기 때문에 하나를 선택해야 합니다.
- 라우팅 규칙 경로가 `/`인 `CrisisList`로 이동하지만 슬래시를 명시적으로 추가할 필요는 없습니다.

애플리케이션 루트에서 Dragon Crisis로 이동하는 다음 라우터 링크를 살펴보세요.

```angular-html
<a [routerLink]="['/crisis-center', 1]">Dragon Crisis</a>
```

- 배열의 첫 항목은 부모 라우팅 규칙\(`/crisis-center`\)을 가리킵니다.
- 이 부모 라우팅 규칙에는 파라미터가 없습니다.
- 두 번째 항목은 특정 위기의 상세 내용을 표시하는 자식 라우팅 규칙\(`/:id`\)을 가리킵니다.
- 상세 정보 자식 라우팅 규칙에는 `id` 라우팅 규칙 파라미터가 필요합니다.
- Dragon Crisis의 `id`를 배열의 두 번째 항목\(`1`\)으로 추가했습니다.
- 결과 경로는 `/crisis-center/1`입니다.

위기 센터 라우팅 규칙만 사용하도록 `App` 템플릿을 다시 정의할 수도 있습니다.

```angular-ts
@Component({
  template: `
    <h1 class="title">Angular Router</h1>
    <nav>
      <a [routerLink]="['/crisis-center']">Crisis Center</a>
      <a [routerLink]="['/crisis-center/1', {foo: 'foo'}]">Dragon Crisis</a>
      <a [routerLink]="['/crisis-center/2']">Shark Crisis</a>
    </nav>
    <router-outlet />
  `,
})
export class App {}
```

라우팅 계층이 하나, 둘 또는 그 이상인 애플리케이션을 작성할 수 있습니다.
링크 파라미터 배열을 사용하면 어떤 깊이의 라우팅이든 표현할 수 있습니다.
라우팅 규칙 경로, \(필수\) 라우터 파라미터, \(선택적\) 라우팅 규칙 파라미터 객체를 유효한 순서로 유연하게 조합할 수 있습니다.

<!--
## `LocationStrategy` and browser URL styles
-->

<a id="locationstrategy-and-browser-url-styles"></a>

## `LocationStrategy`와 브라우저 URL 형식

<!--
When the router navigates to a new component view, it updates the browser's location and history with a URL for that view.

Modern HTML5 browsers support [history.pushState](https://developer.mozilla.org/docs/Web/API/History_API/Working_with_the_History_API#adding_and_modifying_history_entries 'HTML5 browser history push-state'), a technique that changes a browser's location and history without triggering a server page request.
The router can compose a "natural" URL that is indistinguishable from one that would otherwise require a page load.

Here's the Crisis Center URL in this "HTML5 pushState" style:

```text
localhost:3002/crisis-center
```

Older browsers send page requests to the server when the location URL changes unless the change occurs after a "#" \(called the "hash"\).
Routers can take advantage of this exception by composing in-application route URLs with hashes.
Here's a "hash URL" that routes to the Crisis Center.

```text
localhost:3002/src/#/crisis-center
```

The router supports both styles with two `LocationStrategy` providers:

| Providers              | Details                              |
| :--------------------- | :----------------------------------- |
| `PathLocationStrategy` | The default "HTML5 pushState" style. |
| `HashLocationStrategy` | The "hash URL" style.                |

The `RouterModule.forRoot()` function sets the `LocationStrategy` to the `PathLocationStrategy`, which makes it the default strategy.
You also have the option of switching to the `HashLocationStrategy` with an override during the bootstrapping process.

HELPFUL: For more information on providers and the bootstrap process, see [Dependency Injection](guide/di/defining-dependency-providers).
-->

라우터가 새 컴포넌트 뷰로 이동하면 해당 뷰의 URL로 브라우저 위치와 히스토리를 갱신합니다.

최신 HTML5 브라우저는 서버에 페이지를 요청하지 않고 브라우저 위치와 히스토리를 변경하는 [history.pushState](https://developer.mozilla.org/docs/Web/API/History_API/Working_with_the_History_API#adding_and_modifying_history_entries 'HTML5 브라우저 히스토리 push-state')를 지원합니다.
라우터는 일반적으로 페이지를 로드할 때 사용하는 URL과 구별되지 않는 "자연스러운" URL을 구성할 수 있습니다.

"HTML5 pushState" 형식의 위기 센터 URL은 다음과 같습니다.

```text
localhost:3002/crisis-center
```

이전 브라우저는 위치 URL이 바뀌면 서버에 페이지를 요청합니다.
다만 "해시"라고 부르는 "#" 뒤의 내용만 바뀌면 요청하지 않습니다.
라우터는 이 특성을 활용해서 애플리케이션 내부 라우팅 규칙 URL을 해시로 구성할 수 있습니다.
다음은 위기 센터로 이동하는 "해시 URL"입니다.

```text
localhost:3002/src/#/crisis-center
```

라우터는 두 가지 `LocationStrategy` 프로바이더로 두 형식을 모두 지원합니다.

| 프로바이더             | 설명                               |
| :--------------------- | :--------------------------------- |
| `PathLocationStrategy` | 기본 "HTML5 pushState" 형식입니다. |
| `HashLocationStrategy` | "해시 URL" 형식입니다.             |

`RouterModule.forRoot()` 함수는 `LocationStrategy`를 `PathLocationStrategy`로 설정하므로 이 방식이 기본 전략입니다.
부트스트랩 과정에서 이 설정을 재정의해서 `HashLocationStrategy`로 변경할 수도 있습니다.

참고: 프로바이더와 부트스트랩 과정의 자세한 내용은 [의존성 주입](guide/di/defining-dependency-providers)을 참고하세요.
