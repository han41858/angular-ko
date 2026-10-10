<!--
# Animating your applications with `animate.enter` and `animate.leave`
-->

<a id="animating-your-applications-with-animateenter-and-animateleave"></a>

# `animate.enter`와 `animate.leave`로 애플리케이션에 애니메이션 적용하기

<!--
Well-designed animations can make your application more intuitive and engaging, but they aren't just cosmetic.
Animations can improve your application and the user experience in a number of ways:

- Without animations, web page transitions can seem abrupt and jarring
- Motion greatly enhances the user experience, so animations give users a chance to detect the application's response to their actions
- Good animations can smoothly direct the user's attention throughout a workflow

Angular provides `animate.enter` and `animate.leave` to animate your application's elements. These two features apply enter and leave CSS classes at the appropriate times or call functions to apply animations from third party libraries. `animate.enter` and `animate.leave` are not directives. They are special API supported directly by the Angular compiler. They can be used directly on elements and also as a host binding.
-->

잘 설계된 애니메이션은 애플리케이션을 더 직관적이고 매력적으로 만듭니다.
하지만 애니메이션은 단순한 장식에 그치지 않습니다.
애니메이션은 여러 방식으로 애플리케이션과 사용자 경험을 개선할 수 있습니다:

- 애니메이션이 없으면 웹 페이지의 전환이 갑작스럽고 부자연스럽게 느껴질 수 있습니다.
- 움직임은 사용자 경험을 크게 향상시킵니다.
  애니메이션을 통해 사용자는 자신의 행동에 애플리케이션이 어떻게 반응하는지 알아차릴 수 있습니다.
- 좋은 애니메이션은 작업 흐름 전체에서 사용자의 시선을 자연스럽게 유도할 수 있습니다.

Angular는 애플리케이션의 엘리먼트에 애니메이션을 적용하는 `animate.enter`와 `animate.leave`를 제공합니다.
두 기능은 적절한 시점에 진입 및 퇴장 CSS 클래스를 적용하거나, 서드 파티 라이브러리의 애니메이션을 적용하는 함수를 호출합니다.
`animate.enter`와 `animate.leave`는 디렉티브가 아닙니다.
Angular 컴파일러가 직접 지원하는 특별한 API이며, 엘리먼트에 직접 사용하거나 호스트 바인딩으로 사용할 수 있습니다.

<!--
## `animate.enter`
-->

<a id="animateenter"></a>

## `animate.enter`

<!--
You can use `animate.enter` to animate elements as they _enter_ the DOM. You can define enter animations using CSS classes with either transitions or keyframe animations.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/enter-and-leave/enter.ts">
    <docs-code header="enter.ts" path="adev/src/content/examples/animations/src/app/enter-and-leave/enter.ts" />
    <docs-code header="enter.html" path="adev/src/content/examples/animations/src/app/enter-and-leave/enter.html" />
    <docs-code header="enter.css" path="adev/src/content/examples/animations/src/app/enter-and-leave/enter.css"/>
</docs-code-multifile>

When the animation completes, Angular removes the class or classes that you specified in `animate.enter` from the DOM. Animation classes are only present while the animation is active.

NOTE: When using multiple keyframe animations or transition properties on an element, Angular removes all classes only _after_ the longest animation has completed.

You can use `animate.enter` with any other Angular features, such as control flow or dynamic expressions. `animate.enter` accepts both a single class string (with multiple classes separated by spaces), or an array of class strings.

A quick note about using CSS transitions: If you choose to use transitions instead of keyframe animations, the classes added to the element with `animate.enter` represent the state that the transition will animate _to_. Your base element CSS is what the element will look like when no animations run, which is likely similar to the end state of the CSS transition. So you would still need to pair it with `@starting-style` to have an appropriate _from_ state for your transition to work.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/enter-and-leave/enter-binding.ts">
    <docs-code header="enter-binding.ts" path="adev/src/content/examples/animations/src/app/enter-and-leave/enter-binding.ts" />
    <docs-code header="enter-binding.html" path="adev/src/content/examples/animations/src/app/enter-and-leave/enter-binding.html" />
    <docs-code header="enter-binding.css" path="adev/src/content/examples/animations/src/app/enter-and-leave/enter-binding.css"/>
</docs-code-multifile>
-->

