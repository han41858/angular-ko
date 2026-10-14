<!--
# Passing data to components with input signals
-->

# 입력 시그널로 컴포넌트에 데이터 전달하기

<!--
Now that you've learned [managing async data with signals](/tutorials/signals/4-managing-async-data-with-signals), let's explore Angular's signal-based `input()` API for passing data from parent to child components, making component data flow more reactive and efficient. If you're familiar with component props from other frameworks, inputs are the same idea.
-->

[시그널로 비동기 데이터를 관리하는 방법](/tutorials/signals/4-managing-async-data-with-signals)을 배웠으니, 이제 부모에서 자식 컴포넌트로 데이터를 전달하는 Angular의 시그널 기반 `input()` API를 살펴봅시다. 컴포넌트의 데이터 흐름을 더 반응형으로 만들고 효율적으로 처리할 수 있습니다. 다른 프레임워크의 컴포넌트 props에 익숙하다면, 입력 프로퍼티도 같은 개념입니다.

<!--
In this activity, you'll add signal inputs to a product card component and see how parent data flows down reactively.
-->

이번 실습에서는 상품 카드 컴포넌트에 입력 시그널을 추가하고 부모 데이터가 반응형으로 전달되는 것을 확인합니다.

<hr />

<docs-workflow>

<!--
<docs-step title="Add signal inputs to ProductCard">
-->

<docs-step title="ProductCard에 입력 시그널 추가하기">

<a id="add-signal-inputs-to-productcard"></a>

<!--
Add signal `input()` functions to receive data in the `product-card` component.
-->

`product-card` 컴포넌트가 데이터를 받을 수 있도록 `input()` 함수를 추가합니다.

```ts
// Add imports for signal inputs
import {Component, input, ChangeDetectionStrategy} from '@angular/core';

// Add these signal inputs
name = input.required<string>();
price = input.required<number>();
available = input<boolean>(true);
```

<!--
Notice how `input.required()` creates an input that must be provided, while `input()` with a default value is optional.
-->

`input.required()`는 반드시 전달해야 하는 입력 프로퍼티를 만들고, 기본값이 있는 `input()`은 선택 입력 프로퍼티를 만듭니다.
</docs-step>

<!--
<docs-step title="Connect inputs to the template">
-->

<docs-step title="입력 프로퍼티를 템플릿에 연결하기">

<a id="connect-inputs-to-the-template"></a>

<!--
Update the template in `product-card` to display the signal input values.
-->

`product-card`의 템플릿을 수정해서 입력 시그널 값을 표시합니다.

```angular-html
<div class="product-card">
  <h3>{{ name() }}</h3>
  <p class="price">\${{ price() }}</p>
  <p class="status">
    Status:
    @if (available()) {
      Available
    } @else {
      Out of Stock
    }
  </p>
</div>
```

<!--
Input signals work just like regular signals in templates - call them as functions to access their values.
-->

입력 시그널도 템플릿에서 일반 시그널과 똑같이 사용합니다. 함수로 호출해서 값에 접근하세요.
</docs-step>

<!--
<docs-step title="Connect parent signals to child inputs">
-->

<docs-step title="부모 시그널을 자식 입력 프로퍼티에 연결하기">

<a id="connect-parent-signals-to-child-inputs"></a>

<!--
Update the `product-card` usage in `app.ts` to pass dynamic signal values instead of static ones.
-->

`app.ts`의 `product-card`에 고정된 값 대신 동적인 시그널 값을 전달하도록 수정합니다.

```html
<!-- Change from static values: -->
<product-card name="Static Product" price="99" available="true" />

<!-- To dynamic signals: -->
<product-card [name]="productName()" [price]="productPrice()" [available]="productAvailable()" />
```

<!--
The square brackets `[]` create property bindings that pass the current signal values to the child.
-->

대괄호 `[]`는 프로퍼티 바인딩을 생성해서 현재 시그널 값을 자식에 전달합니다.
</docs-step>

<!--
<docs-step title="Test reactive updates">
-->

<docs-step title="반응형 갱신 테스트하기">

<a id="test-reactive-updates"></a>

<!--
Add methods in `app.ts` to update the parent signals and see how the child component reacts automatically.
-->

`app.ts`에 부모 시그널을 갱신하는 메서드를 추가하고 자식 컴포넌트가 자동으로 반응하는 것을 확인합니다.

```ts
updateProduct() {
  this.productName.set(`Product ${Math.floor(Math.random() * 100)}`);
  this.productPrice.set(Math.floor(Math.random() * 500) + 50);
}

toggleAvailability() {
  this.productAvailable.set(!this.productAvailable());
}
```

```html
<!-- Add controls to test reactivity -->
<div class="controls">
  <button (click)="updateProduct()">Update Product Data</button>
  <button (click)="toggleAvailability()">Toggle Availability</button>
</div>
```

<!--
When parent signals change, the child component automatically receives and displays the new values!
-->

부모 시그널이 변경되면 자식 컴포넌트가 자동으로 새로운 값을 받아 표시합니다!
</docs-step>

</docs-workflow>

<!--
Excellent! You've learned how signal inputs work:
-->

입력 시그널의 동작을 배웠습니다:

<!--
- **Signal inputs** - Use `input()` and `input.required()` to receive data from parent components
- **Reactive updates** - Child components automatically update when parent signal values change
- **Type safety** - Signal inputs provide full TypeScript type checking
- **Default values** - Optional inputs can have default values while required inputs must be provided
-->

- **입력 시그널** - `input()`과 `input.required()`로 부모 컴포넌트에서 데이터를 받습니다.
- **반응형 갱신** - 부모 시그널 값이 변경되면 자식 컴포넌트가 자동으로 갱신됩니다.
- **타입 안전성** - TypeScript의 타입 검사를 지원합니다.
- **기본값** - 선택 입력에는 기본값을 지정할 수 있지만, 필수 입력은 반드시 전달해야 합니다.

<!--
Signal inputs make component communication more reactive and eliminate the need for `OnChanges` lifecycle hooks in many cases.
-->

입력 시그널을 사용하면 컴포넌트가 더 반응형으로 통신하며, 많은 경우 `OnChanges` 라이프사이클 후크가 필요하지 않습니다.

<!--
In the next lesson, you'll learn about [two-way binding with model signals](/tutorials/signals/6-two-way-binding-with-model-signals)!
-->

다음 단계에서는 [모델 시그널을 사용하는 양방향 바인딩](/tutorials/signals/6-two-way-binding-with-model-signals)을 배웁니다!
