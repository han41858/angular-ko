<!--
# Angular Routing
-->
# 라우팅

<!--
In a single-page app, you change what the user sees by showing or hiding portions of the display that correspond to particular components, rather than going out to the server to get a new page.
As users perform application tasks, they need to move between the different [views](guide/glossary#view "Definition of view") that you have defined.

To handle the navigation from one [view](guide/glossary#view) to the next, you use the Angular **`Router`**.
The **`Router`** enables navigation by interpreting a browser URL as an instruction to change the view.

To explore a sample app featuring the router's primary features, see the <live-example name="router"></live-example>.
-->
단일 페이지 애플리케이션(Single Page Application, SPA)에서는 화면 전체를 서버에서 받아와 갱신하지 않고, 화면의 특정 영역을 보이거나 감추는 방식으로 화면을 구성합니다.
그래서 사용자가 어떤 작업을 하려면 서로 다른 [화면](guide/glossary#view "Definition of view")을 이동해야 합니다.

Angular에서는 [화면](guide/glossary#view)을 이동할 때 **`Router`**를 사용합니다.
**`Router`**는 브라우저 URL을 해석해서 화면을 변경합니다.

라우터의 기본 동작을 직접 확인하려면 <live-example name="router"></live-example>를 확인해 보세요.


<!--
## Prerequisites
-->
## 사전지식

<!--
Before creating a route, you should be familiar with the following:

*   [Basics of components](guide/architecture-components)
*   [Basics of templates](guide/glossary#template)
*   An Angular app &mdash;you can generate a basic Angular application using the [Angular CLI](cli).
-->
라우팅 규칙을 만들기 전에 이런 내용을 미리 이해하는 것이 좋습니다:

*   [컴포넌트 기초](guide/architecture-components)
*   [템플릿 기초](guide/glossary#template)
*   Angular 앱 &mdash; [Angular CLI](cli)를 활용하면 Angular 애플리케이션을 간단하게 생성할 수 있습니다.



<!--
## Learn about Angular routing
-->
## Angular 라우팅 알아보기

<!--
<div class="card-container">
  <a href="guide/router" class="docs-card" title="Common routing tasks">
    <section>Common routing tasks</section>
    <p>Learn how to implement many of the common tasks associated with Angular routing.</p>
    <p class="card-footer">Common routing tasks</p>
  </a>
  <a href="guide/router-tutorial" class="docs-card" title="Routing SPA tutorial">
    <section>Single-page applications (SPAs) routing tutorial</section>
    <p>A tutorial that covers patterns associated with Angular routing.</p>
    <p class="card-footer">Routing SPA tutorial</p>
  </a>
  <a href="guide/router-tutorial-toh" class="docs-card" title="Routing Tour of Heroes">
    <section>Tour of Heroes expanded routing tutorial</section>
    <p>Add more routing features to the Tour of Heroes tutorial.</p>
    <p class="card-footer">Routing Tour of Heroes</p>
  </a>
  <a href="guide/routing-with-urlmatcher" class="docs-card" title="Creating custom route matches tutorial">
    <section>Creating custom route matches tutorial</section>
    <p>A tutorial that covers how to use custom matching strategy patterns with Angular routing.</p>
    <p class="card-footer">Custom route matches tutorial</p>
  </a>
  <a href="guide/router-reference" class="docs-card" title="Router reference">
    <section>Router reference</section>
    <p>Describes some core router API concepts.</p>
    <p class="card-footer">Router reference</p>
  </a>
</div>
-->
<div class="card-container">
  <a href="guide/router" class="docs-card" title="Common routing tasks">
    <section>기본 라우팅 동작</section>
    <p>Angular 라우팅으로 할 수 있는 기본 동작을 알아보세요.</p>
    <p class="card-footer">기본 라우팅 동작</p>
  </a>
  <a href="guide/router-tutorial" class="docs-card" title="Routing SPA tutorial">
    <section>단일 페이지 애플리케이션(Single-page applications, SPA) 라우팅 튜토리얼</section>
    <p>Angular 라우팅 패턴을 튜토리얼로 확인해 보세요.</p>
    <p class="card-footer">SPA 라우팅 튜토리얼</p>
  </a>
  <a href="guide/router-tutorial-toh" class="docs-card" title="Routing Tour of Heroes">
    <section>히어로들의 여행 : 라우팅 확장</section>
    <p>히어로들의 여행 튜토리얼에 라우팅 기능을 추가해 보세요.</p>
    <p class="card-footer">히어로들의 여행 라우팅</p>
  </a>
  <a href="guide/routing-with-urlmatcher" class="docs-card" title="Creating custom route matches tutorial">
    <section>커스텀 라우팅 규칙 튜토리얼</section>
    <p>커스텀 매칭 정책을 다루는 튜토리얼입니다.</p>
    <p class="card-footer">커스텀 라우팅 규칙 튜토리얼</p>
  </a>
  <a href="guide/router-reference" class="docs-card" title="Router reference">
    <section>라우터 참고</section>
    <p>라우터의 핵심 API를 확인해 보세요.</p>
    <p class="card-footer">라우터 참고</p>
  </a>
</div>


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
