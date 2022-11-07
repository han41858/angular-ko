<!--
# Understanding binding
-->
# 바인딩 이해하기

<!--
In an Angular template, a binding creates a live connection between a part of the UI created from a template (a DOM element, directive, or component) and the model (the component instance to which the template belongs). This connection can be used to synchronize the view with the model, to notify the model when an event or user action takes place in the view, or both. Angular's [Change Detection](guide/change-detection) algorithm is responsible for keeping the view and the model in sync.

Examples of binding include:

* text interpolations
* property binding
* event binding
* two-way binding

Bindings always have two parts: a _target_ which will receive the bound value, and a _template expression_ which produces a value from the model.
-->
Angular 템플릿 안에서 바인딩을 활용하면 템플릿의 UI 조각(DOM 에릴먼트, 디렉티브, 컴포넌트)와 모델(템플릿와 연결된 컴포넌트 인스턴스)을 연결할 수 있습니다.
이 때 모델과 화면을 동기적으로 연결할 수 있고, 화면에서 이벤트가 발생했을 때 모델에 알릴 수 있으며, 그 반대 방향도 가능합니다.
이 역할은 Angular가 제공하는 [변화 감지](guide/change-detection) 알고리즘이 담당합니다.

바인딩 종류에는 이런 것들이 있습니다:

* 문자열 바인딩
* 프로퍼티 바인딩
* 이벤트 바인딩
* 양방향 바인딩

바인딩은 바인딩 된 값을 받을 _대상(target)_ 과 모델에서 값을 전달하는 _템플릿 표현식_ 으로 구성합니다.


<!--
## Syntax
-->
## 문법

<!--
Template expressions are similar to JavaScript expressions.
Many JavaScript expressions are legal template expressions, with the following exceptions.

You can't use JavaScript expressions that have or promote side effects, including:

* Assignments (`=`, `+=`, `-=`, `...`)
* Operators such as `new`, `typeof`, or `instanceof`
* Chaining expressions with <code>;</code> or <code>,</code>
* The increment and decrement operators `++` and `--`
* Some of the ES2015+ operators

Other notable differences from JavaScript syntax include:

* No support for the bitwise operators such as `|` and `&`
* New [template expression operators](guide/template-expression-operators), such as `|`
-->
템플릿 표현식은 JavaScript 표현식과 비슷합니다.
JavaScript 표현식은 대부분 템플릿 표현식으로 사용할 수 있지만, 예외가 몇가지 있습니다.

이런 JavaScript 표현식은 사용할 수 없습니다:

* 할당 연산자 (`=`, `+=`, `-=`, `...`)
* `new`, `typeof`, `instanceof` 연산자
* <code>;</code>, <code>,</code> 같은 체이닝 표현식
* 증감 연산자 `++`, `--`
* ES2015+ 연산자 중 일부

그리고 이런 점은 JavaScript 문법과 다릅니다:

* 비트 연산자 `|`, `&`는 지원하지 않습니다.
* `|`는 [템플릿 표현식 연산자](guide/template-expression-operators)로 다른 기능을 제공합니다.


<!--
## Expression context
-->
## 표현식의 컨텍스트

<!--
Interpolated expressions have a context&mdash;a particular part of the application to which the expression belongs.  Typically, this context is the component instance.

In the following snippet, the expression `recommended` and the expression `itemImageUrl2` refer to properties of the `AppComponent`.

<code-example path="interpolation/src/app/app.component.html" region="component-context" header="src/app/app.component.html"></code-example>

An expression can also refer to properties of the _template's_ context such as a [template input variable](guide/structural-directives#shorthand) or a [template reference variable](guide/template-reference-variables).

The following example uses a template input variable of `customer`.

<code-example path="interpolation/src/app/app.component.html" region="template-input-variable" header="src/app/app.component.html (template input variable)"></code-example>

This next example features a template reference variable, `#customerInput`.

<code-example path="interpolation/src/app/app.component.html" region="template-reference-variable" header="src/app/app.component.html (template reference variable)"></code-example>