`animate.enter`를 사용하면 엘리먼트가 DOM에 _진입_ 할 때 애니메이션을 적용할 수 있습니다.
전환이나 키프레임 애니메이션을 지정한 CSS 클래스로 진입 애니메이션을 정의할 수 있습니다.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/enter-and-leave/enter.ts">
    <docs-code header="enter.ts" path="adev/src/content/examples/animations/src/app/enter-and-leave/enter.ts" />
    <docs-code header="enter.html" path="adev/src/content/examples/animations/src/app/enter-and-leave/enter.html" />
    <docs-code header="enter.css" path="adev/src/content/examples/animations/src/app/enter-and-leave/enter.css"/>
</docs-code-multifile>

애니메이션이 완료되면 Angular는 `animate.enter`에 지정한 클래스를 DOM에서 제거합니다.
애니메이션 클래스는 애니메이션이 실행되는 동안에만 존재합니다.

참고: 엘리먼트에 여러 키프레임 애니메이션이나 전환 프로퍼티를 사용하면 Angular는 가장 긴 애니메이션이 완료된 _뒤에_ 모든 클래스를 제거합니다.

`animate.enter`는 제어 흐름이나 동적 표현식 같은 다른 Angular 기능과 함께 사용할 수 있습니다.
`animate.enter`에는 클래스 문자열 하나를 전달하거나, 클래스 문자열의 배열을 전달할 수 있습니다.
문자열 하나에 여러 클래스를 지정할 때는 공백으로 구분합니다.

CSS 전환을 사용할 때는 한 가지 유의할 점이 있습니다.
키프레임 애니메이션 대신 전환을 사용하면 `animate.enter`로 추가한 클래스는 전환의 _도착_ 상태를 나타냅니다.
엘리먼트의 기본 CSS는 애니메이션이 실행되지 않을 때의 모습을 정의하며, 대개 CSS 전환의 최종 상태와 비슷합니다.
따라서 전환이 동작할 수 있도록 `@starting-style`을 함께 사용해서 적절한 _시작_ 상태를 지정해야 합니다.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/enter-and-leave/enter-binding.ts">
    <docs-code header="enter-binding.ts" path="adev/src/content/examples/animations/src/app/enter-and-leave/enter-binding.ts" />
    <docs-code header="enter-binding.html" path="adev/src/content/examples/animations/src/app/enter-and-leave/enter-binding.html" />
    <docs-code header="enter-binding.css" path="adev/src/content/examples/animations/src/app/enter-and-leave/enter-binding.css"/>
</docs-code-multifile>

<!--
## `animate.leave`
-->

<a id="animateleave"></a>

## `animate.leave`

<!--
You can use `animate.leave` to animate elements as they _leave_ the DOM. You can define leave animations using CSS classes with either transforms or keyframe animations.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/enter-and-leave/leave.ts">
    <docs-code header="leave.ts" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave.ts" />
    <docs-code header="leave.html" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave.html" />
    <docs-code header="leave.css" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave.css"/>
</docs-code-multifile>

When the animation completes, Angular automatically removes the animated element from the DOM.

NOTE: When using multiple keyframe animations or transition properties on an element, Angular waits to remove the element only _after_ the longest of those animations has completed.

`animate.leave` can also be used with signals, and other bindings. You can use `animate.leave` with a single class or multiple classes. Either specify it as a simple string with spaces or a string array.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-binding.ts">
    <docs-code header="leave-binding.ts" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-binding.ts" />
    <docs-code header="leave-binding.html" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-binding.html" />
    <docs-code header="leave-binding.css" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-binding.css"/>
</docs-code-multifile>
-->

`animate.leave`를 사용하면 엘리먼트가 DOM에서 _퇴장_ 할 때 애니메이션을 적용할 수 있습니다.
변형이나 키프레임 애니메이션을 지정한 CSS 클래스로 퇴장 애니메이션을 정의할 수 있습니다.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/enter-and-leave/leave.ts">
    <docs-code header="leave.ts" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave.ts" />
    <docs-code header="leave.html" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave.html" />
    <docs-code header="leave.css" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave.css"/>
</docs-code-multifile>

애니메이션이 완료되면 Angular는 애니메이션이 적용된 엘리먼트를 DOM에서 자동으로 제거합니다.

참고: 엘리먼트에 여러 키프레임 애니메이션이나 전환 프로퍼티를 사용하면 Angular는 가장 긴 애니메이션이 완료된 _뒤에_ 엘리먼트를 제거합니다.

