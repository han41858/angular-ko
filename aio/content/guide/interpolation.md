<!--
# Text interpolation
-->
# 문자열 바인딩(Text interpolation)

<!--
Text interpolation lets you incorporate dynamic string values into your HTML templates.
Use interpolation to dynamically change what appears in an application view, such as displaying a custom greeting that includes the user's name.

<div class="alert is-helpful">

See the <live-example></live-example> for all of the syntax and code snippets in this guide.

</div>
-->
문자열 바인딩을 활용하면 HTML 템플릿에 문자열을 동적으로 반영할 수 있습니다.
그래서 사용자의 이름을 넣어서 환영 문구를 표시하는 방식으로 애플리케이션 화면의 내용을 동적으로 변경할 수 있습니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제 앱은 <live-example></live-example>에서 직접 실행하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Displaying values with interpolation
-->
## 문자열 값 표시하기

<!--
Interpolation refers to embedding expressions into marked up text.
By default, interpolation uses the double curly braces `{{` and `}}`  as delimiters.

To illustrate how interpolation works, consider an Angular component that contains a `currentCustomer` variable:

<code-example path="interpolation/src/app/app.component.ts" region="customer" header="src/app/app.component.ts"></code-example>

Use interpolation to display the value of this variable in the corresponding component template:

<code-example path="interpolation/src/app/app.component.html" region="interpolation-example1" header="src/app/app.component.html"></code-example>

Angular replaces `currentCustomer` with the string value of the corresponding component property.
In this case, the value is `Maria`.

In the following example, Angular evaluates the `title` and `itemImageUrl` properties to display some title text and an image.

<code-example path="interpolation/src/app/app.component.html" region="component-property" header="src/app/app.component.html"></code-example>
-->
문자열 바인딩(interpolation)은 표현식 안에 문자열을 넣는 것을 의미합니다.
기본적으로 문자열 바인딩은 이중 중괄호(`{{`, `}}`) 를 구분자로 사용합니다.

문자열 바인딩이 동작하는 것을 확인하기 위해 Angular 컴포넌트 안에 `currentCustomer` 라는 프로퍼티가 있다고 합시다:

<code-example path="interpolation/src/app/app.component.ts" region="customer" header="src/app/app.component.ts"></code-example>

이 프로퍼티 값을 템플릿에 표시하려면 이렇게 작성하면 됩니다:

<code-example path="interpolation/src/app/app.component.html" region="interpolation-example1" header="src/app/app.component.html"></code-example>

그러면 Angular가 `currentCustomer` 라는 표현식을 프로퍼티의 값으로 대체합니다.
이 예제에서는 `Maria`로 대체됩니다.

같은 방식으로 이미지의 제목과 URL을 바인딩하려면 `title` 프로퍼티와 `itemImageUrl` 프로퍼티를 이렇게 바인딩하면 됩니다:

<code-example path="interpolation/src/app/app.component.html" region="component-property" header="src/app/app.component.html"></code-example>


{@a template-expressions}
<!--
## Template expressions
-->
## 템플릿 표현식(Template expressions)

<!--
A template **expression** produces a value and appears within double curly braces, `{{ }}`.
Angular resolves the expression and assigns it to a property of a binding target.
The target could be an HTML element, a component, or a directive.

### Resolving expressions with interpolation

More generally, the text between the braces is a template expression that Angular first evaluates and then converts to a string.
The following interpolation illustrates the point by adding two numbers:

<code-example path="interpolation/src/app/app.component.html" region="convert-string" header="src/app/app.component.html"></code-example>

Expressions can also invoke methods of the host component such as `getVal()` in the following example:

<code-example path="interpolation/src/app/app.component.html" region="invoke-method" header="src/app/app.component.html"></code-example>

With interpolation, Angular performs the following tasks:

1. Evaluates all expressions in double curly braces.
1. Converts the expression results to strings.
1. Links the results to any adjacent literal strings.
1. Assigns the composite to an element or directive property.

<div class="alert is-helpful">

