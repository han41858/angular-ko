<!--
# Class and style binding
-->
# 클래스, 스타일 바인딩

<!--
Use class and style bindings to add and remove CSS class names from an element's `class` attribute and to set styles dynamically.
-->
클래스 바인딩, 스타일 바인딩을 활용하며 엘리먼트의 `class` 어트리뷰트나 스타일을 동적으로 변경할 수 있습니다.


<!--
## Prerequisites
-->
## 사전지식

<!--
* [Property binding](guide/property-binding)
-->
* [프로퍼티 바인딩](guide/property-binding)


<!--
## Binding to a single CSS `class`
-->
## CSS `class` 하나 바인딩하기

<!--
To create a single class binding, type the following:

[class.sale]="onSale"

Angular adds the class when the bound expression, `onSale` is truthy, and it removes the class when the expression is falsy&mdash;with the exception of `undefined`.  See [styling delegation](guide/style-precedence#styling-delegation) for more information.
-->
클래스 바인딩은 이렇게 사용합니다:

[class.sale]="onSale"

그러면 `onSale`이 참으로 평가될 때 `sale` 클래스를 엘리먼트에 추가하며, `onSale`이 거짓이나 `undefined`로 평가되면 `sale` 클래스를 엘리먼트에서 제거합니다.
자세한 내용은 [스타일 위임](guide/style-precedence#styling-delegation) 문서를 참고하세요.


<!--
## Binding to multiple CSS classes
-->
## CSS 클래스 여러개 바인딩하기

<!--
To bind to multiple classes, type the following:

`[class]="classExpression"`

The expression can be one of:

* A space-delimited string of class names.
* An object with class names as the keys and truthy or falsy expressions as the values.
* An array of class names.

With the object format, Angular adds a class only if its associated value is truthy.

<div class="alert is-important">

With any object-like expression&mdash;such as `object`, `Array`, `Map`, or `Set`&mdash;the identity of the object must change for Angular to update the class list.
Updating the property without changing object identity has no effect.

</div>

If there are multiple bindings to the same class name, Angular uses [styling precedence](guide/style-precedence) to determine which binding to use.

The following table summarizes class binding syntax.

| Binding Type         | Syntax                      | Input Type                                                                  | Example Input Values |
|:---                  |:---                         |:---                                                                         |:---                  |
| Single class binding | `[class.sale]="onSale"`     | <code>boolean &verbar; undefined &verbar; null</code>                       | `true`, `false`                      |
| Multi-class binding  | `[class]="classExpression"` | `string`                                                                    | `"my-class-1 my-class-2 my-class-3"` |
| Multi-class binding  | `[class]="classExpression"` | <code>Record&lt;string, boolean &verbar; undefined &verbar; null&gt;</code> | `{foo: true, bar: false}`            |
| Multi-class binding  | `[class]="classExpression"` | <code>Array&lt;string&gt;</code>                                            | `['foo', 'bar']`                     |
-->
클래스 여러개를 바인딩하려면 이렇게 사용합니다:

`[class]="classExpression"`

이 때 표현식은 이런 것들 중 하나가 될 수 있습니다:

* 클래스 이름을 공백으로 구분하는 문자열
* 클래스 이름을 키로 하고 참/거짓으로 평가되는 표현식을 값으로 하는 객체
* 클래스 이름으로 구성된 배열

객체 형식을 사용하면 참으로 평가되는 값에 해당하는 키만 클래스로 추가합니다.

<div class="alert is-important">

객체를 사용하는 방식은 객체와 비슷한 `object`, `Array`, `Map`, `Set`이 모두 가능하며, 이 때 반드시 참조하는 객체가 변경되어야 클래스가 제대로 변경됩니다.
객체 참조는 변경되지 않고 프로퍼티 값만 변경되면 갱신되지 않습니다.

</div>

한 클래스 이름을 여러번 바인딩하면 [스타일 우선순위](guide/style-precedence)에 의해 최종 바인딩 결과가 결정됩니다.

클래스 바인딩 문법을 요약해보면 이렇습니다.

| 바인딩 타입 | 문법 | 입력 값 | 예제 |
|:---                  |:---                         |:---                                                                         |:---                  |
| 클래스 하나 바인딩 | `[class.sale]="onSale"`     | <code>boolean &verbar; undefined &verbar; null</code>                       | `true`, `false`                      |
| 클래스 여러개 바인딩 | `[class]="classExpression"` | `string`                                                                    | `"my-class-1 my-class-2 my-class-3"` |
| 클래스 여러개 바인딩 | `[class]="classExpression"` | <code>Record&lt;string, boolean &verbar; undefined &verbar; null&gt;</code> | `{foo: true, bar: false}`            |
| 클래스 여러개 바인딩 | `[class]="classExpression"` | <code>Array&lt;string&gt;</code>                                            | `['foo', 'bar']`                     |


<!--
## Binding to a single style
-->
## 스타일 하나 바인딩하기

<!--
To create a single style binding, use the prefix `style` followed by a dot and the name of the CSS style.

For example, set the ‘width’ style, type the following:  `[style.width]="width"`

Angular sets the property to the value of the bound expression, which is usually a string.  Optionally, you can add a unit extension like `em` or `%`, which requires a number type.

1. To write a style in dash-case, type the following:

    <code-example language="html">&lt;nav [style.background-color]="expression"&gt;&lt;/nav&gt;</code-example>

2. To write a style in camelCase, type the following:

    <code-example language="html">&lt;nav [style.backgroundColor]="expression"&gt;&lt;/nav&gt;</code-example>
-->
스타일 하나를 바인딩하려면 `style.` 뒤에 원하는 CSS 스타일을 지정하면 됩니다.

그래서 `width` 스타일은 이렇게 지정합니다:  `[style.width]="width"`

그러면 Angular는 표현식이 평가되는 결과로 프로퍼티 값을 지정하는데, 보통은 문자열을 사용합니다.
`em`이나 `%` 단위를 명시하면 숫자 타입을 사용할 수도 있습니다.

1. 대시 케이스(dash-case)로는 이렇게 지정합니다:

    <code-example language="html">&lt;nav [style.background-color]="expression"&gt;&lt;/nav&gt;</code-example>

2. 캐멀 케이스(camelCase)로는 이렇게 지정합니다:

    <code-example language="html">&lt;nav [style.backgroundColor]="expression"&gt;&lt;/nav&gt;</code-example>



<!--
## Binding to multiple styles
-->
## 스타일 여러개 바인딩하기

<!--
To toggle multiple styles, bind to the `[style]` attribute&mdash;for example, `[style]="styleExpression"`.  The `styleExpression` can be one of:

* A string list of styles such as `"width: 100px; height: 100px; background-color: cornflowerblue;"`.
* An object with style names as the keys and style values as the values, such as `{width: '100px', height: '100px', backgroundColor: 'cornflowerblue'}`.

Note that binding an array to `[style]` is not supported.

<div class="alert is-important">

When binding `[style]` to an object expression, the identity of the object must change for Angular to update the class list.
Updating the property without changing object identity has no effect.

</div>
-->
스타일 여러개를 토글하려면 `[style]=styleExpression`이라는 방식으로 바인딩합니다.
이 때 `styleExpression`은 이런 방식을 사용할 수 있습니다:

* 문자열로 지정하는 방식: `"width: 100px; height: 100px; background-color: cornflowerblue;"`
* 스타일 이름을 키로 하고 그 값을 객체의 값으로 하는 객체: `{width: '100px', height: '100px', backgroundColor: 'cornflowerblue'}`.

배열로 지정하는 방식은 지원하지 않습니다.

<div class="alert is-important">

객체 방식으로 `[style]`을 사용하면 이 때 반드시 참조하는 객체가 변경되어야 스타일이 제대로 변경됩니다.
객체 참조는 변경되지 않고 프로퍼티 값만 변경되면 갱신되지 않습니다.

</div>


<!--
### Single and multiple-style binding example
-->
### 하나/여러 스타일을 바인딩하는 예제

<!--
<code-example path="attribute-binding/src/app/single-and-multiple-style-binding.component.ts" header="nav-bar.component.ts"></code-example>

If there are multiple bindings to the same style attribute, Angular uses [styling precedence](guide/style-precedence) to determine which binding to use.

The following table summarizes style binding syntax.

| Binding Type                    | Syntax                      | Input Type                                                                 | Example Input Values |
|:---                             |:---                         |:---                                                                        |:---                  |
| Single style binding            | `[style.width]="width"`     | <code>string &verbar; undefined &verbar; null</code>                       | `"100px"`                           |
| Single style binding with units | `[style.width.px]="width"`  | <code>number &verbar; undefined &verbar; null</code>                       | `100`                               |
| Multi-style binding             | `[style]="styleExpression"` | `string`                                                                   | `"width: 100px; height: 100px"`     |
| Multi-style binding             | `[style]="styleExpression"` | <code>Record&lt;string, string &verbar; undefined &verbar; null&gt;</code> | `{width: '100px', height: '100px'}` |
-->
<code-example path="attribute-binding/src/app/single-and-multiple-style-binding.component.ts" header="nav-bar.component.ts"></code-example>

같은 스타일 어트리뷰트를 여러번 바인딩하면, [스타일 우선순위](guide/style-precedence)에 따라 최종 바인딩 결과가 결정됩니다.

스타일 바인딩 문법을 요약해보면 이렇습니다.

| 바인딩 타입 | 문법 | 입력 값 | 예제 |
|:---                             |:---                         |:---                                                                        |:---                  |
| 스타일 하나 바인딩 | `[style.width]="width"`     | <code>string &verbar; undefined &verbar; null</code>                       | `"100px"`                           |
| 스타일 하나를 단위와 함께 바인딩 | `[style.width.px]="width"`  | <code>number &verbar; undefined &verbar; null</code>                       | `100`                               |
| 스타일 여러개 바인딩 | `[style]="styleExpression"` | `string`                                                                   | `"width: 100px; height: 100px"`     |
| 스타일 여러개 바인딩 | `[style]="styleExpression"` | <code>Record&lt;string, string &verbar; undefined &verbar; null&gt;</code> | `{width: '100px', height: '100px'}` |



{@a styling-precedence}

<!--
## Styling precedence
-->
## 스타일 우선순위

<!--
A single HTML element can have its CSS class list and style values bound to multiple sources (for example, host bindings from multiple directives).
-->
HTML 엘리먼트는 CSS 클래스나 스타일을 여러개 지정할 수 있는데, 이 때 스타일을 지정하는 주체도 호스트에 바인딩하거나 디렉티브 여러개에서 바인딩하는 등 여러 곳이 될 수 있습니다.


<!--
## What’s next
-->
## 다음 단계

<!--
* [Component styles](https://angular.io/guide/component-styles)
* [Introduction to Angular animations](https://angular.io/guide/animations)
-->
* [컴포넌트 스타일](https://angular.io/guide/component-styles)
* [Angular 애니메이션 소개](https://angular.io/guide/animations)


@reviewed 2022-05-09
