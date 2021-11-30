<!--
# Two-way binding
-->
# 양방향 바인딩(Two-way binding)

<!--
Two-way binding gives components in your application a way to share data.
Use two-way binding to listen for events and update values simultaneously between parent and child components.

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

</div>
-->
양방향 바인딩을 활용하면 컴포넌트끼리 데이터를 공유할 수 있습니다.
양방향 바인딩은 자식 컴포넌트에서 발생하는 이벤트를 감지하는 바인딩과 자식 컴포넌트에 데이터를 전달하는 프로퍼티 바인딩이 결합된 형태입니다.

<div class="alert is-helpful">

이 문서에서 설명하는 내용은 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Prerequisites
-->
## 사전지식

<!--
To get the most out of two-way binding, you should have a basic understanding of the following concepts:

* [Property binding](guide/property-binding)
* [Event binding](guide/event-binding)
* [Inputs and Outputs](guide/inputs-outputs)

<hr>

Two-way binding combines property binding with event binding:

* [Property binding](guide/property-binding) sets a specific element property.
* [Event binding](guide/event-binding) listens for an element change event.
-->
양방향 바인딩에 대해 제대로 이해하려면 이런 내용에 대해 이해하고 있는 것이 좋습니다:

* [프로퍼티 바인딩](guide/property-binding)
* [이벤트 바인딩](guide/event-binding)
* [입출력 프로퍼티](guide/inputs-outputs)

<hr>

양방향 바인딩은 프로퍼티 바인딩과 이벤트 바인딩이 결합된 것입니다:

* 엘리먼트 프로퍼티의 값을 지정하기 위해 [프로퍼티 바인딩](guide/property-binding)이 사용됩니다.
* 엘리먼트가 변경된 것을 감지하기 위해 [이벤트 바인딩](guide/event-binding)이 사용됩니다.


<!--
## Adding two-way data binding
-->
## 양방향 바인딩 추가하기

<!--
Angular's two-way binding syntax is a combination of square brackets and parentheses, `[()]`.
The `[()]` syntax combines the brackets of property binding, `[]`, with the parentheses of event binding, `()`, as follows.

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html" region="two-way-syntax"></code-example>
-->
Angular는 대괄호와 소괄호를 함께 사용하는 `[()]`라는 문법을 양방향 바인딩 문법으로 제공합니다.
이 문법은 프로퍼티 바인딩 문법(`[]`)과 이벤트 바인딩 문법(`()`)이 결합된 형태입니다.

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html" region="two-way-syntax"></code-example>


{@a how-two-way-binding-works}
<!--
## How two-way binding works
-->
## 양방향 바인딩이 동작하는 과정

<!--
For two-way data binding to work, the `@Output()` property must use the pattern, `inputChange`, where `input` is the name of the `@Input()` property.
For example, if the `@Input()` property is `size`, the `@Output()` property must be `sizeChange`.

The following `sizerComponent` has a `size` value property and a `sizeChange` event.
The `size` property is an `@Input()`, so data can flow into the `sizerComponent`.
The `sizeChange` event is an `@Output()`, which lets data flow out of the `sizerComponent` to the parent component.

Next, there are two methods, `dec()` to decrease the font size and `inc()` to increase the font size.
These two methods use `resize()` to change the value of the `size` property within min/max value constraints, and to emit an event that conveys the new `size` value.

<code-example path="two-way-binding/src/app/sizer/sizer.component.ts" region="sizer-component" header="src/app/sizer.component.ts"></code-example>

The `sizerComponent` template has two buttons that each bind the click event to the `inc()` and `dec()` methods.
When the user clicks one of the buttons, the `sizerComponent` calls the corresponding method.
Both methods, `inc()` and `dec()`, call the `resize()` method with a `+1` or `-1`, which in turn raises the `sizeChange` event with the new size value.

<code-example path="two-way-binding/src/app/sizer/sizer.component.html" header="src/app/sizer.component.html"></code-example>


In the `AppComponent` template, `fontSizePx` is two-way bound to the `SizerComponent`.

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html" region="two-way-1"></code-example>

In the `AppComponent`, `fontSizePx` establishes the initial `SizerComponent.size` value by setting the value to `16`.

<code-example path="two-way-binding/src/app/app.component.ts" header="src/app/app.component.ts" region="font-size"></code-example>

Clicking the buttons updates the `AppComponent.fontSizePx`.
The revised `AppComponent.fontSizePx` value updates the style binding, which makes the displayed text bigger or smaller.

The two-way binding syntax is shorthand for a combination of property binding and event binding.
The `SizerComponent` binding as separate property binding and event binding is as follows.

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html (expanded)" region="two-way-2"></code-example>

