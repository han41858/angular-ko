<!--
# Creating custom route matches
-->

<a id="creating-custom-route-matches"></a>

# 커스텀 라우팅 규칙 매칭 만들기

<!--
The Angular Router supports a powerful matching strategy that you can use to help users navigate your application.
This matching strategy supports static routes, variable routes with parameters, wildcard routes, and so on.
Also, build your own custom pattern matching for situations in which the URLs are more complicated.

In this tutorial, you'll build a custom route matcher using Angular's `UrlMatcher`.
This matcher looks for an X (formerly Twitter) handle in the URL.
-->

Angular 라우터는 사용자가 애플리케이션을 탐색할 수 있도록 강력한 매칭 전략을 지원합니다.
이 전략은 정적 라우팅 규칙, 파라미터가 있는 가변 라우팅 규칙, 와일드카드 라우팅 규칙 등을 지원합니다.
URL이 더 복잡한 경우에는 커스텀 패턴 매칭을 직접 만들 수도 있습니다.

이 튜토리얼에서는 Angular의 `UrlMatcher`로 커스텀 라우팅 규칙 매처를 만듭니다.
이 매처는 URL에서 X(이전 이름 Twitter) 사용자 이름을 찾습니다.

<!--
## Objectives
-->

<a id="objectives"></a>

## 목표

<!--
Implement Angular's `UrlMatcher` to create a custom route matcher.
-->

Angular의 `UrlMatcher`를 구현해서 커스텀 라우팅 규칙 매처를 만듭니다.

<!--
## Create a sample application
-->

<a id="create-a-sample-application"></a>

## 예제 애플리케이션 생성하기

<!--
Using the Angular CLI, create a new application, _angular-custom-route-match_.
In addition to the default Angular application framework, you will also create a _profile_ component.

1. Create a new Angular project, _angular-custom-route-match_.

   ```shell
   ng new angular-custom-route-match
   ```

   When prompted with `Would you like to add Angular routing?`, select `Y`.

   When prompted with `Which stylesheet format would you like to use?`, select `CSS`.

   After a few moments, a new project, `angular-custom-route-match`, is ready.

1. From your terminal, navigate to the `angular-custom-route-match` directory.
1. Create a component, _profile_.

   ```shell
   ng generate component profile
   ```

1. In your code editor, locate the file, `profile.html` and replace the placeholder content with the following HTML.

   <docs-code header="profile.html" path="adev/src/content/examples/routing-with-urlmatcher/src/app/profile/profile.html"/>

1. In your code editor, locate the file, `app.html` and replace the placeholder content with the following HTML.

   <docs-code header="app.html" path="adev/src/content/examples/routing-with-urlmatcher/src/app/app.html"/>
-->

Angular CLI로 *angular-custom-route-match*라는 새 애플리케이션을 생성하세요.
기본 Angular 애플리케이션 구조와 함께 _profile_ 컴포넌트도 생성합니다.

1. *angular-custom-route-match*라는 새 Angular 프로젝트를 생성하세요.

   ```shell
   ng new angular-custom-route-match
   ```

   `Would you like to add Angular routing?`이라는 질문이 나오면 `Y`를 선택하세요.

   `Which stylesheet format would you like to use?`라는 질문이 나오면 `CSS`를 선택하세요.

   잠시 후 새 프로젝트 `angular-custom-route-match`가 준비됩니다.

1. 터미널에서 `angular-custom-route-match` 디렉터리로 이동하세요.
1. _profile_ 컴포넌트를 생성하세요.

   ```shell
   ng generate component profile
   ```

1. 코드 편집기에서 `profile.html` 파일을 열고 기본 내용을 다음 HTML로 교체하세요.

   <docs-code header="profile.html" path="adev/src/content/examples/routing-with-urlmatcher/src/app/profile/profile.html"/>

1. 코드 편집기에서 `app.html` 파일을 열고 기본 내용을 다음 HTML로 교체하세요.

   <docs-code header="app.html" path="adev/src/content/examples/routing-with-urlmatcher/src/app/app.html"/>

<!--
## Configure your routes for your application
-->

<a id="configure-your-routes-for-your-application"></a>

## 애플리케이션의 라우팅 규칙 설정하기

<!--
With your application framework in place, you next need to add routing capabilities to the `app.config.ts` file.
As a part of this process, you will create a custom URL matcher that looks for an X handle in the URL.
This handle is identified by a preceding `@` symbol.

1. In your code editor, open your `app.config.ts` file.
1. Add an `import` statement for Angular's `provideRouter` and `withComponentInputBinding` as well as the application routes.

   ```ts
   import {provideRouter, withComponentInputBinding} from '@angular/router';

   import {routes} from './app.routes';
   ```

1. In the providers array, add a `provideRouter(routes, withComponentInputBinding())` statement.

1. Define the custom route matcher by adding the following code to the application routes.

   <docs-code header="app.routes.ts" path="adev/src/content/examples/routing-with-urlmatcher/src/app/app.routes.ts" region="matcher"/>

This custom matcher is a function that performs the following tasks:

- The matcher verifies that the array contains only one segment
- The matcher employs a regular expression to ensure that the format of the username is a match
- If there is a match, the function returns the entire URL, defining a `username` route parameter as a substring of the path
- If there isn't a match, the function returns null and the router continues to look for other routes that match the URL

