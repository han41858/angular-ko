<!--
# Property binding
-->
# 프로퍼티 바인딩(Property binding)

<!--
Property binding in Angular helps you set values for properties of HTML elements or directives.
With property binding, you can do things such as toggle button functionality, set paths programmatically, and share values between components.

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

</div>
-->
프로퍼티 바인딩을 활용하면 HTML 엘리먼트나 디렉티브의 프로퍼티 값을 지정할 수 있습니다.
이 문법을 활용하면 버튼을 비활성화 할 수 있고, 이동할 주소를 프로그램 로직으로 할당할 수 있으며, 컴포넌트에 데이터를 전달할 수 있습니다.

<div class="alert is-helpful">

이 예제에서 다루는 예제는 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Prerequisites
-->
## 사전지식

<!--
To get the most out of property binding, you should be familiar with the following:

* [Basics of components](guide/architecture-components)
* [Basics of templates](guide/glossary#template)
* [Binding syntax](guide/binding-syntax)

<hr />
-->
프로퍼티 바인딩을 제대로 이해하려면 이런 내용을 먼저 알고 있는 것이 좋습니다:

* [컴포넌트 기본 개념](guide/architecture-components)
* [템플릿 기본](guide/glossary#template)
* [바인딩 문법](guide/binding-syntax)


<!--
## Understanding the flow of data
-->
## 데이터 흐름 이해하기

<!--
Property binding moves a value in one direction, from a component's property into a target element property.

<div class="alert is-helpful">

For more information on listening for events, see [Event binding](guide/event-binding).

</div>

To read a target element property or call one of its methods, see the API reference for [ViewChild](api/core/ViewChild) and [ContentChild](api/core/ContentChild).
-->
프로퍼티 바인딩에서 데이터는 컴포넌트 프로퍼티에서 대상 엘리먼트 프로퍼티로, 한방향으로만 움직입니다.

<div class="alert is-helpful">

이벤트를 감지하는 방법에 대해 자세하게 알아보려면 [이벤트 바인딩](guide/event-binding) 문서를 참고하세요.

</div>

대상 엘리먼트의 프로퍼티를 읽거나 메서드를 실행하려면 [ViewChild](api/core/ViewChild) API 문서와 [ContentChild](api/core/ContentChild) API 문서를 참고하세요.


<!--
## Binding to a property
-->
## 프로퍼티에 바인딩하기

<!--
To bind to an element's property, enclose it in square brackets, `[]`, which identifies the property as a target property.
A target property is the DOM property to which you want to assign a value.
For example, the target property in the following code is the image element's `src` property.

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>


In most cases, the target name is the name of a property, even when it appears to be the name of an attribute.
In this example, `src` is the name of the `<img>` element property.

The brackets, `[]`, cause Angular to evaluate the right-hand side of the assignment as a dynamic expression.
Without the brackets, Angular treats the right-hand side as a string literal and sets the property to that static value.

<code-example path="property-binding/src/app/app.component.html" region="no-evaluation" header="src/app.component.html"></code-example>

Omitting the brackets renders the string `parentItem`, not the value of `parentItem`.
-->
엘리먼트 프로퍼티를 바인딩하려면 대상 프로퍼티를 대괄호로 감싸는 문법(`[]`)을 사용합니다.
이 때 대상 프로퍼티는 값을 지정하려고 하는 DOM 프로퍼티입니다.
아래 예제에서는 `<img>` 엘리먼트의 `src` 프로퍼티가 대상 프로퍼티 입니다.

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>

헷갈릴 수 있지만 대상이 되는 이름은 어트리뷰트가 아니라 프로퍼티 이름입니다.
위 예제에서도 `src`는 `<img>` 엘리먼트의 프로퍼티입니다.

대괄호(`[]`)가 사용되면 Angular는 프로퍼티 바인딩 표현식의 등호 오른쪽에 있는 표현식을 평가합니다.
그리고 대괄호를 사용하지 않으면 등호 오른쪽에 있는 문자열은 단순한 문자열 리터럴로 사용되어 프로퍼티에 바인딩됩니다.

<code-example path="property-binding/src/app/app.component.html" region="no-evaluation" header="src/app.component.html"></code-example>

위 예제에서 대상 프로퍼티에 바인딩되는 값은 `parentItem` 프로퍼티의 값이 아니라 `parentItem`이라는 문자열입니다.


<!--
## Setting an element property to a component property value
-->
## 엘리먼트 프로퍼티 설정하기

<!--
To bind the `src` property of an `<img>` element to a component's property, place the target, `src`, in square brackets followed by an equal sign and then the property.
The property here is `itemImageUrl`.

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>

Declare the `itemImageUrl` property in the class, in this case `AppComponent`.

<code-example path="property-binding/src/app/app.component.ts" region="item-image" header="src/app/app.component.ts"></code-example>
-->
`<img>` 엘리먼트의 `src` 프로퍼티를 컴포넌트 `itemImageUrl` 프로퍼티의 값으로 바인딩하려면 대괄호를 사용해서 이렇게 작성하면 됩니다.

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>

이 예제에서 `itemImageUrl` 프로퍼티는 `AppComponent`에 정의되어 있습니다.

<code-example path="property-binding/src/app/app.component.ts" region="item-image" header="src/app/app.component.ts"></code-example>


{@a colspan}

<!--
#### `colspan` and `colSpan`
-->
#### `colspan`과 `colSpan`

<!--
A common point of confusion is between the attribute, `colspan`, and the property, `colSpan`.
Notice that these two names differ by only a single letter.

If you wrote something like this:

<code-example language="html">
  &lt;tr&gt;&lt;td colspan="{{1 + 1}}"&gt;Three-Four&lt;/td&gt;&lt;/tr&gt;
</code-example>

You'd get this error:

<code-example language="bash">
  Template parse errors:
  Can't bind to 'colspan' since it isn't a known native property
</code-example>

As the message says, the `<td>` element does not have a `colspan` property. This is true
because `colspan` is an attribute&mdash;`colSpan`, with a capital `S`, is the
corresponding property. Interpolation and property binding can set only *properties*, not attributes.

Instead, you'd use property binding and write it like this:

<code-example path="attribute-binding/src/app/app.component.html" region="colSpan" header="src/app/app.component.html"></code-example>


Another example is disabling a button when the component says that it `isUnchanged`:

<code-example path="property-binding/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

Another is setting a property of a directive:

<code-example path="property-binding/src/app/app.component.html" region="class-binding" header="src/app/app.component.html"></code-example>

Yet another is setting the model property of a custom component&mdash;a great way
for parent and child components to communicate:

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>
-->
가장 헷갈리는 부분은 `colspan` 어트리뷰트와 `colSpan` 프로퍼티 같이, 바인딩하는 대상이 어트리뷰트인지 프로퍼티인지 혼동이 된다는 것입니다.
두 단어의 철자는 같지만 엄연히 다릅니다.

이렇게 작성했다고 합시다:

<code-example language="html">
  &lt;tr&gt;&lt;td colspan="{{1 + 1}}"&gt;Three-Four&lt;/td&gt;&lt;/tr&gt;
</code-example>

그러면 이런 에러가 표시됩니다:

<code-example language="bash">
  Template parse errors:
  Can't bind to 'colspan' since it isn't a known native property
</code-example>

이 메시지에서 알 수 있듯이, `<td>` 엘리먼트에는 `colspan`이라는 프로퍼티가 없습니다.
왜냐하면 `colspan`은 프로퍼티가 아니라 어트리뷰트이며, 관련된 프로퍼티는 대문자가 들어간 `colSpan` 입니다.
문자열 바인딩(Interpolation)이나 프로퍼티 바인딩은 모두 *프로퍼티* 를 대상으로 동작합니다.
어트리뷰트가 아닙니다.

프로퍼티 바인딩은 이렇게 사용합니다:

<code-example path="attribute-binding/src/app/app.component.html" region="colSpan" header="src/app/app.component.html"></code-example>

그리고 컴포넌트에 잇는 `isUnchanged` 프로퍼티 값으로 버튼을 비활성화하려면 이렇게 구현하면 됩니다:

<code-example path="property-binding/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

디렉티브의 프로퍼티 값은 이렇게 설정합니다:

<code-example path="property-binding/src/app/app.component.html" region="class-binding" header="src/app/app.component.html"></code-example>

커스텀 컴포넌트에 값을 전달할 수도 있습니다.
부모/자식 컴포넌트끼리는 이렇게 데이터를 전달합니다:

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>


<!--
## Toggling button functionality
-->
## 버튼 비활성화하기

<!--
To disable a button's functionality depending on a Boolean value, bind the DOM `disabled` property to a property in the class that is `true` or `false`.

<code-example path="property-binding/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

Because the value of the property `isUnchanged` is `true` in the `AppComponent`, Angular disables the button.

<code-example path="property-binding/src/app/app.component.ts" region="boolean" header="src/app/app.component.ts"></code-example>
-->
버튼을 비활성화하려면 불리언 값으로 DOM `disabled` 프로퍼티 값을 지정하면 됩니다.

<code-example path="property-binding/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

그러면 `AppComponent` 의 `isUnchanged` 프로퍼티 값이 `true`일 때 Angular가 버튼을 비활성화 합니다.

<code-example path="property-binding/src/app/app.component.ts" region="boolean" header="src/app/app.component.ts"></code-example>


<!--
## Setting a directive property
-->
## 디렉티브 프로퍼티 값 지정하기

<!--
To set a property of a directive, place the directive within square brackets , such as `[ngClass]`, followed by an equal sign and the property.
Here, the property is `classes`.

<code-example path="property-binding/src/app/app.component.html" region="class-binding" header="src/app/app.component.html"></code-example>

To use the property, you must declare it in the class, which in this example is `AppComponent`.
The value of `classes` is `special`.

<code-example path="property-binding/src/app/app.component.ts" region="directive-property" header="src/app/app.component.ts"></code-example>

Angular applies the class `special` to the `<p>` element so that you can use `special` to apply CSS styles.
-->
디렉티브의 프로퍼티 값을 지정하려면 대괄호를 사용해서 `[ngClass]`와 같이 대상 프로퍼티를 지정하고 그 오른쪽에 등호를 붙여 표현식을 연결하면 됩니다.
`classes` 프로퍼티를 바인딩하려면 이렇게 구현하면 됩니다.

<code-example path="property-binding/src/app/app.component.html" region="class-binding" header="src/app/app.component.html"></code-example>

프로퍼티를 바인딩하려면 반드시 이 프로퍼티를 컴포넌트 클래스에 선언해야 하며, 예제의 경우에는 `AppComponent`가 컴포넌트 클래스입니다.
`classes` 프로퍼티의 값은 `special`입니다.

<code-example path="property-binding/src/app/app.component.ts" region="directive-property" header="src/app/app.component.ts"></code-example>

그러면 Angular가 `<p>` 엘리먼트의 CSS 클래스를 `special`로 지정하며, `special` 클래스에 맞는 CSS 스타일이 적용됩니다.


<!--
## Bind values between components
-->
## 컴포넌트끼리 프로퍼티 바인딩하기

<!--
To set the model property of a custom component, place the target, here `childItem`, between square brackets `[]` followed by an equal sign and the property.
Here, the property is `parentItem`.

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>

To use the target and the property, you must declare them in their respective classes.

Declare the target of `childItem` in its component class, in this case `ItemDetailComponent`.

For example, the following code declares the target of `childItem` in its component class, in this case `ItemDetailComponent`.

Then, the code contains an `@Input()` decorator with the `childItem` property so data can flow into it.

<code-example path="property-binding/src/app/item-detail/item-detail.component.ts" region="input-type" header="src/app/item-detail/item-detail.component.ts"></code-example>

Next, the code declares the property of `parentItem` in its component class, in this case `AppComponent`.
In this example the type of `childItem` is `string`, so `parentItem` needs to be a string.
Here, `parentItem` has the string value of `lamp`.

<code-example path="property-binding/src/app/app.component.ts" region="parent-data-type" header="src/app/app.component.ts"></code-example>

With this configuration, the view of `<app-item-detail>` uses the value of `lamp` for `childItem`.
-->
커스텀 컴포넌트의 프로퍼티 값을 설정하려면 대상 컴포넌트의 프로퍼티를 대괄호로 감싸면 됩니다.
아래 예제는 부모 컴포넌트에 있는 `parentItem`을 자식 컴포넌트의 `childItem` 프로퍼티로 바인딩하는 예제 코드입니다.

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>

바인딩하려는 프로퍼티와 바인딩 대상이 되는 반드시 컴포넌트 클래스에 선언되어 있어야 합니다.

`childItem`은 `ItemDetailComponent`에 선언된 프로퍼티입니다.

그리고 이 프로퍼티에 `@Input()` 데코레이터를 지정하면 데이터가 이 프로퍼티로 전달될 수 있습니다.

<code-example path="property-binding/src/app/item-detail/item-detail.component.ts" region="input-type" header="src/app/item-detail/item-detail.component.ts"></code-example>

그리고 바인딩 대상이 되는 프로퍼티 `parentItem`은 `AppComponent`에 선언되어 있습니다.
이 예제에서 `childItem` 프로퍼티의 타입은 `string`이기 때문에 `parentItem` 프로퍼티도 문자열 타입이어야 합니다.
그래서 `parentItem` 프로퍼티에도 `lamp`라는 문자열 값이 할당되어 있습니다.

<code-example path="property-binding/src/app/app.component.ts" region="parent-data-type" header="src/app/app.component.ts"></code-example>

이렇게 구현하면 `<app-item-detail>`은 `childItem`으로 `lamp` 값을 받습니다.


<!--
## Property binding and security
-->
## 프로퍼티 바인딩과 보안

<!--
Property binding can help keep content secure.
For example, consider the following malicious content.

<code-example path="property-binding/src/app/app.component.ts" region="malicious-content" header="src/app/app.component.ts"></code-example>

The component template interpolates the content as follows:

<code-example path="property-binding/src/app/app.component.html" region="malicious-interpolated" header="src/app/app.component.html"></code-example>

The browser doesn't process the HTML and instead displays it raw, as follows.

<code-example language="bash">
"Template &lt;script&gt;alert("evil never sleeps")&lt;/script&gt; Syntax" is the interpolated evil title.
</code-example>


Angular does not allow HTML with `<script>` tags, neither with [interpolation](guide/interpolation) nor property binding, which prevents the JavaScript from running.

In the following example, however, Angular [sanitizes](guide/security#sanitization-and-security-contexts) the values before displaying them.

<code-example path="property-binding/src/app/app.component.html" region="malicious-content" header="src/app/app.component.html"></code-example>

Interpolation handles the `<script>` tags differently than property binding, but both approaches render the content harmlessly.
The following is the browser output of the sanitized `evilTitle` example.

<code-example language="bash">
"Template Syntax" is the property bound evil title.
</code-example>
-->
프로퍼티 바인딩을 활용하면 보안에도 도움이 됩니다.
예를 들어 이런 악성 코드가 있다고 합시다.

<code-example path="property-binding/src/app/app.component.ts" region="malicious-content" header="src/app/app.component.ts"></code-example>

이 컴포넌트 문자열 바인딩되면 이런 내용이 됩니다:

<code-example path="property-binding/src/app/app.component.html" region="malicious-interpolated" header="src/app/app.component.html"></code-example>

브라우저는 이 악성코드를 그대로 실행하지 않고 이런 메시지를 출력합니다.

<code-example language="bash">
"Template &lt;script&gt;alert("evil never sleeps")&lt;/script&gt; Syntax" is the interpolated evil title.
</code-example>

Angular는 [문자열 바인딩](guide/interpolation)과 프로퍼티 바인딩 문법에서 `<script>` 태그를 허용하지 않기 때문에 악성 JavaScript 코드가 실행되는 것도 막습니다.

Angular는 아래 예제처럼 악성 코드를 [무력화(sanitize)](guide/security#sanitization-and-security-contexts) 합니다.

<code-example path="property-binding/src/app/app.component.html" region="malicious-content" header="src/app/app.component.html"></code-example>

문자열 바인딩과 프로퍼티 바인딩은 `<script>` 태그를 처리하는 방식이 조금 다르지만, 결국 위험하지 않은 내용만 화면에 렌더링됩니다.
`evilTitle`이 프로퍼티 바인딩에 사용되면 이런 에러 메시지가 브라우저 콘솔에 출력됩니다.

<code-example language="bash">
"Template Syntax" is the property bound evil title.
</code-example>


<!--
## Property binding and interpolation
-->
## 프로퍼티 바인딩과 문자열 바인딩

<!--
Often [interpolation](guide/interpolation) and property binding can achieve the same results.
The following binding pairs do the same thing.

<code-example path="property-binding/src/app/app.component.html" region="property-binding-interpolation" header="src/app/app.component.html"></code-example>

You can use either form when rendering data values as strings, though interpolation is preferable for readability.
However, when setting an element property to a non-string data value, you must use property binding.

<hr />
-->
[문자열 바인딩](guide/interpolation)과 프로퍼티 바인딩은 보통 같은 결과를 냅니다.
아래 예제에서도 문자열 바인딩과 프로퍼티 바인딩의 결과는 같습니다.

<code-example path="property-binding/src/app/app.component.html" region="property-binding-interpolation" header="src/app/app.component.html"></code-example>

문자열 같은 데이터를 화면에 렌더링하는 용도라면 어느 방식을 써도 되지만, 가독성 때문에 문자열 바인딩이 더 선호되곤 합니다.
하지만 문자열이 아닌 데이터를 엘리먼트 프로퍼티에 바인딩하려면 반드시 프로퍼티 바인딩을 활용해야 합니다.

<hr />


<!--
## What's next
-->
## 다음 단계

<!--
* [Property binding best practices](guide/property-binding-best-practices)
-->
* [프로퍼티 바인딩 모범 사례](guide/property-binding-best-practices)
