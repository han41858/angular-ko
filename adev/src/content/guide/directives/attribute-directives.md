<!--
# Attribute directives
-->
# 어트리뷰트 디렉티브(Attribute Directives)

<!--
Change the appearance or behavior of DOM elements and Angular components with attribute directives.
-->
DOM 엘리먼트나 Angular 컴포넌트의 모습이나 동작을 변경하려면 어트리뷰트 디렉티브를 사용하면 됩니다. 


<!--
## Building an attribute directive
-->
## 어트리뷰트 디렉티브 만들기

<!--
This section walks you through creating a highlight directive that sets the background color of the host element to yellow.

1. To create a directive, use the CLI command [`ng generate directive`](tools/cli/schematics).

    <docs-code language="shell">

    ng generate directive highlight

    </docs-code>

    The CLI creates `src/app/highlight.directive.ts`, a corresponding test file `src/app/highlight.directive.spec.ts`.

    <docs-code header="src/app/highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.0.ts"/>

    The `@Directive()` decorator's configuration property specifies the directive's CSS attribute selector, `[appHighlight]`.

1. Import `ElementRef` from `@angular/core`.
    `ElementRef` grants direct access to the host DOM element through its `nativeElement` property.

1. Add `ElementRef` in the directive's `constructor()` to [inject](guide/di) a reference to the host DOM element, the element to which you apply `appHighlight`.

1. Add logic to the `HighlightDirective` class that sets the background to yellow.

    <docs-code header="src/app/highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.1.ts"/>

HELPFUL: Directives *do not* support namespaces.

<docs-code header="src/app/app.component.avoid.html (unsupported)" path="adev/src/content/examples/attribute-directives/src/app/app.component.avoid.html" visibleRegion="unsupported"/>
-->
이번 섹션에서는 호스트 엘리먼트의 배경색을 노란색으로 변경하는 하이라이트 디렉티브를 차근차근 만들어 봅시다.

1. 디렉티브를 생성하려면 CLI 명령 [`ng generate directive`](tools/cli/schematics)을 실행하면 됩니다.

    <docs-code language="shell">

    ng generate directive highlight

    </docs-code>

    그러면 CLI가 `src/app/highlight.directive.ts` 파일을 생성하고, 테스트 파일 `src/app/highlight.directive.spec.ts`도 함께 생성합니다.

    <docs-code header="src/app/highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.0.ts"/>

    `@Directive()` 데코레이터를 보면 디렉티브의 CSS 어트리뷰트 셀렉터가 `[appHighlight]` 라고 지정된 것을 확인할 수 있습니다.

1. `@angular/core` 패키지에서 `ElementRef` 심볼을 로드합니다.
    `ElementRef` 객체의 `nativeElement` 프로퍼티를 통하면 호스트 DOM 엘리먼트에 접근할 수 있습니다.

1. 디렉티브 `constructor()`에 `ElementRef` 를 추가해서 [의존성 주입](guide/di) 합니다.

1. 배경색을 변경하는 로직을 `HighlightDirective` 클래스에 작성합니다.

    <docs-code header="src/app/highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.1.ts"/>

참고: 디렉티브는 네임스페이스를 *지원하지 않습니다*.

<docs-code header="src/app/app.component.avoid.html (지원하지 않음)" path="adev/src/content/examples/attribute-directives/src/app/app.component.avoid.html" visibleRegion="unsupported"/>


<!--
## Applying an attribute directive
-->
## 어트리뷰트 디렉티브 적용하기

<!--
1. To use the `HighlightDirective`, add a `<p>` element to the HTML template with the directive as an attribute.

    <docs-code header="src/app/app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.1.html" visibleRegion="applied"/>

Angular creates an instance of the `HighlightDirective` class and injects a reference to the `<p>` element into the directive's constructor, which sets the `<p>` element's background style to yellow.
-->
1. `HighlightDirective` 를 적용하려면 HTML 템플릿에 있는 `<p>` 와 같은 엘리먼트에 어트리뷰트로 디렉티브를 추가하면 됩니다.

    <docs-code header="src/app/app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.1.html" visibleRegion="applied"/>

그러면 Angular는 해당 부분마다 `HighlightDirective` 클래스의 인스턴스를 생성하며, `<p>` 엘리먼트 참조를 디렉티브 생성자로 전달하고, 디렉티브에 구현한 코드에 따라 배경을 노란색으로 변경합니다.


