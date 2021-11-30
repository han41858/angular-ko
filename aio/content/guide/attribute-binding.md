<!--
# Attribute, class, and style bindings
-->
# 어트리뷰트, 클래스, 스타일 바인딩

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
## Binding to an attribute
-->
## 어트리뷰트 바인딩하기

<!--
It is recommended that you set an element property with a [property binding](guide/property-binding) whenever possible.
However, sometimes you don't have an element property to bind.
In those situations, use attribute binding.

For example, [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) and
[SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) are purely attributes.
Neither ARIA nor SVG correspond to element properties and don't set element properties.
In these cases, you must use attribute binding because there are no corresponding property targets.
-->
엘리먼트 프로퍼티 값을 [프로퍼티 바인딩](guide/property-binding) 으로 할당할 수 있다면 이 방법이 가장 좋습니다.
하지만 엘리먼트 프로퍼티를 바인딩할 수 없는 경우가 있습니다.
어트리뷰트 바인딩은 이런 경우에 사용합니다.

[ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)와
[SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)에는 어트리뷰트만 존재합니다.
그래서 엘리먼트 프로퍼티가 존재하지 않기 때문에 프로퍼티 값을 지정할 수도 없습니다.
이런 경우에는 어트리뷰트 바인딩을 사용하는 수밖에 없습니다.


<!--
## Syntax
-->
## 문법

<!--
Attribute binding syntax resembles [property binding](guide/property-binding), but instead of an element property between brackets, you precede the name of the attribute with the prefix `attr`, followed by a dot.
Then, you set the attribute value with an expression that resolves to a string.

<code-example language="html">

 &lt;p [attr.attribute-you-are-targeting]="expression"&gt;&lt;/p&gt;

</code-example>

<div class="alert is-helpful">

When the expression resolves to `null` or `undefined`, Angular removes the attribute altogether.

</div>
-->
어트리뷰트 바인딩 문법은 [프로퍼티 바인딩](guide/property-binding) 문법과 비슷하지만, 대괄호(`[]`) 안에 엘리먼트 프로퍼티를 지정하지 않고 `attr.` 접두사를 붙인 후에 어트리뷰트 이름을 지정합니다.
등호 오른쪽에는 어트리뷰트에 지정할 값을 문자열을 반환하는 표현식으로 연결하면 됩니다.

<code-example language="html">

 &lt;p [attr.대상-어트리뷰트]="표현식"&gt;&lt;/p&gt;

</code-example>

<div class="alert is-helpful">

표현식이 `null`이나 `undefined`로 평가되면 Angular는 해당 어트리뷰트를 자체를 제거합니다.

</div>


<!--
## Binding ARIA attributes
-->
## ARIA 어트리뷰트 바인딩하기

<!--
One of the primary use cases for attribute binding
is to set ARIA attributes, as in this example:

<code-example path="attribute-binding/src/app/app.component.html" region="attrib-binding-aria" header="src/app/app.component.html"></code-example>
-->
어트리뷰트 바인딩을 사용하는 목적 중 가장 중요한 것은 ARIA 어트리뷰트를 설정하는 것입니다:

<code-example path="attribute-binding/src/app/app.component.html" region="attrib-binding-aria" header="src/app/app.component.html"></code-example>


{@a colspan}

<!--
## Binding to `colspan`
-->
## `colspan` 바인딩하기

<!--
Another common use case for attribute binding is with the `colspan` attribute in tables.
Binding to the `colspan` attribute helps you keep your tables programmatically dynamic.
Depending on the amount of data that your application populates a table with, the number of columns that a row spans could change.

To use attribute binding with the `<td>` attribute `colspan`:

1. Specify the `colspan` attribute by using the following syntax: `[attr.colspan]`.
1. Set `[attr.colspan]` equal to an expression.

In the following example, you bind the `colspan` attribute to the expression `1 + 1`.

<code-example path="attribute-binding/src/app/app.component.html" region="colspan" header="src/app/app.component.html"></code-example>

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

<code-example path="attribute-binding/src/app/app.component.html" region="colspan" header="src/app/app.component.html"></code-example>

