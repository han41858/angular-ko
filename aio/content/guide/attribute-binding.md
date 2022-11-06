<!--
# Attribute binding
-->
# 어트리뷰트 바인딩

<!--
Attribute binding in Angular helps you set values for attributes directly.
With attribute binding, you can improve accessibility, style your application dynamically, and manage multiple CSS classes or styles simultaneously.

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

</div>
-->
어트리뷰트 바인딩을 활용하면 엘리먼트 어트리뷰트의 값을 직접 지정할 수 있습니다.
이 문법을 활용하면 웹 접근성을 향상시킬 수 있고, 애플리케이션 스타일을 동적으로 조정할 수 있으며, CSS 클래스 여러개와 CSS 스타일 여러개를 한 번에 적용할 수 있습니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제는 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Prerequisites
-->
## 사전지식

<!--
* [Property Binding](guide/property-binding)
-->
* [프로퍼티 바인딩](guide/property-binding)



<!--
## Syntax
-->
## 문법

<!--
Attribute binding syntax resembles [property binding](guide/property-binding), but instead of an element property between brackets, you precede the name of the attribute with the prefix `attr`, followed by a dot.
Then, you set the attribute value with an expression that resolves to a string.

<code-example format="html" language="html">

&lt;p [attr.attribute-you-are-targeting]="expression"&gt;&lt;/p&gt;

</code-example>

<div class="alert is-helpful">

When the expression resolves to `null` or `undefined`, Angular removes the attribute altogether.

</div>
-->
어트리뷰트 바인딩 문법은 [프로퍼티 바인딩](guide/property-binding) 문법과 비슷하지만, 대괄호\([, ]\) 사이에 엘리먼트 프로퍼티가 들어갑니다.
이 프로퍼티 이름은 `attr.` 접두사로 시작합니다.
그리고 이  뒤에 어트리뷰트에 할당될 값을 문자열로 지정하면 됩니다.

<code-example format="html" language="html">

&lt;p [attr.attribute-you-are-targeting]="expression"&gt;&lt;/p&gt;

</code-example>

<div class="alert is-helpful">

표현식이 `null`이나 `undefined` 값이 되면 Angular는 이 어트리뷰트를 제거합니다.

</div>



<!--
## Binding ARIA attributes
-->
## ARIA 어트리뷰트 바인딩하기

<!--
One of the primary use cases for attribute binding is to set ARIA attributes.

To bind to an ARIA attribute, type the following:

<code-example header="src/app/app.component.html" path="attribute-binding/src/app/app.component.html" region="attrib-binding-aria"></code-example>
-->
어트리뷰트 바인딩을 사용하는 목적 중 가장 중요한 것은 ARIA 어트리뷰트를 설정하는 것입니다:

<code-example header="src/app/app.component.html" path="attribute-binding/src/app/app.component.html" region="attrib-binding-aria"></code-example>


<a id="colspan"></a>

<!--
## Binding to `colspan`
-->
## `colspan` 바인딩하기

<!--
Another common use case for attribute binding is with the `colspan` attribute in tables.  Binding to the `colspan` attribute helps you to keep your tables programmatically dynamic.  Depending on the amount of data that your application populates a table with, the number of columns that a row spans could change.

To use attribute binding with the `<td>` attribute `colspan`
1. Specify the `colspan` attribute by using the following syntax: `[attr.colspan]`.
1. Set `[attr.colspan]` equal to an expression.

In the following example, you bind the `colspan` attribute to the expression `1 + 1`.

<code-example header="src/app/app.component.html" path="attribute-binding/src/app/app.component.html" region="colspan"></code-example>

This binding causes the `<tr>` to span two columns.

<div class="alert is-helpful">

Sometimes there are differences between the name of property and an attribute.

`colspan` is an attribute of `<tr>`, while `colSpan`  with a capital "S" is a property.
When using attribute binding, use `colspan` with a lowercase "s".

For more information on how to bind to the `colSpan` property, see the [`colspan` and `colSpan`](guide/property-binding#colspan) section of [Property Binding](guide/property-binding).

</div>
-->
어트리뷰트 바인딩은 테이블 엘리먼트의 `colspan` 어트리뷰트를 바인딩 할 때도 사용합니다.
이 어트리뷰트를 바인딩하면 테이블의 모습을 동적으로 변경할 수 있습니다.
데이터의 모습에 따라 행/열의 병합 개수를 조절할 때 사용합니다.

`<td>` 엘리먼트에 `colspan` 어트리뷰트를 바인딩하려면 이렇게 하면 됩니다:
1. `[attr.colspan]` 문법으로 `colspan` 어트리뷰트에 접근합니다.
1. `[attr.colspan]`에 표현식을 연결합니다.

아래 예제는 `colspan` 어트리뷰트에 `1 + 1`라는 표현식을 연결하는 예제 코드입니다.

<code-example header="src/app/app.component.html" path="attribute-binding/src/app/app.component.html" region="colspan"></code-example>

그러면 `<td>` 어트리뷰트가 2열로 구성됩니다.

<div class="alert is-helpful">

프로퍼티의 이름과 어트리뷰트 이름이 다른 경우가 가끔 있습니다.

`<td>` 엘리먼트를 생각해보면 `colspan`은 어트리뷰트이며 대문자 "S"가 들어간 `colSpan`은 프로퍼티입니다.
어트리뷰트를 바인딩하려면 반드시 소문자 "s"가 들어간 `colspan`을 사용해야 합니다.
`colSpan` 프로퍼티를 바인딩하는 방법에 대해 자세하게 알아보려면 [프로퍼티 바인딩](guide/property-binding) 문서의 [colspan과 colSpan](guide/property-binding#colspan) 섹션을 참고하세요.

</div>


<!--
## What’s next
-->
## 다음 단계

<!--
* [Class & Style Binding](guide/class-binding)
-->
* [클래스 & 스타일 바인딩](guide/class-binding)

@reviewed 2022-05-02
