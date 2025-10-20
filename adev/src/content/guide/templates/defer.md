<!--
# Deferred loading with `@defer`
-->
# 뷰 지연 로딩: `@defer`

<!--
Deferrable views, also known as `@defer` blocks, reduce the initial bundle size of your application by deferring the loading of code that is not strictly necessary for the initial rendering of a page. This often results in a faster initial load and improvement in Core Web Vitals (CWV), primarily Largest Contentful Paint (LCP) and Time to First Byte (TTFB).

To use this feature, you can declaratively wrap a section of your template in a @defer block:

```angular-html
@defer {
  <large-component />
}
```

The code for any components, directives, and pipes inside the `@defer` block is split into a separate JavaScript file and loaded only when necessary, after the rest of the template has been rendered.

Deferrable views support a variety of triggers, prefetching options, and sub-blocks for placeholder, loading, and error state management.
-->
`@defer` 블록은 지연 로딩 뷰를 선언하는 블록입니다.
애플리케이션 초기 렌더링에 꼭 필요하지 않은 코드를 나중에 불러오는 방식으로 애플리케이션 첫 실행에 필요한 파일의 크기를 줄일 수 있습니다.
뷰를 지연 로딩 하면 Core Web Vitals(CWV)나 Largest Contentful Paint(LCP), Time to First Byte(TTFB)가 향상되는 경우가 많습니다.

뷰를 지연 로딩하려면 템플릿을 `@defer` 블록으로 감싸면 됩니다:

```angular-html
@defer {
  <large-component />
}
```

`@defer` 블록 안에 있는 컴포넌트나 디렉티브, 파이프는 별도 JavaScript 파일로 분리되며, 나머지 템플릿이 렌더링 된 후 이 구성요소가 필요한 경우에 로드됩니다.

지연 로딩 뷰를 지정하면서 다양한 트리거, 사전 로딩 옵션, 플레이스 홀더, 로딩, 에러 상태 관리 등의 기능을 활용할 수 있습니다.


<!--
## Which dependencies are deferred?
-->
## 어떤 항목을 지연 로딩 할 수 있나요?

<!--
Components, directives, pipes, and any component CSS styles can be deferred when loading an application.

In order for the dependencies within a `@defer` block to be deferred, they need to meet two conditions:

1. **They must be standalone.** Non-standalone dependencies cannot be deferred and are still eagerly loaded, even if they are inside of `@defer` blocks.
1. **They cannot be referenced outside of `@defer` blocks within the same file.** If they are referenced outside the `@defer` block or referenced within ViewChild queries, the dependencies will be eagerly loaded.

The _transitive_ dependencies of the components, directives and pipes used in the `@defer` block do not strictly need to be standalone; transitive dependencies can still be declared in an `NgModule` and participate in deferred loading.

Angular's compiler produces a [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) statement for each component, directive, and pipe used in the `@defer` block. The main content of the block renders after all the imports resolve. Angular does not guarantee any particular order for these imports.
-->
컴포넌트, 디렉티브, 파이프, 컴포넌트 CSS 스타일은 애플리케이션 최초 실행에서 제외하여 지연 로딩 할 수 있습니다.

`@defer` 블록 안에 있는 구성요소를 정말 지연 로딩하려면, 다음 조건을 만족해야 합니다:

1. **독립(standalone) 구성요소여야 합니다.** 그렇지 않으면 `@defer` 블록 안에 있더라도 로딩이 지연되지 않고 즉시 로드 됩니다.
1. **같은 파일의 `@defer` 블록 밖에서 사용되지 않아야 합니다.** `@defer` 블록 밖에서도 사용되거나 ViewChild 쿼리 등으로 참조되면 해당 항목은 즉시 로드됩니다.

`@defer` 블록 안에 사용된 컴포넌트, 디렉티브, 파이프의 내부 의존성 구성요소는 독립 구성요소가 아니어도 됩니다;
이 항목들은 `NgModule`에 등록해서 모듈 단위로 지연 로딩 할 수 있습니다.

Angular 컴파일러는 `@defer` 블록에 사용된 개별 컴포넌트, 디렉티브, 파이프마다 [동적 불러오기(dynamic import)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)를 적용합니다.
그래서 이 블록의 내용은 모든 로딩이 끝난 후에 렌더링됩니다.
로딩 순서는 보장하지 않습니다.


