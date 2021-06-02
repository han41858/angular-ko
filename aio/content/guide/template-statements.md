<!--
# Template statements
-->
# 템플릿 실행문(Template statements)

<!--
Template statements are methods or properties that you can use in your HTML to respond to user events.
With template statements, your application can engage users through actions such as displaying dynamic content or submitting forms.

<div class="alert is-helpful">

See the <live-example name="template-syntax">Template syntax</live-example> for
the syntax and code snippets in this guide.

</div>

In the following example, the template statement `deleteHero()` appears in quotes to the right of the `=`&nbsp;symbol as in `(event)="statement"`.

<code-example path="template-syntax/src/app/app.component.html" region="context-component-statement" header="src/app/app.component.html"></code-example>

When the user clicks the **Delete hero** button, Angular calls the `deleteHero()` method in the component class.

You can use template statements with elements, components, or directives in response to events.

<div class="alert is-helpful">

Responding to events is an aspect of Angular's [unidirectional data flow](guide/glossary#unidirectional-data-flow).
You can change anything in your application during a single event loop.

</div>
-->
템플릿 실행문은 HTML 템플릿 안에서 메서드를 실행하거나 프로퍼티를 조작하는 로직을 의미합니다.
템플릿 실행문을 활용하면 사용자의 이벤트에 맞춰서 컨텐츠를 동적으로 변경하거나 폼을 제출할 수 있습니다.

<div class="alert is-helpful">

이 문서에서 설명하는 예제 코드는 <live-example name="template-syntax">Template syntax</live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

</div>

아래 예제에서 `deleteHero()`라고 작성된 것처럼, 템플릿 실행문은 `(이벤트)="실행문"`이라는 형식으로 사용합니다.

<code-example path="template-syntax/src/app/app.component.html" region="context-component-statement" header="src/app/app.component.html"></code-example>

이제 사용자가 **Delete hero** 버튼을 클릭하면 Angular가 컴포넌트 클래스에 있는 `deleteHero()` 메서드를 실행합니다.

템플릿 실행문은 엘리먼트, 컴포넌트, 디렉티브에 모두 사용할 수 있습니다.

<div class="alert is-helpful">

