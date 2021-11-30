<!--
# Template variables
-->
# 템플릿 변수

<!--
Template variables help you use data from one part of a template in another part of the template.
Use template variables to perform tasks such as respond to user input or finely tune your application's forms.

A template variable can refer to the following:

* a DOM element within a template
* a directive
* an element
* [TemplateRef](api/core/TemplateRef)
* a <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" title="MDN: Web Components">web component</a>

<div class="alert is-helpful">

See the <live-example></live-example> for a working example containing the code snippets in this guide.

</div>
-->
템플릿 변수를 활용하면 템플릿 안에서 다른 영역에 있는 데이터를 참조할 수 있습니다.
그래서 템플릿 변수는 사용자가 입력한 내용에 반응하는 동작을 구현하거나, 애플리케이션 폼을 사용하기 좋게 튜닝할 때 주로 사용합니다.

템플릿 변수는 이런 항목을 가리킬 수 있습니다:

* 템플릿 안에 있는 DOM 엘리먼트
* 디렉티브
* 엘리먼트
* [TemplateRef](api/core/TemplateRef)
* <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" title="MDN: Web Components">웹 컴포넌트</a>

<div class="alert is-helpful">

이 문서에서 다루는 예제 앱은 <live-example></live-example>에서 직접 실행하거나 다운받아 확인할 수 있습니다.

</div>


<!--
## Syntax
-->
## 문법

<!--
In the template, you use the hash symbol, `#`, to declare a template variable.
The following template variable, `#phone`, declares a `phone` variable on an `<input>` element.

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


{@a how-angular-assigns-values-to-template-variables}
<!--
## How Angular assigns values to template variables
-->
## 템플릿 변수에 할당되는 값은 어떻게 결정되나요?

<!--
Angular assigns a template variable a value based on where you declare the variable:

* If you declare the variable on a component, the variable refers to the component instance.
* If you declare the variable on a standard HTML tag, the variable refers to the element.
* If you declare the variable on an `<ng-template>` element, the variable refers to a `TemplateRef` instance, which represents the template.
  For more information on `<ng-template>`, see [How Angular uses the asterisk, `*`, syntax](guide/structural-directives#asterisk) in [Structural directives](guide/structural-directives).
* If the variable specifies a name on the right-hand side, such as `#var="ngModel"`, the variable refers to the directive or component on the element with a matching `exportAs` name.
<!- What does the second half of this mean?^^ Can we explain this more fully? Could I see a working example? -kw ->
-->
Angular에서 템플릿 변수를 선언하면 이 템플릿 변수가 선언된 위치에 따라 참조하는 인스턴스의 타입이 결정됩니다.

* 컴포넌트에 템플릿 변수를 선언하면 컴포넌트 인스턴스를 가리킵니다.
* 표준 HTML 태그에 템플릿 변수를 선언하면 엘리먼트를 가리킵니다.
* `<ng-template>` 엘리먼트에 템플릿 변수를 선언하면 `TemplateRef` 인스턴스를 가리킵니다.
  `<ng-template>`에 대해 자세하게 알아보려면 [구조 디렉티브](guide/structural-directives) 문서의 [Angular가 아스테리스크 `*`를 활용하는 방법](guide/structural-directives#asterisk) 섹션을 참고하세요.
* `#var="ngModel"`과 같이 템플릿 변수 오른쪽에 이름을 지정하면 디렉티브/컴포넌트에서 `exportAs` 이름에 해당하는 인스턴스를 가리킵니다.


<!--
### Using `NgForm` with template variables
-->
### `NgForm`에 템플릿 변수 사용하기

<!--
In most cases, Angular sets the template variable's value to the element on which it occurs.
In the previous example, `phone` refers to the phone number `<input>`.
The button's click handler passes the `<input>` value to the component's `callPhone()` method.

The `NgForm` directive demonstrates getting a reference to a different value by reference a directive's `exportAs` name.
In the following example, the template variable, `itemForm`, appears three times separated by HTML.

<code-example path="template-reference-variables/src/app/app.component.html" region="ngForm" header="src/app/hero-form.component.html"></code-example>

Without the `ngForm` attribute value, the reference value of `itemForm` would be
the [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement), `<form>`.
There is, however, a difference between a `Component` and a `Directive` in that Angular references a `Component` without specifying the attribute value, and a `Directive` does not change the implicit reference, or the element.
<!- What is the train of thought from talking about a form element to the difference between a component and a directive? Why is the component directive conversation relevant here?  -kw ->

With `NgForm`, `itemForm` is a reference to the [NgForm](api/forms/NgForm "API: NgForm") directive with the ability to track the value and validity of every control in the form.

Unlike the native `<form>` element, the `NgForm` directive has a `form` property.
The `NgForm` `form` property lets you disable the submit button if the `itemForm.form.valid` is invalid.
-->
보통은 템플릿 변수가 선언된 엘리먼트가 템플릿 변수의 값이 됩니다.
이전 예제에서도 템플릿 변수 `phone`은 전화번호가 입력되는 `<input>` 엘리먼트를 가리킵니다.
그래서 버튼을 클릭하면 컴포넌트에 있는 `callPhone()` 메서드를 실행하면서 `<input>` 엘리먼트의 값을 인자로 전달합니다.

아래 코드는 `NgForm` 디렉티브를 직접 참조하기 위해 디렉티브에서 `exportAs`로 지정된 값을 템플릿 변수 값으로 할당받는 예제 코드입니다.
이 코드에서 템플릿 변수 `itemForm`은 템플릿 안에서 세 번 사용됩니다.

<code-example path="template-reference-variables/src/app/app.component.html" region="ngForm" header="src/app/hero-form.component.html"></code-example>

`ngForm` 어트리뷰트 값을 사용하지 않으면 `itemForm`이 참조하는 객체는 [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement), `<form>` 엘리먼트가 됩니다.

`NgForm`과 `itemForm`은 모두 [NgForm](api/forms/NgForm "API: NgForm") 디렉티브를 가리키기 때문에, 이 객체들을 활용하면 폼에 있는 폼 컨트롤의 값을 참조하거나 유효성을 검사할 수 있습니다.

표준 `<form>` 엘리먼트와 다르게 `NgForm` 디렉티브에는 `form` 프로퍼티가 존재합니다.
`NgForm` `form` 프로퍼티를 `itemForm.form.valid` 와 같이 활용하면 폼이 유효하지 않은 상태일 때 제출 버튼을 비활성화 시킬 수 있습니다.


<!--
## Template variable scope
-->
## 템플릿 변수를 참조할 수 있는 범위

<!--
Refer to a template variable anywhere within its surrounding template.
[Structural directives](guide/built-in-directives), such as `*ngIf` and `*ngFor`, or `<ng-template>` act as a template boundary.
You cannot access template variables outside of these boundaries.

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

In this case, there is an implied `<ng-template>` around the `<span>` and the definition of the variable is outside of it.
Accessing a template variable from the parent template works because the child template inherits the context from the parent template.

Rewriting the preceding code in a more verbose form explicitly shows the `<ng-template>`.

```html

<input #ref1 type="text" [(ngModel)]="firstExample" />

<!- New template ->
<ng-template [ngIf]="true">
  <!- Because the context is inherited, the value is available to the new template ->
  <span>Value: {{ ref1.value }}</span>
</ng-template>

```

However, accessing a template variable from outside the parent template doesn't work.

```html
  <input *ngIf="true" #ref2 type="text" [(ngModel)]="secondExample" />
  <span>Value: {{ ref2?.value }}</span> <!- doesn't work ->
```

The verbose form shows that `ref2` is outside the parent template.

```
<ng-template [ngIf]="true">
  <!- The reference is defined within a template ->
  <input #ref2 type="text" [(ngModel)]="secondExample" />
</ng-template>
<!- ref2 accessed from outside that template doesn't work ->
<span>Value: {{ ref2?.value }}</span>
```

Consider the following example that uses `*ngFor`.

```
<ng-container *ngFor="let i of [1,2]">
  <input #ref type="text" [value]="i" />
</ng-container>
{{ ref.value }}
```

Here, `ref.value` doesn't work.
The structural directive, `*ngFor` instantiates the template twice because `*ngFor` iterates over the two items in the array.
It is impossible to define what the `ref.value` reference signifies.

With structural directives, such as `*ngFor` or `*ngIf`, there is no way for Angular to know if a template is ever instantiated.

As a result, Angular isn't able to access the value and returns an error.
-->
중첩된 템플릿에서 안쪽에 있는 템플릿에서는 바깥에 있는 템플릿 변수를 참조할 수 있습니다.

아래 코드에서 `<input>` 엘리먼트의 값을 변경하면 `<span>`의 내용이 변경되는데, 두 엘리먼트가 템플릿 변수 `ref1`로 연결되어 있기 때문입니다.

<code-example path="template-reference-variables/src/app/app.component.html" region="template-ref-vars-scope1" header="src/app/app.component.html"></code-example>

`<span>`을 `<ng-template>`으로 감싸 봅시다.
템플릿 변수 `ref1`는 `<ng-template>` 바깥쪽에 선언되었습니다.
이런 경우라면 자식 템플릿은 부모 템플릿의 컨텍스트를 상속받기 때문에 이전처럼 동작합니다.

`<ng-template>` 부분을 이해하기 쉽게 수정해 봅시다.

```html

<input #ref1 type="text" [(ngModel)]="firstExample" />

<!-- 새 템플릿 -->
<ng-template [ngIf]="true">
  <!-- 부모 컨텍스트를 상속받기 때문에 새 템플릿에서도 템플릿 변수를 참조할 수 있습니다. -->
  <span>Value: {{ ref1.value }}</span>
</ng-template>

```

하지만 부모 템플릿에서 자식 템플릿에 선언된 템플릿 변수를 참조하는 로직은 동작하지 않습니다.

```html
  <input *ngIf="true" #ref2 type="text" [(ngModel)]="secondExample" />
  <span>Value: {{ ref2?.value }}</span> <!-- 동작하지 않습니다. -->
```

`ref` 부분을 이해하기 쉽게 수정해 봅시다.

```
<ng-template [ngIf]="true">
  <!-- ref2는 자식 템플릿 안쪽에 선언되어 있습니다. -->
  <input #ref2 type="text" [(ngModel)]="secondExample" />
</ng-template>
<!-- 자식 템플릿 밖에서 ref2를 참조하는 로직은 동작하지 않습니다. -->
<span>Value: {{ ref2?.value }}</span>
```

`*ngFor`의 경우도 생각해 봅시다.

```
<ng-container *ngFor="let i of [1,2]">
  <input #ref type="text" [value]="i" />
</ng-container>
{{ ref.value }}
```

이 경우에도 `ref.value`는 동작하지 않습니다.
이 코드에서 배열에는 항목이 2개 있기 때문에 구조 디렉티브 `*ngFor`도 템플릿을 두 벌 생성합니다.
그래서 `ref.value`가 어떤 값을 가리키는지 결정할 수 없습니다.

그리고 `*ngFor`나 `*ngIf`와 같은 구조 디렉티브는 초기화되지 않은 템플릿 안쪽을 참조할 수 없습니다.

결국 Angular는 참조하는 객체의 값을 결정할 수 없기 때문에 에러가 발생합니다.


<!--
### Accessing a template variable within `<ng-template>`
-->
### `<ng-template>` 안에서 템플릿 변수에 접근하기

<!--
When you declare the variable on an `<ng-template>`, the variable refers to a `TemplateRef` instance, which represents the template.

<code-example path="template-reference-variables/src/app/app.component.html" region="template-ref" header="src/app/app.component.html"></code-example>

In this example, clicking the button calls the `log()` function, which outputs the value of `#ref3` to the console.
Because the `#ref` variable is on an `<ng-template>`, the value is `TemplateRef`.

The following is the expanded browser console output of the `TemplateRef()` function with the name of `TemplateRef`.

<code-example language="sh">

&#9660; ƒ TemplateRef()
name: "TemplateRef"
__proto__: Function

</code-example>
-->
`<ng-template>`에 템플릿 변수를 선언하면 이 변수는 템플릿을 표현하는 `TemplateRef` 인스턴스를 가리킵니다.

<code-example path="template-reference-variables/src/app/app.component.html" region="template-ref" header="src/app/app.component.html"></code-example>

이 예제에서 버튼을 클릭하면 `log()` 함수가 실행되면서 `#ref3`가 참조하는 값을 콘솔에 출력합니다.
이 때 `#ref3` 변수는 `<ng-template>`에 선언되었기 때문에 `ref3`가 가리키는 값은 `TemplateRef`가 됩니다.

콘솔에 출력된 결과를 확인해보면 이렇습니다:

<code-example language="sh">

&#9660; ƒ TemplateRef()
name: "TemplateRef"
__proto__: Function

</code-example>


{@a template-input-variable}
{@a template-input-variables}
<!--
## Template input variable
-->
## 템플릿 입력 변수(Template input variable)

<!--
A _template input variable_ is a variable to reference within a single instance of the template.
You declare a template input variable using the `let` keyword as in `let hero`.

There are several such variables in this example: `hero`, `i`, and `odd`.

```html
<ng-template #hero let-hero let-i="index" let-odd="isOdd">
  <div [class]="{'odd-row': odd}">{{i}}:{{hero.name}}</div>
</ng-template>
```

The variable's scope is limited to a single instance of the repeated template.
Use the same variable name again in the definition of other structural directives.

In contrast, you declare a template variable by prefixing the variable name with `#`, as in `#var`.
A template variable refers to its attached element, component, or directive.

Template input variables and template variables names have their own namespaces.
The template input variable `hero` in `let hero` is distinct from the template variable `hero` in `#hero`.
-->
_템플릿 입력 변수_ 는 템플릿 안에서 한 번만 선언하는 변수입니다.
템플릿 입력 변수는 `let` 키워드를 사용해서 `let hero`와 같이 선언합니다.

Angular 가이드 문서에서도 템플릿 입력 변수는 `heri`, `i`, `odd`와 같이 자주 사용됩니다.

```html
<ng-template #hero let-hero let-i="index" let-odd="isOdd">
  <div [class]="{'odd-row': odd}">{{i}}:{{hero.name}}</div>
</ng-template>
```

템플릿 입력 변수의 참조 범위는 반복되는 템플릿 인스턴스 안쪽으로 제한됩니다.
그래서 구조 디렉티브가 다르다면 같은 변수 이름을 여러 번 사용할 수도 있습니다.

템플릿 변수는 템플릿 입력 변수와 다르게 `#` 접두사를 붙여서 `#var`와 같이 선언합니다.
그리고 템플릿 변수는 템플릿 변수가 지정된 엘리먼트나 컴포넌트, 디렉티브를 가리킵니다.

템플릿 입력 변수와 템플릿 변수는 서로 다른 네임스페이스에 선언됩니다.
그래서 `let hero`로 선언한 템플릿 입력 변수 `hero`는 `#hero`로 선언한 템플릿 변수 `hero`와 겹치지 않습니다.
