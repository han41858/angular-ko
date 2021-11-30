{@a router-tutorial}

<!--
# Router tutorial: tour of heroes
-->
# 라우터 튜토리얼: 히어로들의 여행

<!--
This tutorial provides an extensive overview of the Angular router.
In this tutorial, you build upon a basic router configuration to explore features such as child routes, route parameters, lazy load NgModules, guard routes, and preloading data to improve the user experience.

For a working example of the final version of the app, see the <live-example name="router"></live-example>.
-->
이번 튜토리얼에서는 Angular 라우터에 대해 깊이있게 알아봅시다.
기본 라우터 설정을 구성하는 방법부터 시작해서 자식 라우팅 규칙을 정의하는 방법, 라우터 인자를 활용하는 방법, NgModule을 지연로딩하는 방법, 라우터 가드를 사용하는 방법, 데이터를 사전 로딩해서 사용성을 개선하는 방법에 대해 알아봅니다.

이 문서에서 다루는 예제 앱이 동작하는 것을 직접 확인하려면 <live-example name="router"></live-example>를 참고하세요.


{@a router-tutorial-objectives}

<!--
## Objectives
-->
## 목표

<!--
This guide describes development of a multi-page routed sample application.
Along the way, it highlights key features of the router such as:

* Organizing the application features into modules.
* Navigating to a component (*Heroes* link to "Heroes List").
* Including a route parameter (passing the Hero `id` while routing to the "Hero Detail").
* Child routes (the *Crisis Center* has its own routes).
* The `CanActivate` guard (checking route access).
* The `CanActivateChild` guard (checking child route access).
* The `CanDeactivate` guard (ask permission to discard unsaved changes).
* The `Resolve` guard (pre-fetching route data).
* Lazy loading an `NgModule`.
* The `CanLoad` guard (check before loading feature module assets).

This guide proceeds as a sequence of milestones as if you were building the application step-by-step, but assumes you are familiar with basic [Angular concepts](guide/architecture).
For a general introduction to angular, see the [Getting Started](start). For a more in-depth overview, see the [Tour of Heroes](tutorial) tutorial.
-->
이 가이드 문서에서는 화면이 여러 개인 애플리케이션을 구현해 봅니다.
이 과정을 진행하면서 라우터와 관련해서 알아둬야 할 내용은 이런 것들이 있습니다:

* 애플리케이션 기능을 모듈 단위로 구성합니다.
* *Heroes* 링크를 사용해서 "Heroes List" 컴포넌트로 화면을 전환합니다.
* "Hero Detail" 화면으로 전환하면서 Hero `id`를 라우터 인자로 전달합니다.
* *Crisis Center* 안쪽으로 자식 라우팅 규칙을 정의합니다.
* 라우팅 규칙을 적용하기 위해 `CanActivate` 가드를 사용합니다.
* 자식 라우팅 규칙을 적용하기 위해 `CanActivateChild` 가드를 사용합니다.
* 저장되지 않은 변경사항을 폐기할지 결정하기 위해 `CanDeactivate` 가드를 사용합니다.
* 라우터 데이터를 미리 가져오기 위해 `Resolve` 가드를 사용합니다.
* `NgModule`을 지연로딩합니다.
* 기능 모듈을 로딩할지 결정하기 위해 `CanLoad` 가드를 사용합니다.

이 문서를 읽는 독자가 [Angular의 기본 개념](guide/architecture)에 대해 익숙하다고 가정하고 차근차근 라우터에 대해 알아봅시다.
[시작하기](start) 문서를 먼저 보고 이 문서를 보는 것도 좋습니다.
튜토리얼 전체 개요를 확인하려면 [히어로들의 여행 튜토리얼](tutorial) 문서를 참고하세요.


<!--
## Prerequisites
-->
## 사전지식

<!--
To complete this tutorial, you should have a basic understanding of the following concepts:

* JavaScript
* HTML
* CSS
* [Angular CLI](/cli)

You might find the [Tour of Heroes tutorial](/tutorial) helpful, but it is not required.
-->
이 문서를 제대로 이해하려면 이런 내용을 미리 알고 있는 것이 좋습니다:

* JavaScript
* HTML
* CSS
* [Angular CLI](/cli)

[히어로들의 여행 튜토리얼](/tutorial) 문서를 보는 것도 도움이 되지만 꼭 필요한 것은 아닙니다.


<!--
## The sample application in action
-->
## 예제 애플리케이션이 동작하는 모습

<!--
The sample application for this tutorial helps the Hero Employment Agency find crises for heroes to solve.

The application has three main feature areas:

1. A *Crisis Center* for maintaining the list of crises for assignment to heroes.
1. A *Heroes* area for maintaining the list of heroes employed by the agency.
1. An *Admin* area to manage the list of crises and heroes.

Try it by clicking on this <live-example name="router" title="Hero Employment Agency Live Example">live example link</live-example>.

The application renders with a row of navigation buttons and the *Heroes* view with its list of heroes.
-->
이 문서에서 다루는 예제 애플리케이션은 히어로를 관리하는 회사가 위기상황에 대응할 수 있는 히어로를 찾는 기능을 제공합니다.

이 애플리케이션이 제공하는 기능은 크게 3가지입니다:

1. 히어로에게 할당해서 대처해야 할 위기를 모아 *Crisis Center* 화면으로 제공합니다.
1. 회사가 관리하고 있는 히어로들의 목록을 *Heroes* 화면으로 제공합니다.
1. 위기 목록과 히어로 목록을 관리하는 *Admin* 화면을 제공합니다.

<live-example name="router" title="Hero Employment Agency Live Example">라이브 예제 앱</live-example>을 확인해 보세요.

애플리케이션을 실행해보면 히어로의 목록이 네비게이션 버튼으로 구성된 *Heroes* 화면이 표시됩니다.

<div class="lightbox">
  <img src='generated/images/guide/router/hero-list.gif' alt="Example application with a row of navigation buttons and a list of heroes">
</div>


<!--
Select one hero and the application takes you to a hero editing screen.
-->
화면에 있는 히어로 중 하나를 선택하면 히어로 편집 화면으로 전환됩니다.


<div class="lightbox">
  <img src='generated/images/guide/router/hero-detail.png' alt="Detail view of hero with additional information, input, and back button">
</div>


<!--
Alter the name.
Click the "Back" button and the application returns to the heroes list which displays the changed hero name.
Notice that the name change took effect immediately.

Had you clicked the browser's back button instead of the application's "Back" button, the application would have returned you to the heroes list as well.
Angular application navigation updates the browser history as normal web navigation does.

Now click the *Crisis Center* link for a list of ongoing crises.
-->
이름을 변경해 보세요.
그리고 "Back" 버튼을 클릭하면 히어로 목록에 변경한 내용이 반영됩니다.
이렇게 화면을 전환하면 변경한 이름이 즉시 반영됩니다.

하지만 "Back" 버튼 대신 브라우저 뒤로 가기 버튼을 클릭하면 변경하기 전 이름으로 히어로 목록이 표시됩니다.
Angular 앱도 일반 웹 네비게이션과 마찬가지로 브라우저 히스토리를 활용해서 화면을 전환합니다.

그리고 *Crisis Center* 링크를 클릭하면 현재 발생된 위기 목록이 표시됩니다.


<div class="lightbox">
  <img src='generated/images/guide/router/crisis-center-list.gif' alt="Crisis Center list of crises">
</div>

<!--
Select a crisis and the application takes you to a crisis editing screen.
The _Crisis Detail_ appears in a child component on the same page, beneath the list.

Alter the name of a crisis.
Notice that the corresponding name in the crisis list does _not_ change.
-->
위기를 하나 선택하면 수정화면이 표시됩니다.
이 때 _Crisis Detail_ 화면은 해당 페이지의 목록 아래쪽에 자식 컴포넌트로 표시됩니다.

위기의 이름을 변경해 보세요.
변경한 이름은 목록에 _즉시_ 반영되지 않습니다.

<div class="lightbox">
  <img src='generated/images/guide/router/crisis-center-detail.gif' alt="Crisis Center detail of a crisis with data, an input, and save and cancel buttons.">
</div>

<!--
Unlike *Hero Detail*, which updates as you type, *Crisis Detail* changes are temporary until you either save or discard them by pressing the "Save" or "Cancel" buttons.
Both buttons navigate back to the *Crisis Center* and its list of crises.

Click the browser back button or the "Heroes" link to activate a dialog.
-->
변경한 내용이 즉시 반영되던 *Hero Detail* 화면과 다르게, *Crisis Detail* 화면에서 변경한 내용은 "Save" 버튼을 눌러서 저장하거나 "Cancel" 버튼을 눌러서 취소하지 않는 이상 목록에 반영되지 않습니다.
두 버튼 중 하나를 누르면 *Crisis Center* 화면으로 돌아가면서 위기 목록이 표시됩니다.

위기 이름을 수정한 다음에 브라우저 뒤로 가기 버튼이나 "Heroes" 링크를 눌러서 확인 팝업이 뜨는 것을 확인해 보세요.

<div class="lightbox">
  <img src='generated/images/guide/router/confirm-dialog.png' alt="Alert that asks user to confirm discarding changes">
</div>


<!--
You can say "OK" and lose your changes or click "Cancel" and continue editing.

Behind this behavior is the router's `CanDeactivate` guard.
The guard gives you a chance to clean-up or ask the user's permission before navigating away from the current view.

The `Admin` and `Login` buttons illustrate other router capabilities covered later in the guide.
-->
이 팝업에서 "OK"를 선택하면 변경한 내용을 폐기하며 "Cancel"을 선택하면 수정을 계속합니다.

이 동작은 라우터가 제공하는 `CanDeactivate` 가드로 구현합니다.
이 가드는 현재 화면에서 수정한 내용을 정말 폐기할 것인지 사용자에게 확인하는 용도로 사용합니다.

`Admin` 버튼과 `Login` 버튼을 활용하는 내용은 다른 가이드 문서에서 자세하게 다룹니다.


{@a getting-started}

<!--
## Milestone 1: Getting started
-->
## 마일스톤 1: 시작하기

<!--
Begin with a basic version of the application that navigates between two empty views.


<div class="lightbox">
  <img src='generated/images/guide/router/router-1-anim.gif' alt="Animated image of application with a Crisis Center button and a Heroes button. The pointer clicks each button to show a view for each.">
</div>
-->
빈 화면 두 개를 전환하는 기본 앱부터 만들어 봅시다.

<div class="lightbox">
  <img src='generated/images/guide/router/router-1-anim.gif' alt="App in action">
</div>


{@a import}

<!--
Generate a sample application with the Angular CLI.

<code-example language="sh">
  ng new angular-router-sample
</code-example>
-->
Angular CLI로 다음 명령을 실행하면 예제 애플리케이션을 생성할 수 있습니다.

<code-example language="none" class="code-shell">
  ng new angular-router-sample
</code-example>


<!--
### Define Routes
-->
### 라우팅 규칙 정의하기

<!--
A router must be configured with a list of route definitions.

Each definition translates to a [Route](api/router/Route) object which has two things: a `path`, the URL path segment for this route; and a `component`, the component associated with this route.

The router draws upon its registry of definitions when the browser URL changes or when application code tells the router to navigate along a route path.

The first route does the following:

* When the browser's location URL changes to match the path segment `/crisis-center`, then the router activates an instance of the `CrisisListComponent` and displays its view.

* When the application requests navigation to the path `/crisis-center`, the router activates an instance of `CrisisListComponent`, displays its view, and updates the browser's address location and history with the URL for that path.

The first configuration defines an array of two routes with minimal paths leading to the `CrisisListComponent` and `HeroListComponent`.

Generate the `CrisisList` and `HeroList` components so that the router has something to render.

<code-example language="sh">
  ng generate component crisis-list
</code-example>

<code-example language="sh">
  ng generate component hero-list
</code-example>

Replace the contents of each component with the following sample HTML.

<code-tabs>

  <code-pane header="src/app/crisis-list/crisis-list.component.html" path="router/src/app/crisis-list/crisis-list.component.1.html">

  </code-pane>

  <code-pane header="src/app/hero-list/hero-list.component.html" path="router/src/app/hero-list/hero-list.component.1.html" region="template">

  </code-pane>

</code-tabs>
-->
라우터를 사용하려면 라우팅 규칙을 먼저 정의해야 합니다.

라우팅 규칙은 [Route](api/router/Route) 객체로 정의하는데, 이 객체에는 매칭할 URL을 `path` 프로퍼티로 지정하고 이 라우팅 규칙이 활성화될 때 표시되는 컴포넌트를 `component` 프로퍼티로 지정합니다.

라우터는 라우팅 규칙을 기준으로 브라우저 URL이나 라우터의 주소가 변경되는 것을 감지합니다.

지금 정의하는 라우팅 규칙은 이런 역할을 합니다:

* 브라우저 URL이 변경되고 `/crisis-center`와 매칭되면 라우터가 `CrisisListComponent` 인스턴스를 생성하고 화면에 표시합니다.

* 애플리케이션 코드가 `/crisis-center` 주소로 이동하도록 요청하면 라우터가 `CrisisListComponent` 인스턴스를 생성하고 화면에 표시하며, 브라우저의 주소표시줄과 히스토리를 해당 URL로 변경합니다.

이번 섹션에서는 간단하게 `CrisisListComponent`와 `HeroListComponent`와 매칭되는 라우팅 규칙 2개만 배열 형태로 정의했습니다.

라우터가 화면에 렌더링할 `CrisisList` 컴포넌트와 `HeroList` 컴포넌트를 만들어 봅시다.

<code-example language="none" class="code-shell">
  ng generate component crisis-list
</code-example>

<code-example language="none" class="code-shell">
  ng generate component hero-list
</code-example>

그리고 각 컴포넌트의 템플릿을 아래 HTML 내용으로 수정합니다.

<code-tabs>

  <code-pane header="src/app/crisis-list/crisis-list.component.html" path="router/src/app/crisis-list/crisis-list.component.1.html">

  </code-pane>

  <code-pane header="src/app/hero-list/hero-list.component.html" path="router/src/app/hero-list/hero-list.component.1.html" region="template">

  </code-pane>

</code-tabs>


<!--
### Register `Router` and `Routes`
-->
### `Router`, `Routes` 등록하기

<!--
To use the `Router`, you must first register the `RouterModule` from the `@angular/router` package.
Define an array of routes, `appRoutes`, and pass them to the `RouterModule.forRoot()` method.
The `RouterModule.forRoot()` method returns a module that contains the configured `Router` service provider, plus other providers that the routing library requires.
Once the application is bootstrapped, the `Router` performs the initial navigation based on the current browser URL.