<!--
## How to manage different stages of deferred loading
-->
## 지연 로딩 단계 관리하기

<!--
`@defer` blocks have several sub blocks to allow you to gracefully handle different stages in the deferred loading process.
-->
`@defer` 블록은 지연 로딩 과정을 세분화하는 하위 블록으로 구성할 수 있습니다.


### `@defer`

<!--
This is the primary block that defines the section of content that is lazily loaded. It is not rendered initially– deferred content loads and renders once the specified [trigger](/guide/defer#triggers) occurs or the `when` condition is met.

By default, a @defer block is triggered when the browser state becomes [idle](/guide/defer#idle).

```angular-html
@defer {
  <large-component />
}
```
-->
지연 로딩 뷰를 정의하는 기본 블록입니다.
지연 로딩되는 뷰는 화면의 첫 렌더링에 포함되지 않고, [트리거(trigger)](/guide/defer#triggers)가 동작하거나 `when` 조건이 맞을 때만 로딩되어 렌더링됩니다.

기본적으로 `@defer` 블록은 브라우저가 [대기(idle)] (/guide/defer#idle) 상태가 되었을 때 트리거됩니다.

```angular-html
@defer {
  <large-component />
}
```


<!--
### Show placeholder content with `@placeholder`
-->
### 렌더링 위치 지정하기: `@placeholder`

<!--
By default, defer blocks do not render any content before they are triggered.

The `@placeholder` is an optional block that declares what content to show before the `@defer` block is triggered.

```angular-html
@defer {
  <large-component />
} @placeholder {
  <p>Placeholder content</p>
}
```

While optional, certain triggers may require the presence of either a `@placeholder` or a [template reference variable](/guide/templates/variables#template-reference-variables) to function. See the [Triggers](/guide/defer#triggers) section for more details.

Angular replaces placeholder content with the main content once loading is complete. You can use any content in the placeholder section including plain HTML, components, directives, and pipes. Keep in mind the _dependencies of the placeholder block are eagerly loaded_.

The `@placeholder` block accepts an optional parameter to specify the `minimum` amount of time that this placeholder should be shown after the placeholder content initially renders.

```angular-html
@defer {
  <large-component />
} @placeholder (minimum 500ms) {
  <p>Placeholder content</p>
}
```

This `minimum` parameter is specified in time increments of milliseconds (ms) or seconds (s). You can use this parameter to prevent fast flickering of placeholder content in the case that the deferred dependencies are fetched quickly.
-->
기본적으로 `@defer` 블록은 트리거가 동작하기 전까지 아무것도 렌더링되지 않습니다.

이 때 `@defer` 블록이 표시되기 전에 화면에 표시할 내용이 있다면, `@placeholder` 블록을 지정하면 됩니다.

```angular-html
@defer {
  <large-component />
} @placeholder {
  <p>Placeholder content</p>
}
```

`@placeholder` 블록이 필수인 것은 아니지만, 어떤 트리거는 `@placeholder`나 [템플릿 참조 변수](/guide/templates/variables#template-reference-variables)가 필요합니다.
자세한 내용은 [트리거](/guide/defer#triggers) 섹션을 참고하세요.

`@defer` 블록은 로딩된 후에 `@placeholder` 블록을 대체하며 렌더링됩니다.
그리고 `@placeholder` 블록에는 일반 HTML, 컴포넌트, 디렉티브, 파이프를 자유롭게 사용할 수 있습니다.
`@placeholder` 블록에 사용되는 컴포넌트, 디렉티브, 파이프는 지연 로딩되지 않고 _즉시 로딩 된다는 것을_ 기억하세요.

`@placeholder` 블록을 사용할 때 `minimum` 옵션을 사용할 수 있습니다.
이 옵션은 `@placeholder` 블록이 처음 렌더링 된 후, 표시되는 최소 시간을 지정하는 옵션입니다.

```angular-html
@defer {
  <large-component />
} @placeholder (minimum 500ms) {
  <p>Placeholder content</p>
}
```

`minimum` 변수에는 밀리초(ms) 단위나 초(s) 단위 시간을 지정합니다.
이 옵션은 지연 로딩되는 뷰가 너무 빨리 로딩되는 경우에 화면이 깜빡이는 것을 방지하는 용도로 사용합니다.


<!--
### Show loading content with `@loading`
-->
### 로딩 표시하기: `@loading`

<!--
The `@loading` block is an optional block that allows you to declare content that is shown while deferred dependencies are loading. It replaces the `@placeholder` block once loading is triggered.

```angular-html
@defer {
  <large-component />
} @loading {
  <img alt="loading..." src="loading.gif" />
} @placeholder {
  <p>Placeholder content</p>
}
```

Its dependencies are eagerly loaded (similar to `@placeholder`).

The `@loading` block accepts two optional parameters to help prevent fast flickering of content that may occur when deferred dependencies are fetched quickly,:

- `minimum` - the minimum amount of time that this placeholder should be shown
- `after` - the amount of time to wait after loading begins before showing the loading template

```angular-html
@defer {
  <large-component />
} @loading (after 100ms; minimum 1s) {
  <img alt="loading..." src="loading.gif" />
}
```

Both parameters are specified in time increments of milliseconds (ms) or seconds (s). In addition, the timers for both parameters begin immediately after the loading has been triggered.
-->
지연 로딩되는 뷰가 로딩중일때 표시할 내용이 있다면 `@loading` 블록을 사용합니다.
`@loading` 블록은 트리거가 동작하고 나면 `@placeholder` 블록 대신 화면에 표시됩니다.

```angular-html
@defer {
  <large-component />
} @loading {
  <img alt="loading..." src="loading.gif" />
} @placeholder {
  <p>Placeholder content</p>
}
```

`@loading` 블록에 사용되는 컴포넌트, 디렉티브, 파이프도 `@Placeholder` 블록과 비슷하게 즉시 로딩됩니다.

`@loading` 블록은 지연 로딩하는 뷰가 너무 빨리 로딩되어 화면이 깜빡이는 것을 방지하기 위해 옵션을 2개 받을 수 있습니다:

- `minimum` - `@placeholder` 블록이 표시될 최소 시간
- `after` - `@loading` 블록이 로딩되고 표시되기 전까지 대기할 시간

```angular-html
@defer {
  <large-component />
} @loading (after 100ms; minimum 1s) {
  <img alt="loading..." src="loading.gif" />
}
```

두 옵션 모두 밀리초(ms)나 초(s) 단위를 지정합니다.
이 타이머는 로딩 트리거가 동작한 직후부터 시작됩니다.


<!--
### Show error state when deferred loading fails with `@error`
-->
### 지연 로딩 에러 표시하기: `@error`

<!--
The `@error` block is an optional block that displays if deferred loading fails. Similar to `@placeholder` and `@loading`, the dependencies of the @error block are eagerly loaded.

```angular-html
@defer {
  <large-component />
} @error {
  <p>Failed to load large component.</p>
}
```
-->
뷰 지연 로딩에서 발생하는 오류를 표시하려면 `@error` 블록을 사용합니다.
`@error` 블록 안에 사용되는 구성요소는 `@placeholder`, `@loading` 블록과 비슷하게 즉시 로딩됩니다.

```angular-html
@defer {
  <large-component />
} @error {
  <p>Failed to load large component.</p>
}
```


<!--
## Controlling deferred content loading with triggers
-->
## 트리거로 지연 로딩 제어하기

<!--
You can specify **triggers** that control when Angular loads and displays deferred content.

When a `@defer` block is triggered, it replaces placeholder content with lazily loaded content.

Multiple event triggers can be defined by separating them with a semicolon, `;` and will be evaluated as OR conditions.

There are two types of triggers: `on` and `when`.
-->
뷰 지연 로딩을 제어하려면 **트리거(triggers)** 를 사용하면 됩니다.

`@defer` 블록은 트리거가 동작하고 난 후 지연 로딩되면서 `@placeholder` 블록을 대체하면서 렌더링됩니다.

이 때 세미 콜론(`;`)을 사용해서 이벤트 트리거를 여러개 지정할 수 있으며, 이렇게 지정된 트리거는 OR 조건으로 동작합니다.

트리거는 크게 `on`과 `when` 으로 구분할 수 있습니다.


### `on`

<!--
`on` specifies a condition for when the `@defer` block is triggered.

The available triggers are as follows:

| Trigger                       | Description                                                            |
| ----------------------------- | ---------------------------------------------------------------------- |
| [`idle`](#idle)               | Triggers when the browser is idle.                                     |
| [`viewport`](#viewport)       | Triggers when specified content enters the viewport                    |
| [`interaction`](#interaction) | Triggers when the user interacts with specified element                |
| [`hover`](#hover)             | Triggers when the mouse hovers over specified area                     |
| [`immediate`](#immediate)     | Triggers immediately after non-deferred content has finished rendering |
| [`timer`](#timer)             | Triggers after a specific duration                                     |
-->
`on` 은 `@defer` 블록 트리거가 동작하는 조건을 지정합니다.

이런 트리거를 사용할 수 있습니다:

| 트리거                       | 설명                                                            |
| ----------------------------- | ---------------------------------------------------------------------- |
| [`idle`](#idle)               | 브라우저가 대기 상태일 때 동작합니다. |
| [`viewport`](#viewport)       | 특정 항목이 뷰포트에 진입할 때 동작합니다. |
| [`interaction`](#interaction) | 사용자가 특정 엘리먼트와 상호작용 할 때 동작합니다. |
| [`hover`](#hover)             | 마우스가 특정 영역 위에 올라갈 때 동작합니다. |
| [`immediate`](#immediate)     | 지연 로딩이 아닌 뷰 렌더링이 끝난 직후 동작합니다. |
| [`timer`](#timer)             | 특정 시간 뒤에 동작합니다. |


#### `idle`

<!--
The `idle` trigger loads the deferred content once the browser has reached an idle state, based on requestIdleCallback. This is the default behavior with a defer block.
-->
`idle` 트리거는 브라우저가 대기 상태로 진입할 때 동작해서 지연 로딩 뷰를 로드합니다.
이 트리거가 기본값입니다.

```angular-html
<!-- @defer (on idle) -->
@defer {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

#### `viewport`

<!--
The `viewport` trigger loads the deferred content when the specified content enters the viewport using the [Intersection Observer API](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API). Observed content may be `@placeholder` content or an explicit element reference.

By default, the `@defer` watches for the placeholder entering the viewport. Placeholders used this way must have a single root element.

```angular-html
@defer (on viewport) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

Alternatively, you can specify a [template reference variable](/guide/templates/variables) in the same template as the `@defer` block as the element that is watched to enter the viewport. This variable is passed in as a parameter on the viewport trigger.

```angular-html
<div #greeting>Hello!</div>
@defer (on viewport(greeting)) {
  <greetings-cmp />
}
```
-->
`viewport` 트리거는 [Intersection Observer API](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API)를 활용해서 특정 항목이 뷰포트에 진입할 때 동작합니다.
이 때 특정 항목은 `@placeholder` 항목이거나 명시적으로 지정한 엘리먼트가 됩니다.

기본적으로 `@defer` 블록은 `@placeholder` 가 뷰포트에 진입하는 것을 감지합니다.
이 경우 `@placeholder` 는 반드시 엘리먼트 하나여야 합니다.

```angular-html
@defer (on viewport) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

아니면 대상 엘리먼트에 [템플릿 참조 변수](/guide/templates/variables)를 지정한 후에 뷰포트 트리거로 전달하면 됩니다.

```angular-html
<div #greeting>Hello!</div>
@defer (on viewport(greeting)) {
  <greetings-cmp />
}
```

#### `interaction`

<!--
The `interaction` trigger loads the deferred content when the user interacts with the specified element through `click` or `keydown` events.

By default, the placeholder acts as the interaction element. Placeholders used this way must have a single root element.

```angular-html
@defer (on interaction) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

Alternatively, you can specify a [template reference variable](/guide/templates/variables) in the same template as the `@defer` block as the element that is watched for interactions. This variable is passed in as a parameter on the viewport trigger.

```angular-html
<div #greeting>Hello!</div>
@defer (on interaction(greeting)) {
  <greetings-cmp />
}
```
-->
`interaction` 트리거는 사용자가 특정 엘리먼트와 `click` 이벤트나 `keydown` 이벤트로 상호작용할 때 동작합니다.

기본적으로 `@placeholder`는 상호작용하는 엘리먼트로 간주됩니다.
이 경우 `@placeholder`는 엘리먼트 하나여야 합니다.

```angular-html
@defer (on interaction) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

아니면 대상 엘리먼트에 [템플릿 참조 변수](/guide/templates/variables)를 지정한 후에 상호작용 트리거로 전달하면 됩니다.

```angular-html
<div #greeting>Hello!</div>
@defer (on interaction(greeting)) {
  <greetings-cmp />
}
```


#### `hover`

<!--
The `hover` trigger loads the deferred content when the mouse has hovered over the triggered area through the `mouseover` and `focusin` events.

By default, the placeholder acts as the interaction element. Placeholders used this way must have a single root element.

```angular-html
@defer (on hover) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

Alternatively, you can specify a [template reference variable](/guide/templates/variables) in the same template as the `@defer` block as the element that is watched to enter the viewport. This variable is passed in as a parameter on the viewport trigger.

```angular-html
<div #greeting>Hello!</div>
@defer (on hover(greeting)) {
  <greetings-cmp />
}
```
-->
`hover` 트리거는 마우스가 어떤 영역으로 이동해서 `mouseover` 이벤트나 `focusin` 이벤트가 발생했을 때 동작합니다.

기본적으로 `@placeholder`는 상호작용하는 엘리먼트로 간주됩니다.
이 경우 `@placeholder`는 엘리먼트 하나여야 합니다.

```angular-html
@defer (on hover) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

아니면 대상 엘리먼트에 [템플릿 참조 변수](/guide/templates/variables)를 지정한 후에 트리거로 전달하면 됩니다.

```angular-html
<div #greeting>Hello!</div>
@defer (on hover(greeting)) {
  <greetings-cmp />
}
```


#### `immediate`

<!--
The `immediate` trigger loads the deferred content immediately. This means that the deferred block loads as soon as all other non-deferred content has finished rendering.

```angular-html
@defer (on immediate) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```
-->
`immediate` 트리거는 지연 로딩 뷰를 즉시 로드합니다.
다르게 표현하면, 지연 로딩이 아닌 부분의 렌더링이 끝난 직후, 지연 로딩 하도록 지정된 나머지 뷰를 로드합니다.

```angular-html
@defer (on immediate) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```


#### `timer`

<!--
The `timer` trigger loads the deferred content after a specified duration.

```angular-html
@defer (on timer(500ms)) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

The duration parameter must be specified in milliseconds (`ms`) or seconds (`s`).
-->
`timer` 트리거는 특정 시간이 지난 후에 동작합니다.

```angular-html
@defer (on timer(500ms)) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

이 때 지연시간은 밀리초(`ms`) 단위나 초(`s`) 단위를 사용합니다.


### `when`

<!--
The `when` trigger accepts a custom conditional expression and loads the deferred content when the condition becomes truthy.

```angular-html
@defer (when condition) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

This is a one-time operation– the `@defer` block does not revert back to the placeholder if the condition changes to a falsy value after becoming truthy.
-->
`when` 트리거는 조건 표현식을 인자로 받으며 이 조건이 참으로 평가될 때 뷰를 로딩합니다.

```angular-html
@defer (when condition) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```

조건식은 한 번만 평가됩니다.
조건이 참이었다가 거짓으로 평가되더라도 `@placeholder` 블록이 다시 표시되거나 하지는 않습니다.


<!--
## Prefetching data with `prefetch`
-->
## 사전 로딩하기: `prefetch`

<!--
In addition to specifying a condition that determines when deferred content is shown, you can optionally specify a **prefetch trigger**. This trigger lets you load the JavaScript associated with the `@defer` block before the deferred content is shown.

Prefetching enables more advanced behaviors, such as letting you start to prefetch resources before a user has actually seen or interacted with a defer block, but might interact with it soon, making the resources available faster.

You can specify a prefetch trigger similarly to the block's main trigger, but prefixed with the `prefetch` keyword. The block's main trigger and prefetch trigger are separated with a semi-colon character (`;`).

In the example below, the prefetching starts when a browser becomes idle and the contents of the block is rendered only once the user interacts with the placeholder.

```angular-html
@defer (on interaction; prefetch on idle) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```
-->
내용을 로딩하는 조건문을 지정하면서 **사전 로딩 트리거(prefetch trigger)** 를 옵션으로 지정할 수 있습니다.
이 트리거를 사용하면 지연 로딩하는 내용을 표시하기 전에 `@defer` 블록과 연결된 JavaScript를 로드할 수 있습니다.

사전 로딩을 활용하면 사용자가 지연 로딩 뷰를 실제로 보기 전이나 특정 블록과 상호작용하기 전에 리소스를 빠르게 로딩해 둘 수 있습니다.

사전 로딩 트리거는 블록 트리거와 비슷하지만, `prefetch` 키워드가 접두사로 붙습니다.
블록 트리거와 사전 로딩 트리거를 함꼐 사용하는 경우에는 세미 콜론(`;`)으로 구분합니다.

아래 예제처럼 구현하면, 브라우저가 대기 상태로 진입하는 시점에 사전 로딩이 시작되며, `@defer` 블록의 내용은 사용자가 `@placeholder` 블록과 상호작용 할 때 렌더링됩니다.

```angular-html
@defer (on interaction; prefetch on idle) {
  <large-cmp />
} @placeholder {
  <div>Large component placeholder</div>
}
```


<!--
## Testing `@defer` blocks
-->
## `@defer` 블록 테스트하기

<!--
Angular provides TestBed APIs to simplify the process of testing `@defer` blocks and triggering different states during testing. By default, `@defer` blocks in tests play through like a defer block would behave in a real application. If you want to manually step through states, you can switch the defer block behavior to `Manual` in the TestBed configuration.

```angular-ts
it('should render a defer block in different states', async () => {
  // configures the defer block behavior to start in "paused" state for manual control.
  TestBed.configureTestingModule({deferBlockBehavior: DeferBlockBehavior.Manual});
  @Component({
    // ...
    template: `
      @defer {
        <large-component />
      } @placeholder {
        Placeholder
      } @loading {
        Loading...
      }
    `
  })
  class ComponentA {}
  // Create component fixture.
  const componentFixture = TestBed.createComponent(ComponentA);
  // Retrieve the list of all defer block fixtures and get the first block.
  const deferBlockFixture = (await componentFixture.getDeferBlocks())[0];
  // Renders placeholder state by default.
  expect(componentFixture.nativeElement.innerHTML).toContain('Placeholder');
  // Render loading state and verify rendered output.
  await deferBlockFixture.render(DeferBlockState.Loading);
  expect(componentFixture.nativeElement.innerHTML).toContain('Loading');
  // Render final state and verify the output.
  await deferBlockFixture.render(DeferBlockState.Complete);
  expect(componentFixture.nativeElement.innerHTML).toContain('large works!');
});
```
-->
Angular는 다양한 트리거와 함께 `@defer` 블록을 테스트할 수 있는 TestBed API를 제공합니다.
기본적으로 `@defer` 블록은 실제 애플리케이션이 동작하는 것과 동일하게 테스트 환경에서 동작합니다.
하지만 TestBed를 수동으로 설정하면 각 단계를 직접 조작할 수 있습니다.

```angular-ts
it('should render a defer block in different states', async () => {
  // defer 블록의 동작 방식을 수동으로 조작합니다. 시작 상태는 "paused" 입니다.
  TestBed.configureTestingModule({deferBlockBehavior: DeferBlockBehavior.Manual});
  @Component({
    // ...
    template: `
      @defer {
        <large-component />
      } @placeholder {
        Placeholder
      } @loading {
        Loading...
      }
    `
  })
  class ComponentA {}
  // 컴포넌트 픽스처를 생성합니다.
  const componentFixture = TestBed.createComponent(ComponentA);
  // defer 블록을 모두 참조하고 그 중 첫번째 블록을 가져옵니다.
  const deferBlockFixture = (await componentFixture.getDeferBlocks())[0];
  // placeholder 블록이 렌더링 된 것을 확인합니다.
  expect(componentFixture.nativeElement.innerHTML).toContain('Placeholder');
  // 로딩 상태로 바꾸고 loading 블록이 렌더링 된 것을 확인합니다.
  await deferBlockFixture.render(DeferBlockState.Loading);
  expect(componentFixture.nativeElement.innerHTML).toContain('Loading');
  // 최종 상태로 바꾸고 최종 렌더링을 확인합니다.
  await deferBlockFixture.render(DeferBlockState.Complete);
  expect(componentFixture.nativeElement.innerHTML).toContain('large works!');
});
```


<!--
## Does `@defer` work with `NgModule`?
-->
## `@defer`를 `NgModule`과 함께 사용할 수 있나요?

<!--
`@defer` blocks are compatible with both standalone and NgModule-based components, directives and pipes. However, **only standalone components, directives and pipes can be deferred**. NgModule-based dependencies are not deferred and are included in the eagerly loaded bundle.
-->
`@defer` 블록은 독립 구성요소는 물론이고 NgModule 기반 컴포넌트, 디렉티브, 파이프와도 함께 사용할 수 있습니다.
하지만 **실제로 지연 로딩되는 것은 독립 컴포넌트, 독립 디렉티브, 독립 파이프 뿐입니다**.
NgModule 기반으로 등록된 컴포넌트, 디렉티브, 파이프는 지연 로딩되지 않으며 즉시 로드됩니다.


<!--
## How does `@defer` work with server-side rendering (SSR) and static-site generation (SSG)?
-->
## 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG)인 경우는 `@defer`가 어떻게 동작하나요?

<!--
By default, when rendering an application on the server (either using SSR or SSG), defer blocks always render their `@placeholder` (or nothing if a placeholder is not specified) and triggers are not invoked. On the client, the content of the `@placeholder` is hydrated and triggers are activated.

To render the main content of `@defer` blocks on the server (both SSR and SSG), you can enable [the Incremental Hydration feature](/guide/incremental-hydration) and configure `hydrate` triggers for the necessary blocks.
-->
SSR이나 SSG와 같이 애플리케이션이 서버에서 렌더링되는 경우는 기본적으로 `@placeholder` 블록이 있는 경우는 `@placeholder` 블록을 렌더링하고, `@placeholder` 블록이 없으면 아무것도 렌더링하지 않습니다.
그리고 클라이언트에서 애플리케이션이 실행될 때 `@placeholder`가 하이드레이션 되면서 트리거가 동작합니다.

서버엣 ㅓ`@defer` 블록을 렌더링하려면 [증분 하이드레이션](/guide/incremental-hydration)이나 `hydrate` 트리거를 사용해야 합니다.


<!--
## Best practices for deferring views
-->
## 모범사례

<!--
### Avoid cascading loads with nested `@defer` blocks
-->
### `@defer` 블록 중첩 사용을 피하세요

<!--
When you have nested `@defer` blocks, they should have different triggers in order to avoid loading simultaneously, which causes cascading requests and may negatively impact page load performance.
-->
`@defer` 블록이 중첩되면 트리거가 각각 동작하기 때문에 컨텐츠를 동시에 로딩할 수 없습니다.
결국 화면이 로딩되는 전체 성능에 나쁜 영향을 줍니다.

<!--
### Avoid layout shifts
-->
### 레이아웃 변경을 피하세요

<!--
Avoid deferring components that are visible in the user’s viewport on initial load. Doing this may negatively affect Core Web Vitals by causing an increase in cumulative layout shift (CLS).

In the event this is necessary, avoid `immediate`, `timer`, `viewport`, and custom `when` triggers that cause the content to load during the initial page render.
-->
첫 로딩에서 사용자의 뷰포트에 있는 컴포넌트를 지연 로딩 하지 마세요.
이 경우는 누적 레이아웃 이동(cumulative layout shift, CLS)이 발생하면서 Core Web Vital에 부정적인 영향을 줍니다.

꼭 필요한 경우라면, 첫 화면 로딩을 방해할 수 있는 `immediate`, `timer`, `viewport`, 커스텀 `when` 트리거 사용을 피하세요.
