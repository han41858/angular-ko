<!--
<docs-decorative-header title="Built-in directives" imgSrc="adev/src/assets/images/directives.svg"> <!- markdownlint-disable-line ->
Directives are classes that add additional behavior to elements in your Angular applications.
</docs-decorative-header>

Use Angular's built-in directives to manage forms, lists, styles, and what users see.

The different types of Angular directives are as follows:

| Directive Types                                                  | Details                                                                           |
| :--------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| [Components](guide/components)                                   | Used with a template. This type of directive is the most common directive type.   |
| [Attribute directives](#built-in-attribute-directives)           | Change the appearance or behavior of an element, component, or another directive. |
| [Structural directives](/guide/directives/structural-directives) | Change the DOM layout by adding and removing DOM elements.                        |

This guide covers built-in [attribute directives](#built-in-attribute-directives).
-->
<docs-decorative-header title="기본 디렉티브" imgSrc="adev/src/assets/images/directives.svg"> <!-- markdownlint-disable-line -->
디렉티브(directive)는 Angular 애플리케이션 안에서 엘리먼트에 어떤 동작을 추가하는 클래스입니다.
</docs-decorative-header>

Angular가 제공하는 기본 디렉티브는 폼, 목록, 스타일 등에 다양하게 활용됩니다.

디렉티브는 두 종류로 구분됩니다:

| 종류                                                 | 설명                                  |
|:---------------------------------------------------|:------------------------------------|
| [컴포넌트](guide/components)                           | 템플릿에 사용합니다. 가장 많이 사용되는 디렉티브 종류입니다.  |
| [어트리뷰트 디렉티브](#built-in-attribute-directives)       | 엘리먼트, 컴포넌트, 디렉티브의 모습이나 동작을 바꿉니다.    |
| [구조 디렉티브](/guide/directives/structural-directives) | 조건에 따라 DOM 엘리먼트를 DOM에 추가하거나 제거합니다.  |

이 문서는 Angular가 제공하는 기분 [어트리뷰트 디렉티브](#built-in-attribute-directives)를 다룹니다.


<!--
## Built-in attribute directives
-->
## 기본 어트리뷰트 디렉티브

<!--
Attribute directives listen to and modify the behavior of other HTML elements, attributes, properties, and components.

The most common attribute directives are as follows:

| Common directives                                      | Details                                            |
| :----------------------------------------------------- | :------------------------------------------------- |
| [`NgClass`](#adding-and-removing-classes-with-ngclass) | Adds and removes a set of CSS classes.             |
| [`NgStyle`](#setting-inline-styles-with-ngstyle)       | Adds and removes a set of HTML styles.             |
| [`NgModel`](guide/forms/template-driven-forms)         | Adds two-way data binding to an HTML form element. |

HELPFUL: Built-in directives use only public APIs. They do not have special access to any private APIs that other directives can't access.
-->
어트리뷰트는 HTML 엘리먼트, 어트리뷰트, 프로퍼티, 컴포넌트의 동작을 바꿉니다.

어트리뷰트 중에는 이런 것들을 자주 사용합니다:

| 디렉티브                                                   | 설명                                                 |
|:-------------------------------------------------------|:---------------------------------------------------|
| [`NgClass`](#adding-and-removing-classes-with-ngclass) | CSS 클래스를 추가하거나 제거합니다.             |
| [`NgStyle`](#setting-inline-styles-with-ngstyle)       | HTML 스타일을 지정하거나 제거합니다.            |
| [`NgModel`](guide/forms/template-driven-forms)         | HTML 폼 엘리먼트에 양방향 데이터 바인딩을 연결합니다. |

참고: 기본 디렉티브는 public API만 사용합니다. 디렉티브가 제공하지 않는 private API는 사용할 수 없습니다.


<!--
## Adding and removing classes with `NgClass`
-->
## CSS 클래스를 지정하거나 제거하기: `NgClass`

<!--
Add or remove multiple CSS classes simultaneously with `ngClass`.

HELPFUL: To add or remove a _single_ class, use [class binding](guide/templates/class-binding) rather than `NgClass`.
-->
`ngClass`는 CSS 클래스를 지정하거나 제거할 수 있습니다.

참고: 클래스 _하나_ 만 지정하거나 제거하려면 `NgClass` 대신 [클래스 바인딩](guide/templates/class-binding)를 사용하세요.


<!--
### Import `NgClass` in the component
-->
### 컴포넌트에 `NgClass` 불러오기

<!--
To use `NgClass`, add it to the component's `imports` list.

<docs-code header="app.component.ts (NgClass import)" path="adev/src/content/examples/built-in-directives/src/app/app.component.ts" visibleRegion="import-ng-class"/>
-->
`NgClass`를 사용하려면 먼저 컴포넌트 `imports` 배열에 이 심볼을 로드해야 합니다.

<docs-code header="app.component.ts (NgClass 불러오기)" path="adev/src/content/examples/built-in-directives/src/app/app.component.ts" visibleRegion="import-ng-class"/>


<!--
### Using `NgClass` with an expression
-->
### `NgClass`에 표현식 연결하기

<!--
On the element you'd like to style, add `[ngClass]` and set it equal to an expression.
In this case, `isSpecial` is a boolean set to `true` in `app.component.ts`.
Because `isSpecial` is true, `ngClass` applies the class of `special` to the `<div>`.

<docs-code header="app.component.html" path="adev/src/content/examples/built-in-directives/src/app/app.component.html" visibleRegion="special-div"/>
-->
스타일을 지정하려는 엘리먼트에 `[ngClass]`를 추가하고 등호(`=`)를 붙인 후 표현식을 작성합니다.
아래 코드처럼 작성하면 `app.component.ts` 파일의 `isSpecial` 값이 `true`로 평가되면 `<div>`에 `special` 클래스가 지정됩니다.

<docs-code header="app.component.html" path="adev/src/content/examples/built-in-directives/src/app/app.component.html" visibleRegion="special-div"/>


<!--
### Using `NgClass` with a method
-->
### `NgClass`와 메서드 사용하기

<!--
1. To use `NgClass` with a method, add the method to the component class.
   In the following example, `setCurrentClasses()` sets the property `currentClasses` with an object that adds or removes three classes based on the `true` or `false` state of three other component properties.

   Each key of the object is a CSS class name.
   If a key is `true`, `ngClass` adds the class.
   If a key is `false`, `ngClass` removes the class.

   <docs-code header="app.component.ts" path="adev/src/content/examples/built-in-directives/src/app/app.component.ts" visibleRegion="setClasses"/>

1. In the template, add the `ngClass` property binding to `currentClasses` to set the element's classes:

<docs-code header="app.component.html" path="adev/src/content/examples/built-in-directives/src/app/app.component.html" visibleRegion="NgClass-1"/>

For this use case, Angular applies the classes on initialization and in case of changes caused by reassigning the `currentClasses` object.
The full example calls `setCurrentClasses()` initially with `ngOnInit()` when the user clicks on the `Refresh currentClasses` button.
These steps are not necessary to implement `ngClass`.
-->
1. `NgClass`를 메서드와 함께 사용하려면 컴포넌트 클래스에 메서드를 정의해야 합니다.
   아래 코드를 보면, `setCurrentClasses()` 는 `currentClasses` 프로퍼티에 객체를 할당하며, 이 객체는 다른 컴포넌트 프로퍼티 값에 따라 CSS 클래스를 지정하거나 제거합니다.

   객체의 키는 CSS 클래스 이름을 의미합니다.
   값이 `true`이면, `ngClass` 가 CSS 클래스를 지정합니다.
   값이 `false`이면, `ngClass` 가 CSS 클래스를 제거합니다.

   <docs-code header="app.component.ts" path="adev/src/content/examples/built-in-directives/src/app/app.component.ts" visibleRegion="setClasses"/>

1. 템플릿에서 CSS 클래스를 지정하려는 엘리먼트에 `ngClass` 로 `currentClasses` 프로퍼티와 바인딩 합니다:

<docs-code header="app.component.html" path="adev/src/content/examples/built-in-directives/src/app/app.component.html" visibleRegion="NgClass-1"/>

이렇게 구현하면 Angular는 `currentClasses` 객체를 처음 생성할 때부터 이 객체 내부의 값이 변할 때마다 새로운 객체를 재할당합니다.
그리고 전체 예제 코드에서는 사용자가 `Refresh currentClasses` 버튼을 클릭하면 `ngOnInit()`가 실행될 때와 동일하게 `setCurrentClasses()`를 실행합니다.


<!--
## Setting inline styles with `NgStyle`
-->
## 인라인 스타일 지정하기: `NgStyle`

<!--
HELPFUL: To add or remove a _single_ style, use [style bindings](guide/templates/binding#css-class-and-style-property-bindings) rather than `NgStyle`.
-->
참고: 스타일 _하나_ 를 지정하거나 제거하려면 `NgStyle`을 사용하지 말고 [스타일 바인딩](guide/templates/binding#css-class-and-style-property-bindings)을 사용하세요.


<!--
### Import `NgStyle` in the component
-->
### 컴포넌트에 `NgStyle` 불러오기

<!--
To use `NgStyle`, add it to the component's `imports` list.

<docs-code header="app.component.ts (NgStyle import)" path="adev/src/content/examples/built-in-directives/src/app/app.component.ts" visibleRegion="import-ng-style"/>

Use `NgStyle` to set multiple inline styles simultaneously, based on the state of the component.

1. To use `NgStyle`, add a method to the component class.

   In the following example, `setCurrentStyles()` sets the property `currentStyles` with an object that defines three styles, based on the state of three other component properties.

   <docs-code header="app.component.ts" path="adev/src/content/examples/built-in-directives/src/app/app.component.ts" visibleRegion="setStyles"/>

1. To set the element's styles, add an `ngStyle` property binding to `currentStyles`.

<docs-code header="app.component.html" path="adev/src/content/examples/built-in-directives/src/app/app.component.html" visibleRegion="NgStyle-2"/>

For this use case, Angular applies the styles upon initialization and in case of changes.
To do this, the full example calls `setCurrentStyles()` initially with `ngOnInit()` and when the dependent properties change through a button click.
However, these steps are not necessary to implement `ngStyle` on its own.
-->
`NgStyle`을 사용하려면 먼저 컴포넌트 `imports` 배열에 이 심볼을 로드해야 합니다.

<docs-code header="app.component.ts (NgStyle 불러오기)" path="adev/src/content/examples/built-in-directives/src/app/app.component.ts" visibleRegion="import-ng-style"/>

`NgStyle`을 사용하면 컴포넌트 상태에 따라 인라인 스타일 여러개를 동시에 지정할 수 있습니다.

1. `NgStyle`을 사용하려면, 컴포넌트 클래스에 메서드를 추가합니다.

   아래 예제를 보면 `setCurrentStyles()`는 컴포넌트 프로퍼티 상태에 따라 스타일을 지정하는 객체를 선언해서 `currentStyles` 프로퍼티에 할당합니다.

   <docs-code header="app.component.ts" path="adev/src/content/examples/built-in-directives/src/app/app.component.ts" visibleRegion="setStyles"/>

1. 엘리먼트에 스타일을 지정하려면 `ngStyle`을 사용해서 `currentStyles`와 프로퍼티 바인딩하면 됩니다.

<docs-code header="app.component.html" path="adev/src/content/examples/built-in-directives/src/app/app.component.html" visibleRegion="NgStyle-2"/>

이렇게 구현하면 Angular는 프로퍼티 값이 변경될 때마다 엘리먼트에 변경된 스타일을 지정합니다.
그리고 전체 예제 코드에서는 사용자가 버튼을 클릭하면 `ngOnInit()`가 실행될 때와 동일하게 `setCurrentStyles()`를 실행합니다.


<!--
## Hosting a directive without a DOM element
-->
## DOM 엘리먼트 없이 디렉티브 적용하기

<!--
The Angular `<ng-container>` is a grouping element that doesn't interfere with styles or layout because Angular doesn't put it in the DOM.

Use `<ng-container>` when there's no single element to host the directive.

Here's a conditional paragraph using `<ng-container>`.

<docs-code header="app.component.html (ngif-ngcontainer)" path="adev/src/content/examples/structural-directives/src/app/app.component.html" visibleRegion="ngif-ngcontainer"/>

<img alt="ngcontainer paragraph with proper style" src="assets/images/guide/structural-directives/good-paragraph.png">

1. Import the `ngModel` directive from `FormsModule`.

1. Add `FormsModule` to the imports section of the relevant Angular module.

1. To conditionally exclude an `<option>`, wrap the `<option>` in an `<ng-container>`.

   <docs-code header="app.component.html (select-ngcontainer)" path="adev/src/content/examples/structural-directives/src/app/app.component.html" visibleRegion="select-ngcontainer"/>

   <img alt="ngcontainer options work properly" src="assets/images/guide/structural-directives/select-ngcontainer-anim.gif">
-->
Angular 엘리먼트 `<ng-container>`는 스타일이나 레이앙수 변경 없이 엘리먼트 여러 개를 하나로 묶는 엘리먼트입니다.
이 엘리먼트는 DOM에 직접 추가되지 않습니다.

그런데 `<ng-container>`는 엘리먼트 없이 디렉티브를 적용하는 용도로도 사용할 수 있습니다.

이렇게 사용하면 됩니다:

<docs-code header="app.component.html (ngif-ngcontainer)" path="adev/src/content/examples/structural-directives/src/app/app.component.html" visibleRegion="ngif-ngcontainer"/>

<img alt="ngcontainer paragraph with proper style" src="assets/images/guide/structural-directives/good-paragraph.png">

1. `FormsModule` 로 제공되는 `ngModel` 디렉티브를 불러옵니다.

1. `FormsModule` 을 적절한 Angular 모듈의 imports 배열에 추가합니다.

1. 이제 `<option>` 엘리먼트는 `<option>` 엘리먼트를 둘러싼 `<ng-container>`에 지정된 조건에 따라 DOM에 추가되거나 제거됩니다.

   <docs-code header="app.component.html (select-ngcontainer)" path="adev/src/content/examples/structural-directives/src/app/app.component.html" visibleRegion="select-ngcontainer"/>

   <img alt="ngcontainer options work properly" src="assets/images/guide/structural-directives/select-ngcontainer-anim.gif">



<!--
## What's next
-->
## 다음 단계

<!--
<docs-pill-row>
  <docs-pill href="guide/directives/attribute-directives" title="Attribute Directives"/>
  <docs-pill href="guide/directives/structural-directives" title="Structural Directives"/>
  <docs-pill href="guide/directives/directive-composition-api" title="Directive composition API"/>
</docs-pill-row>
-->
<docs-pill-row>
  <docs-pill href="guide/directives/attribute-directives" title="어트리뷰트 디렉티브"/>
  <docs-pill href="guide/directives/structural-directives" title="구조 디렉티브"/>
  <docs-pill href="guide/directives/directive-composition-api" title="디렉티브 조합 API"/>
</docs-pill-row>