<div class="alert is-important">

  **Note:** The `RouterModule.forRoot()` method is a pattern used to register application-wide providers. Read more about application-wide providers in the [Singleton services](guide/singleton-services#forRoot-router) guide.

</div>

<code-example path="router/src/app/app.module.1.ts" header="src/app/app.module.ts (first-config)" region="first-config"></code-example>

<div class="alert is-helpful">

Adding the configured `RouterModule` to the `AppModule` is sufficient for minimal route configurations.
However, as the application grows, [refactor the routing configuration](#refactor-the-routing-configuration-into-a-routing-module) into a separate file and create a [Routing Module](#routing-module).
A routing module is a special type of `Service Module` dedicated to routing.

</div>

Registering the `RouterModule.forRoot()` in the `AppModule` `imports` array makes the `Router` service available everywhere in the application.
-->
`Router`를 사용하려면 먼저 `@angular/router` 패키지로 제공되는 `RouterModule`을 등록해야 합니다.
그리고 `RouterModule.forRoot()` 메서드 인자로 라우팅 규칙을 배열 형태로 정의한 `appRoutes`를 전달하면 됩니다.
`RouterModule.forRoot()` 메서드는 인자로 전달된 라우팅 규칙으로 생성한 `Router` 서비스 프로바이더와 라우터 관련 라이브러리를 모듈 형태로 반환합니다.
애플리케이션이 부트스트랩되고 나면 `Router`가 현재 브라우저 URL을 기준으로 초기 네비게이션 동작을 시작합니다.

<div class="alert is-important">

**참고:** `RouterModule.forRoot()` 메서드를 사용하는 것은 애플리케이션 전역에 프로바이더를 등록하는 패턴을 사용한 것입니다.
애플리케이션 전역에 사용되는 프로바이더에 대해 알아보려면 [싱글턴 서비스](guide/singleton-services#forRoot-router) 문서를 참고하세요.
라우팅 모듈은 라우팅만 전담하는 서비스 모듈입니다.

</div>

<code-example path="router/src/app/app.module.1.ts" header="src/app/app.module.ts (첫 번째 환경설정)" region="first-config"></code-example>


<div class="alert is-helpful">

`AppModule`에 `RouterModule`을 추가하면 라우터를 사용하기 위한 기본 환경설정은 끝납니다.
하지만 애플리케이션이 점점 커지다 보면 모듈을 나누고 [라우팅 모듈](#routing-module)을 따로 둬서 [라우터 설정을 리팩토링](#refactor-the-routing-configuration-into-a-routing-module)하는 것도 검토해봐야 합니다.

</div>

`AppModule` `imports` 배열에 `RouterModule.forRoot()`를 등록하고 나면 애플리케이션 전역에서 `Router` 서비스를 사용할 수 있습니다.


{@a shell}

<!--
### Add the Router Outlet
-->
### 라우팅 영역 추가하기

<!--
The root `AppComponent` is the application shell. It has a title, a navigation bar with two links, and a router outlet where the router renders components.
-->
애플리케이션의 기본 틀은 최상위 컴포넌트인 `AppComponent` 입니다.
이 컴포넌트에는 제목이 하나 있으며, 링크가 2개로 구성된 네비게이션 바, 라우터가 컴포넌트를 렌더링하는 라우팅 영역(router outlet)으로 구성됩니다.

<div class="lightbox">
  <img src='generated/images/guide/router/shell-and-outlet.gif' alt="A nav, made of two navigation buttons, with the first button active and its associated view displayed">
</div>

<!--
The router outlet serves as a placeholder where the routed components are rendered.
-->
라우팅 영역은 라우터가 라우팅 규칙과 매칭되는 컴포넌트를 렌더링할 때 컴포넌트의 위치를 지정하는 역할을 합니다.

{@a shell-template}

<!--
The corresponding component template looks like this:
-->
`AppComponent` 컴포넌트의 템플릿 코드는 이렇게 구성됩니다:

<code-example path="router/src/app/app.component.1.html" header="src/app/app.component.html"></code-example>


{@a wildcard}

<!--
### Define a Wildcard route
-->
### 와일드카드 라우팅 규칙 정의하기

<!--
You've created two routes in the application so far, one to `/crisis-center` and the other to `/heroes`.
Any other URL causes the router to throw an error and crash the app.

Add a wildcard route to intercept invalid URLs and handle them gracefully.
A wildcard route has a path consisting of two asterisks.
It matches every URL.
Thus, the router selects this wildcard route if it can't match a route earlier in the configuration.
A wildcard route can navigate to a custom "404 Not Found" component or [redirect](#redirect) to an existing route.
-->
이제 애플리케이션에는 `/crisis-center`와 `/heroes` 주소에 해당하는 라우팅 규칙 2개가 존재합니다.
다른 URL로 접근하면 라우터가 에러가 발생시키면서 앱이 비정상 종료됩니다.

잘못된 URL로 접근하는 것을 자연스럽게 방지하려면 와일드카드 라우팅 규칙(wildecard route)을 추가하면 됩니다.
와일드카드 라우팅 규칙은 별표(`*`) 2개를 `path` 프로퍼티에 지정하는데, 이 주소는 모든 URL과 매칭됩니다.
그래서 라우터가 라우팅 규칙 중에서 매칭되는 규칙을 찾지 못한 경우에 모두 이 와일드카드 라우팅 규칙을 적용합니다.
와일드카드 라우팅 규칙는 커스텀 "404 Not Found" 컴포넌트를 화면에 표시하거나 다른 라우팅 규칙으로 [리다이렉션](#redirect)하는 용도로 사용할 수 있습니다.


<div class="alert is-helpful">

<!--
The router selects the route with a [_first match wins_](/guide/router-reference#example-config) strategy.
Because a wildcard route is the least specific route, place it last in the route configuration.
-->
라우터는 라우터에 등록된 라우팅 규칙 중 [첫 번째로 매칭되는 것을 적용](guide/router-reference#example-config)하는 정책을 사용합니다.
그리고 와일드카드 라우팅 규칙은 모든 주소와 매칭되기 때문에 라우팅 규칙 목록에서 가장 마지막에 등록해야 합니다.

</div>

<!--
To test this feature, add a button with a `RouterLink` to the `HeroListComponent` template and set the link to a non-existant route called `"/sidekicks"`.
-->
이 동작을 테스트하기 위해 `HeroListComponent` 템플릿에 `RouterLink` 디렉티브가 적용된 버튼을 하나 추가하고 이 버튼과 연결된 주소를 `"/sidekicks"`으로 설정헤 봅시다.

<code-example path="router/src/app/hero-list/hero-list.component.1.html" header="src/app/hero-list/hero-list.component.html (excerpt)"></code-example>

<!--
The application fails if the user clicks that button because you haven't defined a `"/sidekicks"` route yet.

Instead of adding the `"/sidekicks"` route, define a `wildcard` route and have it navigate to a `PageNotFoundComponent`.
-->
이제 사용자가 버튼을 클릭하면 애플리케이션에서 에러가 발생합니다.
왜냐하면 `"/sidekicks"`와 매칭되는 라우팅 규칙이 등록되지 않았기 때문입니다.

이 때 `"/sidekicks"` 라우팅 규칙 대신 `PageNotFoundComponent` 화면으로 이동하는 와일드카드 라우팅 규칙을 정의할 수 있습니다.

<code-example path="router/src/app/app.module.1.ts" header="src/app/app.module.ts (wildcard)" region="wildcard"></code-example>

<!--
Create the `PageNotFoundComponent` to display when users visit invalid URLs.
-->
사용자가 등록되지 않은 URL로 접속했을 때 보여줄 `PageNotFoundComponent`를 생성해 봅시다.

<code-example language="sh">
  ng generate component page-not-found
</code-example>

<code-example path="router/src/app/page-not-found/page-not-found.component.html" header="src/app/page-not-found.component.html (404 component)"></code-example>

<!--
Now when the user visits `/sidekicks`, or any other invalid URL, the browser displays "Page not found".
The browser address bar continues to point to the invalid URL.
-->
이제 사용자가 `/sidekicks` 과 같이 라우터에 등록되지 않은 주소로 접근하면 브라우저에 "Page not found" 문구가 표시됩니다.
브라우저의 주소표시줄은 여전히 등록되지 않은 URL로 표시됩니다.


{@a redirect}

<!--
### Set up redirects
-->
### 리다이렉션 설정하기

<!--
When the application launches, the initial URL in the browser bar is by default:
-->
애플리케이션이 실행되고 브라우저 주소표시줄에 표시되는 기본 URL은 이렇습니다:

<code-example>
  localhost:4200
</code-example>

<!--
That doesn't match any of the hard-coded routes which means the router falls through to the wildcard route and displays the `PageNotFoundComponent`.

The application needs a default route to a valid page.
The default page for this application is the list of heroes.
The application should navigate there as if the user clicked the "Heroes" link or pasted `localhost:4200/heroes` into the address bar.

Add a `redirect` route that translates the initial relative URL (`''`) to the default path (`/heroes`) you want.

Add the default route somewhere _above_ the wildcard route.
It's just above the wildcard route in the following excerpt showing the complete `appRoutes` for this milestone.
-->
이 주소는 라우터에 등록된 라우팅 규칙 중 어느 것에도 매칭되지 않기 때문에 와일드카드 라우팅 규칙과 매칭되면서 `PageNotFoundComponent`가 화면에 표시됩니다.

애플리케이션에는 기본 주소와 매칭되는 화면이 필요합니다.
기본 화면은 히어로의 목록을 표시하는 화면으로 지정해 봅시다.
이 화면은 사용자가 "Heroes" 링크를 클릭하거나 브라우저 주소표시줄에 `localhost:4200/heroes`를 입력했을 때 표시되는 화면입니다.

초기 주소로 상대 URL(`''`)을 기본 경로(`/heroes`)로 리다이렉션하는 `redirect` 라우팅 규칙을 추가해 봅시다.

기본 라우팅 규칙은 와일드카드 라우팅 규칙 _위라면_ 어디에 추가해도 됩니다.
예제 앱에서는 `appRoutes` 배열의 와일드카드 라우팅 규칙 바로 위에 기본 라우팅 규칙을 추가해 봅시다.

<code-example path="router/src/app/app-routing.module.1.ts" header="src/app/app-routing.module.ts (appRoutes)" region="appRoutes"></code-example>

<!--
The browser address bar shows `.../heroes` as if you'd navigated there directly.

A redirect route requires a `pathMatch` property to tell the router how to match a URL to the path of a route.
In this app, the router should select the route to the `HeroListComponent` only when the *entire URL* matches `''`, so set the `pathMatch` value to `'full'`.
-->
기본 라우팅 규칙이 적용되고 나면 사용자가 직접 이동한 것처럼 브라우저의 주소가 `.../heroes`로 변경됩니다.

리다이렉션 라우팅 규칙에는 URL을 매칭하는 방법을 결정하기 위해 `pathMatch` 프로퍼티를 지정해야 합니다.
예제 앱에서는 *URL이 정확히* `''`와 매칭되었을 때만 `HeroListCompnent` 라우팅 규칙을 적용하기 위해 `pathMatch` 값으로 `'full'`을 지정했습니다.


{@a pathmatch}

<div class="callout is-helpful">

<!--
  <header>Spotlight on pathMatch</header>
-->
  <header>pathMatch 자세하게 알아보기</header>

<!--
  Technically, `pathMatch = 'full'` results in a route hit when the *remaining*, unmatched  segments of the URL match `''`.
  In this example, the redirect is in a top level route so the *remaining* URL and the  *entire* URL are the same thing.

  The other possible `pathMatch` value is `'prefix'` which tells the router to match the  redirect route when the remaining URL begins with the redirect route's prefix  path.
  This doesn't apply to this sample application because if the `pathMatch` value were `'prefix'`,   every URL would match `''`.

  Try setting it to `'prefix'` and clicking the `Go to sidekicks` button.
  Because that's a bad URL, you should see the "Page not found" page.
  Instead, you're still on the "Heroes" page.
  Enter a bad URL in the browser address bar.
  You're instantly re-routed to `/heroes`.
  Every URL, good or bad, that falls through to this route definition is a match.

  The default route should redirect to the `HeroListComponent` only when the entire url is    `''`.
  Remember to restore the redirect to `pathMatch = 'full'`.

  Learn more in Victor Savkin's
  [post on redirects](https://vsavkin.tumblr.com/post/146722301646/angular-router-empty-paths-componentless-routes).
-->
  `pathMatch='full'`을 사용하면 *매칭되는* 주소가 정확히 `''`이어야 해당 라우팅 규칙이 적용됩니다.
  예제 앱에서도 최상위 라우팅 규칙에서 *매칭되는* URL이 *정확히* 빈 문자열과 매칭되기 때문에 이 라우팅 규칙이 적용됩니다.

  `pathMatch`에는 `'prefix'` 값을 사용할 수도 있습니다.
  이 값을 사용하면 매칭되는 주소가 라우팅 규칙 경로로 시작되면 해당 라우팅 규칙이 적용됩니다.
  이 방식을 사용하면 모든 URL이 `''`과 매칭되기 때문에 예제 앱에는 사용하지 않았습니다.

  `pathMatch` 프로퍼티 값을 `'prefix'`로 바꾼 뒤에 `Go to sidekicks` 버튼을 클릭해 보세요.
  이 URL은 라우팅 규칙에 등록되지 않았기 때문에 "Page not found" 화면이 표시되어야 합니다.
  하지만 `'prefix'` 방식을 사용하면 "Heroes" 화면이 표시됩니다.
  브라우저 주소표시줄에 등록되지 않은 URL을 직접 입럭해도 `/heroes` 주소로 리다이렉션됩니다.
  결국 등록된 주소는 물론, 등록되지 않은 주소도 이 라우팅 규칙과 매칭됩니다.

  `HeroListComponent`를 표시하는 기본 라우팅 규칙은 URL이 정확히 `''`일 때만 동작해야 합니다.
  `pathMatch='full'` 설정으로 되돌리는 것을 잊지 마세요.

  이 내용은 Victor Savkin이 [리다이렉션에 대해 작성한 블로그 글](http://vsavkin.tumblr.com/post/146722301646/angular-router-empty-paths-componentless-routes)에서도 확인할 수 있습니다.

</div>


<!--
### Milestone 1 wrap up
-->
### 마일스톤 1 정리

<!--
Your sample application can switch between two views when the user clicks a link.

Milestone 1 covered how to do the following:

* Load the router library.
* Add a nav bar to the shell template with anchor tags, `routerLink`  and `routerLinkActive` directives.
* Add a `router-outlet` to the shell template where views are displayed.
* Configure the router module with `RouterModule.forRoot()`.
* Set the router to compose HTML5 browser URLs.
* Handle invalid routes with a `wildcard` route.
* Navigate to the default route when the application launches with an empty path.

The starter application's structure looks like this:
-->
이제 예제 앱은 사용자가 클릭하는 링크에 따라 화면 2개를 전환합니다.

마일스톤 1에서는 이런 내용을 다뤘습니다:

* 라우터 라이브러리를 로드하는 방법에 대해 알아봤습니다.
* 애플리케이션 템플릿에 앵커 태그로 네비게이션 바를 추가하고 `routerLink` 디렉티브와 `routerLinkActive` 디렉티브를 적용했습니다.
* 라우터가 컴포넌트를 표시할 `router-outlet`을 추가했습니다.
* `RouterModule.forRoot()` 메서드로 라우터 모듈을 설정했습니다.
* 라우터가 동작하는 방식을 HTML5 브라우저 URL 방식으로 설정했습니다.
* 등록되지 않은 주소를 와일드카드 라우팅 규칙으로 처리했습니다.
* 빈 주소로 접근했을 때 처리할 기본 라우팅 규칙을 추가했습니다.

앱 전체 구조는 이렇게 구성됩니다:


<div class='filetree'>

  <div class='file'>
    angular-router-sample
  </div>

  <div class='children'>

    <div class='file'>
      src
    </div>

    <div class='children'>

      <div class='file'>
        app
      </div>

      <div class='children'>

        <div class='file'>
          crisis-list
        </div>

        <div class='children'>

          <div class='file'>

            crisis-list.component.css

          </div>

          <div class='file'>

            crisis-list.component.html

          </div>

          <div class='file'>

            crisis-list.component.ts

          </div>

        </div>

        <div class='file'>
          hero-list
        </div>

        <div class='children'>

          <div class='file'>

            hero-list.component.css

          </div>

          <div class='file'>

            hero-list.component.html

          </div>

          <div class='file'>

            hero-list.component.ts

          </div>

        </div>

        <div class='file'>
          page-not-found
        </div>

        <div class='children'>

          <div class='file'>

            page-not-found.component.css

          </div>

          <div class='file'>

            page-not-found.component.html

          </div>

          <div class='file'>

            page-not-found.component.ts

          </div>

        </div>

        <div class='file'>
          app.component.css
        </div>

        <div class='file'>
          app.component.html
        </div>

        <div class='file'>
          app.component.ts
        </div>

        <div class='file'>
          app.module.ts
        </div>

      </div>

      <div class='file'>
        main.ts
      </div>

      <div class='file'>
        index.html
      </div>

      <div class='file'>
        styles.css
      </div>

      <div class='file'>
        tsconfig.json
      </div>

    </div>

    <div class='file'>
      node_modules ...
    </div>

    <div class='file'>
      package.json
    </div>

  </div>

</div>


<!--
Here are the files in this milestone.
-->
그리고 이번 마일스톤에서 다룬 파일의 내용은 이렇습니다.


<code-tabs>

  <code-pane header="app.component.html" path="router/src/app/app.component.1.html">

  </code-pane>

  <code-pane header="app.module.ts" path="router/src/app/app.module.1.ts">

  </code-pane>

  <code-pane header="hero-list/hero-list.component.html" path="router/src/app/hero-list/hero-list.component.1.html">

  </code-pane>

  <code-pane header="crisis-list/crisis-list.component.html" path="router/src/app/crisis-list/crisis-list.component.1.html">

  </code-pane>

  <code-pane header="page-not-found/page-not-found.component.html" path="router/src/app/page-not-found/page-not-found.component.html">

  </code-pane>

  <code-pane header="index.html" path="router/src/index.html">

  </code-pane>

</code-tabs>


{@a routing-module}

<!--
## Milestone 2: *Routing module*
-->
## 마일스톤 2: *라우팅 모듈*

<!--
This milestone shows you how to configure a special-purpose module called a *Routing Module*, which holds your application's routing configuration.

The Routing Module has several characteristics:

* Separates routing concerns from other application concerns.
* Provides a module to replace or remove when testing the application.
* Provides a well-known location for routing service providers such as guards and resolvers.
* Does not declare components.
-->
이번 마일스톤에서는 *라우팅 모듈(Routing Module)* 이라고 하는 특별한 모듈에 대해 알아봅시다.
이 모듈은 애플리케이션의 라우팅 환경설정을 담당합니다.

라우팅 모듈은 이런 특징이 있습니다:

* 애플리케이션에서 라우팅 관련 설정을 모아둔 모듈입니다.
* 애플리케이션을 테스트할 때는 다른 모듈로 대체할 수 있습니다.
* 라우터 가드(guard)나 리졸버(resolver)와 같은 라우팅 관련 서비스 프로바이더를 제공합니다.
* 컴포넌트를 제공하지는 않습니다.


{@a integrate-routing}

<!--
### Integrate routing with your app
-->
### 애플리케이션에 있는 라우팅 통합하기

<!--
The sample routing application does not include routing by default.
When you use the [Angular CLI](cli) to create a project that does use routing, set the `--routing` option for the project or application, and for each NgModule.
When you create or initialize a new project (using the CLI [`ng new`](cli/new) command) or a new application (using the [`ng generate app`](cli/generate) command), specify the `--routing` option.
This tells the CLI to include the `@angular/router` npm package and create a file named `app-routing.module.ts`.
You can then use routing in any NgModule that you add to the project or application.

For example, the following command generates an NgModule that can use routing.

```sh
ng generate module my-module --routing
```

This creates a separate file named `my-module-routing.module.ts` to store the NgModule's routes.
The file includes an empty `Routes` object that you can fill with routes to different components and NgModules.
-->
예제 라우팅 애플리케이션에는 라우팅 관련 환경설정이 없습니다.
[Angular CLI](cli)를 사용해서 프로젝트를 생성할 때 라우팅 관련 기본 코드도 함께 생성하려면 `--routing` 옵션을 붙여서 실행하면 됩니다.
이 옵션은 [`ng new`](cli/new) 명령을 실행할 때나 [`ng generate app`](cli/generate) 명령을 실행할 때 모두 사용할 수 있습니다.
이 옵션을 붙여 앱을 생성하면 `@angular/router` npm 패키지를 추가로 설치하며 `app-routing.module.ts` 파일도 생성합니다.
이제 NgModule에 라우팅 기능을 추가할 수 있습니다.

라우팅 모듈을 분리하면서 NgModule을 생성하려면 다음 명령을 실행하면 됩니다:

```sh
ng generate module my-module --routing
```

이 명령을 실행하면 `NgModule`을 생성하면서 이 모듈과 관련된 `my-module-routing.module.ts` 파일도 함께 생성합니다.
이 파일에 선언된 `Routes` 배열에 라우팅 규칙을 추가하면 됩니다.


{@a routing-refactor}
{@a refactor-the-routing-configuration-into-a-routing-module}
<!--
### Refactor the routing configuration into a routing module
-->
### 라우팅 환경설정 리팩토링하기

<!--
Create an `AppRouting` module in the `/app` folder to contain the routing configuration.

<code-example language="sh">
  ng generate module app-routing --module app --flat
</code-example>

Import the `CrisisListComponent`, `HeroListComponent`, and `PageNotFoundComponent` symbols like you did in the `app.module.ts`.
Then move the `Router` imports and routing configuration, including `RouterModule.forRoot()`, into this routing module.

Re-export the Angular `RouterModule` by adding it to the module `exports` array.
By re-exporting the `RouterModule` here, the components declared in `AppModule` have access to router directives such as `RouterLink` and `RouterOutlet`.

After these steps, the file should look like this.

<code-example path="router/src/app/app-routing.module.1.ts" header="src/app/app-routing.module.ts"></code-example>

Next, update the `app.module.ts` file by removing `RouterModule.forRoot` in the `imports` array.

<code-example path="router/src/app/app.module.2.ts" header="src/app/app.module.ts"></code-example>

<div class="alert is-helpful">

Later, this guide shows you how to create [multiple routing modules](#heroes-functionality) and import those routing modules [in the correct order](#routing-module-order).

</div>

The application continues to work just the same, and you can use `AppRoutingModule` as the central place to maintain future routing configuration.
-->
`/app` 폴더에 `AppRouting` 모듈을 생성하는 명령은 이렇습니다.

<code-example language="none" class="code-shell">
  ng generate module app-routing --module app --flat
</code-example>

그리고 `app.module.ts` 파일에 작성했던 것처럼 `CrisisListComponent`, `HeroListComponent`, `PageNotFoundComponent` 심볼을 로드합니다.
그 다음에는 `AppModule`에 있는 `Router` 관련 코드를 라우팅 모듈로 옮기면 됩니다.

라우팅 모듈의 `exports` 배열에 `RouterModule`을 추가하면 Angular `RouterModule`이 제공하는 기능을 다른 모듈에서도 사용할 수 있습니다.
그래서 `AppModule`에서는 Angular `RouterModule`을 따로 로드하지 않아도 `RouterLink`나 `RouterOutlet`과 같은 디렉티브를 사용할 수 있습니다.

여기까지 작성하고 나면 라우팅 모듈의 코드는 이렇습니다.

<code-example path="router/src/app/app-routing.module.1.ts" header="src/app/app-routing.module.ts"></code-example>

이제 `app.module.ts` 파일의 `imports` 배열에서 `RouterModule.forRoot` 코드를 제거합니다.

<code-example path="router/src/app/app.module.2.ts" header="src/app/app.module.ts"></code-example>


<div class="alert is-helpful">

이후 단계에서는 [라우팅 모듈을 여러개](#heroes-functionality) 선언하고 이 모듈들을 [올바른 순서로](#routing-module-order) 로드하는 방법에 대해 다룹니다.

</div>


애플리케이션은 이전에 작업했던 것과 똑같이 동작합니다.
그리고 이제부터 라우팅 관련 기능은 모두 `AppRoutingModule`을 기준으로 확장하면 됩니다.


{@a why-routing-module}

<!--
### Benefits of a routing module
-->
### 라우팅 모듈을 사용하는 이유

<!--
The routing module, often called the `AppRoutingModule`, replaces the routing configuration in the root or feature module.

The routing module is helpful as your application grows and when the configuration includes specialized guard and resolver services.

Some developers skip the routing module when the configuration is minimal and merge the routing configuration directly into the companion module (for example, `AppModule`).

Most applications should implement a routing module for consistency.
It keeps the code clean when configuration becomes complex.
It makes testing the feature module easier.
Its existence calls attention to the fact that a module is routed.
It is where developers expect to find and expand routing configuration.
-->
최상위 라우팅 모듈이라고도 하는 `AppRoutingModule`은 최상위 기능 모듈의 라우팅 환경설정을 대신하는 모듈입니다.

라우팅 모듈을 사용하면 앱이 점점 복잡해지면서 가드와 리졸버가 복잡하게 적용될수록 코드를 효율적으로 관리할 수 있습니다.

라우터 설정이 복잡하지 않아서 `AppModule`과 함께 관리하도 복잡하지 않다면 라우팅 모듈을 굳이 사용하지 않아도 됩니다.

하지만 보통은 라우팅 모듈을 따로 두는 것이 일관성을 유지하기에 좋습니다.
라우팅 모듈을 따로 두면:

1. 라우팅 설정이 복잡해지더라도 라우팅 모듈만 수정하면 됩니다.
1. 기능 모듈을 테스트하기 쉽습니다.
1. 라우팅 모듈과 관련된 기능 모듈만 집중해서 작업할 수 있습니다.
1. 라우터 설정이 시작되는 곳을 명확하게 파악할 수 있습니다.


{@a heroes-feature}

<!--
## Milestone 3: Heroes feature
-->
## 마일스톤 3: 히어로 관리 모듈

<!--
This milestone covers the following:

* Organizing the application and routes into feature areas using modules.
* Navigating imperatively from one component to another.
* Passing required and optional information in route parameters.

This sample application recreates the heroes feature in the "Services" section of the [Tour of Heroes tutorial](tutorial/toh-pt4 "Tour of Heroes: Services"), and reuses much of the code from the <live-example name="toh-pt4" title="Tour of Heroes: Services example code"></live-example>.

A typical application has multiple feature areas, each dedicated to a particular business purpose with its own folder.

This section shows you how refactor the application into different feature modules, import them into the main module and navigate among them.
-->
이번 마일스톤에서는 이런 내용을 다룹니다:

* 모듈에 있는 라우팅 설정을 기능 모듈로 옮깁니다.
* 화면 전환 로직을 수정합니다.
* 필수/옵션 정보를 라우팅 인자로 전달합니다.

이번 마일스톤에서 다루는 예제 앱은 [히어로들의 여행 튜토리얼]<live-example name="toh-pt4" title="Tour of Heroes: Services example code"></live-example> 예제 앱의 ["서비스" 섹션](tutorial/toh-pt4 "Tour of Heroes: Services") 코드를 많이 참고했습니다.

일반적으로 애플리케이션은 특정 기능들의 묶음으로 구성되며, 용도에 맞게 폴더별로 존재하기도 합니다.

이번 섹션에서는 애플리케이션을 기능 모듈별로 리팩토링하는 방법에 대해 알아보고, 메인 모듈에서 기능 모듈을 불러온 후에 모듈간 이동하는 방법에 대해 알아봅시다.


{@a heroes-functionality}

<!--
### Add heroes functionality
-->
### 히어로 추가 기능

<!--
Follow these steps:

* To manage the heroes, create a `HeroesModule` with routing in the heroes folder and register it with the root `AppModule`.

<code-example language="sh">
  ng generate module heroes/heroes --module app --flat --routing
</code-example>

* Move the placeholder `hero-list` folder that's in the `app` folder into the `heroes` folder.
* Copy the contents of the `heroes/heroes.component.html` from
  the <live-example name="toh-pt4" title="Tour of Heroes: Services example code">"Services" tutorial</live-example> into the `hero-list.component.html` template.

  * Re-label the `<h2>` to `<h2>HEROES</h2>`.
  * Delete the `<app-hero-detail>` component at the bottom of the template.

* Copy the contents of the `heroes/heroes.component.css` from the live example into the `hero-list.component.css` file.
* Copy the contents of the `heroes/heroes.component.ts` from the live example into the `hero-list.component.ts` file.

  * Change the component class name to `HeroListComponent`.
  * Change the `selector` to `app-hero-list`.

<div class="alert is-helpful">

   Selectors are not required for routed components because components are dynamically inserted when the page is rendered. However, they are useful for identifying and targeting them in your HTML element tree.

</div>

* Copy the `hero-detail` folder, the `hero.ts`, `hero.service.ts`,  and `mock-heroes.ts` files into the `heroes` subfolder.
* Copy the `message.service.ts` into the `src/app` folder.
* Update the relative path import to the `message.service` in the `hero.service.ts` file.

Next, update the `HeroesModule` metadata.

  * Import and add the `HeroDetailComponent` and `HeroListComponent` to the `declarations` array in the `HeroesModule`.

<code-example path="router/src/app/heroes/heroes.module.ts" header="src/app/heroes/heroes.module.ts"></code-example>

The hero management file structure is as follows:
-->
이런 순서로 진행합니다:

* 히어로를 관리하기 위해 `HeroesModule` 모듈과 라우팅 모듈을 `heroes` 폴더에 생성하고 최상위 `AppModule`에 이 모듈을 등록합니다.

<code-example language="none" class="code-shell">
  ng generate module heroes/heroes --module app --flat --routing
</code-example>

* `app` 폴더에 있는 `hero-list` 폴더를 `heroes` 폴더로 옮깁니다.
* <live-example name="toh-pt4" title="Tour of Heroes: Services example code">"서비스" 튜토리얼</live-example> `hero-list.component.html` 템플릿에 있는 내용을 `heroes/heroes.component.html` 파일로 옮깁니다.

  * `<h2>` 태그의 내용을 `<h2>HEROES</h2>`로 수정합니다.
  * 템플릿 제일 아래에 있는 `<app-hero-detail>` 태그를 제거합니다.

* 예제 링크에 있는 `hero-list.component.css` 파일의 내용을 `heroes/heroes.component.css` 파일로 옮깁니다.
* 예제 링크에 있는 `hero-list.component.ts` 파일의 내용을 `heroes/heroes.component.ts` 파일로 옮깁니다.

  * 컴포넌트 클래스의 이름을 `HeroListComponent`로 변경합니다.
  * `selector`를 `app-hero-list`로 변경합니다.


<div class="alert is-helpful">

   라우팅 대상이 되는 컴포넌트는 화면이 렌더링되면서 동적으로 추가되기 때문에 셀렉터를 필수로 지정해야 하는 것은 아닙니다.
   하지만 셀렉터를 지정해두면 전체 HTML 엘리먼트 트리에서 해당 컴포넌트를 찾을 때 도움이 됩니다.

</div>


* `hero-detail` 폴더, `hero.ts`, `hero.service`, `mock-heroes.ts` 파일을 `heroes` 폴더로 옮깁니다.
* `message.service.ts` 파일을 `src/app` 폴더로 옮깁니다.
* `hero.service.ts` 파일에서 로드하는 `message.service`의 주소를 수정합니다.

이제 `HeroesModule` 메타데이터를 수정합니다.

  * `HeroesModule` 파일에 `HeroDetailComponent`와 `HeroListComponent`를 로드하고 `declarations` 배열에 추가합니다.

<code-example path="router/src/app/heroes/heroes.module.ts" header="src/app/heroes/heroes.module.ts"></code-example>

이제 히어로 모듈의 파일 구조는 이렇습니다:


<div class='filetree'>

  <div class='file'>
    src/app/heroes
  </div>

  <div class='children'>

    <div class='file'>
      hero-detail
    </div>

      <div class='children'>

        <div class='file'>
          hero-detail.component.css
        </div>

        <div class='file'>
          hero-detail.component.html
        </div>

        <div class='file'>
          hero-detail.component.ts
        </div>

      </div>

    <div class='file'>
      hero-list
    </div>

      <div class='children'>

        <div class='file'>
          hero-list.component.css
        </div>

        <div class='file'>
          hero-list.component.html
        </div>

        <div class='file'>
          hero-list.component.ts
        </div>

      </div>

    <div class='file'>
      hero.service.ts
    </div>

    <div class='file'>
      hero.ts
    </div>

    <div class='file'>
      heroes-routing.module.ts
    </div>

    <div class='file'>
      heroes.module.ts
    </div>

    <div class='file'>
      mock-heroes.ts
    </div>

    </div>

  </div>

</div>


{@a hero-routing-requirements}

<!--
#### Hero feature routing requirements
-->
#### 히어로 모듈 라우터 설정

<!--
The heroes feature has two interacting components, the hero list and the hero detail.
When you navigate to list view, it gets a list of heroes and displays them.
When you click on a hero, the detail view has to display that particular hero.

You tell the detail view which hero to display by including the selected hero's ID in the route URL.

Import the hero components from their new locations in the `src/app/heroes/` folder and define the two hero routes.

Now that you have routes for the `Heroes` module, register them with the `Router` using the `RouterModule` as you did in the `AppRoutingModule`, with an important difference.

In the `AppRoutingModule`, you used the static `RouterModule.forRoot()` method to register the routes and application level service providers.
In a feature module you use the static `forChild()` method.


<div class="alert is-helpful">

Only call `RouterModule.forRoot()` in the root `AppRoutingModule`
(or the `AppModule` if that's where you register top level application routes).
In any other module, you must call the `RouterModule.forChild()` method to register additional routes.

</div>

The updated `HeroesRoutingModule` looks like this:


<code-example path="router/src/app/heroes/heroes-routing.module.1.ts" header="src/app/heroes/heroes-routing.module.ts"></code-example>


<div class="alert is-helpful">

Consider giving each feature module its own route configuration file.
Though the feature routes are currently minimal, routes have a tendency to grow more complex even in small applications.

</div>
-->
히어로 모듈에서 히어로 목록을 표시하는 컴포넌트와 히어로의 세부정보를 표시하는 컴포넌트는 서로 연동되며 동작합니다.
목록 화면은 히어로의 목록을 화면에 표시합니다.
그리고 목록에서 히어로 한 명을 클릭하면 해당 히어로의 세부정보를 화면에 표시합니다.

이 때 세부정보 화면에서 표시할 히어로를 지정하기 위해 URL에 히어로의 ID를 함께 전달합니다.

이제 `src/app/heroes` 폴더로 옮긴 히어로 관련 컴포넌트를 불러와서 라우팅 규칙 2개를 정의합니다.

그리고 `AppRoutingModule`에서 작업했던 것처럼 `Heroes` 모듈에 `RouterModule`로 라우팅 규칙을 등록합니다.

`AppRoutingModule`에서는 정적 메서드 `RouterModule.forRoot()`를 사용해서 라우팅 규칙을 등록하며, 이 메서드를 실행하면 애플리케이션 계층에 라우터 관련 서비스 프로바이더가 등록됩니다.
기능 모듈에서는 `forRoot()` 대신 `forChild()` 메서드를 사용합니다.


<div class="alert is-helpful">

`RouterModule.forRoot()` 메서드는 최상위 `AppRoutingModule`에서만 실행합니다.
애플리케이션 최상위 라우팅 규칙을 `AppModule`에서 관리한다면 `AppModule`에서만 실행합니다.
다른 모듈에서는 `RouterModule.forChild()` 메서드를 사용해서 라우팅 규칙을 등록해야 합니다.

</div>


여기까지 작업하고 나면 `HeroesRoutingModule`의 코드는 이렇습니다:


<code-example path="router/src/app/heroes/heroes-routing.module.1.ts" header="src/app/heroes/heroes-routing.module.ts"></code-example>


<div class="alert is-helpful">

라우팅 설정파일은 기능 모듈마다 두는 것을 권장합니다.
기능 모듈이 관리하는 라우팅 규칙이 지금은 간단하지만 애플리케이션이 복잡해질수록 라우팅 규칙도 금방 복잡해지게 됩니다.

</div>


{@a remove-duplicate-hero-routes}


<!--
#### Remove duplicate hero routes
-->
#### 중복된 라우팅 규칙 제거하기

<!--
The hero routes are currently defined in two places: in the `HeroesRoutingModule`,
by way of the `HeroesModule`, and in the `AppRoutingModule`.

Routes provided by feature modules are combined together into their imported module's routes by the router.
This lets you continue defining the feature module routes without modifying the main route configuration.

Remove the `HeroListComponent` import and the `/heroes` route from the `app-routing.module.ts`.

Leave the default and the wildcard routes as these are still in use at the top level of the application.

<code-example path="router/src/app/app-routing.module.2.ts" header="src/app/app-routing.module.ts (v2)"></code-example>
-->
이 시점에 히어로 기능 모듈의 라우팅 규칙은 `HeroesRoutingModule`과 `AppRoutingModule` 두 군데에 정의되어 있습니다.

기능 모듈을 로드하면 이 기능 모듈에 있는 라우팅 규칙이 전체 라우팅 규칙으로 통합됩니다.
그래서 기능 모듈에 정의한 라우팅 규칙을 조정하더라도 전체 라우팅 환경설정을 변경할 필요는 없습니다.

이제 `app-routing.module.ts` 파일에서 `HeroListComponent`를 로드하는 코드와 `/heroes` 경로와 연결되는 라우팅 규칙을 제거합니다.

기본 라우팅 규칙과 와일드카드 라우팅 규칙은 애플리케이션 최상위 계층에 필요하니 그대로 둡니다.

<code-example path="router/src/app/app-routing.module.2.ts" header="src/app/app-routing.module.ts (v2)"></code-example>


{@a merge-hero-routes}

<!--
#### Remove heroes declarations
-->
#### 컴포넌트 등록 코드 제거하기

<!--
Because the `HeroesModule` now provides the `HeroListComponent`, remove it from the `AppModule`'s `declarations` array.
Now that you have a separate `HeroesModule`, you can evolve the hero feature with more components and different routes.

After these steps, the `AppModule` should look like this:

<code-example path="router/src/app/app.module.3.ts" header="src/app/app.module.ts" region="remove-heroes"></code-example>
-->
`HeroListComponent`는 이제 `HeroesModule`에서 제공하기 때문에 `AppModule` `declarations` 배열에서는 제거합니다.
그러면 히어로와 관련된 기능은 모두 `HeroesModule` 안으로 구성되기 때문에, 이제부터 히어로와 관련된 컴포넌트와 라우팅 규칙은 `HeroesModule`을 기준으로 확장할 수 있습니다.

여기까지 작업하고 나면 `AppModule`의 코드는 이렇습니다:

<code-example path="router/src/app/app.module.3.ts" header="src/app/app.module.ts" region="remove-heroes"></code-example>


{@a routing-module-order}

<!--
### Module import order
-->
### 모듈을 로드하는 순서

<!--
Notice that in the module `imports` array, the `AppRoutingModule` is last and comes _after_ the `HeroesModule`.

<code-example path="router/src/app/app.module.3.ts" region="module-imports" header="src/app/app.module.ts (module-imports)"></code-example>


The order of route configuration is important because the router accepts the first route that matches a navigation request path.

When all routes were in one `AppRoutingModule`, you put the default and [wildcard](#wildcard) routes last, after the `/heroes` route, so that the router had a chance to match a URL to the `/heroes` route _before_ hitting the wildcard route and navigating to "Page not found".

Each routing module augments the route configuration in the order of import.
If you listed `AppRoutingModule` first, the wildcard route would be registered _before_ the hero routes.
The wildcard route&mdash;which matches _every_ URL&mdash;would intercept the attempt to navigate to a hero route.


<div class="alert is-helpful">

Reverse the routing modules to see a click of the heroes link resulting in "Page not found".
Learn about inspecting the runtime router configuration [below](#inspect-config "Inspect the router config").

</div>
-->
`AppModule`의 `imports` 배열을 보면 `AppRoutingModule`이 `HeroesModule` _뒤에_ 추가된 것을 확인할 수 있습니다.

<code-example path="router/src/app/app.module.3.ts" region="module-imports" header="src/app/app.module.ts (module-imports)"></code-example>

라우터는 전체 라우팅 규칙 중에서 첫 번째로 매칭되는 라우팅 규칙을 적용하기 때문에 라우팅 규칙을 등록하는 순서가 중요합니다.

그리고 모든 라우팅 규칙은 `AppRoutingModule`로 통합되기 때문에 [와일드카드](#wildcard) 라우팅 규칙은 `/heroes` 라우팅 규칙의 뒤, 전체 라우팅 규칙의 마지막에 등록되어야 합니다.
그래야 모든 주소와 매칭되는 와일드카드 라우팅 규칙이 매칭되기 _전에_ URL이 `/heroes` 라우팅과 매칭되는지 검사할 수 있습니다.

각 라우팅 모듈은 `AppRoutingModule`에 로드되는 순서대로 통합됩니다.
그래서 `AppRoutingModule`을 제일 처음 로드하면 와일드카드 라우팅 규칙이 히어로 모듈의 라우팅 규칙보다 _먼저_ 등록됩니다.
그러면 와일드카드 라우팅 규칙이 _모든_ URL과 매칭되면서 화면을 찾을 수 없다는 문구만 표시됩니다.


<div class="alert is-helpful">

라우팅 모듈을 로드하는 순서를 거꾸로 하면 히어로 목록으로 가는 링크를 클릭했을 때 "Page not found"가 표시됩니다.
실행되고 있는 애플리케이션의 라우팅 환경 설정을 확인하는 방법은 [아래](#inspect-config "Inspect the router config")에서 다룹니다.

</div>


<!--
### Route Parameters
-->
### 라우팅 인자

{@a route-def-with-parameter}

<!--
#### Route definition with a parameter
-->
#### 라우팅 인자를 사용하는 라우팅 규칙 정의하기

<!--
Return to the `HeroesRoutingModule` and look at the route definitions again.
The route to `HeroDetailComponent` has an `:id` token in the path.

<code-example path="router/src/app/heroes/heroes-routing.module.1.ts" header="src/app/heroes/heroes-routing.module.ts (excerpt)" region="hero-detail-route"></code-example>

The `:id` token creates a slot in the path for a Route Parameter.
In this case,  this configuration causes the router to insert the `id` of a hero into that slot.

If you tell the router to navigate to the detail component and display "Magneta", you expect a hero ID to appear in the browser URL like this:


<code-example format="nocode">
  localhost:4200/hero/15

</code-example>



If a user enters that URL into the browser address bar, the router should recognize the pattern and go to the same "Magneta" detail view.


<div class="callout is-helpful">

<header>
  Route parameter: Required or optional?
</header>

Embedding the route parameter token, `:id`, in the route definition path is a good choice for this scenario because the `id` is *required* by the `HeroDetailComponent` and because the value `15` in the path clearly distinguishes the route to "Magneta" from a route for some other hero.

</div>
-->
`HeroesRoutingModule`로 돌아가서 라우팅 규칙을 정의한 코드를 봅시다.
`HeroDetailComponent`와 연결된 주소에 `:id` 토큰이 사용된 것을 확인할 수 있습니다.

<code-example path="router/src/app/heroes/heroes-routing.module.1.ts" header="src/app/heroes/heroes-routing.module.ts (excerpt)" region="hero-detail-route"></code-example>

`:id` 토큰은 라우팅 인자(route parameter)를 선언하는 역할을 합니다.
이 토큰이 사용되면 나중에 히어로의 `id`가 인자로 전달됩니다.

`id`가 `15`에 해당하는 "Magneta" 히어로의 세부정보를 화면에 표시하려면 브라우저 URL을 이렇게 구성하면 됩니다:

<code-example format="nocode">
  localhost:4200/hero/15

</code-example>

사용자가 브라우저 주소표시줄에 이 URL을 입력하면 라우터가 이 주소의 패턴을 인식해서 해당 히어로의 세부정보를 화면에 표시합니다.


<div class="callout is-helpful">

<header>
  라우팅 인자: 필수일까 옵션일까?
</header>

`HeroDetailComponent`에 `id`가 *반드시 필요* 하다면 `:id` 라는 토큰을 라우팅 규칙에 심는 것이 좋습니다.
이 시나리오에서는 원하는 히어로를 확실하게 구별하는 정보가 꼭 필요하기 때문입니다.

</div>


{@a route-parameters}

<!--
#### Setting the route parameters in the list view
-->
#### 목록 화면에서 라우팅 인자 설정하기

<!--
After navigating to the `HeroDetailComponent`, you expect to see the details of the selected hero.
You need two pieces of information: the routing path to the component and the hero's `id`.

Accordingly, the _link parameters array_ has two items: the routing _path_ and a _route parameter_ that specifies the
`id` of the selected hero.

<code-example path="router/src/app/heroes/hero-list/hero-list.component.1.html" header="src/app/heroes/hero-list/hero-list.component.html (link-parameters-array)" region="link-parameters-array"></code-example>

The router composes the destination URL from the array like this: `localhost:4200/hero/15`.

The router extracts the route parameter (`id:15`) from the URL and supplies it to
the `HeroDetailComponent` using the `ActivatedRoute` service.
-->
`HeroDetailComponent`로 이동하고 나면 특정 히어로의 세부정보를 볼 수 있어야 합니다.
이 동작을 위해 두 가지 정보가 필요합니다.
컴포넌트로 향하는 주소와 히어로의 `id`입니다.

그래서 _링크 인자 배열(link parameters array)_ 는 2개 항목으로 구성됩니다.
첫 번째는 컴포넌트로 이동할 때 사용하는 _주소_ 이고, 두 번째는 원하는 히어로를 지정하기 위한 `id` 입니다.

<code-example path="router/src/app/heroes/hero-list/hero-list.component.1.html" header="src/app/heroes/hero-list/hero-list.component.html (링브 인자 배열)" region="link-parameters-array"></code-example>

그러면 라우터가 최종 URL을 `localhost:4200/hero/15`와 같이 구성합니다.

그리고 `HeroDetailComponent`로 이동하고 나면 `ActivatedRoute` 서비스를 사용해서 라우터가 주소에서 추출한 라우팅 인자(`id:15`)를 참조할 수 있습니다.


{@a activated-route-in-action}

<!--
### `Activated Route` in action
-->
### `ActivatedRoute` 사용하기

<!--
Import the `Router`, `ActivatedRoute`, and `ParamMap` tokens from the router package.

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.1.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (activated route)" region="imports"></code-example>

Import the `switchMap` operator because you need it later to process the `Observable` route parameters.

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (switchMap operator import)" region="rxjs-operator-import"></code-example>

{@a hero-detail-ctor}

Add the services as private variables to the constructor so that Angular injects them (makes them visible to the component).

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (constructor)" region="ctor"></code-example>

In the `ngOnInit()` method, use the `ActivatedRoute` service to retrieve the parameters for the route, pull the hero `id` from the parameters, and retrieve the hero to display.


<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (ngOnInit)" region="ngOnInit"></code-example>

When the map changes, `paramMap` gets the `id` parameter from the changed parameters.

Then you tell the `HeroService` to fetch the hero with that `id` and return the result of the `HeroService` request.

The `switchMap` operator does two things. It flattens the `Observable<Hero>` that `HeroService` returns and cancels previous pending requests.
If the user re-navigates to this route with a new `id` while the `HeroService` is still retrieving the old `id`, `switchMap` discards that old request and returns the hero for the new `id`.

`AsyncPipe` handles the observable subscription and the component's `hero` property will be (re)set with the retrieved hero.
-->
라우터 패키지로 제공되는 `Router`, `ActivatedRoute`, `ParamMap` 토큰을 로드합니다.

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.1.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (활성화된 라우팅 규칙)" region="imports"></code-example>

그리고 `Observable`로 제공되는 라우팅 인자를 처리하기 위해 `switchMap` 연산자를 로드합니다.

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (switchMap 연산자 로드하기)" region="rxjs-operator-import"></code-example>

{@a hero-detail-ctor}

`ActivatedRoute` 서비스를 `private` 변수로 선언해서 생성자에 선언하면 Angular가 이 서비스를 의존성 객체로 주입합니다.

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (생성자)" region="ctor"></code-example>

그리고 `ActivatedRoute` 서비스에서 라우팅 인자를 참조하는 로직은 `ngOnInit()` 메서드에 작성합니다.

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (ngOnInit())" region="ngOnInit"></code-example>

접근하는 주소가 변경되면 `paramMap`이 전달하는 `id` 인자도 변경됩니다.

`ActivatedRoute` 서비스에서 `id`를 받아오고 나면 `HeroService`로 해당 히어로 데이터를 가져오면 됩니다.

`switchMap` 연산자는 두 가지 동작을 합니다.
`switchMap` 연산자는 `Observable<Hero>` 타입을 `HeroService`가 반환하는 데이터 타입으로 변경하며, 이전에 완료되지 않은 요청은 취소합니다.
그래서 아직 `HeroService`의 동작이 끝나지 않았을 때 다른 `id`로 다시 컴포넌트를 띄우면 `switchMap`이 이전에 보냈던 요청을 취소하고 새로운 `id`로 히어로 데이터를 요청합니다.

이렇게 받아온 히어로 데이터는 컴포넌트 `hero$` 프로퍼티에 할당되며, 이 프로퍼티는 `AsyncPipe`를 사용해서 템플릿이 자동으로 구독합니다.


#### _ParamMap_ API

<!--
The `ParamMap` API is inspired by the [URLSearchParams interface](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams).
It provides methods to handle parameter access for both route parameters (`paramMap`) and query parameters (`queryParamMap`).

<table>
  <tr>
    <th>
      Member
    </th>

    <th>
      Description
    </th>
  </tr>

  <tr>
    <td>
      <code>has(name)</code>
    </td>
    <td>

    Returns `true` if the parameter name is in the map of parameters.

    </td>
  </tr>

  <tr>
    <td>
      <code>get(name)</code>
    </td>
    <td>

    Returns the parameter name value (a `string`) if present, or `null` if the parameter name is not in the map. Returns the _first_ element if the parameter value is actually an array of values.

    </td>
  </tr>

  <tr>
    <td>
      <code>getAll(name)</code>
    </td>
    <td>

    Returns a `string array` of the parameter name value if found, or an empty `array` if the parameter name value is not in the map. Use `getAll` when a single parameter could have multiple values.

    </td>
  </tr>

  <tr>
    <td>
      <code>keys</code>
    </td>
    <td>

    Returns a `string array` of all parameter names in the map.

    </td>
  </tr>
</table>
-->
`ParamMap` API는 [URLSearchParams 인터페이스](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)에서 영감을 받았습니다.
이 API를 활용하면 라우팅 인자(`paramMap`)를 참조하거나 쿼리 인자(`queryParamMap`)을 참조할 수 있습니다.

<table>
  <tr>
    <th>
      멤버
    </th>

    <th>
      설명
    </th>
  </tr>

  <tr>
    <td>
      <code>has(name)</code>
    </td>
    <td>

    전달된 이름으로 인자가 존재하면 `true`를 반환합니다.

    </td>
  </tr>

  <tr>
    <td>
      <code>get(name)</code>
    </td>
    <td>

    전달된 이름으로 인자가 존재하면 해당 인자(`string`)를 반환하고, 존재하지 않으면 `null`을 반환합니다.
    값이 배열 형태로 존재하면 _첫 번째_ 항목을 반환합니다.

    </td>
  </tr>

  <tr>
    <td>
      <code>getAll(name)</code>
    </td>
    <td>

    전달된 이름으로 인자가 존재하면 해당 인자를 모두(`string` 배열)로 반환하고, 존재하지 않으면 빈 배열(`[]`)을 반환합니다.
    인자가 여러 개 존재할 수 있는 상황이라면 `getAll()`를 사용하세요.

    </td>
  </tr>

  <tr>
    <td>
      <code>keys</code>
    </td>
    <td>

    맵에 존재하는 모든 인자의 이름을 문자열 배열 형태로 반환합니다.

    </td>
  </tr>
</table>


{@a reuse}

<!--
#### Observable <i>paramMap</i> and component reuse
-->
#### <i>paramMap</i> 옵저버블과 컴포넌트 재사용

<!--
In this example, you retrieve the route parameter map from an `Observable`.
That implies that the route parameter map can change during the lifetime of this component.

By default, the router re-uses a component instance when it re-navigates to the same component type
without visiting a different component first. The route parameters could change each time.

Suppose a parent component navigation bar had "forward" and "back" buttons
that scrolled through the list of heroes.
Each click navigated imperatively to the `HeroDetailComponent` with the next or previous `id`.

You wouldn't want the router to remove the current `HeroDetailComponent` instance from the DOM only to re-create it for the next `id` as this would re-render the view.
For better UX, the router re-uses the same component instance and updates the parameter.

Because `ngOnInit()` is only called once per component instantiation, you can detect when the route parameters change from _within the same instance_ using the observable `paramMap` property.


<div class="alert is-helpful">

When subscribing to an observable in a component, you almost always unsubscribe when the component is destroyed.

However, `ActivatedRoute` observables are among the exceptions because `ActivatedRoute` and its observables are insulated from the `Router` itself.
The `Router` destroys a routed component when it is no longer needed. This means all the component's members will also be destroyed,
including the injected `ActivatedRoute` and the subscriptions to its `Observable` properties.

The `Router` does not `complete` any `Observable` of the `ActivatedRoute` so any `finalize` or `complete` blocks will not run.
If you need to handle something in a `finalize`, you still need to unsubscribe in `ngOnDestroy`. You also have to
unsubscribe if your observable pipe has a delay with code you do not want to run after the component is destroyed.

</div>
-->
예제 앱에서 라우팅 인자를 받아오는 맵은 `Observable` 타입입니다.
이 옵저버블로 전달되는 인자는 컴포넌트 라이프싸이클에 따라 변경될 수 있습니다.

기본적으로 라우터는 어떤 컴포넌트가 다른 컴포넌트를 거치지 않고 같은 컴포넌트로 전환하면 해당 컴포넌트 인스턴스를 재사용합니다.
이 때 라우팅 인자는 변경될 수 있습니다.

부모 컴포넌트에서 "forward", "back" 버튼으로 목록에 있는 히어로를 스크롤한다고 합시다.
그러면 화면이 전환될 때마다 다른 `id` 값으로 `HeroDetailComponent`이 재사용될 것입니다.

어쩌면 현재 DOM에 존재하는 `HeroDetailComponent` 인스턴스를 제거하고 새로 받는 `id`로 화면을 다시 렌더링하는 것을 원할 수도 있습니다.
하지만 더 나은 UX를 위해서라면 컴포넌트 인스턴스는 그대로 재사용하고 인자만 새로 받아서 갱신하는 방식이 더 좋습니다.

다만, `ngOnInit()`은 컴포넌트가 초기화된 후에 한번만 실행되기 때문에 _같은 컴포넌트 인스턴스에서_ 라우팅 인자가 변경되는 것을 감지하려면 `paramMap` 옵저버블을 구독해야 합니다.


<div class="alert is-helpful">

컴포넌트 안에서 옵저버블을 구독하면 컴포넌트가 종료될때 이 옵저버블 구독을 반드시 해지해야 합니다.

하지만 `ActivatedRoute` 옵저버블은 예외인데, `ActivatedRoute` 인스턴스와 이 인스턴스가 제공하는 옵저버블은 모두 `Router`와 별개입니다.
더이상 필요하지 않게 된 컴포넌트는 `Router`가 종료합니다.
이 말은 컴포넌트의 멤버도 모두 종료된다는 것이며, 이 때 의존성으로 주입된 `ActivatedRoute`도 종료되고 이 옵저버블 구독도 종료됩니다.

그런데 `Router`는 `ActivatedRoute`를 구독하는 `Observable`에 `complete` 신호를 보내지 않기 때문에 `finalize`나 `complete` 코드가 실행되지 않습니다.
그래서 `finalize`로 실행해야 하는 것이 있다면 `ngOnDestroy`에서 구독이 끝나는 동작을 직접 처리해야 합니다.


The `Router` does not `complete` any `Observable` of the `ActivatedRoute` so any `finalize` or `complete` blocks will not run.
If you need to handle something in a `finalize`, you will still need to unsubscribe in `ngOnDestroy`. You will also have to
unsubscribe if your observable pipe has a delay with code you do not want to run after the component is destroyed.

</div>


{@a snapshot}
{@a snapshot-the-no-observable-alternative}

<!--
#### `snapshot`: the no-observable alternative
-->
#### `snapshot`: 옵저버블을 사용하지 않는 방식

<!--
This application won't re-use the `HeroDetailComponent`.
The user always returns to the hero list to select another hero to view.
There's no way to navigate from one hero detail to another hero detail without visiting the list component in between.
Therefore, the router creates a new `HeroDetailComponent` instance every time.

When you know for certain that a `HeroDetailComponent` instance will never be re-used, you can use `snapshot`.

`route.snapshot` provides the initial value of the route parameter map.
You can access the parameters directly without subscribing or adding observable operators as in the following:

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.2.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (ngOnInit snapshot)" region="snapshot"></code-example>

<div class="alert is-helpful">

`snapshot` only gets the initial value of the parameter map with this technique.
Use the observable `paramMap` approach if there's a possibility that the router could re-use the component.
This tutorial sample application uses with the observable `paramMap`.

</div>
-->
예제 앱에서는 `HeroDetailComponent`를 재사용하지 않습니다.
사용자가 다른 히어로의 상세정보를 보려면 반드시 히어로 목록 화면으로 돌아와야 하며, 히어로 목록을 표시하는 컴포넌트를 건너뛰고 다른 히어로의 상세정보를 확인하는 방법은 없습니다.
그래서 라우터는 매번 `HeroDetailComponent`의 인스턴스를 새로 생성합니다.

`HeroDetailComponent` 인스턴스가 재사용되지 않는다는 것을 확신할 수 있으면 `snapshot`을 활용하는 방법도 좋습니다.

`route.snapshot`은 라우팅 인자의 최초값을 제공합니다.
이 객체는 옵저버블이 아니기 때문에 구독하거나 옵저버블 연산자를 사용하지 않아도 직접 참조할 수 있습니다:

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.2.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (ngOnInit() 스냅샷)" region="snapshot"></code-example>


<div class="alert is-helpful">

`snapshot`으로 참조할 수 있는 라우팅 인자는 해당 라우팅 인자의 최초값 뿐입니다.
라우터가 컴포넌트를 재사용할 가능성이 있다면 `paramMap` 옵저버블을 사용해야 합니다.
이 문서에서는 `paramMap` 옵저버블을 사용하는 방식을 기준으로 설명합니다.

</div>


{@a nav-to-list}

<!--
### Navigating back to the list component
-->
### 이전 화면으로 전환하기

<!--
The `HeroDetailComponent` "Back" button uses the `gotoHeroes()` method that navigates imperatively back to the `HeroListComponent`.

The router `navigate()` method takes the same one-item _link parameters array_ that you can bind to a `[routerLink]` directive.
It holds the path to the `HeroListComponent`:


<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.1.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (excerpt)" region="gotoHeroes"></code-example>
-->
`HeroDetailComponent`에 있는 "Back" 버튼은 `gotoHeroes()` 메서드를 실행해서 이전 화면인 `HeroListComponent`로 이동합니다.

라우터가 제공하는 `navigate()` 메서드는 `[routerLink]` 디렉티브와 비슷하게 항목이 하나인 _링크 인자 배열_ 을 받습니다.
이 인자에는 `HeroListComponent`에 해당하는 주소를 지정하면 됩니다:

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.1.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (일부)" region="gotoHeroes"></code-example>


{@a optional-route-parameters}

<!--
#### Route Parameters: Required or optional?
-->
#### 라우팅 인자: 필수일까 옵션일까?

<!--
Use [route parameters](#route-parameters) to specify a required parameter value within the route URL
as you do when navigating to the `HeroDetailComponent` in order to view the hero with `id` 15:


<code-example format="nocode">
  localhost:4200/hero/15

</code-example>



You can also add optional information to a route request.
For example, when returning to the `hero-detail.component.ts` list from the hero detail view, it would be nice if the viewed hero were preselected in the list.

<div class="lightbox">
  <img src='generated/images/guide/router/selected-hero.png' alt="Selected hero">
</div>

You implement this feature by including the viewed hero's `id` in the URL as an optional parameter when returning from the `HeroDetailComponent`.

Optional information can also include other forms such as:

* Loosely structured search criteria; for example, `name='wind*'`.
* Multiple values;  for example, `after='12/31/2015' & before='1/1/2017'`&mdash;in no
particular order&mdash;`before='1/1/2017' & after='12/31/2015'`&mdash; in a
variety of formats&mdash;`during='currentYear'`.

As these kinds of parameters don't fit smoothly in a URL path, you can use optional parameters for conveying arbitrarily complex information during navigation.
Optional parameters aren't involved in pattern matching and afford flexibility of expression.

The router supports navigation with optional parameters as well as required route parameters.
Define optional parameters in a separate object _after_ you define the required route parameters.

In general, use a required route parameter when the value is mandatory (for example, if necessary to distinguish one route path from another); and an optional parameter when the value is optional, complex, and/or multivariate.
-->
`HeroDetailComponent`를 렌더링할 때 `id=15`에 해당하는 히어로를 찾아오는 경우와 같이, 화면을 전환하면서 필수 인자를 지정해야 한다면 [라우팅 인자](#route-parameters)를 활용해야 합니다.

<code-example format="nocode">
  localhost:4200/hero/15

</code-example>

화면을 전환할 때는 추가 정보를 함께 전달할 수도 있습니다.
`HeroDetailComponent` 화면에서 히어로 목록 화면으로 돌아올 때 이전에 선택했던 히어로를 다르게 표시하면 UX에 도움이 될 것입니다.

<div class="lightbox">
  <img src='generated/images/guide/router/selected-hero.png' alt="Selected hero">
</div>

이 동작은 `HeroDetailComponent`에서 봤던 히어로의 `id`를 이전 화면으로 돌아가는 URL에 옵션 라우팅 인자로 추가하면 됩니다.

옵션 라우팅 인자는 이런 형식으로 구성합니다:

* 타입이 엄격하지 않은 경우: `name='wind*'`
* 값이 여러개인 경우: `after='12/31/2015' & before='1/1/2017'` &mdash; 순서가 정해져있지 않다면 &mdash; `before='1/1/2017' & after='12/31/2015'` &mdash; 정해진 형식에 따라 &mdash; `during='currentYear'`

이런 옵션 라우팅 인자들은 URL 주소와 매칭되지 않기 때문에 아무리 복잡한 정보라도 URL과 함께 자유롭게 전달할 수 있습니다.
옵션 라우팅 인자는 라우터가 적용하는 URL 패턴 매칭과 별개로 동작하기 때문에 상대적으로 유연합니다.

옵션 라우팅 인자는 필수 라우팅 인자와 마찬가지로 라우팅하면서 지정할 수도 있습니다.
링크 배열의 이동하려는 주소 _다음에_ 객체 형태로 지정하면 됩니다.

일반적으로 화면을 전환하면서 꼭 필요한 값은 필수 라우팅 인자로 사용하고, 생략할 수 있으며 복잡하거나 개수가 변경될 수 있으면 옵션 라우팅 인자로 사용합니다.


{@a optionally-selecting}

<!--
#### Heroes list: optionally selecting a hero
-->
#### 히어로 목록: 히어로 선택하기(옵션)

<!--
When navigating to the `HeroDetailComponent` you specified the required `id` of the hero-to-edit in the
route parameter and made it the second item of the [_link parameters array_](#link-parameters-array).

<code-example path="router/src/app/heroes/hero-list/hero-list.component.1.html" header="src/app/heroes/hero-list/hero-list.component.html (link-parameters-array)" region="link-parameters-array"></code-example>

The router embedded the `id` value in the navigation URL because you had defined it as a route parameter with an `:id` placeholder token in the route `path`:

<code-example path="router/src/app/heroes/heroes-routing.module.1.ts" header="src/app/heroes/heroes-routing.module.ts (hero-detail-route)" region="hero-detail-route"></code-example>

When the user clicks the back button, the `HeroDetailComponent` constructs another _link parameters array_
which it uses to navigate back to the `HeroListComponent`.

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.1.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (gotoHeroes)" region="gotoHeroes"></code-example>

This array lacks a route parameter because previously you didn't need to send information to the `HeroListComponent`.

Now, send the `id` of the current hero with the navigation request so that the
`HeroListComponent` can highlight that hero in its list.

Send the `id` with an object that contains an optional `id` parameter.
For demonstration purposes, there's an extra junk parameter (`foo`) in the object that the `HeroListComponent` should ignore.
Here's the revised navigation statement:

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (go to heroes)" region="gotoHeroes"></code-example>

The application still works. Clicking "back" returns to the hero list view.

Look at the browser address bar.

It should look something like this, depending on where you run it:

<code-example language="bash">
  localhost:4200/heroes;id=15;foo=foo

</code-example>

The `id` value appears in the URL as (`;id=15;foo=foo`), not in the URL path.
The path for the "Heroes" route doesn't have an `:id` token.

The optional route parameters are not separated by "?" and "&" as they would be in the URL query string.
They are separated by semicolons ";".
This is matrix URL notation.

<div class="alert is-helpful">

Matrix URL notation is an idea first introduced in a [1996 proposal](https://www.w3.org/DesignIssues/MatrixURIs.html) by the founder of the web, Tim Berners-Lee.

Although matrix notation never made it into the HTML standard, it is legal and it became popular among browser routing systems as a way to isolate parameters belonging to parent and child routes.
As such, the Router provides support for the matrix notation across browsers.

</div>
-->
`HeroDetailComponent`로 화면을 전환할 때는 상세정보 화면에 표시할 히어로의 `id`를 [_링크 인자 배열_](#link-parameters-array)의 두 번째 항목으로 전달할 수 있습니다.

<code-example path="router/src/app/heroes/hero-list/hero-list.component.1.html" header="src/app/heroes/hero-list/hero-list.component.html (link-parameters-array)" region="link-parameters-array"></code-example>

그러면 해당 라우팅 규칙의 `path` 프로퍼티에 `:id` 토큰이 존재하기 때문에, 라우터는 `id` 값을 심어서 최종 URL을 구성합니다:

<code-example path="router/src/app/heroes/heroes-routing.module.1.ts" header="src/app/heroes/heroes-routing.module.ts (hero-detail-route)" region="hero-detail-route"></code-example>

그리고 사용자가 뒤로가기 버튼을 클릭하면 `HeroDetailComponent`는 `HeroListComponent`로 돌아가기 위해 새로운 _링크 인자 배열_ 을 구성합니다.

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.1.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (gotoHeroes())" region="gotoHeroes"></code-example>

이 배열에는 라우팅 인자가 없습니다.
왜냐하면 `HeroListComponent`에 필요한 필수 라우팅 인자가 없기 때문입니다.

하지만 이제는 상세정보에서 봤던 히어로의 `id`를 `HeroListComponent`로 전달해서 이 히어로를 목록에서 하이라이트 처리해 봅시다.

`id` 값은 객체 형태로 전달합니다.
이 객체에 불필요한 인자(`foo`)가 있더라도 해당 인자는 `HeroListComponent`에서 무시하면 됩니다.
이제 라우팅 주소를 이렇게 구성할 수 있습니다:

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts" header="src/app/heroes/hero-detail/hero-detail.component.ts (목록으로 돌아가기)" region="gotoHeroes"></code-example>

애플리케이션에서 직접 확인해보세요.
"back" 버튼을 클릭하면 히어로 목록 화면으로 돌아갑니다.

이 때 브라우저 주소표시줄을 확인하면 주소가 이런식으로 표시되는 것을 확인할 수 있습니다:

<code-example language="bash">
  localhost:4200/heroes;id=15;foo=foo

</code-example>

`id` 값은 URL에 존재하지만(`;id=15;foo=foo`) URL 주소 부분에 있는 것은 아닙니다.
`/heroes` 주소에 해당하는 라우팅 규칙에는 `:id` 토큰이 없습니다.

옵션 라우팅 인자는 URL 쿼리 스트링처럼 "?"나 "&"로 구분하지 않고 ";"로 구분합니다.
이 방식은 매트릭스 URL 표기법(matrix URL notation)입니다.


<div class="alert is-helpful">

매트릭스 URL 표기법은 웹을 개발한 Tim Berners-Lee가 [1996년에 처음 제안](http://www.w3.org/DesignIssues/MatrixURIs.html)한 표기법입니다.

매트릭스 표기법이 HTML 표준이 되진 않았지만, 이 표기법은 앚기 유효하며 부모/자식 사이에서 라우팅 인자를 전달하는 용도로 브라우저 라우팅 체계에 자주 사용됩니다.
Angular Router도 이 표기법을 지원합니다.

</div>


{@a route-parameters-activated-route}

<!--
### Route parameters in the `ActivatedRoute` service
-->
### `ActivatedRoute` 서비스에 있는 라우팅 인자

<!--
In its current state of development, the list of heroes is unchanged.
No hero row is highlighted.

The `HeroListComponent` needs code that expects parameters.

Previously, when navigating from the `HeroListComponent` to the `HeroDetailComponent`,
you subscribed to the route parameter map `Observable` and made it available to the `HeroDetailComponent`
in the `ActivatedRoute` service.
You injected that service in the constructor of the `HeroDetailComponent`.

This time you'll be navigating in the opposite direction, from the `HeroDetailComponent` to the `HeroListComponent`.

First, extend the router import statement to include the `ActivatedRoute` service symbol:

<code-example path="router/src/app/heroes/hero-list/hero-list.component.ts" header="src/app/heroes/hero-list/hero-list.component.ts (import)" region="import-router"></code-example>

Import the `switchMap` operator to perform an operation on the `Observable` of route parameter map.

<code-example path="router/src/app/heroes/hero-list/hero-list.component.ts" header="src/app/heroes/hero-list/hero-list.component.ts (rxjs imports)" region="rxjs-imports"></code-example>

Inject the `ActivatedRoute` in the `HeroListComponent` constructor.

<code-example path="router/src/app/heroes/hero-list/hero-list.component.ts" header="src/app/heroes/hero-list/hero-list.component.ts (constructor and ngOnInit)" region="ctor"></code-example>

The `ActivatedRoute.paramMap` property is an `Observable` map of route parameters.
The `paramMap` emits a new map of values that includes `id` when the user navigates to the component.
In `ngOnInit()` you subscribe to those values, set the `selectedId`, and get the heroes.

Update the template with a [class binding](guide/attribute-binding#class-binding).
The binding adds the `selected` CSS class when the comparison returns `true` and removes it when `false`.
Look for it within the repeated `<li>` tag as shown here:

<code-example path="router/src/app/heroes/hero-list/hero-list.component.html" header="src/app/heroes/hero-list/hero-list.component.html"></code-example>

Add some styles to apply when the hero is selected.

<code-example path="router/src/app/heroes/hero-list/hero-list.component.css" region="selected" header="src/app/heroes/hero-list/hero-list.component.css"></code-example>

When the user navigates from the heroes list to the "Magneta" hero and back, "Magneta" appears selected:

<div class="lightbox">
  <img src='generated/images/guide/router/selected-hero.png' alt="Selected hero in list has different background color">
</div>

The optional `foo` route parameter is harmless and the router continues to ignore it.
-->
아직까지는 개발단계이기 때문에 히어로 목록이 변경되지 않습니다.
하이라이트된 히어로 줄도 없습니다.

상세정보 화면에서 보고 돌아온 히어로를 하이라이트 처리하려면 `HeroListComponent`가 라우팅 인자를 활용하도록 수정해야 합니다.

이전 섹션에서 `HeroListComponent`에서 `HeroDetailComponent`로 이동할 때는 라우팅 인자 맵 `Observable`을 구독하거나 `HeroDetailComponent` 안에 주입된 `ActivatedRoute` 서비스를 사용했습니다.

이번에 화면이 전환되는 방향은 이전과 반대로 `HeroDetailComponent`에서 `HeroListComponent`로 전환됩니다.

먼저, `ActivatedRoute` 서비스 심볼을 로드합니다:

<code-example path="router/src/app/heroes/hero-list/hero-list.component.ts" header="src/app/heroes/hero-list/hero-list.component.ts (ActivatedRoute 로드하기)" region="import-router"></code-example>

그리고 `Observable` 타입으로 제공되는 라우팅 인자 맵을 참조하기 위해 `switchMap` 연산자를 로드합니다.

<code-example path="router/src/app/heroes/hero-list/hero-list.component.ts" header="src/app/heroes/hero-list/hero-list.component.ts (rxjs 연산자 로드하기)" region="rxjs-imports"></code-example>

그 다음에는 `ActivatedRoute`를 `HeroListComponent` 생성자로 주입합니다.

<code-example path="router/src/app/heroes/hero-list/hero-list.component.ts" header="src/app/heroes/hero-list/hero-list.component.ts (constructor and ngOnInit)" region="ctor"></code-example>

`ActivatedRoute.paramMap` 프로퍼티는 라우팅 인자 맵을 `Observable` 타입으로 제공합니다.
`paramMap`은 사용자가 컴포넌트에 진입할 때마다 상황에 맞는 라우팅 인자를 전달하며, 이 경우에는 `id`도 포함됩니다.
`ngOnInit()` 메서드에서 이 프로퍼티를 구독해서 받아온 `id` 값을 `selectedId`에 할당하고 히어로 정보를 요청해 봅시다.

이제 템플릿은 [클래스 바인딩](guide/attribute-binding#class-binding)이 동작하면서 갱신됩니다.
그래서 클래스 바인딩에 사용된 평가식이 `true`를 반환하면 CSS 클래스 `selected`가 해당 DOM에 추가되고, 평가식이 `false`를 반환하면 해당 클래스가 제거됩니다.
클래스 바인딩은 `<li>` 태그에 지정합니다:

<code-example path="router/src/app/heroes/hero-list/hero-list.component.html" header="src/app/heroes/hero-list/hero-list.component.html"></code-example>

항목이 선택되었을 때 적용될 스타일을 추가합니다.

<code-example path="router/src/app/heroes/hero-list/hero-list.component.css" region="selected" header="src/app/heroes/hero-list/hero-list.component.css"></code-example>

이제 사용자가 히어로 목록 화면에서 "Magneta" 히어로의 상세정보 화면으로 이동한 후에 돌아오면 "Matneta" 항목이 선택된 모습으로 표시됩니다:

<div class="lightbox">
  <img src='generated/images/guide/router/selected-hero.png' alt="Selected List">
</div>

함께 전달된 라우팅 인자 `foo`는 사용되지 않았지만 무시해도 문제되지 않습니다.


{@a route-animation}

<!--
### Adding routable animations
-->
### 라우팅 애니메이션 추가하기

<!--
This section shows you how to add some [animations](guide/animations) to the `HeroDetailComponent`.

First, import the `BrowserAnimationsModule` and add it to the `imports` array:

<code-example path="router/src/app/app.module.ts" header="src/app/app.module.ts (animations-module)" region="animations-module"></code-example>

Next, add a `data` object to the routes for `HeroListComponent` and `HeroDetailComponent`.
Transitions are based on `states` and you use the `animation` data from the route to provide a named animation `state` for the transitions.

<code-example path="router/src/app/heroes/heroes-routing.module.2.ts" header="src/app/heroes/heroes-routing.module.ts (animation data)"></code-example>

Create an `animations.ts` file in the root `src/app/` folder. The contents look like this:

<code-example path="router/src/app/animations.ts" header="src/app/animations.ts (excerpt)"></code-example>

This file does the following:

* Imports the animation symbols that build the animation triggers, control state, and manage transitions between states.

* Exports a constant named `slideInAnimation` set to an animation trigger named `routeAnimation`.

* Defines one transition when switching back and forth from the `heroes` and `hero` routes to ease the component in from the left of the screen as it enters the application view (`:enter`), the other to animate the component to the right as it leaves the application view (`:leave`).

Back in the `AppComponent`, import the `RouterOutlet` token from the `@angular/router` package and the `slideInAnimation` from `'./animations.ts`.

Add an `animations` array to the `@Component` metadata that contains the `slideInAnimation`.

<code-example path="router/src/app/app.component.2.ts" header="src/app/app.component.ts (animations)" region="animation-imports"></code-example>

To use the routable animations, wrap the `RouterOutlet` inside an element, use the `@routeAnimation` trigger, and bind it to the element.

For the `@routeAnimation` transitions to key off states, provide it with the `data` from the `ActivatedRoute`.
The `RouterOutlet` is exposed as an `outlet` template variable, so you bind a reference to the router outlet.
This example uses a variable of `routerOutlet`.

<code-example path="router/src/app/app.component.2.html" header="src/app/app.component.html (router outlet)"></code-example>

The `@routeAnimation` property is bound to the `getAnimationData()` with the provided `routerOutlet` reference, so the next step is to define that function in the `AppComponent`.
The `getAnimationData()` function returns the animation property from the `data` provided through the `ActivatedRoute`. The `animation` property matches the `transition` names you used in the `slideInAnimation` defined in `animations.ts`.

<code-example path="router/src/app/app.component.2.ts" header="src/app/app.component.ts (router outlet)" region="function-binding"></code-example>

When switching between the two routes, the `HeroDetailComponent` and `HeroListComponent` now ease in from the left when routed to, and slide to the right when navigating away.
-->
이번 섹션에서는 `HeroDetailComponent`로 화면을 전환할 때 [애니메이션](guide/animations)을 적용하는 방법에 대해 알아봅시다.

먼저, `BrowserAnimationsModule`을 로드하고 앱 모듈 `imports` 배열에 추가합니다:

<code-example path="router/src/app/app.module.ts" header="src/app/app.module.ts (애니메이션 모듈)" region="animations-module"></code-example>

그리고 `HeroListComponent`와 `HeroDetailComponent`에 해당하는 라우팅 규칙에 `data` 객체를 추가합니다.
전환 효과(transition)는 `states`를 기반으로 동작하기 때문에 애니메이션 `state`에 해당하는 `animation` 데이터를 라우팅 규칙에 추가해야 합니다.

<code-example path="router/src/app/heroes/heroes-routing.module.2.ts" header="src/app/heroes/heroes-routing.module.ts (애니메이션 데이터)"></code-example>

그 다음에는 `src/app/` 폴더에 `animations.ts` 파일을 생성하고 이런 내용으로 작성합니다:

<code-example path="router/src/app/animations.ts" header="src/app/animations.ts (일부)"></code-example>

이 파일의 내용은 이렇습니다:

* 애니메이션 트리거를 생성하는 심볼, 상태를 조작하는 심볼, 상태 전환을 관리하는 심볼을 로드합니다.

* `routeAnimation` 트리거를 `slideAnimation` 상수로 파일 외부로 공개합니다.

* `heroes`, `hero` 라우팅 규칙이 적용될 때 사용될 전환 효과를 정의합니다.
해당 컴포넌트에 진입할 때(`:enter`)는 컴포넌트가 화면 왼쪽에서 나타나도록 정의하며, 컴포넌트를 벗어날 때(`:leave`)는 화면 오른쪽으로 사라지도록 정의합니다.

그리고 `AppComponent` 파일로 돌아가서 `@angular/router` 패키지에서 `RouterOutlet` 토큰을 로드하고 `'./animations.ts'` 파일에서 `slideInAnimation` 상수를 로드합니다.

이제 `@Component` 메타데이터의 `animations` 배열에 `slideInAnimation`을 추가합니다.

<code-example path="router/src/app/app.component.2.ts" header="src/app/app.component.ts (animations 배열)" region="animation-imports"></code-example>

라우팅 애니메이션을 사용하려면 `RouterOutlet`을 둘러싸는 엘리먼트를 추가하고 이 엘리먼트에 `@routeAnimation` 트리거를 바인딩해야 합니다.

이제 `@routeAnimation` 전환 효과에 적용되는 상태는 `data` 객체에 담아서 `ActivatedRoute`로 전달합니다.
그리고 `outlet` 템플릿 변수가 할당된 `RouterOutlet`을 바인딩합니다.
이 예제에서는 `outlet` 대신 `routerOutlet`을 바인딩했습니다.

<code-example path="router/src/app/app.component.2.html" header="src/app/app.component.html (라우팅 영역)"></code-example>

`@routeAnimation` 프로퍼티는 `routerOutlet` 참조와 함께 `getAnimationData()`와 바인딩되기 때문에 이제 `AppComponent`에 `getAnimationData()` 메서드를 정의해야 합니다.
`getAnimationData()` 함수는 `ActivatedRoute` 안에 있는 `data` 객체에서 애니메이션 프로퍼티를 찾아서 반환하는 함수입니다.
그리고 `animation` 프로퍼티는는 `animations.ts` 파일에 정의한 `slideInAnimation` 안에 있는 상태 이름과 매칭됩니다.

<code-example path="router/src/app/app.component.2.ts" header="src/app/app.component.ts (라우팅 영역)" region="function-binding"></code-example>

이제 `HeroDetailComponent`와 `HeroListComponent`를 전환해보면 새로 등장하는 컴포넌트가 화면 왼쪽에서 나타나고, 사라지는 컴포넌트가 화면 오른쪽으로 사라지는 애니메이션이 동작하는 것을 확인할 수 있습니다.

{@a milestone-3-wrap-up}

<!--
### Milestone 3 wrap up
-->
### 마일스톤 3 정리

<!--
This section covered the following:

* Organizing the application into feature areas.
* Navigating imperatively from one component to another.
* Passing information along in route parameters and subscribe to them in the component.
* Importing the feature area NgModule into the `AppModule`.
* Applying routable animations based on the page.

After these changes, the folder structure is as follows:
-->
이번 섹션에서는 이런 내용을 다뤘습니다:

* 애플리케이션을 기능 단위로 재구성했습니다.
* 컴포넌트를 전환하는 방법에 대해 다뤘습니다.
* 라우팅 인자로 정보를 전달하고 새로 표시되는 컴포넌트에서 이 정보를 구독해서 사용했습니다.
* `AppModule`에 기능 모듈을 로드했습니다.
* 라우팅 애니메이션을 적용했습니다.

여기까지 작업하고 나면 폴더 구조가 이렇게 구성됩니다:

<div class='filetree'>

  <div class='file'>
    angular-router-sample
  </div>

  <div class='children'>

    <div class='file'>
      src
    </div>

    <div class='children'>

      <div class='file'>
        app
      </div>

      <div class='children'>

        <div class='file'>
          crisis-list
        </div>

          <div class='children'>

            <div class='file'>
              crisis-list.component.css
            </div>

            <div class='file'>
              crisis-list.component.html
            </div>

            <div class='file'>
              crisis-list.component.ts
            </div>

          </div>

        <div class='file'>
          heroes
        </div>

        <div class='children'>

          <div class='file'>
            hero-detail
          </div>

            <div class='children'>

              <div class='file'>
                hero-detail.component.css
              </div>

              <div class='file'>
                hero-detail.component.html
              </div>

              <div class='file'>
                hero-detail.component.ts
              </div>

            </div>

          <div class='file'>
            hero-list
          </div>

            <div class='children'>

              <div class='file'>
                hero-list.component.css
              </div>

              <div class='file'>
                hero-list.component.html
              </div>

              <div class='file'>
                hero-list.component.ts
              </div>

            </div>

          <div class='file'>
            hero.service.ts
          </div>

          <div class='file'>
            hero.ts
          </div>

          <div class='file'>
            heroes-routing.module.ts
          </div>

          <div class='file'>
            heroes.module.ts
          </div>

          <div class='file'>
            mock-heroes.ts
          </div>

        </div>

        <div class='file'>
          page-not-found
        </div>

        <div class='children'>

          <div class='file'>

            page-not-found.component.css

          </div>

          <div class='file'>

            page-not-found.component.html

          </div>

          <div class='file'>

            page-not-found.component.ts

          </div>

        </div>

      </div>

      <div class='file'>
        animations.ts
      </div>

      <div class='file'>
        app.component.css
      </div>

      <div class='file'>
        app.component.html
      </div>

      <div class='file'>
        app.component.ts
      </div>

      <div class='file'>
        app.module.ts
      </div>

      <div class='file'>
        app-routing.module.ts
      </div>

      <div class='file'>
        main.ts
      </div>

      <div class='file'>
        message.service.ts
      </div>

      <div class='file'>
        index.html
      </div>

      <div class='file'>
        styles.css
      </div>

      <div class='file'>
        tsconfig.json
      </div>

    </div>

    <div class='file'>
      node_modules ...
    </div>

    <div class='file'>
      package.json
    </div>

  </div>

</div>

<!--
Here are the relevant files for this version of the sample application.
-->
그리고 이 시점에 예제 애플리케이션의 코드는 이렇습니다.

<code-tabs>

  <code-pane header="animations.ts" path="router/src/app/animations.ts">

  </code-pane>

  <code-pane header="app.component.html" path="router/src/app/app.component.2.html">

  </code-pane>

  <code-pane header="app.component.ts" path="router/src/app/app.component.2.ts">

  </code-pane>

  <code-pane header="app.module.ts" path="router/src/app/app.module.3.ts">

  </code-pane>

  <code-pane header="app-routing.module.ts" path="router/src/app/app-routing.module.2.ts" region="milestone3">

  </code-pane>

  <code-pane header="hero-list.component.css" path="router/src/app/heroes/hero-list/hero-list.component.css">

  </code-pane>

  <code-pane header="hero-list.component.html" path="router/src/app/heroes/hero-list/hero-list.component.html">

  </code-pane>

  <code-pane header="hero-list.component.ts" path="router/src/app/heroes/hero-list/hero-list.component.ts">

  </code-pane>

  <code-pane header="hero-detail.component.html" path="router/src/app/heroes/hero-detail/hero-detail.component.html">

  </code-pane>

  <code-pane header="hero-detail.component.ts" path="router/src/app/heroes/hero-detail/hero-detail.component.3.ts">

  </code-pane>

  <code-pane header="hero.service.ts" path="router/src/app/heroes/hero.service.ts">

  </code-pane>

  <code-pane header="heroes.module.ts" path="router/src/app/heroes/heroes.module.ts">

  </code-pane>

  <code-pane header="heroes-routing.module.ts" path="router/src/app/heroes/heroes-routing.module.2.ts">

  </code-pane>

  <code-pane header="message.service.ts" path="router/src/app/message.service.ts">

  </code-pane>

</code-tabs>



{@a milestone-4}



<!--
## Milestone 4: Crisis center feature
-->
## 마일스톤 4: 위기대응센터 모듈

<!--
This section shows you how to add child routes and use relative routing in your app.

To add more features to the application's current crisis center, take similar steps as for the heroes feature:

* Create a `crisis-center` subfolder in the `src/app` folder.
* Copy the files and folders from `app/heroes` into the new `crisis-center` folder.
* In the new files, change every mention of "hero" to "crisis", and "heroes" to "crises".
* Rename the NgModule files to `crisis-center.module.ts` and `crisis-center-routing.module.ts`.

Use mock crises instead of mock heroes:

<code-example path="router/src/app/crisis-center/mock-crises.ts" header="src/app/crisis-center/mock-crises.ts"></code-example>

The resulting crisis center is a foundation for introducing a new concept&mdash;child routing.
You can leave Heroes in its current state as a contrast with the Crisis Center.

<div class="alert is-helpful">

In keeping with the <a href="https://blog.8thlight.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html" title="Separation of Concerns">Separation of Concerns principle</a>, changes to the Crisis Center don't affect the `AppModule` or any other feature's component.

</div>
-->
이번 섹션에서는 애플리케이션에 자식 라우팅 규칙을 추가하고 상대 주소로 라우팅하는 방법에 대해 알아봅시다.

지금 앱에 있는 위기대응센터 기능을 좀 더 확장하는 방법은 히어로 관리 기능을 추가했던 것과 비슷합니다:

* `src/app` 폴더 아래 `crisis-center` 폴더를 만듭니다.
* `app/heroes`에 있는 폴더와 파일을 `crisis-center` 폴더로 복사합니다.
* 복사한 파일에서 "hero"라고 언급한 부분을 "crisis"로, "heroes"라고 언급한 부분을 "crises"로 변경합니다.
* 새로 복사한 NgModule 파일의 이름을 `crisis-center.module.ts`, `cris-center-routing.module.ts`로 변경합니다.

히어로 목 객체 대신 위기 목 객체를 생성합니다:

<code-example path="router/src/app/crisis-center/mock-crises.ts" header="src/app/crisis-center/mock-crises.ts"></code-example>

새로 만든 위기대응센터에는 새로운 개념인 자식 라우팅을 활용해 봅시다.
그러면 위기대응센터 기능을 사용하면서 히어로 모듈의 상태를 그대로 유지할 수 있습니다.

<div class="alert is-helpful">

<a href="https://blog.8thlight.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html" title="Separation of Concerns">관심사 분리 원칙</a>에 따라 위기대응센터에서 변경하는 코드는 `AppModule`이나 다른 기능모듈에 영향을 주지 않아야 합니다.

</div>


{@a crisis-child-routes}
{@a a-crisis-center-with-child-routes}

<!--
### A crisis center with child routes
-->
### 위기대응센터와 자식 라우팅

<!--
This section shows you how to organize the crisis center to conform to the following recommended pattern for Angular applications:

* Each feature area resides in its own folder.
* Each feature has its own Angular feature module.
* Each area has its own area root component.
* Each area root component has its own router outlet and child routes.
* Feature area routes rarely (if ever) cross with routes of other features.

If your application had many feature areas, the component trees might consist of multiple components for those features, each with branches of other, related, components.


<div class="lightbox">
  <img src='generated/images/guide/router/component-tree.png' alt="Component Tree">
</div>
-->
이번 섹션에서는 Angular 애플리케이션에서 권장하는 방식으로 위기대응센터를 구성해 봅시다:

* 개별 기능 단위는 개별 폴더에 두세요.
* 개별 기능 단위는 개별 Angular 기능 모듈로 구성하세요.
* 개별 기능 단위에는 최상위 컴포넌트가 있어야 합니다.
* 개별 기능 단위의 최상위 컴포넌트에는 라우팅 영역과 자식 라우팅 규칙이 있어야 합니다.
* 개별 기능 단위에서 다른 기능 단위로 라우팅하는 경우도 가끔 있습니다.

애플리케이션에 기능 단위가 많이 있다면 앱 컴포넌트 트리가 복잡하게 구성되며, 개별 브랜치에는 관련된 컴포넌트가 존재할 것입니다.


{@a child-routing-component}

<!--
### Child routing component
-->
### 자식 라우팅 컴포넌트

<!--
Generate a `CrisisCenter` component in the `crisis-center` folder:

<code-example language="sh">
  ng generate component crisis-center/crisis-center
</code-example>

Update the component template with the following markup:

<code-example path="router/src/app/crisis-center/crisis-center/crisis-center.component.html" header="src/app/crisis-center/crisis-center/crisis-center.component.html"></code-example>

The `CrisisCenterComponent` has the following in common with the `AppComponent`:

* It is the root of the crisis center area, just as `AppComponent` is the root of the entire application.
* It is a shell for the crisis management feature area, just as the `AppComponent` is a shell to manage the high-level workflow.

Like most shells, the `CrisisCenterComponent` class is minimal because it has no business logic, and its template has no links, just a title and `<router-outlet>` for the crisis center child component.
-->
`crisis-center` 폴더에서 다음 명령을 실행해서 `CrisisCenter` 컴포넌트를 생성합니다:

<code-example language="none" class="code-shell">
  ng generate component crisis-center/crisis-center
</code-example>

그리고 컴포넌트 템플릿의 내용을 이렇게 수정합니다:

<code-example path="router/src/app/crisis-center/crisis-center/crisis-center.component.html" header="src/app/crisis-center/crisis-center/crisis-center.component.html"></code-example>

`CrisisCenterComponent`는 이런 점에서 `AppComponent`와 비슷합니다:

* 이 컴포넌트는 위기대응센터 기능의 최상위 컴포넌트입니다. `AppComponent`는 애플리케이션 전체에서 최상위 컴포넌트입니다.
* 위기대응센터가 제공하는 기능은 이 컴포넌트 안에 표시됩니다. `AppComponent`는 그보다 상위 계층에서 동작합니다.

기본 컴포넌트가 그렇듯, `CrisisCenterComponent`의 클래스에는 비즈니스 로직이 들어가지 않기 때문에 최소한의 코드만 작성됩니다.
이 컴포넌트의 템플릿에는 링크도 존재하지 않으며 제목 하나와 자식 컴포넌트를 표시할 `<router-outlet>`만 존재합니다.


{@a child-route-config}

<!--
### Child route configuration
-->
### 자식 라우팅 환경설정

<!--
As a host page for the "Crisis Center" feature, generate a `CrisisCenterHome` component in the `crisis-center` folder.

<code-example language="sh">
  ng generate component crisis-center/crisis-center-home
</code-example>

Update the template with a welcome message to the `Crisis Center`.

<code-example path="router/src/app/crisis-center/crisis-center-home/crisis-center-home.component.html" header="src/app/crisis-center/crisis-center-home/crisis-center-home.component.html"></code-example>

Update the `crisis-center-routing.module.ts` you renamed after copying it from `heroes-routing.module.ts` file.
This time, you define child routes within the parent `crisis-center` route.

<code-example path="router/src/app/crisis-center/crisis-center-routing.module.1.ts" header="src/app/crisis-center/crisis-center-routing.module.ts (Routes)" region="routes"></code-example>

Notice that the parent `crisis-center` route has a `children` property with a single route containing the `CrisisListComponent`.
The `CrisisListComponent` route also has a `children` array with two routes.

These two routes navigate to the crisis center child components,
`CrisisCenterHomeComponent` and `CrisisDetailComponent`, respectively.

There are important differences in the way the router treats child routes.

The router displays the components of these routes in the `RouterOutlet` of the `CrisisCenterComponent`, not in the `RouterOutlet` of the `AppComponent` shell.

The `CrisisListComponent` contains the crisis list and a `RouterOutlet` to display the `Crisis Center Home` and `Crisis Detail` route components.

The `Crisis Detail` route is a child of the `Crisis List`.
The router [reuses components](#reuse) by default, so the `Crisis Detail` component is re-used as you select different crises.
In contrast, back in the `Hero Detail` route, [the component was recreated](#snapshot-the-no-observable-alternative) each time you selected a different hero from the list of heroes.

At the top level, paths that begin with `/` refer to the root of the application.
But child routes extend the path of the parent route.
With each step down the route tree,
you add a slash followed by the route path, unless the path is empty.

Apply that logic to navigation within the crisis center for which the parent path is `/crisis-center`.

* To navigate to the `CrisisCenterHomeComponent`, the full URL is `/crisis-center` (`/crisis-center` + `''` + `''`).

* To navigate to the `CrisisDetailComponent` for a crisis with `id=2`, the full URL is
`/crisis-center/2` (`/crisis-center` + `''` +  `'/2'`).

The absolute URL for the latter example, including the `localhost` origin, is as follows:

<code-example>
  localhost:4200/crisis-center/2

</code-example>

Here's the complete `crisis-center-routing.module.ts` file with its imports.

<code-example path="router/src/app/crisis-center/crisis-center-routing.module.1.ts" header="src/app/crisis-center/crisis-center-routing.module.ts (excerpt)"></code-example>
-->
위기대응센터의 기능이 동작할 화면을 마련하기 위해 `crisis-center`에 `CrisisCenterHome` 컴포넌트를 생성합니다.

<code-example language="none" class="code-shell">
  ng generate component crisis-center/crisis-center-home
</code-example>

그리고 컴포넌트의 템플릿에 환영 메시지를 추가합니다.

<code-example path="router/src/app/crisis-center/crisis-center-home/crisis-center-home.component.html" header="src/app/crisis-center/crisis-center-home/crisis-center-home.component.html"></code-example>

`heroes-routing.module.ts` 파일을 복사해서 만든 `crisis-center-routing.module.ts` 파일을 수정해 봅시다.
지금은 `crisis-center` 라우팅 규칙의 자식 라우팅 규칙을 추가합니다.

<code-example path="router/src/app/crisis-center/crisis-center-routing.module.1.ts" header="src/app/crisis-center/crisis-center-routing.module.ts (라우팅 규칙)" region="routes"></code-example>

이 때 `crisis-center` 주소에 해당하는 라우팅 규칙은 `CrisisListComponent`와 연결되는 `children` 프로퍼티로 구성됩니다.
그리고 `CrisisListComponent` 라우팅 규칙에는 항목이 2개인 `children` 배열이 지정되어 있습니다.

이 라우팅 규칙 2개를 활용하면 위기대응센터의 자식 컴포넌트인 `CrisisCenterHomeComponent`와 `CrisisDetailComponent`를 전환할 수 있습니다.

라우터가 자식 라우팅 규칙을 처리하는 방식은 일반 라우팅 규칙을 처리하는 방식과 조금 다릅니다.

위기대응센터에서 라우터가 화면에 렌더링하는 컴포넌트는 `AppComponent`에 있는 `RouterOutlet`이 아니라 `CrisisCenterComponent`에 있는 `RouterOutlet` 입니다.

그리고 위기 상세정보 화면은 위기 목록의 자식 라우팅 규칙입니다.
기본적으로 라우터는 [컴포넌트를 재사용](#reuse)하기 때문에, 위기 상세정보 컴포넌트는 위기 목록에서 선택하는 항목에 따라 재사용될 것입니다.
하지만 히어로 상세정보 컴포넌트를 생각해보면, 이 컴포넌트는 목록에서 선택한 히어로마다 [계속 다른 컴포넌트 인스턴스를 생성](#snapshot-the-no-observable-alternative)합니다.

라우팅 규칙에서 사용하는 `/`는 애플리케이션 최상위 주소를 가리킵니다.
하지만 자식 라우팅 규칙은 부모 라우팅 규칙을 확장하는 것이기 때문에, 라우팅 규칙 트리를 따라 내려가면서 슬래시(`/`)를 붙이지 않아도 라우팅 규칙 구조에 맞게 최종 주소가 결정됩니다.

그래서 위기대응센터 밖에서 위기대응센터로 이동하는 경로는 `/crisis-center`가 됩니다.

* `CrisisCenterHomeComponent`로 이동하는 전체 URL은 `/crisis-center` (`/crisis-center` + `''` + `''`)입니다.

* `id=2`에 해당하는 위기 항목을 표시하는 `CrisisDetailComponent`로 이동하는 전체 URL은 `/crisis-center/2` (`/crisis-center` + `''` +  `'/2'`)입니다.

그리고 이후 예제에서 다루겠지만, 오리진(origin)이 `localhost`일 때 절대 URL은 이렇습니다:

<code-example>
  localhost:4200/crisis-center/2

</code-example>

여기까지 구현하고 나면 `crisis-center-routing.module.ts` 파일의 내용은 이렇습니다.

<code-example path="router/src/app/crisis-center/crisis-center-routing.module.1.ts" header="src/app/crisis-center/crisis-center-routing.module.ts (일부)"></code-example>


{@a import-crisis-module}

<!--
### Import crisis center module into the `AppModule` routes
-->
### `AppModule` 라우팅 규칙에 위기대응센터 모듈 로드하기

<!--
As with the `HeroesModule`, you must add the `CrisisCenterModule` to the `imports` array of the `AppModule`
_before_ the `AppRoutingModule`:

<code-tabs>

  <code-pane path="router/src/app/crisis-center/crisis-center.module.ts"header="src/app/crisis-center/crisis-center.module.ts">

  </code-pane>

  <code-pane path="router/src/app/app.module.4.ts" header="src/app/app.module.ts (import CrisisCenterModule)" region="crisis-center-module">

  </code-pane>

</code-tabs>

<div class="alert is-helpful">
The import order of the modules is important because the order of the routes defined in the modules affects route matching.
If the `AppModule` were imported first, its wildcard route (`path: '**'`) would take precedence over the routes defined in `CrisisCenterModule`.
For more information, see the section on [route order](guide/router#route-order).
</div>

Remove the initial crisis center route from the `app-routing.module.ts` because now the `HeroesModule` and the `CrisisCenter` modules provide the feature routes.

The `app-routing.module.ts` file retains the top-level application routes such as the default and wildcard routes.

<code-example path="router/src/app/app-routing.module.3.ts" header="src/app/app-routing.module.ts (v3)" region="v3"></code-example>
-->
`HeroesModule`과 마찬가지로 `CrisisCenterModule`도 `AppModule` `imports` 배열에 `AppRoutingModule` _보다 먼저_ 등록해야 합니다:

<code-tabs>

  <code-pane path="router/src/app/crisis-center/crisis-center.module.ts"header="src/app/crisis-center/crisis-center.module.ts">

  </code-pane>

  <code-pane path="router/src/app/app.module.4.ts" header="src/app/app.module.ts (CrisisCenterModule 로드하기)" region="crisis-center-module">

  </code-pane>

</code-tabs>

<div class="alert is-helpful">

모듈에 등록된 라우팅 규칙은 전체 라우팅 매칭에 영향을 주기 때문에 모듈을 로드하는 순서는 중요합니다.
그래서 `AppModule`이 제일 처음 로드되면 와일드카으 라우팅 규칙(`path: '**'`)이 `CrisisCenterModule`에 등록된 라우팅 규칙보다 먼저 등록됩니다.
자세한 내용은 [라우팅 규칙 순서](guide/router#route-order) 문서를 참고하세요.

</div>

`app-routing.module.ts` 파일에 이전에 만들었던 위기대응센터 라우팅 규칙은 제거해도 됩니다.
이제는 `HeroesModule`과 `CrisisCenterModule`이 관련 라우팅 규칙을 관리합니다.

여기까지 작업하면 `app-routing.module.ts` 파일에는 애플리케이션 최상위 라우팅 규칙인 기본 라우팅 규칙과 와일드카드 라우팅 규칙만 존재합니다.

<code-example path="router/src/app/app-routing.module.3.ts" header="src/app/app-routing.module.ts (v3)" region="v3"></code-example>


{@a relative-navigation}

<!--
### Relative navigation
-->
### 상대주소로 이동하기

<!--
While building out the crisis center feature, you navigated to the
crisis detail route using an absolute path that begins with a slash.

The router matches such absolute paths to routes starting from the top of the route configuration.

You could continue to use absolute paths like this to navigate inside the Crisis Center feature, but that pins the links to the parent routing structure.
If you changed the parent `/crisis-center` path, you would have to change the link parameters array.

You can free the links from this dependency by defining paths that are relative to the current URL segment.
Navigation within the feature area remains intact even if you change the parent route path to the feature.

<div class="alert is-helpful">

The router supports directory-like syntax in a _link parameters list_ to help guide route name lookup:

`./` or `no leading slash` is relative to the current level.

`../` to go up one level in the route path.

You can combine relative navigation syntax with an ancestor path.
If you must navigate to a sibling route, you could use the `../<sibling>` convention to go up
one level, then over and down the sibling route path.

</div>

To navigate a relative path with the `Router.navigate` method, you must supply the `ActivatedRoute`
to give the router knowledge of where you are in the current route tree.

After the _link parameters array_, add an object with a `relativeTo` property set to the `ActivatedRoute`.
The router then calculates the target URL based on the active route's location.

<div class="alert is-helpful">

Always specify the complete absolute path when calling router's `navigateByUrl()` method.

</div>
-->
위기대응센터 모듈을 빌드하고 나면 슬래시(`/`)로 시작하는 절대주소를 사용해서 위기 상세정보 화면으로 이동할 수 있습니다.

절대주소가 사용되면 라우터는 라우팅 규칙 환경설정의 최상위 계층부터 주소를 찾기 시작합니다.

물론 절대주소를 사용해도 위기대응센터 안에 있는 화면을 모두 사용할 수 있지만, 이 방식은 모듈 밖에 있는 라우팅 규칙의 전체 구조도 알아야 하기 때문에 불편합니다.
부모 계층에서 `/crisis-center` 라는 주소를 변경하면 이 모듈 안에서 사용하는 링크 인자 배열도 모두 변경해야 합니다.

이런 경우에는 현재 URL 세그먼트의 상대주소로 원하는 주소를 지정할 수 있습니다.
상대주소를 사용하면 모듈 밖에서 화면 주소를 변경하더라도 모듈 안에서 변경할 내용은 없습니다.


<div class="alert is-helpful">

라우터는 _링크 인자 배열_ 을 처리할 때 폴더 구조와 비슷한 문법을 사용합니다:

`./`나 슬래시 없이 시작하는 주소는 현재 라우팅 계층을 기준으로 합니다.

`../`는 현재 라우팅 계층의 한단계 위를 의미합니다.

상대주소를 사용하면 부모 계층에 정의된 라우팅 규칙을 활용할 수도 있습니다.
그리고 같은 계층에서 이웃한 라우팅 규칙으로 이동하려면 한단계 위로 올라가서 이웃 주소를 가리키는 `../<이웃 주소>`라고 사용하면 됩니다.

</div>


`Router.navigate` 메서드에 상대주소를 사용하려면 현재 라우팅 트리를 확인하기 위해 `ActivatedRoute`를 인자로 함께 전달해야 합니다.

_링크 인자 배열_ 뒤에 객체를 추가하고 `relativeTo` 프로퍼티에 `ActivatedRoute`를 지정하면 됩니다.
그러면 라우터는 인자로 전달된 라우팅 규칙을 기준으로 최종 URL을 결정합니다.


<div class="alert is-helpful">

`navigateByUrl()` 메서드를 사용한다면 반드시 절대주소를 사용해야 합니다.

</div>


{@a nav-to-crisis}

<!--
### Navigate to crisis list with a relative URL
-->
### 상대주소로 위기대응센터로 이동하기

<!--
You've already injected the `ActivatedRoute` that you need to compose the relative navigation path.

When using a `RouterLink` to navigate instead of the `Router` service, you'd use the same link parameters array, but you wouldn't provide the object with the `relativeTo` property.
The `ActivatedRoute` is implicit in a `RouterLink` directive.

Update the `gotoCrises()` method of the `CrisisDetailComponent` to navigate back to the Crisis Center list using relative path navigation.

<code-example path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts" header="src/app/crisis-center/crisis-detail/crisis-detail.component.ts (relative navigation)" region="gotoCrises-navigate"></code-example>

Notice that the path goes up a level using the `../` syntax.
If the current crisis `id` is `3`, the resulting path back to the crisis list is  `/crisis-center/;id=3;foo=foo`.
-->
상대주소를 사용하기 위한 `ActivatedRoute`는 이미 의존성으로 주입되고 있습니다.

`Router`를 직접 사용하지 않고 `RouterLink`로 화면을 전환하려면 메서드를 사용할 때와 비슷하게 링크 인자 배열을 사용하면 되지만, 이 경우에는 `relativeTo` 프로퍼티를 사용할 수 없습니다.
`RouterLink` 디렉티브에는 `relativeTo`를 따로 지정하지 않아도 `ActivatedRoute`가 적용됩니다.

이제 `CrisisDetailComponent`에 있는 `gotoCrises()` 메서드가 위기 목록으로 이동할 때 상대주소를 사용하도록 수정해 봅시다.

<code-example path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts" header="src/app/crisis-center/crisis-detail/crisis-detail.component.ts (상대주소로 이동하기)" region="gotoCrises-navigate"></code-example>

이 코드를 보면 `../`가 사용되었기 때문에 먼저 한단계 위 라우팅 계층으로 올라갑니다.
그리고 다음 이어지는 객체에 따라 최종 주소는 `/crisis-center/;id=3;foo=foo`가 됩니다.


{@a named-outlets}

<!--
### Displaying multiple routes in named outlets
-->
### 이름이 지정된 라우팅 영역으로 라우팅 규칙 여러개 표시하기

<!--
You decide to give users a way to contact the crisis center.
When a user clicks a "Contact" button, you want to display a message in a popup view.

The popup should stay open, even when switching between pages in the application, until the user closes it
by sending the message or canceling.
Clearly you can't put the popup in the same outlet as the other pages.

Until now, you've defined a single outlet and you've nested child routes under that outlet to group routes together.
The router only supports one primary unnamed outlet per template.

A template can also have any number of named outlets.
Each named outlet has its own set of routes with their own components.
Multiple outlets can display different content, determined by different routes, all at the same time.

Add an outlet named "popup" in the `AppComponent`, directly following the unnamed outlet.

<code-example path="router/src/app/app.component.4.html" header="src/app/app.component.html (outlets)" region="outlets"></code-example>

That's where a popup goes, once you learn how to route a popup component to it.
-->
이제부터는 사용자가 위기대응센터와 연락할 수 있는 기능을 만들어 봅시다.
사용자가 "Contact" 버튼을 클릭하면 팝업에 메시지를 표시하려고 합니다.

이 팝업은 애플리케이션에서 화면을 전환하더라도 계속 떠있으며, 사용자가 메시지를 보내거나 취소했을 때만 닫힙니다.
그리고 이 팝업에 들어가는 컴포넌트는 일반 화면처럼 사용하지는 않습니다.

지금은 라우팅 영역을 하나 더 정의한 후에 자식 라우팅 규칙에 해당하는 컴포넌트를 이 라우팅 영역에 표시해 봅시다.
이름없이 사용할 수 있는 1차(primary) 라우팅 영역은 템플릿에 하나만 존재할 수 있습니다.

라우팅 영역에 이름을 지정하면 한 템플릿 안에 라우팅 영역을 여러개 추가할 수도 있으며, 개별 라우팅 영역은 라우팅 규칙에 맞는 컴포넌트를 표시합니다.
그리고 개별 라우팅 영역은 서로 다른 라우팅 규칙을 적용받기 때문에 서로 다른 내용을 표시할 수 있으며, 한번에 다른 내용으로 변경할 수도 있습니다.

`AppComponent` 템플릿의 이름없는 라우팅 영역 바로 아래에 "popup"이라는 이름으로 라우팅 영역을 추가합시다.

<code-example path="router/src/app/app.component.4.html" header="src/app/app.component.html (여러 라우팅 영역)" region="outlets"></code-example>

팝업이 표시되는 위치는 새로 추가한 라우팅 영역입니다.

{@a secondary-routes}

<!--
#### Secondary routes
-->
#### 2차 라우팅 규칙

<!--
Named outlets are the targets of  _secondary routes_.

Secondary routes look like primary routes and you configure them the same way.
They differ in a few key respects.

* They are independent of each other.
* They work in combination with other routes.
* They are displayed in named outlets.

Generate a new component to compose the message.

<code-example language="sh">
  ng generate component compose-message
</code-example>

It displays a short form with a header, an input box for the message,
and two buttons, "Send" and "Cancel".

<div class="lightbox">
  <img src='generated/images/guide/router/contact-form.png' alt="Contact textarea with send and cancel buttons">
</div>

Here's the component, its template, and styles:

<code-tabs>

  <code-pane
      header="src/app/compose-message/compose-message.component.html"
      path="router/src/app/compose-message/compose-message.component.html">
  </code-pane>

  <code-pane
      header="src/app/compose-message/compose-message.component.ts"
      path="router/src/app/compose-message/compose-message.component.ts">
  </code-pane>

  <code-pane
      header="src/app/compose-message/compose-message.component.css"
      path="router/src/app/compose-message/compose-message.component.css">
  </code-pane>

</code-tabs>

It looks similar to any other component in this guide, but there are two key differences.

Note that the `send()` method simulates latency by waiting a second before "sending" the message and closing the popup.

The `closePopup()` method closes the popup view by navigating to the popup outlet with a `null` which the section on [clearing secondary routes](#clear-secondary-routes) covers.
-->
이름이 지정된 라우팅 규칙은 _2차 라우팅 규칙(secondary routes)_ 대상이 될 수 있습니다.

2차 라우팅 규칙은 1차(primary) 라우팅 규칙과 비슷해 보이며, 설정하는 방법도 같습니다.
다만 다른 점이 몇가지 있습니다.

* 각 라우팅 규칙은 서로 독립적입니다.
* 다른 라우팅 규칙과 결합해서 사용합니다.
* 이름이 지정된 라우팅 영역에 표시됩니다.

메시지를 보낼 수 있는 컴포넌트를 새로 생성합시다.

<code-example language="none" class="code-shell">
  ng generate component compose-message
</code-example>

이 컴포넌트에는 헤더와 메시지를 입력받는 필드 "Send", "Cancel" 버튼이 존재합니다.

<div class="lightbox">
  <img src='generated/images/guide/router/contact-form.png' alt="Contact textarea with send and cancel buttons">
</div>

컴포넌트를 구성하는 파일의 내용은 이렇습니다:

<code-tabs>

  <code-pane
      header="src/app/compose-message/compose-message.component.html"
      path="router/src/app/compose-message/compose-message.component.html">
  </code-pane>

  <code-pane
      header="src/app/compose-message/compose-message.component.ts"
      path="router/src/app/compose-message/compose-message.component.ts">
  </code-pane>

  <code-pane
      header="src/app/compose-message/compose-message.component.css"
      path="router/src/app/compose-message/compose-message.component.css">
  </code-pane>

</code-tabs>

이 컴포넌트는 다른 컴포넌트들과 거의 비슷하지만 다른 점이 두가지 있습니다.

`send()` 메서드는 메시지를 보낸 것을 시뮬레이션하기 위해 "sending" 문구를 표시하고 1초 있다가 팝업을 닫습니다.

`closePopup()` 메서드는 2차 라우팅 규칙에 해당하는 주소에 `null`을 지정해서 팝업을 닫습니다.
이 내용은 [2차 라우팅 규칙 해제하기](#clear-secondary-routes) 섹션에서 다룹니다.


{@a add-secondary-route}

<!--
#### Add a secondary route
-->
#### 2차 라우팅 규칙 추가하기

<!--
Open the `AppRoutingModule` and add a new `compose` route to the `appRoutes`.

<code-example path="router/src/app/app-routing.module.3.ts" header="src/app/app-routing.module.ts (compose route)" region="compose"></code-example>

In addition to the `path` and `component` properties, there's a new property called `outlet`, which is set to `'popup'`.
This route now targets the popup outlet and the `ComposeMessageComponent` will display there.

To give users a way to open the popup, add a "Contact" link to the `AppComponent` template.

<code-example path="router/src/app/app.component.4.html" header="src/app/app.component.html (contact-link)" region="contact-link"></code-example>

Although the `compose` route is configured to the "popup" outlet, that's not sufficient for connecting the route to a `RouterLink` directive.
You have to specify the named outlet in a _link parameters array_ and bind it to the `RouterLink` with a property binding.

The _link parameters array_ contains an object with a single `outlets` property whose value is another object keyed by one (or more) outlet names.
In this case there is only the "popup" outlet property and its value is another _link parameters array_ that specifies the `compose` route.

In other words, when the user clicks this link, the router displays the component associated with the `compose` route in the `popup` outlet.

<div class="alert is-helpful">

This `outlets` object within an outer object was unnecessary when there was only one route and one unnamed outlet.

The router assumed that your route specification targeted the unnamed primary outlet and created these objects for you.

Routing to a named outlet revealed a router feature:
you can target multiple outlets with multiple routes in the same `RouterLink` directive.

</div>
-->
`AppRoutingModule`를 열고 `appRoutes` 배열에 `compose` 라우팅 규칙을 추가합니다.

<code-example path="router/src/app/app-routing.module.3.ts" header="src/app/app-routing.module.ts (compose 라우팅 규칙)" region="compose"></code-example>

그리고 `path`, `component` 프로퍼티 외에 `outlet` 프로퍼티를 추가하고 이 프로퍼티의 값을 `'popup'`로 지정합니다.
라우팅 규칙을 이렇게 지정하면 `ComposeMessageComponent`이 팝업 라우팅 영역에 표시됩니다.

이제 사용자가 팝업을 열 수 있도록 `AppComponent` 템플릿에 "Contact" 링크를 추가합니다.

<code-example path="router/src/app/app.component.4.html" header="src/app/app.component.html (Contact 링크)" region="contact-link"></code-example>

`compose` 주소에 해당하는 라우팅 규칙은 "popup" 라우팅 영역을 사용하도록 설정했지만, `RouterLink` 디렉티브에도 추가 설정이 필요합니다.
`RouterLink` 디렉티브에 바인딩하는 _링크 인자 배열_ 에 원하는 라우팅 영역 이름을 지정해야 합니다.

지금 작성한 _링크 인자 배열_ 에는 객체가 추가되었고 이 객체에는 `outlets` 프로퍼티 값이 하나지만, 라우팅 영역이 여러개라면 객체 키를 더 추가할 수도 있습니다.
지금은 "popup" 라우팅 영역만 지정했습니다.

이렇게 작성하면 사용자가 링크를 클릭했을 때 라우터가 `compose`에 해당하는 라우팅 규칙을 `popup` 라우팅 영역에 적용합니다.


<div class="alert is-helpful">

라우팅 규칙를 하나만 적용하면서 이름을 지정하지 않은 라우팅 영역이 하나만 있다면 `outlets` 객체는 필요없습니다.

이 경우에는 이름이 지정되지 않은 1차 라우팅 영역을 대상으로 라우터가 동작하며, `outlets` 객체는 라우터가 자동으로 생성합니다.

이 예제를 통해 라우터가 제공하는 기능을 확인할 수 있습니다:
`RouterLink` 디렉티브를 활용하면 라우팅 영역 여러개에 라우팅 규칙 여러개를 동시에 적용할 수 있습니다.

</div>


{@a secondary-route-navigation}

<!--
#### Secondary route navigation: merging routes during navigation
-->
#### 2차 라우팅 규칙 적용하기: 라우팅 규칙 병합하기

<!--
Navigate to the _Crisis Center_ and click "Contact".
you should see something like the following URL in the browser address bar.

<code-example>
  http://.../crisis-center(popup:compose)

</code-example>

The relevant part of the URL follows the `...`:

* The `crisis-center` is the primary navigation.
* Parentheses surround the secondary route.
* The secondary route consists of an outlet name (`popup`), a `colon` separator, and the secondary route path (`compose`).

Click the _Heroes_ link and look at the URL again.

<code-example>
  http://.../heroes(popup:compose)
</code-example>

The primary navigation part changed; the secondary route is the same.

The router is keeping track of two separate branches in a navigation tree and generating a representation of that tree in the URL.

You can add many more outlets and routes, at the top level and in nested levels, creating a navigation tree with many branches and the router will generate the URLs to go with it.

You can tell the router to navigate an entire tree at once by filling out the `outlets` object and then pass that object inside a _link parameters array_  to the `router.navigate` method.
-->
_위기대응센터_ 로 이동해서 "Contact" 링크를 클릭해 봅시다.
그러면 브라우저 주소표시줄에 이런 URL이 표시될 것입니다.

<code-example>
  http://.../crisis-center(popup:compose)

</code-example>

`...` 뒤에 붙는 URL은 이런 의미입니다:

* `crisis-center`는 1차 네비게이션 경로입니다.
* 1차 라우팅 규칙은 소괄호(`()`) 안에 들어갑니다.
* 2차 라우팅 규칙은 라우팅 영역의 이름(`popup`)과 구분자(`:`), 2차 라우팅 규칙의 경로(`compose`)로 구성됩니다.

히어로 목록으로 이동하는 링크를 클릭하고 브라우저 주소표시줄을 다시 봅시다.

<code-example>
  http://.../heroes(popup:compose)
</code-example>

1차 라우팅 규칙의 주소는 변경되었지만 2차 라우팅 규칙의 주소는 변경되지 않았습니다.

라우팅 규칙이 동시에 여러개 사용되면 라우터는 각 라우팅 규칙을 별개로 관리합니다.

라우팅 영역과 라우팅 규칙은 최상위 계층부터 계층 구조로 얼마든지 자유롭게 구성할 수 있으며, 네비게이션 트리도 이 구조에 맞게 브랜치를 구성된 후에 최종 URL을 생성합니다.

그래서 `outlets` 객체를 사용하면서 전체 네비게이션 트리 중 어떤 경로로 이동할 지 한번에 지정할 수 있습니다.
이 객체는 `router.navigate` 메서드에 전달하는 _링크 인자 배열_ 안에 객체 형태로 전달합니다.


{@a clear-secondary-routes}

<!--
#### Clearing secondary routes
-->
#### 2차 라우팅 규칙 해제하기

<!--
Like regular outlets, secondary outlets persists until you navigate away to a new component.

Each secondary outlet has its own navigation, independent of the navigation driving the primary outlet.
Changing a current route that displays in the primary outlet has no effect on the popup outlet.
That's why the popup stays visible as you navigate among the crises and heroes.

The `closePopup()` method again:

<code-example path="router/src/app/compose-message/compose-message.component.ts" header="src/app/compose-message/compose-message.component.ts (closePopup)" region="closePopup"></code-example>

Clicking the "send" or "cancel" buttons clears the popup view.
The `closePopup()` function navigates imperatively with the `Router.navigate()` method, passing in a [link parameters array](#link-parameters-array).

Like the array bound to the _Contact_ `RouterLink` in the `AppComponent`, this one includes an object with an `outlets` property.
The `outlets` property value is another object with outlet names for keys.
The only named outlet is `'popup'`.

This time, the value of `'popup'` is `null`.
That's not a route, but it is a legitimate value.
Setting the popup `RouterOutlet` to `null` clears the outlet and removes the secondary popup route from the current URL.
-->
보통 라우팅 영역과 비슷하게, 2차 라우팅 영역도 컴포넌트 밖으로 이동할 때까지 유지됩니다.

2차 라우팅 영역은 네비게이션을 직접 관리하며, 이 네비게이션 동작은 1차 라우팅 영역과는 별개로 동작합니다.
그래서 1차 라우팅 영역에 적용되는 라우팅 규칙이 변경되어도 팝업이 표시되는 라우팅 영역은 영향을 받지 않습니다.
위기대응센터 모듈과 히어로 모듈을 전환하더라도 팝업이 계속 표시되는 것은 이때문입니다.

`closePopup()` 메서드를 다시 봅시다:

<code-example path="router/src/app/compose-message/compose-message.component.ts" header="src/app/compose-message/compose-message.component.ts (closePopup())" region="closePopup"></code-example>

"send" 버튼이나 "cancel" 버튼을 클릭하면 팝업 화면을 비웁니다.
`closePopup()` 함수는 [링크 인자 배열](#link-parameters-array)을 `Router.navigate()` 메서드에 인자로 전달해서 이 동작을 처리합니다.

`AppComponent`에 있는 _Contact_ `RouterLink`에 바인딩된 배열과 비슷하게, 이 링크 인자 배열에도 `outlets` 프로퍼티가 존재하는 객체가 사용되었습니다.
`outlets` 프로퍼티의 값은 라우팅 영역을 키로 하는 객체로 구성됩니다.
이 예제에서는 `'popup'` 이라는 라우팅 영역만 사용되었습니다.

그런데 `closePopup()` 함수에 사용된 `'popoup'` 라우팅 영역의 값은 `null`입니다.
이 값이 라우팅 규칙과 매칭되지는 않지만, 사용할 수 있는 값은 맞습니다.
팝업이 표시되는 `RouterOutlet`에 `null` 값을 지정하면 라우터가 라우팅 영역의 내용을 비우며, 현재 URL에서 2차 라우팅 규칙에 해당하는 부분도 제거합니다.


{@a guards}

{@a milestone-5-route-guards}


<!--
## Milestone 5: Route guards
-->
## 마일스톤 5: 라우팅 가드

<!--
At the moment, any user can navigate anywhere in the application any time, but sometimes you need to control access to different parts of your application for various reasons, some of which might include the following:

* Perhaps the user is not authorized to navigate to the target component.
* Maybe the user must login (authenticate) first.
* Maybe you should fetch some data before you display the target component.
* You might want to save pending changes before leaving a component.
* You might ask the user if it's OK to discard pending changes rather than save them.

You add guards to the route configuration to handle these scenarios.

A guard's return value controls the router's behavior:

* If it returns `true`, the navigation process continues.
* If it returns `false`, the navigation process stops and the user stays put.
* If it returns a `UrlTree`, the current navigation cancels and a new navigation is initiated to the `UrlTree` returned.

<div class="alert is-helpful">

**Note:** The guard can also tell the router to navigate elsewhere, effectively canceling the current navigation.
When doing so inside a guard, the guard should return `false`;

</div>

The guard might return its boolean answer synchronously.
But in many cases, the guard can't produce an answer synchronously.
The guard could ask the user a question, save changes to the server, or fetch fresh data.
These are all asynchronous operations.

Accordingly, a routing guard can return an `Observable<boolean>` or a `Promise<boolean>` and the
router will wait for the observable to resolve to `true` or `false`.

<div class="alert is-critical">

**Note:** The observable provided to the `Router` must also complete. If the observable does not complete, the navigation does not continue.

</div>

The router supports multiple guard interfaces:

* [`CanActivate`](api/router/CanActivate) to mediate navigation *to* a route.

* [`CanActivateChild`](api/router/CanActivateChild) to mediate navigation *to* a child route.

* [`CanDeactivate`](api/router/CanDeactivate) to mediate navigation *away* from the current route.

* [`Resolve`](api/router/Resolve) to perform route data retrieval *before* route activation.

* [`CanLoad`](api/router/CanLoad) to mediate navigation *to* a feature module loaded _asynchronously_.


You can have multiple guards at every level of a routing hierarchy.
The router checks the `CanDeactivate` guards first, from the deepest child route to the top.
Then it checks the `CanActivate` and `CanActivateChild` guards from the top down to the deepest child route.
If the feature module is loaded asynchronously, the `CanLoad` guard is checked before the module is loaded.
If _any_ guard returns false, pending guards that have not completed are canceled, and the entire navigation is canceled.

There are several examples over the next few sections.
-->
지금까지 작성한 앱에서는 사용자가 애플리케이션이 제공하는 화면을 어디든 자유롭게 이동할 수 있지만, 때로는 이 과정을 제어해야 하는 경우도 있습니다.
이런 경우가 그렇습니다:

* 로그인하지 않은 사용자가 어떤 컴포넌트로 이동하려는 경우
* 로그인 한 사용자가 권한이 있는지 확인해야 하는 경우
* 컴포넌트를 표시하기 전에 데이터를 먼저 불러와야 하는 경우
* 컴포넌트를 벗어나기 전에 변경한 내용을 저장해야 하는 경우
* 저장하지 않는다면 변경한 내용을 폐기할지 사용자에게 확인을 받아야 하는 경우

이런 경우는 라우팅 규칙 환경설정에 가드를 추가해서 처리할 수 있습니다.

라우터는 가드가 반환하는 값에 따라 이런 동작을 합니다:

* 가드가 `true`를 반환하면 화면 이동을 계속 진행합니다.
* 가드가 `false`를 반환하면 화면 이동을 멈춥니다.
* 가드가 `UrlTree`를 반환하면 화면 이동을 취소하고 `UrlTree`에 해당하는 주소로 이동합니다.


<div class="alert is-helpful">

**참고**: 라우터 가드가 다른 곳으로 이동하도록 지정하면 현재 진행되는 네비게이션 동작은 취소됩니다.
라우터 가드 안에서 이 동작을 직접 처리한다면 가드가 반환하는 값이 `false`여야 합니다.

</div>

라우터 가드는 불리언 결과값을 동기 방식으로 반환할 수 있습니다.
하지만 대부분의 경우에 라우터 가드는 결과값을 동기 방식으로 반환할 수 없습니다.
라우터 가드는 사용자에게 물어보거나, 변경된 내용을 저장하기 위해 서버와 통신해야 하고, 데이터를 받아오기도 해야 합니다.
이 동작은 모두 비동기로 이루어집니다.

그래서 라우팅 가드는 결과값으로 `Observable<boolean>`이나 `Promise<boolean>`을 반환할 수 있으며, 이 옵저버블이나 프라미스가 결과값을 보내기 전까지 라우터가 동작을 멈춥니다.


<div class="alert is-critical">

**참고:** 라우터 가드에 옵저버블이 사용되면 이 옵저버블은 반드시 종료되어야 합니다.
옵저버블이 종료되지 않으면 네비게이션 동작도 멈춘 상태로 유지됩니다.

</div>


라우터가 제공하는 가드 인터페이스는 이런 것들이 있습니다:

* [`CanActivate`](api/router/CanActivate): *앞으로 적용될* 라우팅 규칙에 개입합니다.
* [`CanActivateChild`](api/router/CanActivateChild): *앞으로 적용될* 자식 라우팅 규칙에 개입합니다.
* [`CanDeactivate`](api/router/CanDeactivate): 현재 적용된 라우팅 규칙을 *벗어날 때* 개입합니다.
* [`Resolve`](api/router/Resolve): *앞으로 적용될* 라우팅 규칙에 필요한 데이터를 먼저 처리할 때 사용합니다.
* [`CanLoad`](api/router/CanLoad): _비동기로_ 로드되는 기능 모듈로 *이동할 때* 개입합니다.


라우팅 가드는 라우팅 규칙 계층 구조 어디에라도 자유롭게 여러개씩도 적용할 수 있습니다.
라우터는 가장 안쪽에 있는 자식 라우팅 규칙부터 위쪽 계층으로 향하면서 `CanDeactivated` 가드가 먼저 실행됩니다.
그리고 최상위 계층부터 자식 라우팅 규칙으로 향하면서 `CanActivate`, `CanActivateChild` 가드가 실행됩니다.
이 때 기능 모듈이 비동기로 로드된다면 이 모듈을 로드하기 전에 `CanLoad` 가드가 실행됩니다.
이 과정 중에 `false`를 반환하는 가드가 있으면 아직 실행되지 않은 가드 실행은 모두 취소되며 네비게이션 동작도 취소됩니다.

다음 섹션에서는 예제를 보면서 자세하게 알아봅시다.


{@a can-activate-guard}

<!--
### `CanActivate`: requiring authentication
-->
### `CanActivate`: 인증을 확인할 때

<!--
Applications often restrict access to a feature area based on who the user is.
You could permit access only to authenticated users or to users with a specific role.
You might block or limit access until the user's account is activated.

The `CanActivate` guard is the tool to manage these navigation business rules.
-->
사용자에 따라 애플리케이션 일부 영역에 접근하는 것을 제한해야 하는 경우가 있습니다.
로그인 한 사용자나 해당 영역과 관련된 사용자만 접근을 허락하는 경우가 그렇습니다.
이런 사용자가 아니라면 접근을 제한할 수도 있습니다.

`CanActivate` 가드는 이런 경우에 사용합니다.


<!--
#### Add an admin feature module
-->
#### 관리자 기능 모듈 추가하기

<!--
This section guides you through extending the crisis center with some new administrative features.
Start by adding a new feature module named `AdminModule`.

Generate an `admin` folder with a feature module file and a routing configuration file.

<code-example language="sh">
  ng generate module admin --routing
</code-example>

Next, generate the supporting components.

<code-example language="sh">
  ng generate component admin/admin-dashboard
</code-example>

<code-example language="sh">
  ng generate component admin/admin
</code-example>

<code-example language="sh">
  ng generate component admin/manage-crises
</code-example>

<code-example language="sh">
  ng generate component admin/manage-heroes
</code-example>

The admin feature file structure looks like this:
-->
이번 섹션에서는 위기대응센터 기능을 확장해서 관리자용 기능 모듈을 만들어 봅시다.
먼저 `AdminModule`이라는 이름으로 기능 모듈을 생성합니다.

`admin` 폴더에 기능 모듈 파일과 라우팅 환경설정 파일을 생성합니다.

<code-example language="none" class="code-shell">
  ng generate module admin --routing
</code-example>

그리고 컴포넌트를 몇개 생성합니다.

<code-example language="none" class="code-shell">
  ng generate component admin/admin-dashboard
</code-example>

<code-example language="none" class="code-shell">
  ng generate component admin/admin
</code-example>

<code-example language="none" class="code-shell">
  ng generate component admin/manage-crises
</code-example>

<code-example language="none" class="code-shell">
  ng generate component admin/manage-heroes
</code-example>

그러면 관리자 모듈이 이렇게 구성됩니다:


<div class='filetree'>

  <div class='file'>
    src/app/admin
  </div>

  <div class='children'>

    <div class='file'>
      admin
    </div>

      <div class='children'>

        <div class='file'>
          admin.component.css
        </div>

        <div class='file'>
          admin.component.html
        </div>

        <div class='file'>
          admin.component.ts
        </div>

      </div>

    <div class='file'>
      admin-dashboard
    </div>

      <div class='children'>

        <div class='file'>
          admin-dashboard.component.css
        </div>

        <div class='file'>
          admin-dashboard.component.html
        </div>

        <div class='file'>
          admin-dashboard.component.ts
        </div>

      </div>

    <div class='file'>
      manage-crises
    </div>

      <div class='children'>

        <div class='file'>
          manage-crises.component.css
        </div>

        <div class='file'>
          manage-crises.component.html
        </div>

        <div class='file'>
          manage-crises.component.ts
        </div>

      </div>

    <div class='file'>
      manage-heroes
    </div>

      <div class='children'>

        <div class='file'>
          manage-heroes.component.css
        </div>

        <div class='file'>
          manage-heroes.component.html
        </div>

        <div class='file'>
          manage-heroes.component.ts
        </div>

      </div>

    <div class='file'>
      admin.module.ts
    </div>

    <div class='file'>
      admin-routing.module.ts
    </div>

  </div>

</div>

<!--
The admin feature module contains the `AdminComponent` used for routing within the
feature module, a dashboard route and two unfinished components to manage crises and heroes.

<code-tabs>

  <code-pane header="src/app/admin/admin/admin.component.html"  path="router/src/app/admin/admin/admin.component.html">

  </code-pane>

  <code-pane header="src/app/admin/admin-dashboard/admin-dashboard.component.html" path="router/src/app/admin/admin-dashboard/admin-dashboard.component.1.html">

  </code-pane>

  <code-pane header="src/app/admin/admin.module.ts" path="router/src/app/admin/admin.module.ts">

  </code-pane>

  <code-pane header="src/app/admin/manage-crises/manage-crises.component.html" path="router/src/app/admin/manage-crises/manage-crises.component.html">

  </code-pane>

  <code-pane header="src/app/admin/manage-heroes/manage-heroes.component.html"  path="router/src/app/admin/manage-heroes/manage-heroes.component.html">

  </code-pane>

</code-tabs>

<div class="alert is-helpful">

Although the admin dashboard `RouterLink` only contains a relative slash without an additional URL segment, it is a match to any route within the admin feature area.
You only want the `Dashboard` link to be active when the user visits that route.
Adding an additional binding to the `Dashboard` routerLink,`[routerLinkActiveOptions]="{ exact: true }"`, marks the `./` link as active when the user navigates to the `/admin` URL and not when navigating to any of the child routes.

</div>
-->
관리자 기능 모듈에서 라우팅은 `AdminComponent`가 담당하며, 이 컴포넌트에는 위기 목록과 히어로 목록을 관리하는 컴포넌트가 표시됩니다.

<code-tabs>

  <code-pane header="src/app/admin/admin/admin.component.html"  path="router/src/app/admin/admin/admin.component.html">

  </code-pane>

  <code-pane header="src/app/admin/admin-dashboard/admin-dashboard.component.html" path="router/src/app/admin/admin-dashboard/admin-dashboard.component.1.html">

  </code-pane>

  <code-pane header="src/app/admin/admin.module.ts" path="router/src/app/admin/admin.module.ts">

  </code-pane>

  <code-pane header="src/app/admin/manage-crises/manage-crises.component.html" path="router/src/app/admin/manage-crises/manage-crises.component.html">

  </code-pane>

  <code-pane header="src/app/admin/manage-heroes/manage-heroes.component.html"  path="router/src/app/admin/manage-heroes/manage-heroes.component.html">

  </code-pane>

</code-tabs>


<div class="alert is-helpful">

관리자 대시보드로 이동하는 `RouterLink`에는 주소가 `./` 라고만 사용되었는데, 이 주소는 관리자 기능 모듈에 있는 모든 주소와 매칭됩니다.
하지만 대시보드 링크는 현재 주소가 정확히 `./`과 매칭될 때만 하이라이트 되는 것을 의도했기 때문에 `RouterLink` 디렉티브에 `[routerLinkActiveOptions]="{ exact: true }"` 바인딩을 추가했습니다.
이렇게 구현하면 사용자가 `/admin` 주소로 접근했을 때만 대시보드 링크가 하이라이트 처리되며, 관리자 모듈 안에 있는 자식 라우팅 규칙에 접근했을 때는 대시보드 링크가 하이라이트되지 않습니다.

</div>


{@a component-less-route}

<!--
##### Component-less route: grouping routes without a component
-->
##### 컴포넌트가 없는 라우팅 규칙: 라우팅 규칙을 그룹으로 묶기

<!--
The initial admin routing configuration:

<code-example path="router/src/app/admin/admin-routing.module.1.ts" header="src/app/admin/admin-routing.module.ts (admin routing)" region="admin-routes"></code-example>

The child route under the `AdminComponent` has a `path` and a `children` property but it's not using a `component`.
This defines a _component-less_ route.

To group the `Crisis Center` management routes under the `admin` path a component is unnecessary.
Additionally, a _component-less_ route makes it easier to [guard child routes](#can-activate-child-guard).

Next, import the `AdminModule` into `app.module.ts` and add it to the `imports` array
to register the admin routes.

<code-example path="router/src/app/app.module.4.ts" header="src/app/app.module.ts (admin module)" region="admin-module"></code-example>

Add an "Admin" link to the `AppComponent` shell so that users can get to this feature.

<code-example path="router/src/app/app.component.5.html" header="src/app/app.component.html (template)"></code-example>
-->
관리자 모듈의 초기 라우팅 환경설정은 이렇습니다:

<code-example path="router/src/app/admin/admin-routing.module.1.ts" header="src/app/admin/admin-routing.module.ts (관리자 모듈 라우팅 설정)" region="admin-routes"></code-example>

`AdminComponent` 안쪽에 있는 자식 라우팅 규칙은 `path` 프로퍼티와 `children` 프로퍼티가 있지만 `component` 프로퍼티는 없습니다.
이런 라우팅 규칙을 _컴포넌트가 없는(component-less)_ 라우팅 규칙이라고 합니다.

위기대응센터를 관리하는 라우팅 규칙을 `admin` 경로 안으로 넣을 때 컴포넌트가 추가로 필요하지는 않습니다.
_컴포넌트가 없는_ 라우팅 규칙은 [자식 라우팅 규칙에 적용하는 가드](#can-activate-child-guard)를 좀 더 편하게 사용하기 위한 것입니다.

이제 `app.module.ts` 파일에 `AdminModule`을 로드하고 관리자 라우팅 모듈을 `imports` 배열에 추가합니다.

<code-example path="router/src/app/app.module.4.ts" header="src/app/app.module.ts (관리자 모듈 추가하기)" region="admin-module"></code-example>

그리고 사용자가 관리자 모듈로 이동할 수 있도록 `AppComponent` 템플릿에 "Admin" 링크를 추가합니다.

<code-example path="router/src/app/app.component.5.html" header="src/app/app.component.html (템플릿)"></code-example>


{@a guard-admin-feature}

<!--
#### Guard the admin feature
-->
#### 관리자 모듈 사용 제한하기

<!--
Currently, every route within the Crisis Center is open to everyone.
The new admin feature should be accessible only to authenticated users.

Write a `canActivate()` guard method to redirect anonymous users to the
login page when they try to enter the admin area.

Generate an `AuthGuard` in the `auth` folder.

<code-example language="sh">
  ng generate guard auth/auth
</code-example>

To demonstrate the fundamentals, this example only logs to the console, `returns` true immediately, and lets navigation proceed:

<code-example path="router/src/app/auth/auth.guard.1.ts" header="src/app/auth/auth.guard.ts (excerpt)"></code-example>

Next, open `admin-routing.module.ts `, import the `AuthGuard` class, and
update the admin route with a `canActivate` guard property that references it:

<code-example path="router/src/app/admin/admin-routing.module.2.ts" header="src/app/admin/admin-routing.module.ts (guarded admin route)" region="admin-route"></code-example>

The admin feature is now protected by the guard, but the guard requires more customization to work fully.
-->
아직까지는 모든 사용자가 위기대응센터로 이동하는 라우팅 규칙을 사용할 수 있습니다.
새로 만든 관리자 기능에는 일부 사용자만 접근할 수 있도록 만들어 봅시다.

먼저 로그인하지 않은 사용자가 관리자 모듈로 접근하면 로그인 화면으로 리다이렉션하는 `canActivate()` 가드 메서드를 구현해 봅시다.

다음 명령을 실행해서 `auth` 폴더에 `AuthGuard`를 생성합니다.

<code-example language="none" class="code-shell">
  ng generate guard auth/auth
</code-example>

이 문서에서는 가드가 동작하는 개념을 설명하기 위해 콘솔에 로그를 하나 출력하고 `true`를 즉시 반환합니다.
라우팅 가드가 `true`를 반환했기 때문에 네비게이션 동작은 그대로 진행됩니다:

<code-example path="router/src/app/auth/auth.guard.1.ts" header="src/app/auth/auth.guard.ts (일부)"></code-example>

그 다음에는 `admin-routing.module.ts` 파일을 열고 `AuthGuard` 클래스를 로드한 후에 `admin`에 해당하는 라우팅 규칙에 `canActivate` 가드 프로퍼티를 다음과 같이 연결합니다:

<code-example path="router/src/app/admin/admin-routing.module.2.ts" header="src/app/admin/admin-routing.module.ts (관리자용 라우팅 규칙 제한하기)" region="admin-route"></code-example>

이제 관리자 모듈은 라우팅 가드로 보호됩니다.
하지만 이 가드가 제대로 동작하려면 작업을 좀 더 해야 합니다.


{@a teach-auth}

<!--
#### Authenticate with `AuthGuard`
-->
#### `AuthGuard`에 인증기능 넣기

<!--
Make the `AuthGuard` mimic authentication.

The `AuthGuard` should call an application service that can login a user and retain information about the current user. Generate a new `AuthService` in the `auth` folder:

<code-example language="sh">
  ng generate service auth/auth
</code-example>

Update the `AuthService` to log in the user:

<code-example path="router/src/app/auth/auth.service.ts" header="src/app/auth/auth.service.ts (excerpt)"></code-example>

Although it doesn't actually log in, it has an `isLoggedIn` flag to tell you whether the user is authenticated.
Its `login()` method simulates an API call to an external service by returning an observable that resolves successfully after a short pause.
The `redirectUrl` property stores the URL that the user wanted to access so you can navigate to it after authentication.

<div class="alert is-helpful">

To keep things minimal, this example redirects unauthenticated users to `/admin`.

</div>

Revise the `AuthGuard` to call the `AuthService`.

<code-example path="router/src/app/auth/auth.guard.2.ts" header="src/app/auth/auth.guard.ts (v2)"></code-example>

Notice that you inject the `AuthService` and the `Router` in the constructor.
You haven't provided the `AuthService` yet but it's good to know that you can inject helpful services into routing guards.

This guard returns a synchronous boolean result.
If the user is logged in, it returns true and the navigation continues.

The `ActivatedRouteSnapshot` contains the _future_ route that will be activated and the `RouterStateSnapshot` contains the _future_ `RouterState` of the application, should you pass through the guard check.

If the user is not logged in, you store the attempted URL the user came from using the `RouterStateSnapshot.url` and tell the router to redirect to a login page&mdash;a page you haven't created yet.
Returning a `UrlTree` tells the `Router` to cancel the current navigation and schedule a new one to redirect the user.
-->
`AuthGuard`에 인증 기능을 임시로 구현해 봅시다.

`AuthGuard`는 애플리케이션 서비스를 활용해서 사용자를 로그인시키고 로그인 한 사용자의 정보를 받아옵니다.
다음 명령을 실행해서 `auth` 폴더에 `AuthService`를 생성합니다:

<code-example language="none" class="code-shell">
  ng generate service auth/auth
</code-example>

그리고 `AuthService`에 로그인 기능을 추가합니다:

<code-example path="router/src/app/auth/auth.service.ts" header="src/app/auth/auth.service.ts (일부)"></code-example>

이 코드가 실제로 로그인을 하는 것은 아니기 때문에 사용자가 로그인했는지는 `isLoggedIn` 플래그로 판단합니다.
그리고 `login()` 메서드는 API가 실행된 것을 흉내내기 위해 옵저버블을 사용해서 약간 시연을 지연한 후에 결과를 반환합니다.
`redirectUrl` 프로퍼티는 사용자가 로그인한 후에 이동할 URL을 잠시 보관하는 프로퍼티입니다.


<div class="alert is-helpful">

코드를 간단하게 작성하기 위해 이 예제에서는 로그인한 사용자를 `/admin`으로 리다이렉션합니다.

</div>


`AuthGuard`가 `AuthService`를 사용하도록 수정해 봅시다.

<code-example path="router/src/app/auth/auth.guard.2.ts" header="src/app/auth/auth.guard.ts (v2)"></code-example>

`AuthGuard`에는 `AuthService`와 `Router`가 의존성 객체로 주입됩니다.
라우팅 가드에 필요하다면 다른 서비스도 의존성으로 주입해서 활용할 수 있습니다.

이 라우팅 가드는 불리언 결과값을 즉시 반환합니다.
사용자가 로그인한 상태라면 `true`를 반환하고 네비게이션 동작도 계속 진행될 것입니다.

`ActivatedRouteSnapshot`에서는 _앞으로 적용될_ 라우팅 규칙에 대한 정보를 참조할 수 있으며, `RouterStateSnapshot`에서는 _앞으로 적용될_ 애플리케이션의 `RouterState` 정보를 참조할 수 있기 때문에, 라우팅 가드 로직에 필요하다면 이 객체들을 활용하는 것도 좋습니다.

그리고 사용자가 로그인하지 않은 상태라면 이동하려는 주소를 `AuthService.redirectUrl` 프로퍼티에 저장한 후에 로그인 페이지로 리다이렉션합니다&mdash;이 화면은 아직 만들지 않았습니다.
라우팅 가드가 `UrlTree`를 반환하면 라우터는 현재 진행되고 있는 네비게이션 동작을 취소하고 반환하는 `UrlTree`로 사용자를 리다이렉션합니다.


{@a add-login-component}

<!--
#### Add the `LoginComponent`
-->
#### `LoginComponent` 추가하기

<!--
You need a `LoginComponent` for the user to log in to the application. After logging in, you'll redirect to the stored URL if available, or use the default URL.
There is nothing new about this component or the way you use it in the router configuration.

<code-example language="sh">
  ng generate component auth/login
</code-example>

Register a `/login` route in the `auth/auth-routing.module.ts`.
In `app.module.ts`, import and add the `AuthModule` to the `AppModule` imports.


<code-tabs>

  <code-pane header="src/app/app.module.ts" path="router/src/app/app.module.ts" region="auth">

  </code-pane>

  <code-pane header="src/app/auth/login/login.component.html" path="router/src/app/auth/login/login.component.html">

  </code-pane>

  <code-pane header="src/app/auth/login/login.component.ts" path="router/src/app/auth/login/login.component.1.ts">

  </code-pane>

  <code-pane header="src/app/auth/auth.module.ts" path="router/src/app/auth/auth.module.ts">

  </code-pane>

</code-tabs>
-->
사용자가 로그인하려면 `LoginComponent`가 필요합니다.
이 컴포넌트는 사용자가 로그인한 후에 저장된 URL로 이동하거나 기본 주소로 리다이렉션하면 됩니다.
컴포넌트를 새로 만들고 라우터 환경설정에 추가하는 방법은 이전과 같습니다.

<code-example language="sh">
  ng generate component auth/login
</code-example>


`/login` 라우팅 규칙은 `auth/auth-routing.module.ts`에 등록합니다.
그리고 `app.module.ts` 파일에 `AuthModule`을 로드하면 됩니다.

<code-tabs>

  <code-pane header="src/app/app.module.ts" path="router/src/app/app.module.ts" region="auth">

  </code-pane>

  <code-pane header="src/app/auth/login/login.component.html" path="router/src/app/auth/login/login.component.html">

  </code-pane>

  <code-pane header="src/app/auth/login/login.component.ts" path="router/src/app/auth/login/login.component.1.ts">

  </code-pane>

  <code-pane header="src/app/auth/auth.module.ts" path="router/src/app/auth/auth.module.ts">

  </code-pane>

</code-tabs>


{@a can-activate-child-guard}

<!--
### `CanActivateChild`: guarding child routes
-->
### `CanActivateChild`: 자식 라우팅 규칙 제한하기

<!--
You can also protect child routes with the `CanActivateChild` guard.
The `CanActivateChild` guard is similar to the `CanActivate` guard.
The key difference is that it runs before any child route is activated.

You protected the admin feature module from unauthorized access.
You should also protect child routes _within_ the feature module.

Extend the `AuthGuard` to protect when navigating between the `admin` routes.
Open `auth.guard.ts` and add the `CanActivateChild` interface to the imported tokens from the router package.

Next, implement the `canActivateChild()` method which takes the same arguments as the `canActivate()` method: an `ActivatedRouteSnapshot` and `RouterStateSnapshot`.
The `canActivateChild()` method can return an `Observable<boolean|UrlTree>` or `Promise<boolean|UrlTree>` for async checks and a `boolean` or `UrlTree` for sync checks.
This one returns either `true` to let the user access the admin feature module or `UrlTree` to redirect the user to the login page instead:

<code-example path="router/src/app/auth/auth.guard.3.ts" header="src/app/auth/auth.guard.ts (excerpt)" region="can-activate-child"></code-example>

Add the same `AuthGuard` to the `component-less` admin route to protect all other child routes at one time
instead of adding the `AuthGuard` to each route individually.

<code-example path="router/src/app/admin/admin-routing.module.3.ts" header="src/app/admin/admin-routing.module.ts (excerpt)" region="can-activate-child"></code-example>
-->
자식 라우팅 규칙은 `CanActivateChild` 가드로 보호할 수 있습니다.
`CanActivateChild` 가드는 `CanActivate` 가드와 비슷합니다.
라우팅 규칙이 아니라 자식 라우팅 규칙이 활성화되기 실행된다는 점만 다릅니다.

관리자 모듈은 이제 로그인하지 않은 사용자가 접근할 수 없도록 보호처리 되었습니다.
기능 모듈 사용을 이렇게 제한하면 _그 안에 있는_ 자식 라우팅 규칙도 함께 제한해야 합니다.

`AuthGuard`를 수정해서 `admin` 라우팅 규칙 안에서 발생하는 네비게이션을 제한해 봅시다.
`auth.guard.ts` 파일을 열고 `CanActivatedChild` 인터페이스를 불러옵니다.

그 다음에는 `canActivate()` 메서드와 같은 인자 형식으로 `canActivateChild()` 메서드를 선언합니다.
인자는 `ActivatedRouteSnapshot`과 `RouterStateSnapshot` 입니다.
`canActivateChild()` 메서드도 `Observable<boolean|UrlTree>`나 `Promise<boolean|UrlTree>`를 비동기로 반환할 수 있으며, `boolean` 타임이나 `UrlTree` 객체를 동기 방식으로 반환할 수도 있습니다.
어떤 방식이던지 `true`를 반환하면 진행 중인 네비게이션 동작을 계속 진행하며, `UrlTree`를 반환하면 로그인 페이지로 이동합니다:

<code-example path="router/src/app/auth/auth.guard.3.ts" header="src/app/auth/auth.guard.ts (일부)" region="can-activate-child"></code-example>

이제 `AuthGuard`는 개별 라우팅 규칙에 지정하지 않고 그 상위 계층에 추가해도 자식 라우팅 규칙을 모두 보호할 수 있습니다.

<code-example path="router/src/app/admin/admin-routing.module.3.ts" header="src/app/admin/admin-routing.module.ts (일부)" region="can-activate-child"></code-example>


{@a can-deactivate-guard}

<!--
### `CanDeactivate`: handling unsaved changes
-->
### `CanDeactivate`: 저장하지 않은 변경사항을 처리할 때

<!--
Back in the "Heroes" workflow, the application accepts every change to a hero immediately without validation.

In the real world, you might have to accumulate the users changes, validate across fields, validate on the server, or hold changes in a pending state until the user confirms them as a group or cancels and reverts all changes.

When the user navigates away, you can let the user decide what to do with unsaved changes.
If the user cancels, you'll stay put and allow more changes.
If the user approves, the application can save.

You still might delay navigation until the save succeeds.
If you let the user move to the next screen immediately and saving were to fail (perhaps the data is ruled invalid), you would lose the context of the error.

You need to stop the navigation while you wait, asynchronously, for the server to return with its answer.

The `CanDeactivate` guard helps you decide what to do with unsaved changes and how to proceed.
-->
히어로 목록으로 돌아가는 과정을 보면 예재 앱에서 히어로의 정보를 수정하면 이 내용이 즉시 반영됩니다.

하지만 실제로 운영되는 앱이라면 사용자가 변경한 내용은 한번에 모았다가 각 필드값의 유효성을 검사해야 하고, 서버에서도 검사해야 합니다.
아니면 사용자가 데이터를 한 번에 처리할 것인지, 한번에 취소할 것인지, 실행한 내용을 되돌릴지 결정할때까지 변경사항을 임시로 들고있어야 할 수도 있습니다.

그래서 사용자가 현재 화면을 벗어난다면, 저장하지 않은 변경사항을 어떻게 처리할지 사용자에게 물어볼 수 있습니다.
이 때 사용자가 결정하는 것에 따라 화면을 벗어나지 않고 수정을 계속하거나, 저장하고 넘어갈 수도 있습니다.

그리고 변경사항을 저장하는 경우에는 저장이 끝날때까지 화면 전환 동작을 잠시 멈춰야 할 수도 있습니다.
저장이 되었는지 확인하지 않고 바로 다음 화면으로 넘어가면 데이터에 문제가 있어서 저장이 실패하더라도 이 에러를 처리하기 어렵습니다.

그래서 화면을 전환하기 전에 잠시 기다렸다가, 서버가 응답을 보냈을 때 비동기로 화면을 전환하는 방식이 더 안전합니다.

저장하지 않은 변경사항을 어떻게 처리할지 확인받거나 이후 동작을 처리하려면 `CanDeactivate` 가드를 사용하면 됩니다.


{@a cancel-save}

<!--
#### Cancel and save
-->
#### 취소하거나 저장하기

<!--
Users update crisis information in the `CrisisDetailComponent`.
Unlike the `HeroDetailComponent`, the user changes do not update the crisis entity immediately.
Instead, the application updates the entity when the user presses the Save button and discards the changes when the user presses the Cancel button.

Both buttons navigate back to the crisis list after save or cancel.

<code-example path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts" header="src/app/crisis-center/crisis-detail/crisis-detail.component.ts (cancel and save methods)" region="cancel-save"></code-example>

In this scenario, the user could click the heroes link, cancel, push the browser back button, or navigate away without saving.

This example application asks the user to be explicit with a confirmation dialog box that waits asynchronously for the user's
response.

<div class="alert is-helpful">

You could wait for the user's answer with synchronous, blocking code, however, the application is more responsive&mdash;and can do other work&mdash;by waiting for the user's answer asynchronously.

</div>

Generate a `Dialog` service to handle user confirmation.

<code-example language="sh">
  ng generate service dialog
</code-example>

Add a `confirm()` method to the `DialogService` to prompt the user to confirm their intent.
The `window.confirm` is a blocking action that displays a modal dialog and waits for user interaction.

<code-example path="router/src/app/dialog.service.ts" header="src/app/dialog.service.ts"></code-example>

It returns an `Observable` that resolves when the user eventually decides what to do: either to discard changes and navigate away (`true`) or to preserve the pending changes and stay in the crisis editor (`false`).

{@a CanDeactivate}

Generate a guard that checks for the presence of a `canDeactivate()` method in a component&mdash;any component.

<code-example language="sh">
  ng generate guard can-deactivate
</code-example>

Paste the following code into your guard.

<code-example path="router/src/app/can-deactivate.guard.ts" header="src/app/can-deactivate.guard.ts"></code-example>

While the guard doesn't have to know which component has a deactivate method, it can detect that the `CrisisDetailComponent` component has the `canDeactivate()` method and call it.
The guard not knowing the details of any component's deactivation method makes the guard reusable.

Alternatively, you could make a component-specific `CanDeactivate` guard for the `CrisisDetailComponent`.
The `canDeactivate()` method provides you with the current instance of the `component`, the current `ActivatedRoute`, and `RouterStateSnapshot` in case you needed to access some external information.
This would be useful if you only wanted to use this guard for this component and needed to get the component's properties or confirm whether the router should allow navigation away from it.

<code-example path="router/src/app/can-deactivate.guard.1.ts" header="src/app/can-deactivate.guard.ts (component-specific)"></code-example>

Looking back at the `CrisisDetailComponent`, it implements the confirmation workflow for unsaved changes.

<code-example path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts" header="src/app/crisis-center/crisis-detail/crisis-detail.component.ts (excerpt)" region="canDeactivate"></code-example>

Notice that the `canDeactivate()` method can return synchronously; it returns `true` immediately if there is no crisis or there are no pending changes.
But it can also return a `Promise` or an `Observable` and the router will wait for that to resolve to truthy (navigate) or falsy (stay on the current route).

Add the `Guard` to the crisis detail route in `crisis-center-routing.module.ts` using the `canDeactivate` array property.

<code-example path="router/src/app/crisis-center/crisis-center-routing.module.3.ts" header="src/app/crisis-center/crisis-center-routing.module.ts (can deactivate guard)"></code-example>

Now you have given the user a safeguard against unsaved changes.
-->
앱 사용자는 `CrisisDetailComponent`에서 위기 정보를 수정합니다.
그런데 `HeroDetailComponent`와는 다르게, 이 컴포넌트는 사용자가 변경한 내용을 즉시 반영하지 않습니다.
이 컴포넌트에서는 사용자가 "Save" 버튼을 눌렀을 때 전체 내용을 갱신하고, "Cancel" 버튼을 누르면 모든 변경사항을 폐기합니다.

어떤 버튼이든 누른 후에는 위기 목록 화면으로 돌아갑니다.

<code-example path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts" header="src/app/crisis-center/crisis-detail/crisis-detail.component.ts (취소하거나 저장하는 메서드)" region="cancel-save"></code-example>

기본 시나리오는 이렇지만 사용자는 변경사항을 저장하지 않은 상태에서 히어로 목록 링크를 클릭할 수 있고, 브라우저에서 뒤로 가기 버튼을 누를수도 있습니다.

이런 경우에 다이얼로그를 하나 띄워서 사용자가 어떤 결정을 할 것인지 명확하게 결정하고, 사용자가 결정할 때까지 비동기로 기다리는 방식을 활용할 수 있습니다.


<div class="alert is-helpful">

동기 코드로 사용자의 응답을 기다릴 수도 있지만, 이 방식은 코드 실행을 중단시킵니다.
좀 더 나은 사용성을 제공하고 백그라운드에서 다른 작업을 계속 할 수 있는 비동기 방식이 더 좋습니다.

</div>


사용자의 결정을 받을 `Dialog` 서비스를 생성합니다.

<code-example language="none" class="code-shell">
  ng generate service dialog
</code-example>

그리고 사용자의 결정을 받을 `confirm()` 메서드를 `DialogService`에 추가합니다.
`window.confirm`는 모달 팝업을 띄우면서 사용자의 응답을 기다리는 메서드입니다.

<code-example path="router/src/app/dialog.service.ts" header="src/app/dialog.service.ts"></code-example>

`confirm()` 메서드는 사용자가 결정한 것을 `Observable`로 반환하기 때문에 이 값을 활용하면 변경사항을 폐기하거나 저장할 수 있고, 이후에 화면을 벗어나거나(`true`인 경우) 수정화면에 그대로 남아있을 수(`false`인 경우) 있습니다.


{@a CanDeactivate}

컴포넌트에 `canDeactivate()` 메서드가 있는지 검사하는 가드를 생성합니다.

<code-example language="none" class="code-shell">
  ng generate guard can-deactivate
</code-example>

그리고 아래 코드를 가드에 붙여넣습니다.

<code-example path="router/src/app/can-deactivate.guard.ts" header="src/app/can-deactivate.guard.ts"></code-example>

이 가드는 어떤 컴포넌트에 `canDeactivate` 메서드가 있는지 미리 알 필요가 없으며, 컴포넌트에 `canDeactivate()` 메서드가 있을 때만 이 메서드를 실행합니다.
이렇게 구현하면 가드를 재사용하기도 편합니다.

이 방법 대신 `CrisisDetailComponent`를 대상으로만 동작하는 `CanDeactivate` 가드를 만들 수도 있습니다.
이 방식은 컴포넌트 인스턴스를 `canDeactivate()` 메서드로 전달해야 하며, 추가 정보가 필요하다면 `ActivatedRoute`나 `RouterStateSnapshot`을 추가로 전달해서 활용하면 됩니다.
이 컴포넌트에만 동작하는 라우팅 가드를 만들거나, 컴포넌트에 있는 프로퍼티를 더 활용해야 한다면 이 방식이 유용할 수도 있습니다.

<code-example path="router/src/app/can-deactivate.guard.1.ts" header="src/app/can-deactivate.guard.ts (컴포넌트 전용 가드)"></code-example>

`CrisisDetailComponent`를 다시 보면, 이 컴포넌트는 사용자의 결정을 이렇게 받습니다.

<code-example path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts" header="src/app/crisis-center/crisis-detail/crisis-detail.component.ts (일부)" region="canDeactivate"></code-example>

`canDeactivate()` 메서드는 결과값을 동기 방식으로 반환할 수 있습니다.
변경된 내용이 없어서 화면을 벗어나도 문제되지 않으면 `true`를 즉시 반환합니다.
하지만 변경된 내용을 어떻게 해야 할지 결정해야 하는 상황이라면 `Promise`나 `Observable`을 반환해서 라우터의 실행을 잠시 멈출 수 있습니다.

이 가드를 적용하려면 `crisis-center-routing.module.ts` 파일에서 위기 상세정보에 해당하는 라우팅 규칙의 `canDeactivate` 배열에 추가하면 됩니다.

<code-example path="router/src/app/crisis-center/crisis-center-routing.module.3.ts" header="src/app/crisis-center/crisis-center-routing.module.ts (가드 추가하기)"></code-example>

이제 사용자가 변경한 내용을 어떻게 처리할지 보호하는 가드가 추가되었습니다.


{@a Resolve}

{@a resolve-guard}

<!--
### _Resolve_: pre-fetching component data
-->
### _Resolve_: 컴포넌트 데이터 미리 받아오기

<!--
In the `Hero Detail` and `Crisis Detail`, the application waited until the route was activated to fetch the respective hero or crisis.

If you were using a real world API, there might be some delay before the data to display is returned from the server.
You don't want to display a blank component while waiting for the data.

To improve this behavior, you can pre-fetch data from the server using a resolver so it's ready the
moment the route is activated.
This also lets you handle errors before routing to the component.
There's no point in navigating to a crisis detail for an `id` that doesn't have a record.
It'd be better to send the user back to the `Crisis List` that shows only valid crisis centers.

In summary, you want to delay rendering the routed component until all necessary data has been fetched.
-->
히어로 상세정보 컴포넌트와 위기 상세정보 컴포넌트는 라우팅 규칙이 적용된 후에 해당 컴포넌트에 필요한 데이터를 다 받아와야 컴포넌트가 표시됩니다.

실제 운영환경에서 서버가 제공하는 API를 사용한다면 데이터를 받아와서 표시하기까지 시간이 좀 걸릴 것입니다.
이 때 데이터가 표시되기까지 빈 화면이 표시되는데, 이 동작을 개선해 봅시다.

리졸버(resolver)를 사용하면 서버에서 데이터를 미리 받아올 수 있기 때문에 라우팅 규칙이 적용되는 시점에 바로 컴포넌트 내용을 표시할 수 있습니다.
만약 데이터를 받아올 때 에러가 발생한다면 이 에러도 컴포넌트로 이동하기 전에 처리할 수 있습니다.
실제로 존재하지 않는 `id`를 가지고 위기 상세정보 화면으로 이동할 필요는 없습니다.
이런 경우에는 사용자를 위기 목록 화면으로 다시 이동시켜서 올바른 목록이 무엇인지 다시 확인하게 하는 것이 좋습니다.

간단하게 설명하자면, 컴포넌트를 화면에 표시하기 전에 해당 컴포넌트에 필요한 데이터를 다 받아올 때까지 렌더링을 지연시킬 수 있습니다.


{@a fetch-before-navigating}

<!--
#### Fetch data before navigating
-->
#### 화면을 전환하기 전에 데이터 받아오기

<!--
At the moment, the `CrisisDetailComponent` retrieves the selected crisis.
If the crisis is not found, the router navigates back to the crisis list view.

The experience might be better if all of this were handled first, before the route is activated.
A `CrisisDetailResolver` service could retrieve a `Crisis` or navigate away, if the `Crisis` did not exist, _before_ activating the route and creating the `CrisisDetailComponent`.

Generate a `CrisisDetailResolver` service file within the `Crisis Center` feature area.

<code-example language="sh">
  ng generate service crisis-center/crisis-detail-resolver
</code-example>

<code-example path="router/src/app/crisis-center/crisis-detail-resolver.service.1.ts" header="src/app/crisis-center/crisis-detail-resolver.service.ts (generated)"></code-example>

Move the relevant parts of the crisis retrieval logic in `CrisisDetailComponent.ngOnInit()` into the `CrisisDetailResolverService`.
Import the `Crisis` model, `CrisisService`, and the `Router` so you can navigate elsewhere if you can't fetch the crisis.

Be explicit and implement the `Resolve` interface with a type of `Crisis`.

Inject the `CrisisService` and `Router` and implement the `resolve()` method.
That method could return a `Promise`, an `Observable`, or a synchronous return value.

The `CrisisService.getCrisis()` method returns an observable in order to prevent the route from loading until the data is fetched.
The `Router` guards require an observable to `complete`, which means it has emitted all
of its values.
You use the `take` operator with an argument of `1` to ensure that the `Observable` completes after retrieving the first value from the Observable returned by the `getCrisis()` method.

If it doesn't return a valid `Crisis`, then return an empty `Observable`, cancel the previous in-progress navigation to the `CrisisDetailComponent`, and navigate the user back to the `CrisisListComponent`.
The updated resolver service looks like this:

<code-example path="router/src/app/crisis-center/crisis-detail-resolver.service.ts" header="src/app/crisis-center/crisis-detail-resolver.service.ts"></code-example>

Import this resolver in the `crisis-center-routing.module.ts` and add a `resolve` object to the `CrisisDetailComponent` route configuration.

<code-example path="router/src/app/crisis-center/crisis-center-routing.module.4.ts" header="src/app/crisis-center/crisis-center-routing.module.ts (resolver)"></code-example>

The `CrisisDetailComponent` should no longer fetch the crisis.
When you re-configured the route, you changed where the crisis is.
Update the `CrisisDetailComponent` to get the crisis from the  `ActivatedRoute.data.crisis` property instead;

<code-example path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts" header="src/app/crisis-center/crisis-detail/crisis-detail.component.ts (ngOnInit v2)" region="ngOnInit"></code-example>

Note the following three important points:

1. The router's `Resolve` interface is optional.
The `CrisisDetailResolverService` doesn't inherit from a base class.
The router looks for that method and calls it if found.

1. The router calls the resolver in any case where the user could navigate away so you don't have to code for each use case.

1. Returning an empty `Observable` in at least one resolver cancels navigation.

The relevant Crisis Center code for this milestone follows.
-->
지금까지 구현한 대로라면 `CrisisDetailComponent`는 목록에서 선택한 위기 정보를 직접 받아옵니다.
이 때 위기 항목이 실제로 존재하지 않으면 목록 화면으로 다시 이동합니다.

그런데 UX 측면에서 생각해보면, 이 컴포넌트에 필요한 것들을 모두 준비해둔 후에 라우팅 규칙을 적용하는 것이 더 나을 수 있습니다.
새로 만들 `CrisisDetailResolver` 서비스는 원하는 위기 항목을 받아온 후에, 이 항목이 실제로 존재하지 않으면 `CrisisDetailComponent` 인스턴스를 생성하고 라우팅 규칙을 적용하기 _전에_ 다른 화면으로 이동하는 서비스입니다.

위기대응센터 모듈 폴더에서 다음 명령을 실행해서 `CrisisDetailResolver` 서비스를 생성합니다.

<code-example language="none" class="code-shell">
  ng generate service crisis-center/crisis-detail-resolver
</code-example>

<code-example path="router/src/app/crisis-center/crisis-detail-resolver.service.1.ts" header="src/app/crisis-center/crisis-detail-resolver.service.ts (생성된 서비스)"></code-example>

이제 `CrisisDetailComponent.ngOnInit()`에서 데이터를 받아오는 코드를 `CrisisDetailResolverService`로 옮깁니다.
데이터를 받아오려면 `Crisis` 모델, `CrisisService`를 로드해야 하고, 원하는 데이터를 받아오지 못했을 때 사용하기 위해 `Router`도 로드해야 합니다.

이번 예제에서는 `Resolve` 인터페이스를 `Crisis` 타입으로만 명시적으로 구현해 봅시다.

`CrisisService`와 `Router`는 생성자에 주입하고 `resolve()` 메서드를 정의합니다.
이 메서드는 상황에 따라 `Promise`나 `Observable`, 또는 동기 방식으로 결과값을 반환합니다.

`CrisisService.getCrisis()` 메서드는 데이터를 받아오기 전까지 라우팅 규칙이 적용되는 것을 지연시키기 위해 옵저버블을 반환합니다.
이 때 옵저버블은 반드시 종료되어야 라우터가 그 다음 작업을 처리할 수 있습니다.
`take` 연산자에 `1`을 인자를 사용하면 `getCrisis()` 메서드로 첫 번째 데이터를 받은 후에 옵저버블을 확실하게 종료할 수 있습니다.

원하는 위기 항목을 받아오지 못해서 옵저버블이 빈 값이 전달하면 `CrisisDetailComponent`로 이동하던 네비게이션 동작을 취소하고 `CrisisListComponent`로 돌아갑니다.
여기까지 구현하고 나면 리졸버 서비스 코드는 이렇습니다:

<code-example path="router/src/app/crisis-center/crisis-detail-resolver.service.ts" header="src/app/crisis-center/crisis-detail-resolver.service.ts"></code-example>

그리고 이 리졸버는 `crisis-center-routing.module.ts` 파일에 로드하고 `CrisisDetailComponent`에 해당하는 라우팅 규칙의 `resolve` 객체에 추가하면 됩니다.

<code-example path="router/src/app/crisis-center/crisis-center-routing.module.4.ts" header="src/app/crisis-center/crisis-center-routing.module.ts (resolver)"></code-example>

이제 `CrisisDetailComponent`는 데이터를 직접 받아오지 않습니다.
그래서 이 컴포넌트에 해당하는 라우팅 규칙을 수정해서 데이터를 어디에서 받아오는지 지정해야 합니다.
`CrisisDetailComponent` 안에서는 `ActivatedRoute.data.crisis` 프로퍼티에서 데이터를 받아오도록 수정합니다.

<code-example path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts" header="src/app/crisis-center/crisis-detail/crisis-detail.component.ts (ngOnInit v2)" region="ngOnInit"></code-example>

이런 점이 중요합니다:

1. 라우터가 제공하는 `Resolve` 인터페이스는 생략할 수 있습니다.
`CrisisDetailResolverService`도 어떤 클래스를 상속하지 않습니다.
라우터는 관련 메서드가 존재할 때만 해당 메서드를 실행합니다.

1. 라우터는 필요한 상황마다 자동으로 리졸버를 실행합니다.
리졸버가 필요한 경우를 직접 찾아서 추가할 필요는 없습니다.

1. 옵저버블로 빈 값을 전달하면 리졸버가 화면 전환 동작을 취소합니다.

여기까지 구현하고 나면 위기대응센터의 코드는 이렇게 구성됩니다.


<code-tabs>

  <code-pane header="app.component.html" path="router/src/app/app.component.html">

  </code-pane>

  <code-pane header="crisis-center-home.component.html" path="router/src/app/crisis-center/crisis-center-home/crisis-center-home.component.html">

  </code-pane>

  <code-pane header="crisis-center.component.html" path="router/src/app/crisis-center/crisis-center/crisis-center.component.html">

  </code-pane>

  <code-pane header="crisis-center-routing.module.ts" path="router/src/app/crisis-center/crisis-center-routing.module.4.ts">

  </code-pane>

  <code-pane header="crisis-list.component.html" path="router/src/app/crisis-center/crisis-list/crisis-list.component.html">

  </code-pane>

  <code-pane header="crisis-list.component.ts" path="router/src/app/crisis-center/crisis-list/crisis-list.component.ts">

  </code-pane>

  <code-pane header="crisis-detail.component.html" path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.html">

  </code-pane>

  <code-pane header="crisis-detail.component.ts" path="router/src/app/crisis-center/crisis-detail/crisis-detail.component.ts">

  </code-pane>

  <code-pane header="crisis-detail-resolver.service.ts" path="router/src/app/crisis-center/crisis-detail-resolver.service.ts">

  </code-pane>

  <code-pane header="crisis.service.ts" path="router/src/app/crisis-center/crisis.service.ts">

  </code-pane>

  <code-pane header="dialog.service.ts" path="router/src/app/dialog.service.ts">

  </code-pane>

</code-tabs>

<!--
Guards
-->
그리고 가드 코드는 이렇습니다.

<code-tabs>

  <code-pane header="auth.guard.ts" path="router/src/app/auth/auth.guard.3.ts">

  </code-pane>

  <code-pane header="can-deactivate.guard.ts" path="router/src/app/can-deactivate.guard.ts">

  </code-pane>

</code-tabs>


{@a query-parameters}

{@a fragment}

<!--
### Query parameters and fragments
-->
### 쿼리 인자와 프래그먼트

<!--
In the [route parameters](#optional-route-parameters) section, you only dealt with parameters specific to the route.
However, you can use query parameters to get optional parameters available to all routes.

[Fragments](https://en.wikipedia.org/wiki/Fragment_identifier) refer to certain elements on the page
identified with an `id` attribute.

Update the `AuthGuard` to provide a `session_id` query that remains after navigating to another route.

Add an `anchor` element so you can jump to a certain point on the page.

Add the `NavigationExtras` object to the `router.navigate()` method that navigates you to the `/login` route.

<code-example path="router/src/app/auth/auth.guard.4.ts" header="src/app/auth/auth.guard.ts (v3)"></code-example>

You can also preserve query parameters and fragments across navigations without having to provide them again when navigating.
In the `LoginComponent`, you'll add an *object* as the second argument in the `router.navigate()` function and provide the `queryParamsHandling` and `preserveFragment` to pass along the current query parameters and fragment to the next route.

<code-example path="router/src/app/auth/login/login.component.ts" header="src/app/auth/login/login.component.ts (preserve)" region="preserve"></code-example>

<div class="alert is-helpful">

The `queryParamsHandling` feature also provides a `merge` option, which preserves and combines the current query parameters with any provided query parameters when navigating.

</div>

To navigate to the Admin Dashboard route after logging in, update `admin-dashboard.component.ts` to handle the
query parameters and fragment.

<code-example path="router/src/app/admin/admin-dashboard/admin-dashboard.component.1.ts" header="src/app/admin/admin-dashboard/admin-dashboard.component.ts (v2)"></code-example>

Query parameters and fragments are also available through the `ActivatedRoute` service.
Like route parameters, the query parameters and fragments are provided as an `Observable`.
The updated Crisis Admin component feeds the `Observable` directly into the template using the `AsyncPipe`.

Now, you can click on the Admin button, which takes you to the Login page with the provided `queryParamMap` and `fragment`.
After you click the login button, notice that you have been redirected to the `Admin Dashboard` page with the query parameters and fragment still intact in the address bar.

You can use these persistent bits of information for things that need to be provided across pages like authentication tokens or session ids.

<div class="alert is-helpful">

The `query params` and `fragment` can also be preserved using a `RouterLink` with
the `queryParamsHandling` and `preserveFragment` bindings respectively.

</div>
-->
[라우팅 인자](#optional-route-parameters) 섹션에서는 라우팅 규칙에서 인자를 받아오는 방법만 다뤘습니다.
하지만 쿼리 인자를 사용해도 라우팅 규칙에서 원하는 인자를 받아올 수 있습니다.

화면에 있는 엘리먼트 중 `id` 어트리븉를 추출할 수 있는 엘리먼트를  [프래그먼트(Fragments)](https://en.wikipedia.org/wiki/Fragment_identifier)로 전달할 수도 있습니다.

새로 적용되는 라우팅 규칙에 `session_id` 쿼리를 활용할 수 있도록 `AuthGuard`를 수정해 봅시다.

화면에 표시되는 특정 지점으로 이동하기 위해 앵커(`<a>`) 엘리먼트를 추가할 수 있습니다.

`/login` 라우팅 규칙으로 이동하는 `router.navigate()` 메서드에 `NavigationExtras` 객체를 전달하면 됩니다.

<code-example path="router/src/app/auth/auth.guard.4.ts" header="src/app/auth/auth.guard.ts (v3)"></code-example>

쿼리 인자와 프래그먼트는 네비게이션이 끝나도 없애지 않고 그대로 유지할 수도 있습니다.
`LoginComponent`에서 사용하는 `router.navigateUrl()` 함수의 두 번째 인자로 객체를 전달하면서, 이 객체의 `queryParamsHandling` 프로퍼티와 `preserveFragment` 프로퍼티를 지정하면 현재 화면에 진입하면서 사용된 쿼리 인자와 프래그먼트를 다음 라우팅 규칙에도 적용하도록 유지할 수 있습니다.

<code-example path="router/src/app/auth/login/login.component.ts" header="src/app/auth/login/login.component.ts (쿼리 인자 유지하기)" region="preserve"></code-example>


<div class="alert is-helpful">

`queryParamsHandling` 기능을 사용할 때 기존에 존재하는 쿼리 인자와 현재 쿼리 인자를 합치는 `merge` 옵션을 사용할 수도 있습니다.

</div>


로그인한 후에 관리자 대시보드로 이동하기 할 때 쿼리 인자와 프래그먼트를 처리할 수 있도록 `admin-dashboard.component.ts` 코드를 수정해 봅시다.

<code-example path="router/src/app/admin/admin-dashboard/admin-dashboard.component.1.ts" header="src/app/admin/admin-dashboard/admin-dashboard.component.ts (v2)"></code-example>

쿼리 인자와 프랙먼트는 `ActivatedRoute` 서비스 안에서도 참조할 수 있습니다.
라우팅 인자와 비슷하게, 쿼리 인자와 프래그먼트도 `Observable` 타입으로 제공됩니다.
위기대응센터 관리자 컴포넌트에서는 템플릿에서 `AsyncPipe`를 사용해서 옵저버블을 직접 처리합니다.

이제 사용자가 "Admin" 버튼을 클릭하면 로그인 화면으로 이동하면서 `queryParamMap`과 `fragment`에 접근합니다.
그리고 로그인 화면에서 로그인 버튼을 클릭하면 저장해둔 쿼리 인자와 프래그먼트를 사용해서 관리자 대시보드로 이동하며, 이 정보는 브라우저 주소표시줄에서도 확인할 수 있습니다.

인증 토큰이나 세션 ID와 같이 여러 화면에 사용되는 정보라면 이런 식으로 유지하는 것도 좋습니다.


<div class="alert is-helpful">

쿼리 인자와 프래그먼트를 `RouterLink`에 사용하려면 각각 `queryParamsHandling`, `preserveFragment` 바인딩을 추가하면 됩니다.

</div>


{@a asynchronous-routing}

<!--
## Milestone 6: Asynchronous routing
-->
## 마일스톤 6: 비동기 라우팅

<!--
As you've worked through the milestones, the application has naturally gotten larger.
At some point you'll reach a point where the application takes a long time to load.

To remedy this issue, use asynchronous routing, which loads feature modules lazily, on request.
Lazy loading has multiple benefits.

* You can load feature areas only when requested by the user.
* You can speed up load time for users that only visit certain areas of the application.
* You can continue expanding lazy loaded feature areas without increasing the size of the initial load bundle.

You're already part of the way there.
By organizing the application into modules&mdash;`AppModule`,
`HeroesModule`, `AdminModule` and `CrisisCenterModule`&mdash;you
have natural candidates for lazy loading.

Some modules, like `AppModule`, must be loaded from the start.
But others can and should be lazy loaded.
The `AdminModule`, for example, is needed by a few authorized users, so
you should only load it when requested by the right people.
-->
지금까지 몇 개 마일스톤을 거쳐오면서 애플리케이션의 크기는 자연스럽게 커졌습니다.
이제는 애플리케이션이 실행되기까지 시간이 좀 더 걸린다는 것을 느낄 수도 있습니다.

이 문제를 해결하려면 비동기 라우팅을 활용해서 기능 모듈을 필요할 때 지연로딩하면 됩니다.
모듈을 지연로딩하면 얻는 장점이 몇가지 있습니다.

* 사용자에게 필요한 기능 모듈만 로드할 수 있습니다.
* 애플리케이션 특정 기능만 사용하는 사용자라면 애플리케이션 실행 속도를 향상시킬 수 있습니다.
* 초기 실행에 필요한 빌드 결과물을 기반으로 이후에 필요한 모듈을 확장하는 방식으로 실행할 수 있습니다.

이 방식은 이미 일부 다뤘습니다.
애플리케이션을 `AppModule`, `HeroesModule`, `AdminModule`, `CrisisCenterModule`로 나누고 나면, 각 모듈을 지연로딩할 것인지 자연스럽게 지정할 수 있습니다.

`AppModule`은 애플리케이션이 시작될 때 로딩되어야 합니다.
하지만 나머지 모듈은 지연로딩할 수 있으며, 지연로딩을 권장하기도 합니다.
`AdminModule`을 생각해보면, 이 모듈은 권한이 있는 일부 사용자에게만 필요한 모듈입니다.
그렇다면 권한이 있는 사용자만 이 모듈을 로드하는 것이 합리적입니다.


{@a lazy-loading-route-config}

<!--
### Lazy Loading route configuration
-->
### 지연로딩 라우팅 환경설정

<!--
Change the `admin` path in the `admin-routing.module.ts` from `'admin'` to an empty string, `''`, the empty path.

Use empty path routes to group routes together without adding any additional path segments to the URL.
Users will still visit `/admin` and the `AdminComponent` still serves as the Routing Component containing child routes.

Open the `AppRoutingModule` and add a new `admin` route to its `appRoutes` array.

Give it a `loadChildren` property instead of a `children` property.
The `loadChildren` property takes a function that returns a promise using the browser's built-in syntax for lazy loading code using dynamic imports `import('...')`.
The path is the location of the `AdminModule` (relative to the application root).
After the code is requested and loaded, the `Promise` resolves an object that contains the `NgModule`, in this case the `AdminModule`.

<code-example path="router/src/app/app-routing.module.5.ts" region="admin-1" header="app-routing.module.ts (load children)"></code-example>

<div class="alert is-important">

*Note*: When using absolute paths, the `NgModule` file location must begin with `src/app` in order to resolve correctly. For custom [path mapping with absolute paths](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping), you must configure the `baseUrl` and `paths` properties in the project `tsconfig.json`.

</div>

When the router navigates to this route, it uses the `loadChildren` string to dynamically load the `AdminModule`.
Then it adds the `AdminModule` routes to its current route configuration.
Finally, it loads the requested route to the destination admin component.

The lazy loading and re-configuration happen just once, when the route is first requested; the module and routes are available immediately for subsequent requests.


<div class="alert is-helpful">

Angular provides a built-in module loader that supports SystemJS to load modules asynchronously. If you were
using another bundling tool, such as Webpack, you would use the Webpack mechanism for asynchronously loading modules.

</div>

Take the final step and detach the admin feature set from the main application.
The root `AppModule` must neither load nor reference the `AdminModule` or its files.

In `app.module.ts`, remove the `AdminModule` import statement from the top of the file
and remove the `AdminModule` from the NgModule's `imports` array.
-->
`admin-routing.module.ts` 파일에서 `admin`에 해당하는 경로를 빈 문자열 `''` 주소로 변경해 봅시다.

라우팅 규칙에 빈 문자열을 주소로 사용하는 방식은 해당 라우팅 규칙 하위 계층에 있는 라우팅 규칙을 그룹화 하는 방식입니다.
주소를 바꿔도 사용자는 여전히 `/admin` 주소에 접근해서 `AdminComponent`를 확인할 수 있으며, 관리자 모듈의 자식 컴포넌트도 이 컴포넌트에 표시됩니다.

`AppRoutingModule` 파일을 열고 `admin`으로 연결되는 라우팅 규칙을 `appRoutes` 배열에 추가해 봅시다.

이 때 `children` 프로퍼티 대신 `loadChildren` 프로퍼티를 사용해 봅시다.
`loadChildren` 프로퍼티는 함수는 인자로 받는데, 이 함수는 브라우저가 제공하는 동적 로딩 기능을 활용해서 `import('...')`라는 코드를 프라미스 형태로 반환합니다.
이 라우팅 규칙의 주소는 `AdminModule`에 해당하는 주소를 지정합니다.
앱 최상위 주소를 기준으로 상대주소로 지정합니다.
이제 이 코드가 사용되면 `Promise`가 `NgModule`을 반환합니다.
이 경우에 `NgModule`은 `AdminModule`입니다.

<code-example path="router/src/app/app-routing.module.5.ts" region="admin-1" header="app-routing.module.ts (모듈 지연 로딩)"></code-example>


<div class="alert is-important">

*참고*: 절대주소를 사용하면 `NgModule` 파일 위치를 지정할 때 `src/app`부터 시작하는 경로로 지정해야 `NgModule`을 제대로 로드할 수 있습니다.
[절대주소로 경로 맵핑하기](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) 문서에서 확인할 수 있듯이, `baseUrl`과 `paths` 프로퍼티는 프로젝트의 `tsconfig.json` 설정의 영향을 받습니다.

</div>


이제 라우터가 해당 라우팅 규칙을 적용하는 시점이 되면 `loadChildren` 설정에 따라 `AdminModule`을 동적으로 로드합니다.
그리고 `AdminModule`을 로드한 이후에는 `AdminModule`의 라우팅 규칙이 현재 애플리케이션의 라우팅 규칙 환경설정에 통합됩니다.
결국 최종 목적지는 `AdminComponent`가 됩니다.

모듈을 지연로딩하고 기존 라우팅 규칙과 합치는 과정은 해당 라우팅 규칙이 요청되었을 때 딱 한 번만 실행됩니다.
이후에는 원래부터 있던 모듈처럼 동작합니다.


<div class="alert is-helpful">

Angular도 SystemJS를 활용해서 모듈을 비동기로 로드하는 방식을 기본으로 제공합니다.
Webpack과 같은 번들링 툴을 사용한다면 해당 번들링 툴에 맞는 방식으로 모듈을 지연로딩하는 것이 좋습니다.

</div>


이제 마지막 단계로 관리자 모듈을 메인 애플리케이션에서 완전히 분리해 봅시다.
최상위 `AppModule`은 이제 더이상 `AdminModule`이나 이 모듈에 있는 파일을 참조하지 않습니다.

`app.module.ts` 파일에서 `AdminModule`을 로드하는 코드를 제거하고 `imports` 배열에도 `AdminModule`을 제거하세요.


{@a can-load-guard}

<!--
### `CanLoad`: guarding unauthorized loading of feature modules
-->
### `CanLoad`: 권한없는 사용자가 모듈 로딩하는 것을 제한하기

<!--
You're already protecting the `AdminModule` with a `CanActivate` guard that prevents unauthorized users from accessing the admin feature area.
It redirects to the login page if the user is not authorized.

But the router is still loading the `AdminModule` even if the user can't visit any of its components.
Ideally, you'd only load the `AdminModule` if the user is logged in.

Add a `CanLoad` guard that only loads the `AdminModule` once the user is logged in _and_ attempts to access the admin feature area.

The existing `AuthGuard` already has the essential logic in its `checkLogin()` method to support the `CanLoad` guard.

Open `auth.guard.ts`.
Import the `CanLoad` interface from `@angular/router`.
Add it to the `AuthGuard` class's `implements` list.
Then implement `canLoad()` as follows:

<code-example path="router/src/app/auth/auth.guard.ts" header="src/app/auth/auth.guard.ts (CanLoad guard)" region="canLoad"></code-example>

The router sets the `canLoad()` method's `route` parameter to the intended destination URL.
The `checkLogin()` method redirects to that URL once the user has logged in.

Now import the `AuthGuard` into the `AppRoutingModule` and add the `AuthGuard` to the `canLoad`
array property for the `admin` route.
The completed admin route looks like this:

<code-example path="router/src/app/app-routing.module.5.ts" region="admin" header="app-routing.module.ts (lazy admin route)"></code-example>
-->
지금도 `AdminModule`이 `CanActivate` 가드로 보호되고 있긴 합니다.
`CanActivate` 가드는 권한이 없는 사용자가 관리자 모듈에 접근하는 것을 막는 라우팅 가드입니다.

하지만 `CanActivate`만 사용하면 사용자가 `AdminModule`에 있는 컴포넌트를 사용하지 않아도 `AdminModule`을 로드합니다.
사용자가 로그인하지 않은 상태라면 `AdminModule`을 아예 로드하지 않는 것이 가장 좋습니다.

이런 경우에 `CanLoad` 가드를 사용하면 사용자가 로그인하고, 관리자 모듈에 대한 권한이 있을 때만 `AdminModule`을 로드합니다.

이전에 작성한 `AuthGuard`에는 `CanLoad` 가드를 사용에 사용할 수 있는 `checkLogin()` 메서드가 이미 구현되어 있습니다.

`auth.guard.ts` 파일을 엽니다.
`@angular/router` 패키지로 제공되는 `CanLoad` 인터페이스를 로드합니다.
이 인터페이스를 `AuthGuard` 클래스의 `implements` 목록에 추가합니다.
그리고 `canLoad()` 메서드를 이렇게 정의하면 됩니다:

<code-example path="router/src/app/auth/auth.guard.ts" header="src/app/auth/auth.guard.ts (CanLoad 가드)" region="canLoad"></code-example>

라우터는 `canLoad()` 메서드가 정의한대로 `route`로 전달되는 인자에 따라 최종 URL을 결정합니다.
`checkLogin()` 메서드는 사용자가 로그인했을 때 해당 URL로 리다이렉션하는 메서드입니다.

이제 `AppRoutingModule`에 `AuthGuard`를 로드하고 `AuthGuard`를 `canLoad` 배열에 추가합니다.
여기까지 작성하고 나면 `admin` 주소에 해당하는 라우팅 규칙이 이렇게 마무리됩니다:

<code-example path="router/src/app/app-routing.module.5.ts" region="admin" header="app-routing.module.ts (지연로딩되는 admin 라우팅 규칙)"></code-example>


{@a preloading}
{@a preloading-background-loading-of-feature-areas}
<!--
### Preloading: background loading of feature areas
-->
### 사전로딩: 백그라운드에서 모듈 로딩하기

<!--
In addition to loading modules on-demand, you can load modules asynchronously with preloading.

The `AppModule` is eagerly loaded when the application starts, meaning that it loads right away.
Now the `AdminModule` loads only when the user clicks on a link, which is called lazy loading.

Preloading lets you load modules in the background so that the data is ready to render when the user activates a particular route.
Consider the Crisis Center.
It isn't the first view that a user sees.
By default, the Heroes are the first view.
For the smallest initial payload and fastest launch time, you should eagerly load the `AppModule` and the `HeroesModule`.

You could lazy load the Crisis Center.
But you're almost certain that the user will visit the Crisis Center within minutes of launching the app.
Ideally, the application would launch with just the `AppModule` and the `HeroesModule` loaded and then, almost immediately, load the `CrisisCenterModule` in the background.
By the time the user navigates to the Crisis Center, its module is loaded and ready.
-->
모듈이 필요할 때 지연로딩할 수 있는 것처럼, 모듈을 미리 로드해둘 수도 있습니다.

`AppModule`은 애플리케이션이 시작되는 시점에 로드되기 때문에 즉시 로드된다고 볼 수 있습니다.
하지만 `AdminModule`은 사용자가 링크를 클릭했을 때 지연로딩됩니다.

모듈을 백그라운드에서 사전에 로딩하는 것은 사용자가 해당 모듈로 화면을 전환할 때 필요한 데이터를 미리 로딩해두는 것과 같습니다.
위기대응센터를 생각해 봅시다.
이 모듈은 사용자가 제일 처음 접하는 화면이 아닙니다.
사용자가 처음 보는 화면은 히어로 목록이 표시되는 화면입니다.
따라서 실행에 필요한 애플리케이션 용량을 최소한으로 유지하면서 빠르게 실행하려면 `AppModule`과 `HeroesModule`을 즉시 로드하는 것이 타당합니다.

위기대응센터 모듈은 지연로딩할 수 있습니다.
그런데 대부분의 사용자가 위기대응센터에 방문한다고 하면 `AppModule`과 `HeroesModule`을 로드한 채로 애플리케이션을 실행한 직후에 `CrisisCenterModule`을 백그라운드에서 로드하는 것이 좋습니다.
애플리케이션을 실행한 후에 사용자가 위기대응센터로 이동하게 되면 모듈은 이미 로드된 상태이기 때문에 화면 전환을 요청한 시점에 바로 접근할 수 있습니다.

{@a how-preloading}

<!--
#### How preloading works
-->
#### 사전로딩이 동작하는 방식

<!--
After each successful navigation, the router looks in its configuration for an unloaded module that it can preload.
Whether it preloads a module, and which modules it preloads, depends upon the preload strategy.

The `Router` offers two preloading strategies:

* No preloading, which is the default. Lazy loaded feature areas are still loaded on-demand.
* Preloading of all lazy loaded feature areas.

The router either never preloads, or preloads every lazy loaded module.
The `Router` also supports [custom preloading strategies](#custom-preloading) for fine control over which modules to preload and when.

This section guides you through updating the `CrisisCenterModule` to load lazily by default and use the `PreloadAllModules` strategy to load all lazy loaded modules.
-->
네비게이션 동작이 성공적으로 끝나면 라우터는 환경설정을 살펴보고 사전로딩해야 하는 모듈 중에 아직 로드되지 않은 모듈을 찾습니다.
이 때 사전로딩해야 하는 모듈을 찾으면 사전로딩 정책에 따라 모듈을 사전로딩합니다.

`Router`가 제공하는 사전로딩 정책은 2가지 입니다:

* 기본값은 사전로딩하지 않습니다. 지연로딩 대상 모듈은 필요할 때만 로드됩니다.
* 지연로딩 대상 모듈을 모두 사전로딩합니다.

라우터는 사전로딩을 사용하지 않거나 모든 지연로딩 대상 모듈을 사전로딩합니다.
그리고 특별한 조작이 필요한 경우를 위해 [커스텀 사전로딩 정책](#custom-preloading)을 사용할 수도 있습니다.

이번 섹션에서는 `CrisisCenterModule`이 지연로딩되도록 수정한 후에 `PreloadAllModules` 정책을 사용해서 지연로딩 대상 모듈을 모두 사전로딩해 봅시다.


{@a lazy-load-crisis-center}

<!--
#### Lazy load the crisis center
-->
#### 위기대응센터 지연로딩하기

<!--
Update the route configuration to lazy load the `CrisisCenterModule`.
Take the same steps you used to configure `AdminModule` for lazy loading.

1. Change the `crisis-center` path in the `CrisisCenterRoutingModule` to an empty string.

1. Add a `crisis-center` route to the `AppRoutingModule`.

1. Set the `loadChildren` string to load the `CrisisCenterModule`.

1. Remove all mention of the `CrisisCenterModule` from `app.module.ts`.


Here are the updated modules _before enabling preload_:


<code-tabs>

  <code-pane header="app.module.ts" path="router/src/app/app.module.ts" region="preload">

  </code-pane>

  <code-pane header="app-routing.module.ts" path="router/src/app/app-routing.module.6.ts" region="preload-v1">

  </code-pane>

  <code-pane header="crisis-center-routing.module.ts" path="router/src/app/crisis-center/crisis-center-routing.module.ts">

  </code-pane>

</code-tabs>

You could try this now and confirm that the  `CrisisCenterModule` loads after you click the "Crisis Center" button.

To enable preloading of all lazy loaded modules, import the `PreloadAllModules` token from the Angular router package.

The second argument in the `RouterModule.forRoot()` method takes an object for additional configuration options.
The `preloadingStrategy` is one of those options.
Add the `PreloadAllModules` token to the `forRoot()` call:

<code-example path="router/src/app/app-routing.module.6.ts" header="src/app/app-routing.module.ts (preload all)" region="forRoot"></code-example>

This configures the `Router` preloader to immediately load all lazy loaded routes (routes with a `loadChildren` property).

When you visit `http://localhost:4200`, the `/heroes` route loads immediately upon launch and the router starts loading the `CrisisCenterModule` right after the `HeroesModule` loads.

Currently, the `AdminModule` does not preload because `CanLoad` is blocking it.
-->
라우팅 규칙을 변경해서 `CrisisCenterModule`를 지연로딩하도록 수정해 봅시다.
이 과정은 `AdminModule`에 지연로딩을 적용할 때와 같습니다.

1. `CrisisCenterRoutingModule`에 지정한 `crisis-center` 주소를 빈 문자열로 변경합니다.

1. `AppRoutingModule`에 `crisis-center` 라우팅 규칙을 추가합니다.

1. `loadChildren` 프로퍼티를 추가하고 `CrisisCenterModule`을 지정합니다.

1. `app.module.ts` 파일에 있는 `CrisisCenterModule` 관련 코드를 제거합니다.

여기까지 작성하면 _사전로딩을 할 준비_ 는 끝났습니다:


<code-tabs>

  <code-pane header="app.module.ts" path="router/src/app/app.module.ts" region="preload">

  </code-pane>

  <code-pane header="app-routing.module.ts" path="router/src/app/app-routing.module.6.ts" region="preload-v1">

  </code-pane>

  <code-pane header="crisis-center-routing.module.ts" path="router/src/app/crisis-center/crisis-center-routing.module.ts">

  </code-pane>

</code-tabs>


이렇게 수정하면 사용자가 "Crisis Center" 버튼을 클릭했을 때 `CrisisCenterModule`을 동적으로 로드하고 화면을 전환합니다.

이제 지연로딩 대상 모듈을 모두 사전로딩하기 위해 Angular 라우터 패키지로 제공되는 `PreloadAllModules` 토큰을 로드합니다.

`RouterModule.forRoot()` 메서드는 두 번째 인자로 추가 환경설정 옵션을 받습니다.
`preloadingStrategy`도 이 때 설정할 수 있는 옵션 중 하나입니다.
`forRoot()`를 실행할 때 이렇게 인자를 지정하면 됩니다:

<code-example path="router/src/app/app-routing.module.6.ts" header="src/app/app-routing.module.ts (모두 사전로딩하기)" region="forRoot"></code-example>

이렇게 설정하면 애플리케이션이 실행된 후에 지연로딩해야 하는 모듈을 모두 사전로딩합니다.

그래서 `http://localhost:4200`이나 `/heroes` 주소에 접근하면 라우터가 `HeroesModule`을 로드한 후에 `CrisisCenterModule`을 로드합니다.

다만, `AdminModule`은 `CanLoad`로 보호되고 있기 때문에 사전로딩되지 않습니다.


{@a preload-canload}

<!--
#### `CanLoad` blocks preload
-->
#### `CanLoad`는 사전로딩을 막습니다.

<!--
The `PreloadAllModules` strategy does not load feature areas protected by a [CanLoad](#can-load-guard) guard.

You added a `CanLoad` guard to the route in the `AdminModule` a few steps back to block loading of that module until the user is authorized.
That `CanLoad` guard takes precedence over the preload strategy.

If you want to preload a module as well as guard against unauthorized access, remove the `canLoad()` guard method and rely on the [canActivate()](#can-activate-guard) guard alone.
-->
`PreloadAllModules` 정책을 지정해도 [CanLoad](#can-load-guard) 가드가 보호하는 모듈은 사전로딩하지 않습니다.

`AdminModule` 라우팅 규칙은 로그인하지 않은 사용자가 접근하는 것을 막기 위해 `CanLoad` 가드가 사용되었습니다.
이 때 `CanLoad` 가드는 사전로딩 정책보다 우선 순위로 동작합니다.

그래서 로그인하지 않은 사용자를 막으면서 사전로딩도 하려면 `canLoad()` 가드 메서드를 제거하고 [`canActivate()`](#can-activate-guard) 가드만 사용해야 합니다.


{@a custom-preloading}

<!--
### Custom Preloading Strategy
-->
### 커스텀 사전로딩 정책

<!--
Preloading every lazy loaded module works well in many situations.
However, in consideration of things such as low bandwidth and user metrics, you can use a custom preloading strategy for specific feature modules.

This section guides you through adding a custom strategy that only preloads routes whose `data.preload` flag is set to `true`.
Recall that you can add anything to the `data` property of a route.

Set the `data.preload` flag in the `crisis-center` route in the `AppRoutingModule`.

<code-example path="router/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts (route data preload)" region="preload-v2"></code-example>

Generate a new `SelectivePreloadingStrategy` service.

<code-example language="sh">
  ng generate service selective-preloading-strategy
</code-example>

Replace the contents of `selective-preloading-strategy.service.ts` with the following:

<code-example path="router/src/app/selective-preloading-strategy.service.ts" header="src/app/selective-preloading-strategy.service.ts"></code-example>

`SelectivePreloadingStrategyService` implements the `PreloadingStrategy`, which has one method, `preload()`.

The router calls the `preload()` method with two arguments:

1. The route to consider.
1. A loader function that can load the routed module asynchronously.

An implementation of `preload` must return an `Observable`.
If the route does preload, it returns the observable returned by calling the loader function.
If the route does not preload, it returns an `Observable` of `null`.

In this sample, the  `preload()` method loads the route if the route's `data.preload` flag is truthy.

As a side-effect, `SelectivePreloadingStrategyService` logs the `path` of a selected route in its public `preloadedModules` array.

Shortly, you'll extend the `AdminDashboardComponent` to inject this service and display its `preloadedModules` array.

But first, make a few changes to the `AppRoutingModule`.

1. Import `SelectivePreloadingStrategyService` into `AppRoutingModule`.
1. Replace the `PreloadAllModules` strategy in the call to `forRoot()` with this `SelectivePreloadingStrategyService`.

Now edit the `AdminDashboardComponent` to display the log of preloaded routes.

1. Import the `SelectivePreloadingStrategyService`.
1. Inject it into the dashboard's constructor.
1. Update the template to display the strategy service's `preloadedModules` array.

Now the file is as follows:

<code-example path="router/src/app/admin/admin-dashboard/admin-dashboard.component.ts" header="src/app/admin/admin-dashboard/admin-dashboard.component.ts (preloaded modules)"></code-example>

Once the application loads the initial route, the `CrisisCenterModule` is preloaded.
Verify this by logging in to the `Admin` feature area and noting that the `crisis-center` is listed in the `Preloaded Modules`.
It also logs to the browser's console.
-->
지연로딩 대상 모듈을 사전로딩하는 동작은 웬만해서는 문제가 발생하지 않습니다.
하지만 사용자 디바이스의 네트워크 상황이 좋지 않거나 데이터 소모를 줄이는 방법을 고려한다면 모듈마다 적합한 커스텀 사전로딩 정책을 사용할 수도 있습니다.

이번 섹셔넹서는 라우팅 규칙에 `data.preload` 플래그가 `true`일때만 모듈을 사전로딩하는 커스텀 사전로딩 정책을 정의하는 방법에 대해 알아봅시다.
라우팅 규칙에 있는 `data` 프로퍼티에는 어떤 모양의 객체라도 자유롭게 지정할 수 있습니다.

`AppRoutingModule`에 등록한 `crisis-center` 라우팅 규칙에 `data.preload` 플래그를 추가합니다.

<code-example path="router/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts (route data preload)" region="preload-v2"></code-example>

그리고 `SelectivePreloadingStrategy` 서비스를 생성합니다.

<code-example language="none" class="code-shell">
  ng generate service selective-preloading-strategy
</code-example>

`selective-preloading-strategy.service.ts` 파일의 내용을 이렇게 수정합니다:

<code-example path="router/src/app/selective-preloading-strategy.service.ts" header="src/app/selective-preloading-strategy.service.ts"></code-example>

`SelectivePreloadingStrategyService`는 `PreloadingStrategy` 인터페이스를 확장해서 구현하며, `preload()` 메서드 하나만 정의합니다.

라우터는 `preload()` 메서드를 실행할 때 인자를 2개 전달합니다:

1. 참고할 라우팅 규칙
1. 비동기 모듈 로더 함수

`preload()` 함수는 반드시 `Observable`을 반환해야 합니다.
해당 라우팅 규칙이 모듈을 사전로딩해야 한다면 로더 함수를 실행해서 옵저버블을 반환하면 됩니다.
그리고 사전로딩하지 않아야 한다면 `of(null)` 옵저버블을 반환하면 됩니다.

이번 예제에서는 라우팅 규칙에 있는 `data.preload` 플래그가 참으로 평가될 때 모듈을 사전로딩하도록 구현했습니다.

이 동작과 함께 `SelectivePreloadingStrategyService`는 사전로딩하는 라우팅 규칙의 주소를 콘솔에 출력하고 `public preloadedModules` 배열 프로퍼티에 추가합니다.

이렇게 배열에 추가한 정보는 `AdminDashboardComponent`와 같은 화면에서 관리자용 정보로 표시할 수 있습니다.

하지만 그전에, `AppRoutingModule` 코드를 약간 수정해야 합니다.

1. `AppRoutingModule`에 `SelectivePreloadingStrategyService`를 로드합니다.
1. `forRoot()`에 사용한 `PreloadAllModules` 정책을 `SelectivePreloadingStrategyService`로 변경합니다.
1. `AppRoutingModule` 프로바이더 배열에 `SelectivePreloadingStrategyService` 정책을 추가하면 이제 앱 전체에서 이 사전로딩 정책을 자유롭게 사용할 수 있습니다.

이제 사전로딩한 라우팅 규칙을 확인하도록 `AdminDashboardComponent`를 수정해 봅시다.

1. `SelectivePreloadingStrategyService`를 로드합니다.
1. 이 정책을 생성자로 주입합니다.
1. 사전로딩 정책 서비스의 `preloadedModules` 배열을 화면에 표시하도록 템플릿을 수정합니다.

그러면 컴포넌트 클래스 파일의 내용이 이렇게 구성됩니다:

<code-example path="router/src/app/admin/admin-dashboard/admin-dashboard.component.ts" header="src/app/admin/admin-dashboard/admin-dashboard.component.ts (사전로딩된 모듈 확인하기)"></code-example>

이제 애플리케이션이 첫 번째 라우팅 규칙을 로드하면 그 뒤에 바로 `CrisisCenterModule`이 사전로딩됩니다.
이 모듈이 정말 사전로딩 되었는지 관리자 모듈로 이동해서 확인해 보세요.
모듈이 사전로딩되면 브라우저 콘솔에도 로그가 출력됩니다.


{@a redirect-advanced}

<!--
### Migrating URLs with redirects
-->
### 리다이렉션으로 기존 URL 마이그레이션하기

<!--
You've setup the routes for navigating around your application and used navigation imperatively and declaratively.
But like any application, requirements change over time.
You've setup links and navigation to `/heroes` and `/hero/:id` from the `HeroListComponent` and `HeroDetailComponent` components.
If there were a requirement that links to `heroes` become `superheroes`, you would still want the previous URLs to navigate correctly.
You also don't want to update every link in your application, so redirects makes refactoring routes trivial.
-->
지금까지 애플리케이션에 활용하는 라우팅 규칙을 다양하게 수정해봤습니다.
하지만 모든 애플리케이션이 그렇듯, 요구사항은 때에 따라 변경될 수 있습니다.
지금은 `/heroes`, `/hero/:id`라는 주소가 `HeroListComponent`나 `HeroDetailComponent`와 연결됩니다.
`heroes`라는 주소가 `superheroes`로 변경되더라도 이전 주소를 그대로 유지하는 경우를 생각해 봅시다.
리다이렉션을 활용하면 애플리케이션에 존재하는 링크를 매번 변경하지 않아도 라우팅 규칙 수정사항을 최소화 할 수 있습니다.


{@a url-refactor}

<!--
#### Changing `/heroes` to `/superheroes`
-->
#### `/heroes` 주소를 `/superheroes`로 변경하기

<!--
This section guides you through migrating the `Hero` routes to new URLs.
The `Router` checks for redirects in your configuration before navigating, so each redirect is triggered when needed. To support this change, add redirects from the old routes to the new routes in the `heroes-routing.module`.

<code-example path="router/src/app/heroes/heroes-routing.module.ts" header="src/app/heroes/heroes-routing.module.ts (heroes redirects)"></code-example>

Notice two different types of redirects.
The first change is from  `/heroes` to `/superheroes` without any parameters.
The second change is from `/hero/:id` to `/superhero/:id`, which includes the `:id` route parameter.
Router redirects also use powerful pattern-matching, so the `Router` inspects the URL and replaces route parameters in the `path` with their appropriate destination.
Previously, you navigated to a URL such as `/hero/15` with a route parameter `id` of `15`.

<div class="alert is-helpful">

The `Router` also supports [query parameters](#query-parameters) and the [fragment](#fragment) when using redirects.

* When using absolute redirects, the `Router` uses the query parameters and the fragment from the `redirectTo` in the route config.
* When using relative redirects, the `Router` use the query params and the fragment from the source URL.

</div>

Currently, the empty path route redirects to `/heroes`, which redirects to `/superheroes`.
This won't work because the `Router` handles redirects once at each level of routing configuration.
This prevents chaining of redirects, which can lead to endless redirect loops.

Instead, update the empty path route in `app-routing.module.ts` to redirect to `/superheroes`.

<code-example path="router/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts (superheroes redirect)"></code-example>

A `routerLink` isn't tied to route configuration, so update the associated router links to remain active when the new route is active.
Update the `app.component.ts` template for the `/heroes` `routerLink`.

<code-example path="router/src/app/app.component.html" header="src/app/app.component.html (superheroes active routerLink)"></code-example>

Update the `goToHeroes()` method in the `hero-detail.component.ts` to navigate back to `/superheroes` with the optional route parameters.

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.ts" region="redirect" header="src/app/heroes/hero-detail/hero-detail.component.ts (goToHeroes)"></code-example>

With the redirects setup, all previous routes now point to their new destinations and both URLs still function as intended.
-->
이번 섹션에서는 `/heroes`에 해당하는 라우팅 규칙을 다른 URL로 마이그레이션하는 방법에 대해 알아봅시다.
라우터는 화면을 전환하기 전에 일반 라우팅 규칙보다 리다이렉션을 먼저 검사합니다.
그래서 화면에 접근하는 URL이 변경된다면 이전 라우팅 규칙을 그대로 두고 리다이렉션 라우팅 규칙을 추가하면 됩니다.

<code-example path="router/src/app/heroes/heroes-routing.module.ts" header="src/app/heroes/heroes-routing.module.ts (heroes 리다이렉션)"></code-example>

리다이렉션 타입이 2개인 것을 유심히 봅시다.
첫 번째는 라우팅 인자 없이 `/heroes` 주소가 `/superheroes` 주소로 변경된 것입니다.
그리고 두 번째는 `:id` 라우팅 인자가 포함된 `/hero/:id` 주소가 `/superhero/:id` 주소로 변경된 것입니다.
라우터가 제공하는 패턴 매칭은 `path` 프로퍼티 안에 있는 라우팅 인자도 모두 처리할 수 있기 때문에 리다이렉션 주소에 라우팅 인자가 있더라도 최종 주소를 원하는 대로 처리할 수 있습니다.
이전에 언급했듯이, `/hero/15`라는 주소가 있을 때 라우팅 인자 `id`에 해당하는 값은 `15`입니다.


<div class="alert is-helpful">

라우터는 리다이렉션할 때 [쿼리 인자](#query-parameters)와 [프래그먼트](#fragment)도 그대로 처리합니다.

* 절대주소로 리다이렉션하면 `redirectTo`에 지정된 쿼리 인자와 프래그먼트를 활용합니다.
* 상대주소로 리다이렉션하면 소스 URL에 있는 쿼리 인자와 프래그먼트를 활용합니다.

</div>


이제 `HeroesModule`에 빈 주소가 사용되면 `/heroes`로 이동한 후에 `/superheroes`로 이동한다고 생각할 수 있습니다.
하지만 라우터는 리다이렉션을 한 계층에서 한 번만 처리합니다.
이 정책은 리다이렉션이 끝나지 않고 계속되는 상황을 막기 위한 것입니다.

이 상황을 해결하려면 `app-routing.module.ts` 파일에 지정된 주소를 `/superheroes`로 변경해야 합니다.

<code-example path="router/src/app/app-routing.module.ts" header="src/app/app-routing.module.ts (superheroes로 리다이렉션 하기)"></code-example>

`routerLink`는 라우팅 규칙과 직접 연결되지 않기 때문에 라우팅 규칙의 주소가 변경되면 관련 링크도 모두 수정해야 합니다.
`app.component.ts` 템플릿에 있는 `/heroes` 링크를 수정합니다.

<code-example path="router/src/app/app.component.html" header="src/app/app.component.html (superheroes 라우터 링크 수정)"></code-example>

그리고 `hero-detail.component.ts` 파일의 `goToHeroes()` 메서드도 `/superheroes`로 이동하도록 수정합니다.

<code-example path="router/src/app/heroes/hero-detail/hero-detail.component.ts" region="redirect" header="src/app/heroes/hero-detail/hero-detail.component.ts (goToHeroes())"></code-example>

여기까지 작업하고 나면 이전에 사용하던 주소와 새로 변경된 주소가 모두 원하는 화면으로 도앚ㄱ합니다.


{@a inspect-config}

<!--
### Inspect the router's configuration
-->
### 라우터 환경설정 확인하기

<!--
To determine if your routes are actually evaluated [in the proper order](#routing-module-order), you can inspect the router's configuration.

Do this by injecting the router and logging to the console its `config` property.
For example, update the `AppModule` as follows and look in the browser console window
to see the finished route configuration.

<code-example path="router/src/app/app.module.7.ts" header="src/app/app.module.ts (inspect the router config)" region="inspect-config"></code-example>
-->
라우팅 규칙이 [어떤 순서로](#routing-module-order) 최종결정되었는지 확인하려면 라우터 환경설정을 직접 확인하면 됩니다.

라우터 설정을 확인하려면 라우터를 의존성 객체로 주입하고 이 객체의 `config` 프로퍼티를 확인하면 됩니다.
`AppModule`의 경우라면 아래 코드처럼 작성하면 최종 라우터 설정을 확인할 수 있습니다.

<code-example path="router/src/app/app.module.7.ts" header="src/app/app.module.ts (라우터 환경설정 확인하기)" region="inspect-config"></code-example>


{@a final-app}

<!--
## Final application
-->
## 최종 결과

<!--
For the completed router application, see the <live-example name="router"></live-example> for the final source code.
-->
여기까지 작업한 내용을 확인하려면 <live-example name="router"></live-example>를 참고하세요.

{@a link-parameters-array}
