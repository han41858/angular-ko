<!--
# Angular developer guides
-->
# Angular 개발자 가이드

<!--
As an application framework, Angular includes a collection of well-integrated libraries that cover a wide variety of features.

The Angular libraries include routing, forms management, client-server communication, and more.

This topic lists the various developer guides for you to learn more about these Angular features and to help you determine the correct use of each in your application.
-->
Angular는 애플리케이션 프레임워크이기 때문에 방대한 기능을 라이브러리 형태로 제공합니다.

Angular가 제공하는 라이브러리는 라우팅이나 폼 관리, 클라이언트-서버 통신 등의 기능을 제공합니다.

이 문서는 Angular가 제공하는 다양한 기능을 소개합니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
To get the most out of these developer guides, you should review the following topics:

*   [What is Angular][AioGuideWhatIsAngular]
*   [Getting started tutorial][AioStart]
*   [Understanding Angular][AioGuideUnderstandingAngularOverview]
-->
개발자 가이드를 확인하려면 이런 내용들을 먼저 이해하는 것이 좋습니다:

*   [Angular는 무엇인가][AioGuideWhatIsAngular]
*   [시작하기 튜토리얼][AioStart]
*   [Angular 이해하기][AioGuideUnderstandingAngularOverview]


<!--
## Learn about Angular's features
-->
## Angular 기능 알아보기

<!--
<div class="card-container">
  <a href="guide/routing-overview" class="docs-card" title="Routing and navigation developer guide">
    <section>Routing and Navigation</section>
    <p>Learn how to use the Angular router to handle page navigation and other tasks.</p>
    <p class="card-footer">Router</p>
  </a>
  <a href="guide/forms-overview" class="docs-card" title="Angular forms developer guide">
    <section>Forms</section>
    <p>Learn about the two approaches to forms in Angular: template-driven and reactive.</p>
    <p class="card-footer">Forms</p>
  </a>
  <a href="guide/http" class="docs-card" title="Angular HTTP client developer guide">
    <section>HTTP</section>
    <p>Learn how to connect to a server using the HTTP client service in Angular.</p>
    <p class="card-footer">HTTP client</p>
  </a>
  <a href="guide/testing" class="docs-card" title="Angular testing developer guide">
    <section>Testing</section>
    <p>Learn about tips and techniques for testing Angular applications.</p>
    <p class="card-footer">Testing</p>
  </a>
  <a href="guide/i18n-overview" class="docs-card" title="Angular internationalization developer guide">
    <section>Internationalization</section>
    <p>Learn how to localize your Angular application.</p>
    <p class="card-footer">i18n and &dollar;localize</p>
  </a>
  <a href="guide/animations" class="docs-card" title="Angular animations developer guide">
    <section>Animations</section>
    <p>Learn about how to add an animation to your Angular application.</p>
    <p class="card-footer">Animations</p>
  </a>
  <a href="guide/service-worker-intro" class="docs-card" title="Angular service worker developer guide">
    <section>Service Workers and PWA</section>
    <p>Learn about how to use a service worker to create a progressive web application.</p>
    <p class="card-footer">Service workers and PWA</p>
  </a>
  <a href="guide/web-worker" class="docs-card" title="Web Workers">
    <section>Web Workers</section>
    <p>Learn more about how to use a web worker to run a CPU-intensive computation in a background thread.</p>
    <p class="card-footer">Web Workers</p>
  </a>
  <a href="guide/universal" class="docs-card" title="Server-side rendering">
    <section>Server-side rendering</section>
    <p>Learn more about how to use Angular Universal to create a static application page.</p>
    <p class="card-footer">Server-side rendering</p>
  </a>
  <a href="guide/prerendering" class="docs-card" title="Pre-rendering">
    <section>Pre-rendering</section>
    <p>Learn about how to use pre-rendering to process a dynamic page at build time.</p>
    <p class="card-footer">Pre-rendering</p>
  </a>
</div>
-->
<div class="card-container">
  <a href="guide/routing-overview" class="docs-card" title="Routing and navigation developer guide">
    <section>라우팅, 네비게이션</section>
    <p>화면을 전환하거나 이 과정에 필요한 작업을 하려면 라우터를 사용합니다.</p>
    <p class="card-footer">라우터</p>
  </a>
  <a href="guide/forms-overview" class="docs-card" title="Angular forms developer guide">
    <section>폼</section>
    <p>Angular에서 폼을 사용하는 방법은 2가지 입니다 : 템플릿 기반 폼, 반응형 폼</p>
    <p class="card-footer">폼</p>
  </a>
  <a href="guide/http" class="docs-card" title="Angular HTTP client developer guide">
    <section>HTTP</section>
    <p>HTTP 클라이언트 서비스를 사용해서 서버와 통신하는 방법을 알아보세요.</p>
    <p class="card-footer">HTTP 클라이언트</p>
  </a>
  <a href="guide/testing" class="docs-card" title="Angular testing developer guide">
    <section>테스트</section>
    <p>Angular 애플리케이션을 테스트하는 방법을 알아보세요.</p>
    <p class="card-footer">테스트</p>
  </a>
  <a href="guide/i18n-overview" class="docs-card" title="Angular internationalization developer guide">
    <section>국제화</section>
    <p>Angular 애플리케이션에 국제화, 현지화를 적용해 보세요.</p>
    <p class="card-footer">i18n &dollar;localize</p>
  </a>
  <a href="guide/animations" class="docs-card" title="Angular animations developer guide">
    <section>애니메이션</section>
    <p>Angular 애플리케이션에 애니메이션을 적용해 보세요.</p>
    <p class="card-footer">애니메이션</p>
  </a>
  <a href="guide/service-worker-intro" class="docs-card" title="Angular service worker developer guide">
    <section>서비스 워커, PWA</section>
    <p>프로그레시브 웹 애플리케이션을 구성하기 위해 서비스 워커를 어떻게 사용하는지 알아보세요.</p>
    <p class="card-footer">서비스 워커, PWA</p>
  </a>
  <a href="guide/web-worker" class="docs-card" title="Web Workers">
    <section>웹 워커</section>
    <p>백그라운드 스레드에서 CPU 연산이 많이 필요한 작업을 하기 위해 웹 워커를 사용하는 방법을 알아보세요.</p>
    <p class="card-footer">웹 워커</p>
  </a>
  <a href="guide/universal" class="docs-card" title="Server-side rendering">
    <section>서버 사이드 렌더링</section>
    <p>정적 애플리케이션 화면을 만들기 위해 Angular Universal을 어떻게 활용하는지 알아보세요.</p>
    <p class="card-footer">서버 사이드 렌더링</p>
  </a>
  <a href="guide/prerendering" class="docs-card" title="Pre-rendering">
    <section>사전 렌더링</section>
    <p>빌드 시점에 동적 화면을 구성하는 사전 렌더링에 대해 알아보세요.</p>
    <p class="card-footer">사전 렌더링</p>
  </a>
</div>


<!-- links -->

[AioGuideUnderstandingAngularOverview]: guide/understanding-angular-overview "Understanding Angular | Angular"

[AioGuideWhatIsAngular]: guide/what-is-angular "What is Angular\? | Angular"

[AioStart]: start "Getting started with Angular | Angular"

<!-- external links -->

<!-- end links -->

@reviewed 2021-11-05
