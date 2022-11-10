<!--
# Attribute directives
-->
# 어트리뷰트 디렉티브

<!--
Change the appearance or behavior of DOM elements and Angular components with attribute directives.

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

</div>
-->
어트리뷰트 디렉티브를 사용하면 DOM 엘리먼트나 Angular 컴포넌트의 모습이나 동작을 변경할 수 있습니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제를 확인하려면 <live-example></live-example>를 참고하세요.

</div>


<a id="building-an-attribute-directive"></a>

<!--
## Building an attribute directive
-->
## 어트리뷰트 디렉티브 만들기

<!--
This section walks you through creating a highlight directive that sets the background color of the host element to yellow.

1.  To create a directive, use the CLI command [`ng generate directive`](cli/generate).

    <code-example format="shell" language="shell">

    ng generate directive highlight

    </code-example>

    The CLI creates `src/app/highlight.directive.ts`, a corresponding test file `src/app/highlight.directive.spec.ts`, and declares the directive class in the `AppModule`.

    The CLI generates the default `src/app/highlight.directive.ts` as follows:

    <code-example header="src/app/highlight.directive.ts" path="attribute-directives/src/app/highlight.directive.0.ts"></code-example>

    The `@Directive()` decorator's configuration property specifies the directive's CSS attribute selector, `[appHighlight]`.

1.  Import `ElementRef` from `@angular/core`.
    `ElementRef` grants direct access to the host DOM element through its `nativeElement` property.

1.  Add `ElementRef` in the directive's `constructor()` to [inject](guide/dependency-injection) a reference to the host DOM element, the element to which you apply `appHighlight`.

1.  Add logic to the `HighlightDirective` class that sets the background to yellow.

    <code-example header="src/app/highlight.directive.ts" path="attribute-directives/src/app/highlight.directive.1.ts"></code-example>

<div class="alert is-helpful">

Directives *do not* support namespaces.

<code-example header="src/app/app.component.avoid.html (unsupported)" path="attribute-directives/src/app/app.component.avoid.html" region="unsupported"></code-example>

</div>

<a id="apply-directive"></a>

## Applying an attribute directive

1.  To use the `HighlightDirective`, add a `<p>` element to the HTML template with the directive as an attribute.

    <code-example header="src/app/app.component.html" path="attribute-directives/src/app/app.component.1.html" region="applied"></code-example>

Angular creates an instance of the `HighlightDirective` class and injects a reference to the `<p>` element into the directive's constructor, which sets the `<p>` element's background style to yellow.
-->
이번 섹션에서는 호스트 엘리먼트의 배경을 노란색으로 변경하는 하이라이트 디렉티브를 만들어 봅시다.

1.  디렉티브를 만들려면 Angular CLI [`ng generate directive`](cli/generate) 명령을 실행하면 됩니다.

    <code-example format="shell" language="shell">

    ng generate directive highlight

    </code-example>

    이 명령을 실행하면  Angular CLI가 `src/app/highlight.directive.ts` 파일을 생성하며, 테스트 파일 `src/app/highlight.directive.spec.ts`을 함께 생성하고, `AppModule`에 이 디렉티브 클래스를 자동으로 추가합니다.

    Angular CLI가 생성한 `src/app/highlight.directive.ts` 코드의 내용은 이렇습니다:

    <code-example header="src/app/highlight.directive.ts" path="attribute-directives/src/app/highlight.directive.0.ts"></code-example>

    `@Directive()` 데코레이터에는 디렉티브의 CSS 어트리뷰트 셀렉터를 `[appHighlight]`라고 지정했습니다.

1.  `@angular/core` 패키지로 제공되는 `ElementRef`를 로드합니다.
    `ElementRef`의 `nativeElement` 프로퍼티를 사용하면 호스트 DOM 엘리먼트에 직접 접근할 수 있습니다.

