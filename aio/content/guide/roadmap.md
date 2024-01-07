<!--
# Angular Roadmap
-->
# Angular 로드맵

<!--
<p class="roadmap-last-updated">Last updated: 2023-10-24</p>

Angular receives many feature requests, both from inside Google and the broader open-source community.
At the same time, our list of projects contains plenty of maintenance tasks, code refactorings, and potential performance improvements.
We bring together developer relations, product management, and engineering representatives to prioritize this list.
As new projects come into the queue, we regularly position them based on relative priority to other projects.
As work gets done, projects move up in the queue.

The following projects are not associated with a particular Angular version.
We will release them on completion, and they will be part of a specific version based on our release schedule, following semantic versioning.
For example, we release features in the next minor after completion or the next major if they include breaking changes.
-->
<p class="roadmap-last-updated">최근 수정: 2023-10-24</p>

Angular는 Google 내부와 오픈 소스 커뮤니티로부터 수많은 기능 추가 요청을 받고 있습니다.
동시에 저희는 프로젝트를 유지하기 위한 작업과 코드 리팩토링, 성능 개선작업 등도 함께 수행하고 있습니다.
또, 개발자들과 소통하는 행사를 준비하기도 하고 솔루션을 관리하는 일들의 우선 순위를 정하기도 합니다.
새로 작업해야 하는 프로젝트 요청이 오면 다른 프로젝트와 비교해서 우선순위를 조정하는 경우도 있습니다.

아래 언급되는 프로젝트들이 특정 Angular 버전과 관련된 것은 아닙니다.
개발이 완료된 프로젝트는 릴리즈 일정에 맞춰 다음 마이너 버전이나 다음 메이저 버전에 들어갑니다.
기능 추가는 다음 마이너 버전에 들어가며, 큰 변동사항은 다음 메이저 버전에 들어갑니다.


<!--
## In progress
-->
## 진행중

<!--
### Improve runtime performance and developer experience with a new reactivity model
-->
### 실행 성능 개선, 새 반응형 모델 도입

