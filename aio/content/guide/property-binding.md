<!--
# Property binding
-->
# 프로퍼티 바인딩(Property binding)

<!--
Property binding in Angular helps you set values for properties of HTML elements or directives.  Use property binding to do things such as toggle button functionality, set paths programmatically, and share values between components.

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
* [Basics of components](guide/architecture-components)
* [Basics of templates](guide/glossary#template)
* [Binding syntax](guide/binding-syntax)
-->
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

To assign a value to a target property for the image element's `src` property, type the following code:

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>

In most cases, the target name is the name of a property, even when it appears to be the name of an attribute.

In this example, `src` is the name of the `<img>` element property.

The brackets, `[]`, cause Angular to evaluate the right-hand side of the assignment as a dynamic expression.

Without the brackets, Angular treats the right-hand side as a string literal and sets the property to that static value.

To assign a string to a property, type the following code:

<code-example path="property-binding/src/app/app.component.html" region="no-evaluation" header="src/app.component.html"></code-example>

Omitting the brackets renders the string `parentItem`, not the value of `parentItem`.
-->
엘리먼트 프로퍼티를 바인딩하려면 대상 프로퍼티를 대괄호로 감싸는 문법\(`[]`\)을 사용합니다.

이 때 대상 프로퍼티는 값을 지정하려고 하는 DOM 프로퍼티입니다.

아래 예제에서는 `<img>` 엘리먼트의 `src` 프로퍼티가 대상 프로퍼티 입니다.

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>

헷갈릴 수 있지만 대상이 되는 이름은 어트리뷰트가 아니라 프로퍼티 이름입니다.

위 예제에서도 `src`는 `<img>` 엘리먼트의 프로퍼티입니다.

대괄호\(`[]`\)가 사용되면 Angular는 프로퍼티 바인딩 표현식의 등호 오른쪽에 있는 표현식을 평가합니다.

그리고 대괄호를 사용하지 않으면 등호 오른쪽에 있는 문자열은 단순한 문자열 리터럴로 사용되어 프로퍼티에 바인딩됩니다.

<code-example path="property-binding/src/app/app.component.html" region="no-evaluation" header="src/app.component.html"></code-example>

위 예제에서 대상 프로퍼티에 바인딩되는 값은 `parentItem` 프로퍼티의 값이 아니라 `parentItem`이라는 문자열입니다.


<!--
## Setting an element property to a component property value
-->
## 엘리먼트 프로퍼티 설정하기

<!--
To bind the `src` property of an `<img>` element to a component's property, place the target, `src`, in square brackets followed by an equal sign and then the property.

Using the property `itemImageUrl`, type the following code:

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
A common point of confusion is between the attribute, `colspan`, and the property, `colSpan`.  Notice that these two names differ by only a single letter.

To use property binding using colSpan, type the following:

<code-example path="attribute-binding/src/app/app.component.html" region="colSpan" header="src/app/app.component.html"></code-example>

To disable a button when the component says that it `isUnchanged`, type the following:

<code-example path="property-binding/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

To set a property of a directive, type the following:

<code-example path="property-binding/src/app/app.component.html" region="class-binding" header="src/app/app.component.html"></code-example>

To set the model property of a custom component for parent and child components to communicated, type the following:

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>
-->
가장 헷갈리는 부분은 `colspan` 어트리뷰트와 `colSpan` 프로퍼티 같이, 바인딩하는 대상이 어트리뷰트인지 프로퍼티인지 혼동이 된다는 것입니다.
두 단어의 철자는 같지만 대소문자가 한글자 다릅니다.

`colSpan` 프로퍼티 바인딩은 이렇게 사용합니다:

<code-example path="attribute-binding/src/app/app.component.html" region="colSpan" header="src/app/app.component.html"></code-example>

컴포넌트에 있는 `isUnchanged` 프로퍼티를 사용해서 버튼을 비활성화 해봅시다:

<code-example path="property-binding/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

그리고 디렉티브에 있는 프로퍼티 값을 설정하려면 이렇게 사용합니다:

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
## What's next
-->
## 다음 단계

<!--
* [Property binding best practices](guide/property-binding-best-practices)
* [Event binding](guide/event-binding)
* [Text Interpolation](guide/interpolation)
* [Class & Style Binding](guide/class-binding)
* [Attribute Binding](guide/attribute-binding)
-->
* [프로퍼티 바인딩 모범 사례](guide/property-binding-best-practices)
* [이벤트 바인딩](guide/event-binding)
* [문자열 바인딩](guide/interpolation)
* [클래스 & 스타일 바인딩](guide/class-binding)
* [어트리뷰트 바인딩](guide/attribute-binding)

@reviewed 2022-04-14
