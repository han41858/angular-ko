<!--
# Profiling with the Chrome DevTools
-->

<a id="profiling-with-the-chrome-devtools"></a>

# Chrome DevTools로 프로파일링하기

<!--
Angular integrates with the [Chrome DevTools extensibility API](https://developer.chrome.com/docs/devtools/performance/extension) to present framework-specific data and insights directly in the [Chrome DevTools performance panel](https://developer.chrome.com/docs/devtools/performance/overview).

With the integration enabled, you can [record a performance profile](https://developer.chrome.com/docs/devtools/performance#record) containing two sets of data:

- Standard performance entries based on Chrome's understanding of your code executing in a browser, and
- Angular-specific entries contributed by the framework's runtime.

Both sets of data are presented together on the same tab, but on separate tracks:

<img alt="Angular custom track in Chrome DevTools profiler" src="assets/images/best-practices/runtime-performance/angular-perf-in-chrome.png">

Angular-specific data are expressed in terms of framework concepts (components, change detection, lifecycle hooks, etc.) alongside lower-level function and method calls captured by a browser. These two data sets are correlated, and you can switch between the different views and level of details.

You can use the Angular track to better understand how your code runs in the browser, including:

- Determining whether a given code block is part of the Angular application, or whether it belongs to another script running on the same page.
- Identifying performance bottlenecks and attribute those to specific components or services.
- Gaining deeper insight into Angular's inner working with a visual breakdown of each change detection cycle.
-->

Angular는 [Chrome DevTools 확장 API](https://developer.chrome.com/docs/devtools/performance/extension)와 통합되어 프레임워크 고유의 데이터와 분석 정보를 [Chrome DevTools 성능 패널](https://developer.chrome.com/docs/devtools/performance/overview)에 직접 표시합니다.

통합 기능을 활성화하면 다음 두 가지 데이터가 포함된 [성능 프로파일을 기록할 수 있습니다](https://developer.chrome.com/docs/devtools/performance#record):

- Chrome이 브라우저에서 실행되는 코드를 분석한 표준 성능 항목
- 프레임워크 런타임이 제공하는 Angular 고유의 항목

두 데이터는 같은 탭에 별도의 트랙으로 함께 표시됩니다:

<img alt="Chrome DevTools 프로파일러의 Angular 커스텀 트랙" src="assets/images/best-practices/runtime-performance/angular-perf-in-chrome.png">

Angular 고유의 데이터는 컴포넌트, 변경 감지, 생명주기 후킹 메서드 같은 프레임워크 개념으로 표시되며, 브라우저가 수집한 더 낮은 수준의 함수 및 메서드 호출과 나란히 나타납니다.
두 데이터 집합은 서로 연결되어 있으므로 관점과 상세 수준을 바꿔가며 확인할 수 있습니다.

Angular 트랙을 사용하면 다음과 같이 코드가 브라우저에서 실행되는 방식을 더 잘 이해할 수 있습니다:

- 특정 코드 블록이 Angular 애플리케이션의 일부인지, 같은 페이지에서 실행되는 다른 스크립트에 속하는지 구분합니다.
- 성능 병목을 파악하고 어느 컴포넌트나 서비스에서 발생하는지 확인합니다.
- 각 변경 감지 사이클의 세부 과정을 시각적으로 살펴보며 Angular의 내부 동작을 더 깊이 이해합니다.

<!--
## Recording a profile
-->

<a id="recording-a-profile"></a>

## 프로파일 기록하기

<!--
### Enable integration
-->

<a id="enable-integration"></a>

### 통합 기능 활성화하기

<!--
You can enable Angular profiling in one of two ways:

1. Run [`ng.enableProfiling()`](api/core/enableProfiling) in Chrome's console panel, or
1. Include a call to [`enableProfiling()`](api/core/enableProfiling) in your application startup code (imported from `@angular/core`).

NOTE: Angular profiling works exclusively in development mode.

Here is an example of how you can enable the integration in the application bootstrap to capture all possible events:

```ts
import {enableProfiling} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {MyApp} from './my-app';

// Turn on profiling *before* bootstrapping your application
// in order to capture all of the code run on start-up.
enableProfiling();
bootstrapApplication(MyApp);
```
-->

다음 두 가지 방법 중 하나로 Angular 프로파일링을 활성화할 수 있습니다:

1. Chrome 콘솔 패널에서 [`ng.enableProfiling()`](api/core/enableProfiling)을 실행합니다.
1. 애플리케이션 시작 코드에 [`enableProfiling()`](api/core/enableProfiling) 호출을 추가합니다(`@angular/core`에서 가져옵니다).

참고: Angular 프로파일링은 개발 모드에서만 동작합니다.

다음은 가능한 모든 이벤트를 수집하도록 애플리케이션 부트스트랩 과정에서 통합 기능을 활성화하는 예제입니다:

```ts
import {enableProfiling} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {MyApp} from './my-app';

// 시작 시 실행되는 모든 코드를 수집하려면 애플리케이션을
// 부트스트랩하기 *전에* 프로파일링을 활성화하세요.
enableProfiling();
bootstrapApplication(MyApp);
```

<!--
### Record a profile
-->

<a id="record-a-profile"></a>

### 프로파일 기록하기 {#프로파일-기록하기-2}

<!--
Use the **Record** button in the Chrome DevTools performance panel:

<img alt="Recording a profile" src="assets/images/best-practices/runtime-performance/recording-profile-in-chrome.png">

See the [Chrome DevTools documentation](https://developer.chrome.com/docs/devtools/performance#record) for more details on recording profiles.
-->

Chrome DevTools 성능 패널의 **Record** 버튼을 사용하세요:

<img alt="프로파일 기록하기" src="assets/images/best-practices/runtime-performance/recording-profile-in-chrome.png">

프로파일 기록에 관한 자세한 내용은 [Chrome DevTools 문서](https://developer.chrome.com/docs/devtools/performance#record)를 참고하세요.

<!--
## Open a component in Angular DevTools

After recording a profile, select a component event in the **Angular** track.
The **Summary** tab can include a **Component** link that uses the `angular-devtools://component/...` URL scheme.

<img alt="Chrome DevTools Performance panel showing an Angular custom track with a selected _MainComponent event. The Summary tab displays a Component link that uses the angular-devtools://component URL scheme." src="assets/images/best-practices/runtime-performance/chrome-performance-deep-link.png">

Click the link to open Angular DevTools and select the matching component in the **Components** tab.
This helps you move from a browser-level profile to the component state and metadata for a selected event.

NOTE: Opening component links requires Angular DevTools for Chrome and Chrome's experimental `chrome://flags/#enable-devtools-deep-link-via-extensibility-api` flag.
-->

<a id="open-a-component-in-angular-devtools"></a>

## Angular DevTools에서 컴포넌트 열기

프로파일을 기록한 후 **Angular** 트랙에서 컴포넌트 이벤트를 선택하세요.
**Summary** 탭에는 `angular-devtools://component/...` URL 스킴을 사용하는 **Component** 링크가 표시될 수 있습니다.

<img alt="Chrome DevTools 성능 패널의 Angular 커스텀 트랙에서 _MainComponent 이벤트를 선택한 모습. Summary 탭에는 angular-devtools://component URL 스킴을 사용하는 Component 링크가 표시됩니다." src="assets/images/best-practices/runtime-performance/chrome-performance-deep-link.png">

이 링크를 클릭하면 Angular DevTools가 열리고 **Components** 탭에서 해당 컴포넌트가 선택됩니다.
브라우저 수준의 프로파일에서 선택한 이벤트에 해당하는 컴포넌트 상태와 메타데이터로 바로 이동할 수 있습니다.

참고: 컴포넌트 링크를 열려면 Chrome용 Angular DevTools와 Chrome의 실험적 기능인 `chrome://flags/#enable-devtools-deep-link-via-extensibility-api` 플래그가 필요합니다.

<!--
## Interpreting a recorded profile
-->

<a id="interpreting-a-recorded-profile"></a>

## 기록한 프로파일 해석하기

<!--
You can use the "Angular" custom track to quickly identify and diagnose performance issues. The following sections describe some common profiling scenarios.
-->

"Angular" 커스텀 트랙으로 성능 문제를 빠르게 파악하고 진단할 수 있습니다.
다음 섹션에서는 일반적인 프로파일링 사례를 설명합니다.

<!--
### Differentiating between your Angular application and other tasks on the same page
-->

<a id="differentiating-between-your-angular-application-and-other-tasks-on-the-same-page"></a>

### Angular 애플리케이션과 같은 페이지의 다른 작업 구분하기

<!--
As Angular and Chrome data are presented on the separate but correlated tracks, you can see when Angular's application code is executed as opposed to some other browser processing (typically layout and paint) or other scripts running on the same page (in this case the custom Angular track does not have any data):

<img alt="Profile data: Angular vs. 3rd party scripts execution" src="assets/images/best-practices/runtime-performance/profile-angular-vs-3rd-party.png">

This allows you to determine whether further investigations should focus on the Angular application code or on other parts of your codebase or dependencies.
-->

Angular와 Chrome 데이터는 서로 연결된 별도의 트랙에 표시되므로, Angular 애플리케이션 코드가 실행되는 시점과 다른 브라우저 처리(주로 레이아웃과 페인트) 또는 같은 페이지의 다른 스크립트가 실행되는 시점을 구분할 수 있습니다.
다른 처리가 실행되는 동안에는 Angular 커스텀 트랙에 데이터가 나타나지 않습니다:

<img alt="프로파일 데이터: Angular와 서드 파티 스크립트 실행 비교" src="assets/images/best-practices/runtime-performance/profile-angular-vs-3rd-party.png">

이를 통해 추가로 조사할 대상을 Angular 애플리케이션 코드로 정할지, 코드베이스나 의존성의 다른 부분으로 정할지 판단할 수 있습니다.

<!--
### Color-coding
-->

<a id="color-coding"></a>

### 색상 구분

<!--
Angular uses colors in the flame chart graph to distinguish tasks types:

- 🟦 Blue represents TypeScript code written by the application developer (for example: services, component constructors and lifecycle hooks, etc.).
- 🟪 Purple represents templates code written by the application developer and transformed by the Angular compiler.
- 🟩 Green represents entry points to the application code and identifies _reasons_ for executing code.

The following examples illustrate the described color-coding in various, real-life recordings.
-->

Angular는 플레임 차트의 색상으로 작업 유형을 구분합니다:

- 🟦 파란색은 애플리케이션 개발자가 작성한 TypeScript 코드(서비스, 컴포넌트 생성자, 생명주기 후킹 메서드 등)를 나타냅니다.
- 🟪 보라색은 애플리케이션 개발자가 작성하고 Angular 컴파일러가 변환한 템플릿 코드를 나타냅니다.
- 🟩 초록색은 애플리케이션 코드의 진입점을 나타내며, 코드를 실행하는 _이유_ 를 식별합니다.

다음은 실제 기록에서 이러한 색상 구분을 보여주는 다양한 예제입니다.

<!--
#### Example: Application bootstrapping
-->

<a id="example-application-bootstrapping"></a>

#### 예제: 애플리케이션 부트스트랩

<!--
The application bootstrap process usually consists of:

- Triggers marked in blue, such as the call to the `bootstrapApplication`, instantiation of the root component, and initial change detection
- Various DI services instantiated during bootstrap, marked in green.

<img alt="Profile data: bootstrap application" src="assets/images/best-practices/runtime-performance/profile-bootstrap-application.png">
-->

애플리케이션 부트스트랩 과정은 일반적으로 다음으로 구성됩니다:

- `bootstrapApplication` 호출, 루트 컴포넌트 인스턴스 생성, 초기 변경 감지 등 파란색으로 표시되는 트리거
- 부트스트랩 과정에서 인스턴스가 생성되며 초록색으로 표시되는 여러 DI 서비스

<img alt="프로파일 데이터: 애플리케이션 부트스트랩" src="assets/images/best-practices/runtime-performance/profile-bootstrap-application.png">

<!--
#### Example: Component execution
-->

<a id="example-component-execution"></a>

#### 예제: 컴포넌트 실행

<!--
One component processing is typically represented as an entry point (blue) followed by its template execution (purple). A template might, in turn, trigger instantiation of directives and execution of lifecycle hooks (green):

<img alt="Profile data: component processing" src="assets/images/best-practices/runtime-performance/profile-component-processing.png">
-->

컴포넌트 하나를 처리하는 과정은 보통 진입점(파란색)에 이어 템플릿 실행(보라색)이 나타납니다.
템플릿은 다시 디렉티브 인스턴스 생성과 생명주기 후킹 메서드 실행(초록색)을 유발할 수 있습니다:

<img alt="프로파일 데이터: 컴포넌트 처리" src="assets/images/best-practices/runtime-performance/profile-component-processing.png">

<!--
#### Example: Change detection
-->

<a id="example-change-detection"></a>

#### 예제: 변경 감지

<!--
A change detection cycle usually consists of one or more data synchronization passes (blue), where each pass traverses a subset of components.

<img alt="Profile data: change detection" src="assets/images/best-practices/runtime-performance/profile-change-detection.png">

With this data visualization, it is possible to immediately identify components that were involved in the change detection and which were skipped (typically the `OnPush` components that were not marked dirty).

Additionally, you can inspect the number of synchronization passes for one change detection. Having more than one synchronization pass suggest that state is updated during change detection. You should avoid this, as it slows down page updates and can even result in infinite loops in the worst cases.
-->

변경 감지 사이클은 보통 하나 이상의 데이터 동기화 단계(파란색)로 구성되며, 각 단계는 일부 컴포넌트를 순회합니다.

<img alt="프로파일 데이터: 변경 감지" src="assets/images/best-practices/runtime-performance/profile-change-detection.png">

이 시각화로 변경 감지에 포함된 컴포넌트와 건너뛴 컴포넌트(대체로 변경됨으로 표시되지 않은 `OnPush` 컴포넌트)를 바로 구분할 수 있습니다.

또한 한 번의 변경 감지에서 동기화가 몇 차례 수행되었는지 확인할 수 있습니다.
동기화가 여러 차례 수행되었다면 변경 감지 도중 상태가 갱신되었다는 뜻입니다.
이 경우 페이지 갱신이 느려지고 최악의 경우 무한 루프가 발생할 수 있으므로 피해야 합니다.