이벤트에 반응하는 패턴은 Angular가 주장하는 [단방향 데이터 흐름](guide/glossary#unidirectional-data-flow)에도 맞습니다.
한 번의 이벤트 싸이클 안에서는 애플리케이션에 있는 어떠한 것이라도 자유롭게 수정할 수 있습니다.

</div>


<!--
## Syntax
-->
## 문법

<!--
Like [template expressions](guide/interpolation), template statements use a language that looks like JavaScript.
However, the parser for template statements differs from the parser for template expressions.
In addition, the template statements parser specifically supports both basic assignment, `=`, and chaining expressions with semicolons, `;`.

The following JavaScript and template expression syntax is not allowed:

* `new`
* increment and decrement operators, `++` and `--`
* operator assignment, such as `+=` and `-=`
* the bitwise operators, such as `|` and `&`
* the [pipe operator](guide/pipes)
-->
[템플릿 표현식(template expressions)](guide/interpolation)과 비슷하게, 템플릿 실행문도 JavaScript와 비슷한 문법을 사용합니다.
하지만 템플릿 실행문 파서는 템플릿 표현식과 다른 파서를 사용합니다.
템플릿 표현식 파서의 기능과 더불어 템플릿 실행문 파서는 `=`와 같은 기본 할당 문법을 지원하며, 세미 콜론(`;`)도 지원하기 때문에 표현식을 체이닝할 수 있습니다.

JavaScript 문법 중 이런 문법은 템플릿 실행문에 사용할 수 없습니다:

* `new`
* 증감 연산자 `++`, `--`
* 복합대입 연산자 `+=`, `-=`
* 비트 연산자 `|`, `&`
* [파이프 연산자](guide/pipes)


<!--
## Statement context
-->
## 실행문의 컨텍스트

<!--
Statements have a context&mdash;a particular part of the application to which the statement belongs.

Statements can refer only to what's in the statement context, which is typically the component instance.
For example, `deleteHero()` of `(click)="deleteHero()"` is a method of the component in the following snippet.

<code-example path="template-syntax/src/app/app.component.html" region="context-component-statement" header="src/app/app.component.html"></code-example>

The statement context may also refer to properties of the template's own context.
In the following example, the component's event handling method, `onSave()` takes the template's own `$event` object as an argument.
On the next two lines, the `deleteHero()` method takes a [template input variable](guide/structural-directives#shorthand), `hero`, and `onSubmit()` takes a [template reference variable](guide/template-reference-variables), `#heroForm`.

<code-example path="template-syntax/src/app/app.component.html" region="context-var-statement" header="src/app/app.component.html"></code-example>

In this example, the context of the `$event` object, `hero`, and `#heroForm` is the template.

Template context names take precedence over component context names.
In the preceding `deleteHero(hero)`, the `hero` is the template input variable, not the component's `hero` property.
-->
템플릿 실행문은 애플리케이션의 특정 컨텍스트 안에서 동작합니다.

템플릿 실행문의 컨텍스트는 일반적으로 컴포넌트 인스턴스와 같으며, 템플릿 실행문은 실행문 컨텍스트 안에 있는 것만 참조할 수 있습니다.
그래서 클릭 이벤트를 컴포넌트에 정의된 `deleteHero()` 메서드와 바인딩 하려면 `(click)="deleteHero()"`라고 작성하면 됩니다.

<code-example path="template-syntax/src/app/app.component.html" region="context-component-statement" header="src/app/app.component.html"></code-example>

템플릿 실행문의 컨텍스트 안에서는 템플릿 컨텍스트에 있는 프로퍼티도 참조할 수 있습니다.
그래서 아래 예제처럼 컴포넌트의 이벤트 핸들링 메서드 `onSave()` 를 실행하면서 템플릿에 있는 `$event` 객체를 인자로 전달할 수 있습니다.
아래 예제에서 `deleteHero()` 메서드를 실행하면서 [템플릿 입력 변수](guide/structural-directives#shorthand) `hero`를 인자로 사용했으며, `onSubmit()` 메서드를 실행하면서 [템플릿 참조 변수](guide/template-reference-variables) `#heroForm`을 사용했습니다.

<code-example path="template-syntax/src/app/app.component.html" region="context-var-statement" header="src/app/app.component.html"></code-example>

이 예제에서 `$event` 객체, `hero`, `#heroForm`은 모두 템플릿 컨텍스트 안에 있는 객체들입니다.

템플릿 컨텍스트 안에서는 우선순위가 있습니다.
이전 예제에서 `deleteHero()`에 사용된 `hero`는 컴포넌트에 있는 `hero` 프로퍼티가 아니라 템플릿 입력 변수입니다.


<!--
## Statement best practices
-->
## 권장사항

<!--
* **Conciseness**

  Keep template statements minimal by using method calls or basic property assignments.

* **Work within the context**

  The context of a template statement can be the component class instance or the template.
  Because of this, template statements cannot refer to anything in the global namespace such as `window` or `document`.
  For example, template statements can't call `console.log()` or `Math.max()`.
-->
* **간결하게**

  템플릿 실행문은 메서드를 실행하거나 간단판 프로퍼티 조작 정도로 최대한 간결하게 작성하는 것이 좋습니다.

* **컨텍스트 안에서만 작업하세요**

  템플릿 실행문의 컨텍스는 컴포넌트 클래스 인스턴스와 템플릿 범위입니다.
  그래서 템플릿 실행문은 `window`나 `document` 같은 전역 네임스페이스에 접근할 수 없습니다.
  `console.log()`, `Math.max()`와 같은 로직은 실행할 수 없습니다.
