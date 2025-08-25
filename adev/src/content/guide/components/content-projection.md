<!--
# Content projection with ng-content
-->
# 컨텐츠 프로젝션: ng-content

<!--
TIP: This guide assumes you've already read the [Essentials Guide](essentials). Read that first if you're new to Angular.

You often need to create components that act as containers for different types of content. For
example, you may want to create a custom card component:

```angular-ts
@Component({
  selector: 'custom-card',
  template: '<div class="card-shadow"> <!- card content goes here -> </div>',
})
export class CustomCard {/* ... */}
```

**You can use the `<ng-content>` element as a placeholder to mark where content should go**:

```angular-ts
@Component({
  selector: 'custom-card',
  template: '<div class="card-shadow"> <ng-content></ng-content> </div>',
})
export class CustomCard {/* ... */}
```

TIP: `<ng-content>` works similarly
to [the native `<slot>` element](https://developer.mozilla.org/docs/Web/HTML/Element/slot),
but with some Angular-specific functionality.

When you use a component with `<ng-content>`, any children of the component host element are
rendered, or **projected**, at the location of that `<ng-content>`:

```angular-ts
// Component source
@Component({
  selector: 'custom-card',
  template: `
    <div class="card-shadow">
      <ng-content />
    </div>
  `,
})
export class CustomCard {/* ... */}
```

```angular-html
<!- Using the component ->
<custom-card>
  <p>This is the projected content</p>
</custom-card>
```

```angular-html
<!- The rendered DOM ->
<custom-card>
  <div class="card-shadow">
    <p>This is the projected content</p>
  </div>
</custom-card>
```

Angular refers to any children of a component passed this way as that component's **content**. This
is distinct from the component's **view**, which refers to the elements defined in the component's
template.

**The `<ng-content>` element is neither a component nor DOM element**. Instead, it is a special
placeholder that tells Angular where to render content. Angular's compiler processes
all `<ng-content>` elements at build-time. You cannot insert, remove, or modify `<ng-content>` at
run time. You cannot add directives, styles, or arbitrary attributes to `<ng-content>`.

You should not conditionally include `<ng-content>` with `@if`, `@for`, or `@switch`. Angular always
instantiates and creates DOM nodes for content rendered to a `<ng-content>` placeholder, even if
that `<ng-content>` placeholder is hidden. For conditional rendering of component content,
see [Template fragments](api/core/ng-template).
-->
팁: 이 가이드 문서는 [핵심 가이드](essentials) 이후 내용을 다룹니다. 아직 Angular에 익숙하지 않다면 해당 문서를 먼저 읽어보세요.

때로는 내용물을 다양하게 다루는 컨테이너 용도로 컴포넌트를 생성하는 경우가 있습니다.
커스텀 카드 컴포넌트 같은 경우가 그렇습니다:

```angular-ts
@Component({
  selector: 'custom-card',
  template: '<div class="card-shadow"> <!-- 카드 내용은 여기에 들어갑니다. --> </div>',
})
export class CustomCard {/* ... */}
```

**이 때 내용물이 들어갈 위치는 `<ng-content` 엘리먼트로 지정합니다**:

```angular-ts
@Component({
  selector: 'custom-card',
  template: '<div class="card-shadow"> <ng-content></ng-content> </div>',
})
export class CustomCard {/* ... */}
```

팁: `<ng-content>`는 [네이티브 `<slot>` 엘리먼트](https://developer.mozilla.org/docs/Web/HTML/Element/slot)와 비슷하게 동작하지만, Angular용 기능이 일부 추가되었습니다.

컴포넌트에 `<ng-content>`를 사용하면,  이 컴포넌트의 자식 컴포넌트나 **프로젝션(projected)** 되는 내용물은 모두 `<ng-content>` 엘리먼트 위치에 렌더링됩니다:

```angular-ts
// 컴포넌트 소스
@Component({
  selector: 'custom-card',
  template: `
    <div class="card-shadow">
      <ng-content />
    </div>
  `,
})
export class CustomCard {/* ... */}
```

```angular-html
<!-- 컴포넌트를 사용하는 경우 -->
<custom-card>
  <p>This is the projected content</p>
</custom-card>
```

```angular-html
<!-- 렌더링 된 DOM -->
<custom-card>
  <div class="card-shadow">
    <p>This is the projected content</p>
  </div>
</custom-card>
```

컴포넌트 밖에서 컴포넌트 안으로 전달되는 모든 내용을 컴포넌트의 **내용물(content)** 라고 합니다.
컴포넌트 템플릿에 존재하는 엘리먼트를 의미하는 **뷰(view)** 와는 다릅니다.

**`<ng-content>` 엘리먼트는 컴포넌트도 아니고 DOM 엘리먼트도 아닙니다.**
이 엘리먼트는 Angular에게 프로젝션되는 내용물의 위치를 지정하는 용도로만 사용되는 특별한 플레이스홀더(placeholder)입니다.
Angular 컴파일러는 `<ng-content>` 엘리먼트를 빌드 시점에 처리합니다.
`<ng-content>`는 실행 시점에 추가하거나, 제거하거나, 수정할 수 없습니다.
그리고 `<ng-content>`에 디렉티브를 적용하거나, 스타일, 어트리뷰트를 추가할 수도 없습니다.

`<ng-content>`는 `@if`나 `@for`, `@switch`로 제어할 수 없습니다.
Angular는 언제나 `<ng-content>` 플레이스홀더가 위치한 곳에 내용물을 렌더링하거나 DOM 노드를 생성하는데, `<ng-content>` 플레이스홀더가 화면에 표시되지 않는 경우도 그렇습니다.
컴포넌트 내용물을 조건부로 렌더링하려면 [템플릿 조각(Template fragments)](api/core/ng-template)을 참고하세요.


<!--
## Multiple content placeholders
-->
## 플레이스홀더 여러개 사용하기

<!--
Angular supports projecting multiple different elements into different `<ng-content>` placeholders
based on CSS selector. Expanding the card example from above, you could create two placeholders for
a card title and a card body by using the `select` attribute:

```angular-html
<!- Component template ->
<div class="card-shadow">
  <ng-content select="card-title"></ng-content>
  <div class="card-divider"></div>
  <ng-content select="card-body"></ng-content>
</div>
```

```angular-html
<!- Using the component ->
<custom-card>
  <card-title>Hello</card-title>
  <card-body>Welcome to the example</card-body>
</custom-card>
```

```angular-html
<!- Rendered DOM ->
<custom-card>
  <div class="card-shadow">
    <card-title>Hello</card-title>
    <div class="card-divider"></div>
    <card-body>Welcome to the example</card-body>
  </div>
</custom-card>
```

The `<ng-content>` placeholder supports the same CSS selectors
as [component selectors](guide/components/selectors).

If you include one or more `<ng-content>` placeholders with a `select` attribute and
one `<ng-content>` placeholder without a `select` attribute, the latter captures all elements that
did not match a `select` attribute:

```angular-html
<!- Component template ->
<div class="card-shadow">
  <ng-content select="card-title"></ng-content>
  <div class="card-divider"></div>
  <!- capture anything except "card-title" ->
  <ng-content></ng-content>
</div>
```

```angular-html
<!- Using the component ->
<custom-card>
  <card-title>Hello</card-title>
  <img src="..." />
  <p>Welcome to the example</p>
</custom-card>
```

```angular-html
<!- Rendered DOM ->
<custom-card>
  <div class="card-shadow">
    <card-title>Hello</card-title>
    <div class="card-divider"></div>
    <img src="..." />
    <p>Welcome to the example</p>
  </div>
</custom-card>
```

If a component does not include an `<ng-content>` placeholder without a `select` attribute, any
elements that don't match one of the component's placeholders do not render into the DOM.
-->
`<ng-content>` 플레이스홀더에 CSS 셀렉터를 지정하면 내용물을 여러개 전달할 수 있습니다.
위에서 다룬 카드 예제를 다시 보자면, `select` 어트리뷰트로 플레이스홀더를 구분하면 됩니다:

```angular-html
<!-- 컴포넌트 템플릿 -->
<div class="card-shadow">
  <ng-content select="card-title"></ng-content>
  <div class="card-divider"></div>
  <ng-content select="card-body"></ng-content>
</div>
```

```angular-html
<!-- 컴포넌트 사용 코드 -->
<custom-card>
  <card-title>Hello</card-title>
  <card-body>Welcome to the example</card-body>
</custom-card>
```

```angular-html
<!-- 렌더링 된 DOM -->
<custom-card>
  <div class="card-shadow">
    <card-title>Hello</card-title>
    <div class="card-divider"></div>
    <card-body>Welcome to the example</card-body>
  </div>
</custom-card>
```

`<ng-content>` 플레이스홀더에 사용하는 CSS 셀렉터는 [컴포넌트 셀렉터](guide/components/selectors)로 지정하는 방식과 같습니다.

`<ng-content>` 를 하나 이상 사용할 때 `select` 어트리뷰트를 지정한 `<ng-content>` 외에 `select` 어트리뷰트를 사용하지 않는 `<ng-content>`를 사용할 수 있는데, 이 경우는 `select` 어트리뷰트가 메칭되지 않는 모든 엘리먼트와 매칭됩니다:

```angular-html
<!-- 컴포넌트 템플릿 -->
<div class="card-shadow">
  <ng-content select="card-title"></ng-content>
  <div class="card-divider"></div>
  <!-- "card-title"이 아닌 모든 엘리먼트가 표시됩니다. -->
  <ng-content></ng-content>
</div>
```

```angular-html
<!-- 컴포넌트 사용 코드 -->
<custom-card>
  <card-title>Hello</card-title>
  <img src="..." />
  <p>Welcome to the example</p>
</custom-card>
```

```angular-html
<!-- 렌더링 된 DOM -->
<custom-card>
  <div class="card-shadow">
    <card-title>Hello</card-title>
    <div class="card-divider"></div>
    <img src="..." />
    <p>Welcome to the example</p>
  </div>
</custom-card>
```

컴포넌트에 `select` 어트리뷰트가 지정되지 않은 `<ng-content>` 플레이스홀더가 없다면, 플레이스홀더가 매칭되지 않는 엘리먼트는 DOM에 렌더링되지 않습니다.


<!--
## Fallback content
-->
## 폴백 컨텐츠

<!--
Angular can show *fallback content* for a component's `<ng-content>` placeholder if that component doesn't have any matching child content. You can specify fallback content by adding child content to the `<ng-content>` element itself.

```angular-html
<!- Component template ->
<div class="card-shadow">
  <ng-content select="card-title">Default Title</ng-content>
  <div class="card-divider"></div>
  <ng-content select="card-body">Default Body</ng-content>
</div>
```

```angular-html
<!- Using the component ->
<custom-card>
  <card-title>Hello</card-title>
  <!- No card-body provided ->
</custom-card>
```

```angular-html
<!- Rendered DOM ->
<custom-card>
  <div class="card-shadow">
    <card-title>Hello</card-title>
    <div class="card-divider"></div>
    Default Body
  </div>
</custom-card>
```
-->
컴포넌트에 매칭되는 자식 컨텐츠가 없다면, 컴포넌트 `<ng-content>`에 표시되는 *폴백 컨텐츠(fallback content)* 를 표시할 수 있습니다.
`<ng-content>` 엘리먼트 안에 내용을 구성하면 됩니다.

```angular-html
<!-- 컴포넌트 템플릿 -->
<div class="card-shadow">
  <ng-content select="card-title">Default Title</ng-content>
  <div class="card-divider"></div>
  <ng-content select="card-body">Default Body</ng-content>
</div>
```

```angular-html
<!-- 컴포넌트 사용 코드 -->
<custom-card>
  <card-title>Hello</card-title>
  <!-- card-body 가 없는 경우 -->
</custom-card>
```

```angular-html
<!-- 렌더링 된 DOM -->
<custom-card>
  <div class="card-shadow">
    <card-title>Hello</card-title>
    <div class="card-divider"></div>
    Default Body
  </div>
</custom-card>
```


<!--
## Aliasing content for projection
-->
## 별칭으로 프로젝션하기

<!--
Angular supports a special attribute, `ngProjectAs`, that allows you to specify a CSS selector on
any element. Whenever an element with `ngProjectAs` is checked against an `<ng-content>`
placeholder, Angular compares against the `ngProjectAs` value instead of the element's identity:

```angular-html
<!- Component template ->
<div class="card-shadow">
  <ng-content select="card-title"></ng-content>
  <div class="card-divider"></div>
  <ng-content></ng-content>
</div>
```

```angular-html
<!- Using the component ->
<custom-card>
  <h3 ngProjectAs="card-title">Hello</h3>

  <p>Welcome to the example</p>
</custom-card>
```

```angular-html
<!- Rendered DOM ->
<custom-card>
  <div class="card-shadow">
    <h3>Hello</h3>
    <div class="card-divider"></div>
    <p>Welcome to the example</p>
  </div>
</custom-card>
```

`ngProjectAs` supports only static values and cannot be bound to dynamic expressions.
-->
Angular는 모든 엘리먼트에 CSS 셀렉터를 지정할 수 있도록 `ngProjectAs` 라는 특별한 어트리뷰트를 지원합니다.
`ngProjectAs`가 지정된 엘리먼트가 `<ng-content>` 플레이스홀더와 매칭되면, Angular는 `<ng-content>` 엘리먼트의 내용물을 `ngProjectAs` 가 지정된 엘리먼트 내용물로 대체합니다:

```angular-html
<!-- 컴포넌트 템플릿 -->
<div class="card-shadow">
  <ng-content select="card-title"></ng-content>
  <div class="card-divider"></div>
  <ng-content></ng-content>
</div>
```

```angular-html
<!-- 컴포넌트 사용 코드 -->
<custom-card>
  <h3 ngProjectAs="card-title">Hello</h3>

  <p>Welcome to the example</p>
</custom-card>
```

```angular-html
<!-- 렌더링 된 DOM -->
<custom-card>
  <div class="card-shadow">
    <h3>Hello</h3>
    <div class="card-divider"></div>
    <p>Welcome to the example</p>
  </div>
</custom-card>
```

`ngProjectAs` 는 정적인 엘리먼트만 지정할 수 있으며, 동적으로 바인딩할 수는 없습니다.
