<!--
# Using Angular routes in a single-page application
-->
# SPA에 Angular 라우터 활용하기

<!--
This tutorial describes how to build a single-page application, SPA that uses multiple Angular routes.


In a Single Page Application (SPA), all of your application's functions exist in a single HTML page.
As users access your application's features, the browser needs to render only the parts that matter to the user, instead of loading a new page. This pattern can significantly improve your application's user experience.

To define how users navigate through your application, you use routes. Add routes to define how users navigate from one part of your application to another.
You can also configure routes to guard against unexpected or unauthorized behavior.

To explore a sample application featuring the contents of this tutorial, see the <live-example></live-example>.
-->
이 문서는 단일 페이지 애플리케이션(Single Page Application, SPA)에서 Angular 라우터를 활용하는 방법에 대해 설명합니다.

SPA에서 모든 애플리케이션 기능은 한 HTML 화면 안에서 동작합니다.
사용자가 애플리케이션 기능을 실행하더라도 브라우저는 화면을 통째로 갱신하지 않고 사용자에게 필요한 부분만 다시 렌더링 합니다.
SPA는 이런 방식으로 UX를 대폭 개선했습니다.

사용자가 애플리케이션의 특정 화면으로 이동하는 규칙은 라우팅 규칙(Route)으로 정의합니다.
라우팅 규칙에는 로그인하지 않았거나 권한이 없는 사용자를 막는 설정도 추가할 수 있습니다.

이 튜토리얼에서 다루는 앱이 동작하는 것을 직접 확인하려면 <live-example></live-example>를 참고하세요.


<!--
## Objectives
-->
## 목표

<!--
* Organize a sample application's features into modules.
* Define how to navigate to a component.
* Pass information to a component using a parameter.
* Structure routes by nesting several routes.
* Check whether users can access a route.
* Control whether the application can discard unsaved changes.
* Improve performance by pre-fetching route data and lazy loading feature modules.
* Require specific criteria to load components.
-->
* 애플리케이션 기능을 모듈 단위로 구성합니다.
* 컴포넌트로 이동하는 방법을 정의합니다.
* 화면을 전환하면서 컴포넌트에 인자를 전달합니다.
* 필요하다면 라우팅 규칙을 중첩해서 구성할 수 있습니다.
* 사용자가 라우팅할 수 있는지 검사합니다.
* 저장하지 않은 변경사항을 폐기할지 결정합니다.
* 라우팅 데이터를 미리 받아오거나 모듈을 지연로딩해서 성능을 개선합니다.
* 컴포넌트가 로드될 조건을 추가합니다.


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
## Create a sample application
-->
## 예제 애플리케이션 만들기

<!--
Using the Angular CLI, create a new application, _angular-router-sample_. This application will have two components: _crisis-list_ and _heroes-list_.

1. Create a new Angular project, _angular-router-sample_.

   <code-example language="sh">
   ng new angular-router-sample
   </code-example>

   When prompted with `Would you like to add Angular routing?`, select `N`.

   When prompted with `Which stylesheet format would you like to use?`, select `CSS`.

   After a few moments, a new project, `angular-router-sample`, is ready.

1. From your terminal, navigate to the `angular-router-sample` directory.

1. Create a component, _crisis-list_.

  <code-example language="sh">
   ng generate component crisis-list
  </code-example>

1. In your code editor, locate the file, `crisis-list.component.html` and replace
   the placeholder content with the following HTML.

   <code-example header="src/app/crisis-list/crisis-list.component.html" path="router-tutorial/src/app/crisis-list/crisis-list.component.html"></code-example>

1. Create a second component, _heroes-list_.

  <code-example language="sh">
   ng generate component heroes-list
  </code-example>

1. In your code editor, locate the file, `heroes-list.component.html` and replace the placeholder content with the following HTML.

   <code-example header="src/app/heroes-list/heroes-list.component.html" path="router-tutorial/src/app/heroes-list/heroes-list.component.html"></code-example>

