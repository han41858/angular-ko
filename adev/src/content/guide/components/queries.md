<!--
# Referencing component children with queries
-->
# 쿼리 함수로 자식 컴포넌트 참조하기

<!--
TIP: This guide assumes you've already read the [Essentials Guide](essentials). Read that first if you're new to Angular.

A component can define **queries** that find child elements and read values from their injectors.

Developers most commonly use queries to retrieve references to child components, directives, DOM elements, and more.

All query functions return signals that reflect the most up-to-date results. You can read the
result by calling the signal function, including in reactive contexts like `computed` and `effect`.

There are two categories of query: **view queries** and **content queries.**
-->
팁: 이 가이드 문서는 [핵심 가이드](essentials) 이후 내용을 다룹니다. 아직 Angular에 익숙하지 않다면 해당 문서를 먼저 읽어보세요.

컴포넌트에서 **쿼리 함수(queries)** 를 사용하면 자식 엘리먼트를 찾아서 값을 참조할 수 있습니다.

보통은 자식 컴포넌트나 자식 디렉티브, DOM 엘리먼트 등을 참조하는 용도로 사용합니다.

쿼리 함수는 가장 마지막에 찾은 결과를 시그널 타입으로 반환합니다.
그래서 시그널 함수를 실행하면 자식 객체를 참조할 수 있으며, `computed` 나 `effect` 함수와 함께 사용해서 반응형 시그널로 활용할 수도 있습니다.

쿼리 함수는 **뷰 쿼리(view queries)** 와 **컨텐츠 쿼리(content queries)** , 이렇게 두 종류가 있습니다.


<!--
## View queries
-->
## 뷰 쿼리(View queries)

<!--
View queries retrieve results from the elements in the component's _view_ — the elements defined in the component's own template. You can query for a single result with the `viewChild` function.

<docs-code language="angular-ts" highlight="[14, 15]">
@Component({
  selector: 'custom-card-header',
  /*...*/
})
export class CustomCardHeader {
  text: string;
}

@Component({
  selector: 'custom-card',
  template: '<custom-card-header>Visit sunny California!</custom-card-header>',
})
export class CustomCard {
  header = viewChild(CustomCardHeader);
  headerText = computed(() => this.header()?.text);
}
</docs-code>

In this example, the `CustomCard` component queries for a child `CustomCardHeader` and uses the result in a `computed`.

If the query does not find a result, its value is `undefined`. This may occur if the target element is hidden by `@if`. Angular keeps the result of `viewChild` up to date as your application state changes.

You can also query for multiple results with the `viewChildren` function.

<docs-code language="angular-ts" highlight="[17, 19, 20, 21, 22, 23]">
@Component({
  selector: 'custom-card-action',
  /*...*/
})
export class CustomCardAction {
  text: string;
}

