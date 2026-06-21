<!--
# Dependent state with `linkedSignal`
-->

# `linkedSignal`을 활용한 의존 상태 관리

<!--
You can use the `signal` function to hold some state in your Angular code. Sometimes, this state depends on some _other_ state. For example, imagine a component that lets the user select a shipping method for an order:

```typescript
@Component({
  /* ... */
})
export class ShippingMethodPicker {
  shippingOptions: Signal<ShippingMethod[]> = getShippingOptions();

  // Select the first shipping option by default.
  selectedOption = signal(this.shippingOptions()[0]);

  changeShipping(newOptionIndex: number) {
    this.selectedOption.set(this.shippingOptions()[newOptionIndex]);
  }
}
```

In this example, the `selectedOption` defaults to the first option, but changes if the user selects another option. But `shippingOptions` is a signal— its value may change! If `shippingOptions` changes, `selectedOption` may contain a value that is no longer a valid option.

**The `linkedSignal` function lets you create a signal to hold some state that is intrinsically _linked_ to some other state.** Revisiting the example above, `linkedSignal` can replace `signal`:

```ts
@Component({
  /* ... */
})
export class ShippingMethodPicker {
  shippingOptions: Signal<ShippingMethod[]> = getShippingOptions();

  // Initialize selectedOption to the first shipping option.
  selectedOption = linkedSignal(() => this.shippingOptions()[0]);

  changeShipping(index: number) {
    this.selectedOption.set(this.shippingOptions()[index]);
  }
}
```

`linkedSignal` works similarly to `signal` with one key difference— instead of passing a default value, you pass a _computation function_, just like `computed`. When the value of the computation changes, the value of the `linkedSignal` changes to the computation result. This helps ensure that the `linkedSignal` always has a valid value.

The following example shows how the value of a `linkedSignal` can change based on its linked state:

```ts
const shippingOptions = signal(['Ground', 'Air', 'Sea']);
const selectedOption = linkedSignal(() => shippingOptions()[0]);
console.log(selectedOption()); // 'Ground'

selectedOption.set(shippingOptions()[2]);
console.log(selectedOption()); // 'Sea'

shippingOptions.set(['Email', 'Will Call', 'Postal service']);
console.log(selectedOption()); // 'Email'
```
-->

Angular 코드에서 어떤 상태를 저장하려면 `signal` 함수를 사용하면 됩니다.
때로는 _다른_ 상태에 종속된 상태를 관리해야 할 수도 있습니다.
사용자가 배송 방식을 선택하는 컴포넌트를 예로 들어 봅시다:

```typescript
@Component({
  /* ... */
})
export class ShippingMethodPicker {
  shippingOptions: Signal<ShippingMethod[]> = getShippingOptions();

  // 기본 배송 방법을 지정합니다.
  selectedOption = signal(this.shippingOptions()[0]);

  changeShipping(newOptionIndex: number) {
    this.selectedOption.set(this.shippingOptions()[newOptionIndex]);
  }
}
```

이 예제에서 `selectedOption`은 기본값이 설정되어 있으며, 사용자의 선택에 따라 값이 변경됩니다.
그런데 `shippingOptions`는 시그널이기 떄문에 값이 변경될 수 있습니다!
`shippingOptions` 값이 변경되면 `selectedOption` 값은 더이상 유효하지 않습니다.

**이 때 `linkedSignal` 함수를 사용하면, 다른 상태와 직접 _연결되는_ 시그널을 생성할 수 있습니다.**
위 예제 코드에서 `signal`을 `linkedSignal`로 바꿔 보세요:

```ts
@Component({
  /* ... */
})
export class ShippingMethodPicker {
  shippingOptions: Signal<ShippingMethod[]> = getShippingOptions();

  // 기본 배송방법을 지정합니다.
  selectedOption = linkedSignal(() => this.shippingOptions()[0]);

  changeShipping(index: number) {
    this.selectedOption.set(this.shippingOptions()[index]);
  }
}
```