<!--
This project rethinks the Angular reactivity model by introducing Signals as a reactivity primitive.
Fully implemented the project will make Zone.js optional. The initial planning resulted in hundreds of discussions, conversations with developers, feedback sessions, user experience studies, and a series of [RFCs](https://github.com/angular/angular/discussions/49685), which received over 1,000 comments.

As part of the v17 release, we graduated the Angular Signals library from developer preview. Next we’ll continue implementing the proposals from the RFC. The first steps will be introducing signal-based inputs and queries.
-->
이 프로젝트는 신호를 기본 타입으로 활용해서 Angular의 반응형 모델을 새롭게 정의하는 것이 목적입니다.
이 프로젝트가 완전히 자리잡으면 Zone.js는 필수 요소가 아니게 될 것입니다.
프로젝트 도입을 위해 수백건의 논의가 이루어지고 있으며, 개발자들의 의견을 받고, [RFCs](https://github.com/angular/angular/discussions/49685)를 통해 1,000개 이상의 논의를 이어가고 있습니다.

v17 버전이 릴리즈되면서 Angular Signal 라이브러리는 개발자 프리뷰로 도입되었습니다.
지금은 RFC로 들어오는 제안들을 구현하는 작업을 더 하고 있습니다.
신호 기반으로 입력을 받고 쿼리하는 기능부터 작업을 시작할 것으로 예상합니다.


<!--
### Ergonomic deferred loading
-->
### 자연스러운 지연 로딩

<!--
In v17 we shipped deferrable views in developer preview, which provide an ergonomic API for deferred code loading. As the next step we'll be iterating on community feedback before officially making this feature stable.
-->
v17 버전에서 지연로딩할 수 있는 뷰를 개발자 프리뷰로 도입했습니다.
이 기능을 확정하기 전까지는 커뮤니티 피드백을 참고하며 작업을 이어갈 예정입니다.


<!--
### Built-in control flow
-->
### 기본 제어 흐름

<!--
In v17 we shipped a developer preview version of a new control flow. It brings significant performance improvements and better ergonomics for template authoring. We also provided a migration of existing `*ngIf`, `*ngFor`, and `*ngSwitch` which you can run to move your project to the new implementation. As the next steps we'll be working on addressing community feedback before officially completing this project and graduating it from developer preview.
-->
v17 버전에서 새로운 제어 흐름을 개발자 프리뷰로 도입했습니다.
이 기능을 활용하면 템플릿을 더 간단하게 작성하면서도 성능이 극적으로 향상되는 것을 확인할 수 있습니다.
기존에 작업했던 `*ngIf`, `*ngFor`, `*ngSwitch`를 새로운 방식으로 마이그레이션 할 수 있는 툴도 제공합니다.
다음 단계는 개발자 프리뷰를 졸업할 때까지 커뮤니티 피드백을 받으며 작업을 마무리하는 것입니다.


<!--
### iframe support in Angular DevTools
-->
### Angular DevTools에서 iframe 지원하기

<!--
We are working on making it possible to debug and profile Angular apps embedded within an iframe on the page. This feature will allow you to select an iframe and inspect it directly within Angular DevTools.
-->
화면에 iframe 안쪽으로 Angular 앱이 들어간 경우, 이 Angular 앱을 디버깅하거나 분석할 수 있도록 작업하고 있습니다.
이 작업이 끝나고 나면 Angular DevTool에서 iframe 하나를 선택하고 그 안에 있는 Angular 앱을 디버깅할 수 있을 것입니다.


<!--
### Enabling hybrid rendering by default
-->
### 하이브리드 렌더링을 기본으로 활성화

<!--
We are working on more developer experience improvements which will allow us to enable hybrid (server-side rendering and static site generation) rendering by default for new projects. In particular, we're focused on route-level rendering strategy configuration and improving developer experience for i18n support.
-->
더 나은 개발자 경험을 위해, 새 프로젝트를 생성할 때 서버 사이드 렌더링과 정적 사이트 생성을 동시에 하는 하이브리드 렌더링을 기본으로 활성화하려고 합니다.
특히, 라우팅 계층의 렌더링 정책 설정과 i18n 지원에 중점을 두고 있습니다.


<!--
### Automation for transition of existing hybrid rendering projects to esbuild and vite
-->
### 기존에 있던 하이브리드 렌더링 프로젝트를 esbuild와 vite로 전환하기

<!--
In v17 we shipped a vite and esbuild-based application builder and enabled it for new projects by default. It improves build time for projects using hybrid rendering with up to 87%. Next, we'll be working on developing schematics that migrate existing projects using hybrid rendering to the new build pipeline.
-->
v17 버전에는 애플리케이션 빌더로 vite와 esbuild가 도입되었으며, 새로 생성하는 프로젝트에는 이 빌더들이 기본으로 사용됩니다.
그래서 하이브리드 렌더링이 적용된 프로젝트라면 최대 87%까지 빌드 시간을 줄일 수 있습니다.
다음으로 작업할 것은 하이브리드 렌더링이 적용된 프로젝트를 새로운 빌드 파이프라인으로 전환할 수 있도록 스키매틱을 개발하는 것입니다.


<!--
### Streamline standalone imports with Language Service
-->
### 언어 지원 서비스를 위한 단독 스트림라인

<!--
As part of this initiative, the language service automatically imports components and pipes in standalone and NgModule-based apps. Additionally, to enable smaller app bundles, we'll work on allowing the language service to propose the automatic removal of unused imports.
-->
이제 언어 서비스는 독립 컴포넌트나 NgModule 기반 앱에서 구성요소와 파이프를 자동으로 로드합니다.
그리고 앱 빌드 결과물의 크기를 더 줄이기 위해, 사용하지 않는 import 구문은 자동으로 제거하는 기능을 도입하려고 합니다.

<!--
### New CDK primitives
-->
### 새로운 CDK 기본 타입

<!--
We are working on new CDK primitives to facilitate creating custom components based on the WAI-ARIA design patterns for [Combobox](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox). Angular v14 introduced stable [menu and dialog primitives](https://material.angular.io/cdk/categories) as part of this project, and in v15 [Listbox](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox).
-->
Angular 팀은 [리스트 박스](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox)와 [콤보박스](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox)가 WAI-ARIA 디자인 패턴을 잘 준수할 수 있도록 개선하는 작업을 진행하고 있습니다.
이 프로젝트의 중간 결과물로 Angular 14 버전에는 [메뉴와 다이얼로그 기본 타입](https://material.angular.io/cdk/categories)이 추가되었으며, 15 버전에는 [리스트 박스](https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox)가 추가되었습니다.


<!--
### Angular component accessibility
-->
### Angular 컴포넌트 접근성

<!--
We are evaluating components in Angular Material against accessibility standards such as WCAG and working to fix any issues that arise from this process.
-->
Angular Material로 제공되는 컴포넌트가 WCAG와 같은 표준을 만족할 수 있도록 접근성을 개선하는 작업을 진행하고 있습니다.


<!--
### Investigate micro frontend architecture for scalable development processes
-->
### 확장 가능한 마이크로 프론트엔드 아키텍처 연구

<!--
We understood and defined the problem space for the past couple of quarters. As the most widely adopted solution we identified is module federation and we suggest it as an option in the rare cases when micro frontend architecture is a feasible solution. Currently, we're working with the community on providing a third-party extension for the Angular CLI via import maps that work with the new application builder, enabling a solution comparable to module federation in webpack.
-->
이 문제는 오랫동안 연구되던 것입니다.
저희가 확인한 것 중 가장 널리 도입된 방법은 모듈 페더레이션 방식이며, 따라서 저희는 마이크로 프론트엔드 아키텍처가 어려운 아주 일부 경우에 대해 이 방식을 제안합니다.
현재는 커뮤니티와 협력하며 Angular CLI를 서드 파티로 확장할 수 있는 작업을 하고 있습니다.
애플리케이션 빌더가 모듈을 로드하는 맵을 활용하거나, webpack 모듈 페더레이션 성능과 비슷한 솔루션을 만들고 있습니다.


<!--
### Token-based theming APIs
-->
### 토큰 기반의 테마 API

To provide better customization of our Angular material components and enable Material 3 capabilities, we'll be collaborating with Google's Material Design team on defining token-based theming APIs. As of Q4 2023, we're refactoring components to use the new API, finalizing the comprehensive set of tokens, and updating the Sass API based on the new tokens.

<!--
### Modernize Angular's unit testing tooling
-->
### 유닛 테스트 환경 개선

<!--
In v12, we revisited the Angular end-to-end testing experience by replacing Protractor with modern alternatives such as Cypress, Nightwatch, and Webdriver.io. Next, we'd like to tackle `ng test` to modernize Angular's unit testing experience. In Q2, we introduced experimental [Jest](https://jestjs.io/) support and [announced](https://blog.angular.io/moving-angular-cli-to-jest-and-web-test-runner-ef85ef69ceca) the transition from Karma to the [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/).
-->
Angulav 12 버전에는 기존까지 엔드 투 엔드 테스트에 사용하던 Protractor 대신 Cypress, Nightwatch, Webdriver.io와 같은 최신 기술을 도입했습니다.
지금은 `ng test` 명령으로 연결되는 작업을 진행하고 있습니다.
2분기쯤 되면 [Jest](https://jestjs.io/)를 실험적으로 도입할 수 있으며, Karma를 [웹 테스트 러너](https://modern-web.dev/docs/test-runner/overview/)로 전환하는 것에 대한 [블로그 글](https://blog.angular.io/moving-angular-cli-to-jest-and-web-test-runner-ef85ef69ceca)을 게시할 예정입니다.


<!--
## Future
-->
## 진행 예정

<!--
### Signal debugging in Angular DevTools
-->
### Angular DevTools로 Signal 디버깅하기

<!--
With the evolution of Signals in Angular, we'll be also working on a better tooling for debugging them. High on the priority list is a UI for inspecting and debugging Signal-based components.
-->
Angular에 Signal이 도입되는 큰 변화를 준비하면서, 디버깅 툴도 함께 준비하고 있습니다.
신호 기반의 컴포넌트를 검사하고 디버깅하는 UI 작업이 가장 우선순위가 높습니다.


<!--
### Improved hot-module replacement support (HMR)
-->
### 핫 모듈 교환(Hot-module replacement, HMR) 지원

<!--
In v11 we launched initial support for HMR in Angular. Having the new implementation of `ng serve` based on vite and esbuild, we'll explore more advanced HMR for templates, styles, and TypeScript code.
-->
HMR은 v11 버전부터 최초로 지원하기 시작했습니다.
이제는 `ng serve`가 vite와 esbuild를 기반으로 동작하기 때문에, 템플릿, 스타일, TypeScript 코드에 HMR을 더 활용하도록 작업할 예정입니다.


<!--
### Exploration of streamed server-side rendering
-->
### 서버 사이드 렌더링 스트림 연구

<!--
Over the past few releases we've been working on making Angular's server-side rendering story more robust. On our priority list is to explore streamed server-side rendering for zoneless application.
-->
지난 몇번의 릴리즈 동안 Angular 팀은 Angular의 서버 사이드 렌더링을 더욱 강력하게 만들기 위해 노력했습니다.
다음 작업은 zone이 제거된 애플리케이션의 서버사이드 렌더링 스트림을 연구하는 것입니다.


<!--
### Exploration of partial hydration
-->
### 부분 하이드레이션 연구

<!--
In v17 we graduated hydration from developer preview and we've been consistently observing 40-50% improvements in LCP. As the next step, we'll explore how we can partially hydrate applications using deferrable views.

As part of this effort, we'll be also evaluating the trade-offs of more fine-grained hydration and resumability. We'll share updates as we progress.
-->
하이드레이션은 v17 버전부터 개발자 프리뷰를 끝냈고, 이 기능이 정식으로 도입되면서 LCP를 기준으로 평균 40~50% 성능 개선을 확인했습니다.
다음 단계는 지연 로딩하는 뷰를 위해 부분 하이드레이션을 연구하는 것입니다.

다행히 작업이 잘 진행되면서 하이드레이션과 재사용성 사이의 장단점을 확인할 수 있었습니다.
진행상황을 곧 공유하겠습니다.


<!--
### Investigation for authoring format improvements
-->
### 저작권 개선을 위한 조사

<!--
Based on our developer surveys' results we saw there are opportunities for improving the ergonomics of the component authoring format. The first step of the process will be to gather requirements and understand the problem space in advanced to an RFC. We'll share updates as we make progress. High priority in the future work will be backward compatibility and interoperability.
-->
개발자 설문조사 결과의 일환으로, 컴포넌트 저작권 형식을 개선하려고 합니다.
그 첫단계로, RFC를 통해 요구사항을 수집하고 문제를 분석하고 있습니다.
진행상황은 수시로 공유하겠습니다.
이 프로젝트에서는 하위 호환성과 상호운용성을 보장하는 것이 가장 중요합니다.


<!--
### Ensure smooth adoption for future RxJS changes (version 8 and beyond)
-->
### RxJS 도입 지원(8 버전부터)

<!--
We want to ensure Angular developers are taking advantage of the latest capabilities of RxJS and have a smooth transition to the subsequent major releases of the framework.
For this purpose, we will explore and document the scope of the changes in v7 and beyond RxJS and plan an update strategy.
-->
Angular 팀은 RxJS의 메이저 버전이 새로 나오면 이 버전을 도입해서 최신 기능을 활용할 수 있도록 돕고 싶습니다.
그래서 Angular 7 버전부터 RxJS를 방대하게 문서로 다루고 있으며 RxJS 업그레이드 정책도 확실하게 준비했습니다.


<!--
### Support two-dimensional drag-and-drop
-->
### 2차원 드래그-앤-드롭 지원

<!--
As part of this project, we'd like to implement mixed orientation support for the Angular CDK drag and drop. This is one of the repository's most highly [requested features](https://github.com/angular/components/issues/13372).
-->
이 프로젝트는 Angular CDK 드래그&드롭을 개선하기 위한 것입니다.
Angular 레파지토리에 올라온 요구사항 중 [가장 많은 요청이 있던 기능](https://github.com/angular/components/issues/13372)입니다.

<details class="completed-details" open="true">
 <summary>
   <h2>Completed</h2>
   <span class="actions">
     <span class="action-expand">Show all</span>
     <span class="action-collapse">Hide all</span>
     <i class="material-icons expand">expand_more</i>
   </span>
 </summary>
 <div class="details-content">


<!--
### Update getting started tutorial
-->
### 시작하기 튜토리얼 갱신

<!--
*Completed Q4 2023*

Over the past two quarters, we developed a new video and textual tutorial based on standalone components. They are now launched and available on https://angular.io/start.
-->
*2023년 4분기에 완료*

반년동안 단독 컴포넌트 기반의 튜토리얼을 새롭게 준비했습니다.
지금 https://angular.io/start 를 확인해 보세요.


<!--
### Investigate modern bundlers
-->
### 모던 번들러 도입

<!--
*Completed Q4 2023*

In Angular v16, we released a developer preview of an esbuild-based builder with support for `ng build` and `ng serve`. The `ng serve` development server uses Vite and a multi-file compilation by esbuild and the Angular compiler. In v17 we graduated the build tooling from developer preview and enabled it by default for new projects.
-->
*2023년 4분기에 완료*

Angular v16 버전에는 `ng build`, `ng serve` 명령에 esbuild 기반의 번들러를 개발자 프리뷰로 도입했었습니다.
`ng serve` 개발 서버는 Vite를 사용하며 esbuild와 Angular 컴파일러를 조합하여 파일 여러개를 동시에 컴파일할 수 있습니다.
그리고 v17 버전에는 이 빌드 툴들이 개발자 프리뷰를 졸업하고 새 프로젝트를 생성할 때 기본으로 적용됩니다.


<!--
### Introduce dependency injection debugging APIs
-->
### 의존성 주입 디버깅 API

<!--
*Completed Q4 2023*

To improve the debugging utilities of Angular and Angular DevTools, we'll work on APIs that provide access to the dependency injection runtime. As part of the project, we'll expose debugging methods that allow us to explore the injector hierarchy and the dependencies across their associated providers. As of v17, we shipped a feature that enables us to plug into the dependency injection life-cycle. We also launched a visualization of the injector tree and inspection of the providers declared inside each individual node,
-->
*2023년 4분기에 완료*

Angular와 Angular DevTools의 활용도를 높이기 위해, 런타임에 의존성 주입 정보를 제공하는 API를 추가했습니다.
이 프로젝트가 진행되면서 인젝터 계층을 탐색할 수 있는 디버깅 메서드를 추가했고, 관련 프로바이더도 확인할 수 있습니다.
v17 버전에는 의존성 주입 라이프 싸이클에 직접 개입할 수 있는 기능을 추가했습니다.
인젝터 트리를 시각적으로 확인하거나 개별 인젝터에 등록된 프로바이더를 확인할 수 있는 기능도 추가했습니다.


<!--
### Improve documentation and schematics for standalone components
-->
### 단독 컴포넌트 관련 문서, 스키매틱 개선

<!--
*Completed Q4 2023*

We released a developer preview of the `ng new --standalone` schematics collection, allowing you to create apps free of NgModules. In v17 we switched the new application authoring format to standalone APIs and changed the documentation to reflect the recommendation. Additionally, we shipped schematics which support updating existing applications to standalone components, directives, and pipes. Even though NgModules will stick around for foreseeable future, we recommend you to explore the benefits of the new APIs to improve developer experience and benefit from the new features we build for them.
-->
*2023년 4분기에 완료*

`ng new --standalone` 스키매틱 컬렉션이 개발자 프리뷰로 도입되었으며, 이 스키매틱을 활용하면 NgModule이 하나도 없는 앱을 구성할 수 있습니다.
그리고 v17 버전에는 애플리케이션 전체 구성을 변경해서 단독 컴포넌트용 API를 기본으로 권장하며, 관련 문서도 수정했습니다.
기존에 이 방식이 아닌 애플리케이션을 단독 컴포넌트, 단독 디렉티브, 단독 파이프로 변환할 수 있는 스키매틱도 준비했습니다.
NgModule은 당분간 유지될 예정이지만, 새로운 방식이 얼마나 괜찮은지 시도해보는 것을 권장합니다.


<!--
### Explore hydration and server-side rendering improvements
-->
### 하이드레이션, 서버 사이드 렌더링 개선 연구

<!--
*Completed Q4 2023*

In v16, we released a developer preview of non-destructive full hydration, see the [hydration guide](guide/hydration) and the [blog post](https://blog.angular.io/whats-next-for-server-side-rendering-in-angular-2a6f27662b67) for additional information. We're already seeing significant improvements to Core Web Vitals, including [LCP](https://web.dev/lcp) and [CLS](https://web.dev/cls). In lab tests, we consistently observed 45% better LCP of a real-world app.

In v17 we launched hydration outside developer preview and did a series of improvements in the server-side rendering story, including: route discovery at runtime for SSG, up to 87% faster build times for hybrid rendered applications, prompt that enables hybrid rendering for new projects.
-->
*2023년 4분기에 완료*

v16 버전에는 비파괴적이면서 완전한 하이드레이션을 개발자 프리뷰로 추가했습니다.
자세한 내용은 [하이드레이션 가이드](guide/hydration)와 [블로그 글](https://blog.angular.io/whats-next-for-server-side-rendering-in-angular-2a6f27662b67)을 참고하세요.
저희가 실험한 바로는, LCP를 기준으로 평균 45%의 성능 향상을 확인했습니다.

v17 버전에는 하이드레이션이 개발자 프리뷰를 졸업했으며, 실행 시점의 SSG(Server-side Generation)와 같은 기능들이 개선되면서 하이브리드 렌더링되는 애플리케이션의 빌드 시간을 최대 87%까지 줄일 수 있었습니다.
이제 프로젝트를 새로 생성하면 하이브리드 렌더링이 기본으로 활성화됩니다.


<!--
### Non-destructive full app hydration
-->
### 앱 하이드레이션 확장 적용

<!--
*Completed Q2 2023*

In v16, we released a developer preview of non-destructive full hydration, which allows Angular to reuse existing DOM nodes on a server-side rendered page, instead of re-creating an app from scratch. See additional information in the [hydration guide](guide/hydration).
-->
*2023년 2분기에 완료*

Angular v16에는 서버 사이드에서 렌더링된 화면을 처음부터 다시 그리지 않고 기존 DOM 노드를 재사용할 수 있는 하이드레이션 기능을 개발자 프리뷰로 도입했습니다.
자세한 내용은 [하이드레이션 문서](guide/hydration)를 참고하세요.


<!--
### Improvements in the image directive
-->
### 이미지 디렉티브 개선

<!--
*Completed Q1 2023*

We released the Angular [image directive](https://developer.chrome.com/blog/angular-image-directive/) as stable in v15. We introduced a new fill mode feature that enables images to fit within their parent container rather than having explicit dimensions. Over the past two months, the Chrome Aurora team backported the directive to v12 and newer.
-->
*2023년 1분기에 완료*

Angular v15에 [이미지 디렉티브](https://developer.chrome.com/blog/angular-image-directive/)를 추가했습니다.
이 디렉티브에는 명시적으로 지정하지 않아도 부모 컨테이너의 크기에 맞게 이미지를 채우는 기능도 들어있습니다.
지난 2개월 동안은 Chrome Aurora 팀이 이 디렉티브 호환성을 v12 이상 버전에 적용하는 작업을 진행했습니다.


<!--
### Documentation refactoring
-->
### 문서 리팩토링

<!--
*Completed Q1 2023*

Ensure all existing documentation fits into a consistent set of content types. Update excessive use of tutorial-style documentation into independent topics. We want to ensure the content outside the main tutorials is self-sufficient without being tightly coupled to a series of guides. In Q2 2022, we refactored the [template content](https://github.com/angular/angular/pull/45897) and dependency injection. In Q1 2023, we improved the HTTP guides, and with this, we're putting the documentation refactoring project on hold.
-->
*2023년 1분기에 완료*

모든 문서가 적절한 분류로 나뉘어져 있는지 확인했습니다.
그리고 튜토리얼 형식의 문서는 별개 주제로 분리했습니다.
저희가 원하는 방향은 기본 자습서가 아닌 자습서는 다른 가이드와 엮이지 않고 단독으로도 볼 수 있도록 분리하는 것입니다.
2022년 2분기에는 [템플릿 문서](https://github.com/angular/angular/pull/45897)와 의존성 주입 문서를 리팩토링했습니다.
2023년 1분기에는 HTTP 문서까지 개선한 후에 이 프로젝트를 잠시 멈췄습니다.


<!--
### Improve image performance
-->
### 이미지 성능 개선

<!--
*Completed Q4 2022*

The [Aurora](https://web.dev/introducing-aurora/) and the Angular teams are working on the implementation of an image directive that aims to improve [Core Web Vitals](https://web.dev/vitals). We shipped a stable version of the image directive in v15.
-->
*2022년 4분기에 완료*

Angular 팀과 [Aurora](https://web.dev/introducing-aurora/)는 [웹 기본 성능](https://web.dev/vitals)을 개선하기 위해 이미지 디렉티브를 개선하고 있습니다.
이 작업은 Angular 15 버전에 반영되었습니다.


<!--
### Modern CSS
-->
### 최신 CSS

<!--
*Completed Q4 2022*

The Web ecosystem evolves constantly and we want to reflect the latest modern standards in Angular. In this project we aim to provide guidelines on using modern CSS features in Angular to ensure developers follow best practices for layout, styling, etc. We shared official guidelines for layout and as part of the initiative stopped publishing flex layout. Learn [more on our blog](https://blog.angular.io/modern-css-in-angular-layouts-4a259dca9127).
-->
*2022년 4분기에 완료*

웹 생태계는 계속해서 진화하고 있기 떄문에 Angular에도 최신 표준을 반영하기 위해 노력하고 있습니다.
이 프로젝트는 스타일과 레이아웃을 조작하는 최신 CSS 기능을 Angular에 도입하는 것이 목표입니다.
레이아웃과 관련된 공식 가이드라인을 공유했으며 flex 레이아웃도 점차 줄이려고 합니다.
자세한 내용은 [이 블로그 글](https://blog.angular.io/modern-css-in-angular-layouts-4a259dca9127)을 참고하세요.


<!--
### Support adding directives to host elements
-->
### 호스트 엘리먼트에 디렉티브 추가할 수 있도록 지원

<!--
*Completed Q4 2022*

A [long-standing feature request](https://github.com/angular/angular/issues/8785) is to add the ability to add directives to host elements. The feature lets developers augment their own components with additional behaviors without using inheritance. In v15 we shipped our directive composition API, which enables enhancing host elements with directives.
-->
*2022년 4분기에 완료*

호스트 엘리먼트에 디렉티브를 추가할 수 있는 기능은 [오래 전부터 요청받은 기능](https://github.com/angular/angular/issues/8785)이었습니다.
이제는 상속을 활용하지 않아도 호스트 엘리먼트를 확장할 수 있습니다.
Angular 15 버전에 도입된 디렉티브 컴포넌트 API를 참고하세요.


<!--
### Better stack traces
-->
### 스택 트레이스 개선

<!--
*Completed Q4 2022*

The Angular and the Chrome DevTools are working together to enable more readable stack traces for error messages. In v15 we [released improved](https://twitter.com/angular/status/1578807563017392128) relevant and linked stack traces. As a lower priority initiative, we'll be exploring how to make the stack traces friendlier by providing more accurate call frame names for templates.
-->
*2022년 4분기에 완료*

Angular 팀은 Chrome DevTools 개발자들과 협력하며 스택 트레이스와 에러 메시지 가독성 향상에 힘썼습니다.
이제 Angular 15 버전에는 [개선된 내용](https://twitter.com/angular/status/1578807563017392128)이 도입되었습니다.
우선순위는 낮아졌지만 템플릿과 관련된 스택 트레이스도 개선하기 위해 작업할 예정입니다.


<!--
### Enhanced Angular Material components by integrating MDC Web
-->
### MDC 웹과 통합하여 Angular 매터리얼 컴포넌트 개선

<!--
*Completed Q4 2022*

[MDC Web](https://material.io/develop/web) is a library created by the Google Material Design team that provides reusable primitives for building Material Design components.
The Angular team is incorporating these primitives into Angular Material.
Using MDC Web aligns Angular Material more closely with the Material Design specification, expands accessibility, improves component quality, and improves the velocity of our team.
-->
*2022년 4분기에 완료*

[MDC Web](https://material.io/develop/web)은 Google Materian Design 팀이 만든 라이브러리이며, Material Design 컴포넌트를 재사용할 수 있도록 가이드를 제공하는 것이 목적입니다.
Angular 팀은 이 작업을 Angular Material과 통합하고 있습니다.
이제 Angular Material은 MDC Web 가이드라인의 스펙과 가까워졌으며, 접근성이 향상되었고, 컴포넌트의 기능이 향상되었으며, 프레임워크 개발속도도 빨라졌습니다.


<!--
### Implement APIs for optional NgModules
-->
### 옵션 NgModule API 개선

<!--
*Completed Q4 2022*

In the process of making Angular simpler, we are working on [introducing APIs](/guide/standalone-components) that allow developers to initialize applications, instantiate components, and use the router without NgModules. Angular v14 introduces developer preview of the APIs for standalone components, directives, and pipes. In the next few quarters we'll collect feedback from developers and finalize the project making the APIs stable. As the next step we will work on improving use cases such as `TestBed`, Angular elements, etc.
-->
*Completed Q4 2022*

In the process of making Angular simpler, we are working on [introducing APIs](/guide/standalone-components) that allow developers to initialize apps, instantiate components, and use the router without NgModules. Angular v14 introduces developer preview of the APIs for standalone components, directives, and pipes. In the next few quarters we'll collect feedback from developers and finalize the project making the APIs stable. As the next step we will work on improving use cases such as `TestBed`, Angular elements, etc.


<!--
### Allow binding to protected fields in templates
-->
### 템플릿에서 `protected` 필드 바인딩

<!--
*Completed Q2 2022*

To improve the encapsulation of Angular components we enabled binding to protected members of the component instance. This way you'll no longer have to expose a field or a method as public to use it inside your templates.
-->
*2022년 2분기에 완료2*

Angular 컴포넌트의 캡슐화를 개선하기 위해 컴포넌트 인스턴스의 `protected` 멤버를 바인딩할 수 있도록 수정했습니다.
이제 템플릿에 바인딩하기 위해 컴포넌트의 멤버를 `public`으로 변경하지 않아도 됩니다.


<!--
### Publish guides on advanced concepts
-->
### 개선된 개념으로 가이드 문서 갱신

<!--
*Completed Q2 2022*

Develop and publish an in-depth guide on change detection.
Develop content for performance profiling of Angular apps.
Cover how change detection interacts with Zone.js and explain when it gets triggered, how to profile its duration, as well as common practices for performance optimization.
-->
*2022년 2분기에 완료*

변화 감지를 자세하게 분석하는 가이드 문서를 준비해서 배포했습니다.
Angular 애플리케이션의 성능을 측정하는 방법도 포함되어 있으며, Angular의 변화 감지 싸이클이 Zone.js와 어떻게 상호작용하는지, 변화 감지가 언제 실행되는지, 변화 감지가 실행되는 것을 어떻게 분석할 수 있는지, 성능을 최적화하려면 어떻게 해야 하는지 설명하는 문서를 준비했습니다.


<!--
### Rollout strict typings for `@angular/forms`
-->
### `@angular/forms`에 마이그레이션 툴 지원

<!--
*Completed Q2 2022*

In Q4 2021 we designed a solution for introducing strict typings for forms and in Q1 2022 we concluded the corresponding [request for comments](https://github.com/angular/angular/discussions/44513).
Currently, we are implementing a rollout strategy with an automated migration step that will enable the improvements for existing projects.
We are first testing the solution with more than 2,500 projects at Google to ensure a smooth migration path for the external community.
-->
*2022년 2분기에 완료*

Angular 팀은 2021년 4분기부터 폼에 엄격한 타입을 도입하는 것을 검토했고 2022년 1분기에 [이 검토안](https://github.com/angular/angular/discussions/44513)을 확정했습니다.
현재는 기존 프로젝트를 자동으로 마이그레이션할 수 있는 툴도 제공하고 있습니다.
이 프로젝트를 성공적으로 완성하기 위해 Google 내외부의 2,500개 이상의 프로젝트를 테스트했습니다.


<!--
### Remove legacy [View Engine](guide/glossary#ve)
-->
### 레거시 [View Engine](guide/glossary#ve) 제거

<!--
*Completed Q1 2022*

After the transition of all our internal tooling to Ivy is completed, we will remove the legacy View Engine for reduced Angular conceptual overhead, smaller package size, lower maintenance cost, and lower codebase complexity.
-->
*2022년 1분기에 완료*

내부 툴이 모두 Ivy로 전환되었기 때문에 기존에 사용하던 View Engine을 완전히 제거하고 있습니다.
이 작업이 끝나면 Angular의 구조도 간단해지고, 패키지 크기도 줄어들며, 유지보수 비용은 줄어들고, 코드의 복잡성도 줄어들 것입니다.

<!--
### Simplified Angular mental model with optional NgModules
-->
### Angular 개념 모델 단순화 - NgModule 생략하기

<!--
*Completed Q1 2022*

To simplify the Angular mental model and learning journey, we will be working on making NgModules optional.
This work lets developers develop standalone components and implement an alternative API for declaring the compilation scope of the component.
We kicked this project off with high-level design discussions that we captured in an [RFC](https://github.com/angular/angular/discussions/43784).
-->
*2022년 1분기에 완료*

Angular의 개념 모델을 단순화하고 입문자에게 더 쉬운 설명을 하기 위해 NgModule을 생략할 수 있도록 작업했습니다.
이제 NgModule 없이도 동작하는 컴포넌트를 구현할 수 있습니다.
논의가 이루어졌던 [문서](https://github.com/angular/angular/discussions/43784)도 확인해 보세요.


<!--
### Design strict typing for `@angular/forms`
-->
### `@angular/forms`에 업격한 타입 정의 추가

<!--
*Completed Q1 2022*

We will work on finding a way to implement stricter type checking for reactive forms with minimal backward incompatible implications.
This way, we let developers catch more issues during development time, enable better text editor and IDE support, and improve the type checking for reactive forms.
-->
*2022년 1분기에 완료*

Angular 팀은 하위 버전 호환성을 유지한 채로 반응형 폼에 강력한 타입 체크를 추가하는 방법을 찾기 위해 고심했습니다.
이제는 개발 중에도 이슈를 빠르게 확인할 수 있으며, 텍스트 에디터/IDE의 지원을 받아 강력한 타입 검사 기능을 활용할 수 있습니다.

<!--
### Improve integration of Angular DevTools with framework
-->
### Angular Devtools 통합 개선

<--
*Completed Q1 2022*

To improve the integration of Angular DevTools with the framework, we are working on moving the codebase to the [angular/angular](https://github.com/angular/angular) monorepository.
This includes transitioning Angular DevTools to Bazel and integrating it into the existing processes and CI pipeline.
-->
*2022년 1분기에 완료*

Angular DevTools를 프레임워크와 통합하여 [angular/angular](https://github.com/angular/angular) 코드저장소 하나로 합치는 작업을 마무리했습니다.
이제 Angular DevTools는 현재 Angular에서 사용하는 CI 파이프라인에 통합되었습니다.

<!--
### Launch advanced compiler diagnostics
-->
### 컴파일러 분석 기능 강화

<!--
*Completed Q1 2022*

Extend the diagnostics of the Angular compiler outside type checking.
Introduce other correctness and conformance checks to further guarantee correctness and best practices.
-->
*2022년 1분기에 완료*

Angular 컴파일러가 수행하는 타입 검사 외의 분석 기능을 강화했습니다.
더 나은 정확성과 모범 사례를 도입하기 위해 추가 검사를 도입했습니다.


<!--
### Update our e2e testing strategy
-->
### e2e 테스트 정책 변경

<!--
*Completed Q3 2021*

To ensure we provide a future-proof e2e testing strategy, we want to evaluate the state of Protractor, community innovations, e2e best practices, and explore novel opportunities.
As first steps of the effort, we shared an [RFC](https://github.com/angular/protractor/issues/5502) and worked with partners to ensure smooth integration between the Angular CLI and state-of-the-art tooling for e2e testing.
As the next step, we need to finalize the recommendations and compile a list of resources for the transition.
-->
*2021년 3분기에 완료*

앞으로도 계속 사용할 e2e 테스트 정책을 마련하기 위해 Protractor의 현재는 어떤지, 커뮤니티의 의견은 어떤지, e2e 모범 사례는 어떤 것이 있는지 방대하게 조사했습니다.
그 첫 걸음으로 저희는 [RFC](https://github.com/angular/protractor/issues/5502)를 공유하며 이 내용으로 Angular CLI와 e2e 테스트 툴간의 협력을 추진하고 있습니다.
다음 단계는 e2e 테스트에 사용할 툴을 확정하는 것입니다.

<!--
### Angular libraries use Ivy
-->
### Angular 라이브러리가 Ivy를 사용하도록 전환

<!--
*Completed Q3 2021*

Earlier in 2020, we shared an [RFC](https://github.com/angular/angular/issues/38366) for Ivy library distribution.
After invaluable feedback from the community, we developed a design of the project.
We are now investing in the development of Ivy library distribution, including an update of the library package format to use Ivy compilation, unblock the deprecation of the View Engine library format, and ngcc.
-->
*2021년 3분기에 완료*

2020년 초에 저희는 Ivy 라이브러리를 배포한다는 [RFC](https://github.com/angular/angular/issues/38366)를 공유했습니다.
그 이후로 커뮤니티에서 받은 피드백을 참고해서 프로젝트를 좀 더 진행했습니다.
이제 Angular 팀이 배포하는 라이브러리들은 Ivy로 개발되며 Ivy와 호환성을 맞추어 컴파일됩니다.
View Engine 라이브러리 형식과 ngcc는 더이상 사용하지 않습니다.


<!--
### Improve test times and debugging with automatic test environment tear down
-->
### 테스트 성능 개선, 테스트 환경 자동 초기화

<!--
*Completed Q3 2021*

To improve test time and create better isolation across tests, we want to change [`TestBed`](api/core/testing/TestBed) to automatically clean up and tear down the test environment after each test run.
-->
*2021년 3분기에 완료*

테스트에 걸리는 시간을 줄이고 테스트 스펙마다 격리된 실행 컨텍스트를 유지하기 위해 [`TestBed`](api/core/testing/TestBed)가 개별 테스트 실행 후에 실행 컨텍스트를 자동 정리하도록 개선했습니다.


<!--
### Deprecate and remove IE11 support
-->
### IE11 지원 중단

<!--
*Completed Q3 2021*

Internet Explorer 11 \(IE11\) has been preventing Angular from taking advantage of some of the modern features of the Web platform.
As part of this project we are going to deprecate and remove IE11 support to open the path for modern features that evergreen browsers provide.
We ran an [RFC](https://github.com/angular/angular/issues/41840) to collect feedback from the community and decide on next steps to move forward.
-->
*2021년 3분기에 완료*

Internet Explorer 11 \(IE11\)는 Angular가 최신 웹 플랫폼이 활용할 수 있는 기능을 제공하는 데에 방해가 되고 있었습니다.
커뮤니티 피드백은 [RFC](https://github.com/angular/angular/issues/41840)를 통해 진행되었으며 결국 저희는 IE11 지원을 완전히 끝내고 최신 브라우저 환경을 제대로 활용하기로 결정했습니다.


<!--
### Leverage ES2017+ as the default output language
-->
### 기본 언어 스펙을 ES2017+ 로 변경

<!--
*Completed Q3 2021*

Supporting modern browsers lets us take advantage of the more compact, expressive, and performant new syntax of JavaScript.
As part of this project we will investigate what the blockers are to moving forward with this effort, and take the steps to enable it.
-->
*2021년 3분기에 완료*

최신 브라우저에서는 더 간단한 코드로도 더 간결하고 성능 좋은 JavaScript 문법을 활용할 수 있습니다.
이제 Angular에서도 최신 문법을 활용할 수 있습니다.

<!--
### Accelerated debugging and performance profiling with Angular DevTools
-->
### Angular Devtools로 디버깅하기, 성능 분석하기

<!--
*Completed Q2 2021*

We are working on development tooling for Angular that provides utilities for debugging and performance profiling.
This project aims to help developers understand the component structure and the change detection in an Angular app.
-->
*2021년 2분기에 완료*

Angular 애플리케이션을 디버깅하거나 성능을 분석할 때 활용할 툴을 준비했습니다.
이 툴을 활용하면 컴포넌트 구조를 쉽게 이해할 수 있고 Angular 애플리케이션의 변화 감지도 분석하기 쉬워집니다.



<!--
### Streamline releases with consolidated Angular versioning & branching
-->
### Angular 버전 정책, 브랜치 정책 통합 & 간소화

<!--
*Completed Q2 2021*

We want to consolidate release management tooling between the multiple GitHub repositories for Angular \([angular/angular](https://github.com/angular/angular), [angular/angular-cli](https://github.com/angular/angular-cli), and [angular/components](https://github.com/angular/components)\).
This effort lets us reuse infrastructure, unify and simplify processes, and improve the reliability of our release process.
-->
*2021년 2분기에 완료*

저희는 GitHub 코드저장소 여러 곳([angular/angular](https://github.com/angular/angular), [angular/angular-cli](https://github.com/angular/angular-cli), [angular/components](https://github.com/angular/components))에
Angular 구성요소를 배포하고 있습니다.
이 작업이 마무리되면서 기존에 있던 인프라 구조를 재사용할 수 있게 되었고, 배포 프로세스를 통합하면서 간소화하고, 안정성을 개선했습니다.


<!--
### Higher developer consistency with commit message standardization
-->
### 커밋 메시지 표준 개선

<!--
*Completed Q2 2021*

We want to unify commit message requirements and conformance across Angular repositories \([angular/angular](https://github.com/angular/angular), [angular/components](https://github.com/angular/components), and [angular/angular-cli](https://github.com/angular/angular-cli)\) to bring consistency to our development process and reuse infrastructure tooling.
-->
*2021년 2분기에 완료*

여러 Angular 코드 저장소([angular/angular](https://github.com/angular/angular), [angular/components](https://github.com/angular/components), [angular/angular-cli](https://github.com/angular/angular-cli))들 간에 일관된 커밋 메시지를 작성할 수 있도록 개선하면서 개발 프로세스를 통합하고 기존에 있던 인프라 구조를 재사용하기 좋게 만들었습니다.


<!--
### Transition the Angular language service to Ivy
-->
### Angular 언어 지원 서비스를 Ivy로 전환

<!--
*Completed Q2 2021*

The goal of this project is to improve the experience and remove legacy dependency by transitioning the language service to Ivy.
Today the language service still uses the View Engine compiler and type checking, even for Ivy apps.
We want to use the Ivy template parser and improved type checking for the Angular Language service to match app behavior.
This migration is also a step towards unblocking the removal of View Engine, which will simplify Angular, reduce the npm package size, and improve the maintainability of the framework.
-->
*2021년 2분기에 완료*

이 프로젝트의 목표는 언어 지원 서비스를 Ivy로 완전히 전환해서 개발 경험을 개선하고 레거시 의존성을 제거하는 것이었습니다.
이전까지는 Ivy 애플리케이션에서도 View Engine 컴파일러를 사용하는 언어 지원 서비스로 타입을 검사했습니다.
이제는 Ivy 템플릿 파서를 활용하며 애플리케이션에서 사용하는 것과 같은 컴파일러를 활용하는 Angular 언어 지원 서비스로 타입을 검사합니다.
이 작업이 완료되면서 View Engine을 제거하는 것에 걸림돌이 없어졌고, Angular를 좀 더 간단하게 유지하면서 npm 패키지 크기를 줄였고 프레임워크의 유지보수성도 향상시켰습니다.

<!--
### Increased security with native Trusted Types in Angular
-->
### 네이티브 Trusted Types로 보안 강화하기

<!--
*Completed Q2 2021*

In collaboration with the Google security team, we are adding support for the new [Trusted Types](https://web.dev/trusted-types) API.
This web platform API helps developers build more secure web apps.
-->
*2021년 2분기에 완료*

Google 보안 팀과 함께 작업한 결과, 새로운 [Trusted Types](https://web.dev/trusted-types) API를 지원하게 되었습니다.
이제 Angular API를 활용해서 더 안전한 웹 애플리케이션을 만들 수 있습니다.


<!--
### Optimized build speed and bundle sizes with Angular CLI webpack 5
-->
### Angular CLI webpack 5를 활용해서 빌드 속도, 빌드 결과물 크기 개선하기

<!--
*Completed Q2 2021*

As part of the v11 release, we introduced an opt-in preview of webpack 5 in the Angular CLI.
To ensure stability, we will continue iterating on the implementation to enable build speed and bundle size improvements.
-->
*2021년 2분기에 완료*

11버전 릴리즈와 함께 Angular CLI가 활용하는 webpack 버전을 5 preview로 변경했습니다.
안정성과 빌드 속도가 향상되었으며 빌드 결과물의 용량도 줄어들었습니다.


<!--
### Faster apps by inlining critical styles in Universal apps
-->
### Universal 애플리케이션에 초기 인라인 스타일을 내장하면서 속도 향상

<!--
*Completed Q1 2021*

Loading external stylesheets is a blocking operation, which means that the browser cannot start rendering your app until it loads all the referenced CSS.
Having render-blocking resources in the header of a page can significantly impact its load performance, for example, its [first contentful paint](https://web.dev/first-contentful-paint).
To make apps faster, we have been collaborating with the Google Chrome team on inlining critical CSS and loading the rest of the styles asynchronously.
-->
*2021년 1분기에 완료*

외부 스타일시트를 불러오는 것은 메인 스레드를 막는 작업이기 때문에, 브라우저는 외부 CSS를 로드하기 전까지 애플리케이션 렌더링을 시작할 수 없습니다.
이렇게 렌더링을 막는 리소스 요청은 초기 로드 성능에 큰 문제가 되었으며, 특히 [첫 번째 의미있는 페인팅](https://web.dev/first-contentful-paint/)인 경우에 특히 그랬습니다.
이제 애플리케이션을 빠르게 실행하기 위해 GooGle Chrome 팀과 협력하면서 중요한 CSS를 내장하고 나머지 스타일은 비동기 로드하는 방식으로 개선했습니다.


<!--
### Improve debugging with better Angular error messages
-->
### Angular 에러 메시지 개선

<!--
*Completed Q1 2021*

Error messages often bring limited actionable information to help developers resolve them.
We have been working on making error messages more discoverable by adding associated codes, developing guides, and other materials to ensure a smoother debugging experience.
-->
*2021년 1분기에 완료*

에러 메시지는 개발자가 문제를 해결하는 데에 도움이 되는 정보를 제공해야 합니다.
그래서 저희는 어떤 코드가 문제인지, 어떤 문서를 확인하면 좋은지 제공하는 방식으로 에러 메시지를 개선했습니다.


<!--
### Improved developer onboarding with refreshed introductory documentation
-->
### 입문자용 가이드 문서 개선

<!--
*Completed Q1 2021*

We will redefine the user learning journeys and refresh the introductory documentation.
We will clearly state the benefits of Angular, how to explore its capabilities and provide guidance so developers can become proficient with the framework in as little time as possible.
-->
*2021년 1분기에 완료*

입문자용 가이드 문서를 새로 정리했습니다.
이전보다 Angular의 장점을 이해하기 쉽게 풀어냈고, 적은 시간을 들여도 Angular가 제공하는 기능을 쉽게 알아볼 수 있도록 개선했습니다.


<!--
### Expand component harnesses best practices
-->
### 컴포넌트 하네스 모범사례 추가

<!--
*Completed Q1 2021*

Angular CDK introduced the concept of [component test harnesses](https://material.angular.io/cdk/test-harnesses) to Angular in version 9.
Test harnesses let component authors create supported APIs for testing component interactions.
We are continuing to improve this harness infrastructure and clarifying the best practices around using harnesses.
We are also working to drive more harness adoption inside of Google.
-->
*2021년 1분기에 완료*

Angular CDK는 9버전부터 [컴포넌트 테스트 하네스](https://material.angular.io/cdk/test-harnesses)라는 개념을 도입했습니다.
테스트 하네스를 활용하면 컴포넌트를 만드는 개발자가 테스트 기능과 상호작용하는 데에 도움이 됩니다.
저희는 이 하네스 구조를 나은 방향으로 개선하면서 모범 사례를 더 찾을 수 있도록 노력하고 있습니다.
이렇게 만든 테스트 하네스는 Google 내부에서 활용할 계획도 갖고 있습니다.


<!--
### Author a guide for content projection
-->
### 컨텐츠 프로젝션 가이드 문서 추가

<!--
*Completed Q2 2021*

Content projection is a core Angular concept that does not have the presence it deserves in the documentation.
As part of this project we want to identify the core use cases and concepts for content projection and document them.
-->
*2021년 2분기에 완료*

컨텐츠 프로젝션은 Angular의 핵심 기능이었지만 아직 문서가 제공되지 않았습니다.
이번 프로젝트를 진행하면서 기본 활용방법을 설명하고 개념을 자세하게 설명하는 문서를 추가했습니다.


<!--
### Migrate to ESLint
-->
### ESLint 마이그레이션

<!--
*Completed Q4 2020*

With the deprecation of TSLint we will be moving to ESLint.
As part of the process, we will work on ensuring backward compatibility with our current recommended TSLint configuration, implement a migration strategy for existing Angular apps and introduce new tooling to the Angular CLI toolchain.
-->
*2020년 4분기에 완료*

TSLint 지원이 중단됨에 따라 Angular도 ESLint로 Lint 툴을 변경했습니다.
이 과정에서 하위 호환성을 맞추기 위해 현재 권장하는 TSLint 설정을 정리했으며, 마이그레이션 정책을 제공하면서 새로운 툴을 Angular CLI 툴체인 안으로 자연스럽게 도입했습니다.


<!--
### Operation Bye Bye Backlog (also known as Operation Byelog)
-->
### 백로그 정리 작업 (aka. Byelog 프로젝트))

<!--
*Completed Q4 2020*

We are actively investing up to 50% of our engineering capacity on triaging issues and PRs until we have a clear understanding of broader community needs.
After that, we will commit up to 20% of our engineering capacity to keep up with new submissions promptly.
-->
*2020년 4분기에 완료*

저희는 광범위한 커뮤니티 요구사항을 명확하게 이해하기 위해 이슈와 PR을 분류하는 데에 엔지니어링 역량의 50% 정도를 적극적으로 투자하고 있습니다.
이제는 새로운 작업을 더 빠르게 처리하기 위해 엔지니어링 역량을 20% 더 투자하려는 계획을 갖고 있습니다.


 </div>
</details>

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2023-05-03
