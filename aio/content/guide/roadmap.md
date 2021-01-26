<!--
# Angular Roadmap
-->
# Angular 로드맵

<!--
Angular receives a large number of feature requests, both from inside Google and from the broader open-source community. At the same time, our list of projects contains plenty of maintenance tasks, code refactorings, potential performance improvements, and so on. We bring together representatives from developer relations, product management, and engineering to prioritize this list. As new projects come into the queue, we regularly position them based on relative priority to other projects. As work gets done, projects will move up in the queue.

The projects below are not associated with a particular Angular version. We'll release them on completion, and they will be part of a specific version based on our release schedule, following semantic versioning. For example, features are released in the next minor after they are complete, or the next major if they include breaking changes.
-->
Angular는 Google 내부에서와 오픈 소스 커뮤니티로부터 수많은 기능 추가 요청을 받고 있습니다.
동시에 저희는 프로젝트를 유지하기 위한 작업과 코드 리팩토링, 성능 개선작업 등도 함께 수행하고 있습니다.
또, 개발자들과 소통하는 행사를 준비하기도 하고 솔루션을 관리하는 일들의 우선 순위를 정하기도 합니다.
새로 작업해야 하는 프로젝트 요청이 오면 다른 프로젝트와 비교해서 우선순위를 조정하는 경우도 있습니다.

아래 언급되는 프로젝트들이 특정 Angular 버전과 관련된 것은 아닙니다.
개발이 완료된 프로젝트는 릴리즈 일정에 맞춰 다음 마이너 버전이나 다음 메이저 버전에 들어갑니다.


<!--
## In Progress
-->
## 진행중

<!--
### Faster apps by inlining critical styles in Universal applications
-->
### Universal 애플리케이션의 주요 스타일을 인라인으로 내장해서 속도 향상