<!--
## Handling user events
-->
## 사용자 이벤트 처리하기

<!--
This section shows you how to detect when a user mouses into or out of the element and to respond by setting or clearing the highlight color.

1. Import `HostListener` from '@angular/core'.

    <docs-code header="src/app/highlight.directive.ts (imports)" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.2.ts" visibleRegion="imports"/>

1. Add two event handlers that respond when the mouse enters or leaves, each with the `@HostListener()` decorator.

    <docs-code header="src/app/highlight.directive.ts (mouse-methods)" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.2.ts" visibleRegion="mouse-methods"/>

Subscribe to events of the DOM element that hosts an attribute directive, the `<p>` in this case, with the `@HostListener()` decorator.

HELPFUL: The handlers delegate to a helper method, `highlight()`, that sets the color on the host DOM element, `el`.

The complete directive is as follows:

<docs-code header="src/app/highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.2.ts"/>

The background color appears when the pointer hovers over the paragraph element and disappears as the pointer moves out.

<img alt="Second Highlight" src="assets/images/guide/attribute-directives/highlight-directive-anim.gif">
-->
이번 섹션에서는 사용자의 마우스 움직임을 감지해서, 마우스가 엘리먼트 위에 올라가면 배경색을 적용하고, 엘리먼트에서 벗어나면 배경색을 없애는 동작을 구현해 봅시다.

1. `@angular/core` 패키지에서 `HostListener` 심볼을 불러옵니다.

    <docs-code header="src/app/highlight.directive.ts (imports)" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.2.ts" visibleRegion="imports"/>

1. 마우스가 들어오고 나갈 때 실행될 이벤트 핸들러를 두 개 선언합니다. 각 메서드에는 `@HostListener()` 데코레이터를 붙여줍니다.

    <docs-code header="src/app/highlight.directive.ts (mouse-methods)" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.2.ts" visibleRegion="mouse-methods"/>

이렇게 구현하면 `@HostListener()` 데코레이터가 `<p>` 엘리먼트에서 발생하는 마우스 이벤트를 감지하기 시작합니다.

참고: DOM 엘리먼트의 배경색을 지정하고 해제하는 로직은 헬퍼 메서드 `highlight()`로 구현했습니다.

이 내용을 구현한 디렉티브 코드는 이렇습니다:

<docs-code header="src/app/highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.2.ts"/>

이제 `<p>` 엘리먼트 위에 마우스 포인터가 올라가면 배경색이 변경되며, 마우스가 엘리먼트를 벗어나면 배경색이 제거됩니다.

<img alt="Second Highlight" src="assets/images/guide/attribute-directives/highlight-directive-anim.gif">


<!--
## Passing values into an attribute directive
-->
## 어트리뷰트 디렉티브에 인자 전달하기

<!--
This section walks you through setting the highlight color while applying the `HighlightDirective`.

1. In `highlight.directive.ts`, import `Input` from `@angular/core`.

    <docs-code header="src/app/highlight.directive.ts (imports)" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.3.ts" visibleRegion="imports"/>

1. Add an `appHighlight` `input` property.

    <docs-code header="src/app/highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.3.ts" visibleRegion="input"/>

    The `input()` function adds metadata to the class that makes the directive's `appHighlight` property available for binding.

2. In `app.component.ts`, add a `color` property to the `AppComponent`.

    <docs-code header="src/app/app.component.ts (class)" path="adev/src/content/examples/attribute-directives/src/app/app.component.1.ts" visibleRegion="class"/>

3. To simultaneously apply the directive and the color, use property binding with the `appHighlight` directive selector, setting it equal to `color`.

    <docs-code header="src/app/app.component.html (color)" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" visibleRegion="color"/>

    The `[appHighlight]` attribute binding performs two tasks:

    * Applies the highlighting directive to the `<p>` element
    * Sets the directive's highlight color with a property binding
-->
이번 섹션에서는 `HighlightDirective`를 적용하면서 배경색을 별도로 지정하는 방법을 알아봅시다.

1. `highlight.directive.ts` 파일에서 `@angular/core` 패키지로 제공되는 `input` 함수를 불러옵니다.

    <docs-code header="src/app/highlight.directive.ts (imports)" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.3.ts" visibleRegion="imports"/>

1. `appHighlight` `input` 프로퍼티를 추가합니다.

    <docs-code header="src/app/highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.3.ts" visibleRegion="input"/>

    `input()` 함수는 `appHighlight`와 같은 디렉티브 프로퍼티를 바인딩 할 수 있도록 클래스 메타데이터에 등록하는 함수입니다.

