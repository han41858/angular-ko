<!--
# Using signals with services
-->

# 서비스에서 시그널 사용하기

<!--
Now that you've learned [two-way binding with model signals](/tutorials/signals/6-two-way-binding-with-model-signals), let's explore how to use signals with Angular services. Services are perfect for sharing reactive state across multiple components, and signals make this even more powerful by providing automatic change detection and clean reactive patterns.
-->

[모델 시그널을 사용하는 양방향 바인딩](/tutorials/signals/6-two-way-binding-with-model-signals)을 배웠으니, 이제 Angular 서비스에서 시그널을 사용하는 방법을 살펴봅시다. 서비스는 여러 컴포넌트에서 반응형 상태를 공유할 때 적합합니다. 시그널의 자동 변화 감지와 명확한 반응형 패턴을 활용하면 더 편리하게 구현할 수 있습니다.

<!--
In this activity, you'll learn how to create a cart store with signals that allow the cart display component to react to state changes automatically.
-->

이번 실습에서는 시그널을 사용하는 장바구니 저장소를 만들어서 장바구니 표시 컴포넌트가 상태 변경에 자동으로 반응하도록 합니다.

<hr />

<docs-workflow>

<!--
<docs-step title="Add cart store signals">
-->

<docs-step title="장바구니 저장소에 시그널 추가하기">

<a id="add-cart-store-signals"></a>

<!--
Add readonly and computed signals to make the cart state reactive in `cart-store.ts`.
-->

`cart-store.ts`에 읽기 전용 시그널과 computed 시그널을 추가해서 장바구니 상태를 반응형으로 만듭니다.

```ts
// Add the computed import
import {Service, signal, computed} from '@angular/core';

// Then add these signals to the class:

// Readonly signals
readonly cartItems = this.items.asReadonly();

// Computed signals
readonly totalQuantity = computed(() => {
  return this.items().reduce((sum, item) => sum + item.quantity, 0);
});

readonly totalPrice = computed(() => {
  return this.items().reduce((sum, item) => sum + item.price * item.quantity, 0);
});
```

<!--
These signals allow components to reactively access cart data and computed totals. The `asReadonly()` method prevents external code from modifying the cart items directly, while `computed()` creates derived state that automatically updates when the source signal changes.
-->

이 시그널을 사용하면 컴포넌트가 장바구니 데이터와 계산된 합계에 반응형으로 접근할 수 있습니다. `asReadonly()`는 외부 코드에서 시그널 값을 직접 설정하지 못하게 하고, `computed()`는 원본 시그널이 변경되면 자동으로 갱신되는 파생 상태를 만듭니다.
</docs-step>

<!--
<docs-step title="Complete the quantity update methods">
-->

<docs-step title="수량 갱신 메서드 완성하기">

<a id="complete-the-quantity-update-methods"></a>

<!--
The cart display component in `cart-display.ts` already uses the cart store signals in its template. Complete the quantity update methods to modify cart items:
-->

`cart-display.ts`의 장바구니 표시 컴포넌트는 이미 템플릿에서 장바구니 저장소의 시그널을 사용합니다. 항목을 수정할 수 있도록 수량 갱신 메서드를 완성합니다:

```ts
increaseQuantity(id: string) {
  const items = this.cartStore.cartItems();
  const currentItem = items.find((item) => item.id === id);
  if (currentItem) {
    this.cartStore.updateQuantity(id, currentItem.quantity + 1);
  }
}

decreaseQuantity(id: string) {
  const items = this.cartStore.cartItems();
  const currentItem = items.find((item) => item.id === id);
  if (currentItem && currentItem.quantity > 1) {
    this.cartStore.updateQuantity(id, currentItem.quantity - 1);
  }
}
```

<!--
These methods read the current cart state using `cartItems()` and update quantities through the store's methods. The UI automatically updates when the signals change!
-->

이 메서드는 `cartItems()`로 현재 장바구니 상태를 읽고, 저장소의 메서드로 수량을 갱신합니다. 시그널이 변경되면 UI도 자동으로 갱신됩니다!
</docs-step>

<!--
<docs-step title="Update the main app component">
-->

<docs-step title="메인 앱 컴포넌트 수정하기">

<a id="update-the-main-app-component"></a>

<!--
Update the main app component in `app.ts` to use the cart service and display the cart component.
-->

`app.ts`의 메인 앱 컴포넌트가 장바구니 서비스를 사용하고 장바구니 컴포넌트를 표시하도록 수정합니다.

```angular-ts
import {Component, inject} from '@angular/core';
import {CartStore} from './cart-store';
import {CartDisplay} from './cart-display';

@Component({
  selector: 'app-root',
  imports: [CartDisplay],
  template: `
    <div class="shopping-app">
      <header>
        <h1>Signals with Services Demo</h1>
        <div class="cart-badge">
          Cart: {{ cartStore.totalQuantity() }} items (\${{ cartStore.totalPrice() }})
        </div>
      </header>

      <main>
        <cart-display />
      </main>
    </div>
  `,
  styleUrl: './app.css',
})
export class App {
  cartStore = inject(CartStore);
}
```

</docs-step>

</docs-workflow>

<!--
Excellent! You've now learned how to use signals with services. Key concepts to remember:
-->

서비스에서 시그널을 사용하는 방법을 배웠습니다! 기억할 핵심 개념은 다음과 같습니다:

<!--
- **Service-level signals**: Services can use signals to manage reactive state
- **Dependency injection**: Use `inject()` to access services with signals in components
- **Computed signals in services**: Create derived state that updates automatically
- **Readonly signals**: Expose read-only versions of signals to prevent external mutations
-->

- **서비스의 시그널**: 서비스에서 시그널로 반응형 상태를 관리할 수 있습니다.
- **의존성 주입**: 컴포넌트에서 `inject()`로 시그널이 있는 서비스에 접근합니다.
- **서비스의 computed 시그널**: 자동으로 갱신되는 파생 상태를 만듭니다.
- **읽기 전용 시그널**: 읽기 전용 시그널을 공개해서 외부에서 시그널 값을 직접 설정하지 못하게 합니다.

<!--
In the next lesson, you'll learn about [how to use signals with directives](/tutorials/signals/8-using-signals-with-directives)!
-->

다음 단계에서는 [디렉티브에서 시그널을 사용하는 방법](/tutorials/signals/8-using-signals-with-directives)을 배웁니다!