<!--
Loading external stylesheets is a blocking operation, which means that the browser can’t start rendering your application until it loads all the referenced CSS. Having render-blocking resources in the header of a page can significantly impact its load performance, for example, its [first contentful paint](https://web.dev/first-contentful-paint/). To make apps faster, we’ve been collaborating with the Google Chrome team on inlining critical CSS and loading the rest of the styles asynchronously.
-->
외부 스타일 파일을 불러오는 작업은 메인 스레드 실행을 막기 때문에 브라우저가 스타일 파일을 모두 로드할 때까지 렌더링을 시작할 수 없습니다.
그래서 렌더링을 막는 리소스들이 페이지 헤더에 추가되면 초기 실행 성능을 크게 저하시킵니다.
[컨텐츠가 처음 표시되는 시점](https://web.dev/first-contentful-paint/)에 대한 문서를 확인해 보세요.
그래서 Angular 팀은 애플리케이션을 빠르게 실행하기 위해 Google Chrome 팀과 협력해서 주요 CSS를 인라인으로 내장하고 나머지 스타일은 비동기로 로드하는 방식으로 개선하고 있습니다.


<!--
### Improve debugging with better Angular error messages
-->
### 디버깅 개선하기 - 더 나은 에러 메시지 도입

<!--
Error messages often bring limited actionable information to help developers resolve them. We’ve been working on making error messages more discoverable by adding associated codes, developing guides, and other materials to ensure a smoother debugging experience.
-->
에러 메시지에 전달되는 정보만으로는 문제를 해결할 수 없는 상황이 종종 있습니다.
Angular 팀은 디버깅을 더 효율적으로 진행할 수 있도록 관련 코드를 추가하고, 가이드 문서를 보강하며, 다른 방법도 활용할 수 있는지 검토하고 있습니다.


<!--
### Revamp performance dashboards to detect regressions
-->
### 성능 측정용 대시보드 개선

<!--
We have a set of benchmarks that we run against every code change to ensure Angular aligns with our performance standards. To ensure the framework’s runtime does not regress after a code change, we need to refine some of the existing infrastructure the dashboards step on.
-->
Angular 팀은 Angular 코드가 변경될 때마다 목표 성능을 유지하기 위해 벤치마크를 진행하고 있습니다.
코드가 변경되더라도 프레임워크 실행 속도가 떨어져서는 안되며, 이 과정을 관리하는 대시보드도 함께 개선하고 있습니다.


<!--
### Update our e2e testing strategy
-->
### e2e 테스트 정책 업데이트

<!--
To ensure we provide a future-proof e2e testing strategy, we want to evaluate the state of Protractor, community innovations, e2e best practices, and explore novel opportunities.
-->
최신 e2e 테스트 정책을 활용할 수 있도록 커뮤니티 사례, e2e 모범 사례 등을 참고하며 Protractor를 지속적으로 개선하고 있습니다.


<!--
### Angular libraries use Ivy
-->
### Angular 라이브러리를 Ivy로 전환하기

<!--
Earlier in 2020, we shared an [RFC](https://github.com/angular/angular/issues/38366) for Ivy library distribution. After invaluable feedback from the community, we developed a design of the project. We are now investing in the development of Ivy library distribution, including an update of the library package format to use Ivy compilation, unblock the deprecation of the View Engine library format, and [ngcc](https://angular.io/guide/glossary#ngcc). 
-->
2020년 초에 Ivy 라이브러리 배포에 대한 [RFC](https://github.com/angular/angular/issues/38366)를 공유한 적이 있습니다.
이후 커뮤니티에 값진 피드백들이 올라왔고, 이 내용을 반영해서 프로젝트 구조를 개선했습니다.
지금은 Ivy 컴파일러로 라이브러리 패키지 포맷을 변경하는 것과 View Engine 라이브러리 포맷 지원 중단 정책을 폐기하고 [ngcc](https://angular.io/guide/glossary#ngcc)를 활용하는 방식으로 Ivy 라이브러리 배포 방식을 변경하고 있습니다.


<!--
### Ensure smooth adoption for future RxJS changes (v7 and beyond)
-->
### 최신 RxJS 버전 반영(v7, 이후 버전)

<!--
We want to ensure Angular developers are taking advantage of the latest capabilities of RxJS and have a smooth transition to the next major releases of the framework. For this purpose, we will explore and document the scope of the changes in v7 and beyond of RxJS and plan an update strategy.
-->
Angular 팀은 Angular 개발자들이 Angular 메이저 버전을 도입하면서 최신 RxJS도 자연스럽게 활용하는 수 있기를 바랍니다.
그래서 저희는 RxJS v7에 어떤 내용이 변경되었는지, 이후 개발 방향은 어떻게 되는지 리서치하고 있습니다.


<!--
### Transition the Angular language service to Ivy
-->
### Angular 언어 지원 서비스를 Ivy로 전환

<!--
The goal of this project is to improve the experience and remove legacy dependency by transitioning the language service to Ivy. Today the language service still uses the View Engine compiler and type checking, even for Ivy applications. We want to use the Ivy template parser and improved type checking for the Angular Language service to match application behavior. This migration will also be a step towards unblocking the removal of View Engine, which will simplify Angular, reduce the npm package size, and improve the framework's maintainability.
-->
이 프로젝트의 목적은 기존 언어 지원 서비스(language service)를 Ivy용으로 전환해서 성능을 향상시키고 불필요한 의존성을 제거하는 것입니다.
아직은 Angular 애플리케이션에서 Ivy를 사용하더라도 언어 지원 서비스는 View Engine 컴파일러를 사용해서 템플릿에 사용된 타입을 체크합니다.
저희는 애플리케이션이 Ivy로 동작하는 만큼 언어 지원 서비스도 Ivy 템플릿 파서를 사용해서 성능도 더 개선되는 상황을 준비하고 있습니다.
View Engine은 이 작업이 끝나고 나서야 제거될 수 있으며, View Engine이 제거되고 나면 npm 패키지 크기가 지금보다 작아지고 프레임워크 유지보수도 더 효율적으로 개선될 것입니다.


<!--
### Increased security with native [Trusted Types](https://web.dev/trusted-types/) in Angular
-->
### [Trusted Types](https://web.dev/trusted-types/)로 보안 강화

<!--
In collaboration with Google's security team, we're adding support for the new Trusted Types API. This web platform API will help developers build more secure web applications.
-->
저희는 Google 보안 팀과 협업해서 최신 Trusted Types API 지원을 추가하고 있습니다.
웹 플랫폼 API가 모두 준비되면 웹 애플리케이션의 보안을 더욱 강화할 수 있을 것입니다.


<!--
### Enhanced Angular Material components by integrating [MDC Web](https://material.io/develop/web/)
-->
### Angular Material 컴포넌트 개발에 [MDC Web](https://material.io/develop/web/) 활용하기

<!--
MDC Web is a library created by Google's Material Design team that provides reusable primitives for building Material Design components. The Angular team is incorporating these primitives into Angular Material. Using MDC Web will align Angular Material more closely with the Material Design specification, expand accessibility, improve component quality, and improve our team's velocity.
-->
MDC Web은 Google Material Design 팀이 Material Design 컴포넌트를 빌드할 수 있는 기본 요소를 제공하는 라이브러리입니다.
Angular 팀도 Angular Material을 적극 활용하고 있습니다.
MDC Web이 제공하는 Material Design 스펙, 접근성 확장 기능을 활용해서 Angular Material을 개발하고 있으며, 이 라이브러리 덕분에 컴포넌트의 품질과 팀 개발 속도를 향상시키고 있습니다.


<!--
### Offer Google engineers better integration with Angular and Google's internal server stack
-->
### Google 내부 개발자에게 Angular 지원하기

<!--
This is an internal project to add support for Angular front-ends to Google's internal integrated server stack.
-->
저희는 Google 내부 서버 스택을 개발하는 개발자들의 Angular 프론트엔드 개발을 지원하고 있습니다.


<!--
### Streamline releases with consolidated Angular versioning & branching
-->
### Angular 버전 & 브랜치 관리 강화하기

<!--
We want to consolidate release management tooling between Angular's multiple GitHub repositories ([angular/angular](https://github.com/angular/angular), [angular/angular-cli](https://github.com/angular/angular-cli), and [angular/components](https://github.com/angular/components)). This effort will allow us to reuse infrastructure, unify and simplify processes, and improve our release process's reliability.
-->
저희는 Angular 배포와 관련된 GitHub 저장소([angular/angular](https://github.com/angular/angular), [angular/angular-cli](https://github.com/angular/angular-cli), [angular/components](https://github.com/angular/components))를 조금 더 긴밀하게 연결하고 싶습니다.
저희가 갖고 있는 인프라를 좀 더 효율적으로 활용할 수 있으며, 프로세스를 단순화하고 릴리즈 과정의 신뢰성도 향상되기를 기대하고 있습니다.


<!--
### Optimized build speed and bundle sizes with Angular CLI webpack 5
-->
### Webpack 5 관련 기능을 최적화해서 빌드 속도를 높이고 빌드 결과물 크기 줄이기

<!--
As part of the v11 release, we introduced an opt-in preview of webpack 5 in the Angular CLI. To ensure stability, we’ll continue iterating on the implementation to enable build speed and bundle size improvements.
-->
Angular v11 버전부터 Angular CLI에 Webpack 5가 제공하는 옵트인 프리뷰(opt-in preview)가 도입되었습니다.
관련 코드를 계속 개선해서 안정성을 높이고 빌드 속도를 향상시키며, 번들 결과물 크기도 줄이기 위해 노력하고 있습니다.


<!--
### Higher developer consistency with commit message standardization
-->
### 커밋 메시지를 일관되게 표준화

<!--
We want to unify commit message requirements and conformance across Angular repositories ([angular/angular](https://github.com/angular/angular), [angular/components](https://github.com/angular/components), [angular/angular-cli](https://github.com/angular/angular-cli)) to bring consistency to our development process and reuse infrastructure tooling.
-->
저희는 Angular 코드 저장소([angular/angular](https://github.com/angular/angular), [angular/components](https://github.com/angular/components), [angular/angular-cli](https://github.com/angular/angular-cli))에 커밋되는 메시지에 꼭 필요한 내용이 무엇인지 검토하고 있습니다.
이 기준이 확립되면 개발 프로세스를 일관되게 유지할 수 있으며 관련 도구들도 더 효율적으로 재사용될 것이라 기대하고 있습니다.


<!--
### Accelerated debugging and performance profiling with Angular DevTools
-->
### Angular 개발자도구 개선

<!--
We are working on development tooling for Angular that will provide utilities for debugging and performance profiling. This project aims to help developers understand the component structure and the change detection in an Angular application.
-->
Angular를 디버깅하거나 퍼포먼스를 측정할 때 사용하는 툴을 개발하고 있습니다.
이 프로젝트가 완료되면 Angular 개발자가 컴포넌트 구조를 파악하거나 변화 감지가 어떻게 일어나는지 편하게 볼 수 있을 것입니다.


<!--
### Improved developer onboarding with refreshed introductory documentation
-->
### 개발자 문서 개선

<!--
We will redefine the user learning journeys and refresh the introductory documentation. We will clearly state the benefits of Angular, how to explore its capabilities and provide guidance so developers can become proficient with the framework in as little time as possible.
-->
Angular를 처음 접하는 개발자나 Angular에 익숙한 개발자 모두 활용할 수 있는 가이드 문서를 준비하고 있습니다.
Angular를 썼을 때 장점은 무엇인지, Angular의 기능을 어떻게 학습할 수 있는지, 적은 시간을 들이면서 효율적으로 프레임워크를 활용하려면 어떻게 해야 하는지 안내하는 문서를 제공할 예정입니다.


<!--
## Future
-->
## 진행 예정

<!--
### Better developer ergonomics with strict typing for `@angular/forms`
-->
### `@angular/forms`에 더 엄격한 타입 검사 적용

<!--
We will work on implementing stricter type checking for reactive forms. This way, we will allow developers to catch more issues during development time, enable better text editor and IDE support, and improve the type checking for reactive forms.
-->
반응형 폼에 더 엄격한 타입 검사 로직을 적용하려고 합니다.
이 과정이 개선되면 운영 단계로 넘어가기 전에 개발 단계에서 더 많은 이슈를 발견할 수 있을 것이며, IDE 지원도 강화될 것이고 타입 검사 기능도 강화될 것입니다.


<!--
### Leverage full framework capabilities with Zone.js opt-out
-->
### Zone.js 제거

<!--
We are going to design and implement a plan to make Zone.js optional from Angular applications. This way, we will simplify the framework, improve debugging, and reduce application bundle size. Additionally, this will allow us to take advantage of native async/await syntax, which currently Zone.js does not support.
-->
Angular 애플리케이션에 Zone.js를 사용하지 않아도 되는 방식으로 프레임워크 설계를 변경하고 있습니다.
프레임워크는 더 간결해질 것이고, 디버깅하기 편해질 것이며, 애플리케이션 빌드 결과물의 용량도 작아질 것입니다.
게다가 지금 Zone.js가 지원하지 않기 때문에 구현하지 못했던 로직도 브라우저가 지원하는 표준 async/await 문법을 사용하면서 도입될 수 있습니다.


<!--
### Reduce framework overhead by removing legacy [View Engine](https://angular.io/guide/ivy)
-->
### 이전에 사용하던 [View Engine](https://angular.io/guide/ivy) 제거

<!--
After the transition of all our internal tooling to Ivy has completed, we want to remove the legacy View Engine for smaller Angular conceptual overhead, smaller package size, lower maintenance cost, and lower complexity of the codebase.
-->
내부에 사용하는 툴을 모두 Ivy로 전환하고 나면, 이전에 사용하던 View Engine을 제거하려고 합니다.
Angular 프레임워크 자체의 부담도 덜어지고, 번들 결과물 크기도 작아질 것이며, 유지보수성이 높아지면서 전체 코드의 복잡성도 줄어들 것으로 기대합니다.


<!--
### Improved test times and debugging with automatic test environment tear down
-->
### 테스트 실행 속도 개선, 실행 환경 자동 초기화

<!--
To improve test time and create better isolation across tests, we want to change `TestBed` to automatically clean up and tear down the test environment after each test run.
-->
테스트 실행 시간을 줄이고 테스트 실행 컨텍스트를 더 안전하게 격리하기 위해 `TestBed`를 개선하고 있습니다.
`TestBed`는 개별 테스트 스펙이 실행될 때마다 자동으로 실행 컨텍스트를 초기화하며 테스트 스펙이 실행되는 컨텍스트도 확실하게 분리할 것입니다.


<!--
### Improved build performance with ngc as a tsc plugin distribution
-->
### Angular 컴파일러를 TypeScript 플러그인 형태로 전환

<!--
Distributing the Angular compiler as a plugin of the TypeScript compiler will substantially improve developers' build performance and reduce maintenance costs.
-->
Angular 컴파일러를 TypeScript 컴파일러의 플러그인 형태로 전환해서 빌드 속도를 향상하고 유지보수 비용을 줄일 예정입니다.


<!--
### Support adding directives to host elements
-->
### 호스트 엘리먼트에 디렉티브 추가하기

<!--
A long-standing feature request is to add the ability to add directives to host elements. The feature will allow developers to augment their own components with additional behaviors without using inheritance. The project will require substantial effort in terms of the definition of APIs, semantics, and implementation.
-->
호스트 엘리먼트에 디렉티브를 추가하는 기능은 오래전부터 있던 요구사항이었습니다.
이 기능이 추가되면 기존 컴포넌트를 상속하지 않아도 원하는 기능을 자유롭게 추가할 수 있습니다.
이 프로젝트를 진행하기 위해 API는 어떻게 정의할 것인지, 문법은 어떻게 사용하며, 구현은 어떻게 할 것인지 깊이 있게 검토하고 있습니다.


<!--
### Simplified Angular mental model with optional NgModules
-->
### NgModule을 생략하는 구성 방식

<!--
To simplify the Angular mental model and learning journey, we’ll be working on making NgModules optional. This work will allow developers to develop standalone components and implement an alternative API for declaring the component’s compilation scope.
-->
Angular의 개념 모델을 간략화하기 위해 NgModule을 생략할 수 있는 구성 방식을 검토하고 있습니다.
앞으로는 컴포넌트만 단독으로 개발하거나 컴포넌트 전용 컴파일 컨텍스트 API가 제공될 수 있습니다.


<!--
### Ergonomic component level code-splitting APIs
-->
### 컴포넌트 계층 코드 분리 API

<!--
A common problem of web applications is their slow initial load time. A way to improve it is to apply more granular code-splitting on a component level. To encourage this practice, we’ll be working on more ergonomic code-splitting APIs.
-->
웹 애플리케이션은 초기 실행 시간이 길다는 것이 종종 문제로 꼽힙니다.
이 문제를 개선하기 위해 컴포넌트 계층의 코드를 분할하는 방식을 검토하고 있습니다.
코드를 어떻게 나눠야 할지, API를 어떻게 제공해야 할지 깊이있게 실험해 보고 있습니다.