<!--
# Common Routing Tasks
-->
# 일반 라우팅 동작

<!--
This topic describes how to implement many of the common tasks associated with adding the Angular router to your application.
-->
이 문서는 Angular 애플리케이션에 라우터를 추가하는 방법을 설명합니다.


<a id="basics"></a>

<!--
## Generate an application with routing enabled
-->
## 라우팅 가능한 상태로 앱 생성하기

<!--
The following command uses the Angular CLI to generate a basic Angular application with an application routing module, called `AppRoutingModule`, which is an NgModule where you can configure your routes.
The application name in the following example is `routing-app`.

<code-example format="shell" language="shell">

ng new routing-app --routing --defaults

</code-example>
-->
Angular CLI로 다음과 같은 명령을 실행하면 Angular 앱을 생성하면서 `AppRoutingModule` 이라고 하는 라우팅 모듈을 함께 생성합니다.
이 모듈은 애플리케이션의 라우팅 규칙을 관리하는 NgModule입니다.
`routing-app` 이라는 이름으로 앱을 생성하는 명령은 이렇습니다.

<code-example format="shell" language="shell">

ng new routing-app --routing --defaults

</code-example>


<!--
### Adding components for routing
-->
### 라우팅할 컴포넌트 생성하기

<!--
To use the Angular router, an application needs to have at least two components so that it can navigate from one to the other.
To create a component using the CLI, enter the following at the command line where `first` is the name of your component:

<code-example format="shell" language="shell">

ng generate component first

</code-example>

Repeat this step for a second component but give it a different name.
Here, the new name is `second`.

<code-example format="shell" language="shell">

ng generate component second

</code-example>

The CLI automatically appends `Component`, so if you were to write `first-component`, your component would be `FirstComponentComponent`.

<a id="basics-base-href"></a>

<div class="alert is-helpful">

<header><code>&lt;base href&gt;</code></header>

This guide works with a CLI-generated Angular application.
If you are working manually, make sure that you have `<base href="/">` in the `<head>` of your index.html file.
This assumes that the `app` folder is the application root, and uses `"/"`.

</div>
-->
Angular 라우터를 사용해서 화면을 전환하려면 컴포넌트가 적어도 2개는 있어야 합니다.
다음 명령을 실행해서 `first` 라는 이름으로 컴포넌트를 생성합니다:

<code-example format="shell" language="shell">

ng generate component first

</code-example>

그리고 다른 이름으로 두 번째 컴포넌트를 생성합니다.
이번에는 `second` 라는 이름으로 컴포넌트를 생성해 봅시다.

<code-example format="shell" language="shell">

ng generate component second

</code-example>

Angular CLI는 컴포넌트를 생성할 때 자동으로 접미사를 붙이기 때문에, 컴포넌트 이름을 `first-component` 라고 지정하면 실제 컴포넌트 클래스 이름은 `FirstComponentComponent`가 됩니다.

<a id="basics-base-href"></a>

<div class="alert is-helpful">

<header<code>&lt;base href&gt;</code></header>

이 가이드문서는 Angular CLI로 생성한 Angular 앱을 다룹니다.
만약 Angular CLI를 사용하지 않는다면 index.html 파일의 `<head>` 태그에 `<base href="/">` 를 추가해야 합니다.
이 태그를 추가하면 `app` 폴더가 애플리케이션 최상위 주소 `"/"` 와 연결됩니다.

</div>


<!--
### Importing your new components
-->
### 컴포넌트 로드하기

<!--
To use your new components, import them into `AppRoutingModule` at the top of the file, as follows:

<code-example header="AppRoutingModule (excerpt)">

import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

</code-example>
-->
새로 만든 컴포넌트를 사용하려면 `AppRoutingModule` 파일 제일 위쪽에서 이 컴포넌트들을 로드해야 합니다:

<code-example header="AppRoutingModule (일부)">

import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

</code-example>


<a id="basic-route"></a>
<a id="defining-a-basic-route"></a>

<!--
## Defining a basic route
-->
## 기본 라우팅 규칙 정의하기

<!--
There are three fundamental building blocks to creating a route.

Import the `AppRoutingModule` into `AppModule` and add it to the `imports` array.

The Angular CLI performs this step for you.
However, if you are creating an application manually or working with an existing, non-CLI application, verify that the imports and configuration are correct.
The following is the default `AppModule` using the CLI with the `--routing` flag.

<code-example header="Default CLI AppModule with routing" path="router/src/app/app.module.8.ts"></code-example>

1.  Import `RouterModule` and `Routes` into your routing module.

    The Angular CLI performs this step automatically.
    The CLI also sets up a `Routes` array for your routes and configures the `imports` and `exports` arrays for `@NgModule()`.

    <code-example header="CLI application routing module" path="router/src/app/app-routing.module.7.ts"></code-example>

1.  Define your routes in your `Routes` array.

    Each route in this array is a JavaScript object that contains two properties.
    The first property, `path`, defines the URL path for the route.
    The second property, `component`, defines the component Angular should use for the corresponding path.

    <code-example header="AppRoutingModule (excerpt)" path="router/src/app/app-routing.module.8.ts" region="routes"></code-example>

1.  Add your routes to your application.

    Now that you have defined your routes, add them to your application.
    First, add links to the two components.
    Assign the anchor tag that you want to add the route to the `routerLink` attribute.
    Set the value of the attribute to the component to show when a user clicks on each link.
    Next, update your component template to include `<router-outlet>`.
    This element informs Angular to update the application view with the component for the selected route.

    <code-example header="Template with routerLink and router-outlet" path="router/src/app/app.component.7.html"></code-example>
-->
라우팅 규칙은 세가지 요소로 구성됩니다.

`AppModule`이 정의된 파일에 `AppRoutingModule`을 로드하고 이 라우팅 모듈을 `AppModule` `imports` 배열에 추가합니다.

Angular CLI로 앱을 생성했다면 이 과정은 이미 처리되어 있습니다.
하지만 앱을 직접 생성했거나 이미 있는 앱을 기반으로 작업한다면 라우팅 모듈이 제대로 로드 되었는지, `imports` 배열에 추가되었는지 꼭 확인해야 합니다.
아래 코드는 `--routing` 플래그를 붙여서 Angular CLI로 앱을 생성했을 때 자동으로 생성된 `AppModule` 코드입니다.

<code-example header="Angular CLI가 자동으로 생성한 AppModule" path="router/src/app/app.module.8.ts"></code-example>

1.  라우팅 모듈이 정의된 파일에 `RouterModule`와 `Routes`를 로드합니다.

    이 과정도 Angular CLI가 자동으로 처리했을 것입니다.
    `Routes` 배열을 생성하는 것과 `@NgModule()`의 `imports` 배열과 `exports` 배열을 구성하는 것도 Angular CLI가 처리합니다.

    <code-example header="Angular CLI가 생성한 라우팅 모듈" path="router/src/app/app-routing.module.7.ts"></code-example>

