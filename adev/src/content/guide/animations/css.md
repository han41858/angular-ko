<!--
# Animating your Application with CSS
-->

<a id="animating-your-application-with-css"></a>

# CSS로 애플리케이션에 애니메이션 적용하기

<!--
CSS offers a robust set of tools for you to create beautiful and engaging animations within your application.
-->

CSS는 애플리케이션 안에서 아름답고 매력적인 애니메이션을 만드는 데 사용할 수 있는 강력한 도구를 제공합니다.

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
You can create reusable animations that can be shared across your application using `@keyframes`. Define keyframe animations in a shared CSS file, and you'll be able to re-use those keyframe animations wherever you want within your application.

<docs-code header="animations.css" path="adev/src/content/examples/animations/src/app/animations.css" region="animation-shared"/>

Adding the class `animated-class` to an element would trigger the animation on that element.
-->

`@keyframes`를 사용하면 애플리케이션 전체에서 공유할 수 있는 재사용 가능한 애니메이션을 만들 수 있습니다.
공통 CSS 파일에 키프레임 애니메이션을 정의하면 애플리케이션의 원하는 곳 어디에서나 재사용할 수 있습니다.

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
You may want to animate between two different states, for example when an element is opened or closed. You can accomplish this by using CSS classes, either with a keyframe animation or transition styling.

<docs-code header="animations.css" path="adev/src/content/examples/animations/src/app/animations.css" region="animation-states"/>