1. In your code editor, open the file, `app.component.html` and replace its contents with the following HTML.

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="setup"></code-example>

1. Verify that your new application runs as expected by running the `ng serve` command.

  <code-example language="sh">
   ng serve
  </code-example>

1. Open a browser to `http://localhost:4200`.

   You should see a single web page, consisting of a title and the HTML of your two components.
-->
Angular CLI를 사용해서 _angular-router-sample_ 라는 이름으로 애플리케이션을 생성합니다.
이 애플리케이션에는 _crisis-list_ 와 _heroes-list_ 컴포넌트가 존재합니다.

1. _angular-router-sample_ 라는 이름으로 Angular 프로젝트를 생성합니다.

   <code-example language="sh">
   ng new angular-router-sample
   </code-example>

   `Would you like to add Angular routing?` 질문에는 `N`를 선택하세요.

   `Which stylesheet format would you like to use?` 질문에는 `CSS`를 선택하세요.

   이제 시간이 조금 지나고 나면 `angular-router-sample` 프로젝트가 생성됩니다.

1. 터미널에서 `angular-router-sample` 디렉토리로 이동합니다.

1. _crisis-list_ 컴포넌트를 생성합니다.

  <code-example language="sh">
   ng generate component crisis-list
  </code-example>

1. 에디터로 `crisis-list.component.html` 파일을 열고 이런 내용으로 변경합니다.

   <code-example header="src/app/crisis-list/crisis-list.component.html" path="router-tutorial/src/app/crisis-list/crisis-list.component.html"></code-example>

1. _heroes-list_ 컴포넌트를 생성합니다.

  <code-example language="sh">
   ng generate component heroes-list
  </code-example>

1. 에디터로 `heroes-list.component.html` 파일을 열고 이런 내용으로 변경합니다.

   <code-example header="src/app/heroes-list/heroes-list.component.html" path="router-tutorial/src/app/heroes-list/heroes-list.component.html"></code-example>

1. 에디터로 `app.component.html` 파일을 열고 이런 내용으로 변경합니다.

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="setup"></code-example>

1. `ng serve` 명령을 실행해서 애플리케이션이 제대로 동작하는지 확인합니다.

  <code-example language="sh">
   ng serve
  </code-example>

1. 브라우저를 열고 `http://localhost:4200` 주소로 이동해 보세요.

   웹 화면이 뜨면 컴포넌트 2개가 함께 표시되는 것을 확인할 수 있습니다.


<!--
## Import `RouterModule` from `@angular/router`
-->
## `@angular/router` 패키지에서 `RouterModule` 로드하기

<!--
Routing lets you display specific views of your application depending on the URL path.
To add this functionality to your sample application, you need to update the `app.module.ts` file to use the module, `RouterModule`.
You import this module from `@angular/router`.

1. From your code editor, open the `app.module.ts` file.

1. Add the following `import` statement.

  <code-example header="src/app/app.module.ts" path="router-tutorial/src/app/app.module.ts" region="router-import"></code-example>
-->
애플리케이션 화면은 URL 주소로 결정됩니다.
예제로 만드는 애플리케이션에 이런 기능을 추가하려면 `app.module.ts` 파일이 `RouterModule`을 활용하는 방식으로 수정해야 합니다.
이 모듈은 `@angular/router` 패키지로 제공됩니다.


1. 에디터로 `app.module.ts` 파일을 엽니다.

1. `import` 구문을 다음과 같이 추가합니다.

  <code-example header="src/app/app.module.ts" path="router-tutorial/src/app/app.module.ts" region="router-import"></code-example>


<!--
## Define your routes
-->
## 라우팅 규칙 정의하기

<!--
In this section, you'll define two routes:

* The route `/crisis-center` opens the `crisis-center` component.
* The route `/heroes-list` opens the `heroes-list` component.