1.  이제 라우팅 규칙을 `Routes` 배열에 등록합니다.

    라우팅 규칙(route)은 이 배열에 JavaScript 객체 형태로 등록하며, 이 객체는 프로퍼티가 2개 존재합니다.
    첫번째로 `path` 프로퍼티는 라우팅 규칙에 해당하는 URL 주소를 지정합니다.
    그리고 `component` 프로퍼티는 해당 URL 주소에 연결될 컴포넌트를 지정합니다.

    <code-example header="AppRoutingModule (일부)" path="router/src/app/app-routing.module.8.ts" region="routes"></code-example>

1.  라우팅 규칙을 애플리케이션에 등록합니다.

    라우팅 규칙을 모두 정의했다면 이 규칙을 애플리케이션에 등록해야 합니다.
    먼저 두 컴포넌트와 연결되는 링크를 추가합니다.
    링크는 `<a>` 엘리먼트에 `routerLink` 어트리뷰트를 사용하는 방식으로 구현합니다.
    이 어트리뷰트에는 사용자가 링크를 클릭했을 때 이동할 주소를 지정합니다.
    그리고 컴포넌트 템플릿에 `<router-outlet>`을 추가합니다.
    `<router-outlet>` 엘리먼트는 Angular가 애플리케이션 화면을 전환할 때 관련 컴포넌트가 표시될 위치를 지정하는 엘리먼트입니다.

    <code-example header="router-outlet이 추가된 템플릿" path="router/src/app/app.component.7.html"></code-example>


<a id="route-order"></a>

<!--
### Route order
-->
### 라우팅 규칙 적용 순서

