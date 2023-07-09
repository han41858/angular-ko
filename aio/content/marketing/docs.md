<!--
<h1 class="no-toc">Introduction to the Angular docs</h1>
-->
<h1 class="no-toc">Angular 가이드문서 소개</h1>

<!--
Angular is an application-design framework and development platform for creating efficient and sophisticated single-page apps.

These Angular docs help you learn and use the Angular framework and development platform, from your first application to optimizing complex single-page applications for enterprises.
Tutorials and guides include downloadable examples to help you start your projects.

<div class="card-container">
  <a href="tutorial/first-app" class="docs-card" title="Work through a full tutorial">
    <section>Build your first Angular app</section>
    <p>Work through a full tutorial to create your first application.</p>
    <p class="card-footer">Homes App Tutorial</p>
  </a>
  <a href="guide/what-is-angular" class="docs-card" title="Angular Platform Overview">
    <section>What is Angular</section>
    <p>Get a high-level overview of the Angular platform.</p>
    <p class="card-footer">Platform overview</p>
  </a>
  <a href="guide/architecture" class="docs-card" title="Angular Concepts">
    <section>Learn and Explore</section>
    <p>Learn about the fundamental design concepts and architecture of Angular applications.</p>
    <p class="card-footer">Introduction to Angular concepts</p>
  </a>
  <a href="guide/setup-local" class="docs-card" title="Angular Local Environment Setup">
    <section>Set up your environment</section>
    <p>Set up your local environment for development with the Angular CLI.</p>
    <p class="card-footer">Local setup</p>
  </a>
</div>
-->
Angular는 단일 페이지 애플리케이션을 효율적이고 체계적으로 만들기 위해 개발된 프레임워크이자 개발 플랫폼입니다.

Angular 가이드 문서는 프로토타입부터 대규모 기업용 앱에도 활용할 수 있는 Angular 플랫폼과 프레임워크에 대해 소개합니다.
튜토리얼과 가이드문서에서 설명하는 예제 코드는 다운받아 로컬 환경에서 직접 실행해 볼 수 있습니다.

<div class="card-container">
  <a href="tutorial/first-app" class="docs-card" title="Work through a full tutorial">
    <section>Angular 앱 구성하기</section>
    <p>첫번째 애플리케이션을 어떻게 만드는지 쭉 확인해 보세요.</p>
    <p class="card-footer">Homes 앱 튜토리얼</p>
  </a>
  <a href="guide/what-is-angular" class="docs-card" title="Angular Platform Overview">
    <section>Angular란 무엇인가</section>
    <p>Angular 플랫폼이 어떤 것인지 확인해 보세요.</p>
    <p class="card-footer">플랫폼 개요</p>
  </a>
  <a href="guide/architecture" class="docs-card" title="Angular Concepts">
    <section>가이드문서 학습하기</section>
    <p>Learn about the fundamental design concepts and architecture of Angular applications.</p>
    <p class="card-footer">Angular 개요</p>
  </a>
  <a href="guide/setup-local" class="docs-card" title="Angular Local Environment Setup">
    <section>개발환경 구성하기</section>
    <p>Angular CLI로 로컬 개발환경을 구성해 보세요.</p>
    <p class="card-footer">로컬 개발환경 설정하기</p>
  </a>
</div>


<!--
## Assumptions
-->
## 사전지식

<!--
These docs assume that you are already familiar with [HTML](https://developer.mozilla.org/docs/Learn/HTML/Introduction_to_HTML "Learn HTML"), [CSS](https://developer.mozilla.org/docs/Learn/CSS/First_steps "Learn CSS"), [JavaScript](https://developer.mozilla.org/docs/Web/JavaScript/A_re-introduction_to_JavaScript "Learn JavaScript"),
and some of the tools from the [latest standards](https://developer.mozilla.org/docs/Web/JavaScript/Language_Resources "Latest JavaScript standards"), such as [classes](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes "ES2015 Classes") and [modules](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import "ES2015 Modules").
The code samples are written using [TypeScript](https://www.typescriptlang.org/ "TypeScript").
Most Angular code can be written with just the latest JavaScript, using [types](https://www.typescriptlang.org/docs/handbook/classes.html "TypeScript Types") for dependency injection, and using [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html "Decorators") for metadata.
-->
이 문서는 [HTML](https://developer.mozilla.org/docs/Learn/HTML/Introduction_to_HTML "Learn HTML"), [CSS](https://developer.mozilla.org/docs/Learn/CSS/First_steps "Learn CSS"), [JavaScript](https://developer.mozilla.org/docs/Web/JavaScript/A_re-introduction_to_JavaScript "Learn JavaScript"), 그리고 [클래스](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes "ES2015 Classes")나 [모듈](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import "ES2015 Modules") 같은 [JavaScript 최신 표준](https://developer.mozilla.org/docs/Web/JavaScript/Language_Resources "Latest JavaScript standards")에 이미 익숙한 분을 대상으로 합니다.
예제 코드는 모두 [TypeScript](https://www.typescriptlang.org/ "TypeScript")로 작성되었습니다.
Angular 코드는 일반적으로 최신 JavaScript 스펙을 바탕으로 [타입 시스템](https://www.typescriptlang.org/docs/handbook/classes.html "TypeScript Types")을 활용해서 의존성을 주입하며, [데코레이터](https://www.typescriptlang.org/docs/handbook/decorators.html "Decorators")를 활용해서 메타데이터를 지정합니다.


<!--
## Feedback
-->
## 피드백

<!-- vale Angular.Google_We = NO -->

<!--
We want to hear from you. [Report problems or submit suggestions for future docs](https://github.com/angular/angular/issues/new/choose "Angular GitHub repository new issue form").

Contribute to Angular docs by creating
[pull requests](https://github.com/angular/angular/pulls "Angular Github pull requests")
on the Angular GitHub repository.
See [Contributing to Angular](https://github.com/angular/angular/blob/main/CONTRIBUTING.md "Contributing guide")
for information about submission guidelines.

Our community values respectful, supportive communication.
Please consult and adhere to the [Code of Conduct](https://github.com/angular/code-of-conduct/blob/main/CODE_OF_CONDUCT.md "Contributor code of conduct").
-->
저희는 개발자분들의 의견을 듣고 싶습니다.
문제가 있거나 문서에 반영하고 싶은 내용이 있다면 [이곳](https://github.com/angular/angular/issues/new/choose "Angular GitHub repository new issue form")에 올려주세요.

Angular Github 코드 저장소에 [풀 리퀘스트](https://github.com/angular/angular/pulls "Angular Github pull requests")로 Angular 가이드 문서에 직접 기여할 수도 있습니다.
가이드라인에 대해 자세하게 알아보려면 [Angular에 기여하기](https://github.com/angular/angular/blob/main/CONTRIBUTING.md "Contributing guide") 문서를 참고하세요.

Angular 커뮤니티는 활발하게 운영되고 있으며, 문제가 생겼을 때 커뮤니티에서 지원을 받을 수도 있습니다.
[커뮤니티 활동 가이드](https://github.com/angular/code-of-conduct/blob/main/CODE_OF_CONDUCT.md "Contributor code of conduct")를 준수하며 Angular 커뮤니티에 참여해보세요.

<!-- vale Angular.Google_We = YES -->
