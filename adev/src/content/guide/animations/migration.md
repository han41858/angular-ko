<!--
# Migrating away from Angular's Animations package
-->

<a id="migrating-away-from-angulars-animations-package"></a>

# Angular 애니메이션 패키지에서 마이그레이션하기

<!--
The `@angular/animations` package is deprecated as of v20.2, which also introduced the new `animate.enter` and `animate.leave` feature to add animations to your application. Using these new features, you can replace all animations based on `@angular/animations` with plain CSS or JS animation libraries. Removing `@angular/animations` from your application can significantly reduce the size of your JavaScript bundle. Native CSS animations generally offer superior performance, as they can benefit from hardware acceleration. This guide walks through the process of refactoring your code from `@angular/animations` to native CSS animations.
-->

`@angular/animations` 패키지는 v20.2부터 지원 중단 예정(deprecated)이며, 같은 버전에 애플리케이션에 애니메이션을 추가하는 새로운 기능인 `animate.enter`와 `animate.leave`가 도입되었습니다.
이 기능을 사용하면 `@angular/animations` 기반 애니메이션을 모두 일반 CSS나 JavaScript 애니메이션 라이브러리로 대체할 수 있습니다.
애플리케이션에서 `@angular/animations`를 제거하면 JavaScript 번들 크기를 크게 줄일 수 있습니다.
네이티브 CSS 애니메이션은 하드웨어 가속을 활용할 수 있어 일반적으로 더 뛰어난 성능을 제공합니다.
이 가이드에서는 `@angular/animations`를 사용하는 코드를 네이티브 CSS 애니메이션으로 리팩터링하는 과정을 살펴봅니다.

<!--
## How to write animations in native CSS
-->

<a id="how-to-write-animations-in-native-css"></a>

## 네이티브 CSS로 애니메이션 작성하기