HELPFUL: A custom URL matcher behaves like any other route definition. Define child routes or lazy loaded routes as you would with any other route.
-->

애플리케이션의 기본 구조를 준비했으면 `app.config.ts` 파일에 라우팅 기능을 추가하세요.
이 과정에서 URL의 X 사용자 이름을 찾는 커스텀 URL 매처를 만듭니다.
사용자 이름은 앞에 붙은 `@` 기호로 구별합니다.

1. 코드 편집기에서 `app.config.ts` 파일을 여세요.
1. Angular의 `provideRouter`, `withComponentInputBinding`, 애플리케이션 라우팅 규칙을 불러오는 `import` 구문을 추가하세요.

   ```ts
   import {provideRouter, withComponentInputBinding} from '@angular/router';

   import {routes} from './app.routes';
   ```

1. providers 배열에 `provideRouter(routes, withComponentInputBinding())`을 추가하세요.

1. 애플리케이션 라우팅 규칙에 다음 코드를 추가해서 커스텀 라우팅 규칙 매처를 정의하세요.

   <docs-code header="app.routes.ts" path="adev/src/content/examples/routing-with-urlmatcher/src/app/app.routes.ts" region="matcher"/>

이 커스텀 매처는 다음 작업을 수행하는 함수입니다.

- 배열에 세그먼트가 하나만 있는지 확인합니다.
- 정규표현식으로 사용자 이름의 형식이 일치하는지 확인합니다.
- 일치하면 전체 URL을 반환하고, 경로의 부분 문자열을 `username` 라우팅 규칙 파라미터로 정의합니다.
- 일치하지 않으면 null을 반환하고, 라우터는 URL과 매칭되는 다른 라우팅 규칙을 계속 찾습니다.

참고: 커스텀 URL 매처도 다른 라우팅 규칙 정의와 마찬가지로 동작합니다.
일반 라우팅 규칙처럼 자식 라우팅 규칙이나 지연 로딩 라우팅 규칙을 정의할 수 있습니다.

<!--
## Reading the route parameters
-->

<a id="reading-the-route-parameters"></a>

## 라우팅 규칙 파라미터 읽기

<!--
With the custom matcher in place, you can now bind the route parameter in the `profile` component.

In your code editor, open your `profile.ts` file and create an `input` matching the `username` parameter.
We added the `withComponentInputBinding` feature earlier
in `provideRouter`. This allows the `Router` to bind information directly to the route components.

```ts
username = input.required<string>();
```
-->

커스텀 매처를 준비했으면 `profile` 컴포넌트에 라우팅 규칙 파라미터를 바인딩할 수 있습니다.

코드 편집기에서 `profile.ts` 파일을 열고 `username` 파라미터와 일치하는 `input`을 생성하세요.
앞에서 `provideRouter`에 `withComponentInputBinding` 기능을 추가했습니다.
이 기능을 사용하면 `Router`가 라우팅 규칙 컴포넌트에 정보를 직접 바인딩할 수 있습니다.

```ts
username = input.required<string>();
```

<!--
## Test your custom URL matcher
-->

<a id="test-your-custom-url-matcher"></a>

## 커스텀 URL 매처 테스트하기

<!--
With your code in place, you can now test your custom URL matcher.

1. From a terminal window, run the `ng serve` command.

   ```shell
   ng serve
   ```

1. Open a browser to `http://localhost:4200`.

   You should see a single web page, consisting of a sentence that reads `Navigate to my profile`.

1. Click the **my profile** hyperlink.

   A new sentence, reading `Hello, Angular!` appears on the page.
-->

코드가 준비되었으면 커스텀 URL 매처를 테스트할 수 있습니다.

1. 터미널에서 `ng serve` 명령을 실행하세요.

   ```shell
   ng serve
   ```

1. 브라우저에서 `http://localhost:4200`을 여세요.

   `Navigate to my profile`이라는 문장이 있는 웹 페이지가 표시됩니다.

1. **my profile** 링크를 클릭하세요.

   페이지에 `Hello, Angular!`라는 새 문장이 표시됩니다.

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
Pattern matching with the Angular Router provides you with a lot of flexibility when you have dynamic URLs in your application.
To learn more about the Angular Router, see the following topics:

<docs-pill-row>
  <docs-pill href="guide/routing/common-router-tasks" title="In-app Routing and Navigation"/>
  <docs-pill href="api/router/Router" title="Router API"/>
</docs-pill-row>

HELPFUL: This content is based on [Custom Route Matching with the Angular Router](https://medium.com/@brandontroberts/custom-route-matching-with-the-angular-router-fbdd48665483), by [Brandon Roberts](https://x.com/brandontroberts).
-->

Angular 라우터의 패턴 매칭을 사용하면 애플리케이션의 동적 URL을 유연하게 처리할 수 있습니다.
Angular 라우터가 더 궁금하면 다음 내용을 참고하세요.

<docs-pill-row>
  <docs-pill href="guide/routing/common-router-tasks" title="애플리케이션 라우팅과 내비게이션"/>
  <docs-pill href="api/router/Router" title="라우터 API"/>
</docs-pill-row>

참고: 이 문서는 [Brandon Roberts](https://x.com/brandontroberts)의 [Custom Route Matching with the Angular Router](https://medium.com/@brandontroberts/custom-route-matching-with-the-angular-router-fbdd48665483)를 기반으로 작성했습니다.