@Component({
  selector: 'custom-card',
  template: `
    <custom-card-action>Save</custom-card-action>
    <custom-card-action>Cancel</custom-card-action>
  `,
})
export class CustomCard {
  actions = viewChildren(CustomCardAction);
  actionsTexts = computed(() => this.actions().map(action => action.text);
}
</docs-code>

`viewChildren` creates a signal with an `Array` of the query results.

**Queries never pierce through component boundaries.** View queries can only retrieve results from the component's template.
-->
뷰 쿼리는 컴포넌트 _뷰_ , 즉, 컴포넌트 템플릿 자체에 있는 엘리먼트를 찾습니다.
뷰 쿼리 함수 중 `viewChild` 함수를 사용하면 원하는 엘리먼트를 하나 참조할 수 있습니다.

<docs-code language="angular-ts" highlight="[14, 15]">
@Component({
  selector: 'custom-card-header',
  /*...*/
})
export class CustomCardHeader {
  text: string;
}

@Component({
  selector: 'custom-card',
  template: '<custom-card-header>Visit sunny California!</custom-card-header>',
})
export class CustomCard {
  header = viewChild(CustomCardHeader);
  headerText = computed(() => this.header()?.text);
}
</docs-code>

이 예제에서 `CustomCard` 컴포넌트는 자식 `CustomCardHeader`를 찾아 오고, 이 결과를 `computed`로 다시 한 번 참조합니다.

만약, 쿼리 결과가 없으면 시그널은 `undefined` 값을 갖습니다.
이 경우는 찾으려는 엘리먼트가 `@if` 로 화면에 표시되지 않은 경우에 발생할 수 있습니다.
그리고 애플리케이션의 상태가 변경되면 `viewChild` 결과는 계속 최신 상태로 갱신됩니다.

자식 컴포넌트를 여러개 참조하려면 `viewChildren` 함수를 사용하면 됩니다.

<docs-code language="angular-ts" highlight="[17, 19, 20, 21, 22, 23]">
@Component({
  selector: 'custom-card-action',
  /*...*/
})
export class CustomCardAction {
  text: string;
}

@Component({
  selector: 'custom-card',
  template: `
    <custom-card-action>Save</custom-card-action>
    <custom-card-action>Cancel</custom-card-action>
  `,
})
export class CustomCard {
  actions = viewChildren(CustomCardAction);
  actionsTexts = computed(() => this.actions().map(action => action.text);
}
</docs-code>

`viewChildren` 함수는 탐색 결과를 `Array` 타입으로 반환하는 시그널입니다.

**쿼리 함수는 컴포넌트 밖을 참조할 수 없습니다.**
뷰 쿼리는 컴포넌트 템플릿 안에 있는 객체만 참조할 수 있습니다.


<!--
## Content queries
-->
## 컨텐츠 쿼리(Content queries)

<!--
Content queries retrieve results from the elements in the component's _content_— the elements nested inside the component in the template where it's used. You can query for a single result with the `contentChild` function.

<docs-code language="angular-ts" highlight="[14, 15]">
@Component({
  selector: 'custom-toggle',
  /*...*/
})
export class CustomToggle {
  text: string;
}

@Component({
  selector: 'custom-expando',
  /*...*/
})
export class CustomExpando {
  toggle = contentChild(CustomToggle);
  toggleText = computed(() => this.toggle()?.text);
}

@Component({ 
  /* ... */
  // CustomToggle is used inside CustomExpando as content.  
  template: `
    <custom-expando>
      <custom-toggle>Show</custom-toggle>
    </custom-expando>
  `
})
export class UserProfile { }
</docs-code>

In this example, the `CustomExpando` component queries for a child `CustomToggle` and accesses the result in a `computed`.

If the query does not find a result, its value is `undefined`. This may occur if the target element is absent or hidden by `@if`. Angular keeps the result of `contentChild` up to date as your application state changes.

By default, content queries find only _direct_ children of the component and do not traverse into descendants.

You can also query for multiple results with the `contentChildren` function.

<docs-code language="angular-ts" highlight="[14, 16, 17, 18, 19, 20]">
@Component({
  selector: 'custom-menu-item',
  /*...*/
})
export class CustomMenuItem {
  text: string;
}

@Component({
  selector: 'custom-menu',
  /*...*/
})
export class CustomMenu {
  items = contentChildren(CustomMenuItem);
  itemTexts = computed(() => this.items().map(item => item.text));
}

@Component({
  selector: 'user-profile',
  template: `
    <custom-menu>
      <custom-menu-item>Cheese</custom-menu-item>
      <custom-menu-item>Tomato</custom-menu-item>
    </custom-menu>
  `
})
export class UserProfile { }
</docs-code>

`contentChildren` creates a signal with an `Array` of the query results.

**Queries never pierce through component boundaries.** Content queries can only retrieve results from the same template as the component itself.
-->
컨텐츠 쿼리는 컴포넌트 _컨텐츠_, 즉, 컴포넌트 템플릿 안쪽에 있는 엘리먼트를 찾습니다.
컨텐츠 쿼리 함수 중 `contentChild` 함수를 사용하면 원하는 엘리먼트를 하나 참조할 수 있습니다.

<docs-code language="angular-ts" highlight="[14, 15]">
@Component({
  selector: 'custom-toggle',
  /*...*/
})
export class CustomToggle {
  text: string;
}

@Component({
  selector: 'custom-expando',
  /*...*/
})
export class CustomExpando {
  toggle = contentChild(CustomToggle);
  toggleText = computed(() => this.toggle()?.text);
}

@Component({ 
  /* ... */
  // CustomToggle은 CustomExpando 안에 컨텐츠로 사용되었습니다.  
  template: `
    <custom-expando>
      <custom-toggle>Show</custom-toggle>
    </custom-expando>
  `
})
export class UserProfile { }
</docs-code>

위 예제에서 `CustomExpando` 컴포넌트는 자식 `CustomToggle` 컴포넌트를 찾아 오고, 이 결과를 `computed`로 다시 한 번 참조합니다.

만약 쿼리 결과가 없으면 시그널은 `undefined` 값을 갖습니다.
이 경우는 찾으려는 엘리먼트가 `@if`로 화면에 표시되지 않은 경우에 발생할 수 있습니다.
그리고 애플리케이션의 상태가 변경되면 `contentChild` 결과는 계속 최신 상태로 갱신됩니다.

기본적으로 컨텐츠 쿼리는 컴포넌트의 _한 단계 아래_ 자식들을 찾으며, 그보다 자식 컴포넌트는 탐색하지 않습니다.

자식 컴포넌트를 여러개 참조하려면 `contentChildren` 함수를 사용하면 됩니다.

<docs-code language="angular-ts" highlight="[14, 16, 17, 18, 19, 20]">
@Component({
  selector: 'custom-menu-item',
  /*...*/
})
export class CustomMenuItem {
  text: string;
}

@Component({
  selector: 'custom-menu',
  /*...*/
})
export class CustomMenu {
  items = contentChildren(CustomMenuItem);
  itemTexts = computed(() => this.items().map(item => item.text));
}

@Component({
  selector: 'user-profile',
  template: `
    <custom-menu>
      <custom-menu-item>Cheese</custom-menu-item>
      <custom-menu-item>Tomato</custom-menu-item>
    </custom-menu>
  `
})
export class UserProfile { }
</docs-code>

`contentChildren` 함수는 탐색 결과를 `Array` 타입으로 반환하는 시그널입니다.

**쿼리 함수는 컴포넌트 밖을 참조할 수 없습니다.**
컨텐츠 쿼리는 컴포넌트 템플릿 안에 있는 객체만 참조할 수 있습니다.


<!--
## Required queries
-->
## 필수 쿼리(Required queries)

<!--
If a child query (`viewChild` or `contentChild`) does not find a result, its value is `undefined`. This may occur if the target element is hidden by a control flow statement like `@if` or `@for`. Because of this, the child queries return a signal that include `undefined` in their value type.

In some cases, especially with `viewChild`, you know with certainty that a specific child is always available. In other cases, you may want to strictly enforce that a specific child is present. For these cases, you can use a *required query*.

```angular-ts
@Component({/* ... */})
export class CustomCard {
  header = viewChild.required(CustomCardHeader);
  body = contentChild.required(CustomCardBody);
}
```

If a required query does not find a matching result, Angular reports an error. Because this guarantees that a result is available, required queries do not automatically include `undefined` in the signal's value type.
-->
`viewChild` 함수나 `contentChild` 함수를 사용해서 자식 컴포넌트를 탐색했지만 아무것도 찾지 못한 경우, 쿼리 함수가 반환하는 시그널은 `undefined` 값을 갖습니다.
이 경우는 찾으려는 엘리먼트가 `@fi`나 `@for`로 인해 화면에 표시되지 않는 경우에 발생할 수 있습니다.
결국 자식 엘리먼트를 쿼리하는 함수는 찾으려는 객체 타입이거나 `undefined` 타입일 수 있습니다.

하지만 자식 컴포넌트가 반드시 존재하는 경우를 간주할 수 있습니다.
이 경우에는 대상 컴포넌트가 반드시 존재한다는 것을 지정해서 *값이 반드시 존재하는* 쿼리로 처리할 수 있습니다.

```angular-ts
@Component({/* ... */})
export class CustomCard {
  header = viewChild.required(CustomCardHeader);
  body = contentChild.required(CustomCardBody);
}
```

필수 쿼리로 지정했지만 대상을 찾지 못하는 경우에는 에러가 발생합니다.
왜냐하면 필수 쿼리는 대상이 있는 것을 보장하기 때문에 시그널이 `undefined` 값을 가질 수 없기 때문입니다.


<!--
## Query locators
-->
## 쿼리 구분자(Query locators)

<!--
This first parameter for each query decorator is its **locator**.

Most of the time, you want to use a component or directive as your locator.

You can alternatively specify a string locator corresponding to
a [template reference variable](guide/templates/variables#template-reference-variables).

```angular-ts
@Component({
  /*...*/
  template: `
    <button #save>Save</button>
    <button #cancel>Cancel</button>
  `
})
export class ActionBar {
  saveButton = viewChild<ElementRef<HTMLButtonElement>>('save');
}
```

If more than one element defines the same template reference variable, the query retrieves the first matching element.

Angular does not support CSS selectors as query locators.
-->
쿼리 데코레이터의 첫번째 인자는 **구분자(locator)** 입니다.

대부분의 경우, 구분자는 컴포넌트나 디렉티브를 그대로 사용합니다.

아니면 [템플릿 참조 변수](guide/templates/variables#template-reference-variables)를 활용해서 문자열 구분자를 사용할 수도 있습니다.

```angular-ts
@Component({
  /*...*/
  template: `
    <button #save>Save</button>
    <button #cancel>Cancel</button>
  `
})
export class ActionBar {
  saveButton = viewChild<ElementRef<HTMLButtonElement>>('save');
}
```

템플릿에 구분자가 여러개 매칭되는 경우에는 첫번째 매칭되는 엘리먼트를 참조합니다.

CSS 셀렉터는 쿼리 구분자로 사용할 수 없습니다.


<!--
### Queries and the injector tree
-->
### 쿼리 함수와 인젝터 계층

<!--
TIP: See [Dependency Injection](guide/di) for background on providers and Angular's injection tree.

For more advanced cases, you can use any `ProviderToken` as a locator. This lets you locate elements based on component and directive providers.

```angular-ts
const SUB_ITEM = new InjectionToken<string>('sub-item');

@Component({
  /*...*/
  providers: [{provide: SUB_ITEM, useValue: 'special-item'}],
})
export class SpecialItem { }

@Component({/*...*/})
export class CustomList {
  subItemType = contentChild(SUB_ITEM);
}
```

The above example uses an `InjectionToken` as a locator, but you can use any `ProviderToken` to locate specific elements.
-->
팁: 프로바이더와 인젝션 트리 계층에 대해 알아보려면 [의존성 주입(Dependency Injection)](guide/di) 문서를 참고하세요.

`ProviderToken`을 구분자로 사용하는 고급 활용 방식도 있습니다.
이 방식을 활용하면 컴포넌트 프로바이더나 디렉티브 프로바이더로 자식 객체를 탐색할 수 있습니다.

```angular-ts
const SUB_ITEM = new InjectionToken<string>('sub-item');

@Component({
  /*...*/
  providers: [{provide: SUB_ITEM, useValue: 'special-item'}],
})
export class SpecialItem { }

@Component({/*...*/})
export class CustomList {
  subItemType = contentChild(SUB_ITEM);
}
```

위 예제에서는 `InjectionToken`을 구분자로 사용했지만, `ProviderToken` 타입 중 어떠한 것을 사용해도 됩니다.


<!--
## Query options
-->
## 쿼리 옵션

<!--
All query functions accept an options object as a second parameter. These options control how the query finds its results.
-->
쿼리 함수는 두번째 인자로 옵션 객체를 받을 수 있습니다.
옵션을 지정하면 쿼리 함수가 어떻게 객체를 찾을지 지정합니다.

<!--
### Reading specific values from an element's injector
-->
### 엘리먼트 인젝터로 원하는 값 읽기

<!--
By default, the query locator indicates both the element you're searching for and the value retrieved. You can alternatively specify the `read` option to retrieve a different value from the element matched by the locator.

```ts
@Component({/*...*/})
export class CustomExpando {
  toggle = contentChild(ExpandoContent, {read: TemplateRef});
}
```

The above example, locates an element with the directive `ExpandoContent` and retrieves
the `TemplateRef` associated with that element.

Developers most commonly use `read` to retrieve `ElementRef` and `TemplateRef`.
-->
기본적으로 쿼리 구분자는 엘리먼트 자체와 엘리먼트의 값을 모두 의미합니다.
`read` 옵션을 사용하면 구분자와 매칭되는 객체를 직접 지정할 수 있습니다.

```ts
@Component({/*...*/})
export class CustomExpando {
  toggle = contentChild(ExpandoContent, {read: TemplateRef});
}
```

위 예제 코드처럼 작성하면 Angular는 `ExpandoContent`를 찾아서 해당 엘리먼트의 `TemplateRef`를 반환합니다.

`read`에는 일반적으로 `ElementRef`나 `TemplateRef`를 사용합니다.


<!--
### Content descendants
-->
### 컨텐츠의 자식 객체

<!--
By default, `contentChildren` queries find only _direct_ children of the component and do not traverse into descendants.
`contentChild` queries do traverse into descendants by default. 

<docs-code language="angular-ts" highlight="[13, 14, 15, 16]">
@Component({
  selector: 'custom-expando',
  /*...*/
})
export class CustomExpando {
  toggle = contentChildren(CustomToggle); // none found
  // toggle = contentChild(CustomToggle); // found
}

@Component({
  selector: 'user-profile',
  template: `
    <custom-expando>
      <some-other-component>
        <custom-toggle>Show</custom-toggle>
      </some-other-component>
    </custom-expando>
  `
})
export class UserProfile { }
</docs-code>

In the example above, `CustomExpando` cannot find `<custom-toggle>` with `contentChildren` because it is not a direct child of `<custom-expando>`. By setting `descendants: true`, you configure the query to traverse all descendants in the same template. Queries, however, _never_ pierce into components to traverse elements in other templates.

View queries do not have this option because they _always_ traverse into descendants.
-->
기본적으로 `contentChildren` 쿼리 함수는 컴포넌트의 _바로 한 단계_ 자식 컴포넌트를 탐색하며 더 하위 자식은 탐색하지 않습니다.
반면에 `contentChild` 쿼리 함수는 자식 엘리먼트를 탐색합니다. 

<docs-code language="angular-ts" highlight="[13, 14, 15, 16]">
@Component({
  selector: 'custom-expando',
  /*...*/
})
export class CustomExpando {
  toggle = contentChildren(CustomToggle); // 찾을 수 없음
  // toggle = contentChild(CustomToggle); // 찾음
}

@Component({
  selector: 'user-profile',
  template: `
    <custom-expando>
      <some-other-component>
        <custom-toggle>Show</custom-toggle>
      </some-other-component>
    </custom-expando>
  `
})
export class UserProfile { }
</docs-code>

위 예제 코드에서 `<custom-toggle>` 컴포넌트는 `CustomExpando`의 직접적인 자식 컴포넌트가 아니기 때문에 `<custom-toggle>`를 탐색할 수 없습니다.
이 경우 `descendants: true` 옵션을 지정하면 쿼리 함수가 자식 컴포넌트를 모두 탐색합니다.
하지만 이런 경우에도 컴포넌트를 벗어나는 영역은 _절대_ 탐색할 수 없습니다.

뷰 쿼리는 _항상_ 자식 컴포넌트를 참조하기 땜누에 이 옵션을 사용하지 않습니다.


<!--
## Decorator-based queries
-->
## 데코레이터 기반 쿼리 함수

<!--
TIP: While the Angular team recommends using the signal-based query function for new projects, the
original decorator-based query APIs remain fully supported.

You can alternatively declare queries by adding the corresponding decorator to a property. Decorator-based queries behave the same way as signal-based queries except as described below.
-->
팁: 기존에 사용하던 데코레이터 기반 쿼리 API도 온전히 잘 작동하지만, 시그널 기반 쿼리 함수 사용을 권장합니다.

쿼리 함수는 데코레이터 프로퍼티로 사용할 수도 있습니다.
데코레이터 기반 쿼리 함수는 시그널 기반 쿼리 함수와 동일하게 동작합니다.


<!--
### View queries
-->
### 뷰 쿼리

<!--
You can query for a single result with the `@ViewChild` decorator.

<docs-code language="angular-ts" highlight="[14, 16, 17, 18]">
@Component({
  selector: 'custom-card-header',
  /*...*/
})
export class CustomCardHeader {
  text: string;
}

@Component({
  selector: 'custom-card',
  template: '<custom-card-header>Visit sunny California!</custom-card-header>',
})
export class CustomCard {
  @ViewChild(CustomCardHeader) header: CustomCardHeader;

  ngAfterViewInit() {
    console.log(this.header.text);
  }
}
</docs-code>

In this example, the `CustomCard` component queries for a child `CustomCardHeader` and accesses the result in `ngAfterViewInit`.

Angular keeps the result of `@ViewChild` up to date as your application state changes.

**View query results become available in the `ngAfterViewInit` lifecycle method**. Before this point, the value is `undefined`. See the [Lifecycle](guide/components/lifecycle) section for details on the component lifecycle.

You can also query for multiple results with the `@ViewChildren` decorator.

<docs-code language="angular-ts" highlight="[17, 19, 20, 21, 22, 23]">
@Component({
  selector: 'custom-card-action',
  /*...*/
})
export class CustomCardAction {
  text: string;
}

@Component({
  selector: 'custom-card',
  template: `
    <custom-card-action>Save</custom-card-action>
    <custom-card-action>Cancel</custom-card-action>
  `,
})
export class CustomCard {
  @ViewChildren(CustomCardAction) actions: QueryList<CustomCardAction>;

  ngAfterViewInit() {
    this.actions.forEach(action => {
      console.log(action.text);
    });
  }
}
</docs-code>

`@ViewChildren` creates a `QueryList` object that contains the query results. You can subscribe to changes to the query results over time via the `changes` property.
-->
대상을 하나만 참조하려면 `@ViewChild` 데코레이터를 사용합니다.

<docs-code language="angular-ts" highlight="[14, 16, 17, 18]">
@Component({
  selector: 'custom-card-header',
  /*...*/
})
export class CustomCardHeader {
  text: string;
}

@Component({
  selector: 'custom-card',
  template: '<custom-card-header>Visit sunny California!</custom-card-header>',
})
export class CustomCard {
  @ViewChild(CustomCardHeader) header: CustomCardHeader;

  ngAfterViewInit() {
    console.log(this.header.text);
  }
}
</docs-code>

위 코드는 `CustomCard` 컴포넌트가 자식 컴포넌트 `CustomCardHeader`를 탐색하며, 탐색 결과는 `ngAfterViewInit`에서 접근하는 코드입니다.

그리고 애플리케이션 상태가 변경되면 `@ViewChild` 탐색 결과는 최신 상태로 갱신됩니다.

**뷰 쿼리는 `ngAfterViewInit` 라이프싸이클 메서드 시점부터 결과값을 참조할 수 있습니다.**
이 메서드가 실행되기 전 시점에는 `undefined` 값을 갖습니다.
컴포넌트 라이프싸이클에 대해 알아보려면 [라이프싸이클 후킹 함수](guide/components/lifecycle) 문서를 참고하세요.

자식 컴포넌트를 여러개 탐색하려면 `@ViewChildren` 데코레이터를 사용하면 됩니다.

<docs-code language="angular-ts" highlight="[17, 19, 20, 21, 22, 23]">
@Component({
  selector: 'custom-card-action',
  /*...*/
})
export class CustomCardAction {
  text: string;
}

@Component({
  selector: 'custom-card',
  template: `
    <custom-card-action>Save</custom-card-action>
    <custom-card-action>Cancel</custom-card-action>
  `,
})
export class CustomCard {
  @ViewChildren(CustomCardAction) actions: QueryList<CustomCardAction>;

  ngAfterViewInit() {
    this.actions.forEach(action => {
      console.log(action.text);
    });
  }
}
</docs-code>

`@ViewChildren` 을 사용하면 `QueryList` 타입을 반환합니다.
그리고 애플리케이션 상태가 변경되는 것에 따라 쿼리 결과가 달라지는 것을 확인하려면 `changes` 프로퍼티를 구독하면 됩니다.


<!--
### Content queries
-->
### 컨텐츠 쿼리

<!--
You can query for a single result with the `@ContentChild` decorator.

<docs-code language="angular-ts" highlight="[14, 16, 17, 18, 25]">
@Component({
  selector: 'custom-toggle',
  /*...*/
})
export class CustomToggle {
  text: string;
}

@Component({
  selector: 'custom-expando',
  /*...*/
})
export class CustomExpando {
  @ContentChild(CustomToggle) toggle: CustomToggle;

  ngAfterContentInit() {
    console.log(this.toggle.text);
  }
}

@Component({
  selector: 'user-profile',
  template: `
    <custom-expando>
      <custom-toggle>Show</custom-toggle>
    </custom-expando>
  `
})
export class UserProfile { }
</docs-code>

In this example, the `CustomExpando` component queries for a child `CustomToggle` and accesses the result in `ngAfterContentInit`.

Angular keeps the result of `@ContentChild` up to date as your application state changes.

**Content query results become available in the `ngAfterContentInit` lifecycle method**. Before this point, the value is `undefined`. See the [Lifecycle](guide/components/lifecycle) section for details on the component lifecycle.

You can also query for multiple results with the `@ContentChildren` decorator.

<docs-code language="angular-ts" highlight="[14, 16, 17, 18, 19, 20]">
@Component({
  selector: 'custom-menu-item',
  /*...*/
})
export class CustomMenuItem {
  text: string;
}

@Component({
  selector: 'custom-menu',
  /*...*/
})
export class CustomMenu {
  @ContentChildren(CustomMenuItem) items: QueryList<CustomMenuItem>;

  ngAfterContentInit() {
    this.items.forEach(item => {
      console.log(item.text);
    });
  }
}

@Component({
  selector: 'user-profile',
  template: `
    <custom-menu>
      <custom-menu-item>Cheese</custom-menu-item>
      <custom-menu-item>Tomato</custom-menu-item>
    </custom-menu>
  `
})
export class UserProfile { }
</docs-code>

`@ContentChildren` creates a `QueryList` object that contains the query results. You can subscribe to changes to the query results over time via the `changes` property.
-->
대상을 하나만 참조하려면 `@ContentChild` 데코레이터를 사용합니다.

<docs-code language="angular-ts" highlight="[14, 16, 17, 18, 25]">
@Component({
  selector: 'custom-toggle',
  /*...*/
})
export class CustomToggle {
  text: string;
}

@Component({
  selector: 'custom-expando',
  /*...*/
})
export class CustomExpando {
  @ContentChild(CustomToggle) toggle: CustomToggle;

  ngAfterContentInit() {
    console.log(this.toggle.text);
  }
}

@Component({
  selector: 'user-profile',
  template: `
    <custom-expando>
      <custom-toggle>Show</custom-toggle>
    </custom-expando>
  `
})
export class UserProfile { }
</docs-code>

위 코드는 `CustomExpando` 컴포넌트가 자식 컴포넌트 `CustomToggle`을 탐색하며, 탐색 결과는 `ngAfterContentInit`에서 접근하는 코드입니다.

그리고 애플리케이션 상태가 변경되면 `@ContentChild` 탐색 결과는 최신 상태로 갱신됩니다.

**컨텐츠 쿼리는 `ngAfterContentInit` 라이프싸이클 메서드 시점부터 결과값을 참조할 수 있습니다.**
이 메서드가 실행되기 전 시점에는 `undefined` 값을 갖습니다.
컴포넌트 라이프싸이클에 대해 알아보려면 [라이프싸이클 후킹 함수](guide/components/lifecycle) 문서를 참고하세요.

자식 컴포넌트를 여러개 탐색하려면 `@ContentChildren` 데코레이터를 사용하면 됩니다.

<docs-code language="angular-ts" highlight="[14, 16, 17, 18, 19, 20]">
@Component({
  selector: 'custom-menu-item',
  /*...*/
})
export class CustomMenuItem {
  text: string;
}

@Component({
  selector: 'custom-menu',
  /*...*/
})
export class CustomMenu {
  @ContentChildren(CustomMenuItem) items: QueryList<CustomMenuItem>;

  ngAfterContentInit() {
    this.items.forEach(item => {
      console.log(item.text);
    });
  }
}

@Component({
  selector: 'user-profile',
  template: `
    <custom-menu>
      <custom-menu-item>Cheese</custom-menu-item>
      <custom-menu-item>Tomato</custom-menu-item>
    </custom-menu>
  `
})
export class UserProfile { }
</docs-code>

`@ContentChildren` 을 사용하면 `QueryList` 타입을 반환합니다.
그리고 애플리케이션 상태가 변경되는 것에 따라 쿼리 결과가 달라지는 것을 확인하려면 `changes` 프로퍼티를 구독하면 됩니다.


<!--
### Decorator-based query options
-->
### 데코레이터 기반 쿼리 옵션

<!--
All query decorators accept an options object as a second parameter. These options work the same way as signal-based queries except where described below.
-->
쿼리 데코레이터는 두번째 인자로 옵션 객체를 받을 수 있습니다.
이 옵션 객체는 시그널 기반 쿼리 함수와 동일하게 동작합니다.


<!--
### Static queries
-->
### 정적 쿼리

<!--
`@ViewChild` and `@ContentChild` decorators accept the `static` option.

```angular-ts
@Component({
  selector: 'custom-card',
  template: '<custom-card-header>Visit sunny California!</custom-card-header>',
})
export class CustomCard {
  @ViewChild(CustomCardHeader, {static: true}) header: CustomCardHeader;

  ngOnInit() {
    console.log(this.header.text);
  }
}
```

By setting `static: true`, you guarantee to Angular that the target of this query is _always_ present and is not conditionally rendered. This makes the result available earlier, in the `ngOnInit` lifecycle method.

Static query results do not update after initialization.

The `static` option is not available for `@ViewChildren` and `@ContentChildren` queries.
-->
`@ViewChild`와 `ContentChild` 데코레이터에 `static` 옵션을 지정할 수 있습니다.

```angular-ts
@Component({
  selector: 'custom-card',
  template: '<custom-card-header>Visit sunny California!</custom-card-header>',
})
export class CustomCard {
  @ViewChild(CustomCardHeader, {static: true}) header: CustomCardHeader;

  ngOnInit() {
    console.log(this.header.text);
  }
}
```

`static: true` 옵션을 지정하면 찾으려는 대상 컴포넌트가 _언제나_ 존재하며 렌더링 조건에 영향을 받지 않는다는 것을 의미합니다.
그래서 탐색 결과를 빠른 시점부터 참조할 수 있으며, `ngOnInit` 라이프싸이클 메서드에서 활용할 수도 있씁니다.

정적 쿼리 결과는 처음 초기화된 후에 변경되지 않습니다.

`static` 옵션은 `@ViewChildren` 쿼리 함수나 `@ContentChildren` 쿼리 함수에는 사용할 수 없습니다.


<!--
### Using QueryList
-->
### QueryList 활용하기

<!--
`@ViewChildren` and `@ContentChildren` both provide a `QueryList` object that contains a list of results.

`QueryList` offers a number of convenience APIs for working with results in an array-like manner, such as `map`, `reduce`, and `forEach`. You can get an array of the current results by calling `toArray`.

You can subscribe to the `changes` property to do something any time the results change.
-->
`@ViewChildren`과 `@ContentChildren`은 모두 탐색 결과를 `QueryList` 타입으로 반환합니다.

`QueryList`는 배열과 비슷하게 `map`이나 `reduce`, `forEach`와 같은 API를 제공하며, `toArray` 메서드를 활용하면 일반적인 배열 형태로 결과물을 참조할 수 있습니다.

그리고 `changes` 프로퍼티를 구독하면 탐색 결과가 변경되는 것을 추적할 수도 있습니다.


<!--
## Common query pitfalls
-->
## 쿼리를 잘못 사용하는 경우

<!--
When using queries, common pitfalls can make your code harder to understand and maintain.

Always maintain a single source of truth for state shared between multiple components. This avoids scenarios where repeated state in different components becomes out of sync.

Avoid directly writing state to child components. This pattern can lead to brittle code that is hard to understand and is prone to [ExpressionChangedAfterItHasBeenChecked](errors/NG0100) errors.

Never directly write state to parent or ancestor components. This pattern can lead to brittle code that is hard to understand and is prone to [ExpressionChangedAfterItHasBeenChecked](errors/NG0100) errors.
-->
쿼리를 사용할 때 혼동하는 경우에는 코드를 복잡하고 유지보수하기 어렵게 만들 수 있습니다.

여러 컴포넌트에 사용되는 소스가 있다면 항상 단일한 소스로 유지하세요.
컴포넌트끼리 동기화되지 않아 발생하는 문제를 예방하는 방법입니다.

자식 컴포넌트의 상태값을 직접 설정하지 마세요.
이런 방식은 이해하기 어렵고 [ExpressionChangedAfterItHasBeenChecked](errors/NG0100) 에러를 유발할 수 있습니다.

부모 컴포넌트나 더 위쪽 컴포넌트의 상태값을 직접 설정하지 마세요.
이런 방식은 이해하기 어렵고 [ExpressionChangedAfterItHasBeenChecked](errors/NG0100) 에러를 유발할 수 있습니다.
