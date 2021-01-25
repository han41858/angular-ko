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

아래 언급되는 프로젝트들은 특정 Angular 버전과 관련된 것은 아닙니다.
이 중에서 개발이 완료되는 프로젝트가 릴리즈 일정에 맞춰 특정 버전에 들어가는 것입니다.
그래서 어떤 기능이 개발되면 다음 마이너 버전이나 다음 메이저 버전에 포함됩니다.


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
스타일 파일을 불러오는 작업은 메인 스레드 실행을 막기 때문에 브라우저는 스타일 파일을 모두 로드할 때까지 렌더링을 시작할 수 없습니다.
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
### 성능 저하를 막기 위한 대시보드 개선

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
지금은 Ivy 컴파일러로 라이브러리 패키지 포맷을 변경하는 것과 View Engine 라이브러리 포맷 지원 중단 정책을 해제하고 [ngcc](https://angular.io/guide/glossary#ngcc)를 활용하는 방식으로 Ivy 라이브러리 배포 방식을 변경하고 있습니다.


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


### Increased security with native [Trusted Types](https://web.dev/trusted-types/) in Angular

In collaboration with Google's security team, we're adding support for the new Trusted Types API. This web platform API will help developers build more secure web applications.

### Enhanced Angular Material components by integrating [MDC Web](https://material.io/develop/web/)

MDC Web is a library created by Google's Material Design team that provides reusable primitives for building Material Design components. The Angular team is incorporating these primitives into Angular Material. Using MDC Web will align Angular Material more closely with the Material Design specification, expand accessibility, improve component quality, and improve our team's velocity.

### Offer Google engineers better integration with Angular and Google's internal server stack

This is an internal project to add support for Angular front-ends to Google's internal integrated server stack.

### Streamline releases with consolidated Angular versioning & branching

We want to consolidate release management tooling between Angular's multiple GitHub repositories ([angular/angular](https://github.com/angular/angular), [angular/angular-cli](https://github.com/angular/angular-cli), and [angular/components](https://github.com/angular/components)). This effort will allow us to reuse infrastructure, unify and simplify processes, and improve our release process's reliability.

### Optimized build speed and bundle sizes with Angular CLI webpack 5

As part of the v11 release, we introduced an opt-in preview of webpack 5 in the Angular CLI. To ensure stability, we’ll continue iterating on the implementation to enable build speed and bundle size improvements.

### Higher developer consistency with commit message standardization

We want to unify commit message requirements and conformance across Angular repositories ([angular/angular](https://github.com/angular/angular), [angular/components](https://github.com/angular/components), [angular/angular-cli](https://github.com/angular/angular-cli)) to bring consistency to our development process and reuse infrastructure tooling.

### Accelerated debugging and performance profiling with Angular DevTools

We are working on development tooling for Angular that will provide utilities for debugging and performance profiling. This project aims to help developers understand the component structure and the change detection in an Angular application.

### Improved developer onboarding with refreshed introductory documentation

We will redefine the user learning journeys and refresh the introductory documentation. We will clearly state the benefits of Angular, how to explore its capabilities and provide guidance so developers can become proficient with the framework in as little time as possible.


<!--
## Future
-->
## 진행 예정

### Better developer ergonomics with strict typing for `@angular/forms`

We will work on implementing stricter type checking for reactive forms. This way, we will allow developers to catch more issues during development time, enable better text editor and IDE support, and improve the type checking for reactive forms.

### Leverage full framework capabilities with Zone.js opt-out

We are going to design and implement a plan to make Zone.js optional from Angular applications. This way, we will simplify the framework, improve debugging, and reduce application bundle size. Additionally, this will allow us to take advantage of native async/await syntax, which currently Zone.js does not support.

### Reduce framework overhead by removing legacy [View Engine](https://angular.io/guide/ivy)

After the transition of all our internal tooling to Ivy has completed, we want to remove the legacy View Engine for smaller Angular conceptual overhead, smaller package size, lower maintenance cost, and lower complexity of the codebase.

### Improved test times and debugging with automatic test environment tear down

To improve test time and create better isolation across tests, we want to change `TestBed` to automatically clean up and tear down the test environment after each test run.

### Improved build performance with ngc as a tsc plugin distribution

Distributing the Angular compiler as a plugin of the TypeScript compiler will substantially improve developers' build performance and reduce maintenance costs.

### Support adding directives to host elements

A long-standing feature request is to add the ability to add directives to host elements. The feature will allow developers to augment their own components with additional behaviors without using inheritance. The project will require substantial effort in terms of the definition of APIs, semantics, and implementation.

### Simplified Angular mental model with optional NgModules

To simplify the Angular mental model and learning journey, we’ll be working on making NgModules optional. This work will allow developers to develop standalone components and implement an alternative API for declaring the component’s compilation scope.

### Ergonomic component level code-splitting APIs

A common problem of web applications is their slow initial load time. A way to improve it is to apply more granular code-splitting on a component level. To encourage this practice, we’ll be working on more ergonomic code-splitting APIs.