2. `app.component.ts` 파일에 선언된 `AppComponent` 클래스에 `color` 프로퍼티를 추가합니다.

    <docs-code header="src/app/app.component.ts (클래스 코드)" path="adev/src/content/examples/attribute-directives/src/app/app.component.1.ts" visibleRegion="class"/>

3. 디렉티브를 적용하면서 색상값을 지정하려면, 디렉티브 셀렉터 `appHighlight` 에 등호(`=`)를 붙이고 `color` 값을 연결하면 됩니다.

    <docs-code header="src/app/app.component.html (color)" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" visibleRegion="color"/>

    그러면 `[appHighlight]` 어트리뷰트는 두가지 동작을 수행합니다:

    * `<p>` 엘리먼트에 하이라이트 디렉티브를 적용합니다.
    * 디렉티브의 배경색을 프로퍼티 바인딩 된 값으로 설정합니다.


<!--
### Setting the value with user input
-->
### 사용자가 선택한 값으로 배경색 설정하기

<!--
This section guides you through adding radio buttons to bind your color choice to the `appHighlight` directive.

1. Add markup to `app.component.html` for choosing a color as follows:

    <docs-code header="src/app/app.component.html (v2)" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" visibleRegion="v2"/>

1. Revise the `AppComponent.color` so that it has no initial value.

    <docs-code header="src/app/app.component.ts (class)" path="adev/src/content/examples/attribute-directives/src/app/app.component.ts" visibleRegion="class"/>

1. In `highlight.directive.ts`, revise `onMouseEnter` method so that it first tries to highlight with `appHighlight` and falls back to `red` if `appHighlight` is `undefined`.

    <docs-code header="src/app/highlight.directive.ts (mouse-enter)" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.3.ts" visibleRegion="mouse-enter"/>

1. Serve your application to verify that the user can choose the color with the radio buttons.

    <img alt="Animated gif of the refactored highlight directive changing color according to the radio button the user selects" src="assets/images/guide/attribute-directives/highlight-directive-v2-anim.gif">
-->
이번 섹션에서는 라디오 버튼을 추가해서 선택된 색상에 따라 `appHighlight` 디렉티브에 적용되는 색상을 적용해 봅시다.

1. `app.component.html` 함수에 다음과 같이 마크업을 추가합니다:

    <docs-code header="src/app/app.component.html (v2)" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" visibleRegion="v2"/>

1. `AppComponent.color` 프로퍼티의 초기값이 없으니 지정해 줍니다.

    <docs-code header="src/app/app.component.ts (클래스 코드)" path="adev/src/content/examples/attribute-directives/src/app/app.component.ts" visibleRegion="class"/>

1. `highlight.directive.ts` 파일에서 `onMouseEnter` 메서드를 수정합니다. 배경색으로 제일 먼저 `appHighlight` 값을 사용하며, `appHighlight` 값이 `undefined` 인 경우 `red` 값을 사용하도록 구현합니다.

    <docs-code header="src/app/highlight.directive.ts (mouse-enter)" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.3.ts" visibleRegion="mouse-enter"/>

1. 이제 사용자가 라디오 버튼을 선택하면, 선택한 배경색이 배경색으로 적용됩니다.

    <img alt="Animated gif of the refactored highlight directive changing color according to the radio button the user selects" src="assets/images/guide/attribute-directives/highlight-directive-v2-anim.gif">



<!--
## Binding to a second property
-->
## 두번째 프로퍼티 바인딩하기

<!--
This section guides you through configuring your application so the developer can set the default color.

1. Add a second `Input()` property to `HighlightDirective` called `defaultColor`.

    <docs-code header="src/app/highlight.directive.ts (defaultColor)" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.ts" visibleRegion="defaultColor"/>

1. Revise the directive's `onMouseEnter` so that it first tries to highlight with the `appHighlight`, then with the `defaultColor`, and falls back to `red` if both properties are `undefined`.

    <docs-code header="src/app/highlight.directive.ts (mouse-enter)" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.ts" visibleRegion="mouse-enter"/>

1. To bind to the `AppComponent.color` and fall back to "violet" as the default color, add the following HTML.
    In this case,  the `defaultColor` binding doesn't use square brackets, `[]`, because it is static.

    <docs-code header="src/app/app.component.html (defaultColor)" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" visibleRegion="defaultColor"/>

    As with components, you can add multiple directive property bindings to a host element.