<div class="alert is-helpful">

Template expressions cannot refer to anything in the global namespace, except `undefined`.  They can't refer to `window` or `document`.  Additionally, they can't call `console.log()` or `Math.max()` and are restricted to referencing members of the expression context.

</div>
-->
템플릿에 사용되는 표현식은 독립적인 컨텍스트\(context\)를 갖습니다.
일반적으로 이 컨텍스트는 컴포넌트의 인스턴스 범위입니다.

그래서 아래 코드에서 `recommended`와 `itemImageUrl2`는 `AppComponent` 안에 있는 프로퍼티를 가리킵니다.

<code-example path="interpolation/src/app/app.component.html" region="component-context" header="src/app/app.component.html"></code-example>

표현식은 _템플릿 안쪽_ 컨텍스트에 있는 [템플릿 입력 변수](guide/structural-directives#shorthand)나 [템플릿 참조 변수](guide/template-reference-variables)를 참조할 수 있습니다.

아래 코드에서 `customer`는 템플릿 입력 변수입니다.

<code-example path="interpolation/src/app/app.component.html" region="template-input-variable" header="src/app/app.component.html (템플릿 입력 변수)"></code-example>

그리고 아래 코드에서 `#customerInput`은 템플릿 참조 변수입니다.

<code-example path="interpolation/src/app/app.component.html" region="template-reference-variable" header="src/app/app.component.html (템플릿 참조 변수)"></code-example>

<div class="alert is-helpful">

템플릿 표현식은 `undefined` 외의 전역 네임스페이스를 참조할 수 없습니다.
그래서 `window`나 `document`도 참조할 수 없습니다.
그리고 `console.log()`, `Math.max()`라는 표현식은 사용할 수 없습니다.

</div>


<!--
### Preventing name collisions
-->
### 이름 충돌 방지

<!--
The context against which an expression evaluates is the union of the template variables, the directive's context object&mdash;if it has one&mdash;and the component's members.
If you reference a name that belongs to more than one of these namespaces, Angular applies the following precedence logic to determine the context:

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
템플릿 표현식이 실행되는 컨텍스트 안에서는 템플릿 변수, 디렉티브의 컨텍스트 객체, 컴포넌트 멤버 이름이 충돌할 수 있습니다.
그래서 이들 안에서 같은 이름을 사용하면 아래 우선순위에 따라 참조되는 항목을 결정합니다:

1. 템플릿 변수
1. 디렉티브 컨텍스트 안에서
1. 컴포넌트 멤버

그래서 잠재적인 문제를 방지하려면 이름을 서로 다르게 지어야 합니다.
아래 예제에서 `AppComponent` 템플릿에 사용된 `customer`는 Padma를 가리키려고 합니다.

그런데 이 템플릿에는 `customers` 배열을 `ngFor`로 순회하며 할당되는 `customer` 변수가 존재합니다.

<code-example path="interpolation/src/app/app.component.1.ts" region="var-collision" header="src/app/app.component.ts"></code-example>

그러면 `ngFor` 안에서 사용하는 `customer`는 `<ng-template>` 컨텍스트 안에 존재하기 때문에 `customers` 배역에 있는 항목을 가리키며, 이 예제에서는 Ebony와 Chiho를 가리킵니다.
하지만 `ngFor` 밖에 있는 `customer`는 컨텍슷트가 다르기 때문에 Padma를 가리킵니다.
반대로, `<h1>` 안에 있는 `customer`는 컴포넌트 클래스에 있는 `customer`를 가리키기 때문에 Ebony나 Chiho와 같은 값이 될 수 없습니다.


<!--
## Expression best practices
-->
## 모범사례

<!--
When using template a expression, follow these best practices:

* **Use short expressions**

Use property names or method calls whenever possible.  Keep application and business logic in the component, where it is accessible to develop and test.

* **Quick execution**

Angular executes a template expression after every [change detection](guide/glossary#change-detection) cycle.  Many asynchronous activities trigger change detection cycles, such as promise resolutions, HTTP results, timer events, key presses and mouse moves.

An expression should finish quickly to keep the user experience as efficient as possible, especially on slower devices.  Consider caching values when their computation requires greater resources.
-->
템플릿 표현식을 사용할 때는 이런 방식이 좋습니다:

* **최대한 간단하게**

프로퍼티를 이름으로 참조하거나 메서드 콜만 하는 것이 가장 좋습니다.
비즈니스 로직은 컴포넌트 클래스 안에 작성해야 개발하기도 좋고 테스트하기도 좋습니다.

* **빠르게 실행되도록**

Angular는 [변화 감지](guide/glossary#change-detection) 싸이클이 실행될 때마다 템플릿 표현식을 실행합니다.
그리고 Promise나 HTTP 응답, 타이머, 키입력, 마우스 움직임과 같은 비동기 작업이 많이 일어날 때마다 변화 감지 싸이클이 시작되면서 표현식도 다시 실행됩니다.

그래서 사용자가 화면을 조작하면서 불편함을 느끼지 않으려면 이런 표현식들은 최대한 빠르게 실행되는 것이 좋습니다.
연산이 많이 들어가는 작업이라면 캐싱하는 것도 고려해 보세요.


<!--
## No visible side effects
-->
## 부수효과를 피하세요.

<!--
According to Angular's [unidirectional data flow model](guide/glossary#unidirectional-data-flow), a template expression should not change any application state other than the value of the target property.  Reading a component value should not change some other displayed value.  The view should be stable throughout a single rendering pass.

  <div class="callout is-important">
    <header>Idempotent expressions reduce side effects</header>

An [idempotent](https://en.wikipedia.org/wiki/Idempotence) expression is free of side effects and improves Angular's change detection performance.  In Angular terms, an idempotent expression always returns *exactly the same thing* until one of its dependent values changes.

Dependent values should not change during a single turn of the event loop.  If an idempotent expression returns a string or a number, it returns the same string or number if you call it twice consecutively.  If the expression returns an object, including an `array`, it returns the same object *reference* if you call it twice consecutively.

  </div>
-->
Angular가 제안하는 [단방향 데이터 흐름 모델](guide/glossary#unidirectional-data-flow)에 따르면, 템플릿 표현식이 실행될 때 해당 프로퍼티 외에는 애플리케이션의 상태를 변경하지 않는 것이 좋습니다.
컴포넌트 값을 읽기만 했는데 다른 값이 변경되면 안됩니다.
그래야 화면 렌더링도 효율적이고 안정되게 처리할 수 있습니다.

  <div class="callout is-important">
    <header>멱등성(Idempotent)을 갖는 표현식이 부수효과를 줄일 수 있습니다.</header>

[멱등성(idempotent)](https://en.wikipedia.org/wiki/Idempotence) 표현식을 사용하면 부수효과를 피할 수 있으며 Angular의 변화 감지 성능도 최대한으로 끌어낼 수 있습니다.
Angular 안에서 멱등성을 갖는 표현식은, 주어지는 값이 같다면 *항상 같은 값을 반환하는* 표현식을 의미합니다.

그리고 관련된 값들은 이벤트 루프가 한 번 끝나기 전까지는 변경되지 않아야 합니다.
멱등성을 갖는 표현식은 문자열이나 숫자를 반환해야 하며, 이 표현식이 다시 실행되어도 같은 값을 반환해야 합니다.
표현식이 객체를 반환한다면, 다시 실행되어도 이전과 동일한 객체를 *참조* 하는 객체를 반환해야 합니다.

  </div>

<!--
 ## What's next
-->
## 다음 단계

<!--
* [Property binding](guide/property-binding)
* [Event binding](guide/event-binding)
-->
* [프로퍼티 바인딩]guide/property-binding)
* [이벤트 바인딩](guide/event-binding)

@reviewed 2022-05-12
