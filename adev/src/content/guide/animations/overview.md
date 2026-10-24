<!--
# Introduction to Angular animations
-->

<a id="introduction-to-angular-animations"></a>

# Angular 애니메이션 소개

<!--
IMPORTANT: The `@angular/animations` package is now deprecated. The Angular team recommends using native CSS with `animate.enter` and `animate.leave` for animations for all new code. Learn more at the new enter and leave [animation guide](guide/animations). Also see [Migrating away from Angular's Animations package](guide/animations/migration) to learn how you can start migrating to pure CSS animations in your apps.

Animation provides the illusion of motion: HTML elements change styles over time.
Well-designed animations can make your application more intuitive and engaging, but they aren't just cosmetic.
Animations can improve your application and the user experience in a number of ways:

- Without animations, web page transitions can seem abrupt and jarring
- Motion greatly enhances the user experience, so animations give users a chance to detect the application's response to their actions
- Good animations intuitively call the user's attention to where it is needed

Typically, animations involve multiple style _transformations_ over time.
An HTML element can move, change color, grow or shrink, fade, or slide off the page.
These changes can occur simultaneously or sequentially. You can control the timing of each transformation.

Angular's animation system is built on CSS functionality, which means you can animate any property that the browser considers animatable.
This includes positions, sizes, transforms, colors, borders, and more.
The W3C maintains a list of animatable properties on its [CSS Transitions](https://www.w3.org/TR/css-transitions-1) page.
-->

중요: `@angular/animations` 패키지는 이제 사용 중단 권고(deprecated) 상태입니다.
Angular 팀은 새로 작성하는 모든 코드에서 `animate.enter`와 `animate.leave`를 사용하는 네이티브 CSS 애니메이션을 권장합니다.
새로운 진입 및 퇴장 [애니메이션 가이드](guide/animations)에서 자세히 알아보세요.
[Angular 애니메이션 패키지에서 마이그레이션하기](guide/animations/migration)를 참고하면 애플리케이션을 순수 CSS 애니메이션으로 전환하는 방법도 확인할 수 있습니다.

애니메이션은 HTML 엘리먼트의 스타일을 시간에 따라 바꾸어 움직이는 것처럼 보이게 합니다.
잘 설계된 애니메이션은 애플리케이션을 더 직관적이고 매력적으로 만듭니다.
하지만 애니메이션은 단순한 장식에 그치지 않습니다.
애니메이션은 여러 방식으로 애플리케이션과 사용자 경험을 개선할 수 있습니다:

- 애니메이션이 없으면 웹 페이지의 전환이 갑작스럽고 부자연스럽게 느껴질 수 있습니다.
- 움직임은 사용자 경험을 크게 향상시킵니다.
  애니메이션을 통해 사용자는 자신의 행동에 애플리케이션이 어떻게 반응하는지 알아차릴 수 있습니다.
- 좋은 애니메이션은 주의가 필요한 곳으로 사용자의 시선을 직관적으로 유도합니다.

일반적으로 애니메이션은 시간에 따른 여러 스타일 _변형_ 으로 구성됩니다.
HTML 엘리먼트는 이동하거나, 색이 바뀌거나, 커지거나 작아지거나, 서서히 나타나고 사라지거나, 페이지 밖으로 미끄러져 나갈 수 있습니다.
이런 변화는 동시에 일어나거나 순서대로 일어날 수 있습니다.
각 변형의 타이밍을 제어할 수 있습니다.

Angular의 애니메이션 시스템은 CSS 기능을 기반으로 하므로 브라우저가 애니메이션을 지원하는 모든 프로퍼티에 애니메이션을 적용할 수 있습니다.
위치, 크기, 변형, 색상, 테두리 등이 여기에 포함됩니다.
W3C는 [CSS Transitions](https://www.w3.org/TR/css-transitions-1) 페이지에서 애니메이션을 적용할 수 있는 프로퍼티 목록을 관리합니다.

<!--
## About this guide
-->

<a id="about-this-guide"></a>

## 이 가이드에 대해

<!--
This guide covers the basic Angular animation features to get you started on adding Angular animations to your project.
-->

이 가이드에서는 프로젝트에 Angular 애니메이션을 추가할 수 있도록 기본적인 Angular 애니메이션 기능을 설명합니다.

<!--
## Getting started
-->

<a id="getting-started"></a>

## 시작하기

<!--
The main Angular modules for animations are `@angular/animations` and `@angular/platform-browser`.

To get started with adding Angular animations to your project, import the animation-specific modules along with standard Angular functionality.

<docs-workflow>
<docs-step title="Enabling the animations module">
Import `provideAnimationsAsync` from `@angular/platform-browser/animations/async` and add it to the providers list in the `bootstrapApplication` function call.

```ts {header: "Enabling Animations", linenums}
bootstrapApplication(AppComponent, {
  providers: [provideAnimationsAsync()],
});
```

<docs-callout important title="If you need immediate animations in your application">
  If you need to have an animation happen immediately when your application is loaded,
  you will want to switch to the eagerly loaded animations module. Import `provideAnimations`
  from `@angular/platform-browser/animations` instead, and use `provideAnimations` **in place of**
  `provideAnimationsAsync` in the `bootstrapApplication` function call.
</docs-callout>

For `NgModule` based applications import `BrowserAnimationsModule`, which introduces the animation capabilities into your Angular root application module.

<docs-code header="app.module.ts" path="adev/src/content/examples/animations/src/app/app.module.1.ts"/>
</docs-step>
<docs-step title="Importing animation functions into component files">
If you plan to use specific animation functions in component files, import those functions from `@angular/animations`.

<docs-code header="app.ts" path="adev/src/content/examples/animations/src/app/app.ts" region="imports"/>

See all [available animation functions](guide/legacy-animations#animations-api-summary) at the end of this guide.

</docs-step>
<docs-step title="Adding the animation metadata property">
In the component file, add a metadata property called `animations:` within the `@Component()` decorator.
You put the trigger that defines an animation within the `animations` metadata property.

<docs-code header="app.ts" path="adev/src/content/examples/animations/src/app/app.ts" region="decorator"/>
</docs-step>
</docs-workflow>
-->

애니메이션에 사용하는 주요 Angular 모듈은 `@angular/animations`와 `@angular/platform-browser`입니다.

프로젝트에 Angular 애니메이션을 추가하려면 일반 Angular 기능과 함께 애니메이션 전용 모듈을 가져오세요.

<docs-workflow>
<a id="enabling-the-animations-module"></a>

<docs-step title="애니메이션 모듈 활성화하기">
`@angular/platform-browser/animations/async`에서 `provideAnimationsAsync`를 가져와 `bootstrapApplication` 함수 호출의 프로바이더 목록에 추가합니다.

```ts {header: "Enabling Animations", linenums}
bootstrapApplication(AppComponent, {
  providers: [provideAnimationsAsync()],
});
```

<docs-callout important title="애플리케이션에서 애니메이션을 즉시 실행해야 한다면">
  애플리케이션이 로드되자마자 애니메이션을 실행해야 한다면,
  즉시 로드되는 애니메이션 모듈로 전환하세요.
  `@angular/platform-browser/animations`에서
  `provideAnimations`를 가져오고, `bootstrapApplication` 함수 호출에서
  `provideAnimationsAsync` **대신** `provideAnimations`를 사용하면 됩니다.
</docs-callout>

`NgModule` 기반 애플리케이션에서는 Angular 루트 애플리케이션 모듈에 애니메이션 기능을 추가하는 `BrowserAnimationsModule`을 가져오세요.

<docs-code header="app.module.ts" path="adev/src/content/examples/animations/src/app/app.module.1.ts"/>
</docs-step>
<a id="importing-animation-functions-into-component-files"></a>

<docs-step title="컴포넌트 파일에서 애니메이션 함수 가져오기">
컴포넌트 파일에서 특정 애니메이션 함수를 사용하려면 `@angular/animations`에서 해당 함수를 가져오세요.

<docs-code header="app.ts" path="adev/src/content/examples/animations/src/app/app.ts" region="imports"/>

이 가이드의 끝에서 [사용할 수 있는 애니메이션 함수](guide/legacy-animations#animations-api-summary) 전체를 확인할 수 있습니다.

</docs-step>
<a id="adding-the-animation-metadata-property"></a>

<docs-step title="애니메이션 메타데이터 프로퍼티 추가하기">
컴포넌트 파일의 `@Component()` 데코레이터 안에 `animations:`라는 메타데이터 프로퍼티를 추가하세요.
애니메이션을 정의하는 트리거는 이 `animations` 메타데이터 프로퍼티 안에 넣습니다.

<docs-code header="app.ts" path="adev/src/content/examples/animations/src/app/app.ts" region="decorator"/>
</docs-step>
</docs-workflow>

<!--
## Animating a transition
-->

<a id="animating-a-transition"></a>

## 전환 애니메이션 적용하기

<!--
Let's animate a transition that changes a single HTML element from one state to another.
For example, you can specify that a button displays either **Open** or **Closed** based on the user's last action.
When the button is in the `open` state, it's visible and yellow.
When it's in the `closed` state, it's translucent and blue.

In HTML, these attributes are set using ordinary CSS styles such as color and opacity.
In Angular, use the `style()` function to specify a set of CSS styles for use with animations.
Collect a set of styles in an animation state, and give the state a name, such as `open` or `closed`.

HELPFUL: Let's create a new `open-close` component to animate with simple transitions.

Run the following command in terminal to generate the component:

```shell
ng g component open-close
```

This will create the component at `src/app/open-close.ts`.
-->

HTML 엘리먼트 하나가 한 상태에서 다른 상태로 바뀌는 전환에 애니메이션을 적용해 봅시다.
예를 들어 사용자의 마지막 행동에 따라 버튼에 **Open** 또는 **Closed**를 표시하도록 지정할 수 있습니다.
버튼이 `open` 상태이면 불투명한 노란색으로 표시합니다.
`closed` 상태이면 반투명한 파란색으로 표시합니다.

HTML에서는 color나 opacity 같은 일반 CSS 스타일로 이런 특성을 설정합니다.
Angular에서는 `style()` 함수로 애니메이션에 사용할 CSS 스타일 모음을 지정합니다.
스타일 모음을 애니메이션 상태로 묶고, `open`이나 `closed` 같은 이름을 붙이세요.

도움말: 간단한 전환 애니메이션을 적용할 새 `open-close` 컴포넌트를 만들어 봅시다.

터미널에서 다음 명령을 실행해서 컴포넌트를 생성하세요:

```shell
ng g component open-close
```

그러면 `src/app/open-close.ts`에 컴포넌트가 생성됩니다.

<!--
### Animation state and styles
-->

<a id="animation-state-and-styles"></a>

### 애니메이션 상태와 스타일

<!--
Use Angular's [`state()`](api/animations/state) function to define different states to call at the end of each transition.
This function takes two arguments:
A unique name like `open` or `closed` and a `style()` function.

Use the `style()` function to define a set of styles to associate with a given state name.
You must use _camelCase_ for style attributes that contain dashes, such as `backgroundColor` or wrap them in quotes, such as `'background-color'`.

Let's see how Angular's [`state()`](api/animations/state) function works with the `style⁣­(⁠)` function to set CSS style attributes.
In this code snippet, multiple style attributes are set at the same time for the state.
In the `open` state, the button has a height of 200 pixels, an opacity of 1, and a yellow background color.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="state1"/>

In the following `closed` state, the button has a height of 100 pixels, an opacity of 0.8, and a background color of blue.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="state2"/>
-->

Angular의 [`state()`](api/animations/state) 함수로 각 전환이 끝날 때 적용할 상태를 정의합니다.
이 함수는 인자 두 개를 받습니다.
`open`이나 `closed` 같은 고유한 이름과 `style()` 함수입니다.

`style()` 함수로 해당 상태 이름에 연결할 스타일 모음을 정의하세요.
하이픈이 들어가는 스타일 프로퍼티는 `backgroundColor`처럼 _카멜 표기법(camelCase)_ 으로 작성하거나, `'background-color'`처럼 따옴표로 감싸야 합니다.

Angular의 [`state()`](api/animations/state) 함수가 `style⁣­(⁠)` 함수와 함께 CSS 스타일 프로퍼티를 설정하는 방법을 살펴봅시다.
이 코드에서는 상태 하나에 여러 스타일 프로퍼티를 한 번에 설정합니다.
`open` 상태에서 버튼의 높이는 200픽셀, 불투명도는 1, 배경색은 노란색입니다.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="state1"/>

다음 `closed` 상태에서 버튼의 높이는 100픽셀, 불투명도는 0.8, 배경색은 파란색입니다.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="state2"/>

<!--
### Transitions and timing
-->

<a id="transitions-and-timing"></a>

### 전환과 타이밍

<!--
In Angular, you can set multiple styles without any animation.
However, without further refinement, the button instantly transforms with no fade, no shrinkage, or other visible indicator that a change is occurring.

To make the change less abrupt, you need to define an animation _transition_ to specify the changes that occur between one state and another over a period of time.
The `transition()` function accepts two arguments:
The first argument accepts an expression that defines the direction between two transition states, and the second argument accepts one or a series of `animate()` steps.

Use the `animate()` function to define the length, delay, and easing of a transition, and to designate the style function for defining styles while transitions are taking place.
Use the `animate()` function to define the `keyframes()` function for multi-step animations.
These definitions are placed in the second argument of the `animate()` function.
-->

Angular에서는 애니메이션 없이도 여러 스타일을 설정할 수 있습니다.
하지만 별도의 처리를 하지 않으면 버튼은 서서히 바뀌거나 크기가 줄어드는 등 변화가 진행 중임을 보여주는 표시 없이 즉시 바뀝니다.

변화가 덜 갑작스럽게 느껴지도록 하려면 애니메이션 _전환_ 을 정의해서, 일정 시간 동안 한 상태에서 다른 상태로 어떻게 바뀔지 지정해야 합니다.
`transition()` 함수는 인자 두 개를 받습니다.
첫 번째 인자는 두 전환 상태 사이의 방향을 정의하는 표현식이며, 두 번째 인자는 하나 또는 여러 개의 `animate()` 단계입니다.

`animate()` 함수로 전환의 지속 시간, 지연 시간, 이징을 정의하고, 전환 중 적용할 스타일을 정의하는 스타일 함수를 지정하세요.
여러 단계로 구성된 애니메이션을 만들 때는 `animate()` 함수 안에 `keyframes()` 함수를 정의합니다.
이런 정의는 `animate()` 함수의 두 번째 인자에 넣습니다.

<!--
#### Animation metadata: duration, delay, and easing
-->

<a id="animation-metadata-duration-delay-and-easing"></a>

#### 애니메이션 메타데이터: 지속 시간, 지연 시간, 이징

<!--
The `animate()` function \(second argument of the transition function\) accepts the `timings` and `styles` input parameters.

The `timings` parameter takes either a number or a string defined in three parts.

```ts
animate(duration);
```

or

```ts
animate('duration delay easing');
```

The first part, `duration`, is required.
The duration can be expressed in milliseconds as a number without quotes, or in seconds with quotes and a time specifier.
For example, a duration of a tenth of a second can be expressed as follows:

- As a plain number, in milliseconds:
  `100`

- In a string, as milliseconds:
  `'100ms'`

- In a string, as seconds:
  `'0.1s'`

The second argument, `delay`, has the same syntax as `duration`.
For example:

- Wait for 100ms and then run for 200ms: `'0.2s 100ms'`

The third argument, `easing`, controls how the animation [accelerates and decelerates](https://easings.net) during its runtime.
For example, `ease-in` causes the animation to begin slowly, and to pick up speed as it progresses.

- Wait for 100ms, run for 200ms.
  Use a deceleration curve to start out fast and slowly decelerate to a resting point:
  `'0.2s 100ms ease-out'`

- Run for 200ms, with no delay.
  Use a standard curve to start slow, accelerate in the middle, and then decelerate slowly at the end:
  `'0.2s ease-in-out'`

- Start immediately, run for 200ms.
  Use an acceleration curve to start slow and end at full velocity:
  `'0.2s ease-in'`

HELPFUL: See the Material Design website's topic on [Natural easing curves](https://material.io/design/motion/speed.html#easing) for general information on easing curves.

This example provides a state transition from `open` to `closed` with a 1-second transition between states.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="transition1"/>

In the preceding code snippet, the `=>` operator indicates unidirectional transitions, and `<=>` is bidirectional.
Within the transition, `animate()` specifies how long the transition takes.
In this case, the state change from `open` to `closed` takes 1 second, expressed here as `1s`.

This example adds a state transition from the `closed` state to the `open` state with a 0.5-second transition animation arc.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="transition2"/>

HELPFUL: Some additional notes on using styles within [`state`](api/animations/state) and `transition` functions.

- Use [`state()`](api/animations/state) to define styles that are applied at the end of each transition, they persist after the animation completes
- Use `transition()` to define intermediate styles, which create the illusion of motion during the animation
- When animations are disabled, `transition()` styles can be skipped, but [`state()`](api/animations/state) styles can't
- Include multiple state pairs within the same `transition()` argument:

  ```ts
  transition('on => off, off => void');
  ```
-->

전환 함수의 두 번째 인자로 사용하는 `animate()` 함수는 `timings`와 `styles` 입력 파라미터를 받습니다.

`timings` 파라미터에는 숫자나 세 부분으로 구성된 문자열을 전달합니다.

```ts
animate(duration);
```

또는 다음과 같이 작성합니다:

```ts
animate('duration delay easing');
```

첫 번째 부분인 `duration`은 필수입니다.
지속 시간은 따옴표 없는 숫자로 밀리초 단위를 지정하거나, 따옴표 안에 시간 단위를 함께 써서 초 단위로 지정할 수 있습니다.
예를 들어 0.1초는 다음처럼 표현할 수 있습니다:

- 밀리초 단위의 숫자:
  `100`
- 밀리초 단위의 문자열:
  `'100ms'`
- 초 단위의 문자열:
  `'0.1s'`

두 번째 부분인 `delay`는 `duration`과 같은 문법을 사용합니다.
예를 들면 다음과 같습니다:

- 100밀리초를 기다린 뒤 200밀리초 동안 실행: `'0.2s 100ms'`

세 번째 부분인 `easing`은 애니메이션이 실행되는 동안 [가속하고 감속하는 방식](https://easings.net)을 제어합니다.
예를 들어 `ease-in`을 사용하면 애니메이션이 천천히 시작해서 점점 빨라집니다.

- 100밀리초를 기다린 뒤 200밀리초 동안 실행합니다.
  감속 곡선을 사용해서 빠르게 시작한 뒤 점차 느려지며 멈춥니다:
  `'0.2s 100ms ease-out'`
- 지연 없이 200밀리초 동안 실행합니다.
  표준 곡선을 사용해서 천천히 시작하고 중간에 가속한 뒤, 마지막에 다시 서서히 감속합니다:
  `'0.2s ease-in-out'`
- 즉시 시작해서 200밀리초 동안 실행합니다.
  가속 곡선을 사용해서 천천히 시작한 뒤 최고 속도로 끝납니다:
  `'0.2s ease-in'`

도움말: 이징 곡선에 대한 일반적인 정보는 Material Design 웹사이트의 [자연스러운 이징 곡선](https://material.io/design/motion/speed.html#easing)을 참고하세요.

이 예제에서는 `open` 상태에서 `closed` 상태로 1초 동안 전환합니다.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="transition1"/>

위 코드에서 `=>` 연산자는 단방향 전환을, `<=>`는 양방향 전환을 나타냅니다.
전환 안의 `animate()`는 전환에 걸리는 시간을 지정합니다.
여기서는 `open`에서 `closed`로 바뀌는 데 1초가 걸리며, 이를 `1s`로 표현했습니다.

다음 예제는 `closed` 상태에서 `open` 상태로 0.5초 동안 애니메이션을 적용하는 전환을 추가합니다.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="transition2"/>

도움말: [`state`](api/animations/state)와 `transition` 함수 안에서 스타일을 사용할 때 다음 사항도 알아두세요.

- [`state()`](api/animations/state)로 각 전환이 끝날 때 적용할 스타일을 정의합니다.
  이 스타일은 애니메이션이 끝난 뒤에도 유지됩니다.
- `transition()`으로 애니메이션 중 움직이는 것처럼 보이게 하는 중간 스타일을 정의합니다.
- 애니메이션을 비활성화하면 `transition()`의 스타일은 건너뛸 수 있지만, [`state()`](api/animations/state)의 스타일은 건너뛸 수 없습니다.
- 같은 `transition()` 인자에 여러 상태 쌍을 포함할 수 있습니다:

  ```ts
  transition('on => off, off => void');
  ```

<!--
### Triggering the animation
-->

<a id="triggering-the-animation"></a>

### 애니메이션 실행하기

<!--
An animation requires a _trigger_, so that it knows when to start.
The `trigger()` function collects the states and transitions, and gives the animation a name, so that you can attach it to the triggering element in the HTML template.

The `trigger()` function describes the property name to watch for changes.
When a change occurs, the trigger initiates the actions included in its definition.
These actions can be transitions or other functions, as we'll see later on.

In this example, we'll name the trigger `openClose`, and attach it to the `button` element.
The trigger describes the open and closed states, and the timings for the two transitions.

HELPFUL: Within each `trigger()` function call, an element can only be in one state at any given time.
However, it's possible for multiple triggers to be active at once.
-->

애니메이션에는 언제 시작할지 알려주는 _트리거_ 가 필요합니다.
`trigger()` 함수는 상태와 전환을 모으고 애니메이션에 이름을 붙여서, HTML 템플릿의 실행 대상 엘리먼트에 연결할 수 있게 합니다.

`trigger()` 함수에는 변화를 감지할 프로퍼티 이름을 지정합니다.
변화가 발생하면 트리거는 정의에 포함된 동작을 시작합니다.
이 동작은 전환이거나 다른 함수일 수 있으며, 뒤에서 살펴봅니다.

이 예제에서는 트리거 이름을 `openClose`로 지정하고 `button` 엘리먼트에 연결하겠습니다.
트리거에는 열린 상태와 닫힌 상태, 그리고 두 전환의 타이밍을 정의합니다.

도움말: 각 `trigger()` 함수 호출 안에서 엘리먼트는 한 시점에 하나의 상태만 가질 수 있습니다.
하지만 여러 트리거가 동시에 활성화될 수는 있습니다.

<!--
### Defining animations and attaching them to the HTML template
-->

<a id="defining-animations-and-attaching-them-to-the-html-template"></a>

### 애니메이션을 정의하고 HTML 템플릿에 연결하기

<!--
Animations are defined in the metadata of the component that controls the HTML element to be animated.
Put the code that defines your animations under the `animations:` property within the `@Component()` decorator.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="component"/>

When you've defined an animation trigger for a component, attach it to an element in that component's template by wrapping the trigger name in brackets and preceding it with an `@` symbol.
Then, you can bind the trigger to a template expression using standard Angular property binding syntax as shown below, where `triggerName` is the name of the trigger, and `expression` evaluates to a defined animation state.

```angular-html
<div [@triggerName]="expression">…</div>
```

The animation is executed or triggered when the expression value changes to a new state.

The following code snippet binds the trigger to the value of the `isOpen` property.

<docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/open-close.1.html" region="trigger"/>

In this example, when the `isOpen` expression evaluates to a defined state of `open` or `closed`, it notifies the trigger `openClose` of a state change.
Then it's up to the `openClose` code to handle the state change and kick off a state change animation.

For elements entering or leaving a page \(inserted or removed from the DOM\), you can make the animations conditional.
For example, use `*ngIf` with the animation trigger in the HTML template.

HELPFUL: In the component file, set the trigger that defines the animations as the value of the `animations:` property in the `@Component()` decorator.

In the HTML template file, use the trigger name to attach the defined animations to the HTML element to be animated.
-->

애니메이션은 애니메이션을 적용할 HTML 엘리먼트를 제어하는 컴포넌트의 메타데이터에 정의합니다.
애니메이션 정의 코드를 `@Component()` 데코레이터의 `animations:` 프로퍼티 안에 넣으세요.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="component"/>

컴포넌트의 애니메이션 트리거를 정의했다면, 트리거 이름 앞에 `@` 기호를 붙이고 대괄호로 감싸서 해당 컴포넌트 템플릿의 엘리먼트에 연결합니다.
그러면 아래처럼 일반적인 Angular 프로퍼티 바인딩 문법으로 트리거를 템플릿 표현식에 바인딩할 수 있습니다.
`triggerName`은 트리거 이름이고, `expression`은 정의된 애니메이션 상태로 평가되는 표현식입니다.

```angular-html
<div [@triggerName]="expression">…</div>
```

표현식 값이 새로운 상태로 바뀌면 애니메이션이 실행됩니다.

다음 코드는 트리거를 `isOpen` 프로퍼티 값에 바인딩합니다.

<docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/open-close.1.html" region="trigger"/>

이 예제에서는 `isOpen` 표현식이 정의된 상태인 `open`이나 `closed`로 평가되면 `openClose` 트리거에 상태 변경을 알립니다.
그러면 `openClose` 코드가 상태 변경을 처리하고 상태 전환 애니메이션을 시작합니다.

페이지에 진입하거나 퇴장하는 엘리먼트, 즉 DOM에 삽입되거나 DOM에서 제거되는 엘리먼트에는 조건부로 애니메이션을 적용할 수 있습니다.
예를 들어 HTML 템플릿에서 애니메이션 트리거와 함께 `*ngIf`를 사용하세요.

도움말: 컴포넌트 파일에서는 애니메이션을 정의하는 트리거를 `@Component()` 데코레이터의 `animations:` 프로퍼티 값으로 지정합니다.

HTML 템플릿 파일에서는 트리거 이름을 사용해서 정의한 애니메이션을 대상 HTML 엘리먼트에 연결합니다.

<!--
### Code review
-->

<a id="code-review"></a>

### 코드 살펴보기

<!--
Here are the code files discussed in the transition example.

<docs-code-multifile>
    <docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="component"/>
    <docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/open-close.1.html" region="trigger"/>
    <docs-code header="open-close.css" path="adev/src/content/examples/animations/src/app/open-close.css"/>
</docs-code-multifile>
-->

전환 예제에서 살펴본 코드 파일은 다음과 같습니다.

<docs-code-multifile>
    <docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="component"/>
    <docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/open-close.1.html" region="trigger"/>
    <docs-code header="open-close.css" path="adev/src/content/examples/animations/src/app/open-close.css"/>
</docs-code-multifile>

<!--
### Summary
-->

<a id="summary"></a>

### 정리

<!--
You learned to add animation to a transition between two states, using `style()` and [`state()`](api/animations/state) along with `animate()` for the timing.

Learn about more advanced features in Angular animations under the Animation section, beginning with advanced techniques in [transition and triggers](guide/legacy-animations/transition-and-triggers).
-->

`style()`과 [`state()`](api/animations/state)로 두 상태 사이의 전환에 애니메이션을 추가하고, `animate()`로 타이밍을 지정하는 방법을 알아봤습니다.

[전환과 트리거](guide/legacy-animations/transition-and-triggers)의 고급 기법을 시작으로, 애니메이션 섹션에서 Angular 애니메이션의 더 발전된 기능을 알아보세요.

<!--
## Animations API summary
-->

<a id="animations-api-summary"></a>

## 애니메이션 API 정리

<!--
The functional API provided by the `@angular/animations` module provides a domain-specific language \(DSL\) for creating and controlling animations in Angular applications.
See the [API reference](api?package=angular_animations&status=8) for a complete listing and syntax details of the core functions and related data structures.

| Function name                     | What it does                                                                                                                                                                                                |
| :-------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trigger()`                       | Kicks off the animation and serves as a container for all other animation function calls. HTML template binds to `triggerName`. Use the first argument to declare a unique trigger name. Uses array syntax. |
| `style()`                         | Defines one or more CSS styles to use in animations. Controls the visual appearance of HTML elements during animations. Uses object syntax.                                                                 |
| [`state()`](api/animations/state) | Creates a named set of CSS styles that should be applied on successful transition to a given state. The state can then be referenced by name within other animation functions.                              |
| `animate()`                       | Specifies the timing information for a transition. Optional values for `delay` and `easing`. Can contain `style()` calls within.                                                                            |
| `transition()`                    | Defines the animation sequence between two named states. Uses array syntax.                                                                                                                                 |
| `keyframes()`                     | Allows a sequential change between styles within a specified time interval. Use within `animate()`. Can include multiple `style()` calls within each `keyframe()`. Uses array syntax.                       |
| [`group()`](api/animations/group) | Specifies a group of animation steps \(_inner animations_\) to be run in parallel. Animation continues only after all inner animation steps have completed. Used within `sequence()` or `transition()`.     |
| `query()`                         | Finds one or more inner HTML elements within the current element.                                                                                                                                           |
| `sequence()`                      | Specifies a list of animation steps that are run sequentially, one by one.                                                                                                                                  |
| `stagger()`                       | Staggers the starting time for animations for multiple elements.                                                                                                                                            |
| `animation()`                     | Produces a reusable animation that can be invoked from elsewhere. Used together with `useAnimation()`.                                                                                                      |
| `useAnimation()`                  | Activates a reusable animation. Used with `animation()`.                                                                                                                                                    |
| `animateChild()`                  | Allows animations on child components to be run within the same timeframe as the parent.                                                                                                                    |

</table>
-->

`@angular/animations` 모듈의 함수형 API는 Angular 애플리케이션에서 애니메이션을 만들고 제어하는 도메인 특화 언어(DSL)를 제공합니다.
핵심 함수와 관련 데이터 구조의 전체 목록 및 자세한 문법은 [API 레퍼런스](api?package=angular_animations&status=8)를 참고하세요.

| 함수 이름                         | 동작                                                                                                                                                                                                     |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trigger()`                       | 애니메이션을 시작하며, 다른 모든 애니메이션 함수 호출을 담는 컨테이너 역할을 합니다. HTML 템플릿은 `triggerName`에 바인딩합니다. 첫 번째 인자로 고유한 트리거 이름을 선언합니다. 배열 문법을 사용합니다. |
| `style()`                         | 애니메이션에 사용할 CSS 스타일을 하나 이상 정의합니다. 애니메이션 중 HTML 엘리먼트의 시각적 모습을 제어합니다. 객체 문법을 사용합니다.                                                                   |
| [`state()`](api/animations/state) | 특정 상태로 전환이 완료되면 적용할 CSS 스타일 모음에 이름을 붙입니다. 다른 애니메이션 함수에서 이 이름으로 상태를 참조할 수 있습니다.                                                                    |
| `animate()`                       | 전환의 타이밍 정보를 지정합니다. `delay`와 `easing`은 선택 사항입니다. 내부에 `style()` 호출을 포함할 수 있습니다.                                                                                       |
| `transition()`                    | 이름이 지정된 두 상태 사이의 애니메이션 시퀀스를 정의합니다. 배열 문법을 사용합니다.                                                                                                                     |
| `keyframes()`                     | 지정한 시간 동안 스타일을 순서대로 변경할 수 있게 합니다. `animate()` 안에서 사용합니다. 각 `keyframe()` 안에 여러 `style()` 호출을 포함할 수 있습니다. 배열 문법을 사용합니다.                          |
| [`group()`](api/animations/group) | 병렬로 실행할 애니메이션 단계 그룹(_내부 애니메이션_)을 지정합니다. 내부 애니메이션 단계가 모두 완료된 뒤에만 다음 애니메이션이 진행됩니다. `sequence()` 또는 `transition()` 안에서 사용합니다.          |
| `query()`                         | 현재 엘리먼트 안에서 내부 HTML 엘리먼트를 하나 이상 찾습니다.                                                                                                                                            |
| `sequence()`                      | 하나씩 순차적으로 실행할 애니메이션 단계 목록을 지정합니다.                                                                                                                                              |
| `stagger()`                       | 여러 엘리먼트의 애니메이션 시작 시점에 시간차를 줍니다.                                                                                                                                                  |
| `animation()`                     | 다른 곳에서 호출할 수 있는 재사용 가능한 애니메이션을 만듭니다. `useAnimation()`과 함께 사용합니다.                                                                                                      |
| `useAnimation()`                  | 재사용 가능한 애니메이션을 실행합니다. `animation()`과 함께 사용합니다.                                                                                                                                  |
| `animateChild()`                  | 자식 컴포넌트의 애니메이션을 부모와 같은 시간대에 실행할 수 있게 합니다.                                                                                                                                 |

</table>

<!--
## More on Angular animations
-->

<a id="more-on-angular-animations"></a>

## Angular 애니메이션 더 알아보기

<!--
HELPFUL: Check out this [presentation](https://www.youtube.com/watch?v=rnTK9meY5us), shown at the AngularConnect conference in November 2017, and the accompanying [source code](https://github.com/matsko/animationsftw.in).

You might also be interested in the following:

<docs-pill-row>
  <docs-pill href="guide/legacy-animations/transition-and-triggers" title="Transition and triggers"/>
  <docs-pill href="guide/legacy-animations/complex-sequences" title="Complex animation sequences"/>
  <docs-pill href="guide/legacy-animations/reusable-animations" title="Reusable animations"/>
  <docs-pill href="guide/routing/route-transition-animations" title="Route transition animations"/>
  <docs-pill href="guide/animations/migration" title="Migrating to Native CSS Animations"/>
</docs-pill-row>
-->

도움말: 2017년 11월 AngularConnect 콘퍼런스의 [발표](https://www.youtube.com/watch?v=rnTK9meY5us)와 관련 [소스 코드](https://github.com/matsko/animationsftw.in)를 살펴보세요.

다음 문서도 참고해 보세요:

<docs-pill-row>
  <docs-pill href="guide/legacy-animations/transition-and-triggers" title="전환과 트리거"/>
  <docs-pill href="guide/legacy-animations/complex-sequences" title="복잡한 애니메이션 시퀀스"/>
  <docs-pill href="guide/legacy-animations/reusable-animations" title="재사용 가능한 애니메이션"/>
  <docs-pill href="guide/routing/route-transition-animations" title="라우팅 규칙 전환 애니메이션"/>
  <docs-pill href="guide/animations/migration" title="네이티브 CSS 애니메이션으로 마이그레이션하기"/>
</docs-pill-row>
