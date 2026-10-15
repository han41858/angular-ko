<!--
# Query child elements with signal queries
-->

# 시그널 쿼리로 자식 엘리먼트 조회하기

<!--
Now that you've learned [how to use signals with directives](/tutorials/signals/8-using-signals-with-directives), let's explore signal-based query APIs. These provide a reactive way to access and interact with child components and directives. Both components and directives can perform queries while also being queried themselves. Unlike the traditional ViewChild, signal queries automatically update and provide type-safe access to child components and directives.
-->

[디렉티브에서 시그널을 사용하는 방법](/tutorials/signals/8-using-signals-with-directives)을 배웠으니, 이제 시그널 기반 쿼리 API를 살펴봅시다. 자식 컴포넌트와 디렉티브에 반응형으로 접근하고 상호작용할 수 있습니다. 컴포넌트와 디렉티브는 모두 쿼리를 수행하면서 쿼리 대상이 될 수도 있습니다. 기존 `ViewChild`와 달리 시그널 쿼리는 결과를 시그널로 제공하며, 자동 갱신과 타입 안전성을 활용해서 자식 컴포넌트와 디렉티브에 접근할 수 있습니다.

<!--
In this activity, you'll add viewChild queries to interact with child components programmatically.
-->

이번 실습에서는 viewChild 쿼리를 추가해서 코드로 자식 컴포넌트와 상호작용합니다.

<hr />

<docs-workflow>

<!--
<docs-step title="Add viewChild import">
-->

<docs-step title="viewChild 불러오기">

<a id="add-viewchild-import"></a>

<!--
First, add the `viewChild` import to access child components in `app.ts`.
-->

먼저 `app.ts`에서 자식 컴포넌트에 접근할 수 있도록 `viewChild`를 불러옵니다.

```ts
import {Component, signal, computed, viewChild, ChangeDetectionStrategy} from '@angular/core';
```

</docs-step>

<!--
<docs-step title="Create viewChild queries">
-->

<docs-step title="viewChild 쿼리 생성하기">

<a id="create-viewchild-queries"></a>

<!--
Add viewChild queries to the App component to access child components.
-->

App 컴포넌트에 자식 컴포넌트를 조회하는 viewChild 쿼리를 추가합니다.

```ts
// Query APIs to access child components
firstProduct = viewChild(ProductCard);
cartSummary = viewChild(CartSummary);
```

<!--
These queries create signals that reference child component instances.
-->

이 쿼리는 자식 컴포넌트 인스턴스를 참조하는 시그널을 만듭니다.
</docs-step>

<!--
<docs-step title="Implement parent methods">
-->

<docs-step title="부모 메서드 구현하기">

<a id="implement-parent-methods"></a>

<!--
Use the viewChild queries to call methods on child components in `app.ts`:
-->

`app.ts`에서 viewChild 쿼리를 사용해서 자식 컴포넌트의 메서드를 호출합니다:

```ts
showFirstProductDetails() {
  const product = this.firstProduct();
  if (product) {
    product.highlight();
  }
}

initiateCheckout() {
  const summary = this.cartSummary();
  if (summary) {
    summary.initiateCheckout();
  }
}
```

</docs-step>

<!--
<docs-step title="Test the interactions">
-->

<docs-step title="상호작용 테스트하기">

<a id="test-the-interactions"></a>

<!--
The control buttons should now work:
-->

이제 제어 버튼이 동작해야 합니다:

<!--
- **"Show First Product Details"** - Calls `highlight()` on the ProductCard
- **"Initiate Checkout"** - Calls `initiateCheckout()` on the CartSummary
-->

- **"Show First Product Details"** - ProductCard의 `highlight()`를 호출합니다.
- **"Initiate Checkout"** - CartSummary의 `initiateCheckout()`을 호출합니다.

<!--
Click the buttons to see how viewChild queries enable parent components to control child behavior.
-->

버튼을 클릭해서 viewChild 쿼리로 부모 컴포넌트가 자식의 동작을 제어하는 것을 확인하세요.
</docs-step>

</docs-workflow>

<!--
Perfect! You've learned how to use signal-based query APIs for child component interaction:
-->

시그널 기반 쿼리 API로 자식 컴포넌트와 상호작용하는 방법을 배웠습니다!

<!--
In the next lesson, you'll learn about [how to react to signal changes with effect](/tutorials/signals/10-reacting-to-signal-changes-with-effect)!
-->

다음 단계에서는 [effect로 시그널 변경에 반응하는 방법](/tutorials/signals/10-reacting-to-signal-changes-with-effect)을 배웁니다!
