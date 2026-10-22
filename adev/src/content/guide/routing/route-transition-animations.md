<!--
# Route transition animations
-->

<a id="route-transition-animations"></a>

# 라우팅 규칙 전환 애니메이션

<!--
Route transition animations enhance user experience by providing smooth visual transitions when navigating between different views in your Angular application. [Angular Router](/guide/routing) includes built-in support for the browser's View Transitions API, enabling seamless animations between route changes in supported browsers.

HELPFUL: The Router's native View Transitions integration is currently in [developer preview](/reference/releases#developer-preview). Native View Transitions are a relatively new browser feature with limited support across all browsers.
-->

라우팅 규칙 전환 애니메이션은 Angular 애플리케이션의 여러 뷰 사이를 이동할 때 화면을 부드럽게 전환해서 사용자 경험을 개선합니다.
[Angular 라우터](/guide/routing)는 브라우저의 View Transitions API를 기본으로 지원하므로, 지원되는 브라우저에서 라우팅 규칙이 바뀔 때 매끄러운 애니메이션을 적용할 수 있습니다.

참고: 라우터의 네이티브 View Transitions 통합 기능은 현재 [개발자 프리뷰](/reference/releases#developer-preview)입니다.
네이티브 View Transitions는 비교적 새로운 브라우저 기능이므로 모든 브라우저에서 지원되지는 않습니다.

<!--
## How View Transitions work
-->

<a id="how-view-transitions-work"></a>

## View Transitions의 동작 방식

<!--
View transitions use the browser's native [`document.startViewTransition` API](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition) to create smooth animations between different states of your application. The API works by:

1. **Capturing the current state** - The browser takes a screenshot of the current page
2. **Executing the DOM update** - Your callback function runs to update the DOM
3. **Capturing the new state** - The browser captures the updated page state
4. **Playing the transition** - The browser animates between the old and new states

Here's the basic structure of the `startViewTransition` API:

```ts
document.startViewTransition(async () => {
  await updateTheDOMSomehow();
});
```

For more details about the browser API, see the [Chrome Explainer](https://developer.chrome.com/docs/web-platform/view-transitions).
-->

뷰 전환은 브라우저의 기본 [`document.startViewTransition` API](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition)를 사용해서 애플리케이션의 여러 상태 사이를 부드럽게 전환합니다.
이 API는 다음과 같이 동작합니다.

1. **현재 상태 캡처** — 브라우저가 현재 페이지의 스크린샷을 찍습니다.
2. **DOM 갱신 실행** — 콜백 함수가 실행되어 DOM을 갱신합니다.
3. **새 상태 캡처** — 브라우저가 갱신된 페이지 상태를 캡처합니다.
4. **전환 재생** — 브라우저가 이전 상태와 새 상태 사이의 애니메이션을 재생합니다.

`startViewTransition` API의 기본 구조는 다음과 같습니다.

```ts
document.startViewTransition(async () => {
  await updateTheDOMSomehow();
});
```

브라우저 API의 자세한 내용은 [Chrome 설명 문서](https://developer.chrome.com/docs/web-platform/view-transitions)를 참고하세요.

<!--
## How the Router uses view transitions
-->

<a id="how-the-router-uses-view-transitions"></a>

## 라우터의 뷰 전환 사용 방식

<!--
Angular Router integrates view transitions into the navigation lifecycle to create seamless route changes. During navigation, the Router:

1. **Completes navigation preparation** - Route matching, [lazy loading](guide/routing/loading-strategies#lazily-loaded-components-and-routes), [guards](/guide/routing/route-guards), [resources](/guide/routing/data-fetching-with-resources), and [resolvers](/guide/routing/data-resolvers) execute
2. **Initiates the view transition** - Router calls `startViewTransition` when routes are ready for activation
3. **Updates the DOM** - Router activates new routes and deactivates old ones within the transition callback
4. **Finalizes the transition** - The transition Promise resolves when Angular completes rendering

The Router's view transition integration acts as a [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement). When browsers don't support the View Transitions API, the Router performs normal DOM updates without animation, ensuring your application works across all browsers.
-->

Angular 라우터는 내비게이션 생명주기에 뷰 전환을 통합해서 라우팅 규칙을 매끄럽게 전환합니다.
내비게이션 중 라우터는 다음과 같이 동작합니다.

1. **내비게이션 준비 완료** — 라우팅 규칙 매칭, [지연 로딩](guide/routing/loading-strategies#lazily-loaded-components-and-routes), [가드](/guide/routing/route-guards), [리소스](/guide/routing/data-fetching-with-resources), [리졸버](/guide/routing/data-resolvers)를 실행합니다.
2. **뷰 전환 시작** — 라우팅 규칙 활성화 준비가 끝나면 라우터가 `startViewTransition`을 호출합니다.
3. **DOM 갱신** — 전환 콜백 안에서 새 라우팅 규칙을 활성화하고 이전 라우팅 규칙을 비활성화합니다.
4. **전환 마무리** — Angular가 렌더링을 완료하면 전환 Promise가 이행됩니다.

라우터의 뷰 전환 통합은 [점진적 향상](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) 방식으로 동작합니다.
브라우저가 View Transitions API를 지원하지 않으면 라우터는 애니메이션 없이 일반적인 DOM 갱신을 수행하므로, 애플리케이션이 모든 브라우저에서 동작할 수 있습니다.

<!--
## Enabling View Transitions in the Router
-->

<a id="enabling-view-transitions-in-the-router"></a>

## 라우터에서 View Transitions 활성화하기

<!--
Enable view transitions by adding the `withViewTransitions` feature to your [router configuration](/guide/routing/define-routes#adding-the-router-to-your-application). Angular supports both standalone and NgModule bootstrap approaches:
-->

[라우터 설정](/guide/routing/define-routes#adding-the-router-to-your-application)에 `withViewTransitions` 기능을 추가하면 뷰 전환을 활성화할 수 있습니다.
Angular는 독립형 방식과 NgModule 방식의 부트스트랩을 모두 지원합니다.

<!--
### Standalone bootstrap
-->

<a id="standalone-bootstrap"></a>

### 독립형 부트스트랩

<!--
```ts
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, withViewTransitions} from '@angular/router';
import {routes} from './app.routes';

bootstrapApplication(MyApp, {
  providers: [provideRouter(routes, withViewTransitions())],
});
```
-->

```ts
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, withViewTransitions} from '@angular/router';
import {routes} from './app.routes';

bootstrapApplication(MyApp, {
  providers: [provideRouter(routes, withViewTransitions())],
});
```

<!--
### NgModule bootstrap
-->

<a id="ngmodule-bootstrap"></a>

### NgModule 부트스트랩

<!--
```ts
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableViewTransitions: true})],
})
export class AppRouting {}
```

[Try the "count" example on StackBlitz](https://stackblitz.com/edit/stackblitz-starters-2dnvtm?file=src%2Fmain.ts)

This example demonstrates how router navigation can replace direct `startViewTransition` calls for counter updates.
-->

```ts
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableViewTransitions: true})],
})
export class AppRouting {}
```

[StackBlitz에서 "count" 예제 실행하기](https://stackblitz.com/edit/stackblitz-starters-2dnvtm?file=src%2Fmain.ts)

이 예제는 카운터를 갱신할 때 `startViewTransition`을 직접 호출하는 대신 라우터 내비게이션을 사용하는 방법을 보여줍니다.

<!--
## Customizing transitions with CSS
-->

<a id="customizing-transitions-with-css"></a>

## CSS로 전환 효과 조정하기

<!--
You can customize view transitions using CSS to create unique animation effects. The browser creates separate transition elements that you can target with CSS selectors.

To create custom transitions:

1. **Add view-transition-name** - Assign unique names to elements you want to animate
2. **Define global animations** - Create CSS animations in your global styles
3. **Target transition pseudo-elements** - Use `::view-transition-old()` and `::view-transition-new()` selectors

Here's an example that adds a rotation effect to a counter element:

```css
/* Define keyframe animations */
@keyframes rotate-out {
  to {
    transform: rotate(90deg);
  }
}

@keyframes rotate-in {
  from {
    transform: rotate(-90deg);
  }
}

/* Target view transition pseudo-elements */
::view-transition-old(count),
::view-transition-new(count) {
  animation-duration: 200ms;
  animation-name: -ua-view-transition-fade-in, rotate-in;
}

::view-transition-old(count) {
  animation-name: -ua-view-transition-fade-out, rotate-out;
}
```

IMPORTANT: Define view transition animations in your global styles file, not in component styles. Angular's [view encapsulation](/guide/components/styling#style-scoping) scopes component styles, which prevents them from targeting the transition pseudo-elements correctly.

[Try the updated “count” example on StackBlitz](https://stackblitz.com/edit/stackblitz-starters-fwn4i7?file=src%2Fmain.ts)
-->

CSS로 뷰 전환을 조정해서 원하는 애니메이션 효과를 만들 수 있습니다.
브라우저는 CSS 셀렉터로 지정할 수 있는 별도의 전환 엘리먼트를 생성합니다.

커스텀 전환을 만들려면 다음 단계를 진행하세요.

1. **view-transition-name 추가** — 애니메이션을 적용할 엘리먼트에 고유한 이름을 지정합니다.
2. **전역 애니메이션 정의** — 전역 스타일에 CSS 애니메이션을 작성합니다.
3. **전환 가상 엘리먼트 지정** — `::view-transition-old()`, `::view-transition-new()` 셀렉터를 사용합니다.

다음 예제는 카운터 엘리먼트에 회전 효과를 추가합니다.

```css
/* 키프레임 애니메이션을 정의합니다. */
@keyframes rotate-out {
  to {
    transform: rotate(90deg);
  }
}

@keyframes rotate-in {
  from {
    transform: rotate(-90deg);
  }
}

/* 뷰 전환 가상 엘리먼트를 지정합니다. */
::view-transition-old(count),
::view-transition-new(count) {
  animation-duration: 200ms;
  animation-name: -ua-view-transition-fade-in, rotate-in;
}

::view-transition-old(count) {
  animation-name: -ua-view-transition-fade-out, rotate-out;
}
```

중요: 뷰 전환 애니메이션은 컴포넌트 스타일이 아닌 전역 스타일 파일에 정의하세요.
Angular의 [뷰 캡슐화](/guide/components/styling#style-scoping)는 컴포넌트 스타일의 범위를 제한하기 때문에 전환 가상 엘리먼트를 올바르게 지정할 수 없습니다.

[StackBlitz에서 수정된 "count" 예제 실행하기](https://stackblitz.com/edit/stackblitz-starters-fwn4i7?file=src%2Fmain.ts)

<!--
## Advanced transition control with onViewTransitionCreated
-->

<a id="advanced-transition-control-with-onviewtransitioncreated"></a>

## onViewTransitionCreated로 전환 동작 세밀하게 제어하기

<!--
The `withViewTransitions` feature accepts an options object with an `onViewTransitionCreated` callback for advanced control over view transitions. This callback:

- Runs in an [injection context](/guide/di/dependency-injection-context#run-within-an-injection-context)
- Receives a [`ViewTransitionInfo`](/api/router/ViewTransitionInfo) object containing:
  - The `ViewTransition` instance from `startViewTransition`
  - The [`ActivatedRouteSnapshot`](/api/router/ActivatedRouteSnapshot) for the route being navigated from
  - The [`ActivatedRouteSnapshot`](/api/router/ActivatedRouteSnapshot) for the route being navigated to

Use this callback to customize transition behavior based on navigation context. For example, you can skip transitions for specific navigation types:

```ts
import {inject} from '@angular/core';
import {Router, withViewTransitions, isActive, IsActiveMatchOptions} from '@angular/router';

withViewTransitions({
  onViewTransitionCreated: ({transition}) => {
    const router = inject(Router);
    const targetUrl = router.currentNavigation()!.finalUrl!;

    // Skip transition if only fragment or query params change
    const config: Partial<IsActiveMatchOptions> = {
      paths: 'exact',
      matrixParams: 'exact',
      fragment: 'ignored',
      queryParams: 'ignored',
    };

    const isTargetRouteCurrent = isActive(targetUrl, router, config);

    if (isTargetRouteCurrent()) {
      transition.skipTransition();
    }
  },
});
```

This example skips the view transition when navigation only changes the [URL fragment or query parameters](/guide/routing/read-route-state#query-parameters) (such as anchor links within the same page). The `skipTransition()` method prevents the animation while still allowing the navigation to complete.
-->

`withViewTransitions` 기능은 뷰 전환을 세밀하게 제어할 수 있도록 `onViewTransitionCreated` 콜백이 있는 옵션 객체를 받습니다.
이 콜백은 다음과 같이 동작합니다.

- [의존성 주입 컨텍스트](/guide/di/dependency-injection-context#run-within-an-injection-context)에서 실행됩니다.
- 다음 정보가 있는 [`ViewTransitionInfo`](/api/router/ViewTransitionInfo) 객체를 받습니다.
  - `startViewTransition`의 `ViewTransition` 인스턴스
  - 떠나는 라우팅 규칙의 [`ActivatedRouteSnapshot`](/api/router/ActivatedRouteSnapshot)
  - 이동할 라우팅 규칙의 [`ActivatedRouteSnapshot`](/api/router/ActivatedRouteSnapshot)

이 콜백으로 내비게이션 컨텍스트에 맞게 전환 동작을 조정할 수 있습니다.
예를 들어 특정 종류의 내비게이션에서는 전환을 건너뛸 수 있습니다.

```ts
import {inject} from '@angular/core';
import {Router, withViewTransitions, isActive, IsActiveMatchOptions} from '@angular/router';

withViewTransitions({
  onViewTransitionCreated: ({transition}) => {
    const router = inject(Router);
    const targetUrl = router.currentNavigation()!.finalUrl!;

    // 프래그먼트나 쿼리 파라미터만 바뀌면 전환을 건너뜁니다.
    const config: Partial<IsActiveMatchOptions> = {
      paths: 'exact',
      matrixParams: 'exact',
      fragment: 'ignored',
      queryParams: 'ignored',
    };

    const isTargetRouteCurrent = isActive(targetUrl, router, config);

    if (isTargetRouteCurrent()) {
      transition.skipTransition();
    }
  },
});
```

이 예제에서는 같은 페이지 안의 앵커 링크처럼 [URL 프래그먼트나 쿼리 파라미터](/guide/routing/read-route-state#query-parameters)만 바뀌면 뷰 전환을 건너뜁니다.
`skipTransition()` 메서드는 애니메이션을 생략하면서 내비게이션은 완료할 수 있도록 합니다.

<!--
## Respecting the user's motion preferences
-->

<a id="respecting-the-users-motion-preferences"></a>

## 사용자의 모션 환경설정 존중하기

<!--
The Router runs view transitions regardless of the user's [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) setting. A preference for reduced motion doesn't necessarily mean the user wants no motion at all, so the framework leaves the choice to the application: you can [provide more subtle animations](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#react_to_the_reduced_motion_preference) for these users, or skip the transition entirely with the `onViewTransitionCreated` callback:
-->

라우터는 사용자의 [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) 설정과 관계없이 뷰 전환을 실행합니다.
모션을 줄이는 설정이 모든 움직임을 없애려는 뜻은 아니므로, 프레임워크는 이 선택을 애플리케이션에 맡깁니다.
이런 사용자를 위해 [움직임이 더 적은 애니메이션을 제공](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#react_to_the_reduced_motion_preference)하거나, `onViewTransitionCreated` 콜백으로 전환을 완전히 건너뛸 수 있습니다:

```ts
withViewTransitions({
  onViewTransitionCreated: ({transition}) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      transition.skipTransition();
    }
  },
});
```

<!--
## Examples from the Chrome explainer adapted to Angular
-->

<a id="examples-from-the-chrome-explainer-adapted-to-angular"></a>

## Chrome 설명 문서의 예제를 Angular에 적용하기

<!--
The following examples demonstrate various view transition techniques adapted from the Chrome team's documentation for use with Angular Router:
-->

다음 예제는 Chrome 팀 문서의 여러 뷰 전환 기법을 Angular 라우터에서 사용하도록 바꾼 것입니다.

<!--
### Transitioning elements don't need to be the same DOM element
-->

<a id="transitioning-elements-dont-need-to-be-the-same-dom-element"></a>

### 전환 대상이 같은 DOM 엘리먼트일 필요는 없습니다

<!--
Elements can transition smoothly between different DOM elements as long as they share the same `view-transition-name`.

- [Chrome Explainer](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#transitioning_elements_dont_need_to_be_the_same_dom_element)
- [Angular Example on StackBlitz](https://stackblitz.com/edit/stackblitz-starters-dh8npr?file=src%2Fmain.ts)
-->

서로 다른 DOM 엘리먼트도 `view-transition-name`이 같으면 부드럽게 전환할 수 있습니다.

- [Chrome 설명 문서](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#transitioning_elements_dont_need_to_be_the_same_dom_element)
- [StackBlitz의 Angular 예제](https://stackblitz.com/edit/stackblitz-starters-dh8npr?file=src%2Fmain.ts)

<!--
### Custom entry and exit animations
-->

<a id="custom-entry-and-exit-animations"></a>

### 커스텀 진입 및 퇴장 애니메이션

<!--
Create unique animations for elements entering and leaving the viewport during route transitions.

- [Chrome Explainer](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#custom_entry_and_exit_transitions)
- [Angular Example on StackBlitz](https://stackblitz.com/edit/stackblitz-starters-8kly3o)
-->

라우팅 규칙 전환 중 뷰포트에 들어오고 나가는 엘리먼트에 원하는 애니메이션을 만들 수 있습니다.

- [Chrome 설명 문서](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#custom_entry_and_exit_transitions)
- [StackBlitz의 Angular 예제](https://stackblitz.com/edit/stackblitz-starters-8kly3o)

<!--
### Async DOM updates and waiting for content
-->

<a id="async-dom-updates-and-waiting-for-content"></a>

### 비동기 DOM 갱신과 콘텐츠 대기

<!--
Angular Router prioritizes immediate transitions over waiting for additional content to load.

- [Chrome Explainer](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#async_dom_updates_and_waiting_for_content)

NOTE: Angular Router does not provide a way to delay view transitions. This design choice prevents pages from becoming non-interactive while waiting for additional content. As the Chrome documentation notes: "During this time, the page is frozen, so delays here should be kept to a minimum…in some cases it's better to avoid the delay altogether, and use the content you already have."
-->

Angular 라우터는 추가 콘텐츠가 로드되기를 기다리는 것보다 즉시 전환하는 것을 우선합니다.

- [Chrome 설명 문서](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#async_dom_updates_and_waiting_for_content)

참고: Angular 라우터는 뷰 전환을 지연하는 방법을 제공하지 않습니다.
추가 콘텐츠를 기다리는 동안 페이지와 상호작용할 수 없게 되는 상황을 방지하기 위한 설계입니다.
Chrome 문서에서도 "이 시간에는 페이지가 멈추므로 지연을 최소화해야 합니다.
… 경우에 따라서는 기다리지 않고 이미 확보한 콘텐츠를 사용하는 편이 낫습니다."라고 설명합니다.

<!--
### Handle multiple view transition styles with view transition types
-->

<a id="handle-multiple-view-transition-styles-with-view-transition-types"></a>

### 뷰 전환 타입으로 여러 전환 스타일 처리하기

<!--
Use view transition types to apply different animation styles based on navigation context.

- [Chrome Explainer](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#view-transition-types)
- [Angular Example on StackBlitz](https://stackblitz.com/edit/stackblitz-starters-vxzcam)
-->

뷰 전환 타입을 사용하면 내비게이션 컨텍스트에 따라 다른 애니메이션 스타일을 적용할 수 있습니다.

- [Chrome 설명 문서](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#view-transition-types)
- [StackBlitz의 Angular 예제](https://stackblitz.com/edit/stackblitz-starters-vxzcam)

<!--
### Handle multiple view transition styles with a class name on the view transition root (deprecated)
-->

<a id="handle-multiple-view-transition-styles-with-a-class-name-on-the-view-transition-root-deprecated"></a>

### 뷰 전환 루트의 클래스 이름으로 여러 전환 스타일 처리하기(지원 중단 예정)

<!--
This approach uses CSS classes on the transition root element to control animation styles.

- [Chrome Explainer](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#changing-on-navigation-type)
- [Angular Example on StackBlitz](https://stackblitz.com/edit/stackblitz-starters-nmnzzg?file=src%2Fmain.ts)
-->

이 방식은 전환 루트 엘리먼트의 CSS 클래스로 애니메이션 스타일을 제어합니다.

- [Chrome 설명 문서](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#changing-on-navigation-type)
- [StackBlitz의 Angular 예제](https://stackblitz.com/edit/stackblitz-starters-nmnzzg?file=src%2Fmain.ts)

<!--
### Transitioning without freezing other animations
-->

<a id="transitioning-without-freezing-other-animations"></a>

### 다른 애니메이션을 멈추지 않고 전환하기

<!--
Maintain other page animations during view transitions to create more dynamic user experiences.

- [Chrome Explainer](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#transitioning-without-freezing)
- [Angular Example on StackBlitz](https://stackblitz.com/edit/stackblitz-starters-76kgww)
-->

뷰 전환 중에도 다른 페이지 애니메이션을 유지하면 더 역동적인 사용자 경험을 만들 수 있습니다.

- [Chrome 설명 문서](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#transitioning-without-freezing)
- [StackBlitz의 Angular 예제](https://stackblitz.com/edit/stackblitz-starters-76kgww)

<!--
### Animating with JavaScript
-->

<a id="animating-with-javascript"></a>

### JavaScript로 애니메이션 처리하기

<!--
Control view transitions programmatically using JavaScript APIs for complex animation scenarios.

- [Chrome Explainer](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#animating-with-javascript)
- [Angular Example on StackBlitz](https://stackblitz.com/edit/stackblitz-starters-cklnkm)
-->

복잡한 애니메이션이 필요하면 JavaScript API를 사용해서 뷰 전환을 코드로 제어할 수 있습니다.

- [Chrome 설명 문서](https://developer.chrome.com/docs/web-platform/view-transitions/same-document#animating-with-javascript)
- [StackBlitz의 Angular 예제](https://stackblitz.com/edit/stackblitz-starters-cklnkm)
