<!--
<docs-decorative-header title="What is Angular?" imgSrc="adev/src/assets/images/what_is_angular.svg"> <!-- markdownlint-disable-line ->
</docs-decorative-header>
-->
<docs-decorative-header title="Angular란?" imgSrc="adev/src/assets/images/what_is_angular.svg"> <!-- markdownlint-disable-line -->
</docs-decorative-header>

<big style="margin-top: 2em">
<!--
Angular is a web framework that empowers developers to build fast, reliable applications.
-->
Angular는 개발자가 빠르고 안정적인 애플리케이션을 개발하도록 지원하는 웹 프레임워크입니다.
</big>

<!--
Maintained by a dedicated team at Google, Angular provides a broad suite of tools, APIs, and
libraries to simplify and streamline your development workflow. Angular gives you
a solid platform on which to build fast, reliable applications that scale with both the size of
your team and the size of your codebase.

**Want to see some code?** Jump over to our [Essentials](essentials) for a quick overview of
what it's like to use Angular, or get started in the [Tutorial](tutorials/learn-angular) if you
prefer following step-by-step instructions.
-->
Google의 전담팀이 관리하는 Angular는 개발 작업을 단순화하고 효율화하는 데 필요한 다양한 도구와 API, 라이브러리를 제공합니다.
Angular는 팀 규모와 코드 규모에 따라 확장 가능하고 빠르면서 안정적인 애플리케이션을 구축할 수 있는 견고한 플랫폼입니다.

**코드를 보고 싶나요?** [핵심](essentials) 문서로 이동해서 Angular를 어떻게 사용하는지 확인해 보거나, [튜토리얼](tutorials/learn-angular) 문서를 보면서 직접 단계별로 개발해 보세요.


<!--
## Features that power your development
-->
## 제공 기능

<!--
<docs-card-container>
  <docs-card title="Keep your codebase organized with an opinionated component model and flexible dependency injection
system" href="guide/components" link="Get started with Components">
  Angular components make it easy to split your code into well-encapsulated parts.

  The versatile dependency injection helps you keep your code modular, loosely-coupled, and
  testable.
  </docs-card>
  <docs-card title="Get fast state updates with fine-grained reactivity based on Signals" href="guide/signals" link="Explore Angular Signals">
  Our fine-grained reactivity model, combined with compile-time optimizations, simplifies development and helps build faster apps by default.

  Granularly track how and where state is used throughout an application, giving the framework the power to render fast updates via highly optimized instructions.
  </docs-card>
  <docs-card title="Meet your performance targets with SSR, SSG, hydration, and next-generation deferred loading" href="guide/ssr" link="Read about SSR">
    Angular supports both server-side rendering (SSR) and static site generation (SSG) along
    with full DOM hydration. `@defer` blocks in templates make it simple to declaratively divide
    your templates into lazy-loadable parts.
  </docs-card>
  <docs-card title="Guarantee everything works together with Angular's first-party modules for forms, routing, and