`animate.leave`는 시그널이나 다른 바인딩과 함께 사용할 수도 있습니다.
`animate.leave`에는 클래스 하나 또는 여러 개를 사용할 수 있으며, 공백으로 구분한 문자열이나 문자열 배열로 지정하면 됩니다.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-binding.ts">
    <docs-code header="leave-binding.ts" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-binding.ts" />
    <docs-code header="leave-binding.html" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-binding.html" />
    <docs-code header="leave-binding.css" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-binding.css"/>
</docs-code-multifile>

<!--
### Element removal order
-->

<a id="element-removal-order"></a>

### 엘리먼트 제거 순서

<!--
There is some nuance to how `animate.leave` animations are run and when an animation will occur. `animate.leave` works if it is placed on the element that is being removed, and if `animate.leave` is placed on an element that is a _descendent_ of the element being removed, those child animations will happen _before_ the parent node is removed from the DOM. This ensures that you can confidently animate away child elements without the parent node disappearing prematurely.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-parent.ts">
    <docs-code header="leave.ts" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-parent.ts" />
    <docs-code header="leave.html" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-parent.html" />
    <docs-code header="leave.css" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-parent.css"/>
</docs-code-multifile>
-->

`animate.leave` 애니메이션의 실행 방식과 시점에는 알아둘 세부 사항이 있습니다.
제거되는 엘리먼트에 `animate.leave`가 지정되어 있으면 애니메이션이 실행됩니다.
제거되는 엘리먼트의 _하위_ 엘리먼트에 `animate.leave`가 지정되어 있으면, 자식 애니메이션은 부모 노드가 DOM에서 제거되기 _전에_ 실행됩니다.
따라서 부모 노드가 너무 일찍 사라지는 일을 걱정하지 않고 자식 엘리먼트의 퇴장 애니메이션을 적용할 수 있습니다.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-parent.ts">
    <docs-code header="leave.ts" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-parent.ts" />
    <docs-code header="leave.html" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-parent.html" />
    <docs-code header="leave.css" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-parent.css"/>
</docs-code-multifile>

<!--
## Event Bindings, Functions, and Third-party Libraries
-->

<a id="event-bindings-functions-and-third-party-libraries"></a>

## 이벤트 바인딩, 함수, 서드 파티 라이브러리

