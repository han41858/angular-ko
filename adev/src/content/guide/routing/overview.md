<!--
<docs-decorative-header title="Angular Routing" imgSrc="adev/src/assets/images/routing.svg"> <!- markdownlint-disable-line ->
Routing helps you change what the user sees in a single-page app.
</docs-decorative-header>

Angular Router (`@angular/router`) is the official library for managing navigation in Angular applications and a core part of the framework. It is included by default in all projects created by Angular CLI.
-->

<docs-decorative-header title="Angular 라우팅" imgSrc="adev/src/assets/images/routing.svg"> <!-- markdownlint-disable-line -->
라우팅은 싱글 페이지 애플리케이션에서 사용자에게 표시할 내용을 바꾸는 기능입니다.
</docs-decorative-header>

Angular 라우터(`@angular/router`)는 Angular 애플리케이션의 내비게이션을 관리하는 공식 라이브러리이며, 프레임워크의 핵심 구성 요소입니다.
Angular CLI로 생성한 모든 프로젝트에 기본으로 포함됩니다.

<!--
## Why is routing necessary in a SPA?
-->

<a id="why-is-routing-necessary-in-a-spa"></a>

## SPA에 라우팅이 필요한 이유

<!--
When you navigate to a URL in your web browser, the browser normally makes a network request to a web server and displays the returned HTML page. When you navigate to a different URL, such as clicking a link, the browser makes another network request and replaces the entire page with a new one.

A single-page application (SPA) differs in that the browser only makes a request to a web server for the first page, the `index.html`. After that, a client-side router takes over, controlling which content displays based on the URL. When a user navigates to a different URL, the router updates the page's content in place without triggering a full-page reload.
-->

웹 브라우저에서 URL로 이동하면 일반적으로 브라우저가 웹 서버에 네트워크 요청을 보내고, 반환된 HTML 페이지를 표시합니다.
링크를 클릭하는 등 다른 URL로 이동하면 브라우저가 다시 네트워크 요청을 보내고 전체 페이지를 새 페이지로 교체합니다.

싱글 페이지 애플리케이션(SPA)은 첫 페이지인 `index.html`을 가져올 때만 브라우저가 웹 서버에 페이지를 요청한다는 점이 다릅니다.
그 이후에는 클라이언트 라우터가 URL을 기준으로 표시할 내용을 제어합니다.
사용자가 다른 URL로 이동하면 라우터가 전체 페이지를 다시 로드하지 않고 현재 페이지의 내용을 갱신합니다.

<!--
## How Angular manages routing
-->

<a id="how-angular-manages-routing"></a>

## Angular의 라우팅 관리 방식

<!--
Routing in Angular is comprised of three primary parts:

1. **Routes** define which component displays when a user visits a specific URL.
2. **Outlets** are placeholders in your templates that dynamically load and render components based on the active route.
3. **Links** provide a way for users to navigate between different routes in your application without triggering a full page reload.

In addition, the Angular Routing library offers additional functionality such as:

- Nested routes
- Programmatic navigation
- Route params, queries and wildcards
- Activated route information with `ActivatedRoute`
- View transition effects
- Navigation guards
-->

Angular 라우팅은 크게 세 가지로 구성됩니다.

1. **라우팅 규칙**은 사용자가 특정 URL에 방문했을 때 표시할 컴포넌트를 정의합니다.
2. **아웃렛**은 활성 라우팅 규칙을 기준으로 컴포넌트를 동적으로 로드하고 렌더링할 위치를 템플릿에 지정합니다.
3. **링크**는 전체 페이지를 다시 로드하지 않고 애플리케이션의 여러 라우팅 규칙 사이를 이동하는 수단입니다.

Angular 라우팅 라이브러리는 다음 기능도 제공합니다.

- 중첩 라우팅 규칙
- 코드로 실행하는 내비게이션
- 라우팅 규칙 파라미터, 쿼리, 와일드카드
- `ActivatedRoute`로 확인하는 활성 라우팅 규칙 정보
- 뷰 전환 효과
- 내비게이션 가드

<!--
## Next steps
-->

<a id="next-steps"></a>

## 다음 단계

<!--
Learn about how you can [define routes using Angular router](/guide/routing/define-routes).
-->

[Angular 라우터로 라우팅 규칙을 정의하는 방법](/guide/routing/define-routes)을 알아보세요.
