<!--
# Built-in directives
-->
# 기본 디렉티브

<!--
Directives are classes that add additional behavior to elements
in your Angular applications.
Use Angular's built-in directives to manage forms, lists, styles, and what users see.

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

</div>

The different types of Angular directives are as follows:

1. [Components](guide/component-overview)&mdash;directives with a template.
  This type of directive is the most common directive type.
1. [Attribute directives](guide/built-in-directives#built-in-attribute-directives)&mdash;directives that change the appearance or behavior of an element, component, or another directive.
1. [Structural directives](guide/built-in-directives#built-in-structural-directives)&mdash;directives that change the DOM layout by adding and removing DOM elements.

This guide covers built-in [attribute directives](guide/built-in-directives#built-in-attribute-directives) and [structural directives](guide/built-in-directives#built-in-structural-directives).
-->
디렉티브는 Angular 애플리케이션 안에 있는 엘리먼트에 어떤 동작을 추가하는 클래스를 의미합니다.
Angular는 폼, 목록, 스타일 등에 적용할 수 있는 기본 디렉티브를 다양하게 제공합니다.

<div class="alert is-helpful">

이 문서에서 다루는 예제 앱은 <live-example></live-example>에서 직접 실행하거나 다운받아 확인할 수 있습니다.

</div>

Angular 디렉티브는 구체적으로 이렇게 구분할 수 있습니다:

1. [컴포넌트(Components)](guide/component-overview)&mdash;템플릿이 존재하는 디렉티브입니다.
  디렉티브 중에서는 컴포넌트 타입이 가장 많이 사용됩니다.
1. [어트리뷰트 디렉티브(Attribute directives)](guide/built-in-directives#built-in-attribute-directives)&mdash;엘리먼트, 컴포넌트, 디렉티브의 모습이나 동작을 변경하는 디렉티브입니다.
1. [구조 디렉티브(Structural directives)](guide/built-in-directives#built-in-structural-directives)&mdash;조건에 따라 DOM 엘리먼트를 추가하거나 제거하는 디렉티브입니다.

이 가이드 문서는 Angular가 기본으로 제공하는 [어트리뷰트 디렉티브](guide/built-in-directives#built-in-attribute-directives)와 [구조 디렉티브](guide/built-in-directives#built-in-structural-directives)에 대해 설명합니다.


{@a attribute-directives}
{@a built-in-attribute-directives}
<!--
## Built-in attribute directives
-->
## 기본 어트리뷰트 디렉티브

<!--
Attribute directives listen to and modify the behavior of other HTML elements, attributes, properties, and components.

Many NgModules such as the [`RouterModule`](guide/router "Routing and Navigation") and the [`FormsModule`](guide/forms "Forms") define their own attribute directives.
The most common attribute directives are as follows:

* [`NgClass`](guide/built-in-directives#ngClass)&mdash;adds and removes a set of CSS classes.
* [`NgStyle`](guide/built-in-directives#ngstyle)&mdash;adds and removes a set of HTML styles.
* [`NgModel`](guide/built-in-directives#ngModel)&mdash;adds two-way data binding to an HTML form element.

<div class="alert is-helpful">

Built-in directives use only public APIs.
They do not have special access to any private APIs that other directives can't access.

</div>
-->
어트리뷰트 디렉티브는 HTML 엘리먼트, 어트리뷰트, 프로퍼티, 컴포넌트의 동작을 변경합니다.

[`RouterModule`](guide/router "Routing and Navigation")이나 [`FormsModule`](guide/forms "Forms")과 같이 어트리뷰트 디렉티브를 제공하는 NgModule도 많습니다.
이 중 자주 사용하는 어트리뷰트 디렉티브는 이런 것들이 있습니다:

* [`NgClass`](guide/built-in-directives#ngClass)&mdash;CSS 클래스를 추가하거나 제거합니다.
* [`NgStyle`](guide/built-in-directives#ngstyle)&mdash;HTML 스타일을 추가하거나 제거합니다.
* [`NgModel`](guide/built-in-directives#ngModel)&mdash;HTML 폼 엘리먼트에 양방향 데이터 바인딩을 연결합니다.

<div class="alert is-helpful">

기본 디렉티브는 모듈 외부로 공개된 API만 사용하세요.
외부로 공개되지 않은 API는 접근할 수 없습니다.

</div>


{@a ngClass}
<!--
## Adding and removing classes with `NgClass`
-->
## `NgClass`로 클래스 추가/제거하기

<!--
Add or remove multiple CSS classes simultaneously with `ngClass`.

<div class="alert is-helpful">

To add or remove a *single* class, use [class binding](guide/attribute-binding#class-binding) rather than `NgClass`.

</div>
-->
`ngClass`를 사용하면 CSS 클래스 여러 개를 엘리먼트에 동시에 추가하거나 제거할 수 있습니다.

<div class="alert is-helpful">

클래스를 하나만 추가하거나 제거한다면 `NgClass`보다 [클래스 바인딩](guide/attribute-binding#class-binding)을 사용하는 것이 더 좋습니다.

</div>


<!--
### Using `NgClass` with an expression
-->
### `NgClass`에 표현식 사용하기

<!--
On the element you'd like to style, add `[ngClass]` and set it equal to an expression.
In this case, `isSpecial` is a boolean set to `true` in `app.component.ts`.
Because `isSpecial` is true, `ngClass` applies the class of `special` to the `<div>`.

<code-example path="built-in-directives/src/app/app.component.html" region="special-div" header="src/app/app.component.html"></code-example>
-->
엘리먼트에 스타일을 지정하듯이, 엘리먼트에 `[ngClass]`를 추가하고 이 디렉티브에 표현식을 지정할 수 있습니다.
`app.component.ts` 파일에서 `isSpecial` 프로퍼티 값이 `true`로 지정되었다고 합시다.
그러면 `isSpecial`의 값이 `ngClass`에 반영되면서 `<div>`에 `special` 클래스가 추가됩니다.

<code-example path="built-in-directives/src/app/app.component.html" region="special-div" header="src/app/app.component.html"></code-example>


<!--
### Using `NgClass` with a method
-->
### `NgClass`에 메서드 사용하기

<!--
1. To use `NgClass` with a method, add the method to the component class.
  In the following example, `setCurrentClasses()` sets the property `currentClasses` with an object that adds or removes three classes based on the `true` or `false` state of three other component properties.

  Each key of the object is a CSS class name.
  If a key is `true`, `ngClass` adds the class.
  If a key is `false`, `ngClass` removes the class.

  <code-example path="built-in-directives/src/app/app.component.ts" region="setClasses" header="src/app/app.component.ts"></code-example>

1. In the template, add the `ngClass` property binding to `currentClasses` to set the element's classes:

  <code-example path="built-in-directives/src/app/app.component.html" region="NgClass-1" header="src/app/app.component.html"></code-example>

For this use case, Angular applies the classes on initialization and in case of changes.
The full example calls `setCurrentClasses()` initially with `ngOnInit()` and when the dependent properties change through a button click.
These steps are not necessary to implement `ngClass`.
For more information, see the <live-example></live-example> `app.component.ts` and `app.component.html`.
-->
1. `NgClass`에 메서드를 사용하려면 이 메서드를 컴포넌트 클래스에 정의해야 합니다.
  아래 예제에서 `setCurrentClasses()` 메서드는 컴포넌트의 다른 프로퍼티 값을 참조해서 객체 형태로 `currentClasses` 프로퍼티 값을 할당합니다.

  이 때 객체의 키는 CSS 클래스 이름입니다.
  키에 할당된 값이 `true`이면 `ngClass`가 해당 키를 클래스로 추가합니다.
  키에 할당된 값이 `false`이면 `ngClass`가 해당 키를 클래스에서 제거합니다.

  <code-example path="built-in-directives/src/app/app.component.ts" region="setClasses" header="src/app/app.component.ts"></code-example>

1. 템플릿에서는 엘리먼트의 `ngClass`를 `currentCalsses` 프로퍼티와 바인딩하면 됩니다:

  <code-example path="built-in-directives/src/app/app.component.html" region="NgClass-1" header="src/app/app.component.html"></code-example>

이렇게 구현하면 Angular는 변화를 감지할 때마다 엘리먼트에 적용되는 클래스를 계산합니다.
그래서 `ngOnInit()`이 실행될 때 `setCurrentClasses()`가 처음 실행되며, 버튼을 클릭할 때마다 계속 실행됩니다.
이 동작은 `ngClass`가 유발하는 것이 아닙니다.
자세한 내용은 <live-example></live-example>에서 `app.component.ts`와 `app.component.html` 파일을 참고하세요.


{@a ngstyle}
<!--
## Setting inline styles with `NgStyle`
-->
## `NgStyle`로 인라인 스타일 지정하기

<!--
Use `NgStyle` to set multiple inline styles simultaneously, based on the state of the component.

1. To use `NgStyle`, add a method to the component class.

  In the following example, `setCurrentStyles()` sets the property `currentStyles` with an object that defines three styles, based on the state of three other component properties.

  <code-example path="built-in-directives/src/app/app.component.ts" region="setStyles" header="src/app/app.component.ts"></code-example>

1. To set the element's styles, add an `ngStyle` property binding to `currentStyles`.

  <code-example path="built-in-directives/src/app/app.component.html" region="NgStyle-2" header="src/app/app.component.html"></code-example>

For this use case, Angular applies the styles upon initialization and in case of changes.
To do this, the full example calls `setCurrentStyles()` initially with `ngOnInit()` and when the dependent properties change through a button click.
However, these steps are not necessary to implement `ngStyle` on its own.
See the <live-example></live-example> `app.component.ts` and `app.component.html` for this optional implementation.
-->
`NgStyle`을 활용하면 컴포넌트 상태에 따라 달라지는 여러 인라인 스타일을 동시에 지정할 수 있습니다.

1. `NgStyle`을 사용하기 위해 컴포넌트 클래스에 메서드를 추가합니다.

  아래 예제에서 `setCurrentStyles()`는 컴포넌트의 다른 프로퍼티 값을 참조해서 객체 형태로 `currentStyles` 프로퍼티 값을 할당합니다.

  <code-example path="built-in-directives/src/app/app.component.ts" region="setStyles" header="src/app/app.component.ts"></code-example>

1. 엘리먼트의 스타일을 지정하려면 `ngStyle`을 `currentStyles` 프로퍼티와 바인딩하면 됩니다.

  <code-example path="built-in-directives/src/app/app.component.html" region="NgStyle-2" header="src/app/app.component.html"></code-example>

이렇게 구현하면 Angular는 변화를 감지할 때마다 엘리먼트에 적용되는 스타일을 계산합니다.
그래서 `ngOnInit()`이 실행될 때 `setCurrentStyles()`가 처음 실행되며, 버튼을 클릭할 때마다 계속 실행됩니다.
이 동작은 `ngStyle`이 유발하는 것이 아닙니다.
자세한 내용은 <live-example></live-example>에서 `app.component.ts`와 `app.component.html` 파일을 참고하세요.


{@a ngModel}
<!--
## Displaying and updating properties with `ngModel`
-->
## `ngModel`로 프로퍼티 값 표시하기, 변경된 값 반영하기

<!--
Use the `NgModel` directive to display a data property and update that property when the user makes changes.

1. Import `FormsModule`  and add it to the NgModule's `imports` list.

  <code-example path="built-in-directives/src/app/app.module.ts" header="src/app/app.module.ts (FormsModule import)" region="import-forms-module"></code-example>

1. Add an `[(ngModel)]` binding on an HTML `<form>` element and set it equal to the property, here `name`.

  <code-example path="built-in-directives/src/app/app.component.html" header="src/app/app.component.html (NgModel example)" region="NgModel-1"></code-example>

  This `[(ngModel)]` syntax can only set a data-bound property.

To customize your configuration, write the expanded form, which separates the property and event binding.
Use [property binding](guide/property-binding) to set the property and [event binding](guide/event-binding) to respond to changes.
The following example changes the `<input>` value to uppercase:

<code-example path="built-in-directives/src/app/app.component.html" region="uppercase" header="src/app/app.component.html"></code-example>

Here are all variations in action, including the uppercase version:

<div class="lightbox">
  <img src='generated/images/guide/built-in-directives/ng-model-anim.gif' alt="NgModel variations">
</div>
-->
`NgModel` 디렉티브를 활용하면 데이터 프로퍼티의 값을 화면에 표시할 수 있으며, 사용자가 이 값을 변경했을 때 클래스 프로퍼티에 반영할 수 있습니다.

1. NgModule `imports` 목록에 `FormsModule`를 불러와서 추가합니다.

  <code-example path="built-in-directives/src/app/app.module.ts" header="src/app/app.module.ts (FormsModule 불러오기)" region="import-forms-module"></code-example>

1. HTML `<form>` 엘리먼트에 `[(ngModel)]` 바인딩 문법을 추가하고 이 바인딩 오른쪽에 프로퍼티를 할당합니다. 이 예제에서는 `name`을 지정합니다.

  <code-example path="built-in-directives/src/app/app.component.html" header="src/app/app.component.html (NgModel 예제)" region="NgModel-1"></code-example>

  `[(ngModel)]`라는 문법은 프로퍼티를 단순하게 바인딩하는 문법입니다.

바인딩 동작을 커스터마이징하려면 `[()]` 문법을 사용하지 않고 프로퍼티 바인딩(`[]`)과 이벤트 바인딩(`()`)을 나눠서 작성하면 됩니다.
이 때 [프로퍼티 바인딩](guide/property-binding)은 프로퍼티 값을 바인딩하며, [이벤트 바인딩](guide/event-binding)은 이 값이 변경되는 것을 감지하는 동작을 합니다.
아래 코드는 `<input>` 엘리먼트에 입력된 값을 대문자로 변환하는 예제 코드입니다:

<code-example path="built-in-directives/src/app/app.component.html" region="uppercase" header="src/app/app.component.html"></code-example>

`NgModel`은 다양한 방식으로 구현할 수 있습니다:

<div class="lightbox">
  <img src='generated/images/guide/built-in-directives/ng-model-anim.gif' alt="NgModel variations">
</div>


<!--
### `NgModel` and value accessors
-->
### `NgModel`과 값 접근자(value accessor)

<!--
The `NgModel` directive works for an element supported by a [ControlValueAccessor](api/forms/ControlValueAccessor).
Angular provides *value accessors* for all of the basic HTML form elements.
For more information, see [Forms](guide/forms).

To apply `[(ngModel)]` to a non-form built-in element or a third-party custom component, you have to write a value accessor.
For more information, see the API documentation on [DefaultValueAccessor](api/forms/DefaultValueAccessor).

<div class="alert is-helpful">

When you write an Angular component, you don't need a value accessor or `NgModel` if you  name the value and event properties according to Angular's [two-way binding syntax](guide/two-way-binding#how-two-way-binding-works).

</div>
-->
`NgModel` 디렉티브는 [ControlValueAccessor](api/forms/ControlValueAccessor)가 제공되는 엘리먼트에서만 제대로 동작합니다.
그리고 Angular는 표준 HTML 폼 엘리먼트에 대해서는 모두 *값 접근자* 를 제공합니다.
자세한 내용은 [폼](guide/forms) 문서를 참고하세요.

표준 폼 엘리먼트가 아닌 엘리먼트나 서드 파티 컴포넌트에 `[(ngModel)]`을 적용하려면 값 접근자를 직접 구현해야 합니다.
자세한 내용은 [DefaultValueAccessor](api/forms/DefaultValueAccessor) API 문서를 참고하세요.

<div class="alert is-helpful">

Angular 컴포넌트에는 값 접근자나 `NgModel`을 사용할 필요 없이 Angular가 제공하는 [양방향 바인딩 문법](guide/two-way-binding#how-two-way-binding-works)을 활용하면 됩니다.

</div>


{@a structural-directives}
{@a built-in-structural-directives}
<!--
## Built-in structural directives
-->
## 기본 구조 디렉티브

<!--
Structural directives are responsible for HTML layout.
They shape or reshape the DOM's structure, typically by adding, removing, and manipulating the host elements to which they are attached.

This section introduces the most common built-in structural directives:

* [`NgIf`](guide/built-in-directives#ngIf)&mdash;conditionally creates or disposes of subviews from the template.
* [`NgFor`](guide/built-in-directives#ngFor)&mdash;repeat a node for each item in a list.
* [`NgSwitch`](guide/built-in-directives#ngSwitch)&mdash;a set of directives that switch among alternative views.

For more information, see [Structural Directives](guide/structural-directives).
-->
구조 디렉티브는 HTML의 모습을 조작합니다.
구조 디렉티브는 조건에 맞는 엘리먼트를 DOM 트리에 추가하거나, 제거, 조작하는 방식으로 DOM 구조를 변형합니다.

이번 섹션에서는 구조 디렉티브 중 가장 많이 사용하는 이런 디렉티브들을 알아봅시다:

* [`NgIf`](guide/built-in-directives#ngIf)&mdash;조건에 따라 템플릿의 일부를 DOM 트리에 추가하거나 DOM 트리에서 제거합니다.
* [`NgFor`](guide/built-in-directives#ngFor)&mdash;배열에 있는 항목마다 템플릿 일부를 반복합니다.
* [`NgSwitch`](guide/built-in-directives#ngSwitch)&mdash;조건에 맞는 화면을 DOM 트리에 추가합니다.

자세한 내용은 [구조 디렉티브](guide/structural-directives) 문서를 참고하세요.


{@a ngIf}
<!--
## Adding or removing an element with `NgIf`
-->
## `NgIf`로 엘리먼트 추가/제거하기

<!--
Add or remove an element by applying an `NgIf` directive to a host element.

When `NgIf` is `false`, Angular removes an element and its descendants from the DOM.
Angular then disposes of their components, which frees up memory and resources.

To add or remove an element, bind `*ngIf` to a condition expression such as `isActive` in the following example.

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-1" header="src/app/app.component.html"></code-example>

When the `isActive` expression returns a truthy value, `NgIf` adds the `ItemDetailComponent` to the DOM.
When the expression is falsy, `NgIf` removes the `ItemDetailComponent` from the DOM and disposes of the component and all of its sub-components.

For more information on `NgIf` and `NgIfElse`, see the [NgIf API documentation](api/common/NgIf).
-->
`NgIf` 디렉티브를 사용하면 엘리먼트를 이 호스트 엘리먼트에 추가하거나 호스트 엘리먼트에서 제거할 수 있습니다.

`NgIf`에 할당되는 값이 `false` 이면 Angular는 해당 엘리먼트를 자식 노드와 함께 DOM 트리에서 완전히 제거합니다.
그래서 메모리 사용량과 리소스 사용량을 줄일 수 있습니다.

엘리먼트를 DOM 트리에 추가하거나 제거하려면 `*ngIf` 디렉티브에 `isActive`와 같은 조건 표현식을 바인딩하면 됩니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-1" header="src/app/app.component.html"></code-example>

이렇게 작성하면 `isActive` 표현식이 참으로 평가되는 값을 반환할 때 `NgIf`가 `ItemDetailComponent`를 DOM 트리에 추가합니다.
그리고 표현식이 거짓으로 평가되는 값을 반환하면 `NgIf`가 `ItemDetailComponent`를 DOM 트리에서 제거하고 해당 컴포넌트와 이 컴포넌트의 자식 컴포넌트를 모두 종료합니다.

`NgIf`와 `NgIfElse`에 대해 자세하게 알아보려면 [NgIf API 문서](api/common/NgIf)를 참고하세요.


<!--
### Guarding against `null`
-->
### `null` 값 방지하기

<!--
By default, `NgIf` prevents display of an element bound to a null value.

To use `NgIf` to guard a `<div>`, add `*ngIf="yourProperty"` to the `<div>`.
In the following example, the `currentCustomer` name appears because there is a `currentCustomer`.

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2" header="src/app/app.component.html"></code-example>

However, if the property is `null`, Angular does not display the `<div>`.
In this example, Angular does not display the `nullCustomer` because it is `null`.

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2b" header="src/app/app.component.html"></code-example>
-->
기본적으로 `NgIf`에 null 값이 바인딩되면 엘리먼트를 DOM 트리에 추가하지 않습니다.

그래서 `NgIf`를 가드로 사용하려면 `<div>`에 `*ngIf="프로퍼티"`라는 식으로 구현하면 됩니다.
아래 코드에서는 `currentCustomer` 값이 존재하기 때문에 `currentCustomer`의 이름이 화면에 표시됩니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2" header="src/app/app.component.html"></code-example>

하지만 프로퍼티 값이 `null`이면 Angular는 `<div>`를 DOM 트리에 추가하지 않습니다.
아래 코드에서는 `nullCustomer` 값이 `null`이기 때문에 해당 `<div>`가 화면에 표시되지 않습니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2b" header="src/app/app.component.html"></code-example>


{@a ngFor}
<!--
## Listing items with `NgFor`
-->
## `NgFor`로 배열 항목 표시하기

<!--
Use the `NgFor` directive to present a list of items.

1. Define a block of HTML that determines how Angular renders a single item.

1. To list your items, assign the short hand `let item of items` to `*ngFor`.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1" header="src/app/app.component.html"></code-example>

The string `"let item of items"` instructs Angular to do the following:

  * Store each item in the `items` array in the local `item` looping variable
  * Make each item available to the templated HTML for each iteration
  * Translate `"let item of items"` into an `<ng-template>` around the host element
  * Repeat the `<ng-template>` for each `item` in the list

For more information see the [Structural directive shorthand](guide/structural-directives#shorthand) section of [Structural directives](guide/structural-directives).
-->
`NgFor` 디렉티브를 활용하면 배열에 있는 항목을 화면에 표시할 수 있습니다.

1. 개별 항목마다 반복할 HTML 템플릿을 구성합니다.

1. 배열을 순회하기 위해 `*ngFor`를 적용하고 이 디렉티브 오른쪽에 `let item of items`을 연결합니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1" header="src/app/app.component.html"></code-example>

Angular는 `"let item of items"`라는 문자열을 이렇게 처리합니다:

  * `items` 배열에 있는 개별 항목을 지역 변수 `item`에 할당합니다.
  * `item` 변수는 반복되는 HTML 템플릿 안에서만 사용할 수 있습니다.
  * `"let item of items"`라는 문자열이 `<ng-template>`으로 변환됩니다.
  * 배열에 있는 항목마다 `<ng-template>`이 반복됩니다.

자세한 내용은 [구조 디렉티브](guide/structural-directives) 문서의 [구조 디렉티브 단축문법](guide/structural-directives#shorthand) 섹션을 참고하세요.


<!--
### Repeating a component view
-->
### 컴포넌트 화면 반복하기

<!--
To repeat a component element, apply `*ngFor` to the selector.
In the following example, the selector is `<app-item-detail>`.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-2" header="src/app/app.component.html"></code-example>

Reference a template input variable, such as `item`, in the following locations:

  * within the `ngFor` host element
  * within the host element descendants to access the item's properties

The following example references `item` first in an interpolation and then passes in a binding to the `item` property of the `<app-item-detail>` component.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1-2" header="src/app/app.component.html"></code-example>

For more information about template input variables, see [Structural directive shorthand](guide/structural-directives#shorthand).
-->
`*ngFor`는 컴포넌트 엘리먼트를 반복할 때도 활용할 수 있습니다.
아래 코드는 `<app-item-detail>` 컴포넌트를 반복하는 예제 코드입니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-2" header="src/app/app.component.html"></code-example>

이 때 템플릿 입력 변수 `item`은 이런 범위에서 참조할 수 있습니다:

  * `ngFor`가 적용된 호스트 엘리먼트 안쪽에서
  * 호스트 엘리먼트의 자식 엘리먼트에서

아래 코드는 `item`을 문자열 바인딩하면서 한 번, `<app-item-detail>` 컴포넌트의 `item` 프로퍼티에 바인딩할 때 한 번 참조했습니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1-2" header="src/app/app.component.html"></code-example>

템플릿 입력 변수에 대해 자세하게 알아보려면 [구조 디렉티브 단축문법](guide/structural-directives#shorthand) 문서를 참고하세요.


<!--
### Getting the `index` of `*ngFor`
-->
### `*ngFor`에서 `index` 활용하기

<!--
Get the `index` of `*ngFor` in a template input variable and use it in the template.

In the `*ngFor`, add a semicolon and `let i=index` to the short hand.
The following example gets the `index` in a variable named `i` and displays it with the item name.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-3" header="src/app/app.component.html"></code-example>

The index property of the `NgFor` directive context returns the zero-based index of the item in each iteration.

Angular translates this instruction into an `<ng-template>` around the host element,
then uses this template repeatedly to create a new set of elements and bindings for each `item`
in the list.
For more information about shorthand, see the [Structural Directives](guide/structural-directives#shorthand) guide.
-->
`*ngFor`로 반복되는 템플릿 안쪽에서는 `index`를 받아서 활용할 수도 있습니다.

`*ngFor`에 작성한 단축문법 안에 세미 콜론(`;`)과 `let i=index`을 추가해 보세요.
아래 코드는 `index`를 `i` 변수로 받아온 다음에 이름 앞에 표시하는 예제 코드입니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-3" header="src/app/app.component.html"></code-example>

이 때 인덱스 프로퍼티는 `NgFor` 디렉티브 컨텍스트로 제공되며, 0부터 시작해서 배열의 항목을 순회할 때마다 증가합니다.

`*ngFor` 표현식을 이렇게 작성하면 호스트 엘리먼트 근처에 `<ng-template>`이 추가되면서 배열에 있는 `item` 항목마다 반복되면서 `item` 프로퍼티가 바인딩됩니다.
단축문법에 대해 더 자세하게 알아보려면 [구조 디렉티브](guide/structural-directives#shorthand) 문서를 참고하세요.


{@a one-per-element}
<!--
## Repeating elements when a condition is true
-->
## 조건이 참일 때만 엘리먼트 반복하기

<!--
To repeat a block of HTML when a particular condition is true, put the `*ngIf` on a container element that wraps an `*ngFor` element.
One or both elements can be an `<ng-container>` so you don't have to introduce extra levels of HTML.

Because structural directives add and remove nodes from the DOM, apply only one structural directive per element.

For more information about `NgFor` see the [NgForOf API reference](api/common/NgForOf).
-->
조건이 참일 때만 HTML 영역을 반복하려면 `*ngFor`를 적용한 엘리먼트 안에 `*ngIf` 컨테이너 엘리먼트를 추가하면 됩니다.
그리고 이 때 `<ng-container>`를 활용하면 추가 엘리먼트 단계를 생략할 수 있습니다.

다만, 구조 디렉티브는 DOM 트리에서 노드를 추가하거나 제거하기 때문에 엘리먼트 하나에는 구조 디렉티브도 하나만 적용할 수 있습니다.

자세한 내용은 [NgForOf API 문서](api/common/NgForOf)를 참고하세요.


{@a ngfor-with-trackby}
<!--
### Tracking items with `*ngFor` `trackBy`
-->
### `*ngFor` `trackBy`로 항목 추적하기

<!--
Reduce the number of calls your application makes to the server by tracking changes to an item list.
With the `*ngFor` `trackBy` property, Angular can change and re-render only those items that have changed, rather than reloading the entire list of items.

1. Add a method to the component that returns the value `NgFor` should track.
  In this example, the value to track is the item's `id`.
  If the browser has already rendered `id`, Angular keeps track of it and doesn't re-query the server for the same `id`.

  <code-example path="built-in-directives/src/app/app.component.ts" region="trackByItems" header="src/app/app.component.ts"></code-example>

1. In the short hand expression, set `trackBy` to the `trackByItems()` method.

  <code-example path="built-in-directives/src/app/app.component.html" region="trackBy" header="src/app/app.component.html"></code-example>

**Change ids** creates new items with new `item.id`s.
In the following illustration of the `trackBy` effect, **Reset items** creates new items with the same `item.id`s.

* With no `trackBy`, both buttons trigger complete DOM element replacement.
* With `trackBy`, only changing the `id` triggers element replacement.

<div class="lightbox">
  <img src="generated/images/guide/built-in-directives/ngfor-trackby.gif" alt="Animation of trackBy">
</div>
-->
배열 항목이 변경되는 것을 추적하면 불필요한 함수 실행 횟수를 줄일 수 있습니다.
`*ngFor` `trackBy` 프로퍼티를 사용하면 Angular는 배열에서 변경된 항목만 화면에서 갱신하고 렌더링을 새로 합니다.
이 경우에는 배열 전체를 다시 불러오지 않습니다.

1. `NgFor`가 추적할 값을 반환하는 메서드를 컴포넌트에 추가합니다.
  이번 예제에서는 항목의 `id`를 추적해 봅시다.
  그러면 이미 브라우저에 렌더링 된 `id` 항목은 화면에 그대로 유지하며 서버로 쿼리를 보내지 않습니다.

  <code-example path="built-in-directives/src/app/app.component.ts" region="trackByItems" header="src/app/app.component.ts"></code-example>

1. 단축문법 표현식에 `trackBy`와 `trackByItems()` 메서드를 연결합니다.

  <code-example path="built-in-directives/src/app/app.component.html" region="trackBy" header="src/app/app.component.html"></code-example>

**Change ids** 버튼은 새로운 `item.id`로 항목을 추가하는 버튼입니다.
`trackBy`가 동작하는 것을 확인해 보세요.
**Reset items** 버튼을 누르면 `item.id`를 원래대로 되돌립니다.

* `trackBy`가 사용되지 않은 쪽에서는 버튼을 누르면 DOM 엘리먼트가 전부 교체됩니다.
* `trackBy`를 사용하면 실제로 `id`가 변경된 엘리먼트만 교체됩니다.

<div class="lightbox">
  <img src="generated/images/guide/built-in-directives/ngfor-trackby.gif" alt="Animation of trackBy">
</div>


{@a ngcontainer}
<!--
## Hosting a directive without a DOM element
-->
## DOM 엘리먼트 추가 없이 디렉티브 적용하기

<!--
The Angular `<ng-container>` is a grouping element that doesn't interfere with styles or layout because Angular doesn't put it in the DOM.

Use `<ng-container>` when there's no single element to host the directive.

Here's a conditional paragraph using `<ng-container>`.

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngif-ngcontainer)" region="ngif-ngcontainer"></code-example>


<div class="lightbox">
  <img src='generated/images/guide/structural-directives/good-paragraph.png' alt="ngcontainer paragraph with proper style">
</div>

1. Import the `ngModel` directive from `FormsModule`.

1. Add `FormsModule` to the imports section of the relevant Angular module.

1. To conditionally exclude an `<option>`, wrap the `<option>` in an `<ng-container>`.

  <code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (select-ngcontainer)" region="select-ngcontainer"></code-example>

  <div class="lightbox">
    <img src='generated/images/guide/structural-directives/select-ngcontainer-anim.gif' alt="ngcontainer options work properly">
  </div>
-->
Angular가 제공하는 `<ng-container>`는 스타일이나 레이아웃에 영향을 주지 않으면서 엘리먼트를 묶을 때 사용합니다.
`<ng-container>`는 실제로 DOM 트리에 추가되지 않기 때문입니다.

그래서 `<ng-container>`는 템플릿 어느 곳에라도 자유롭게 사용할 수 있습니다.

`<p>` 엘리먼트 일부에 `<ng-container>`을 적용하려면 이렇게 구현하면 됩니다.

<code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (ngif-ngcontainer)" region="ngif-ngcontainer"></code-example>


<div class="lightbox">
  <img src='generated/images/guide/structural-directives/good-paragraph.png' alt="ngcontainer paragraph with proper style">
</div>

1. `FormsModule`이 제공하는 `ngModel` 디렉티브를 불러옵니다.

1. 상위 Angular 모듈에 `FormsModule`을 등록합니다.

1. 조건에 해당되는 `<option>`만 표시하려면 `<option>`를 `<ng-container>`로 감싸면 됩니다.

  <code-example path="structural-directives/src/app/app.component.html" header="src/app/app.component.html (select-ngcontainer)" region="select-ngcontainer"></code-example>

  <div class="lightbox">
    <img src='generated/images/guide/structural-directives/select-ngcontainer-anim.gif' alt="ngcontainer options work properly">
  </div>


{@a ngSwitch}
<!--
## Switching cases with `NgSwitch`
-->
## `NgSwitch` 활용하기

<!--
Like the JavaScript `switch` statement, `NgSwitch` displays one element from among several possible elements, based on a switch condition.
Angular puts only the selected element into the DOM.
<!- API Flagged ->
`NgSwitch` is a set of three directives:

  * `NgSwitch`&mdash;an attribute directive that changes the behavior of its companion directives.
  * `NgSwitchCase`&mdash;structural directive that adds its element to the DOM when its bound value equals the switch value and removes its bound value when it doesn't equal the switch value.
  * `NgSwitchDefault`&mdash;structural directive that adds its element to the DOM when there is no selected `NgSwitchCase`.

1. On an element, such as a `<div>`, add `[ngSwitch]` bound to an expression that returns the switch value, such as `feature`.
  Though the `feature` value in this example is a string, the switch value can be of any type.

1. Bind to `*ngSwitchCase` and `*ngSwitchDefault` on the elements for the cases.

  <code-example path="built-in-directives/src/app/app.component.html" region="NgSwitch" header="src/app/app.component.html"></code-example>

1. In the parent component, define `currentItem`, to use it in the `[ngSwitch]` expression.

  <code-example path="built-in-directives/src/app/app.component.ts" region="item" header="src/app/app.component.ts"></code-example>

1. In each child component, add an `item` [input property](guide/inputs-outputs#input "Input property") which is bound to the `currentItem` of the parent component.
  The following two snippets show the parent component and one of the child components.
  The other child components are identical to `StoutItemComponent`.

  <code-example path="built-in-directives/src/app/item-switch.component.ts" region="input" header="In each child component, here StoutItemComponent"></code-example>

  <div class="lightbox">
    <img src="generated/images/guide/built-in-directives/ngswitch.gif" alt="Animation of NgSwitch">
  </div>

Switch directives also work with built-in HTML elements and web components.
For example, you could replace the `<app-best-item>` switch case with a `<div>` as follows.

<code-example path="built-in-directives/src/app/app.component.html" region="NgSwitch-div" header="src/app/app.component.html"></code-example>
-->
JavaScript `siwtch` 구문과 비슷하게, `NgSwitch`는 여러 엘리먼트 중에서 조건에 맞는 엘리먼트 하나를 DOM 트리에 추가하는 디렉티브입니다.

`NgSwitch`는 디렉티브 3개로 구성됩니다:

  * `NgSwitch`&mdash;관련 디렉티브의 동작을 조작하는 어트리뷰트 디렉티브입니다.
  * `NgSwitchCase`&mdash;조건에 맞으면 DOM 트리에 엘리먼트를 추가하고, 조건에 맞지 않으면 DOM 트리에서 엘리먼트를 제거하는 구조 디렉티브입니다.
  * `NgSwitchDefault`&mdash;`NgSwitchCase` 어디 경우에도 해당되지 않을 때 DOM 트리에 엘리먼트를 추가하는 구조 디렉티브입니다.

1. `<div>`와 같은 엘리먼트에 `[ngSwitch]`를 추가하고 이 바인딩 오른쪽에 표현식을 지정합니다. 이번 예제에서는 `feature`를 지정했습니다.
  이 예제에서 `feature` 값은 문자열이지만, `NgSwitch` 디렉티브는 타입을 가리지 않습니다.

1. `*ngSwitchCase`와 `*ngSwitchDefault`를 이렇게 적용합니다.

  <code-example path="built-in-directives/src/app/app.component.html" region="NgSwitch" header="src/app/app.component.html"></code-example>

1. `[ngSwitch]` 표현식에 연결할 프로퍼티로 부모 컴포넌트에 `currentItem`을 선언합니다.

  <code-example path="built-in-directives/src/app/app.component.ts" region="item" header="src/app/app.component.ts"></code-example>

1. 자식 컴포넌트에 `item` [입력 프로퍼티](guide/inputs-outputs#input "Input property")를 선언합니다.
  이 프로퍼티에는 부모 컴포넌트에서 바인딩되는 `currentItem`이 할당됩니다.
  아래 코드 2개를 보면서 부모 컴포넌트와 자식 컴포넌트가 어떻게 연결되는지 확인해 보세요.
  `StoutItemComponent`의 클래스 코드를 확인해보면 이렇습니다.

  <code-example path="built-in-directives/src/app/item-switch.component.ts" region="input" header="In each child component, here StoutItemComponent"></code-example>

  <div class="lightbox">
    <img src="generated/images/guide/built-in-directives/ngswitch.gif" alt="Animation of NgSwitch">
  </div>

스위치 디렉티브는 표준 HTML 엘리먼트나 웹 컴포넌트를 대상으로도 잘 동작합니다.
`<app-best-item>`는 아래 코드처럼 `<div>`에 적용해도 됩니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgSwitch-div" header="src/app/app.component.html"></code-example>


<!--
## What's next
-->
## 다음 단계

<!--
For information on how to build your own custom directives, see [Attribute Directives](guide/attribute-directives) and [Structural Directives](guide/structural-directives).
-->
커스텀 디렉티브를 어떻게 정의하는지 확인하려면 [구조 디렉티브](guide/structural-directives) 문서의 [어트리뷰트 디렉티브](guide/attribute-directives) 섹션을 참고하세요.