<!--
Both `animate.enter` and `animate.leave` support event binding syntax that allows for function calls. You can use this syntax to call a function in your component code or utilize third-party animation libraries, like [GSAP](https://gsap.com/), [anime.js](https://animejs.com/), or any other JavaScript animation library.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-event.ts">
    <docs-code header="leave-event.ts" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-event.ts" />
    <docs-code header="leave-event.html" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-event.html" />
    <docs-code header="leave-event.css" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-event.css"/>
</docs-code-multifile>

The `$event` object has the type `AnimationCallbackEvent`. It includes the element as the `target` and provides an `animationComplete()` function to notify the framework when the animation finishes.

IMPORTANT: You **must** call the `animationComplete()` function when using `animate.leave` for Angular to remove the element.

If you don't call `animationComplete()` when using `animate.leave`, Angular calls the function automatically after a four-second delay. You can configure the duration of the delay by providing the token `MAX_ANIMATION_TIMEOUT` in milliseconds.

```typescript
  { provide: MAX_ANIMATION_TIMEOUT, useValue: 6000 }
```
-->

`animate.enter`와 `animate.leave`는 모두 함수를 호출할 수 있는 이벤트 바인딩 문법을 지원합니다.
이 문법으로 컴포넌트 코드의 함수를 호출하거나, [GSAP](https://gsap.com/), [anime.js](https://animejs.com/) 또는 다른 JavaScript 애니메이션 라이브러리를 사용할 수 있습니다.

<docs-code-multifile preview path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-event.ts">
    <docs-code header="leave-event.ts" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-event.ts" />
    <docs-code header="leave-event.html" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-event.html" />
    <docs-code header="leave-event.css" path="adev/src/content/examples/animations/src/app/enter-and-leave/leave-event.css"/>
</docs-code-multifile>

`$event` 객체의 타입은 `AnimationCallbackEvent`입니다.
이 객체는 엘리먼트를 `target`으로 포함하며, 애니메이션이 끝났음을 프레임워크에 알리는 `animationComplete()` 함수를 제공합니다.

중요: `animate.leave`를 사용할 때 Angular가 엘리먼트를 제거하도록 하려면 `animationComplete()` 함수를 **반드시** 호출해야 합니다.

`animate.leave`를 사용하면서 `animationComplete()`를 호출하지 않으면 Angular가 4초 뒤에 이 함수를 자동으로 호출합니다.
`MAX_ANIMATION_TIMEOUT` 토큰에 밀리초 단위의 값을 제공하면 지연 시간을 설정할 수 있습니다.

```typescript
  { provide: MAX_ANIMATION_TIMEOUT, useValue: 6000 }
```

<!--
## Compatibility with Legacy Angular Animations
-->

<a id="compatibility-with-legacy-angular-animations"></a>

## 기존 Angular 애니메이션과의 호환성

<!--
You cannot use legacy animations alongside `animate.enter` and `animate.leave` within the same component. Doing so would result in enter classes remaining on the element or leaving nodes not being removed. It is otherwise fine to use both legacy animations and the new `animate.enter` and `animate.leave` animations within the same _application_. The only caveat is content projection. If you are projecting content from one component with legacy animations into another component with `animate.enter` or `animate.leave`, or vice versa, this will result in the same behavior as if they are used together in the same component. This is not supported.
-->

같은 컴포넌트 안에서 기존 애니메이션과 `animate.enter`, `animate.leave`를 함께 사용할 수 없습니다.
함께 사용하면 진입 클래스가 엘리먼트에 남아 있거나 퇴장 노드가 제거되지 않는 문제가 생깁니다.
그 외에는 같은 _애플리케이션_ 안에서 기존 애니메이션과 새로운 `animate.enter`, `animate.leave` 애니메이션을 함께 사용해도 됩니다.
다만 콘텐츠 프로젝션은 주의해야 합니다.
기존 애니메이션을 사용하는 컴포넌트의 콘텐츠를 `animate.enter`나 `animate.leave`를 사용하는 다른 컴포넌트에 투영하거나 그 반대로 투영하면, 같은 컴포넌트에서 함께 사용한 것과 같은 문제가 발생합니다.
이 방식은 지원하지 않습니다.

<!--
## Testing
-->

<a id="testing"></a>

## 테스트하기

<!--
TestBed provides built-in support for enabling or disabling animations in your test environment. CSS animations require a browser to run, and many of the APIs are not available in a test environment. By default, TestBed disables animations for you in your test environments.

If you want to test that the animations are animating in a browser test, for example an end-to-end test, you can configure TestBed to enable animations by specifying `animationsEnabled: true` in your test configuration.

```typescript
TestBed.configureTestingModule({animationsEnabled: true});
```

This will configure animations in your test environment to behave normally.

NOTE: Some test environments do not emit animation events like `animationstart`, `animationend` and their transition event equivalents.
-->

TestBed는 테스트 환경에서 애니메이션을 활성화하거나 비활성화하는 기능을 기본으로 제공합니다.
CSS 애니메이션을 실행하려면 브라우저가 필요하며, 관련 API 중 상당수는 테스트 환경에서 사용할 수 없습니다.
TestBed는 기본적으로 테스트 환경의 애니메이션을 비활성화합니다.

엔드 투 엔드 테스트처럼 브라우저에서 실행하는 테스트에서 애니메이션 동작을 확인하려면, 테스트 설정에 `animationsEnabled: true`를 지정해서 TestBed의 애니메이션을 활성화할 수 있습니다.

```typescript
TestBed.configureTestingModule({animationsEnabled: true});
```

이렇게 설정하면 테스트 환경에서도 애니메이션이 정상적으로 동작합니다.

참고: 일부 테스트 환경은 `animationstart`, `animationend`와 같은 애니메이션 이벤트나 이에 대응하는 전환 이벤트를 발생시키지 않습니다.

<!--
## More on Angular animations
-->

<a id="more-on-angular-animations"></a>

## Angular 애니메이션 더 알아보기

<!--
You might also be interested in the following:

<docs-pill-row>
  <docs-pill href="guide/animations/css" title="Complex Animations with CSS"/>
  <docs-pill href="guide/routing/route-transition-animations" title="Route transition animations"/>
</docs-pill-row>
-->

다음 문서도 참고해 보세요:

<docs-pill-row>
  <docs-pill href="guide/animations/css" title="CSS로 복잡한 애니메이션 만들기"/>
  <docs-pill href="guide/routing/route-transition-animations" title="라우팅 규칙 전환 애니메이션"/>
</docs-pill-row>
