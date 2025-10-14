<!--
# Create template fragments with ng-template
-->
# 템플릿 조각 만들기: `<ng-template>`

<!--
Inspired by the [native `<template>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template), the `<ng-template>` element lets you declare a **template fragment** – a section of content that you can dynamically or programmatically render.
-->
`<ng-template>` 엘리먼트는 [표준 `<template>` 엘리먼트](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)와 비슷하게 **템플릿 조각(template fragment)** 를 선언하는 엘리먼트입니다.
이렇게 정의한 템플릿 조각은 동적으로 렌더링하거나 코드로 렌더링 할 수 있습니다.


<!--
## Creating a template fragment
-->
## 템플릿 조각 만들기

<!--
You can create a template fragment inside of any component template with the `<ng-template>` element:

```angular-html
<p>This is a normal element</p>

<ng-template>
  <p>This is a template fragment</p>
</ng-template>
```

When the above is rendered, the content of the `<ng-template>` element is not rendered on the page. Instead, you can get a reference to the template fragment and write code to dynamically render it.
-->
템플릿 조각은 컴포넌트 템플릿에서 `<ng-template>` 엘리먼트를 사용하면 생성할 수 있습니다:

```angular-html
<p>This is a normal element</p>

<ng-template>
  <p>This is a template fragment</p>
</ng-template>
```

`<ng-template>` 엘리먼트는 실제로 렌더링되지 않습니다.
이 엘리먼트는 이후에 동적으로 렌더링할 템플릿 조각에 대한 참조로 사용됩니다.


<!--
### Binding context for fragments
-->
### 템플릿 조각의 컨텍스트

<!--
Template fragments may contain bindings with dynamic expressions:

```angular-ts
@Component({
  /* ... */,
  template: `<ng-template>You've selected {{count}} items.</ng-template>`,
})
export class ItemCounter {
  count: number = 0;
}
```

Expressions or statements in a template fragment are evaluated against the component in which the fragment is declared, regardless of where the fragment is rendered.
-->
템플릿 조각에는 바인딩 표현식이 존재할 수 있습니다:

```angular-ts
@Component({
  /* ... */,
  template: `<ng-template>You've selected {{count}} items.</ng-template>`,
})
export class ItemCounter {
  count: number = 0;
}
```

템플릿 조각에 존재하는 표현식(expressions)이나 실행문(statements)은 템플릿 조각이 렌더링 되는 곳이 아니라, 템플릿 조각이 선언된 컴포넌트의 컨텍스트와 연결됩니다.


<!--
## Getting a reference to a template fragment
-->
## 템플릿 조각 참조하기

<!--
You can get a reference to a template fragment in one of three ways:

- By declaring a [template reference variable](/guide/templates/variables#template-reference-variables) on the `<ng-template>` element
- By querying for the fragment with [a component or directive query](/guide/components/queries)
- By injecting the fragment in a directive that's applied directly to an `<ng-template>` element.

In all three cases, the fragment is represented by a [TemplateRef](/api/core/TemplateRef) object.
-->
템플릿 조각을 참조하는 방법은 세 가지 입니다:

- `<ng-template>` 엘리먼트에 [템플릿 참조 변수](/guide/templates/variables#template-reference-variables)를 선언하는 방법
- [컴포넌트/디렉티브 쿼리](/guide/components/queries)로 쿼리하는 방법
- `<ng-template>` 엘리먼트를 의존성 관계로 참조하는 방법

위 세 방법 모두 템플릿 조각은 [TemplateRef](/api/core/TemplateRef) 객체 타입으로 참조합니다.


<!--
### Referencing a template fragment with a template reference variable
-->
### 템플릿 참조 변수로 참조하기

<!--
You can add a template reference variable to an `<ng-template>` element to reference that template fragment in other parts of the same template file:

```angular-html
<p>This is a normal element</p>

<ng-template #myFragment>
  <p>This is a template fragment</p>
</ng-template>
```

You can then reference this fragment anywhere else in the template via the `myFragment` variable.
-->
`<ng-template>` 엘리먼트에 템플릿 참조 변수를 지정하면 템플릿의 다른 영역에서 템플릿 조각을 참조할 수 있습니다:

```angular-html
<p>This is a normal element</p>

<ng-template #myFragment>
  <p>This is a template fragment</p>
</ng-template>
```

이제 이 컴포넌트의 템플릿에서는 `myFragment` 변수로 템플릿 조각을 참조할 수 있습니다.


<!--
### Referencing a template fragment with queries
-->
### 쿼리로 참조하기

<!--
You can get a reference to a template fragment using any [component or directive query API](/guide/components/queries).

For example, if your template has exactly one template fragment, you can query directly for the `TemplateRef` object with a `@ViewChild` query:

```angular-ts
@Component({
  /* ... */,
  template: `
    <p>This is a normal element</p>

    <ng-template>
      <p>This is a template fragment</p>
    </ng-template>
  `,
})
export class ComponentWithFragment {
  @ViewChild(TemplateRef) myFragment: TemplateRef<unknown> | undefined;
}
```

You can then reference this fragment in your component code or the component's template like any other class member.

If a template contains multiple fragments, you can assign a name to each fragment by adding a template reference variable to each `<ng-template>` element and querying for the fragments based on that name:

```angular-ts
@Component({
  /* ... */,
  template: `
    <p>This is a normal element</p>

    <ng-template #fragmentOne>
      <p>This is one template fragment</p>
    </ng-template>

    <ng-template #fragmentTwo>
      <p>This is another template fragment</p>
    </ng-template>
  `,
})
export class ComponentWithFragment {
  // When querying by name, you can use the `read` option to specify that you want to get the
  // TemplateRef object associated with the element.
  @ViewChild('fragmentOne', {read: TemplateRef}) fragmentOne: TemplateRef<unknown> | undefined;
  @ViewChild('fragmentTwo', {read: TemplateRef}) fragmentTwo: TemplateRef<unknown> | undefined;
}
```

Again, you can then reference these fragments in your component code or the component's template like any other class members.
-->
[컴포넌트/디렉티브 쿼리 API](/guide/components/queries)를 사용하면 템플릿 조각을 참조할 수 있습니다.

그래서 템플릿에 템플릿 조각이 하나만 있다면, `@ViewChild` 쿼리를 사용해서 `TemplateRef` 객체를 직접 쿼리하면 됩니다:

```angular-ts
@Component({
  /* ... */,
  template: `
    <p>This is a normal element</p>

    <ng-template>
      <p>This is a template fragment</p>
    </ng-template>
  `,
})
export class ComponentWithFragment {
  @ViewChild(TemplateRef) myFragment: TemplateRef<unknown> | undefined;
}
```

그러면 이제 다른 클래스 멤버처럼 템플릿 조각을 참조할 수 있습니다.

템플릿 조각이 여러 개라면, 각 `<ng-template>` 엘리먼트에 템플릿 참조 변수를 추가한 후에 쿼리하면서 이름을 지정하면 됩니다:

```angular-ts
@Component({
  /* ... */,
  template: `
    <p>This is a normal element</p>

    <ng-template #fragmentOne>
      <p>This is one template fragment</p>
    </ng-template>

    <ng-template #fragmentTwo>
      <p>This is another template fragment</p>
    </ng-template>
  `,
})
export class ComponentWithFragment {
  // 이름으로 쿼리하면서 `read` 옵션을 지정해서 이 엘리먼트의 TemplateRef를 참조한다는 것을 지정합니다.
  @ViewChild('fragmentOne', {read: TemplateRef}) fragmentOne: TemplateRef<unknown> | undefined;
  @ViewChild('fragmentTwo', {read: TemplateRef}) fragmentTwo: TemplateRef<unknown> | undefined;
}
```

이 경우에도 이전과 마찬가지로, 쿼리로 찾은 템플릿 조각은 다른 클래스 멤버처럼 참조할 수 있습니다.


<!--
### Injecting a template fragment
-->
### 의존성 관계로 참조하기

<!--
A directive can inject a `TemplateRef` if that directive is applied directly to an `<ng-template>` element:

```angular-ts
@Directive({
  selector: '[myDirective]'
})
export class MyDirective {
  private fragment = inject(TemplateRef);
}
```

```angular-html
<ng-template myDirective>
  <p>This is one template fragment</p>
</ng-template>
```

You can then reference this fragment in your directive code like any other class member.
-->
`<ng-template>` 엘리먼트에 디렉티브가 사용되었다면, 이 디렉티브를 활용해서 `TemplateRef` 객체를 참조할 수 있습니다:

```angular-ts
@Directive({
  selector: '[myDirective]'
})
export class MyDirective {
  private fragment = inject(TemplateRef);
}
```

```angular-html
<ng-template myDirective>
  <p>This is one template fragment</p>
</ng-template>
```

이렇게 참조한 템플릿 조각은 클래스 멤버처럼 참조할 수 있습니다.


<!--
## Rendering a template fragment
-->
## 템플릿 조각 렌더링하기

<!--
Once you have a reference to a template fragment's `TemplateRef` object, you can render a fragment in one of two ways: in your template with the `NgTemplateOutlet` directive or in your TypeScript code with `ViewContainerRef`.
-->
템플릿 조각을 `TemplateRef` 객체 타입으로 참조하고 나면, 이 템플릿 조각은 템플릿에서 `NgTemplateOutlet` 디렉티브로 렌더링하거나, TypeScript 코드에서 `ViewContainerRef`로 렌더링 할 수 있습니다.


<!--
### Using `NgTemplateOutlet`
-->
### `NgTemplateOutlet` 로 렌더링하기

<!--
The `NgTemplateOutlet` directive from `@angular/common` accepts a `TemplateRef` and renders the fragment as a **sibling** to the element with the outlet. You should generally use `NgTemplateOutlet` on an [`<ng-container>` element](/guide/templates/ng-container).

First, import `NgTemplateOutlet`:
```typescript
import { NgTemplateOutlet } from '@angular/common';
```

The following example declares a template fragment and renders that fragment to a `<ng-container>` element with `NgTemplateOutlet`:

```angular-html
<p>This is a normal element</p>

<ng-template #myFragment>
  <p>This is a fragment</p>
</ng-template>

<ng-container *ngTemplateOutlet="myFragment"></ng-container>
```

This example produces the following rendered DOM:

```angular-html
<p>This is a normal element</p>
<p>This is a fragment</p>
```
-->
`@angular/common` 패키지로 제공되는 `NgTemplateOutlet` 디렉티브는 `TemplateRef`를 인자로 받아서 디렉티브가 지정된 엘리먼트의 **이웃으로** 템플릿 조각을 렌더링합니다.
보통은 [`<ng-container>` 엘리먼트](/guide/templates/ng-container)에 `NgTemplateOutlet` 디렉티브를 사용합니다.

먼저, `NgTemplateOutlet` 심볼을 로드합니다:

```typescript
import { NgTemplateOutlet } from '@angular/common';
```

그리고 아래 예제 코드처럼 템플릿 조각을 선언한 후 `<ng-container>`에 `NgTemplateOutlet`를 지정해서 렌더링하면 됩니다:

```angular-html
<p>This is a normal element</p>

<ng-template #myFragment>
  <p>This is a fragment</p>
</ng-template>

<ng-container *ngTemplateOutlet="myFragment"></ng-container>
```

최종 결과는 이렇게 렌더링 됩니다:

```angular-html
<p>This is a normal element</p>
<p>This is a fragment</p>
```


<!--
### Using `ViewContainerRef`
-->
### `ViewContainerRef` 로 렌더링하기

<!--
A **view container** is a node in Angular's component tree that can contain content. Any component or directive can inject `ViewContainerRef` to get a reference to a view container corresponding to that component or directive's location in the DOM.

You can use the `createEmbeddedView` method on `ViewContainerRef` to dynamically render a template fragment. When you render a fragment with a `ViewContainerRef`, Angular appends it into the DOM as the next sibling of the component or directive that injected the `ViewContainerRef`.

The following example shows a component that accepts a reference to a template fragment as an input and renders that fragment into the DOM on a button click.

```angular-ts
@Component({
  /* ... */,
  selector: 'component-with-fragment',
  template: `
    <h2>Component with a fragment</h2>
    <ng-template #myFragment>
      <p>This is the fragment</p>
    </ng-template>
    <my-outlet [fragment]="myFragment" />
  `,
})
export class ComponentWithFragment { }

@Component({
  /* ... */,
  selector: 'my-outlet',
  template: `<button (click)="showFragment()">Show</button>`,
})
export class MyOutlet {
  private viewContainer = inject(ViewContainerRef);
  fragment = input<TemplateRef<unknown> | undefined>();

  showFragment() {
    if (this.fragment()) {
      this.viewContainer.createEmbeddedView(this.fragment());
    }
  }
}
```

In the example above, clicking the "Show" button results in the following output:

```angular-html
<component-with-fragment>
  <h2>Component with a fragment>
  <my-outlet>
    <button>Show</button>
  </my-outlet>
  <p>This is the fragment</p>
</component-with-fragment>
```
-->
Angular 컴포넌트 트리에서 내용물이 존재할 수 있는 노드를 **뷰 컨테이너(view container)** 라고 합니다.
그리고 컴포넌트나 디렉티브는 `ViewContainerRef` 를 의존성으로 주입 받아서 해당 컴포넌트나 디렉티브에 해당하는 뷰 컨테이너를 참조할 수 있습니다.

이렇게 참조한 `ViewContainerRef` 객체의 `createEmbeddedView` 메서드를 사용하면 템플릿 조각을 동적으로 렌더링할 수 있으며, 렌더링하는 템플릿 조각은 `ViewContainerRef` 객체의 이웃으로 DOM에 추가됩니다.

아래 코드는 사용자가 버튼을 클릭하면 템플릿 조각을 찾아서 DOM에 렌더링하는 예제 코드입니다.

```angular-ts
@Component({
  /* ... */,
  selector: 'component-with-fragment',
  template: `
    <h2>Component with a fragment</h2>
    <ng-template #myFragment>
      <p>This is the fragment</p>
    </ng-template>
    <my-outlet [fragment]="myFragment" />
  `,
})
export class ComponentWithFragment { }

@Component({
  /* ... */,
  selector: 'my-outlet',
  template: `<button (click)="showFragment()">Show</button>`,
})
export class MyOutlet {
  private viewContainer = inject(ViewContainerRef);
  fragment = input<TemplateRef<unknown> | undefined>();

  showFragment() {
    if (this.fragment()) {
      this.viewContainer.createEmbeddedView(this.fragment());
    }
  }
}
```

이렇게 구현하고 사용자가 "Show" 버튼을 클릭하면 DOM은 이렇게 렌더링됩니다:

```angular-html
<component-with-fragment>
  <h2>Component with a fragment>
  <my-outlet>
    <button>Show</button>
  </my-outlet>
  <p>This is the fragment</p>
</component-with-fragment>
```


<!--
## Passing parameters when rendering a template fragment
-->
## 템플릿 조각을 렌더링하면서 인자 전달하기

<!--
When declaring a template fragment with `<ng-template>`, you can additionally declare parameters accepted by the fragment. When you render a fragment, you can optionally pass a `context` object corresponding to these parameters. You can use data from this context object in binding expressions and statements, in addition to referencing data from the component in which the fragment is declared.

Each parameter is written as an attribute prefixed with `let-` with a value matching a property name in the context object:

```angular-html
<ng-template let-pizzaTopping="topping">
  <p>You selected: {{pizzaTopping}}</p>
</ng-template>
```
-->
`<ng-template>`으로 템플릿 조각을 선언할 때, 변수를 함께 선언할 수 있습니다.
그리고 템플릿 조각을 렌더링하면서 이 변수에 해당하는 `context` 객체를 전달할 수 있습니다.
그러면 컴포넌트 데이터를 컨텍스트 객체로 전달해서 바인딩 표현식이나 실행문에서 활용할 수 있습니다.

컨텍스트 객체에 선언하는 프로퍼티는 어트리뷰트 이름 앞에 `let-` 접두사를 붙여 선언합니다:

```angular-html
<ng-template let-pizzaTopping="topping">
  <p>You selected: {{pizzaTopping}}</p>
</ng-template>
```


<!--
### Using `NgTemplateOutlet`
-->
### `NgTemplateOutlet` 활용하기

<!--
You can bind a context object to the `ngTemplateOutletContext` input:

```angular-html
<ng-template #myFragment let-pizzaTopping="topping">
  <p>You selected: {{pizzaTopping}}</p>
</ng-template>

<ng-container
  [ngTemplateOutlet]="myFragment"
  [ngTemplateOutletContext]="{topping: 'onion'}"
/>
```
-->
컨텍스트 객체는 `ngTemplateOutletContext`로 바인딩 할 수 있습니다:

```angular-html
<ng-template #myFragment let-pizzaTopping="topping">
  <p>You selected: {{pizzaTopping}}</p>
</ng-template>

<ng-container
  [ngTemplateOutlet]="myFragment"
  [ngTemplateOutletContext]="{topping: 'onion'}"
/>
```


<!--
### Using `ViewContainerRef`
-->
### `ViewContainerRef` 활용하기

<!--
You can pass a context object as the second argument to `createEmbeddedView`:

```angular-ts
this.viewContainer.createEmbeddedView(this.myFragment, {topping: 'onion'});
```
-->
그리고 `createEmbeddedView` 메서드의 두 번째 인자로 컨텍스트 객체를 전달할 수도 있습니다:

```angular-ts
this.viewContainer.createEmbeddedView(this.myFragment, {topping: 'onion'});
```


<!--
## Structural directives
-->
## 구조 디렉티브

<!--
A **structural directive** is any directive that:

- Injects `TemplateRef`
- Injects `ViewContainerRef` and programmatically renders the injected `TemplateRef`

Angular supports a special convenience syntax for structural directives. If you apply the directive to an element and prefix the directive's selector with an asterisk (`*`) character, Angular interprets the entire element and all of its content as a template fragment:

```angular-html
<section *myDirective>
  <p>This is a fragment</p>
</section>
```

This is equivalent to:

```angular-html
<ng-template myDirective>
  <section>
    <p>This is a fragment</p>
  </section>
</ng-template>
```

Developers typically use structural directives to conditionally render fragments or render fragments multiple times.

For more details, see [Structural Directives](/guide/directives/structural-directives).
-->
**구조 디렉티브(structural directive)** 는:

- `TemplateRef` 를 의존성으로 주입받거나,
- `ViewContainerRef` 를 의존성으로 주입받아 `TemplateRef`를 코드로 렌더링하는 디렉티브입니다.

Angular는 구조 디렉티브를 간편하게 사용할 수 있는 특별한 방법을 제공합니다.
디렉티브를 엘리먼트에 사용할 때 이 디렉티브 셀렉터 앞에 아스테리스크(`*`) 문자를 추가하면, Angular는 이 엘리먼트 전체를 템플릿 조각으로 다룹니다:

```angular-html
<section *myDirective>
  <p>This is a fragment</p>
</section>
```

이 코드는 아래 코드와 같습니다:

```angular-html
<ng-template myDirective>
  <section>
    <p>This is a fragment</p>
  </section>
</ng-template>
```

구조 디렉티브는 일반적으로 템플릿 조각을 조건에 따라 렌더링하거나, 여러번 렌더링하는 방식으로 활용됩니다.

더 자세한 내용은 [구조 디렉티브](/guide/directives/structural-directives) 문서를 참고하세요.


<!--
## Additional resources
-->
## 추가 자료

<!--
For examples of how `ng-template` is used in other libraries, check out:

- [Tabs from Angular Material](https://material.angular.dev/components/tabs/overview) - nothing gets rendered into the DOM until the tab is activated
- [Table from Angular Material](https://material.angular.dev/components/table/overview) - allows developers to define different ways to render data
-->
다른 라이브러리에서 `ng-template`이 어떻게 사용되는지 알아보려면, 이런 내용을 확인해 보세요:

- [Angular Material의 탭](https://material.angular.dev/components/tabs/overview) - 탭이 활성화되어야 DOM이 렌더링됩니다.
- [Angular Material의 표](https://material.angular.dev/components/table/overview) - 데이터를 다양한 방식으로 렌더링 할 수 있습니다.