그러면 `<td>` 어트리뷰트가 2열로 구성됩니다.

<div class="alert is-helpful">

프로퍼티의 이름과 어트리뷰트 이름이 다른 경우가 가끔 있습니다.

`<td>` 엘리먼트를 생각해보면 `colspan`은 어트리뷰트이며 대문자 "S"가 들어간 `colSpan`은 프로퍼티입니다.
어트리뷰트를 바인딩하려면 반드시 소문자 "s"가 들어간 `colspan`을 사용해야 합니다.
`colSpan` 프로퍼티를 바인딩하는 방법에 대해 자세하게 알아보려면 [프로퍼티 바인딩](guide/property-binding) 문서의 [colspan과 colSpan](guide/property-binding#colspan) 섹션을 참고하세요.

</div>


{@a class-binding}

<!--
## Binding to the `class` attribute
-->
## `class` 어트리뷰트 바인딩하기

<!--
Use class binding to add and remove CSS class names from an element's `class` attribute.
-->
엘리먼트의 `class` 어트리뷰트를 바인딩하면 해당 엘리먼트에 CSS 클래스를 적용하거나 제거할 수 있습니다.


<!--
### Binding to a single CSS `class`
-->
### CSS `class` 하나 바인딩하기

<!--
To create a single class binding, use the prefix `class` followed by a dot and the name of the CSS class&mdash;for example, `[class.sale]="onSale"`.
Angular adds the class when the bound expression, `onSale` is truthy, and it removes the class when the expression is falsy&mdash;with the exception of `undefined`.
See [styling delegation](guide/style-precedence#styling-delegation) for more information.
-->
클래스를 하나만 바인딩하려면 `[class.sale]="onSale"`라는 문법처럼 `class` 뒤에 마침표(`.`)를 붙이고 원하는 CSS 클래스를 지정하면 됩니다.
그러면 `onSale`라는 표현식이 참으로 평가될 때 `sale` 클래스를 엘리먼트에 적용하며, 표현식이 거짓으로 평가되면 `sale` 클래스를 엘리먼트에서 제거합니다.
표현식이 `undefined`로 평가되면 오류가 발생합니다.
자세한 내용은 [스타일 지정 우선순위](guide/style-precedence#styling-delegation) 문서를 참고하세요.


<!--
### Binding to multiple CSS classes
-->
### CSS 클래스 여러개 바인딩하기

<!--
To bind to multiple classes, use `[class]` set to an expression&mdash;for example, `[class]="classExpression"`.
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
-->
클래스를 여러개 바인딩하려면 `[class]="클래스-표현식"`이라는 문법을 사용하면 됩니다.
이 때 표현식은 다음 형식 중 하나를 사용할 수 있습니다:

* 클래스 이름을 공백해서 문자열로 지정하기
* 클래스 이름을 키로 하고 참/거짓으로 평가되는 값으로 구성된 객체
* 클래스 이름 배열

객체 형태를 사용하면 해당 객체 중 참으로 평가되는 클래스만 엘리먼트에 적용됩니다.

<div class="alert is-important">

`object`, `Array`, `Map`, `Set`과 같은 객체로 클래스를 바인딩할 때는 이 객체의 인스턴스가 변경되어야 클래스 목록이 변경됩니다.
객체 인스턴스는 그대로고 프로퍼티 값만 변경되면 반영되지 않습니다.

</div>

같은 클래스 이름이 여러 곳에서 바인딩되면 [스타일 지정 우선순위](guide/style-precedence)에 따라 적용 여부가 결정됩니다.

클래스 바인딩 문법을 요약하면 이렇습니다.


<style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <col width="15%">
  </col>
  <col width="20%">
  </col>
  <col width="35%">
  </col>
  <col width="30%">
  </col>
  <tr>
    <!--
    <th>
      Binding Type
    </th>
    <th>
      Syntax
    </th>
    <th>
      Input Type
    </th>
    <th>
      Example Input Values
    </th>
    -->
    <th>
      바인딩 타입
    </th>
    <th>
      문법
    </th>
    <th>
      입력값 타입
    </th>
    <th>
      입력값 예시
    </th>
  </tr>
  <tr>
    <!--
    <td>Single class binding</td>
    -->
    <td>클래스 하나 바인딩</td>
    <td><code>[class.sale]="onSale"</code></td>
    <td><code>boolean | undefined | null</code></td>
    <td><code>true</code>, <code>false</code></td>
  </tr>
  <tr>
    <!--
    <td rowspan=3>Multi-class binding</td>
    -->
    <td rowspan=3>클래스 여러개 바인딩</td>
    <td rowspan=3><code>[class]="classExpression"</code></td>
    <td><code>string</code></td>
    <td><code>"my-class-1 my-class-2 my-class-3"</code></td>
  </tr>
  <tr>
    <td><code>Record&lt;string, boolean | undefined | null&gt;</code></td>
    <td><code>{foo: true, bar: false}</code></td>
  </tr>
  <tr>
    <td><code>Array</code><<code>string</code>></td>
    <td><code>['foo', 'bar']</code></td>
  </tr>
</table>


{@a style-binding}

<!--
## Binding to the style attribute
-->
## 스타일 어트리뷰트 바인딩하기

<!--
Use style binding to set styles dynamically.
-->
스타일 어트리뷰트를 바인딩하면 엘리먼트의 스타일을 동적으로 변경할 수 있습니다.


<!--
### Binding to a single style
-->
### 스타일 하나 바인딩하기

<!--
To create a single style binding, use the prefix `style` followed by a dot and the name of the CSS style property&mdash;for example, `[style.width]="width"`.
Angular sets the property to the value of the bound expression, which is usually a string.
Optionally, you can add a unit extension like `em` or `%`, which requires a number type.

<div class="alert is-helpful">

You can write a style property name in either [dash-case](guide/glossary#dash-case), or
[camelCase](guide/glossary#camelcase).

<code-example language="html">
  &lt;nav [style.background-color]="expression"&gt;&lt;/nav&gt;

  &lt;nav [style.backgroundColor]="expression"&gt;&lt;/nav&gt;
</code-example>

</div>
-->
스타일을 하나만 바인딩하려면 `[style.width]="width"`처럼 `style` 접두사 뒤에 마침표(`.`)를 붙이고 원하는 CSS 스타일 프로퍼티 이름을 지정하면 됩니다.
Angular는 바인딩된 표현식을 평가하고 프로퍼티 값으로 지정하는데, 보통 이 값은 문자열 타입이지만 `em`이나 `%`와 같은 단위를 붙이면 숫자를 사용할 수도 있습니다.

<div class="alert is-helpful">

스타일 프로퍼티 이름은 [대시-케이스(dash-case)](guide/glossary#dash-case)와 [캐멀 케이스(camelCase)](guide/glossary#camelcase) 중 하나를 사용할 수 있습니다.

<code-example language="html">
  &lt;nav [style.background-color]="expression"&gt;&lt;/nav&gt;

  &lt;nav [style.backgroundColor]="expression"&gt;&lt;/nav&gt;
</code-example>

</div>


<!--
### Binding to multiple styles
-->
### 스타일 여러개 바인딩하기

<!--
To toggle multiple styles, bind to the `[style]` attribute&mdash;for example, `[style]="styleExpression"`.
The `styleExpression` can be one of:

* A string list of styles such as `"width: 100px; height: 100px; background-color: cornflowerblue;"`.
* An object with style names as the keys and style values as the values, such as `{width: '100px', height: '100px', backgroundColor: 'cornflowerblue'}`.

Note that binding an array to `[style]` is not supported.

<div class="alert is-important">

When binding `[style]` to an object expression, the identity of the object must change for Angular to update the class list.
Updating the property without changing object identity has no effect.

</div>
-->
스타일 여러개를 한번에 조작하려면 `[style]="스타일-표현식"`이라는 문법처럼 `[style]` 어트리뷰트를 바인딩하면 됩니다.
이 때 `styleExpression`은 다음 형식 중 하나를 사용할 수 있습니다:

* 문자열로 구성된 스타일: `"width: 100px; height: 100px; background-color: cornflowerblue;"`
* 스타일 이름을 키로 하고 그 값으로 스타일을 지정한 객체: `{width: '100px', height: '100px', backgroundColor: 'cornflowerblue'}`

`[style]`에 배열을 바인딩하는 방식은 지원하지 않습니다.

<div class="alert is-important">

`[style]`에 객체를 바인딩하면, 객체의 인스턴스가 변경되어야 스타일이 제대로 변경됩니다.
객체 인스턴스는 그대로고 프로퍼티 값만 변경되면 반영되지 않습니다.

</div>


<!--
#### Single and multiple-style binding example
-->
#### 한 번에 여러 스타일을 바인딩하는 예제

<!--
<code-example path="attribute-binding/src/app/single-and-multiple-style-binding.component.ts" header="nav-bar.component.ts">
</code-example>

If there are multiple bindings to the same style attribute, Angular uses [styling precedence](guide/style-precedence) to determine which binding to use.

The following table summarizes style binding syntax.
-->
<code-example path="attribute-binding/src/app/single-and-multiple-style-binding.component.ts" header="nav-bar.component.ts">
</code-example>

같은 스타일 어트리뷰트를 여러 번 바인딩하는 경우에는 Angular [스타일 우선순위](guide/style-precedence)에 따라 최종 스타일이 결정됩니다.

아래 표를 참고하세요.


<style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <col width="15%">
  </col>
  <col width="20%">
  </col>
  <col width="35%">
  </col>
  <col width="30%">
  </col>
  <tr>
    <!--
    <th>
      Binding Type
    </th>
    <th>
      Syntax
    </th>
    <th>
      Input Type
    </th>
    <th>
      Example Input Values
    </th>
    -->
    <th>
      바인딩 타입
    </th>
    <th>
      문법
    </th>
    <th>
      입력값 타입
    </th>
    <th>
      입력값 예시
    </th>
  </tr>
  <tr>
    <!--
    <td>Single style binding</td>
    -->
    <td>스타일 하나 바인딩</td>
    <td><code>[style.width]="width"</code></td>
    <td><code>string | undefined | null</code></td>
    <td><code>"100px"</code></td>
  </tr>
  <tr>
  <tr>
    <!--
    <td>Single style binding with units</td>
    -->
    <td>단위와 함께 스타일 하나 바인딩</td>
    <td><code>[style.width.px]="width"</code></td>
    <td><code>number | undefined | null</code></td>
    <td><code>100</code></td>
  </tr>
    <tr>
    <!--
    <td rowspan=2>Multi-style binding</td>
    -->
    <td rowspan=2>스타일 여러개 바인딩</td>
    <td rowspan=2><code>[style]="styleExpression"</code></td>
    <td><code>string</code></td>
    <td><code>"width: 100px; height: 100px"</code></td>
  </tr>
  <tr>
    <td><code>Record&lt;string, string | undefined | null&gt;</code></td>
    <td><code>{width: '100px', height: '100px'}</code></td>
  </tr>
</table>

<!--
<div class="alert is-helpful">

The [NgStyle](guide/built-in-directives/#ngstyle) directive can be used as an alternative to direct `[style]` bindings.
However, using the preceding style binding syntax without `NgStyle` is preferred because due to improvements in style binding in Angular, `NgStyle` no longer provides significant value, and might eventually be removed in the future.

</div>
-->
<div class="alert is-helpful">

[NgStyle](guide/built-in-directives/#ngstyle) 디렉티브를 사용하는 것보다는 직접 `[style]` 처럼 바인딩하는 것이 더 좋습니다.
`[style]`이라고 사용하는 것에 비해 `NgStyle` 디렉티브를 사용하는 것이 특별히 유리한 점이 없다고 판단되면, 이후 Angular 버전에는 스타일 바인딩 성능향상을 위해 `NgStyle` 디렉티브가 제거될 수 있습니다.

</div>


{@a styling-precedence}
<!--
## Styling Precedence
-->
## 스타일 우선순위

<!--
A single HTML element can have its CSS class list and style values bound to multiple sources (for example, host bindings from multiple directives).

When there are multiple bindings to the same class name or style property, Angular uses a set of precedence rules to resolve conflicts and determine which classes or styles are ultimately applied to the element.

<div class="alert is-helpful">
<h4>Styling precedence (highest to lowest)</h4>

1. Template bindings
    1. Property binding (for example, `<div [class.foo]="hasFoo">` or `<div [style.color]="color">`)
    1. Map binding (for example, `<div [class]="classExpr">` or `<div [style]="styleExpr">`)
    1. Static value (for example, `<div class="foo">` or `<div style="color: blue">`)
1. Directive host bindings
    1. Property binding (for example, `host: {'[class.foo]': 'hasFoo'}` or `host: {'[style.color]': 'color'}`)
    1. Map binding (for example, `host: {'[class]': 'classExpr'}` or `host: {'[style]': 'styleExpr'}`)
    1. Static value (for example, `host: {'class': 'foo'}` or `host: {'style': 'color: blue'}`)
1. Component host bindings
    1. Property binding (for example, `host: {'[class.foo]': 'hasFoo'}` or `host: {'[style.color]': 'color'}`)
    1. Map binding (for example, `host: {'[class]': 'classExpr'}` or `host: {'[style]': 'styleExpr'}`)
    1. Static value (for example, `host: {'class': 'foo'}` or `host: {'style': 'color: blue'}`)

</div>

The more specific a class or style binding is, the higher its precedence.

A binding to a specific class (for example, `[class.foo]`) takes precedence over a generic `[class]` binding, and a binding to a specific style (for example, `[style.bar]`) takes precedence over a generic `[style]` binding.

<code-example path="attribute-binding/src/app/app.component.html" region="basic-specificity" header="src/app/app.component.html"></code-example>

Specificity rules also apply when it comes to bindings that originate from different sources.
It's possible for an element to have bindings in the template where it's declared, from host bindings on matched directives, and from host bindings on matched components.

Template bindings are the most specific because they apply to the element directly and exclusively, so they have the highest precedence.

Directive host bindings are considered less specific because directives can be used in multiple locations, so they have a lower precedence than template bindings.

Directives often augment component behavior, so host bindings from components have the lowest precedence.

<code-example path="attribute-binding/src/app/app.component.html" region="source-specificity" header="src/app/app.component.html"></code-example>

In addition, bindings take precedence over static attributes.

In the following case, `class` and `[class]` have similar specificity, but the `[class]` binding takes precedence because it is dynamic.

<code-example path="attribute-binding/src/app/app.component.html" region="dynamic-priority" header="src/app/app.component.html"></code-example>
-->
HTML 엘리먼트 하나에 디렉티브가 여러개 적용되는 상황이라면 CSS 클래스 목록이나 스타일 값이 여러 번 바인딩될 수 있습니다.

이 때 같은 클래스 이름이나 스타일 프로퍼티가 여러 번 바인딩되면 Angular는 우선순위에 따라 엘리먼트에 적용될 클래스와 스타일을 결정합니다.

<div class="alert is-helpful">
<h4>스타일 우선순위(높은 순서부터 낮은 순서로)</h4>

1. 템플릿 바인딩
    1. 프로퍼티 바인딩 (ex. `<div [class.foo]="hasFoo">`, `<div [style.color]="color">`)
    1. 맵 바인딩 (ex. `<div [class]="classExpr">`, `<div [style]="styleExpr">`)
    1. 정적 값 (ex. `<div class="foo">`, `<div style="color: blue">`)
1. 디렉티브 호스트 바인딩
    1. 프로퍼티 바인딩 (ex. `host: {'[class.foo]': 'hasFoo'}` or `host: {'[style.color]': 'color'}`)
    1. 맵 바인딩 (ex. `host: {'[class]': 'classExpr'}`, `host: {'[style]': 'styleExpr'}`)
    1. 정적 값 (ex. `host: {'class': 'foo'}`, `host: {'style': 'color: blue'}`)
1. 컴포넌트 호스트 바인딩
    1. 프로퍼티 바인딩 (ex. `host: {'[class.foo]': 'hasFoo'}`, `host: {'[style.color]': 'color'}`)
    1. 맵 바인딩 (ex. `host: {'[class]': 'classExpr'}`, `host: {'[style]': 'styleExpr'}`)
    1. 정적 값 (ex. `host: {'class': 'foo'}`, `host: {'style': 'color: blue'}`)

</div>

그리고 더 구체적인 클래스/스타일 바인딩을 사용할수록 우선순위가 높습니다.

그래서 `[class.foo]`라고 바인딩하는 방식은 `[class]`라고 바인딩하는 것보다 우선순위가 높으며, 마찬가지로 `[style.bar]`라고 바인딩하는 방식은 `[style]`라고 바인딩하는 것보다 우선순위가 높습니다.

<code-example path="attribute-binding/src/app/app.component.html" region="basic-specificity" header="src/app/app.component.html"></code-example>

클래스/스타일의 우선순위를 결정하는 규칙은 여러 소스에서 바인딩을 하는 경우에 적용됩니다.
템플릿에서 직접 엘리먼트에 바인딩하거나, 디렉티브가 호스트 바인딩하는 경우, 컴포넌트가 호스트 바인딩하는 경우가 이런 경우에 해당됩니다.

이 중에서 템플릿 바인딩의 우선순위가 가장 높습니다.
엘리먼트에 직접, 명시적으로 적용되었기 때문입니다.

디렉티브 호스트 바인딩은 그 다음으로 우선순위가 높습니다.
디렉티브는 템플릿에 여러 번 사용될 수 있기 때문에 템플릿에서 직접 바인딩하는 것보다는 우선순위가 낮습니다.

디렉티브는 컴포넌트의 기능을 확장하기도 합니다.
그래서 컴포넌트 호스트 바인딩의 우선순위가 가장 낮습니다.

<code-example path="attribute-binding/src/app/app.component.html" region="source-specificity" header="src/app/app.component.html"></code-example>

추가로, 바인딩 문법은 정적 어트리뷰트 할당 방식보다 우선순위가 높습니다.

아래 코드에서 `class`와 `[class]`의 우선순위가 비슷할 것 같지만, `[class]`라고 바인딩한 것이 동적으로 할당되기 때문에 정적으로 할당한 것보다 우선순위가 높습니다.

<code-example path="attribute-binding/src/app/app.component.html" region="dynamic-priority" header="src/app/app.component.html"></code-example>


{@a styling-delegation}
<!--
### Delegating to styles with lower precedence
-->
### 낮은 우선순위로 적용하기

<!--
It is possible for higher precedence styles to "delegate" to lower precedence styles using `undefined` values.
Whereas setting a style property to `null` ensures the style is removed, setting it to `undefined` causes Angular to fall back to the next-highest precedence binding to that style.

For example, consider the following template:

<code-example path="attribute-binding/src/app/app.component.html" region="style-delegation" header="src/app/app.component.html"></code-example>

Imagine that the `dirWithHostBinding` directive and the `comp-with-host-binding` component both have a `[style.width]` host binding.
In that case, if `dirWithHostBinding` sets its binding to `undefined`, the `width` property falls back to the value of the `comp-with-host-binding` host binding.
However, if `dirWithHostBinding` sets its binding to `null`, the `width` property will be removed entirely.
-->
높은 우선순위에서 `undefined` 값을 지정하면 낮은 우선순위로 위임(delegate)할 수 있습니다.
이 때 `null` 값을 지정하면 스탕리 프로퍼티가 제거되기 때문에, 낮은 우선순위로 넘기려면 `undefined` 값을 지정해야 합니다.

템플릿이 이렇게 구성되었다고 합시다:

<code-example path="attribute-binding/src/app/app.component.html" region="style-delegation" header="src/app/app.component.html"></code-example>

`dirWithHostBinding` 디렉티브와 `comp-with-host-binding` 컴포넌트는 모두 호스트 바인딩으로 `[style.width]`라는 표현을 사용합니다.
이런 경우에 `dirWithHostBinding`에서 `undefined` 값을 바인딩하면 `width` 프로퍼티는 `comp-with-host-binding` 호스트 바인딩 결과로 결정됩니다.
`dirWithHostBinding`에서 `null` 값을 바인딩하면 `width` 프로퍼티가 엘리먼트에서 제거됩니다.


<!--
## Injecting attribute values
-->
## 어트리뷰트 값을 의존성으로 주입하기

<!--
There are cases where you need to differentiate the behavior of a [Component](api/core/Component) or [Directive](api/core/Directive) based on a static value set on the host element as an HTML attribute. For example, you might have a directive that needs to know the `type` of a `<button>` or `<input>` element.

The [Attribute](api/core/Attribute) parameter decorator is great for passing the value of an HTML attribute to a component/directive constructor using [dependency injection](guide/dependency-injection).

<div class="alert is-helpful">

  The injected value captures the value of the specified HTML attribute at that moment.
  Future updates to the attribute value are not reflected in the injected value.

</div>

<code-example
  path="attribute-binding/src/app/my-input-with-attribute-decorator.component.ts"
  header="src/app/my-input-with-attribute-decorator.component.ts">
</code-example>

<code-example
  path="attribute-binding/src/app/app.component.html"
  region="attribute-decorator"
  header="src/app/app.component.html">
</code-example>

In the preceding example, the result of `app.component.html` is **The type of the input is: number**.

Another example is the [RouterOutlet](api/router/RouterOutlet) directive, which makes use of the [Attribute](api/core/Attribute) decorator to retrieve the unique [name](api/router/RouterOutlet#description) on each outlet.

<div class="callout is-helpful">

  <header>@Attribute() vs @Input()</header>

  Remember, use [@Input()](api/core/Input) when you want to keep track of the attribute value and update the associated property. Use [@Attribute()](api/core/Attribute) when you want to inject the value of an HTML attribute to a component or directive constructor.

</div>
-->
호스트 엘리먼트에 있는 어트리뷰트 값을 [컴포넌트](api/core/Component)나 [디렉티브](api/core/Directive)에서 받아야 하는 경우가 있습니다.
`<button>` 엘리먼트나 `<input>` 엘리먼트에 적용된 `type` 값을 참조하는 디렉티브가 있다고 합시다.

이런 경우에 [Attribute](api/core/Attribute) 데코레이터를 사용하면 HTML 어트리뷰트에 지정된 값을 컴포넌트/디렉티브 생성자에 [의존성으로 주입](guide/dependency-injection)받을 수 있습니다.

<div class="alert is-helpful">

  의존성으로 주입되는 값은 의존성 주입이 일어난 시점의 HTML 어트리뷰트 값입니다.
  이후에 변경되는 HTML 어트리뷰트 값은 전달되지 않습니다.

</div>

<code-example
  path="attribute-binding/src/app/my-input-with-attribute-decorator.component.ts"
  header="src/app/my-input-with-attribute-decorator.component.ts">
</code-example>

<code-example
  path="attribute-binding/src/app/app.component.html"
  region="attribute-decorator"
  header="src/app/app.component.html">
</code-example>

이 예제에서 `app.component.html`은 **The type of the input is: number** dhk 같이 표시됩니다.

이 방식은 [RouterOutlet](api/router/RouterOutlet) 디렉티브에도 활용할 수 있습니다.
라우팅 영역의 [이름](api/router/RouterOutlet#description)을 [Attribute](api/core/Attribute) 데코레이터로 받아오는 방식으로 활용하면 됩니다.

<div class="callout is-helpful">

  <header>@Attribute() vs @Input()</header>

  어트리뷰트 값이 변경되는 것을 감지하려면 [@Input()](api/core/Input)를 사용해야 합니다. [@Attribute()](api/core/Attribute)는 컴포넌트/디렉티브 생성자에서 HTML 어트리뷰트의 값을 의존성으로 주입받는 용도로 사용하세요.

</div>