Triggering the `open` or `closed` state is done by toggling classes on the element in your component. You can find examples of how to do this in our [template guide](guide/templates/binding#css-class-and-style-property-bindings).

You can see similar examples in the template guide for [animating styles directly](guide/templates/binding#css-style-properties).
-->

엘리먼트가 열리거나 닫힐 때처럼 서로 다른 두 상태 사이에 애니메이션을 적용하고 싶을 수 있습니다.
CSS 클래스에 키프레임 애니메이션이나 전환 스타일을 지정하면 됩니다.

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
Animating often requires adjusting timing, delays, and easing behaviors. This can be done using several css properties or shorthand properties.

Specify `animation-duration`, `animation-delay`, and `animation-timing-function` for a keyframe animation in CSS, or alternatively use the `animation` shorthand property.

<docs-code header="animations.css" path="adev/src/content/examples/animations/src/app/animations.css" region="animation-timing"/>

Similarly, you can use `transition-duration`, `transition-delay`, and `transition-timing-function` and the `transition` shorthand for animations that are not using `@keyframes`.

<docs-code header="animations.css" path="adev/src/content/examples/animations/src/app/animations.css" region="transition-timing"/>
-->

애니메이션을 만들 때는 타이밍, 지연 시간, 이징 동작을 조절해야 하는 경우가 많습니다.
여러 CSS 프로퍼티나 단축 프로퍼티를 사용해서 설정할 수 있습니다.

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
Animations can be triggered by toggling CSS styles or classes. Once a class is present on an element, the animation will occur. Removing the class will revert the element back to whatever CSS is defined for that element. Here's an example:

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/open-close.ts">
    <docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/native-css/open-close.ts" />
    <docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/native-css/open-close.html" />
    <docs-code header="open-close.css" path="adev/src/content/examples/animations/src/app/native-css/open-close.css"/>
</docs-code-multifile>
-->

CSS 스타일이나 클래스를 전환해서 애니메이션을 실행할 수 있습니다.
엘리먼트에 클래스가 추가되면 애니메이션이 실행됩니다.
클래스를 제거하면 엘리먼트는 원래 정의된 CSS 스타일로 돌아갑니다.
다음 예제를 참고하세요:

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
### Animating Auto Height
-->

<a id="animating-auto-height"></a>

### 자동 높이에 애니메이션 적용하기

<!--
You can use CSS Grid to animate to auto height.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/auto-height.ts">
    <docs-code header="auto-height.ts" path="adev/src/content/examples/animations/src/app/native-css/auto-height.ts" />
    <docs-code header="auto-height.html" path="adev/src/content/examples/animations/src/app/native-css/auto-height.html" />
    <docs-code header="auto-height.css" path="adev/src/content/examples/animations/src/app/native-css/auto-height.css"  />
</docs-code-multifile>

If you don't have to worry about supporting all browsers, you can also check out `calc-size()`, which is the true solution to animating auto height. See [MDN's docs](https://developer.mozilla.org/en-US/docs/Web/CSS/calc-size) and [this tutorial](https://frontendmasters.com/blog/one-of-the-boss-battles-of-css-is-almost-won-transitioning-to-auto/) for more information.
-->

CSS Grid를 사용하면 높이가 자동으로 결정되는 상태까지 애니메이션을 적용할 수 있습니다.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/auto-height.ts">
    <docs-code header="auto-height.ts" path="adev/src/content/examples/animations/src/app/native-css/auto-height.ts" />
    <docs-code header="auto-height.html" path="adev/src/content/examples/animations/src/app/native-css/auto-height.html" />
    <docs-code header="auto-height.css" path="adev/src/content/examples/animations/src/app/native-css/auto-height.css"  />
</docs-code-multifile>

모든 브라우저를 지원할 필요가 없다면, 자동 높이 애니메이션을 직접 지원하는 `calc-size()`도 살펴보세요.
자세한 내용은 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/calc-size)와 [이 튜토리얼](https://frontendmasters.com/blog/one-of-the-boss-battles-of-css-is-almost-won-transitioning-to-auto/)을 참고하세요.

<!--
### Animate entering and leaving a view
-->

<a id="animate-entering-and-leaving-a-view"></a>

### 뷰 진입과 퇴장에 애니메이션 적용하기

<!--
You can create animations for when an item enters a view or leaves a view. Let's start by looking at how to animate an element entering a view. We'll do this with `animate.enter`, which will apply animation classes when an element enters the view.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/insert.ts">
    <docs-code header="insert.ts" path="adev/src/content/examples/animations/src/app/native-css/insert.ts" />
    <docs-code header="insert.html" path="adev/src/content/examples/animations/src/app/native-css/insert.html" />
    <docs-code header="insert.css" path="adev/src/content/examples/animations/src/app/native-css/insert.css"  />
</docs-code-multifile>

Animating an element when it leaves the view is similar to animating when entering a view. Use `animate.leave` to specify which CSS classes to apply when the element leaves the view.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/remove.ts">
    <docs-code header="remove.ts" path="adev/src/content/examples/animations/src/app/native-css/remove.ts" />
    <docs-code header="remove.html" path="adev/src/content/examples/animations/src/app/native-css/remove.html" />
    <docs-code header="remove.css" path="adev/src/content/examples/animations/src/app/native-css/remove.css"  />
</docs-code-multifile>

For more information on `animate.enter` and `animate.leave`, see the [Enter and Leave animations guide](guide/animations).
-->

항목이 뷰에 진입하거나 뷰에서 퇴장할 때 실행되는 애니메이션을 만들 수 있습니다.
먼저 엘리먼트가 뷰에 진입할 때 애니메이션을 적용하는 방법을 살펴봅시다.
엘리먼트가 뷰에 진입할 때 애니메이션 클래스를 적용하는 `animate.enter`를 사용하겠습니다.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/insert.ts">
    <docs-code header="insert.ts" path="adev/src/content/examples/animations/src/app/native-css/insert.ts" />
    <docs-code header="insert.html" path="adev/src/content/examples/animations/src/app/native-css/insert.html" />
    <docs-code header="insert.css" path="adev/src/content/examples/animations/src/app/native-css/insert.css"  />
</docs-code-multifile>

엘리먼트가 뷰에서 퇴장할 때 애니메이션을 적용하는 방법도 진입할 때와 비슷합니다.
`animate.leave`로 엘리먼트가 뷰에서 퇴장할 때 적용할 CSS 클래스를 지정하세요.

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
Animating on increment and decrement is a common pattern in applications. Here's an example of how you can accomplish that behavior.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.ts">
    <docs-code header="increment-decrement.ts" path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.ts" />
    <docs-code header="increment-decrement.html" path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.html" />
    <docs-code header="increment-decrement.css" path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.css" />
</docs-code-multifile>
-->

값이 증가하거나 감소할 때 애니메이션을 적용하는 것은 애플리케이션에서 흔히 사용하는 패턴입니다.
다음 예제에서 이 동작을 구현하는 방법을 확인할 수 있습니다.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.ts">
    <docs-code header="increment-decrement.ts" path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.ts" />
    <docs-code header="increment-decrement.html" path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.html" />
    <docs-code header="increment-decrement.css" path="adev/src/content/examples/animations/src/app/native-css/increment-decrement.css" />
</docs-code-multifile>

<!--
### Disabling an animation or all animations
-->

<a id="disabling-an-animation-or-all-animations"></a>

### 개별 애니메이션 또는 모든 애니메이션 비활성화하기

<!--
If you'd like to disable the animations that you've specified, you have multiple options.

1. Create a custom class that forces animation and transition to `none`.

```css
.no-animation {
  animation: none !important;
  transition: none !important;
}
```

Applying this class to an element prevents any animation from firing on that element. You could alternatively scope this to your entire DOM or section of your DOM to enforce this behavior. However, this prevents animation events from firing. If you are awaiting animation events for element removal, this solution won't work. A workaround is to set durations to 1 millisecond instead.

2. Use the [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media query to ensure no animations play for users that prefer less animation.

3. Prevent adding animation classes programatically
-->

지정한 애니메이션을 비활성화하려면 몇 가지 방법을 사용할 수 있습니다.

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
If you have actions you would like to execute at certain points during animations, there are a number of available events you can listen to. Here's a few of them.

[`OnAnimationStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationstart_event)
[`OnAnimationEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event)
[`OnAnimationIteration`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationitration_event)
[`OnAnimationCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationcancel_event)

[`OnTransitionStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionstart_event)
[`OnTransitionRun`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionrun_event)
[`OnTransitionEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event)
[`OnTransitionCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitioncancel_event)

The Web Animations API has a lot of additional functionality. [Take a look at the documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) to see all the available animation APIs.

NOTE: Be aware of bubbling issues with these callbacks. If you are animating children and parents, the events bubble up from children to parents. Consider stopping propagation or looking at more details within the event to determine if you're responding to the desired event target rather than an event bubbling up from a child node. You can examine the `animationname` property or the properties being transitioned to verify you have the right nodes.
-->

애니메이션의 특정 시점에 어떤 동작을 실행하려면 여러 이벤트를 감지할 수 있습니다.
다음은 그중 일부입니다.

[`OnAnimationStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationstart_event)  
[`OnAnimationEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event)  
[`OnAnimationIteration`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationitration_event)  
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
Animations are often more complicated than just a simple fade in or fade out. You may have lots of complicated sequences of animations you may want to run. Let's take a look at some of those possible scenarios.
-->

애니메이션은 단순히 서서히 나타나거나 사라지는 것보다 복잡한 경우가 많습니다.
여러 복잡한 애니메이션 시퀀스를 실행하고 싶을 수도 있습니다.
가능한 시나리오 몇 가지를 살펴봅시다.

<!--
### Staggering animations in a list
-->

<a id="staggering-animations-in-a-list"></a>

### 목록 애니메이션을 시간차로 실행하기

<!--
One common effect is to stagger the animations of each item in a list to create a cascade effect. This can be accomplished by utilizing `animation-delay` or `transition-delay`. Here is an example of what that CSS might look like.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/stagger.ts">
    <docs-code header="stagger.ts" path="adev/src/content/examples/animations/src/app/native-css/stagger.ts" />
    <docs-code header="stagger.html" path="adev/src/content/examples/animations/src/app/native-css/stagger.html" />
    <docs-code header="stagger.css" path="adev/src/content/examples/animations/src/app/native-css/stagger.css" />
</docs-code-multifile>
-->

목록의 각 항목에 애니메이션을 시간차로 적용해서 연속적으로 퍼지는 효과를 만드는 것은 흔히 사용하는 방식입니다.
`animation-delay`나 `transition-delay`를 사용하면 됩니다.
다음 예제에서 CSS를 어떻게 작성하는지 확인할 수 있습니다.

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
You can apply multiple animations to an element at once using the `animation` shorthand property. Each can have their own durations and delays. This allows you to compose animations together and create complicated effects.

```css
.target-element {
  animation:
    rotate 3s,
    fade-in 2s;
}
```

In this example, the `rotate` and `fade-in` animations fire at the same time, but have different durations.
-->

단축 프로퍼티 `animation`을 사용하면 엘리먼트 하나에 여러 애니메이션을 동시에 적용할 수 있습니다.
각 애니메이션에 서로 다른 지속 시간과 지연 시간을 지정할 수 있습니다.
이렇게 애니메이션을 조합해서 복잡한 효과를 만들 수 있습니다.

```css
.target-element {
  animation:
    rotate 3s,
    fade-in 2s;
}
```

이 예제에서는 `rotate`와 `fade-in` 애니메이션이 동시에 시작하지만, 지속 시간은 서로 다릅니다.

<!--
### Animating the items of a reordering list
-->

<a id="animating-the-items-of-a-reordering-list"></a>

### 순서가 바뀌는 목록 항목에 애니메이션 적용하기

<!--
Items in a `@for` loop will be removed and re-added, which will fire off animations using `@starting-styles` for entry animations. Alternatively, you can use `animate.enter` for this same behavior. Use `animate.leave` to animate elements as they are removed, as seen in the example below.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/reorder.ts">
    <docs-code header="reorder.ts" path="adev/src/content/examples/animations/src/app/native-css/reorder.ts" />
    <docs-code header="reorder.html" path="adev/src/content/examples/animations/src/app/native-css/reorder.html" />
    <docs-code header="reorder.css" path="adev/src/content/examples/animations/src/app/native-css/reorder.css" />
</docs-code-multifile>
-->

`@for` 반복문의 항목은 제거된 뒤 다시 추가되며, 이때 `@starting-styles`를 사용하는 진입 애니메이션이 실행됩니다.
같은 동작을 구현하기 위해 `animate.enter`를 사용할 수도 있습니다.
아래 예제처럼 엘리먼트가 제거될 때 애니메이션을 적용하려면 `animate.leave`를 사용하세요.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/native-css/reorder.ts">
    <docs-code header="reorder.ts" path="adev/src/content/examples/animations/src/app/native-css/reorder.ts" />
    <docs-code header="reorder.html" path="adev/src/content/examples/animations/src/app/native-css/reorder.html" />
    <docs-code header="reorder.css" path="adev/src/content/examples/animations/src/app/native-css/reorder.css" />
</docs-code-multifile>

<!--
## Programmatic control of animations
-->

<a id="programmatic-control-of-animations"></a>

## 코드에서 애니메이션 제어하기

<!--
You can retrieve animations off an element directly using [`Element.getAnimations()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAnimations). This returns an array of every [`Animation`](https://developer.mozilla.org/en-US/docs/Web/API/Animation) on that element. You can use the `Animation` API to do much more than you could with what the `AnimationPlayer` from the animations package offered. From here you can `cancel()`, `play()`, `pause()`, `reverse()` and much more. This native API should provide everything you need to control your animations.
-->

[`Element.getAnimations()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAnimations)로 엘리먼트의 애니메이션을 직접 가져올 수 있습니다.
이 메서드는 해당 엘리먼트의 모든 [`Animation`](https://developer.mozilla.org/en-US/docs/Web/API/Animation)을 배열로 반환합니다.
`Animation` API를 사용하면 애니메이션 패키지의 `AnimationPlayer`가 제공했던 것보다 훨씬 많은 작업을 할 수 있습니다.
`cancel()`, `play()`, `pause()`, `reverse()` 등 다양한 메서드를 사용할 수 있습니다.
이 네이티브 API는 애니메이션을 제어하는 데 필요한 모든 기능을 제공합니다.

<!--
## More on Angular animations
-->

<a id="more-on-angular-animations"></a>

## Angular 애니메이션 더 알아보기

<!--
You might also be interested in the following:

<docs-pill-row>
  <docs-pill href="guide/animations" title="Enter and Leave animations"/>
  <docs-pill href="guide/routing/route-transition-animations" title="Route transition animations"/>
</docs-pill-row>
-->

다음 문서도 참고해 보세요:

<docs-pill-row>
  <docs-pill href="guide/animations" title="진입 및 퇴장 애니메이션"/>
  <docs-pill href="guide/routing/route-transition-animations" title="라우팅 규칙 전환 애니메이션"/>
</docs-pill-row>
