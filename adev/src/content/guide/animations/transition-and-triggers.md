<!--
# Animation transitions and triggers
-->

<a id="animation-transitions-and-triggers"></a>

# 애니메이션 전환과 트리거

<!--
IMPORTANT: The `@angular/animations` package is now deprecated. The Angular team recommends using native CSS with `animate.enter` and `animate.leave` for animations for all new code. Learn more at the new enter and leave [animation guide](guide/animations). Also see [Migrating away from Angular's Animations package](guide/animations/migration) to learn how you can start migrating to pure CSS animations in your apps.

This guide goes into depth on special transition states such as the `*` wildcard and `void`. It also shows how these states are used for elements entering and leaving a view.
This section also explores multiple animation triggers, animation callbacks, and sequence-based animation using keyframes.
-->

중요: `@angular/animations` 패키지는 이제 지원 중단 예정(deprecated)입니다.
Angular 팀은 새로 작성하는 모든 코드에서 `animate.enter`와 `animate.leave`를 사용하는 네이티브 CSS 애니메이션을 권장합니다.
새로운 진입 및 퇴장 [애니메이션 가이드](guide/animations)에서 자세히 알아보세요.
[Angular 애니메이션 패키지에서 마이그레이션하기](guide/animations/migration)를 참고하면 애플리케이션을 순수 CSS 애니메이션으로 전환하는 방법도 확인할 수 있습니다.

이 가이드에서는 `*` 와일드카드와 `void` 같은 특별한 전환 상태를 자세히 살펴봅니다.
이런 상태를 뷰에 진입하거나 뷰에서 퇴장하는 엘리먼트에 사용하는 방법도 설명합니다.
여러 애니메이션 트리거, 애니메이션 콜백, 키프레임으로 시퀀스 기반 애니메이션을 만드는 방법도 알아봅니다.

<!--
## Predefined states and wildcard matching
-->

<a id="predefined-states-and-wildcard-matching"></a>

## 사전 정의된 상태와 와일드카드 매칭

<!--
In Angular, transition states can be defined explicitly through the [`state()`](api/animations/state) function, or using the predefined `*` wildcard and `void` states.
-->

Angular에서는 [`state()`](api/animations/state) 함수로 전환 상태를 명시적으로 정의하거나, 미리 정의된 `*` 와일드카드와 `void` 상태를 사용할 수 있습니다.

<!--
### Wildcard state
-->

<a id="wildcard-state"></a>

### 와일드카드 상태

<!--
An asterisk `*` or _wildcard_ matches any animation state.
This is useful for defining transitions that apply regardless of the HTML element's start or end state.

For example, a transition of `open => *` applies when the element's state changes from open to anything else.

<img alt="wildcard state expressions" src="assets/images/guide/animations/wildcard-state-500.png">

The following is another code sample using the wildcard state together with the previous example using the `open` and `closed` states.
Instead of defining each state-to-state transition pair, any transition to `closed` takes 1 second, and any transition to `open` takes 0.5 seconds.

This allows the addition of new states without having to include separate transitions for each one.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="trigger-wildcard1"/>

Use a double arrow syntax to specify state-to-state transitions in both directions.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="trigger-wildcard2"/>
-->

별표 `*`, 즉 _와일드카드_ 는 모든 애니메이션 상태와 일치합니다.
HTML 엘리먼트의 시작 상태나 종료 상태에 관계없이 적용되는 전환을 정의할 때 유용합니다.

예를 들어 `open => *` 전환은 엘리먼트의 상태가 open에서 다른 어떤 상태로든 바뀔 때 적용됩니다.

<img alt="와일드카드 상태 표현식" src="assets/images/guide/animations/wildcard-state-500.png">

다음 코드는 앞에서 살펴본 `open`, `closed` 상태 예제에 와일드카드 상태를 함께 사용한 예제입니다.
각 상태 사이의 전환 쌍을 일일이 정의하는 대신, `closed`로 바뀌는 모든 전환은 1초, `open`으로 바뀌는 모든 전환은 0.5초가 걸리도록 정의합니다.

이렇게 하면 새 상태마다 별도의 전환을 추가하지 않아도 됩니다.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="trigger-wildcard1"/>

양방향 화살표 문법을 사용하면 두 상태 사이의 양방향 전환을 지정할 수 있습니다.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="trigger-wildcard2"/>

<!--
### Use wildcard state with multiple transition states
-->

<a id="use-wildcard-state-with-multiple-transition-states"></a>

### 여러 전환 상태에 와일드카드 상태 사용하기

<!--
In the two-state button example, the wildcard isn't that useful because there are only two possible states, `open` and `closed`.
In general, use wildcard states when an element has multiple potential states that it can change to.
If the button can change from `open` to either `closed` or something like `inProgress`, using a wildcard state could reduce the amount of coding needed.

<img alt="wildcard state with 3 states" src="assets/images/guide/animations/wildcard-3-states.png">

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="trigger-transition"/>

The `* => *` transition applies when any change between two states takes place.

Transitions are matched in the order in which they are defined.
Thus, you can apply other transitions on top of the `* => *` transition.
For example, define style changes or animations that would apply just to `open => closed`, then use `* => *` as a fallback for state pairings that aren't otherwise called out.

To do this, list the more specific transitions _before_ `* => *`.
-->

상태가 두 개인 버튼 예제에서는 가능한 상태가 `open`과 `closed`뿐이므로 와일드카드가 크게 유용하지 않습니다.
일반적으로 엘리먼트가 여러 상태로 바뀔 수 있을 때 와일드카드 상태를 사용합니다.
버튼이 `open`에서 `closed`뿐 아니라 `inProgress` 같은 상태로도 바뀔 수 있다면, 와일드카드 상태로 작성해야 할 코드의 양을 줄일 수 있습니다.

<img alt="상태 세 개에 사용하는 와일드카드 상태" src="assets/images/guide/animations/wildcard-3-states.png">

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="trigger-transition"/>

`* => *` 전환은 두 상태 사이에 어떤 변화가 발생하든 적용됩니다.

전환은 정의한 순서대로 매칭됩니다.
따라서 `* => *` 전환보다 다른 전환을 우선해서 적용할 수 있습니다.
예를 들어 `open => closed`에만 적용할 스타일 변경이나 애니메이션을 정의하고, 따로 지정하지 않은 상태 쌍에는 `* => *`를 대체 전환으로 사용하세요.

이렇게 하려면 더 구체적인 전환을 `* => *` _앞에_ 나열합니다.

<!--
### Use wildcards with styles
-->

<a id="use-wildcards-with-styles"></a>

### 스타일에 와일드카드 사용하기

<!--
Use the wildcard `*` with a style to tell the animation to use whatever the current style value is, and animate with that.
Wildcard is a fallback value that's used if the state being animated isn't declared within the trigger.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="transition4"/>
-->

스타일 값에 와일드카드 `*`를 사용하면 현재 스타일 값이 무엇이든 그 값을 사용해서 애니메이션을 적용합니다.
와일드카드는 애니메이션을 적용할 상태가 트리거 안에 선언되지 않았을 때 사용하는 대체 값입니다.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="transition4"/>

<!--
### Void state
-->

<a id="void-state"></a>

### `void` 상태

<!--
Use the `void` state to configure transitions for an element that is entering or leaving a page.
See [Animating entering and leaving a view](guide/legacy-animations/transition-and-triggers#aliases-enter-and-leave).
-->

페이지에 진입하거나 페이지에서 퇴장하는 엘리먼트의 전환을 설정하려면 `void` 상태를 사용하세요.
[뷰 진입과 퇴장에 애니메이션 적용하기](guide/legacy-animations/transition-and-triggers#aliases-enter-and-leave)를 참고하세요.

<!--
### Combine wildcard and void states
-->

<a id="combine-wildcard-and-void-states"></a>

### 와일드카드와 void 상태 조합하기

<!--
Combine wildcard and void states in a transition to trigger animations that enter and leave the page:

- A transition of `* => void` applies when the element leaves a view, regardless of what state it was in before it left
- A transition of `void => *` applies when the element enters a view, regardless of what state it assumes when entering
- The wildcard state `*` matches to _any_ state, including `void`
-->

전환에서 와일드카드와 void 상태를 조합하면 페이지에 진입하거나 페이지에서 퇴장하는 애니메이션을 실행할 수 있습니다:

- `* => void` 전환은 엘리먼트가 퇴장하기 전의 상태와 관계없이 뷰에서 퇴장할 때 적용됩니다.
- `void => *` 전환은 엘리먼트가 진입하면서 갖게 되는 상태와 관계없이 뷰에 진입할 때 적용됩니다.
- 와일드카드 상태 `*`는 `void`를 포함한 _모든_ 상태와 일치합니다.

<!--
## Animate entering and leaving a view
-->

<a id="animate-entering-and-leaving-a-view"></a>

## 뷰 진입과 퇴장에 애니메이션 적용하기

<!--
This section shows how to animate elements entering or leaving a page.

Add a new behavior:

- When you add a hero to the list of heroes, it appears to fly onto the page from the left
- When you remove a hero from the list, it appears to fly out to the right

<docs-code header="hero-list-enter-leave.ts" path="adev/src/content/examples/animations/src/app/hero-list-enter-leave.ts" region="animationdef"/>

In the preceding code, you applied the `void` state when the HTML element isn't attached to a view.
-->

이 절에서는 페이지에 진입하거나 페이지에서 퇴장하는 엘리먼트에 애니메이션을 적용하는 방법을 살펴봅니다.

다음 동작을 추가해 봅시다:

- 영웅 목록에 영웅을 추가하면 페이지 왼쪽에서 날아 들어옵니다.
- 목록에서 영웅을 제거하면 오른쪽으로 날아 나갑니다.

<docs-code header="hero-list-enter-leave.ts" path="adev/src/content/examples/animations/src/app/hero-list-enter-leave.ts" region="animationdef"/>

위 코드에서는 HTML 엘리먼트가 뷰에 연결되어 있지 않을 때 `void` 상태를 적용했습니다.

<!--
## Aliases :enter and :leave
-->

<a id="aliases-enter-and-leave"></a>

## `:enter`와 `:leave` 별칭

<!--
`:enter` and `:leave` are aliases for the `void => *` and `* => void` transitions.
These aliases are used by several animation functions.

```ts {hideCopy}

transition ( ':enter', [ … ] ); // alias for void => _
transition ( ':leave', [ … ] ); // alias for _ => void

```

It's harder to target an element that is entering a view because it isn't in the DOM yet.
Use the aliases `:enter` and `:leave` to target HTML elements that are inserted or removed from a view.
-->

`:enter`와 `:leave`는 각각 `void => *`와 `* => void` 전환의 별칭입니다.
여러 애니메이션 함수에서 이 별칭을 사용합니다.

```ts {hideCopy}

transition ( ':enter', [ … ] ); // void => _의 별칭
transition ( ':leave', [ … ] ); // _ => void의 별칭

```

뷰에 진입하는 엘리먼트는 아직 DOM에 없으므로 선택하기가 더 어렵습니다.
뷰에 삽입되거나 뷰에서 제거되는 HTML 엘리먼트를 선택하려면 `:enter`와 `:leave` 별칭을 사용하세요.

<!--
### Use `*ngIf` and `*ngFor` with :enter and :leave
-->

<a id="use-ngif-and-ngfor-with-enter-and-leave"></a>

### `*ngIf`, `*ngFor`와 함께 :enter, :leave 사용하기

<!--
The `:enter` transition runs when any `*ngIf` or `*ngFor` views are placed on the page, and `:leave` runs when those views are removed from the page.

IMPORTANT: Entering/leaving behaviors can sometimes be confusing.
As a rule of thumb consider that any element being added to the DOM by Angular passes via the `:enter` transition. Only elements being directly removed from the DOM by Angular pass via the `:leave` transition. For example, an element's view is removed from the DOM because its parent is being removed from the DOM.

This example has a special trigger for the enter and leave animation called `myInsertRemoveTrigger`.
The HTML template contains the following code.

<docs-code header="insert-remove.html" path="adev/src/content/examples/animations/src/app/insert-remove.html" region="insert-remove"/>

In the component file, the `:enter` transition sets an initial opacity of 0. It then animates it to change that opacity to 1 as the element is inserted into the view.

<docs-code header="insert-remove.ts" path="adev/src/content/examples/animations/src/app/insert-remove.ts" region="enter-leave-trigger"/>

Note that this example doesn't need to use [`state()`](api/animations/state).
-->

`:enter` 전환은 `*ngIf`나 `*ngFor` 뷰가 페이지에 배치될 때 실행되고, `:leave`는 이 뷰가 페이지에서 제거될 때 실행됩니다.

중요: 진입 및 퇴장 동작은 때로 혼란스러울 수 있습니다.
대체로 Angular가 DOM에 추가하는 모든 엘리먼트는 `:enter` 전환을 거친다고 생각하면 됩니다.
`:leave` 전환은 Angular가 DOM에서 직접 제거하는 엘리먼트만 거칩니다.
예를 들어 부모가 DOM에서 제거되면서 함께 제거되는 엘리먼트의 뷰는 직접 제거되는 경우와 다릅니다.

이 예제에는 진입 및 퇴장 애니메이션을 위한 `myInsertRemoveTrigger`라는 특별한 트리거가 있습니다.
HTML 템플릿에는 다음 코드가 들어갑니다.

<docs-code header="insert-remove.html" path="adev/src/content/examples/animations/src/app/insert-remove.html" region="insert-remove"/>

컴포넌트 파일의 `:enter` 전환은 초기 불투명도를 0으로 설정합니다.
그런 다음 엘리먼트가 뷰에 삽입될 때 불투명도가 1로 바뀌도록 애니메이션을 적용합니다.

<docs-code header="insert-remove.ts" path="adev/src/content/examples/animations/src/app/insert-remove.ts" region="enter-leave-trigger"/>

이 예제에서는 [`state()`](api/animations/state)를 사용할 필요가 없습니다.

<!--
## Transition :increment and :decrement
-->

<a id="transition-increment-and-decrement"></a>

## `:increment`와 `:decrement` 전환

<!--
The `transition()` function takes other selector values, `:increment` and `:decrement`.
Use these to kick off a transition when a numeric value has increased or decreased in value.

HELPFUL: The following example uses `query()` and `stagger()` methods.
For more information on these methods, see the [complex sequences](guide/legacy-animations/complex-sequences) page.

<docs-code header="hero-list-page.ts" path="adev/src/content/examples/animations/src/app/hero-list-page.ts" region="increment"/>
-->

`transition()` 함수에는 `:increment`와 `:decrement`라는 다른 셀렉터 값도 전달할 수 있습니다.
숫자 값이 증가하거나 감소할 때 전환을 실행하려면 이 셀렉터를 사용하세요.

도움말: 다음 예제에서는 `query()`와 `stagger()` 메서드를 사용합니다.
자세한 내용은 [복잡한 시퀀스](guide/legacy-animations/complex-sequences) 문서를 참고하세요.

<docs-code header="hero-list-page.ts" path="adev/src/content/examples/animations/src/app/hero-list-page.ts" region="increment"/>

<!--
## Boolean values in transitions
-->

<a id="boolean-values-in-transitions"></a>

## 전환에서 불리언 값 사용하기

<!--
If a trigger contains a Boolean value as a binding value, then this value can be matched using a `transition()` expression that compares `true` and `false`, or `1` and `0`.

<docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/open-close.2.html" region="trigger-boolean"/>

In the code snippet above, the HTML template binds a `<div>` element to a trigger named `openClose` with a status expression of `isOpen`, and with possible values of `true` and `false`.
This pattern is an alternative to the practice of creating two named states like `open` and `close`.

Inside the `@Component` metadata under the `animations:` property, when the state evaluates to `true`, the associated HTML element's height is a wildcard style or default.
In this case, the animation uses whatever height the element already had before the animation started.
When the element is `closed`, the element gets animated to a height of 0, which makes it invisible.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.2.ts" region="trigger-boolean"/>
-->

트리거에 불리언 값이 바인딩되어 있다면, `true`와 `false` 또는 `1`과 `0`을 비교하는 `transition()` 표현식으로 매칭할 수 있습니다.

<docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/open-close.2.html" region="trigger-boolean"/>

위 코드의 HTML 템플릿은 `<div>` 엘리먼트를 `openClose` 트리거에 바인딩하며, 상태 표현식으로 `true` 또는 `false`가 될 수 있는 `isOpen`을 사용합니다.
이 패턴은 `open`과 `close`처럼 이름을 붙인 상태 두 개를 만드는 방법 대신 사용할 수 있습니다.

`@Component` 메타데이터의 `animations:` 프로퍼티 안에서 상태가 `true`로 평가되면, 연결된 HTML 엘리먼트의 높이는 와일드카드 스타일 값 또는 기본값이 됩니다.
이 경우 애니메이션은 시작하기 전에 엘리먼트가 가지고 있던 높이를 사용합니다.
엘리먼트가 `closed` 상태가 되면 높이가 0으로 바뀌는 애니메이션이 적용되어 보이지 않게 됩니다.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.2.ts" region="trigger-boolean"/>

<!--
## Multiple animation triggers
-->

<a id="multiple-animation-triggers"></a>

## 여러 애니메이션 트리거

<!--
You can define more than one animation trigger for a component.
Attach animation triggers to different elements, and the parent-child relationships among the elements affect how and when the animations run.
-->

컴포넌트에 애니메이션 트리거를 여러 개 정의할 수 있습니다.
서로 다른 엘리먼트에 애니메이션 트리거를 연결하면, 엘리먼트 사이의 부모·자식 관계가 애니메이션의 실행 방식과 시점에 영향을 줍니다.

<!--
### Parent-child animations
-->

<a id="parent-child-animations"></a>

### 부모·자식 애니메이션

<!--
Each time an animation is triggered in Angular, the parent animation always gets priority and child animations are blocked.
For a child animation to run, the parent animation must query each of the elements containing child animations. It then lets the animations run using the [`animateChild()`](api/animations/animateChild) function.
-->

Angular에서 애니메이션이 실행될 때는 항상 부모 애니메이션이 우선하고 자식 애니메이션은 차단됩니다.
자식 애니메이션을 실행하려면 부모 애니메이션에서 자식 애니메이션이 있는 각 엘리먼트를 조회해야 합니다.
그런 다음 [`animateChild()`](api/animations/animateChild) 함수로 자식 애니메이션을 실행할 수 있습니다.

<!--
#### Disable an animation on an HTML element
-->

<a id="disable-an-animation-on-an-html-element"></a>

#### HTML 엘리먼트의 애니메이션 비활성화하기

<!--
A special animation control binding called `@.disabled` can be placed on an HTML element to turn off animations on that element, as well as any nested elements.
When true, the `@.disabled` binding prevents all animations from rendering.

The following code sample shows how to use this feature.

<docs-code-multifile>
    <docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/open-close.4.html" region="toggle-animation"/>
    <docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.4.ts" region="toggle-animation" language="typescript"/>
</docs-code-multifile>

When the `@.disabled` binding is true, the `@childAnimation` trigger doesn't kick off.

When an element within an HTML template has animations turned off using the `@.disabled` host binding, animations are turned off on all inner elements as well.
You can't selectively turn off multiple animations on a single element.<!- vale off ->

A selective child animations can still be run on a disabled parent in one of the following ways:

- A parent animation can use the [`query()`](api/animations/query) function to collect inner elements located in disabled areas of the HTML template.
Those elements can still animate.
<!- vale on ->

- A child animation can be queried by a parent and then later animated with the `animateChild()` function
-->

HTML 엘리먼트에 `@.disabled`라는 특별한 애니메이션 제어 바인딩을 지정하면 해당 엘리먼트와 그 안에 중첩된 엘리먼트의 애니메이션을 끌 수 있습니다.
`@.disabled` 바인딩이 true이면 모든 애니메이션이 렌더링되지 않습니다.

다음 예제에서 이 기능의 사용법을 확인할 수 있습니다.

<docs-code-multifile>
    <docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/open-close.4.html" region="toggle-animation"/>
    <docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.4.ts" region="toggle-animation" language="typescript"/>
</docs-code-multifile>

`@.disabled` 바인딩이 true이면 `@childAnimation` 트리거는 실행되지 않습니다.

HTML 템플릿의 엘리먼트에서 `@.disabled` 호스트 바인딩으로 애니메이션을 끄면, 모든 내부 엘리먼트의 애니메이션도 꺼집니다.
하나의 엘리먼트에 있는 여러 애니메이션을 선택적으로 끌 수는 없습니다.<!-- vale off -->

부모의 애니메이션이 비활성화되어 있어도 다음 방법으로 일부 자식 애니메이션을 실행할 수 있습니다:

- 부모 애니메이션에서 [`query()`](api/animations/query) 함수로 HTML 템플릿의 비활성화된 영역에 있는 내부 엘리먼트를 조회할 수 있습니다.
이 엘리먼트에는 여전히 애니메이션을 적용할 수 있습니다.
<!-- vale on -->

- 부모가 자식 애니메이션을 조회한 뒤 `animateChild()` 함수로 실행할 수 있습니다.

<!--
#### Disable all animations
-->

<a id="disable-all-animations"></a>

#### 모든 애니메이션 비활성화하기

<!--
To turn off all animations for an Angular application, place the `@.disabled` host binding on the topmost Angular component.

<docs-code header="app.ts" path="adev/src/content/examples/animations/src/app/app.ts" region="toggle-app-animations"/>

HELPFUL: Disabling animations application-wide is useful during end-to-end \(E2E\) testing.
-->

Angular 애플리케이션의 모든 애니메이션을 끄려면 최상위 Angular 컴포넌트에 `@.disabled` 호스트 바인딩을 지정하세요.

<docs-code header="app.ts" path="adev/src/content/examples/animations/src/app/app.ts" region="toggle-app-animations"/>

도움말: 애플리케이션 전체의 애니메이션을 비활성화하는 기능은 엔드 투 엔드(E2E) 테스트에서 유용합니다.

<!--
## Animation callbacks
-->

<a id="animation-callbacks"></a>

## 애니메이션 콜백

<!--
The animation `trigger()` function emits _callbacks_ when it starts and when it finishes.
The following example features a component that contains an `openClose` trigger.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="events1"/>

In the HTML template, the animation event is passed back via `$event`, as `@triggerName.start` and `@triggerName.done`, where `triggerName` is the name of the trigger being used.
In this example, the trigger `openClose` appears as follows.

<docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/open-close.3.html" region="callbacks"/>

A potential use for animation callbacks could be to cover for a slow API call, such as a database lookup.
For example, an **InProgress** button can be set up to have its own looping animation while the backend system operation finishes.

Another animation can be called when the current animation finishes.
For example, the button goes from the `inProgress` state to the `closed` state when the API call is completed.

An animation can influence an end user to _perceive_ the operation as faster, even when it is not.

Callbacks can serve as a debugging tool, for example in conjunction with `console.warn()` to view the application's progress in a browser's Developer JavaScript Console.
The following code snippet creates console log output for the original example, a button with the two states of `open` and `closed`.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="events"/>
-->

애니메이션 `trigger()` 함수는 애니메이션이 시작될 때와 끝날 때 _콜백_ 을 발생시킵니다.
다음 예제의 컴포넌트에는 `openClose` 트리거가 있습니다.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="events1"/>

HTML 템플릿에서는 `@triggerName.start`와 `@triggerName.done`으로 애니메이션 이벤트를 수신하고, `$event`로 이벤트를 전달받습니다.
여기서 `triggerName`은 사용하는 트리거 이름입니다.
이 예제의 `openClose` 트리거는 다음과 같이 사용합니다.

<docs-code header="open-close.html" path="adev/src/content/examples/animations/src/app/open-close.3.html" region="callbacks"/>

애니메이션 콜백은 데이터베이스 조회처럼 느린 API 호출의 대기 시간을 보완하는 용도로 사용할 수 있습니다.
예를 들어 백엔드 시스템의 작업이 끝날 때까지 **InProgress** 버튼에서 자체 애니메이션이 반복되도록 설정할 수 있습니다.

현재 애니메이션이 끝났을 때 다른 애니메이션을 호출할 수도 있습니다.
예를 들어 API 호출이 완료되면 버튼이 `inProgress` 상태에서 `closed` 상태로 바뀝니다.

애니메이션은 실제 처리 속도가 빨라지지 않아도, 최종 사용자가 동작이 더 빠르다고 _느끼게_ 할 수 있습니다.

콜백을 디버깅 도구로 사용할 수도 있습니다.
예를 들어 `console.warn()`과 함께 사용해서 브라우저의 JavaScript 개발자 콘솔에서 애플리케이션의 진행 상태를 확인할 수 있습니다.
다음 코드는 `open`, `closed` 두 상태를 가진 원래 버튼 예제의 로그를 콘솔에 출력합니다.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.ts" region="events"/>

<!--
## Keyframes
-->

<a id="keyframes"></a>

## 키프레임

<!--
To create an animation with multiple steps run in sequence, use _keyframes_.

Angular's `keyframe()` function allows several style changes within a single timing segment.
For example, the button, instead of fading, could change color several times over a single 2-second time span.

<img alt="keyframes" src="assets/images/guide/animations/keyframes-500.png">

The code for this color change might look like this.

<docs-code header="status-slider.ts" path="adev/src/content/examples/animations/src/app/status-slider.ts" region="keyframes"/>
-->

여러 단계를 순서대로 실행하는 애니메이션을 만들려면 _키프레임_ 을 사용하세요.

Angular의 `keyframe()` 함수는 하나의 시간 구간 안에서 스타일을 여러 번 변경할 수 있게 합니다.
예를 들어 버튼이 서서히 사라지는 대신, 2초 동안 색이 여러 번 바뀌게 할 수 있습니다.

<img alt="키프레임" src="assets/images/guide/animations/keyframes-500.png">

이 색상 변경 코드는 다음과 같이 작성할 수 있습니다.

<docs-code header="status-slider.ts" path="adev/src/content/examples/animations/src/app/status-slider.ts" region="keyframes"/>

<!--
### Offset
-->

<a id="offset"></a>

### 오프셋

<!--
Keyframes include an `offset` that defines the point in the animation where each style change occurs.
Offsets are relative measures from zero to one, marking the beginning and end of the animation. They should be applied to each of the keyframe steps if used at least once.

Defining offsets for keyframes is optional.
If you omit them, evenly spaced offsets are automatically assigned.
For example, three keyframes without predefined offsets receive offsets of 0, 0.5, and 1.
Specifying an offset of 0.8 for the middle transition in the preceding example might look like this.

<img alt="keyframes with offset" src="assets/images/guide/animations/keyframes-offset-500.png">

The code with offsets specified would be as follows.

<docs-code header="status-slider.ts" path="adev/src/content/examples/animations/src/app/status-slider.ts" region="keyframesWithOffsets"/>

You can combine keyframes with `duration`, `delay`, and `easing` within a single animation.
-->

키프레임에는 각 스타일 변경이 애니메이션의 어느 시점에 발생하는지 정의하는 `offset`을 지정할 수 있습니다.
오프셋은 애니메이션의 시작과 끝을 나타내는 0부터 1 사이의 상대값입니다.
한 번이라도 사용한다면 모든 키프레임 단계에 지정해야 합니다.

키프레임에 오프셋을 정의하는 것은 선택 사항입니다.
생략하면 일정한 간격의 오프셋이 자동으로 할당됩니다.
예를 들어 오프셋을 지정하지 않은 키프레임 세 개에는 0, 0.5, 1이 할당됩니다.
앞의 예제에서 중간 전환의 오프셋을 0.8로 지정하면 다음과 같이 동작합니다.

<img alt="오프셋을 지정한 키프레임" src="assets/images/guide/animations/keyframes-offset-500.png">

오프셋을 지정하는 코드는 다음과 같습니다.

<docs-code header="status-slider.ts" path="adev/src/content/examples/animations/src/app/status-slider.ts" region="keyframesWithOffsets"/>

하나의 애니메이션에서 키프레임을 `duration`, `delay`, `easing`과 함께 사용할 수 있습니다.

<!--
### Keyframes with a pulsation
-->

<a id="keyframes-with-a-pulsation"></a>

### 키프레임으로 맥박 효과 만들기

<!--
Use keyframes to create a pulse effect in your animations by defining styles at specific offsets throughout the animation.

Here's an example of using keyframes to create a pulse effect:

- The original `open` and `closed` states, with the original changes in height, color, and opacity, occurring over a timeframe of 1 second
- A keyframes sequence inserted in the middle that causes the button to appear to pulsate irregularly over the course of that same 1 second timeframe

<img alt="keyframes with irregular pulsation" src="assets/images/guide/animations/keyframes-pulsation.png">

The code snippet for this animation might look like this.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.1.ts" region="trigger"/>
-->

애니메이션 전반의 특정 오프셋에 스타일을 정의하면, 키프레임으로 맥박처럼 뛰는 효과를 만들 수 있습니다.

키프레임으로 맥박 효과를 만드는 예제를 살펴봅시다:

- 기존 `open`, `closed` 상태와 기존 높이, 색상, 불투명도의 변화는 1초 동안 진행됩니다.
- 그 중간에 키프레임 시퀀스를 삽입해서 같은 1초 동안 버튼이 불규칙하게 맥박치는 것처럼 보이게 합니다.

<img alt="불규칙한 맥박 효과를 만드는 키프레임" src="assets/images/guide/animations/keyframes-pulsation.png">

이 애니메이션 코드는 다음과 같이 작성할 수 있습니다.

<docs-code header="open-close.ts" path="adev/src/content/examples/animations/src/app/open-close.1.ts" region="trigger"/>

<!--
### Animatable properties and units
-->

<a id="animatable-properties-and-units"></a>

### 애니메이션을 적용할 수 있는 프로퍼티와 단위

<!--
Angular animations are built on top of web animations, so you can animate any property that the browser considers animatable.
This includes positions, sizes, transforms, colors, borders, and more.
The W3C maintains a list of animatable properties on its [CSS Transitions](https://www.w3.org/TR/css-transitions-1) page.

For properties with a numeric value, define a unit by providing the value as a string, in quotes, with the appropriate suffix:

- 50 pixels:
  `'50px'`

- Relative font size:
  `'3em'`

- Percentage:
  `'100%'`

You can also provide the value as a number. In such cases Angular assumes a default unit of pixels, or `px`.
Expressing 50 pixels as `50` is the same as saying `'50px'`.

HELPFUL: The string `"50"` would instead not be considered valid\).
-->

Angular 애니메이션은 웹 애니메이션을 기반으로 하므로, 브라우저가 애니메이션을 지원하는 모든 프로퍼티에 애니메이션을 적용할 수 있습니다.
위치, 크기, 변형, 색상, 테두리 등이 여기에 포함됩니다.
W3C는 [CSS Transitions](https://www.w3.org/TR/css-transitions-1) 페이지에서 애니메이션을 적용할 수 있는 프로퍼티 목록을 관리합니다.

숫자 값을 갖는 프로퍼티에는 적절한 접미사를 붙이고 따옴표로 감싼 문자열로 값을 전달해서 단위를 지정하세요:

- 50픽셀:
  `'50px'`
- 상대적인 글꼴 크기:
  `'3em'`
- 백분율:
  `'100%'`

값을 숫자로 전달할 수도 있습니다.
이 경우 Angular는 기본 단위를 픽셀, 즉 `px`로 간주합니다.
50픽셀을 `50`으로 표현하는 것은 `'50px'`로 표현하는 것과 같습니다.

도움말: 반면 문자열 `"50"`은 유효한 값으로 간주하지 않습니다.

<!--
### Automatic property calculation with wildcards
-->

<a id="automatic-property-calculation-with-wildcards"></a>

### 와일드카드로 프로퍼티 자동 계산하기

<!--
Sometimes, the value of a dimensional style property isn't known until runtime.
For example, elements often have widths and heights that depend on their content or the screen size.
These properties are often challenging to animate using CSS.

In these cases, you can use a special wildcard `*` property value under `style()`. The value of that particular style property is computed at runtime and then plugged into the animation.

The following example has a trigger called `shrinkOut`, used when an HTML element leaves the page.
The animation takes whatever height the element has before it leaves, and animates from that height to zero.

<docs-code header="hero-list-auto.ts" path="adev/src/content/examples/animations/src/app/hero-list-auto.ts" region="auto-calc"/>
-->

크기와 관련된 스타일 프로퍼티는 런타임이 되어야 값을 알 수 있는 경우가 있습니다.
예를 들어 엘리먼트의 너비와 높이는 콘텐츠나 화면 크기에 따라 달라지는 경우가 많습니다.
이런 프로퍼티는 CSS로 애니메이션을 적용하기 어려울 때가 많습니다.

이 경우 `style()` 안에서 특별한 와일드카드 프로퍼티 값 `*`를 사용할 수 있습니다.
해당 스타일 프로퍼티 값은 런타임에 계산된 뒤 애니메이션에 적용됩니다.

다음 예제에는 HTML 엘리먼트가 페이지에서 퇴장할 때 사용하는 `shrinkOut` 트리거가 있습니다.
애니메이션은 엘리먼트가 퇴장하기 전의 높이를 가져와, 그 높이에서 0까지 줄어들도록 적용됩니다.

<docs-code header="hero-list-auto.ts" path="adev/src/content/examples/animations/src/app/hero-list-auto.ts" region="auto-calc"/>

<!--
### Keyframes summary
-->

<a id="keyframes-summary"></a>

### 키프레임 정리

<!--
The `keyframes()` function in Angular allows you to specify multiple interim styles within a single transition. An optional `offset` can be used to define the point in the animation where each style change should occur.
-->

Angular의 `keyframes()` 함수를 사용하면 하나의 전환 안에 여러 중간 스타일을 지정할 수 있습니다.
선택 사항인 `offset`으로 각 스타일 변경이 애니메이션의 어느 시점에 일어나야 하는지 정의할 수 있습니다.

<!--
## More on Angular animations
-->

<a id="more-on-angular-animations"></a>

## Angular 애니메이션 더 알아보기

<!--
You might also be interested in the following:

<docs-pill-row>
  <docs-pill href="guide/legacy-animations" title="Introduction to Angular animations"/>
  <docs-pill href="guide/legacy-animations/complex-sequences" title="Complex animation sequences"/>
  <docs-pill href="guide/legacy-animations/reusable-animations" title="Reusable animations"/>
  <docs-pill href="guide/routing/route-transition-animations" title="Route transition animations"/>
  <docs-pill href="guide/animations/migration" title="Migrating to Native CSS Animations"/>
</docs-pill-row>
-->

다음 문서도 참고해 보세요:

<docs-pill-row>
  <docs-pill href="guide/legacy-animations" title="Angular 애니메이션 소개"/>
  <docs-pill href="guide/legacy-animations/complex-sequences" title="복잡한 애니메이션 시퀀스"/>
  <docs-pill href="guide/legacy-animations/reusable-animations" title="재사용 가능한 애니메이션"/>
  <docs-pill href="guide/routing/route-transition-animations" title="라우팅 규칙 전환 애니메이션"/>
  <docs-pill href="guide/animations/migration" title="네이티브 CSS 애니메이션으로 마이그레이션하기"/>
</docs-pill-row>