<!--
If you've never written any native CSS animations, there are a number of excellent guides to get you started. Here are a few of them:
[MDN's CSS Animations guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)
[W3Schools CSS3 Animations guide](https://www.w3schools.com/css/css3_animations.asp)
[The Complete CSS Animations Tutorial](https://www.lambdatest.com/blog/css-animations-tutorial/)
[CSS Animation for Beginners](https://thoughtbot.com/blog/css-animation-for-beginners)

and a couple of videos:
[Learn CSS Animation in 9 Minutes](https://www.youtube.com/watch?v=z2LQYsZhsFw)
[Net Ninja CSS Animation Tutorial Playlist](https://www.youtube.com/watch?v=jgw82b5Y2MU&list=PL4cUxeGkcC9iGYgmEd2dm3zAKzyCGDtM5)

Check out some of these guides and tutorials, then come back to this guide.
-->

네이티브 CSS 애니메이션을 작성해 본 적이 없다면, 시작하는 데 도움이 되는 훌륭한 가이드가 많이 있습니다.
그중 몇 가지를 소개합니다:  
[MDN CSS 애니메이션 가이드](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)  
[W3Schools CSS3 애니메이션 가이드](https://www.w3schools.com/css/css3_animations.asp)  
[CSS 애니메이션 전체 튜토리얼](https://www.lambdatest.com/blog/css-animations-tutorial/)  
[초보자를 위한 CSS 애니메이션](https://thoughtbot.com/blog/css-animation-for-beginners)

다음 동영상도 참고할 수 있습니다:  
[9분 만에 배우는 CSS 애니메이션](https://www.youtube.com/watch?v=z2LQYsZhsFw)  
[Net Ninja CSS 애니메이션 튜토리얼 재생목록](https://www.youtube.com/watch?v=jgw82b5Y2MU&list=PL4cUxeGkcC9iGYgmEd2dm3zAKzyCGDtM5)

이 가이드와 튜토리얼 중 몇 가지를 살펴본 뒤 이 문서로 돌아오세요.

<!--
## Creating Reusable Animations
-->

<a id="creating-reusable-animations"></a>

## 재사용 가능한 애니메이션 만들기

<!--
Just like with the animations package, you can create reusable animations that can be shared across your application. The animations package version of this had you using the `animation()` function in a shared typescript file. The native CSS version of this is similar, but lives in a shared CSS file.
-->

애니메이션 패키지를 사용할 때처럼 애플리케이션 전체에서 공유할 수 있는 재사용 가능한 애니메이션을 만들 수 있습니다.
애니메이션 패키지에서는 공통 TypeScript 파일에서 `animation()` 함수를 사용했습니다.
네이티브 CSS 방식도 비슷하지만, 공통 CSS 파일에 정의합니다.

<!--
#### With Animations Package
-->

<a id="with-animations-package"></a>

#### 애니메이션 패키지 사용

<!--
<docs-code header="animations.ts" path="adev/src/content/examples/animations/src/app/animations.1.ts" region="animation-example"/>
-->

<docs-code header="animations.ts" path="adev/src/content/examples/animations/src/app/animations.1.ts" region="animation-example"/>

<!--
#### With Native CSS
-->

<a id="with-native-css"></a>

#### 네이티브 CSS 사용

<!--
<docs-code header="animations.css" path="adev/src/content/examples/animations/src/app/animations.css" region="animation-shared"/>

Adding the class `animated-class` to an element would trigger the animation on that element.
-->

<docs-code header="animations.css" path="adev/src/content/examples/animations/src/app/animations.css" region="animation-shared"/>

엘리먼트에 `animated-class` 클래스를 추가하면 해당 엘리먼트에서 애니메이션이 실행됩니다.

<!--
## Animating a Transition
-->

<a id="animating-a-transition"></a>

## 전환에 애니메이션 적용하기

<!--
### Animating State and Styles
-->

<a id="animating-state-and-styles"></a>

### 상태와 스타일에 애니메이션 적용하기

<!--
The animations package allowed you to define various states using the [`state()`](api/animations/state) function within a component. Examples might be an `open` or `closed` state containing the styles for each respective state within the definition. For example:
-->

애니메이션 패키지에서는 컴포넌트 안에서 [`state()`](api/animations/state) 함수로 여러 상태를 정의할 수 있었습니다.
예를 들어 `open`이나 `closed` 상태를 정의하면서 각 상태에 해당하는 스타일을 포함할 수 있습니다.
다음 예제를 참고하세요:

<!--
#### With Animations Package {#animating-state-and-styles-with-animations-package}
-->

<a id="with-animations-package-1"></a>
<a id="animating-state-and-styles-with-animations-package"></a>

#### 애니메이션 패키지 사용 {#애니메이션-패키지-사용-2}

<!--
<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="state1"/>

This same behavior can be accomplished natively by using CSS classes, either with a keyframe animation or transition styling.
-->

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="state1"/>

CSS 클래스에 키프레임 애니메이션이나 전환 스타일을 지정하면 네이티브 CSS로도 같은 동작을 구현할 수 있습니다.

<!--
#### With Native CSS {#animating-state-and-styles-with-native-css}
-->

<a id="with-native-css-1"></a>
<a id="animating-state-and-styles-with-native-css"></a>

#### 네이티브 CSS 사용 {#네이티브-css-사용-2}

<!--
<docs-code header="animations.css" path="adev/src/content/examples/animations/src/app/animations.css" region="animation-states"/>

Triggering the `open` or `closed` state is done by toggling classes on the element in your component. You can find examples of how to do this in our [template guide](guide/templates/binding#css-class-and-style-property-bindings).

You can see similar examples in the template guide for [animating styles directly](guide/templates/binding#css-style-properties).
-->

<docs-code header="animations.css" path="adev/src/content/examples/animations/src/app/animations.css" region="animation-states"/>

컴포넌트에서 엘리먼트의 클래스를 전환하면 `open` 또는 `closed` 상태가 실행됩니다.
방법은 [템플릿 가이드](guide/templates/binding#css-class-and-style-property-bindings)의 예제를 참고하세요.

템플릿 가이드의 [스타일에 직접 애니메이션 적용하기](guide/templates/binding#css-style-properties)에서도 비슷한 예제를 확인할 수 있습니다.

<!--
### Transitions, Timing, and Easing
-->

<a id="transitions-timing-and-easing"></a>

### 전환, 타이밍, 이징

<!--
The animations package `animate()` function allows for providing timing, like duration, delays and easing. This can be done natively with CSS using several css properties or shorthand properties.

Specify `animation-duration`, `animation-delay`, and `animation-timing-function` for a keyframe animation in CSS, or alternatively use the `animation` shorthand property.

<docs-code header="animations.css" path="adev/src/content/examples/animations/src/app/animations.css" region="animation-timing"/>

Similarly, you can use `transition-duration`, `transition-delay`, and `transition-timing-function` and the `transition` shorthand for animations that are not using `@keyframes`.

<docs-code header="animations.css" path="adev/src/content/examples/animations/src/app/animations.css" region="transition-timing"/>
-->

애니메이션 패키지의 `animate()` 함수에서는 지속 시간, 지연 시간, 이징 같은 타이밍을 지정할 수 있습니다.
CSS의 여러 프로퍼티나 단축 프로퍼티를 사용하면 네이티브 CSS로도 설정할 수 있습니다.

CSS 키프레임 애니메이션에는 `animation-duration`, `animation-delay`, `animation-timing-function`을 지정하거나, 단축 프로퍼티인 `animation`을 사용하세요.

<docs-code header="animations.css" path="adev/src/content/examples/animations/src/app/animations.css" region="animation-timing"/>

마찬가지로 `@keyframes`를 사용하지 않는 애니메이션에는 `transition-duration`, `transition-delay`, `transition-timing-function`과 단축 프로퍼티 `transition`을 사용할 수 있습니다.

<docs-code header="animations.css" path="adev/src/content/examples/animations/src/app/animations.css" region="transition-timing"/>

<!--
### Triggering an Animation
-->

<a id="triggering-an-animation"></a>

### 애니메이션 실행하기

<!--
The animations package required specifying triggers using the `trigger()` function and nesting all of your states within it. With native CSS, this is unnecessary. Animations can be triggered by toggling CSS styles or classes. Once a class is present on an element, the animation will occur. Removing the class will revert the element back to whatever CSS is defined for that element. This results in significantly less code to do the same animation. Here's an example:
-->

애니메이션 패키지에서는 `trigger()` 함수로 트리거를 지정하고, 그 안에 모든 상태를 중첩해서 정의해야 했습니다.
네이티브 CSS에서는 그럴 필요가 없습니다.
CSS 스타일이나 클래스를 전환해서 애니메이션을 실행할 수 있습니다.
엘리먼트에 클래스가 추가되면 애니메이션이 실행됩니다.
클래스를 제거하면 엘리먼트는 원래 정의된 CSS 스타일로 돌아갑니다.
따라서 훨씬 적은 코드로 같은 애니메이션을 구현할 수 있습니다.
다음 예제를 참고하세요:

<!--
#### With Animations Package {#triggering-an-animation-with-animations-package}
-->

<a id="with-animations-package-2"></a>
<a id="triggering-an-animation-with-animations-package"></a>

#### 애니메이션 패키지 사용 {#애니메이션-패키지-사용-3}

<!--
<docs-code-multifile>
    <docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/animations-package/open-close.ts" />
    <docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/animations-package/open-close.html" />
    <docs-code header="open-close.css" path="adev/src/content/examples/animations/src/app/animations-package/open-close.css"/>
</docs-code-multifile>
-->

<docs-code-multifile>
    <docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/animations-package/open-close.ts" />
    <docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/animations-package/open-close.html" />
    <docs-code header="open-close.css" path="adev/src/content/examples/animations/src/app/animations-package/open-close.css"/>
</docs-code-multifile>

<!--
#### With Native CSS {#triggering-an-animation-with-native-css}
-->

<a id="with-native-css-2"></a>
<a id="triggering-an-animation-with-native-css"></a>

#### 네이티브 CSS 사용 {#네이티브-css-사용-3}

<!--
<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/open-close.ts">
    <docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/native-css/open-close.ts" />
    <docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/native-css/open-close.html" />
    <docs-code header="open-close.css" path="adev/src/content/examples/animations/src/app/native-css/open-close.css"/>
</docs-code-multifile>
-->

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/open-close.ts">
    <docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/native-css/open-close.ts" />
    <docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/native-css/open-close.html" />
    <docs-code header="open-close.css" path="adev/src/content/examples/animations/src/app/native-css/open-close.css"/>
</docs-code-multifile>

<!--
## Transition and Triggers
-->

<a id="transition-and-triggers"></a>

## 전환과 트리거

<!--
### Predefined State and wildcard matching
-->

<a id="predefined-state-and-wildcard-matching"></a>

### 사전 정의된 상태와 와일드카드 매칭

<!--
The animations package offers the ability to match your defined states to a transition via strings. For example, animating from open to closed would be `open => closed`. You can use wildcards to match any state to a target state, like `* => closed` and the `void` keyword can be used for entering and exiting states. For example: `* => void` for when an element leaves a view or `void => *` for when the element enters a view.

These state matching patterns are not needed at all when animating with CSS directly. You can manage what transitions and `@keyframes` animations apply based on whatever classes you set and / or styles you set on the elements. You can also add `@starting-style` to control how the element looks upon immediately entering the DOM.
-->

애니메이션 패키지에서는 문자열을 사용해서 정의한 상태를 전환과 매칭할 수 있습니다.
예를 들어 열린 상태에서 닫힌 상태로 전환하는 애니메이션은 `open => closed`로 표현합니다.
`* => closed`처럼 와일드카드를 사용하면 모든 상태를 목표 상태와 매칭할 수 있고, `void` 키워드로 진입과 퇴장 상태를 표현할 수도 있습니다.
예를 들어 엘리먼트가 뷰에서 퇴장할 때는 `* => void`, 뷰에 진입할 때는 `void => *`를 사용합니다.

CSS로 직접 애니메이션을 적용할 때는 이런 상태 매칭 패턴이 전혀 필요하지 않습니다.
엘리먼트에 지정한 클래스나 스타일을 기준으로 어떤 전환과 `@keyframes` 애니메이션을 적용할지 관리하면 됩니다.
`@starting-style`을 추가해서 엘리먼트가 DOM에 진입하는 순간의 모습을 제어할 수도 있습니다.

<!--
### Automatic Property Calculation with Wildcards
-->

<a id="automatic-property-calculation-with-wildcards"></a>

### 와일드카드로 프로퍼티 자동 계산하기

<!--
The animations package offers the ability to animate things that have been historically difficult to animate, like animating a set height to `height: auto`. You can now do this with pure CSS as well.
-->

애니메이션 패키지는 고정된 높이에서 `height: auto`로 바꾸는 것처럼, 기존에는 구현하기 어려웠던 애니메이션을 지원합니다.
이제 순수 CSS로도 구현할 수 있습니다.

<!--
#### With Animations Package {#automatic-property-calculation-with-animations-package}
-->

<a id="with-animations-package-3"></a>
<a id="automatic-property-calculation-with-animations-package"></a>

#### 애니메이션 패키지 사용 {#애니메이션-패키지-사용-4}

<!--
<docs-code-multifile>
    <docs-code header="auto-height.ts" path="adev/src/content/examples/animations/src/app/animations-package/auto-height.ts" />
    <docs-code header="auto-height.html" path="adev/src/content/examples/animations/src/app/animations-package/auto-height.html" />
    <docs-code header="auto-height.css" path="adev/src/content/examples/animations/src/app/animations-package/auto-height.css" />
</docs-code-multifile>

You can use CSS Grid to animate to auto height.
-->

<docs-code-multifile>
    <docs-code header="auto-height.ts" path="adev/src/content/examples/animations/src/app/animations-package/auto-height.ts" />
    <docs-code header="auto-height.html" path="adev/src/content/examples/animations/src/app/animations-package/auto-height.html" />
    <docs-code header="auto-height.css" path="adev/src/content/examples/animations/src/app/animations-package/auto-height.css" />
</docs-code-multifile>

CSS Grid를 사용하면 높이가 자동으로 결정되는 상태까지 애니메이션을 적용할 수 있습니다.

<!--
#### With Native CSS {#automatic-property-calculation-with-native-css}
-->

<a id="with-native-css-3"></a>
<a id="automatic-property-calculation-with-native-css"></a>

#### 네이티브 CSS 사용 {#네이티브-css-사용-4}

<!--
<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/auto-height.ts">
    <docs-code header="auto-height.ts" path="adev/src/content/examples/animations/src/app/native-css/auto-height.ts" />
    <docs-code header="auto-height.html" path="adev/src/content/examples/animations/src/app/native-css/auto-height.html" />
    <docs-code header="auto-height.css" path="adev/src/content/examples/animations/src/app/native-css/auto-height.css"  />
</docs-code-multifile>

If you don't have to worry about supporting all browsers, you can also check out `calc-size()`, which is the true solution to animating auto height. See [MDN's docs](https://developer.mozilla.org/en-US/docs/Web/CSS/calc-size) and (this tutorial)[https://frontendmasters.com/blog/one-of-the-boss-battles-of-css-is-almost-won-transitioning-to-auto/] for more information.
-->

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/auto-height.ts">
    <docs-code header="auto-height.ts" path="adev/src/content/examples/animations/src/app/native-css/auto-height.ts" />
    <docs-code header="auto-height.html" path="adev/src/content/examples/animations/src/app/native-css/auto-height.html" />
    <docs-code header="auto-height.css" path="adev/src/content/examples/animations/src/app/native-css/auto-height.css"  />
</docs-code-multifile>

모든 브라우저를 지원할 필요가 없다면, 자동 높이 애니메이션을 직접 지원하는 `calc-size()`도 살펴보세요.
자세한 내용은 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/calc-size)와 (이 튜토리얼)[https://frontendmasters.com/blog/one-of-the-boss-battles-of-css-is-almost-won-transitioning-to-auto/]을 참고하세요.

<!--
### Animate entering and leaving a view
-->

<a id="animate-entering-and-leaving-a-view"></a>

### 뷰 진입과 퇴장에 애니메이션 적용하기

<!--
The animations package offered the previously mentioned pattern matching for entering and leaving but also included the shorthand aliases of `:enter` and `:leave`.
-->

애니메이션 패키지는 앞서 설명한 진입 및 퇴장 패턴 매칭뿐 아니라 `:enter`, `:leave`라는 축약 별칭도 제공했습니다.

<!--
#### With Animations Package {#enter-and-leave-with-animations-package}
-->

<a id="with-animations-package-4"></a>
<a id="enter-and-leave-with-animations-package"></a>

#### 애니메이션 패키지 사용 {#애니메이션-패키지-사용-5}

<!--
<docs-code-multifile>
    <docs-code header="insert-remove.ts" path="adev/src/content/examples/animations/src/app/animations-package/insert-remove.ts" />
    <docs-code header="insert-remove.html" path="adev/src/content/examples/animations/src/app/animations-package/insert-remove.html" />
    <docs-code header="insert-remove.css" path="adev/src/content/examples/animations/src/app/animations-package/insert-remove.css" />
</docs-code-multifile>
-->

<docs-code-multifile>
    <docs-code header="insert-remove.ts" path="adev/src/content/examples/animations/src/app/animations-package/insert-remove.ts" />
    <docs-code header="insert-remove.html" path="adev/src/content/examples/animations/src/app/animations-package/insert-remove.html" />
    <docs-code header="insert-remove.css" path="adev/src/content/examples/animations/src/app/animations-package/insert-remove.css" />
</docs-code-multifile>

<!--
#### With Native CSS {#enter-with-native-css}
-->

<a id="with-native-css-4"></a>
<a id="enter-with-native-css"></a>

#### 네이티브 CSS 사용 {#네이티브-css-사용-5}

<!--
<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/insert.ts">
    <docs-code header="insert.ts" path="adev/src/content/examples/animations/src/app/native-css/insert.ts" />
    <docs-code header="insert.html" path="adev/src/content/examples/animations/src/app/native-css/insert.html" />
    <docs-code header="insert.css" path="adev/src/content/examples/animations/src/app/native-css/insert.css"  />
</docs-code-multifile>
-->

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/insert.ts">
    <docs-code header="insert.ts" path="adev/src/content/examples/animations/src/app/native-css/insert.ts" />
    <docs-code header="insert.html" path="adev/src/content/examples/animations/src/app/native-css/insert.html" />
    <docs-code header="insert.css" path="adev/src/content/examples/animations/src/app/native-css/insert.css"  />
</docs-code-multifile>

<!--
#### With Native CSS {#leave-with-native-css}
-->

<a id="with-native-css-5"></a>
<a id="leave-with-native-css"></a>

#### 네이티브 CSS 사용 {#네이티브-css-사용-6}

<!--
<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/remove.ts">
    <docs-code header="remove.ts" path="adev/src/content/examples/animations/src/app/native-css/remove.ts" />
    <docs-code header="remove.html" path="adev/src/content/examples/animations/src/app/native-css/remove.html" />
    <docs-code header="remove.css" path="adev/src/content/examples/animations/src/app/native-css/remove.css"  />
</docs-code-multifile>

For more information on `animate.enter` and `animate.leave`, see the [Enter and Leave animations guide](guide/animations).
-->

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/remove.ts">
    <docs-code header="remove.ts" path="adev/src/content/examples/animations/src/app/native-css/remove.ts" />
    <docs-code header="remove.html" path="adev/src/content/examples/animations/src/app/native-css/remove.html" />
    <docs-code header="remove.css" path="adev/src/content/examples/animations/src/app/native-css/remove.css"  />
</docs-code-multifile>

`animate.enter`와 `animate.leave`에 대한 자세한 내용은 [진입 및 퇴장 애니메이션 가이드](guide/animations)를 참고하세요.

<!--
### Animating increment and decrement
-->

<a id="animating-increment-and-decrement"></a>

### 값의 증가와 감소에 애니메이션 적용하기

<!--
Along with the aforementioned `:enter` and `:leave`, there's also `:increment` and `:decrement`. You can animate these also by adding and removing classes. Unlike the animation package built-in aliases, there is no automatic application of classes when the values go up or down. You can apply the appropriate classes programmatically. Here's an example:
-->

앞서 설명한 `:enter`, `:leave` 외에도 `:increment`와 `:decrement`가 있습니다.
클래스를 추가하고 제거하는 방식으로 이 애니메이션도 구현할 수 있습니다.
애니메이션 패키지의 내장 별칭과는 달리, 값이 증가하거나 감소할 때 클래스가 자동으로 적용되지는 않습니다.
코드에서 적절한 클래스를 적용하면 됩니다.
다음 예제를 참고하세요:

<!--
#### With Animations Package {#increment-and-decrement-with-animations-package}
-->

<a id="with-animations-package-5"></a>
<a id="increment-and-decrement-with-animations-package"></a>

#### 애니메이션 패키지 사용 {#애니메이션-패키지-사용-6}

<!--
<docs-code-multifile>
    <docs-code header="increment-decrement.ts" path="adev/src/content/examples/animations/src/app/animations-package/increment-decrement.ts" />
    <docs-code header="increment-decrement.html" path="adev/src/content/examples/animations/src/app/animations-package/increment-decrement.html" />
    <docs-code header="increment-decrement.css" path="adev/src/content/examples/animations/src/app/animations-package/increment-decrement.css" />
</docs-code-multifile>
-->

<docs-code-multifile>
    <docs-code header="increment-decrement.ts" path="adev/src/content/examples/animations/src/app/animations-package/increment-decrement.ts" />
    <docs-code header="increment-decrement.html" path="adev/src/content/examples/animations/src/app/animations-package/increment-decrement.html" />
    <docs-code header="increment-decrement.css" path="adev/src/content/examples/animations/src/app/animations-package/increment-decrement.css" />
</docs-code-multifile>

<!--
#### With Native CSS {#increment-and-decrement-with-native-css}
-->

<a id="with-native-css-6"></a>
<a id="increment-and-decrement-with-native-css"></a>

#### 네이티브 CSS 사용 {#네이티브-css-사용-7}

<!--
<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.ts">
    <docs-code header="increment-decrement.ts" path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.ts" />
    <docs-code header="increment-decrement.html" path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.html" />
    <docs-code header="increment-decrement.css" path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.css" />
</docs-code-multifile>
-->

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.ts">
    <docs-code header="increment-decrement.ts" path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.ts" />
    <docs-code header="increment-decrement.html" path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.html" />
    <docs-code header="increment-decrement.css" path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.css" />
</docs-code-multifile>

<!--
### Parent / Child Animations
-->

<a id="parent-child-animations"></a>

<a id="parent---child-animations"></a>

### 부모와 자식 애니메이션

<!--
Unlike the animations package, when multiple animations are specified within a given component, no animation has priority over another and nothing blocks any animation from firing. Any sequencing of animations would have to be handled by your definition of your CSS animation, using animation / transition delay, and / or using `animationend` or `transitionend` to handle adding the next css to be animated.
-->

애니메이션 패키지와 달리, 한 컴포넌트 안에 여러 애니메이션을 지정해도 어느 애니메이션이 다른 애니메이션보다 우선하지 않으며 애니메이션 실행을 차단하지도 않습니다.
애니메이션을 순서대로 실행하려면 CSS 애니메이션 정의에서 애니메이션이나 전환의 지연 시간을 지정하거나, `animationend` 또는 `transitionend` 이벤트에서 다음 애니메이션을 위한 CSS를 추가하도록 처리해야 합니다.

<!--
Child animations fire only within the same component template. In the `@angular/animations` package, parent animations could query and trigger animations in nested child components using `query()` and `animateChild()`. With `animate.leave` and native CSS animations, animations defined inside nested child component templates will not fire when a parent component removes an element or view. Only nested animations within the same Angular component template will execute. See the [Enter and Leave Animations guide](guide/animations#element-removal-order) for more information on this.
-->

자식 애니메이션은 같은 컴포넌트 템플릿 안에서만 실행됩니다. `@angular/animations` 패키지에서는 부모 애니메이션이 `query()`와 `animateChild()`로 중첩된 자식 컴포넌트의 애니메이션을 찾아 실행할 수 있었습니다. `animate.leave`와 네이티브 CSS 애니메이션에서는 부모 컴포넌트가 엘리먼트나 뷰를 제거해도 중첩된 자식 컴포넌트 템플릿 안의 애니메이션은 실행되지 않습니다. 같은 Angular 컴포넌트 템플릿 안에 중첩된 애니메이션만 실행됩니다. 자세한 내용은 [진입/퇴장 애니메이션 가이드](guide/animations#element-removal-order)를 참고하세요.

<!--
### Disabling an animation or all animations
-->

<a id="disabling-an-animation-or-all-animations"></a>

### 개별 애니메이션 또는 모든 애니메이션 비활성화하기

<!--
With native CSS animations, if you'd like to disable the animations that you've specified, you have multiple options.

1. Create a custom class that forces animation and transition to `none`.

```css
.no-animation {
  animation: none !important;
  transition: none !important;
}
```

Applying this class to an element prevents any animation from firing on that element. You could alternatively scope this to your entire DOM or section of your DOM to enforce this behavior. However, this prevents animation events from firing. If you are awaiting animation events for element removal, this solution won't work. A workaround is to set durations to 1 millisecond instead.

2. Use the [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media query to ensure no animations play for users that prefer less animation.

3. Prevent adding animation classes programmatically
-->

네이티브 CSS 애니메이션에서는 지정한 애니메이션을 비활성화하려면 몇 가지 방법을 사용할 수 있습니다.

1. 애니메이션과 전환을 `none`으로 강제 설정하는 커스텀 클래스를 만듭니다.

```css
.no-animation {
  animation: none !important;
  transition: none !important;
}
```

이 클래스를 엘리먼트에 적용하면 해당 엘리먼트에서 애니메이션이 실행되지 않습니다.
DOM 전체나 특정 영역에 적용해서 같은 동작을 강제할 수도 있습니다.
하지만 이 방법은 애니메이션 이벤트도 발생하지 않게 합니다.
엘리먼트를 제거하기 위해 애니메이션 이벤트를 기다리고 있다면 이 방법은 사용할 수 없습니다.
대신 지속 시간을 1밀리초로 설정하는 방법이 있습니다.

2. [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) 미디어 쿼리를 사용해서 움직임을 줄이도록 설정한 사용자에게는 애니메이션을 실행하지 않습니다.

3. 코드에서 애니메이션 클래스가 추가되지 않도록 처리합니다.

<!--
### Animation Callbacks
-->

<a id="animation-callbacks"></a>

### 애니메이션 콜백

<!--
The animations package exposed callbacks for you to use in the case that you want to do something when the animation has finished. Native CSS animations also have these callbacks.

[`OnAnimationStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationstart_event)
[`OnAnimationEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event)
[`OnAnimationIteration`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationiteration_event)
[`OnAnimationCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationcancel_event)

[`OnTransitionStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionstart_event)
[`OnTransitionRun`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionrun_event)
[`OnTransitionEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event)
[`OnTransitionCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitioncancel_event)

The Web Animations API has a lot of additional functionality. [Take a look at the documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) to see all the available animation APIs.

NOTE: Be aware of bubbling issues with these callbacks. If you are animating children and parents, the events bubble up from children to parents. Consider stopping propagation or looking at more details within the event to determine if you're responding to the desired event target rather than an event bubbling up from a child node. You can examine the `animationname` property or the properties being transitioned to verify you have the right nodes.
-->

애니메이션 패키지는 애니메이션이 끝났을 때 어떤 동작을 실행할 수 있도록 콜백을 제공했습니다.
네이티브 CSS 애니메이션에도 이런 콜백이 있습니다.

[`OnAnimationStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationstart_event)  
[`OnAnimationEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event)  
[`OnAnimationIteration`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationiteration_event)  
[`OnAnimationCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationcancel_event)

[`OnTransitionStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionstart_event)  
[`OnTransitionRun`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionrun_event)  
[`OnTransitionEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event)  
[`OnTransitionCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitioncancel_event)

Web Animations API는 이 밖에도 많은 기능을 제공합니다.
사용할 수 있는 애니메이션 API 전체는 [문서](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)를 참고하세요.

참고: 이런 콜백에서는 버블링에 주의하세요.
자식과 부모에 애니메이션을 적용하면 이벤트가 자식에서 부모로 버블링됩니다.
이벤트 전파를 중단하거나 이벤트의 상세 정보를 확인해서, 자식 노드에서 버블링된 이벤트가 아니라 의도한 대상의 이벤트에 반응하는지 판단하세요.
`animationname` 프로퍼티나 전환 중인 프로퍼티를 조사하면 올바른 노드인지 확인할 수 있습니다.

<!--
## Complex Sequences
-->

<a id="complex-sequences"></a>

## 복잡한 시퀀스

<!--
The animations package has built-in functionality for creating complex sequences. These sequences are all entirely possible without the animations package.
-->

애니메이션 패키지는 복잡한 시퀀스를 만드는 기능을 기본으로 제공합니다.
이 시퀀스는 모두 애니메이션 패키지 없이도 구현할 수 있습니다.

<!--
### Targeting specific elements
-->

<a id="targeting-specific-elements"></a>

### 특정 엘리먼트 선택하기

<!--
In the animations package, you could target specific elements by using the `query()` function to find specific elements by a CSS class name, similar to [`document.querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector). This is unnecessary in a native CSS animation world. Instead, you can use your CSS selectors to target sub-classes and apply any desired `transform` or `animation`.

To toggle classes for child nodes within a template, you can use class and style bindings to add the animations at the right points.
-->

애니메이션 패키지에서는 [`document.querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector)와 비슷하게 `query()` 함수로 CSS 클래스 이름에 해당하는 특정 엘리먼트를 찾을 수 있었습니다.
네이티브 CSS 애니메이션에서는 이 함수가 필요하지 않습니다.
대신 CSS 셀렉터로 하위 엘리먼트의 클래스를 선택하고 원하는 `transform`이나 `animation`을 적용할 수 있습니다.

템플릿의 자식 노드에서 클래스를 전환하려면 클래스 바인딩과 스타일 바인딩을 사용해서 적절한 시점에 애니메이션을 추가하면 됩니다.

<!--
### Stagger()
-->


### `stagger()`

<!--
The `stagger()` function allowed you to delay the animation of each item in a list of items by a specified time to create a cascade effect. You can replicate this behavior in native CSS by utilizing `animation-delay` or `transition-delay`. Here is an example of what that CSS might look like.
-->

`stagger()` 함수는 목록의 각 항목에 지정된 시간만큼 지연을 두고 애니메이션을 실행해서 연속적으로 퍼지는 효과를 만들 수 있게 했습니다.
네이티브 CSS에서는 `animation-delay`나 `transition-delay`로 같은 동작을 구현할 수 있습니다.
다음 예제에서 CSS를 어떻게 작성하는지 확인할 수 있습니다.

<!--
#### With Animations Package {#stagger-with-animations-package}
-->

<a id="with-animations-package-6"></a>
<a id="stagger-with-animations-package"></a>

#### 애니메이션 패키지 사용 {#애니메이션-패키지-사용-7}

<!--
<docs-code-multifile>
    <docs-code header="stagger.ts" path="adev/src/content/examples/animations/src/app/animations-package/stagger.ts" />
    <docs-code header="stagger.html" path="adev/src/content/examples/animations/src/app/animations-package/stagger.html" />
    <docs-code header="stagger.css" path="adev/src/content/examples/animations/src/app/animations-package/stagger.css" />
</docs-code-multifile>
-->

<docs-code-multifile>
    <docs-code header="stagger.ts" path="adev/src/content/examples/animations/src/app/animations-package/stagger.ts" />
    <docs-code header="stagger.html" path="adev/src/content/examples/animations/src/app/animations-package/stagger.html" />
    <docs-code header="stagger.css" path="adev/src/content/examples/animations/src/app/animations-package/stagger.css" />
</docs-code-multifile>

<!--
#### With Native CSS {#stagger-with-native-css}
-->

<a id="with-native-css-7"></a>
<a id="stagger-with-native-css"></a>

#### 네이티브 CSS 사용 {#네이티브-css-사용-8}

<!--
<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/stagger.ts">
    <docs-code header="stagger.ts" path="adev/src/content/examples/animations/src/app/native-css/stagger.ts" />
    <docs-code header="stagger.html" path="adev/src/content/examples/animations/src/app/native-css/stagger.html" />
    <docs-code header="stagger.css" path="adev/src/content/examples/animations/src/app/native-css/stagger.css" />
</docs-code-multifile>
-->

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/stagger.ts">
    <docs-code header="stagger.ts" path="adev/src/content/examples/animations/src/app/native-css/stagger.ts" />
    <docs-code header="stagger.html" path="adev/src/content/examples/animations/src/app/native-css/stagger.html" />
    <docs-code header="stagger.css" path="adev/src/content/examples/animations/src/app/native-css/stagger.css" />
</docs-code-multifile>

<!--
### Parallel Animations
-->

<a id="parallel-animations"></a>

### 병렬 애니메이션

<!--
The animations package has a `group()` function to play multiple animations at the same time. In CSS, you have full control over animation timing. If you have multiple animations defined, you can apply all of them at once.

```css
.target-element {
  animation:
    rotate 3s,
    fade-in 2s;
}
```

In this example, the `rotate` and `fade-in` animations fire at the same time.
-->

애니메이션 패키지에는 여러 애니메이션을 동시에 실행하는 `group()` 함수가 있습니다.
CSS에서는 애니메이션의 타이밍을 자유롭게 제어할 수 있습니다.
여러 애니메이션을 정의했다면 모두 한 번에 적용할 수 있습니다.

```css
.target-element {
  animation:
    rotate 3s,
    fade-in 2s;
}
```

이 예제에서는 `rotate`와 `fade-in` 애니메이션이 동시에 시작합니다.

<!--
### Animating the items of a reordering list
-->

<a id="animating-the-items-of-a-reordering-list"></a>

### 순서가 바뀌는 목록 항목에 애니메이션 적용하기

<!--
Items reordering in a list works out of the box using the previously described techniques. No additional special work is required. Items in a `@for` loop will be removed and re-added properly, which will fire off animations using `@starting-styles` for entry animations. Alternatively, you can use `animate.enter` for this same behavior. Use `animate.leave` to animate elements as they are removed, as seen in the example above.
-->

앞서 설명한 기법을 사용하면 목록 항목의 순서가 바뀌는 경우에도 별도의 추가 작업 없이 바로 동작합니다.
`@for` 반복문의 항목은 올바르게 제거된 뒤 다시 추가되며, 이때 `@starting-styles`를 사용하는 진입 애니메이션이 실행됩니다.
같은 동작을 구현하기 위해 `animate.enter`를 사용할 수도 있습니다.
위 예제처럼 엘리먼트가 제거될 때 애니메이션을 적용하려면 `animate.leave`를 사용하세요.

<!--
#### With Animations Package {#reordering-list-with-animations-package}
-->

<a id="with-animations-package-7"></a>
<a id="reordering-list-with-animations-package"></a>

#### 애니메이션 패키지 사용 {#애니메이션-패키지-사용-8}

<!--
<docs-code-multifile>
    <docs-code header="reorder.ts" path="adev/src/content/examples/animations/src/app/animations-package/reorder.ts" />
    <docs-code header="reorder.html" path="adev/src/content/examples/animations/src/app/animations-package/reorder.html" />
    <docs-code header="reorder.css" path="adev/src/content/examples/animations/src/app/animations-package/reorder.css" />
</docs-code-multifile>
-->

<docs-code-multifile>
    <docs-code header="reorder.ts" path="adev/src/content/examples/animations/src/app/animations-package/reorder.ts" />
    <docs-code header="reorder.html" path="adev/src/content/examples/animations/src/app/animations-package/reorder.html" />
    <docs-code header="reorder.css" path="adev/src/content/examples/animations/src/app/animations-package/reorder.css" />
</docs-code-multifile>

<!--
#### With Native CSS {#reordering-list-with-native-css}
-->

<a id="with-native-css-8"></a>
<a id="reordering-list-with-native-css"></a>

#### 네이티브 CSS 사용 {#네이티브-css-사용-9}

<!--
<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/reorder.ts">
    <docs-code header="reorder.ts" path="adev/src/content/examples/animations/src/app/native-css/reorder.ts" />
    <docs-code header="reorder.html" path="adev/src/content/examples/animations/src/app/native-css/reorder.html" />
    <docs-code header="reorder.css" path="adev/src/content/examples/animations/src/app/native-css/reorder.css" />
</docs-code-multifile>
-->

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/reorder.ts">
    <docs-code header="reorder.ts" path="adev/src/content/examples/animations/src/app/native-css/reorder.ts" />
    <docs-code header="reorder.html" path="adev/src/content/examples/animations/src/app/native-css/reorder.html" />
    <docs-code header="reorder.css" path="adev/src/content/examples/animations/src/app/native-css/reorder.css" />
</docs-code-multifile>

<!--
## Migrating usages of AnimationPlayer
-->

<a id="migrating-usages-of-animationplayer"></a>

## AnimationPlayer 사용 코드 마이그레이션하기

<!--
The `AnimationPlayer` class allows access to an animation to do more advanced things like pause, play, restart, and finish an animation through code. All of these things can be handled natively as well.

You can retrieve animations off an element directly using [`Element.getAnimations()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAnimations). This returns an array of every [`Animation`](https://developer.mozilla.org/en-US/docs/Web/API/Animation) on that element. You can use the `Animation` API to do much more than you could with what the `AnimationPlayer` from the animations package offered. From here you can `cancel()`, `play()`, `pause()`, `reverse()` and much more. This native API should provide everything you need to control your animations.
-->

`AnimationPlayer` 클래스를 사용하면 애니메이션에 접근해서 코드로 일시 중지, 재생, 다시 시작, 종료 같은 고급 작업을 할 수 있습니다.
이 작업은 모두 네이티브 API로도 처리할 수 있습니다.

[`Element.getAnimations()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAnimations)로 엘리먼트의 애니메이션을 직접 가져올 수 있습니다.
이 메서드는 해당 엘리먼트의 모든 [`Animation`](https://developer.mozilla.org/en-US/docs/Web/API/Animation)을 배열로 반환합니다.
`Animation` API를 사용하면 애니메이션 패키지의 `AnimationPlayer`가 제공했던 것보다 훨씬 많은 작업을 할 수 있습니다.
`cancel()`, `play()`, `pause()`, `reverse()` 등 다양한 메서드를 사용할 수 있습니다.
이 네이티브 API는 애니메이션을 제어하는 데 필요한 모든 기능을 제공합니다.

<!--
## Route Transitions
-->

<a id="route-transitions"></a>

## 라우팅 규칙 전환

<!--
You can use view transitions to animate between routes. See the [Route Transition Animations Guide](guide/routing/route-transition-animations) to get started.
-->

뷰 전환을 사용해서 라우팅 규칙 사이에 애니메이션을 적용할 수 있습니다.
시작하려면 [라우팅 규칙 전환 애니메이션 가이드](guide/routing/route-transition-animations)를 참고하세요.