<!--
The order of routes is important because the `Router` uses a first-match wins strategy when matching routes, so more specific routes should be placed above less specific routes.
List routes with a static path first, followed by an empty path route, which matches the default route.
The [wildcard route](guide/router#setting-up-wildcard-routes) comes last because it matches every URL and the `Router` selects it only if no other routes match first.
-->
Angular `Router`는 라우팅 규칙 중 첫번째로 매칭되는 라우팅 규칙을 적용하기 때문에 라우티 규칙을 등록하는 순서가 중요한데, 구체적인 라우팅 규칙을 가장 먼저 등록하고 덜 구체적인 라우팅 규칙을 나중에 등록하는 것이 좋습니다.
그래서 고정된 주소를 먼저 등록하며, 그 다음에 빈 주소를 등록하고, 마지막으로 기본 라우팅 규칙을 등록합니다.
그리고 브라우저가 접속한 주소에 해당하는 라우팅 규칙이 하나도 없을 때 적용되는 [와일드카드 라우팅 규칙](guide/router#setting-up-wildcard-routes)은 가장 마지막에 작성합니다.


<a id="getting-route-information"></a>

<!--
## Getting route information
-->
## 라우팅 규칙으로 전달된 정보 참조하기

<!--
Often, as a user navigates your application, you want to pass information from one component to another.
For example, consider an application that displays a shopping list of grocery items.
Each item in the list has a unique `id`.
To edit an item, users click an Edit button, which opens an `EditGroceryItem` component.
You want that component to retrieve the `id` for the grocery item so it can display the right information to the user.

Use a route to pass this type of information to your application components.
To do so, you use the [withComponentInputBinding](api/router/withComponentInputBinding) feature with `provideRouter` or the `bindToComponentInputs` option of `RouterModule.forRoot`.

To get information from a route:

1.  Add the `withComponentInputBinding` feature to the `provideRouter` method.

    <code-example header="provideRouter feature" path="router/src/app/app-routing.module.11.ts" region="withComponentInputBinding"></code-example>

1.  Update the component to have an `Input` matching the name of the parameter.

    <code-example header="The component input (excerpt)" path="router/src/app/heroes/hero-detail/hero-detail.component.4.ts" region="id-input"></code-example>

    <div class="alert is-helpful">

    **NOTE:** <br>
    You can bind all route data with key, value pairs to component inputs: static or resolved route data, path parameters, matrix parameters, and query parameters.

    </div>
-->
때로는 사용자가 화면을 전환할 때 교체되는 컴포넌트 사이에 정보를 전달해야 할 때가 있습니다.
애플리케이션에서 식료품 목록을 보여주고 있다고 합시다.
목록으로 표시된 개별 식료품에는 고유한 `id` 값이 있습니다.
사용자가 식료품 정보를 수정하기 위해 Edit 버튼을 클릭하면 `EditGroceryItem` 컴포넌트가 화면에 표시될 것입니다.
이 때 새로 표시되는 컴포넌트는 사용자가 어떤 식료품을 선택했는지 알기 위해 해당 상품에 대한 `id` 값을 전달받아야 합니다.

이런 데이터는 라우팅 규칙을 통해 전달할 수 있습니다.
[ActivatedRoute](api/router/ActivatedRoute) 인터페이스를 활용하면 됩니다.

라우팅 규칙으로 전달된 데이터를 참조해 봅시다:

1.  `provideRouter` 메서드에 `withComponentInputBinding`을 추가합니다.

    <code-example header="provideRouter feature" path="router/src/app/app-routing.module.11.ts" region="withComponentInputBinding"></code-example>

1.  컴포넌트 프로퍼티에 `Input` 데코레이터를 지정합니다.

    <code-example header="컴포넌트의 입력 프로퍼티 (일부)" path="router/src/app/heroes/hero-detail/hero-detail.component.4.ts" region="id-input"></code-example>

    <div class="alert is-helpful">

    **참고:** <br>
    라우팅 규칙 데이터는 키-값 형태로 컴포넌트 입력으로 받을 수도 있습니다. 정적 데이터, 주소에 있는 인자, 매트릭스 인자, 쿼리 인자 모두 활용할 수 있습니다.

    </div>


<a id="wildcard-route-how-to"></a>
<a id="setting-up-wildcard-routes"></a>

<!--
## Setting up wildcard routes
-->
## 와일드카드(`*`) 라우팅 규칙 등록하기

<!--
A well-functioning application should gracefully handle when users attempt to navigate to a part of your application that does not exist.
To add this functionality to your application, you set up a wildcard route.
The Angular router selects this route any time the requested URL doesn't match any router paths.

To set up a wildcard route, add the following code to your `routes` definition.

<code-example header="AppRoutingModule (excerpt)">

{ path: '**', component: &lt;component-name&gt; }

</code-example>

The two asterisks, `**`, indicate to Angular that this `routes` definition is a wildcard route.
For the component property, you can define any component in your application.
Common choices include an application-specific `PageNotFoundComponent`, which you can define to [display a 404 page](guide/router#404-page-how-to) to your users; or a redirect to your application's main component.
A wildcard route is the last route because it matches any URL.
For more detail on why order matters for routes, see [Route order](guide/router#route-order).
-->
완성도 높은 애플리케이션이라면 애플리케이션이 허용하지 않는 주소로 사용자가 접근하는 상황도 자연스럽게 처리해야 합니다.
이 기능을 구현하려면 와일드카드 라우팅 규칙을 추가하면 됩니다.
이 규칙을 등록하면 사용자가 등록되지 않은 URL로 화면을 이동하려고 할 때 와일드카드 라우팅 규칙이 적용됩니다.

와일드카드 라우팅 규칙을 설정하려면 `routes` 배열에 다음 코드를 추가하면 됩니다.

<code-example header="AppRoutingModule (일부)">

{ path: '**', component: &lt;component-name&gt; }

</code-example>

별표\(`*`, asterisk\) 2개가 사용된 `**`는 Angular가 와일드카드 라우팅 규칙을 구분하기 위한 문자열입니다.
그리고 `component`에는 와일드카드 라우팅 규칙이 적용될 때 화면에 표시할 컴포넌트를 지정합니다.
일반적으로는 `PageNotFoundComponent`와 같은 컴포넌트를 만들어서 [404 에러 페이지](guide/router#404-page-how-to)를 표시하거나, 애플리케이션 최상위 주소로 리다이렉션하는 방법을 선택할 수 있습니다.
와일드카드 라우팅 규칙은 모든 URL과 매칭되기 때문에 라우팅 규칙 중 가장 나중에 등록해야 합니다.
라우팅 규칙의 순서에 대해 자세하게 알아보려면 [라우팅 규칙 적용 순서](guide/router#route-order) 문서를 참고하세요.


<a id="404-page-how-to"></a>

<!--
## Displaying a 404 page
-->
## 404 에러 페이지 표시하기

<!--
To display a 404 page, set up a [wildcard route](guide/router#wildcard-route-how-to) with the `component` property set to the component you'd like to use for your 404 page as follows:

<code-example header="AppRoutingModule (excerpt)" path="router/src/app/app-routing.module.8.ts" region="routes-with-wildcard"></code-example>

The last route with the `path` of `**` is a wildcard route.
The router selects this route if the requested URL doesn't match any of the paths earlier in the list and sends the user to the `PageNotFoundComponent`.
-->
404 에러 페이지를 표시하려면 [와일드카드 라우팅 규칙](guide/router#wildcard-route-how-to)을 등록할 때 `component`에 원하는 컴포넌트를 지정하면 됩니다:

<code-example header="AppRoutingModule (일부)" path="router/src/app/app-routing.module.8.ts" region="routes-with-wildcard"></code-example>

마지막에 등록된 `path`가 `**`인 라우팅 규칙이 와일드카드 라우팅 규칙입니다.
이제 접속하려는 URL과 매칭되는 라우팅 규칙을 발견하지 못하면 이 라우팅 규칙이 적용되면서 `PageNotFoundComponent`가 화면에 표시됩니다.


<!--
## Setting up redirects
-->
## 리다이렉션 설정하기

<!--
To set up a redirect, configure a route with the `path` you want to redirect from, the `component` you want to redirect to, and a `pathMatch` value that tells the router how to match the URL.

<code-example header="AppRoutingModule (excerpt)" path="router/src/app/app-routing.module.8.ts" region="redirect"></code-example>

In this example, the third route is a redirect so that the router defaults to the `first-component` route.
Notice that this redirect precedes the wildcard route.
Here, `path: ''` means to use the initial relative URL \(`''`\).

For more details on `pathMatch` see [Spotlight on `pathMatch`](guide/router-tutorial-toh#pathmatch).
-->
리다이렉션하는 라우팅 규칙을 등록하려면 `path`에 대상이 될 주소를 지정하고 `redirectTo`에 리다이렉션할 주소를 지정한 뒤에 `pathMatch`에 원하는 리다이렉션할 때 적용할 규칙을 지정합니다.

<code-example header="AppRoutingModule (일부)" path="router/src/app/app-routing.module.8.ts" region="redirect"></code-example>

이 예제에서 세번째 추가된 라우팅 규칙은 기본 주소로 접근했을 때 `first-component` 주소로 이동하도록 작성한 리다이렉션 라우팅 규칙입니다.
이 규칙이 와일드카드 라우팅 앞에 온다는 것도 확인해 보세요.
이 예제에서 작성한 `path: ''`는 애플리케이션을 접속하는 기본 URL\(`''`\)을 의미합니다.

`pathMatch`에 대해 자세하게 알아보려면 [`pathMatch` 자세하게 알아보기](guide/router-tutorial-toh#pathmatch) 문서를 참고하세요.


<a id="nesting-routes"></a>

<!--
## Nesting routes
-->
## 중첩 라우팅 규칙

<!--
As your application grows more complex, you might want to create routes that are relative to a component other than your root component.
These types of nested routes are called child routes.
This means you're adding a second `<router-outlet>` to your app, because it is in addition to the `<router-outlet>` in `AppComponent`.

In this example, there are two additional child components, `child-a`, and `child-b`.
Here, `FirstComponent` has its own `<nav>` and a second `<router-outlet>` in addition to the one in `AppComponent`.

<code-example header="In the template" path="router/src/app/app.component.8.html" region="child-routes"></code-example>

A child route is like any other route, in that it needs both a `path` and a `component`.
The one difference is that you place child routes in a `children` array within the parent route.

<code-example header="AppRoutingModule (excerpt)" path="router/src/app/app-routing.module.9.ts" region="child-routes"></code-example>
-->
애플리케이션이 점점 복잡해지다 보면 특정 컴포넌트 안에서 동작하는 라우팅 규칙을 추가하고 싶은 경우도 있습니다.
이렇게 중첩된 라우팅 규칙을 자식 라우팅 규칙(child route)이라고 합니다.
라우팅 규칙을 중첩해서 적용하려면 컴포넌트에 `<router-outlet>`을 더 추가해야 합니다.
왜냐하면 첫번째 계층에서 동작하는 라우팅 규칙은 `AppComponent`의 `<router-outlet>` 안에서 동작하기 때문입니다.

아래 예제 코드에는 자식 컴포넌트가 `child-a`, `child-b` 2개 존재합니다.
그리고 `FirstComponent`에는 `<nav>`가 존재하며 `AppComponent`에 있는 `<router-outlet>` 외에 또다른 `<router-outlet>`이 추가되어 있습니다.

<code-example header="템플릿에서" path="router/src/app/app.component.8.html" region="child-routes"></code-example>

자식 라우팅 규칙도 일반 라우팅 규칙과 마찬가지로 `path`, `component` 프로퍼티로 정의합니다.
자식 라우팅 규칙은 부모 라우팅 규칙이 있고, 부모 라우팅 규칙의 `children` 배열에 정의한다는 점만 다릅니다.

<code-example header="AppRoutingModule (일부)" path="router/src/app/app-routing.module.9.ts" region="child-routes"></code-example>


<a id="setting-the-page-title"></a>

<!--
## Setting the page title
-->
## 화면 이름 설정하기

<!--
Each page in your application should have a unique title so that they can be identified in the browser history.
The `Router` sets the document's title using the `title` property from the `Route` config.

<code-example header="AppRoutingModule (excerpt)" path="router/src/app/app-routing.module.10.ts" region="page-title"></code-example>

<div class="alert is-helpful">

**NOTE**: <br /> The `title` property follows the same rules as static route `data` and dynamic values that implement `ResolveFn`.

</div>

You can also provide a custom title strategy by extending the `TitleStrategy`.

<code-example header="AppRoutingModule (excerpt)" path="router/src/app/app-routing.module.10.ts" region="custom-page-title"></code-example>
-->
애플리케이션의 개별 화면들은 유일한 이름을 가져야 브라우저 히스토리에서 확인할 수 있습니다.
그렇다면 `Router`에서 `Route`를 설정할 때 `title` 프로퍼티로 화면의 이름을 설정할 수 있습니다.

<code-example header="AppRoutingModule (일부)" path="router/src/app/app-routing.module.10.ts" region="page-title"></code-example>

<div class="alert is-helpful">

**참고**: <br /> `title` 프로퍼티는 정적 라우팅 변수인 `data`와 동일하게 처리되며, `Resolve`를 사용해서 동적으로 처리할 수도 있습니다.

</div>

그리고 `TitleStrategy`를 활용하면 커스텀 정책을 사용할 수도 있습니다.

<code-example header="AppRoutingModule (일부)" path="router/src/app/app-routing.module.10.ts" region="custom-page-title"></code-example>


<a id="using-relative-paths"></a>

<!--
## Using relative paths
-->
## 상대주소 사용하기

<!--
Relative paths let you define paths that are relative to the current URL segment.
The following example shows a relative route to another component, `second-component`.
`FirstComponent` and `SecondComponent` are at the same level in the tree, however, the link to `SecondComponent` is situated within the `FirstComponent`, meaning that the router has to go up a level and then into the second directory to find the `SecondComponent`.
Rather than writing out the whole path to get to `SecondComponent`, use the `../` notation to go up a level.

<code-example header="In the template" path="router/src/app/app.component.8.html" region="relative-route"></code-example>

In addition to `../`, use `./` or no leading slash to specify the current level.
-->
상대주소를 사용하면 현재 URL를 기준으로 라우팅할 주소를 지정할 수 있습니다.
아래 예제는 `second-component`로 이동하는 링크에 상대주소를 적용한 예제 코드입니다.
`FirstComponent`와 `SecondComponent`는 라우팅 계층 트리에서 같은 계층에 있지만 `FirstComponent` 안에서 `SecondComponent`로 이동하는 기능을 제공하려고 합니다.
결국 상위 계층으로 한단계 이동한 후에 `SecondComponent`를 찾아야 합니다.
이 때 `SecondComponent`로 이동하는 전체 경로를 사용하는 대신 상대 주소를 가리키는 방식으로 `../` 라는 표현을 사용했습니다.

<code-example header="In the template" path="router/src/app/app.component.8.html" region="relative-route"></code-example>

`../`와 비슷하게 `./`, `.`를 사용하면 현재 라우팅 계층의 빈 주소를 가리킵니다.

<!--
### Specifying a relative route
-->
### 상대 주소로 이동하기

<!--
To specify a relative route, use the `NavigationExtras` `relativeTo` property.
In the component class, import `NavigationExtras` from the `@angular/router`.

Then use `relativeTo` in your navigation method.
After the link parameters array, which here contains `items`, add an object with the `relativeTo` property set to the `ActivatedRoute`, which is `this.route`.

<code-example header="RelativeTo" path="router/src/app/app.component.4.ts" region="relative-to">

The `navigate()` arguments configure the router to use the current route as a basis upon which to append `items`.

</code-example>

The `goToItems()` method interprets the destination URI as relative to the activated route and navigates to the `items` route.
-->
상대 라우팅 규칙을 지정하려면 `NavigationExtras` 객체의 `relativeTo` 프로퍼티를 사용하면 됩니다.
`NavigationExtras` 객체는 `@angular/router`에 정의되어 있는 객체입니다.

화면을 이동할 때 `relativeTo` 옵션을 사용해 봅시다.
아래 예제에서 `items`로 지정된 링크 인자 배열 뒤에 객체 옵션을 추가하고 이 객체에 `relativeTo` 프로퍼티로 `ActivatedRoute`를 지정합니다.
이 예제의 경우에는 `this.route` 입니다.

<code-example header="RelativeTo" path="router/src/app/app.component.4.ts" region="relative-to">

그러면 `navigate()` 함수가 실행되면서 `items` 주소로 이동할 때 현재 라우팅 규칙에 대한 상대 주소로 이 주소를 처리합니다.

</code-example>

`goToItems()` 메서드는 최종 목적지를 결정한 후에 현재 활성화된 라우팅 규칙의 상대 주소 `items`로 이동합니다.


<a id="accessing-query-parameters-and-fragments"></a>
<!--
## Accessing query parameters and fragments
-->
## 쿼리 인자, URL 조각 참고하기

<!--
Sometimes, a feature of your application requires accessing a part of a route, such as a query parameter or a fragment.
The Tour of Heroes application at this stage in the tutorial uses a list view in which you can click on a hero to see details.
The router uses an `id` to show the correct hero's details.

First, import the following members in the component you want to navigate from.

<code-example header="Component import statements (excerpt)">

import { ActivatedRoute } from '&commat;angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

</code-example>

Next inject the activated route service:

<code-example header="Component (excerpt)">

constructor(private route: ActivatedRoute) {}

</code-example>

Configure the class so that you have an observable, `heroes$`, a `selectedId` to hold the `id` number of the hero, and the heroes in the `ngOnInit()`, add the following code to get the `id` of the selected hero.
This code snippet assumes that you have a heroes list, a hero service, a function to get your heroes, and the HTML to render your list and details, just as in the Tour of Heroes example.

<code-example header="Component 1 (excerpt)">

heroes&dollar;: Observable&lt;Hero[]&gt;;
selectedId: number;
heroes = HEROES;

ngOnInit() {
  this.heroes&dollar; = this.route.paramMap.pipe(
    switchMap(params =&gt; {
      this.selectedId = Number(params.get('id'));
      return this.service.getHeroes();
    })
  );
}

</code-example>

Next, in the component that you want to navigate to, import the following members.

<code-example header="Component 2 (excerpt)">

import { Router, ActivatedRoute, ParamMap } from '&commat;angular/router';
import { Observable } from 'rxjs';

</code-example>

Inject `ActivatedRoute` and `Router` in the constructor of the component class so they are available to this component:

<code-example header="Component 2 (excerpt)">

hero&dollar;: Observable&lt;Hero&gt;;

constructor(
  private route: ActivatedRoute,
  private router: Router  ) {}

ngOnInit() {
  const heroId = this.route.snapshot.paramMap.get('id');
  this.hero&dollar; = this.service.getHero(heroId);
}

gotoItems(hero: Hero) {
  const heroId = hero ? hero.id : null;
  // Pass along the hero id if available
  // so that the HeroList component can select that item.
  this.router.navigate(['/heroes', { id: heroId }]);
}

</code-example>
-->
때로는 쿼리 변수나 URL 조각 같은 라우팅 규칙 관련 정보에 접근해야 할 때가 있습니다.
히어로들의 여행 앱에서도 사용자가 히어로를 클릭하면 상세정보 화면으로 이동하는데, 이 때 히어로의 `id`를 인자로 받아서 화면을 구성합니다.

먼저, 아래 심볼들을 컴포넌트 파일에 로드합니다.

<code-example header="Component import statements (일부)">

import { ActivatedRoute } from '&commat;angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

</code-example>

그리고 현재 활성화된 라우팅 규칙\(`ActivatedRoute`\)을 의존성으로 주입합니다:

<code-example header="Component (일부)">

constructor(private route: ActivatedRoute) {}

</code-example>

이제 컴포넌트 클래스 `ngOnInit()` 안에서 현재 활성화 된 라우팅 규칙으로 전달되는 `id` 필드를 컴포넌트 클래스의 옵저버블 프로퍼티 `heroes$`에 할당해 봅시다.
이 때 히어로 목록은 배열로 존재하며, 관련 서비스가 이미 주입되어 있고, 화면을 표시하는 템플릿 코드도 이미 준비되어 있다고 합시다.

<code-example header="Component 1 (일부)">

heroes&dollar;: Observable&lt;Hero[]&gt;;
selectedId: number;
heroes = HEROES;

ngOnInit() {
  this.heroes&dollar; = this.route.paramMap.pipe(
    switchMap(params =&gt; {
      this.selectedId = Number(params.get('id'));
      return this.service.getHeroes();
    })
  );
}

</code-example>

다음에는 이동하려는 컴포넌트 파일에 이런 심볼들을 로드합니다:

<code-example header="Component 2 (일부)">

import { Router, ActivatedRoute, ParamMap } from '&commat;angular/router';
import { Observable } from 'rxjs';

</code-example>

컴포넌트 클래스의 생성자에 `ActivatedRoute`와 `Router`를 의존성으로 주입하면 라우터 관련 정보를 참조할 수 있습니다:

<code-example header="Component 2 (일부)">

hero&dollar;: Observable&lt;Hero&gt;;

constructor(
  private route: ActivatedRoute,
  private router: Router  ) {}

ngOnInit() {
  const heroId = this.route.snapshot.paramMap.get('id');
  this.hero&dollar; = this.service.getHero(heroId);
}

gotoItems(hero: Hero) {
  const heroId = hero ? hero.id : null;
  // Pass along the hero id if available
  // so that the HeroList component can select that item.
  this.router.navigate(['/heroes', { id: heroId }]);
}

</code-example>

<a id="lazy-loading"></a>

<!--
## Lazy loading
-->
## 지연 로딩

<!--
You can configure your routes to lazy load modules, which means that Angular only loads modules as needed, rather than loading all modules when the application launches.
Additionally, preload parts of your application in the background to improve the user experience.

For more information on lazy loading and preloading see the dedicated guide [Lazy loading NgModules](guide/lazy-loading-ngmodules).
-->
Angular 앱이 실행되는 시점에 로딩되지 않고 필요한 시점에 따로 로딩되는 모듈을 지연 로딩되는 모듈(lazy load module)이라고 합니다.
모듈을 지연로딩하면 앱 초기 실행시간이 짧아지기 때문에 사용자에게 좀 더 나은 사용성을 제공할 수 있습니다.
라우팅 규칙을 정의할 때 지연 로딩되는 모듈로 향하는 라우팅 규칙을 정의할 수 있습니다.

자세한 내용은 지연 로딩과 사전 로딩에 대해 다루는 [NgModule 지연 로딩](guide/lazy-loading-ngmodules) 문서를 참고하세요.


<a id="preventing-unauthorized-access"></a>

<!--
## Preventing unauthorized access
-->
## 허가되지 않은 접근 차단하기

<!--
Use route guards to prevent users from navigating to parts of an application without authorization.
The following route guards are available in Angular:

*   [`canActivate`](api/router/CanActivateFn)
*   [`canActivateChild`](api/router/CanActivateChildFn)
*   [`canDeactivate`](api/router/CanDeactivateFn)
*   [`canMatch`](api/router/CanMatchFn)
*   [`resolve`](api/router/ResolveFn)
*   [`canLoad`](api/router/CanLoadFn)

To use route guards, consider using [component-less routes](api/router/Route#componentless-routes) as this facilitates guarding child routes.

Create a file for your guard:

<code-example format="shell" language="shell">

ng generate guard your-guard

</code-example>

In your guard file, add the guard functions you want to use.
The following example uses `canActivateFn` to guard the route.

<code-example header="guard (excerpt)">

export const yourGuardFunction: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) => {
      // your  logic goes here
  }
</code-example>
In your routing module, use the appropriate property in your `routes` configuration.
Here, `canActivate` tells the router to mediate navigation to this particular route.
<code-example header="Routing module (excerpt)">
{
  path: '/your-path',
  component: YourComponent,
  canActivate: [yourGuardFunction],
}

</code-example>

For more information with a working example, see the [routing tutorial section on route guards](guide/router-tutorial-toh#milestone-5-route-guards).
-->
라우팅 가드를 사용하면 허가되지 않은 앱 영역으로 사용자가 이동하는 것을 방지할 수 있습니다.
Angular는 다음과 같은 라우팅 가드를 제공합니다:

*   [`CanActivate`](api/router/CanActivate)
*   [`CanActivateChild`](api/router/CanActivateChild)
*   [`CanDeactivate`](api/router/CanDeactivate)
*   [`Resolve`](api/router/Resolve)
*   [`CanLoad`](api/router/CanLoad)

라우팅 가드를 사용할 때는 [컴포넌트가 없는(component-less)](api/router/Route#componentless-routes) 라우팅 규칙을 따로 정의해서 자식 라우팅 규칙을 모두 보호하는 방법도 고려해볼만 합니다.

Angular CLI로 가드를 생성하려면 이런 명령을 실행하면 됩니다:

<code-example format="shell" language="shell">

ng generate guard your-guard

</code-example>

가드 클래스에는 가드가 동작하는 로직을 작성합니다.
아래 예제는 `CanActivate`를 활용하는 가드 예제 코드입니다.

<code-example header="Component (일부)">

export class YourGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // your  logic goes here
  }
}

</code-example>

그리고 라우팅 모듈에서 `routes` 배열에 라우팅 가드가 동작할 프로퍼티를 지정하면 됩니다.
이번 예제에서는 `canActivate` 프로퍼티를 사용해서 해당 라우팅 규칙을 보호하는 방식으로 구현했습니다.

<code-example header="라우팅 모듈 (일부)">

{
  path: '/your-path',
  component: YourComponent,
  canActivate: [YourGuard],
}

</code-example>

더 자세한 내용은 [라우팅 튜토리얼의 라우팅 가드 섹션](guide/router-tutorial-toh#milestone-5-route-guards)을 참고하세요.


<a id="link-parameters-array"></a>

<!--
## Link parameters array
-->
## 링크 변수 배열

<!--
A link parameters array holds the following ingredients for router navigation:

*   The path of the route to the destination component
*   Required and optional route parameters that go into the route URL

Bind the `RouterLink` directive to such an array like this:

<code-example header="src/app/app.component.ts (h-anchor)" path="router/src/app/app.component.3.ts" region="h-anchor"></code-example>

The following is a two-element array when specifying a route parameter:

<code-example header="src/app/heroes/hero-list/hero-list.component.html (nav-to-detail)" path="router/src/app/heroes/hero-list/hero-list.component.1.html" region="nav-to-detail"></code-example>

Provide optional route parameters in an object, as in `{ foo: 'foo' }`:

<code-example header="src/app/app.component.ts (cc-query-params)" path="router/src/app/app.component.3.ts" region="cc-query-params"></code-example>

These three examples cover the needs of an application with one level of routing.
However, with a child router, such as in the crisis center, you create new link array possibilities.

The following minimal `RouterLink` example builds upon a specified [default child route](guide/router-tutorial-toh#a-crisis-center-with-child-routes) for the crisis center.

<code-example header="src/app/app.component.ts (cc-anchor-w-default)" path="router/src/app/app.component.3.ts" region="cc-anchor-w-default"></code-example>

Review the following:

*   The first item in the array identifies the parent route \(`/crisis-center`\)
*   There are no parameters for this parent route
*   There is no default for the child route so you need to pick one
*   You're navigating to the `CrisisListComponent`, whose route path is `/`, but you don't need to explicitly add the slash

Consider the following router link that navigates from the root of the application down to the Dragon Crisis:

<code-example header="src/app/app.component.ts (Dragon-anchor)" path="router/src/app/app.component.3.ts" region="Dragon-anchor"></code-example>

*   The first item in the array identifies the parent route \(`/crisis-center`\)
*   There are no parameters for this parent route
*   The second item identifies the child route details about a particular crisis \(`/:id`\)
*   The details child route requires an `id` route parameter
*   You added the `id` of the Dragon Crisis as the second item in the array \(`1`\)
*   The resulting path is `/crisis-center/1`

You could also redefine the `AppComponent` template with Crisis Center routes exclusively:

<code-example header="src/app/app.component.ts (template)" path="router/src/app/app.component.3.ts" region="template"></code-example>

In summary, you can write applications with one, two or more levels of routing.
The link parameters array affords the flexibility to represent any routing depth and any legal sequence of route paths, \(required\) router parameters, and \(optional\) route parameter objects.
-->
링크 변수 배열\(link parameters array\)은 현재 라우팅과 관련해서 이런 정보를 담고 있습니다:

*   표시되는 컴포넌트와 관련된 라우팅 규칙\(route\)
*   라우팅 규칙 URL에 포함된 필수/옵션 라우팅 변수

`RouterLink` 디렉티브가 적용된 링크가 하나 있다고 합시다:

<code-example header="src/app/app.component.ts (링크 엘리먼트)" path="router/src/app/app.component.3.ts" region="h-anchor"></code-example>

이 링크가 동작하면서 인자를 함께 전달하려면 디렉티브에 바인딩되는 배열을 다음과 같이 수정하면 됩니다:

<code-example header="src/app/heroes/hero-list/hero-list.component.html (상세정보로 이동하는 링크)" path="router/src/app/heroes/hero-list/hero-list.component.1.html" region="nav-to-detail"></code-example>

라우팅 인자는 `{ foo: 'foo' }`와 같은 객체 형태도 전달할 수 있습니다:

<code-example header="src/app/app.component.ts (쿼리 인자)" path="router/src/app/app.component.3.ts" region="cc-query-params"></code-example>

이 세가지 예제를 활용하면 한 계층에서 발생하는 라우팅 동작을 거의 구현할 수 있습니다.
그런데 위기대응센터 화면처럼 자식 라우터가 있다면 조금 다릅니다.

아래 코드는 위기대응센터 화면에 사용했던 [기본 자식 라우팅 규칙](guide/router-tutorial-toh#a-crisis-center-with-child-routes) 링크를 정의한 코드입니다.

<code-example header="src/app/app.component.ts (위기대응센터 기본 링크)" path="router/src/app/app.component.3.ts" region="cc-anchor-w-default"></code-example>

이 코드에서 이런 내용을 확인할 수 있습니다:

*   배열의 첫번째 항목은 부모 라우팅 규칙 `/crisis-center`를 의미합니다.
*   부모 라우팅 규칙에 전달되는 라우팅 인자는 없습니다.
*   부모 라우팅 규칙의 기본 주소가 없다면 자식 라우팅 규칙 중 하나를 지정해야 합니다.
*   기본 주소를 `CrisisListComponent`와 연결했다면 `/crisis-center/` 라고 지정해야 하지만, 마지막 슬래시\(`/`\)는 생략할 수 있습니다.

이번에는 위기대응센터 화면에 있는 링크 중에서 Dragon 위기로 이동하는 링크를 살펴봅시다:

<code-example header="src/app/app.component.ts (Dragon 링크)" path="router/src/app/app.component.3.ts" region="Dragon-anchor"></code-example>

*   배열의 첫번째 항목은 부모 라우팅 규칙 `/crisis-center`를 의미합니다.
*   부모 라우팅 규칙에 전달되는 라우팅 인자는 없습니다.
*   배열의 두번째 항목은 자식 라우팅 규칙에 적용될 조건(`/:id`)를 의미합니다.
*   자식 라우팅 규칙에서는 라우팅 인자 `id`를 참조해서 상세정보를 가져옵니다.
*   Dragon 위기에 해당하는 `id` 값(`1`)은 배열 두번째 항목으로 전달합니다.
*   최종 주소는 `/crisis-center/1`이 됩니다.

그러면 `AppComponent` 템플릿을 이렇게 정의할 수 있습니다:

<code-example header="src/app/app.component.ts (템플릿)" path="router/src/app/app.component.3.ts" region="template"></code-example>

정리하자면, 애플리케이션은 라우팅 계층의 깊이와 관계없이 자유롭게 화면을 전환할 수 있습니다.
링크 인자 배열을 활용하면 원하는 계층으로 이동하면서, 필수/옵션 라우팅 인자를 함께 전달할 수 있습니다.


<a id="browser-url-styles"></a>
<a id="location-strategy"></a>

<!--
## `LocationStrategy` and browser URL styles
-->
## `LocationStrategy`, 브라우저 URL 스타일

<!--
When the router navigates to a new component view, it updates the browser's location and history with a URL for that view.

Modern HTML5 browsers support [history.pushState](https://developer.mozilla.org/docs/Web/API/History_API/Working_with_the_History_API#adding_and_modifying_history_entries "HTML5 browser history push-state"), a technique that changes a browser's location and history without triggering a server page request.
The router can compose a "natural" URL that is indistinguishable from one that would otherwise require a page load.

Here's the Crisis Center URL in this "HTML5 pushState" style:

<code-example format="none" language="http">

localhost:3002/crisis-center

</code-example>

Older browsers send page requests to the server when the location URL changes unless the change occurs after a "#" \(called the "hash"\).
Routers can take advantage of this exception by composing in-application route URLs with hashes.
Here's a "hash URL" that routes to the Crisis Center.

<code-example format="none" language="http">

localhost:3002/src/#/crisis-center

</code-example>

The router supports both styles with two `LocationStrategy` providers:

| Providers              | Details |
|:---                    |:---     |
| `PathLocationStrategy` | The default "HTML5 pushState" style. |
| `HashLocationStrategy` | The "hash URL" style.                |

The `RouterModule.forRoot()` function sets the `LocationStrategy` to the `PathLocationStrategy`, which makes it the default strategy.
You also have the option of switching to the `HashLocationStrategy` with an override during the bootstrapping process.

<div class="alert is-helpful">

For more information on providers and the bootstrap process, see [Dependency Injection](guide/dependency-injection-providers).

</div>
-->
화면에 새로운 컴포넌트를 표시하게 되면 브라우저의 주소와 히스토리가 변경됩니다.

최신 HTML5 브라우저는 [history.pushState](https://developer.mozilla.org/docs/Web/API/History_API/Working_with_the_History_API#adding_and_modifying_history_entries "HTML5 browser history push-state") API를 제공합니다.
이 API를 활용하면 서버로 새로운 페이지 요청을 보내지 않으면서 브라우저의 주소나 히스토리를 변경할 수 있습니다.
그리고 Angular 라우터는 새로운 페이지 로드가 필요한 URL과 구별하지 않으면서 자연스러운 URL을 처리할 수 있습니다.

"HTML5 pushState" 스타일로 구성되는 위기대응센터 URL은 이렇습니다:

<code-example format="none" language="http">

localhost:3002/crisis-center

</code-example>

오래된 브라우저는 접근하는 URL이 변경될 때 발생하는 새 페이지 요청을 생략하기 위해 해시 기호(`#`)를 붙이는 방법을 사용하기도 합니다.
물론 Angular에서는 이런 방식의 URL도 사용할 수 있습니다.
해시 URL 스타일로 구성되는 위기대응센터 URL은 이렇습니다:

<code-example format="none" language="http">

localhost:3002/src/#/crisis-center

</code-example>

두가지 스타일 중 어떤 스타일을 사용할지는 Angular `LocationStrategy` 프로바이더를 지정하는 방법으로 결정할 수 있습니다.

| 프로바이더                  | 설명                                       |
|:-----------------------|:-----------------------------------------|
| `PathLocationStrategy` | HTML5 pushState 스타일을 사용합니다. 이 값이 기본값입니다. |
| `HashLocationStrategy` | 해시 URL 스타일을 사용합니다.                       |

기본 상태에서는 `RouterModule.forRoot()` 함수에서 `LocationStrategy`를 `PathLocationStrategy`로 설정하고 있습니다.
`HashLocationStrategy`를 사용하려면 앱을 부트스트랩 할 때 이 값을 지정하면 됩니다.

<div class="alert is-helpful">

부트스트랩 과정에 대해 자세하게 알아보려면 [의존성 주입](guide/dependency-injection-providers) 문서를 참고하세요.

</div>


<!--
## Choosing a routing strategy
-->
## URL 스타일 결정하기

<!--
You must choose a routing strategy early in the development of your project because once the application is in production, visitors to your site use and depend on application URL references.

Almost all Angular projects should use the default HTML5 style.
It produces URLs that are easier for users to understand and it preserves the option to do server-side rendering.

Rendering critical pages on the server is a technique that can greatly improve perceived responsiveness when the application first loads.
An application that would otherwise take ten or more seconds to start could be rendered on the server and delivered to the user's device in less than a second.

This option is only available if application URLs look like normal web URLs without hash \(`#`\) characters in the middle.
-->
URL 스타일은 프로젝트 개발 단계 이전에 결정하는 것이 좋습니다.
왜냐하면 애플리케이션이 운영중인 상태에서는 제공되는 URL을 기준으로 사용자가 접근하기 때문입니다.

대부분의 Angular 프로젝트는 기본 HTML5 스타일을 따릅니다.
이 스타일을 사용하면 사용자가 주소를 이해하기 쉽고 서버사이드 렌더링을 적용하기도 쉽습니다.

앱 페이지를 서버에서 미리 렌더링하고 제공하는 방식은 애플리케이션의 초기 실행 속도를 높이는 데에 큰 도움이 됩니다.
서버에서 렌더링하는 데 10초 이상이 걸리더라도 이 페이지가 미리 렌더링 된 후에 사용자 디바이스에서 실행되는 것은 1초도 걸리지 않습니다.

하지만 이 방식은 중간에 해시 기호\(`#`\)가 없는 URL 스타일일때만 가능합니다.


## `<base href>`

<!--
The router uses the browser's [history.pushState](https://developer.mozilla.org/docs/Web/API/History_API/Working_with_the_History_API#adding_and_modifying_history_entries "HTML5 browser history push-state") for navigation.
`pushState` lets you customize in-application URL paths; for example, `localhost:4200/crisis-center`.
The in-application URLs can be indistinguishable from server URLs.

Modern HTML5 browsers were the first to support `pushState` which is why many people refer to these URLs as "HTML5 style" URLs.

<div class="alert is-helpful">

HTML5 style navigation is the router default.
In the [LocationStrategy and browser URL styles](#browser-url-styles) section, learn why HTML5 style is preferable, how to adjust its behavior, and how to switch to the older hash \(`#`\) style, if necessary.

</div>

You must add a [`<base href>` element](https://developer.mozilla.org/docs/Web/HTML/Element/base "base href") to the application's `index.html` for `pushState` routing to work.
The browser uses the `<base href>` value to prefix relative URLs when referencing CSS files, scripts, and images.

Add the `<base>` element just after the `<head>` tag.
If the `app` folder is the application root, as it is for this application, set the `href` value in `index.html` as shown here.

<code-example header="src/index.html (base-href)" path="router/src/index.html" region="base-href"></code-example>
-->
브라우저는 화면을 전환할 때 브라우저의 [history.pushState](https://developer.mozilla.org/docs/Web/API/History_API/Working_with_the_History_API#adding_and_modifying_history_entries "HTML5 browser history push-state")를 활용합니다.
`pushState`를 활용하면 앱 URL 주소를 `localhost:4200/crisis-center` 처럼 구성할 수 있습니다.
앱 안에서 사용하는 URL과 서버에 요청하는 URL은 다릅니다.

최근에는 사용자들이 HTML5 스타일로 URL을 사용하기 때문에 최신 HTML5 브라우저도 대부분 `pushState`를 제공하고 있습니다.

<div class="alert is-helpful">

HTML5 스타일로 URL을 구성하는 것이 라우터 기본 설정입니다.
그리고 [LocationStrategy, 브라우저 URL 스타일](#browser-url-styles) 섹션에서 설명한 것처럼 HTML5 스타일을 사용하는 것이 좋지만, 필요하다면 이전 스타일(`#`)을 사용할 수도 있습니다.

</div>

`pushState` 방식으로 화면을 전환하려면 [`<base href>` 엘리먼트](https://developer.mozilla.org/docs/Web/HTML/Element/base "base href")를 반드시 `index.html` 파일에 설정해야 합니다.
앱에서 상대 URL로 무언가를 요청하면 `<base href>`에 지정된 값에 따라 CSS 파일이나 스크립트 파일, 이미지 파일을 로드합니다.

`<base>` 엘리먼트는 `<head>` 태그 바로 뒤에 추가합니다.
애플리케이션 최상위 경로가 `app` 폴더라면 `index.html` 파일을 이렇게 지정하면 됩니다:

<code-example header="src/index.html (base-href)" path="router/src/index.html" region="base-href"></code-example>


<!--
### HTML5 URLs and the `<base href>`
-->
### HTML5 URL, `<base href>`

<!--
The guidelines that follow will refer to different parts of a URL.
This diagram outlines what those parts refer to:

<code-example format="output" hideCopy language="none">

foo://example.com:8042/over/there?name=ferret#nose
&bsol;&lowbar;/   &bsol;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;/&bsol;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;/ &bsol;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;/ &bsol;&lowbar;&lowbar;/
 &verbar;           &verbar;            &verbar;            &verbar;        &verbar;
scheme    authority      path        query   fragment

</code-example>

While the router uses the [HTML5 pushState](https://developer.mozilla.org/docs/Web/API/History_API#Adding_and_modifying_history_entries "Browser history push-state") style by default, you must configure that strategy with a `<base href>`.

The preferred way to configure the strategy is to add a [`<base href>` element](https://developer.mozilla.org/docs/Web/HTML/Element/base "base href") tag in the `<head>` of the `index.html`.

<code-example header="src/index.html (base-href)" path="router/src/index.html" region="base-href"></code-example>

Without that tag, the browser might not be able to load resources \(images, CSS, scripts\) when "deep linking" into the application.

Some developers might not be able to add the `<base>` element, perhaps because they don't have access to `<head>` or the `index.html`.

Those developers can still use HTML5 URLs by taking the following two steps:

1.  Provide the router with an appropriate `APP_BASE_HREF` value.
1.  Use root URLs \(URLs with an `authority`\) for all web resources: CSS, images, scripts, and template HTML files.

    *   The `<base href>` `path` should end with a "/", as browsers ignore characters in the `path` that follow the right-most "`/`"
    *   If the `<base href>` includes a `query` part, the `query` is only used if the `path` of a link in the page is empty and has no `query`.
        This means that a `query` in the `<base href>` is only included when using `HashLocationStrategy`.

    *   If a link in the page is a root URL \(has an `authority`\), the `<base href>` is not used.
        In this way, an `APP_BASE_HREF` with an authority will cause all links created by Angular to ignore the `<base href>` value.

    *   A fragment in the `<base href>` is *never* persisted

For more complete information on how `<base href>` is used to construct target URIs, see the [RFC](https://tools.ietf.org/html/rfc3986#section-5.2.2) section on transforming references.
-->
URL은 여러가지 요소로 구성되며, URL의 각 영역은 이렇게 나눠볼 수 있습니다:

<code-example format="output" hideCopy language="none">

foo://example.com:8042/over/there?name=ferret#nose
&bsol;&lowbar;/   &bsol;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;/&bsol;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;/ &bsol;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;&lowbar;/ &bsol;&lowbar;&lowbar;/
 &verbar;           &verbar;            &verbar;            &verbar;        &verbar;
스킴       도메인          경로         쿼리    프래그먼트

</code-example>

기본적으로 Angular 라우터는 [HTML5 pushState](https://developer.mozilla.org/docs/Web/API/History_API#Adding_and_modifying_history_entries "Browser history push-state") 스타일을 사용하기 때문에 `index.html` 파일의 `<head>` 안에 [`<base href>` 엘리먼트](https://developer.mozilla.org/docs/Web/HTML/Element/base "base href")를 꼭 지정해야 합니다.

<code-example header="src/index.html (base-href)" path="router/src/index.html" region="base-href"></code-example>

이 태그가 없으면 브라우저가 로드하는 이미지 파일이나 CSS, 스크립트 파일을 앱 딥 링크\(deep link\)와 구별할 수 없습니다.

때로는 `index.html` 파일이나 `<head>` 엘리먼트를 수정할 수 있는 권한이 없는 경우가 있습니다.

이런 경우에도 HTML5 방식으로 URL을 다루려면 이렇게 하면 됩니다:

1.  라우터에 `APP_BASE_HREF` 옵션을 지정합니다.
1.  CSS 파일, 이미지 파일, 스크립트 파일, 템플릿 파일 등 모든 리소스에 도메인부터 시작하는 주소를 사용합니다.

    *   `<base href>` `path`는 반드시 "/"로 끝나야 합니다. 브라우저는 `path` 가장 마지막에 사용된 "/"는 자동으로 제거합니다.
    *   `<base href>`에 쿼리 부분이 추가되면 이 쿼리는 현재 화면에 지정된 경로가 없거나 쿼리가 없는 경우에만 동작합니다.
        이 말은, `<base href>`에 사용된 쿼리는 `HashLocationStrategy`를 사용했을 때만 사용된다는 것을 의미합니다.

    *   현재 접속한 URL이 최상위 URL(도메인 기본 URL)이라면 `<base href>`는 사용되지 않습니다.
        이 경우에 Angular는 `<base href>`를 무시하고 `APP_BASE_HREF`에 설정된 값으로 링크를 처리합니다.

    *   `<base href>`에 사용된 프래그먼트는 *절대* 사용되지 않습니다.

`<base href>`이 어떻게 동작하는지, URI을 구성할 때 어떻게 활용되는지 확인하려면 [RFC](https://tools.ietf.org/html/rfc3986#section-5.2.2) 문서를 참고하세요.


<a id="hashlocationstrategy"></a>

### `HashLocationStrategy`

<!--
Use `HashLocationStrategy` by providing the `useHash: true` in an object as the second argument of the `RouterModule.forRoot()` in the `AppModule`.

<code-example header="src/app/app.module.ts (hash URL strategy)" path="router/src/app/app.module.6.ts"></code-example>
-->
`AppModule`에서 `RouterModule.forRoot()`를 실행할 때 `useHash: true` 옵션을 지정하는 방법으로도 `HashLocationStrategy` 정책을 사용할 수 있습니다.

<code-example header="src/app/app.module.ts (해시 URL 정책)" path="router/src/app/app.module.6.ts"></code-example>


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
