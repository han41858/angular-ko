<!--
# Performance
-->

<a id="performance"></a>

# 성능

<!--
Angular includes many optimizations out of the box, but as applications grow, you may need to fine-tune both how quickly your app loads and how responsive it feels during use. These guides cover the tools and techniques Angular provides to help you build fast applications.
-->

Angular에는 기본적으로 여러 최적화가 적용되어 있지만, 애플리케이션이 커지면 로딩 속도와 사용 중의 반응성을 세밀하게 조절해야 할 수 있습니다.
이 가이드에서는 빠른 애플리케이션을 만들기 위해 Angular가 제공하는 도구와 기법을 설명합니다.

<!--
## Loading performance
-->

<a id="loading-performance"></a>

## 로딩 성능

<!--
Loading performance determines how quickly your application becomes visible and interactive. Slow loading directly impacts [Core Web Vitals](https://web.dev/vitals/) like Largest Contentful Paint (LCP) and Time to First Byte (TTFB).

| Technique                                                                                               | What it does                                                                                                                                                                                                                    | When to use it                                                                                |
| :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------- |
| [Lazy-loaded routes](best-practices/performance/lazy-loaded-routes#lazily-loaded-components-and-routes) | Defers loading route components until navigation, reducing the initial bundle size                                                                                                                                              | Applications with multiple routes where not all are needed on initial load                    |
| [Deferred loading with `@defer`](best-practices/performance/defer)                                      | Splits components into separate bundles that load on demand                                                                                                                                                                     | Components not visible on initial render, heavy third-party libraries, below-the-fold content |
| [Lazy loading services with `injectAsync`](guide/di/lazy-loading-services)                              | Splits rarely used services into separate chunks and loads them on demand                                                                                                                                                       | Services backed by large libraries or infrequently used features                              |
| [Image optimization](best-practices/performance/image-optimization)                                     | Prioritizes LCP images, lazy loads others, generates responsive `srcset` attributes                                                                                                                                             | Any application that displays images                                                          |
| [Server-side rendering](best-practices/performance/ssr)                                                 | Renders pages on the server for faster first paint and better SEO, with [hydration](guide/hydration) to restore interactivity and [incremental hydration](guide/incremental-hydration) to defer hydrating sections until needed | Content-heavy applications, pages that need search engine indexing                            |
-->

로딩 성능은 애플리케이션이 얼마나 빨리 화면에 나타나고 상호작용할 수 있는 상태가 되는지를 결정합니다.
로딩이 느리면 Largest Contentful Paint(LCP)와 Time to First Byte(TTFB) 같은 [Core Web Vitals](https://web.dev/vitals/)에 직접적인 영향을 줍니다.

| 기법                                                                                                       | 역할                                                                                                                                                                                                                                     | 사용 시점                                                                                   |
| :--------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| [라우팅 규칙 지연 로딩](best-practices/performance/lazy-loaded-routes#lazily-loaded-components-and-routes) | 해당 화면으로 이동할 때까지 라우팅 규칙의 컴포넌트 로딩을 미뤄 초기 번들 크기를 줄입니다.                                                                                                                                                | 여러 라우팅 규칙 중 일부만 초기 로딩에 필요한 애플리케이션                                  |
| [`@defer`를 사용한 지연 로딩](best-practices/performance/defer)                                            | 컴포넌트를 별도 번들로 분리해 필요할 때 불러옵니다.                                                                                                                                                                                      | 초기 렌더링에 표시되지 않는 컴포넌트, 무거운 서드 파티 라이브러리, 스크롤해야 보이는 콘텐츠 |
| [`injectAsync`를 사용한 서비스 지연 로딩](guide/di/lazy-loading-services)                                  | 드물게 사용하는 서비스를 별도 청크로 분리해 필요할 때 불러옵니다.                                                                                                                                                                        | 큰 라이브러리에 의존하는 서비스나 자주 사용하지 않는 기능                                   |
| [이미지 최적화](best-practices/performance/image-optimization)                                             | LCP 이미지를 우선 처리하고 나머지는 지연 로딩하며, 반응형 `srcset` 어트리뷰트를 생성합니다.                                                                                                                                              | 이미지를 표시하는 모든 애플리케이션                                                         |
| [서버 사이드 렌더링](best-practices/performance/ssr)                                                       | 서버에서 페이지를 렌더링해 첫 화면을 빠르게 표시하고 SEO를 개선합니다. [하이드레이션](guide/hydration)으로 상호작용을 복원하고 [점진적 하이드레이션](guide/incremental-hydration)으로 필요한 시점까지 각 영역의 하이드레이션을 미룹니다. | 콘텐츠가 많은 애플리케이션, 검색 엔진 색인이 필요한 페이지                                  |

<!--
## Runtime performance
-->

<a id="runtime-performance"></a>

## 실행 중 성능

<!--
Runtime performance determines how responsive your application feels after it loads. Angular's change detection system keeps the DOM in sync with your data, and optimizing how and when it runs is the primary lever for improving runtime performance.

| Technique                                                       | What it does                                                                                        | When to use it                                                                        |
| :-------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| [Zoneless change detection](guide/zoneless)                     | Removes ZoneJS overhead and triggers change detection only when signals or events indicate a change | New applications (default in Angular v21+), or existing applications ready to migrate |
| [Slow computations](best-practices/slow-computations)           | Identifies and optimizes expensive template expressions and lifecycle hooks                         | Profiling reveals specific components causing slow change detection cycles            |
| [Skipping component subtrees](best-practices/skipping-subtrees) | Uses `OnPush` change detection to skip unchanged component trees                                    | Applications that need finer control over change detection                            |
| [Zone pollution](best-practices/zone-pollution)                 | Prevents unnecessary change detection caused by third-party libraries or timers                     | Zone-based applications where profiling reveals excessive change detection cycles     |
-->

실행 중 성능은 로딩 이후 애플리케이션의 반응성을 결정합니다.
Angular의 변경 감지 시스템은 DOM을 데이터와 동기화하며, 변경 감지가 언제 어떻게 실행되는지 최적화하는 것이 실행 중 성능을 개선하는 핵심 방법입니다.

| 기법                                                            | 역할                                                                                  | 사용 시점                                                                      |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------- |
| [존리스 변경 감지](guide/zoneless)                              | ZoneJS의 부하를 제거하고 시그널이나 이벤트가 변경을 알릴 때만 변경 감지를 실행합니다. | 새 애플리케이션(Angular v21+의 기본값) 또는 전환할 준비가 된 기존 애플리케이션 |
| [느린 연산](best-practices/slow-computations)                   | 비용이 큰 템플릿 표현식과 생명주기 후킹 메서드를 찾아 최적화합니다.                   | 프로파일링 결과 특정 컴포넌트 때문에 변경 감지 사이클이 느려지는 경우          |
| [컴포넌트 하위 트리 건너뛰기](best-practices/skipping-subtrees) | `OnPush` 변경 감지로 변경되지 않은 컴포넌트 트리를 건너뜁니다.                        | 변경 감지를 더 세밀하게 제어해야 하는 애플리케이션                             |
| [존 오염](best-practices/zone-pollution)                        | 서드 파티 라이브러리나 타이머가 유발하는 불필요한 변경 감지를 방지합니다.             | 프로파일링 결과 변경 감지 사이클이 과도하게 발생하는 존 기반 애플리케이션      |

<!--
## Measuring performance
-->

<a id="measuring-performance"></a>

## 성능 측정하기

<!--
Identifying what to optimize is just as important as knowing how to optimize it. Angular integrates with browser developer tools to help you find bottlenecks.

| Tool                                                                       | What it does                                                                                                                                                                     |
| :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Chrome DevTools profiling](best-practices/profiling-with-chrome-devtools) | Records Angular-specific performance data alongside browser profiling, with color-coded flame charts that show component rendering, change detection cycles, and lifecycle hooks |
| [Angular DevTools](tools/devtools)                                         | A browser extension that provides a component tree inspector and a profiler for visualizing change detection cycles                                                              |
-->

최적화 방법을 아는 것만큼 무엇을 최적화할지 파악하는 것도 중요합니다.
Angular는 브라우저 개발자 도구와 통합되어 병목을 찾을 수 있게 합니다.

| 도구                                                                        | 역할                                                                                                                                                                              |
| :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Chrome DevTools 프로파일링](best-practices/profiling-with-chrome-devtools) | 브라우저 프로파일링과 함께 Angular 고유의 성능 데이터를 기록합니다. 색상으로 구분한 플레임 차트에서 컴포넌트 렌더링, 변경 감지 사이클, 생명주기 후킹 메서드를 확인할 수 있습니다. |
| [Angular DevTools](tools/devtools)                                          | 컴포넌트 트리 검사기와 변경 감지 사이클을 시각화하는 프로파일러를 제공하는 브라우저 확장 프로그램입니다.                                                                          |

<!--
## What to optimize first
-->

<a id="what-to-optimize-first"></a>

## 먼저 최적화할 부분

<!--
If you are unsure where to start, profile your application first using the [Chrome DevTools Angular track](best-practices/profiling-with-chrome-devtools) to identify specific bottlenecks.

As a general starting point:

- **Slow initial load** — Use [`@defer`](best-practices/performance/defer) to split large components out of the main bundle, [`NgOptimizedImage`](best-practices/performance/image-optimization) to prioritize above-the-fold images, and [server-side rendering](best-practices/performance/ssr) to deliver content faster.
- **Slow interactions after load** — Check whether [zoneless change detection](guide/zoneless) is enabled, look for [slow computations](best-practices/slow-computations) in templates or lifecycle hooks, and consider [`OnPush`](best-practices/skipping-subtrees) to reduce unnecessary change detection.
-->

어디서 시작해야 할지 모르겠다면 먼저 [Chrome DevTools의 Angular 트랙](best-practices/profiling-with-chrome-devtools)으로 애플리케이션을 프로파일링해 구체적인 병목을 파악하세요.

일반적으로 다음과 같은 부분부터 시작할 수 있습니다:

- **초기 로딩이 느린 경우** — [`@defer`](best-practices/performance/defer)로 큰 컴포넌트를 메인 번들에서 분리하고, [`NgOptimizedImage`](best-practices/performance/image-optimization)로 첫 화면의 이미지를 우선 처리하며, [서버 사이드 렌더링](best-practices/performance/ssr)으로 콘텐츠를 더 빠르게 전달하세요.
- **로딩 후 상호작용이 느린 경우** — [존리스 변경 감지](guide/zoneless)가 활성화되어 있는지 확인하고, 템플릿이나 생명주기 후킹 메서드의 [느린 연산](best-practices/slow-computations)을 찾아보세요.
  불필요한 변경 감지를 줄이기 위해 [`OnPush`](best-practices/skipping-subtrees)를 사용하는 것도 고려하세요.
