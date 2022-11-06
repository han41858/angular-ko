<!--
# Complex animation sequences
-->
# 복잡한 애니메이션 시퀀스

<!--
## Prerequisites
-->
## 사전지식

<!--
A basic understanding of the following concepts:

*   [Introduction to Angular animations](guide/animations)
*   [Transition and triggers](guide/transition-and-triggers)

So far, we've learned simple animations of single HTML elements.
Angular also lets you animate coordinated sequences, such as an entire grid or list of elements as they enter and leave a page.
You can choose to run multiple animations in parallel, or run discrete animations sequentially, one following another.

The functions that control complex animation sequences are:

| Functions                         | Details |
|:---                               |:---     |
| `query()`                         | Finds one or more inner HTML elements. |
| `stagger()`                       | Applies a cascading delay to animations for multiple elements. |
| [`group()`](api/animations/group) | Runs multiple animation steps in parallel. |
| `sequence()`                      | Runs animation steps one after another. |
-->
다음 내용은 미리 이해하고 이 문서를 보는 것이 좋습니다:

*   [Angular 애니메이션 소개](guide/animations)
*   [트랜지션 & 트리거](guide/transition-and-triggers)

지금까지는 HTML 엘리먼트 하나에 애니메이션을 하나만 연결해 봤습니다.
그런데 Angular에서는 복잡한 순서로 진행되는 애니메이션도 구현할 수 있습니다.
그리드 전체가 움직이거나 목록에 있는 엘리먼트 각각이 화면에 나타나거나 화면에서 사라지는 애니메이션도 구현할 수 있습니다.
이런 애니메이션은 동시에 실행할 수도 있으며 순서대로 실행할 수도 있고, 다른 애니메이션이 끝나면 실행할 수 있습니다.

복잡한 애니메이션 시퀀스는 다음 함수들을 사용해서 구현합니다:

| 함수                                | 설명                                        |
|:----------------------------------|:------------------------------------------|
| `query()`                         | 자식 HTML 엘리먼트를 찾을 때 사용합니다.                 |
| `stagger()`                       | 엘리먼트 여러개에 있는 애니메이션에 순차적으로 딜레이를 줄 때 사용합니다. |
| [`group()`](api/animations/group) | 여러 애니메이션을 동시에 시작할 때 사용합니다.                |
| `sequence()`                      | 애니메이션을 순서대로 시작할 때 사용합니다.                 |


<a id="complex-sequence"></a>

<!--
## The query() function
-->
## `query()` 함수

<!--
Most complex animations rely on the `query()` function to find child elements and apply animations to them, basic examples of such are:

| Examples                               | Details |
|:---                                    |:---     |
| `query()` followed by `animate()`      | Used to query simple HTML elements and directly apply animations to them.                                                                                                                            |
| `query()` followed by `animateChild()` | Used to query child elements, which themselves have animations metadata applied to them and trigger such animation \(which would be otherwise be blocked by the current/parent element's animation\). |

The first argument of `query()` is a [css selector](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors) string which can also contain the following Angular-specific tokens:

| Tokens                     | Details |
|:---                        |:---     |
| `:enter` <br /> `:leave`   | For entering/leaving elements.               |
| `:animating`               | For elements currently animating.            |
| `@*` <br /> `@triggerName` | For elements with any—or a specific—trigger. |
| `:self`                    | The animating element itself.                |

<div class="callout is-helpful">

<header>Entering and Leaving Elements</header>

Not all child elements are actually considered as entering/leaving; this can, at times, be counterintuitive and confusing. Please see the [query api docs](api/animations/query#entering-and-leaving-elements) for more information.

You can also see an illustration of this in the animations live example \(introduced in the animations [introduction section](guide/animations#about-this-guide)\) under the Querying tab.

</div>
-->
`query()` 함수를 사용해서 자식 엘리먼트까지 복잡한 애니메이션을 적용하는 경우도 있습니다:

| 예제                                  | 설명                                                                        |
|:------------------------------------|:--------------------------------------------------------------------------|
| `animate()` 뒤에 사용하는 `query()`       | 간단하게 HTML 엘리먼트를 탐색하고 그 엘리먼트에 애니메이션을 적용합니다.                                |
| `animateChild()` 뒤에 사용하는 `query()` | 자식 엘리먼트를 탐색하고 자식 엘리먼트에 애니메이션을 적용합니다. 현재/부모 엘리먼트의 애니메이션 상태에 따라 중단될 수 있습니다. |

`query()` 함수의 첫번째 인자는 기본적으로 [css 셀렉터](https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors)지만, Angular에서는 이런 토큰도 사용할 수 있습니다:

| 토큰                         | 설명                        |
|:---------------------------|:--------------------------|
| `:enter` <br /> `:leave`   | 추가되는/사라지는 엘리먼트            |
| `:animating`               | 현재 애니메이션이 재생되는 엘리먼트       |
| `@*` <br /> `@triggerName` | 전체 트리거나 특정 트리거로 가리키는 엘리먼트 |
| `:self`                    | 애니메이션이 재생되는 엘리먼트 자체       |

<div class="callout is-helpful">

<header>추가되는/제거되는 엘리먼트</header>

자식 엘리먼트가 모두 추가되거나 제거되는 것은 아니라는 것이 때로는 혼란스러울 수 있습니다.
자세한 내용은 [query API 문서](api/animations/query#entering-and-leaving-elements)를 참고하세요.

[애니메이션 소개 섹션](guide/animations#about-this-guide)의 Querying 탭을 보면 예제도 확인할 수 있습니다.

</div>


<!--
## Animate multiple elements using query() and stagger() functions
-->
## 여러 엘리먼트에 있는 애니메이션 시작하기: `query()`, `stagger()`

After having queried child elements via `query()`, the `stagger()` function lets you define a timing gap between each queried item that is animated and thus animates elements with a delay between them.

The following example demonstrates how to use the `query()` and `stagger()` functions to animate a list \(of heroes\) adding each in sequence, with a slight delay, from top to bottom.

*   Use `query()` to look for an element entering the page that meets certain criteria
*   For each of these elements, use `style()` to set the same initial style for the element.
    Make it transparent and use `transform` to move it out of position so that it can slide into place.

*   Use `stagger()` to delay each animation by 30 milliseconds
*   Animate each element on screen for 0.5 seconds using a custom-defined easing curve, simultaneously fading it in and un-transforming it

<code-example header="src/app/hero-list-page.component.ts" path="animations/src/app/hero-list-page.component.ts" region="page-animations"></code-example>


<!--
## Parallel animation using group() function
-->
## 애니메이션 동시에 시작하기: `group()`

<!--
You've seen how to add a delay between each successive animation.
But you might also want to configure animations that happen in parallel.
For example, you might want to animate two CSS properties of the same element but use a different `easing` function for each one.
For this, you can use the animation [`group()`](api/animations/group) function.

<div class="alert is-helpful">

**NOTE**: <br />
The [`group()`](api/animations/group) function is used to group animation *steps*, rather than animated elements.

</div>

The following example uses [`group()`](api/animations/group)s on both `:enter` and `:leave` for two different timing configurations, thus applying two independent animations to the same element in parallel.

<code-example header="src/app/hero-list-groups.component.ts (excerpt)" path="animations/src/app/hero-list-groups.component.ts" region="animationdef"></code-example>
-->
개별 애니메이션은 조금씩 딜레이를 주면서 시작할 수도 있지만 동시에 시작하는 애니메이션이 필요한 때도 있습니다.
한 엘리먼트에 CSS 프로퍼티 2개를 애니메이션으로 조정하지만 이 애니메이션에 서로 다른 `easing` 함수를 사용하는 경우가 그렇습니다.
이렇게 구현하려면 [`group()`](api/animations/group) 함수를 사용하면 됩니다.

<div class="alert is-helpful">

**참고**: <br />
[`group()`](api/animations/group) 함수는 여러 엘리먼트를 묶는 것이 아니라 애니메이션 *스텝(step)*을 묶는 용도로 사용합니다.

</div>

아래 코드는 `:enter` 트랜지션과 `:leave` 트랜지션에 서로 다른 타이밍을 지정하는 예제 코드입니다.
한 엘리먼트에 있는 애니메이션을 동시에 시작하더라도 이 애니메이션은 서로 독립적으로 동작합니다.

<code-example header="src/app/hero-list-groups.component.ts (일부)" path="animations/src/app/hero-list-groups.component.ts" region="animationdef"></code-example>


<!--
## Sequential vs. parallel animations
-->
## 순서대로 시작하기 vs. 동시에 시작하기

<!--
Complex animations can have many things happening at once.
But what if you want to create an animation involving several animations happening one after the other? Earlier you used [`group()`](api/animations/group) to run multiple animations all at the same time, in parallel.

A second function called `sequence()` lets you run those same animations one after the other.
Within `sequence()`, the animation steps consist of either `style()` or `animate()` function calls.

*   Use `style()` to apply the provided styling data immediately.
*   Use `animate()` to apply styling data over a given time interval.
-->
복잡한 애니메이션은 한 번에 모든 것을 처리할 수도 있습니다.
하지만 어떤 애니메이션이 끝난 이후에 다른 애니메이션을 시작해야 한다면 어떻게 해야 할까요?
이전 섹션에서는 [`group()`](api/animations/group) 함수를 사용해서 여러 애니메이션을 동시에 시작하는 방법에 대해 알아봤습니다.

이번에는 `sequence()` 함수를 사용해서 애니메이션이 끝난 후에 다른 애니메이션이 시작되도록 구현해 봅시다.
`sequence()` 함수에서 각 애니메이션 단계는 `style()`이나 `animate()` 함수로 구성됩니다.

*   Use `style()` to apply the provided styling data immediately.
*   Use `animate()` to apply styling data over a given time interval.


<!--
## Filter animation example
-->
## 필터 애니메이션 예제

<!--
Take a look at another animation on the live example page.
Under the Filter/Stagger tab, enter some text into the **Search Heroes** text box, such as `Magnet` or `tornado`.

The filter works in real time as you type.
Elements leave the page as you type each new letter and the filter gets progressively stricter.
The heroes list gradually re-enters the page as you delete each letter in the filter box.

The HTML template contains a trigger called `filterAnimation`.

<code-example header="src/app/hero-list-page.component.html" path="animations/src/app/hero-list-page.component.html" region="filter-animations"></code-example>

The `filterAnimation` in the component's decorator contains three transitions.

<code-example header="src/app/hero-list-page.component.ts" path="animations/src/app/hero-list-page.component.ts" region="filter-animations"></code-example>

The code in this example performs the following tasks:

*   Skips animations when the user first opens or navigates to this page \(the filter animation narrows what is already there, so it only works on elements that already exist in the DOM\)
*   Filters heroes based on the search input's value

For each change:

*   Hides an element leaving the DOM by setting its opacity and width to 0
*   Animates an element entering the DOM over 300 milliseconds.
    During the animation, the element assumes its default width and opacity.

*   If there are multiple elements entering or leaving the DOM, staggers each animation starting at the top of the page, with a 50-millisecond delay between each element
-->
예제 앱에 있는 다른 애니메이션에 대해 알아봅시다.
Filter/Stagger 탭에 있는 **Search Heroes** 입력 필드에 `Magnet`이나 `tornado`와 같은 텍스트를 입력해 보세요.

그러면 사용자가 글자를 하나씩 입력할 때마다 검색조건에 해당되지 않는 엘리먼트는 화면에서 사라지는 필터가 동작합니다.
그리고 글자를 하나씩 지우면 변경된 조건에 맞는 엘리먼트는 다시 화면에 나타납니다.

이 애니메이션이 적용된 컴포넌트 템플릿은 이렇습니다. 트리거 이름은 `filterAnimation` 입니다.

<code-example header="src/app/hero-list-page.component.html" path="animations/src/app/hero-list-page.component.html" region="filter-animations"></code-example>

그리고 컴포넌트 클래스 파일의 내용은 이렇습니다.

<code-example header="src/app/hero-list-page.component.ts" path="animations/src/app/hero-list-page.component.ts" region="filter-animations"></code-example>

애니메이션은 이렇게 동작합니다:

*   사용자가 화면을 전환할 때 진행되는 애니메이션은 무시합니다. 필터가 처음 동작할 때는 해당 화면의 HTML 엘리먼트는 모두 DOM에 존재하고 있던 것으로 간주합니다.
*   키를 입력할 때마다 필터가 동작합니다.

각 키 입력마다:

*   사라지는 엘리먼트는 `opacity`와 `width`를 조절합니다.
*   엘리먼트 애니메이션은 300ms 동안 진행됩니다.
*   조건에 맞는 엘리먼트가 여러개라면 각 엘리먼트마다 50ms 딜레이를 두면서 순차적으로 시작합니다.


<!--
## Animating the items of a reordering list
-->
## 순서가 바뀔 때 적용되는 애니메이션

<!--
Although Angular animates correctly `*ngFor` list items out of the box, it will not be able to do so if their ordering changes.
This is because it will lose track of which element is which, resulting in broken animations.
The only way to help Angular keep track of such elements is by assigning a `TrackByFunction` to the `NgForOf` directive.
This makes sure that Angular always knows which element is which, thus allowing it to apply the correct animations to the correct elements all the time.

<div class="alert is-important">

**IMPORTANT**: <br />
If you need to animate the items of an `*ngFor` list and there is a possibility that the order of such items will change during runtime, always use a `TrackByFunction`.

</div>
-->
Angular가 `*ngFor`에 적용하는 애니메이션은 목록의 순서가 변경되었을 때 동작하지 않을 수 있습니다.
이런 현상은 개별 항목을 반복하다가 이전 항목을 제대로 추적하지 못했을 때 발생합니다.
이런 경우에는 `NgForOf` 디렉티브가 제공하는 `TrackByFunction` 으로 이전 항목을 정확하게 지정하면 해결할 수 있습니다.
추적하는 객체가 정확하게 지정되면 애니메이션도 정상적으로 적용됩니다.

<div class="alert is-important">

**중요**: <br />
`*ngFor`로 반복하는 목록이 순서가 변경될 수 있다면 반드시 `TrackByFunction`을 지정하세요.

</div>


<!--
## Animation sequence summary
-->
## 애니메이션 시퀀스 정리

<!--
Angular functions for animating multiple elements start with `query()` to find inner elements; for example, gathering all images within a `<div>`.
The remaining functions, `stagger()`, [`group()`](api/animations/group), and `sequence()`, apply cascades or let you control how multiple animation steps are applied.
-->
`query()` 함수를 사용하면 자식 엘리먼트 중에서 애니메이션을 적용할 엘리먼트를 탐색할 수 있습니다.
그래서 `<div>` 안에 있는 모든 이미지 엘리먼트를 모으는 용도로 활용할 수 있습니다.
그리고 `stagger()`나 [`group()`](api/animations/group), `sequence()`를 사용하면 여러 애니메이션이 어떻게 시작될지 지정할 수 있습니다.


<!--
## More on Angular animations
-->
## 애니메이션 더 알아보기

<!--
You might also be interested in the following:

*   [Introduction to Angular animations](guide/animations)
*   [Transition and triggers](guide/transition-and-triggers)
*   [Reusable animations](guide/reusable-animations)
*   [Route transition animations](guide/route-animations)
-->
다음 내용에 대해서도 알아보세요:

*   [Angular 애니메이션 소개](guide/animations)
*   [트랜지션 & 트리거](guide/transition-and-triggers)
*   [애니메이션 재사용하기](guide/reusable-animations)
*   [라우팅 애니메이션](guide/route-animations)

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
