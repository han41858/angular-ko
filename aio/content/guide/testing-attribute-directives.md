{@a attribute-directive}

<!--
# Testing Attribute Directives
-->
# 어트리뷰트 디렉티브 테스트하기

<!--
An _attribute directive_ modifies the behavior of an element, component or another directive.
Its name reflects the way the directive is applied: as an attribute on a host element.

<div class="alert is-helpful">

  For a hands-on experience, <live-example name="testing" stackblitz="specs" noDownload>run tests and explore the test code</live-example> in your browser as your read this guide.

  If you'd like to experiment with the application that this guide describes, <live-example name="testing" noDownload>run it in your browser</live-example> or <live-example name="testing" downloadOnly>download and run it locally</live-example>.

</div>
-->
_어트리뷰트 디렉티브(attribute directive)_ 는 엘리먼트, 컴포넌트, 디렉티브의 동작을 바꿉니다.
이름에서 알 수 있듯이, 이 디렉티브는 호스트 엘리먼트에 어트리뷰트처럼 사용합니다.


<div class="alert is-helpful">

이 문서에서 다루는 예제 앱을 직접 확인하려면 <live-example name="testing" embedded-style noDownload>sample app</live-example> 링크를 참고하세요.

이 문서에서 다루는 테스트 기능이 동작하는 것을 직접 확인하려면 <live-example name="testing" stackblitz="specs" noDownload>tests</live-example> 링크를 참고하세요.

</div>


<!--
## Testing the `HighlightDirective`
-->
## `HighlightDirective` 테스트하기

<!--
The sample application's `HighlightDirective` sets the background color of an element
based on either a data bound color or a default color (lightgray).
It also sets a custom property of the element (`customProperty`) to `true`
for no reason other than to show that it can.

<code-example path="testing/src/app/shared/highlight.directive.ts" header="app/shared/highlight.directive.ts"></code-example>

It's used throughout the application, perhaps most simply in the `AboutComponent`:

<code-example path="testing/src/app/about/about.component.ts" header="app/about/about.component.ts"></code-example>