The default color is red if there is no default color binding.
When the user chooses a color the selected color becomes the active highlight color.

<img alt="Animated gif of final highlight directive that shows red color with no binding and violet with the default color set. When user selects color, the selection takes precedence." src="assets/images/guide/attribute-directives/highlight-directive-final-anim.gif">
-->
이번에는 배경색이 지정되지 않았을 때 기본 색상을 사용하도록 구현해 봅시다.

1. `HighlightDirective`에 `defaultColor` 프로퍼티를 입력 프로퍼티로 추가합니다.

    <docs-code header="src/app/highlight.directive.ts (defaultColor)" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.ts" visibleRegion="defaultColor"/>

1. 디렉티브의 `onMouseEnter` 메서드를 수정합니다. 배경색은 `appHighlight` 를 사용하는데, 이 값이 없는 경우 `defaultColor` 값을, 기본값도 없는 경우 `red` 값을 사용하도록 지정합니다.

    <docs-code header="src/app/highlight.directive.ts (mouse-enter)" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.ts" visibleRegion="mouse-enter"/>

1. `AppComponent.color` 프로퍼티의 값은 "violet" 으로 바인딩합니다.
    이번 경우는 정적인 값을 사용하기 때문에 HTML 문서에서 `defaultColor` 값을 바인딩 할 때 대괄호(`[]`)를 사용하지 않습니다.

    <docs-code header="src/app/app.component.html (defaultColor)" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" visibleRegion="defaultColor"/>

    이렇게 디렉티브 프로퍼티는 여러 개를 동시에 바인딩 할 수 있습니다.

기본값이 바인딩되지 않은 경우 사용되는 기본 색상은 `red` 입니다.
그리고 사용자가 색상을 선택하면 해당 색상이 배경색으로 사용됩니다.

<img alt="Animated gif of final highlight directive that shows red color with no binding and violet with the default color set. When user selects color, the selection takes precedence." src="assets/images/guide/attribute-directives/highlight-directive-final-anim.gif">


<!--
## Deactivating Angular processing with `NgNonBindable`
-->
## Angular 처리 중단하기: `NgNonBindable`

<!--
To prevent expression evaluation in the browser, add `ngNonBindable` to the host element.
`ngNonBindable` deactivates interpolation, directives, and binding in templates.

In the following example, the expression `{{ 1 + 1 }}` renders just as it does in your code editor, and does not display `2`.

<docs-code header="src/app/app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" visibleRegion="ngNonBindable"/>

Applying `ngNonBindable` to an element stops binding for that element's child elements.
However, `ngNonBindable` still lets directives work on the element where you apply `ngNonBindable`.
In the following example, the `appHighlight` directive is still active but Angular does not evaluate the expression `{{ 1 + 1 }}`.

<docs-code header="src/app/app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" visibleRegion="ngNonBindable-with-directive"/>

If you apply `ngNonBindable` to a parent element, Angular disables interpolation and binding of any sort, such as property binding or event binding, for the element's children.
-->
브라우저에서 Angular 표현식을 평가하지 않으려면 호스트 엘리먼트에 `ngNonBindable`을 추가하면 됩니다.
`ngNonBindable`은 문자열 바인딩, 디렉티브 동작, 템플릿의 바인딩을 비활성화합니다.

아래 예제 코드에서 `{{ 1 + 1 }}` 라는 표현식은 평가되지 않고 그대로 화면에 표시됩니다.

<docs-code header="src/app/app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" visibleRegion="ngNonBindable"/>

엘리먼트에 `ngNonBindable`을 지정하면 이 엘리먼트의 자식 엘리먼트의 바인딩이 중단됩니다.
하지만 `ngNonBindable`이 적용된 엘리먼트 자체에는 디렉티브 동작이 중단되지 않습니다.
아래 예제 코드처럼 구현하면, `appHighlight` 디렉티브는 여전히 동작하지만 표현식 `{{ 1 + 1 }}`는 평가되지 않습니다.

<docs-code header="src/app/app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" visibleRegion="ngNonBindable-with-directive"/>

그래서 어떤 엘리먼트를 포함하여 자식 엘리먼트들에 존재하는 문자열 바인딩, 프로퍼티 바인딩, 이벤트 바인딩이 모두 비활성화하려면, 해당 엘리먼트의 부모 엘리먼트에 `ngNonBindable`을 적용하면 됩니다.