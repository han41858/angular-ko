<!--
# Understanding template variables
-->
# 템플릿 변수 이해하기

<!--
Template variables help you use data from one part of a template in another part of the template.
Use template variables to perform tasks such as respond to user input or finely tune your application's forms.

A template variable can refer to the following:

* a DOM element within a template
* a directive or component
* a [TemplateRef](api/core/TemplateRef) from an [ng-template](api/core/ng-template)
* a <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" title="MDN: Web Components">web component</a>

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

</div>
-->
템플릿 변수를 활용하면 템플릿 안에서 다른 영역에 있는 데이터를 참조할 수 있습니다.
그래서 템플릿 변수는 사용자가 입력한 내용에 반응하는 동작을 구현하거나, 애플리케이션 폼을 사용하기 좋게 튜닝할 때 주로 사용합니다.

템플릿 변수는 이런 항목을 가리킬 수 있습니다:

* 템플릿 안에 있는 DOM 엘리먼트
* 디렉티브나 컴포넌트
* [ng-template](api/core/ng-template)을 가리키는 [TemplateRef](api/core/TemplateRef)
* <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" title="MDN: Web Components">웹 컴포넌트</a>

<div class="alert is-helpful">

이 문서에서 다루는 예제 앱은 <live-example></live-example>에서 직접 실행하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Prerequisites
-->
## 사전지식

<!--
* [Understanding templates](guide/template-overview)
-->
* [템플릿 이해하기](guide/template-overview)


<!--
## Syntax
-->
## 문법

<!--
In the template, you use the hash symbol, `#`, to declare a template variable.
The following template variable, `#phone`, declares a `phone` variable with the `<input>` element as its value.

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-var" header="src/app/app.component.html"></code-example>

Refer to a template variable anywhere in the component's template.
Here, a `<button>` further down the template refers to the `phone` variable.

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-phone" header="src/app/app.component.html"></code-example>
-->
템플릿 안에서 해시 기호 `#`를 사용하면 템플릿 변수를 선언할 수 있습니다.
아래 코드처럼 `#phone`이라고 지정하면 `<input>` 엘리먼트에 `phone` 변수를 템플릿 변수로 선언한 것입니다.

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-var" header="src/app/app.component.html"></code-example>

템플릿 변수는 컴포넌트 템플릿 안에서 자유롭게 참조할 수 있습니다.
아래 코드에서 `<button>`는 컴포넌트 메서드를 실행할 때 인자를 전달하기 위해 `phone` 변수를 참조했습니다.

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-phone" header="src/app/app.component.html"></code-example>


<!--
## How Angular assigns values to template variables
-->
## 템플릿 변수에 할당되는 값은 어떻게 결정되나요?

<!--
Angular assigns a template variable a value based on where you declare the variable:

* If you declare the variable on a component, the variable refers to the component instance.
* If you declare the variable on a standard HTML tag, the variable refers to the element.
* If you declare the variable on an `<ng-template>` element, the variable refers to a `TemplateRef` instance which represents the template.
  For more information on `<ng-template>`, see [How Angular uses the asterisk, `*`, syntax](guide/structural-directives#asterisk) in [Structural directives](guide/structural-directives).
-->
Angular에서 템플릿 변수를 선언하면 이 템플릿 변수가 선언된 위치에 따라 참조하는 인스턴스의 타입이 결정됩니다.

* 컴포넌트에 템플릿 변수를 선언하면 컴포넌트 인스턴스를 가리킵니다.
* 표준 HTML 태그에 템플릿 변수를 선언하면 엘리먼트를 가리킵니다.
* `<ng-template>` 엘리먼트에 템플릿 변수를 선언하면 `TemplateRef` 인스턴스를 가리킵니다.
  `<ng-template>`에 대해 자세하세 알아보려면 [구조 디렉티브](guide/structural-directives) 문서의 [Angular가 아스테리스크 `*`를 활용하는 방법](guide/structural-directives#asterisk)을 참고하세요..

## Variable specifying a name

* If the variable specifies a name on the right-hand side, such as `#var="ngModel"`, the variable refers to the directive or component on the element with a matching `exportAs` name.
<!-- What does the second half of this mean?^^ Can we explain this more fully? Could I see a working example? -kw -->


<!--
### Using `NgForm` with template variables
-->
### `NgForm`에 템플릿 변수 사용하기

<!--
In most cases, Angular sets the template variable's value to the element on which it occurs.
In the previous example, `phone` refers to the phone number `<input>`.
The button's click handler passes the `<input>` value to the component's `callPhone()` method.

The `NgForm` directive demonstrates getting a reference to a different value by referencing a directive's `exportAs` name.
In the following example, the template variable, `itemForm`, appears three times separated by HTML.

<code-example path="template-reference-variables/src/app/app.component.html" region="ngForm" header="src/app/hero-form.component.html"></code-example>

Without the `ngForm` attribute value, the reference value of `itemForm` would be
the [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement), `<form>`.
If an element is an Angular Component, a reference with no attribute value will automatically reference the component instance. Otherwise, a reference with no value will reference the DOM element, even if the element has one or more directives applied to it.
<!- What is the train of thought from talking about a form element to the difference between a component and a directive? Why is the component directive conversation relevant here?  -kw I agree -alex ->
-->
보통은 템플릿 변수가 선언된 엘리먼트가 템플릿 변수의 값이 됩니다.
이전 예제에서도 템플릿 변수 `phone`은 전화번호가 입력되는 `<input>` 엘리먼트를 가리킵니다.
그래서 버튼을 클릭하면 컴포넌트에 있는 `callPhone()` 메서드를 실행하면서 `<input>` 엘리먼트의 값을 인자로 전달합니다.

아래 코드는 `NgForm` 디렉티브를 직접 참조하기 위해 디렉티브에서 `exportAs`로 지정된 값을 템플릿 변수 값으로 할당받는 예제 코드입니다.
이 코드에서 템플릿 변수 `itemForm`은 템플릿 안에서 세 번 사용됩니다.

<code-example path="template-reference-variables/src/app/app.component.html" region="ngForm" header="src/app/hero-form.component.html"></code-example>

`ngForm` 어트리뷰트 값을 사용하지 않으면 `itemForm`이 참조하는 객체는 [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement), `<form>` 엘리먼트가 됩니다.
그리고 어트리뷰트 지정 없이 Angular 컴포넌트에 지정하면 컴포넌트 인스턴스를 자체를 가리킵니다.
이 경우가 아니라면 엘리먼트에 지정된 디렉티브는 무시하고 DOM 엘리먼트를 가리킵니다.


<!--
## Template variable scope
-->
## 템플릿 변수를 참조할 수 있는 범위

<!--
Just like variables in JavaScript or TypeScript code, template variables are scoped to the template that declares them.

Similarly, [Structural directives](guide/built-in-directives) such as `*ngIf` and `*ngFor`, or `<ng-template>` declarations create a new nested template scope, much like JavaScript's control flow statements like `if` and `for` create new lexical scopes. You cannot access template variables within one of these structural directives from outside of its boundaries.

<div class="alert is-helpful">

Define a variable only once in the template so the runtime value remains predictable.

</div>
-->
템플릿 변수는 해당 템플릿 안에서 자유롭게 참조할 수 있습니다.
`*ngIf`나 `*ngFor`, `<ng-template>`과 같은 [구조 디렉티브](guide/built-in-directives)를 템플릿 안에서 사용할 수 있는 것과 비슷합니다.
템플릿을 넘어가는 범위에서는 참조할 수 없습니다.

<div class="alert is-helpful">

애플리케이션이 제대로 동작하는 것을 보장하려면 템플릿 변수 하나를 여러 번 선언하지 마세요.

</div>


<!--
### Accessing in a nested template
-->
### 중첩된 템플릿 안에서 접근하기

<!--
An inner template can access template variables that the outer template defines.

In the following example, changing the text in the `<input>` changes the value in the `<span>` because Angular immediately updates changes through the template variable, `ref1`.

<code-example path="template-reference-variables/src/app/app.component.html" region="template-ref-vars-scope1" header="src/app/app.component.html"></code-example>

In this case, the `*ngIf` on `<span>` creates a new template scope, which includes the `ref1` variable from its parent scope.

However, accessing a template variable from a child scope in the parent template doesn't work:

```html
  <input *ngIf="true" #ref2 type="text" [(ngModel)]="secondExample" />
  <span>Value: {{ ref2?.value }}</span> <!- doesn't work ->
```

Here, `ref2` is declared in the child scope created by `*ngIf`, and is not accessible from the parent template.
-->
중첩된 템플릿에서 안쪽에 있는 템플릿에서는 바깥에 있는 템플릿 변수를 참조할 수 있습니다.

아래 코드에서 `<input>` 엘리먼트의 값을 변경하면 `<span>`의 내용이 변경되는데, 두 엘리먼트가 템플릿 변수 `ref1`로 연결되어 있기 때문입니다.

<code-example path="template-reference-variables/src/app/app.component.html" region="template-ref-vars-scope1" header="src/app/app.component.html"></code-example>

이 코드에서 `<span>`에 있는 `*ngIf`는 새로운 템플릿 스코프를 생성하는데, 이 스코프에서는 부모 스코프에 있는 `ref1` 변수에 접근할 수 있습니다.

하지만 부모 템플릿에서 자식 스코프에 선언된 변수에 접근할 수는 없습니다.

```html
  <input *ngIf="true" #ref2 type="text" [(ngModel)]="secondExample" />
  <span>Value: {{ ref2?.value }}</span> <!-- 동작하지 않습니다. -->
```

`ref2`는 자식 스코프에 선언되었기 때문에, 부모 템플릿에서 접근할 수 없습니다.


{@a template-input-variable}
{@a template-input-variables}
<!--
## Template input variable
-->
## 템플릿 입력 변수(Template input variable)

<!--
A _template input variable_ is a variable with a value that is set when an instance of that template is created. See: [Writing structural directives](https://angular.io/guide/structural-directives)

Template input variables can be seen in action in the long-form usage of `NgFor`:

```html
<ul>
  <ng-template ngFor let-hero [ngForOf]="heroes">
    <li>{{hero.name}}
  </ng-template>
</ul>
```

The `NgFor` directive will instantiate this <ng-template> once for each hero in the `heroes` array, and will set the `hero` variable for each instance accordingly.

When an `<ng-template>` is instantiated, multiple named values can be passed which can be bound to different template input variables. The right-hand side of the `let-` declaration of an input variable can specify which value should be used for that variable.

`NgFor` for example also provides access to the `index` of each hero in the array:

```html
<ul>
  <ng-template ngFor let-hero let-i="index" [ngForOf]="heroes">
    <li>Hero number {{i}}: {{hero.name}}
  </ng-template>
</ul>
```
-->
_템플릿 입력 변수_ 는 템플릿 인스턴스마다 값을 받는 변수입니다.
자세한 내용은 [구조 디렉티브 만들기](https://angular.io/guide/structural-directives) 문서를 참고하세요.

`NgFor`를 사용하는 경우라면 템플릿 입력변수가 이렇게 사용됩니다:

```html
<ul>
  <ng-template ngFor let-hero [ngForOf]="heroes">
    <li>{{hero.name}}
  </ng-template>
</ul>
```

`NgFor` 디렉티브는 `heroes` 배역에 있는 개별 히어로마다 `<ng-template>` 인스턴스를 생성하는데, 이 때 배열의 항목마다 `hero` 변수의 값을 할당합니다.

그리고 `<ng-template>` 인스턴스를 만들 때 템플릿 변수를 여러개 선언하면 여러 값을 동시에 전달할 수도 있습니다.
`let-` 문법을 사용하면 됩니다.

`NgFor`를 사용하면서 배열의 인덱스를 `index`로 함께 전달하려면 이렇게 사용하면 됩니다:

```html
<ul>
  <ng-template ngFor let-hero let-i="index" [ngForOf]="heroes">
    <li>Hero number {{i}}: {{hero.name}}
  </ng-template>
</ul>
```

<!--
## What’s next
-->
## 다음 단계

<!--
[Writing structural directives](https://angular.io/guide/structural-directives)
-->
[구조 디렉티브 만들기](https://angular.io/guide/structural-directives)


@reviewed 2022-05-12