The `$event` variable contains the data of the `SizerComponent.sizeChange` event.
Angular assigns the `$event` value to the `AppComponent.fontSizePx` when the user clicks the buttons.

<div class="callout is-helpful">

  <header>Two-way binding in forms</header>

  Because no built-in HTML element follows the `x` value and `xChange` event pattern, two-way binding with form elements requires `NgModel`.
  For more information on how to use two-way binding in forms, see Angular [NgModel](guide/built-in-directives#ngModel).

</div>
-->
양방향 데이터 바인딩이 동작하려면 자식 컴포넌트에 `@Input()` 데코레이터가 지정된 프로퍼티가 있어야 하며, 이 프로퍼티 이름이 `input`이라면 `inputChange` 프로퍼티에 `@Output()` 데코레이터가 지정되어야 합니다.
예를 들면 `size` 프로퍼티에 `@Input()` 데코레이터가 지정되어 있어야 하며, `sizeChange` 프로퍼티에 `@Output()` 데코레이터가 지정되어 있어야 합니다.

아래 예제에서 `sizerComponent`에는 `size` 프로퍼티와 `sizeChange` 프로퍼티가 존재합니다.
이 프로퍼티 중 `size` 프로퍼티에는 `@Input()` 데코레이터가 지정되어 있기 때문에 데이터가 `sizerComponent` 안으로 전달될 수 있습니다.
그리고 `sizeChange` 프로퍼티에는 `@Output()` 데코레이터가 지정되어 있기 때문에 `sizerComponent`에서 부모 컴포넌트 방향으로 데이터가 전달될 수 있습니다.

`sizerComponent`에는 메서드가 3개 더 있습니다.
`dec()` 메서드는 폰트 크기를 줄이는 메서드이고, `inc()` 메서드는 폰트 크기를 키우는 메서드입니다.
두 메서드는 `resize()` 메서드를 활용해서 최소값/최대값 범위 안에서 `size` 프로퍼티 값을 조정하며, 새로 변경된 값으로 이벤트를 생성해서 보냅니다.

<code-example path="two-way-binding/src/app/sizer/sizer.component.ts" region="sizer-component" header="src/app/sizer.component.ts"></code-example>

`sizerComponent` 템플릿에는 버튼이 2개 있으며 이 버튼은 각각 `inc()` 메서드와 `dec()` 메서드에 클릭 이벤트로 연결되어 있습니다.
이후에 사용자가 버튼을 클릭하면 연결된 메서드가 실행되면서 `resize()` 메서드를 호출하고, 새로 변경된 값으로 `sizeChange` 이벤트가 발생합니다.

<code-example path="two-way-binding/src/app/sizer/sizer.component.html" header="src/app/sizer.component.html"></code-example>

`AppComponent` 템플릿에는 `fontSizePx` 프로퍼티가 `SizerComponent`와 양방향으로 바인딩되어 있습니다.

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html" region="two-way-1"></code-example>

`AppComponent`에 있는 `fontSizePx` 프로퍼티는 `SizerComponent.size` 값에 따라 초기화되며, 예제에서는 `16`입니다.

<code-example path="two-way-binding/src/app/app.component.ts" header="src/app/app.component.ts" region="font-size"></code-example>

이제 버튼을 클릭하면 `AppComponent.fontSizePx` 프로퍼티 값이 갱신됩니다.
그러면 변경된 프로퍼티 값에 따라 스타일이 바인딩되기 때문에 화면에 표시된 글자도 커지거나 작아집니다.

양방향 바인딩 문법은 프로퍼티 바인딩 문법과 이벤트 바인딩 문법을 짧게 줄여놓은 것입니다.
두 바인딩 문법은 아래 코드처럼 풀어서 작성할 수도 있습니다.

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html (풀어쓴 문법)" region="two-way-2"></code-example>

`$event` 변수에는 `SizerComponent.sizeChange` 이벤트로 보낸 데이터가 담겨 있습니다.
이 변수의 값은 `AppComponent.fontSizePx`에 할당됩니다.

<div class="callout is-helpful">

  <header>폼에서 양방향 바인딩 사용하기</header>

  표준 HTML 엘리먼트는 값을 `x`에 저장하고 `xChange`로 이벤트를 보내는 패턴을 사용하지 않기 때문에 폼에 양방향 바인딩을 사용하려면 `NgModel`을 활용해야 합니다.
  폼에서 양방향 바인딩을 사용하는 방법에 대해 자세하게 알아보려면 [NgModel](guide/built-in-directives#ngModel) 문서를 참고하세요.

</div>