Configure the interpolation delimiter with the [interpolation](api/core/Component#interpolation) option in the `@Component()` metadata.

</div>
-->
템플릿 **표현식** 은 이중 중괄호 `{{ }}`를 사용해서 어떤 값을 만들어 내는 문법입니다.
Angular는 이런 표현식의 평가 결과를 바인딩 대상의 프로퍼티로 할당합니다.
이 때 바인딩 대상은 HTML 엘리먼트나 컴포넌트, 디렉티브가 될 수 있습니다.


<!--
### Resolving expressions with interpolation
-->
### 표현식 계산 과정

<!--
More generally, the text between the braces is a template expression that Angular first evaluates and then converts to a string.
The following interpolation illustrates the point by adding two numbers:

<code-example path="interpolation/src/app/app.component.html" region="convert-string" header="src/app/app.component.html"></code-example>

Expressions can also invoke methods of the host component such as `getVal()` in the following example:

<code-example path="interpolation/src/app/app.component.html" region="invoke-method" header="src/app/app.component.html"></code-example>

With interpolation, Angular performs the following tasks:

1. Evaluates all expressions in double curly braces.
1. Converts the expression results to strings.
1. Links the results to any adjacent literal strings.
1. Assigns the composite to an element or directive property.

<div class="alert is-helpful">

You can configure the interpolation delimiter with the [interpolation](api/core/Component#interpolation) option in the `@Component()` metadata.

</div>
-->
좀 더 자세하게 설명하면, Angular는 이중 중괄호 안에 사용된 문자열을 가장 먼저 평가해서 문자열로 결정합니다.
숫자 두 개를 더하는 과정을 자세하게 분석해 봅시다:

<code-example path="interpolation/src/app/app.component.html" region="convert-string" header="src/app/app.component.html"></code-example>

표현식에서는 `getVal()`과 같은 호스트 컴포넌트의 메서드를 실행할 수도 있습니다:

<code-example path="interpolation/src/app/app.component.html" region="invoke-method" header="src/app/app.component.html"></code-example>

Angular는 문자열 바인딩을 이렇게 처리합니다:

1. 이중 중괄호 안에 있는 표현식을 모두 평가합니다.
1. 표현식의 결과를 문자열로 변환합니다.
1. 표현식 평가 결과를 주변 문자열과 결합합니다.
1. 결합된 결과를 엘리먼트/디렉티브 프로퍼티로 할당합니다.

<div class="alert is-helpful">

문자열 바인딩 문법의 구분기호는 `@Component` 메타데이터의 [interpolation](api/core/Component#interpolation) 옵션으로 변경할 수 있습니다.

</div>



<!--
### Syntax
-->
### 문법

<!--
Template expressions are similar to JavaScript.
Many JavaScript expressions are legal template expressions, with the following exceptions.

You can't use JavaScript expressions that have or promote side effects, including:

* Assignments (`=`, `+=`, `-=`, `...`)
* Operators such as `new`, `typeof`, or `instanceof`
* Chaining expressions with <code>;</code> or <code>,</code>
* The increment and decrement operators `++` and `--`
* Some of the ES2015+ operators

Other notable differences from JavaScript syntax include:

* No support for the bitwise operators such as `|` and `&`
* New [template expression operators](guide/template-expression-operators), such as `|`, `?.` and `!`
-->
템플릿 표현식은 JavaScript 문법과 비슷합니다.
그래서 JavaScript 표현식은 대부분 그대로 템플릿 표현식으로 사용할 수 있지만, 일부 문법은 예외입니다.

표현식 외부에 영향을 미치거나 미칠 가능성이 있는 이런 표현들은 사용할 수 없습니다:

* 값을 할당하는 표현 (`=`, `+=`, `-=`, `...`)
* `new`, `typeof`, `instanceof` 연산자
* <code>;</code>나 <code>,</code>를 사용해서 표현식을 여러 번 사용하는 표현
* `++`, `--`와 같은 증감 연산자
* ES2015 이상에서 지원하는 연산자 일부

그리고 JavaScript 문법에서 지원하는 것과는 이런 점이 다릅니다:

* `|`, `&`와 같은 비트 연산자는 사용할 수 없습니다.
* `|`, `?.`, `!`와 같은 [템플릿 표현식 연산자](guide/template-expression-operators)를 사용할 수 있습니다.


<!--
## Expression context
-->
## 표현식의 컨텍스트

<!--
Interpolated expressions have a context&mdash;a particular part of the application to which the expression belongs.
Typically, this context is the component instance.

In the following snippet, the expression `recommended` and the expression `itemImageUrl2` refer to properties of the `AppComponent`.

<code-example path="interpolation/src/app/app.component.html" region="component-context" header="src/app/app.component.html"></code-example>

An expression can also refer to properties of the _template's_ context such as a [template input variable](guide/structural-directives#shorthand) or a [template reference variable](guide/template-reference-variables).

The following example uses a template input variable of `customer`.

<code-example path="interpolation/src/app/app.component.html" region="template-input-variable" header="src/app/app.component.html (template input variable)"></code-example>

This next example features a template reference variable, `#customerInput`.

<code-example path="interpolation/src/app/app.component.html" region="template-reference-variable" header="src/app/app.component.html (template reference variable)"></code-example>

<div class="alert is-helpful">

Template expressions cannot refer to anything in the global namespace, except `undefined`.
They can't refer to `window` or `document`.
Additionally, they can't call `console.log()` or `Math.max()` and they are restricted to referencing members of the expression context.

</div>
-->
문자열 바인딩 표현식에는 컨텍스트가 존재합니다.
이 때 컨텍스트는 애플리케이션의 일부 영역을 의미하며, 일반적으로 컴포넌트 인스턴스 범위가 됩니다.

아래 예제 코드에서 표현식 안에 있는 `recommended`와 `itemImageUrl2`는 모두 `AppComponent`에 있는 프로퍼티를 가리키는 것입니다.

<code-example path="interpolation/src/app/app.component.html" region="component-context" header="src/app/app.component.html"></code-example>

[템플릿 입력 변수](guide/structural-directives#shorthand)나 [템플릿 참조 변수](guide/template-reference-variables)를 사용하면 _템플릿_ 안에만 존재하는 프로퍼티를 참조할 수도 있습니다.

아래 예제 코드에 사용된 `customer`는 템플릿 입력 변수를 의미합니다.

<code-example path="interpolation/src/app/app.component.html" region="template-input-variable" header="src/app/app.component.html (템플릿 입력 변수)"></code-example>

그리고 아래 예제 코드에서 `#customerInput`은 템플릿 참조 변수를 의미합니다.

<code-example path="interpolation/src/app/app.component.html" region="template-reference-variable" header="src/app/app.component.html (템플릿 참조 변수)"></code-example>

<div class="alert is-helpful">

템플릿 표현식은 `undefined` 외에는 전역 네임스페이스에 있는 `window`나 `document`와 같은 객체를 참조할 수 없습니다.
그리고 표현식 컨텍스트 범위를 넘어가는 `console.log()`나 `Math.max()`와 같은 함수도 실행할 수 없습니다.

</div>


<!--
### Preventing name collisions
-->
### 이름 충돌 방지하기

<!--
The context against which an expression evaluates is the union of the template variables, the directive's context object&mdash;if it has one&mdash;and the component's members.
If you reference a name that belongs to more than one of these namespaces, Angular applies the following logic to determine the context:

1. The template variable name.
1. A name in the directive's context.
1. The component's member names.

To avoid variables shadowing variables in another context, keep variable names unique.
In the following example, the `AppComponent` template greets the `customer`, Padma.

An `ngFor` then lists each `customer` in the `customers` array.

<code-example path="interpolation/src/app/app.component.1.ts" region="var-collision" header="src/app/app.component.ts"></code-example>

The `customer` within the `ngFor` is in the context of an `<ng-template>` and so refers to the `customer` in the `customers` array, in this case Ebony and Chiho.
This list does not feature Padma because `customer` outside of the `ngFor` is in a different context.
Conversely, `customer` in the `<h1>` doesn't include Ebony or Chiho because the context for this `customer` is the class and the class value for `customer` is Padma.
-->
표현식이 평가되는 컨텍스트는 템플릿 변수, 디렉티브 컨텍스트 객체, 컴포넌트 멤버가 조합되어 구성됩니다.
그래서 템플릿 표현식에서 사용하는 이름이 네임스페이스에서 한 곳 이상 겹치면 이런 순서로 참조 객체를 결정합니다:

1. 템플릿 변수 이름 중에서
1. 디렉티브 컨텍스트 안에서
1. 컴포넌트 멤버 중에서

그래서 다른 컨텍스의 영향을 받아 변수가 가려지는 상황을 방지하려면 네임스페이스와 관게없이 변수의 이름을 겹치지 않게 지정해야 합니다.
아래 예제에서 `AppComponent` 템플릿에 있는 `customer`는 컴포넌트 클래스에 있는 Padma 값이 들어갑니다.

그리고 `customers` 배열을 순회할 때 사용하는`customer`는 `ngFor`로 반복되는 개별 객체를 의미합니다.

<code-example path="interpolation/src/app/app.component.1.ts" region="var-collision" header="src/app/app.component.ts"></code-example>

`ngFor` 안에 있는 `customer`는 `<ng-template>` 컨텍스트 안에 존재하기 때문에 `customers` 배열의 개별 항목을 반환하며, 이 예제에서는 Ebony와 Chiho를 표시합니다.
하지만 `ngFor`가 순회하는 배열 안에는 Padma가 존재하지 않습니다.
Padma를 표시할 때 사용한 `customer`는 `ngFor` 바깥에 있는 다른 컨텍스트입니다.
`<h1>`에 사용된 `customer`는 컴포넌트 클래스에서 Padma라고 선언된 `customer` 프로퍼티를 가리킵니다.


<!--
## Expression best practices
-->
## 모범 사례

<!--
When using template expressions, follow these best practices:

* **Use short expressions**

  Use property names or method calls whenever possible.
  Keep application and business logic in the component, where it is accessible to develop and test.

* **Quick execution**

  Angular executes template expressions after every [change detection](guide/glossary#change-detection) cycle.
  Many asynchronous activities trigger change detection cycles, such as promise resolutions, HTTP results, timer events, key presses and mouse moves.

  Expressions should finish quickly to keep the user experience as efficient as possible, especially on slower devices.
  Consider caching values when their computation requires greater resources.

* **No visible side effects**

  According to Angular's [unidirectional data flow model](guide/glossary#unidirectional-data-flow), a template expression should not change any application state other than the value of the target property.
  Reading a component value should not change some other displayed value.
  The view should be stable throughout a single rendering pass.

  <div class="callout is-important">
    <header>Idempotent expressions reduce side effects</header>

    An [idempotent](https://en.wikipedia.org/wiki/Idempotence) expression is free of side effects and improves Angular's change detection performance.
    In Angular terms, an idempotent expression always returns *exactly the same thing* until one of its dependent values changes.

    Dependent values should not change during a single turn of the event loop.
    If an idempotent expression returns a string or a number, it returns the same string or number if you call it twice consecutively.
    If the expression returns an object, including an `array`, it returns the same object *reference* if you call it twice consecutively.

  </div>

  <div class="alert is-important">

  There is one exception to this behavior that applies to `*ngFor`.
  `*ngFor` has `trackBy` functionality that can deal with changing values in objects when iterating over them.
  See [*ngFor with `trackBy`](guide/built-in-directives#ngfor-with-trackby) for details.

  </div>
-->
템플릿 표현식은 이렇게 작성하는 것이 좋습니다:

* **짧게 작성하세요.**

  프로퍼티 이름이나 메서드 실행만 하는 정도가 좋습니다.
  애플리케이션 로직이나 비즈니스 로직은 컴포넌트 클래스에 작성하세요.
  그래야 개발하기 쉽고 테스트하기도 쉽습니다.

* **간단하게 실행되도록 작성하세요.**

  Angular는 [변화 감지](guide/glossary#change-detection) 싸이클마다 템플릿 표현식을 실행합니다.
  그리고 Promise 처리, HTTP 이벤트, 타이머 이벤트, 키 입력 이벤트나 마우스 이동과 같은 비동기 작업들도 변화 감지 싸이클을 다시 실행시킵니다.

  그래서 표현식은 사용자가 불편함을 느끼지 않을 정도로 간단하게 실행되어야 합니다.
  이 내용은 디바이스 성능이 낮을수록 더 중요합니다.
  표현식이 실행되는 시간이 길다면 캐싱을 하는 방법도 고려해 보세요.

* **사이드 이펙트 최소화**

  Angular의 [단방향 데이터 흐름 모델](guide/glossary#unidirectional-data-flow)에 따르면, 템플릿 표현식은 변경하려고 하는 대상 외에는 어떠한 것도 변경하지 않는 것이 좋습니다.
  컴포넌트 프로퍼티의 값을 읽는 동작이 다른 값을 변경하면 안됩니다.
  화면은 렌더링이 한 번 끝나고 난 후에 안정된 상태가 되어야 합니다.

  <div class="callout is-important">
    <header>멱등(idempotent) 표현식은 사이드 이펙트를 줄일 수 있습니다.</header>

    [멱등](https://en.wikipedia.org/wiki/Idempotence) 표현식을 작성하면 사이드 이펙트를 최소화할 수 있으며 Angular의 변화 감지 성능도 향상시킬 수 있습니다.
    Angular의 관점에서 이야기하는 "멱등 표현식"은 것은 관련 값이 변경되지 않는 한 *언제나 같은 값을 반환하는 표현식* 을 의미합니다.

    그리고 표현식과 관련된 값들도 이벤트 루프가 한 번 실행되는 동안 변경되면 안됩니다.
    멱등 표현식은 문자열이나 숫자를 반환하는데, 이 표현식이 정말 멱등이라면 이 표현식이 다시 한 번 실행되어도 같은 문자열이나 같은 숫자 값을 반환해야 합니다.
    표현식이 객체나 배열을 반환한다면, 다시 한 번 실행되어도 같은 객체 *참조* 를 반환해야 합니다.

  </div>

  <div class="alert is-important">

  `*ngFor`를 사용하는 경우는 예외입니다.
  `*ngFor`의 `trackBy` 기능을 사용하면 객체를 순회할 때 이 객체가 이전과 변경되었는지 결정하는 로직을 추가로 지정할 수 있습니다.
  자세한 내용은 [*ngFor에 `trackBy` 사용하기](guide/built-in-directives#ngfor-with-trackby) 문서를 참고하세요.

  </div>