more">
  [Angular's router](guide/routing) provides a feature-rich navigation toolkit, including support
  for route guards, data resolution, lazy-loading, and much more.

  [Angular's forms module](guide/forms) provides a standardized system for form participation and validation.
  </docs-card>
</docs-card-container>
-->
<docs-card-container>
  <docs-card
    title="기능을 담당하는 컴포넌트 모델과 유연한 의존성 주입 시스템을 활용해서 코드를 체계적으로 정리해 보세요."
    href="guide/components"
    link="컴포넌트부터 시작하기">
  
Angular 컴포넌트를 활용하면 코드를 기능 단위로 쉽게 분리할 수 있습니다.

그리고 유연한 의존성 주입 시스템을 활용해서 코드 커플링을 줄이면서도 테스트하기 쉽게 모듈화할 수 있습니다.

</docs-card>

<docs-card
  title="시그널을 사용해서 반응형 앱을 구성하면 변경되는 앱 상테에 빠르게 반응할 수 있습니다."
  href="guide/signals"
  link="Angular 시그널 알아보기">

정교하게 설계된 반응형 모델은 컴파일 타임 최적화와 함께 개발 단계를 단순화하고 앱을 빠르게 개발하는 데 도움을 줍니다.

Angular는 애플리케이션 전역 범위에서 앱 상태가 어떻게 변경되는지, 어디에서 변경되었는지 세부적으로 추적하기 때문에, 화면 렌더링 프로세스도 최적화할 수 있습니다.

</docs-card>

<docs-card
  title="SSR, SSG, 하이드레이션, 차세대 지연 로딩을 활용해서 앱 성능 목표를 달성해 보세요."
  href="guide/ssr"
  link="SSR 가이드 확인하기">

Angular는 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 모두 지원하며, 완전한 DOM 하이드레이션도 지원합니다.
템플릿에 `@defer` 블록을 사용하면 지연 로딩되는 템플릿 부분을 간단하고 명확하게 지정할 수 있습니다.

</docs-card>

<docs-card
  title="Angular가 직접 제공하는 폼, 라우팅 등은 서로 완벽하게 호환됩니다.">

[라우터](guide/routing)는 라우팅 가드, 데이터 전달, 지연 로딩 등 다양한 네비게이션 기능을 제공합니다.

[폼 모듈](guide/forms)은 사용자에게 입력을 받고 입력받은 내용을 검증하는 표준화 시스템입니다.

</docs-card>

</docs-card-container>


<!--
## Develop applications faster than ever
-->
## 어느 때보다 빠르게 애플리케이션을 개발해 보세요.

<!--
<docs-card-container>
  <docs-card title="Effortlessly build, serve, test, deploy with Angular CLI" href="tools/cli" link="Angular CLI">
  Angular CLI gets your project running in under a minute with the commands you need to
  grow into a deployed production application.
  </docs-card>
  <docs-card title="Visually debug, analyze, and optimize your code with the Angular DevTools browser extension" href="tools/devtools" link="Angular DevTools">
  Angular DevTools sits alongside your browser's developer tools. It helps debug and analyze your
  app, including a component tree inspector, dependency injection tree view,
  and custom performance profiling flame chart.
  </docs-card>
  <docs-card title="Never miss a version with ng update" href="cli/update" link="ng update">
  Angular CLI's `ng update` runs automated code transformations that automatically handle routine
  breaking changes, dramatically simplifying major version updates. Keeping up with the latest
  version keeps your app as fast and secure as possible.
  </docs-card>
  <docs-card title="Stay productive with IDE integration in your favorite editor" href="tools/language-service" link="Language service">
  Angular's IDE language services powers code completion, navigation, refactoring, and real-time
  diagnostics in your favorite editor.
  </docs-card>
</docs-card-container>
-->
<docs-card-container>
  <docs-card
    title="Angular CLI를 활용하면 앱 실행, 빌드, 테스트, 배포가 모두 간단해 집니다."
    href="tools/cli" link="Angular CLI">

Angular CLI를 사용하면 애플리케이션 개발에 필요한 어떠한 명령도 1분 안에 실행할 수 있습니다.

  </docs-card>

  <docs-card
    title="Angular DevTools 브라우저 확장프로그램을 사용해서 코드를 시각적으로 디버깅하고 분석하며 최적화 해보세요."
    href="tools/devtools"
    link="Angular DevTools">

Angular DevTools는 브라우저 개발자 도구와 함께 사용할 수 있습니다.
컴포넌트 트리를 검사하거나, 의존성 주입 트리를 확인할 수 있고, 성능 분석을 위한 프로파일링 플레임 차트와 같은 디버깅, 분석 도구를 제공합니다.

  </docs-card>

  <docs-card
    title="ng update를 사용해서 버전 업그레이드를 놓치지 마세요."
    href="cli/update"
    link="ng update">

Angular CLI `ng update` 명령을 실행하면 Angular 버전이 변경된 것에 맞춰 코드를 자동으로 업그레이드할 수 있습니다.
최신 버전을 유지하면 앱 성능과 보안을 최신 상태로 유지할 수 있습니다.

  </docs-card>

  <docs-card
    title="자주 사용하는 IDE로 생산성을 올려보세요."
    href="tools/language-service"
    link="언어 지원 서비스">

Angular는 IDE 언어 지원 서비스를 제공하기 때문에 주요 IDE에서 코드 자동완성, 코드 탐색, 리팩토링, 실시간 진단 기능을 활용할 수 있습니다.

  </docs-card>
</docs-card-container>


<!--
## Ship with confidence
-->
## 자신있게 추천합니다.

<!--
<docs-card-container>
  <docs-card title="Verified commit-by-commit against Google's colossal monorepo" href="https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext" link="Learn about Google's monorepo">
  Every Angular commit is checked against _hundreds of thousands_ of tests in Google's internal code
  repository, representing countless real-world scenarios.

  Angular is committed to stability for some of Google’s largest products, including Google Cloud.
  This commitment ensures changes are well-tested, backwards compatible, and include migration tools
  whenever possible.
  </docs-card>
  <docs-card title="Clear support policies and predictable release schedule" href="reference/releases" link="Versioning & releasing">
  Angular's predictable, time-based release schedule gives your organization confidence in the
  stability and backwards compatibility of the framework. Long Term Support (LTS) windows make sure
  you get critical security fixes when you need them. First-party update tools, guides and automated
  migration schematics help keep your apps up-to-date with the latest advancements to the framework
  and the web platform.
  </docs-card>
</docs-card-container>
-->
<docs-card-container>
  <docs-card
    title="커밋마다 검증하는 거대한 모노레포를 Google이 관리합니다."
    href="https://cacm.acm.org/magazines/2016/7/204032-why-google-stores-billions-of-lines-of-code-in-a-single-repository/fulltext"
    link="Google 모노레포 알아보기">
Angular에 커밋되는 모든 코드는 셀 수 없이 많은 실제 시나리오를 반영하기 위해 Google 내부 코드 저장소에 있는 _수십만 개의_ 테스트로 검증합니다.

Angular는 Google Cloud와 같은 Google의 주요 제품에 사용되기 때문에 안정성을 크게 신경쓰고 있습니다.
그래서 커밋으로 수정되는 코드가 충분한 테스트를 거치고, 하위 호환성도 만족하면서, 필요하다면 마이그레이션할 수 있도록 지원합니다.
</docs-card>

<docs-card
  title="명확한 지원 정책, 예측 가능한 릴리즈 일정"
  href="reference/releases"
  link="버전 정책 & 릴리즈">

Angular는 정기적으로 새 버전을 내기 때문에 프레임워크의 안정성과 하위 호환성을 에측할 수 있습니다.
장기 지원(LTS) 기간에는 중요한 보안 패치가 계속 제공됩니다.
Angular 팀이 제공하는 자동 업데이트 툴과 가이드 문서를 참고해서 앱을 최신 상태로 유지할 수 있습니다.

</docs-card>
</docs-card-container>

<!--
## Works at any scale
-->
## 어떤 규모의 앱에도 적합합니다.

<!--
<docs-card-container>
  <docs-card title="Reach users everywhere with internationalization support" href="guide/i18n" link="Internationalization">
  Angular's internationalization features handle message translations and formatting, including
  support for unicode standard ICU syntax.
  </docs-card>
  <docs-card title="Protect your users with security by default" href="best-practices/security" link="Security">
  In collaboration with Google's world-class security engineers, Angular aims to make development
  safe by default. Built-in security features, including HTML sanitization and
  trusted type support, help protect your users from common vulnerabilities like
  cross-site scripting and cross-site request forgery.
  </docs-card>
  <docs-card title="Keep large teams productive with Vite and esbuild" href="tools/cli/build-system-migration" link="ESBuild and Vite">
  Angular CLI includes a fast, modern build pipeline using Vite and ESBuild. Developers report
  building projects with hundreds of thousands of lines of code in less than a minute.
  </docs-card>
  <docs-card title="Proven in some of Google's largest web apps">
  Large Google products build on top of Angular's architecture and help develop new features that
  further improve Angular's scalability, from [Google Fonts](https://fonts.google.com/) to [Google Cloud](https://console.cloud.google.com).
  </docs-card>
</docs-card-container>
-->
<docs-card-container>
  <docs-card
    title="전세계 사용자에게 다가가세요."
    href="guide/i18n"
    link="Internationalization">

Angular가 제공하는 국제화 기능은 유니코드 표준 ICU 구문 지원을 포함하여 메시지 번역, 서식 지정 기능을 제공합니다.

  </docs-card>

  <docs-card
    title="사용자를 보호하는 보안은 기본입니다."
    href="best-practices/security"
    link="보안">

Angular는 Google의 세계적인 보안 엔지니어들과 협력하여 보안은 기본으로 보장합니다.
HTML 검증과 강력한 타임 겁증을 포함하여 크로스 사이트 스크립팅(CSRF, cross-site scripting)과 크로스 사이트 요청 위조(CSRF, cross-site request forgery)와 같은 일반 취약점 보호도 함께 지원합니다.

  </docs-card>

  <docs-card
    title="Vite와 esbuild로 대규모 팀 생산성을 유지하세요."
    href="tools/cli/build-system-migration"
    link="ESBuild, Vite">

Angular CLI는 Vite와 ESBuild를 활용하는 최신 빌드 파이프라인을 구현했습니다.
개발자들의 보고에 따르면, 수십만줄의 코드로 이루어진 프로젝트를 빌드하는 데에 1분도 걸리지 않는다고 합니다.

  </docs-card>

  <docs-card
    title="Google의 가장 큰 웹 앱에 적용되어 있습니다.">

[Google Fonts](https://fonts.google.com/)부터 [Google Cloud](https://console.cloud.google.com)까지 다양한 Google 제품이 Angular 아키텍처를 기반으로 구축되어 Angular의 확장성과 새로운 기능 개발에 활용됩니다.

  </docs-card>
</docs-card-container>


<!--
## Open-source first
-->
## 오픈 소스 퍼스트

<!--
<docs-card-container>
  <docs-card title="Made in the open on GitHub" href="https://github.com/angular/angular" link="Star our GitHub">
  Curious what we’re working on? Every PR and commit is available on our GitHub. Run into an issue or bug? We triage GitHub issues regularly to ensure we’re responsive and engaged with our community, and solving the real world problems you’re facing.
  </docs-card>
  <docs-card title="Built with transparency" href="roadmap" link="Read our public roadmap">
  Our team publishes a public roadmap of our current and future work and values your feedback. We publish Request for Comments (RFCs) to collect feedback on larger feature changes and ensure the community voice is heard while shaping the future direction of Angular.
  </docs-card>
</docs-card-container>
-->
<docs-card-container>
  <docs-card
    title="GitHub에 공개되어 있습니다."
    href="https://github.com/angular/angular"
    link="Star our GitHub">

Angular 팀이 어떤 작업을 하고 있는지 궁금하신가요?
GitHub에서 모든 PR과 커밋을 확인할 수 있습니다.
이슈가 있거나 버그를 만나셨나요?
GitHub 이슈를 정기적으로 검토하며 커뮤니티에 빠르게 대응하면서 여러분이 직면한 실질적인 문제를 해결하고 있습니다.

  </docs-card>

  <docs-card
    title="로드맵도 투명하게 공개합니다."
    href="roadmap"
    link="로드맵을 확인해 보세요.">

Angular 팀은 현재는 물론 앞으로 작업할 로드맵을 공개하고 있으며, 이에 대한 피드백도 소중하게 여깁니다.
Angular의 향후 방향성을 정하는 과정에서 커뮤니티 의견을 수렴하기 위해 의견 요청(RPF, Request for Comments)을 게시하고 있습니다.

  </docs-card>
</docs-card-container>


<!--
## A thriving community
-->
## 방대한 커뮤니티

<!--
<docs-card-container>
  <docs-card title="Courses, blogs and resources" href="https://devlibrary.withgoogle.com/products/angular?sort=added" link="Check out DevLibrary">
  Our community is composed of talented developers, writers, instructors, podcasters, and more. The Google for Developers library is just a sample of the high quality resources available for new and experienced developers to continue developing.
  </docs-card>
  <docs-card title="Open Source" href="https://github.com/angular/angular/blob/main/CONTRIBUTING.md" link="Contribute to Angular">
  We are thankful for the open source contributors who make Angular a better framework for everyone. From fixing a typo in the docs, to adding major features, we encourage anyone interested to get started on our GitHub.
  </docs-card>
  <docs-card title="Community partnerships" href="https://developers.google.com/community/experts/directory?specialization=angular" link="Meet the Angular GDEs">
  Our team partners with individuals, educators, and enterprises to ensure we consistently are supporting developers. Angular Google Developer Experts (GDEs) represent community leaders around the world educating, organizing, and developing with Angular. Enterprise partnerships help ensure that Angular scales well for technology industry leaders.
  </docs-card>
  <docs-card title="Partnering with other Google technologies">
  Angular partners closely with other Google technologies and teams to improve the web.

  Our ongoing partnership with Chrome’s Aurora actively explores improvements to user experience across the web, developing built-in performance optimizations like NgOptimizedImage and improvements to Angular’s Core Web Vitals.

  We are also working with [Firebase](https://firebase.google.com/), [Tensorflow](https://www.tensorflow.org/), [Flutter](https://flutter.dev/), [Material Design](https://m3.material.io/), and [Google Cloud](https://cloud.google.com/) to ensure we provide meaningful integrations across the developer workflow.
  </docs-card>
</docs-card-container>
-->
<docs-card-container>
  <docs-card
    title="강좌, 블로그, 리소스"
    href="https://devlibrary.withgoogle.com/products/angular?sort=added"
    link="DevLibrary를 확인해 보세요.">

우리 커뮤니티에는 재능 넘치는 개발자, 작가, 강사, 팟캐스터들이 모여 있습니다.
Google for Developers 라이브러리는 신입 개발자와 숙련된 개발자 모두 개발에 활용할 수 있는 고품질 리소스입니다.

  </docs-card>

  <docs-card
    title="오픈 소스"
    href="https://github.com/angular/angular/blob/main/CONTRIBUTING.md"
    link="Angular에 기여하세요">

Angular를 더 나은 프레임워크로 만드는 데 기여하는 오픈 소스 컨트리뷰터 모두에게 감사드립니다.
문서의 오타 수정부터 주요한 기능 추가까지, 관심있는 분들은 GitHub에서 함께 해보세요.

  </docs-card>

  <docs-card
    title="커뮤니티 파트너십"
    href="https://developers.google.com/community/experts/directory?specialization=angular"
    link="Angular GDE들을 만나보세요">

Angular 팀은 개인은 물론, 교육자들과 기업과 협력하며 지원을 계속하고 있습니다.
Angular Google Developer Experts(GDEs)는 Angular를 사용해서 개발하고, 교육하거나 조직하는 전세계 커뮤니티 리더를 대표합니다.
또, 기술 업계 리더들을 위해 기업 파트너십을 확대하고 있습니다.

  </docs-card>

  <docs-card
    title="Google 기술과 파트너십">

Angular는 웹 생태계 개선을 위해 Google 기술, 팀과 긴밀히 협력하고 있습니다.

Chrome의 Aurora와 지속적인 파트너십을 가지며 웹 전반의 사용자 경험 개선을 적극적으로 모색하고 있으며, NgOptimizaedImage와 같은 기본 성능 최적화를 진행하면서 Angular의 Core Web Vitals 개선을 진행하고 있습니다.

그리고 [Firebase](https://firebase.google.com/), [Tensorflow](https://www.tensorflow.org/), [Flutter](https://flutter.dev/), [Material Design](https://m3.material.io/), [Google Cloud](https://cloud.google.com/)와 협력하며 개발자의 워크플로 전반에 의미있는 통합을 제공하고 있습니다.
</docs-card>
</docs-card-container>

<!--
<docs-callout title="Join the momentum!">
  <docs-pill-row>
    <docs-pill href="roadmap" title="Read Angular's roadmap"/>
    <docs-pill href="playground" title="Try out our playground"/>
    <docs-pill href="tutorials" title="Learn with tutorials"/>
    <docs-pill href="https://youtube.com/playlist?list=PL1w1q3fL4pmj9k1FrJ3Pe91EPub2_h4jF" title="Watch our YouTube course"/>
    <docs-pill href="api" title="Reference our APIs"/>
  </docs-pill-row>
</docs-callout>
-->
<docs-callout title="함께 하세요!">
  <docs-pill-row>
    <docs-pill href="roadmap" title="로드맵"/>
    <docs-pill href="playground" title="갖고 놀아보기"/>
    <docs-pill href="tutorials" title="튜토리얼"/>
    <docs-pill href="https://youtube.com/playlist?list=PL1w1q3fL4pmj9k1FrJ3Pe91EPub2_h4jF" title="YouTube 코스 확인하기"/>
    <docs-pill href="api" title="API 찾아보기"/>
  </docs-pill-row>
</docs-callout>
