<!--
<docs-decorative-header title="Directives" imgSrc="adev/src/assets/images/directives.svg"> <!- markdownlint-disable-line ->
Directives add behavior to elements and components in your Angular applications.
</docs-decorative-header>

A directive can change how an element looks, how it behaves, or how it fits into the DOM. Angular ships with several built-in directives, and you can write your own.

## When to use a directive

Directives are most effective when they encapsulate **reusable** behavior that you want to apply to an existing element or component.

Common examples include:

- Applying the same appearance or behavior across many elements, such as autofocus or a tooltip.
- Reading from or writing to the host element's DOM, attributes, or classes.
- Adding behavior to a component you don't own without changing its source.

If you need to render your own markup or manage a piece of UI with its own template, reach for a [component](guide/components), a specialized directive with its own template.

## A quick example

Suppose you want elements to highlight when the user hovers over them with a mouse, changing their background color to yellow. Rather than repeat the same event-handling logic on every element, you can package that behavior in a directive and apply it wherever you need it.

The following `appHighlight` directive sets the host element's background color when the mouse enters and clears it when the mouse leaves:

```ts
import {Directive, signal} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'isHovered.set(true)',
    '(mouseleave)': 'isHovered.set(false)',
    '[style.background-color]': 'isHovered() ? "yellow" : null',
  },
})
export class HighlightDirective {
  protected isHovered = signal(false);
}
```

The `host` metadata listens for mouse events to update the `isHovered` signal, and binds the host element's `background-color` style to the signal's value.

Apply the directive by adding its selector as an attribute on an element:

```angular-html
<p appHighlight>Highlight me!</p>
```

Every element that carries the `appHighlight` attribute gains the same hover behavior, with the logic defined in one place.

## Types of directives

Angular has three primary types of directives:

| Directive type                                                  | Details                                                                           |
| :-------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| [Components](guide/components)                                  | Define reusable UI with their own template.                                       |
| [Attribute directives](guide/directives/attribute-directives)   | Change the appearance or behavior of an element, component, or another directive. |
| [Structural directives](guide/directives/structural-directives) | Change the DOM layout by adding and removing DOM elements.                        |

## What's next

Learn more about each type of directive in the following guides.

<docs-pill-row>
  <docs-pill href="guide/directives/attribute-directives" title="Attribute directives"/>
  <docs-pill href="guide/directives/structural-directives" title="Structural directives"/>
  <docs-pill href="guide/directives/directive-composition-api" title="Directive composition API"/>
</docs-pill-row>
-->

<docs-decorative-header title="디렉티브" imgSrc="adev/src/assets/images/directives.svg"> <!-- markdownlint-disable-line -->
디렉티브는 Angular 애플리케이션의 엘리먼트와 컴포넌트에 동작을 추가합니다.
</docs-decorative-header>

디렉티브는 엘리먼트의 모습이나 동작, DOM 안에서의 배치를 변경할 수 있습니다.
Angular가 제공하는 내장 디렉티브를 사용하거나 직접 디렉티브를 작성할 수 있습니다.

## 디렉티브를 사용하는 경우 {#when-to-use-a-directive}

기존 엘리먼트나 컴포넌트에 적용할 **재사용 가능한** 동작을 캡슐화할 때 디렉티브가 가장 효과적입니다.

다음과 같은 경우에 주로 사용합니다.

- 자동 포커스나 툴팁처럼 여러 엘리먼트에 같은 모습이나 동작 적용하기
- 호스트 엘리먼트의 DOM, 어트리뷰트, 클래스 읽거나 변경하기
- 직접 관리하지 않는 컴포넌트의 소스 코드를 변경하지 않고 동작 추가하기

직접 마크업을 렌더링하거나 자체 템플릿이 있는 UI를 관리해야 한다면, 자체 템플릿을 가진 특별한 디렉티브인 [컴포넌트](guide/components)를 사용하세요.

## 간단한 예제 {#a-quick-example}

사용자가 엘리먼트 위로 마우스를 가져가면 배경색을 노란색으로 바꿔서 강조하고 싶다고 가정해 보세요.
모든 엘리먼트에 같은 이벤트 처리 로직을 반복해서 작성하는 대신 디렉티브로 구성해서 필요한 곳에 적용할 수 있습니다.

다음 `appHighlight` 디렉티브는 마우스가 호스트 엘리먼트 안으로 들어오면 배경색을 설정하고, 밖으로 나가면 배경색을 지웁니다.

```ts
import {Directive, signal} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'isHovered.set(true)',
    '(mouseleave)': 'isHovered.set(false)',
    '[style.background-color]': 'isHovered() ? "yellow" : null',
  },
})
export class HighlightDirective {
  protected isHovered = signal(false);
}
```

`host` 메타데이터는 마우스 이벤트를 감지해서 `isHovered` 시그널을 갱신하고, 호스트 엘리먼트의 `background-color` 스타일을 시그널 값에 바인딩합니다.

엘리먼트에 디렉티브 셀렉터를 어트리뷰트로 추가하면 디렉티브를 적용할 수 있습니다.

```angular-html
<p appHighlight>강조해 주세요!</p>
```

`appHighlight` 어트리뷰트가 있는 모든 엘리먼트에는 한 곳에 정의한 같은 호버 동작이 적용됩니다.

## 디렉티브 종류 {#types-of-directives}

Angular에는 세 가지 주요 디렉티브 종류가 있습니다.

| 디렉티브 종류                                                | 설명                                                            |
| :----------------------------------------------------------- | :-------------------------------------------------------------- |
| [컴포넌트](guide/components)                                 | 자체 템플릿으로 재사용 가능한 UI를 정의합니다.                  |
| [어트리뷰트 디렉티브](guide/directives/attribute-directives) | 엘리먼트, 컴포넌트, 다른 디렉티브의 모습이나 동작을 변경합니다. |
| [구조 디렉티브](guide/directives/structural-directives)      | DOM 엘리먼트를 추가하거나 제거해서 DOM 배치를 변경합니다.       |

## 다음 단계 {#whats-next}

다음 가이드에서 각 디렉티브 종류를 자세히 알아보세요.

<docs-pill-row>
  <docs-pill href="guide/directives/attribute-directives" title="어트리뷰트 디렉티브"/>
  <docs-pill href="guide/directives/structural-directives" title="구조 디렉티브"/>
  <docs-pill href="guide/directives/directive-composition-api" title="디렉티브 조합 API"/>
</docs-pill-row>