A route definition is a JavaScript object. Each route typically has two properties. The first property, `path`, is a string
that specifies the URL path for the route. The second property, `component`, is a string that specifies
what component your application should display for that path.

1. From your code editor, open the `app.module.ts` file.

1. Locate the `@NgModule()` section.

1. Replace the `imports` array in that section with the following.

   <code-example header="src/app/app.module.ts" path="router-tutorial/src/app/app.module.ts" region="import-basic"></code-example>

This code adds the `RouterModule` to the `imports` array. Next, the code uses the `forRoot()` method of the `RouterModule` to
define your two routes. This method takes an array of JavaScript objects, with each object defining the properties of a route.
The `forRoot()` method ensures that your application only instantiates one `RouterModule`. For more information, see
[Singleton Services](/guide/singleton-services#forroot-and-the-router).
-->
이번 섹션에서는 라우팅 규칙을 2개 정의해 봅시다:

* `/crisis-center` 라우팅 규칙은 `crisis-center` 컴포넌트를 표시합니다.
* `/heroes-list` 라우팅 규칙은 `heroes-list` 컴포넌트를 표시합니다.

라우팅 규칙은 JavaScript 객체로 정의합니다.
개별 라우팅 규칙에는 프로퍼티가 2개 있는데, `path`에는 라우팅 규칙과 연결될 URL 주소를 문자열로 지정하고, `component`에는 해당 주소로 접근했을 때 표시될 컴포넌트를 지정합니다.

1. 에디터로 `app.module.ts` 파일을 엽니다.

1. `@NgModule()` 섹션을 찾습니다.

1. `imports` 배열을 이런 내용으로 수정합니다.

   <code-example header="src/app/app.module.ts" path="router-tutorial/src/app/app.module.ts" region="import-basic"></code-example>


`imports` 배열에 `RouterModule`을 추가하면서 `RouterModule` `forRoot()` 메서드를 사용해서 라우팅 규칙을 2개 정의했습니다.
`forRoot()` 메서드는 JavaScript 객체 배열을 인자로 받아서 개별 객채마다 라우팅 규칙을 정의합니다.
`forRoot()` 메서드를 실행하면 애플리케이션에 `RouterModule` 인스턴스가 전역 범위에 하나 생성됩니다.
자세한 내용은 [싱글턴 서비스](guide/singleton-services#forroot-and-the-router) 문서를 참고하세요.


<!--
## Update your component with `router-outlet`
-->
## `router-outlet` 사용하기

<!--
At this point, you have defined two routes for your application. However, your application
still has both the `crisis-list` and `heroes-list` components hard-coded in your `app.component.html` template. For your routes to
work, you need to update your template to dynamically load a component based on the URL path.

To implement this functionality, you add the `router-outlet` directive to your template file.

1. From your code editor, open the `app.component.html` file.

1. Delete the following lines.

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="components"></code-example>

1. Add the `router-outlet` directive.

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="router-outlet"></code-example>

View your updated application in your browser. You should see only the application title. To
view the `crisis-list` component, add `crisis-list` to the end of the path in your browser's
address bar. For example:

<code-example language="none">
http://localhost:4200/crisis-list
</code-example>

Notice that the `crisis-list` component displays. Angular is using the route you defined to dynamically load the
component. You can load the `heroes-list` component the same way:

<code-example language="none">
http://localhost:4200/heroes-list
</code-example>
-->
이제 애플리케이션에는 라우팅 규칙이 2개 존재합니다.
하지만  `crisis-list` 컴포넌트와 `heroes-list` 컴포넌트는 `app.component.html` 템플릿에 하드 코딩되어 있습니다.
라우팅 규칙을 제대로 활용하려면 URL 주소에 따라 컴포넌트를 동적으로 로딩하는 방식으로 변경해야 합니다.

이 기능을 구현하려면 템플릿 파일에 `router-outlet` 디렉티브를 추가하면 됩니다.

1. 에디터로 `app.component.html` 파일을 엽니다.

1. 아래 두 줄을 삭제합니다.

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="components"></code-example>

1. `router-outlet` 디렉티브를 추가합니다.

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="router-outlet"></code-example>


브라우저에서 변경된 내용을 확인해 보세요.
이제 애플리케이션에는 제목만 표시됩니다.
`crisis-list` 컴포넌트를 확인하려면 브라우저 주소표시줄 뒤에 `crisis-list`를 추가하면 됩니다:


<code-example language="none">
http://localhost:4200/crisis-list
</code-example>


`crisis-list` 컴포넌트가 표시되는지 확인해 보세요.
Angular는 라우팅 규칙에 따라 컴포넌트를 동적으로 로드합니다.
`heroes-list` 컴포넌트도 같은 방법으로 확인할 수 있습니다:


<code-example language="none">
http://localhost:4200/heroes-list
</code-example>


<!--
## Control navigation with UI elements
-->
## UI 엘리먼트로 네비게이션 조작하기

<!--
Currently, your application supports two routes. However, the only way to use those routes
is for the user to manually type the path in the browser's address bar. In this section, you'll
add two links that users can click to navigate between the `heroes-list` and `crisis-list`
components. You'll also add some CSS styles. While these styles are not required, they make
it easier to identify the link for the currently-displayed component. You'll add that functionality
in the next section.

1. Open the `app.component.html` file and add the following HTML below the title.

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="nav"></code-example>

   This HTML uses an Angular directive, `routerLink`. This directive connects the routes
   you defined to your template files.

1. Open the `app.component.css` file and add the following styles.

   <code-example header="src/app/app.component.css" path="router-tutorial/src/app/app.component.css"></code-example>


If you view your application in the browser, you should see these two links. When you click
on a link, the corresponding component appears.
-->
애플리케이션에는 라우팅 규칙이 2개 등록되어 있지만, 아직까지는 브라우저 주소표시줄에 주소를 직접 입력해야 라우팅 규칙이 동작하는 것을 확인할 수 있습니다.
이번 섹션에서는 사용자가 클릭할 수 있는 링크를 추가해서 이 링크로 `heroes-list`와 `crisis-list`를 전환해 봅시다.
링크에는 스타일도 적용할 수 있는데, 스타일을 꼭 적용해야 하는 것은 아니지만 현재 화면에 표시되고 있는 컴포넌트가 어떤 것인지 쉽게 확인하는 데에 도움이 될 것입니다.

1. `app.component.html` 파일을 열고 제목 아래 이런 내용을 추가합니다.

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="nav"></code-example>

   이 코드는 Angular `routerLink` 디렉티브를 활용합니다.
   `routerLink` 디렉티브는 라우팅 규칙과 템플릿을 연결하는 역할을 합니다.

1. `app.component.css` 파일을 열고 이런 스타일을 추가합니다.

   <code-example header="src/app/app.component.css" path="router-tutorial/src/app/app.component.css"></code-example>


이제 브라우저에서 애플리케이션을 확인하면 링크가 2개 존재하는 것을 확인할 수 있습니다.
링크를 클릭하면 해당 링크와 연결된 화면이 화면에 표시됩니다.


<!--
## Identify the active route
-->
## 활성화된 라우팅 규칙 활용하기

<!--
While users can navigate your application using the links you added in the previous section,
they don't have a straightforward way to identify what the active route is. Add this functionality
using Angular's `routerLinkActive` directive.

1. From your code editor, open the `app.component.html` file.

1. Update the anchor tags to include the `routerLinkActive` directive.

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="routeractivelink"></code-example>

View your application again. As you click one of the buttons, the style for that button updates
automatically, identifying the active component to the user. By adding the `routerLinkActive`
directive, you inform your application to apply a specific CSS class to the active route. In this
tutorial, that CSS class is `activebutton`, but you could use any class that you want.
-->
이전 섹션에 추가한 링크를 활용하면 애플리케이션에서 원하는 주소로 이동할 수 있지만, 현재 적용된 라우팅 규칙이 무엇인지는 확인하기 어렵습니다.
Angular `routerLinkActive` 디렉티브를 활용하면 현재 애플리케이션에 적용된 라우팅 규칙을 확인할 수 있습니다.

1. 에디터로 `app.component.html` 파일을 엽니다.

1. 앵커 태그에 `routerLinkActive` 디렉티브를 이렇게 추가합니다.

   <code-example header="src/app/app.component.html" path="router-tutorial/src/app/app.component.html" region="routeractivelink"></code-example>

브라우저에서 애플리케이션을 다시 확인해 보세요.
이제 버튼을 클릭하면 현재 사용자가 보고 있는 컴포넌트에 따라 버튼의 스타일이 자동으로 지정됩니다.
`routerLinkActive` 디렉티브를 활용하면 현재 적용된 라우팅 규칙이 무엇인지 사용자에게 알릴 수 있는 CSS 클래스를 적용할 수 있습니다.
이번 예제에서는 `activebutton`이라는 CSS 클래스를 적용했지만, 어느 이름이든 가능합니다.


<!--
## Adding a redirect
-->
## 리다이렉션 추가하기

<!--
In this step of the tutorial, you add a route that redirects the user to display the `/heroes-list` component.

1. From your code editor, open the `app.module.ts` file.

1. In the `imports` array, update the `RouterModule` section as follows.

   <code-example header="src/app/app.module.ts" path="router-tutorial/src/app/app.module.ts" region="import-redirect"></code-example>

   Notice that this new route uses an empty string as its path. In addition, it replaces the `component` property with two new ones:

   * `redirectTo`. This property instructs Angular to redirect from an empty path to the
     `heroes-list` path.
   * `pathMatch`. This property instructs Angular on how much of the URL to match. For this
      tutorial, you should set this property to `full`. This strategy is recommended when
      you have an empty string for a path. For more information about this property,
      see the [Route API documentation](/api/router/Route).

Now when you open your application, it displays the `heroes-list` component by default.
-->
이번 섹션에서는 `/heroes-list` 컴포넌트를 표시하도록 리다이렉트하는 라우팅 규칙을 추가해 봅시다.

1. 에디터로 `app.module.ts` 파일을 엽니다.

1. `imports` 배열의 `RouterModule` 섹션을 아래 내용으로 수정합니다.

   <code-example header="src/app/app.module.ts" path="router-tutorial/src/app/app.module.ts" region="import-redirect"></code-example>

   새로 추가한 라우팅 규칙은 `path`에 빈 문자열이 사용되었습니다.
   그리고 `component` 프로퍼티 대신 다른 프로퍼티를 사용합니다:

   * `redirectTo`: 빈 주소로 접근하면 `heroes-list` 주소로 리다이렉트하도록 지정합니다.
   * `pathMatch`: Angular가 URL을 어떻게 매칭할지 결정합니다. 이 튜토리얼에서는 `full`이 사용되었는데, 빈 주소를 매칭하려면 이 정책을 사용하는 것이 좋습니다. 자세한 내용은 [라우팅 규칙 API 문서](/api/router/Route)를 참고하세요.


이제 브라우저로 애플리케이션에 접근할 때 빈 주소를 사용하면 `heroes-list` 컴포넌트로 이동합니다.


<!--
## Adding a 404 page
-->
## 404 화면 추가하기

<!--
It is possible for a user to try to access a route that you have not defined. To account for
this behavior, the best practice is to display a 404 page. In this section, you'll create a 404 page and
update your route configuration to show that page for any unspecified routes.

1. From the terminal, create a new component, `PageNotFound`.

   <code-example language="sh">
   ng generate component page-not-found
   </code-example>

1. From your code editor, open the `page-not-found.component.html` file and replace its contents
   with the following HTML.

   <code-example header="src/app/page-not-found/page-not-found.component.html" path="router-tutorial/src/app/page-not-found/page-not-found.component.html"></code-example>

1. Open the `app.module.ts` file. In the `imports` array, update the `RouterModule` section as follows.

   <code-example header="src/app/app.module.ts" path="router-tutorial/src/app/app.module.ts" region="import-wildcard"></code-example>

   The new route uses a path, `**`. This path is how Angular identifies a wildcard route. Any route
   that does not match an existing route in your configuration will use this route.

   <div class="alert is-important">
    Notice that the wildcard route is placed at the end of the array. The order of your
    routes is important, as Angular applies routes in order and uses the first match it finds.
   </div>

Try navigating to a non-existing route on your application, such as `http://localhost:4200/powers`.
This route doesn't match anything defined in your `app.module.ts` file. However, because you
defined a wildcard route, the application automatically displays your `PageNotFound` component.
-->
개발자가 정의하지 않은 라우팅 규칙으로 사용자가 접근하는 경우가 있을 수 있습니다.
이런 경우에는 404 화면을 대신 표시하는 방법이 가장 좋습니다.
이번 섹션에서는 404 화면을 만들고 라우팅 규칙을 수정해서 정의되지 않은 주소로 접근했을 때 이 화면을 표시해 봅시다.

1. 터미널에서 `PageNotFound` 컴포넌트를 생성합니다.

   <code-example language="sh">
   ng generate component page-not-found
   </code-example>

1. 에디터로 `page-not-found.component.html` 파일을 열고 이런 내용으로 수정합니다.

   <code-example header="src/app/page-not-found/page-not-found.component.html" path="router-tutorial/src/app/page-not-found/page-not-found.component.html"></code-example>

1. `app.module.ts` 파일을 열고 이 파일의 `imports` 배열 `RouterModule` 섹션을 이런 내용으로 수정합니다.

   <code-example header="src/app/app.module.ts" path="router-tutorial/src/app/app.module.ts" region="import-wildcard"></code-example>

   `**`라는 주소로 라우팅 규칙을 추가합니다.
   이 라우팅 규칙은 와일드카드 라우팅 규칙(wildcard route)라고 하며, 라우팅 규칙에 등록되지 않은 주소는 모두 이 라우팅 규칙과 매칭됩니다.

   <div class="alert is-important">
    와일드카드 라우팅 규칙은 라우팅 규칙을 등록하는 배열 마지막에 등록해야 합니다.
    라우팅 규칙은 순서가 중요한데, Angular는 라우팅 규칙 중에서 첫 번째로 매칭되는 라우팅 규칙을 적용합니다.
   </div>


이제 `http://localhost:4200/powers`와 같이 등록되지 않은 주소로 접근해 보세요.
해당 주소와 매칭된 라우팅 규칙이 `app.module.ts` 파일에 존재하지 않지만 애플리케이션에는 와일드카드 라우팅 규칙이 등록되어 있기 때문에 자동으로 `PageNotFound` 컴포넌트가 화면에 표시됩니다.


<!--
## Next steps
-->
## 다음 단계

<!--
At this point, you have a basic application that uses Angular's routing feature to change
what components the user can see based on the URL address. You have extended these features
to include a redirect, as well as a wildcard route to display a custom 404 page.

For more information about routing, see the following topics:

* [In-app Routing and Navigation](/guide/router)
* [Router API](/api/router)
-->
이제 애플리케이션에는 라우팅 기능이 추가되었기 때문에 사용자가 접근하는 URL에 따라 미리 지정된 컴포넌트가 화면에 표시됩니다.
또 와일드카드 라우팅 규칙으로 리다이렉션하는 기능을 추가해서 커스텀 404 화면을 표시하기도 합니다.

라우터에 대해 더 알아보려면 이런 문서도 참고하세요:

* [라우팅과 네비게이션](/guide/router)
* [Router API 문서](/api/router)