1.  디렉티브의 `constructor()`에 ElementRef`를 추가해서 호스트 엘리먼트를 [의존성으로 주입](guide/dependency-injection)합니다. 이 엘리먼트에 `appHighlight`를 적용할 예정입니다.

1.  `HighlightDirective` 클래스에 배경을 노란색으로 변경하는 코드를 추가합니다.

    <code-example header="src/app/highlight.directive.ts" path="attribute-directives/src/app/highlight.directive.1.ts"></code-example>

<div class="alert is-helpful">

디렉티브는 네임스페이스를 *지원하지 않습니다*.

<code-example header="src/app/app.component.avoid.html (지원하지 않음)" path="attribute-directives/src/app/app.component.avoid.html" region="unsupported"></code-example>

</div>


<a id="apply-directive"></a>

<!--
## Applying an attribute directive
-->
## 어트리뷰트 디렉티브 적용하기

<!--
1.  To use the `HighlightDirective`, add a `<p>` element to the HTML template with the directive as an attribute.

    <code-example header="src/app/app.component.html" path="attribute-directives/src/app/app.component.1.html" region="applied"></code-example>

Angular creates an instance of the `HighlightDirective` class and injects a reference to the `<p>` element into the directive's constructor, which sets the `<p>` element's background style to yellow.
-->
1.  `HighlightDirective`를 사용하려면 HTML 템플릿에 `<p>` 엘리먼트를 추가하고 이 엘리먼트의 어트리뷰트로 디렉티브 이름을 지정하면 됩니다.

    <code-example header="src/app/app.component.html" path="attribute-directives/src/app/app.component.1.html" region="applied"></code-example>

그러면 Angular가 `HighlightDirective` 클래스의 인스턴스를 생성하면서, 디렉티브 생성자로 `<p>` 엘리먼트를 의존성으로 주입하고, 이 엘리먼트의 배경을 노란색으로 지정합니다.


<a id="respond-to-user"></a>

<!--
## Handling user events
-->
## 사용자 이벤트 처리하기

<!--
This section shows you how to detect when a user mouses into or out of the element and to respond by setting or clearing the highlight color.

1.  Import `HostListener` from '@angular/core'.

    <code-example header="src/app/highlight.directive.ts (imports)" path="attribute-directives/src/app/highlight.directive.2.ts" region="imports"></code-example>

1.  Add two event handlers that respond when the mouse enters or leaves, each with the `@HostListener()` decorator.

    <code-example header="src/app/highlight.directive.ts (mouse-methods)" path="attribute-directives/src/app/highlight.directive.2.ts" region="mouse-methods"></code-example>

Subscribe to events of the DOM element that hosts an attribute directive, the `<p>` in this case, with the `@HostListener()` decorator.

<div class="alert is-helpful">

The handlers delegate to a helper method, `highlight()`, that sets the color on the host DOM element, `el`.

</div>

The complete directive is as follows:

<code-example header="src/app/highlight.directive.ts" path="attribute-directives/src/app/highlight.directive.2.ts"></code-example>

The background color appears when the pointer hovers over the paragraph element and disappears as the pointer moves out.

<div class="lightbox">

<img alt="Second Highlight" src="generated/images/guide/attribute-directives/highlight-directive-anim.gif">

</div>
-->
이번 섹션에서는 사용자가 엘리먼트에 마우스를 올리고 내리는 동작을 감지하고 이 동작에 따라 배경색을 변경해 봅시다.

1.  '@angular/core' 패키지로 제공되는 `HostListener`를 로드합니다.

    <code-example header="src/app/highlight.directive.ts (심볼 로드하기)" path="attribute-directives/src/app/highlight.directive.2.ts" region="imports"></code-example>

1.  마우스가 진입하고 벗어나는 이벤트를 처리하는 핸들러를 추가합니다. 각 메서드에는 `@HostListener()` 데코레이터를 붙입니다.

    <code-example header="src/app/highlight.directive.ts (마우스 처리 메서드)" path="attribute-directives/src/app/highlight.directive.2.ts" region="mouse-methods"></code-example>

그러면 이제 어트리뷰트 디렉티브가 지정된 호스트 DOM 엘리먼트의 이벤트를 구독하기 시작합니다.

<div class="alert is-helpful">

이벤트 핸들러 함수들은 DOM 엘리먼트의 배경색을 변경하기 위해 `highlight()` 헬퍼 메서드를 활용합니다.

</div>

전체 코드는 이렇게 구성할 수 있습니다:

<code-example header="src/app/highlight.directive.ts" path="attribute-directives/src/app/highlight.directive.2.ts"></code-example>

이제 사용자가 `<p>` 엘리먼트에 마우스를 올리면 배경색이 변경되며, 마우스가 엘리먼트 밖으로 이동하면 배경색이 해제됩니다.

<div class="lightbox">

<img alt="Second Highlight" src="generated/images/guide/attribute-directives/highlight-directive-anim.gif">

</div>


<a id="bindings"></a>

<!--
## Passing values into an attribute directive
-->
## 어트리뷰트 디렉티브에 값 전달하기

<!--
This section walks you through setting the highlight color while applying the `HighlightDirective`.

1.  In `highlight.directive.ts`, import `Input` from `@angular/core`.

    <code-example header="src/app/highlight.directive.ts (imports)" path="attribute-directives/src/app/highlight.directive.3.ts" region="imports"></code-example>

1.  Add an `appHighlight` `@Input()` property.

    <code-example header="src/app/highlight.directive.ts" path="attribute-directives/src/app/highlight.directive.3.ts" region="input"></code-example>

    The `@Input()` decorator adds metadata to the class that makes the directive's `appHighlight` property available for binding.

1.  In `app.component.ts`, add a `color` property to the `AppComponent`.

    <code-example header="src/app/app.component.ts (class)" path="attribute-directives/src/app/app.component.1.ts" region="class"></code-example>

1.  To simultaneously apply the directive and the color, use property binding with the `appHighlight` directive selector, setting it equal to `color`.

    <code-example header="src/app/app.component.html (color)" path="attribute-directives/src/app/app.component.html" region="color"></code-example>

    The `[appHighlight]` attribute binding performs two tasks:

    *   Applies the highlighting directive to the `<p>` element
    *   Sets the directive's highlight color with a property binding
-->
이번 섹션에서는 `HighlightDirective`에 적용할 색상을 전달하는 방식으로 구현해 봅시다.

1.  `highlight.directive.ts` 파일에서 `@angular/core` 패키지로 제공되는 `Input` 심볼을 로드합니다.

    <code-example header="src/app/highlight.directive.ts (심볼 로드하기)" path="attribute-directives/src/app/highlight.directive.3.ts" region="imports"></code-example>

1.  `appHighlight` `@Input()` 프로퍼티르 추가합니다.

    <code-example header="src/app/highlight.directive.ts" path="attribute-directives/src/app/highlight.directive.3.ts" region="input"></code-example>

    `@Input()` 데코레이터를 추가하면 이제 디렉티브의 `appHighlight` 프로퍼티를 외부와 바인딩 할 수 있습니다.

1.  `app.component.ts` 파일에서 `AppComponent` 클래스에 `color` 프로퍼티를 추가합니다.

    <code-example header="src/app/app.component.ts (클래스)" path="attribute-directives/src/app/app.component.1.ts" region="class"></code-example>

1.  이제 디렉티브를 사용하면서 색상을 지정하려면 프로퍼티 바인딩 문법을 활용해서 `appHighlight` 디렉티브 셀렉터에 `color`를 지정하면 됩니다.

    <code-example header="src/app/app.component.html (color)" path="attribute-directives/src/app/app.component.html" region="color"></code-example>

    `[appHighlight]` 어트리뷰트 바인딩은 두가지 동작을 합니다:

    *   `<p>` 엘리먼트에 하이라이트 디렉티브를 적용합니다.
    *   디렉티브의 하이라이트 색상을 프로퍼티 바인딩으로 지정합니다.


<!--
### Setting the value with user input
-->
### 사용자가 선택하는 방식으로 구현하기

<!--
This section guides you through adding radio buttons to bind your color choice to the `appHighlight` directive.

1.  Add markup to `app.component.html` for choosing a color as follows:

    <code-example header="src/app/app.component.html (v2)" path="attribute-directives/src/app/app.component.html" region="v2"></code-example>

1.  Revise the `AppComponent.color` so that it has no initial value.

    <code-example header="src/app/app.component.ts (class)" path="attribute-directives/src/app/app.component.ts" region="class"></code-example>

1.  In `highlight.directive.ts`, revise `onMouseEnter` method so that it first tries to highlight with `appHighlight` and falls back to `red` if `appHighlight` is `undefined`.

    <code-example header="src/app/highlight.directive.ts (mouse-enter)" path="attribute-directives/src/app/highlight.directive.3.ts" region="mouse-enter"></code-example>

1.  Serve your application to verify that the user can choose the color with the radio buttons.

    <div class="lightbox">

    <img alt="Animated gif of the refactored highlight directive changing color according to the radio button the user selects" src="generated/images/guide/attribute-directives/highlight-directive-v2-anim.gif">

    </div>
-->
이번 섹션에서는 라디오 버튼을 활용해서 `appHighlight` 디렉티브에 적용될 색상을 사용자가 고르도록 구현해 봅시다.

1.  `app.component.html` 엘리먼트에 이런 마크업을 추가합니다:

    <code-example header="src/app/app.component.html (v2)" path="attribute-directives/src/app/app.component.html" region="v2"></code-example>

1.  `AppComponent.color`의 초기값을 빈 값으로 지정합니다.

    <code-example header="src/app/app.component.ts (클래스)" path="attribute-directives/src/app/app.component.ts" region="class"></code-example>

1.  `highlight.directive.ts` 파일의 `onMouseEnter()` 메서드에 `appHighlight` 값이 지정되지 않으면 `red` 색상을 사용하도록 코드를 수정합니다.

    <code-example header="src/app/highlight.directive.ts (마우스 진입 핸들러)" path="attribute-directives/src/app/highlight.directive.3.ts" region="mouse-enter"></code-example>

1.  애플리케이션을 실행해서 라디오 버튼이 동작하는 것을 확인해 보세요.

    <div class="lightbox">

    <img alt="Animated gif of the refactored highlight directive changing color according to the radio button the user selects" src="generated/images/guide/attribute-directives/highlight-directive-v2-anim.gif">

    </div>


<a id="second-property"></a>

<!--
## Binding to a second property
-->
## 두번째 인자 바인딩하기

<!--
This section guides you through configuring your application so the developer can set the default color.

1.  Add a second `Input()` property to `HighlightDirective` called `defaultColor`.

    <code-example header="src/app/highlight.directive.ts (defaultColor)" path="attribute-directives/src/app/highlight.directive.ts" region="defaultColor"></code-example>

1.  Revise the directive's `onMouseEnter` so that it first tries to highlight with the `appHighlight`, then with the `defaultColor`, and falls back to `red` if both properties are `undefined`.

    <code-example header="src/app/highlight.directive.ts (mouse-enter)" path="attribute-directives/src/app/highlight.directive.ts" region="mouse-enter"></code-example>

1.  To bind to the `AppComponent.color` and fall back to "violet" as the default color, add the following HTML.
    In this case,  the `defaultColor` binding doesn't use square brackets, `[]`, because it is static.

    <code-example header="src/app/app.component.html (defaultColor)" path="attribute-directives/src/app/app.component.html" region="defaultColor"></code-example>

    As with components, you can add multiple directive property bindings to a host element.

The default color is red if there is no default color binding.
When the user chooses a color the selected color becomes the active highlight color.

<div class="lightbox">

<img alt="Animated gif of final highlight directive that shows red color with no binding and violet with the default color set. When user selects color, the selection takes precedence." src="generated/images/guide/attribute-directives/highlight-directive-final-anim.gif">

</div>
-->
이번 섹션에서는 기본색상을 지정하는 기능을 추가해 봅시다.

1.  `Highlight` 디렉티브에 두번째 `Input()` 프로퍼티 `defaultColor`를 추가합니다.

    <code-example header="src/app/highlight.directive.ts (defaultColor)" path="attribute-directives/src/app/highlight.directive.ts" region="defaultColor"></code-example>

1.  디렉티브의 `onMouseEnter` 메서드를 수정해서 `appHighlight` 값이 없으면 `defaultColor` 색상으로, `defaultColor` 값도 없으면 `red` 색상을 사용하도록 수정합니다.

    <code-example header="src/app/highlight.directive.ts (마우스 진입 핸들러)" path="attribute-directives/src/app/highlight.directive.ts" region="mouse-enter"></code-example>

1.  이제 `AppComponent.color`의 기본값을 "violet"으로 지정해 봅시다.
    이 때 `defaultColor`의 값은 변경하지 않기 때문에 대괄호(`[]`)를 사용해서 바인딩합니다.

    <code-example header="src/app/app.component.html (defaultColor)" path="attribute-directives/src/app/app.component.html" region="defaultColor"></code-example>

    이런 방식을 활용하면 디렉티브의 프로퍼티들을 호스트 엘리먼트에서 지정할 수 있습니다.

기본 색상이 지정되지 않으면 배경색은 빨간색으로 변경됩니다.
엘리먼트에 마우스를 올려보면서 배경색이 변경되는 것을 확인해 보세요.

<div class="lightbox">

<img alt="Animated gif of final highlight directive that shows red color with no binding and violet with the default color set. When user selects color, the selection takes precedence." src="generated/images/guide/attribute-directives/highlight-directive-final-anim.gif">

</div>


<a id="ngNonBindable"></a>

<!--
## Deactivating Angular processing with `NgNonBindable`
-->
## `NgNonBindable` 활용하기

<!--
To prevent expression evaluation in the browser, add `ngNonBindable` to the host element.
`ngNonBindable` deactivates interpolation, directives, and binding in templates.

In the following example, the expression `{{ 1 + 1 }}` renders just as it does in your code editor, and does not display `2`.

<code-example header="src/app/app.component.html" linenums="false" path="attribute-directives/src/app/app.component.html" region="ngNonBindable"></code-example>

Applying `ngNonBindable` to an element stops binding for that element's child elements.
However, `ngNonBindable` still lets directives work on the element where you apply `ngNonBindable`.
In the following example, the `appHighlight` directive is still active but Angular does not evaluate the expression `{{ 1 + 1 }}`.

<code-example header="src/app/app.component.html" linenums="false" path="attribute-directives/src/app/app.component.html" region="ngNonBindable-with-directive"></code-example>

If you apply `ngNonBindable` to a parent element, Angular disables interpolation and binding of any sort, such as property binding or event binding, for the element's children.
-->
브라우저에서 표현식이 평가되는 것을 막으려면 호스트 엘리먼트에 `ngNonBindable`을 추가하면 됩니다.
`ngNonBindable`을 사용하면 템플릿에 적용된 문자열 바인딩, 바인딩 표현식을 실행하지 않습니다.

그래서 아래 예제에 사용한 `{{ 1 + 1 }}` 표현식은 평가되지 않으며 화면에 표시되는 결과도 `2`가 아닙니다.

<code-example header="src/app/app.component.html" linenums="false" path="attribute-directives/src/app/app.component.html" region="ngNonBindable"></code-example>

엘리먼트에 `ngNonBindable`을 추가하면 엘리먼트의 자식 엘리먼트에도 바인딩이 적용되지 않습니다.
하지만 디렉티브는 영향을 받지 않습니다.
아래 예제 코드를 보면 `{{ 1 + 1 }}` 표현식은 평가되지 않지만, `appHighlight` 디렉티브는 여전히 동작합니다.

<code-example header="src/app/app.component.html" linenums="false" path="attribute-directives/src/app/app.component.html" region="ngNonBindable-with-directive"></code-example>

부모 엘리먼트에 `ngNonBindable`을 추가하면 Angular는 프로퍼티 바인딩, 이벤트 바인딩, 자식 엘리먼트의 마인딩을 모두 중단시킵니다.


<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