Testing the specific use of the `HighlightDirective` within the `AboutComponent` requires only the techniques explored in the ["Nested component tests"](guide/testing-components-scenarios#nested-component-tests) section of [Component testing scenarios](guide/testing-components-scenarios).

<code-example path="testing/src/app/about/about.component.spec.ts" region="tests" header="app/about/about.component.spec.ts"></code-example>

However, testing a single use case is unlikely to explore the full range of a directive's capabilities.
Finding and testing all components that use the directive is tedious, brittle, and almost as unlikely to afford full coverage.

_Class-only tests_ might be helpful,
but attribute directives like this one tend to manipulate the DOM.
Isolated unit tests don't touch the DOM and, therefore,
do not inspire confidence in the directive's efficacy.

A better solution is to create an artificial test component that demonstrates all ways to apply the directive.

<code-example path="testing/src/app/shared/highlight.directive.spec.ts" region="test-component" header="app/shared/highlight.directive.spec.ts (TestComponent)"></code-example>

<div class="lightbox">
  <img src='generated/images/guide/testing/highlight-directive-spec.png' alt="HighlightDirective spec in action">
</div>

<div class="alert is-helpful">

The `<input>` case binds the `HighlightDirective` to the name of a color value in the input box.
The initial value is the word "cyan" which should be the background color of the input box.

</div>

Here are some tests of this component:

<code-example path="testing/src/app/shared/highlight.directive.spec.ts" region="selected-tests" header="app/shared/highlight.directive.spec.ts (selected tests)"></code-example>

A few techniques are noteworthy:

- The `By.directive` predicate is a great way to get the elements that have this directive _when their element types are unknown_.

- The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:not">`:not` pseudo-class</a>
  in `By.css('h2:not([highlight])')` helps find `<h2>` elements that _do not_ have the directive.
  `By.css('*:not([highlight])')` finds _any_ element that does not have the directive.

- `DebugElement.styles` affords access to element styles even in the absence of a real browser, thanks to the `DebugElement` abstraction.
  But feel free to exploit the `nativeElement` when that seems easier or more clear than the abstraction.

- Angular adds a directive to the injector of the element to which it is applied.
  The test for the default color uses the injector of the second `<h2>` to get its `HighlightDirective` instance
  and its `defaultColor`.

- `DebugElement.properties` affords access to the artificial custom property that is set by the directive.
-->
예제 애플리케이션에 있는 `HighlightDirective`는 디렉티브에 바인딩되는 색상 데이터나 기본 색상(lightgray)을 엘리먼트 배경색으로 적용하는 디렉티브입니다.
그리고 엘리먼트에 `customProperty` 커스텀 프로퍼티 값을 `true`로 설정하는 동작도 합니다.
이 커스텀 프로퍼티가 의미있는 역할을 하는 것은 아니지만 테스트 기능을 설명하기 위해 추가했습니다.

<code-example path="testing/src/app/shared/highlight.directive.ts" header="app/shared/highlight.directive.ts"></code-example>

이 디렉티브는 예제 애플리케이션 전반에 활용되며, `AboutComponent`에는 이렇게 사용되었습니다:

<code-example path="testing/src/app/about/about.component.ts" header="app/about/about.component.ts"></code-example>

`HighlightDirective`가 `AboutComponent`에 사용되는 경우를 테스트하려면 [컴포넌트 테스트 시나리오](guide/testing-components-scenarios) 문서의 [중첩된 컴포넌트 테스트](guide/testing-components-scenarios#nested-component-tests) 섹션에서 설명한 내용을 활용하면 됩니다.

<code-example path="testing/src/app/about/about.component.spec.ts" region="tests" header="app/about/about.component.spec.ts"></code-example>

하지만 디렉티브가 사용되는 경우 하나를 테스트하는 것이 디렉티브가 활용될 수 있는 모든 경우를 테스트했다고 할 수는 없습니다.
그렇다고 해서 이 디렉티브가 사용되는 모든 컴포넌트를 함께 테스트하는 것은 또 복잡하고 번거로우며 지루한 작업이 될 것입니다.

이런 경우에 _클래스만 테스트하는 방법_ 이 도움이 될 수 있지만, DOM을 조작하는 어트리뷰트 디렉티브를 테스트하기에는 적합하지 않습니다.
디렉티브 클래스만 테스트하는 방식은 DOM을 활용하지 않기 때문에 이 디렉티브가 DOM에서 어떻게 동작하는지 제대로 알 수 없습니다.

그렇다면 테스트 컴포넌트를 원하는 모양으로 만들어서 디렉티브가 활용될 수 있는 상황을 다양하게 검사하는 방법이 좋습니다.

<code-example path="testing/src/app/shared/highlight.directive.spec.ts" region="test-component" header="app/shared/highlight.directive.spec.ts (TestComponent)"></code-example>

<div class="lightbox">
  <img src='generated/images/guide/testing/highlight-directive-spec.png' alt="HighlightDirective spec in action">
</div>


<div class="alert is-helpful">

`<input>`에 바인딩 된 `HighlightDirective`는 입력 필드에 입력된 값에 따라 배경색을 설정합니다.
이 엘리먼트의 초기값은 "cyan"이기 때문에 입력 필드의 배경색도 "cyan"으로 지정됩니다.

</div>

이 컴포넌트는 이렇게 테스트할 수 있습니다:

<code-example path="testing/src/app/shared/highlight.directive.spec.ts" region="selected-tests" header="app/shared/highlight.directive.spec.ts (일부 기능 테스트)"></code-example>

이런 내용이 중요합니다:

- _엘리먼트의 타입을 알지 못하는 상태에서_ 원하는 디렉티브를 찾으려면 `By.directive` 매처를 사용하는 것이 좋습니다.

- 이 디렉티브가 사용되지 않은 `<h2>` 엘리먼트를 찾기 위해 `By.css('h2:not([highlight])')`처럼 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:not">`:not` 가상 클래스(pseudo-class)</a>를 사용했습니다.
  `By.css('*:not([highlight])')`라고 사용하면 `<h2>` 엘리먼트 뿐 아니라 _모든_ 엘리먼트 중에서 디렉티브가 사용되지 않은 엘리먼트를 찾습니다.

- 엘리먼트 스타일을 검사하기 위해 `DebugElement.styles`를 참조했습니다.
  실제로는 브라우저가 스타일을 지원하지 않더라도 추상 클래스 `DebugElement`를 활용하면 스타일 객체에 접근할 수 있습니다.
  추상 클래스보다 더 쉽고 명확하다면 `nativeElement`를 사용해도 됩니다.

- Angular는 디렉티브가 적용되는 엘리먼트 인젝터에 이 디렉티브를 등록합니다.
  그래서 두 번째 `<h2>`에 있는 인젝터로 `HighlightDirective` 인스턴스를 참조하고 이 인스턴스에서 `defaultColor` 값을 가져왔습니다.

- 디렉티브가 설정하는 커스텀 프로퍼티를 찾기 위해 `DebugElement.properties`를 참조했습니다.

<hr>