`linkedSignal`은 `signal`과 비슷하지만 다른 점이 하나 있습니다.
`linkedSignal`은 기본값을 직접 받지 않고 `computed` 시그널처럼 _계산 함수_ 를 통해 전달 받습니다.
그리고 계산 값이 변경되면 `linkedSignal`의 값도 새로 계산된 값으로 변경됩니다.
이제 `linkedSignal`의 값은 언제나 유효한 값을 유지합니다.

아래 예제를 보며 `linkedSignal` 값이 연결 상태에 따라 어떻게 변경되는지 확인해 보세요:

```ts
const shippingOptions = signal(['Ground', 'Air', 'Sea']);
const selectedOption = linkedSignal(() => shippingOptions()[0]);
console.log(selectedOption()); // 'Ground'

selectedOption.set(shippingOptions()[2]);
console.log(selectedOption()); // 'Sea'

shippingOptions.set(['Email', 'Will Call', 'Postal service']);
console.log(selectedOption()); // 'Email'
```

<!--
## Accounting for previous state
-->

## 이전 상태 참조하기

<!--
In some cases, the computation for a `linkedSignal` needs to account for the previous value of the `linkedSignal`.

In the example above, `selectedOption` always updates back to the first option when `shippingOptions` changes. You may, however, want to preserve the user's selection if their selected option is still somewhere in the list. To accomplish this, you can create a `linkedSignal` with a separate _source_ and _computation_:

```ts
interface ShippingMethod {
  id: number;
  name: string;
}

@Component({
  /* ... */
})
export class ShippingMethodPicker {
  constructor() {
    this.changeShipping(2);
    this.changeShippingOptions();
    console.log(this.selectedOption()); // {"id":2,"name":"Postal Service"}
  }

  shippingOptions = signal<ShippingMethod[]>([
    {id: 0, name: 'Ground'},
    {id: 1, name: 'Air'},
    {id: 2, name: 'Sea'},
  ]);

  selectedOption = linkedSignal<ShippingMethod[], ShippingMethod>({
    // `selectedOption` is set to the `computation` result whenever this `source` changes.
    source: this.shippingOptions,
    computation: (newOptions, previous) => {
      // If the newOptions contain the previously selected option, preserve that selection.
      // Otherwise, default to the first option.
      return newOptions.find((opt) => opt.id === previous?.value.id) ?? newOptions[0];
    },
  });

  changeShipping(index: number) {
    this.selectedOption.set(this.shippingOptions()[index]);
  }

  changeShippingOptions() {
    this.shippingOptions.set([
      {id: 0, name: 'Email'},
      {id: 1, name: 'Sea'},
      {id: 2, name: 'Postal Service'},
    ]);
  }
}
```

When you create a `linkedSignal`, you can pass an object with separate `source` and `computation` properties instead of providing just a computation.

The `source` can be any signal, such as a `computed` or component `input`. The `linkedSignal` updates its value when the `source` changes or when any signal referenced in the `computation` changes, updating its value with the result of the provided `computation`.

The `computation` is a function that receives the new value of `source` and a `previous` object. The `previous` object has two properties— `previous.source` is the previous value of `source`, and `previous.value` is the previous value of the `linkedSignal`. You can use these previous values to decide the new result of the computation.

HELPFUL: When using the `previous` parameter, it is necessary to provide the generic type arguments of `linkedSignal` explicitly. The first generic type corresponds with the type of `source` and the second generic type determines the output type of `computation`.
-->

경우에 따라 `linkedSignal`가 이전 값을 참조해야 하는 경우가 있습니다.

위 예제에서 `shippingOptions` 목록이 변경되면 `selectedOption`의 값은 언제나 첫번째 항목으로 변경됩니다.
하지만 사용자가 선택한 옵션이 어딘가에 사용중이라 이전 상태를 유지해야 한다고 합시다.
그러면 `linkedSignal`을 생성할 때 _소스(source)_ 와 _연산(computation)_ 을 구분하는 방식을 사용하면 됩니다:

