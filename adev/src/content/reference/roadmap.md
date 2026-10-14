<!--
<docs-decorative-header title="Angular Roadmap" imgSrc="adev/src/assets/images/roadmap.svg">
-->

<!-- markdownlint-disable-line -->

<!--
Learn how the Angular team is building momentum on the web.
</docs-decorative-header>

As an open source project, Angular’s daily commits, PRs and momentum is all trackable on GitHub. To increase transparency into how this daily work connects to the framework’s future, our roadmap brings together the team’s current and future planned vision.

The following projects are not associated with a particular Angular version. We will release them on completion, and they will be part of a specific version based on our release schedule, following semantic versioning. For example, we release features in the next minor after completion or the next major if they include breaking changes.

Currently, Angular has three goals for the framework:

1. Improve the [AI experience for developers](/ai)
1. Improve the [Angular developer experience](#improving-the-angular-developer-experience)
1. Improve the framework’s performance

Continue reading to learn how we plan to deliver these objectives with specific project work.
-->

<docs-decorative-header title="Angular 로드맵" imgSrc="adev/src/assets/images/roadmap.svg"> <!-- markdownlint-disable-line -->
Angular 팀이 웹의 발전을 어떻게 이끌어 가는지 알아보세요.
</docs-decorative-header>

Angular는 오픈 소스 프로젝트이므로 매일 이루어지는 커밋, PR, 개발 현황을 GitHub에서 모두 확인할 수 있습니다. 이러한 일상적인 작업이 프레임워크의 미래와 어떻게 연결되는지 더 투명하게 보여 주기 위해, 로드맵에는 팀이 현재 진행 중인 작업과 앞으로 계획하는 방향을 함께 정리했습니다.

다음 프로젝트는 특정 Angular 버전에 연결되어 있지 않습니다. 완료되면 릴리즈하며, 유의적 버전 관리와 릴리즈 일정에 따라 특정 버전에 포함합니다. 예를 들어 기능이 완성되면 다음 마이너 버전에 포함하고, 호환성을 깨뜨리는 변경이 있다면 다음 메이저 버전에 포함합니다.

현재 Angular 프레임워크의 목표는 세 가지입니다.

1. [개발자의 AI 활용 경험](/ai) 개선
1. [Angular 개발자 경험](#improving-the-angular-developer-experience) 개선
1. 프레임워크 성능 개선

각 프로젝트를 통해 이러한 목표를 어떻게 실현할 계획인지 계속 읽어 보세요.

<!--
## Explore modern Angular
-->

<a id="explore-modern-angular"></a>

## 최신 Angular 살펴보기

<!--
Start developing with the latest Angular features from our roadmap. This list represents the current status of new features from our roadmap:
-->

로드맵에 있는 최신 Angular 기능으로 개발을 시작해 보세요. 다음 목록은 로드맵의 새로운 기능들이 현재 어떤 상태인지 보여 줍니다.

<!--
### Available to experiment with
-->

<a id="available-to-experiment-with"></a>

### 실험적으로 사용 가능

<!--
- [Web MCP](/ai/webmcp)
-->

- [Web MCP](/ai/webmcp)

<!--
### Production ready
-->

<a id="production-ready"></a>

### 프로덕션에서 사용 가능

<!--
- [Signal Forms](/guide/forms/signals/overview)
- [Resource API](/guide/signals/resource)
- [httpResource](/api/common/http/httpResource)
- [Zoneless change detection](/guide/zoneless)
- [Linked Signal API](/guide/signals/linked-signal)
- [Incremental hydration](/guide/incremental-hydration)
- [Effect API](/api/core/effect)
- [Event replay with SSR](/api/platform-browser/withEventReplay)
- [Route-level render mode](/guide/ssr)
-->

- [시그널 폼](/guide/forms/signals/overview)
- [리소스 API](/guide/signals/resource)
- [httpResource](/api/common/http/httpResource)
- [존리스 변경 감지](/guide/zoneless)
- [연결된 시그널 API](/guide/signals/linked-signal)
- [점진적 하이드레이션](/guide/incremental-hydration)
- [이펙트 API](/api/core/effect)
- [SSR에서 이벤트 재실행](/api/platform-browser/withEventReplay)
- [라우팅 규칙 수준 렌더링 모드](/guide/ssr)

<!--
## Improving the AI experience for Angular Developers
-->

<a id="improving-the-ai-experience-for-angular-developers"></a>

## Angular 개발자의 AI 활용 경험 개선

<!--
### Bringing the best of AI to Angular
-->

<a id="bringing-the-best-of-ai-to-angular"></a>

### Angular에 AI의 장점 도입

<docs-card-container>

<!--
<docs-card title="AI Powered Angular">
  AI continues to shape the development landscape. It has changed how we develop apps and the types of user experiences that are possible. We plan to best support the developer community in AI-assisted coding and integrating AI in their applications.
  </docs-card>
-->

<docs-card title="AI를 활용하는 Angular">
AI는 개발 환경을 계속 바꾸고 있습니다. 앱을 개발하는 방식과 구현할 수 있는 사용자 경험의 유형도 달라졌습니다. Angular 팀은 AI의 도움을 받는 코딩과 애플리케이션에 AI를 통합하는 작업에서 개발자 커뮤니티를 최대한 지원할 계획입니다.
</docs-card>

<!--
<docs-card title="AI Development">
  The team will continue to develop meaningful integrations with tools like Google AI Studio, Gemini CLI and other agentic tooling such as Agentic IDEs like Antigravity. We plan to launch solutions that stay in line with the rapidly evolving industry. Some examples include agent skills, new MCP features and AI SDKs.
  </docs-card>
-->

<docs-card title="AI 개발">
Google AI Studio, Gemini CLI와 같은 도구뿐 아니라 Antigravity 같은 에이전트형 IDE를 비롯한 여러 에이전트 도구와 유용하게 통합하는 작업을 계속할 예정입니다. 빠르게 발전하는 업계의 흐름에 맞는 솔루션을 선보일 계획입니다. 에이전트 스킬, 새로운 MCP 기능, AI SDK 등이 그 예입니다.
</docs-card>

<!--
<docs-card title="Code Generation">
  [Based on our research](https://blog.angular.dev/beyond-the-horizon-how-angular-is-embracing-ai-for-next-gen-apps-7a7ed706e1a3), code generation for Angular is already high quality with modern LLMs. We will continue our investments in improving code generation for Angular. This means we will regularly evaluate code generation quality using current models and work to improve it through system instructions, documentation, and tactical framework changes.
  </docs-card>
-->

<docs-card title="코드 생성">
[Angular 팀의 연구](https://blog.angular.dev/beyond-the-horizon-how-angular-is-embracing-ai-for-next-gen-apps-7a7ed706e1a3)에 따르면 최신 LLM이 생성하는 Angular 코드는 이미 품질이 높습니다. 앞으로도 Angular 코드 생성 품질 개선에 지속적으로 투자할 예정입니다. 최신 모델의 코드 생성 품질을 정기적으로 평가하고, 시스템 지침과 문서, 목적에 맞춘 프레임워크 변경을 통해 품질을 높이겠습니다.
</docs-card>

<!--
<docs-card title="AI Powered Experiences">
  There is a new frontier for Angular developers to explore with new concepts such as Dynamic UI generation. We started with building Angular support for A2UI and are actively searching out more opportunities to support modern application experiences.
  </docs-card>
-->

<docs-card title="AI 기반 사용자 경험">
동적 UI 생성과 같은 새로운 개념은 Angular 개발자가 탐구할 수 있는 새로운 영역을 열고 있습니다. A2UI에 대한 Angular 지원을 구축하는 작업부터 시작했으며, 현대적인 애플리케이션 경험을 지원할 기회를 적극적으로 찾고 있습니다.
</docs-card>

</docs-card-container>

<!--
## Improving the Angular developer experience
-->

<a id="improving-the-angular-developer-experience"></a>

## Angular 개발자 경험 개선

<!--
### Developer velocity
-->

<a id="developer-velocity"></a>

### 개발 속도 향상

<docs-card-container>

<!--
<docs-card title="Compiler">
    Microsoft has spent the last year porting the TypeScript compiler to Go, with the promise of a 5 - 10x speedup for typical TypeScript compilations. Angular has perhaps one of the deepest integrations with the TypeScript compiler, which will require bigger architectural changes to support new tsgo-based workflows for both the compiler and language service.

We're in the process of prototyping and exploring what this support would look like, and will deliver an Angular compiler that is compatible with tsgo and brings the performance benefits of Microsoft's native port to the Angular ecosystem.
</docs-card>
-->

<docs-card title="컴파일러">
Microsoft는 지난 1년 동안 TypeScript 컴파일러를 Go로 이식했으며, 일반적인 TypeScript 컴파일에서 5 - 10배의 속도 향상을 기대하고 있습니다. Angular는 TypeScript 컴파일러와 매우 깊이 통합되어 있으므로, 컴파일러와 언어 지원 서비스 모두에서 tsgo 기반의 새로운 워크플로를 지원하려면 아키텍처를 크게 변경해야 합니다.

현재 어떤 방식으로 이를 지원할지 프로토타입을 만들고 탐색하고 있습니다. tsgo와 호환되는 Angular 컴파일러를 제공하여 Microsoft의 네이티브 이식이 가져오는 성능상의 이점을 Angular 생태계에서도 누릴 수 있도록 하겠습니다.
</docs-card>

<!--
<docs-card title="Enhanced Ecosystem compatibility">
    Developers are mixing AI generated code with manually generated code, and want to make use of popular libraries and integrate new experiences quickly. Angular wants to integrate well into that ecosystem - developers should be able to use the tools they love and mix and match frameworks according to their requirements.

As part of this project, we'll explore the requirement space of cross framework interop and our build tooling to improve our compatibility.

  </docs-card>
-->

<docs-card title="생태계 호환성 향상">
개발자들은 AI가 생성한 코드와 직접 작성한 코드를 함께 사용하며, 인기 있는 라이브러리를 활용하고 새로운 사용자 경험을 빠르게 통합하기를 원합니다. Angular는 이러한 생태계에 잘 어우러지고자 합니다. 개발자가 좋아하는 도구를 사용하고 요구 사항에 따라 여러 프레임워크를 조합할 수 있어야 합니다.

이 프로젝트에서는 프레임워크 간 상호 운용성에 필요한 사항과 빌드 도구를 검토하여 호환성을 개선할 예정입니다.
</docs-card>

<!--
<docs-card title="Components">
  In Angular v21, we launched Angular Aria in developer preview, providing eight patterns for accessible, headless components. In Angular v22, we promoted Angular Aria to stable, and we plan to introduce new patterns where needed. We want to provide developers with a solid foundation for developing their own components using Angular Aria - we provide the interactions and you bring the style that matches your design systems. Developers will have the choice of developing custom components with Angular Aria, use interaction patterns from the CDK, or use ready-made styled Material Components.

For accessibility, we are continuously evaluating the components and patterns against accessibility standards such as WCAG and are working to fix any issues that arise from this process.
</docs-card>
-->

<docs-card title="컴포넌트">
Angular v21에서는 접근성을 갖춘 헤드리스 컴포넌트를 위한 8가지 패턴을 제공하는 Angular Aria를 개발자 미리보기로 출시했습니다. Angular v22에서는 Angular Aria를 안정화했으며, 필요한 경우 새로운 패턴을 도입할 계획입니다. 개발자가 Angular Aria로 직접 컴포넌트를 만들 수 있도록 탄탄한 기반을 제공하고자 합니다. Angular 팀은 상호작용을 제공하고, 여러분은 디자인 시스템에 맞는 스타일을 입히면 됩니다. 개발자는 Angular Aria로 사용자 정의 컴포넌트를 만들거나, CDK의 상호작용 패턴을 사용하거나, 스타일이 적용된 완성형 Material 컴포넌트를 사용할 수 있습니다.

접근성 측면에서는 WCAG와 같은 접근성 표준을 기준으로 컴포넌트와 패턴을 지속적으로 평가하고, 그 과정에서 발견된 문제를 해결하고 있습니다.
</docs-card>

</docs-card-container>

<!--
### Improve tooling
-->

<a id="improve-tooling"></a>

### 도구 개선

<docs-card-container>

<!--
<docs-card title="Modernize unit testing tooling with ng test">
  Following the stable release of Vitest in Angular v21, it is now our primary test runner. We are now focused on promoting our experimental Karma to Vitest migration tool to stable as well as investigating new features to further refine and improve the developer testing workflow.
</docs-card>
-->

<docs-card title="ng test로 단위 테스트 도구 현대화">
Angular v21에서 Vitest를 안정화한 이후 Vitest는 기본 테스트 실행기가 되었습니다. 현재는 실험적으로 제공하는 Karma에서 Vitest로의 마이그레이션 도구를 안정화하고, 개발자의 테스트 워크플로를 더욱 다듬고 개선할 새로운 기능을 조사하는 데 집중하고 있습니다.
</docs-card>

</docs-card-container>

<!--
## Completed projects
-->

<a id="completed-projects"></a>

## 완료된 프로젝트

<docs-card-container>

<!--
<docs-card title="Signal Forms" href="/guide/forms/signals/overview" link="Completed in 2026">
  Signal Forms are now stable. This new approach allows developers to manage form state using signals, providing an ergonomic forms creation experience. We promoted Signal Forms to stable and enhanced interoperability with reactive forms - enabling teams to progressively migrate large forms at their own pace.
  </docs-card>
-->

<docs-card title="시그널 폼" href="/guide/forms/signals/overview" link="2026년 완료">
시그널 폼이 안정화되었습니다. 이 새로운 방식은 개발자가 시그널로 폼 상태를 관리하도록 하여 편리한 폼 작성 경험을 제공합니다. 시그널 폼을 안정화하고 반응형 폼과의 상호 운용성을 개선하여, 각 팀이 자신에게 맞는 속도로 대규모 폼을 점진적으로 마이그레이션할 수 있도록 했습니다.
</docs-card>

<!--
<docs-card title="Reactivity" href="/guide/signals" link="Completed in 2026">
  We introduced new signal APIs, `resource()` and `httpResource()`, for flexible asynchronous data handling. We promoted these APIs to developer stable.
  </docs-card>
-->

<docs-card title="반응성" href="/guide/signals" link="2026년 완료">
유연한 비동기 데이터 처리를 위해 새로운 시그널 API인 `resource()`와 `httpResource()`를 도입했습니다. 이 API들을 안정화했습니다.
</docs-card>

<!--
<docs-card title="Change Detection" href="/api/core/ChangeDetectionStrategy" link="Completed in 2026">
  With Zoneless being stable and default, we set the default change detection strategy to `OnPush`, to follow current best practices. We also renamed `ChangeDetectionStrategy.Default` to `ChangeDetectionStrategy.Eager`.

[See the RFC discussion for details](https://github.com/angular/angular/discussions/66779).
</docs-card>
-->

<docs-card title="변경 감지" href="/api/core/ChangeDetectionStrategy" link="2026년 완료">
존리스가 안정화되고 기본값이 됨에 따라, 현재의 모범 사례를 따르도록 기본 변경 감지 전략을 `OnPush`로 설정했습니다. 또한 `ChangeDetectionStrategy.Default`의 이름을 `ChangeDetectionStrategy.Eager`로 변경했습니다.

[자세한 내용은 RFC 토론을 참고하세요](https://github.com/angular/angular/discussions/66779).
</docs-card>

<!--
<docs-card title="Signal debugging in Angular DevTools" link="Completed in 2026">
  We've added better tooling for debugging Signals using Angular DevTools. This change includes a new UI for inspecting and debugging signals.
  </docs-card>
-->

<docs-card title="Angular DevTools에서 시그널 디버깅" link="2026년 완료">
Angular DevTools에서 시그널을 디버깅하는 도구를 개선했습니다. 이 변경에는 시그널을 검사하고 디버깅하는 새로운 UI가 포함됩니다.
</docs-card>

<!--
<docs-card title="Improve HMR (Hot Module Reload)" href="https://github.com/angular/angular/issues/39367#issuecomment-1439537306" link="Completed in 2025">
  We're working towards faster edit/refresh cycle by enabling hot module replacement. In Angular v19 we shipped initial support for CSS and template HMR and in v20 we graduated template HMR to stable. We'll continue collecting feedback to make sure we're addressing developers' needs before we mark this project as complete.
</docs-card>
-->

<docs-card title="HMR(핫 모듈 리로드) 개선" href="https://github.com/angular/angular/issues/39367#issuecomment-1439537306" link="2025년 완료">
핫 모듈 교체를 활성화하여 편집 후 새로고침하는 주기를 단축하고자 합니다. Angular v19에서 CSS와 템플릿 HMR의 초기 지원을 제공했고, v20에서는 템플릿 HMR을 안정화했습니다. 이 프로젝트를 완료로 표시하기 전에 개발자의 요구를 충족하는지 확인하기 위해 계속 피드백을 수집하겠습니다.
</docs-card>

<!--
<docs-card title="Zoneless Angular"  link="Completed in Q4 2025">
In v18 we shipped experimental zoneless support in Angular. It enables developers to use the framework without including zone.js in their bundle, which improves performance, debugging experience, and interoperability. As part of the initial release we also introduced zoneless support to the Angular CDK and Angular Material.

In v19 we introduced zoneless support in server-side rendering, addressed some edge cases, and created a schematic to scaffold zoneless projects. We transitioned <a href="https://fonts.google.com/" target="_blank">Google Fonts</a> to zoneless which improved performance, developer experience, and allowed us to identify gaps that we need to address before moving this feature to developer preview.

As of Angular v20.2, Zoneless Angular is now stable and includes improvements in error handling and server-side rendering.
</docs-card>
-->

<docs-card title="존리스 Angular"  link="2025년 4분기 완료">
v18에서 Angular의 실험적인 존리스 지원을 제공했습니다. 이 기능을 사용하면 번들에 zone.js를 포함하지 않고도 프레임워크를 사용할 수 있어 성능, 디버깅 경험, 상호 운용성이 개선됩니다. 초기 릴리즈의 일부로 Angular CDK와 Angular Material에도 존리스 지원을 도입했습니다.

v19에서는 서버 사이드 렌더링에 존리스 지원을 도입하고, 일부 예외적인 상황을 해결했으며, 존리스 프로젝트 골격을 생성하는 스키매틱을 만들었습니다. <a href="https://fonts.google.com/" target="_blank">Google Fonts</a>를 존리스로 전환하여 성능과 개발자 경험을 개선했으며, 이 기능을 개발자 미리보기로 전환하기 전에 해결해야 할 부족한 점을 파악할 수 있었습니다.

Angular v20.2부터 존리스 Angular는 안정화되었으며, 오류 처리와 서버 사이드 렌더링 개선 사항을 포함합니다.
</docs-card>

<!--
<docs-card title="Server route configuration" link="Completed in Q2 2025"  >
We're working towards enabling a more ergonomic route configuration on the server. We want to make it trivial to declare which routes should be server-side rendered, prerendered or client-side rendered.

In Angular v19 we shipped developer preview of route-level render mode which allows you to granularly configure which routes you want Angular to prerender, server-side render or client-side render. In Angular v20 we graduated it to stable.
</docs-card>
-->

<docs-card title="서버 라우팅 규칙 설정" link="2025년 2분기 완료"  >
서버에서 라우팅 규칙을 더 편리하게 설정할 수 있도록 작업하고 있습니다. 어떤 라우팅 규칙을 서버 사이드 렌더링, 사전 렌더링, 클라이언트 사이드 렌더링할지 간단히 선언할 수 있도록 하는 것이 목표입니다.

Angular v19에서 라우팅 규칙 수준 렌더링 모드를 개발자 미리보기로 제공하여, Angular가 어떤 라우팅 규칙을 사전 렌더링, 서버 사이드 렌더링, 클라이언트 사이드 렌더링할지 세밀하게 설정할 수 있게 했습니다. Angular v20에서는 이를 안정화했습니다.
</docs-card>

<!--
<docs-card title="Enable incremental hydration" link="Completed in Q2 2025">
In v17 we graduated hydration from developer preview and we've been consistently observing 40-50% improvements in LCP. Since then we started prototyping incremental hydration and shared a demo on stage at ng-conf.

In v19 we shipped the incremental hydration in developer preview mode, powered by `@defer` blocks. In Angular v20 we graduated it to stable!
</docs-card>
-->

<docs-card title="점진적 하이드레이션 활성화" link="2025년 2분기 완료">
v17에서 하이드레이션을 개발자 미리보기에서 안정화했으며, 이후 LCP가 40-50% 개선되는 결과를 꾸준히 관찰했습니다. 그 뒤 점진적 하이드레이션의 프로토타입을 개발하기 시작했고 ng-conf 무대에서 데모를 공개했습니다.

v19에서는 `@defer` 블록을 기반으로 하는 점진적 하이드레이션을 개발자 미리보기로 제공했습니다. Angular v20에서는 이를 안정화했습니다!
</docs-card>

<!--
<docs-card title="Deliver Angular Signals" link="Completed in Q2 2025" href="https://github.com/angular/angular/discussions/49685">
This project rethinks the Angular reactivity model by introducing Signals as a reactivity primitive. The initial planning resulted in hundreds of discussions, conversations with developers, feedback sessions, user experience studies, and a series of RFCs, which received over 1,000 comments.

In Angular v20 we graduated all the fundamental reactivity primitives to stable including signal, effect, linkedSignal, signal-based queries, and inputs.
</docs-card>
-->

<docs-card title="Angular 시그널 제공" link="2025년 2분기 완료" href="https://github.com/angular/angular/discussions/49685">
이 프로젝트는 반응성의 기본 요소로 시그널을 도입하여 Angular의 반응성 모델을 새롭게 설계합니다. 초기 계획 과정에서 수백 건의 논의, 개발자와의 대화, 피드백 세션, 사용자 경험 연구, 일련의 RFC가 이루어졌으며, RFC에는 1,000개가 넘는 의견이 달렸습니다.

Angular v20에서는 signal, effect, linkedSignal, 시그널 기반 쿼리와 입력을 포함한 모든 핵심 반응성 기본 요소를 안정화했습니다.
</docs-card>

<!--
<docs-card title="Support two-dimensional drag-and-drop" link="Completed in Q2 2024" href="https://github.com/angular/components/issues/13372">
As part of this project, we implemented mixed orientation support for the Angular CDK drag and drop. This is one of the repository's most highly requested features.
</docs-card>
-->

<docs-card title="2차원 드래그 앤 드롭 지원" link="2024년 2분기 완료" href="https://github.com/angular/components/issues/13372">
이 프로젝트의 일환으로 Angular CDK 드래그 앤 드롭에 방향을 혼합하여 사용할 수 있는 기능을 구현했습니다. 이는 저장소에서 가장 많이 요청된 기능 중 하나입니다.
</docs-card>

<!--
<docs-card title="Event replay with SSR and prerendering" link="Completed in Q4 2024" href="api/platform-browser/withEventReplay">
In v18 we introduced an event replay functionality when using server-side rendering or prerendering. For this feature we depend on the event dispatch primitive (previously known as jsaction) that is running on Google.com.

In Angular v19 we graduated event replay to stable and enabled it by default for all new projects.
</docs-card>
-->

<docs-card title="SSR 및 사전 렌더링에서 이벤트 재실행" link="2024년 4분기 완료" href="api/platform-browser/withEventReplay">
v18에서는 서버 사이드 렌더링이나 사전 렌더링을 사용할 때 이벤트를 재실행하는 기능을 도입했습니다. 이 기능은 Google.com에서 사용하는 이벤트 디스패치 기본 요소(이전 이름은 jsaction)에 의존합니다.

Angular v19에서 이벤트 재실행을 안정화하고 모든 새 프로젝트에서 기본적으로 활성화했습니다.
</docs-card>

<!--
<docs-card title="Integrate Angular Language Service with Schematics" link="Completed in Q4 2024">
To make it easier for developers to use modern Angular APIs, we enabled integration between the Angular language service and schematics which allows you to refactor your app with a single click.
</docs-card>
-->

<docs-card title="Angular 언어 지원 서비스와 스키매틱 통합" link="2024년 4분기 완료">
개발자가 최신 Angular API를 쉽게 사용할 수 있도록 Angular 언어 지원 서비스와 스키매틱을 통합하여, 클릭 한 번으로 앱을 리팩터링할 수 있게 했습니다.
</docs-card>

<!--
<docs-card title="Streamline standalone imports with Language Service" link="Completed in Q4 2024">
As part of this initiative, the language service automatically imports components and pipes in standalone and NgModule-based apps. Additionally, we've added a template diagnostic to highlight unused imports in standalone components, which should help make application bundles smaller.
</docs-card>
-->

<docs-card title="언어 지원 서비스로 독립형 가져오기 간소화" link="2024년 4분기 완료">
이 작업의 일환으로 언어 지원 서비스가 독립형 앱과 NgModule 기반 앱에서 컴포넌트와 파이프를 자동으로 가져오도록 했습니다. 또한 독립형 컴포넌트에서 사용하지 않는 가져오기를 강조하는 템플릿 진단을 추가하여 애플리케이션 번들 크기를 줄이는 데 도움이 되도록 했습니다.
</docs-card>

<!--
<docs-card title="Local template variables" link="Completed in Q3 2024">
We've released the support for local template variables in Angular, see [`@let`](/api/core/@let) for additional information.
</docs-card>
-->

<docs-card title="로컬 템플릿 변수" link="2024년 3분기 완료">
Angular에 로컬 템플릿 변수 지원을 추가했습니다. 자세한 내용은 [`@let`](/api/core/@let)을 참고하세요.
</docs-card>

<!--
<docs-card title="Expand the customizability of Angular Material" link="Completed in Q2 2024" href="https://material.angular.dev/guide/theming">
To provide better customization of our Angular Material components and enable Material 3 capabilities, we'll be collaborating with Google's Material Design team on defining token-based theming APIs.

In v17.2 we shared experimental support for Angular Material 3 and in v18 we graduated it to stable.
</docs-card>
-->

<docs-card title="Angular Material의 맞춤 설정 확장" link="2024년 2분기 완료" href="https://material.angular.dev/guide/theming">
Angular Material 컴포넌트를 더 유연하게 맞춤 설정하고 Material 3 기능을 사용할 수 있도록 Google의 Material Design 팀과 협력하여 토큰 기반 테마 API를 정의할 예정입니다.

v17.2에서 Angular Material 3의 실험적 지원을 공개했고, v18에서는 이를 안정화했습니다.
</docs-card>

<!--
<docs-card title="Introduce deferred loading" link="Completed in Q2 2024" href="guide/templates/defer">
In v17 we shipped deferrable views in developer preview, which provide an ergonomic API for deferred code loading. In v18 we enabled deferrable views for library developers and graduated the API to stable.
</docs-card>
-->

<docs-card title="지연 로딩 도입" link="2024년 2분기 완료" href="guide/templates/defer">
v17에서 지연 가능한 뷰를 개발자 미리보기로 제공하여 코드를 편리하게 지연 로딩하는 API를 도입했습니다. v18에서는 라이브러리 개발자도 지연 가능한 뷰를 사용할 수 있게 했으며 API를 안정화했습니다.
</docs-card>

<!--
<docs-card title="iframe support in Angular DevTools" link="Completed in Q2 2024">
We enabled debugging and profiling of Angular apps embedded within an iframe on the page.
</docs-card>
-->

<docs-card title="Angular DevTools의 iframe 지원" link="2024년 2분기 완료">
페이지의 iframe 안에 포함된 Angular 앱을 디버깅하고 프로파일링할 수 있도록 했습니다.
</docs-card>

<!--
<docs-card title="Automation for transition of existing hybrid rendering projects to esbuild and vite" link="Completed in Q2 2024" href="tools/cli/build-system-migration">
In v17 we shipped a vite and esbuild-based application builder and enabled it for new projects by default. It improves build time for projects using hybrid rendering with up to 87%. As part of v18 we shipped schematics and a guide that migrate existing projects using hybrid rendering to the new build pipeline.
</docs-card>
-->

<docs-card title="기존 하이브리드 렌더링 프로젝트의 esbuild 및 vite 전환 자동화" link="2024년 2분기 완료" href="tools/cli/build-system-migration">
v17에서 vite와 esbuild 기반 애플리케이션 빌더를 제공하고 새 프로젝트에서 기본적으로 활성화했습니다. 이 빌더는 하이브리드 렌더링 프로젝트의 빌드 시간을 최대 87% 개선합니다. v18의 일부로 기존 하이브리드 렌더링 프로젝트를 새 빌드 파이프라인으로 마이그레이션하는 스키매틱과 가이드를 제공했습니다.
</docs-card>

<!--
<docs-card title="Make Angular.dev the official home for Angular developers" link="Completed in Q2 2024" href="https://goo.gle/angular-dot-dev">
Angular.dev is the new site, domain and home for Angular development. The new site contains updated documentation, tutorials and guidance that will help developers build with Angular’s latest features.
</docs-card>
-->

<docs-card title="Angular.dev를 Angular 개발자의 공식 홈으로 전환" link="2024년 2분기 완료" href="https://goo.gle/angular-dot-dev">
Angular.dev는 Angular 개발을 위한 새로운 사이트이자 도메인, 공식 홈입니다. 새 사이트에는 개발자가 Angular의 최신 기능으로 개발하는 데 도움이 되는 최신 문서, 튜토리얼, 안내가 포함되어 있습니다.
</docs-card>

<!--
<docs-card title="Introduce built-in control flow" link="Completed in Q2 2024" href="guide/templates/control-flow">
In v17 we shipped a developer preview version of a new control flow. It brings significant performance improvements and better ergonomics for template authoring. We also provided a migration of existing `*ngIf`, `*ngFor`, and `*ngSwitch` which you can run to move your project to the new implementation. As of v18 the built-in control flow is now stable.
</docs-card>
-->

<docs-card title="내장 흐름 제어 도입" link="2024년 2분기 완료" href="guide/templates/control-flow">
v17에서 새로운 흐름 제어을 개발자 미리보기로 제공했습니다. 이는 성능을 크게 개선하고 템플릿을 더 편리하게 작성할 수 있도록 합니다. 기존 `*ngIf`, `*ngFor`, `*ngSwitch`를 새 구현으로 전환할 수 있는 마이그레이션도 제공했습니다. v18부터 내장 흐름 제어이 안정화되었습니다.
</docs-card>

<!--
<docs-card title="Modernize getting started tutorial" link="Completed in Q4 2023">
Over the past two quarters, we developed a new [video](https://www.youtube.com/watch?v=xAT0lHYhHMY&list=PL1w1q3fL4pmj9k1FrJ3Pe91EPub2_h4jF) and [textual](/tutorials/learn-angular) tutorial based on standalone components.
</docs-card>
-->

<docs-card title="시작하기 튜토리얼 현대화" link="2023년 4분기 완료">
지난 두 분기 동안 독립형 컴포넌트를 기반으로 새로운 [동영상](https://www.youtube.com/watch?v=xAT0lHYhHMY&list=PL1w1q3fL4pmj9k1FrJ3Pe91EPub2_h4jF) 및 [텍스트](/tutorials/learn-angular) 튜토리얼을 개발했습니다.
</docs-card>

<!--
<docs-card title="Investigate modern bundlers" link="Completed in Q4 2023" href="guide/hydration">
In Angular v16, we released a developer preview of an esbuild-based builder with support for `ng build` and `ng serve`. The `ng serve` development server uses Vite and a multi-file compilation by esbuild and the Angular compiler. In v17 we graduated the build tooling from developer preview and enabled it by default for new projects.
</docs-card>
-->

<docs-card title="최신 번들러 조사" link="2023년 4분기 완료" href="guide/hydration">
Angular v16에서 `ng build`와 `ng serve`를 지원하는 esbuild 기반 빌더를 개발자 미리보기로 릴리즈했습니다. `ng serve` 개발 서버는 Vite와 esbuild 및 Angular 컴파일러의 다중 파일 컴파일을 사용합니다. v17에서는 이 빌드 도구를 개발자 미리보기에서 안정화하고 새 프로젝트에서 기본적으로 활성화했습니다.
</docs-card>

<!--
<docs-card title="Introduce dependency injection debugging APIs" link="Completed in Q4 2023" href="tools/devtools">
To improve the debugging utilities of Angular and Angular DevTools, we'll work on APIs that provide access to the dependency injection runtime. As part of the project, we'll expose debugging methods that allow us to explore the injector hierarchy and the dependencies across their associated providers. As of v17, we shipped a feature that enables us to plug into the dependency injection life-cycle. We also launched a visualization of the injector tree and inspection of the providers declared inside each individual node,
</docs-card>
-->

<docs-card title="의존성 주입 디버깅 API 도입" link="2023년 4분기 완료" href="tools/devtools">
Angular와 Angular DevTools의 디버깅 기능을 개선하기 위해 의존성 주입 런타임에 접근하는 API를 개발할 예정입니다. 이 프로젝트의 일환으로 인젝터 계층과 관련 프로바이더 간 의존성을 탐색할 수 있는 디버깅 메서드를 공개할 예정입니다. v17에서는 의존성 주입 라이프사이클에 연결할 수 있는 기능을 제공했습니다. 인젝터 트리 시각화와 각 노드에 선언된 프로바이더를 검사하는 기능도 출시했습니다.
</docs-card>

<!--
<docs-card title="Improve documentation and schematics for standalone components" link="Completed in Q4 2023" href="essentials/components">
We released a developer preview of the `ng new --standalone` schematics collection, allowing you to create apps free of NgModules. In v17 we switched the new application authoring format to standalone APIs and changed the documentation to reflect the recommendation. Additionally, we shipped schematics which support updating existing applications to standalone components, directives, and pipes. Even though NgModules will stick around for foreseeable future, we recommend you to explore the benefits of the new APIs to improve developer experience and benefit from the new features we build for them.
</docs-card>
-->

<docs-card title="독립형 컴포넌트 문서와 스키매틱 개선" link="2023년 4분기 완료" href="essentials/components">
NgModule 없이 앱을 만들 수 있는 `ng new --standalone` 스키매틱 모음을 개발자 미리보기로 릴리즈했습니다. v17에서는 새 애플리케이션 작성 형식을 독립형 API로 전환하고 이 권장 사항을 반영하도록 문서를 변경했습니다. 또한 기존 애플리케이션을 독립형 컴포넌트, 디렉티브, 파이프로 업데이트할 수 있는 스키매틱을 제공했습니다. 당분간 NgModule을 계속 제공하겠지만, 개발자 경험을 개선하고 새 API를 위해 개발하는 새로운 기능의 이점을 누릴 수 있도록 새 API를 살펴보는 것을 권장합니다.
</docs-card>

<!--
<docs-card title="Explore hydration and server-side rendering improvements" link="Completed in Q4 2023">
In v16, we released a developer preview of non-destructive full hydration, see the [hydration guide](guide/hydration) and the [blog post](https://blog.angular.dev/whats-next-for-server-side-rendering-in-angular-2a6f27662b67) for additional information. We're already seeing significant improvements to Core Web Vitals, including [LCP](https://web.dev/lcp) and [CLS](https://web.dev/cls). In lab tests, we consistently observed 45% better LCP of a real-world app.

In v17 we launched hydration outside developer preview and did a series of improvements in the server-side rendering story, including: route discovery at runtime for SSG, up to 87% faster build times for hybrid rendered applications, prompt that enables hybrid rendering for new projects.
</docs-card>
-->

<docs-card title="하이드레이션과 서버 사이드 렌더링 개선 탐색" link="2023년 4분기 완료">
v16에서 비파괴 전체 하이드레이션을 개발자 미리보기로 릴리즈했습니다. 자세한 내용은 [하이드레이션 가이드](guide/hydration)와 [블로그 글](https://blog.angular.dev/whats-next-for-server-side-rendering-in-angular-2a6f27662b67)을 참고하세요. [LCP](https://web.dev/lcp)와 [CLS](https://web.dev/cls)를 포함한 Core Web Vitals에서 이미 상당한 개선을 확인했습니다. 실험실 테스트에서는 실제 애플리케이션의 LCP가 45% 개선되는 결과를 꾸준히 관찰했습니다.

v17에서는 하이드레이션을 개발자 미리보기에서 안정화하고 서버 사이드 렌더링과 관련된 여러 개선을 제공했습니다. 여기에는 SSG를 위한 런타임 라우팅 규칙 탐색, 하이브리드 렌더링 애플리케이션의 빌드 시간 최대 87% 단축, 새 프로젝트에서 하이브리드 렌더링을 활성화하는 프롬프트가 포함됩니다.
</docs-card>

<!--
<docs-card title="Non-destructive full app hydration" link="Completed in Q1 2023" href="guide/hydration">
In v16, we released a developer preview of non-destructive full hydration, which allows Angular to reuse existing DOM nodes on a server-side rendered page, instead of re-creating an app from scratch. See additional information in the hydration guide.
</docs-card>
-->

<docs-card title="비파괴 전체 앱 하이드레이션" link="2023년 1분기 완료" href="guide/hydration">
v16에서 비파괴 전체 하이드레이션을 개발자 미리보기로 릴리즈했습니다. 이를 통해 Angular는 앱을 처음부터 다시 만드는 대신 서버 사이드 렌더링된 페이지의 기존 DOM 노드를 재사용할 수 있습니다. 자세한 내용은 하이드레이션 가이드를 참고하세요.
</docs-card>

<!--
<docs-card title="Improvements in the image directive" link="Completed in Q1 2023" href="guide/image-optimization">
We released the Angular image directive as stable in v15. We introduced a new fill mode feature that enables images to fit within their parent container rather than having explicit dimensions. Over the past two months, the Chrome Aurora team backported the directive to v12 and newer.
</docs-card>
-->

<docs-card title="이미지 디렉티브 개선" link="2023년 1분기 완료" href="guide/image-optimization">
v15에서 Angular 이미지 디렉티브를 안정화하여 릴리즈했습니다. 명시적인 크기를 지정하는 대신 이미지가 부모 컨테이너에 맞춰 채워지도록 하는 새로운 채우기 모드 기능을 도입했습니다. 지난 두 달 동안 Chrome Aurora 팀은 이 디렉티브를 v12 이후 버전으로 백포트했습니다.
</docs-card>

<!--
<docs-card title="Documentation refactoring" link="Completed in Q1 2023" href="https://angular.io">
Ensure all existing documentation fits into a consistent set of content types. Update excessive use of tutorial-style documentation into independent topics. We want to ensure the content outside the main tutorials is self-sufficient without being tightly coupled to a series of guides. In Q2 2022, we refactored the template content and dependency injection. In Q1 2023, we improved the HTTP guides, and with this, we're putting the documentation refactoring project on hold.
</docs-card>
-->

<docs-card title="문서 리팩터링" link="2023년 1분기 완료" href="https://angular.io">
기존 문서 전체가 일관된 콘텐츠 유형 체계에 맞도록 정리합니다. 튜토리얼 형식에 지나치게 의존하는 문서는 독립적인 주제로 바꿉니다. 주요 튜토리얼 외의 콘텐츠가 일련의 가이드에 강하게 결합되지 않고 독립적으로 이해될 수 있도록 하는 것이 목표입니다. 2022년 2분기에는 템플릿과 의존성 주입 콘텐츠를 리팩터링했습니다. 2023년 1분기에는 HTTP 가이드를 개선했으며, 이를 끝으로 문서 리팩터링 프로젝트를 잠정 중단합니다.
</docs-card>

<!--
<docs-card title="Improve image performance" link="Completed in Q4 2022" href="guide/image-optimization">
The Aurora and the Angular teams are working on the implementation of an image directive that aims to improve Core Web Vitals. We shipped a stable version of the image directive in v15.
</docs-card>
-->

<docs-card title="이미지 성능 개선" link="2022년 4분기 완료" href="guide/image-optimization">
Aurora 팀과 Angular 팀은 Core Web Vitals 개선을 목표로 이미지 디렉티브를 구현하고 있습니다. v15에서 이미지 디렉티브의 안정 버전을 제공했습니다.
</docs-card>

<!--
<docs-card title="Modern CSS" link="Completed in Q4 2022" href="https://blog.angular.dev/modern-css-in-angular-layouts-4a259dca9127">
The Web ecosystem evolves constantly and we want to reflect the latest modern standards in Angular. In this project we aim to provide guidelines on using modern CSS features in Angular to ensure developers follow best practices for layout, styling, etc. We shared official guidelines for layout and as part of the initiative stopped publishing flex layout.
</docs-card>
-->

<docs-card title="최신 CSS" link="2022년 4분기 완료" href="https://blog.angular.dev/modern-css-in-angular-layouts-4a259dca9127">
웹 생태계는 끊임없이 발전하며, Angular에도 최신 표준을 반영하고자 합니다. 이 프로젝트는 개발자가 레이아웃과 스타일링 등의 모범 사례를 따를 수 있도록 Angular에서 최신 CSS 기능을 사용하는 지침을 제공하는 것을 목표로 합니다. 공식 레이아웃 지침을 공개했으며, 이 작업의 일환으로 flex layout의 배포를 중단했습니다.
</docs-card>

<!--
<docs-card title="Support adding directives to host elements" link="Completed in Q4 2022" href="guide/directives/directive-composition-api">
A long-standing feature request is to add the ability to add directives to host elements. The feature lets developers augment their own components with additional behaviors without using inheritance. In v15 we shipped our directive composition API, which enables enhancing host elements with directives.
</docs-card>
-->

<docs-card title="호스트 엘리먼트에 디렉티브 추가 지원" link="2022년 4분기 완료" href="guide/directives/directive-composition-api">
호스트 엘리먼트에 디렉티브를 추가하는 기능은 오래전부터 요청되어 왔습니다. 이 기능을 통해 개발자는 상속 없이 자신의 컴포넌트에 동작을 추가할 수 있습니다. v15에서 호스트 엘리먼트를 디렉티브로 확장할 수 있는 디렉티브 조합 API를 제공했습니다.
</docs-card>

<!--
<docs-card title="Better stack traces" link="Completed in Q4 2022" href="https://developer.chrome.com/blog/devtools-better-angular-debugging/">
The Angular and the Chrome DevTools are working together to enable more readable stack traces for error messages. In v15 we released improved relevant and linked stack traces. As a lower priority initiative, we'll be exploring how to make the stack traces friendlier by providing more accurate call frame names for templates.
</docs-card>
-->

<docs-card title="스택 트레이스 개선" link="2022년 4분기 완료" href="https://developer.chrome.com/blog/devtools-better-angular-debugging/">
Angular 팀과 Chrome DevTools 팀은 오류 메시지의 스택 트레이스를 더 읽기 쉽게 만들기 위해 협력하고 있습니다. v15에서는 관련성이 높고 링크로 연결되는 개선된 스택 트레이스를 릴리즈했습니다. 우선순위가 더 낮은 작업으로, 템플릿에 더 정확한 호출 프레임 이름을 제공해 스택 트레이스를 이해하기 쉽게 만드는 방법을 탐색할 예정입니다.
</docs-card>

<!--
<docs-card title="Enhanced Angular Material components by integrating MDC Web" link="Completed in Q4 2022" href="https://material.angular.dev/guide/mdc-migration">
MDC Web is a library created by the Google Material Design team that provides reusable primitives for building Material Design components. The Angular team is incorporating these primitives into Angular Material. Using MDC Web aligns Angular Material more closely with the Material Design specification, expands accessibility, improves component quality, and improves the velocity of our team.
</docs-card>
-->

<docs-card title="MDC Web 통합으로 Angular Material 컴포넌트 개선" link="2022년 4분기 완료" href="https://material.angular.dev/guide/mdc-migration">
MDC Web은 Google Material Design 팀이 만든 라이브러리로, Material Design 컴포넌트를 만들기 위한 재사용 가능한 기본 요소를 제공합니다. Angular 팀은 이 기본 요소를 Angular Material에 통합하고 있습니다. MDC Web을 사용하면 Angular Material이 Material Design 명세에 더 가까워지고, 접근성과 컴포넌트 품질이 향상되며, 팀의 개발 속도도 빨라집니다.
</docs-card>

<!--
<docs-card title="Implement APIs for optional NgModules" link="Completed in Q4 2022" href="https://blog.angular.dev/angular-v15-is-now-available-df7be7f2f4c8">
In the process of making Angular simpler, we are working on introducing APIs that allow developers to initialize apps, instantiate components, and use the router without NgModules. Angular v14 introduces developer preview of the APIs for standalone components, directives, and pipes. In the next few quarters we'll collect feedback from developers and finalize the project making the APIs stable. As the next step we will work on improving use cases such as TestBed, Angular elements, etc.
</docs-card>
-->

<docs-card title="NgModule을 선택적으로 사용하는 API 구현" link="2022년 4분기 완료" href="https://blog.angular.dev/angular-v15-is-now-available-df7be7f2f4c8">
Angular를 더 단순하게 만들기 위해 개발자가 NgModule 없이 앱을 초기화하고, 컴포넌트 인스턴스를 만들고, 라우터를 사용할 수 있는 API를 도입하고 있습니다. Angular v14는 독립형 컴포넌트, 디렉티브, 파이프를 위한 API의 개발자 미리보기를 도입합니다. 앞으로 몇 분기 동안 개발자의 피드백을 수집하고 API를 안정화하여 프로젝트를 마무리할 예정입니다. 다음 단계로는 TestBed, Angular 엘리먼트 등의 사용 사례를 개선할 예정입니다.
</docs-card>

<!--
<docs-card title="Allow binding to protected fields in templates" link="Completed in Q2 2022" href="guide/templates/binding">
To improve the encapsulation of Angular components we enabled binding to protected members of the component instance. This way you'll no longer have to expose a field or a method as public to use it inside your templates.
</docs-card>
-->

<docs-card title="템플릿에서 protected 필드 바인딩 허용" link="2022년 2분기 완료" href="guide/templates/binding">
Angular 컴포넌트의 캡슐화를 개선하기 위해 컴포넌트 인스턴스의 protected 멤버에 바인딩할 수 있도록 했습니다. 따라서 템플릿에서 사용하기 위해 필드나 메서드를 public으로 노출할 필요가 없습니다.
</docs-card>

<!--
<docs-card title="Publish guides on advanced concepts" link="Completed in Q2 2022" href="https://angular.io/guide/change-detection">
Develop and publish an in-depth guide on change detection. Develop content for performance profiling of Angular apps. Cover how change detection interacts with Zone.js and explain when it gets triggered, how to profile its duration, as well as common practices for performance optimization.
</docs-card>
-->

<docs-card title="고급 개념 가이드 발행" link="2022년 2분기 완료" href="https://angular.io/guide/change-detection">
변경 감지를 심도 있게 다루는 가이드를 작성하고 발행합니다. Angular 앱의 성능 프로파일링 콘텐츠를 작성합니다. 변경 감지가 Zone.js와 상호작용하는 방식을 다루고, 언제 실행되는지, 실행 시간을 어떻게 프로파일링하는지, 성능 최적화에 일반적으로 어떤 방법을 사용하는지 설명합니다.
</docs-card>

<!--
<docs-card title="Rollout strict typings for @angular/forms" link="Completed in Q2 2022" href="guide/forms/typed-forms">
In Q4 2021 we designed a solution for introducing strict typings for forms and in Q1 2022 we concluded the corresponding request for comments. Currently, we are implementing a rollout strategy with an automated migration step that will enable the improvements for existing projects. We are first testing the solution with more than 2,500 projects at Google to ensure a smooth migration path for the external community.
</docs-card>
-->

<docs-card title="@angular/forms에 엄격한 타입 적용" link="2022년 2분기 완료" href="guide/forms/typed-forms">
2021년 4분기에 폼에 엄격한 타입을 도입하는 방안을 설계했고, 2022년 1분기에 관련 RFC를 마무리했습니다. 현재는 기존 프로젝트에도 개선 사항을 적용할 수 있도록 자동 마이그레이션 단계를 포함한 도입 전략을 구현하고 있습니다. 외부 커뮤니티에 원활한 마이그레이션 경로를 제공하기 위해 먼저 Google의 2,500개 이상 프로젝트에서 이 방안을 테스트하고 있습니다.
</docs-card>

<!--
<docs-card title="Remove legacy View Engine" link="Completed in Q1 2022" href="https://blog.angular.dev/angular-v15-is-now-available-df7be7f2f4c8">
After the transition of all our internal tooling to Ivy is completed, we will remove the legacy View Engine for reduced Angular conceptual overhead, smaller package size, lower maintenance cost, and lower codebase complexity.
</docs-card>
-->

<docs-card title="기존 View Engine 제거" link="2022년 1분기 완료" href="https://blog.angular.dev/angular-v15-is-now-available-df7be7f2f4c8">
모든 내부 도구를 Ivy로 전환한 뒤 기존 View Engine을 제거하여 Angular의 개념적 부담, 패키지 크기, 유지 관리 비용, 코드베이스의 복잡성을 줄일 예정입니다.
</docs-card>

<!--
<docs-card title="Simplified Angular mental model with optional NgModules" link="Completed in Q1 2022" href="https://blog.angular.dev/angular-v15-is-now-available-df7be7f2f4c8">
To simplify the Angular mental model and learning journey, we will be working on making NgModules optional. This work lets developers develop standalone components and implement an alternative API for declaring the compilation scope of the component. We kicked this project off with high-level design discussions that we captured in an RFC.
</docs-card>
-->

<docs-card title="NgModule을 선택 사항으로 만들어 Angular 이해 방식 단순화" link="2022년 1분기 완료" href="https://blog.angular.dev/angular-v15-is-now-available-df7be7f2f4c8">
Angular를 이해하고 배우는 과정을 단순화하기 위해 NgModule을 선택 사항으로 만드는 작업을 진행할 예정입니다. 이를 통해 개발자가 독립형 컴포넌트를 개발할 수 있도록 하고, 컴포넌트의 컴파일 범위를 선언하는 대체 API를 구현합니다. 이 프로젝트는 상위 수준 설계 논의로 시작했으며, 논의 내용을 RFC에 정리했습니다.
</docs-card>

<!--
<docs-card title="Design strict typing for @angular/forms" link="Completed in Q1 2022" href="guide/forms/typed-forms">
We will work on finding a way to implement stricter type checking for reactive forms with minimal backward incompatible implications. This way, we let developers catch more issues during development time, enable better text editor and IDE support, and improve the type checking for reactive forms.
</docs-card>
-->

<docs-card title="@angular/forms의 엄격한 타입 설계" link="2022년 1분기 완료" href="guide/forms/typed-forms">
하위 호환성을 깨뜨리는 영향을 최소화하면서 반응형 폼에 더 엄격한 타입 검사를 구현하는 방법을 찾을 예정입니다. 이를 통해 개발자가 개발 중에 더 많은 문제를 발견하고, 텍스트 편집기와 IDE의 지원을 강화하며, 반응형 폼의 타입 검사를 개선할 수 있습니다.
</docs-card>

<!--
<docs-card title="Improve integration of Angular DevTools with framework" link="Completed in Q1 2022" href="tools/devtools">
To improve the integration of Angular DevTools with the framework, we are working on moving the codebase to the angular/angular monorepository. This includes transitioning Angular DevTools to Bazel and integrating it into the existing processes and CI pipeline.
</docs-card>
-->

<docs-card title="Angular DevTools와 프레임워크 통합 개선" link="2022년 1분기 완료" href="tools/devtools">
Angular DevTools와 프레임워크의 통합을 개선하기 위해 코드베이스를 angular/angular 모노레포로 옮기는 작업을 진행하고 있습니다. 여기에는 Angular DevTools를 Bazel로 전환하고 기존 프로세스와 CI 파이프라인에 통합하는 작업이 포함됩니다.
</docs-card>

<!--
<docs-card title="Launch advanced compiler diagnostics" link="Completed in Q1 2022" href="extended-diagnostics">
Extend the diagnostics of the Angular compiler outside type checking. Introduce other correctness and conformance checks to further guarantee correctness and best practices.
</docs-card>
-->

<docs-card title="고급 컴파일러 진단 출시" link="2022년 1분기 완료" href="extended-diagnostics">
Angular 컴파일러의 진단 범위를 타입 검사 너머로 확장합니다. 정확성과 모범 사례 준수를 더욱 보장하기 위해 다른 정확성 검사와 준수 검사를 도입합니다.
</docs-card>

<!--
<docs-card title="Update our e2e testing strategy" link="Completed in Q3 2021" href="guide/testing">
To ensure we provide a future-proof e2e testing strategy, we want to evaluate the state of Protractor, community innovations, e2e best practices, and explore novel opportunities. As first steps of the effort, we shared an RFC and worked with partners to ensure smooth integration between the Angular CLI and state-of-the-art tooling for e2e testing. As the next step, we need to finalize the recommendations and compile a list of resources for the transition.
</docs-card>
-->

<docs-card title="e2e 테스트 전략 업데이트" link="2021년 3분기 완료" href="guide/testing">
장기적으로 유효한 e2e 테스트 전략을 제공하기 위해 Protractor의 현황, 커뮤니티의 혁신, e2e 모범 사례를 평가하고 새로운 기회를 탐색하고자 합니다. 첫 단계로 RFC를 공개하고 파트너와 협력하여 Angular CLI와 최신 e2e 테스트 도구가 원활하게 통합되도록 했습니다. 다음 단계에서는 권장 사항을 확정하고 전환에 필요한 자료 목록을 정리해야 합니다.
</docs-card>

<!--
<docs-card title="Angular libraries use Ivy" link="Completed in Q3 2021" href="tools/libraries">
Earlier in 2020, we shared an RFC for Ivy library distribution. After invaluable feedback from the community, we developed a design of the project. We are now investing in the development of Ivy library distribution, including an update of the library package format to use Ivy compilation, unblock the deprecation of the View Engine library format, and ngcc.
</docs-card>
-->

<docs-card title="Angular 라이브러리의 Ivy 사용" link="2021년 3분기 완료" href="tools/libraries">
2020년 초에 Ivy 라이브러리 배포에 관한 RFC를 공개했습니다. 커뮤니티의 소중한 피드백을 바탕으로 프로젝트를 설계했습니다. 현재는 Ivy 라이브러리 배포 개발에 투자하고 있습니다. 여기에는 Ivy 컴파일을 사용하도록 라이브러리 패키지 형식을 업데이트하고, View Engine 라이브러리 형식과 ngcc의 지원 중단을 가능하게 하는 작업이 포함됩니다.
</docs-card>

<!--
<docs-card title="Improve test times and debugging with automatic test environment tear down" link="Completed in Q3 2021" href="guide/testing">
To improve test time and create better isolation across tests, we want to change TestBed to automatically clean up and tear down the test environment after each test run.
</docs-card>
-->

<docs-card title="테스트 환경 자동 정리로 테스트 시간과 디버깅 개선" link="2021년 3분기 완료" href="guide/testing">
테스트 시간을 줄이고 테스트 간 격리를 강화하기 위해 각 테스트 실행 후 TestBed가 테스트 환경을 자동으로 정리하고 해제하도록 변경하고자 합니다.
</docs-card>

<!--
<docs-card title="Deprecate and remove IE11 support" link="Completed in Q3 2021" href="https://github.com/angular/angular/issues/41840">
Internet Explorer 11 (IE11) has been preventing Angular from taking advantage of some of the modern features of the Web platform. As part of this project we are going to deprecate and remove IE11 support to open the path for modern features that evergreen browsers provide. We ran an RFC to collect feedback from the community and decide on next steps to move forward.
</docs-card>
-->

<docs-card title="IE11 지원 중단 및 제거" link="2021년 3분기 완료" href="https://github.com/angular/angular/issues/41840">
Internet Explorer 11(IE11)은 Angular가 웹 플랫폼의 일부 최신 기능을 활용하는 데 걸림돌이 되어 왔습니다. 이 프로젝트의 일환으로 IE11 지원을 중단하고 제거하여 자동으로 최신 상태를 유지하는 브라우저가 제공하는 현대적인 기능을 활용할 수 있도록 할 예정입니다. 커뮤니티의 피드백을 수집하고 앞으로의 단계를 결정하기 위해 RFC를 진행했습니다.
</docs-card>

<!--
<docs-card title="Leverage ES2017+ as the default output language" link="Completed in Q3 2021" href="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html">
Supporting modern browsers lets us take advantage of the more compact, expressive, and performant new syntax of JavaScript. As part of this project we will investigate what the blockers are to moving forward with this effort, and take the steps to enable it.
</docs-card>
-->

<docs-card title="ES2017+를 기본 출력 언어로 활용" link="2021년 3분기 완료" href="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html">
최신 브라우저를 지원하면 더 간결하고 표현력이 높으며 성능이 뛰어난 새로운 JavaScript 문법을 활용할 수 있습니다. 이 프로젝트에서는 이를 추진하는 데 어떤 장애물이 있는지 조사하고 필요한 조치를 취할 예정입니다.
</docs-card>

<!--
<docs-card title="Accelerated debugging and performance profiling with Angular DevTools" link="Completed in Q2 2021" href="tools/devtools">
We are working on development tooling for Angular that provides utilities for debugging and performance profiling. This project aims to help developers understand the component structure and the change detection in an Angular app.
</docs-card>
-->

<docs-card title="Angular DevTools로 디버깅과 성능 프로파일링 가속화" link="2021년 2분기 완료" href="tools/devtools">
디버깅과 성능 프로파일링 유틸리티를 제공하는 Angular 개발 도구를 만들고 있습니다. 이 프로젝트는 개발자가 Angular 앱의 컴포넌트 구조와 변경 감지를 이해하도록 돕는 것을 목표로 합니다.
</docs-card>

<!--
<docs-card title="Streamline releases with consolidated Angular versioning & branching" link="Completed in Q2 2021" href="reference/releases">
We want to consolidate release management tooling between the multiple GitHub repositories for Angular (angular/angular, angular/angular-cli, and angular/components). This effort lets us reuse infrastructure, unify and simplify processes, and improve the reliability of our release process.
</docs-card>
-->

<docs-card title="Angular 버전 관리와 브랜치 통합으로 릴리즈 간소화" link="2021년 2분기 완료" href="reference/releases">
Angular의 여러 GitHub 저장소(angular/angular, angular/angular-cli, angular/components)에서 릴리즈 관리 도구를 통합하고자 합니다. 이를 통해 인프라를 재사용하고, 프로세스를 통일하고 단순화하며, 릴리즈 프로세스의 신뢰성을 높일 수 있습니다.
</docs-card>

<!--
<docs-card title="Higher developer consistency with commit message standardization" link="Completed in Q2 2021" href="https://github.com/angular/angular">
We want to unify commit message requirements and conformance across Angular repositories (angular/angular, angular/components, and angular/angular-cli) to bring consistency to our development process and reuse infrastructure tooling.
</docs-card>
-->

<docs-card title="커밋 메시지 표준화로 개발 일관성 향상" link="2021년 2분기 완료" href="https://github.com/angular/angular">
개발 과정의 일관성을 높이고 인프라 도구를 재사용하기 위해 Angular 저장소(angular/angular, angular/components, angular/angular-cli) 전반의 커밋 메시지 요구 사항과 준수 방식을 통일하고자 합니다.
</docs-card>

<!--
<docs-card title="Transition the Angular language service to Ivy" link="Completed in Q2 2021" href="tools/language-service">
The goal of this project is to improve the experience and remove legacy dependency by transitioning the language service to Ivy. Today the language service still uses the View Engine compiler and type checking, even for Ivy apps. We want to use the Ivy template parser and improved type checking for the Angular Language service to match app behavior. This migration is also a step towards unblocking the removal of View Engine, which will simplify Angular, reduce the npm package size, and improve the maintainability of the framework.
</docs-card>
-->

<docs-card title="Angular 언어 지원 서비스를 Ivy로 전환" link="2021년 2분기 완료" href="tools/language-service">
이 프로젝트는 언어 지원 서비스를 Ivy로 전환하여 사용 경험을 개선하고 기존 의존성을 제거하는 것을 목표로 합니다. 현재 언어 지원 서비스는 Ivy 앱에서도 여전히 View Engine 컴파일러와 타입 검사를 사용합니다. Angular 언어 지원 서비스에 Ivy 템플릿 파서와 개선된 타입 검사를 사용하여 앱의 동작과 일치시키고자 합니다. 이 마이그레이션은 View Engine 제거를 가능하게 하는 단계이기도 하며, 이를 통해 Angular를 단순화하고 npm 패키지 크기를 줄이며 프레임워크의 유지 관리성을 개선할 수 있습니다.
</docs-card>

<!--
<docs-card title="Increased security with native Trusted Types in Angular" link="Completed in Q2 2021" href="best-practices/security">
In collaboration with the Google security team, we are adding support for the new Trusted Types API. This web platform API helps developers build more secure web apps.
</docs-card>
-->

<docs-card title="Angular의 네이티브 Trusted Types로 보안 강화" link="2021년 2분기 완료" href="best-practices/security">
Google 보안 팀과 협력하여 새로운 Trusted Types API 지원을 추가하고 있습니다. 이 웹 플랫폼 API는 개발자가 더 안전한 웹 앱을 만드는 데 도움이 됩니다.
</docs-card>

<!--
<docs-card title="Optimized build speed and bundle sizes with Angular CLI webpack 5" link="Completed in Q2 2021" href="tools/cli/build">
As part of the v11 release, we introduced an opt-in preview of webpack 5 in the Angular CLI. To ensure stability, we will continue iterating on the implementation to enable build speed and bundle size improvements.
</docs-card>
-->

<docs-card title="Angular CLI webpack 5로 빌드 속도와 번들 크기 최적화" link="2021년 2분기 완료" href="tools/cli/build">
v11 릴리즈의 일부로 Angular CLI에서 선택적으로 활성화할 수 있는 webpack 5 미리보기를 도입했습니다. 안정성을 보장하면서 빌드 속도와 번들 크기를 개선할 수 있도록 구현을 계속 다듬을 예정입니다.
</docs-card>

<!--
<docs-card title="Faster apps by inlining critical styles in Universal apps" link="Completed in Q1 2021" href="guide/ssr">
Loading external stylesheets is a blocking operation, which means that the browser cannot start rendering your app until it loads all the referenced CSS. Having render-blocking resources in the header of a page can significantly impact its load performance, for example, its first contentful paint. To make apps faster, we have been collaborating with the Google Chrome team on inlining critical CSS and loading the rest of the styles asynchronously.
</docs-card>
-->

<docs-card title="Universal 앱의 핵심 스타일 인라인화로 앱 속도 향상" link="2021년 1분기 완료" href="guide/ssr">
외부 스타일시트를 불러오는 작업은 렌더링을 차단하므로, 브라우저는 참조하는 CSS를 모두 불러오기 전까지 앱 렌더링을 시작할 수 없습니다. 페이지의 헤더에 렌더링을 차단하는 리소스가 있으면 최초 콘텐츠 표시 시간 같은 로딩 성능에 큰 영향을 줄 수 있습니다. 앱 속도를 높이기 위해 Google Chrome 팀과 협력하여 핵심 CSS를 인라인화하고 나머지 스타일을 비동기적으로 불러오도록 하고 있습니다.
</docs-card>

<!--
<docs-card title="Improve debugging with better Angular error messages" link="Completed in Q1 2021" href="errors">
Error messages often bring limited actionable information to help developers resolve them. We have been working on making error messages more discoverable by adding associated codes, developing guides, and other materials to ensure a smoother debugging experience.
</docs-card>
-->

<docs-card title="더 나은 Angular 오류 메시지로 디버깅 개선" link="2021년 1분기 완료" href="errors">
오류 메시지는 개발자가 문제를 해결하는 데 필요한 실질적인 정보를 충분히 제공하지 못하는 경우가 많습니다. 더 원활한 디버깅 경험을 위해 관련 코드를 추가하고 가이드와 기타 자료를 개발하여 오류 메시지에 대한 정보를 더 쉽게 찾을 수 있도록 작업하고 있습니다.
</docs-card>

<!--
<docs-card title="Improved developer onboarding with refreshed introductory documentation" link="Completed in Q1 2021" href="tutorials">
We will redefine the user learning journeys and refresh the introductory documentation. We will clearly state the benefits of Angular, how to explore its capabilities and provide guidance so developers can become proficient with the framework in as little time as possible.
</docs-card>
-->

<docs-card title="입문 문서 개편으로 개발자 온보딩 개선" link="2021년 1분기 완료" href="tutorials">
사용자의 학습 과정을 새롭게 정의하고 입문 문서를 개편할 예정입니다. Angular의 이점과 기능을 탐색하는 방법을 명확히 설명하고, 개발자가 가능한 한 짧은 시간에 프레임워크에 익숙해질 수 있도록 안내하겠습니다.
</docs-card>

<!--
<docs-card title="Expand component harnesses best practices" link="Completed in Q1 2021" href="https://material.angular.dev/guide/using-component-harnesses">
Angular CDK introduced the concept of component test harnesses to Angular in version 9. Test harnesses let component authors create supported APIs for testing component interactions. We are continuing to improve this harness infrastructure and clarifying the best practices around using harnesses. We are also working to drive more harness adoption inside of Google.
</docs-card>
-->

<docs-card title="컴포넌트 하네스 모범 사례 확장" link="2021년 1분기 완료" href="https://material.angular.dev/guide/using-component-harnesses">
Angular CDK는 버전 9에서 컴포넌트 테스트 하네스라는 개념을 Angular에 도입했습니다. 테스트 하네스를 사용하면 컴포넌트 작성자가 컴포넌트 상호작용을 테스트하기 위한 공식 지원 API를 만들 수 있습니다. 이 하네스 인프라를 계속 개선하고 하네스 사용 모범 사례를 명확히 하고 있습니다. Google 내부에서도 하네스 도입을 확대하기 위해 노력하고 있습니다.
</docs-card>

<!--
<docs-card title="Author a guide for content projection" link="Completed in Q2 2021" href="https://angular.io/docs">
Content projection is a core Angular concept that does not have the presence it deserves in the documentation. As part of this project we want to identify the core use cases and concepts for content projection and document them.
</docs-card>
-->

<docs-card title="콘텐츠 프로젝션 가이드 작성" link="2021년 2분기 완료" href="https://angular.io/docs">
콘텐츠 프로젝션은 Angular의 핵심 개념이지만 문서에서 충분히 다뤄지지 않고 있습니다. 이 프로젝트에서는 콘텐츠 프로젝션의 핵심 사용 사례와 개념을 파악하고 문서화하고자 합니다.
</docs-card>

<!--
<docs-card title="Migrate to ESLint" link="Completed in Q4 2020" href="tools/cli">
With the deprecation of TSLint we will be moving to ESLint. As part of the process, we will work on ensuring backward compatibility with our current recommended TSLint configuration, implement a migration strategy for existing Angular apps and introduce new tooling to the Angular CLI toolchain.
</docs-card>
-->

<docs-card title="ESLint로 마이그레이션" link="2020년 4분기 완료" href="tools/cli">
TSLint 지원 중단에 따라 ESLint로 전환할 예정입니다. 이 과정에서 현재 권장하는 TSLint 설정과의 하위 호환성을 확보하고, 기존 Angular 앱의 마이그레이션 전략을 구현하며, Angular CLI 도구 체인에 새로운 도구를 도입할 예정입니다.
</docs-card>

<!--
<docs-card title="Operation Bye Bye Backlog (also known as Operation Byelog)" link="Completed in Q4 2020" href="https://github.com/angular/angular/issues">
We are actively investing up to 50% of our engineering capacity on triaging issues and PRs until we have a clear understanding of broader community needs. After that, we will commit up to 20% of our engineering capacity to keep up with new submissions promptly.
</docs-card>
-->

<docs-card title="백로그 줄이기 작전(Operation Bye Bye Backlog, 별칭 Operation Byelog)" link="2020년 4분기 완료" href="https://github.com/angular/angular/issues">
커뮤니티 전반의 요구를 명확히 이해할 때까지 엔지니어링 역량의 최대 50%를 이슈와 PR 분류에 적극적으로 투입하고 있습니다. 그 이후에는 새로 접수되는 내용을 신속하게 처리하기 위해 엔지니어링 역량의 최대 20%를 투입할 예정입니다.
</docs-card>

</docs-card-container>
