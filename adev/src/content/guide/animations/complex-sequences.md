<!--
# Complex animation sequences
-->

<a id="complex-animation-sequences"></a>

# 복잡한 애니메이션 시퀀스

<!--
IMPORTANT: The `@angular/animations` package is now deprecated. The Angular team recommends using native CSS with `animate.enter` and `animate.leave` for animations for all new code. Learn more at the new enter and leave [animation guide](/guide/animations). Also see [Migrating away from Angular's Animations package](guide/animations/migration) to learn how you can start migrating to pure CSS animations in your apps.

So far, we've learned simple animations of single HTML elements.
Angular also lets you animate coordinated sequences, such as an entire grid or list of elements as they enter and leave a page.
You can choose to run multiple animations in parallel, or run discrete animations sequentially, one following another.

The functions that control complex animation sequences are:

| Functions                         | Details                                                        |
| :-------------------------------- | :------------------------------------------------------------- |
| `query()`                         | Finds one or more inner HTML elements.                         |
| `stagger()`                       | Applies a cascading delay to animations for multiple elements. |
| [`group()`](api/animations/group) | Runs multiple animation steps in parallel.                     |
| `sequence()`                      | Runs animation steps one after another.                        |
-->

중요: `@angular/animations` 패키지는 이제 사용 중단 권고(deprecated) 상태입니다.
Angular 팀은 새로 작성하는 모든 코드에서 `animate.enter`와 `animate.leave`를 사용하는 네이티브 CSS 애니메이션을 권장합니다.
새로운 진입 및 퇴장 [애니메이션 가이드](/guide/animations)에서 자세히 알아보세요.
[Angular 애니메이션 패키지에서 마이그레이션하기](guide/animations/migration)를 참고하면 애플리케이션을 순수 CSS 애니메이션으로 전환하는 방법도 확인할 수 있습니다.

지금까지는 HTML 엘리먼트 하나에 적용하는 간단한 애니메이션을 살펴봤습니다.
Angular에서는 페이지에 진입하거나 퇴장하는 전체 그리드나 엘리먼트 목록처럼, 여러 애니메이션이 함께 동작하는 시퀀스도 만들 수 있습니다.
여러 애니메이션을 병렬로 실행하거나, 개별 애니메이션을 하나씩 순차적으로 실행하도록 선택할 수 있습니다.

복잡한 애니메이션 시퀀스를 제어하는 함수는 다음과 같습니다:

| 함수                              | 설명                                                          |
| :-------------------------------- | :------------------------------------------------------------ |
| `query()`                         | 내부 HTML 엘리먼트를 하나 이상 찾습니다.                      |
| `stagger()`                       | 여러 엘리먼트의 애니메이션에 차례대로 지연 시간을 적용합니다. |
| [`group()`](api/animations/group) | 여러 애니메이션 단계를 병렬로 실행합니다.                     |
| `sequence()`                      | 애니메이션 단계를 하나씩 순차적으로 실행합니다.               |

<!--
## The query() function
-->

<a id="the-query-function"></a>

## `query()` 함수

<!--
Most complex animations rely on the `query()` function to find child elements and apply animations to them. Basic examples include:

| Examples                               | Details                                                                                                                                                                                            |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `query()` followed by `animate()`      | Used to query simple HTML elements and directly apply animations to them.                                                                                                                          |
| `query()` followed by `animateChild()` | Used to query child elements, which themselves have animation metadata applied to them and trigger such animations \(which would otherwise be blocked by the current/parent element's animation\). |

The first argument of `query()` is a [css selector](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors) string which can also contain the following Angular-specific tokens:

| Tokens                     | Details                                      |
| :------------------------- | :------------------------------------------- |
| `:enter` <br /> `:leave`   | For entering/leaving elements.               |
| `:animating`               | For elements currently animating.            |
| `@*` <br /> `@triggerName` | For elements with any—or a specific—trigger. |
| `:self`                    | The animating element itself.                |

<docs-callout title="Entering and Leaving Elements">

Not all child elements are actually considered as entering/leaving; this can, at times, be counterintuitive and confusing. Please see the [query api docs](api/animations/query#entering-and-leaving-elements) for more information.

You can also see an illustration of this in the animations example \(introduced in the animations [introduction section](guide/legacy-animations#about-this-guide)\) under the Querying tab.

</docs-callout>
-->

복잡한 애니메이션은 대부분 `query()` 함수로 자식 엘리먼트를 찾고 이 엘리먼트에 애니메이션을 적용합니다.
기본적인 사용 예는 다음과 같습니다:

| 예제                                   | 설명                                                                                                                                                                                         |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `query()` 다음에 `animate()` 사용      | 일반 HTML 엘리먼트를 조회하고 여기에 애니메이션을 직접 적용합니다.                                                                                                                           |
| `query()` 다음에 `animateChild()` 사용 | 자체 애니메이션 메타데이터가 적용된 자식 엘리먼트를 조회하고 해당 애니메이션을 실행합니다. 이렇게 실행하지 않으면 현재 엘리먼트나 부모 엘리먼트의 애니메이션이 자식 애니메이션을 차단합니다. |

`query()`의 첫 번째 인자는 [CSS 셀렉터](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors) 문자열이며, Angular 전용 토큰도 포함할 수 있습니다:

| 토큰                       | 설명                                                                    |
| :------------------------- | :---------------------------------------------------------------------- |
| `:enter` <br /> `:leave`   | 진입하거나 퇴장하는 엘리먼트입니다.                                     |
| `:animating`               | 현재 애니메이션이 실행 중인 엘리먼트입니다.                             |
| `@*` <br /> `@triggerName` | 트리거가 하나라도 있는 엘리먼트 또는 특정 트리거가 있는 엘리먼트입니다. |
| `:self`                    | 애니메이션이 적용되는 엘리먼트 자신입니다.                              |

<docs-callout title="진입하고 퇴장하는 엘리먼트">

모든 자식 엘리먼트가 실제로 진입하거나 퇴장하는 것으로 간주되는 것은 아닙니다.
이 동작은 때로 직관적이지 않고 혼란스러울 수 있습니다.
자세한 내용은 [query API 문서](api/animations/query#entering-and-leaving-elements)를 참고하세요.

애니메이션 [소개 문서](guide/legacy-animations#about-this-guide)에서 소개한 애니메이션 예제의 Querying 탭에서도 이 동작을 확인할 수 있습니다.

</docs-callout>

<!--
## Animate multiple elements using query() and stagger() functions
-->

<a id="animate-multiple-elements-using-query-and-stagger-functions"></a>

## `query()`와 `stagger()` 함수로 여러 엘리먼트에 애니메이션 적용하기

<!--
After querying child elements via `query()`, the `stagger()` function lets you define a timing gap between each item, animating elements with a delay between them.

The following example demonstrates how to use the `query()` and `stagger()` functions to animate a list \(of heroes\) adding each in sequence, with a slight delay, from top to bottom.

- Use `query()` to look for an element entering the page that meets certain criteria
- For each of these elements, use `style()` to set the same initial style for the element.
  Make it transparent and use `transform` to move it out of position so that it can slide into place.

- Use `stagger()` to delay each animation by 30 milliseconds
- Animate each element on screen for 0.5 seconds using a custom-defined easing curve, simultaneously fading it in and un-transforming it

<docs-code header="hero-list-page.ts" path="adev/src/content/examples/animations/src/app/hero-list-page.ts" region="page-animations"/>
-->

`query()`로 자식 엘리먼트를 조회한 뒤에는 `stagger()` 함수로 각 항목 사이의 시간 간격을 정의해서, 엘리먼트마다 지연 시간을 두고 애니메이션을 실행할 수 있습니다.

다음 예제에서는 `query()`와 `stagger()` 함수로 영웅 목록에 애니메이션을 적용합니다.
각 히어로는 위에서 아래로 약간의 지연 시간을 두고 차례대로 추가됩니다.

- `query()`로 특정 조건을 만족하면서 페이지에 진입하는 엘리먼트를 찾습니다.
- 각 엘리먼트에 `style()`을 사용해서 같은 초기 스타일을 설정합니다.
  엘리먼트를 투명하게 만들고 `transform`으로 원래 위치에서 이동시켜, 제자리로 미끄러져 들어오도록 준비합니다.
- `stagger()`로 각 애니메이션을 30밀리초씩 지연시킵니다.
- 직접 정의한 이징 곡선을 사용해서 화면의 각 엘리먼트에 0.5초 동안 애니메이션을 적용합니다. 이때 엘리먼트가 서서히 나타나면서 변형도 원래대로 돌아갑니다.

<docs-code header="hero-list-page.ts" path="adev/src/content/examples/animations/src/app/hero-list-page.ts" region="page-animations"/>

<!--
## Parallel animation using group() function
-->

<a id="parallel-animation-using-group-function"></a>

## `group()` 함수로 애니메이션 병렬 실행하기

<!--
You've seen how to add a delay between each successive animation.
But you might also want to configure animations that happen in parallel.
For example, you might want to animate two CSS properties of the same element but use a different `easing` function for each one.
For this, you can use the animation [`group()`](api/animations/group) function.

HELPFUL: The [`group()`](api/animations/group) function is used to group animation _steps_, rather than animated elements.

The following example uses [`group()`](api/animations/group)s on both `:enter` and `:leave` for two different timing configurations, thus applying two independent animations to the same element in parallel.

<docs-code header="hero-list-groups.ts (excerpt)" path="adev/src/content/examples/animations/src/app/hero-list-groups.ts" region="animationdef"/>
-->

연속된 애니메이션 사이에 지연 시간을 추가하는 방법을 살펴봤습니다.
하지만 여러 애니메이션을 동시에 실행하려는 경우도 있습니다.
예를 들어 같은 엘리먼트의 CSS 프로퍼티 두 개에 애니메이션을 적용하면서, 각각 다른 `easing` 함수를 사용하려는 경우입니다.
이럴 때는 애니메이션 [`group()`](api/animations/group) 함수를 사용하면 됩니다.

도움말: [`group()`](api/animations/group) 함수는 애니메이션이 적용되는 엘리먼트가 아니라 애니메이션 _단계_ 를 그룹으로 묶습니다.

다음 예제에서는 `:enter`와 `:leave` 양쪽에 [`group()`](api/animations/group)을 사용해서 서로 다른 두 가지 타이밍을 설정합니다.
이렇게 하면 같은 엘리먼트에 독립적인 애니메이션 두 개를 병렬로 적용할 수 있습니다.

<docs-code header="hero-list-groups.ts (일부)" path="adev/src/content/examples/animations/src/app/hero-list-groups.ts" region="animationdef"/>

<!--
## Sequential vs. parallel animations
-->

<a id="sequential-vs-parallel-animations"></a>

## 순차 애니메이션과 병렬 애니메이션

<!--
Complex animations can have many things happening at once.
But what if you want to create an animation involving several animations happening one after the other? Earlier you used [`group()`](api/animations/group) to run multiple animations all at the same time, in parallel.

A second function called `sequence()` lets you run those same animations one after the other.
Within `sequence()`, the animation steps consist of either `style()` or `animate()` function calls.

- Use `style()` to apply the provided styling data immediately.
- Use `animate()` to apply styling data over a given time interval.
-->

복잡한 애니메이션에서는 여러 동작이 동시에 일어날 수 있습니다.
그렇다면 여러 애니메이션을 하나씩 차례대로 실행하려면 어떻게 해야 할까요? 앞에서는 [`group()`](api/animations/group)을 사용해서 여러 애니메이션을 동시에 병렬로 실행했습니다.

`sequence()`라는 다른 함수를 사용하면 같은 애니메이션을 하나씩 차례대로 실행할 수 있습니다.
`sequence()` 안의 애니메이션 단계는 `style()` 또는 `animate()` 함수 호출로 구성합니다.

- 지정한 스타일을 즉시 적용하려면 `style()`을 사용합니다.
- 지정한 시간에 걸쳐 스타일을 적용하려면 `animate()`를 사용합니다.

<!--
## Filter animation example
-->

<a id="filter-animation-example"></a>

## 필터 애니메이션 예제

<!--
Take a look at another animation on the example page.
Under the Filter/Stagger tab, enter some text into the **Search Heroes** text box, such as `Magnet` or `tornado`.

The filter works in real time as you type.
Elements leave the page as you type each new letter and the filter gets progressively stricter.
The heroes list gradually re-enters the page as you delete each letter in the filter box.

The HTML template contains a trigger called `filterAnimation`.

<docs-code header="hero-list-page.html" path="adev/src/content/examples/animations/src/app/hero-list-page.html" region="filter-animations" language="angular-html"/>

The `filterAnimation` in the component's decorator contains three transitions.

<docs-code header="hero-list-page.ts" path="adev/src/content/examples/animations/src/app/hero-list-page.ts" region="filter-animations"/>

The code in this example performs the following tasks:

- Skips animations when the user first opens or navigates to this page \(the filter animation narrows what is already there, so it only works on elements that already exist in the DOM\)
- Filters heroes based on the search input's value

For each change:

- Hides an element leaving the DOM by setting its opacity and width to 0
- Animates an element entering the DOM over 300 milliseconds.
  During the animation, the element assumes its default width and opacity.

- If there are multiple elements entering or leaving the DOM, staggers each animation starting at the top of the page, with a 50-millisecond delay between each element
-->

예제 페이지의 다른 애니메이션을 살펴봅시다.
Filter/Stagger 탭에서 **Search Heroes** 텍스트 상자에 `Magnet`이나 `tornado` 같은 텍스트를 입력해 보세요.

필터는 입력하는 동안 실시간으로 동작합니다.
글자를 하나씩 추가할 때마다 필터 조건이 점점 더 엄격해지면서 엘리먼트가 페이지에서 퇴장합니다.
반대로 필터 상자에서 글자를 하나씩 지우면 영웅 목록이 점차 페이지에 다시 진입합니다.

HTML 템플릿에는 `filterAnimation`이라는 트리거가 있습니다.

<docs-code header="hero-list-page.html" path="adev/src/content/examples/animations/src/app/hero-list-page.html" region="filter-animations" language="angular-html"/>

컴포넌트 데코레이터의 `filterAnimation`에는 전환 세 개가 있습니다.

<docs-code header="hero-list-page.ts" path="adev/src/content/examples/animations/src/app/hero-list-page.ts" region="filter-animations"/>

이 예제의 코드는 다음 작업을 수행합니다:

- 사용자가 처음 페이지를 열거나 이 페이지로 이동했을 때는 애니메이션을 건너뜁니다. 필터 애니메이션은 이미 존재하는 항목을 좁혀 나가는 동작이므로, DOM에 이미 있는 엘리먼트에만 적용됩니다.
- 검색 입력의 값을 기준으로 영웅을 필터링합니다.

값이 바뀔 때마다 다음 작업을 수행합니다:

- DOM에서 퇴장하는 엘리먼트의 불투명도와 너비를 0으로 설정해서 숨깁니다.
- DOM에 진입하는 엘리먼트에 300밀리초 동안 애니메이션을 적용합니다.
  애니메이션이 실행되는 동안 엘리먼트는 기본 너비와 불투명도로 바뀝니다.
- DOM에 진입하거나 퇴장하는 엘리먼트가 여러 개라면, 페이지 위쪽부터 각 엘리먼트 사이에 50밀리초의 지연 시간을 두고 애니메이션을 차례대로 실행합니다.

<!--
## Animating the items of a reordering list
-->

<a id="animating-the-items-of-a-reordering-list"></a>

## 순서가 바뀌는 목록 항목에 애니메이션 적용하기

<!--
Although Angular animates correctly `*ngFor` list items out of the box, it will not be able to do so if their ordering changes.
This is because it will lose track of which element is which, resulting in broken animations.
The only way to help Angular keep track of such elements is by assigning a `TrackByFunction` to the `NgForOf` directive.
This makes sure that Angular always knows which element is which, thus allowing it to apply the correct animations to the correct elements all the time.

IMPORTANT: If you need to animate the items of an `*ngFor` list and there is a possibility that the order of such items will change during runtime, always use a `TrackByFunction`.
-->

Angular는 기본적으로 `*ngFor` 목록 항목에 애니메이션을 올바르게 적용하지만, 항목의 순서가 바뀌면 제대로 처리할 수 없습니다.
어떤 엘리먼트가 어떤 항목인지 추적하지 못해서 애니메이션이 깨지기 때문입니다.
Angular가 이런 엘리먼트를 계속 추적하도록 하려면 `NgForOf` 디렉티브에 `TrackByFunction`을 지정해야 합니다.
이렇게 하면 Angular는 항상 각 엘리먼트를 식별할 수 있으므로, 언제나 올바른 엘리먼트에 올바른 애니메이션을 적용할 수 있습니다.

중요: `*ngFor` 목록의 항목에 애니메이션을 적용하면서 런타임에 항목 순서가 바뀔 가능성이 있다면, 항상 `TrackByFunction`을 사용하세요.

<!--
## Animations and Component View Encapsulation
-->

<a id="animations-and-component-view-encapsulation"></a>

## 애니메이션과 컴포넌트 뷰 캡슐화

<!--
Angular animations are based on the components DOM structure and do not directly take [View Encapsulation](guide/components/styling#style-scoping) into account, this means that components using `ViewEncapsulation.Emulated` behave exactly as if they were using `ViewEncapsulation.None` (`ViewEncapsulation.ShadowDom` and `ViewEncapsulation.ExperimentalIsolatedShadowDom` behave differently as we'll discuss shortly).

For example if the `query()` function (which you'll see more of in the rest of the Animations guide) were to be applied at the top of a tree of components using the emulated view encapsulation, such query would be able to identify (and thus animate) DOM elements on any depth of the tree.

On the other hand the `ViewEncapsulation.ShadowDom` and `ViewEncapsulation.ExperimentalIsolatedShadowDom` changes the component's DOM structure by "hiding" DOM elements inside [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot) elements. Such DOM manipulations do prevent some of the animations implementation to work properly since it relies on simple DOM structures and doesn't take `ShadowRoot` elements into account. Therefore it is advised to avoid applying animations to views incorporating components using the ShadowDom view encapsulation.
-->

Angular 애니메이션은 컴포넌트의 DOM 구조를 기반으로 동작하며, [뷰 캡슐화](guide/components/styling#style-scoping)를 직접 고려하지 않습니다.
따라서 `ViewEncapsulation.Emulated`를 사용하는 컴포넌트는 `ViewEncapsulation.None`을 사용할 때와 완전히 똑같이 동작합니다.
`ViewEncapsulation.ShadowDom`과 `ViewEncapsulation.ExperimentalIsolatedShadowDom`은 다르게 동작하며, 곧 살펴보겠습니다.

예를 들어 에뮬레이트된 뷰 캡슐화를 사용하는 컴포넌트 트리의 최상위에서 `query()` 함수를 실행하면, 트리의 깊이에 관계없이 DOM 엘리먼트를 식별하고 애니메이션을 적용할 수 있습니다.
이 함수는 애니메이션 가이드의 나머지 부분에서 더 살펴봅니다.

반면 `ViewEncapsulation.ShadowDom`과 `ViewEncapsulation.ExperimentalIsolatedShadowDom`은 DOM 엘리먼트를 [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot) 안으로 "숨겨서" 컴포넌트의 DOM 구조를 바꿉니다.
애니메이션 구현은 단순한 DOM 구조를 전제로 하며 `ShadowRoot` 엘리먼트를 고려하지 않으므로, 이런 DOM 조작 때문에 일부 애니메이션이 제대로 동작하지 않을 수 있습니다.
따라서 ShadowDom 뷰 캡슐화를 사용하는 컴포넌트가 포함된 뷰에는 애니메이션을 적용하지 않는 것이 좋습니다.

<!--
## Animation sequence summary
-->

<a id="animation-sequence-summary"></a>

## 애니메이션 시퀀스 정리

<!--
Angular functions for animating multiple elements start with `query()` to find inner elements; for example, gathering all images within a `<div>`.
The remaining functions, `stagger()`, [`group()`](api/animations/group), and `sequence()`, apply cascades or let you control how multiple animation steps are applied.
-->

Angular에서 여러 엘리먼트에 애니메이션을 적용할 때는 `query()`로 내부 엘리먼트를 찾는 것부터 시작합니다.
예를 들어 `<div>` 안의 이미지를 모두 찾을 수 있습니다.
나머지 함수인 `stagger()`, [`group()`](api/animations/group), `sequence()`는 애니메이션을 차례대로 적용하거나 여러 애니메이션 단계가 적용되는 방식을 제어합니다.

<!--
## More on Angular animations
-->

<a id="more-on-angular-animations"></a>

## Angular 애니메이션 더 알아보기

<!--
You might also be interested in the following:

<docs-pill-row>
  <docs-pill href="guide/legacy-animations" title="Introduction to Angular animations"/>
  <docs-pill href="guide/legacy-animations/transition-and-triggers" title="Transition and triggers"/>
  <docs-pill href="guide/legacy-animations/reusable-animations" title="Reusable animations"/>
  <docs-pill href="guide/routing/route-transition-animations" title="Route transition animations"/>
  <docs-pill href="guide/animations/migration" title="Migrating to Native CSS Animations"/>
</docs-pill-row>
-->

다음 문서도 참고해 보세요:

<docs-pill-row>
  <docs-pill href="guide/legacy-animations" title="Angular 애니메이션 소개"/>
  <docs-pill href="guide/legacy-animations/transition-and-triggers" title="전환과 트리거"/>
  <docs-pill href="guide/legacy-animations/reusable-animations" title="재사용 가능한 애니메이션"/>
  <docs-pill href="guide/routing/route-transition-animations" title="라우팅 규칙 전환 애니메이션"/>
  <docs-pill href="guide/animations/migration" title="네이티브 CSS 애니메이션으로 마이그레이션하기"/>
</docs-pill-row>
