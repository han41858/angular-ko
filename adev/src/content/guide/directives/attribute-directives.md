<!--
# Attribute directives

Attribute directives change the appearance or behavior of DOM elements and Angular components.

## Use template bindings for one-off behavior

Angular's template syntax already covers changing a single element's classes, styles, properties, and events:

- [Class and style bindings](guide/templates/binding#css-class-and-style-property-bindings) add and remove CSS classes and inline styles.
- [Property and attribute bindings](guide/templates/binding) set DOM properties and HTML attributes.
- [Event listeners](guide/templates/event-listeners) respond to user interaction.

Attribute directives are useful when you want to package this kind of behavior into a reusable unit that you can apply to any element or component.

## Building an attribute directive

A custom attribute directive is a JavaScript class with the `@Directive()` decorator. The decorator's `selector` defines the attribute that applies the directive. The square brackets make this an attribute selector, so the directive matches elements that carry the attribute. By convention, use a prefix such as `app` to avoid naming collisions:

```ts
import {Directive} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {}
```

HELPFUL: The CLI command [`ng generate directive`](tools/cli/schematics) scaffolds a directive along with its test file.

A directive can change its host declaratively through host bindings or imperatively through a reference to the host element. This example [injects](guide/di) [`ElementRef`](api/core/ElementRef) and accesses the element through its `nativeElement` property to set the background to yellow:

<docs-code header="highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.1.ts"/>

IMPORTANT: Directives _do not_ support namespaces.

```angular-html {avoid}
<p app:Highlight>This is invalid</p>
```

## Applying an attribute directive

To apply the directive, add its selector as an attribute on an element:

<docs-code header="app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.1.html" region="applied"/>

Angular creates an instance of `HighlightDirective` for that `<p>` element, injects a reference to the element, and sets its background to yellow.

## Handling user events

To respond to user interaction, bind host element events to handler methods through the `host` property of the `@Directive()` decorator. The following directive highlights the host element while the pointer is over it and clears the highlight when the pointer leaves:

<docs-code header="highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.2.ts"/>

The `host` property maps the `mouseenter` and `mouseleave` events to the `onMouseEnter()` and `onMouseLeave()` methods, which delegate to a `highlight()` helper that sets the background color on the host element. For more on host event bindings, see [binding to the host element](guide/components/host-elements#binding-to-the-host-element).

## Accepting input values

Like components, directives accept inputs through the [`input()`](guide/components/inputs) function. Give an input the same name as the selector so that a single binding both applies the directive and passes a value to it:

<docs-code header="highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.3.ts" region="input"/>

Read the input by calling it as a signal, and fall back to a default when no color is set:

<docs-code header="highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.3.ts" region="mouse-enter"/>

In the template, bind the value to the selector. Because the input shares the selector's name, `[appHighlight]` both applies the directive and sets its value. Here the bound `color` is a property on the component:

<docs-code header="app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" region="color"/>

<docs-code header="app.component.ts" path="adev/src/content/examples/attribute-directives/src/app/app.component.ts" region="class"/>

A directive can declare more than one input. The following directive adds a `defaultColor` input, then falls back through `appHighlight`, `defaultColor`, and finally `red`:

<docs-code header="highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.ts"/>

Bind both inputs on the same element. Because `defaultColor` takes a static string rather than a dynamic expression, it doesn't need square brackets:

<docs-code header="app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" region="defaultColor"/>
-->

# 어트리뷰트 디렉티브

어트리뷰트 디렉티브는 DOM 엘리먼트와 Angular 컴포넌트의 모습이나 동작을 변경합니다.

## 한 곳에서만 사용하는 동작은 템플릿 바인딩 활용하기 {#use-template-bindings-for-one-off-behavior}

Angular 템플릿 문법만으로도 개별 엘리먼트의 클래스, 스타일, 프로퍼티, 이벤트를 변경할 수 있습니다.

- [클래스 및 스타일 바인딩](guide/templates/binding#css-class-and-style-property-bindings)은 CSS 클래스와 인라인 스타일을 추가하거나 제거합니다.
- [프로퍼티 및 어트리뷰트 바인딩](guide/templates/binding)은 DOM 프로퍼티와 HTML 어트리뷰트를 설정합니다.
- [이벤트 리스너](guide/templates/event-listeners)는 사용자 상호작용에 반응합니다.

이러한 동작을 재사용 가능한 단위로 묶어서 어떤 엘리먼트나 컴포넌트에도 적용하고 싶다면 어트리뷰트 디렉티브가 유용합니다.

## 어트리뷰트 디렉티브 만들기 {#building-an-attribute-directive}

커스텀 어트리뷰트 디렉티브는 `@Directive()` 데코레이터가 있는 JavaScript 클래스입니다.
데코레이터의 `selector`는 디렉티브를 적용할 어트리뷰트를 정의합니다.
대괄호를 사용하면 어트리뷰트 셀렉터가 되므로 해당 어트리뷰트가 있는 엘리먼트에 디렉티브가 적용됩니다.
이름 충돌을 방지하려면 관례에 따라 `app` 같은 접두사를 사용하세요.

```ts
import {Directive} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {}
```

참고: CLI 명령어 [`ng generate directive`](tools/cli/schematics)를 사용하면 디렉티브와 테스트 파일의 기본 구조를 생성할 수 있습니다.

디렉티브는 호스트 바인딩으로 호스트를 선언적으로 변경하거나, 호스트 엘리먼트의 참조를 통해 명령형으로 변경할 수 있습니다.
다음 예제는 [`ElementRef`](api/core/ElementRef)를 [주입](guide/di)받고 `nativeElement` 프로퍼티로 엘리먼트에 접근해서 배경을 노란색으로 설정합니다.

<docs-code header="highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.1.ts"/>

중요: 디렉티브는 네임스페이스를 지원하지 _않습니다_.

```angular-html {avoid}
<p app:Highlight>This is invalid</p>
```

## 어트리뷰트 디렉티브 적용하기 {#applying-an-attribute-directive}

엘리먼트에 디렉티브 셀렉터를 어트리뷰트로 추가하면 디렉티브를 적용할 수 있습니다.

<docs-code header="app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.1.html" region="applied"/>

Angular는 해당 `<p>` 엘리먼트에 `HighlightDirective` 인스턴스를 생성하고, 엘리먼트의 참조를 주입한 뒤 배경을 노란색으로 설정합니다.

## 사용자 이벤트 처리하기 {#handling-user-events}

사용자 상호작용에 반응하려면 `@Directive()` 데코레이터의 `host` 프로퍼티에서 호스트 엘리먼트의 이벤트를 핸들러 메서드에 바인딩하세요.
다음 디렉티브는 포인터가 호스트 엘리먼트 위에 있는 동안 엘리먼트를 강조하고, 포인터가 벗어나면 강조를 해제합니다.

<docs-code header="highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.2.ts"/>

`host` 프로퍼티는 `mouseenter`와 `mouseleave` 이벤트를 `onMouseEnter()`와 `onMouseLeave()` 메서드에 연결합니다.
이 메서드들은 호스트 엘리먼트의 배경색을 설정하는 `highlight()` 헬퍼를 호출합니다.
호스트 이벤트 바인딩은 [호스트 엘리먼트에 바인딩하기](guide/components/host-elements#binding-to-the-host-element)를 참고하세요.

<a id="passing-values-into-an-attribute-directive"></a>

## 입력값 받기 {#accepting-input-values}

컴포넌트와 마찬가지로 디렉티브도 [`input()`](guide/components/inputs) 함수로 입력값을 받습니다.
입력 프로퍼티의 이름을 셀렉터와 같게 지정하면 하나의 바인딩으로 디렉티브를 적용하면서 값을 전달할 수 있습니다.

<docs-code header="highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.3.ts" region="input"/>

입력 프로퍼티를 시그널처럼 호출해서 값을 읽고, 색상을 지정하지 않으면 기본값을 사용하세요.

<docs-code header="highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.3.ts" region="mouse-enter"/>

템플릿에서는 셀렉터에 값을 바인딩합니다.
입력 프로퍼티와 셀렉터의 이름이 같으므로 `[appHighlight]`는 디렉티브를 적용하고 값도 설정합니다.
여기서 바인딩한 `color`는 컴포넌트의 프로퍼티입니다.

<docs-code header="app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" region="color"/>

<docs-code header="app.component.ts" path="adev/src/content/examples/attribute-directives/src/app/app.component.ts" region="class"/>

디렉티브에는 여러 입력 프로퍼티를 선언할 수 있습니다.
다음 디렉티브는 `defaultColor` 입력 프로퍼티를 추가하고, `appHighlight`, `defaultColor`, 마지막으로 `red` 순서로 사용할 색상을 결정합니다.

<docs-code header="highlight.directive.ts" path="adev/src/content/examples/attribute-directives/src/app/highlight.directive.ts"/>

같은 엘리먼트에 두 입력 프로퍼티를 바인딩하세요.
`defaultColor`에는 동적인 표현식 대신 정적인 문자열을 전달하므로 대괄호가 필요하지 않습니다.

<docs-code header="app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" region="defaultColor"/>

<!--
## Deactivating Angular processing with `NgNonBindable`
-->

<a id="deactivating-angular-processing-with-ngnonbindable"></a>

## Angular 처리 중단하기: `NgNonBindable`

<!--
To prevent expression evaluation in the browser, add `ngNonBindable` to the host element.
`ngNonBindable` deactivates interpolation, directives, and binding in templates.

In the following example, the expression `{{ 1 + 1 }}` renders just as it does in your code editor, and does not display `2`.

<docs-code header="app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" region="ngNonBindable"/>

Applying `ngNonBindable` to an element stops binding for that element's child elements.
However, `ngNonBindable` still lets directives work on the element where you apply `ngNonBindable`.
In the following example, the `appHighlight` directive is still active but Angular does not evaluate the expression `{{ 1 + 1 }}`.

<docs-code header="app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" region="ngNonBindable-with-directive"/>

If you apply `ngNonBindable` to a parent element, Angular disables interpolation and binding of any sort, such as property binding or event binding, for the element's children.
-->

브라우저에서 Angular 표현식을 평가하지 않으려면 호스트 엘리먼트에 `ngNonBindable`을 추가하면 됩니다.
`ngNonBindable`은 문자열 바인딩, 디렉티브 동작, 템플릿의 바인딩을 비활성화합니다.

아래 예제 코드에서 `{{ 1 + 1 }}` 라는 표현식은 평가되지 않고 그대로 화면에 표시됩니다.

<docs-code header="app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" region="ngNonBindable"/>

엘리먼트에 `ngNonBindable`을 지정하면 이 엘리먼트의 자식 엘리먼트의 바인딩이 중단됩니다.
하지만 `ngNonBindable`이 적용된 엘리먼트 자체에는 디렉티브 동작이 중단되지 않습니다.
아래 예제 코드처럼 구현하면, `appHighlight` 디렉티브는 여전히 동작하지만 표현식 `{{ 1 + 1 }}`는 평가되지 않습니다.

<docs-code header="app.component.html" path="adev/src/content/examples/attribute-directives/src/app/app.component.html" region="ngNonBindable-with-directive"/>

그래서 어떤 엘리먼트를 포함하여 자식 엘리먼트들에 존재하는 문자열 바인딩, 프로퍼티 바인딩, 이벤트 바인딩을 모두 비활성화하려면, 해당 엘리먼트의 부모 엘리먼트에 `ngNonBindable`을 적용하면 됩니다.

<!--
## What's next

<docs-pill-row>
  <docs-pill href="guide/directives/structural-directives" title="Structural directives"/>
  <docs-pill href="guide/directives/directive-composition-api" title="Directive composition API"/>
</docs-pill-row>
-->

## 다음 단계 {#whats-next}

<docs-pill-row>
  <docs-pill href="guide/directives/structural-directives" title="구조 디렉티브"/>
  <docs-pill href="guide/directives/directive-composition-api" title="디렉티브 조합 API"/>
</docs-pill-row>
