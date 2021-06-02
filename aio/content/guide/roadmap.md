<!--
# Angular Roadmap
-->
# Angular 로드맵

<!--
Angular receives a large number of feature requests, both from inside Google and from the broader open-source community. At the same time, our list of projects contains plenty of maintenance tasks, code refactorings, and potential performance improvements. We bring together representatives from developer relations, product management, and engineering to prioritize this list. As new projects come into the queue, we regularly position them based on relative priority to other projects. As work gets done, projects will move up in the queue.

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

### Improve test times and debugging with automatic test environment tear down

To improve test time and create better isolation across tests, we want to change <code>[TestBed](https://angular.io/api/core/testing/TestBed)</code> to automatically clean up and tear down the test environment after each test run.

### Deprecate and remove IE11 support

IE11 has been preventing Angular from taking advantage of some of the modern features of the Web platform. As part of this project we are going to deprecate and remove IE11 support to open the path for modern features that evergreen browsers provide. We ran an [RFC](https://github.com/angular/angular/issues/41840) to collected feedback from the community and decide on next steps to move forward.

### Leverage ES2017+ as the default output language

Supporting modern browsers will allow us to leverage the more compact, expressive, and performant new syntax of JavaScript. As part of this project we’ll investigate what are the blockers to move forward with this effort and take the steps forward to enable it.


<!--
### Revamp performance dashboards to detect regressions
-->
### 성능 측정용 대시보드 개선

<!--
We have a set of benchmarks that we run against every code change to ensure Angular aligns with our performance standards. To ensure the framework’s runtime does not regress after a code change, we need to refine some of the existing infrastructure the dashboards step on.
-->
Angular 팀은 Angular 코드가 변경될 때마다 목표 성능을 유지하기 위해 벤치마크를 진행하고 있습니다.
코드가 변경되더라도 프레임워크 실행 속도가 떨어져서는 안되며, 이 과정을 관리하는 대시보드도 함께 개선하고 있습니다.


### Enhanced Angular Material components by integrating [MDC Web](https://material.io/develop/web/)

MDC Web is a library created by Google's Material Design team that provides reusable primitives for building Material Design components. The Angular team is incorporating these primitives into Angular Material. Using MDC Web will align Angular Material more closely with the Material Design specification, expand accessibility, improve component quality, and improve our team's velocity.

### Angular component accessibility

We're evaluating components in Angular Material against accessibility standards such as WCAG and working to fix any issues that arise from this process.

### Remove legacy [View Engine](https://angular.io/guide/ivy)

After the transition of all our internal tooling to Ivy is completed, we will remove the legacy View Engine for reduced Angular conceptual overhead, smaller package size, lower maintenance cost, and lower codebase complexity.

### Publish guides on advanced concepts

Develop and publish an in-depth guide on change detection. Develop content for performance profiling of Angular applications. Cover how change detection interacts with Zone.js and explain when it gets triggered, how to profile its duration, as well as common practices for performance optimization.


<!--
### Update our e2e testing strategy
-->
### e2e 테스트 정책 업데이트

<!--
To ensure we provide a future-proof e2e testing strategy, we want to evaluate the state of Protractor, community innovations, e2e best practices, and explore novel opportunities. As first steps of the effort, we shared an [RFC](https://github.com/angular/protractor/issues/5502) and worked with partners to ensure smooth integration between the Angular CLI and state of the art tooling for e2e testing. As the next step, we need to finalize the recommendations and compile a list of resources for the transition.
-->
최신 e2e 테스트 정책을 활용할 수 있도록 커뮤니티 사례, e2e 모범 사례 등을 참고하며 Protractor를 지속적으로 개선하고 있습니다.
그래서 저희는 [RFC](https://github.com/angular/protractor/issues/5502)를 공유했고 Angular CLI와 통합하기 위한 작업을 진행하고 있습니다.
그 다음 단계는 추천된 항목을 검토하여 확정하는 것입니다.


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
We want to ensure Angular developers are taking advantage of the latest capabilities of RxJS and have a smooth transition to the next major releases of the framework. For this purpose, we will explore and document the scope of the changes in v7 and beyond RxJS and plan an update strategy.
-->
Angular 팀은 Angular 개발자들이 Angular 메이저 버전을 도입하면서 최신 RxJS도 자연스럽게 활용하는 수 있기를 바랍니다.
그래서 저희는 RxJS v7에 어떤 내용이 변경되었는지, 이후 개발 방향은 어떻게 되는지 리서치하고 있습니다.

### Simplified Angular mental model with optional NgModules

To simplify the Angular mental model and learning journey, we’ll be working on making NgModules optional. This work will allow developers to develop standalone components and implement an alternative API for declaring the component’s compilation scope.


<!--
## Future
-->
## 진행 예정

### Investigate micro frontend architecture for scalable development processes

Look into independent deployability and development of large-scale applications to improve efficiency and productivity. The Angular community has an established story for micro frontend support. As part of this effort, we’d investigate what would be the correct abstractions to provide better support.

### Better developer ergonomics with strict typing for `@angular/forms`

We will work on implementing stricter type checking for reactive forms. This way, we will allow developers to catch more issues during development time, enable better text editor and IDE support, and improve the type checking for reactive forms.

### Leverage full framework capabilities with Zone.js opt-out

We are going to design and implement a plan to make Zone.js optional from Angular applications. This way, we will simplify the framework, improve debugging, and reduce application bundle size. Additionally, this will allow us to take advantage of native async/await syntax, which currently Zone.js does not support.

### Improved build performance with ngc as a tsc plugin distribution

Distributing the Angular compiler as a plugin of the TypeScript compiler will substantially improve developers' build performance and reduce maintenance costs.

### Support adding directives to host elements

A long-standing feature request is to add the ability to add directives to host elements. The feature will allow developers to augment their own components with additional behaviors without using inheritance. The project will require substantial effort in terms of the definition of APIs, semantics, and implementation.

### Ergonomic component level code-splitting APIs

A common problem with web applications is their slow initial load time. A way to improve it is to apply more granular code-splitting on a component level. To encourage this practice, we’ll be working on more ergonomic code-splitting APIs.

<details class="roadmap-done-details">
<summary class="roadmap-done-summary">Done</summary>

### Accelerated debugging and performance profiling with Angular DevTools

_Completed Q2 2021_

We are working on development tooling for Angular that will provide utilities for debugging and performance profiling. This project aims to help developers understand the component structure and the change detection in an Angular application.

<!--
### Streamline releases with consolidated Angular versioning & branching
-->
### Angular 버전 & 브랜치 관리 강화하기

<!--
_Completed Q2 2021_

We want to consolidate release management tooling between Angular's multiple GitHub repositories ([angular/angular](https://github.com/angular/angular), [angular/angular-cli](https://github.com/angular/angular-cli), and [angular/components](https://github.com/angular/components)). This effort will allow us to reuse infrastructure, unify and simplify processes, and improve our release process's reliability.
-->
_2021 2분기에 완료_

<!--
### Higher developer consistency with commit message standardization
-->
### Higher developer consistency with commit message standardization

<!--
_Completed Q2 2021_

We want to unify commit message requirements and conformance across Angular repositories ([angular/angular](https://github.com/angular/angular), [angular/components](https://github.com/angular/components), [angular/angular-cli](https://github.com/angular/angular-cli)) to bring consistency to our development process and reuse infrastructure tooling.
-->
_2021 2분기에 완료_

저희는 Angular 배포와 관련된 GitHub 저장소([angular/angular](https://github.com/angular/angular), [angular/angular-cli](https://github.com/angular/angular-cli), [angular/components](https://github.com/angular/components))를 조금 더 긴밀하게 연결하고 싶습니다.
저희가 갖고 있는 인프라를 좀 더 효율적으로 활용할 수 있으며, 프로세스를 단순화하고 릴리즈 과정의 신뢰성도 향상되기를 기대하고 있습니다.


### Transition the Angular language service to Ivy

_Completed Q2 2021_

The goal of this project is to improve the experience and remove legacy dependency by transitioning the language service to Ivy. Today the language service still uses the View Engine compiler and type checking, even for Ivy applications. We want to use the Ivy template parser and improved type checking for the Angular Language service to match application behavior. This migration will also be a step towards unblocking the removal of View Engine, which will simplify Angular, reduce the npm package size, and improve the framework's maintainability.

### Increased security with native [Trusted Types](https://web.dev/trusted-types/) in Angular

_Completed Q2 2021_

In collaboration with Google's security team, we're adding support for the new Trusted Types API. This web platform API will help developers build more secure web applications.


<!--
### Optimized build speed and bundle sizes with Angular CLI webpack 5
-->
### Webpack 5 관련 기능을 최적화해서 빌드 속도를 높이고 빌드 결과물 크기 줄이기

<!--
_Completed Q2 2021_

As part of the v11 release, we introduced an opt-in preview of webpack 5 in the Angular CLI. To ensure stability, we’ll continue iterating on the implementation to enable build speed and bundle size improvements.
-->
_Completed Q2 2021_

Angular v11 버전부터 Angular CLI에 Webpack 5가 제공하는 옵트인 프리뷰(opt-in preview)가 도입되었습니다.
관련 코드를 계속 개선해서 안정성을 높이고 빌드 속도를 향상시키며, 번들 결과물 크기도 줄이기 위해 노력하고 있습니다.

### Faster apps by inlining critical styles in Universal applications

_Completed Q1 2021_

Loading external stylesheets is a blocking operation, which means that the browser can’t start rendering your application until it loads all the referenced CSS. Having render-blocking resources in the header of a page can significantly impact its load performance, for example, its [first contentful paint](https://web.dev/first-contentful-paint/). To make apps faster, we’ve been collaborating with the Google Chrome team on inlining critical CSS and loading the rest of the styles asynchronously.

### Improve debugging with better Angular error messages

_Completed Q1 2021_

Error messages often bring limited actionable information to help developers resolve them. We’ve been working on making error messages more discoverable by adding associated codes, developing guides, and other materials to ensure a smoother debugging experience.

### Improved developer onboarding with refreshed introductory documentation

_Completed Q1 2021_

We will redefine the user learning journeys and refresh the introductory documentation. We will clearly state the benefits of Angular, how to explore its capabilities and provide guidance so developers can become proficient with the framework in as little time as possible.

### Expand component harnesses best practices

_Completed Q1 2021_

Angular CDK introduced the concept of [component test harnesses](https://material.angular.io/cdk/test-harnesses) to Angular in version 9. Test harnesses allow component authors to create supported APIs for testing component interactions. We're continuing to improve this harness infrastructure and clarifying the best practices around using harnesses. We're also working to drive more harness adoption inside of Google.

### Author a guide for content projection

_Completed Q2 2021_

Content projection is a core Angular concept that does not have the presence it deserves in the documentation. As part of this project we want to identify the core use cases and concepts for content projection and document them.

### Migrate to ESLint

_Completed Q4 2020_

With the deprecation of TSLint we will be moving to ESLint. As part of the process, we will work on ensuring backward compatibility with our current recommended TSLint configuration, implement a migration strategy for existing Angular applications and introduce new tooling to the Angular CLI toolchain.

### Operation Bye Bye Backlog (aka Operation Byelog) 

_Completed Q4 2020_

We are actively investing up to 50% of our engineering capacity on triaging issues and PRs until we have a clear understanding of broader community needs. After that, we'll commit up to 20% of our engineering capacity to keep up with new submissions promptly.

</details>