```ts
interface ShippingMethod {
  id: number;
  name: string;
}

@Component({
  /* ... */
})
export class ShippingMethodPicker {
  constructor() {
    this.changeShipping(2);
    this.changeShippingOptions();
    console.log(this.selectedOption()); // {"id":2,"name":"Postal Service"}
  }

  shippingOptions = signal<ShippingMethod[]>([
    {id: 0, name: 'Ground'},
    {id: 1, name: 'Air'},
    {id: 2, name: 'Sea'},
  ]);

  selectedOption = linkedSignal<ShippingMethod[], ShippingMethod>({
    // `selectedOption`의 값은 `source`가 바뀌었을 때 `computation` 결과 값으로 할당됩니다.
    source: this.shippingOptions,
    computation: (newOptions, previous) => {
      // newOptions에 이전 값이 전달되면 이전 값을 유지합니다.
      // 아니면 첫번째 옵션 값을 선택합니다.
      return newOptions.find((opt) => opt.id === previous?.value.id) ?? newOptions[0];
    },
  });

  changeShipping(index: number) {
    this.selectedOption.set(this.shippingOptions()[index]);
  }

  changeShippingOptions() {
    this.shippingOptions.set([
      {id: 0, name: 'Email'},
      {id: 1, name: 'Sea'},
      {id: 2, name: 'Postal Service'},
    ]);
  }
}
```

`linkedSignal`을 생성할 때 연산 함수를 전달하는 대신, 객체를 전달하면서 이 객체의 프로퍼티로 `source`와 `computation` 옵션을 전달할 수 있습니다.

`source`는 시그널을 지정합니다.
`computed` 시그널이거나 컴포넌트의 `input` 시그널도 가능합니다.
`source` 시그널의 값이 변경되면 `linkedSignal`은 `computation` 실행 결과로 시그널의 값을 할당합니다.

그리고 `computation`은 `source`에서 새 값을 받으면서 `previous` 객체를 받는 함수입니다.
이 때 `previous` 객체에는 `source` 프로퍼티와 `value` 프로퍼티가 있습니다.
`previous.source` 프로퍼티에는 이전 `source` 값이 전달되며, `previous.value`에는 이전 `computation` 연산 결과가 전달됩니다.
연산 함수는 이 값들을 활용해서 새 값을 만들어 내면 됩니다.

도움말: `previous` 인자를 사용할 때는 `linkedSignal`의 제네릭 타입을 명시적으로 지정해야 합니다.
제네릭의 첫 번째 타입은`source`로 전달되는 타입이며, 두 번째 타입은 `computation` 연산 결과의 타입입니다.

<!--
## Custom equality comparison
-->

## 동일성 평가 함수 커스터마이징

<!--
`linkedSignal`, as any other signal, can be configured with a custom equality function. This function is used by downstream dependencies to determine if that value of the `linkedSignal` (result of a computation) changed:

```typescript
const activeUser = signal({id: 123, name: 'Morgan', isAdmin: true});

const activeUserEditCopy = linkedSignal(() => activeUser(), {
  // Consider the user as the same if it's the same `id`.
  equal: (a, b) => a.id === b.id,
});

// Or, if separating `source` and `computation`
const activeUserEditCopy = linkedSignal({
  source: activeUser,
  computation: (user) => user,
  equal: (a, b) => a.id === b.id,
});
```
-->

`linkedSignal`은 다른 시그널과 마찬가지로 커스텀 동일성 평가 함수를 지정할 수 있습니다.
이 함수는 `linkedSignal` 값이 변경되었는지 판단하는 용도로 사용됩니다:

```typescript
const activeUser = signal({id: 123, name: 'Morgan', isAdmin: true});

const activeUserEditCopy = linkedSignal(() => activeUser(), {
  // 사용자의 id가 같으면 같은 사용자로 판단합니다.
  equal: (a, b) => a.id === b.id,
});

// `source`와 `computation`을 각각 지정합니다.
const activeUserEditCopy = linkedSignal({
  source: activeUser,
  computation: (user) => user,
  equal: (a, b) => a.id === b.id,
});
```

<!--
## Customizing the set operation
-->

## `set()` 커스터마이징하기

<!--
Sometimes you may want the `set` and `update` operations of a `linkedSignal` to write back to the source of truth instead of updating the `linkedSignal`'s value directly. You can customize this behavior by passing a `set` function in the options.

The custom `set` function receives two arguments:

1. The new value being set.
2. A `rawSet` function, which you can invoke to update the `linkedSignal`'s internal state directly (matching the default behavior).

NOTE: Using `rawSet` allows you to update the `linkedSignal`'s value directly. This can be useful to prevent the computation from running, for example if it is an expensive derivation and you already know the result.
-->

`linkedSignal`의 `set` 메서드나 `update` 메서드의 동작이 `linkedSignal` 자체의 값을 변경하지 않고 원본의 값을 변경하는 경우가 있다고 합시다.
이런 경우에는 `set` 함수에 옵션을 전달해서 동작을 커스터마이징 할 수 있습니다.

커스텀 `set` 함수는 인자를 2개 받습니다:

1. 변경할 새 값
2. `rawSet` 함수 - `linkedSignal` 내부 상태를 직접 갱신하는 함

참고: `rawSet` 함수를 사용하면 `linkedSignal` 내부값을 직접 갱신할 수 있습니다.
이 방식은 계산이 복잡하거나 이미 결과를 알고 있는 경우를 건너뛰는 방식으로 유용합니다.

<!--
### Writing back to a source signal
-->

### 원본 시그널에 값을 변경하기

<!--
Consider a component that displays and allows editing temperature in Fahrenheit, but uses a Celsius signal as its source of truth:

```typescript
const tempC = signal(0);
const tempF = linkedSignal(() => (tempC() * 9) / 5 + 32, {
  set: (valF) => tempC.set(((valF - 32) * 5) / 9),
});

console.log(tempF()); // 32

// Setting Fahrenheit updates Celsius, which reactively updates Fahrenheit
tempF.set(212);
console.log(tempC()); // 100
console.log(tempF()); // 212
```
-->

화면에 사용하는 시그널은 화씨 시그널이지만, 원본 데이터는 섭씨 시그널인 경우를 생각해 봅시다:

```typescript
const tempC = signal(0);
const tempF = linkedSignal(() => (tempC() * 9) / 5 + 32, {
  set: (valF) => tempC.set(((valF - 32) * 5) / 9),
});

console.log(tempF()); // 32

// 화씨 값을 변경하면 원래 시그널인 섭씨 시그널 값을 변경합니다.
tempF.set(212);
console.log(tempC()); // 100
console.log(tempF()); // 212
```

<!--
### Updating a property inside a parent object
-->

### 부모 객체의 프로퍼티 값 변경하기

<!--
Another common scenario is updating a specific property inside a parent object. The parent is held in a signal, and you link to a nested property:

```typescript
interface Order {
  id: number;
  shippingMethod: string;
}

const order = signal<Order>({
  id: 42,
  shippingMethod: 'Ground',
});

const shippingMethod = linkedSignal(() => order().shippingMethod, {
  set: (newMethod) => {
    // Perform an immutable update to write the change back to the order
    order.update((currentOrder) => ({
      ...currentOrder,
      shippingMethod: newMethod,
    }));
  },
});

console.log(shippingMethod()); // 'Ground'

// Updating the shippingMethod updates the parent order object
shippingMethod.set('Air');
console.log(order()); // { id: 42, shippingMethod: 'Air' }
console.log(shippingMethod()); // 'Air'
```
-->

부모 객체의 프로퍼티 값을 변경하는 경우도 고려해봅시다.
대상 객체는 원본 시그널에 있습니다:

```typescript
interface Order {
  id: number;
  shippingMethod: string;
}

const order = signal<Order>({
  id: 42,
  shippingMethod: 'Ground',
});

const shippingMethod = linkedSignal(() => order().shippingMethod, {
  set: (newMethod) => {
    // 객체 참조를 유지하면서 내부 값을 변경합니다.
    order.update((currentOrder) => ({
      ...currentOrder,
      shippingMethod: newMethod,
    }));
  },
});

console.log(shippingMethod()); // 'Ground'

// shippingMethod 값을 변경하면서 부모 객체의 프로퍼티 값을 갱신합니다.
shippingMethod.set('Air');
console.log(order()); // { id: 42, shippingMethod: 'Air' }
console.log(shippingMethod()); // 'Air'
```
